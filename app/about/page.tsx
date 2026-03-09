import Link from 'next/link'
import Image from 'next/image'
import { Target, Users, Award } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-20 px-6 bg-gradient-to-b from-muted to-background">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">About Q'Vault</h1>
            <p className="text-xl text-muted-foreground">
              Empowering Ugandan students with quality educational resources
            </p>
          </div>

          <div className="bg-white border-2 border-border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              Q'Vault is dedicated to providing comprehensive educational resources aligned with Uganda's New Lower Secondary Curriculum (NLSC). 
              We bridge the gap between students and quality learning materials, making education accessible to all Ugandan students regardless of their location.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-border rounded-3xl p-6 text-center hover:shadow-xl hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Our Vision</h3>
              <p className="text-sm text-muted-foreground">
                To be Uganda's leading educational platform for secondary school students
              </p>
            </div>

            <div className="bg-white border-2 border-border rounded-3xl p-6 text-center hover:shadow-xl hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">
                Connecting students and teachers across Uganda
              </p>
            </div>

            <div className="bg-white border-2 border-border rounded-3xl p-6 text-center hover:shadow-xl hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Quality</h3>
              <p className="text-sm text-muted-foreground">
                NCDC-aligned content reviewed by experienced educators
              </p>
            </div>
          </div>

          <div className="bg-white border-2 border-border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">What We Offer</h2>
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
            <Link href="/auth/sign-up" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all">
              Join Q'Vault Today
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
