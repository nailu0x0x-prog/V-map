-- Vmap Supabase schema

create extension if not exists "pgcrypto";

create table if not exists vtubers (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  bio         text,
  avatar_url  text,
  links       jsonb default '{}'::jsonb, -- { youtube, twitch, twitcasting, x }
  tags        text[] default '{}',
  mood        text,
  vector      float8[] not null default '{0,0,0,0,0,0,0,0}',
  created_at  timestamptz not null default now()
);

create table if not exists favorites (
  id          uuid primary key default gen_random_uuid(),
  session_id  text not null,
  vtuber_id   uuid not null references vtubers(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (session_id, vtuber_id)
);

create table if not exists impressions (
  id          uuid primary key default gen_random_uuid(),
  vtuber_id   uuid not null references vtubers(id) on delete cascade,
  type        text not null check (type in ('view', 'match')),
  created_at  timestamptz not null default now()
);

create index if not exists idx_favorites_vtuber on favorites(vtuber_id);
create index if not exists idx_impressions_vtuber on impressions(vtuber_id);
create index if not exists idx_vtubers_tags on vtubers using gin(tags);

-- Row Level Security
alter table vtubers enable row level security;
alter table favorites enable row level security;
alter table impressions enable row level security;

-- Public read access for vtubers
create policy "vtubers are publicly readable"
  on vtubers for select
  using (true);

-- Anyone can register a vtuber (no auth in MVP)
create policy "anyone can insert vtubers"
  on vtubers for insert
  with check (true);

create policy "anyone can update vtubers"
  on vtubers for update
  using (true);

create policy "anyone can delete vtubers"
  on vtubers for delete
  using (true);

-- Favorites: readable/writable by session
create policy "favorites are publicly readable"
  on favorites for select
  using (true);

create policy "anyone can insert favorites"
  on favorites for insert
  with check (true);

create policy "anyone can delete own favorites"
  on favorites for delete
  using (true);

-- Impressions: insert-only from client, readable for dashboard counts
create policy "impressions are publicly readable"
  on impressions for select
  using (true);

create policy "anyone can insert impressions"
  on impressions for insert
  with check (true);

-- Storage: avatar images
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "avatar images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "anyone can upload avatars"
  on storage.objects for insert
  with check (bucket_id = 'avatars');
