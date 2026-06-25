import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Wyoming curated county corridor links — 23/23 */
const WY_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  laramie: [
    { slug: 'albany', name: 'Albany', seat: 'Laramie', href: '/local-movers/wyoming/albany', displayLabel: 'Albany County, WY' },
    { slug: 'goshen', name: 'Goshen', seat: 'Torrington', href: '/local-movers/wyoming/goshen', displayLabel: 'Goshen County, WY' },
    { slug: 'platte', name: 'Platte', seat: 'Wheatland', href: '/local-movers/wyoming/platte', displayLabel: 'Platte County, WY' },
    { slug: 'larimer', name: 'Larimer', seat: 'Fort Collins', href: '/local-movers/colorado/larimer', displayLabel: 'Larimer County, CO' },
    { slug: 'weld', name: 'Weld', seat: 'Greeley', href: '/local-movers/colorado/weld', displayLabel: 'Weld County, CO' },
  ],
  natrona: [
    { slug: 'carbon', name: 'Carbon', seat: 'Rawlins', href: '/local-movers/wyoming/carbon', displayLabel: 'Carbon County, WY' },
    { slug: 'converse', name: 'Converse', seat: 'Douglas', href: '/local-movers/wyoming/converse', displayLabel: 'Converse County, WY' },
    { slug: 'fremont', name: 'Fremont', seat: 'Lander', href: '/local-movers/wyoming/fremont', displayLabel: 'Fremont County, WY' },
    { slug: 'johnson', name: 'Johnson', seat: 'Buffalo', href: '/local-movers/wyoming/johnson', displayLabel: 'Johnson County, WY' },
    { slug: 'washakie', name: 'Washakie', seat: 'Worland', href: '/local-movers/wyoming/washakie', displayLabel: 'Washakie County, WY' },
  ],
  campbell: [
    { slug: 'converse', name: 'Converse', seat: 'Douglas', href: '/local-movers/wyoming/converse', displayLabel: 'Converse County, WY' },
    { slug: 'crook', name: 'Crook', seat: 'Sundance', href: '/local-movers/wyoming/crook', displayLabel: 'Crook County, WY' },
    { slug: 'johnson', name: 'Johnson', seat: 'Buffalo', href: '/local-movers/wyoming/johnson', displayLabel: 'Johnson County, WY' },
    { slug: 'sheridan', name: 'Sheridan', seat: 'Sheridan', href: '/local-movers/wyoming/sheridan', displayLabel: 'Sheridan County, WY' },
    { slug: 'powder-river', name: 'Powder River', seat: 'Broadus', href: '/local-movers/montana/powder-river', displayLabel: 'Powder River County, MT' },
  ],
  sweetwater: [
    { slug: 'carbon', name: 'Carbon', seat: 'Rawlins', href: '/local-movers/wyoming/carbon', displayLabel: 'Carbon County, WY' },
    { slug: 'fremont', name: 'Fremont', seat: 'Lander', href: '/local-movers/wyoming/fremont', displayLabel: 'Fremont County, WY' },
    { slug: 'lincoln', name: 'Lincoln', seat: 'Kemmerer', href: '/local-movers/wyoming/lincoln', displayLabel: 'Lincoln County, WY' },
    { slug: 'sublette', name: 'Sublette', seat: 'Pinedale', href: '/local-movers/wyoming/sublette', displayLabel: 'Sublette County, WY' },
    { slug: 'summit', name: 'Summit', seat: 'Coalville', href: '/local-movers/utah/summit', displayLabel: 'Summit County, UT' },
  ],
  fremont: [
    { slug: 'carbon', name: 'Carbon', seat: 'Rawlins', href: '/local-movers/wyoming/carbon', displayLabel: 'Carbon County, WY' },
    { slug: 'hot-springs', name: 'Hot Springs', seat: 'Thermopolis', href: '/local-movers/wyoming/hot-springs', displayLabel: 'Hot Springs County, WY' },
    { slug: 'natrona', name: 'Natrona', seat: 'Casper', href: '/local-movers/wyoming/natrona', displayLabel: 'Natrona County, WY' },
    { slug: 'park', name: 'Park', seat: 'Cody', href: '/local-movers/wyoming/park', displayLabel: 'Park County, WY' },
    { slug: 'sublette', name: 'Sublette', seat: 'Pinedale', href: '/local-movers/wyoming/sublette', displayLabel: 'Sublette County, WY' },
  ],
  albany: [
    { slug: 'carbon', name: 'Carbon', seat: 'Rawlins', href: '/local-movers/wyoming/carbon', displayLabel: 'Carbon County, WY' },
    { slug: 'converse', name: 'Converse', seat: 'Douglas', href: '/local-movers/wyoming/converse', displayLabel: 'Converse County, WY' },
    { slug: 'laramie', name: 'Laramie', seat: 'Cheyenne', href: '/local-movers/wyoming/laramie', displayLabel: 'Laramie County, WY' },
    { slug: 'platte', name: 'Platte', seat: 'Wheatland', href: '/local-movers/wyoming/platte', displayLabel: 'Platte County, WY' },
    { slug: 'larimer', name: 'Larimer', seat: 'Fort Collins', href: '/local-movers/colorado/larimer', displayLabel: 'Larimer County, CO' },
  ],
  sheridan: [
    { slug: 'big-horn', name: 'Big Horn', seat: 'Basin', href: '/local-movers/wyoming/big-horn', displayLabel: 'Big Horn County, WY' },
    { slug: 'campbell', name: 'Campbell', seat: 'Gillette', href: '/local-movers/wyoming/campbell', displayLabel: 'Campbell County, WY' },
    { slug: 'johnson', name: 'Johnson', seat: 'Buffalo', href: '/local-movers/wyoming/johnson', displayLabel: 'Johnson County, WY' },
    { slug: 'powder-river', name: 'Powder River', seat: 'Broadus', href: '/local-movers/montana/powder-river', displayLabel: 'Powder River County, MT' },
    { slug: 'big-horn', name: 'Big Horn', seat: 'Hardin', href: '/local-movers/montana/big-horn', displayLabel: 'Big Horn County, MT' },
  ],
  park: [
    { slug: 'big-horn', name: 'Big Horn', seat: 'Basin', href: '/local-movers/wyoming/big-horn', displayLabel: 'Big Horn County, WY' },
    { slug: 'fremont', name: 'Fremont', seat: 'Lander', href: '/local-movers/wyoming/fremont', displayLabel: 'Fremont County, WY' },
    { slug: 'hot-springs', name: 'Hot Springs', seat: 'Thermopolis', href: '/local-movers/wyoming/hot-springs', displayLabel: 'Hot Springs County, WY' },
    { slug: 'park', name: 'Park', seat: 'Livingston', href: '/local-movers/montana/park', displayLabel: 'Park County, MT' },
    { slug: 'yellowstone', name: 'Yellowstone', seat: 'Billings', href: '/local-movers/montana/yellowstone', displayLabel: 'Yellowstone County, MT' },
  ],
  teton: [
    { slug: 'fremont', name: 'Fremont', seat: 'Lander', href: '/local-movers/wyoming/fremont', displayLabel: 'Fremont County, WY' },
    { slug: 'lincoln', name: 'Lincoln', seat: 'Kemmerer', href: '/local-movers/wyoming/lincoln', displayLabel: 'Lincoln County, WY' },
    { slug: 'park', name: 'Park', seat: 'Cody', href: '/local-movers/wyoming/park', displayLabel: 'Park County, WY' },
    { slug: 'teton', name: 'Teton', seat: 'Driggs', href: '/local-movers/idaho/teton', displayLabel: 'Teton County, ID' },
    { slug: 'fremont', name: 'Fremont', seat: 'St. Anthony', href: '/local-movers/idaho/fremont', displayLabel: 'Fremont County, ID' },
  ],
  lincoln: [
    { slug: 'sublette', name: 'Sublette', seat: 'Pinedale', href: '/local-movers/wyoming/sublette', displayLabel: 'Sublette County, WY' },
    { slug: 'sweetwater', name: 'Sweetwater', seat: 'Green River', href: '/local-movers/wyoming/sweetwater', displayLabel: 'Sweetwater County, WY' },
    { slug: 'teton', name: 'Teton', seat: 'Jackson', href: '/local-movers/wyoming/teton', displayLabel: 'Teton County, WY' },
    { slug: 'uinta', name: 'Uinta', seat: 'Evanston', href: '/local-movers/wyoming/uinta', displayLabel: 'Uinta County, WY' },
  ],
  uinta: [
    { slug: 'lincoln', name: 'Lincoln', seat: 'Kemmerer', href: '/local-movers/wyoming/lincoln', displayLabel: 'Lincoln County, WY' },
    { slug: 'sweetwater', name: 'Sweetwater', seat: 'Green River', href: '/local-movers/wyoming/sweetwater', displayLabel: 'Sweetwater County, WY' },
    { slug: 'summit', name: 'Summit', seat: 'Coalville', href: '/local-movers/utah/summit', displayLabel: 'Summit County, UT' },
  ],
  carbon: [
    { slug: 'albany', name: 'Albany', seat: 'Laramie', href: '/local-movers/wyoming/albany', displayLabel: 'Albany County, WY' },
    { slug: 'converse', name: 'Converse', seat: 'Douglas', href: '/local-movers/wyoming/converse', displayLabel: 'Converse County, WY' },
    { slug: 'fremont', name: 'Fremont', seat: 'Lander', href: '/local-movers/wyoming/fremont', displayLabel: 'Fremont County, WY' },
    { slug: 'natrona', name: 'Natrona', seat: 'Casper', href: '/local-movers/wyoming/natrona', displayLabel: 'Natrona County, WY' },
    { slug: 'moffat', name: 'Moffat', seat: 'Craig', href: '/local-movers/colorado/moffat', displayLabel: 'Moffat County, CO' },
  ],
  converse: [
    { slug: 'albany', name: 'Albany', seat: 'Laramie', href: '/local-movers/wyoming/albany', displayLabel: 'Albany County, WY' },
    { slug: 'campbell', name: 'Campbell', seat: 'Gillette', href: '/local-movers/wyoming/campbell', displayLabel: 'Campbell County, WY' },
    { slug: 'carbon', name: 'Carbon', seat: 'Rawlins', href: '/local-movers/wyoming/carbon', displayLabel: 'Carbon County, WY' },
    { slug: 'johnson', name: 'Johnson', seat: 'Buffalo', href: '/local-movers/wyoming/johnson', displayLabel: 'Johnson County, WY' },
    { slug: 'natrona', name: 'Natrona', seat: 'Casper', href: '/local-movers/wyoming/natrona', displayLabel: 'Natrona County, WY' },
  ],
  goshen: [
    { slug: 'laramie', name: 'Laramie', seat: 'Cheyenne', href: '/local-movers/wyoming/laramie', displayLabel: 'Laramie County, WY' },
    { slug: 'niobrara', name: 'Niobrara', seat: 'Lusk', href: '/local-movers/wyoming/niobrara', displayLabel: 'Niobrara County, WY' },
    { slug: 'platte', name: 'Platte', seat: 'Wheatland', href: '/local-movers/wyoming/platte', displayLabel: 'Platte County, WY' },
    { slug: 'scotts-bluff', name: 'Scotts Bluff', seat: 'Gering', href: '/local-movers/nebraska/scotts-bluff', displayLabel: 'Scotts Bluff County, NE' },
  ],
  'big-horn': [
    { slug: 'johnson', name: 'Johnson', seat: 'Buffalo', href: '/local-movers/wyoming/johnson', displayLabel: 'Johnson County, WY' },
    { slug: 'park', name: 'Park', seat: 'Cody', href: '/local-movers/wyoming/park', displayLabel: 'Park County, WY' },
    { slug: 'sheridan', name: 'Sheridan', seat: 'Sheridan', href: '/local-movers/wyoming/sheridan', displayLabel: 'Sheridan County, WY' },
    { slug: 'washakie', name: 'Washakie', seat: 'Worland', href: '/local-movers/wyoming/washakie', displayLabel: 'Washakie County, WY' },
  ],
  johnson: [
    { slug: 'big-horn', name: 'Big Horn', seat: 'Basin', href: '/local-movers/wyoming/big-horn', displayLabel: 'Big Horn County, WY' },
    { slug: 'campbell', name: 'Campbell', seat: 'Gillette', href: '/local-movers/wyoming/campbell', displayLabel: 'Campbell County, WY' },
    { slug: 'converse', name: 'Converse', seat: 'Douglas', href: '/local-movers/wyoming/converse', displayLabel: 'Converse County, WY' },
    { slug: 'natrona', name: 'Natrona', seat: 'Casper', href: '/local-movers/wyoming/natrona', displayLabel: 'Natrona County, WY' },
    { slug: 'sheridan', name: 'Sheridan', seat: 'Sheridan', href: '/local-movers/wyoming/sheridan', displayLabel: 'Sheridan County, WY' },
  ],
  sublette: [
    { slug: 'fremont', name: 'Fremont', seat: 'Lander', href: '/local-movers/wyoming/fremont', displayLabel: 'Fremont County, WY' },
    { slug: 'lincoln', name: 'Lincoln', seat: 'Kemmerer', href: '/local-movers/wyoming/lincoln', displayLabel: 'Lincoln County, WY' },
    { slug: 'sweetwater', name: 'Sweetwater', seat: 'Green River', href: '/local-movers/wyoming/sweetwater', displayLabel: 'Sweetwater County, WY' },
    { slug: 'teton', name: 'Teton', seat: 'Jackson', href: '/local-movers/wyoming/teton', displayLabel: 'Teton County, WY' },
  ],
  platte: [
    { slug: 'albany', name: 'Albany', seat: 'Laramie', href: '/local-movers/wyoming/albany', displayLabel: 'Albany County, WY' },
    { slug: 'converse', name: 'Converse', seat: 'Douglas', href: '/local-movers/wyoming/converse', displayLabel: 'Converse County, WY' },
    { slug: 'goshen', name: 'Goshen', seat: 'Torrington', href: '/local-movers/wyoming/goshen', displayLabel: 'Goshen County, WY' },
    { slug: 'laramie', name: 'Laramie', seat: 'Cheyenne', href: '/local-movers/wyoming/laramie', displayLabel: 'Laramie County, WY' },
    { slug: 'niobrara', name: 'Niobrara', seat: 'Lusk', href: '/local-movers/wyoming/niobrara', displayLabel: 'Niobrara County, WY' },
  ],
  crook: [
    { slug: 'campbell', name: 'Campbell', seat: 'Gillette', href: '/local-movers/wyoming/campbell', displayLabel: 'Campbell County, WY' },
    { slug: 'weston', name: 'Weston', seat: 'Newcastle', href: '/local-movers/wyoming/weston', displayLabel: 'Weston County, WY' },
    { slug: 'lawrence', name: 'Lawrence', seat: 'Deadwood', href: '/local-movers/south-dakota/lawrence', displayLabel: 'Lawrence County, SD' },
  ],
  washakie: [
    { slug: 'big-horn', name: 'Big Horn', seat: 'Basin', href: '/local-movers/wyoming/big-horn', displayLabel: 'Big Horn County, WY' },
    { slug: 'fremont', name: 'Fremont', seat: 'Lander', href: '/local-movers/wyoming/fremont', displayLabel: 'Fremont County, WY' },
    { slug: 'hot-springs', name: 'Hot Springs', seat: 'Thermopolis', href: '/local-movers/wyoming/hot-springs', displayLabel: 'Hot Springs County, WY' },
    { slug: 'johnson', name: 'Johnson', seat: 'Buffalo', href: '/local-movers/wyoming/johnson', displayLabel: 'Johnson County, WY' },
    { slug: 'natrona', name: 'Natrona', seat: 'Casper', href: '/local-movers/wyoming/natrona', displayLabel: 'Natrona County, WY' },
  ],
  weston: [
    { slug: 'campbell', name: 'Campbell', seat: 'Gillette', href: '/local-movers/wyoming/campbell', displayLabel: 'Campbell County, WY' },
    { slug: 'converse', name: 'Converse', seat: 'Douglas', href: '/local-movers/wyoming/converse', displayLabel: 'Converse County, WY' },
    { slug: 'crook', name: 'Crook', seat: 'Sundance', href: '/local-movers/wyoming/crook', displayLabel: 'Crook County, WY' },
    { slug: 'niobrara', name: 'Niobrara', seat: 'Lusk', href: '/local-movers/wyoming/niobrara', displayLabel: 'Niobrara County, WY' },
    { slug: 'lawrence', name: 'Lawrence', seat: 'Deadwood', href: '/local-movers/south-dakota/lawrence', displayLabel: 'Lawrence County, SD' },
  ],
  'hot-springs': [
    { slug: 'fremont', name: 'Fremont', seat: 'Lander', href: '/local-movers/wyoming/fremont', displayLabel: 'Fremont County, WY' },
    { slug: 'park', name: 'Park', seat: 'Cody', href: '/local-movers/wyoming/park', displayLabel: 'Park County, WY' },
    { slug: 'washakie', name: 'Washakie', seat: 'Worland', href: '/local-movers/wyoming/washakie', displayLabel: 'Washakie County, WY' },
  ],
  niobrara: [
    { slug: 'converse', name: 'Converse', seat: 'Douglas', href: '/local-movers/wyoming/converse', displayLabel: 'Converse County, WY' },
    { slug: 'goshen', name: 'Goshen', seat: 'Torrington', href: '/local-movers/wyoming/goshen', displayLabel: 'Goshen County, WY' },
    { slug: 'platte', name: 'Platte', seat: 'Wheatland', href: '/local-movers/wyoming/platte', displayLabel: 'Platte County, WY' },
    { slug: 'weston', name: 'Weston', seat: 'Newcastle', href: '/local-movers/wyoming/weston', displayLabel: 'Weston County, WY' },
  ],
};

export function getWyomingNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return WY_COUNTY_NEIGHBORS[countySlug] ?? [];
}
