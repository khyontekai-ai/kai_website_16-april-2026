'use client'

import { useState } from 'react'
import { MapPin, Mail, Globe, Linkedin, Instagram } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitSuccess(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        const data = await res.json()
        setSubmitError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setSubmitError('Could not submit form. Please try again later.')
    }
    setIsSubmitting(false)
  }

  return (
    <div>
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-dark-navy mb-12">Get in Touch</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left - Contact Details */}
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-royal-blue mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-mid-grey">Enquiries</p>
                    <a href="mailto:contact@khyontekai.com" className="text-dark-navy font-semibold hover:text-royal-blue transition-colors">contact@khyontekai.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-royal-blue mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-mid-grey">Location</p>
                    <p className="text-dark-navy font-semibold">Guwahati, Assam, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe className="w-5 h-5 text-royal-blue mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-mid-grey">Website</p>
                    <p className="text-dark-navy font-semibold">khyontekai.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Linkedin className="w-5 h-5 text-royal-blue mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-mid-grey">LinkedIn</p>
                    <a href="https://www.linkedin.com/company/khyontek-ai-private-limited/" target="_blank" rel="noopener noreferrer" className="text-dark-navy font-semibold hover:text-royal-blue transition-colors">Khyontek AI</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Instagram className="w-5 h-5 text-royal-blue mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-mid-grey">Instagram</p>
                    <a href="https://instagram.com/khyontekai" target="_blank" rel="noopener noreferrer" className="text-dark-navy font-semibold hover:text-royal-blue transition-colors">@khyontek.ai</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div>
              {submitSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700 text-sm">Thank you for reaching out. We will respond within 2 working days.</p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-4 text-sm text-royal-blue font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-dark-navy mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark-navy mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark-navy mb-1">Subject</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="Research Partnership">Research Partnership</option>
                      <option value="Programme Enquiry">Programme Enquiry</option>
                      <option value="Press">Press</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark-navy mb-1">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition resize-y"
                    />
                  </div>
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {submitError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-royal-blue text-white font-bold rounded-lg hover:bg-dark-navy transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}