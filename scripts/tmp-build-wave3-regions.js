const fs = require("fs");
function getSlugs(s) {
  const t = fs.readFileSync("data/generated/states/" + s + ".ts", "utf8");
  const items = [];
  const re = /\{\s*"slug":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g;
  let m; while ((m = re.exec(t))) items.push(m[1]);
  return [...new Set(items)].sort();
}

// ---- COLORADO 64 ----
const co = {
  "denver-metro": ["adams","arapahoe","boulder","broomfield","denver","douglas","jefferson","gilpin","clear-creek"],
  "northern-front-range": ["larimer","weld","morgan","logan","sedgwick","phillips","yuma","washington"],
  "southern-front-range": ["el-paso","teller","elbert","pueblo","fremont","custer","huerfano","las-animas"],
  "mountain": ["summit","eagle","pitkin","lake","chaffee","park","grand","jackson","routt","gunnison","ouray","san-miguel","san-juan","hinsdale"],
  "western-slope": ["mesa","garfield","delta","montrose","rio-blanco","moffat"],
  "southwest-san-luis": ["la-plata","montezuma","archuleta","dolores","alamosa","conejos","costilla","rio-grande","saguache","mineral"],
  "eastern-plains": ["kit-carson","cheyenne","kiowa","bent","otero","crowley","prowers","baca","lincoln"],
};

// ---- NEW JERSEY 21 ----
const nj = {
  "north-jersey": ["bergen","hudson","essex","passaic","union","morris","sussex","warren"],
  "central-jersey": ["middlesex","somerset","hunterdon","mercer","monmouth"],
  "south-jersey": ["ocean","burlington","camden","gloucester","atlantic","cape-may","cumberland","salem"],
};

// ---- MICHIGAN 83 ----
const mi = {
  "metro-detroit": ["wayne","oakland","macomb","washtenaw","livingston","st-clair","monroe"],
  "west-michigan": ["kent","ottawa","muskegon","allegan","barry","ionia","newaygo","oceana","montcalm"],
  "mid-michigan": ["ingham","eaton","clinton","jackson","calhoun","shiawassee","gratiot","isabella","clare","mecosta"],
  "thumb-saginaw": ["genesee","lapeer","saginaw","bay","midland","tuscola","huron","sanilac","arenac","gladwin"],
  "southwest-mi": ["berrien","cass","van-buren","kalamazoo","st-joseph","branch","hillsdale","lenawee"],
  "northern-lower": ["grand-traverse","leelanau","benzie","manistee","wexford","missaukee","roscommon","osceola","lake","kalkaska","antrim","charlevoix","emmet","cheboygan","otsego","crawford","oscoda","alcona","iosco","ogemaw","alpena","montmorency","presque-isle","ogemaw"],
  "upper-peninsula": ["marquette","houghton","keweenaw","baraga","ontagon","gogebic","iron","dickinson","menominee","delta","schoolcraft","alger","luce","mackinac","chippewa"],
};
// fix typo ontonagon and dedupe northern
mi["northern-lower"] = [...new Set(mi["northern-lower"].map(x => x === "ogemaw" ? "ogemaw" : x))];
// rewrite northern properly
mi["northern-lower"] = ["grand-traverse","leelanau","benzie","manistee","wexford","missaukee","roscommon","osceola","lake","kalkaska","antrim","charlevoix","emmet","cheboygan","otsego","crawford","oscoda","alcona","iosco","ogemaw","alpena","montmorency","presque-isle"];
mi["upper-peninsula"] = ["marquette","houghton","keweenaw","baraga","ontonagon","gogebic","iron","dickinson","menominee","delta","schoolcraft","alger","luce","mackinac","chippewa"];

// ---- TENNESSEE 95 ----
const tn = {
  "nashville-middle": ["davidson","williamson","rutherford","sumner","wilson","robertson","cheatham","dickson","maury","montgomery","trousdale","smith","cannon","dekalb","putnam","white","warren","coffee","bedford","marshall","hickman","perry","humphreys","houston","stewart","lewis","wayne","lawrence","giles","lincoln","moore","franklin","grundy","van-buren","sequatchie","bledsoe","pickett","overton","fentress","jackson","clay","macon"],
  "memphis-west": ["shelby","tipton","fayette","lauderdale","haywood","crockett","dyer","obion","weakley","gibson","carroll","henry","benton","decatur","henderson","chester","hardeman","mcnairy","hardin","madison","lake"],
  "knoxville-east": ["knox","blount","sevier","anderson","roane","loudon","monroe","mcminn","meigs","rhea","cumberland","morgan","scott","campbell","union","claiborne","grainger","jefferson","hamblen","cocke","greene","hawkins","hancock","carter","johnson","unicoi","washington","sullivan","unione"],
};
// fix tennessee - I overstuffed nashville. Let me rebuild carefully.

function validate(name, regions, allSlugs) {
  const seen = new Set();
  let dups = [];
  for (const [k, arr] of Object.entries(regions)) {
    for (const s of arr) {
      if (seen.has(s)) dups.push(s);
      seen.add(s);
    }
  }
  const orphans = allSlugs.filter(s => !seen.has(s));
  const unknown = [...seen].filter(s => !allSlugs.includes(s));
  console.log(name, "assigned", seen.size, "of", allSlugs.length, "dups", dups.length, "orphans", orphans.length, "unknown", unknown.length);
  if (dups.length) console.log("  dups:", dups);
  if (orphans.length) console.log("  orphans:", orphans.join(", "));
  if (unknown.length) console.log("  unknown:", unknown.join(", "));
  return { orphans, dups, unknown, seen };
}

// Rebuild TN carefully
const tnAll = getSlugs("tennessee");
const tnRegions = {
  "nashville-middle": [
    "davidson","williamson","rutherford","sumner","wilson","robertson","cheatham","dickson","maury","montgomery",
    "trousdale","smith","cannon","dekalb","putnam","white","warren","coffee","bedford","marshall",
    "hickman","perry","humphreys","houston","stewart","lewis","wayne","lawrence","giles","lincoln",
    "moore","franklin","macon","jackson","clay","overton","pickett","fentress","grundy","van-buren"
  ],
  "memphis-west": [
    "shelby","tipton","fayette","lauderdale","haywood","crockett","dyer","obion","weakley","gibson",
    "carroll","henry","benton","decatur","henderson","chester","hardeman","mcnairy","hardin","madison","lake"
  ],
  "chattanooga-se": [
    "hamilton","bradley","polk","mcminn","meigs","rhea","sequatchie","bledsoe","marion","grundy"
  ],
  "knoxville-east": [
    "knox","blount","sevier","anderson","roane","loudon","monroe","cumberland","morgan","scott",
    "campbell","union","claiborne","grainger","jefferson","hamblen","cocke"
  ],
  "tri-cities": [
    "sullivan","washington","carter","johnson","unicoi","hawkins","greene","hancock"
  ],
};
// remove grundy from nashville if in chattanooga - keep in chattanooga only
tnRegions["nashville-middle"] = tnRegions["nashville-middle"].filter(x => x !== "grundy");
// mcminn might be both - only se
// Validate CO NJ MI TN first then VA

const regions = { colorado: co, "new-jersey": nj, michigan: mi, tennessee: tnRegions };

// Fill TN rest
let tv = validate("tennessee-pre", tnRegions, tnAll);
tnRegions["rest-tn"] = tv.orphans;
validate("tennessee", tnRegions, tnAll);

// Fix MI - check orphans
const miAll = getSlugs("michigan");
let mv = validate("michigan-pre", mi, miAll);
// add rest if needed
if (mv.orphans.length) {
  mi["rest-mi"] = mv.orphans;
}
validate("michigan", mi, miAll);

validate("colorado", co, getSlugs("colorado"));
validate("new-jersey", nj, getSlugs("new-jersey"));

// ---- VIRGINIA ----
const vaAll = getSlugs("virginia");
const va = {
  "northern-va": [
    "arlington","alexandria","fairfax","falls-church","loudoun","prince-william","manassas","manassas-park",
    "fauquier","clarke","warren","culpeper","stafford","fredericksburg","spotsylvania","king-george",
    "rappahannock","madison","orange","page","shenandoah","frederick","winchester"
  ],
  "richmond-central": [
    "richmond","henrico","chesterfield","hanover","goochland","powhatan","new-kent","charles-city",
    "petersburg","hopewell","colonial-heights","dinwiddie","prince-george","amelia","caroline",
    "louisa","fluvanna","cumberland","buckingham","prince-edward","nottoway","lunenburg","brunswick",
    "mecklenburg","halifax","charlotte","appomattox","amherst","campbell","lynchburg","bedford",
    "nelson","albemarle","charlottesville","greene"
  ],
  "hampton-roads": [
    "virginia-beach","norfolk","chesapeake","portsmouth","suffolk","newport-news","hampton",
    "james-city","williamsburg","york","poquoson","gloucester","mathews","isle-of-wight","southampton",
    "surry","sussex","franklin","emporia","greensville"
  ],
  "southwest-va": [
    "roanoke","salem","botetourt","craig","giles","montgomery","radford","pulaski","floyd","carroll",
    "galax","grayson","smyth","wythe","bland","tazewell","buchanan","dickenson","wise","norton",
    "lee","scott","russell","washington","bristol","patrick","henry","martinsville","pittsylvania",
    "danville","franklin" // wait franklin is hampton roads coastal? Actually Franklin City is SE, Franklin County is SW
  ],
};
// Franklin is duplicate - one city SE, one county SW. We only have one slug "franklin". Put in SW VA as county is larger market for moving geography; actually Hampton Roads often includes Franklin city. Leave in SW and remove from hampton if both - we can only assign once. Put franklin in southwest (Franklin County more rural) and not hampton... Actually coastal Franklin city is small. Keep SW.
// Remove franklin from hampton-roads
va["hampton-roads"] = va["hampton-roads"].filter(x => x !== "franklin");
// Add remaining va cities/counties for SW completion and rest
// Remove duplicate franklin issue - not in hampton

// Fix va southwest - remove franklin from being listed twice in SW already once
va["southwest-va"] = [...new Set(va["southwest-va"])];

// Shenandoah valley extras already in northern
// Add rockingham, harrisonburg, staunton, waynesboro, augusta, rockbridge, lexington, buena-vista, bath, highland, alleghany, covington to a valley region
va["shenandoah-valley"] = [
  "rockingham","harrisonburg","staunton","waynesboro","augusta","rockbridge","lexington","buena-vista",
  "bath","highland","alleghany","covington","botetourt" // botetourt in SW - remove from SW
];
va["southwest-va"] = va["southwest-va"].filter(x => x !== "botetourt");

// Eastern Shore
va["eastern-shore"] = ["accomack","northampton"];

// Northern Neck / Middle Peninsula remainder
// Rest will catch

let vv = validate("virginia-pre", va, vaAll);
va["rest-va"] = vv.orphans;
validate("virginia", va, vaAll);

// Also fix chattanooga grundy - may still orphan? already validated
// Fix MI northern - check for missing counties like "keweenaw" in UP yes

// Fix tennessee chattanooga - mcminn was only in SE; knoxville doesn't have mcminn - good
// grundy only in chattanooga
// sequatchie bledsoe only chattanooga - removed from nashville? nashville doesn't have them - good

// Write final regions - re-validate all
const final = {
  colorado: co,
  virginia: va,
  michigan: mi,
  "new-jersey": nj,
  tennessee: tnRegions,
};

for (const [k,v] of Object.entries(final)) {
  validate(k+"-FINAL", v, getSlugs(k));
}

fs.writeFileSync("scripts/tmp-wave3-regions.json", JSON.stringify(final, null, 2));
console.log("wrote scripts/tmp-wave3-regions.json");
