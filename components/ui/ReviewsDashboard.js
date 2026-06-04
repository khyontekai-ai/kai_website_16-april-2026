'use client'

import { useState, useEffect } from 'react'
import { Star, Loader2, TrendingUp, Monitor, ExternalLink } from 'lucide-react'

const studentSites = [
  { name: 'Lumiere Lookbook', url: 'https://lumiere-lookbook-shop-840198789147.asia-southeast1.run.app' },
  { name: 'Aura Beauty', url: 'https://aura-beauty-168601182208.asia-southeast1.run.app' },
  { name: 'EyeMuse Luxe', url: 'https://eyemuse-luxe-75960777019.asia-southeast1.run.app' }
]

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= rating ? 'text-amber-gold fill-amber-gold' : 'text-gray-300'}
        />
      ))}
    </div>
  )
}

export default function ReviewsDashboard() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRatingFilter, setSelectedRatingFilter] = useState('All')
  const [isHovered, setIsHovered] = useState(false)
  const [ambientReviews, setAmbientReviews] = useState([])

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch('/api/reviews', { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          setReviews(data)
          
          // Generate floating cloud data
          const shuffled = [...data].sort(() => 0.5 - Math.random())
          const selected = shuffled.slice(0, 15)
          const ambient = selected.map(rev => ({
            ...rev,
            left: `${Math.random() * 70 + 5}%`,
            top: `${Math.random() * 70 + 10}%`,
            delay: `${Math.random() * 5}s`,
            duration: `${Math.random() * 4 + 6}s`
          }))
          setAmbientReviews(ambient)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadReviews()
  }, [])

  return (
    <section id="reviews" className="bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-amber-gold text-xs font-extrabold tracking-widest uppercase mb-3 font-fira-code">// PERFORMANCE & IMPACT METRICS</p>
          <h2 className="text-3xl md:text-4xl font-black text-dark-navy uppercase tracking-tight font-nunito">
            Zero to Web: Case Study
          </h2>
          <p className="text-sm text-mid-grey mt-4 max-w-2xl mx-auto font-nunito font-light">
            In our latest cohort, over half the students had never used a computer before. Within 7 days, they built these fully functional e-commerce web applications.
          </p>
        </div>

        {/* Live Website Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {studentSites.map((site, i) => (
            <a 
              key={i} 
              href={site.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block bg-light-grey/40 border border-gray-200 rounded-none relative hover:border-royal-blue/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-amber-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-amber-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
              
              {/* Browser Window UI Header */}
              <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <div className="mx-auto bg-white px-3 py-0.5 text-[10px] text-gray-500 rounded border border-gray-200 truncate w-3/4 text-center font-fira-code">
                  {new URL(site.url).hostname}
                </div>
              </div>

              {/* Iframe Thumbnail (Scaled down) */}
              <div className="relative w-full h-56 overflow-hidden bg-white">
                <div className="absolute inset-0 z-10 pointer-events-none group-hover:bg-royal-blue/5 transition-colors"></div>
                <iframe 
                  src={site.url} 
                  className="absolute top-0 left-0 w-[400%] h-[400%] pointer-events-none origin-top-left scale-[0.25]"
                  tabIndex="-1"
                />
              </div>

              <div className="p-5 border-t border-gray-200 bg-white">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-dark-navy font-nunito">{site.name}</h4>
                  <ExternalLink size={16} className="text-mid-grey group-hover:text-royal-blue transition-colors" />
                </div>
                <p className="text-[11px] text-mid-grey font-fira-code mt-1 uppercase tracking-wider">Built in 7 Days</p>
              </div>
            </a>
          ))}
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Stat 1: Rating Overview */}
          <div className="lg:col-span-4 bg-light-grey/40 border border-gray-200 p-6 md:p-8 rounded-none relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-amber-gold" />
            <h3 className="text-[10px] font-black uppercase tracking-wider text-dark-navy font-fira-code mb-6">// SATISFACTION INDEX</h3>
            
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-5xl font-black text-dark-navy tracking-tight">
                {reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '5.0'}
              </span>
              <span className="text-sm text-mid-grey font-nunito">out of 5.0</span>
            </div>
            
            <div className="mb-6">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={star <= Math.round(parseFloat(reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '5.0')) ? 'text-amber-gold fill-amber-gold' : 'text-gray-300'}
                  />
                ))}
              </div>
              <p className="text-xs text-mid-grey font-nunito font-light">Based on {Math.max(50, reviews.length)}+ verified submissions</p>
            </div>

            {/* Rating Bars */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter(r => r.rating === rating).length
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                return (
                  <div key={rating} className="flex items-center gap-3 text-xs">
                    <span className="w-12 font-bold text-dark-navy font-nunito shrink-0 flex items-center gap-1">
                      {rating} <Star size={10} className="fill-amber-gold text-amber-gold" />
                    </span>
                    <div className="flex-1 h-2 bg-gray-200/60 rounded-none overflow-hidden">
                      <div
                        className="h-full bg-royal-blue transition-all duration-1000 ease-out"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-mid-grey font-fira-code">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Stat 2: AI Literacy Lift */}
          <div className="lg:col-span-4 bg-light-grey/40 border border-gray-200 p-6 md:p-8 rounded-none relative flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-amber-gold" />
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-wider text-dark-navy font-fira-code mb-6">// COGNITIVE DEVELOPMENT</h3>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-royal-blue/10 text-royal-blue">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <span className="text-2xl font-black text-royal-blue block leading-none">+540%</span>
                  <span className="text-[10px] font-bold text-dark-navy uppercase tracking-wider font-fira-code">AI Literacy Lift</span>
                </div>
              </div>

              <p className="text-sm text-dark-grey leading-relaxed font-nunito font-light">
                A rapid acceleration in core technical competencies. Pre-programme feedback showed a baseline AI familiarity score of <strong className="text-dark-navy font-bold">0.5 / 5.0</strong>, which climbed to a post-programme proficiency average of <strong className="text-dark-navy font-bold">3.2 / 5.0</strong>.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200/50 flex justify-between items-center text-xs">
              <div>
                <span className="block text-[10px] text-mid-grey font-fira-code">BASELINE</span>
                <span className="font-bold text-dark-navy">0.5</span>
              </div>
              <div className="flex-1 mx-4 h-1 bg-gray-200 relative">
                <div className="absolute left-0 w-1/10 h-full bg-mid-grey" style={{ width: '10%' }} />
                <div className="absolute right-0 h-full bg-royal-blue animate-pulse" style={{ left: '10%', width: '54%' }} />
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-royal-blue font-fira-code">POST-PROG</span>
                <span className="font-bold text-royal-blue">3.2</span>
              </div>
            </div>
          </div>

          {/* Stat 3: Digital Inclusivity */}
          <div className="lg:col-span-4 bg-light-grey/40 border border-gray-200 p-6 md:p-8 rounded-none relative flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-amber-gold" />
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-wider text-dark-navy font-fira-code mb-6">// REGIONAL OPPORTUNITY</h3>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-amber-gold/10 text-amber-gold">
                  <Monitor size={24} />
                </div>
                <div>
                  <span className="text-2xl font-black text-amber-gold block leading-none">50-55%</span>
                  <span className="text-[10px] font-bold text-dark-navy uppercase tracking-wider font-fira-code">Primary Access</span>
                </div>
              </div>

              <p className="text-sm text-dark-grey leading-relaxed font-nunito font-light">
                Bridging the digital divide at the grass roots. For over half of the student cohort, this initiative provided their first intensive, hands-on opportunity to navigate computational interfaces and build basic digital assets.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200/50">
              <span className="text-[10px] text-mid-grey font-fira-code uppercase tracking-wider font-bold block mb-1">Empowering Local Talents</span>
              <p className="text-[11px] text-mid-grey leading-relaxed font-nunito font-light">
                Transforming first-time computer users into active builders of regional biological AI intelligence.
              </p>
            </div>
          </div>

        </div>

        {/* Interactive Review Section */}
        <div className="border-t border-gray-100 pt-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl font-black text-dark-navy uppercase tracking-tight font-nunito">
                Verified Cohort Feedback
              </h3>
              <p className="text-xs text-mid-grey font-fira-code mt-0.5">// REAL-TIME DATA INDEX</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {['All', 5, 4].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedRatingFilter(filter)}
                  className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider border rounded-none transition-all duration-150 ${
                    selectedRatingFilter === filter
                      ? 'bg-royal-blue text-white border-royal-blue shadow-sm'
                      : 'bg-white text-mid-grey border-gray-200 hover:text-dark-navy hover:border-gray-300'
                  }`}
                >
                  {filter === 'All' ? 'All Reviews' : `${filter} Stars`}
                </button>
              ))}
            </div>
          </div>
          
          <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Ambient Floating Cloud (Desktop only, hidden when hovered) */}
            <div className={`hidden md:block absolute inset-0 z-20 transition-all duration-700 bg-white border border-gray-100 overflow-hidden h-[600px] ${isHovered ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'}`}>
              {/* Floating Review Cards */}
              {ambientReviews.map((rev, i) => (
                <div 
                  key={`ambient-${i}`}
                  className="absolute animate-float-ambient w-[280px] bg-white shadow-xl border border-gray-100 p-4 rounded-none opacity-0"
                  style={{
                    left: rev.left,
                    top: rev.top,
                    animationDelay: rev.delay,
                    animationDuration: rev.duration
                  }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-dark-navy font-nunito truncate">{rev.name}</span>
                    <StarRating rating={rev.rating} />
                  </div>
                  <p className="text-xs text-mid-grey line-clamp-3 italic font-nunito leading-relaxed">"{rev.text}"</p>
                </div>
              ))}

              {/* Call to Action Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-[1px] pointer-events-none">
                <div className="bg-royal-blue text-white px-8 py-4 shadow-2xl font-bold tracking-widest text-xs uppercase font-fira-code animate-pulse rounded-none border-2 border-transparent">
                  Hover to explore {reviews.length}+ Verified Submissions
                </div>
              </div>
            </div>

            {/* Live Feed Vertically Scrolling Grid (Always visible on mobile, visible on hover for desktop) */}
            <div className={`transition-all duration-700 md:min-h-[600px] relative ${!isHovered ? 'md:opacity-0 md:pointer-events-none md:scale-95' : 'opacity-100 scale-100'}`}>
              {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 text-royal-blue animate-spin" />
              </div>
            ) : (
              <div className="relative">
                {/* Fade edges for vertical scroll */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
                
                <div className="max-h-[600px] overflow-y-auto pb-12 pr-4 custom-scrollbar">
                  {reviews.filter(r => selectedRatingFilter === 'All' || r.rating === selectedRatingFilter).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      {reviews
                        .filter(r => selectedRatingFilter === 'All' || r.rating === selectedRatingFilter)
                        .map((review, i) => (
                          <div
                            key={review.id || review._id || i}
                            className="bg-light-grey/30 border border-gray-200/70 p-6 rounded-none hover:border-royal-blue/30 hover:shadow-lg transition-all duration-300 relative group"
                          >
                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-amber-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-amber-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-bold text-dark-navy font-nunito">{review.name}</span>
                              <StarRating rating={review.rating} />
                            </div>
                            <p className="text-dark-grey text-sm leading-relaxed font-nunito font-light italic">
                              "{review.text}"
                            </p>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-mid-grey font-nunito border border-dashed border-gray-200 bg-light-grey/10 w-full mt-4">
                      No submissions matched the selected filter.
                    </div>
                  )}
                </div>
              </div>
              
            )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
