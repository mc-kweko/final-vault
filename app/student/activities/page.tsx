import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { BookOpen, Eye } from 'lucide-react'

export default async function ActivitiesPage({ searchParams }: { searchParams: Promise<{ subject?: string }> }) {
  const params = await searchParams
  const supabase = await createClient()
  
  let query = supabase
    .from('activities')
    .select('*, subjects(name), topics(name)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (params.subject) {
    query = query.eq('subject_id', params.subject)
  }

  const { data: activities } = await query
  const { data: subjects } = await supabase.from('subjects').select('*').order('name')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Activities of Integration</h1>
        <p className="text-muted-foreground">Curriculum-aligned learning activities</p>
      </div>

      {/* Subject Filter */}
      <div className="flex gap-2 flex-wrap">
        <Link href="/student/activities" className={`px-4 py-2 rounded-xl border-2 transition-all font-medium ${!params.subject ? 'bg-gradient-to-r from-primary to-accent text-white border-primary shadow-lg scale-105' : 'border-border hover:border-primary hover:scale-105'}`}>
          All Subjects
        </Link>
        {subjects?.map((subject) => (
          <Link
            key={subject.id}
            href={`/student/activities?subject=${subject.id}`}
            className={`px-4 py-2 rounded-xl border-2 transition-all font-medium ${params.subject === subject.id ? 'bg-gradient-to-r from-primary to-accent text-white border-primary shadow-lg scale-105' : 'border-border hover:border-primary hover:scale-105'}`}
          >
            {subject.name}
          </Link>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities?.map((activity: any) => (
          <Link key={activity.id} href={`/student/activities/${activity.id}`}>
            <div className="bg-white border-2 border-border rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all h-full">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye className="w-4 h-4" />
                  {activity.view_count || 0}
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{activity.title}</h3>
              <div className="text-sm text-muted-foreground mb-3">
                {activity.subjects?.name}
                {activity.topics?.name && ` • ${activity.topics.name}`}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">{activity.scenario}</p>
            </div>
          </Link>
        ))}
      </div>

      {!activities?.length && (
        <div className="text-center py-20">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
          <p className="text-muted-foreground">No activities found</p>
        </div>
      )}
    </div>
  )
}
