import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, BookOpen, FileText, Beaker, Globe, Languages } from 'lucide-react'

export default function ResourcesPage() {
  const categories = [
    {
      name: 'Sciences',
      icon: Beaker,
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
      color: 'bg-blue-500'
    },
    {
      name: 'Humanities',
      icon: Globe,
      subjects: ['Geography', 'History', 'Entrepreneurship'],
      color: 'bg-amber-500'
    },
    {
      name: 'Languages',
      icon: Languages,
      subjects: ['English', 'Literature', 'Kiswahili'],
      color: 'bg-emerald-500'
    }
  ]

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-border z-50">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/qvault logo (2).png" alt="Q'Vault" width={80} height={80} className="rounded-xl" />
            <div>
              <div className="text-2xl font-bold">Q'Vault</div>
              <div className="text-xs text-muted-foreground font-medium tracking-wide">Practice Makes Perfect !</div>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <Link href="/auth/sign-up" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Browse Resources</h1>
            <p className="text-xl text-muted-foreground">
              Explore our comprehensive collection of educational materials
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white border border-border rounded-2xl p-8 text-center hover:shadow-lg transition">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Activities of Integration</h3>
              <p className="text-muted-foreground mb-4">
                500+ curriculum-aligned learning activities
              </p>
              <Link href="/auth/sign-up" className="text-primary hover:underline text-sm font-medium">
                Sign up to access →
              </Link>
            </div>

            <div className="bg-white border border-border rounded-2xl p-8 text-center hover:shadow-lg transition">
              <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">UCE Past Papers</h3>
              <p className="text-muted-foreground mb-4">
                200+ past papers with marking guides
              </p>
              <Link href="/auth/sign-up" className="text-primary hover:underline text-sm font-medium">
                Sign up to access →
              </Link>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Subject Categories</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div key={category.name} className="bg-white border border-border rounded-2xl p-6">
                  <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">{category.name}</h3>
                  <ul className="space-y-2">
                    {category.subjects.map((subject) => (
                      <li key={subject} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        {subject}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-lg mb-8 opacity-90">
              Create a free account to access all resources
            </p>
            <Link href="/auth/sign-up" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition">
              Create Free Account
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
