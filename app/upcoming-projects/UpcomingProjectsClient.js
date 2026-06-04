'use client'

import { useState, useEffect } from 'react'
import { Rocket, Clock, CheckCircle2, CircleDot, ChevronDown, ChevronUp } from 'lucide-react'

const statusConfig = {
  'In Progress': { color: 'bg-royal-blue text-white', icon: CircleDot },
  'Planning': { color: 'bg-amber-gold text-dark-navy', icon: Clock },
  'Concept': { color: 'bg-pale-blue text-royal-blue border border-royal-blue/20', icon: Rocket },
  'Completed': { color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
}



function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false)
  const { color, icon: StatusIcon } = statusConfig[project.status] || statusConfig['Concept']

  return (
    <div className="bg-white rounded-none border border-gray-200 shadow-none hover:shadow-lg hover:border-royal-blue/40 transition-all duration-300 ease-in-out overflow-hidden relative group">
      {/* Accent corner bracket indicator */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-amber-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-amber-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <span className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-none ${color}`}>
            <StatusIcon size={12} className="animate-pulse" />
            {project.status}
          </span>
          <span className="text-[11px] font-bold text-mid-grey bg-light-grey px-3 py-1 rounded-none flex items-center gap-1.5 border border-gray-200">
            <Clock size={12} />
            Expected: {project.timeline}
          </span>
        </div>

        <h3 className="text-xl font-bold text-dark-navy mb-3 leading-snug font-nunito tracking-tight">{project.title}</h3>
        <p className="text-dark-grey text-sm leading-relaxed font-nunito">{project.description}</p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-5 flex items-center gap-1 text-royal-blue text-sm font-bold tracking-tight hover:text-amber-gold transition-colors focus:outline-none"
        >
          <span>{expanded ? 'Collapse scientific detail' : 'Expand scientific detail'}</span>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {/* Smooth height transition wrapper */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expanded ? 'max-h-[500px] mt-4 pt-4 border-t border-gray-100 opacity-100' : 'max-h-0 opacity-0'}`}>
          <p className="text-dark-grey text-sm leading-relaxed font-nunito bg-pale-blue/30 p-4 border border-pale-blue font-light">
            {project.details}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function UpcomingProjectsClient() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        const projectsRes = await fetch('/api/projects', { cache: 'no-store' })

        if (!projectsRes.ok) {
          throw new Error('Unable to connect to dynamic content system.')
        }

        const projectsData = await projectsRes.json()
        setProjects(projectsData)
      } catch (err) {
        console.error(err)
        setError(err.message || 'Error loading live information from database.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="scroll-smooth">
      {/* Hero */}
      <section className="bg-white py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber-gold text-xs font-extrabold tracking-widest uppercase mb-3 font-fira-code">// RESEARCH INITIATIVES</p>
          <h1 className="text-3xl md:text-5xl font-black text-dark-navy mb-4 font-nunito tracking-tight">Upcoming Projects</h1>
          <p className="text-lg text-mid-grey leading-relaxed max-w-2xl font-nunito font-light">
            A real-time lookup of the research initiatives and bio-intelligence tools we are building and planning to deploy. Every project is focused on the health equity of underrepresented populations in South and Southeast Asia.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-pale-blue py-16 md:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-none flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-3 mb-10">
            {Object.entries(statusConfig).map(([label, { color, icon: Icon }]) => (
              <span key={label} className={`inline-flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-extrabold px-3 py-1 rounded-none border border-black/5 ${color}`}>
                <Icon size={10} /> {label}
              </span>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white border border-gray-200 p-6 md:p-8 animate-pulse rounded-none">
                  <div className="flex justify-between mb-4">
                    <div className="h-5 bg-gray-200 w-24 rounded-none" />
                    <div className="h-5 bg-gray-200 w-28 rounded-none" />
                  </div>
                  <div className="h-6 bg-gray-200 w-3/4 mb-3 rounded-none" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 w-full rounded-none" />
                    <div className="h-4 bg-gray-200 w-5/6 rounded-none" />
                  </div>
                  <div className="h-4 bg-gray-200 w-24 mt-6 rounded-none" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <ProjectCard key={project.id || project._id} project={project} />
                ))
              ) : (
                <div className="col-span-2 text-center py-12 text-mid-grey">
                  No upcoming projects available.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
