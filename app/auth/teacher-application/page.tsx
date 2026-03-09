'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Shield, Plus, Trash2 } from 'lucide-react'

export default function TeacherApplicationPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    national_id: '',
    date_of_birth: '',
    gender: 'Male',
    teacher_registration_number: '',
    phone: '',
    current_school: '',
    years_of_experience: 0,
    qualification_title: '',
    qualification_level: 'Bachelors',
    institution_name: '',
    graduation_year: '',
    certificate_number: '',
    field_of_study: '',
    license_number: '',
    license_issue_date: '',
    license_expiry_date: ''
  })

  const [specializations, setSpecializations] = useState([
    { subject: '', education_level: 'O-Level', years_teaching_subject: 0 }
  ])

  const addSpecialization = () => {
    setSpecializations([...specializations, { subject: '', education_level: 'O-Level', years_teaching_subject: 0 }])
  }

  const removeSpecialization = (index: number) => {
    setSpecializations(specializations.filter((_, i) => i !== index))
  }

  const updateSpecialization = (index: number, field: string, value: any) => {
    const updated = [...specializations]
    updated[index] = { ...updated[index], [field]: value }
    setSpecializations(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()

    // Create auth account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { full_name: formData.full_name, role: 'student' },
        emailRedirectTo: undefined // Skip email confirmation
      }
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (!authData.user) {
      setError('Failed to create account')
      setLoading(false)
      return
    }

    // Wait for trigger to create profile
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Submit application
    const { password: __, ...applicationData } = formData
    const { error: appError } = await supabase.from('teacher_applications').insert({
      user_id: authData.user.id,
      ...applicationData,
      specializations: specializations.filter(s => s.subject)
    })

    if (appError) {
      setError(appError.message)
      setLoading(false)
      return
    }

    router.push('/auth/teacher-application/pending')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 py-12">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2 mb-8 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
              <Image src="/qvault logo (2).png" alt="Q'Vault" width={96} height={96} className="rounded-2xl shadow-lg group-hover:shadow-2xl transition-all relative" />
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">Q'Vault</div>
              <div className="text-sm text-muted-foreground font-semibold tracking-wider uppercase mt-1">Practice Makes Perfect !</div>
            </div>
          </Link>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Teacher Application</h1>
          <p className="text-muted-foreground">Complete verification form to join as a facilitator</p>
        </div>

        <div className="bg-white border-2 border-border rounded-3xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Account Credentials */}
            <div>
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Account Credentials</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Password *</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">National ID *</label>
                  <input
                    type="text"
                    value={formData.national_id}
                    onChange={(e) => setFormData({ ...formData, national_id: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Teacher Registration Number *</label>
                  <input
                    type="text"
                    value={formData.teacher_registration_number}
                    onChange={(e) => setFormData({ ...formData, teacher_registration_number: e.target.value })}
                    placeholder="TRN-UG-YYYY-XXXXXX"
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+256700000000"
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Current School</label>
                  <input
                    type="text"
                    value={formData.current_school}
                    onChange={(e) => setFormData({ ...formData, current_school: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Years of Experience *</label>
                  <input
                    type="number"
                    value={formData.years_of_experience || ''}
                    onChange={(e) => setFormData({ ...formData, years_of_experience: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Qualification */}
            <div>
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Highest Qualification</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Qualification Title *</label>
                  <input
                    type="text"
                    value={formData.qualification_title}
                    onChange={(e) => setFormData({ ...formData, qualification_title: e.target.value })}
                    placeholder="e.g., Bachelor of Education"
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Level *</label>
                  <select
                    value={formData.qualification_level}
                    onChange={(e) => setFormData({ ...formData, qualification_level: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="Certificate">Certificate</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelors">Bachelors</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Institution *</label>
                  <input
                    type="text"
                    value={formData.institution_name}
                    onChange={(e) => setFormData({ ...formData, institution_name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Graduation Year *</label>
                  <input
                    type="number"
                    value={formData.graduation_year}
                    onChange={(e) => setFormData({ ...formData, graduation_year: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    min="1950"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Certificate Number</label>
                  <input
                    type="text"
                    value={formData.certificate_number}
                    onChange={(e) => setFormData({ ...formData, certificate_number: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Field of Study *</label>
                  <input
                    type="text"
                    value={formData.field_of_study}
                    onChange={(e) => setFormData({ ...formData, field_of_study: e.target.value })}
                    placeholder="e.g., Mathematics Education"
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Teaching License */}
            <div>
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Teaching License</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">License Number *</label>
                  <input
                    type="text"
                    value={formData.license_number}
                    onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                    placeholder="LIC-UG-YYYY-XXXXXX"
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Issue Date *</label>
                  <input
                    type="date"
                    value={formData.license_issue_date}
                    onChange={(e) => setFormData({ ...formData, license_issue_date: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Expiry Date *</label>
                  <input
                    type="date"
                    value={formData.license_expiry_date}
                    onChange={(e) => setFormData({ ...formData, license_expiry_date: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Teaching Specializations</h2>
                <button
                  type="button"
                  onClick={addSpecialization}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Subject
                </button>
              </div>
              <div className="space-y-3">
                {specializations.map((spec, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={spec.subject}
                      onChange={(e) => updateSpecialization(index, 'subject', e.target.value)}
                      placeholder="Subject (e.g., Mathematics)"
                      className="flex-1 px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <select
                      value={spec.education_level}
                      onChange={(e) => updateSpecialization(index, 'education_level', e.target.value)}
                      className="px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="Primary">Primary</option>
                      <option value="O-Level">O-Level</option>
                      <option value="A-Level">A-Level</option>
                      <option value="Tertiary">Tertiary</option>
                    </select>
                    <input
                      type="number"
                      value={spec.years_teaching_subject || ''}
                      onChange={(e) => updateSpecialization(index, 'years_teaching_subject', parseInt(e.target.value) || 0)}
                      placeholder="Years"
                      className="w-24 px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                      min="0"
                    />
                    {specializations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpecialization(index)}
                        className="px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/auth/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
