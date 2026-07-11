function gradeToTrustBoost(rating: string | null | undefined): number {
  if (!rating) return 0;
  const map: Record<string, number> = {
    'A+': 8,
    A: 6,
    'A-': 4,
    'B+': 2,
    B: 0,
    'B-': -2,
  };
  return map[rating] ?? 0;
}

export function computeProviderTrustScore(input: {
  googleRating?: number | null;
  googleReviewCount?: number | null;
  bbbRating?: string | null;
  bbbAccredited?: boolean | null;
  isVerified?: boolean;
  yearsInBusiness?: number | null;
}): number {
  let score = 65;

  const googleRating = input.googleRating;
  const reviewCount = input.googleReviewCount ?? 0;

  if (googleRating != null) score += (googleRating - 3.5) * 8;
  if (reviewCount > 25) score += 2;
  if (reviewCount > 100) score += 3;
  if (reviewCount > 300) score += 2;

  score += gradeToTrustBoost(input.bbbRating);
  if (input.bbbAccredited) score += 5;
  if (input.isVerified) score += 3;
  if (input.yearsInBusiness != null && input.yearsInBusiness >= 10) score += 3;
  if (input.yearsInBusiness != null && input.yearsInBusiness >= 20) score += 2;

  return Math.max(0, Math.min(100, Math.round(score)));
}