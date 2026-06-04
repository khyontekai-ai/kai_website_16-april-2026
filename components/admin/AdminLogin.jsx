import { useState } from 'react'
import { Key, ChevronRight, RefreshCw, AlertCircle } from 'lucide-react'

export default function AdminLogin({ onLogin, error, isLoading }) {
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(password)
  }

  return (
    <div className="min-h-screen bg-dark-navy flex items-center justify-center p-4 relative overflow-hidden font-nunito">
      {/* Abstract background graphics */}
      <div className="absolute top-10 left-10 w-40 h-40 border border-royal-blue/30 rotate-12 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 border border-amber-gold/15 -rotate-45 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-pale-blue/5 rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-gray-200/90 rounded-xl shadow-2xl relative z-10 overflow-hidden">
        {/* Accent Top Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-royal-blue via-royal-blue to-amber-gold" />

        <div className="p-8">
          <div className="text-center mb-8">
            <span className="text-xs font-black tracking-widest text-amber-gold uppercase font-fira-code">// KHYONTEK.AI</span>
            <h2 className="text-2xl font-black text-dark-navy mt-2 tracking-tight uppercase">Admin Console</h2>
            <p className="text-sm text-mid-grey mt-2 font-light">Secure gateway to update research and review indexes.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-lg flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-extrabold text-dark-navy mb-2 font-fira-code">
                Console Access Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                  <Key size={16} />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter security password"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent bg-light-grey/40 font-fira-code transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-royal-blue text-white font-extrabold uppercase tracking-widest text-xs rounded-lg hover:bg-dark-navy transition-all duration-300 border-2 border-transparent hover:border-dark-navy shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Enter Console</span>
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
