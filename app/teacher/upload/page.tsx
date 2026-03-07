import Link from 'next/link'
import { BookOpen, FileText } from 'lucide-react'

export default function UploadPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Upload Content</h1>
        <p className="text-muted-foreground">Choose what you want to upload</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/teacher/upload/activity">
          <div className="bg-white border border-border rounded-2xl p-8 hover:shadow-lg transition cursor-pointer h-full">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Activity of Integration</h2>
            <p className="text-muted-foreground">
              Create a new curriculum-aligned learning activity with scenarios and tasks
            </p>
          </div>
        </Link>

        <Link href="/teacher/upload/paper">
          <div className="bg-white border border-border rounded-2xl p-8 hover:shadow-lg transition cursor-pointer h-full">
            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-rose-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Examination Paper</h2>
            <p className="text-muted-foreground">
              Upload past papers or practice exams for students to access
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
