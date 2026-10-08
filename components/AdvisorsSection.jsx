import Image from 'next/image';
import { GraduationCap, Code, Scale, Brain } from 'lucide-react';

const founders = [
  {
    id: 1,
    name: 'NAYANJYOTI KALITA',
    title: 'Co-Founder & Chief Strategy Officer',
    organization: 'Khyontek AI',
    description: 'Expert in NLP and machine learning for low-resource languages.',
    fullDetails: [
      'Background in NLP and ML, specializing in low-resource systems for Assamese and Manipuri.',
      'Deep technical expertise with hands-on experience building early-stage ventures in Northeast India.',
      'BIRAC BIG awardee, successfully navigating government-funded innovation from the ground up.'
    ],
    image: '/images/advisors/Nayan_Kalita_enhanced.png',
    icon: Code
  },
  {
    id: 2,
    name: 'DR. PRITAM DEKA',
    title: 'Founder & CEO',
    organization: 'Khyontek AI',
    description: 'Specializes in Vision-Language Models, LLMs, and trustworthy AI.',
    fullDetails: [
      "PhD at Queen's University Belfast focusing on trustworthy AI and health misinformation.",
      'Expertise in Vision-Language Models, Large Language Models, and business process intelligence.',
      'Published research spanning multimodal reasoning, document understanding, and AI-driven knowledge extraction.'
    ],
    image: '/images/advisors/Pritam_enhanced.png',
    icon: Brain
  }
];

const advisors = [
  {
    id: 1,
    name: 'DR. GYANENDRO LOITONGBAM',
    title: 'Assistant Professor',
    organization: 'IIT Ropar, Punjab',
    description: 'Expert in Computer Science and Engineering with a passion for teaching and research.',
    fullDetails: [
      'More details coming soon...'
    ],
    image: '/images/advisors/Gyanendra_enhanced.png',
    icon: GraduationCap
  },
  {
    id: 2,
    name: 'RANJAN DEKA',
    title: 'Full-Stack Developer',
    organization: '11+ Years of Experience',
    description: 'Seasoned full-stack developer building scalable, user-centric web applications.',
    fullDetails: [
      'More details coming soon...'
    ],
    image: '/images/advisors/Ranjan_enhanced.png',
    icon: Code
  },
  {
    id: 3,
    name: 'SRUTISMA HAZARIKA',
    title: 'Co-Founding Partner',
    organization: 'S&N Legal',
    description: 'Distinguished advocate with expertise in international contracts and labor laws.',
    fullDetails: [
      'More details coming soon...'
    ],
    image: '/images/advisors/Srutisma_enhanced.png',
    icon: Scale
  },
  {
    id: 4,
    name: 'DR. PAWAN K MISHRA',
    title: 'Assistant Professor',
    organization: 'IIIT Guwahati',
    description: 'Specializing in Computer Science and Engineering with a focus on cutting-edge research.',
    fullDetails: [
      'More details coming soon...'
    ],
    image: '/images/advisors/PawanMishra_enhanced.png',
    icon: Brain
  }
];

export default function AdvisorsSection() {
  return (
    <section className="bg-[#020b1f] text-white py-20 px-6 sm:px-8 lg:px-16 overflow-hidden relative">
      {/* Background gradients/patterns if any */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Founders Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-widest text-white mb-2 uppercase">Meet Our</h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#21c8f6] to-[#2068e8] tracking-wider pb-2">
                FOUNDERS
              </h1>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-blue-500" />
              <p className="text-gray-300 text-lg sm:text-xl font-light">Visionaries driving the future of AI.</p>
              <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {founders.map((founder) => (
              <div 
                key={founder.id}
                className="relative group rounded-2xl overflow-hidden border border-blue-900/50 bg-[#05112c] hover:border-blue-500/50 transition-all duration-300 flex flex-col h-fit"
              >
                {/* Top part for the image cutout */}
                <div className="relative h-[280px] sm:h-[320px] w-full flex justify-center items-end overflow-hidden pt-6">
                  <div className="relative w-full h-full bottom-0 z-10 flex justify-center">
                    <Image 
                      src={founder.image} 
                      alt={founder.name}
                      fill
                      className="object-contain object-bottom scale-[1.15] pointer-events-none"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                </div>

                {/* Content box */}
                <div className="relative z-20 bg-gradient-to-t from-[#020b1f] via-[#05112c] to-transparent pt-4 pb-8 px-6 flex flex-col items-center flex-grow">
                  <h3 className="text-[15px] font-bold text-white mb-1 uppercase tracking-wider text-center">{founder.name}</h3>
                  <p className="text-[#0ea5e9] text-sm font-medium mb-1 text-center">{founder.title}</p>
                  <p className="text-gray-400 text-[13px] mb-4 text-center">{founder.organization}</p>
                  <div className="w-full h-[1px] bg-blue-900/60 mb-4" />
                  <p className="text-gray-200 text-[13px] leading-relaxed w-full text-left italic font-light border-l-2 border-blue-500/50 pl-3 py-1">
                    {founder.description}
                  </p>

                  {/* Expandable Details */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out w-full opacity-0 group-hover:opacity-100">
                    <div className="overflow-hidden">
                      <div className="pt-4 mt-4 border-t border-blue-900/30">
                        <ul className="text-gray-300 text-[13px] leading-relaxed space-y-2 list-disc pl-4">
                          {founder.fullDetails.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advisors Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-widest text-white mb-2 uppercase">Meet Our</h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#21c8f6] to-[#2068e8] tracking-wider pb-2">
                ADVISORS
              </h1>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-blue-500" />
              <p className="text-gray-300 text-lg sm:text-xl font-light">Guiding expertise. Building impact.</p>
              <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {advisors.map((advisor) => (
              <div 
                key={advisor.id}
                className="relative group rounded-2xl overflow-hidden border border-blue-900/50 bg-[#05112c] hover:border-blue-500/50 transition-all duration-300 flex flex-col h-fit"
              >
                {/* Top part for the image cutout */}
                <div className="relative h-[280px] sm:h-[320px] w-full flex justify-center items-end overflow-hidden pt-6">
                  <div className="relative w-full h-full bottom-0 z-10 flex justify-center">
                    <Image 
                      src={advisor.image} 
                      alt={advisor.name}
                      fill
                      className="object-contain object-bottom scale-[1.15] pointer-events-none"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                </div>

                {/* Content box */}
                <div className="relative z-20 bg-gradient-to-t from-[#020b1f] via-[#05112c] to-transparent pt-4 pb-8 px-6 flex flex-col items-center flex-grow">
                  <h3 className="text-[15px] font-bold text-white mb-1 uppercase tracking-wider text-center">{advisor.name}</h3>
                  <p className="text-[#0ea5e9] text-sm font-medium mb-1 text-center">{advisor.title}</p>
                  <p className="text-gray-400 text-[13px] mb-4 text-center">{advisor.organization}</p>
                  <div className="w-full h-[1px] bg-blue-900/60 mb-4" />
                  <p className="text-gray-200 text-[13px] leading-relaxed w-full text-left italic font-light border-l-2 border-blue-500/50 pl-3 py-1">
                    {advisor.description}
                  </p>

                  {/* Expandable Details */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out w-full opacity-0 group-hover:opacity-100">
                    <div className="overflow-hidden">
                      <div className="pt-4 mt-4 border-t border-blue-900/30">
                        <ul className="text-gray-300 text-[13px] leading-relaxed space-y-2 list-disc pl-4">
                          {advisor.fullDetails.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
