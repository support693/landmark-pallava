import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import heroImg from '../assets/hero.png'
import logoImg from '../assets/logo.jpeg'
import { supabase } from '../lib/supabase'
import './Hero.css'
import './DatePicker.css'

const ROOM_SLUG = 'deluxe-family-room'

export default function Hero() {
  const navigate = useNavigate()
  const [checkIn, setCheckIn]   = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [guests, setGuests]     = useState(2)
  const [bookedIntervals, setBookedIntervals] = useState([])
  const [error, setError]       = useState('')

  /* Fetch blocked date intervals */
  useEffect(() => {
    async function fetchBlocked() {
      const { data } = await supabase
        .from('bookings')
        .select('check_in, check_out')
        .eq('room_slug', ROOM_SLUG)
        .in('status', ['pending', 'confirmed'])
      if (data) {
        setBookedIntervals(data.map(b => ({
          start: new Date(b.check_in),
          end:   new Date(b.check_out),
        })))
      }
    }
    fetchBlocked()
  }, [])

  const decGuests = () => setGuests(g => Math.max(1, g - 1))
  const incGuests = () => setGuests(g => Math.min(20, g + 1))

  function handleCheckAvailability() {
    if (!checkIn || !checkOut) {
      setError('Please select both check-in and check-out dates.')
      return
    }
    setError('')
    navigate(`/book/${ROOM_SLUG}`, {
      state: {
        checkIn:  checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
      }
    })
  }

  return (
    <div className="hero-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">
          <img src={logoImg} alt="Landmark Pallava Logo" className="nav-logo-img" />
        </div>
        <ul className="nav-links">
          <li><Link to="/rooms">Rooms</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#booking" className="nav-book-btn">Book Now</a>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <img src={heroImg} alt="Landmark Pallava Beach Resort" className="hero-img" />
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">Welcome to</p>
          <h1 className="hero-title">
            <span className="hero-title-gold">Landmark</span>{' '}
            <span className="hero-title-navy">Pallavaa</span>
          </h1>
          <p className="hero-subtitle">BEACH RESORT &amp; SPA</p>
          <p className="hero-tagline">
            Where the ocean meets luxury — experience serenity, elegance,<br />
            and world-class hospitality on the shores of Mahabalipuram.
          </p>

          <div className="hero-cta-group">
            <Link to="/rooms" className="btn-primary">Reserve Your Stay</Link>
            <Link to="/gallery" className="btn-outline">Explore Resort</Link>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">72+</span>
              <span className="stat-label">Luxury Rooms</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">5★</span>
              <span className="stat-label">Beach Resort</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">24/7</span>
              <span className="stat-label">Concierge</span>
            </div>
          </div>
        </div>

        {/* Booking Widget */}
        <div className="booking-widget" id="booking">
          <div className="widget-field">
            <label>Check-In</label>
            <DatePicker
              selected={checkIn}
              onChange={date => { setCheckIn(date); setCheckOut(null); setError('') }}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={new Date()}
              excludeDateIntervals={bookedIntervals}
              placeholderText="Select date"
              dateFormat="dd MMM yyyy"
              calendarClassName="pallava-calendar"
              popperPlacement="top"
            />
          </div>
          <div className="widget-divider" />
          <div className="widget-field">
            <label>Check-Out</label>
            <DatePicker
              selected={checkOut}
              onChange={date => { setCheckOut(date); setError('') }}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn ? new Date(checkIn.getTime() + 86400000) : new Date()}
              excludeDateIntervals={bookedIntervals}
              placeholderText="Select date"
              dateFormat="dd MMM yyyy"
              calendarClassName="pallava-calendar"
              popperPlacement="top"
            />
          </div>
          <div className="widget-divider" />
          <div className="widget-field">
            <label>Guests</label>
            <div className="guest-stepper">
              <button className="stepper-btn" onClick={decGuests} type="button">−</button>
              <span className="stepper-val">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
              <button className="stepper-btn" onClick={incGuests} type="button">+</button>
            </div>
          </div>
          <div className="widget-check-wrap">
            <button className="widget-btn" onClick={handleCheckAvailability}>
              Check Availability
            </button>
            {error && <p className="widget-error">{error}</p>}
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll to discover</span>
          <div className="scroll-line" />
        </div>
      </section>
    </div>
  )
}
