import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export const metadata: Metadata = {
  title: 'My Work To Do - 프리미엄 업무 관리',
  description: '프리미엄 디자인의 현대적인 작업 관리 앱. 월간, 주간, 일일 뷰와 우선순위 기반 작업 관리.',
  keywords: ['작업 관리', '할일 관리', '캘린더', '생산성'],
  authors: [{ name: 'My Work To Do' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning className="dark scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#050b18" />
      </head>
      <body className={`${inter.className} bg-mm-dark text-mm-text m-0 p-0 overflow-hidden`}>
        {children}
      </body>
    </html>
  )
}
