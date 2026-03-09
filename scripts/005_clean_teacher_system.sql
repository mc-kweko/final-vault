-- Clean Teacher Verification System Schema
-- Drops old unused tables and creates only necessary ones

-- ============================================
-- DROP OLD UNUSED TABLES
-- ============================================
drop table if exists public.disciplinary_records cascade;
drop table if exists public.verification_logs cascade;
drop table if exists public.teaching_specializations cascade;
drop table if exists public.teaching_licenses cascade;
drop table if exists public.teacher_qualifications cascade;
drop table if exists public.verified_teachers cascade;

-- Drop old functions
drop function if exists get_license_expiry_status(date);
drop function if exists get_teacher_verification_status(uuid);

-- ============================================
-- TEACHER APPLICATIONS TABLE (Main Table)
-- ============================================
create table if not exists public.teacher_applications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  
  -- Personal Information
  full_name text not null,
  national_id text unique not null,
  date_of_birth date not null,
  gender text check (gender in ('Male', 'Female', 'Other')),
  teacher_registration_number text unique not null,
  phone text not null,
  email text not null,
  current_school text,
  years_of_experience integer default 0,
  
  -- Qualification Details
  qualification_title text not null,
  qualification_level text not null,
  institution_name text not null,
  graduation_year integer not null,
  certificate_number text,
  field_of_study text,
  
  -- License Details
  license_number text not null,
  license_issue_date date not null,
  license_expiry_date date not null,
  
  -- Specializations (JSON array)
  specializations jsonb,
  
  -- Application Status
  application_status text not null default 'pending' check (application_status in ('pending', 'approved', 'rejected')),
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamp with time zone,
  rejection_reason text,
  
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_application_status on public.teacher_applications(application_status);
create index idx_application_user_id on public.teacher_applications(user_id);
create index idx_teacher_reg_number on public.teacher_applications(teacher_registration_number);

alter table public.teacher_applications enable row level security;

create policy "applications_select_own" on public.teacher_applications for select using (user_id = auth.uid());
create policy "applications_insert_own" on public.teacher_applications for insert with check (user_id = auth.uid());
create policy "applications_select_admin" on public.teacher_applications for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "applications_update_admin" on public.teacher_applications for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- FUNCTION: Approve Teacher Application
-- ============================================
create or replace function approve_teacher_application(application_id uuid, admin_id uuid)
returns uuid
language plpgsql
security definer
as $$
declare
  app_record record;
begin
  -- Get application details
  select * into app_record from public.teacher_applications where id = application_id;
  
  if not found then
    raise exception 'Application not found';
  end if;
  
  if app_record.application_status != 'pending' then
    raise exception 'Application already processed';
  end if;
  
  -- Update application status
  update public.teacher_applications
  set application_status = 'approved',
      reviewed_by = admin_id,
      reviewed_at = now()
  where id = application_id;
  
  -- Update user profile role to teacher
  update public.profiles
  set role = 'teacher'
  where id = app_record.user_id;
  
  return app_record.user_id;
end;
$$;

-- ============================================
-- FUNCTION: Reject Teacher Application
-- ============================================
create or replace function reject_teacher_application(
  application_id uuid, 
  admin_id uuid, 
  reason text
)
returns void
language plpgsql
security definer
as $$
begin
  update public.teacher_applications
  set application_status = 'rejected',
      reviewed_by = admin_id,
      reviewed_at = now(),
      rejection_reason = reason
  where id = application_id
  and application_status = 'pending';
  
  if not found then
    raise exception 'Application not found or already processed';
  end if;
end;
$$;
