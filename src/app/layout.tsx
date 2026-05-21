import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Work To Do - Task Management',
  description: 'A modern task management app with calendar, weekly, and daily views.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className}`} style={{ backgroundColor: '#0f172a', color: '#f8fafc', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
