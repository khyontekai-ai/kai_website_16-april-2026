import Link from 'next/link'
import { Bug, Droplets, Heart, CircleDot } from 'lucide-react'

export const metadata = {
  title: 'Research - Khyontek.ai',
  description: 'Explore our research in biological intelligence, population genomics, and regulatory AI for South and Southeast Asian populations.',
}

export default function ResearchPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-dark-navy mb-4">Research at Khyontek AI</h1>
          <p className="text-lg text-mid-grey leading-relaxed">
            We build AI systems that start with the right question: whose biology does this model actually understand?
          </p>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-pale-blue py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-dark-navy mb-6">Our Approach</h2>
              <p className="text-dark-grey text-base leading-relaxed">
                We take a multi-modal approach to biological intelligence, integrating genomic sequence models, protein structure prediction, clinical record analysis, and epidemiological data into unified pipelines. Our architecture is designed to be population-aware from the ground up, not population-adjusted after the fact.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="corner-brackets-lg p-12 w-full max-w-sm">
                <div className="text-center">
                  <div className="text-6xl font-extrabold text-royal-blue/10">AI</div>
                  <p className="text-sm text-mid-grey mt-4">Population-aware from the ground up</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disease Focus Areas */}
      <section className="bg-light-grey py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark-navy text-center mb-12">Disease Focus Areas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: Bug,
                title: 'Vector-borne and Neglected Tropical Diseases',
                desc: 'Diseases prevalent in Northeast India that remain underserved by global research pipelines.',
              },
              {
                icon: Droplets,
                title: 'Haematological Disorders',
                desc: 'Including thalassaemia and haemoglobinopathies disproportionately affecting communities in the region.',
              },
              {
                icon: Heart,
                title: 'Metabolic Conditions',
                desc: 'Type 2 diabetes and related conditions in South and Southeast Asian populations.',
              },
              {
                icon: CircleDot,
                title: 'Oral Cancers',
                desc: 'Linked to regional risk factors specific to Northeast Indian communities.',
              },
            ].map((area, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-royal-blue/10 flex items-center justify-center shrink-0 mt-1">
                    <area.icon className="w-5 h-5 text-royal-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark-navy mb-2">{area.title}</h3>
                    <p className="text-dark-grey text-sm leading-relaxed">{area.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data and Infrastructure */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark-navy mb-6">Data and Infrastructure</h2>
          <p className="text-dark-grey text-base leading-relaxed">
            We are building a data architecture compliant with India's Digital Personal Data Protection Act (DPDPA) and compatible with the Ayushman Bharat Digital Mission (ABDM) framework. Data sovereignty and community consent are foundational design principles, not compliance checkboxes.
          </p>
        </div>
      </section>

      {/* Collaborations */}
      <section className="bg-pale-blue py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark-navy mb-6">Collaborations</h2>
          <p className="text-dark-grey text-base leading-relaxed mb-8">
            We work with academic institutions across Northeast India and engage with national bodies including BIRAC, DBT, DST, and ICMR. We are pursuing Bio-AI hub partnerships anchored in the Northeast region.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-royal-blue text-white font-bold rounded-lg hover:bg-dark-navy transition-colors"
          >
            Partner With Us
          </Link>
        </div>
      </section>
    </div>
  )
}