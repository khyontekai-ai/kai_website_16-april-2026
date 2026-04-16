'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Clock, MapPin, Users, CreditCard, Award, Briefcase, GraduationCap, Star, CheckCircle, XCircle, Lock } from 'lucide-react'

const tracks = [
  {
    num: 1,
    title: 'Biological Intelligence Research',
    thrive: 'Students with a curiosity for biology, genomics, or healthcare AI, regardless of their stream. If you enjoy reading, organising information, and thinking carefully about science, this track is for you.',
    work: 'Genomic data curation, multi-modal AI pipeline documentation, disease-specific dataset review, and literature synthesis for Northeast Indian disease contexts.',
    note: 'No prior coding experience required. Scientific curiosity is the only prerequisite.',
  },
  {
    num: 2,
    title: 'Ayurvedic and Ethnobotanical Research',
    thrive: 'Students interested in traditional medicine, plant science, pharmacology, or the cultural knowledge systems of Northeast India. Open to all streams, what matters most is genuine interest in this space.',
    work: 'Documenting Northeast Indian tribal ethnobotanical knowledge absent from existing national databases, reviewing phytochemistry literature, and cross-referencing findings with disease research targets.',
    note: 'An indigenous knowledge ethics briefing is mandatory in Week 1 for all participants in this track.',
  },
  {
    num: 3,
    title: 'Compliance and RegTech Research',
    thrive: 'Students who enjoy reading policy, understanding rules and frameworks, and writing clearly. Commerce, law, management, and social sciences students will find this familiar, but any student comfortable with structured reading and writing is welcome.',
    work: 'Mapping Indian regulatory frameworks relevant to AI, data governance, and biotech; drafting compliance summaries; and analysing structures like DPDPA, ABDM, and MSME-facing regulations.',
    note: 'No coding required.',
  },
  {
    num: 4,
    title: 'AI and Data Foundations',
    thrive: 'Students with some programming experience who want to understand how AI systems are built, tested, and documented in a real research environment. CS and data science students will feel at home, but any student comfortable with Python and basic ML concepts is welcome to apply.',
    work: 'Data pipeline documentation, ML model evaluation frameworks, dataset quality assessment, and technical writing for AI systems in biological contexts.',
    note: 'Intermediate Python and basic familiarity with ML concepts will help you get the most out of this track.',
  },
]

const validTrackValues = tracks.map(t => `Track ${t.num} - ${t.title}`)

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
  const [apiErrorPaymentId, setApiErrorPaymentId] = useState('')
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
    const value = `Track ${tracks.find(t => t.title === trackTitle)?.num} - ${trackTitle}`
    setSelectedTrack(value)
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length

  const isFormValid = formData.fullName.trim() && formData.email.trim() && formData.phone.trim() &&
    formData.college.trim() && formData.degree.trim() && formData.yearOfStudy &&
    selectedTrack && formData.motivation.trim() && wordCount(formData.motivation) >= 30 &&
    formData.referralSource && termsChecked && accommodationChecked

  const handlePayment = () => {
    setPaymentError('')
    setApiErrorPaymentId('')

    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    if (!razorpayKey) {
      setPaymentError('Payment system is not configured yet. Please contact us at contact@khyontekai.com to register.')
      return
    }

    if (!window.Razorpay) {
      setPaymentError('Payment system is loading. Please try again in a moment.')
      return
    }

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
            setApiErrorPaymentId(response.razorpay_payment_id)
          }
        } catch (error) {
          setApiErrorPaymentId(response.razorpay_payment_id)
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
      setPaymentError('Payment was not completed. Your form details are saved. Please try again or write to us at contact@khyontekai.com if the issue continues.')
      setIsSubmitting(false)
    })
    rzp.open()
  }

  // Success state
  if (registrationSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-pale-blue rounded-xl p-10 corner-brackets-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-dark-navy mb-4">You are registered.</h2>
            <p className="text-dark-grey leading-relaxed">
              Your spot in <strong>{selectedTrack}</strong> is confirmed. A confirmation email is on its way to <strong>{formData.email}</strong>. We will be in touch within 48 hours with everything you need before the programme starts. Welcome to Khyontek AI.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // API error after successful payment
  if (apiErrorPaymentId) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-pale-blue rounded-xl p-10">
            <h2 className="text-2xl font-bold text-dark-navy mb-4">Payment received.</h2>
            <p className="text-dark-grey leading-relaxed">
              Your payment went through successfully (Payment ID: <strong className="font-fira-code text-sm">{apiErrorPaymentId}</strong>). We are confirming your registration. If you do not receive a confirmation email within 24 hours, please email <a href={`mailto:contact@khyontekai.com?subject=Registration%20Issue%20-%20${apiErrorPaymentId}`} className="text-royal-blue font-semibold hover:underline">contact@khyontekai.com</a> with this payment ID and we will sort it out immediately.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Page Header */}
      <head>
        <title>Programmes - Khyontek.ai</title>
        <meta name="description" content="Join the Summer Research Immersion Programme at Khyontek AI, Guwahati. 45-day hands-on research experience across four tracks in biological intelligence, ethnobotanical research, compliance, and AI foundations." />
      </head>
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-dark-navy mb-4">Programmes at Khyontek AI</h1>
          <p className="text-lg text-mid-grey leading-relaxed">
            Hands-on research experience for students who want to work on real problems, with a real team, in Northeast India.
          </p>
        </div>
      </section>

      {/* SECTION 1 - Summer Research Immersion Programme */}
      <section className="bg-white pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-navy mb-2">Summer Research Immersion Programme</h2>
          <p className="text-mid-grey text-base mb-8">45 days. Four tracks. One cohort. Guwahati.</p>
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
      <section className="bg-white py-14 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark-navy mb-6">About the Programme</h2>
          <p className="text-dark-grey leading-relaxed">
            This is a structured, research-immersive programme for undergraduate and postgraduate students who want hands-on exposure to applied AI and research in a real company environment. You will work in a track-based cohort, contribute to research that Khyontek AI actually uses, and leave with a portfolio-grade group output and a co-founder-signed completion certificate.
          </p>
        </div>
      </section>

      {/* SECTION 2 - The Four Tracks */}
      <section className="bg-light-grey py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-navy text-center mb-4">Choose Your Track</h2>
          <p className="text-dark-grey text-center max-w-3xl mx-auto mb-12">
            Each track is designed around a different area of work. Pick the one that genuinely interests you and tell us why when you register. There are no strict eligibility requirements. What matters is your curiosity, your commitment, and what you write in your motivation statement.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tracks.map((track) => (
              <div key={track.num} className="corner-brackets bg-white p-8 rounded-lg shadow-sm">
                <div className="inline-block px-3 py-1 bg-royal-blue text-white text-xs font-bold rounded mb-4">
                  Track {track.num}
                </div>
                <h3 className="text-xl font-bold text-dark-navy mb-3">{track.title}</h3>
                <p className="text-sm text-mid-grey italic mb-4">{track.thrive}</p>
                <p className="text-sm text-dark-grey mb-3"><strong>What you will work on:</strong> {track.work}</p>
                <p className="text-xs text-mid-grey mb-5">{track.note}</p>
                <button
                  onClick={() => handleApplyForTrack(track.title)}
                  className="px-6 py-2.5 bg-royal-blue text-white text-sm font-bold rounded-lg hover:bg-dark-navy transition-colors"
                >
                  Apply for this Track
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - What to Expect */}
      <section className="bg-light-grey py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-navy text-center mb-12">What the Programme Looks Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left - Daily Structure */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-dark-navy mb-6">Daily Structure</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-royal-blue mt-1.5" />
                    <div className="w-0.5 h-full bg-gray-200 mt-1" />
                  </div>
                  <div className="pb-4">
                    <p className="font-semibold text-dark-navy text-sm">Guided Sessions</p>
                    <p className="text-dark-grey text-sm">Sessions led by Khyontek AI co-founders, research leads, or domain experts</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-gold mt-1.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark-navy text-sm">Group Research Work</p>
                    <p className="text-dark-grey text-sm">Group research work and documentation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - What You Get */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-dark-navy mb-6">What You Get</h3>
              <div className="space-y-5">
                {[
                  { icon: Award, text: 'A co-founder-signed completion certificate' },
                  { icon: Briefcase, text: 'A portfolio-grade group research output you can reference in your CV and academic applications' },
                  { icon: GraduationCap, text: 'Direct exposure to applied AI research in Northeast India' },
                  { icon: Star, text: 'Priority consideration for future Khyontek AI internship and research associate opportunities for top performers in each track' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <item.icon className="w-5 h-5 text-royal-blue shrink-0 mt-0.5" />
                    <p className="text-sm text-dark-grey">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-mid-grey text-center mt-8">
            Group size per track is 5 to 10 students.
          </p>
        </div>
      </section>

      {/* SECTION 4 - Fee and Refund Policy */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-navy text-center mb-10">Fee and Refund Policy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 border-t-[3px] border-t-royal-blue">
              <CheckCircle className="w-8 h-8 text-royal-blue mb-4" />
              <h3 className="font-bold text-dark-navy mb-2">Full Refund</h3>
              <p className="text-sm text-dark-grey leading-relaxed">
                You get a full refund if the programme is cancelled by Khyontek AI or if the minimum cohort of 20 students is not reached by the registration deadline. Processed within 7 working days to your original payment method.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 border-t-[3px] border-t-amber-gold">
              <Clock className="w-8 h-8 text-amber-gold mb-4" />
              <h3 className="font-bold text-dark-navy mb-2">Partial Refund</h3>
              <p className="text-sm text-dark-grey leading-relaxed">
                If you withdraw within 7 days of your confirmed registration and at least 21 days before the programme start date, you receive a refund minus a Rs. 500 administration fee.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 border-t-[3px] border-t-mid-grey">
              <XCircle className="w-8 h-8 text-mid-grey mb-4" />
              <h3 className="font-bold text-dark-navy mb-2">No Refund</h3>
              <p className="text-sm text-dark-grey leading-relaxed">
                If you withdraw less than 21 days before the programme start date, the fee is non-refundable. By this point costs have already been committed based on confirmed numbers.
              </p>
            </div>
          </div>
          <p className="text-xs text-mid-grey text-center mt-8">
            To request a refund, email <a href="mailto:contact@khyontekai.com" className="hover:underline">contact@khyontekai.com</a> with your name, registered email, and Razorpay payment ID. We respond within 3 working days. Full details are in our{' '}
            <Link href="/refund-policy" target="_blank" className="text-royal-blue hover:underline">Refund Policy</Link>.
          </p>
        </div>
      </section>

      {/* SECTION 5 - Registration Form */}
      <section ref={formRef} id="register" className="bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-navy mb-2">Register Now</h2>
          <p className="text-mid-grey mb-10">Fill in the form below and complete your payment to confirm your spot in the cohort.</p>

          <div className="space-y-7">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-dark-navy mb-1.5">Full Name <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-dark-navy mb-1.5">Email Address <span className="text-red-400">*</span></label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-dark-navy mb-1.5">Phone Number <span className="text-red-400">*</span></label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition"
                placeholder="10-digit Indian mobile number"
              />
            </div>

            {/* College */}
            <div>
              <label className="block text-sm font-semibold text-dark-navy mb-1.5">College or University <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => updateField('college', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition"
              />
            </div>

            {/* Degree */}
            <div>
              <label className="block text-sm font-semibold text-dark-navy mb-1.5">Degree Programme <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => updateField('degree', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition"
                placeholder="e.g. B.Tech CSE, M.Sc Biotechnology, B.Com, B.Pharm, BA Political Science"
              />
            </div>

            {/* Year of Study */}
            <div>
              <label className="block text-sm font-semibold text-dark-navy mb-1.5">Year of Study <span className="text-red-400">*</span></label>
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
            </div>

            {/* Track Selection */}
            <div>
              <label className="block text-sm font-semibold text-dark-navy mb-3">Choose Your Track <span className="text-red-400">*</span></label>
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
            </div>

            {/* Motivation */}
            <div>
              <label className="block text-sm font-semibold text-dark-navy mb-1.5">
                Why do you want to join this track? <span className="text-red-400">*</span>
              </label>
              <textarea
                value={formData.motivation}
                onChange={(e) => updateField('motivation', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-royal-blue outline-none transition resize-y"
                placeholder="Tell us in 150 to 300 words. Be specific about your background and what you are hoping to work on. Generic statements will not help your application."
              />
              <p className={`text-xs mt-1 ${wordCount(formData.motivation) >= 150 ? 'text-green-600' : 'text-mid-grey'}`}>
                {wordCount(formData.motivation)} / 150-300 words
              </p>
            </div>

            {/* Referral Source */}
            <div>
              <label className="block text-sm font-semibold text-dark-navy mb-1.5">How did you hear about this programme? <span className="text-red-400">*</span></label>
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
            </div>

            {/* Checkboxes */}
            <div className="space-y-4 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsChecked}
                  onChange={(e) => setTermsChecked(e.target.checked)}
                  className="mt-1 w-4 h-4 text-royal-blue border-gray-300 rounded focus:ring-royal-blue"
                />
                <span className="text-sm text-dark-grey">
                  I confirm I have read and understood the programme terms, fee structure, and <Link href="/refund-policy" target="_blank" className="text-royal-blue hover:underline">refund policy</Link>. <span className="text-red-400">*</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accommodationChecked}
                  onChange={(e) => setAccommodationChecked(e.target.checked)}
                  className="mt-1 w-4 h-4 text-royal-blue border-gray-300 rounded focus:ring-royal-blue"
                />
                <span className="text-sm text-dark-grey">
                  I confirm that if attending in-person I will arrange my own accommodation and travel to Guwahati. <span className="text-red-400">*</span>
                </span>
              </label>
            </div>

            {/* Payment Summary */}
            <div className="bg-light-grey border-2 border-royal-blue rounded-lg p-6">
              <p className="font-bold text-dark-navy mb-1">Programme: Summer Research Immersion Programme</p>
              <p className="text-sm text-dark-grey mb-1">
                Track selected: {selectedTrack ? <span className="font-semibold text-dark-navy">{selectedTrack}</span> : <span className="text-mid-grey italic">Please select a track above</span>}
              </p>
              <p className="text-sm text-dark-grey mb-3">Amount: <strong className="text-dark-navy">Rs. 4,999</strong> (one-time, non-refundable after 21 days of programme start)</p>
              <div className="flex items-center gap-2 text-xs text-mid-grey">
                <Lock className="w-3.5 h-3.5" />
                <span>Payment processed securely by Razorpay</span>
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

      {/* SECTION 6 - Extended Research Programmes */}
      <section className="bg-light-grey py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="corner-brackets-lg p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-dark-navy mb-6">Looking for a Longer Engagement?</h2>
            <p className="text-dark-grey leading-relaxed mb-4">
              We also offer 3-month and 6-month research programmes for students who want a deeper, sustained experience working with the Khyontek AI team. These programmes are structured around your academic calendar and research interests, and are available on a rolling basis throughout the year.
            </p>
            <p className="text-dark-grey leading-relaxed mb-8">
              If you are interested, write to us at contact@khyontekai.com and tell us a little about yourself and what you are hoping to work on. We will get back to you with details on current availability, structure, and how to register.
            </p>
            <a
              href="mailto:contact@khyontekai.com?subject=Extended%20Research%20Programme%20Enquiry"
              className="inline-block px-8 py-3 bg-amber-gold text-dark-navy font-bold rounded-full hover:bg-amber-500 transition-colors"
            >
              Write to Us
            </a>
            <p className="text-xs text-mid-grey mt-4">We typically respond within 3 working days.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
