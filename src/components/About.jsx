import portraitImg from '../assets/portrait.png'
import './About.css'

const highlights = [
  {
    icon: '🌊',
    title: 'Beachfront Location',
    desc: 'Nestled directly on the shores of Mahabalipuram, steps away from the Bay of Bengal.',
  },
  {
    icon: '🍽️',
    title: 'Fine Dining',
    desc: 'Savour authentic coastal cuisine and international delicacies at our signature restaurant.',
  },
  {
    icon: '🧖',
    title: 'Luxury Spa',
    desc: 'Rejuvenate your body and soul with holistic treatments inspired by ancient Pallava traditions.',
  },
  {
    icon: '🏊',
    title: 'Infinity Pool',
    desc: 'Unwind in our stunning infinity pool overlooking the serene Bay of Bengal.',
  },
]

const pillars = [
  { num: '40+', label: 'Luxury Rooms & Suites' },
  { num: '1', label: 'Signature Restaurant' },
  { num: '15+', label: 'Years of Excellence' },
  { num: '10K+', label: 'Happy Guests' },
]

export default function About() {
  return (
    <section className="about" id="about">
      {/* Top gold rule */}
      <div className="about-rule" />

      {/* Eyebrow + Heading */}
      <div className="about-intro">
        <p className="about-eyebrow">Our Story</p>
        <h2 className="about-heading">
          A Legacy of <span className="gold">Luxury</span> &amp; <span className="gold">Heritage</span>
        </h2>
        <div className="about-divider" />
        <p className="about-desc">
          Landmark Pallavaa Beach Resort &amp; Spa stands as a beacon of refined hospitality along
          the ancient Coromandel Coast. Drawing inspiration from the grandeur of the Pallava dynasty,
          every corner of our resort is a celebration of timeless elegance — where heritage meets
          modern luxury in perfect harmony.
        </p>
      </div>

      {/* Highlight Cards */}
      <div className="about-highlights">
        {highlights.map((h) => (
          <div className="highlight-card" key={h.title}>
            <div className="highlight-icon">{h.icon}</div>
            <h3 className="highlight-title">{h.title}</h3>
            <p className="highlight-desc">{h.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats Strip */}
      <div className="about-stats-strip">
        {pillars.map((p, i) => (
          <div className="strip-stat" key={p.label}>
            <span className="strip-num">{p.num}</span>
            <span className="strip-label">{p.label}</span>
            {i < pillars.length - 1 && <div className="strip-divider" />}
          </div>
        ))}
      </div>

      {/* Two-column layout: text left, image right */}
      <div className="about-split">
        <div className="about-split-text">
          <p className="about-eyebrow">Why Choose Us</p>
          <h2 className="about-heading" style={{ textAlign: 'left' }}>
            Where Every Moment <br /><span className="gold">Becomes a Memory</span>
          </h2>
          <div className="about-divider" style={{ marginLeft: 0 }} />
          <p className="about-split-body">
            From the moment you arrive, our dedicated team ensures every detail is crafted
            to perfection. Whether you seek a romantic coastal escape, a family vacation filled
            with adventure, or a corporate retreat immersed in nature — Landmark Pallavaa is
            your destination of choice.
          </p>
          <ul className="about-features">
            <li><span className="feat-dot" />Direct beach access with private cabanas</li>
            <li><span className="feat-dot" />World-class spa &amp; wellness centre</li>
            <li><span className="feat-dot" />Heritage-inspired architecture &amp; interiors</li>
            <li><span className="feat-dot" />Curated cultural experiences &amp; excursions</li>
            <li><span className="feat-dot" />Sustainable &amp; eco-conscious hospitality</li>
          </ul>
          <a href="#rooms" className="about-cta">Explore Our Rooms</a>
        </div>

        <div className="about-split-img">
          <div className="about-img-frame">
            <img src={portraitImg} alt="Shore Temple, Mahabalipuram" className="about-portrait" />
            <div className="about-img-caption">
              <span className="about-img-caption-stars">★★★★★</span>
              <span className="about-img-caption-text">Shore Temple, Mahabalipuram · UNESCO Heritage Site</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
