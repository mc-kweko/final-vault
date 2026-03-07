'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Lock, BookOpen, Clock } from 'lucide-react'

const sampleActivities: Record<string, Array<{title: string, topic: string, difficulty: string}>> = {
  Physics: [
    { title: "Understanding Newton's Laws of Motion", topic: "Mechanics", difficulty: "Medium" },
    { title: "Exploring Electric Circuits", topic: "Electricity", difficulty: "Easy" },
    { title: "Wave Properties and Behavior", topic: "Waves", difficulty: "Medium" },
    { title: "Heat Transfer Mechanisms", topic: "Thermal Physics", difficulty: "Easy" },
    { title: "Light Reflection and Refraction", topic: "Optics", difficulty: "Hard" }
  ],
  Chemistry: [
    { title: "Chemical Bonding and Structure", topic: "Atomic Structure", difficulty: "Medium" },
    { title: "Acids, Bases and Salts", topic: "Chemical Reactions", difficulty: "Easy" },
    { title: "Organic Chemistry Basics", topic: "Organic Chemistry", difficulty: "Hard" },
    { title: "Periodic Table Trends", topic: "Periodic Table", difficulty: "Medium" },
    { title: "Rates of Chemical Reactions", topic: "Kinetics", difficulty: "Medium" }
  ],
  Mathematics: [
    { title: "Solving Quadratic Equations", topic: "Algebra", difficulty: "Medium" },
    { title: "Trigonometric Ratios", topic: "Trigonometry", difficulty: "Hard" },
    { title: "Calculating Areas and Volumes", topic: "Geometry", difficulty: "Easy" },
    { title: "Probability and Statistics", topic: "Statistics", difficulty: "Medium" },
    { title: "Linear Programming", topic: "Optimization", difficulty: "Hard" }
  ],
  Biology: [
    { title: "Cell Structure and Function", topic: "Cell Biology", difficulty: "Easy" },
    { title: "Photosynthesis Process", topic: "Plant Biology", difficulty: "Medium" },
    { title: "Human Digestive System", topic: "Human Biology", difficulty: "Easy" },
    { title: "Genetics and Inheritance", topic: "Genetics", difficulty: "Hard" },
    { title: "Ecosystem Interactions", topic: "Ecology", difficulty: "Medium" }
  ],
  Agriculture: [
    { title: "Soil Types and Properties", topic: "Soil Science", difficulty: "Easy" },
    { title: "Crop Rotation Benefits", topic: "Crop Management", difficulty: "Medium" },
    { title: "Pest Control Methods", topic: "Plant Protection", difficulty: "Medium" },
    { title: "Animal Husbandry Practices", topic: "Livestock", difficulty: "Easy" },
    { title: "Sustainable Farming Techniques", topic: "Agronomy", difficulty: "Hard" }
  ],
  Geography: [
    { title: "Map Reading and Interpretation", topic: "Cartography", difficulty: "Easy" },
    { title: "Climate and Weather Patterns", topic: "Climatology", difficulty: "Medium" },
    { title: "Population Distribution", topic: "Human Geography", difficulty: "Medium" },
    { title: "River Systems and Landforms", topic: "Physical Geography", difficulty: "Hard" },
    { title: "Economic Activities", topic: "Economic Geography", difficulty: "Easy" }
  ],
  History: [
    { title: "Pre-Colonial African Societies", topic: "African History", difficulty: "Medium" },
    { title: "The Scramble for Africa", topic: "Colonialism", difficulty: "Hard" },
    { title: "Independence Movements", topic: "Nationalism", difficulty: "Medium" },
    { title: "World War I and II", topic: "World History", difficulty: "Hard" },
    { title: "Post-Independence Uganda", topic: "Modern History", difficulty: "Easy" }
  ],
  Entrepreneurship: [
    { title: "Business Plan Development", topic: "Business Planning", difficulty: "Medium" },
    { title: "Market Research Techniques", topic: "Marketing", difficulty: "Easy" },
    { title: "Financial Management Basics", topic: "Finance", difficulty: "Hard" },
    { title: "Customer Service Excellence", topic: "Operations", difficulty: "Easy" },
    { title: "Innovation and Creativity", topic: "Strategy", difficulty: "Medium" }
  ],
  English: [
    { title: "Essay Writing Techniques", topic: "Composition", difficulty: "Medium" },
    { title: "Grammar and Punctuation", topic: "Language", difficulty: "Easy" },
    { title: "Comprehension Skills", topic: "Reading", difficulty: "Medium" },
    { title: "Oral Presentation Skills", topic: "Speaking", difficulty: "Hard" },
    { title: "Letter Writing Formats", topic: "Writing", difficulty: "Easy" }
  ],
  Literature: [
    { title: "Poetry Analysis", topic: "Poetry", difficulty: "Hard" },
    { title: "Character Development in Novels", topic: "Prose", difficulty: "Medium" },
    { title: "Drama and Performance", topic: "Drama", difficulty: "Medium" },
    { title: "Literary Devices", topic: "Techniques", difficulty: "Easy" },
    { title: "African Literature Themes", topic: "African Literature", difficulty: "Hard" }
  ],
  Kiswahili: [
    { title: "Sarufi ya Kiswahili", topic: "Grammar", difficulty: "Medium" },
    { title: "Insha ya Kiswahili", topic: "Composition", difficulty: "Hard" },
    { title: "Mazungumzo ya Kila Siku", topic: "Conversation", difficulty: "Easy" },
    { title: "Fasihi ya Kiswahili", topic: "Literature", difficulty: "Medium" },
    { title: "Ufafanuzi wa Maneno", topic: "Vocabulary", difficulty: "Easy" }
  ]
}

export default function SubjectActivitiesPage() {
  const params = useParams()
  const subject = params.subject as string
  const activities = sampleActivities[subject] || []

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200'
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'Hard': return 'bg-rose-100 text-rose-700 border-rose-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-xl border-b border-border/50 z-50 shadow-lg">
        <nav className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
              <Image src="/qvault logo (2).png" alt="Q'Vault" width={100} height={100} className="rounded-2xl shadow-md group-hover:shadow-xl transition-all relative" />
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">Q'Vault</div>
              <div className="text-xs text-muted-foreground font-semibold tracking-wider uppercase">Practice Makes Perfect !</div>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all hover:scale-105">Sign In</Link>
            <Link href="/auth/sign-up" className="px-7 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl text-sm font-bold hover:shadow-xl hover:scale-105 transition-all">Get Started</Link>
          </div>
        </nav>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {subject} Activities
            </h1>
            <p className="text-xl text-muted-foreground">Sample Activities of Integration - Sign up to access all content</p>
          </div>

          {/* Activities Grid */}
          <div className="grid gap-6 mb-12">
            {activities.map((activity, index) => (
              <div key={index} className="bg-white border-2 border-border rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition-all group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          {activity.topic}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-semibold border-2 ${getDifficultyColor(activity.difficulty)}`}>
                      {activity.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      45 min
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Locked Content CTA */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
            <div className="relative">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-10 h-10" />
              </div>
              <h2 className="text-4xl font-bold mb-4">Want to Access More Activities?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Create a free account to unlock hundreds of Activities of Integration, past papers, and expert guidance
              </p>
              <Link href="/auth/sign-up" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary rounded-2xl font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all">
                Create Free Account
              </Link>
              <p className="text-sm text-white/70 mt-6">No credit card required • Instant access</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
