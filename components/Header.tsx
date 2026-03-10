import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
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
        
        <div className="flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all">Home</Link>
          <Link href="/about" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all">About Us</Link>
          <Link href="/resources" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all">Resources</Link>
          <Link href="/contact" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all">Contact</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/auth/sign-up" className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-bold hover:shadow-xl hover:scale-105 transition-all">
            Get Started as Student
          </Link>
          <Link href="/auth/teacher-application" className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl text-sm font-bold hover:shadow-xl hover:scale-105 transition-all">
            Register As Facilitator
          </Link>
        </div>
      </nav>
    </header>
  )
}
