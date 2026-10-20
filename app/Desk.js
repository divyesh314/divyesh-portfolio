'use client'
import { useEffect, useRef, useState } from 'react'

const NOTE = `Currently:
open to Software Engineer roles,
remote or on-site, happy to relocate.

Off the clock:
coffee first, then code,
then the heavy bag.

— D.`

export default function Desk() {
  const [n, setN] = useState(0)
  const [on, setOn] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    let t
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      t = setInterval(() => setN((x) => (x >= NOTE.length ? (clearInterval(t), x) : x + 1)), 38)
    })
    io.observe(ref.current)
    return () => { io.disconnect(); clearInterval(t) }
  }, [])

  return (
    <section ref={ref} className={`desk${on ? ' lit' : ''}`} aria-label="Desk note">
      <svg className="coffee" viewBox="0 0 200 200" aria-hidden>
        <circle cx="100" cy="100" r="92" fill="#e9e4da" /><circle cx="100" cy="100" r="78" fill="#d8d1c4" />
        <circle cx="100" cy="100" r="66" fill="#3b2416" /><circle cx="100" cy="100" r="66" fill="url(#crema)" />
        <path d="M78 96c10-16 34-16 44 0-10 6-14 18-22 30-8-12-12-24-22-30z" fill="#e8d3b4" opacity=".85" />
        <rect x="186" y="88" width="14" height="24" rx="7" fill="#e9e4da" />
        <defs><radialGradient id="crema"><stop offset=".55" stopColor="#6b4329" stopOpacity="0" /><stop offset="1" stopColor="#a8754c" /></radialGradient></defs>
      </svg>
      <svg className="phones" viewBox="0 0 220 180" aria-hidden>
        <path d="M30 120C30 40 190 40 190 120" fill="none" stroke="#1d1d1f" strokeWidth="16" strokeLinecap="round" />
        <path d="M30 120C30 46 190 46 190 120" fill="none" stroke="#3a3a3d" strokeWidth="4" />
        <rect x="6" y="100" width="48" height="70" rx="22" fill="#1d1d1f" /><rect x="166" y="100" width="48" height="70" rx="22" fill="#1d1d1f" />
        <rect x="16" y="112" width="28" height="46" rx="14" fill="#2c2c30" /><rect x="176" y="112" width="28" height="46" rx="14" fill="#2c2c30" />
      </svg>
      <svg className="gloves" viewBox="0 0 260 200" aria-hidden>
        {[[0, -12], [118, 14]].map(([x, r]) => (
          <g key={x} transform={`translate(${x} 10) rotate(${r} 70 90)`}>
            <path d="M22 70C22 20 118 14 124 62c4 34-6 58-24 70H44C28 120 22 98 22 70z" fill="#c4262e" />
            <path d="M24 74c-14-4-22 10-14 22 6 10 18 10 24 4" fill="#a81f26" />
            <path d="M40 40c20-14 52-14 70 0" stroke="#e05058" strokeWidth="6" fill="none" strokeLinecap="round" opacity=".7" />
            <rect x="40" y="128" width="64" height="44" rx="8" fill="#f2efe8" /><rect x="40" y="140" width="64" height="8" fill="#c4262e" />
          </g>
        ))}
      </svg>
      <div className="note">
        <span className="spine">divyesh pawar</span>
        <pre aria-label={NOTE}>{NOTE.slice(0, n)}<i className="caret" /></pre>
      </div>
      <button className={`lamp${on ? ' on' : ''}`} onClick={() => setOn(!on)} aria-pressed={on} aria-label="Desk lamp">LAMP {on ? 'ON' : 'OFF'}</button>
    </section>
  )
}
