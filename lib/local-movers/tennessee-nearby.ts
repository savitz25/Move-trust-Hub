import { tennesseeCounties } from '@/data/generated/states/tennessee';
import { applyTennesseeCountyOverrides } from '@/lib/local-movers/geography/tennessee-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const tnCounties = tennesseeCounties.map(applyTennesseeCountyOverrides);
const countyNameBySlug = new Map(tnCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for internal linking on TN county pages */
const TN_COUNTY_NEIGHBORS: Record<string, string[]> = {
  shelby: ['fayette', 'tipton', 'haywood', 'hardeman', 'lauderdale', 'crockett'],
  davidson: ['williamson', 'sumner', 'wilson', 'rutherford', 'robertson', 'cheatham'],
  knox: ['anderson', 'blount', 'loudon', 'union', 'grainger', 'sevier'],
  hamilton: ['bradley', 'marion', 'sequatchie', 'bledsoe', 'rhea', 'meigs'],
  rutherford: ['davidson', 'williamson', 'wilson', 'cannon', 'bedford', 'marshall'],
  williamson: ['davidson', 'rutherford', 'maury', 'marshall', 'cheatham', 'hickman'],
  montgomery: ['stewart', 'houston', 'dickson', 'robertson', 'cheatham', 'davidson'],
  sumner: ['davidson', 'wilson', 'robertson', 'macon', 'smith', 'trousdale'],
  wilson: ['sumner', 'davidson', 'rutherford', 'smith', 'dekalb', 'cannon'],
  sullivan: ['hawkins', 'washington', 'carter', 'johnson', 'unicoi', 'greene'],
  blount: ['knox', 'loudon', 'monroe', 'sevier', 'grainger', 'anderson'],
  washington: ['sullivan', 'carter', 'unicoi', 'greene', 'hawkins', 'johnson'],
  maury: ['williamson', 'marshall', 'bedford', 'lincoln', 'hickman', 'giles'],
  bradley: ['hamilton', 'mcminn', 'polk', 'meigs', 'rhea', 'monroe'],
  sevier: ['knox', 'blount', 'jefferson', 'cocke', 'hamblen', 'grainger'],
  madison: ['chester', 'henderson', 'carroll', 'gibson', 'crockett', 'hardeman'],
  putnam: ['jackson', 'smith', 'overton', 'white', 'cumberland', 'dekalb'],
  anderson: ['knox', 'roane', 'morgan', 'scott', 'campbell', 'blount'],
  robertson: ['davidson', 'sumner', 'montgomery', 'cheatham', 'wilson', 'macon'],
  greene: ['washington', 'hawkins', 'unicoi', 'cocke', 'hamblen', 'sullivan'],
  hamblen: ['jefferson', 'grainger', 'hawkins', 'greene', 'cocke', 'sevier'],
  cumberland: ['putnam', 'fentress', 'morgan', 'roane', 'white', 'van-buren'],
  loudon: ['knox', 'blount', 'roane', 'monroe', 'mcminn', 'anderson'],
  coffee: ['bedford', 'franklin', 'grundy', 'warren', 'cannon', 'rutherford'],
  tipton: ['shelby', 'fayette', 'crockett', 'lauderdale', 'haywood', 'benton'],
  jefferson: ['sevier', 'hamblen', 'grainger', 'cocke', 'knox', 'douglas'],
  hawkins: ['sullivan', 'washington', 'greene', 'hancock', 'claiborne', 'grainger'],
  dickson: ['montgomery', 'houston', 'hickman', 'williamson', 'cheatham', 'humphreys'],
  mcminn: ['bradley', 'monroe', 'meigs', 'rhea', 'polk', 'loudon'],
  roane: ['knox', 'loudon', 'morgan', 'cumberland', 'rhea', 'meigs'],
  carter: ['sullivan', 'washington', 'unicoi', 'johnson', 'greene', 'hawkins'],
  bedford: ['rutherford', 'coffee', 'lincoln', 'marshall', 'moore', 'franklin'],
  gibson: ['crockett', 'dyer', 'lake', 'obion', 'carroll', 'madison'],
  monroe: ['mcminn', 'loudon', 'polk', 'bradley', 'meigs', 'rhea'],
  lawrence: ['wayne', 'lewis', 'giles', 'maury', 'marshall', 'bedford'],
  franklin: ['coffee', 'bedford', 'marion', 'grundy', 'moore', 'lincoln'],
  fayette: ['shelby', 'tipton', 'hardeman', 'haywood', 'benton', 'marshall'],
  warren: ['coffee', 'cannon', 'dekalb', 'van-buren', 'white', 'grundy'],
  cheatham: ['davidson', 'dickson', 'montgomery', 'robertson', 'williamson', 'houston'],
  campbell: ['anderson', 'scott', 'union', 'claiborne', 'knox', 'morgan'],
  marshall: ['rutherford', 'bedford', 'maury', 'lincoln', 'giles', 'williamson'],
  cocke: ['sevier', 'hamblen', 'greene', 'jefferson', 'haywood', 'grainger'],
  lincoln: ['bedford', 'franklin', 'marshall', 'moore', 'giles', 'maury'],
  dyer: ['gibson', 'lake', 'obion', 'crockett', 'lauderdale', 'henry'],
  rhea: ['meigs', 'bradley', 'hamilton', 'bledsoe', 'roane', 'mcminn'],
  claiborne: ['campbell', 'union', 'grainger', 'hancock', 'hawkins', 'hamblen'],
  weakley: ['gibson', 'carroll', 'henry', 'obion', 'crockett', 'madison'],
  henry: ['weakley', 'obion', 'carroll', 'benton', 'stewart', 'houston'],
  giles: ['maury', 'marshall', 'lincoln', 'lawrence', 'wayne', 'lewis'],
  white: ['warren', 'van-buren', 'putnam', 'cumberland', 'dekalb', 'cannon'],
  obion: ['weakley', 'henry', 'dyer', 'gibson', 'lake', 'crockett'],
  marion: ['hamilton', 'sequatchie', 'grundy', 'franklin', 'coffee', 'bradley'],
  carroll: ['weakley', 'gibson', 'madison', 'henry', 'benton', 'decatur'],
  henderson: ['chester', 'madison', 'carroll', 'decatur', 'hardin', 'mcnairy'],
  hardin: ['mcnairy', 'chester', 'henderson', 'wayne', 'lawrence', 'decatur'],
  macon: ['sumner', 'wilson', 'smith', 'trousdale', 'clay', 'jackson'],
  hickman: ['dickson', 'houston', 'humphreys', 'lewis', 'perry', 'williamson'],
  grainger: ['knox', 'hamblen', 'jefferson', 'cocke', 'union', 'claiborne'],
  mcnairy: ['hardin', 'chester', 'henderson', 'hardeman', 'madison', 'mcminn'],
  hardeman: ['fayette', 'shelby', 'mcnairy', 'madison', 'hardin', 'tipton'],
  lauderdale: ['tipton', 'crockett', 'dyer', 'haywood', 'shelby', 'fayette'],
  overton: ['putnam', 'fentress', 'pickett', 'clay', 'jackson', 'white'],
  scott: ['campbell', 'anderson', 'morgan', 'fentress', 'pickett', 'mcminn'],
  morgan: ['scott', 'anderson', 'roane', 'cumberland', 'fentress', 'van-buren'],
  dekalb: ['smith', 'putnam', 'cannon', 'warren', 'white', 'wilson'],
  union: ['knox', 'claiborne', 'grainger', 'campbell', 'anderson', 'jefferson'],
  smith: ['sumner', 'wilson', 'trousdale', 'macon', 'dekalb', 'jackson'],
  fentress: ['overton', 'pickett', 'scott', 'morgan', 'campbell', 'cumberland'],
  humphreys: ['hickman', 'houston', 'benton', 'perry', 'dickson', 'cheatham'],
  johnson: ['sullivan', 'washington', 'carter', 'unicoi', 'hawkins', 'greene'],
  polk: ['bradley', 'mcminn', 'monroe', 'hamilton', 'meigs', 'rhea'],
  chester: ['madison', 'henderson', 'mcnairy', 'hardin', 'hardeman', 'decatur'],
  sequatchie: ['hamilton', 'marion', 'grundy', 'van-buren', 'warren', 'bledsoe'],
  unicoi: ['washington', 'carter', 'greene', 'cocke', 'johnson', 'hawkins'],
  haywood: ['lauderdale', 'crockett', 'fayette', 'tipton', 'madison', 'hardeman'],
  wayne: ['lawrence', 'lewis', 'perry', 'hickman', 'maury', 'giles'],
  bledsoe: ['sequatchie', 'van-buren', 'rhea', 'cumberland', 'hamilton', 'white'],
  benton: ['henry', 'stewart', 'houston', 'humphreys', 'carroll', 'decatur'],
  cannon: ['rutherford', 'dekalb', 'wilson', 'warren', 'coffee', 'smith'],
  stewart: ['montgomery', 'houston', 'henry', 'benton', 'humphreys', 'dickson'],
  meigs: ['rhea', 'mcminn', 'bradley', 'hamilton', 'polk', 'monroe'],
  grundy: ['sequatchie', 'marion', 'franklin', 'coffee', 'warren', 'van-buren'],
  crockett: ['lauderdale', 'dyer', 'gibson', 'haywood', 'madison', 'weakley'],
};

export function getTennesseeNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = TN_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = tnCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    });
}