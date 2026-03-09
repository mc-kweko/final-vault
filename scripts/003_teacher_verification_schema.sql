-- Teacher Verification Portal Schema
-- Uganda Teacher Verification System

-- ============================================
-- VERIFIED TEACHERS TABLE
-- ============================================
create table if not exists public.verified_teachers (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  national_id text unique not null,
  date_of_birth date not null,
  gender text check (gender in ('Male', 'Female', 'Other')),
  teacher_registration_number text unique not null,
  profile_photo_url text,
  phone text,
  email text,
  current_school text,
  years_of_experience integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_teacher_reg_number on public.verified_teachers(teacher_registration_number);
create index idx_national_id on public.verified_teachers(national_id);
create index idx_full_name on public.verified_teachers(full_name);

alter table public.verified_teachers enable row level security;
create policy "verified_teachers_select_all" on public.verified_teachers for select using (true);
create policy "verified_teachers_insert_admin" on public.verified_teachers for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "verified_teachers_update_admin" on public.verified_teachers for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- QUALIFICATIONS TABLE
-- ============================================
create table if not exists public.teacher_qualifications (
  id uuid primary key default uuid_generate_v4(),
  teacher_id uuid references public.verified_teachers(id) on delete cascade,
  qualification_title text not null,
  qualification_level text check (qualification_level in ('Certificate', 'Diploma', 'Bachelors', 'Masters', 'PhD')),
  institution_name text not null,
  graduation_year integer not null,
  certificate_number text,
  field_of_study text,
  verified boolean default false,
  verified_by uuid references public.profiles(id),
  verified_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

alter table public.teacher_qualifications enable row level security;
create policy "qualifications_select_all" on public.teacher_qualifications for select using (true);
create policy "qualifications_insert_admin" on public.teacher_qualifications for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "qualifications_update_admin" on public.teacher_qualifications for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- TEACHING LICENSES TABLE
-- ============================================
create table if not exists public.teaching_licenses (
  id uuid primary key default uuid_generate_v4(),
  teacher_id uuid references public.verified_teachers(id) on delete cascade,
  license_number text unique not null,
  issue_date date not null,
  expiry_date date not null,
  license_status text not null default 'valid' check (license_status in ('valid', 'expired', 'suspended', 'revoked')),
  issuing_authority text default 'Ministry of Education and Sports, Uganda',
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_license_number on public.teaching_licenses(license_number);

alter table public.teaching_licenses enable row level security;
create policy "licenses_select_all" on public.teaching_licenses for select using (true);
create policy "licenses_insert_admin" on public.teaching_licenses for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "licenses_update_admin" on public.teaching_licenses for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- TEACHING SPECIALIZATIONS TABLE
-- ============================================
create table if not exists public.teaching_specializations (
  id uuid primary key default uuid_generate_v4(),
  teacher_id uuid references public.verified_teachers(id) on delete cascade,
  subject text not null,
  education_level text not null check (education_level in ('Primary', 'O-Level', 'A-Level', 'Tertiary')),
  years_teaching_subject integer default 0,
  created_at timestamp with time zone default now()
);

alter table public.teaching_specializations enable row level security;
create policy "specializations_select_all" on public.teaching_specializations for select using (true);
create policy "specializations_insert_admin" on public.teaching_specializations for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- VERIFICATION LOGS TABLE
-- ============================================
create table if not exists public.verification_logs (
  id uuid primary key default uuid_generate_v4(),
  searched_registration_number text,
  searched_national_id text,
  searched_name text,
  result_found boolean default false,
  teacher_id uuid references public.verified_teachers(id),
  searched_by_user uuid references public.profiles(id),
  ip_address text,
  search_timestamp timestamp with time zone default now()
);

create index idx_verification_logs_timestamp on public.verification_logs(search_timestamp desc);

alter table public.verification_logs enable row level security;
create policy "verification_logs_insert_all" on public.verification_logs for insert with check (true);
create policy "verification_logs_select_admin" on public.verification_logs for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- DISCIPLINARY RECORDS TABLE
-- ============================================
create table if not exists public.disciplinary_records (
  id uuid primary key default uuid_generate_v4(),
  teacher_id uuid references public.verified_teachers(id) on delete cascade,
  description text not null,
  action_taken text not null,
  severity text check (severity in ('Minor', 'Moderate', 'Severe')),
  record_date date not null,
  resolved boolean default false,
  resolved_date date,
  created_by uuid references public.profiles(id),
  created_at timestamp with time zone default now()
);

alter table public.disciplinary_records enable row level security;
create policy "disciplinary_select_admin" on public.disciplinary_records for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "disciplinary_insert_admin" on public.disciplinary_records for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "disciplinary_update_admin" on public.disciplinary_records for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- FUNCTION: Check License Expiry Status
-- ============================================
create or replace function get_license_expiry_status(expiry_date date)
returns text
language plpgsql
as $$
declare
  days_until_expiry integer;
begin
  days_until_expiry := expiry_date - current_date;
  
  if days_until_expiry < 0 then
    return 'expired';
  elsif days_until_expiry <= 30 then
    return 'expiring_soon';
  else
    return 'valid';
  end if;
end;
$$;

-- ============================================
-- FUNCTION: Get Teacher Verification Status
-- ============================================
create or replace function get_teacher_verification_status(teacher_uuid uuid)
returns table (
  is_verified boolean,
  status_message text,
  status_color text
)
language plpgsql
as $$
declare
  has_valid_license boolean;
  has_verified_qualification boolean;
  has_active_suspension boolean;
  license_expiry_status text;
begin
  -- Check for valid license
  select exists(
    select 1 from public.teaching_licenses 
    where teacher_id = teacher_uuid 
    and license_status = 'valid'
    and expiry_date > current_date
  ) into has_valid_license;
  
  -- Check for verified qualification
  select exists(
    select 1 from public.teacher_qualifications 
    where teacher_id = teacher_uuid 
    and verified = true
  ) into has_verified_qualification;
  
  -- Check for active disciplinary suspension
  select exists(
    select 1 from public.disciplinary_records 
    where teacher_id = teacher_uuid 
    and resolved = false
    and severity = 'Severe'
  ) into has_active_suspension;
  
  -- Determine status
  if has_active_suspension then
    return query select false, 'SUSPENDED - Active Disciplinary Action'::text, 'red'::text;
  elsif not has_valid_license then
    return query select false, 'NOT VERIFIED - Invalid or Expired License'::text, 'red'::text;
  elsif not has_verified_qualification then
    return query select false, 'PENDING - Qualification Not Verified'::text, 'yellow'::text;
  else
    -- Check if license is expiring soon
    select get_license_expiry_status(expiry_date) into license_expiry_status
    from public.teaching_licenses 
    where teacher_id = teacher_uuid 
    and license_status = 'valid'
    limit 1;
    
    if license_expiry_status = 'expiring_soon' then
      return query select true, 'VERIFIED - License Expiring Soon'::text, 'yellow'::text;
    else
      return query select true, 'VERIFIED QUALIFIED TEACHER'::text, 'green'::text;
    end if;
  end if;
end;
$$;

-- ============================================
-- SEED DATA: Sample Verified Teachers
-- ============================================
insert into public.verified_teachers (full_name, national_id, date_of_birth, gender, teacher_registration_number, phone, email, current_school, years_of_experience) values
  ('Sarah Nakato', 'CM90012345678', '1985-03-15', 'Female', 'TRN-UG-2010-001234', '+256700123456', 'sarah.nakato@example.com', 'Kampala High School', 13),
  ('John Okello', 'CM89011234567', '1982-07-22', 'Male', 'TRN-UG-2008-005678', '+256701234567', 'john.okello@example.com', 'Makerere College School', 15),
  ('Grace Nambi', 'CM92013456789', '1988-11-10', 'Female', 'TRN-UG-2012-009876', '+256702345678', 'grace.nambi@example.com', 'St Mary Secondary School', 11)
on conflict do nothing;

-- Add qualifications for sample teachers
insert into public.teacher_qualifications (teacher_id, qualification_title, qualification_level, institution_name, graduation_year, certificate_number, field_of_study, verified) 
select id, 'Bachelor of Education', 'Bachelors', 'Makerere University', 2010, 'MUK-EDU-2010-1234', 'Mathematics Education', true
from public.verified_teachers where teacher_registration_number = 'TRN-UG-2010-001234'
on conflict do nothing;

insert into public.teacher_qualifications (teacher_id, qualification_title, qualification_level, institution_name, graduation_year, certificate_number, field_of_study, verified) 
select id, 'Bachelor of Science in Education', 'Bachelors', 'Kyambogo University', 2008, 'KYU-SCI-2008-5678', 'Physics Education', true
from public.verified_teachers where teacher_registration_number = 'TRN-UG-2008-005678'
on conflict do nothing;

-- Add teaching licenses
insert into public.teaching_licenses (teacher_id, license_number, issue_date, expiry_date, license_status)
select id, 'LIC-UG-2020-001234', '2020-01-15', '2025-01-15', 'valid'
from public.verified_teachers where teacher_registration_number = 'TRN-UG-2010-001234'
on conflict do nothing;

insert into public.teaching_licenses (teacher_id, license_number, issue_date, expiry_date, license_status)
select id, 'LIC-UG-2019-005678', '2019-06-20', '2024-06-20', 'valid'
from public.verified_teachers where teacher_registration_number = 'TRN-UG-2008-005678'
on conflict do nothing;

-- Add specializations
insert into public.teaching_specializations (teacher_id, subject, education_level, years_teaching_subject)
select id, 'Mathematics', 'O-Level', 10
from public.verified_teachers where teacher_registration_number = 'TRN-UG-2010-001234'
on conflict do nothing;

insert into public.teaching_specializations (teacher_id, subject, education_level, years_teaching_subject)
select id, 'Physics', 'A-Level', 12
from public.verified_teachers where teacher_registration_number = 'TRN-UG-2008-005678'
on conflict do nothing;
