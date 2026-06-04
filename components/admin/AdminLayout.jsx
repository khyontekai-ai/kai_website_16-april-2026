import { CheckCircle2, AlertCircle, LogOut, LayoutDashboard, MessageSquare, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminLayout({ children, activeTab, setActiveTab, onLogout, alert }) {
  return (
    <div className="min-h-screen bg-light-grey flex flex-col md:flex-row font-nunito scroll-smooth">
      {/* Alert Notification */}
      {alert && (
        <div className={`fixed top-4 right-4 z-50 p-4 border rounded-xl shadow-lg max-w-sm flex items-center gap-2 animate-in slide-in-from-top-2 text-xs font-bold ${
          alert.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {alert.type === 'success' ? <CheckCircle2 size={16} className="text-green-600" /> : <AlertCircle size={16} className="text-red-600" />}
          <span>{alert.message}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 md:min-h-screen flex flex-col z-40 sticky top-0 md:h-screen">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between md:justify-center">
          <div className="relative inline-flex items-center">
            <div className="absolute -top-1 -left-2 w-2 h-2 border-t-2 border-l-2 border-amber-gold" />
            <span className="text-lg font-black text-royal-blue px-2 py-0.5">Khyontek.ai</span>
            <div className="absolute -bottom-1 -right-2 w-2 h-2 border-b-2 border-r-2 border-amber-gold" />
          </div>
          <span className="ml-2 text-[9px] font-mono bg-dark-navy text-white px-2 py-1 uppercase tracking-wider font-fira-code rounded-sm">
            // CMS
          </span>
        </div>

        <nav className="flex-1 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          <Button 
            variant={activeTab === 'projects' ? 'secondary' : 'ghost'} 
            className={`justify-start text-xs uppercase tracking-wider font-extrabold ${activeTab === 'projects' ? 'bg-pale-blue text-royal-blue' : 'text-mid-grey'}`}
            onClick={() => setActiveTab('projects')}
          >
            <LayoutDashboard size={16} className="mr-3" /> Projects
          </Button>
          <Button 
            variant={activeTab === 'reviews' ? 'secondary' : 'ghost'} 
            className={`justify-start text-xs uppercase tracking-wider font-extrabold ${activeTab === 'reviews' ? 'bg-pale-blue text-royal-blue' : 'text-mid-grey'}`}
            onClick={() => setActiveTab('reviews')}
          >
            <MessageSquare size={16} className="mr-3" /> Reviews
          </Button>
          <Button 
            variant={activeTab === 'casestudies' ? 'secondary' : 'ghost'} 
            className={`justify-start text-xs uppercase tracking-wider font-extrabold ${activeTab === 'casestudies' ? 'bg-pale-blue text-royal-blue' : 'text-mid-grey'}`}
            onClick={() => setActiveTab('casestudies')}
          >
            <FileText size={16} className="mr-3" /> Case Studies
          </Button>
        </nav>

        <div className="p-4 border-t border-gray-100 mt-auto hidden md:block">
          <Button variant="ghost" onClick={onLogout} className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 text-xs font-bold uppercase tracking-wider">
            <LogOut size={16} className="mr-3" /> Log Out Session
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white border-b border-gray-200 h-16 md:h-20 flex items-center px-4 md:px-8 justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-dark-navy uppercase tracking-tight font-nunito">
              {activeTab === 'projects' ? 'Upcoming Initiatives Index' : 'Workshop Reviews Catalogue'}
            </h1>
            <p className="text-[10px] text-mid-grey font-fira-code mt-0.5">// Database records live connection</p>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={onLogout} className="text-red-600 hover:bg-red-50 hover:text-red-700">
              <LogOut size={18} />
            </Button>
          </div>
        </header>

        <div className="p-4 md:p-8 flex-1 max-w-7xl w-full mx-auto">
          {children}
        </div>

        <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-[10px] text-mid-grey uppercase tracking-wider font-fira-code">
              Khyontek AI Console // System Connection: ACTIVE // Secure API SSL Verified
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
