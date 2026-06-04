import { ShieldCheck, Smartphone, Users } from 'lucide-react'

export default function BentoBox() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        
        {/* Card 1: Compliance & Enterprise (Spans 2 columns on desktop) */}
        <div className="md:col-span-2 relative overflow-hidden bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/3 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise Compliance</h3>
              <p className="text-slate-600 max-w-md">
                Secure, robust data governance compliant with the DPDPA and ABDM framework. Built on trust and absolute data sovereignty.
              </p>
            </div>
            
            {/* Mock Dashboard UI snippet */}
            <div className="mt-8 bg-slate-50 rounded-xl p-4 border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-semibold text-slate-700">DPDPA Audit Status: Clean</span>
              </div>
              <div className="text-xs text-slate-500 font-mono">ENCRYPTED_PII_NODE</div>
            </div>
          </div>
        </div>

        {/* Card 2: Adda AI (Gen Z focus) */}
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 text-orange-500">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Adda AI</h3>
            <p className="text-orange-900/70 text-sm">
              The smartest vibe-matching restaurant finder built for Gen-Z.
            </p>
          </div>
          
          {/* Mock Phone UI Snippet */}
          <div className="mt-6 w-full h-32 bg-white rounded-t-2xl shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)] border-t border-x border-gray-100 translate-y-4 group-hover:translate-y-2 transition-transform p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-xs">👋</span>
              </div>
              <div className="h-4 w-24 bg-gray-100 rounded-full"></div>
            </div>
            <div className="h-16 w-full bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl"></div>
          </div>
        </div>

        {/* Card 3: Community Workshop (Spans full width on bottom) */}
        <div className="md:col-span-3 relative overflow-hidden bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow group flex items-center gap-8">
           <div className="flex-1">
             <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-600" />
             </div>
             <h3 className="text-3xl font-extrabold text-slate-900 mb-2">Zero to Web</h3>
             <p className="text-slate-600 text-lg mb-6">
                Empowering the community. 55% of our latest cohort had never used a computer before. In 7 days, they built fully functional websites.
             </p>
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                +540% AI Literacy Lift
             </div>
           </div>
           
           <div className="hidden md:flex flex-1 items-center justify-center">
             {/* Abstract Representation of the jump from 0.5 to 3.2 */}
             <div className="w-full max-w-sm">
               <div className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                 <span>Baseline: 0.5</span>
                 <span className="text-blue-600">Post-Workshop: 3.2</span>
                 <span>Target: 5.0</span>
               </div>
               <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-600 rounded-full w-[64%] group-hover:w-[70%] transition-all duration-1000"></div>
               </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  )
}
