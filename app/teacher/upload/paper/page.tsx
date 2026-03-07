'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Upload as UploadIcon, X, ArrowLeft, FileText } from 'lucide-react'
import Link from 'next/link'

export default function UploadPaperPage() {
  const [subjects, setSubjects] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fileUrl, setFileUrl] = useState('')
  const [fileName, setFileName] = useState('')
  const router = useRouter()

  const classes = ['Senior 1', 'Senior 2', 'Senior 3', 'Senior 4']

  const [form, setForm] = useState({
    subject_id: '',
    class_level: ''
  })

  useEffect(() => {
    loadSubjects()
  }, [])

  const loadSubjects = async () => {
    const supabase = createClient()
    const { data } = await supabase.from('subjects').select('*').order('name')
    setSubjects(data || [])
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file')
      return
    }

    setUploading(true)
    const supabase = createClient()
    const fileExt = file.name.split('.').pop()
    const uploadFileName = `${Math.random()}.${fileExt}`
    const filePath = `papers/${uploadFileName}`

    const { error } = await supabase.storage
      .from('resources')
      .upload(filePath, file)

    if (!error) {
      const { data } = supabase.storage.from('resources').getPublicUrl(filePath)
      setFileUrl(data.publicUrl)
      setFileName(file.name)
    }
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fileUrl) {
      alert('Please upload a PDF file')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from('past_papers').insert({
      subject_id: form.subject_id,
      year: new Date().getFullYear(),
      paper_type: form.class_level,
      title: `${form.class_level}`,
      file_url: fileUrl,
      uploaded_by: user!.id
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
        <h1 className="text-3xl font-bold mb-2">Upload Examination Paper</h1>
        <p className="text-muted-foreground">Upload a past paper or practice exam</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-border rounded-2xl p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">1. Select Subject *</label>
          <select
            value={form.subject_id}
            onChange={(e) => setForm({ ...form, subject_id: e.target.value })}
            className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
            required
          >
            <option value="">Choose a subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">2. Select Class *</label>
          <div className="grid grid-cols-2 gap-3">
            {classes.map((cls) => (
              <button
                key={cls}
                type="button"
                onClick={() => setForm({ ...form, class_level: cls })}
                className={`relative px-4 py-3 border-2 rounded-xl font-medium transition ${
                  form.class_level === cls
                    ? 'border-primary border-[3px] bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {form.class_level === cls && (
                  <span className="absolute top-2 right-2 text-primary">✓</span>
                )}
                {cls}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">3. Upload PDF *</label>
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
            {fileUrl ? (
              <div className="flex items-center justify-between bg-muted px-4 py-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-rose-600" />
                  <span className="text-sm font-medium">{fileName}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFileUrl('')
                    setFileName('')
                  }}
                  className="text-destructive hover:text-destructive/80"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div>
                <UploadIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-sm text-muted-foreground mb-4">Upload examination paper (PDF only)</p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf"
                  className="hidden"
                  id="pdf-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="pdf-upload"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition cursor-pointer"
                >
                  {uploading ? 'Uploading...' : 'Choose PDF File'}
                </label>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || uploading || !fileUrl}
          className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload Paper'}
        </button>
      </form>
    </div>
  )
}
