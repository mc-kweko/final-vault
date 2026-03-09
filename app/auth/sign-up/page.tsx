'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role: 'student' }
      }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/student/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 py-12">
      <div className="w-full max-w-md">
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
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Create Student Account</h1>
          <p className="text-muted-foreground">Start your learning journey today</p>
        </div>

        <div className="bg-white border-2 border-border rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all">
          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <div className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-xl">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/auth/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </div>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground mb-3">Are you a teacher?</p>
            <Link 
              href="/auth/teacher-application"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              Register As Facilitator
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
