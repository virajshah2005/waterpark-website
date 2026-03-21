import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Razorpay from 'razorpay'
import nodemailer from 'nodemailer'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = Number(process.env.PORT || 8000)
const isDevelopment = process.env.NODE_ENV !== 'production'
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'

let isDatabaseConnected = false

const bookingSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  date: String,
  adults: Number,
  children: Number,
  roomType: String,
  rooms: Number,
  rawAmount: Number,
  promo: String,
  amount: Number
})

const cancelSchema = new mongoose.Schema({
  radioOption: String,
  payorderId: String,
  bookingId: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  date: String
})

const Book = mongoose.models.bookingDetail || mongoose.model('bookingDetail', bookingSchema)
const Cancel =
  mongoose.models.cancelDetail || mongoose.model('cancelDetail', cancelSchema, 'cancelDetail')

async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI not set, continuing without database features')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    })
    isDatabaseConnected = true
    console.log('MongoDB connected')
  } catch (error) {
    console.warn('MongoDB unavailable, continuing without database features')
  }
}

await connectDatabase()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

app.use(helmet())
app.use(
  cors({
    origin: true,
    credentials: true
  })
)

app.use(
  '/api/',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
)

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

if (isDevelopment) {
  app.use('/src/', (req, res) => {
    res.redirect(`${frontendUrl}${req.originalUrl}`)
  })
}

app.use(express.static(path.join(__dirname, 'dist')))

function requireDatabase(req, res, next) {
  if (!isDatabaseConnected) {
    return res.status(503).json({
      success: false,
      error: 'Database unavailable'
    })
  }

  next()
}

app.post('/api/contact', async (req, res) => {
  try {
    await transporter.sendMail({
      from: req.body.email,
      to: process.env.EMAIL_USER,
      subject: `New Message from ${req.body.name}`,
      text: req.body.message
    })

    res.json({ success: true })
  } catch (error) {
    console.error('Contact error:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.post('/api/bookingDetails', requireDatabase, async (req, res) => {
  try {
    const data = new Book(req.body)
    await data.save()
    res.json({ success: true })
  } catch (error) {
    console.error('Booking error:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.post('/api/create/orderId', (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: 'INR',
    receipt: `receipt_${Date.now()}`
  }

  razorpay.orders.create(options, (error, order) => {
    if (error) {
      console.error('Razorpay error:', error)
      return res.status(500).json({ error })
    }

    res.json({ orderId: order.id })
  })
})

app.post('/api/payment/verify', async (req, res) => {
  try {
    const crypto = await import('crypto')
    const body =
      req.body.response.razorpay_order_id + '|' + req.body.response.razorpay_payment_id
    const expectedSignature = crypto.default
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex')

    const isAuthentic = expectedSignature === req.body.response.razorpay_signature

    if (isAuthentic && isDatabaseConnected) {
      const booking = await Book.findOne().sort({ _id: -1 })

      if (booking) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: booking.email,
          subject: `AquaLand Booking Confirmation - #${booking._id}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Booking Confirmed</h2>
              <p><strong>Name:</strong> ${booking.firstName} ${booking.lastName}</p>
              <p><strong>Date:</strong> ${booking.date}</p>
              <p><strong>Total:</strong> INR ${booking.amount}</p>
              <p><strong>Adults:</strong> ${booking.adults} | <strong>Children:</strong> ${booking.children}</p>
              <p><strong>Booking ID:</strong> <strong>${booking._id}</strong></p>
              <hr>
              <p>We can't wait to see you at AquaLand.</p>
            </div>
          `
        })
      }
    }

    res.json({ signatureIsValid: isAuthentic })
  } catch (error) {
    console.error('Payment verification error:', error)
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/cancelDetails', requireDatabase, async (req, res) => {
  try {
    const cancelData = new Cancel(req.body)
    await cancelData.save()
    await Book.deleteOne({ _id: req.body.bid })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: 'Booking Cancellation Confirmed',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Booking Cancelled</h2>
          <p><strong>Name:</strong> ${req.body.firstName} ${req.body.lastName}</p>
          <p><strong>Booking ID:</strong> ${req.body.bid}</p>
          <p><strong>Refund processing in 3-5 business days</strong></p>
        </div>
      `
    })

    res.json({ success: true })
  } catch (error) {
    console.error('Cancellation error:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`)
  console.log(`Frontend dev expected at ${frontendUrl}`)
  console.log('API endpoints ready')
})
