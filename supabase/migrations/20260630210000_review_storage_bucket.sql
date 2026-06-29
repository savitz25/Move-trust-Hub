-- Review photo storage bucket (run in Supabase SQL Editor if needed)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'review-photos',
  'review-photos',
  true,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Service role uploads; public read for approved review display
drop policy if exists "Public read review photos" on storage.objects;
create policy "Public read review photos"
  on storage.objects for select
  using (bucket_id = 'review-photos');

drop policy if exists "Service role upload review photos" on storage.objects;
create policy "Service role upload review photos"
  on storage.objects for insert
  to service_role
  with check (bucket_id = 'review-photos');