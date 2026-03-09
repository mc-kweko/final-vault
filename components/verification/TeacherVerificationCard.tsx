import { Shield, CheckCircle, AlertTriangle, XCircle, Award, Calendar, BookOpen, User } from 'lucide-react'
import { maskNationalId, getDaysUntilExpiry } from '@/lib/teacher-verification'
import Image from 'next/image'

interface TeacherVerificationCardProps {
  teacher: any
  verificationStatus: any
}

export default function TeacherVerificationCard({ teacher, verificationStatus }: TeacherVerificationCardProps) {
  const getStatusIcon = () => {
    if (verificationStatus.status_color === 'green') return <CheckCircle className="w-8 h-8" />
    if (verificationStatus.status_color === 'yellow') return <AlertTriangle className="w-8 h-8" />
    return <XCircle className="w-8 h-8" />
  }

  const getStatusBgColor = () => {
    if (verificationStatus.status_color === 'green') return 'from-green-500 to-green-600'
    if (verificationStatus.status_color === 'yellow') return 'from-amber-500 to-amber-600'
    return 'from-red-500 to-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Verification Status Banner */}
      <div className={`bg-gradient-to-r ${getStatusBgColor()} rounded-3xl p-8 text-white shadow-2xl`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {getStatusIcon()}
            <div>
              <div className="text-sm opacity-90 mb-1">Verification Status</div>
              <div className="text-3xl font-bold">{verificationStatus.status_message}</div>
            </div>
          </div>
          <Shield className="w-20 h-20 opacity-20" />
        </div>
      </div>

      {/* Teacher Profile */}
      <div className="bg-white border-2 border-border rounded-3xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Teacher Profile
        </h2>
        <div className="flex items-start gap-6">
          <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white text-4xl font-bold shrink-0">
            {teacher.profile_photo_url ? (
              <Image src={teacher.profile_photo_url} alt={teacher.full_name} width={128} height={128} className="rounded-2xl" />
            ) : (
              teacher.full_name.charAt(0)
            )}
          </div>
          <div className="flex-1 grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Full Name</div>
              <div className="font-bold text-lg">{teacher.full_name}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Registration Number</div>
              <div className="font-bold text-lg">{teacher.teacher_registration_number}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">National ID</div>
              <div className="font-bold text-lg">{maskNationalId(teacher.national_id)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Gender</div>
              <div className="font-bold text-lg">{teacher.gender}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Current School</div>
              <div className="font-bold text-lg">{teacher.current_school || 'Not specified'}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Experience</div>
              <div className="font-bold text-lg">{teacher.years_of_experience} years</div>
            </div>
          </div>
        </div>
      </div>

      {/* Qualifications */}
      <div className="bg-white border-2 border-border rounded-3xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Qualifications
        </h2>
        <div className="space-y-4">
          {teacher.teacher_qualifications?.map((qual: any) => (
            <div key={qual.id} className="flex items-start gap-4 p-4 bg-gradient-to-r from-muted to-muted/50 rounded-2xl">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                qual.verified ? 'bg-gradient-to-br from-green-500 to-green-600 text-white' : 'bg-amber-100 text-amber-600'
              }`}>
                <Award className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="font-bold text-lg">{qual.qualification_title}</div>
                  {qual.verified && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {qual.institution_name} • {qual.graduation_year}
                </div>
                {qual.field_of_study && (
                  <div className="text-sm text-muted-foreground mt-1">
                    Field: {qual.field_of_study}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teaching License */}
      {teacher.teaching_licenses?.[0] && (
        <div className="bg-white border-2 border-border rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Teaching License
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-muted to-muted/50 rounded-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">License Number</div>
                <div className="font-bold">{teacher.teaching_licenses[0].license_number}</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-muted to-muted/50 rounded-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Issue Date</div>
                <div className="font-bold">{new Date(teacher.teaching_licenses[0].issue_date).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-muted to-muted/50 rounded-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Expiry Date</div>
                <div className="font-bold">{new Date(teacher.teaching_licenses[0].expiry_date).toLocaleDateString()}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {getDaysUntilExpiry(teacher.teaching_licenses[0].expiry_date)} days remaining
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-muted to-muted/50 rounded-2xl">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${
                teacher.teaching_licenses[0].license_status === 'valid' 
                  ? 'bg-gradient-to-br from-green-500 to-green-600' 
                  : 'bg-gradient-to-br from-red-500 to-red-600'
              }`}>
                {teacher.teaching_licenses[0].license_status === 'valid' ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Status</div>
                <div className="font-bold uppercase">{teacher.teaching_licenses[0].license_status}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Specializations */}
      {teacher.teaching_specializations?.length > 0 && (
        <div className="bg-white border-2 border-border rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Teaching Specializations
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {teacher.teaching_specializations.map((spec: any) => (
              <div key={spec.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-muted to-muted/50 rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold">{spec.subject}</div>
                  <div className="text-sm text-muted-foreground">{spec.education_level} • {spec.years_teaching_subject} years</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
