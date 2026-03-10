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
      {/* Sidebar */}
      <aside className="w-64 bg-white/95 backdrop-blur-xl border-r border-border/50 flex flex-col shadow-lg">
        <div className="p-8 border-b border-border">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/qvault logo (2).png" alt="Q'Vault" width={80} height={80} className="rounded-xl group-hover:shadow-xl transition-all" />
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Q'Vault</div>
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
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
