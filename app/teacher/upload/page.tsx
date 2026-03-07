'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Upload as UploadIcon } from 'lucide-react'

export default function UploadPage() {
  const [subjects, setSubjects] = useState<any[]>([])
  const [topics, setTopics] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [form, setForm] = useState({
    subject_id: '',
    topic_id: '',
    title: '',
    scenario: '',
    learner_task: '',
    knowledge_criteria: '',
    skills_criteria: '',
    attitudes_criteria: '',
    expected_outcome: '',
    is_published: false
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
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from('activities').insert({
      ...form,
      teacher_id: user!.id,
      topic_id: form.topic_id || null
    })

    if (!error) {
      router.push('/teacher/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Upload Activity</h1>
        <p className="text-muted-foreground">Create a new Activity of Integration</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-border rounded-2xl p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Subject *</label>
            <select
              value={form.subject_id}
              onChange={(e) => setForm({ ...form, subject_id: e.target.value })}
              className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              required
            >
              <option value="">Select subject</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Topic (Optional)</label>
            <select
              value={form.topic_id}
              onChange={(e) => setForm({ ...form, topic_id: e.target.value })}
              className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select topic</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Activity Title *</label>
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
          <label className="block text-sm font-medium mb-2">Scenario *</label>
          <textarea
            value={form.scenario}
            onChange={(e) => setForm({ ...form, scenario: e.target.value })}
            className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring h-32"
            placeholder="Describe the real-world scenario"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Learner Task *</label>
          <textarea
            value={form.learner_task}
            onChange={(e) => setForm({ ...form, learner_task: e.target.value })}
            className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring h-32"
            placeholder="What should students do?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Knowledge Criteria</label>
          <textarea
            value={form.knowledge_criteria}
            onChange={(e) => setForm({ ...form, knowledge_criteria: e.target.value })}
            className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring h-24"
            placeholder="What knowledge should students demonstrate?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Skills Criteria</label>
          <textarea
            value={form.skills_criteria}
            onChange={(e) => setForm({ ...form, skills_criteria: e.target.value })}
            className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring h-24"
            placeholder="What skills should students demonstrate?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Attitudes Criteria</label>
          <textarea
            value={form.attitudes_criteria}
            onChange={(e) => setForm({ ...form, attitudes_criteria: e.target.value })}
            className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring h-24"
            placeholder="What attitudes should students demonstrate?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Expected Outcome</label>
          <textarea
            value={form.expected_outcome}
            onChange={(e) => setForm({ ...form, expected_outcome: e.target.value })}
            className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring h-24"
            placeholder="What should be the final outcome?"
          />
        </div>

        <div className="flex items-center gap-3">
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
          disabled={loading}
          className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Activity'}
        </button>
      </form>
    </div>
  )
}
