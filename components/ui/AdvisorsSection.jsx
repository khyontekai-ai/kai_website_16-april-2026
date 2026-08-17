'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Code, Scale, Brain, Sparkles, X, ArrowRight, CheckCircle2, UserCheck } from 'lucide-react'
import { Marquee } from '@/components/ui/marquee'

const teamMembers = [
  {
    id: 'pritam',
    name: 'DR. PRITAM DEKA',
    role: 'Founder & CEO',
    org: 'Khyontek AI',
    tag: 'Founder & CEO',
    bio: "Dr. Pritam Deka is Founder & CEO at Khyontek AI. PhD from Queen's University Belfast in trustworthy AI and health misinformation. Specialist in Vision-Language Models and document intelligence.",
    fullBio: "Dr. Pritam Deka, PhD, is Founder & CEO at Khyontek AI. An AI researcher and engineer specializing in multimodal artificial intelligence, natural language processing, and document intelligence. He completed his PhD at Queen's University Belfast, focusing on health misinformation detection, evidence-based fact-checking, and trustworthy AI. His current work explores Vision-Language Models, LLMs, business process intelligence, and diagram understanding to help AI systems interpret complex workflows.",
    expertise: ['Trustworthy AI', 'Vision-Language Models', 'Healthcare AI & Fact-Checking', 'Multimodal Reasoning'],
    image: '/advisors/pritam.png',
    icon: Brain,
    accentColor: 'text-amber-gold',
    badgeBg: 'bg-amber-gold/15 text-amber-gold border-amber-gold/40',
    borderColor: 'border-amber-gold/40 hover:border-amber-gold',
  },
  {
    id: 'nayan',
    name: 'NAYAN J KALITA',
    role: 'Co-Founder & Chief Strategy Officer',
    org: 'Khyontek AI',
    tag: 'Co-Founder & CSO',
    bio: 'Nayan J Kalita is Co-Founder & Chief Strategy Officer at Khyontek AI. NLP & ML expert specializing in low-resource systems for Assamese and Manipuri. A BIRAC BIG awardee.',
    fullBio: 'Nayan J Kalita is Co-Founder and Chief Strategy Officer at Khyontek AI. With a background in natural language processing and machine learning, specializing in low-resource language systems for Assamese and Manipuri, he brings deep technical expertise alongside hands-on experience in building and leading early-stage ventures in Northeast India. A BIRAC BIG awardee, he has navigated government-funded innovation from the ground up.',
    expertise: ['Low-Resource NLP', 'Assamese & Manipuri Models', 'BIRAC BIG Awardee', 'Regional Tech Strategy'],
    image: '/advisors/nayan.png',
    icon: Code,
    accentColor: 'text-amber-gold',
    badgeBg: 'bg-amber-gold/15 text-amber-gold border-amber-gold/40',
    borderColor: 'border-amber-gold/40 hover:border-amber-gold',
  },
  {
    id: 'ranjan',
    name: 'RANJAN DEKA',
    role: 'Lead Consultant',
    org: 'Xebia',
    tag: 'Full-Stack Advisor',
    bio: 'Ranjan Deka is Full-Stack & Systems Advisor to Khyontek AI and Lead Consultant at Xebia. Full-Stack Engineer with 11+ years delivering enterprise applications in .NET, React.js, and Node.js.',
    fullBio: 'Ranjan Deka is Lead Consultant at Xebia and Full Stack Advisor to Khyontek AI. With over 11 years of experience in building and delivering enterprise applications, his expertise spans .NET, C#, JavaScript, React.js, and Node.js across e-commerce and telecommunications domains. Known for leading engineering teams, delivering high-quality solutions, and embracing emerging technologies including AI-driven development tools.',
    expertise: ['.NET & C# Enterprise Systems', 'React.js & Node.js Architecture', '11+ Years Full-Stack Lead', 'E-Commerce & Telecom Solutions'],
    image: '/advisors/ranjan.png',
    icon: Code,
    accentColor: 'text-cyan-400',
    badgeBg: 'bg-royal-blue/30 text-cyan-300 border-royal-blue/50',
    borderColor: 'border-royal-blue/40 hover:border-cyan-400',
  },
  {
    id: 'srutisma',
    name: 'SRUTISMA HAZARIKA',
    role: 'Legal Advisor',
    org: 'S&N Legal',
    tag: 'Legal Advisor',
    bio: 'Srutisma Hazarika is Legal Advisor to Khyontek AI and Partner at S&N Legal. Advocate with a strong foundation in economics and law, specializing in international contracts, labor laws, and business disputes.',
    fullBio: 'Ms. Srutisma Hazarika, Partner at S&N Legal, is a distinguished advocate and Legal Advisor with a robust foundation in both economics and law. She is highly regarded for her adept handling of matters related to international contracts, labor laws, and regulatory governance. Known for her diplomatic approach and sharp legal insight, Ms. Hazarika has successfully mediated and resolved numerous complex business disputes.',
    expertise: ['International Contracts', 'Labor Laws & Regulatory Governance', 'Complex Business Dispute Resolution', 'Economics & Technology Law'],
    image: '/advisors/srutisma.png',
    icon: Scale,
    accentColor: 'text-amber-gold',
    badgeBg: 'bg-amber-gold/15 text-amber-gold border-amber-gold/40',
    borderColor: 'border-amber-gold/40 hover:border-amber-gold',
  },
  {
    id: 'pawan',
    name: 'DR. PAWAN K. MISHRA',
    role: 'Advisor, Algorithms & Theoretical CS',
    org: 'Assistant Professor, IIIT Guwahati',
    tag: 'Theoretical CS Advisor',
    bio: 'Dr. Pawan K. Mishra is Advisor in Algorithms & Theoretical CS and Assistant Professor at IIIT Guwahati. PhD from IIT Guwahati and former BITS Pilani faculty, specializing in network optimization and graph theory.',
    fullBio: 'Dr. Pawan K. Mishra is Advisor, Algorithms & Theoretical Computer Science at Khyontek AI and Assistant Professor in CSE at IIIT Guwahati. His expertise lies at the intersection of network optimization and algorithmic design, with a focus on graph theory, approximation algorithms, computational geometry, and discrete location theory. Former BITS Pilani faculty with PhD from IIT Guwahati, widely published in Discrete Applied Mathematics and Information Processing Letters.',
    expertise: ['Network Optimization & Graph Theory', 'Approximation Algorithms', 'Discrete Location Theory', 'Theoretical CS & R&D'],
    image: '/advisors/pawan.png',
    icon: Brain,
    accentColor: 'text-cyan-400',
    badgeBg: 'bg-royal-blue/30 text-cyan-300 border-royal-blue/50',
    borderColor: 'border-royal-blue/40 hover:border-cyan-400',
  }
]

export default function AdvisorsSection() {
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <section className="relative w-full overflow-hidden bg-dark-navy py-16 md:py-24 font-sans text-white">
      {/* Background Lighting & Decorative Shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-royal-blue/30 via-royal-blue/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-gold/10 blur-[160px] pointer-events-none" />

      {/* Decorative SVG Line Graphic */}
      <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none">
        <svg
          className="text-royal-blue"
          fill="none"
          height="154"
          viewBox="0 0 460 154"
          width="460"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_494_1104)">
            <path
              d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="40"
            />
          </g>
          <defs>
            <clipPath id="clip0_494_1104">
              <rect fill="white" height="154" width="460" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mx-auto mb-16 flex max-w-4xl flex-col items-center px-6 text-center lg:px-0">
          {/* Header Badge Icon using audience.png */}
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-gold p-2.5 shadow-lg border border-amber-gold/50 overflow-hidden">
            <img
              src="/advisors/audience.png"
              alt="Audience Icon"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-gold/10 border border-amber-gold/30 text-amber-gold text-xs font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Founders & Advisory Leadership</span>
          </div>

          <h2 className="relative mb-4 font-extrabold text-4xl text-white tracking-tight sm:text-5xl lg:text-6xl">
            MEET OUR <span className="text-amber-gold">TEAM & ADVISORS</span>
          </h2>

          <p className="max-w-2xl text-gray-200 text-base sm:text-lg font-light leading-relaxed">
            Pioneering researchers, engineers, legal strategists, and academic leaders building population-first AI solutions for Northeast India and beyond.
          </p>
        </div>

        {/* Marquee Carousel Container */}
        <div className="relative w-full">
          {/* Gradient Fades on Edges */}
          <div className="pointer-events-none absolute top-0 left-0 z-20 h-full w-24 sm:w-36 bg-gradient-to-r from-dark-navy to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 z-20 h-full w-24 sm:w-36 bg-gradient-to-l from-dark-navy to-transparent" />

          <Marquee className="[--gap:2rem] py-4" pauseOnHover>
            {teamMembers.map((member, idx) => {
              const isHovered = hoveredId === `${member.id}-${idx}`
              return (
                <div
                  key={`${member.id}-${idx}`}
                  onMouseEnter={() => setHoveredId(`${member.id}-${idx}`)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedPerson(member)}
                  className={`group relative flex w-72 sm:w-80 shrink-0 flex-col rounded-2xl bg-[#131F59] border transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-xl overflow-hidden p-5 ${
                    isHovered
                      ? 'border-amber-gold shadow-[0_0_30px_rgba(245,166,35,0.3)] scale-[1.02]'
                      : 'border-white/10 opacity-90'
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative h-80 w-full overflow-hidden rounded-xl bg-dark-navy mb-4 border border-white/10 transition-colors">
                    <img
                      alt={member.name}
                      src={member.image}
                      className={`h-full w-full object-cover object-top transition-all duration-500 ${
                        isHovered ? 'grayscale-0 scale-105' : 'grayscale contrast-110'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-navy via-transparent to-transparent opacity-80" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${member.badgeBg}`}>
                        {member.tag}
                      </span>
                    </div>
                  </div>

                  {/* Info Text */}
                  <h3 className={`font-bold text-white uppercase text-base tracking-wide transition-colors mb-0.5 ${
                    isHovered ? 'text-amber-gold' : 'text-white'
                  }`}>
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-amber-gold mb-0.5">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-gray-300 font-medium mb-3">
                    {member.org}
                  </p>

                  <p className="text-xs text-gray-200 leading-relaxed font-light line-clamp-2 mb-4">
                    {member.bio}
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedPerson(member)
                    }}
                    className={`w-full mt-auto py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-between transition-colors shadow ${
                      isHovered
                        ? 'bg-amber-gold text-dark-navy'
                        : 'bg-royal-blue text-white hover:bg-amber-gold hover:text-dark-navy'
                    }`}
                  >
                    <span>View Profile & Highlights</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform" />
                  </button>
                </div>
              )
            })}
          </Marquee>
        </div>

        {/* Vision & Mission Banner */}
        <div className="mx-auto mt-20 max-w-4xl px-6 text-center lg:px-0">
          <div className="bg-gradient-to-r from-royal-blue/40 via-dark-navy to-royal-blue/40 border border-amber-gold/30 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex justify-center items-center gap-2 text-amber-gold text-xs font-bold uppercase tracking-widest mb-3">
              <CheckCircle2 className="w-4 h-4 text-amber-gold" />
              <span>Our Mission & Regional Vision</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Accelerating Socio-Economic Growth in Assam & Northeast India
            </h3>
            <p className="text-gray-200 text-xs sm:text-sm max-w-3xl mx-auto leading-relaxed font-light">
              To pioneer a premier research-to-product ecosystem that accelerates the socio-economic growth of Assam and Northeast India. By transforming regional data into scalable, high-impact AI solutions across critical sectors like healthcare, finance, and tourism, we bridge the gap between academic innovation and industry-scale impact—building science-backed technologies that uplift local societies while competing on a global stage.
            </p>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {selectedPerson && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
          onClick={() => setSelectedPerson(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0E1742] border border-amber-gold/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,166,35,0.25)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPerson(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors z-20"
              aria-label="Close Profile"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
              <div className="w-full md:w-48 shrink-0">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/20 shadow-lg bg-dark-navy">
                  <img
                    src={selectedPerson.image}
                    alt={selectedPerson.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-gold/20 border border-amber-gold/40 text-amber-gold text-[11px] font-bold uppercase tracking-wider">
                    {selectedPerson.tag}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-extrabold text-white mb-1 tracking-wide">
                  {selectedPerson.name}
                </h3>
                <p className="text-sm font-bold text-amber-gold mb-1">
                  {selectedPerson.role}
                </p>
                <p className="text-xs text-gray-300 font-medium mb-4">
                  {selectedPerson.org}
                </p>

                <div className="bg-royal-blue/20 border border-royal-blue/40 rounded-xl p-4 mb-4">
                  <h4 className="text-xs font-bold text-amber-gold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-amber-gold" />
                    <span>Executive & Research Biography</span>
                  </h4>
                  <p className="text-xs text-gray-200 leading-relaxed font-normal">
                    {selectedPerson.fullBio}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Key Focus Areas:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPerson.expertise.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-royal-blue/30 border border-royal-blue/50 text-cyan-200 text-xs font-medium"
                      >
                        • {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedPerson(null)}
                className="px-5 py-2 rounded-lg bg-amber-gold text-dark-navy hover:bg-[#E0941B] text-xs font-bold transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
