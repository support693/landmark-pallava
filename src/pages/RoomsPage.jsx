import { useState } from 'react'
import { Link } from 'react-router-dom'
import { rooms } from '../data/rooms'
import logoImg from '../assets/logo.jpeg'
import './RoomsPage.css'

function RoomSlider({ images }) {
  const [current, setCurrent] = useState(0)
  return (
    <div className="rp-slider">
      <img key={current} src={images[current]} alt={`Room view ${current + 1}`} className="rp-slider-img" />
      <button type="button" className="rp-slider-btn prev" onClick={() => setCurrent(i => (i - 1 + images.length) % images.length)}>&#8249;</button>
      <button type="button" className="rp-slider-btn next" onClick={() => setCurrent(i => (i + 1) % images.length)}>&#8250;</button>
      <div className="rp-slider-dots">
        {images.map((_, i) => (
          <button key={i} type="button" className={`rp-slider-dot${i === current ? ' active' : ''}`} onClick={() => setCurrent(i)} />
        ))}
      </div>
      <div className="rp-slider-count">{current + 1} / {images.length}</div>
    </div>
  )
}

export default function RoomsPage() {
  const room = rooms[0]

  return (
    <div className="rp-wrapper">
      {/* Navbar */}
      <nav className="rp-nav">
        <Link to="/">
          <img src={logoImg} alt="Landmark Pallavaa" className="rp-nav-logo" />
        </Link>
        <ul className="rp-nav-links">
          <li><Link to="/">Home</Link></li>
          <li><a href="#" className="active">Rooms</a></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
        <a href="/#booking" className="rp-book-btn">Book Now</a>
      </nav>

      {/* Page Hero */}
      <div className="rp-hero">
        <div className="rp-hero-overlay" />
        <div className="rp-hero-content">
          <p className="rp-eyebrow">Accommodations</p>
          <h1 className="rp-hero-title">Rooms &amp; <span className="gold">Suites</span></h1>
          <p className="rp-hero-sub">
            Our thoughtfully designed Deluxe Family Room — a sanctuary of comfort, style and lush garden views.
          </p>
        </div>
        <div className="rp-hero-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Rooms &amp; Suites</span>
        </div>
      </div>

      {/* Room Card */}
      <div className="rp-single-wrap">
        <div className="rp-card rp-card-single">
          <span className="rp-tag">{room.tag}</span>

          <RoomSlider images={room.images} />

          <div className="rp-card-body">
            <div className="rp-card-meta">
              <span>&#128196; {room.size}</span>
              <span>&#127795; {room.view}</span>
              <span>&#128100; Max {room.occupancy.adults} Adults</span>
              <span>&#128716; {room.bed}</span>
            </div>

            <h2 className="rp-card-title">{room.type}</h2>
            <p className="rp-card-floor">{room.floor}</p>
            <p className="rp-card-desc">{room.shortDesc}</p>

            {/* Badges */}
            <div className="rp-badges">
              {room.badges.map(b => (
                <span key={b} className="rp-badge">{b}</span>
              ))}
            </div>

            {/* Amenities */}
            <div className="rp-card-amenities">
              {room.amenities.map(a => (
                <span key={a} className="rp-amenity-chip">{a}</span>
              ))}
            </div>

            <div className="rp-card-footer">
              <div className="rp-price-block">
                <div className="rp-price-item">
                  <span className="rp-price-label">Weekdays</span>
                  <span className="rp-price">&#8377;{room.priceWeekday.toLocaleString('en-IN')}</span>
                  <span className="rp-price-night">+ taxes / night</span>
                </div>
                <div className="rp-price-item">
                  <span className="rp-price-label">Weekends</span>
                  <span className="rp-price">&#8377;{room.priceWeekend.toLocaleString('en-IN')}</span>
                  <span className="rp-price-night">+ taxes / night</span>
                </div>
              </div>
              <div className="rp-card-actions">
                <Link to={`/rooms/${room.slug}`} className="rp-btn-details">View Details</Link>
                <Link to={`/book/${room.slug}`} className="rp-btn-book">Book Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rp-bottom-cta">
        <div className="rp-bottom-cta-inner">
          <h3>Ready to book your stay?</h3>
          <p>Our reservations team is happy to help you with any questions.</p>
          <div className="rp-cta-btns">
            <a href="tel:+919688290594" className="rp-cta-call">&#128222; Call Us</a>
            <a href="https://wa.me/919688290594" className="rp-cta-wa" target="_blank" rel="noreferrer">&#128172; WhatsApp</a>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="rp-footer-strip">
        <p>© {new Date().getFullYear()} Landmark Pallavaa Beach Resort &amp; Spa. All rights reserved.</p>
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  )
}
