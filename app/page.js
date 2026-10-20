import Notebook from './Notebook'
import Desk from './Desk'
import Booking from './Booking'
import { me } from './content'

const Sig = ({ as: T = 'span', ...p }) => <T className="sig" {...p}>divyesh pawar</T>

export default function Home() {
  return (
    <main>
      <header className="top"><a href="#top" aria-label="Back to top"><Sig /></a></header>

      <section id="top" className="hero" aria-label="Divyesh is a Kitchener-based Software Engineer who turns ideas into systems.">
        <div className="h-name" aria-hidden><span className="h-D">D</span><span className="h-ivyesh">ivyesh</span></div>
        <p className="h-sp h-based" aria-hidden>is a Kitchener-based</p>
        <p className="h-role" aria-hidden><span>Software</span><span>Engineer</span></p>
        <img className="h-photo" src="/img/hero.webp" alt="Divyesh standing in a parking lot at night" width="640" height="640" fetchPriority="high" />
        <p className="h-sp h-who" aria-hidden>, who turns</p>
        <p className="h-big h-ideas" aria-hidden>ideas</p>
        <p className="h-big h-into" aria-hidden>into</p>
        <p className="h-systems" aria-hidden>systems.</p>
        <a className="h-arrow" href="#notebook" aria-label="Scroll to the notebook">↓</a>
      </section>

      <Notebook />
      <Desk />

      <section className="contact" aria-labelledby="ct">
        <div className="card">
          <h2 id="ct">Let&apos;s work together!</h2>
          <a className="card-btn" href="#book"><small>Book a meeting with</small>Divyesh Pawar</a>
          <a className="card-in" href={me.linkedin}>/in/divyesh-pawar</a>
        </div>
      </section>

      <Booking />

      <footer className="foot">
        <Sig />
        <nav aria-label="Links">
          <a href={`mailto:${me.email}`}>/mail/</a><a href={me.cv}>/CV/</a>
          <a href={me.linkedin}>/in/</a><a href={me.github}>/git/</a>
        </nav>
        <p>All rights reserved. © Divyesh Pawar {new Date().getFullYear()}</p>
      </footer>
    </main>
  )
}
