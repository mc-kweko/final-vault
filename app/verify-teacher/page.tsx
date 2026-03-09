'use client'

import { useState } from 'react'
import { Search, Shield, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { searchTeacher, getTeacherVerificationStatus } from '@/lib/teacher-verification'
import TeacherVerificationCard from '@/components/verification/TeacherVerificationCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TeacherVerificationPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<'registration' | 'national_id' | 'name'>('registration')
  const [loading, setLoading] = useState(false)
  const [teacher, setTeacher] = useState<any>(null)
  const [verificationStatus, setVerificationStatus] = useState<any>(null)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    setError('')
    setTeacher(null)
    setVerificationStatus(null)

    const { data, error: searchError } = await searchTeacher(searchQuery, searchType)

    if (searchError || !data) {
      setError('Teacher not found in the verification database')
      setLoading(false)
      return
    }

    setTeacher(data)

    const { data: status } = await getTeacherVerificationStatus(data.id)
    setVerificationStatus(status)
    setLoading(false)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-20 px-6 bg-gradient-to-b from-muted to-background">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full mb-6">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-semibold text-primary">Official Verification Portal</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Teacher Verification Portal
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Verify the professional qualifications and licensing status of teachers in Uganda
            </p>
          </div>

          <div className="bg-white border-2 border-border rounded-3xl p-8 shadow-xl">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3">Search By</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSearchType('registration')}
                    className={`px-4 py-3 border-2 rounded-xl font-medium transition-all ${
                      searchType === 'registration'
                        ? 'border-primary bg-gradient-to-r from-primary/10 to-accent/10 text-primary scale-105'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    Registration Number
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchType('national_id')}
                    className={`px-4 py-3 border-2 rounded-xl font-medium transition-all ${
                      searchType === 'national_id'
                        ? 'border-primary bg-gradient-to-r from-primary/10 to-accent/10 text-primary scale-105'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    National ID
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchType('name')}
                    className={`px-4 py-3 border-2 rounded-xl font-medium transition-all ${
                      searchType === 'name'
                        ? 'border-primary bg-gradient-to-r from-primary/10 to-accent/10 text-primary scale-105'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    Full Name
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  {searchType === 'registration' && 'Teacher Registration Number'}
                  {searchType === 'national_id' && 'National ID Number'}
                  {searchType === 'name' && 'Full Name'}
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      searchType === 'registration'
                        ? 'e.g., TRN-UG-2010-001234'
                        : searchType === 'national_id'
                        ? 'e.g., CM90012345678'
                        : 'e.g., Sarah Nakato'
                    }
                    className="flex-1 px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                    {loading ? 'Searching...' : 'Verify'}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700">
                  <XCircle className="w-5 h-5" />
                  <span className="font-medium">{error}</span>
                </div>
              )}
            </form>
          </div>

          {teacher && verificationStatus && (
            <TeacherVerificationCard teacher={teacher} verificationStatus={verificationStatus} />
          )}

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-border rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Verified Teachers</h3>
              <p className="text-sm text-muted-foreground">
                Teachers with valid licenses and verified qualifications
              </p>
            </div>

            <div className="bg-white border-2 border-border rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Pending Verification</h3>
              <p className="text-sm text-muted-foreground">
                Teachers awaiting qualification verification or license renewal
              </p>
            </div>

            <div className="bg-white border-2 border-border rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Secure Database</h3>
              <p className="text-sm text-muted-foreground">
                All teacher records are securely stored and regularly updated
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
