'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight, Play, Star, Users, BookOpen, Award, Mail, MessageCircle } from 'lucide-react'

const slides = [
  {
    title: "Find Activities of Integration",
    subtitle: "Access comprehensive learning activities aligned with Uganda's lower secondary curriculum",
    image: "/Digital-Pathways-AI-Education-Day-780x439.jpg",
    link: "#activities"
  },
  {
    title: "Access UCE Past Papers",
    subtitle: "Practice with previous examination papers and detailed marking guides",
    image: "/innovative-learning-approaches-870x570.jpg",
    link: "#past-papers"
  },
  {
    title: "Get Project Work Guidelines",
    subtitle: "Comprehensive templates and step-by-step guides for your school projects",
    image: "/Technology-is-Education.jpg",
    link: "#project-work"
  },
  {
    title: "Learn From Expert Facilitators",
    subtitle: "Connect with qualified teachers and get personalized guidance",
    image: "/empowerment through education.jpg",
    link: "#expert-facilitators"
  },
  {
    title: "Excel In Your Studies",
    subtitle: "Join thousands of Ugandan students achieving academic excellence with Q'Vault",
    image: "/modern education.jpeg",
    link: "/auth/sign-up"
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
      setCurrentSlide((prev) => {
        const next = (prev + 1) % slides.length
        console.log('Slide transition:', prev, '->', next)
        return next
      })
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen overflow-hidden">
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
          <div className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Home</Link>
            <Link href="/about" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">About</Link>
            <Link href="/resources" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Resources</Link>
            <Link href="/auth/teacher-application" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Register As Facilitator</Link>
            <Link href="/contact" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Contact</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all hover:scale-105">Sign In</Link>
            <Link href="/auth/sign-up" className="px-7 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl text-sm font-bold hover:shadow-xl hover:scale-105 transition-all">Get Started</Link>
          </div>
        </nav>
      </header>

      <main className="pt-24">
        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-primary via-accent to-primary py-12 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-5 text-white leading-tight drop-shadow-lg">
              Stay Ahead of the Class With Q'Vault
            </h1>
            <p className="text-lg md:text-xl text-white/95 max-w-4xl mx-auto leading-relaxed">
              Get the latest and most comprehensive study resources in the lower secondary curriculum - with guidelines on how to approach them.
            </p>
          </div>
        </section>

        {/* Hero Slideshow */}
        <section className="relative h-[540px] overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <Image 
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
              <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
                <div className={`max-w-2xl transform transition-all duration-1000 delay-300 ${
                  index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                }`}>
                  <div className="inline-block px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-medium mb-6 text-primary shadow-lg">
                    🎓 Uganda's #1 Learning Platform
                  </div>
                  <h1 className="text-6xl font-bold mb-6 leading-tight text-white drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  <p className="text-xl text-white/95 mb-8 leading-relaxed drop-shadow-lg">{slide.subtitle}</p>
                  <div className="flex gap-4">
                    <Link href={slide.link} className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all cursor-pointer">
                      Explore Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/auth/sign-up" className="inline-flex items-center gap-2 px-8 py-4 bg-white/90 backdrop-blur-sm rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
                      Get Started Free
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-6 bottom-[35%] w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-6 bottom-[35%] w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
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
        <section id="activities" className="py-24 px-6 bg-gradient-to-b from-muted to-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Find Activities of Integration
              </h2>
              <p className="text-xl text-muted-foreground">Choose your subject and start learning</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Sciences */}
              <div className="group relative bg-white border-2 border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:scale-105 hover:border-blue-200 transition-all duration-300">
                <div className="absolute inset-0 opacity-[0.03]">
                  <Image src="/Digital-Pathways-AI-Education-Day-780x439.jpg" alt="Sciences" fill className="object-cover" />
                </div>
                <div className="relative p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">🔬</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Sciences</h3>
                  <div className="space-y-3">
                    {subjects.sciences.map((subject, index) => (
                      <Link
                        key={subject}
                        href={`/activities/${subject}`}
                        className="block px-5 py-3.5 bg-gradient-to-r from-muted to-muted/50 rounded-xl hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 transition-all font-medium transform hover:translate-x-2"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {subject}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Humanities */}
              <div className="group relative bg-white border-2 border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:scale-105 hover:border-amber-200 transition-all duration-300">
                <div className="absolute inset-0 opacity-[0.03]">
                  <Image src="/innovative-learning-approaches-870x570.jpg" alt="Humanities" fill className="object-cover" />
                </div>
                <div className="relative p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">🌍</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Humanities</h3>
                  <div className="space-y-3">
                    {subjects.humanities.map((subject, index) => (
                      <Link
                        key={subject}
                        href={`/activities/${subject}`}
                        className="block px-5 py-3.5 bg-gradient-to-r from-muted to-muted/50 rounded-xl hover:from-amber-50 hover:to-amber-100 hover:text-amber-600 transition-all font-medium transform hover:translate-x-2"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {subject}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="group relative bg-white border-2 border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:scale-105 hover:border-emerald-200 transition-all duration-300">
                <div className="absolute inset-0 opacity-[0.03]">
                  <Image src="/digital-education-tools-for-teachers-and-studentswebp.webp" alt="Languages" fill className="object-cover" />
                </div>
                <div className="relative p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">📚</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">Languages</h3>
                  <div className="space-y-3">
                    {subjects.languages.map((subject, index) => (
                      <Link
                        key={subject}
                        href={`/activities/${subject}`}
                        className="block px-5 py-3.5 bg-gradient-to-r from-muted to-muted/50 rounded-xl hover:from-emerald-50 hover:to-emerald-100 hover:text-emerald-600 transition-all font-medium transform hover:translate-x-2"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {subject}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* UCE Past Papers & Project Work */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Link href="/auth/sign-up" id="past-papers" className="group">
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

              <Link href="/auth/sign-up" id="project-work" className="group">
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
              <div id="expert-facilitators" className="bg-white border border-border rounded-3xl p-10 hover:shadow-2xl transition-all">
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
                <Image 
                  src="/empowerment through education.jpg"
                  alt="Quality Education"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                <div className="relative h-full min-h-[400px] flex flex-col items-center justify-center p-10 text-center">
                  <div className="w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Play className="w-12 h-12 text-primary" />
                  </div>
                  <h4 className="text-3xl font-bold mb-3 text-white">Watch Our Story</h4>
                  <p className="text-white/90 text-lg mb-6">See how Q'Vault is transforming education in Uganda</p>
                  <button className="px-8 py-3 bg-white text-primary rounded-xl font-semibold hover:scale-105 transition-all">
                    Play Video
                  </button>
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
        <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-20 pb-10 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              {/* Brand Section */}
              <div className="md:col-span-1">
                <Link href="/" className="flex items-center gap-4 mb-6 group">
                  <Image src="/qvault logo (2).png" alt="Q'Vault" width={120} height={120} className="rounded-2xl shadow-lg group-hover:shadow-2xl transition-all" />
                  <div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Q'Vault</div>
                    <div className="text-sm text-white/70 font-semibold tracking-wider">Practice Makes Perfect !</div>
                  </div>
                </Link>
                <p className="text-white/70 text-sm leading-relaxed mb-6">Uganda's leading platform for Activities of Integration, past papers, and quality education resources.</p>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-primary hover:to-accent rounded-lg flex items-center justify-center hover:scale-110 transition-all">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-primary hover:to-accent rounded-lg flex items-center justify-center hover:scale-110 transition-all">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-primary hover:to-accent rounded-lg flex items-center justify-center hover:scale-110 transition-all">
                    <Mail className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-primary hover:to-accent rounded-lg flex items-center justify-center hover:scale-110 transition-all">
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-primary hover:to-accent rounded-lg flex items-center justify-center hover:scale-110 transition-all">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">About Us</Link></li>
                  <li><Link href="/resources" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">Resources</Link></li>
                  <li><Link href="/contact" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">Contact</Link></li>
                  <li><Link href="/auth/sign-up" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">Get Started</Link></li>
                </ul>
              </div>

              {/* Subjects */}
              <div>
                <h4 className="text-lg font-bold mb-6 text-white">Subjects</h4>
                <ul className="space-y-3">
                  <li><Link href="/auth/sign-up" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">Mathematics</Link></li>
                  <li><Link href="/auth/sign-up" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">Physics</Link></li>
                  <li><Link href="/auth/sign-up" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">Chemistry</Link></li>
                  <li><Link href="/auth/sign-up" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">English</Link></li>
                  <li><Link href="/auth/sign-up" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">View All →</Link></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-bold mb-6 text-white">Get in Touch</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">📍</span>
                    <span className="text-white/70 text-sm">Kampala, Uganda</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">📧</span>
                    <span className="text-white/70 text-sm">info@qvault.ug</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">📱</span>
                    <span className="text-white/70 text-sm">+256 XXX XXX XXX</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/60 text-sm">&copy; 2024 Q'Vault Uganda. All rights reserved.</p>
              <div className="flex gap-6 text-sm">
                <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-white/60 hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/cookies" className="text-white/60 hover:text-white transition-colors">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
