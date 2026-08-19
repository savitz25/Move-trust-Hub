import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { Client } from "pg";
import { pointInGeometry } from "../../../lib/move-v2/geography/derived-placement";
import { directDatabaseUrl, ssl } from "../db/connection";
type Geometry = {
  type: "Polygon" | "MultiPolygon";
  coordinates: number[][][] | number[][][][];
};
const rings = (g: Geometry): number[][][][] =>
  g.type === "Polygon"
    ? [g.coordinates as number[][][]]
    : (g.coordinates as number[][][][]);
const bbox = (g: Geometry) => {
  const p = rings(g).flatMap((x) => x[0]);
  return [
    Math.min(...p.map((x) => x[0])),
    Math.min(...p.map((x) => x[1])),
    Math.max(...p.map((x) => x[0])),
    Math.max(...p.map((x) => x[1])),
  ];
};
const overlaps = (a: number[], b: number[]) =>
  a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1];
function relationships(
  z: Geometry,
  counties: { county_geoid: string; geometry: Geometry; box: number[] }[],
) {
  const b = bbox(z),
    candidates = counties.filter((c) => overlaps(b, c.box)),
    counts = new Map<string, number>();
  let inside = 0;
  const steps = 20;
  for (let x = 0; x <= steps; x++)
    for (let y = 0; y <= steps; y++) {
      const p: [number, number] = [
        b[0] + ((b[2] - b[0]) * x) / steps,
        b[1] + ((b[3] - b[1]) * y) / steps,
      ];
      if (!pointInGeometry(p, z)) continue;
      inside++;
      for (const c of candidates)
        if (pointInGeometry(p, c.geometry)) {
          counts.set(c.county_geoid, (counts.get(c.county_geoid) ?? 0) + 1);
          break;
        }
    }
  return [...counts]
    .map(([geoid, n]) => ({ geoid, overlap: inside ? n / inside : 0 }))
    .filter((x) => x.overlap > 0.001)
    .sort((a, b) => b.overlap - a.overlap);
}
async function main() {
  const c = new Client({ connectionString: directDatabaseUrl(), ssl });
  await c.connect();
  const stats = [];
  try {
    await c.query("begin");
    for (const state of ["FL", "WA"]) {
      const path = `artifacts/move-v2/geography/tigerweb-2020-zcta-${state}.geojson`,
        body = readFileSync(path),
        json = JSON.parse(body.toString()),
        sha = createHash("sha256").update(body).digest("hex");
      const release = await c.query(
        `insert into move_v2.geography_source_release(source_name,source_url,vintage,retrieved_at,sha256,feature_count) values('US Census TIGERweb ZCTA','https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_Census2020/MapServer/84','January 1 2020',$1,$2,$3) on conflict(source_url,sha256) do update set feature_count=excluded.feature_count returning geography_source_release_id`,
        [statSync(path).mtime.toISOString(), sha, json.features.length],
      );
      const countyRows = await c.query(
        `select county_geoid,geometry from move_v2.county_geometry where state=$1`,
        [state],
      );
      const counties = countyRows.rows.map((x) => ({
        ...x,
        box: bbox(x.geometry),
      }));
      let kept = 0,
        relations = 0,
        cross = 0;
      const zctas: Record<string, unknown>[] = [], relationshipRows: Record<string, unknown>[] = [];
      for (const f of json.features) {
        const rel = relationships(f.geometry, counties);
        if (!rel.length) continue;
        kept++;
        const zcta = f.properties.GEOID;
        zctas.push({zcta,geometry:f.geometry,land_area_sq_m:f.properties.AREALAND,centroid_lat:f.properties.CENTLAT,centroid_lon:f.properties.CENTLON,primary_county_geoid:rel[0].geoid});
        for (let i = 0; i < rel.length; i++) {
          relations++;
          if (i) cross++;
          relationshipRows.push({zcta,county_geoid:rel[i].geoid,relationship_type:i?"CROSS_COUNTY":"PRIMARY",estimated_overlap:rel[i].overlap});
        }
      }
      await c.query(`insert into move_v2.zcta_geometry(zcta,geography_source_release_id,geometry,land_area_sq_m,centroid_lat,centroid_lon) select x.zcta,$2,x.geometry,x.land_area_sq_m,x.centroid_lat,x.centroid_lon from jsonb_to_recordset($1::jsonb) x(zcta text,geometry jsonb,land_area_sq_m numeric,centroid_lat numeric,centroid_lon numeric,primary_county_geoid text) on conflict(zcta) do update set geography_source_release_id=excluded.geography_source_release_id,geometry=excluded.geometry,land_area_sq_m=excluded.land_area_sq_m,centroid_lat=excluded.centroid_lat,centroid_lon=excluded.centroid_lon`,[JSON.stringify(zctas),release.rows[0].geography_source_release_id]);
      await c.query(`insert into move_v2.zcta_county_relationship(zcta,county_geoid,state,relationship_type,estimated_overlap,rule_version) select x.zcta,x.county_geoid,$2,x.relationship_type,x.estimated_overlap,'MOVE_ZCTA_COUNTY_GRID_2026_08_V1' from jsonb_to_recordset($1::jsonb) x(zcta text,county_geoid text,relationship_type text,estimated_overlap numeric) on conflict(zcta,county_geoid,rule_version) do update set relationship_type=excluded.relationship_type,estimated_overlap=excluded.estimated_overlap`,[JSON.stringify(relationshipRows),state]);
      await c.query(`insert into move_v2.postal_zip_resolution(postal_zip,zcta,status,state,primary_county_geoid,rule_version,explanation,resolved_at) select x.zcta,x.zcta,'GEOGRAPHIC_ZCTA',$2,x.primary_county_geoid,'MOVE_POSTAL_ZCTA_2026_08_V1','Typed ZIP matched a 2020 Census ZCTA; ZCTA is not a USPS delivery boundary.',now() from jsonb_to_recordset($1::jsonb) x(zcta text,geometry jsonb,land_area_sq_m numeric,centroid_lat numeric,centroid_lon numeric,primary_county_geoid text) on conflict(postal_zip) do update set zcta=excluded.zcta,status=excluded.status,state=excluded.state,primary_county_geoid=excluded.primary_county_geoid,rule_version=excluded.rule_version,explanation=excluded.explanation,resolved_at=excluded.resolved_at`,[JSON.stringify(zctas),state]);
      stats.push({
        state,
        sourceFeatures: json.features.length,
        kept,
        relations,
        cross,
      });
    }
    await c.query("commit");
    console.log(JSON.stringify(stats));
  } catch (e) {
    await c.query("rollback");
    throw e;
  } finally {
    await c.end();
  }
}
void main();
