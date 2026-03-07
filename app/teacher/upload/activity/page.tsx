'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Upload as UploadIcon, X, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function UploadActivityPage() {
  const [subjects, setSubjects] = useState<any[]>([])
  const [topics, setTopics] = useState<any[]>([])
  const [filteredTopics, setFilteredTopics] = useState<any[]>([])
  const [topicSearch, setTopicSearch] = useState('')
  const [showTopicDropdown, setShowTopicDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fileUrl, setFileUrl] = useState('')
  const router = useRouter()

  const [form, setForm] = useState({
    subject_id: '',
    topic_id: '',
    title: '',
    scenario: '',
    learner_task: '',
    is_published: true
  })

  useEffect(() => {
    loadSubjects()
  }, [])

  useEffect(() => {
    if (form.subject_id) loadTopics()
  }, [form.subject_id])

  const loadSubjects = async () => {
    const supabase = createClient()
    const { data } = await supabase.from('subjects').select('*').order('name')
    setSubjects(data || [])
  }

  const loadTopics = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('topics')
      .select('*')
      .eq('subject_id', form.subject_id)
      .order('name')
    setTopics(data || [])
    setFilteredTopics(data || [])
  }

  const handleTopicSearch = (value: string) => {
    setTopicSearch(value)
    setShowTopicDropdown(true)
    const filtered = topics.filter(t => 
      t.name.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredTopics(filtered)
  }

  const selectTopic = (topic: any) => {
    setForm({ ...form, topic_id: topic.id })
    setTopicSearch(topic.name)
    setShowTopicDropdown(false)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const supabase = createClient()
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `activities/${fileName}`

    const { error } = await supabase.storage
      .from('resources')
      .upload(filePath, file)

    if (!error) {
      const { data } = supabase.storage.from('resources').getPublicUrl(filePath)
      setFileUrl(data.publicUrl)
    }
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from('activities').insert({
      subject_id: form.subject_id,
      topic_id: form.topic_id || null,
      title: form.title,
      scenario: form.scenario,
      learner_task: form.learner_task,
      file_url: fileUrl || null,
      teacher_id: user!.id,
      is_published: form.is_published
    })

    if (!error) {
      router.push('/teacher/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/teacher/upload" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div>
        <h1 className="text-3xl font-bold mb-2">Create Activity of Integration</h1>
        <p className="text-muted-foreground">Upload a new learning activity</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-border rounded-2xl p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">1. Select Subject *</label>
          <select
            value={form.subject_id}
            onChange={(e) => setForm({ ...form, subject_id: e.target.value, topic_id: '' })}
            className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
            required
          >
            <option value="">Choose a subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        {form.subject_id && (
          <div className="relative">
            <label className="block text-sm font-medium mb-2">2. Search and Select Topic *</label>
            <input
              type="text"
              value={topicSearch}
              onChange={(e) => handleTopicSearch(e.target.value)}
              onFocus={() => setShowTopicDropdown(true)}
              className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Type to search topics..."
              required
            />
            {showTopicDropdown && filteredTopics.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-xl shadow-lg max-h-60 overflow-auto">
                {filteredTopics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => selectTopic(topic)}
                    className="w-full text-left px-4 py-3 hover:bg-muted transition border-b border-border last:border-0"
                  >
                    {topic.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">3. Activity Heading *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter activity title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">4. Scenario *</label>
          <textarea
            value={form.scenario}
            onChange={(e) => setForm({ ...form, scenario: e.target.value })}
            className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring h-32"
            placeholder="Describe the real-world scenario"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">5. Support Material (Optional)</label>
          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
            {fileUrl ? (
              <div className="flex items-center justify-between bg-muted px-4 py-3 rounded-lg">
                <span className="text-sm truncate">{fileUrl.split('/').pop()}</span>
                <button
                  type="button"
                  onClick={() => setFileUrl('')}
                  className="text-destructive hover:text-destructive/80"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div>
                <UploadIcon className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                <p className="text-sm text-muted-foreground mb-3">Upload image, video, audio, or PDF</p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept="image/*,video/*,audio/*,.pdf"
                  className="hidden"
                  id="file-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition cursor-pointer"
                >
                  {uploading ? 'Uploading...' : 'Choose File'}
                </label>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">6. Learner Task *</label>
          <textarea
            value={form.learner_task}
            onChange={(e) => setForm({ ...form, learner_task: e.target.value })}
            className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring h-32"
            placeholder="What should students do?"
            required
          />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <input
            type="checkbox"
            id="published"
            checked={form.is_published}
            onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
            className="w-5 h-5 rounded border-input"
          />
          <label htmlFor="published" className="text-sm font-medium">Publish immediately</label>
        </div>

        <button
          type="submit"
          disabled={loading || uploading}
          className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Submit Activity'}
        </button>
      </form>
    </div>
  )
}
