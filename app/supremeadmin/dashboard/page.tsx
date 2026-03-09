'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Shield, CheckCircle, XCircle, Clock, User, Award, FileText, LogOut } from 'lucide-react'
import Image from 'next/image'

export default function SupremeAdminDashboard() {
  const [applications, setApplications] = useState<any[]>([])
  const [selectedApp, setSelectedApp] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadApplications()
  }, [])

  const checkAuth = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/supremeadmin')
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      router.push('/supremeadmin')
    }
  }

  const loadApplications = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('teacher_applications')
      .select('*')
      .order('created_at', { ascending: false })

    setApplications(data || [])
    setLoading(false)
  }

  const approveApplication = async (appId: string) => {
    setProcessing(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.rpc('approve_teacher_application', {
      application_id: appId,
      admin_id: user?.id
    })

    if (!error) {
      await loadApplications()
      setSelectedApp(null)
    }
    setProcessing(false)
  }

  const rejectApplication = async (appId: string) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason')
      return
    }

    setProcessing(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.rpc('reject_teacher_application', {
      application_id: appId,
      admin_id: user?.id,
      reason: rejectionReason
    })

    if (!error) {
      await loadApplications()
      setSelectedApp(null)
      setRejectionReason('')
    }
    setProcessing(false)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/supremeadmin')
  }

  const pendingApps = applications.filter(a => a.application_status === 'pending')
  const approvedApps = applications.filter(a => a.application_status === 'approved')
  const rejectedApps = applications.filter(a => a.application_status === 'rejected')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">Supreme Admin Portal</div>
              <div className="text-xs text-gray-400">Teacher Application Management</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-xl border-2 border-amber-500/30 rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{pendingApps.length}</div>
                <div className="text-sm text-gray-400">Pending Review</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border-2 border-green-500/30 rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{approvedApps.length}</div>
                <div className="text-sm text-gray-400">Approved</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border-2 border-red-500/30 rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{rejectedApps.length}</div>
                <div className="text-sm text-gray-400">Rejected</div>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">Pending Applications</h2>
            {loading ? (
              <div className="text-gray-400">Loading...</div>
            ) : pendingApps.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 text-center text-gray-400">
                No pending applications
              </div>
            ) : (
              pendingApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={`w-full text-left bg-white/10 backdrop-blur-xl border-2 rounded-3xl p-6 hover:bg-white/20 transition-all ${
                    selectedApp?.id === app.id ? 'border-amber-500' : 'border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white text-xl font-bold">
                      {app.full_name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white text-lg">{app.full_name}</div>
                      <div className="text-sm text-gray-400">{app.teacher_registration_number}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Applied: {new Date(app.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Details */}
          <div>
            {selectedApp ? (
              <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Application Details</h2>
                  <span className="px-4 py-2 bg-amber-500/20 text-amber-300 rounded-xl text-sm font-semibold">
                    Pending Review
                  </span>
                </div>

                {/* Personal Info */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Full Name:</span>
                      <span className="text-white font-medium">{selectedApp.full_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">National ID:</span>
                      <span className="text-white font-medium">{selectedApp.national_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date of Birth:</span>
                      <span className="text-white font-medium">{selectedApp.date_of_birth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gender:</span>
                      <span className="text-white font-medium">{selectedApp.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Phone:</span>
                      <span className="text-white font-medium">{selectedApp.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-white font-medium">{selectedApp.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current School:</span>
                      <span className="text-white font-medium">{selectedApp.current_school || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Experience:</span>
                      <span className="text-white font-medium">{selectedApp.years_of_experience} years</span>
                    </div>
                  </div>
                </div>

                {/* Qualification */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Qualification
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Title:</span>
                      <span className="text-white font-medium">{selectedApp.qualification_title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Level:</span>
                      <span className="text-white font-medium">{selectedApp.qualification_level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Institution:</span>
                      <span className="text-white font-medium">{selectedApp.institution_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Year:</span>
                      <span className="text-white font-medium">{selectedApp.graduation_year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Field:</span>
                      <span className="text-white font-medium">{selectedApp.field_of_study}</span>
                    </div>
                  </div>
                </div>

                {/* License */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Teaching License
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">License Number:</span>
                      <span className="text-white font-medium">{selectedApp.license_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Issue Date:</span>
                      <span className="text-white font-medium">{selectedApp.license_issue_date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Expiry Date:</span>
                      <span className="text-white font-medium">{selectedApp.license_expiry_date}</span>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                {selectedApp.specializations && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">Specializations</h3>
                    <div className="space-y-2">
                      {selectedApp.specializations.map((spec: any, idx: number) => (
                        <div key={idx} className="bg-white/10 rounded-xl p-3 text-sm">
                          <div className="text-white font-medium">{spec.subject}</div>
                          <div className="text-gray-400">{spec.education_level} • {spec.years_teaching_subject} years</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => approveApplication(selectedApp.id)}
                    disabled={processing}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    {processing ? 'Processing...' : 'Approve Application'}
                  </button>

                  <div className="space-y-2">
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Rejection reason (required)"
                      className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400 resize-none"
                      rows={3}
                    />
                    <button
                      onClick={() => rejectApplication(selectedApp.id)}
                      disabled={processing}
                      className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      {processing ? 'Processing...' : 'Reject Application'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 text-center text-gray-400">
                Select an application to review
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
