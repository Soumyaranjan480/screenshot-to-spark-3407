-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users can read their own roles" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- Owner email is the only account that becomes admin
create or replace function public.grant_owner_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if lower(new.email) = 'kundusoumyaranjan480@gmail.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin')
    on conflict (user_id, role) do nothing;
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created_grant_owner
  after insert on auth.users
  for each row execute function public.grant_owner_admin();

insert into public.user_roles (user_id, role)
select id, 'admin' from auth.users where lower(email) = 'kundusoumyaranjan480@gmail.com'
on conflict do nothing;

-- Daily metal rates
create table public.metal_rates (
  id text primary key,
  label text not null,
  unit text not null,
  rate numeric(12,2) check (rate is null or rate >= 0),
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);
grant select on public.metal_rates to anon, authenticated;
grant update on public.metal_rates to authenticated;
grant all on public.metal_rates to service_role;
alter table public.metal_rates enable row level security;
create policy "Anyone can read rates" on public.metal_rates
  for select to anon, authenticated using (true);
create policy "Owner can update rates" on public.metal_rates
  for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create or replace function public.touch_metal_rates()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
create trigger metal_rates_touch before update on public.metal_rates
  for each row execute function public.touch_metal_rates();

insert into public.metal_rates (id, label, unit, rate, sort_order) values
  ('gold_24k', 'Gold 24K', '10 g', null, 1),
  ('gold_22k', 'Gold 22K', '10 g', null, 2),
  ('gold_18k', 'Gold 18K', '10 g', null, 3),
  ('silver', 'Silver', '1 kg', null, 4);