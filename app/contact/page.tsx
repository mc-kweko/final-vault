import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
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
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Get in touch with the Q'Vault team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-border rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Email</h3>
              <a href="mailto:info@qvault.ug" className="text-sm text-primary hover:underline">
                info@qvault.ug
              </a>
            </div>

            <div className="bg-white border border-border rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Phone</h3>
              <a href="tel:+256700000000" className="text-sm text-primary hover:underline">
                +256 700 000 000
              </a>
            </div>

            <div className="bg-white border border-border rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Location</h3>
              <p className="text-sm text-muted-foreground">
                Kampala, Uganda
              </p>
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring h-32"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
