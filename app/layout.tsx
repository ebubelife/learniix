import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Learniix - A Top Affiliate Platform',
  description: 'Learniix - Learn, Sell, Earn ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <head>
        {/* Add the Google Fonts link for Space Grotesque */}
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet"/>
  

      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
