import Link from 'next/link'
import { ArrowUp } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy - Khyontek.ai',
  description: 'Privacy Policy for Khyontek AI Pvt Ltd.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <article className="max-w-[700px] mx-auto px-4 sm:px-6 prose-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-navy mb-2">Privacy Policy</h1>
        <p className="text-sm text-mid-grey mb-8">Last updated: April 2025 | Effective date: April 2025</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">1. Who we are</h2>
          <p className="text-dark-grey leading-relaxed">
            Khyontek AI Pvt Ltd is an AI research company registered in India, based in Guwahati, Assam. Our website is khyontek.ai.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">2. What information we collect</h2>
          <ul className="list-disc pl-5 space-y-2 text-dark-grey leading-relaxed">
            <li><strong>Personal details</strong> you submit via our contact form or programme registration form: name, email address, phone number, college or university, degree programme, year of study, and your written responses.</li>
            <li><strong>Payment information:</strong> we do not store your card or payment details. All payments are processed securely by Razorpay. We only retain the Razorpay payment ID for record-keeping.</li>
            <li><strong>Usage data:</strong> we may collect anonymised data about how visitors use our website via analytics tools.</li>
            <li><strong>Cookies:</strong> see our <Link href="/cookie-policy" className="text-royal-blue hover:underline">Cookie Policy</Link>.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">3. How we use your information</h2>
          <ul className="list-disc pl-5 space-y-2 text-dark-grey leading-relaxed">
            <li>To process your programme registration and communicate with you about it.</li>
            <li>To respond to enquiries submitted via the contact form.</li>
            <li>To improve our website and understand how it is being used.</li>
            <li>We do not sell, rent, or share your personal data with third parties for marketing purposes.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">4. Data storage and security</h2>
          <p className="text-dark-grey leading-relaxed">
            All form submissions are stored in a MongoDB Atlas database hosted on secure cloud infrastructure. Payment processing is handled entirely by Razorpay. We take reasonable precautions to protect your data but cannot guarantee absolute security of data transmitted over the internet.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">5. Your rights under DPDPA (India)</h2>
          <p className="text-dark-grey leading-relaxed">
            Under India's Digital Personal Data Protection Act 2023, you have the right to access the personal data we hold about you; correct inaccurate data; request erasure of your data where it is no longer needed; and withdraw consent where processing is based on consent. To exercise any of these rights, contact us at <a href="mailto:contact@khyontekai.com" className="text-royal-blue hover:underline">contact@khyontekai.com</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">6. Data retention</h2>
          <p className="text-dark-grey leading-relaxed">
            We retain programme registration data for up to 2 years after the programme end date. Contact form data is retained for up to 12 months. You may request deletion at any time by writing to <a href="mailto:contact@khyontekai.com" className="text-royal-blue hover:underline">contact@khyontekai.com</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">7. Third-party services</h2>
          <p className="text-dark-grey leading-relaxed">
            Our website uses: Razorpay (payment processing); MongoDB Atlas (data storage); Resend (transactional email); Google Fonts (typography); and analytics tools for anonymised usage tracking. Each of these services has its own privacy policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">8. Children</h2>
          <p className="text-dark-grey leading-relaxed">
            Our services are not directed at children under the age of 18. We do not knowingly collect data from minors.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">9. Changes to this policy</h2>
          <p className="text-dark-grey leading-relaxed">
            We may update this policy from time to time. The "last updated" date at the top of this page will reflect any changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">10. Contact</h2>
          <p className="text-dark-grey leading-relaxed">
            For any privacy-related queries, write to us at <a href="mailto:contact@khyontekai.com" className="text-royal-blue hover:underline">contact@khyontekai.com</a> or at: Khyontek AI Pvt Ltd, Guwahati, Assam, India.
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