import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Bookmark, BookOpen } from 'lucide-react'

export default async function BookmarksPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('*, activities(*, subjects(name), topics(name))')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Bookmarks</h1>
        <p className="text-muted-foreground">Quick access to your saved activities</p>
      </div>

      {bookmarks && bookmarks.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark: any) => (
            <Link key={bookmark.id} href={`/student/activities/${bookmark.activity_id}`}>
              <div className="bg-white border border-border rounded-2xl p-6 hover:shadow-lg transition h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                    <Bookmark className="w-6 h-6 text-amber-600 fill-current" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{bookmark.activities?.title}</h3>
                <div className="text-sm text-muted-foreground mb-3">
                  {bookmark.activities?.subjects?.name}
                  {bookmark.activities?.topics?.name && ` • ${bookmark.activities.topics.name}`}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">{bookmark.activities?.scenario}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Bookmark className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
          <p className="text-muted-foreground mb-4">No bookmarks yet</p>
          <Link href="/student/activities" className="text-primary hover:underline">
            Browse activities to bookmark
          </Link>
        </div>
      )}
    </div>
  )
}
