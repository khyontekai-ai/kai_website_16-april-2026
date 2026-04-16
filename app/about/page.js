import Link from 'next/link'
import { Microscope, Users, ShieldCheck, MapPin, Linkedin } from 'lucide-react'

export const metadata = {
  title: 'About - Khyontek.ai',
  description: 'Learn about Khyontek AI, a research-first AI company based in Guwahati, Assam, building biological intelligence for underrepresented populations.',
}

export default function AboutPage() {
  return (
    <div>
      {/* Who We Are */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-dark-navy mb-8">Who We Are</h1>
          <p className="text-dark-grey text-lg leading-relaxed">
            Khyontek AI Pvt Ltd is a research-first AI company based in Guwahati, Assam. We build biological intelligence and regulatory AI systems designed for South and Southeast Asian populations, beginning with the communities of Northeast India who are most underrepresented in global genomic and biomedical databases. Our work sits at the intersection of genomics, clinical AI, and population equity. We believe that AI which cannot recognise your biology cannot serve your health.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-pale-blue py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark-navy mb-6">Our Mission</h2>
          <blockquote className="border-l-4 border-royal-blue pl-6 py-2">
            <p className="text-lg md:text-xl text-royal-blue italic leading-relaxed font-semibold">
              "To build foundational biological intelligence systems that are representative of, and accountable to, Asia's diverse populations, beginning with the most underrepresented communities of Northeast India."
            </p>
          </blockquote>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark-navy text-center mb-12">Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Microscope,
                title: 'Scientific Rigour',
                desc: 'Reproducibility, transparency, and peer-reviewed evidence are non-negotiable.',
              },
              {
                icon: Users,
                title: 'Population Equity',
                desc: 'We prioritise data from populations omitted by global genomic databases.',
              },
              {
                icon: ShieldCheck,
                title: 'Responsible Innovation',
                desc: 'Biosafety, data sovereignty, and indigenous knowledge are ethical commitments, not afterthoughts.',
              },
              {
                icon: MapPin,
                title: 'Rootedness',
                desc: 'Guwahati, Assam is our research context, our community, and our competitive advantage.',
              },
            ].map((val, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-14 h-14 rounded-full bg-pale-blue flex items-center justify-center mx-auto mb-4">
                  <val.icon className="w-7 h-7 text-royal-blue" />
                </div>
                <h3 className="text-lg font-bold text-dark-navy mb-2">{val.title}</h3>
                <p className="text-dark-grey text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="bg-light-grey py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark-navy mb-6">Our Focus Areas</h2>
          <p className="text-dark-grey text-lg leading-relaxed">
            We work across biological AI systems, population genomics, clinical data infrastructure, and regulatory AI frameworks specific to India's data governance landscape. Our disease focus includes conditions prevalent in Northeast India and underserved by current research, including vector-borne infections, haematological disorders, and metabolic conditions disproportionately affecting tribal and indigenous communities.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark-navy text-center mb-12">Our Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Dr. Pritam Deka */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-pale-blue flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-royal-blue">PD</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark-navy">Dr. Pritam Deka</h3>
                  <p className="text-royal-blue font-semibold text-sm">Co-Founder and CEO</p>
                </div>
              </div>
              <p className="text-dark-grey text-sm leading-relaxed mb-4">
                AI and NLP researcher specialising in large language models, multimodal AI, and health informatics. Brings deep technical expertise in transformer-based systems and a research-first approach to building Khyontek AI's biological intelligence architecture.
              </p>
              <a
                href="https://www.linkedin.com/in/pritam-deka-phd-9158251b8/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-royal-blue hover:text-dark-navy transition-colors text-sm font-semibold"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>

            {/* Nayan J Kalita */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-pale-blue flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-royal-blue">NJK</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark-navy">Nayan J Kalita</h3>
                  <p className="text-royal-blue font-semibold text-sm">Co-Founder</p>
                </div>
              </div>
              <p className="text-dark-grey text-sm leading-relaxed mb-4">
                Entrepreneur and builder rooted in Guwahati, Assam. Works across AI, community development, and grassroots enterprise in Northeast India. Anchors Khyontek AI's mission in the lived realities of the populations it serves.
              </p>
              <a
                href="https://www.linkedin.com/in/nayan-j-kalita/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-royal-blue hover:text-dark-navy transition-colors text-sm font-semibold"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}