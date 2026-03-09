import Link from 'next/link'
import { BookOpen, FileText, Beaker, Globe, Languages } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ResourcesPage() {
  const categories = [
    {
      name: 'Sciences',
      icon: Beaker,
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Humanities',
      icon: Globe,
      subjects: ['Geography', 'History', 'Entrepreneurship'],
      color: 'from-amber-500 to-amber-600'
    },
    {
      name: 'Languages',
      icon: Languages,
      subjects: ['English', 'Literature', 'Kiswahili'],
      color: 'from-emerald-500 to-emerald-600'
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-20 px-6 bg-gradient-to-b from-muted to-background">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Browse Resources</h1>
            <p className="text-xl text-muted-foreground">
              Explore our comprehensive collection of educational materials
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white border-2 border-border rounded-3xl p-8 text-center hover:shadow-xl hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl mb-2">Activities of Integration</h3>
              <p className="text-muted-foreground mb-4">
                500+ curriculum-aligned learning activities
              </p>
              <Link href="/auth/sign-up" className="text-primary hover:underline text-sm font-medium">
                Sign up to access →
              </Link>
            </div>

            <div className="bg-white border-2 border-border rounded-3xl p-8 text-center hover:shadow-xl hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                <FileText className="w-8 h-8" />
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
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Subject Categories</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div key={category.name} className="bg-white border-2 border-border rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all">
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center text-white mb-4`}>
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

          <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-12 text-center text-white shadow-2xl hover:shadow-3xl transition-all">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-lg mb-8 opacity-90">
              Create a free account to access all resources
            </p>
            <Link href="/auth/sign-up" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:scale-105 hover:shadow-2xl transition-all">
              Create Free Account
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
