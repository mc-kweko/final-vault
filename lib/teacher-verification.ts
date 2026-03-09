import { createClient } from '@/lib/supabase/client'

// Search for teacher by registration number, national ID, or name
export async function searchTeacher(searchQuery: string, searchType: 'registration' | 'national_id' | 'name') {
  const supabase = createClient()
  
  let query = supabase
    .from('verified_teachers')
    .select(`
      *,
      teacher_qualifications (*),
      teaching_licenses (*),
      teaching_specializations (*)
    `)

  if (searchType === 'registration') {
    query = query.eq('teacher_registration_number', searchQuery)
  } else if (searchType === 'national_id') {
    query = query.eq('national_id', searchQuery)
  } else {
    query = query.ilike('full_name', `%${searchQuery}%`)
  }

  const { data, error } = await query.single()

  // Log the search
  await logVerificationSearch(searchQuery, searchType, !!data)

  return { data, error }
}

// Get teacher verification status
export async function getTeacherVerificationStatus(teacherId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .rpc('get_teacher_verification_status', { teacher_uuid: teacherId })
    .single()

  return { data, error }
}

// Log verification search
async function logVerificationSearch(searchQuery: string, searchType: string, found: boolean) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const logData: any = {
    result_found: found,
    searched_by_user: user?.id || null
  }

  if (searchType === 'registration') {
    logData.searched_registration_number = searchQuery
  } else if (searchType === 'national_id') {
    logData.searched_national_id = searchQuery
  } else {
    logData.searched_name = searchQuery
  }

  await supabase.from('verification_logs').insert(logData)
}

// Get all qualifications for a teacher
export async function getTeacherQualifications(teacherId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('teacher_qualifications')
    .select('*')
    .eq('teacher_id', teacherId)
    .order('graduation_year', { ascending: false })

  return { data, error }
}

// Get teaching license for a teacher
export async function getTeachingLicense(teacherId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('teaching_licenses')
    .select('*')
    .eq('teacher_id', teacherId)
    .order('issue_date', { ascending: false })
    .limit(1)
    .single()

  return { data, error }
}

// Get teaching specializations
export async function getTeachingSpecializations(teacherId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('teaching_specializations')
    .select('*')
    .eq('teacher_id', teacherId)

  return { data, error }
}

// Admin: Add new verified teacher
export async function addVerifiedTeacher(teacherData: any) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('verified_teachers')
    .insert(teacherData)
    .select()
    .single()

  return { data, error }
}

// Admin: Add qualification
export async function addQualification(qualificationData: any) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('teacher_qualifications')
    .insert(qualificationData)
    .select()
    .single()

  return { data, error }
}

// Admin: Add teaching license
export async function addTeachingLicense(licenseData: any) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('teaching_licenses')
    .insert(licenseData)
    .select()
    .single()

  return { data, error }
}

// Admin: Update license status
export async function updateLicenseStatus(licenseId: string, status: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('teaching_licenses')
    .update({ license_status: status, updated_at: new Date().toISOString() })
    .eq('id', licenseId)
    .select()
    .single()

  return { data, error }
}

// Admin: Verify qualification
export async function verifyQualification(qualificationId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('teacher_qualifications')
    .update({ 
      verified: true, 
      verified_by: user?.id,
      verified_at: new Date().toISOString()
    })
    .eq('id', qualificationId)
    .select()
    .single()

  return { data, error }
}

// Admin: Add disciplinary record
export async function addDisciplinaryRecord(recordData: any) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('disciplinary_records')
    .insert({ ...recordData, created_by: user?.id })
    .select()
    .single()

  return { data, error }
}

// Admin: Get all verification logs
export async function getVerificationLogs(limit = 50) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('verification_logs')
    .select('*, profiles(full_name)')
    .order('search_timestamp', { ascending: false })
    .limit(limit)

  return { data, error }
}

// Mask national ID for privacy
export function maskNationalId(nationalId: string): string {
  if (!nationalId || nationalId.length < 8) return '****'
  return nationalId.substring(0, 4) + '****' + nationalId.substring(nationalId.length - 2)
}

// Calculate days until license expiry
export function getDaysUntilExpiry(expiryDate: string): number {
  const expiry = new Date(expiryDate)
  const today = new Date()
  const diffTime = expiry.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Get license status color
export function getLicenseStatusColor(status: string, expiryDate?: string): string {
  if (status === 'suspended' || status === 'revoked') return 'red'
  if (status === 'expired') return 'red'
  
  if (expiryDate) {
    const days = getDaysUntilExpiry(expiryDate)
    if (days <= 30) return 'yellow'
  }
  
  return 'green'
}
