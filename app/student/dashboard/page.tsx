import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { BookOpen, FileText, Bookmark, TrendingUp, ArrowRight } from 'lucide-react'

export default async function StudentDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: subjects } = await supabase.from('subjects').select('*').order('name')
  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('*, activities(title)')
    .eq('user_id', user!.id)
    .limit(5)

  const quickLinks = [
    { name: 'Activities', href: '/student/activities', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
    { name: 'Past Papers', href: '/student/past-papers', icon: FileText, color: 'from-rose-500 to-rose-600' },
    { name: 'Bookmarks', href: '/student/bookmarks', icon: Bookmark, color: 'from-amber-500 to-amber-600' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Welcome Back!</h1>
        <p className="text-muted-foreground text-lg">Continue your learning journey</p>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-6">
        {quickLinks.map((link) => (
          <Link key={link.name} href={link.href} className="group">
            <div className="bg-white border-2 border-border rounded-3xl p-6 hover:shadow-xl hover:scale-105 hover:border-primary/30 transition-all">
              <div className={`w-12 h-12 bg-gradient-to-br ${link.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                <link.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-1 flex items-center justify-between">
                {link.name}
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition" />
              </h3>
              <p className="text-sm text-muted-foreground">Access {link.name.toLowerCase()}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Subjects */}
      <div>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Subjects</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {subjects?.slice(0, 8).map((subject) => (
            <Link key={subject.id} href={`/student/activities?subject=${subject.id}`}>
              <div className="bg-white border-2 border-border rounded-2xl p-4 hover:shadow-lg hover:scale-105 hover:border-primary/30 transition-all">
                <div className="font-semibold">{subject.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{subject.category}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Bookmarks */}
      <div>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Recent Bookmarks</h2>
        <div className="bg-white border-2 border-border rounded-3xl divide-y divide-border shadow-lg">
          {bookmarks && bookmarks.length > 0 ? (
            bookmarks.map((bookmark: any) => (
              <div key={bookmark.id} className="p-4 flex items-center gap-3">
                <Bookmark className="w-5 h-5 text-amber-500" />
                <div className="flex-1">
                  <div className="font-medium">{bookmark.activities?.title}</div>
                  <div className="text-sm text-muted-foreground">Bookmarked activity</div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <Bookmark className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No bookmarks yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Activities Completed', value: '0', icon: TrendingUp },
          { label: 'Papers Attempted', value: '0', icon: FileText },
          { label: 'Bookmarks', value: bookmarks?.length || 0, icon: Bookmark },
          { label: 'Downloads', value: '0', icon: BookOpen },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border-2 border-border rounded-2xl p-6 hover:shadow-lg hover:scale-105 transition-all">
            <stat.icon className="w-8 h-8 text-primary mb-3" />
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
