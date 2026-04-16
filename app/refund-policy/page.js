import { ArrowUp } from 'lucide-react'

export const metadata = {
  title: 'Refund Policy - Khyontek.ai',
  description: 'Refund Policy for Khyontek AI programmes.',
}

export default function RefundPolicyPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <article className="max-w-[700px] mx-auto px-4 sm:px-6 prose-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-navy mb-2">Refund Policy</h1>
        <p className="text-sm text-mid-grey mb-8">Last updated: April 2025</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">1. Programme registration fees</h2>
          <p className="text-dark-grey leading-relaxed">
            All registrations for the Summer Research Immersion Programme are subject to the following refund terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">2. Full refund</h2>
          <p className="text-dark-grey leading-relaxed">
            You are entitled to a full refund if: Khyontek AI cancels the programme for any reason; or the minimum cohort of 20 confirmed registrations is not reached by the registration deadline. Refunds in these cases are processed within 7 working days to your original payment method.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">3. Partial refund</h2>
          <p className="text-dark-grey leading-relaxed">
            If you choose to withdraw from the programme within 7 days of your confirmed registration and at least 21 days before the programme start date, you will receive a refund minus a Rs. 500 administration fee.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">4. No refund</h2>
          <p className="text-dark-grey leading-relaxed">
            No refund will be issued if you withdraw less than 21 days before the programme start date. By this point, Khyontek AI has committed costs to sessions, materials, expert coordination, and logistics based on confirmed numbers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">5. How to request a refund</h2>
          <p className="text-dark-grey leading-relaxed">
            Email <a href="mailto:contact@khyontekai.com" className="text-royal-blue hover:underline">contact@khyontekai.com</a> with your full name, registered email address, Razorpay payment ID, and your reason for withdrawal. We will respond within 3 working days.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">6. Razorpay payment processing</h2>
          <p className="text-dark-grey leading-relaxed">
            All refunds are processed via Razorpay to your original payment method. Razorpay's standard processing timelines apply (typically 5 to 7 business days after we initiate the refund).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-dark-navy mb-3">7. Contact</h2>
          <p className="text-dark-grey leading-relaxed">
            For any refund-related questions, contact us at <a href="mailto:contact@khyontekai.com" className="text-royal-blue hover:underline">contact@khyontekai.com</a>.
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