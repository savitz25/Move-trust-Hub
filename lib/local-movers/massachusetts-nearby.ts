import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Massachusetts counties plus cross-border NH, RI, CT, and NY metro guides */
const MA_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  middlesex: [
    { slug: 'suffolk', name: 'Suffolk', seat: 'Boston', href: '/local-movers/massachusetts/suffolk', displayLabel: 'Suffolk County, MA' },
    { slug: 'essex', name: 'Essex', seat: 'Salem', href: '/local-movers/massachusetts/essex', displayLabel: 'Essex County, MA' },
    { slug: 'worcester', name: 'Worcester', seat: 'Worcester', href: '/local-movers/massachusetts/worcester', displayLabel: 'Worcester County, MA' },
    { slug: 'norfolk', name: 'Norfolk', seat: 'Dedham', href: '/local-movers/massachusetts/norfolk', displayLabel: 'Norfolk County, MA' },
    { slug: 'hillsborough', name: 'Hillsborough', seat: 'Manchester', href: '/local-movers/new-hampshire/hillsborough', displayLabel: 'Hillsborough County, NH' },
    { slug: 'rockingham', name: 'Rockingham', seat: 'Exeter', href: '/local-movers/new-hampshire/rockingham', displayLabel: 'Rockingham County, NH' },
  ],
  worcester: [
    { slug: 'middlesex', name: 'Middlesex', seat: 'Cambridge', href: '/local-movers/massachusetts/middlesex', displayLabel: 'Middlesex County, MA' },
    { slug: 'norfolk', name: 'Norfolk', seat: 'Dedham', href: '/local-movers/massachusetts/norfolk', displayLabel: 'Norfolk County, MA' },
    { slug: 'hampden', name: 'Hampden', seat: 'Springfield', href: '/local-movers/massachusetts/hampden', displayLabel: 'Hampden County, MA' },
    { slug: 'hampshire', name: 'Hampshire', seat: 'Northampton', href: '/local-movers/massachusetts/hampshire', displayLabel: 'Hampshire County, MA' },
    { slug: 'franklin', name: 'Franklin', seat: 'Greenfield', href: '/local-movers/massachusetts/franklin', displayLabel: 'Franklin County, MA' },
    { slug: 'tolland', name: 'Tolland', seat: 'Rockville', href: '/local-movers/connecticut/tolland', displayLabel: 'Tolland County, CT' },
  ],
  essex: [
    { slug: 'middlesex', name: 'Middlesex', seat: 'Cambridge', href: '/local-movers/massachusetts/middlesex', displayLabel: 'Middlesex County, MA' },
    { slug: 'suffolk', name: 'Suffolk', seat: 'Boston', href: '/local-movers/massachusetts/suffolk', displayLabel: 'Suffolk County, MA' },
    { slug: 'norfolk', name: 'Norfolk', seat: 'Dedham', href: '/local-movers/massachusetts/norfolk', displayLabel: 'Norfolk County, MA' },
    { slug: 'rockingham', name: 'Rockingham', seat: 'Exeter', href: '/local-movers/new-hampshire/rockingham', displayLabel: 'Rockingham County, NH' },
    { slug: 'hillsborough', name: 'Hillsborough', seat: 'Manchester', href: '/local-movers/new-hampshire/hillsborough', displayLabel: 'Hillsborough County, NH' },
    { slug: 'strafford', name: 'Strafford', seat: 'Dover', href: '/local-movers/new-hampshire/strafford', displayLabel: 'Strafford County, NH' },
  ],
  suffolk: [
    { slug: 'middlesex', name: 'Middlesex', seat: 'Cambridge', href: '/local-movers/massachusetts/middlesex', displayLabel: 'Middlesex County, MA' },
    { slug: 'norfolk', name: 'Norfolk', seat: 'Dedham', href: '/local-movers/massachusetts/norfolk', displayLabel: 'Norfolk County, MA' },
    { slug: 'essex', name: 'Essex', seat: 'Salem', href: '/local-movers/massachusetts/essex', displayLabel: 'Essex County, MA' },
    { slug: 'plymouth', name: 'Plymouth', seat: 'Plymouth', href: '/local-movers/massachusetts/plymouth', displayLabel: 'Plymouth County, MA' },
    { slug: 'suffolk', name: 'Suffolk', seat: 'Riverhead', href: '/local-movers/new-york/suffolk', displayLabel: 'Suffolk County, NY' },
    { slug: 'hillsborough', name: 'Hillsborough', seat: 'Manchester', href: '/local-movers/new-hampshire/hillsborough', displayLabel: 'Hillsborough County, NH' },
  ],
  norfolk: [
    { slug: 'suffolk', name: 'Suffolk', seat: 'Boston', href: '/local-movers/massachusetts/suffolk', displayLabel: 'Suffolk County, MA' },
    { slug: 'middlesex', name: 'Middlesex', seat: 'Cambridge', href: '/local-movers/massachusetts/middlesex', displayLabel: 'Middlesex County, MA' },
    { slug: 'plymouth', name: 'Plymouth', seat: 'Plymouth', href: '/local-movers/massachusetts/plymouth', displayLabel: 'Plymouth County, MA' },
    { slug: 'bristol', name: 'Bristol', seat: 'Taunton', href: '/local-movers/massachusetts/bristol', displayLabel: 'Bristol County, MA' },
    { slug: 'worcester', name: 'Worcester', seat: 'Worcester', href: '/local-movers/massachusetts/worcester', displayLabel: 'Worcester County, MA' },
    { slug: 'providence', name: 'Providence', seat: 'Providence', href: '/local-movers/rhode-island/providence', displayLabel: 'Providence County, RI' },
  ],
  bristol: [
    { slug: 'norfolk', name: 'Norfolk', seat: 'Dedham', href: '/local-movers/massachusetts/norfolk', displayLabel: 'Norfolk County, MA' },
    { slug: 'plymouth', name: 'Plymouth', seat: 'Plymouth', href: '/local-movers/massachusetts/plymouth', displayLabel: 'Plymouth County, MA' },
    { slug: 'providence', name: 'Providence', seat: 'Providence', href: '/local-movers/rhode-island/providence', displayLabel: 'Providence County, RI' },
    { slug: 'kent', name: 'Kent', seat: 'East Greenwich', href: '/local-movers/rhode-island/kent', displayLabel: 'Kent County, RI' },
    { slug: 'newport', name: 'Newport', seat: 'Newport', href: '/local-movers/rhode-island/newport', displayLabel: 'Newport County, RI' },
    { slug: 'barnstable', name: 'Barnstable', seat: 'Barnstable', href: '/local-movers/massachusetts/barnstable', displayLabel: 'Barnstable County, MA' },
  ],
  plymouth: [
    { slug: 'norfolk', name: 'Norfolk', seat: 'Dedham', href: '/local-movers/massachusetts/norfolk', displayLabel: 'Norfolk County, MA' },
    { slug: 'suffolk', name: 'Suffolk', seat: 'Boston', href: '/local-movers/massachusetts/suffolk', displayLabel: 'Suffolk County, MA' },
    { slug: 'bristol', name: 'Bristol', seat: 'Taunton', href: '/local-movers/massachusetts/bristol', displayLabel: 'Bristol County, MA' },
    { slug: 'barnstable', name: 'Barnstable', seat: 'Barnstable', href: '/local-movers/massachusetts/barnstable', displayLabel: 'Barnstable County, MA' },
    { slug: 'essex', name: 'Essex', seat: 'Salem', href: '/local-movers/massachusetts/essex', displayLabel: 'Essex County, MA' },
    { slug: 'middlesex', name: 'Middlesex', seat: 'Cambridge', href: '/local-movers/massachusetts/middlesex', displayLabel: 'Middlesex County, MA' },
  ],
  hampden: [
    { slug: 'hampshire', name: 'Hampshire', seat: 'Northampton', href: '/local-movers/massachusetts/hampshire', displayLabel: 'Hampshire County, MA' },
    { slug: 'worcester', name: 'Worcester', seat: 'Worcester', href: '/local-movers/massachusetts/worcester', displayLabel: 'Worcester County, MA' },
    { slug: 'franklin', name: 'Franklin', seat: 'Greenfield', href: '/local-movers/massachusetts/franklin', displayLabel: 'Franklin County, MA' },
    { slug: 'berkshire', name: 'Berkshire', seat: 'Pittsfield', href: '/local-movers/massachusetts/berkshire', displayLabel: 'Berkshire County, MA' },
    { slug: 'hartford', name: 'Hartford', seat: 'Hartford', href: '/local-movers/connecticut/hartford', displayLabel: 'Hartford County, CT' },
    { slug: 'tolland', name: 'Tolland', seat: 'Rockville', href: '/local-movers/connecticut/tolland', displayLabel: 'Tolland County, CT' },
  ],
  barnstable: [
    { slug: 'plymouth', name: 'Plymouth', seat: 'Plymouth', href: '/local-movers/massachusetts/plymouth', displayLabel: 'Plymouth County, MA' },
    { slug: 'dukes', name: 'Dukes', seat: 'Edgartown', href: '/local-movers/massachusetts/dukes', displayLabel: 'Dukes County, MA' },
    { slug: 'nantucket', name: 'Nantucket', seat: 'Nantucket', href: '/local-movers/massachusetts/nantucket', displayLabel: 'Nantucket County, MA' },
    { slug: 'bristol', name: 'Bristol', seat: 'Taunton', href: '/local-movers/massachusetts/bristol', displayLabel: 'Bristol County, MA' },
    { slug: 'norfolk', name: 'Norfolk', seat: 'Dedham', href: '/local-movers/massachusetts/norfolk', displayLabel: 'Norfolk County, MA' },
    { slug: 'essex', name: 'Essex', seat: 'Salem', href: '/local-movers/massachusetts/essex', displayLabel: 'Essex County, MA' },
  ],
  hampshire: [
    { slug: 'hampden', name: 'Hampden', seat: 'Springfield', href: '/local-movers/massachusetts/hampden', displayLabel: 'Hampden County, MA' },
    { slug: 'franklin', name: 'Franklin', seat: 'Greenfield', href: '/local-movers/massachusetts/franklin', displayLabel: 'Franklin County, MA' },
    { slug: 'worcester', name: 'Worcester', seat: 'Worcester', href: '/local-movers/massachusetts/worcester', displayLabel: 'Worcester County, MA' },
    { slug: 'berkshire', name: 'Berkshire', seat: 'Pittsfield', href: '/local-movers/massachusetts/berkshire', displayLabel: 'Berkshire County, MA' },
    { slug: 'hartford', name: 'Hartford', seat: 'Hartford', href: '/local-movers/connecticut/hartford', displayLabel: 'Hartford County, CT' },
    { slug: 'middlesex', name: 'Middlesex', seat: 'Cambridge', href: '/local-movers/massachusetts/middlesex', displayLabel: 'Middlesex County, MA' },
  ],
  berkshire: [
    { slug: 'hampden', name: 'Hampden', seat: 'Springfield', href: '/local-movers/massachusetts/hampden', displayLabel: 'Hampden County, MA' },
    { slug: 'franklin', name: 'Franklin', seat: 'Greenfield', href: '/local-movers/massachusetts/franklin', displayLabel: 'Franklin County, MA' },
    { slug: 'hampshire', name: 'Hampshire', seat: 'Northampton', href: '/local-movers/massachusetts/hampshire', displayLabel: 'Hampshire County, MA' },
    { slug: 'columbia', name: 'Columbia', seat: 'Hudson', href: '/local-movers/new-york/columbia', displayLabel: 'Columbia County, NY' },
    { slug: 'rensselaer', name: 'Rensselaer', seat: 'Troy', href: '/local-movers/new-york/rensselaer', displayLabel: 'Rensselaer County, NY' },
    { slug: 'litchfield', name: 'Litchfield', seat: 'Torrington', href: '/local-movers/connecticut/litchfield', displayLabel: 'Litchfield County, CT' },
  ],
  franklin: [
    { slug: 'hampshire', name: 'Hampshire', seat: 'Northampton', href: '/local-movers/massachusetts/hampshire', displayLabel: 'Hampshire County, MA' },
    { slug: 'hampden', name: 'Hampden', seat: 'Springfield', href: '/local-movers/massachusetts/hampden', displayLabel: 'Hampden County, MA' },
    { slug: 'berkshire', name: 'Berkshire', seat: 'Pittsfield', href: '/local-movers/massachusetts/berkshire', displayLabel: 'Berkshire County, MA' },
    { slug: 'worcester', name: 'Worcester', seat: 'Worcester', href: '/local-movers/massachusetts/worcester', displayLabel: 'Worcester County, MA' },
    { slug: 'windham', name: 'Windham', seat: 'Willimantic', href: '/local-movers/connecticut/windham', displayLabel: 'Windham County, CT' },
    { slug: 'cheshire', name: 'Cheshire', seat: 'Keene', href: '/local-movers/new-hampshire/cheshire', displayLabel: 'Cheshire County, NH' },
  ],
  dukes: [
    { slug: 'barnstable', name: 'Barnstable', seat: 'Barnstable', href: '/local-movers/massachusetts/barnstable', displayLabel: 'Barnstable County, MA' },
    { slug: 'nantucket', name: 'Nantucket', seat: 'Nantucket', href: '/local-movers/massachusetts/nantucket', displayLabel: 'Nantucket County, MA' },
    { slug: 'plymouth', name: 'Plymouth', seat: 'Plymouth', href: '/local-movers/massachusetts/plymouth', displayLabel: 'Plymouth County, MA' },
    { slug: 'bristol', name: 'Bristol', seat: 'Taunton', href: '/local-movers/massachusetts/bristol', displayLabel: 'Bristol County, MA' },
    { slug: 'norfolk', name: 'Norfolk', seat: 'Dedham', href: '/local-movers/massachusetts/norfolk', displayLabel: 'Norfolk County, MA' },
    { slug: 'suffolk', name: 'Suffolk', seat: 'Boston', href: '/local-movers/massachusetts/suffolk', displayLabel: 'Suffolk County, MA' },
  ],
  nantucket: [
    { slug: 'dukes', name: 'Dukes', seat: 'Edgartown', href: '/local-movers/massachusetts/dukes', displayLabel: 'Dukes County, MA' },
    { slug: 'barnstable', name: 'Barnstable', seat: 'Barnstable', href: '/local-movers/massachusetts/barnstable', displayLabel: 'Barnstable County, MA' },
    { slug: 'plymouth', name: 'Plymouth', seat: 'Plymouth', href: '/local-movers/massachusetts/plymouth', displayLabel: 'Plymouth County, MA' },
    { slug: 'bristol', name: 'Bristol', seat: 'Taunton', href: '/local-movers/massachusetts/bristol', displayLabel: 'Bristol County, MA' },
    { slug: 'norfolk', name: 'Norfolk', seat: 'Dedham', href: '/local-movers/massachusetts/norfolk', displayLabel: 'Norfolk County, MA' },
    { slug: 'suffolk', name: 'Suffolk', seat: 'Boston', href: '/local-movers/massachusetts/suffolk', displayLabel: 'Suffolk County, MA' },
  ],
};

export function getMassachusettsNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return MA_COUNTY_NEIGHBORS[countySlug] ?? [];
}