import { useState, useEffect } from 'react'
import { Link, useParams, useLocation, Navigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../components/DatePicker.css'
import { rooms } from '../data/rooms'
import { supabase } from '../lib/supabase'
import logoImg from '../assets/logo.jpeg'
import './BookingPage.css'

const STEPS = ['Stay Details', 'Guest Info', 'Confirm & Send']
const WA_NUMBER = '919940040372'

function fmtDate(date) {
  if (!date) return '—'
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function isWeekend(date) {
  if (!date) return false
  const d = date.getDay()
  return d === 0 || d === 5 || d === 6
}

function buildWAMessage({ room, checkIn, checkOut, nights, nightlyRate, subtotal, tax, total, guest, guests }) {
  return `◆ *Booking Request – Landmark Pallavaa*

◆ *Room Details*
Room: ${room.type}
Check-In: ${fmtDate(checkIn)}
Check-Out: ${fmtDate(checkOut)}
Duration: ${nights} Night${nights > 1 ? 's' : ''}
Guests: ${guests}

◆ *Guest Details*
Name: ${guest.firstName} ${guest.lastName}
Phone: ${guest.phone}
Email: ${guest.email}${guest.requests ? `\nRequests: ${guest.requests}` : ''}

◆ *Pricing*
Rate: Rs.${nightlyRate.toLocaleString('en-IN')}/night (${isWeekend(checkIn) ? 'Weekend' : 'Weekday'})
Subtotal: Rs.${subtotal.toLocaleString('en-IN')}
GST (18%): Rs.${tax.toLocaleString('en-IN')}
*Total: Rs.${total.toLocaleString('en-IN')}*

Please confirm this booking. Thank you!`
}

export default function BookingPage() {
  const { slug }   = useParams()
  const location   = useLocation()
  const room       = rooms.find(r => r.slug === slug)
  if (!room) return <Navigate to="/rooms" replace />

  const passedIn  = location.state?.checkIn  ? new Date(location.state.checkIn)  : null
  const passedOut = location.state?.checkOut ? new Date(location.state.checkOut) : null
  const hasPrefilled = !!(passedIn && passedOut)

  const [step, setStep]           = useState(hasPrefilled ? 1 : 0)
  const [dateRange, setDateRange] = useState([passedIn, passedOut])
  const [checkIn, checkOut]       = dateRange
  const [guests, setGuests]       = useState(2)
  const [bookedIntervals, setBookedIntervals] = useState([])
  const [sending, setSending]     = useState(false)
  const [sent, setSent]           = useState(false)
  const [guest, setGuest]         = useState({
    firstName:'', lastName:'', email:'', phone:'',
    address:'', city:'', state:'', pincode:'', requests:'',
  })

  const today = new Date(); today.setHours(0,0,0,0)

  /* ── Fetch booked date intervals from Supabase ── */
  useEffect(() => {
    async function fetchBookings() {
      const { data } = await supabase
        .from('bookings')
        .select('check_in, check_out')
        .eq('room_slug', room.slug)
        .in('status', ['pending', 'confirmed'])
      if (data) {
        setBookedIntervals(data.map(b => ({
          start: new Date(b.check_in),
          end:   new Date(b.check_out),
        })))
      }
    }
    fetchBookings()
  }, [room.slug])

  const nights      = checkIn && checkOut ? Math.max(1, Math.round((checkOut - checkIn) / 86400000)) : 1
  const nightlyRate = isWeekend(checkIn) ? room.priceWeekend : room.priceWeekday
  const subtotal    = nightlyRate * nights
  const tax         = Math.round(subtotal * 0.18)
  const total       = subtotal + tax

  const handleGuest = e => setGuest(g => ({ ...g, [e.target.name]: e.target.value }))
  const step1Valid  = !!(checkIn && checkOut && checkOut > checkIn)
  const step2Valid  = !!(guest.firstName && guest.lastName && guest.email && guest.phone)

  function next() { if (step < 2) setStep(s => s + 1) }
  function back() { if (step > 0) setStep(s => s - 1) }

  /* ── Save booking + open WhatsApp ── */
  async function handleWhatsApp() {
    setSending(true)
    try {
      await supabase.from('bookings').insert({
        room_slug:    room.slug,
        check_in:     checkIn.toISOString().split('T')[0],
        check_out:    checkOut.toISOString().split('T')[0],
        guest_name:   `${guest.firstName} ${guest.lastName}`,
        guest_phone:  guest.phone,
        guest_email:  guest.email,
        guests,
        nights,
        total_amount: total,
        status:       'pending',
      })
    } catch (_) { /* non-blocking */ }

    const msg = buildWAMessage({ room, checkIn, checkOut, nights, nightlyRate, subtotal, tax, total, guest, guests })
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
    setSending(false)
    setSent(true)
  }

  if (sent) return <SentScreen room={room} guest={guest} checkIn={checkIn} checkOut={checkOut} nights={nights} total={total} />

  return (
    <div className="bp-wrapper">
      <nav className="bp-nav">
        <Link to="/"><img src={logoImg} alt="Landmark Pallavaa" className="bp-nav-logo" /></Link>
        <div className="bp-nav-center">
          <Link to="/">Home</Link><span>/</span>
          <Link to="/rooms">Rooms</Link><span>/</span>
          <Link to={`/rooms/${room.slug}`}>{room.type}</Link><span>/</span>
          <span>Book Now</span>
        </div>
        <a href="tel:+919688290594" className="bp-nav-help">&#128222; Need Help?</a>
      </nav>

      <div className="bp-layout">
        <div className="bp-form-col">

          {/* Step indicator */}
          <div className="bp-steps">
            {STEPS.map((s, i) => (
              <div key={s} className={`bp-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                <div className="bp-step-circle">{i < step ? '✓' : i + 1}</div>
                <span>{s}</span>
                {i < STEPS.length - 1 && <div className="bp-step-line" />}
              </div>
            ))}
          </div>

          {/* ── STEP 0: Date Selection ── */}
          {step === 0 && (
            <div className="bp-panel">
              <h2 className="bp-panel-title">Select Your Stay</h2>

              <div className="bp-date-chips">
                <div className={`bp-date-chip${checkIn ? ' set' : ''}`}>
                  <span className="bp-date-chip-label">Check-In</span>
                  <span className="bp-date-chip-val">{fmtDate(checkIn)}</span>
                </div>
                <span className="bp-date-chip-arrow">&#8594;</span>
                <div className={`bp-date-chip${checkOut ? ' set' : ''}`}>
                  <span className="bp-date-chip-label">Check-Out</span>
                  <span className="bp-date-chip-val">{fmtDate(checkOut)}</span>
                </div>
              </div>

              <div className="bp-calendar-wrap">
                <DatePicker
                  selectsRange
                  startDate={checkIn}
                  endDate={checkOut}
                  onChange={update => setDateRange(update)}
                  minDate={today}
                  excludeDateIntervals={bookedIntervals}
                  inline
                  calendarClassName="pallava-calendar"
                  monthsShown={1}
                />
              </div>

              {bookedIntervals.length > 0 && (
                <p className="bp-booked-note">&#9679; Highlighted dates are already booked</p>
              )}

              <div className="bp-field">
                <label>Number of Guests</label>
                <div className="bp-stepper">
                  <button type="button" onClick={() => setGuests(g => Math.max(1, g - 1))}>&#8722;</button>
                  <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                  <button type="button" onClick={() => setGuests(g => Math.min(room.occupancy.adults, g + 1))}>+</button>
                </div>
                <p className="bp-field-note">Max occupancy: {room.occupancy.adults} adults</p>
              </div>

              {step1Valid && (
                <div className="bp-stay-summary">
                  <div className="bp-stay-row"><span>Duration</span><strong>{nights} night{nights > 1 ? 's' : ''}</strong></div>
                  <div className="bp-stay-row"><span>Room</span><strong>{room.type}</strong></div>
                  <div className="bp-stay-row"><span>Rate</span><strong>&#8377;{nightlyRate.toLocaleString('en-IN')}/night ({isWeekend(checkIn) ? 'Weekend' : 'Weekday'})</strong></div>
                </div>
              )}

              <button className="bp-next-btn" disabled={!step1Valid} onClick={next}>
                Continue to Guest Info &#8594;
              </button>
            </div>
          )}

          {/* ── STEP 1: Guest Info ── */}
          {step === 1 && (
            <div className="bp-panel">
              <h2 className="bp-panel-title">Guest Information</h2>

              <div className="bp-dates-banner">
                <span>&#128197; {fmtDate(checkIn)} &#8594; {fmtDate(checkOut)} &nbsp;·&nbsp; {nights} night{nights !== 1 ? 's' : ''}</span>
                {hasPrefilled
                  ? <Link to={`/rooms/${room.slug}`} className="bp-dates-change">Change dates</Link>
                  : <button type="button" className="bp-dates-change" onClick={back}>Change dates</button>
                }
              </div>

              <div className="bp-row">
                <div className="bp-field">
                  <label>First Name *</label>
                  <input name="firstName" value={guest.firstName} onChange={handleGuest} placeholder="Eg. Rajesh" />
                </div>
                <div className="bp-field">
                  <label>Last Name *</label>
                  <input name="lastName" value={guest.lastName} onChange={handleGuest} placeholder="Eg. Kumar" />
                </div>
              </div>
              <div className="bp-row">
                <div className="bp-field">
                  <label>Email Address *</label>
                  <input type="email" name="email" value={guest.email} onChange={handleGuest} placeholder="you@example.com" />
                </div>
                <div className="bp-field">
                  <label>Phone Number *</label>
                  <input type="tel" name="phone" value={guest.phone} onChange={handleGuest} placeholder="+91 98765 43210" />
                </div>
              </div>
              <div className="bp-field">
                <label>Address</label>
                <input name="address" value={guest.address} onChange={handleGuest} placeholder="Street address" />
              </div>
              <div className="bp-row">
                <div className="bp-field"><label>City</label><input name="city" value={guest.city} onChange={handleGuest} placeholder="Chennai" /></div>
                <div className="bp-field"><label>State</label><input name="state" value={guest.state} onChange={handleGuest} placeholder="Tamil Nadu" /></div>
                <div className="bp-field"><label>Pincode</label><input name="pincode" value={guest.pincode} onChange={handleGuest} placeholder="600001" /></div>
              </div>
              <div className="bp-field">
                <label>Special Requests <span className="bp-optional">(optional)</span></label>
                <textarea name="requests" value={guest.requests} onChange={handleGuest}
                  placeholder="Any dietary needs, room preferences, occasion details…" rows={3} />
              </div>

              <div className="bp-btn-row">
                {!hasPrefilled && <button className="bp-back-btn" onClick={back}>&#8592; Back</button>}
                <button className="bp-next-btn" disabled={!step2Valid} onClick={next}>
                  Review &amp; Confirm &#8594;
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Confirm & WhatsApp ── */}
          {step === 2 && (
            <div className="bp-panel">
              <h2 className="bp-panel-title">Confirm Your Booking</h2>

              {/* Booking summary */}
              <div className="bp-confirm-summary">
                <div className="bp-cs-section">
                  <p className="bp-cs-head">&#127968; Room</p>
                  <p className="bp-cs-val">{room.type}</p>
                </div>
                <div className="bp-cs-row">
                  <div className="bp-cs-section">
                    <p className="bp-cs-head">&#128197; Check-In</p>
                    <p className="bp-cs-val">{fmtDate(checkIn)}</p>
                  </div>
                  <div className="bp-cs-section">
                    <p className="bp-cs-head">&#128197; Check-Out</p>
                    <p className="bp-cs-val">{fmtDate(checkOut)}</p>
                  </div>
                  <div className="bp-cs-section">
                    <p className="bp-cs-head">&#127761; Nights</p>
                    <p className="bp-cs-val">{nights}</p>
                  </div>
                  <div className="bp-cs-section">
                    <p className="bp-cs-head">&#128100; Guests</p>
                    <p className="bp-cs-val">{guests}</p>
                  </div>
                </div>
                <div className="bp-cs-divider" />
                <div className="bp-cs-section">
                  <p className="bp-cs-head">&#128100; Guest</p>
                  <p className="bp-cs-val">{guest.firstName} {guest.lastName}</p>
                  <p className="bp-cs-sub">{guest.phone} &nbsp;·&nbsp; {guest.email}</p>
                </div>
                <div className="bp-cs-divider" />
                <div className="bp-cs-price-rows">
                  <div className="bp-cs-price-row"><span>&#8377;{nightlyRate.toLocaleString('en-IN')} &times; {nights} night{nights > 1 ? 's' : ''}</span><span>&#8377;{subtotal.toLocaleString('en-IN')}</span></div>
                  <div className="bp-cs-price-row"><span>GST &amp; Taxes (18%)</span><span>&#8377;{tax.toLocaleString('en-IN')}</span></div>
                  <div className="bp-cs-price-total"><span>Total</span><span>&#8377;{total.toLocaleString('en-IN')}</span></div>
                </div>
              </div>

              <p className="bp-wa-note">
                Clicking the button below will open WhatsApp with your full booking details pre-filled.
                Send the message to confirm your reservation.
              </p>

              <button
                className="bp-wa-btn"
                onClick={handleWhatsApp}
                disabled={sending}
              >
                {sending ? 'Opening WhatsApp…' : '💬 Send Booking Request on WhatsApp'}
              </button>

              <div className="bp-btn-row" style={{ marginTop: 12 }}>
                <button className="bp-back-btn" onClick={back}>&#8592; Edit Details</button>
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Summary panel ── */}
        <aside className="bp-summary">
          <div className="bp-summary-inner">
            <div className="bp-summary-img-wrap">
              <img src={room.images[0]} alt={room.type} className="bp-summary-img" />
            </div>
            <div className="bp-summary-body">
              <h3 className="bp-summary-room">{room.type}</h3>
              <p className="bp-summary-view">{room.view} &nbsp;·&nbsp; {room.size}</p>

              <div className="bp-summary-dates">
                <div className="bp-sdate">
                  <span className="bp-sdate-label">Check-In</span>
                  <span className="bp-sdate-val">{fmtDate(checkIn)}</span>
                </div>
                <div className="bp-sdate-arrow">&#8594;</div>
                <div className="bp-sdate">
                  <span className="bp-sdate-label">Check-Out</span>
                  <span className="bp-sdate-val">{fmtDate(checkOut)}</span>
                </div>
              </div>

              <div className="bp-summary-divider" />

              <div className="bp-price-breakdown">
                <div className="bp-pb-row">
                  <span>&#8377;{nightlyRate.toLocaleString('en-IN')} &times; {nights} night{nights > 1 ? 's' : ''}</span>
                  <span>&#8377;{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="bp-pb-row">
                  <span>GST &amp; Taxes (18%)</span>
                  <span>&#8377;{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="bp-summary-divider" />
                <div className="bp-pb-total">
                  <span>Total Amount</span>
                  <span>&#8377;{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="bp-summary-perks">
                <div className="bp-perk">&#10003; Free cancellation up to 48 hrs</div>
                <div className="bp-perk">&#10003; Best price guaranteed</div>
                <div className="bp-perk">&#10003; Confirmation via WhatsApp</div>
              </div>
            </div>
          </div>
          <div className="bp-help-card">
            <p>Questions? We're here.</p>
            <a href="tel:+919688290594">&#128222; +91 96882 90594</a>
            <a href="https://wa.me/919940040372" target="_blank" rel="noreferrer">&#128172; WhatsApp Us</a>
          </div>
        </aside>
      </div>
    </div>
  )
}

function SentScreen({ room, guest, checkIn, checkOut, nights, total }) {
  return (
    <div className="bp-confirm-wrapper">
      <nav className="bp-nav">
        <Link to="/"><img src={logoImg} alt="Landmark Pallavaa" className="bp-nav-logo" /></Link>
      </nav>
      <div className="bp-confirm-box">
        <div className="bp-confirm-icon">&#128172;</div>
        <h1>Request Sent!</h1>
        <p className="bp-confirm-sub">
          Hi {guest.firstName}! Your booking request has been sent to our team on WhatsApp.
          We'll confirm your reservation shortly.
        </p>
        <div className="bp-confirm-card">
          <div className="bp-confirm-row"><span>Room</span><strong>{room.type}</strong></div>
          <div className="bp-confirm-row"><span>Check-In</span><strong>{fmtDate(checkIn)}</strong></div>
          <div className="bp-confirm-row"><span>Check-Out</span><strong>{fmtDate(checkOut)}</strong></div>
          <div className="bp-confirm-row"><span>Duration</span><strong>{nights} night{nights > 1 ? 's' : ''}</strong></div>
          <div className="bp-confirm-row total"><span>Estimated Total</span><strong>&#8377;{total.toLocaleString('en-IN')}</strong></div>
        </div>
        <div className="bp-confirm-actions">
          <Link to="/" className="bp-confirm-home">Back to Home</Link>
          <a href={`https://wa.me/919940040372`} target="_blank" rel="noreferrer" className="bp-confirm-call">
            &#128172; Open WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
