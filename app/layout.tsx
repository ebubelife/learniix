import type { Metadata } from 'next'

import './globals.css'

import { Space_Grotesk } from 'next/font/google'
const space_grotesk =  Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Learniix -  A digital marketplace dedicated to assisting digital product creators in boosting their sales and expanding their customer base through our platform and a network of top-performing affiliates.',
  description: 'Learniix stands as a digital marketplace dedicated to assisting digital product creators in boosting their sales and expanding their customer base through our platform and a network of top-performing affiliates. ',
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
      <body className={space_grotesk.className}>{children}</body>
    </html>
  )
}
