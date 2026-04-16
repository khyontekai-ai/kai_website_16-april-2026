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
  title: 'Khyontek.ai - The Shape of Intelligence',
  description: 'Khyontek AI is a Guwahati-based AI research company building population-specific biological intelligence and regulatory AI systems for South and Southeast Asia. The shape of intelligence, built in Northeast India.',
  keywords: ['AI research', 'biological intelligence', 'population genomics', 'Northeast India', 'Guwahati', 'Khyontek AI', 'healthcare AI', 'South Asia AI'],
  authors: [{ name: 'Khyontek AI Pvt Ltd' }],
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Khyontek.ai - The Shape of Intelligence',
    description: 'AI research rooted in Northeast India. Built for Asia\'s underrepresented populations.',
    url: 'https://khyontekai.com',
    siteName: 'Khyontek.ai',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khyontek.ai - The Shape of Intelligence',
    description: 'AI research rooted in Northeast India. Built for Asia\'s underrepresented populations.',
  },
  metadataBase: new URL('https://khyontekai.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} ${firaCode.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
        <link rel="canonical" href="https://khyontekai.com" />
      </head>
      <body className={`${nunito.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Khyontek AI Pvt Ltd',
              alternateName: 'Khyontek.ai',
              url: 'https://khyontekai.com',
              logo: 'https://khyontekai.com/logo.png',
              description: 'AI research company building population-specific biological intelligence and regulatory AI systems for South and Southeast Asia.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Guwahati',
                addressRegion: 'Assam',
                addressCountry: 'IN',
              },
              sameAs: [
                'https://www.linkedin.com/company/khyontek-ai-private-limited/',
                'https://huggingface.co/KhyontekAI',
              ],
              founder: [
                { '@type': 'Person', name: 'Dr. Pritam Deka', jobTitle: 'Co-Founder and CEO' },
                { '@type': 'Person', name: 'Nayan J Kalita', jobTitle: 'Co-Founder' },
              ],
            }),
          }}
        />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}