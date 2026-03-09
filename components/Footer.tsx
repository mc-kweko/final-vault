import Link from 'next/link'
import Image from 'next/image'
import { Mail, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
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
              <li><Link href="/" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">Home</Link></li>
              <li><Link href="/about" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">About Us</Link></li>
              <li><Link href="/resources" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">Resources</Link></li>
              <li><Link href="/auth/teacher-application" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">Register As Facilitator</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">Contact</Link></li>
              <li><Link href="/auth/sign-up" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">Get Started</Link></li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Subjects</h4>
            <ul className="space-y-3">
              <li><Link href="/activities/Mathematics" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">Mathematics</Link></li>
              <li><Link href="/activities/Physics" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">Physics</Link></li>
              <li><Link href="/activities/Chemistry" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">Chemistry</Link></li>
              <li><Link href="/activities/English" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">English</Link></li>
              <li><Link href="/#activities" className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">View All →</Link></li>
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
  )
}
