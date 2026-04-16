import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// MongoDB connection
let client
let db

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME)
  }
  return db
}

// Resend client
function getResend() {
  if (!process.env.RESEND_API_KEY) return null
  return new Resend(process.env.RESEND_API_KEY)
}

// Helper function to handle CORS
function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

// Send email helper
async function sendEmail(to, subject, html) {
  const resend = getResend()
  if (!resend) {
    console.log('Resend not configured, skipping email to:', to)
    return null
  }
  try {
    const { data, error } = await resend.emails.send({
      from: 'Khyontek AI <contact@khyontekai.com>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    })
    if (error) {
      console.error('Email send error:', error)
      return null
    }
    return data
  } catch (err) {
    console.error('Email exception:', err)
    return null
  }
}

// Route handler function
async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()

    // Root endpoint
    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(NextResponse.json({ message: "Khyontek AI API is running" }))
    }

    // POST /api/register
    if (route === '/register' && method === 'POST') {
      const body = await request.json()

      const { fullName, email, phone, college, degree, yearOfStudy, track, motivation, referralSource, razorpayPaymentId } = body

      // Validate required fields
      if (!fullName || !email || !phone || !college || !degree || !yearOfStudy || !track || !motivation || !referralSource || !razorpayPaymentId) {
        return handleCORS(NextResponse.json(
          { success: false, error: 'All fields are required including payment ID' },
          { status: 400 }
        ))
      }

      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return handleCORS(NextResponse.json(
          { success: false, error: 'Invalid email format' },
          { status: 400 }
        ))
      }

      // Validate phone (10 digits)
      if (!/^\d{10}$/.test(phone.replace(/[\s\-\+]/g, '').slice(-10))) {
        return handleCORS(NextResponse.json(
          { success: false, error: 'Phone number must be a valid 10-digit Indian mobile number' },
          { status: 400 }
        ))
      }

      // Validate track
      const validTracks = [
        'Track 1 - Biological Intelligence Research',
        'Track 2 - Ayurvedic and Ethnobotanical Research',
        'Track 3 - Compliance and RegTech Research',
        'Track 4 - AI and Data Foundations',
      ]
      if (!validTracks.includes(track)) {
        return handleCORS(NextResponse.json(
          { success: false, error: 'Please select a valid track' },
          { status: 400 }
        ))
      }

      // Validate motivation length
      if (motivation.trim().length < 100) {
        return handleCORS(NextResponse.json(
          { success: false, error: 'Motivation statement must be at least 100 characters' },
          { status: 400 }
        ))
      }

      // Create registration document
      const registration = {
        id: uuidv4(),
        fullName,
        email,
        phone,
        college,
        degree,
        yearOfStudy,
        track,
        motivation,
        referralSource,
        razorpayPaymentId,
        createdAt: new Date(),
        status: 'confirmed',
        source: 'summer_immersion_2025',
      }

      // Save to MongoDB
      await db.collection('registrations').insertOne(registration)

      // Send confirmation email to student
      await sendEmail(
        email,
        'Your Khyontek AI Programme Registration is Confirmed',
        `
        <div style="font-family: 'Nunito', Calibri, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #3D3D3D; line-height: 1.7;">
          <p style="font-size: 16px;">Dear ${fullName},</p>
          <p>Your registration for the Summer Research Immersion Programme at Khyontek AI has been confirmed. Here are your details:</p>
          <p><strong>Track:</strong> ${track}<br/><strong>Payment ID:</strong> ${razorpayPaymentId}</p>
          <p>We will be in touch within 48 hours with everything you need before the programme starts, including your cohort assignment, schedule, and preparation guidelines.</p>
          <p>If you have any questions in the meantime, write to us at <a href="mailto:contact@khyontekai.com" style="color: #2B3EAA;">contact@khyontekai.com</a>.</p>
          <p>We look forward to working with you.</p>
          <p>Warm regards,<br/><strong>The Khyontek AI Team</strong><br/>Guwahati, Assam</p>
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin-top: 24px;" />
          <p style="color: #6B7280; font-size: 12px;">Khyontek AI Pvt Ltd | Guwahati, Assam, India | khyontekai.com</p>
        </div>
        `
      )

      // Send internal notification email
      await sendEmail(
        'contact@khyontekai.com',
        `New Registration - ${track} - ${fullName}`,
        `
        <div style="font-family: 'Nunito', Calibri, sans-serif; padding: 20px; color: #3D3D3D; line-height: 1.6;">
          <h2 style="color: #1A2870;">New Registration Received</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold; color: #1A2870;">Name</td><td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${fullName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold; color: #1A2870;">Email</td><td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${email}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold; color: #1A2870;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${phone}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold; color: #1A2870;">College</td><td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${college}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold; color: #1A2870;">Degree</td><td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${degree}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold; color: #1A2870;">Year</td><td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${yearOfStudy}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold; color: #1A2870;">Track</td><td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${track}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold; color: #1A2870;">Referral</td><td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${referralSource}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold; color: #1A2870;">Payment ID</td><td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${razorpayPaymentId}</td></tr>
          </table>
          <h3 style="color: #1A2870; margin-top: 16px;">Motivation</h3>
          <p style="background: #F3F4F6; padding: 12px; border-radius: 8px;">${motivation}</p>
        </div>
        `
      )

      return handleCORS(NextResponse.json({
        success: true,
        message: 'Registration confirmed',
        registrationId: registration.id,
      }))
    }

    // POST /api/contact
    if (route === '/contact' && method === 'POST') {
      const body = await request.json()

      const { name, email, subject, message } = body

      // Validate required fields
      if (!name || !email || !subject || !message) {
        return handleCORS(NextResponse.json(
          { error: 'All fields are required' },
          { status: 400 }
        ))
      }

      // Validate email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return handleCORS(NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        ))
      }

      // Create contact document
      const contact = {
        id: uuidv4(),
        name,
        email,
        subject,
        message,
        timestamp: new Date(),
      }

      // Save to MongoDB
      await db.collection('contacts').insertOne(contact)

      // Send notification to Khyontek AI team
      await sendEmail(
        'contact@khyontekai.com',
        `New Contact Form Submission: ${subject}`,
        `
        <div style="font-family: 'Nunito', Calibri, sans-serif; padding: 20px;">
          <h2 style="color: #1A2870;">New Contact Form Submission</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold; color: #1A2870;">Name</td><td style="padding: 8px; border-bottom: 1px solid #E5E7EB; color: #3D3D3D;">${name}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold; color: #1A2870;">Email</td><td style="padding: 8px; border-bottom: 1px solid #E5E7EB; color: #3D3D3D;">${email}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #E5E7EB; font-weight: bold; color: #1A2870;">Subject</td><td style="padding: 8px; border-bottom: 1px solid #E5E7EB; color: #3D3D3D;">${subject}</td></tr>
          </table>
          <h3 style="color: #1A2870; margin-top: 16px;">Message</h3>
          <p style="color: #3D3D3D; line-height: 1.6; background: #F3F4F6; padding: 12px; border-radius: 8px;">${message}</p>
        </div>
        `
      )

      // Send auto-reply to the person
      await sendEmail(
        email,
        'We received your message - Khyontek AI',
        `
        <div style="font-family: 'Nunito', Calibri, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="border-top: 3px solid #F5A623; padding-top: 20px;">
            <h1 style="color: #1A2870; font-size: 24px;">Thank you for reaching out</h1>
            <p style="color: #3D3D3D; line-height: 1.6;">
              Dear ${name},
            </p>
            <p style="color: #3D3D3D; line-height: 1.6;">
              We have received your message regarding <strong>"${subject}"</strong> and will get back to you within 2 working days.
            </p>
            <p style="color: #3D3D3D; line-height: 1.6;">
              If your matter is urgent, you can also reach us directly at <a href="mailto:contact@khyontekai.com" style="color: #2B3EAA;">contact@khyontekai.com</a>.
            </p>
            <p style="color: #3D3D3D; line-height: 1.6;">
              Warm regards,<br />
              <strong>Khyontek AI Team</strong><br />
              Guwahati, Assam
            </p>
          </div>
          <div style="border-top: 1px solid #E5E7EB; margin-top: 24px; padding-top: 12px;">
            <p style="color: #6B7280; font-size: 12px;">Khyontek AI Pvt Ltd | Guwahati, Assam, India | khyontekai.com</p>
          </div>
        </div>
        `
      )

      return handleCORS(NextResponse.json({
        success: true,
        message: 'Message sent successfully',
      }))
    }

    // Route not found
    return handleCORS(NextResponse.json(
      { error: `Route ${route} not found` },
      { status: 404 }
    ))

  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json(
      { success: false, error: "Something went wrong on our end. Please contact contact@khyontekai.com" },
      { status: 500 }
    ))
  }
}

// Export all HTTP methods
export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
