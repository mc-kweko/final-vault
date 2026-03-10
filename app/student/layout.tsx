import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, FileText, Bookmark, MessageCircle, LayoutDashboard, LogOut } from 'lucide-react'

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'student') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You don't have permission to access this page.</p>
          <Link href="/" className="text-primary hover:underline">Go to Home</Link>
        </div>
      </div>
    )
  }

  const nav = [
    { name: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
    { name: 'Activities', href: '/student/activities', icon: BookOpen },
    { name: 'Past Papers', href: '/student/past-papers', icon: FileText },
    { name: 'Bookmarks', href: '/student/bookmarks', icon: Bookmark },
    { name: 'Ask Teacher', href: '/student/chat', icon: MessageCircle },
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-muted to-background">
      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" style={{ display: 'none' }} id="sidebar-overlay" />
      
      <aside className="w-64 lg:w-64 bg-white/95 backdrop-blur-xl border-r border-border/50 flex flex-col shadow-lg fixed lg:relative inset-y-0 left-0 z-40 transform -translate-x-full lg:translate-x-0 transition-transform" id="sidebar">
        <div className="p-6 lg:p-8 border-b border-border">
          <Link href="/" className="flex items-center gap-2 lg:gap-3 group">
            <Image src="/qvault logo (2).png" alt="Q'Vault" width={60} height={60} className="lg:w-20 lg:h-20 rounded-xl group-hover:shadow-xl transition-all" />
            <div>
              <div className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Q'Vault</div>
              <div className="text-xs text-muted-foreground font-semibold tracking-wider uppercase">Practice Makes Perfect !</div>
            </div>
          </Link>
        </div>

        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold">
              {profile?.full_name?.charAt(0) || 'S'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{profile?.full_name || 'Student'}</div>
              <div className="text-xs text-muted-foreground">Student</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition font-medium text-sm"
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <form action="/auth/logout" method="post">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive/10 transition font-medium text-sm w-full text-destructive">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-border/50 p-4 flex items-center justify-between">
          <button onClick={() => {
            const sidebar = document.getElementById('sidebar')
            const overlay = document.getElementById('sidebar-overlay')
            sidebar?.classList.toggle('-translate-x-full')
            if (overlay) overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none'
          }} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Student Dashboard</div>
          <div className="w-10" />
        </div>
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
