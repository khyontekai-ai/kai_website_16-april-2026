'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Reviews', href: '/#reviews' },
  { name: 'About', href: '/about' },
  { name: 'Research', href: '/research' },
  { name: 'Upcoming Projects', href: '/upcoming-projects' },
  { name: 'Programmes', href: '/programmes' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative inline-flex items-center">
              <div className="absolute -top-1 -left-2 w-3 h-3 border-t-2 border-l-2 border-amber-gold" />
              <span className="text-xl md:text-2xl font-extrabold text-royal-blue px-3 py-1">Khyontek.ai</span>
              <div className="absolute -bottom-1 -right-2 w-3 h-3 border-b-2 border-r-2 border-amber-gold" />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-dark-grey hover:text-royal-blue transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/programmes"
              className="ml-2 px-5 py-2 bg-amber-gold text-dark-navy text-sm font-bold rounded-full hover:bg-amber-500 transition-colors"
            >
              Join Programme
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-dark-grey"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <span className="text-xl font-extrabold text-royal-blue">Khyontek.ai</span>
            </Link>
            <button onClick={() => setMobileOpen(false)} className="p-2 text-dark-grey">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center gap-6 pt-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-semibold text-dark-grey hover:text-royal-blue transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/programmes"
              className="mt-4 px-8 py-3 bg-amber-gold text-dark-navy text-base font-bold rounded-full hover:bg-amber-500 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Join Programme
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}