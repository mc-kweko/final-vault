'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Bookmark, Download, Eye } from 'lucide-react'
import Link from 'next/link'

export default function ActivityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activity, setActivity] = useState<any>(null)
  const [bookmarked, setBookmarked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadActivity()
  }, [params.id])

  const loadActivity = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data } = await supabase
      .from('activities')
      .select('*, subjects(name), topics(name)')
      .eq('id', params.id)
      .single()

    if (data) {
      setActivity(data)
      await supabase.from('activities').update({ view_count: (data.view_count || 0) + 1 }).eq('id', params.id)
    }

    if (user) {
      const { data: bookmark } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('activity_id', params.id)
        .eq('user_id', user.id)
        .single()
      setBookmarked(!!bookmark)
    }

    setLoading(false)
  }

  const toggleBookmark = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    if (bookmarked) {
      await supabase.from('bookmarks').delete().eq('activity_id', params.id).eq('user_id', user.id)
      setBookmarked(false)
    } else {
      await supabase.from('bookmarks').insert({ activity_id: params.id, user_id: user.id })
      setBookmarked(true)
    }
  }

  if (loading) return <div className="text-center py-20">Loading...</div>
  if (!activity) return <div className="text-center py-20">Activity not found</div>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/student/activities" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" />
        Back to Activities
      </Link>

      <div className="bg-white border border-border rounded-2xl p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-2">
              {activity.subjects?.name} {activity.topics?.name && `• ${activity.topics.name}`}
            </div>
            <h1 className="text-3xl font-bold mb-2">{activity.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {activity.view_count || 0} views
              </span>
            </div>
          </div>
          <button
            onClick={toggleBookmark}
            className={`p-3 rounded-xl border transition ${bookmarked ? 'bg-amber-50 border-amber-500 text-amber-600' : 'border-border hover:border-primary'}`}
          >
            <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-3">Scenario</h2>
            <p className="text-muted-foreground leading-relaxed">{activity.scenario}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Learner Task</h2>
            <p className="text-muted-foreground leading-relaxed">{activity.learner_task}</p>
          </div>

          {activity.knowledge_criteria && (
            <div>
              <h2 className="text-xl font-bold mb-3">Knowledge Criteria</h2>
              <p className="text-muted-foreground leading-relaxed">{activity.knowledge_criteria}</p>
            </div>
          )}

          {activity.skills_criteria && (
            <div>
              <h2 className="text-xl font-bold mb-3">Skills Criteria</h2>
              <p className="text-muted-foreground leading-relaxed">{activity.skills_criteria}</p>
            </div>
          )}

          {activity.attitudes_criteria && (
            <div>
              <h2 className="text-xl font-bold mb-3">Attitudes Criteria</h2>
              <p className="text-muted-foreground leading-relaxed">{activity.attitudes_criteria}</p>
            </div>
          )}

          {activity.expected_outcome && (
            <div>
              <h2 className="text-xl font-bold mb-3">Expected Outcome</h2>
              <p className="text-muted-foreground leading-relaxed">{activity.expected_outcome}</p>
            </div>
          )}

          {(activity.file_url || activity.rubric_url) && (
            <div className="flex gap-3 pt-4">
              {activity.file_url && (
                <a href={activity.file_url} target="_blank" className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition">
                  <Download className="w-5 h-5" />
                  Download Activity
                </a>
              )}
              {activity.rubric_url && (
                <a href={activity.rubric_url} target="_blank" className="flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-medium hover:border-primary transition">
                  <Download className="w-5 h-5" />
                  Download Rubric
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
