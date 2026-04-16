import { ArrowUp } from 'lucide-react'

export const metadata = {
  title: 'Terms and Conditions - Khyontek.ai',
  description: 'Terms and Conditions for Khyontek AI website and programmes.',
}

export default function TermsPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <article className="max-w-[700px] mx-auto px-4 sm:px-6 prose-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-navy mb-2">Terms and Conditions</h1>
        <p className="text-sm text-mid-grey mb-8">Last updated: April 2025</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">1. About these terms</h2>
          <p className="text-dark-grey leading-relaxed">
            These terms govern your use of the Khyontek AI website (khyontekai.com) and your participation in any programmes offered by Khyontek AI Pvt Ltd. By using our website or registering for a programme, you agree to these terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">2. Use of this website</h2>
          <p className="text-dark-grey leading-relaxed">
            You may use this website for lawful purposes only. You must not attempt to gain unauthorised access to any part of the website, interfere with its operation, or use it to distribute harmful or unlawful content.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">3. Intellectual property</h2>
          <p className="text-dark-grey leading-relaxed">
            All content on this website, including text, graphics, logos, and research descriptions, is the property of Khyontek AI Pvt Ltd and is protected under applicable Indian intellectual property laws. You may not reproduce, distribute, or use any content without prior written permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">4. Programme participation</h2>
          <p className="text-dark-grey leading-relaxed">
            By registering for the Summer Research Immersion Programme, you agree to: attend sessions as scheduled; contribute to your track's group deliverable in good faith; comply with Khyontek AI's code of conduct; and acknowledge that all research outputs produced during the programme are owned by Khyontek AI Pvt Ltd. You retain the right to reference your participation and contribution in your personal CV and academic applications.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">5. Payments</h2>
          <p className="text-dark-grey leading-relaxed">
            All programme fees are collected via Razorpay. By completing payment you confirm that you have read and accepted these terms and our Refund Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">6. Limitation of liability</h2>
          <p className="text-dark-grey leading-relaxed">
            Khyontek AI Pvt Ltd is not liable for any indirect, incidental, or consequential loss arising from your use of this website or participation in our programmes. Our total liability in any matter related to our programmes shall not exceed the fee you paid to us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">7. Governing law</h2>
          <p className="text-dark-grey leading-relaxed">
            These terms are governed by the laws of India. Any disputes arising from these terms shall be subject to the jurisdiction of courts in Guwahati, Assam.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">8. Changes to these terms</h2>
          <p className="text-dark-grey leading-relaxed">
            We may update these terms from time to time. Continued use of the website after changes are posted constitutes your acceptance of the updated terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">9. Contact</h2>
          <p className="text-dark-grey leading-relaxed">
            For any queries related to these terms, contact us at <a href="mailto:contact@khyontekai.com" className="text-royal-blue hover:underline">contact@khyontekai.com</a>.
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