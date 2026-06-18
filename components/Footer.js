import Link from 'next/link'
import { Linkedin, Instagram, Github, Mail } from 'lucide-react'

const HuggingFaceIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-.5 4.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm5 0a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM8.5 9.5c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1s-1-.45-1-1v-1c0-.55.45-1 1-1zm7 0c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1s-1-.45-1-1v-1c0-.55.45-1 1-1zM12 14c-2.33 0-4.32 1.45-5.12 3.5h1.67c.69-1.19 1.97-2 3.45-2s2.76.81 3.45 2h1.67C16.32 15.45 14.33 14 12 14z"/>
  </svg>
)

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Research', href: '/research' },
  { name: 'Programmes', href: '/programmes' },
  { name: 'Contact', href: '/contact' },
]

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Refund Policy', href: '/refund-policy' },
  { name: 'Terms and Conditions', href: '/terms-and-conditions' },
  { name: 'Cookie Policy', href: '/cookie-policy' },
  { name: 'Disclaimer', href: '/disclaimer' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left column */}
          <div>
            <div className="relative inline-flex items-center mb-3">
              <div className="absolute -top-1 -left-2 w-3 h-3 border-t-2 border-l-2 border-amber-gold" />
              <span className="text-2xl font-extrabold text-white px-3 py-1">Khyontek.ai</span>
              <div className="absolute -bottom-1 -right-2 w-3 h-3 border-b-2 border-r-2 border-amber-gold" />
            </div>
            <p className="text-gray-300 text-sm mt-4">The Shape of Intelligence</p>
            <p className="text-mid-grey text-xs mt-4">&copy; 2025 Khyontek AI Pvt Ltd. All rights reserved.</p>
          </div>

          {/* Centre column - Quick links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-gold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column - Social */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-gold mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a href="https://www.linkedin.com/company/khyontek-ai-private-limited/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-gold transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/khyontek.ai/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://github.com/khyontekai-ai" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-gold transition-colors">
                <Github size={20} />
              </a>
              <a href="https://huggingface.co/KhyontekAI" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-gold transition-colors">
                <HuggingFaceIcon size={20} />
              </a>
            </div>
            <a href="mailto:contact@khyontekai.com" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
              <Mail size={16} />
              contact@khyontekai.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-mid-grey text-center mb-3">
            Guwahati, Assam, India. Built with purpose for Asia's most underrepresented populations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {legalLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-xs text-mid-grey hover:text-gray-300 transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
