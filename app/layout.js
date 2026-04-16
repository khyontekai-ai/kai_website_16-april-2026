import './globals.css'
import { Nunito, Fira_Code } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
})

export const metadata = {
  title: 'Khyontekai.com - The Shape of Intelligence',
  description: 'Khyontek AI is a Guwahati-based AI research company building population-specific biological intelligence and regulatory AI systems for South and Southeast Asia. The shape of intelligence, built in Northeast India.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Khyontekai.com - The Shape of Intelligence',
    description: 'Khyontek AI is a Guwahati-based AI research company building population-specific biological intelligence and regulatory AI systems for South and Southeast Asia.',
    url: 'https://khyontekai.com',
    siteName: 'Khyontekai.com',
    type: 'website',
  },
  metadataBase: new URL('https://khyontekai.com'),
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} ${firaCode.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
        <link rel="canonical" href="https://khyontekai.com" />
      </head>
      <body className={`${nunito.className} antialiased`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}