import Link from 'next/link'
import Image from 'next/image'
import { Clock, CheckCircle, Mail } from 'lucide-react'

export default function ApplicationPendingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
      <div className="w-full max-w-2xl text-center">
        <Link href="/" className="inline-flex flex-col items-center gap-2 mb-8 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
            <Image src="/qvault logo (2).png" alt="Q'Vault" width={96} height={96} className="rounded-2xl shadow-lg group-hover:shadow-2xl transition-all relative" />
          </div>
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">Q'Vault</div>
            <div className="text-sm text-muted-foreground font-semibold tracking-wider uppercase mt-1">Practice Makes Perfect !</div>
          </div>
        </Link>

        <div className="bg-white border-2 border-border rounded-3xl p-12 shadow-xl space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto">
            <Clock className="w-12 h-12 text-white" />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Application Submitted Successfully!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your teacher verification application is pending approval
            </p>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-200 rounded-2xl p-6 text-left">
            <h2 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              What happens next?
            </h2>
            <ul className="space-y-2 text-sm text-amber-800">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">1.</span>
                <span>Our admin team will review your application and verify your credentials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">2.</span>
                <span>You will receive an email notification once your application is reviewed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">3.</span>
                <span>If approved, you can login and access the teacher dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">4.</span>
                <span>Review typically takes 1-3 business days</span>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>Check your email for updates on your application status</span>
          </div>

          <div className="pt-4 border-t border-border">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
