import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Upload, MessageCircle, FileText, TrendingUp } from 'lucide-react'

export default async function TeacherDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: activities } = await supabase
    .from('activities')
    .select('*')
    .eq('teacher_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: stats } = await supabase
    .from('activities')
    .select('id')
    .eq('teacher_id', user!.id)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Teacher Dashboard</h1>
        <p className="text-muted-foreground">Manage your content and student interactions</p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/teacher/upload" className="group">
          <div className="bg-white border border-border rounded-2xl p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-4">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-1">Upload Content</h3>
            <p className="text-sm text-muted-foreground">Add new activities and resources</p>
          </div>
        </Link>

        <Link href="/teacher/messages" className="group">
          <div className="bg-white border border-border rounded-2xl p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-1">Messages</h3>
            <p className="text-sm text-muted-foreground">Respond to student questions</p>
          </div>
        </Link>

        <div className="bg-white border border-border rounded-2xl p-6">
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white mb-4">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-1">Analytics</h3>
          <p className="text-sm text-muted-foreground">View engagement metrics</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Activities', value: stats?.length || 0, icon: FileText },
          { label: 'Published', value: activities?.filter(a => a.is_published).length || 0, icon: TrendingUp },
          { label: 'Total Views', value: activities?.reduce((sum, a) => sum + (a.view_count || 0), 0) || 0, icon: TrendingUp },
          { label: 'Messages', value: '0', icon: MessageCircle },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-border rounded-xl p-6">
            <stat.icon className="w-8 h-8 text-primary mb-3" />
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
        <div className="bg-white border border-border rounded-2xl divide-y divide-border">
          {activities && activities.length > 0 ? (
            activities.map((activity: any) => (
              <div key={activity.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{activity.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {activity.is_published ? '✓ Published' : '○ Draft'} • {activity.view_count || 0} views
                    </div>
                  </div>
                  <Link href={`/teacher/upload?edit=${activity.id}`} className="text-sm text-primary hover:underline">
                    Edit
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No activities yet</p>
              <Link href="/teacher/upload" className="text-primary hover:underline text-sm mt-2 inline-block">
                Upload your first activity
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
