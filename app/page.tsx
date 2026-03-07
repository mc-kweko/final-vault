'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight, Play, Star, Users, BookOpen, Award } from 'lucide-react'

const slides = [
  {
    title: "Excel in Your Studies",
    subtitle: "Access comprehensive Activities of Integration aligned with Uganda's curriculum",
    bg: "bg-gradient-to-r from-primary/20 to-accent/20",
    image: "/placeholder.jpg" // Replace with actual image
  },
  {
    title: "UCE Past Papers",
    subtitle: "Practice with previous examination papers and marking guides",
    bg: "bg-gradient-to-r from-blue-500/20 to-primary/20",
    image: "/placeholder.jpg"
  },
  {
    title: "Learn from Experts",
    subtitle: "Connect with qualified teachers and get help when you need it",
    bg: "bg-gradient-to-r from-accent/20 to-amber-500/20",
    image: "/placeholder.jpg"
  }
]

const subjects = {
  sciences: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Agriculture'],
  humanities: ['Geography', 'History', 'Entrepreneurship'],
  languages: ['English', 'Literature', 'Kiswahili']
}

const stats = [
  { icon: Users, value: '1000+', label: 'Active Students' },
  { icon: BookOpen, value: '500+', label: 'Activities' },
  { icon: Award, value: '12', label: 'Subjects' },
  { icon: Star, value: '4.9', label: 'Rating' }
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-lg border-b border-border z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 transform hover:scale-105 transition-transform">
            <Image src="/qvault logo (2).png" alt="Q'Vault" width={80} height={80} className="rounded-xl" />
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Q'Vault</div>
              <div className="text-xs text-muted-foreground font-medium tracking-wide">Practice Makes Perfect !</div>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-all hover:scale-105">About</Link>
            <Link href="/resources" className="text-sm font-medium hover:text-primary transition-all hover:scale-105">Resources</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-all hover:scale-105">Contact</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm font-medium hover:text-primary transition">Sign In</Link>
            <Link href="/auth/sign-up" className="px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all">Get Started</Link>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        {/* Hero Slideshow */}
        <section className="relative h-[600px] overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <div className={`absolute inset-0 ${slide.bg}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
              </div>
              <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
                <div className={`max-w-2xl transform transition-all duration-1000 delay-300 ${
                  index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                }`}>
                  <div className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium mb-6 animate-pulse">
                    🎓 Uganda's #1 Learning Platform
                  </div>
                  <h1 className="text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {slide.title}
                  </h1>
                  <p className="text-xl text-foreground/80 mb-8 leading-relaxed">{slide.subtitle}</p>
                  <div className="flex gap-4">
                    <Link href="/auth/sign-up" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all">
                      Start Learning Free 
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/90 backdrop-blur-sm rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all">
                      <Play className="w-5 h-5" />
                      Watch Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-12' : 'bg-white/50 w-2 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-gradient-to-r from-primary to-accent py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className={`text-center text-white transform transition-all duration-500 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <stat.icon className="w-10 h-10 mx-auto mb-3" />
                  <div className="text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Find Activities Section */}
        <section className="py-24 px-6 bg-gradient-to-b from-muted to-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Find Activities of Integration
              </h2>
              <p className="text-xl text-muted-foreground">Choose your subject and start learning</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Sciences */}
              <div className="group bg-white border border-border rounded-3xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🔬</span>
                </div>
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Sciences</h3>
                <div className="space-y-3">
                  {subjects.sciences.map((subject, index) => (
                    <Link
                      key={subject}
                      href="/auth/sign-up"
                      className="block px-5 py-3.5 bg-gradient-to-r from-muted to-muted/50 rounded-xl hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 transition-all font-medium transform hover:translate-x-2"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {subject}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Humanities */}
              <div className="group bg-white border border-border rounded-3xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🌍</span>
                </div>
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Humanities</h3>
                <div className="space-y-3">
                  {subjects.humanities.map((subject, index) => (
                    <Link
                      key={subject}
                      href="/auth/sign-up"
                      className="block px-5 py-3.5 bg-gradient-to-r from-muted to-muted/50 rounded-xl hover:from-amber-50 hover:to-amber-100 hover:text-amber-600 transition-all font-medium transform hover:translate-x-2"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {subject}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="group bg-white border border-border rounded-3xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">Languages</h3>
                <div className="space-y-3">
                  {subjects.languages.map((subject, index) => (
                    <Link
                      key={subject}
                      href="/auth/sign-up"
                      className="block px-5 py-3.5 bg-gradient-to-r from-muted to-muted/50 rounded-xl hover:from-emerald-50 hover:to-emerald-100 hover:text-emerald-600 transition-all font-medium transform hover:translate-x-2"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {subject}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* UCE Past Papers & Project Work */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Link href="/auth/sign-up" className="group">
                <div className="bg-gradient-to-br from-rose-50 to-rose-100 border-2 border-rose-200 rounded-3xl p-10 hover:shadow-2xl hover:scale-105 transition-all h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">📝</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 flex items-center justify-between text-rose-900">
                    UCE Past Papers
                    <ArrowRight className="w-7 h-7 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                  </h3>
                  <p className="text-rose-700 text-lg">
                    Access previous examination papers with marking guides to prepare for your UCE exams
                  </p>
                </div>
              </Link>

              <Link href="/auth/sign-up" className="group">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-3xl p-10 hover:shadow-2xl hover:scale-105 transition-all h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">📋</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 flex items-center justify-between text-indigo-900">
                    Project Work Guidelines
                    <ArrowRight className="w-7 h-7 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                  </h3>
                  <p className="text-indigo-700 text-lg">
                    Get comprehensive project templates and guidelines for your school projects
                  </p>
                </div>
              </Link>
            </div>

            {/* More Services & Media Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-border rounded-3xl p-10 hover:shadow-2xl transition-all">
                <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">More Services</h3>
                <div className="space-y-4">
                  <Link href="/auth/sign-up" className="group flex items-center justify-between p-5 bg-gradient-to-r from-muted to-muted/50 rounded-2xl hover:from-primary/10 hover:to-accent/10 transition-all hover:scale-105">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-2xl">👨🏫</span>
                      </div>
                      <span className="font-bold text-lg">Contact Expert Facilitators</span>
                    </div>
                    <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                  </Link>

                  <Link href="/auth/sign-up" className="group flex items-center justify-between p-5 bg-gradient-to-r from-muted to-muted/50 rounded-2xl hover:from-primary/10 hover:to-accent/10 transition-all hover:scale-105">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-2xl">📄</span>
                      </div>
                      <span className="font-bold text-lg">Full Examination Papers</span>
                    </div>
                    <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                  </Link>

                  <Link href="/auth/sign-up" className="group flex items-center justify-between p-5 bg-gradient-to-r from-muted to-muted/50 rounded-2xl hover:from-primary/10 hover:to-accent/10 transition-all hover:scale-105">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-2xl">🎥</span>
                      </div>
                      <span className="font-bold text-lg">Video Resources</span>
                    </div>
                    <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                  </Link>
                </div>
              </div>

              {/* Media Placeholder - Replace with actual image/video */}
              <div className="relative bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-3xl overflow-hidden group hover:shadow-2xl transition-all">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="relative h-full min-h-[400px] flex flex-col items-center justify-center p-10 text-center">
                  <div className="w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Play className="w-12 h-12 text-primary" />
                  </div>
                  <h4 className="text-3xl font-bold mb-3 text-white">Watch Our Story</h4>
                  <p className="text-white/90 text-lg mb-6">See how Q'Vault is transforming education in Uganda</p>
                  <button className="px-8 py-3 bg-white text-primary rounded-xl font-semibold hover:scale-105 transition-all">
                    Play Video
                  </button>
                  {/* Replace this div with: <Image src="/your-image.jpg" alt="..." fill className="object-cover" /> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-primary to-accent rounded-[3rem] p-16 text-center text-white shadow-2xl hover:shadow-3xl transition-all">
            <h2 className="text-5xl font-bold mb-6">Ready to Excel?</h2>
            <p className="text-2xl mb-10 opacity-95">Join thousands of Ugandan students using Q'Vault</p>
            <Link href="/auth/sign-up" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary rounded-2xl font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all">
              Create Free Account 
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-12 px-6 bg-gradient-to-b from-background to-muted">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground">&copy; 2024 Q'Vault Uganda. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
