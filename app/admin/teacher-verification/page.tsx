'use client'

import { useState, useEffect } from 'react'
import { Plus, Users, Award, Shield, FileText } from 'lucide-react'
import { addVerifiedTeacher, addQualification, addTeachingLicense, verifyQualification, getVerificationLogs } from '@/lib/teacher-verification'

export default function AdminTeacherVerificationPage() {
  const [activeTab, setActiveTab] = useState<'add-teacher' | 'add-qualification' | 'add-license' | 'logs'>('add-teacher')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [teacherData, setTeacherData] = useState({
    full_name: '',
    national_id: '',
    date_of_birth: '',
    gender: 'Male',
    teacher_registration_number: '',
    phone: '',
    email: '',
    current_school: '',
    years_of_experience: 0
  })

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const { data, error: err } = await addVerifiedTeacher(teacherData)

    if (err) {
      setError(err.message)
    } else {
      setSuccess('Teacher added successfully!')
      setTeacherData({
        full_name: '',
        national_id: '',
        date_of_birth: '',
        gender: 'Male',
        teacher_registration_number: '',
        phone: '',
        email: '',
        current_school: '',
        years_of_experience: 0
      })
    }
    setLoading(false)
  }

  const tabs = [
    { id: 'add-teacher', label: 'Add Teacher', icon: Users },
    { id: 'add-qualification', label: 'Add Qualification', icon: Award },
    { id: 'add-license', label: 'Add License', icon: Shield },
    { id: 'logs', label: 'Verification Logs', icon: FileText }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted to-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Teacher Verification Admin
          </h1>
          <p className="text-muted-foreground text-lg">Manage teacher records and verifications</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg scale-105'
                  : 'bg-white border-2 border-border hover:border-primary hover:scale-105'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Add Teacher Form */}
        {activeTab === 'add-teacher' && (
          <div className="bg-white border-2 border-border rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Add New Verified Teacher
            </h2>
            <form onSubmit={handleAddTeacher} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={teacherData.full_name}
                    onChange={(e) => setTeacherData({ ...teacherData, full_name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">National ID *</label>
                  <input
                    type="text"
                    value={teacherData.national_id}
                    onChange={(e) => setTeacherData({ ...teacherData, national_id: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    value={teacherData.date_of_birth}
                    onChange={(e) => setTeacherData({ ...teacherData, date_of_birth: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Gender *</label>
                  <select
                    value={teacherData.gender}
                    onChange={(e) => setTeacherData({ ...teacherData, gender: e.target.value })}
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
                    value={teacherData.teacher_registration_number}
                    onChange={(e) => setTeacherData({ ...teacherData, teacher_registration_number: e.target.value })}
                    placeholder="TRN-UG-YYYY-XXXXXX"
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    value={teacherData.phone}
                    onChange={(e) => setTeacherData({ ...teacherData, phone: e.target.value })}
                    placeholder="+256700000000"
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={teacherData.email}
                    onChange={(e) => setTeacherData({ ...teacherData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Current School</label>
                  <input
                    type="text"
                    value={teacherData.current_school}
                    onChange={(e) => setTeacherData({ ...teacherData, current_school: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Years of Experience</label>
                  <input
                    type="number"
                    value={teacherData.years_of_experience}
                    onChange={(e) => setTeacherData({ ...teacherData, years_of_experience: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    min="0"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl text-green-700">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {loading ? 'Adding Teacher...' : 'Add Teacher'}
              </button>
            </form>
          </div>
        )}

        {/* Other tabs content would go here */}
        {activeTab !== 'add-teacher' && (
          <div className="bg-white border-2 border-border rounded-3xl p-8 shadow-xl text-center">
            <p className="text-muted-foreground">This section is under development</p>
          </div>
        )}
      </div>
    </div>
  )
}
