import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated West Virginia counties */
export const westVirginiaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  kanawha: { seat: 'Charleston', metro: 'charleston-metro-wv' },
  berkeley: { seat: 'Martinsburg', metro: 'martinsburg-metro-wv' },
  monongalia: { seat: 'Morgantown', metro: 'morgantown-metro-wv' },
  cabell: { seat: 'Huntington', metro: 'huntington-metro-wv' },
  wood: { seat: 'Parkersburg', metro: 'parkersburg-metro-wv' },
  raleigh: { seat: 'Beckley', metro: 'beckley-metro-wv' },
  jefferson: { seat: 'Charles Town', metro: 'charles-town-metro-wv' },
  harrison: { seat: 'Clarksburg', metro: 'clarksburg-metro-wv' },
  mercer: { seat: 'Princeton', metro: 'princeton-metro-wv' },
  putnam: { seat: 'Winfield', metro: 'winfield-metro-wv' },
  marion: { seat: 'Fairmont', metro: 'fairmont-metro-wv' },
  ohio: { seat: 'Wheeling', metro: 'wheeling-metro-wv' },
  fayette: { seat: 'Fayetteville', metro: 'fayetteville-metro-wv' },
  wayne: { seat: 'Wayne', metro: 'wayne-metro-wv' },
  preston: { seat: 'Kingwood', metro: 'kingwood-metro-wv' },
  greenbrier: { seat: 'Lewisburg', metro: 'lewisburg-metro-wv' },
  logan: { seat: 'Logan', metro: 'logan-metro-wv' },
  marshall: { seat: 'Moundsville', metro: 'moundsville-metro-wv' },
  hancock: { seat: 'New Cumberland', metro: 'new-cumberland-metro-wv' },
  jackson: { seat: 'Ripley', metro: 'ripley-metro-wv' },
  mineral: { seat: 'Keyser', metro: 'keyser-metro-wv' },
  randolph: { seat: 'Elkins', metro: 'elkins-metro-wv' },
  mason: { seat: 'Point Pleasant', metro: 'point-pleasant-metro-wv' },
  hampshire: { seat: 'Romney', metro: 'romney-metro-wv' },
  upshur: { seat: 'Buckhannon', metro: 'buckhannon-metro-wv' },
  nicholas: { seat: 'Summersville', metro: 'summersville-metro-wv' },
  mingo: { seat: 'Williamson', metro: 'williamson-metro-wv' },
  brooke: { seat: 'Wellsburg', metro: 'wellsburg-metro-wv' },
  boone: { seat: 'Madison', metro: 'madison-metro-wv' },
  wyoming: { seat: 'Pineville', metro: 'pineville-metro-wv' },
  lincoln: { seat: 'Hamlin', metro: 'hamlin-metro-wv' },
  morgan: { seat: 'Berkeley Springs', metro: 'berkeley-springs-metro-wv' },
  mcdowell: { seat: 'Welch', metro: 'welch-metro-wv' },
  lewis: { seat: 'Weston', metro: 'weston-metro-wv' },
  taylor: { seat: 'Grafton', metro: 'grafton-metro-wv' },
  barbour: { seat: 'Philippi', metro: 'philippi-metro-wv' },
  hardy: { seat: 'Moorefield', metro: 'moorefield-metro-wv' },
  wetzel: { seat: 'New Martinsville', metro: 'new-martinsville-metro-wv' },
  roane: { seat: 'Spencer', metro: 'spencer-metro-wv' },
};

export function applyWestVirginiaCountyOverrides(county: LocalCounty): LocalCounty {
  const override = westVirginiaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}