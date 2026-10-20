'use client'
import { useState, useEffect } from 'react'
import { me, jobs, tools, projects, stickers } from './content'

const Img = ({ n, c = '' }) => (
  <a className={`snap ${c}`} href={`/img/${n}.webp`} target="_blank" rel="noreferrer">
    <img src={`/img/${n}.webp`} alt="" loading="lazy" />
  </a>
)

const Project = (p) => [
  <div key="l" className="page paper">
    <p className="type">Case file · {p.kind}</p>
    <h3 className="pg-title">{p.title}</h3>
    <p className="pg-line">{p.line}</p>
    <p className="pg-body">{p.body}</p>
    <ul className="chips">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
    <p className="links">{p.links.map(([t, u]) => <a key={u} href={u} target="_blank" rel="noreferrer">{t} ↗</a>)}</p>
    <p className="stamp">{p.stamp}</p>
  </div>,
  <div key="r" className="page dark collage">
    <Img n={p.imgs[0]} c="big" /><Img n={p.imgs[1]} c="c1" /><Img n={p.imgs[2]} c="c2" />
    <span className="hint">*hover to reveal</span>
  </div>,
]

const spreads = [
  [
    <div key="l" className="page paper about">
      <div className="snap polaroid"><img src="/img/portrait.webp" alt="Divyesh Pawar" loading="lazy" /></div>
      <div className="pass">
        <p className="type">Boarding pass</p>
        <p className="route">GUJARAT <span>→</span> KITCHENER</p>
        <dl><div><dt>B.E. Computer Eng.</dt><dd>GTU · 2020</dd></div><div><dt>PG Dip. Web Dev</dt><dd>Conestoga · 2023</dd></div></dl>
      </div>
      <div className="biz"><b>Divyesh Pawar</b><small>Software Engineer</small><span>{me.phone}<br />{me.email}</span></div>
      <div className="hi"><p>Hi!</p>{me.about.map((t) => <p key={t}>{t.replace("Hi! ", '')}</p>)}</div>
    </div>,
    <div key="r" className="page dark cover-r">
      <p className="giant">ENGINEER</p>
      <div className="snap tall"><img src="/img/hero.webp" alt="" loading="lazy" /></div>
      <p className="tag"><span className="sig">ideas</span> into SYSTEMS</p>
    </div>,
  ],
  [
    <div key="l" className="page paper">
      <p className="type">Where I&apos;ve worked</p>
      <h3 className="pg-title">Shipping systems people depend on.</h3>
      <ol className="jobs">{jobs.map(([r, c, d, t]) => (
        <li key={c}><p className="type">{d}</p><h4>{r} <i>at {c}</i></h4><p>{t}</p></li>
      ))}</ol>
    </div>,
    <div key="r" className="page dark">
      <p className="type light">Toolbox</p>
      {Object.entries(tools).map(([g, list]) => (
        <div key={g} className="tool"><h4>{g}</h4><p>{list.join(' / ')}</p></div>
      ))}
    </div>,
  ],
  ...projects.map(Project),
]

export default function Notebook() {
  const [open, setOpen] = useState(false)
  const [i, setI] = useState(0)
  const go = (d) => setI((n) => Math.min(spreads.length - 1, Math.max(0, n + d)))
  useEffect(() => {
    if (!open) return
    const k = (e) => e.key === 'ArrowRight' ? go(1) : e.key === 'ArrowLeft' && go(-1)
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [open])

  return (
    <section id="notebook" className="nb" aria-label="Divyesh's engineering notebook">
      <p className="label">Divyesh&apos;s<br />Engineering Notebook</p>
      <div className="pen" aria-hidden />
      {!open ? (
        <button className="cover" onClick={() => setOpen(true)} aria-label="Open the notebook">
          {stickers.map(([t, bg, c, r], k) => <span key={t} className={`stk s${k % 4}`} style={{ background: bg, color: c, rotate: `${r}deg` }}>{t}</span>)}
          <span className="stk hello"><small>HELLO my name is</small><b className="sig">Divyesh</b></span>
          <span className="tape">CLICK TO OPEN</span>
        </button>
      ) : (
        <div className="book-wrap">
          <button className="flip prev" onClick={() => go(-1)} disabled={!i} aria-label="Previous page">◁</button>
          <div className="book" key={i}>{spreads[i]}</div>
          <button className="flip next" onClick={() => go(1)} disabled={i === spreads.length - 1} aria-label="Next page">▷</button>
          <p className="pg-no">{i + 1} / {spreads.length}</p>
        </div>
      )}
      <p className="side">← Software Engineering<br />(2020–2026)</p>
    </section>
  )
}
