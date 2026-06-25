import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Iowa curated county corridor links — batch 1: 21 counties */
const IA_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  polk: [
    { slug: 'dallas', name: 'Dallas', seat: 'Adel', href: '/local-movers/iowa/dallas', displayLabel: 'Dallas County, IA' },
    { slug: 'warren', name: 'Warren', seat: 'Indianola', href: '/local-movers/iowa/warren', displayLabel: 'Warren County, IA' },
    { slug: 'jasper', name: 'Jasper', seat: 'Newton', href: '/local-movers/iowa/jasper', displayLabel: 'Jasper County, IA' },
    { slug: 'story', name: 'Story', seat: 'Nevada', href: '/local-movers/iowa/story', displayLabel: 'Story County, IA' },
    { slug: 'boone', name: 'Boone', seat: 'Boone', href: '/local-movers/iowa/boone', displayLabel: 'Boone County, IA' },
  ],
  linn: [
    { slug: 'benton', name: 'Benton', seat: 'Vinton', href: '/local-movers/iowa/benton', displayLabel: 'Benton County, IA' },
    { slug: 'johnson', name: 'Johnson', seat: 'Iowa City', href: '/local-movers/iowa/johnson', displayLabel: 'Johnson County, IA' },
    { slug: 'jones', name: 'Jones', seat: 'Anamosa', href: '/local-movers/iowa/jones', displayLabel: 'Jones County, IA' },
    { slug: 'cedar', name: 'Cedar', seat: 'Tipton', href: '/local-movers/iowa/cedar', displayLabel: 'Cedar County, IA' },
    { slug: 'delaware', name: 'Delaware', seat: 'Manchester', href: '/local-movers/iowa/delaware', displayLabel: 'Delaware County, IA' },
  ],
  scott: [
    { slug: 'clinton', name: 'Clinton', seat: 'Clinton', href: '/local-movers/iowa/clinton', displayLabel: 'Clinton County, IA' },
    { slug: 'cedar', name: 'Cedar', seat: 'Tipton', href: '/local-movers/iowa/cedar', displayLabel: 'Cedar County, IA' },
    { slug: 'muscatine', name: 'Muscatine', seat: 'Muscatine', href: '/local-movers/iowa/muscatine', displayLabel: 'Muscatine County, IA' },
    { slug: 'jackson', name: 'Jackson', seat: 'Maquoketa', href: '/local-movers/iowa/jackson', displayLabel: 'Jackson County, IA' },
    { slug: 'rock-island', name: 'Rock Island', seat: 'Rock Island', href: '/local-movers/illinois/rock-island', displayLabel: 'Rock Island County, IL' },
  ],
  johnson: [
    { slug: 'linn', name: 'Linn', seat: 'Cedar Rapids', href: '/local-movers/iowa/linn', displayLabel: 'Linn County, IA' },
    { slug: 'washington', name: 'Washington', seat: 'Washington', href: '/local-movers/iowa/washington', displayLabel: 'Washington County, IA' },
    { slug: 'iowa', name: 'Iowa', seat: 'Marengo', href: '/local-movers/iowa/iowa', displayLabel: 'Iowa County, IA' },
    { slug: 'keokuk', name: 'Keokuk', seat: 'Sigourney', href: '/local-movers/iowa/keokuk', displayLabel: 'Keokuk County, IA' },
    { slug: 'cedar', name: 'Cedar', seat: 'Tipton', href: '/local-movers/iowa/cedar', displayLabel: 'Cedar County, IA' },
  ],
  'black-hawk': [
    { slug: 'bremer', name: 'Bremer', seat: 'Waverly', href: '/local-movers/iowa/bremer', displayLabel: 'Bremer County, IA' },
    { slug: 'grundy', name: 'Grundy', seat: 'Grundy Center', href: '/local-movers/iowa/grundy', displayLabel: 'Grundy County, IA' },
    { slug: 'butler', name: 'Butler', seat: 'Allison', href: '/local-movers/iowa/butler', displayLabel: 'Butler County, IA' },
    { slug: 'franklin', name: 'Franklin', seat: 'Hampton', href: '/local-movers/iowa/franklin', displayLabel: 'Franklin County, IA' },
    { slug: 'benton', name: 'Benton', seat: 'Vinton', href: '/local-movers/iowa/benton', displayLabel: 'Benton County, IA' },
  ],
  dallas: [
    { slug: 'polk', name: 'Polk', seat: 'Des Moines', href: '/local-movers/iowa/polk', displayLabel: 'Polk County, IA' },
    { slug: 'warren', name: 'Warren', seat: 'Indianola', href: '/local-movers/iowa/warren', displayLabel: 'Warren County, IA' },
    { slug: 'madison', name: 'Madison', seat: 'Winterset', href: '/local-movers/iowa/madison', displayLabel: 'Madison County, IA' },
    { slug: 'guthrie', name: 'Guthrie', seat: 'Guthrie Center', href: '/local-movers/iowa/guthrie', displayLabel: 'Guthrie County, IA' },
    { slug: 'adair', name: 'Adair', seat: 'Greenfield', href: '/local-movers/iowa/adair', displayLabel: 'Adair County, IA' },
  ],
  woodbury: [
    { slug: 'plymouth', name: 'Plymouth', seat: 'Le Mars', href: '/local-movers/iowa/plymouth', displayLabel: 'Plymouth County, IA' },
    { slug: 'sioux', name: 'Sioux', seat: 'Orange City', href: '/local-movers/iowa/sioux', displayLabel: 'Sioux County, IA' },
    { slug: 'cherokee', name: 'Cherokee', seat: 'Cherokee', href: '/local-movers/iowa/cherokee', displayLabel: 'Cherokee County, IA' },
    { slug: 'dakota', name: 'Dakota', seat: 'Dakota City', href: '/local-movers/nebraska/dakota', displayLabel: 'Dakota County, NE' },
    { slug: 'union', name: 'Union', seat: 'Elk Point', href: '/local-movers/south-dakota/union', displayLabel: 'Union County, SD' },
  ],
  story: [
    { slug: 'polk', name: 'Polk', seat: 'Des Moines', href: '/local-movers/iowa/polk', displayLabel: 'Polk County, IA' },
    { slug: 'marshall', name: 'Marshall', seat: 'Marshalltown', href: '/local-movers/iowa/marshall', displayLabel: 'Marshall County, IA' },
    { slug: 'boone', name: 'Boone', seat: 'Boone', href: '/local-movers/iowa/boone', displayLabel: 'Boone County, IA' },
    { slug: 'hamilton', name: 'Hamilton', seat: 'Webster City', href: '/local-movers/iowa/hamilton', displayLabel: 'Hamilton County, IA' },
    { slug: 'hardin', name: 'Hardin', seat: 'Eldora', href: '/local-movers/iowa/hardin', displayLabel: 'Hardin County, IA' },
  ],
  dubuque: [
    { slug: 'clayton', name: 'Clayton', seat: 'Elkader', href: '/local-movers/iowa/clayton', displayLabel: 'Clayton County, IA' },
    { slug: 'delaware', name: 'Delaware', seat: 'Manchester', href: '/local-movers/iowa/delaware', displayLabel: 'Delaware County, IA' },
    { slug: 'jackson', name: 'Jackson', seat: 'Maquoketa', href: '/local-movers/iowa/jackson', displayLabel: 'Jackson County, IA' },
    { slug: 'grant', name: 'Grant', seat: 'Lancaster', href: '/local-movers/wisconsin/grant', displayLabel: 'Grant County, WI' },
    { slug: 'jo-daviess', name: 'Jo Daviess', seat: 'Galena', href: '/local-movers/illinois/jo-daviess', displayLabel: 'Jo Daviess County, IL' },
  ],
  pottawattamie: [
    { slug: 'harrison', name: 'Harrison', seat: 'Logan', href: '/local-movers/iowa/harrison', displayLabel: 'Harrison County, IA' },
    { slug: 'mills', name: 'Mills', seat: 'Glenwood', href: '/local-movers/iowa/mills', displayLabel: 'Mills County, IA' },
    { slug: 'montgomery', name: 'Montgomery', seat: 'Red Oak', href: '/local-movers/iowa/montgomery', displayLabel: 'Montgomery County, IA' },
    { slug: 'douglas', name: 'Douglas', seat: 'Omaha', href: '/local-movers/nebraska/douglas', displayLabel: 'Douglas County, NE' },
    { slug: 'sarpy', name: 'Sarpy', seat: 'Papillion', href: '/local-movers/nebraska/sarpy', displayLabel: 'Sarpy County, NE' },
  ],
  warren: [
    { slug: 'polk', name: 'Polk', seat: 'Des Moines', href: '/local-movers/iowa/polk', displayLabel: 'Polk County, IA' },
    { slug: 'marion', name: 'Marion', seat: 'Knoxville', href: '/local-movers/iowa/marion', displayLabel: 'Marion County, IA' },
    { slug: 'jasper', name: 'Jasper', seat: 'Newton', href: '/local-movers/iowa/jasper', displayLabel: 'Jasper County, IA' },
    { slug: 'madison', name: 'Madison', seat: 'Winterset', href: '/local-movers/iowa/madison', displayLabel: 'Madison County, IA' },
    { slug: 'lucas', name: 'Lucas', seat: 'Chariton', href: '/local-movers/iowa/lucas', displayLabel: 'Lucas County, IA' },
  ],
  clinton: [
    { slug: 'scott', name: 'Scott', seat: 'Davenport', href: '/local-movers/iowa/scott', displayLabel: 'Scott County, IA' },
    { slug: 'cedar', name: 'Cedar', seat: 'Tipton', href: '/local-movers/iowa/cedar', displayLabel: 'Cedar County, IA' },
    { slug: 'jackson', name: 'Jackson', seat: 'Maquoketa', href: '/local-movers/iowa/jackson', displayLabel: 'Jackson County, IA' },
    { slug: 'rock-island', name: 'Rock Island', seat: 'Rock Island', href: '/local-movers/illinois/rock-island', displayLabel: 'Rock Island County, IL' },
  ],
  'cerro-gordo': [
    { slug: 'floyd', name: 'Floyd', seat: 'Charles City', href: '/local-movers/iowa/floyd', displayLabel: 'Floyd County, IA' },
    { slug: 'franklin', name: 'Franklin', seat: 'Hampton', href: '/local-movers/iowa/franklin', displayLabel: 'Franklin County, IA' },
    { slug: 'hancock', name: 'Hancock', seat: 'Garner', href: '/local-movers/iowa/hancock', displayLabel: 'Hancock County, IA' },
    { slug: 'mitchell', name: 'Mitchell', seat: 'Osage', href: '/local-movers/iowa/mitchell', displayLabel: 'Mitchell County, IA' },
    { slug: 'worth', name: 'Worth', seat: 'Northwood', href: '/local-movers/iowa/worth', displayLabel: 'Worth County, IA' },
  ],
  muscatine: [
    { slug: 'scott', name: 'Scott', seat: 'Davenport', href: '/local-movers/iowa/scott', displayLabel: 'Scott County, IA' },
    { slug: 'johnson', name: 'Johnson', seat: 'Iowa City', href: '/local-movers/iowa/johnson', displayLabel: 'Johnson County, IA' },
    { slug: 'louisa', name: 'Louisa', seat: 'Wapello', href: '/local-movers/iowa/louisa', displayLabel: 'Louisa County, IA' },
    { slug: 'cedar', name: 'Cedar', seat: 'Tipton', href: '/local-movers/iowa/cedar', displayLabel: 'Cedar County, IA' },
  ],
  marshall: [
    { slug: 'story', name: 'Story', seat: 'Nevada', href: '/local-movers/iowa/story', displayLabel: 'Story County, IA' },
    { slug: 'jasper', name: 'Jasper', seat: 'Newton', href: '/local-movers/iowa/jasper', displayLabel: 'Jasper County, IA' },
    { slug: 'tama', name: 'Tama', seat: 'Toledo', href: '/local-movers/iowa/tama', displayLabel: 'Tama County, IA' },
    { slug: 'poweshiek', name: 'Poweshiek', seat: 'Montezuma', href: '/local-movers/iowa/poweshiek', displayLabel: 'Poweshiek County, IA' },
    { slug: 'hardin', name: 'Hardin', seat: 'Eldora', href: '/local-movers/iowa/hardin', displayLabel: 'Hardin County, IA' },
  ],
  jasper: [
    { slug: 'polk', name: 'Polk', seat: 'Des Moines', href: '/local-movers/iowa/polk', displayLabel: 'Polk County, IA' },
    { slug: 'marion', name: 'Marion', seat: 'Knoxville', href: '/local-movers/iowa/marion', displayLabel: 'Marion County, IA' },
    { slug: 'mahaska', name: 'Mahaska', seat: 'Oskaloosa', href: '/local-movers/iowa/mahaska', displayLabel: 'Mahaska County, IA' },
    { slug: 'poweshiek', name: 'Poweshiek', seat: 'Montezuma', href: '/local-movers/iowa/poweshiek', displayLabel: 'Poweshiek County, IA' },
    { slug: 'story', name: 'Story', seat: 'Nevada', href: '/local-movers/iowa/story', displayLabel: 'Story County, IA' },
  ],
  'des-moines': [
    { slug: 'henry', name: 'Henry', seat: 'Mount Pleasant', href: '/local-movers/iowa/henry', displayLabel: 'Henry County, IA' },
    { slug: 'lee', name: 'Lee', seat: 'Fort Madison', href: '/local-movers/iowa/lee', displayLabel: 'Lee County, IA' },
    { slug: 'louisa', name: 'Louisa', seat: 'Wapello', href: '/local-movers/iowa/louisa', displayLabel: 'Louisa County, IA' },
    { slug: 'van-buren', name: 'Van Buren', seat: 'Keosauqua', href: '/local-movers/iowa/van-buren', displayLabel: 'Van Buren County, IA' },
    { slug: 'rock-island', name: 'Rock Island', seat: 'Rock Island', href: '/local-movers/illinois/rock-island', displayLabel: 'Rock Island County, IL' },
  ],
  webster: [
    { slug: 'calhoun', name: 'Calhoun', seat: 'Rockwell City', href: '/local-movers/iowa/calhoun', displayLabel: 'Calhoun County, IA' },
    { slug: 'hamilton', name: 'Hamilton', seat: 'Webster City', href: '/local-movers/iowa/hamilton', displayLabel: 'Hamilton County, IA' },
    { slug: 'humboldt', name: 'Humboldt', seat: 'Dakota City', href: '/local-movers/iowa/humboldt', displayLabel: 'Humboldt County, IA' },
    { slug: 'pocahontas', name: 'Pocahontas', seat: 'Pocahontas', href: '/local-movers/iowa/pocahontas', displayLabel: 'Pocahontas County, IA' },
    { slug: 'wright', name: 'Wright', seat: 'Clarion', href: '/local-movers/iowa/wright', displayLabel: 'Wright County, IA' },
  ],
  sioux: [
    { slug: 'lyon', name: 'Lyon', seat: 'Rock Rapids', href: '/local-movers/iowa/lyon', displayLabel: 'Lyon County, IA' },
    { slug: 'obrien', name: "O'Brien", seat: 'Primghar', href: '/local-movers/iowa/obrien', displayLabel: "O'Brien County, IA" },
    { slug: 'plymouth', name: 'Plymouth', seat: 'Le Mars', href: '/local-movers/iowa/plymouth', displayLabel: 'Plymouth County, IA' },
    { slug: 'union', name: 'Union', seat: 'Elk Point', href: '/local-movers/south-dakota/union', displayLabel: 'Union County, SD' },
  ],
  wapello: [
    { slug: 'appanoose', name: 'Appanoose', seat: 'Centerville', href: '/local-movers/iowa/appanoose', displayLabel: 'Appanoose County, IA' },
    { slug: 'davis', name: 'Davis', seat: 'Bloomfield', href: '/local-movers/iowa/davis', displayLabel: 'Davis County, IA' },
    { slug: 'jefferson', name: 'Jefferson', seat: 'Fairfield', href: '/local-movers/iowa/jefferson', displayLabel: 'Jefferson County, IA' },
    { slug: 'keokuk', name: 'Keokuk', seat: 'Sigourney', href: '/local-movers/iowa/keokuk', displayLabel: 'Keokuk County, IA' },
    { slug: 'mahaska', name: 'Mahaska', seat: 'Oskaloosa', href: '/local-movers/iowa/mahaska', displayLabel: 'Mahaska County, IA' },
  ],
  marion: [
    { slug: 'jasper', name: 'Jasper', seat: 'Newton', href: '/local-movers/iowa/jasper', displayLabel: 'Jasper County, IA' },
    { slug: 'mahaska', name: 'Mahaska', seat: 'Oskaloosa', href: '/local-movers/iowa/mahaska', displayLabel: 'Mahaska County, IA' },
    { slug: 'monroe', name: 'Monroe', seat: 'Albia', href: '/local-movers/iowa/monroe', displayLabel: 'Monroe County, IA' },
    { slug: 'warren', name: 'Warren', seat: 'Indianola', href: '/local-movers/iowa/warren', displayLabel: 'Warren County, IA' },
  ],
};

export function getIowaNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return IA_COUNTY_NEIGHBORS[countySlug] ?? [];
}
