import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Nebraska curated county corridor links — batch 1 (21 counties) */
const NE_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  douglas: [
    { slug: 'sarpy', name: 'Sarpy', seat: 'Papillion', href: '/local-movers/nebraska/sarpy', displayLabel: 'Sarpy County, NE' },
    { slug: 'washington', name: 'Washington', seat: 'Blair', href: '/local-movers/nebraska/washington', displayLabel: 'Washington County, NE' },
    { slug: 'saunders', name: 'Saunders', seat: 'Wahoo', href: '/local-movers/nebraska/saunders', displayLabel: 'Saunders County, NE' },
    { slug: 'cass', name: 'Cass', seat: 'Plattsmouth', href: '/local-movers/nebraska/cass', displayLabel: 'Cass County, NE' },
    { slug: 'pottawattamie', name: 'Pottawattamie', seat: 'Council Bluffs', href: '/local-movers/iowa/pottawattamie', displayLabel: 'Pottawattamie County, IA' },
  ],
  lancaster: [
    { slug: 'saunders', name: 'Saunders', seat: 'Wahoo', href: '/local-movers/nebraska/saunders', displayLabel: 'Saunders County, NE' },
    { slug: 'seward', name: 'Seward', seat: 'Seward', href: '/local-movers/nebraska/seward', displayLabel: 'Seward County, NE' },
    { slug: 'saline', name: 'Saline', seat: 'Wilber', href: '/local-movers/nebraska/saline', displayLabel: 'Saline County, NE' },
    { slug: 'gage', name: 'Gage', seat: 'Beatrice', href: '/local-movers/nebraska/gage', displayLabel: 'Gage County, NE' },
    { slug: 'otoe', name: 'Otoe', seat: 'Nebraska City', href: '/local-movers/nebraska/otoe', displayLabel: 'Otoe County, NE' },
  ],
  sarpy: [
    { slug: 'douglas', name: 'Douglas', seat: 'Omaha', href: '/local-movers/nebraska/douglas', displayLabel: 'Douglas County, NE' },
    { slug: 'cass', name: 'Cass', seat: 'Plattsmouth', href: '/local-movers/nebraska/cass', displayLabel: 'Cass County, NE' },
    { slug: 'saunders', name: 'Saunders', seat: 'Wahoo', href: '/local-movers/nebraska/saunders', displayLabel: 'Saunders County, NE' },
    { slug: 'pottawattamie', name: 'Pottawattamie', seat: 'Council Bluffs', href: '/local-movers/iowa/pottawattamie', displayLabel: 'Pottawattamie County, IA' },
    { slug: 'mills', name: 'Mills', seat: 'Glenwood', href: '/local-movers/iowa/mills', displayLabel: 'Mills County, IA' },
  ],
  hall: [
    { slug: 'buffalo', name: 'Buffalo', seat: 'Kearney', href: '/local-movers/nebraska/buffalo', displayLabel: 'Buffalo County, NE' },
    { slug: 'adams', name: 'Adams', seat: 'Hastings', href: '/local-movers/nebraska/adams', displayLabel: 'Adams County, NE' },
    { slug: 'dawson', name: 'Dawson', seat: 'Lexington', href: '/local-movers/nebraska/dawson', displayLabel: 'Dawson County, NE' },
    { slug: 'hamilton', name: 'Hamilton', seat: 'Aurora', href: '/local-movers/nebraska/hamilton', displayLabel: 'Hamilton County, NE' },
    { slug: 'merrick', name: 'Merrick', seat: 'Central City', href: '/local-movers/nebraska/merrick', displayLabel: 'Merrick County, NE' },
  ],
  buffalo: [
    { slug: 'hall', name: 'Hall', seat: 'Grand Island', href: '/local-movers/nebraska/hall', displayLabel: 'Hall County, NE' },
    { slug: 'dawson', name: 'Dawson', seat: 'Lexington', href: '/local-movers/nebraska/dawson', displayLabel: 'Dawson County, NE' },
    { slug: 'lincoln', name: 'Lincoln', seat: 'North Platte', href: '/local-movers/nebraska/lincoln', displayLabel: 'Lincoln County, NE' },
    { slug: 'adams', name: 'Adams', seat: 'Hastings', href: '/local-movers/nebraska/adams', displayLabel: 'Adams County, NE' },
    { slug: 'phelps', name: 'Phelps', seat: 'Holdrege', href: '/local-movers/nebraska/phelps', displayLabel: 'Phelps County, NE' },
  ],
  dodge: [
    { slug: 'douglas', name: 'Douglas', seat: 'Omaha', href: '/local-movers/nebraska/douglas', displayLabel: 'Douglas County, NE' },
    { slug: 'saunders', name: 'Saunders', seat: 'Wahoo', href: '/local-movers/nebraska/saunders', displayLabel: 'Saunders County, NE' },
    { slug: 'washington', name: 'Washington', seat: 'Blair', href: '/local-movers/nebraska/washington', displayLabel: 'Washington County, NE' },
    { slug: 'colfax', name: 'Colfax', seat: 'Schuyler', href: '/local-movers/nebraska/colfax', displayLabel: 'Colfax County, NE' },
    { slug: 'cuming', name: 'Cuming', seat: 'West Point', href: '/local-movers/nebraska/cuming', displayLabel: 'Cuming County, NE' },
  ],
  madison: [
    { slug: 'platte', name: 'Platte', seat: 'Columbus', href: '/local-movers/nebraska/platte', displayLabel: 'Platte County, NE' },
    { slug: 'dakota', name: 'Dakota', seat: 'Dakota City', href: '/local-movers/nebraska/dakota', displayLabel: 'Dakota County, NE' },
    { slug: 'pierce', name: 'Pierce', seat: 'Pierce', href: '/local-movers/nebraska/pierce', displayLabel: 'Pierce County, NE' },
    { slug: 'wayne', name: 'Wayne', seat: 'Wayne', href: '/local-movers/nebraska/wayne', displayLabel: 'Wayne County, NE' },
    { slug: 'antelope', name: 'Antelope', seat: 'Neligh', href: '/local-movers/nebraska/antelope', displayLabel: 'Antelope County, NE' },
  ],
  platte: [
    { slug: 'madison', name: 'Madison', seat: 'Norfolk', href: '/local-movers/nebraska/madison', displayLabel: 'Madison County, NE' },
    { slug: 'hall', name: 'Hall', seat: 'Grand Island', href: '/local-movers/nebraska/hall', displayLabel: 'Hall County, NE' },
    { slug: 'colfax', name: 'Colfax', seat: 'Schuyler', href: '/local-movers/nebraska/colfax', displayLabel: 'Colfax County, NE' },
    { slug: 'merrick', name: 'Merrick', seat: 'Central City', href: '/local-movers/nebraska/merrick', displayLabel: 'Merrick County, NE' },
    { slug: 'polk', name: 'Polk', seat: 'Osceola', href: '/local-movers/nebraska/polk', displayLabel: 'Polk County, NE' },
  ],
  'scotts-bluff': [
    { slug: 'banner', name: 'Banner', seat: 'Harrisburg', href: '/local-movers/nebraska/banner', displayLabel: 'Banner County, NE' },
    { slug: 'sioux', name: 'Sioux', seat: 'Harrison', href: '/local-movers/nebraska/sioux', displayLabel: 'Sioux County, NE' },
    { slug: 'box-butte', name: 'Box Butte', seat: 'Alliance', href: '/local-movers/nebraska/box-butte', displayLabel: 'Box Butte County, NE' },
    { slug: 'morrill', name: 'Morrill', seat: 'Bridgeport', href: '/local-movers/nebraska/morrill', displayLabel: 'Morrill County, NE' },
    { slug: 'garden', name: 'Garden', seat: 'Oshkosh', href: '/local-movers/nebraska/garden', displayLabel: 'Garden County, NE' },
  ],
  lincoln: [
    { slug: 'buffalo', name: 'Buffalo', seat: 'Kearney', href: '/local-movers/nebraska/buffalo', displayLabel: 'Buffalo County, NE' },
    { slug: 'dawson', name: 'Dawson', seat: 'Lexington', href: '/local-movers/nebraska/dawson', displayLabel: 'Dawson County, NE' },
    { slug: 'mcpherson', name: 'McPherson', seat: 'Tryon', href: '/local-movers/nebraska/mcpherson', displayLabel: 'McPherson County, NE' },
    { slug: 'logan', name: 'Logan', seat: 'Stapleton', href: '/local-movers/nebraska/logan', displayLabel: 'Logan County, NE' },
    { slug: 'custer', name: 'Custer', seat: 'Broken Bow', href: '/local-movers/nebraska/custer', displayLabel: 'Custer County, NE' },
  ],
  adams: [
    { slug: 'hall', name: 'Hall', seat: 'Grand Island', href: '/local-movers/nebraska/hall', displayLabel: 'Hall County, NE' },
    { slug: 'buffalo', name: 'Buffalo', seat: 'Kearney', href: '/local-movers/nebraska/buffalo', displayLabel: 'Buffalo County, NE' },
    { slug: 'york', name: 'York', seat: 'York', href: '/local-movers/nebraska/york', displayLabel: 'York County, NE' },
    { slug: 'clay', name: 'Clay', seat: 'Clay Center', href: '/local-movers/nebraska/clay', displayLabel: 'Clay County, NE' },
    { slug: 'fillmore', name: 'Fillmore', seat: 'Geneva', href: '/local-movers/nebraska/fillmore', displayLabel: 'Fillmore County, NE' },
  ],
  cass: [
    { slug: 'sarpy', name: 'Sarpy', seat: 'Papillion', href: '/local-movers/nebraska/sarpy', displayLabel: 'Sarpy County, NE' },
    { slug: 'douglas', name: 'Douglas', seat: 'Omaha', href: '/local-movers/nebraska/douglas', displayLabel: 'Douglas County, NE' },
    { slug: 'saunders', name: 'Saunders', seat: 'Wahoo', href: '/local-movers/nebraska/saunders', displayLabel: 'Saunders County, NE' },
    { slug: 'mills', name: 'Mills', seat: 'Glenwood', href: '/local-movers/iowa/mills', displayLabel: 'Mills County, IA' },
    { slug: 'pottawattamie', name: 'Pottawattamie', seat: 'Council Bluffs', href: '/local-movers/iowa/pottawattamie', displayLabel: 'Pottawattamie County, IA' },
  ],
  dawson: [
    { slug: 'hall', name: 'Hall', seat: 'Grand Island', href: '/local-movers/nebraska/hall', displayLabel: 'Hall County, NE' },
    { slug: 'buffalo', name: 'Buffalo', seat: 'Kearney', href: '/local-movers/nebraska/buffalo', displayLabel: 'Buffalo County, NE' },
    { slug: 'lincoln', name: 'Lincoln', seat: 'North Platte', href: '/local-movers/nebraska/lincoln', displayLabel: 'Lincoln County, NE' },
    { slug: 'gosper', name: 'Gosper', seat: 'Elwood', href: '/local-movers/nebraska/gosper', displayLabel: 'Gosper County, NE' },
    { slug: 'phelps', name: 'Phelps', seat: 'Holdrege', href: '/local-movers/nebraska/phelps', displayLabel: 'Phelps County, NE' },
  ],
  saunders: [
    { slug: 'douglas', name: 'Douglas', seat: 'Omaha', href: '/local-movers/nebraska/douglas', displayLabel: 'Douglas County, NE' },
    { slug: 'lancaster', name: 'Lancaster', seat: 'Lincoln', href: '/local-movers/nebraska/lancaster', displayLabel: 'Lancaster County, NE' },
    { slug: 'sarpy', name: 'Sarpy', seat: 'Papillion', href: '/local-movers/nebraska/sarpy', displayLabel: 'Sarpy County, NE' },
    { slug: 'cass', name: 'Cass', seat: 'Plattsmouth', href: '/local-movers/nebraska/cass', displayLabel: 'Cass County, NE' },
    { slug: 'dodge', name: 'Dodge', seat: 'Fremont', href: '/local-movers/nebraska/dodge', displayLabel: 'Dodge County, NE' },
  ],
  dakota: [
    { slug: 'madison', name: 'Madison', seat: 'Norfolk', href: '/local-movers/nebraska/madison', displayLabel: 'Madison County, NE' },
    { slug: 'dixon', name: 'Dixon', seat: 'Ponca', href: '/local-movers/nebraska/dixon', displayLabel: 'Dixon County, NE' },
    { slug: 'thurston', name: 'Thurston', seat: 'Pender', href: '/local-movers/nebraska/thurston', displayLabel: 'Thurston County, NE' },
    { slug: 'wayne', name: 'Wayne', seat: 'Wayne', href: '/local-movers/nebraska/wayne', displayLabel: 'Wayne County, NE' },
    { slug: 'woodbury', name: 'Woodbury', seat: 'Sioux City', href: '/local-movers/iowa/woodbury', displayLabel: 'Woodbury County, IA' },
  ],
  gage: [
    { slug: 'lancaster', name: 'Lancaster', seat: 'Lincoln', href: '/local-movers/nebraska/lancaster', displayLabel: 'Lancaster County, NE' },
    { slug: 'saline', name: 'Saline', seat: 'Wilber', href: '/local-movers/nebraska/saline', displayLabel: 'Saline County, NE' },
    { slug: 'otoe', name: 'Otoe', seat: 'Nebraska City', href: '/local-movers/nebraska/otoe', displayLabel: 'Otoe County, NE' },
    { slug: 'jefferson', name: 'Jefferson', seat: 'Fairbury', href: '/local-movers/nebraska/jefferson', displayLabel: 'Jefferson County, NE' },
    { slug: 'thayer', name: 'Thayer', seat: 'Hebron', href: '/local-movers/nebraska/thayer', displayLabel: 'Thayer County, NE' },
  ],
  washington: [
    { slug: 'douglas', name: 'Douglas', seat: 'Omaha', href: '/local-movers/nebraska/douglas', displayLabel: 'Douglas County, NE' },
    { slug: 'dodge', name: 'Dodge', seat: 'Fremont', href: '/local-movers/nebraska/dodge', displayLabel: 'Dodge County, NE' },
    { slug: 'saunders', name: 'Saunders', seat: 'Wahoo', href: '/local-movers/nebraska/saunders', displayLabel: 'Saunders County, NE' },
    { slug: 'burt', name: 'Burt', seat: 'Tekamah', href: '/local-movers/nebraska/burt', displayLabel: 'Burt County, NE' },
    { slug: 'thurston', name: 'Thurston', seat: 'Pender', href: '/local-movers/nebraska/thurston', displayLabel: 'Thurston County, NE' },
  ],
  seward: [
    { slug: 'lancaster', name: 'Lancaster', seat: 'Lincoln', href: '/local-movers/nebraska/lancaster', displayLabel: 'Lancaster County, NE' },
    { slug: 'saunders', name: 'Saunders', seat: 'Wahoo', href: '/local-movers/nebraska/saunders', displayLabel: 'Saunders County, NE' },
    { slug: 'york', name: 'York', seat: 'York', href: '/local-movers/nebraska/york', displayLabel: 'York County, NE' },
    { slug: 'fillmore', name: 'Fillmore', seat: 'Geneva', href: '/local-movers/nebraska/fillmore', displayLabel: 'Fillmore County, NE' },
    { slug: 'butler', name: 'Butler', seat: 'David City', href: '/local-movers/nebraska/butler', displayLabel: 'Butler County, NE' },
  ],
  otoe: [
    { slug: 'cass', name: 'Cass', seat: 'Plattsmouth', href: '/local-movers/nebraska/cass', displayLabel: 'Cass County, NE' },
    { slug: 'lancaster', name: 'Lancaster', seat: 'Lincoln', href: '/local-movers/nebraska/lancaster', displayLabel: 'Lancaster County, NE' },
    { slug: 'gage', name: 'Gage', seat: 'Beatrice', href: '/local-movers/nebraska/gage', displayLabel: 'Gage County, NE' },
    { slug: 'johnson', name: 'Johnson', seat: 'Tecumseh', href: '/local-movers/nebraska/johnson', displayLabel: 'Johnson County, NE' },
    { slug: 'nemaha', name: 'Nemaha', seat: 'Auburn', href: '/local-movers/nebraska/nemaha', displayLabel: 'Nemaha County, NE' },
  ],
  saline: [
    { slug: 'lancaster', name: 'Lancaster', seat: 'Lincoln', href: '/local-movers/nebraska/lancaster', displayLabel: 'Lancaster County, NE' },
    { slug: 'gage', name: 'Gage', seat: 'Beatrice', href: '/local-movers/nebraska/gage', displayLabel: 'Gage County, NE' },
    { slug: 'jefferson', name: 'Jefferson', seat: 'Fairbury', href: '/local-movers/nebraska/jefferson', displayLabel: 'Jefferson County, NE' },
    { slug: 'fillmore', name: 'Fillmore', seat: 'Geneva', href: '/local-movers/nebraska/fillmore', displayLabel: 'Fillmore County, NE' },
    { slug: 'thayer', name: 'Thayer', seat: 'Hebron', href: '/local-movers/nebraska/thayer', displayLabel: 'Thayer County, NE' },
  ],
  york: [
    { slug: 'hall', name: 'Hall', seat: 'Grand Island', href: '/local-movers/nebraska/hall', displayLabel: 'Hall County, NE' },
    { slug: 'seward', name: 'Seward', seat: 'Seward', href: '/local-movers/nebraska/seward', displayLabel: 'Seward County, NE' },
    { slug: 'adams', name: 'Adams', seat: 'Hastings', href: '/local-movers/nebraska/adams', displayLabel: 'Adams County, NE' },
    { slug: 'fillmore', name: 'Fillmore', seat: 'Geneva', href: '/local-movers/nebraska/fillmore', displayLabel: 'Fillmore County, NE' },
    { slug: 'hamilton', name: 'Hamilton', seat: 'Aurora', href: '/local-movers/nebraska/hamilton', displayLabel: 'Hamilton County, NE' },
  ],
};

export function getNebraskaNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return NE_COUNTY_NEIGHBORS[countySlug] ?? [];
}
