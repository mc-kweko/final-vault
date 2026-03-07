import Link from 'next/link'
import { ArrowRight, BookOpen, Users, Award, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-border z-50">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-lg">Q</div>
            <span className="text-xl font-bold">Q'Vault</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-sm font-medium hover:text-primary transition">About</Link>
            <Link href="/resources" className="text-sm font-medium hover:text-primary transition">Resources</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition">Contact</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm font-medium hover:text-primary transition">Sign In</Link>
            <Link href="/auth/sign-up" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition">Get Started</Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Uganda's New Lower Secondary Curriculum
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Excel in Your Studies with <span className="text-primary">Q'Vault</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Access comprehensive Activities of Integration, UCE past papers, and curated educational resources aligned with Uganda's curriculum.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/sign-up" className="px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2">
                Start Learning Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/resources" className="px-8 py-4 border-2 border-border rounded-xl font-semibold hover:border-primary transition">
                Browse Resources
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
            {[
              { icon: BookOpen, label: 'Activities', value: '500+' },
              { icon: Users, label: 'Students', value: '1000+' },
              { icon: Award, label: 'Subjects', value: '12' },
              { icon: Zap, label: 'Past Papers', value: '200+' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white border border-border rounded-2xl p-6 text-center">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground">Built specifically for Ugandan students</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Activities of Integration', desc: 'Curriculum-aligned interactive learning activities', icon: '📚' },
              { title: 'UCE Past Papers', desc: 'Access previous examination papers with marking guides', icon: '📝' },
              { title: 'Ask Teachers', desc: 'Connect with teachers and get help when you need it', icon: '💬' },
              { title: 'Offline Access', desc: 'Download resources for offline study', icon: '📥' },
              { title: 'Track Progress', desc: 'Monitor your learning journey and achievements', icon: '📊' },
              { title: 'Mobile Friendly', desc: 'Access from any device, anywhere', icon: '📱' },
            ].map((feature) => (
              <div key={feature.title} className="bg-white border border-border rounded-2xl p-8 hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-primary rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Excel?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of Ugandan students using Q'Vault</p>
          <Link href="/auth/sign-up" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition">
            Create Free Account <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Q'Vault Uganda. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
