import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: "Q'Vault - Uganda's Educational Platform",
  description: 'Access Activities of Integration, past papers, and educational resources for Ugandan students',
  icons: {
    icon: '/qvault logo (2).png',
    apple: '/qvault logo (2).png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
