'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, RefreshCw } from 'lucide-react'

export default function FeaturedWork() {
  const [caseStudies, setCaseStudies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCaseStudies() {
      try {
        const res = await fetch('/api/casestudies')
        if (res.ok) {
          const data = await res.json()
          setCaseStudies(data)
        }
      } catch (err) {
        console.error('Failed to fetch case studies:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCaseStudies()
  }, [])

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-amber-gold text-sm font-semibold tracking-widest uppercase mb-3">Case Studies</p>
          <h2 className="text-3xl md:text-4xl font-bold text-dark-navy">
            What We Work On
          </h2>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <RefreshCw className="w-8 h-8 text-royal-blue animate-spin" />
          </div>
        ) : caseStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((card) => (
              <div key={card.id || card._id} className="p-8 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all group flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-royal-blue to-amber-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xl font-bold text-dark-navy mb-3">{card.title}</h3>
                <p className="text-dark-grey text-sm leading-relaxed flex-grow">{card.description}</p>
                {card.link && (
                  <Link href={card.link} className="mt-6 inline-flex items-center text-sm font-bold text-royal-blue group-hover:text-amber-gold transition-colors">
                    Explore Case Study <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-mid-grey py-10 border border-dashed border-gray-200 rounded-xl">
            <p>New case studies will be published here soon.</p>
          </div>
        )}
      </div>
    </section>
  )
}
