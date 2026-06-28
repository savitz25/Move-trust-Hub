import { Review } from '@/types';

export const seedReviews: Review[] = [
  // Allied
  { id: 'r-allied-1', companyId: 'allied', author: 'Michael R.', rating: 5, date: '2026-02-12', source: 'Google', content: 'Allied moved us from Chicago to Denver. Crew was professional, on time, and handled our piano with extreme care. Highly recommend.', verified: true, location: 'Chicago, IL' },
  { id: 'r-allied-2', companyId: 'allied', author: 'Sarah K.', rating: 4, date: '2026-01-28', source: 'BBB', content: 'Good experience overall. A couple boxes were slightly damaged but claims were handled quickly.', verified: true, location: 'Boston, MA' },
  { id: 'r-allied-3', companyId: 'allied', author: 'David P.', rating: 3, date: '2025-11-05', source: 'Trustpilot', content: 'The move was delayed by 3 days due to truck issues. Communication could have been better.', verified: false, location: 'Seattle, WA' },
  
  // JK Moving (high rated)
  { id: 'r-jk-1', companyId: 'jk-moving', author: 'Jennifer T.', rating: 5, date: '2026-03-01', source: 'Google', content: 'Best move we have ever had. JK crew arrived early, wrapped everything perfectly, and delivered to our new home in Virginia 2 days early. Worth every penny.', verified: true, location: 'Reston, VA' },
  { id: 'r-jk-2', companyId: 'jk-moving', author: 'Robert L.', rating: 5, date: '2026-02-14', source: 'Verified Customer', content: 'Used them for our corporate relocation from Maryland to Texas. Outstanding communication from start to finish.', verified: true, location: 'Austin, TX' },

  // International Van Lines
  { id: 'r-ivl-1', companyId: 'international-van', author: 'Maria G.', rating: 5, date: '2026-02-20', source: 'Trustpilot', content: 'IVL handled our move from Florida to California flawlessly. They even helped with our car shipping. Will use again.', verified: true, location: 'Miami, FL' },
  { id: 'r-ivl-2', companyId: 'international-van', author: 'Thomas B.', rating: 4, date: '2026-01-10', source: 'Google', content: 'Very competitive quote and solid service. The delivery was on the last day of the window but everything arrived safely.', verified: true, location: 'Phoenix, AZ' },

  // U-Pack
  { id: 'r-upack-1', companyId: 'u-pack', author: 'Amanda S.', rating: 5, date: '2026-03-05', source: 'Google', content: 'Saved us over $4,000 vs full service. The trailer was clean and arrived exactly when promised. Great for people who don\'t mind loading themselves.', verified: true, location: 'Portland, OR' },

  // Safeway
  { id: 'r-safeway-1', companyId: 'safeway', author: 'Kevin W.', rating: 4, date: '2026-02-08', source: 'BBB', content: 'Good price and the broker was honest about everything. The actual movers (their partner) were on time and careful.', verified: true, location: 'Dallas, TX' },
  { id: 'r-safeway-2', companyId: 'safeway', author: 'Lisa M.', rating: 2, date: '2025-12-12', source: 'Trustpilot', content: 'The broker quoted one price but the carrier tried to charge more on delivery day. Had to argue for 30 minutes.', verified: false, location: 'Atlanta, GA' },

  // United
  { id: 'r-united-1', companyId: 'united', author: 'Patricia H.', rating: 5, date: '2026-02-25', source: 'Google', content: 'United has moved our family three times now. Always professional. They treat your belongings like their own.', verified: true, location: 'Kansas City, MO' },

  // North American
  { id: 'r-na-1', companyId: 'north-american', author: 'Brian C.', rating: 5, date: '2026-01-19', source: 'Verified Customer', content: 'Excellent crew and fantastic tracking app. We could see the truck location the entire time. Highly recommend.', verified: true, location: 'Columbus, OH' },

  // Mayflower
  { id: 'r-may-1', companyId: 'mayflower', author: 'Nancy F.', rating: 4, date: '2026-02-03', source: 'BBB', content: 'Move went smoothly. One piece of furniture had a small scratch but they fixed it on site with touch-up. Good service.', verified: true, location: 'Raleigh, NC' },

  // Colonial
  { id: 'r-col-1', companyId: 'colonial-van-lines', author: 'James D.', rating: 3, date: '2026-01-22', source: 'Google', content: 'Average experience. The price was good but there were some communication gaps between the sales team and the actual moving crew.', verified: false, location: 'Las Vegas, NV' },

  // American Van Lines
  { id: 'r-avl-1', companyId: 'american-van-lines', author: 'Elena R.', rating: 5, date: '2026-03-08', source: 'Google', content: 'American Van Lines was fantastic. They packed our entire house in one day and delivered without a single issue to our new home in Tennessee.', verified: true, location: 'Orlando, FL' },

  // More reviews for breadth
  { id: 'r-pensey-1', companyId: 'pensey', author: 'Mark T.', rating: 5, date: '2026-02-27', source: 'Verified Customer', content: 'Pensey is the real deal. Extremely careful with our antiques and the crew was the most professional I have ever seen.', verified: true, location: 'Scottsdale, AZ' },
  { id: 'r-gentle-1', companyId: 'gentle-giant', author: 'Catherine B.', rating: 5, date: '2026-01-30', source: 'Google', content: 'Gentle Giant lived up to their name. They moved our baby grand piano and entire art collection without a scratch. Expensive but worth it.', verified: true, location: 'Boston, MA' },
  { id: 'r-bellhop-1', companyId: 'bellhop', author: 'Alex N.', rating: 4, date: '2026-02-15', source: 'Trustpilot', content: 'Used Bellhop for a smaller apartment move from NYC to Philly. The labor team was great and pricing transparent. The driving partner was a bit slow.', verified: true, location: 'New York, NY' },
  { id: 'r-royal-1', companyId: 'royal-moving', author: 'Stephanie L.', rating: 2, date: '2025-10-18', source: 'BBB', content: 'They were late by almost a week and the quote changed significantly. Would not recommend for time-sensitive moves.', verified: false, location: 'San Diego, CA' },

  // Amerisafe Van Lines (top-rated addition)
  { id: 'r-amerisafe-1', companyId: 'amerisafe', author: 'Robert H.', rating: 5, date: '2026-03-15', source: 'Google', content: 'Amerisafe moved our family from Dallas to Atlanta. The crew was on time, professional, and very careful with our furniture. Everything arrived in perfect condition. Great communication the whole way.', verified: true, location: 'Dallas, TX' },
  { id: 'r-amerisafe-2', companyId: 'amerisafe', author: 'Linda K.', rating: 5, date: '2026-02-22', source: 'Verified Customer', content: 'Outstanding service from start to finish. They arrived exactly on schedule, wrapped everything impeccably, and even helped with some last-minute adjustments. Highly recommend for anyone moving long distance.', verified: true, location: 'Phoenix, AZ' },
  { id: 'r-amerisafe-3', companyId: 'amerisafe', author: 'Michael S.', rating: 5, date: '2026-01-10', source: 'BBB', content: 'We used Amerisafe for a cross-country move with some fragile antiques. They treated every item like it was their own. Zero damage, on-time delivery, and the team was polite and efficient. Best movers we have ever used.', verified: true, location: 'Orlando, FL' },
  { id: 'r-amerisafe-4', companyId: 'amerisafe', author: 'Jennifer P.', rating: 4, date: '2026-03-28', source: 'Trustpilot', content: 'Very professional crew and excellent packing. Delivery was one day later than the original window but they notified us in advance and everything was handled smoothly.', verified: true, location: 'Austin, TX' },
  { id: 'r-amerisafe-5', companyId: 'amerisafe', author: 'David L.', rating: 5, date: '2026-02-05', source: 'Google', content: 'Top notch experience. Amerisafe handled our entire house move from Texas to California without a single issue. The quote was accurate and there were no surprise fees. Will use them again.', verified: true, location: 'Houston, TX' },
];

export const getReviewsForCompany = (companyId: string, limit?: number) => {
  const filtered = seedReviews.filter(r => r.companyId === companyId).sort((a, b) => b.date.localeCompare(a.date));
  return limit ? filtered.slice(0, limit) : filtered;
};
