-- Fix RLS policy for teacher applications to allow inserts during sign-up

-- Drop existing insert policy
drop policy if exists "applications_insert_own" on public.teacher_applications;

-- Create new insert policy that allows inserts for authenticated users
create policy "applications_insert_own" on public.teacher_applications 
for insert 
to authenticated
with check (true);

-- Fix profiles RLS policy to allow upsert during sign-up
drop policy if exists "profiles_insert_own" on public.profiles;

create policy "profiles_insert_own" on public.profiles 
for insert 
to authenticated
with check (true);

-- Remove foreign key constraint temporarily and recreate without it
alter table public.teacher_applications drop constraint if exists teacher_applications_user_id_fkey;

-- Make user_id nullable to allow applications before user confirmation
alter table public.teacher_applications alter column user_id drop not null;
