import BentoBox from '@/components/ui/BentoBox'
import Link from 'next/link'

export const metadata = {
  title: 'Showcase Preview - Khyontek.ai',
  description: 'A preview of our portfolio: Compliance, Adda AI, and Community Impact.',
}

export default function PreviewShowcasePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-nunito">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Khyontek Showcase</span>
          </div>
          <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            Back to Live Site
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
            Preview Environment
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Building the Future of <span className="text-blue-600">Intelligence.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            From secure DPDPA-compliant enterprise architecture to Gen-Z consumer tech, and empowering the next generation of builders.
          </p>
        </div>
      </section>

      {/* The Bento Box Grid */}
      <section id="bento-box">
        <BentoBox />
      </section>

      {/* Case Study Section (Zero to Web) */}
      <section className="bg-white py-24 border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The "Zero to Web" Case Study</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Our 7-day workshop didn't just teach theory. It created builders. Here is a glimpse of what happens when you make technology accessible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder for Student Websites */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-slate-50 rounded-2xl border border-gray-100 p-2 group hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-full h-48 bg-slate-200 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center">
                  {/* Simulate an iframe or website screenshot */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-300 to-slate-200"></div>
                  <span className="relative z-10 text-slate-400 font-semibold flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    Student Site {item}
                  </span>
                </div>
                <div className="px-4 pb-4">
                  <h4 className="font-bold text-slate-900">Portfolio {item}</h4>
                  <p className="text-sm text-slate-500">Built in 7 days</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-center">
        <p className="text-slate-400 text-sm">© 2026 Khyontek AI. Preview Showcase Environment.</p>
      </footer>
    </div>
  )
}
