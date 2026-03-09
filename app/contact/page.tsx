import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-20 px-6 bg-gradient-to-b from-muted to-background">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Get in touch with the Q'Vault team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-border rounded-3xl p-6 text-center hover:shadow-xl hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="font-bold mb-2">Email</h3>
              <a href="mailto:info@qvault.ug" className="text-sm text-primary hover:underline">
                info@qvault.ug
              </a>
            </div>

            <div className="bg-white border-2 border-border rounded-3xl p-6 text-center hover:shadow-xl hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="font-bold mb-2">Phone</h3>
              <a href="tel:+256700000000" className="text-sm text-primary hover:underline">
                +256 700 000 000
              </a>
            </div>

            <div className="bg-white border-2 border-border rounded-3xl p-6 text-center hover:shadow-xl hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="font-bold mb-2">Location</h3>
              <p className="text-sm text-muted-foreground">
                Kampala, Uganda
              </p>
            </div>
          </div>

          <div className="bg-white border-2 border-border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Send us a message</h2>
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
                className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
