import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Target, Users, Award } from 'lucide-react'

export default function AboutPage() {
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
          <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </nav>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">About Q'Vault</h1>
            <p className="text-xl text-muted-foreground">
              Empowering Ugandan students with quality educational resources
            </p>
          </div>

          <div className="bg-white border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              Q'Vault is dedicated to providing comprehensive educational resources aligned with Uganda's New Lower Secondary Curriculum (NLSC). 
              We bridge the gap between students and quality learning materials, making education accessible to all Ugandan students regardless of their location.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-border rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Our Vision</h3>
              <p className="text-sm text-muted-foreground">
                To be Uganda's leading educational platform for secondary school students
              </p>
            </div>

            <div className="bg-white border border-border rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">
                Connecting students and teachers across Uganda
              </p>
            </div>

            <div className="bg-white border border-border rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Quality</h3>
              <p className="text-sm text-muted-foreground">
                NCDC-aligned content reviewed by experienced educators
              </p>
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>Activities of Integration aligned with NLSC curriculum</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>UCE past papers with marking guides</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>Direct communication with qualified teachers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>Offline access to downloaded resources</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>Progress tracking and bookmarking features</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <Link href="/auth/sign-up" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition">
              Join Q'Vault Today
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
