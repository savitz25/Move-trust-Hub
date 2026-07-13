import type { MyMoveDashboardPayload } from '@/lib/save-my-move/dashboard-types';

/** Realistic preview data for ?demo=1 on /my-move (design QA). */
export function buildMyMoveDemoData(email = 'alex@example.com'): MyMoveDashboardPayload {
  const now = new Date().toISOString();

  return {
    user: { id: 'demo-user', email },
    profile: { marketing_opt_in: false, mover_alerts_opt_in: true },
    inventories: [
      {
        id: 'demo-inv-1',
        name: 'Imported from this device',
        inventory: [],
        mode: 'room',
        move_preset: '3-bedroom',
        total_volume: 628,
        total_items: 84,
        created_at: now,
        updated_at: now,
      },
      {
        id: 'demo-inv-2',
        name: 'Austin → Denver spring move',
        inventory: [],
        mode: 'room',
        move_preset: '2-bedroom',
        total_volume: 412,
        total_items: 56,
        created_at: now,
        updated_at: now,
      },
      {
        id: 'demo-inv-3',
        name: 'Imported from this device',
        inventory: [],
        mode: 'room',
        move_preset: '1-bedroom',
        total_volume: 285,
        total_items: 38,
        created_at: now,
        updated_at: now,
      },
      {
        id: 'demo-inv-4',
        name: 'Garage overflow list',
        inventory: [],
        mode: 'room',
        move_preset: 'custom',
        total_volume: 156,
        total_items: 22,
        created_at: now,
        updated_at: now,
      },
      {
        id: 'demo-inv-5',
        name: 'Imported from this device',
        inventory: [],
        mode: 'room',
        move_preset: '4-plus',
        total_volume: 892,
        total_items: 118,
        created_at: now,
        updated_at: now,
      },
    ],
    movers: [
      {
        id: 'demo-mover-1',
        company_slug: 'united-van-lines',
        notes: 'Strong reviews for long-distance. Ask about shuttle fees.',
        created_at: now,
        updated_at: now,
      },
      {
        id: 'demo-mover-2',
        company_slug: 'mayflower-transit',
        notes: '',
        created_at: now,
        updated_at: now,
      },
    ],
    comparisons: [
      {
        id: 'demo-comp-1',
        company_slugs: ['united-van-lines', 'mayflower-transit', 'allied-van-lines'],
        name: 'Top 3 interstate finalists',
        created_at: now,
      },
      {
        id: 'demo-comp-2',
        company_slugs: ['north-american-van-lines', 'united-van-lines'],
        name: 'Price vs reputation',
        created_at: now,
      },
      {
        id: 'demo-comp-3',
        company_slugs: ['mayflower-transit', 'allied-van-lines'],
        name: null,
        created_at: now,
      },
    ],
    companyNames: {
      'united-van-lines': 'United Van Lines',
      'mayflower-transit': 'Mayflower Transit',
      'allied-van-lines': 'Allied Van Lines',
      'north-american-van-lines': 'North American Van Lines',
    },
    companySummaries: {
      'united-van-lines': {
        slug: 'united-van-lines',
        name: 'United Van Lines',
        overallRating: 4.6,
        reviewCount: 1240,
        reputationScore: 92,
        avgPricePerMove: 4850,
        fmcsaSafetyRating: 'Satisfactory',
        isVerified: true,
        usdotNumber: '077203',
      },
      'mayflower-transit': {
        slug: 'mayflower-transit',
        name: 'Mayflower Transit',
        overallRating: 4.4,
        reviewCount: 980,
        reputationScore: 88,
        avgPricePerMove: 4620,
        fmcsaSafetyRating: 'Satisfactory',
        isVerified: true,
        usdotNumber: '007173',
      },
      'allied-van-lines': {
        slug: 'allied-van-lines',
        name: 'Allied Van Lines',
        overallRating: 4.5,
        reviewCount: 1102,
        reputationScore: 90,
        avgPricePerMove: 5100,
        fmcsaSafetyRating: 'Satisfactory',
        isVerified: true,
        usdotNumber: '076456',
      },
      'north-american-van-lines': {
        slug: 'north-american-van-lines',
        name: 'North American Van Lines',
        overallRating: 4.3,
        reviewCount: 760,
        reputationScore: 86,
        avgPricePerMove: 4380,
        fmcsaSafetyRating: 'Satisfactory',
        isVerified: true,
        usdotNumber: '070851',
      },
    },
  };
}

export function isDemoInventoryId(id: string): boolean {
  return id.startsWith('demo-');
}