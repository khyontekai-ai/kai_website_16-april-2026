import { Star } from 'lucide-react'

export default function DashboardStats({ projects, reviews, activeTab }) {
  const projTotal = projects.length
  const projInProgress = projects.filter(p => p.status === 'In Progress').length
  const projPlanning = projects.filter(p => p.status === 'Planning').length
  const projConcept = projects.filter(p => p.status === 'Concept').length

  const revTotal = reviews.length
  const revAverageRating = revTotal > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / revTotal).toFixed(1) 
    : '0.0'

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {activeTab === 'projects' ? (
        <>
          <StatCard 
            label="Total Initiatives" 
            value={projTotal} 
            colorClass="text-dark-navy" 
          />
          <StatCard 
            label="In Progress" 
            value={projInProgress} 
            colorClass="text-royal-blue" 
          />
          <StatCard 
            label="Planning" 
            value={projPlanning} 
            colorClass="text-amber-gold" 
          />
          <StatCard 
            label="Concepts" 
            value={projConcept} 
            colorClass="text-mid-grey" 
          />
        </>
      ) : (
        <>
          <StatCard 
            label="Total Submissions" 
            value={revTotal} 
            colorClass="text-dark-navy" 
          />
          <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-[10px] uppercase font-bold text-amber-gold tracking-wider font-fira-code">
              Average Rating
            </div>
            <div className="text-2xl font-black text-amber-gold mt-1 flex items-center gap-1.5">
              {revAverageRating} <Star size={20} className="fill-amber-gold" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow col-span-2 hidden md:block">
            <div className="text-[10px] uppercase font-bold text-mid-grey tracking-wider font-fira-code">
              Feedback Target
            </div>
            <div className="text-sm font-semibold text-dark-navy mt-2 font-nunito">
              Tangla College AI & Agentic AI Workshop Series
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function StatCard({ label, value, colorClass }) {
  return (
    <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className={`text-[10px] uppercase font-bold tracking-wider font-fira-code ${colorClass}`}>
        {label}
      </div>
      <div className={`text-2xl font-black mt-1 ${colorClass}`}>
        {value}
      </div>
    </div>
  )
}
