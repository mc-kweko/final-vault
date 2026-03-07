import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Upload, MessageCircle, LogOut } from 'lucide-react'

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'teacher') redirect('/student/dashboard')

  const nav = [
    { name: 'Dashboard', href: '/teacher/dashboard', icon: LayoutDashboard },
    { name: 'Upload Content', href: '/teacher/upload', icon: Upload },
    { name: 'Messages', href: '/teacher/messages', icon: MessageCircle },
  ]

  return (
    <div className="flex h-screen bg-muted">
      <aside className="w-64 bg-white border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold">Q</div>
            <span className="text-xl font-bold">Q'Vault</span>
          </Link>
        </div>

        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
              {profile?.full_name?.charAt(0) || 'T'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{profile?.full_name || 'Teacher'}</div>
              <div className="text-xs text-muted-foreground">Teacher</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition font-medium text-sm"
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <form action="/auth/logout" method="post">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition font-medium text-sm w-full text-destructive">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
