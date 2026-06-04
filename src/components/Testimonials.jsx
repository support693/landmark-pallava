import { useState } from 'react'
import './Testimonials.css'

const reviews = [
  {
    name: 'Priya Ramesh',
    location: 'Chennai, India',
    rating: 5,
    text: 'An absolutely magical experience. The ocean view suite was breathtaking and the spa treatment left us completely rejuvenated. The staff anticipated our every need. Will return every anniversary!',
    date: 'March 2025',
    initials: 'PR',
  },
  {
    name: 'Arjun & Meera Nair',
    location: 'Bangalore, India',
    rating: 5,
    text: 'We celebrated our honeymoon here and it exceeded every expectation. The private beach, the food, the warm hospitality — Landmark Pallavaa truly defines luxury. A gem on the Coromandel Coast.',
    date: 'January 2025',
    initials: 'AM',
  },
  {
    name: 'Rajesh Sundaram',
    location: 'Mumbai, India',
    rating: 5,
    text: 'Organised a corporate retreat for 40 people and the event team was outstanding. Seamless execution, exquisite food, and the venue setup was world-class. Our team is still talking about it.',
    date: 'February 2025',
    initials: 'RS',
  },
  {
    name: 'Kavitha Mohan',
    location: 'Hyderabad, India',
    rating: 5,
    text: 'The infinity pool overlooking the sea is worth the stay alone. Rooms are immaculate, service is impeccable, and the sunset view from the restaurant is unlike anything I have seen in India.',
    date: 'April 2025',
    initials: 'KM',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const prev = () => setActive(a => (a - 1 + reviews.length) % reviews.length)
  const next = () => setActive(a => (a + 1) % reviews.length)
  const r = reviews[active]

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-inner">
        <div className="testimonials-left">
          <p className="section-eyebrow" style={{ textAlign: 'left' }}>Guest Experiences</p>
          <h2 className="section-heading" style={{ textAlign: 'left' }}>
            What Our <span className="gold">Guests</span> Say
          </h2>
          <div className="section-divider" style={{ margin: '0 0 28px' }} />
          <p className="testimonials-sub">
            Over 10,000 guests have experienced the magic of Landmark Pallavaa.
            Here is what they say about their stay.
          </p>

          <div className="testi-score">
            <span className="score-num">4.9</span>
            <div className="score-right">
              <div className="stars">{'★'.repeat(5)}</div>
              <span className="score-label">Based on 2,400+ reviews</span>
            </div>
          </div>

          <div className="testi-controls">
            <button className="testi-arrow" onClick={prev}>←</button>
            <span className="testi-count">{active + 1} / {reviews.length}</span>
            <button className="testi-arrow" onClick={next}>→</button>
          </div>
        </div>

        <div className="testimonials-right">
          <div className="testi-card" key={active}>
            <div className="testi-stars">{'★'.repeat(r.rating)}</div>
            <p className="testi-text">"{r.text}"</p>
            <div className="testi-author">
              <div className="author-avatar">{r.initials}</div>
              <div className="author-info">
                <strong>{r.name}</strong>
                <span>{r.location} · {r.date}</span>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="testi-dots">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`testi-dot ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
