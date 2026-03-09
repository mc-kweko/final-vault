import Link from 'next/link'
import { BookOpen, FileText, ArrowRight } from 'lucide-react'

export default function UploadPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Upload Content</h1>
        <p className="text-muted-foreground">Choose what you want to upload</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/teacher/upload/activity" className="group">
          <div className="bg-white border-2 border-border rounded-3xl p-8 hover:shadow-xl hover:scale-105 transition-all cursor-pointer h-full">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2 flex items-center justify-between">
              Activity of Integration
              <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </h2>
            <p className="text-muted-foreground">
              Create a new curriculum-aligned learning activity with scenarios and tasks
            </p>
          </div>
        </Link>

        <Link href="/teacher/upload/paper" className="group">
          <div className="bg-white border-2 border-border rounded-3xl p-8 hover:shadow-xl hover:scale-105 transition-all cursor-pointer h-full">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
              <FileText className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2 flex items-center justify-between">
              Examination Paper
              <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </h2>
            <p className="text-muted-foreground">
              Upload past papers or practice exams for students to access
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
