'use client'

import { useState, useRef, useEffect } from 'react'
import { Clock, MapPin, Users, CreditCard, ChevronUp } from 'lucide-react'

const tracks = [
  {
    num: 1,
    title: 'Biological Intelligence Research',
    bestFor: 'Life sciences, bioinformatics, biotechnology, and computational biology students.',
    work: 'Genomic data curation, multi-modal AI pipeline documentation, disease-specific dataset review, and literature synthesis for Northeast Indian disease contexts.',
    skills: 'Python basics helpful but not required; scientific reading and writing essential; curiosity about genomics and AI required.',
  },
  {
    num: 2,
    title: 'Ayurvedic and Ethnobotanical Research',
    bestFor: 'Pharmacy, botany, life sciences, traditional medicine, or anthropology students.',
    work: 'Documenting Northeast Indian tribal ethnobotanical knowledge absent from existing national databases; phytochemistry literature review; cross-referencing with disease pipeline targets.',
    skills: 'Scientific literature review; familiarity with traditional plant medicine or pharmacognosy helpful; indigenous knowledge ethics briefing mandatory in Week 1.',
  },
  {
    num: 3,
    title: 'Compliance and RegTech Research',
    bestFor: 'Law, policy, management, commerce, or social sciences students interested in regulatory AI.',
    work: 'Mapping Indian regulatory frameworks relevant to AI, data governance, and biotech; drafting compliance summaries; analysing DPDPA, ABDM, and MSME-facing regulatory structures.',
    skills: 'Legal and policy reading; structured writing; research synthesis. No coding required.',
  },
  {
    num: 4,
    title: 'AI and Data Foundations',
    bestFor: 'Computer science, data science, mathematics, or statistics students.',
    work: 'Data pipeline documentation, ML model evaluation frameworks, dataset quality assessment, and technical writing for AI systems in biological contexts.',
    skills: 'Python (intermediate); familiarity with ML concepts; ability to read and document technical code and research papers.',
  },
]

export default function ProgrammesPage() {
  const formRef = useRef(null)
  const [selectedTrack, setSelectedTrack] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    degree: '',
    yearOfStudy: '',
    motivation: '',
    referralSource: '',
  })
  const [termsChecked, setTermsChecked] = useState(false)
  const [accommodationChecked, setAccommodationChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [paymentError, setPaymentError] = useState('')
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const handleApplyForTrack = (trackTitle) => {
    setSelectedTrack(`Track ${tracks.find(t => t.title === trackTitle)?.num} - ${trackTitle}`)
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length

  const validateForm = () => {
    const errors = {}
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required'
    if (!formData.email.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Please enter a valid email'
    if (!formData.phone.trim()) errors.phone = 'Phone number is required'
    if (!formData.college.trim()) errors.college = 'College is required'
    if (!formData.degree.trim()) errors.degree = 'Degree is required'
    if (!formData.yearOfStudy) errors.yearOfStudy = 'Year of study is required'
    if (!selectedTrack) errors.selectedTrack = 'Please select a track'
    if (!formData.motivation.trim()) errors.motivation = 'This field is required'
    else if (wordCount(formData.motivation) < 50) errors.motivation = `Please write at least 150 words (currently ${wordCount(formData.motivation)} words)`
    if (!formData.referralSource) errors.referralSource = 'Please select an option'
    if (!termsChecked) errors.terms = 'You must accept the terms'
    if (!accommodationChecked) errors.accommodation = 'You must confirm this'
    return errors
  }

  const isFormValid = formData.fullName.trim() && formData.email.trim() && formData.phone.trim() &&
    formData.college.trim() && formData.degree.trim() && formData.yearOfStudy &&
    selectedTrack && formData.motivation.trim() && wordCount(formData.motivation) >= 50 &&
    formData.referralSource && termsChecked && accommodationChecked

  const handlePayment = () => {
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    if (!razorpayKey) {
      setPaymentError('Payment system is not configured yet. Please contact us at contact@khyontekai.com to register.')
      return
    }

    if (!window.Razorpay) {
      setPaymentError('Payment system is loading. Please try again in a moment.')
      return
    }

    setPaymentError('')
    setIsSubmitting(true)

    const options = {
      key: razorpayKey,
      amount: 499900,
      currency: 'INR',
      name: 'Khyontek AI Pvt Ltd',
      description: 'Summer Research Immersion Programme - Registration Fee',
      handler: async function (response) {
        try {
          const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fullName: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              college: formData.college,
              degree: formData.degree,
              yearOfStudy: formData.yearOfStudy,
              track: selectedTrack,
              motivation: formData.motivation,
              referralSource: formData.referralSource,
              razorpayPaymentId: response.razorpay_payment_id,
            }),
          })
          if (res.ok) {
            setRegistrationSuccess(true)
          } else {
            setPaymentError('Registration could not be completed. Please contact us at contact@khyontekai.com')
          }
        } catch (error) {
          setPaymentError('Something went wrong. Please contact us at contact@khyontekai.com')
        }
        setIsSubmitting(false)
      },
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: '#2B3EAA',
      },
      modal: {
        ondismiss: function () {
          setIsSubmitting(false)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', function () {
      setPaymentError('Payment was not completed. Please try again or contact us at contact@khyontekai.com')
      setIsSubmitting(false)
    })
    rzp.open()
  }

  if (registrationSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="max-w-lg mx-auto text-center px-4">
          <div className="corner-brackets-lg p-10">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-dark-navy mb-4">Registration Confirmed!</h2>
            <p className="text-dark-grey leading-relaxed">
              Your registration is confirmed. You will receive an email at <strong>{formData.email}</strong> within 48 hours with next steps. Welcome to Khyontek AI.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-dark-navy mb-4">Summer Research Immersion Programme</h1>
          <p className="text-lg text-mid-grey">A 45-day hands-on research experience at Khyontek AI, Guwahati</p>
        </div>
      </section>

      {/* Overview Strip */}
      <section className="bg-pale-blue py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Clock, label: 'Duration', value: '45 days' },
              { icon: MapPin, label: 'Format', value: 'Hybrid (Guwahati / Remote)' },
              { icon: Users, label: 'Cohort Size', value: '20 to 40 students' },
              { icon: CreditCard, label: 'Programme Fee', value: 'Rs. 4,999' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <item.icon className="w-6 h-6 text-royal-blue mx-auto mb-2" />
                <p className="text-xs text-mid-grey uppercase tracking-wide">{item.label}</p>
                <p className="text-base font-bold text-dark-navy">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Programme */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-navy mb-6">About the Programme</h2>
          <p className="text-dark-grey leading-relaxed mb-8">
            This is a structured, research-immersive programme for undergraduate and postgraduate students who want hands-on exposure to applied AI and research in a real company environment. You will work in a track-based cohort, contribute to research that Khyontek AI actually uses, and leave with a portfolio-grade group output and a co-founder-signed completion certificate.
          </p>
          {/* Important Note */}
          <div className="border-l-4 border-amber-gold bg-amber-50 p-6 rounded-r-lg">
            <p className="text-dark-grey text-sm leading-relaxed">
              <strong className="text-dark-navy">Important:</strong> This is a paid programme. You pay Khyontek AI a programme fee of Rs. 4,999. Khyontek AI does not pay you a stipend. If fewer than 20 students confirm registration before the programme start date, a 100% refund is issued within 7 working days.
            </p>
          </div>
        </div>
      </section>

      {/* The Four Tracks */}
      <section className="bg-light-grey py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-navy text-center mb-12">The Four Tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tracks.map((track) => (
              <div key={track.num} className="corner-brackets bg-white p-8 rounded-lg shadow-sm">
                <div className="inline-block px-3 py-1 bg-royal-blue text-white text-xs font-bold rounded mb-4">
                  Track {track.num}
                </div>
                <h3 className="text-xl font-bold text-dark-navy mb-3">{track.title}</h3>
                <p className="text-sm text-mid-grey mb-2"><strong className="text-dark-grey">Best for:</strong> {track.bestFor}</p>
                <p className="text-sm text-mid-grey mb-2"><strong className="text-dark-grey">What you will work on:</strong> {track.work}</p>
                <p className="text-sm text-mid-grey mb-4"><strong className="text-dark-grey">Skills you will use:</strong> {track.skills}</p>
                <button
                  onClick={() => handleApplyForTrack(track.title)}
                  className="px-6 py-2 bg-amber-gold text-dark-navy text-sm font-bold rounded-lg hover:bg-amber-500 transition-colors"
                >
                  Apply for this track
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme Structure Table */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-navy mb-8">Programme Structure</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-royal-blue text-white">
                  <th className="text-left py-3 px-4 font-semibold">Component</th>
                  <th className="text-left py-3 px-4 font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Daily schedule', 'Morning: 1.5 hrs guided session. Afternoon: 2 to 3 hrs group research and documentation.'],
                  ['Days', 'Six days per week; Sundays off.'],
                  ['Group size per track', '5 to 10 students'],
                  ['Sessions led by', 'Khyontek AI co-founders, research leads, and domain experts'],
                  ['What you produce', 'A group deliverable for your track, research resources Khyontek AI uses in its product and grant work'],
                  ['What you receive', 'Co-founder-signed completion certificate and a portfolio-grade group output'],
                ].map(([label, value], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-light-grey' : 'bg-white'}>
                    <td className="py-3 px-4 font-semibold text-dark-navy">{label}</td>
                    <td className="py-3 px-4 text-dark-grey">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Refund Policy Summary */}
      <section className="bg-light-grey py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-navy text-center mb-8">Refund Policy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="font-bold text-dark-navy mb-2">Full Refund</h3>
              <p className="text-sm text-dark-grey">Programme cancelled or minimum cohort not reached</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" /></svg>
              </div>
              <h3 className="font-bold text-dark-navy mb-2">Partial Refund</h3>
              <p className="text-sm text-dark-grey">Withdrawal within 7 days of registration, at least 21 days before start (minus Rs. 500 admin fee)</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
              <h3 className="font-bold text-dark-navy mb-2">No Refund</h3>
              <p className="text-sm text-dark-grey">Withdrawal less than 21 days before the programme start date</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section ref={formRef} id="register" className="bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-navy mb-8">Register for the Summer Research Immersion Programme</h2>

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-dark-navy mb-1">Full Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition"
                placeholder="Your full name"
              />
              {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-dark-navy mb-1">Email Address <span className="text-red-500">*</span></label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition"
                placeholder="your@email.com"
              />
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-dark-navy mb-1">Phone Number <span className="text-red-500">*</span></label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition"
                placeholder="+91 XXXXX XXXXX"
              />
              {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
            </div>

            {/* College */}
            <div>
              <label className="block text-sm font-semibold text-dark-navy mb-1">College or University <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => updateField('college', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition"
                placeholder="Your college or university"
              />
              {formErrors.college && <p className="text-red-500 text-xs mt-1">{formErrors.college}</p>}
            </div>

            {/* Degree */}
            <div>
              <label className="block text-sm font-semibold text-dark-navy mb-1">Degree Programme <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => updateField('degree', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition"
                placeholder="e.g. B.Tech CSE or M.Sc Biotechnology"
              />
              {formErrors.degree && <p className="text-red-500 text-xs mt-1">{formErrors.degree}</p>}
            </div>

            {/* Year of Study */}
            <div>
              <label className="block text-sm font-semibold text-dark-navy mb-1">Year of Study <span className="text-red-500">*</span></label>
              <select
                value={formData.yearOfStudy}
                onChange={(e) => updateField('yearOfStudy', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition bg-white"
              >
                <option value="">Select year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Other">Other</option>
              </select>
              {formErrors.yearOfStudy && <p className="text-red-500 text-xs mt-1">{formErrors.yearOfStudy}</p>}
            </div>

            {/* Track Selection */}
            <div>
              <label className="block text-sm font-semibold text-dark-navy mb-3">Choose Your Track <span className="text-red-500">*</span></label>
              <div className="space-y-3">
                {tracks.map((track) => {
                  const value = `Track ${track.num} - ${track.title}`
                  return (
                    <label key={track.num} className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="track"
                        value={value}
                        checked={selectedTrack === value}
                        onChange={(e) => setSelectedTrack(e.target.value)}
                        className="mt-1 w-4 h-4 text-royal-blue border-gray-300 focus:ring-royal-blue"
                      />
                      <span className="text-sm text-dark-grey group-hover:text-dark-navy transition-colors">{value}</span>
                    </label>
                  )
                })}
              </div>
              {formErrors.selectedTrack && <p className="text-red-500 text-xs mt-1">{formErrors.selectedTrack}</p>}
            </div>

            {/* Motivation */}
            <div>
              <label className="block text-sm font-semibold text-dark-navy mb-1">
                Why do you want to join this track? <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-mid-grey mb-2">150 to 300 words</p>
              <textarea
                value={formData.motivation}
                onChange={(e) => updateField('motivation', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition resize-y"
                placeholder="Tell us why you are interested in this track and what you hope to learn..."
              />
              <p className="text-xs text-mid-grey mt-1">{wordCount(formData.motivation)} words</p>
              {formErrors.motivation && <p className="text-red-500 text-xs mt-1">{formErrors.motivation}</p>}
            </div>

            {/* Referral Source */}
            <div>
              <label className="block text-sm font-semibold text-dark-navy mb-1">How did you hear about this programme? <span className="text-red-500">*</span></label>
              <select
                value={formData.referralSource}
                onChange={(e) => updateField('referralSource', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition bg-white"
              >
                <option value="">Select an option</option>
                <option value="Instagram">Instagram</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="College notice board">College notice board</option>
                <option value="Friend or colleague">Friend or colleague</option>
                <option value="Other">Other</option>
              </select>
              {formErrors.referralSource && <p className="text-red-500 text-xs mt-1">{formErrors.referralSource}</p>}
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsChecked}
                  onChange={(e) => setTermsChecked(e.target.checked)}
                  className="mt-1 w-4 h-4 text-royal-blue border-gray-300 rounded focus:ring-royal-blue"
                />
                <span className="text-sm text-dark-grey">
                  I confirm I have read and understood the programme terms, fee structure, and refund policy. <span className="text-red-500">*</span>
                </span>
              </label>
              {formErrors.terms && <p className="text-red-500 text-xs ml-7">{formErrors.terms}</p>}

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accommodationChecked}
                  onChange={(e) => setAccommodationChecked(e.target.checked)}
                  className="mt-1 w-4 h-4 text-royal-blue border-gray-300 rounded focus:ring-royal-blue"
                />
                <span className="text-sm text-dark-grey">
                  I confirm that if selected I will arrange my own accommodation and travel to Guwahati if attending in-person. <span className="text-red-500">*</span>
                </span>
              </label>
              {formErrors.accommodation && <p className="text-red-500 text-xs ml-7">{formErrors.accommodation}</p>}
            </div>

            {/* Payment Summary */}
            <div className="bg-light-grey border-2 border-royal-blue rounded-lg p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="font-bold text-dark-navy">Programme Fee: Rs. 4,999</p>
                  <p className="text-sm text-mid-grey">Track selected: {selectedTrack || 'None selected'}</p>
                  <p className="text-xs text-mid-grey">One-time payment at registration</p>
                </div>
              </div>
            </div>

            {/* Payment Error */}
            {paymentError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {paymentError}
              </div>
            )}

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-4 text-lg font-bold rounded-lg transition-colors ${
                isFormValid && !isSubmitting
                  ? 'bg-amber-gold text-dark-navy hover:bg-amber-500 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                'Pay Rs. 4,999 and Confirm Registration'
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}