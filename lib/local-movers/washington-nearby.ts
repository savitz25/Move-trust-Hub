import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Washington premium hubs — regional corridor links */
const WA_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  king: [
    { slug: 'snohomish', name: 'Snohomish', seat: 'Everett', href: '/local-movers/washington/snohomish', displayLabel: 'Snohomish County, WA' },
    { slug: 'pierce', name: 'Pierce', seat: 'Tacoma', href: '/local-movers/washington/pierce', displayLabel: 'Pierce County, WA' },
    { slug: 'kitsap', name: 'Kitsap', seat: 'Port Orchard', href: '/local-movers/washington/kitsap', displayLabel: 'Kitsap County, WA' },
    { slug: 'island', name: 'Island', seat: 'Coupeville', href: '/local-movers/washington/island', displayLabel: 'Island County, WA' },
    { slug: 'skagit', name: 'Skagit', seat: 'Mount Vernon', href: '/local-movers/washington/skagit', displayLabel: 'Skagit County, WA' },
  ],
  pierce: [
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
    { slug: 'thurston', name: 'Thurston', seat: 'Olympia', href: '/local-movers/washington/thurston', displayLabel: 'Thurston County, WA' },
    { slug: 'kitsap', name: 'Kitsap', seat: 'Port Orchard', href: '/local-movers/washington/kitsap', displayLabel: 'Kitsap County, WA' },
    { slug: 'lewis', name: 'Lewis', seat: 'Chehalis', href: '/local-movers/washington/lewis', displayLabel: 'Lewis County, WA' },
    { slug: 'grays-harbor', name: 'Grays Harbor', seat: 'Montesano', href: '/local-movers/washington/grays-harbor', displayLabel: 'Grays Harbor County, WA' },
  ],
  snohomish: [
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
    { slug: 'skagit', name: 'Skagit', seat: 'Mount Vernon', href: '/local-movers/washington/skagit', displayLabel: 'Skagit County, WA' },
    { slug: 'whatcom', name: 'Whatcom', seat: 'Bellingham', href: '/local-movers/washington/whatcom', displayLabel: 'Whatcom County, WA' },
    { slug: 'island', name: 'Island', seat: 'Coupeville', href: '/local-movers/washington/island', displayLabel: 'Island County, WA' },
    { slug: 'pierce', name: 'Pierce', seat: 'Tacoma', href: '/local-movers/washington/pierce', displayLabel: 'Pierce County, WA' },
  ],
  spokane: [
    { slug: 'yakima', name: 'Yakima', seat: 'Yakima', href: '/local-movers/washington/yakima', displayLabel: 'Yakima County, WA' },
    { slug: 'benton', name: 'Benton', seat: 'Kennewick', href: '/local-movers/washington/benton', displayLabel: 'Benton County, WA' },
    { slug: 'grant', name: 'Grant', seat: 'Ephrata', href: '/local-movers/washington/grant', displayLabel: 'Grant County, WA' },
    { slug: 'chelan', name: 'Chelan', seat: 'Wenatchee', href: '/local-movers/washington/chelan', displayLabel: 'Chelan County, WA' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
  ],
  clark: [
    { slug: 'cowlitz', name: 'Cowlitz', seat: 'Kelso', href: '/local-movers/washington/cowlitz', displayLabel: 'Cowlitz County, WA' },
    { slug: 'pierce', name: 'Pierce', seat: 'Tacoma', href: '/local-movers/washington/pierce', displayLabel: 'Pierce County, WA' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
    { slug: 'lewis', name: 'Lewis', seat: 'Chehalis', href: '/local-movers/washington/lewis', displayLabel: 'Lewis County, WA' },
    { slug: 'thurston', name: 'Thurston', seat: 'Olympia', href: '/local-movers/washington/thurston', displayLabel: 'Thurston County, WA' },
  ],
  thurston: [
    { slug: 'pierce', name: 'Pierce', seat: 'Tacoma', href: '/local-movers/washington/pierce', displayLabel: 'Pierce County, WA' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
    { slug: 'kitsap', name: 'Kitsap', seat: 'Port Orchard', href: '/local-movers/washington/kitsap', displayLabel: 'Kitsap County, WA' },
    { slug: 'lewis', name: 'Lewis', seat: 'Chehalis', href: '/local-movers/washington/lewis', displayLabel: 'Lewis County, WA' },
    { slug: 'grays-harbor', name: 'Grays Harbor', seat: 'Montesano', href: '/local-movers/washington/grays-harbor', displayLabel: 'Grays Harbor County, WA' },
  ],
  kitsap: [
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
    { slug: 'pierce', name: 'Pierce', seat: 'Tacoma', href: '/local-movers/washington/pierce', displayLabel: 'Pierce County, WA' },
    { slug: 'island', name: 'Island', seat: 'Coupeville', href: '/local-movers/washington/island', displayLabel: 'Island County, WA' },
    { slug: 'thurston', name: 'Thurston', seat: 'Olympia', href: '/local-movers/washington/thurston', displayLabel: 'Thurston County, WA' },
    { slug: 'snohomish', name: 'Snohomish', seat: 'Everett', href: '/local-movers/washington/snohomish', displayLabel: 'Snohomish County, WA' },
  ],
  yakima: [
    { slug: 'benton', name: 'Benton', seat: 'Kennewick', href: '/local-movers/washington/benton', displayLabel: 'Benton County, WA' },
    { slug: 'franklin', name: 'Franklin', seat: 'Pasco', href: '/local-movers/washington/franklin', displayLabel: 'Franklin County, WA' },
    { slug: 'grant', name: 'Grant', seat: 'Ephrata', href: '/local-movers/washington/grant', displayLabel: 'Grant County, WA' },
    { slug: 'chelan', name: 'Chelan', seat: 'Wenatchee', href: '/local-movers/washington/chelan', displayLabel: 'Chelan County, WA' },
    { slug: 'spokane', name: 'Spokane', seat: 'Spokane', href: '/local-movers/washington/spokane', displayLabel: 'Spokane County, WA' },
  ],
  whatcom: [
    { slug: 'skagit', name: 'Skagit', seat: 'Mount Vernon', href: '/local-movers/washington/skagit', displayLabel: 'Skagit County, WA' },
    { slug: 'snohomish', name: 'Snohomish', seat: 'Everett', href: '/local-movers/washington/snohomish', displayLabel: 'Snohomish County, WA' },
    { slug: 'island', name: 'Island', seat: 'Coupeville', href: '/local-movers/washington/island', displayLabel: 'Island County, WA' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
    { slug: 'clallam', name: 'Clallam', seat: 'Port Angeles', href: '/local-movers/washington/clallam', displayLabel: 'Clallam County, WA' },
  ],
  benton: [
    { slug: 'franklin', name: 'Franklin', seat: 'Pasco', href: '/local-movers/washington/franklin', displayLabel: 'Franklin County, WA' },
    { slug: 'yakima', name: 'Yakima', seat: 'Yakima', href: '/local-movers/washington/yakima', displayLabel: 'Yakima County, WA' },
    { slug: 'grant', name: 'Grant', seat: 'Ephrata', href: '/local-movers/washington/grant', displayLabel: 'Grant County, WA' },
    { slug: 'spokane', name: 'Spokane', seat: 'Spokane', href: '/local-movers/washington/spokane', displayLabel: 'Spokane County, WA' },
    { slug: 'chelan', name: 'Chelan', seat: 'Wenatchee', href: '/local-movers/washington/chelan', displayLabel: 'Chelan County, WA' },
  ],
  skagit: [
    { slug: 'whatcom', name: 'Whatcom', seat: 'Bellingham', href: '/local-movers/washington/whatcom', displayLabel: 'Whatcom County, WA' },
    { slug: 'snohomish', name: 'Snohomish', seat: 'Everett', href: '/local-movers/washington/snohomish', displayLabel: 'Snohomish County, WA' },
    { slug: 'island', name: 'Island', seat: 'Coupeville', href: '/local-movers/washington/island', displayLabel: 'Island County, WA' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
    { slug: 'chelan', name: 'Chelan', seat: 'Wenatchee', href: '/local-movers/washington/chelan', displayLabel: 'Chelan County, WA' },
  ],
  cowlitz: [
    { slug: 'clark', name: 'Clark', seat: 'Vancouver', href: '/local-movers/washington/clark', displayLabel: 'Clark County, WA' },
    { slug: 'lewis', name: 'Lewis', seat: 'Chehalis', href: '/local-movers/washington/lewis', displayLabel: 'Lewis County, WA' },
    { slug: 'pierce', name: 'Pierce', seat: 'Tacoma', href: '/local-movers/washington/pierce', displayLabel: 'Pierce County, WA' },
    { slug: 'grays-harbor', name: 'Grays Harbor', seat: 'Montesano', href: '/local-movers/washington/grays-harbor', displayLabel: 'Grays Harbor County, WA' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
  ],
  grant: [
    { slug: 'yakima', name: 'Yakima', seat: 'Yakima', href: '/local-movers/washington/yakima', displayLabel: 'Yakima County, WA' },
    { slug: 'benton', name: 'Benton', seat: 'Kennewick', href: '/local-movers/washington/benton', displayLabel: 'Benton County, WA' },
    { slug: 'franklin', name: 'Franklin', seat: 'Pasco', href: '/local-movers/washington/franklin', displayLabel: 'Franklin County, WA' },
    { slug: 'chelan', name: 'Chelan', seat: 'Wenatchee', href: '/local-movers/washington/chelan', displayLabel: 'Chelan County, WA' },
    { slug: 'spokane', name: 'Spokane', seat: 'Spokane', href: '/local-movers/washington/spokane', displayLabel: 'Spokane County, WA' },
  ],
  franklin: [
    { slug: 'benton', name: 'Benton', seat: 'Kennewick', href: '/local-movers/washington/benton', displayLabel: 'Benton County, WA' },
    { slug: 'yakima', name: 'Yakima', seat: 'Yakima', href: '/local-movers/washington/yakima', displayLabel: 'Yakima County, WA' },
    { slug: 'grant', name: 'Grant', seat: 'Ephrata', href: '/local-movers/washington/grant', displayLabel: 'Grant County, WA' },
    { slug: 'spokane', name: 'Spokane', seat: 'Spokane', href: '/local-movers/washington/spokane', displayLabel: 'Spokane County, WA' },
    { slug: 'chelan', name: 'Chelan', seat: 'Wenatchee', href: '/local-movers/washington/chelan', displayLabel: 'Chelan County, WA' },
  ],
  lewis: [
    { slug: 'thurston', name: 'Thurston', seat: 'Olympia', href: '/local-movers/washington/thurston', displayLabel: 'Thurston County, WA' },
    { slug: 'pierce', name: 'Pierce', seat: 'Tacoma', href: '/local-movers/washington/pierce', displayLabel: 'Pierce County, WA' },
    { slug: 'cowlitz', name: 'Cowlitz', seat: 'Kelso', href: '/local-movers/washington/cowlitz', displayLabel: 'Cowlitz County, WA' },
    { slug: 'grays-harbor', name: 'Grays Harbor', seat: 'Montesano', href: '/local-movers/washington/grays-harbor', displayLabel: 'Grays Harbor County, WA' },
    { slug: 'clark', name: 'Clark', seat: 'Vancouver', href: '/local-movers/washington/clark', displayLabel: 'Clark County, WA' },
  ],
  island: [
    { slug: 'snohomish', name: 'Snohomish', seat: 'Everett', href: '/local-movers/washington/snohomish', displayLabel: 'Snohomish County, WA' },
    { slug: 'skagit', name: 'Skagit', seat: 'Mount Vernon', href: '/local-movers/washington/skagit', displayLabel: 'Skagit County, WA' },
    { slug: 'kitsap', name: 'Kitsap', seat: 'Port Orchard', href: '/local-movers/washington/kitsap', displayLabel: 'Kitsap County, WA' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
    { slug: 'clallam', name: 'Clallam', seat: 'Port Angeles', href: '/local-movers/washington/clallam', displayLabel: 'Clallam County, WA' },
  ],
  chelan: [
    { slug: 'yakima', name: 'Yakima', seat: 'Yakima', href: '/local-movers/washington/yakima', displayLabel: 'Yakima County, WA' },
    { slug: 'grant', name: 'Grant', seat: 'Ephrata', href: '/local-movers/washington/grant', displayLabel: 'Grant County, WA' },
    { slug: 'spokane', name: 'Spokane', seat: 'Spokane', href: '/local-movers/washington/spokane', displayLabel: 'Spokane County, WA' },
    { slug: 'benton', name: 'Benton', seat: 'Kennewick', href: '/local-movers/washington/benton', displayLabel: 'Benton County, WA' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
  ],
  clallam: [
    { slug: 'island', name: 'Island', seat: 'Coupeville', href: '/local-movers/washington/island', displayLabel: 'Island County, WA' },
    { slug: 'kitsap', name: 'Kitsap', seat: 'Port Orchard', href: '/local-movers/washington/kitsap', displayLabel: 'Kitsap County, WA' },
    { slug: 'whatcom', name: 'Whatcom', seat: 'Bellingham', href: '/local-movers/washington/whatcom', displayLabel: 'Whatcom County, WA' },
    { slug: 'grays-harbor', name: 'Grays Harbor', seat: 'Montesano', href: '/local-movers/washington/grays-harbor', displayLabel: 'Grays Harbor County, WA' },
    { slug: 'king', name: 'King', seat: 'Seattle', href: '/local-movers/washington/king', displayLabel: 'King County, WA' },
  ],
  'grays-harbor': [
    { slug: 'pierce', name: 'Pierce', seat: 'Tacoma', href: '/local-movers/washington/pierce', displayLabel: 'Pierce County, WA' },
    { slug: 'thurston', name: 'Thurston', seat: 'Olympia', href: '/local-movers/washington/thurston', displayLabel: 'Thurston County, WA' },
    { slug: 'lewis', name: 'Lewis', seat: 'Chehalis', href: '/local-movers/washington/lewis', displayLabel: 'Lewis County, WA' },
    { slug: 'clallam', name: 'Clallam', seat: 'Port Angeles', href: '/local-movers/washington/clallam', displayLabel: 'Clallam County, WA' },
    { slug: 'cowlitz', name: 'Cowlitz', seat: 'Kelso', href: '/local-movers/washington/cowlitz', displayLabel: 'Cowlitz County, WA' },
  ],
};

export function getWashingtonNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return WA_COUNTY_NEIGHBORS[countySlug] ?? [];
}