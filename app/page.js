import Link from 'next/link'
import { Brain, FlaskConical, MapPin } from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="corner-brackets-lg p-8 md:p-12">
              <h1 className="text-4xl md:text-6xl font-extrabold text-royal-blue leading-tight">
                The Shape of Intelligence
              </h1>
              <p className="mt-6 text-lg md:text-xl text-dark-grey leading-relaxed">
                AI research rooted in Northeast India. Built for Asia's underrepresented populations.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/research"
                  className="px-8 py-3 bg-royal-blue text-white font-bold rounded-lg hover:bg-dark-navy transition-colors text-center"
                >
                  Our Research
                </Link>
                <Link
                  href="/programmes"
                  className="px-8 py-3 bg-amber-gold text-dark-navy font-bold rounded-lg hover:bg-amber-500 transition-colors text-center"
                >
                  Join Our Programme
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Strip */}
      <section className="bg-pale-blue py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">
                <div className="w-12 h-12 rounded-lg bg-royal-blue/10 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-royal-blue" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-dark-navy mb-2">Population-First AI</h3>
              <p className="text-dark-grey text-sm leading-relaxed">
                We build AI systems that represent South and Southeast Asian populations, beginning with the communities of Northeast India most absent from global genomic databases.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">
                <div className="w-12 h-12 rounded-lg bg-royal-blue/10 flex items-center justify-center">
                  <FlaskConical className="w-6 h-6 text-royal-blue" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-dark-navy mb-2">Research-Native</h3>
              <p className="text-dark-grey text-sm leading-relaxed">
                Our work begins with real biological questions, real disease contexts, and real populations, not generic models retrofitted to Asian data.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">
                <div className="w-12 h-12 rounded-lg bg-royal-blue/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-royal-blue" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-dark-navy mb-2">Rooted in the Northeast</h3>
              <p className="text-dark-grey text-sm leading-relaxed">
                Guwahati, Assam is not just our address. It is our research context, our community, and our competitive advantage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-navy text-center mb-12">
            What We Work On
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Biological Intelligence',
                desc: 'Multi-modal AI and genomic data systems designed for disease contexts prevalent in Northeast India and South and Southeast Asia.',
              },
              {
                title: 'Population Genomics',
                desc: 'Building and curating datasets that represent tribal and indigenous communities severely underrepresented in global biomedical databases.',
              },
              {
                title: 'Regulatory and Ethical Frameworks',
                desc: 'AI development that is DPDPA-compliant, ABDM-compatible, and ethically accountable to the communities it serves.',
              },
            ].map((card, i) => (
              <div key={i} className="corner-brackets p-8 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-dark-navy mb-3">{card.title}</h3>
                <p className="text-dark-grey text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Strip */}
      <section className="bg-light-grey py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-mid-grey text-sm mb-8">
            Research affiliations and institutional partnerships across Northeast India
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {['IIT Guwahati', 'Tezpur University', 'NIT Silchar', 'Cotton University', 'Gauhati University'].map((name) => (
              <div key={name} className="flex items-center justify-center px-6 py-3 bg-white rounded-lg shadow-sm border border-gray-200">
                <span className="text-sm font-semibold text-mid-grey">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}