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
  title: 'Khyontek AI | Premier Artificial Intelligence Agency in Guwahati, Assam',
  description: 'Khyontek AI is a leading Artificial Intelligence agency based in Guwahati, Assam. We build population-specific biological intelligence, generative AI, and regulatory AI systems for South and Southeast Asia.',
  keywords: ['AI agency Guwahati', 'top AI agencies in Assam', 'Artificial Intelligence agency Guwahati', 'AI research', 'biological intelligence', 'population genomics', 'Northeast India', 'Khyontek AI'],
  authors: [{ name: 'Khyontek AI Pvt Ltd' }],
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Khyontek AI | Premier Artificial Intelligence Agency in Guwahati, Assam',
    description: 'Leading AI agency in Guwahati specializing in biological intelligence, generative AI, and regulatory systems for Asia\'s underrepresented populations.',
    url: 'https://khyontekai.com',
    siteName: 'Khyontek AI',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khyontek AI | Premier Artificial Intelligence Agency in Guwahati, Assam',
    description: 'Leading AI agency in Guwahati specializing in biological intelligence, generative AI, and regulatory systems.',
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
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Khyontek AI Pvt Ltd',
                alternateName: 'Khyontek.ai',
                url: 'https://khyontekai.com',
                logo: 'https://khyontekai.com/logo.png',
                description: 'AI research company and Artificial Intelligence agency building population-specific biological intelligence and regulatory AI systems for South and Southeast Asia.',
                sameAs: [
                  'https://www.linkedin.com/company/khyontek-ai-private-limited/',
                  'https://huggingface.co/KhyontekAI',
                ],
                founder: [
                  { '@type': 'Person', name: 'Dr. Pritam Deka', jobTitle: 'Co-Founder and CEO' },
                  { '@type': 'Person', name: 'Nayan J Kalita', jobTitle: 'Co-Founder' },
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: 'Khyontek AI | Premier Artificial Intelligence Agency',
                image: 'https://khyontekai.com/logo.png',
                '@id': 'https://khyontekai.com',
                url: 'https://khyontekai.com',
                telephone: '',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Guwahati',
                  addressLocality: 'Guwahati',
                  addressRegion: 'Assam',
                  addressCountry: 'IN',
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: 26.1445,
                  longitude: 91.7362
                },
                priceRange: '$$$',
                description: 'Top Artificial Intelligence agency based in Guwahati, Assam, offering generative AI development, population genomics AI, and regulatory tech solutions.'
              }
            ]),
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