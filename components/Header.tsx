'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-xl border-b border-border/50 z-50 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-4 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
            <Image src="/qvault logo (2).png" alt="Q'Vault" width={60} height={60} className="sm:w-[100px] sm:h-[100px] rounded-2xl shadow-md group-hover:shadow-xl transition-all relative" />
          </div>
          <div className="hidden sm:block">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">Q'Vault</div>
            <div className="text-xs text-muted-foreground font-semibold tracking-wider uppercase">Practice Makes Perfect !</div>
          </div>
        </Link>
        
        {/* Mobile Site Name - Center */}
        <div className="sm:hidden flex-1 text-center mx-4">
          <div className="text-lg font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">Q'Vault</div>
          <div className="text-xs text-muted-foreground font-semibold tracking-wider uppercase">Practice Makes Perfect !</div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all">Home</Link>
          <Link href="/about" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all">About Us</Link>
          <Link href="/resources" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all">Resources</Link>
          <Link href="/contact" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all">Contact</Link>
        </div>
        
        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          <Link href="/auth/sign-up" className="px-3 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-xs lg:text-sm font-bold hover:shadow-xl hover:scale-105 transition-all">
            <span className="hidden lg:inline">Get Started as Student</span>
            <span className="lg:hidden">Student</span>
          </Link>
          <Link href="/auth/teacher-application" className="px-3 lg:px-8 py-2 lg:py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl text-xs lg:text-sm font-bold hover:shadow-xl hover:scale-105 transition-all">
            <span className="hidden lg:inline">Register As Facilitator</span>
            <span className="lg:hidden">Teacher</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-border/50 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <Link href="/" className="block text-sm font-semibold text-foreground/80 hover:text-primary transition-all py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/about" className="block text-sm font-semibold text-foreground/80 hover:text-primary transition-all py-2" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link href="/resources" className="block text-sm font-semibold text-foreground/80 hover:text-primary transition-all py-2" onClick={() => setIsMenuOpen(false)}>Resources</Link>
            <Link href="/contact" className="block text-sm font-semibold text-foreground/80 hover:text-primary transition-all py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <div className="pt-4 space-y-3">
              <Link href="/auth/sign-up" className="block w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-bold text-center" onClick={() => setIsMenuOpen(false)}>
                Get Started as Student
              </Link>
              <Link href="/auth/teacher-application" className="block w-full px-4 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl text-sm font-bold text-center" onClick={() => setIsMenuOpen(false)}>
                Register As Facilitator
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
