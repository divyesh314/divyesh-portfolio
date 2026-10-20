'use client'
import { useEffect, useState } from 'react'
import { me } from './content'
import { fmt, when, ymd } from './time'

const HOURS = [10, 11, 12, 13, 14, 15, 16]

const nextWeekdays = (count) => {
  const out = []
  for (let i = 1; out.length < count; i++) {
    const d = ymd(new Date(Date.now() + i * 864e5))
    if (new Date(d + 'T12:00Z').getUTCDay() % 6) out.push(d)
  }
  return out
}

export default function Booking() {
  const [days, setDays] = useState([])
  const [day, setDay] = useState('')
  const [slot, setSlot] = useState('')
  const [booked, setBooked] = useState([])
  const [status, setStatus] = useState({})
  useEffect(() => {
    const d = nextWeekdays(10); setDays(d); setDay(d[0])
    fetch('/api/book').then((r) => r.json()).then((j) => setBooked(j.booked || [])).catch(() => {})
  }, [])

  async function submit(e) {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.target))
    setStatus({ busy: true })
    const r = await fetch('/api/book', { method: 'POST', body: JSON.stringify({ ...f, slot }) }).catch(() => ({ status: 503 }))
    if (r.status === 503) {
      const body = `Hi Divyesh,\n\nI'd like to meet on ${when(slot)}.\n\nName: ${f.name}\nEmail: ${f.email}\nTopic: ${f.note || '-'}`
      location.href = `mailto:${me.email}?subject=${encodeURIComponent('Meeting request: ' + when(slot))}&body=${encodeURIComponent(body)}`
      return setStatus({ ok: 'Your email app opened with the request filled in. Send it and Divyesh will confirm.' })
    }
    const j = await r.json()
    if (r.ok) { setBooked((b) => [...b, slot]); setSlot(''); e.target.reset() }
    else if (r.status === 409) setBooked((b) => [...b, slot])
    setStatus(r.ok ? { ok: `Booked for ${when(slot)}. A confirmation is on its way to ${f.email}.` } : { err: j.error })
  }

  return (
    <section id="book" className="book-me" aria-labelledby="bk">
      <h2 id="bk">Book a time with me</h2>
      <p className="sub">30-minute call, weekdays, Toronto time. Pick a green slot; red ones are taken.</p>
      <div className="days" role="tablist" aria-label="Day">
        {days.map((d) => (
          <button key={d} role="tab" aria-selected={d === day} className={d === day ? 'on' : ''} onClick={() => { setDay(d); setSlot('') }}>
            <small>{fmt(d + 'T12:00', { weekday: 'short' })}</small>{fmt(d + 'T12:00', { month: 'short', day: 'numeric' })}
          </button>
        ))}
      </div>
      <div className="slots">
        {HOURS.map((h) => {
          const s = `${day}T${String(h).padStart(2, '0')}:00`, taken = booked.includes(s)
          return (
            <button key={s} disabled={taken} className={`${taken ? 'red' : 'green'}${s === slot ? ' picked' : ''}`} onClick={() => setSlot(s)} aria-pressed={s === slot}>
              {fmt(s, { hour: 'numeric', minute: '2-digit' })}<small>{taken ? 'Booked' : s === slot ? 'Selected' : 'Available'}</small>
            </button>
          )
        })}
      </div>
      <form onSubmit={submit} className="bk-form">
        <input name="name" required placeholder="Your name" aria-label="Your name" />
        <input name="email" type="email" required placeholder="Your email" aria-label="Your email" />
        <input name="note" placeholder="What would you like to talk about? (optional)" aria-label="Topic" />
        <button disabled={!slot || status.busy}>{slot ? `Book ${fmt(slot, { weekday: 'short', hour: 'numeric', minute: '2-digit' })}` : 'Pick a time first'}</button>
      </form>
      <p className="msg" role="status">{status.busy ? 'Booking…' : status.ok || status.err}</p>
    </section>
  )
}
