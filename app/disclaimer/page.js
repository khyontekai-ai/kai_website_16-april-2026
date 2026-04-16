import { ArrowUp } from 'lucide-react'

export const metadata = {
  title: 'Disclaimer - Khyontek.ai',
  description: 'Disclaimer for Khyontek AI website.',
}

export default function DisclaimerPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <article className="max-w-[700px] mx-auto px-4 sm:px-6 prose-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-navy mb-2">Disclaimer</h1>
        <p className="text-sm text-mid-grey mb-8">Last updated: April 2025</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">1. General</h2>
          <p className="text-dark-grey leading-relaxed">
            The information on this website is provided for general informational purposes only. While we make every effort to keep it accurate and up to date, Khyontek AI Pvt Ltd makes no warranties about the completeness, accuracy, or reliability of any information on this site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">2. Research and scientific content</h2>
          <p className="text-dark-grey leading-relaxed">
            Research descriptions, disease focus areas, and technical content on this website represent the current direction of Khyontek AI's work. They do not constitute peer-reviewed findings, medical advice, or clinical recommendations. Do not use any information on this website as a substitute for professional medical or scientific advice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">3. External links</h2>
          <p className="text-dark-grey leading-relaxed">
            Our website may contain links to external websites. We are not responsible for the content, accuracy, or privacy practices of those sites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">4. Programme information</h2>
          <p className="text-dark-grey leading-relaxed">
            Programme details including dates, fees, structure, and tracks are subject to change. Always refer to the most current version of the Programmes page for up-to-date information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">5. Contact</h2>
          <p className="text-dark-grey leading-relaxed">
            For any questions about content on this website, contact us at <a href="mailto:contact@khyontekai.com" className="text-royal-blue hover:underline">contact@khyontekai.com</a>.
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