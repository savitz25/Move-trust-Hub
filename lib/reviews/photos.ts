import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';

const MAX_PHOTOS = 3;
const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];

export async function uploadReviewPhotos(
  files: File[],
  reviewId: string
): Promise<string[]> {
  if (!files.length || !isSupabaseAdminConfigured()) return [];

  const admin = createAdminClient();
  const urls: string[] = [];

  for (const file of files.slice(0, MAX_PHOTOS)) {
    if (!ALLOWED.includes(file.type) || file.size > MAX_BYTES) continue;

    const ext = file.type.split('/')[1] || 'jpg';
    const path = `${reviewId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await admin.storage.from('review-photos').upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

    if (error) continue;

    const { data } = admin.storage.from('review-photos').getPublicUrl(path);
    if (data?.publicUrl) urls.push(data.publicUrl);
  }

  return urls;
}