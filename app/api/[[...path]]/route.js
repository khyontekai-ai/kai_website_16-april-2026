import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
// MongoDB connection
let client
let db

async function connectToMongo() {
  if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL env variable not defined')
  }
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME)
  }
  return db
}

// In-Memory Fallback Database Adapter (replaces fs because Cloudflare Workers has no writeable local filesystem)
const localDb = {
  collections: {},
  async getCollection(collectionName, defaultData) {
    if (!this.collections[collectionName]) {
      this.collections[collectionName] = defaultData || []
    }
    return this.collections[collectionName]
  },
  async saveCollection(collectionName, data) {
    this.collections[collectionName] = data
  }
}

// Data access abstraction layer
async function getProjectsCollection() {
  if (process.env.MONGO_URL) {
    try {
      const database = await connectToMongo()
      return {
        type: 'mongo',
        find: async () => {
          let list = await database.collection('projects').find({}).toArray()
          if (list.length === 0) {
            const seeded = defaultProjects.map(p => ({ ...p, createdAt: new Date() }))
            await database.collection('projects').insertMany(seeded)
            list = await database.collection('projects').find({}).toArray()
          }
          return list
        },
        insertOne: async (item) => {
          await database.collection('projects').insertOne(item)
        },
        updateOne: async (id, update) => {
          return await database.collection('projects').updateOne({ id }, { $set: update })
        },
        deleteOne: async (id) => {
          return await database.collection('projects').deleteOne({ id })
        }
      }
    } catch (err) {
      console.warn('MongoDB connection failed for projects, falling back to local file storage:', err.message)
    }
  }

  // File fallback
  return {
    type: 'local',
    find: async () => {
      return await localDb.getCollection('projects', defaultProjects)
    },
    insertOne: async (item) => {
      const list = await localDb.getCollection('projects', defaultProjects)
      list.push(item)
      await localDb.saveCollection('projects', list)
    },
    updateOne: async (id, update) => {
      const list = await localDb.getCollection('projects', defaultProjects)
      const idx = list.findIndex(p => p.id === id)
      if (idx === -1) return { matchedCount: 0 }
      list[idx] = { ...list[idx], ...update }
      await localDb.saveCollection('projects', list)
      return { matchedCount: 1 }
    },
    deleteOne: async (id) => {
      const list = await localDb.getCollection('projects', defaultProjects)
      const filtered = list.filter(p => p.id !== id)
      if (filtered.length === list.length) return { deletedCount: 0 }
      await localDb.saveCollection('projects', filtered)
      return { deletedCount: 1 }
    }
  }
}

async function getReviewsCollection() {
  if (process.env.MONGO_URL) {
    try {
      const database = await connectToMongo()
      return {
        type: 'mongo',
        find: async () => {
          let list = await database.collection('reviews').find({}).toArray()
          if (list.length === 0) {
            const seeded = defaultReviews.map(r => ({ ...r, createdAt: new Date() }))
            await database.collection('reviews').insertMany(seeded)
            list = await database.collection('reviews').find({}).toArray()
          }
          return list
        },
        insertOne: async (item) => {
          await database.collection('reviews').insertOne(item)
        },
        updateOne: async (id, update) => {
          return await database.collection('reviews').updateOne({ id }, { $set: update })
        },
        deleteOne: async (id) => {
          return await database.collection('reviews').deleteOne({ id })
        }
      }
    } catch (err) {
      console.warn('MongoDB connection failed for reviews, falling back to local file storage:', err.message)
    }
  }

  // File fallback
  return {
    type: 'local',
    find: async () => {
      return await localDb.getCollection('reviews', defaultReviews)
    },
    insertOne: async (item) => {
      const list = await localDb.getCollection('reviews', defaultReviews)
      list.push(item)
      await localDb.saveCollection('reviews', list)
    },
    updateOne: async (id, update) => {
      const list = await localDb.getCollection('reviews', defaultReviews)
      const idx = list.findIndex(r => r.id === id)
      if (idx === -1) return { matchedCount: 0 }
      list[idx] = { ...list[idx], ...update }
      await localDb.saveCollection('reviews', list)
      return { matchedCount: 1 }
    },
    deleteOne: async (id) => {
      const list = await localDb.getCollection('reviews', defaultReviews)
      const filtered = list.filter(r => r.id !== id)
      if (filtered.length === list.length) return { deletedCount: 0 }
      await localDb.saveCollection('reviews', filtered)
      return { deletedCount: 1 }
    }
  }
}

async function getCaseStudiesCollection() {
  if (process.env.MONGO_URL) {
    try {
      const database = await connectToMongo()
      return {
        type: 'mongo',
        find: async () => {
          let list = await database.collection('casestudies').find({}).toArray()
          if (list.length === 0) {
            const seeded = defaultCaseStudies.map(cs => ({ ...cs, createdAt: new Date() }))
            await database.collection('casestudies').insertMany(seeded)
            list = await database.collection('casestudies').find({}).toArray()
          }
          return list
        },
        insertOne: async (item) => {
          await database.collection('casestudies').insertOne(item)
        },
        updateOne: async (id, update) => {
          return await database.collection('casestudies').updateOne({ id }, { $set: update })
        },
        deleteOne: async (id) => {
          return await database.collection('casestudies').deleteOne({ id })
        }
      }
    } catch (err) {
      console.warn('MongoDB connection failed for casestudies, falling back to local file storage:', err.message)
    }
  }

  // File fallback
  return {
    type: 'local',
    find: async () => {
      return await localDb.getCollection('casestudies', defaultCaseStudies)
    },
    insertOne: async (item) => {
      const list = await localDb.getCollection('casestudies', defaultCaseStudies)
      list.push(item)
      await localDb.saveCollection('casestudies', list)
    },
    updateOne: async (id, update) => {
      const list = await localDb.getCollection('casestudies', defaultCaseStudies)
      const idx = list.findIndex(cs => cs.id === id)
      if (idx === -1) return { matchedCount: 0 }
      list[idx] = { ...list[idx], ...update }
      await localDb.saveCollection('casestudies', list)
      return { matchedCount: 1 }
    },
    deleteOne: async (id) => {
      const list = await localDb.getCollection('casestudies', defaultCaseStudies)
      const filtered = list.filter(cs => cs.id !== id)
      if (filtered.length === list.length) return { deletedCount: 0 }
      await localDb.saveCollection('casestudies', filtered)
      return { deletedCount: 1 }
    }
  }
}

async function saveRegistration(registration) {
  if (process.env.MONGO_URL) {
    try {
      const database = await connectToMongo()
      await database.collection('registrations').insertOne(registration)
      return
    } catch (err) {
      console.warn('MongoDB registration save failed, falling back to local file storage:', err.message)
    }
  }
  const list = await localDb.getCollection('registrations', [])
  list.push(registration)
  await localDb.saveCollection('registrations', list)
}

async function saveContact(contact) {
  if (process.env.MONGO_URL) {
    try {
      const database = await connectToMongo()
      await database.collection('contacts').insertOne(contact)
      return
    } catch (err) {
      console.warn('MongoDB contact save failed, falling back to local file storage:', err.message)
    }
  }
  const list = await localDb.getCollection('contacts', [])
  list.push(contact)
  await localDb.saveCollection('contacts', list)
}

// Resend client
function getResend() {
  if (!process.env.RESEND_API_KEY) return null
  return new Resend(process.env.RESEND_API_KEY)
}

// Admin Password Authorization Helper
function authorizeAdmin(request) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader) return false
  const token = authHeader.replace('Bearer ', '')
  const adminPassword = process.env.ADMIN_PASSWORD || 'khyontek_admin_2026'
  return token === adminPassword
}

// Default Projects to seed
const defaultProjects = [
  {
    id: '1',
    title: 'Population-Specific Genomic Foundation Model',
    status: 'In Progress',
    timeline: 'Q3 2026',
    description:
      'A large-scale genomic language model trained exclusively on South and Southeast Asian population data, beginning with cohorts from Northeast India. This model will serve as the foundation for downstream clinical and diagnostic applications.',
    details:
      'Most genomic AI models are trained predominantly on European ancestry data, leading to significant gaps in predictive accuracy for South and Southeast Asian populations. This project aims to build a foundational model from the ground up using locally curated genomic sequences, disease records, and population metadata. The model will be open-weighted for academic use and integrated into our clinical partner pipelines.',
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Vector-Borne Disease Early Warning System',
    status: 'Planning',
    timeline: 'Q4 2026',
    description:
      'An AI-powered surveillance and early warning platform for vector-borne diseases such as dengue, malaria, and Japanese encephalitis, specifically calibrated for the epidemiological patterns of Assam and the broader Northeast Indian region.',
    details:
      'Leveraging satellite imagery, rainfall and temperature data, hospital admission records, and community health worker reports, this system will generate district-level risk forecasts up to four weeks in advance. The platform will be designed for integration with the Assam state health infrastructure and tested in partnership with local health authorities.',
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'Assamese & Bodo NLP Benchmark Suite',
    status: 'Planning',
    timeline: 'Q1 2027',
    description:
      'A comprehensive natural language processing benchmark and dataset suite for Assamese and Bodo languages, addressing the near-total absence of these languages in global NLP evaluation frameworks.',
    details:
      "This project will produce annotated corpora, evaluation benchmarks, and fine-tuned language models for two of Northeast India's most widely spoken languages. Tasks will include named entity recognition, sentiment analysis, machine translation, and question answering. All datasets will be released publicly to support the broader research community.",
    createdAt: new Date()
  },
  {
    id: '4',
    title: 'Thalassaemia Carrier Screening AI Tool',
    status: 'Concept',
    timeline: 'Q2 2027',
    description:
      'A clinical decision-support tool for thalassaemia carrier identification using blood count parameters and population-specific genetic risk profiles, designed for deployment in primary health centres with limited laboratory infrastructure.',
    details:
      'Northeast India has among the highest prevalence of haemoglobinopathies in the country, yet carrier screening remains inconsistent across primary and secondary care settings. This tool will allow frontline health workers to flag at-risk individuals using routine CBC data, reducing the burden on expensive genetic testing while improving early detection rates across the region.',
    createdAt: new Date()
  }
]

// Default Reviews to seed
const defaultReviews = [
  {
    id: '1',
    name: 'Participant, Tangla College',
    rating: 5,
    text: 'The workshop on GenAI and Agentic AI was eye-opening. The instructors explained complex concepts in a very approachable way. I now feel confident exploring AI tools for my own research.',
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Faculty Member, Tangla College',
    rating: 5,
    text: "Extremely well-organised session. The hands-on demonstrations of agentic AI workflows were particularly impressive and directly relevant to our department's work.",
    createdAt: new Date()
  },
  {
    id: '3',
    name: 'Student, Tangla College',
    rating: 4,
    text: 'Learned a lot about how generative AI works under the hood. Would have loved a longer session — there was so much more to explore. Looking forward to the next programme!',
    createdAt: new Date()
  },
  {
    id: '4',
    name: 'Participant, Tangla College',
    rating: 5,
    text: 'Khyontek AI brought cutting-edge knowledge right to our campus. The examples were rooted in local and regional contexts which made everything much more relatable.',
    createdAt: new Date()
  },
  {
    id: '5',
    name: 'Student, Tangla College',
    rating: 5,
    text: 'The segment on Agentic AI was the highlight for me. Never thought AI agents could be so powerful. Motivated me to start building my own projects.',
    createdAt: new Date()
  },
  {
    id: '6',
    name: 'Faculty Member, Tangla College',
    rating: 4,
    text: 'A well-paced and thoughtfully curated workshop. The team clearly has deep expertise and a passion for making AI accessible to communities in Northeast India.',
    createdAt: new Date()
  }
]

// Default Case Studies to seed
const defaultCaseStudies = [
  {
    id: '1',
    title: 'Biological Intelligence',
    description: 'Multi-modal AI and genomic data systems designed for disease contexts prevalent in Northeast India and South and Southeast Asia.',
    link: '/research#bio-intelligence',
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Population Genomics',
    description: 'Building and curating datasets that represent tribal and indigenous communities severely underrepresented in global biomedical databases.',
    link: '/research#pop-genomics',
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'Regulatory and Ethical Frameworks',
    description: 'AI development that is DPDPA-compliant, ABDM-compatible, and ethically accountable to the communities it serves.',
    link: '/research#ethics',
    createdAt: new Date()
  }
]

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

      // Save registration using hybrid handler
      await saveRegistration(registration)

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

      // Save contact using hybrid handler
      await saveContact(contact)

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

    // POST /api/admin/login
    if (route === '/admin/login' && method === 'POST') {
      const { password } = await request.json()
      const adminPassword = process.env.ADMIN_PASSWORD || 'khyontek_admin_2026'
      if (password === adminPassword) {
        return handleCORS(NextResponse.json({ success: true, token: adminPassword }))
      } else {
        return handleCORS(NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 }))
      }
    }

    // GET /api/projects
    if (route === '/projects' && method === 'GET') {
      const projectsColl = await getProjectsCollection()
      const list = await projectsColl.find()
      return handleCORS(NextResponse.json(list))
    }

    // POST /api/projects
    if (route === '/projects' && method === 'POST') {
      if (!authorizeAdmin(request)) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      const body = await request.json()
      const { title, status, timeline, description, details } = body
      if (!title || !status || !timeline || !description || !details) {
        return handleCORS(NextResponse.json({ error: 'All fields are required' }, { status: 400 }))
      }
      const newProj = {
        id: uuidv4(),
        title,
        status,
        timeline,
        description,
        details,
        createdAt: new Date()
      }
      const projectsColl = await getProjectsCollection()
      await projectsColl.insertOne(newProj)
      return handleCORS(NextResponse.json({ success: true, project: newProj }))
    }

    // PUT /api/projects/[id]
    if (route.startsWith('/projects/') && method === 'PUT') {
      if (!authorizeAdmin(request)) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      const id = path[1]
      const body = await request.json()
      const { title, status, timeline, description, details } = body
      if (!title || !status || !timeline || !description || !details) {
        return handleCORS(NextResponse.json({ error: 'All fields are required' }, { status: 400 }))
      }
      const projectsColl = await getProjectsCollection()
      const result = await projectsColl.updateOne(id, { title, status, timeline, description, details })
      if (result.matchedCount === 0) {
        return handleCORS(NextResponse.json({ error: 'Project not found' }, { status: 404 }))
      }
      return handleCORS(NextResponse.json({ success: true }))
    }

    // DELETE /api/projects/[id]
    if (route.startsWith('/projects/') && method === 'DELETE') {
      if (!authorizeAdmin(request)) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      const id = path[1]
      const projectsColl = await getProjectsCollection()
      const result = await projectsColl.deleteOne(id)
      if (result.deletedCount === 0) {
        return handleCORS(NextResponse.json({ error: 'Project not found' }, { status: 404 }))
      }
      return handleCORS(NextResponse.json({ success: true }))
    }

    // GET /api/reviews
    if (route === '/reviews' && method === 'GET') {
      const reviewsColl = await getReviewsCollection()
      const list = await reviewsColl.find()
      return handleCORS(NextResponse.json(list))
    }

    // POST /api/reviews
    if (route === '/reviews' && method === 'POST') {
      if (!authorizeAdmin(request)) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      const body = await request.json()
      const { name, rating, text } = body
      if (!name || rating === undefined || !text) {
        return handleCORS(NextResponse.json({ error: 'All fields are required' }, { status: 400 }))
      }
      const newReview = {
        id: uuidv4(),
        name,
        rating: Number(rating),
        text,
        createdAt: new Date()
      }
      const reviewsColl = await getReviewsCollection()
      await reviewsColl.insertOne(newReview)
      return handleCORS(NextResponse.json({ success: true, review: newReview }))
    }

    // PUT /api/reviews/[id]
    if (route.startsWith('/reviews/') && method === 'PUT') {
      if (!authorizeAdmin(request)) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      const id = path[1]
      const body = await request.json()
      const { name, rating, text } = body
      if (!name || rating === undefined || !text) {
        return handleCORS(NextResponse.json({ error: 'All fields are required' }, { status: 400 }))
      }
      const reviewsColl = await getReviewsCollection()
      const result = await reviewsColl.updateOne(id, { name, rating: Number(rating), text })
      if (result.matchedCount === 0) {
        return handleCORS(NextResponse.json({ error: 'Review not found' }, { status: 404 }))
      }
      return handleCORS(NextResponse.json({ success: true }))
    }

    // DELETE /api/reviews/[id]
    if (route.startsWith('/reviews/') && method === 'DELETE') {
      if (!authorizeAdmin(request)) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      const id = path[1]
      const reviewsColl = await getReviewsCollection()
      const result = await reviewsColl.deleteOne(id)
      if (result.deletedCount === 0) {
        return handleCORS(NextResponse.json({ error: 'Review not found' }, { status: 404 }))
      }
      return handleCORS(NextResponse.json({ success: true }))
    }

    // GET /api/casestudies
    if (route === '/casestudies' && method === 'GET') {
      const caseStudiesColl = await getCaseStudiesCollection()
      const list = await caseStudiesColl.find()
      return handleCORS(NextResponse.json(list))
    }

    // POST /api/casestudies
    if (route === '/casestudies' && method === 'POST') {
      if (!authorizeAdmin(request)) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      const body = await request.json()
      const { title, description, link } = body
      if (!title || !description) {
        return handleCORS(NextResponse.json({ error: 'Title and description are required' }, { status: 400 }))
      }
      const newCaseStudy = {
        id: uuidv4(),
        title,
        description,
        link: link || '',
        createdAt: new Date()
      }
      const caseStudiesColl = await getCaseStudiesCollection()
      await caseStudiesColl.insertOne(newCaseStudy)
      return handleCORS(NextResponse.json({ success: true, casestudy: newCaseStudy }))
    }

    // PUT /api/casestudies/[id]
    if (route.startsWith('/casestudies/') && method === 'PUT') {
      if (!authorizeAdmin(request)) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      const id = path[1]
      const body = await request.json()
      const { title, description, link } = body
      if (!title || !description) {
        return handleCORS(NextResponse.json({ error: 'Title and description are required' }, { status: 400 }))
      }
      const caseStudiesColl = await getCaseStudiesCollection()
      const result = await caseStudiesColl.updateOne(id, { title, description, link })
      if (result.matchedCount === 0) {
        return handleCORS(NextResponse.json({ error: 'Case study not found' }, { status: 404 }))
      }
      return handleCORS(NextResponse.json({ success: true }))
    }

    // DELETE /api/casestudies/[id]
    if (route.startsWith('/casestudies/') && method === 'DELETE') {
      if (!authorizeAdmin(request)) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      const id = path[1]
      const caseStudiesColl = await getCaseStudiesCollection()
      const result = await caseStudiesColl.deleteOne(id)
      if (result.deletedCount === 0) {
        return handleCORS(NextResponse.json({ error: 'Case study not found' }, { status: 404 }))
      }
      return handleCORS(NextResponse.json({ success: true }))
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

export const runtime = 'edge'
