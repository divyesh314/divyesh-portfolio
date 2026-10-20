import nodemailer from 'nodemailer'
import { when, ymd } from '../../time'

export const dynamic = 'force-dynamic'
const OWNER = 'divyeshhere@gmail.com'
const URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
const kv = (...cmd) => fetch(URL, { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}` }, body: JSON.stringify(cmd), cache: 'no-store' })
  .then((r) => r.json()).then((j) => j.result)
const json = (o, status = 200) => Response.json(o, { status })

export async function GET() {
  return json({ booked: URL ? await kv('SMEMBERS', 'booked') : [] })
}

export async function POST(req) {
  const { slot = '', name = '', email = '', note = '' } = await req.json().catch(() => ({}))
  const h = +slot.slice(11, 13)
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:00$/.test(slot) || h < 10 || h > 16 || slot.slice(0, 10) <= ymd(new Date()))
    return json({ error: 'Pick one of the green times shown.' }, 400)
  if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email)) return json({ error: 'Enter your name and a valid email.' }, 400)
  if (!URL || !process.env.GMAIL_APP_PASSWORD) return json({ error: 'Booking service not configured.' }, 503)
  if (!(await kv('SADD', 'booked', slot))) return json({ error: 'That time was just booked. Pick another green slot.' }, 409)

  const t = when(slot), clean = (s) => String(s).slice(0, 300)
  const mail = nodemailer.createTransport({ service: 'gmail', auth: { user: OWNER, pass: process.env.GMAIL_APP_PASSWORD } })
  try {
    await Promise.all([
      mail.sendMail({ from: `Portfolio bookings <${OWNER}>`, to: OWNER, replyTo: email, subject: `New meeting: ${clean(name)}, ${t}`,
        text: `${clean(name)} (${email}) booked ${t}.\n\nTopic: ${clean(note) || '-'}` }),
      mail.sendMail({ from: `Divyesh Pawar <${OWNER}>`, to: email, subject: `Confirmed: meeting with Divyesh on ${t}`,
        text: `Hi ${clean(name)},\n\nYou're booked with Divyesh Pawar on ${t} for 30 minutes. He'll send a call link before the meeting. To reschedule, just reply to this email.\n\nDivyesh` }),
    ])
  } catch {
    await kv('SREM', 'booked', slot)
    return json({ error: 'The confirmation email could not be sent. Try again in a minute.' }, 502)
  }
  return json({ ok: true })
}
