import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { rooms } from '../data/rooms'
import logoImg from '../assets/logo.jpeg'
import './RoomDetailPage.css'

function RoomSlider({ images }) {
  const [current, setCurrent] = useState(0)
  return (
    <div className="rd-slider">
      <img key={current} src={images[current]} alt={`Room view ${current + 1}`} className="rd-slider-img" />
      <button type="button" className="rd-slider-btn prev" onClick={() => setCurrent(i => (i - 1 + images.length) % images.length)}>&#8249;</button>
      <button type="button" className="rd-slider-btn next" onClick={() => setCurrent(i => (i + 1) % images.length)}>&#8250;</button>
      <div className="rd-slider-dots">
        {images.map((_, i) => (
          <button key={i} type="button" className={`rd-slider-dot${i === current ? ' active' : ''}`} onClick={() => setCurrent(i)} />
        ))}
      </div>
      <div className="rd-slider-counter">{current + 1} / {images.length}</div>
    </div>
  )
}

export default function RoomDetailPage() {
  const { slug } = useParams()
  const room = rooms.find(r => r.slug === slug)
  if (!room) return <Navigate to="/rooms" replace />

  return (
    <div className="rd-wrapper">
      {/* Navbar */}
      <nav className="rd-nav">
        <Link to="/"><img src={logoImg} alt="Landmark Pallavaa" className="rd-nav-logo" /></Link>
        <ul className="rd-nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/rooms" className="active">Rooms</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
        <a href="/#booking" className="rd-book-btn">Book Now</a>
      </nav>

      {/* Breadcrumb */}
      <div className="rd-breadcrumb">
        <Link to="/">Home</Link><span>/</span>
        <Link to="/rooms">Rooms &amp; Suites</Link><span>/</span>
        <span>{room.type}</span>
      </div>

      {/* Two-column content */}
      <div className="rd-content-wrap">

        {/* ── LEFT: slider + booking ── */}
        <div className="rd-left">

          <RoomSlider images={room.images} />

          {/* Booking box */}
          <div className="rd-booking-box">
            <h3 className="rd-box-title">Reserve This Room</h3>

            <div className="rd-box-prices">
              <div className="rd-box-price-row">
                <span className="rd-box-price-label">Weekdays</span>
                <span className="rd-box-price-val">&#8377;{room.priceWeekday.toLocaleString('en-IN')}</span>
                <span className="rd-box-price-tax">+ taxes / night</span>
              </div>
              <div className="rd-box-price-row">
                <span className="rd-box-price-label">Weekends</span>
                <span className="rd-box-price-val weekend">&#8377;{room.priceWeekend.toLocaleString('en-IN')}</span>
                <span className="rd-box-price-tax">+ taxes / night</span>
              </div>
            </div>

            <div className="rd-box-divider" />

            <Link to={`/book/${room.slug}`} className="rd-reserve-btn">
              Book Now
            </Link>

            <div className="rd-panel-perks">
              <span>&#10003; Free cancellation</span>
              <span>&#10003; Best rate guaranteed</span>
              <span>&#10003; Instant confirmation</span>
            </div>
          </div>

          {/* Contact */}
          <div className="rd-contact-card">
            <p>Need assistance?</p>
            <a href="tel:+919688290594">&#128222; +91 96882 90594</a>
            <a href="https://wa.me/919688290594" target="_blank" rel="noreferrer">&#128172; WhatsApp</a>
          </div>
        </div>

        {/* ── RIGHT: room details ── */}
        <div className="rd-right">

          <p className="rd-category">{room.category}</p>
          <h1 className="rd-title">{room.type}</h1>

          <div className="rd-quick-facts">
            <span>&#128196; {room.size}</span>
            <span>&#127795; {room.view}</span>
            <span>&#128716; {room.bed}</span>
            <span>&#128100; Max {room.occupancy.adults} Adults</span>
          </div>

          <div className="rd-badges">
            {room.badges.map(b => <span key={b} className="rd-badge">{b}</span>)}
          </div>

          <div className="rd-divider" />

          <section className="rd-section">
            <h2 className="rd-section-title">About This Room</h2>
            <p className="rd-desc">{room.longDesc}</p>
          </section>

          <section className="rd-section">
            <h2 className="rd-section-title">Room Highlights</h2>
            <ul className="rd-highlights">
              {room.highlights.map(h => (
                <li key={h}><span className="rd-check">&#10003;</span>{h}</li>
              ))}
            </ul>
          </section>

          <section className="rd-section">
            <h2 className="rd-section-title">Amenities &amp; Features</h2>
            <div className="rd-amenities-grid">
              {room.amenities.map(a => (
                <div className="rd-amenity" key={a}>
                  <span className="rd-amenity-dot" />{a}
                </div>
              ))}
            </div>
          </section>

          <section className="rd-section">
            <h2 className="rd-section-title">Policies</h2>
            <div className="rd-policies">
              <div className="rd-policy">
                <span className="rd-policy-label">Check-In</span>
                <span className="rd-policy-val">{room.policies.checkIn}</span>
              </div>
              <div className="rd-policy">
                <span className="rd-policy-label">Check-Out</span>
                <span className="rd-policy-val">{room.policies.checkOut}</span>
              </div>
              <div className="rd-policy full">
                <span className="rd-policy-label">Cancellation</span>
                <span className="rd-policy-val">{room.policies.cancellation}</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer strip */}
      <div className="rd-footer-strip">
        <p>&#169; {new Date().getFullYear()} Landmark Pallavaa Beach Resort &amp; Spa</p>
        <Link to="/rooms">&#8592; All Rooms</Link>
      </div>
    </div>
  )
}
