import Link from 'next/link'
import Image from 'next/image'
import { Brain, FlaskConical, MapPin, Cpu, Cog, Handshake, ShieldCheck, Lightbulb, BarChart3, Languages } from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      {/* Hero Banner Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1597733336794-12d05021d510?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHwyfHxuZXVyYWwlMjBuZXR3b3JrfGVufDB8fHxibHVlfDE3NzYzNDk5MTh8MA&ixlib=rb-4.1.0&q=85&w=1920"
            alt="AI neural network visualization"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-navy/95 via-dark-navy/85 to-dark-navy/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="relative pl-6 md:pl-8">
              <p className="text-amber-gold text-sm font-semibold tracking-widest uppercase mb-4">Research & Development</p>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                The Shape of<br />Intelligence
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-lg">
                AI research rooted in Northeast India. Built for Asia's underrepresented populations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/research"
                  className="px-8 py-3.5 bg-royal-blue text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Our Research
                </Link>
                <Link
                  href="/programmes"
                  className="px-8 py-3.5 bg-amber-gold text-dark-navy font-bold rounded-lg hover:bg-amber-500 transition-colors text-center"
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
              <div key={i} className="p-8 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-dark-navy mb-3">{card.title}</h3>
                <p className="text-dark-grey text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="bg-light-grey py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-gold text-sm font-semibold tracking-widest uppercase mb-3">Core Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-navy mb-4">
              Applied Research
            </h2>
            <p className="text-dark-grey max-w-2xl mx-auto">
              Bridging the gap between theoretical AI research and practical, scalable application for real-world impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 rounded-xl bg-royal-blue/10 flex items-center justify-center mb-5 group-hover:bg-royal-blue/20 transition-colors">
                <Cpu className="w-7 h-7 text-royal-blue" />
              </div>
              <h3 className="text-lg font-bold text-dark-navy mb-3">Applied AI Research</h3>
              <p className="text-dark-grey text-sm leading-relaxed">
                Conducting deep, foundational research to develop novel AI algorithms and models for real-world challenges. We explore new methodologies in machine learning, NLP, and computer vision with emphasis on interpretability and robustness.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 rounded-xl bg-royal-blue/10 flex items-center justify-center mb-5 group-hover:bg-royal-blue/20 transition-colors">
                <Cog className="w-7 h-7 text-royal-blue" />
              </div>
              <h3 className="text-lg font-bold text-dark-navy mb-3">Intelligent Systems Development</h3>
              <p className="text-dark-grey text-sm leading-relaxed">
                Translating cutting-edge AI research into deployable, high-performance intelligent systems. We build solutions that are reliable, efficient, and sustainable for real-world integration in biological and clinical contexts.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 rounded-xl bg-royal-blue/10 flex items-center justify-center mb-5 group-hover:bg-royal-blue/20 transition-colors">
                <Handshake className="w-7 h-7 text-royal-blue" />
              </div>
              <h3 className="text-lg font-bold text-dark-navy mb-3">Research Collaboration</h3>
              <p className="text-dark-grey text-sm leading-relaxed">
                Partnering with academic institutions, government agencies, and industry to build a collaborative ecosystem that accelerates responsible AI innovation anchored in Northeast India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Focus Areas */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-gold text-sm font-semibold tracking-widest uppercase mb-3">Research Domains</p>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-navy">Focus Areas</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Responsible AI and Ethics',
                desc: 'Frameworks for ethical, fair, and transparent AI systems. Bias mitigation, fairness across demographics, and privacy-preserving AI for sensitive domains.',
              },
              {
                icon: Lightbulb,
                title: 'Explainable AI',
                desc: 'Techniques to make complex AI models interpretable. Local and global interpretability methods for building trust in healthcare and clinical applications.',
              },
              {
                icon: BarChart3,
                title: 'AI for Resource Optimisation',
                desc: 'Applying reinforcement learning and predictive analytics to optimise resource utilisation in healthcare delivery and public health systems.',
              },
              {
                icon: Languages,
                title: 'Low-Resource Language Models',
                desc: 'Building and adapting foundation models for underserved Indian languages, including languages of Northeast India with limited digital resources.',
              },
            ].map((area, i) => (
              <div key={i} className="p-6 bg-white border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-pale-blue flex items-center justify-center mb-4">
                  <area.icon className="w-6 h-6 text-royal-blue" />
                </div>
                <h3 className="text-base font-bold text-dark-navy mb-2">{area.title}</h3>
                <p className="text-dark-grey text-xs leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* India-First Banner */}
      <section className="bg-dark-navy py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                India-First,<br />
                <span className="text-amber-gold">Globally Relevant.</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Khyontekai is rooted in India's vibrant research ecosystem, but our vision extends far beyond borders. We believe that meaningful AI innovation can emerge from anywhere.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                Our approach combines the rigour of academic research with the agility of a focused research lab. We collaborate with universities, research institutions, and industry partners to tackle problems that matter.
              </p>
              <div className="flex gap-8">
                <div>
                  <p className="text-3xl font-extrabold text-amber-gold">3+</p>
                  <p className="text-sm text-gray-400">Years Research</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-amber-gold">12+</p>
                  <p className="text-sm text-gray-400">Academic Partners</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Research Integrity', desc: 'Peer-reviewed methodology backing every claim.' },
                { title: 'Real-World Constraints', desc: 'Designing for the world as it is, not as we wish it to be.' },
                { title: 'Long-Term Thinking', desc: 'Optimising for impact over decades, not quarters.' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-5">
                  <h3 className="text-white font-bold mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
