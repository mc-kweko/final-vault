'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Shield, Lock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function SupremeAdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('Invalid credentials')
      setLoading(false)
      return
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (profile?.role !== 'admin') {
      await supabase.auth.signOut()
      setError('Access denied. Supreme Admin only.')
      setLoading(false)
      return
    }

    router.push('/supremeadmin/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl mb-6 shadow-2xl">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-white">Supreme Admin</h1>
          <p className="text-gray-400">Restricted Access Portal</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400"
                placeholder="admin@qvault.ug"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400"
                placeholder="••••••••"
                required
              />
            </div>
            {error && (
              <div className="text-sm text-red-300 bg-red-500/20 px-4 py-3 rounded-xl border border-red-500/30">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              {loading ? 'Authenticating...' : 'Access Portal'}
            </button>
          </form>
        </div>

        <div className="text-center mt-6 text-gray-400 text-sm">
          <Shield className="w-4 h-4 inline mr-2" />
          Authorized Personnel Only
        </div>
      </div>
    </div>
  )
}
