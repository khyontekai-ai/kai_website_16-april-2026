import Link from 'next/link'
import { ArrowUp } from 'lucide-react'

export const metadata = {
  title: 'Cookie Policy - Khyontek.ai',
  description: 'Cookie Policy for Khyontek AI website.',
}

export default function CookiePolicyPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <article className="max-w-[700px] mx-auto px-4 sm:px-6 prose-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-navy mb-2">Cookie Policy</h1>
        <p className="text-sm text-mid-grey mb-8">Last updated: April 2025</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">1. What are cookies</h2>
          <p className="text-dark-grey leading-relaxed">
            Cookies are small text files stored on your device when you visit a website. They help the website remember information about your visit.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">2. How we use cookies</h2>
          <p className="text-dark-grey leading-relaxed">
            We use cookies to: understand how visitors use our website; remember your preferences where applicable; and ensure the website functions correctly. We do not use cookies to track you across other websites or to serve you targeted advertising.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">3. Types of cookies we use</h2>
          <ul className="list-disc pl-5 space-y-2 text-dark-grey leading-relaxed">
            <li><strong>Essential cookies:</strong> required for the website to function. These cannot be disabled.</li>
            <li><strong>Analytics cookies:</strong> help us understand how visitors interact with the site. These are anonymised.</li>
            <li><strong>Third-party cookies:</strong> Google Fonts and any analytics tools we use may set their own cookies. Please refer to their respective privacy policies.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">4. Managing cookies</h2>
          <p className="text-dark-grey leading-relaxed">
            You can control or delete cookies through your browser settings. Disabling cookies may affect how some parts of the website function.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">5. Contact</h2>
          <p className="text-dark-grey leading-relaxed">
            For any questions about our use of cookies, contact us at <a href="mailto:info@khyontek.ai" className="text-royal-blue hover:underline">info@khyontek.ai</a>.
          </p>
        </section>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <a href="#" className="inline-flex items-center gap-1 text-sm text-royal-blue hover:underline">
            <ArrowUp size={14} /> Back to top
          </a>
        </div>
      </article>
    </div>
  )
}