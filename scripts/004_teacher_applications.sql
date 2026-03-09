-- Teacher Application System Schema
-- Adds pending teacher applications and supreme admin functionality

-- ============================================
-- TEACHER APPLICATIONS TABLE (Pending Approval)
-- ============================================
create table if not exists public.teacher_applications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
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

alter table public.teacher_applications enable row level security;

-- Users can view their own applications
create policy "applications_select_own" on public.teacher_applications for select using (user_id = auth.uid());

-- Users can insert their own applications
create policy "applications_insert_own" on public.teacher_applications for insert with check (user_id = auth.uid());

-- Only supreme admin can view all applications
create policy "applications_select_admin" on public.teacher_applications for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Only supreme admin can update applications
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
  new_teacher_id uuid;
  new_qual_id uuid;
  new_license_id uuid;
  spec jsonb;
begin
  -- Get application details
  select * into app_record from public.teacher_applications where id = application_id;
  
  if not found then
    raise exception 'Application not found';
  end if;
  
  if app_record.application_status != 'pending' then
    raise exception 'Application already processed';
  end if;
  
  -- Create verified teacher record
  insert into public.verified_teachers (
    full_name, national_id, date_of_birth, gender, teacher_registration_number,
    phone, email, current_school, years_of_experience
  ) values (
    app_record.full_name, app_record.national_id, app_record.date_of_birth, 
    app_record.gender, app_record.teacher_registration_number,
    app_record.phone, app_record.email, app_record.current_school, app_record.years_of_experience
  ) returning id into new_teacher_id;
  
  -- Create qualification record (auto-verified)
  insert into public.teacher_qualifications (
    teacher_id, qualification_title, qualification_level, institution_name,
    graduation_year, certificate_number, field_of_study, verified, verified_by, verified_at
  ) values (
    new_teacher_id, app_record.qualification_title, app_record.qualification_level,
    app_record.institution_name, app_record.graduation_year, app_record.certificate_number,
    app_record.field_of_study, true, admin_id, now()
  ) returning id into new_qual_id;
  
  -- Create teaching license
  insert into public.teaching_licenses (
    teacher_id, license_number, issue_date, expiry_date, license_status
  ) values (
    new_teacher_id, app_record.license_number, app_record.license_issue_date,
    app_record.license_expiry_date, 'valid'
  ) returning id into new_license_id;
  
  -- Create specializations
  if app_record.specializations is not null then
    for spec in select * from jsonb_array_elements(app_record.specializations)
    loop
      insert into public.teaching_specializations (
        teacher_id, subject, education_level, years_teaching_subject
      ) values (
        new_teacher_id, 
        spec->>'subject', 
        spec->>'education_level',
        (spec->>'years_teaching_subject')::integer
      );
    end loop;
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
  
  return new_teacher_id;
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
