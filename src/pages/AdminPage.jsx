import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import logoImg from '../assets/logo.jpeg'
import './AdminPage.css'

const DEFAULT_PIN = '9688'
const PIN_KEY     = 'pallava_admin_pin'

function getStoredPin() {
  return localStorage.getItem(PIN_KEY) || DEFAULT_PIN
}

const STATUS_LABEL = { pending: 'Pending', confirmed: 'Confirmed', cancelled: 'Released' }
const STATUS_COLOR = { pending: 'amber', confirmed: 'green', cancelled: 'grey' }

function fmtDate(str) {
  if (!str) return '—'
  return new Date(str).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function AdminPage() {
  const [pin, setPin]           = useState('')
  const [pinError, setPinError] = useState(false)
  const [authed, setAuthed]     = useState(false)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading]   = useState(false)
  const [filter, setFilter]     = useState('active')
  const [actionId, setActionId] = useState(null)
  const [toast, setToast]       = useState(null)

  /* ── Reset PIN modal state ── */
  const [showReset, setShowReset]       = useState(false)
  const [resetCurrent, setResetCurrent] = useState('')
  const [resetNew, setResetNew]         = useState('')
  const [resetConfirm, setResetConfirm] = useState('')
  const [resetError, setResetError]     = useState('')

  function handleLogin(e) {
    e.preventDefault()
    if (pin === getStoredPin()) {
      setAuthed(true)
      setPinError(false)
    } else {
      setPinError(true)
      setPin('')
    }
  }

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    let query = supabase
      .from('bookings')
      .select('*')
      .order('check_in', { ascending: true })

    if (filter === 'active') {
      query = query.in('status', ['pending', 'confirmed'])
    }

    const { data } = await query
    setBookings(data || [])
    setLoading(false)
  }, [filter])

  useEffect(() => {
    if (authed) fetchBookings()
  }, [authed, fetchBookings])

  function handleResetPin(e) {
    e.preventDefault()
    setResetError('')
    if (resetCurrent !== getStoredPin()) {
      setResetError('Current PIN is incorrect.')
      return
    }
    if (resetNew.length < 4) {
      setResetError('New PIN must be at least 4 characters.')
      return
    }
    if (resetNew !== resetConfirm) {
      setResetError('New PIN and confirmation do not match.')
      return
    }
    localStorage.setItem(PIN_KEY, resetNew)
    setShowReset(false)
    setResetCurrent(''); setResetNew(''); setResetConfirm('')
    showToast('PIN changed successfully', 'success')
  }

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  async function updateStatus(id, status) {
    setActionId(id)
    const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
    setActionId(null)
    if (error) {
      showToast('Update failed: ' + error.message, 'error')
    } else {
      const label = status === 'cancelled' ? 'Dates released' : status === 'confirmed' ? 'Booking confirmed' : 'Restored'
      showToast(label + ' successfully', 'success')
      fetchBookings()
    }
  }

  /* ── PIN Screen ── */
  if (!authed) {
    return (
      <div className="adm-pin-screen">
        <img src={logoImg} alt="Landmark Pallavaa" className="adm-pin-logo" />
        <div className="adm-pin-box">
          <h2>Admin Access</h2>
          <p>Enter your PIN to manage bookings</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              inputMode="numeric"
              maxLength={10}
              placeholder="Enter PIN"
              value={pin}
              onChange={e => { setPin(e.target.value); setPinError(false) }}
              className={pinError ? 'error' : ''}
              autoFocus
            />
            {pinError && <p className="adm-pin-error">Incorrect PIN. Try again.</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    )
  }

  /* ── Admin Dashboard ── */
  const upcoming  = bookings.filter(b => b.status !== 'cancelled').length
  const pending   = bookings.filter(b => b.status === 'pending').length
  const confirmed = bookings.filter(b => b.status === 'confirmed').length

  return (
    <div className="adm-wrapper">
      {/* Toast notification */}
      {toast && (
        <div className={`adm-toast ${toast.type}`}>{toast.msg}</div>
      )}

      {/* Reset PIN modal */}
      {showReset && (
        <div className="adm-modal-overlay" onClick={() => setShowReset(false)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <h3>Reset PIN</h3>
            <p>Enter your current PIN and choose a new one.</p>
            <form onSubmit={handleResetPin}>
              <div className="adm-modal-field">
                <label>Current PIN</label>
                <input
                  type="password"
                  inputMode="numeric"
                  placeholder="Current PIN"
                  value={resetCurrent}
                  onChange={e => { setResetCurrent(e.target.value); setResetError('') }}
                  autoFocus
                />
              </div>
              <div className="adm-modal-field">
                <label>New PIN</label>
                <input
                  type="password"
                  inputMode="numeric"
                  placeholder="New PIN (min 4 digits)"
                  value={resetNew}
                  onChange={e => { setResetNew(e.target.value); setResetError('') }}
                />
              </div>
              <div className="adm-modal-field">
                <label>Confirm New PIN</label>
                <input
                  type="password"
                  inputMode="numeric"
                  placeholder="Re-enter new PIN"
                  value={resetConfirm}
                  onChange={e => { setResetConfirm(e.target.value); setResetError('') }}
                />
              </div>
              {resetError && <p className="adm-modal-error">{resetError}</p>}
              <div className="adm-modal-actions">
                <button type="button" className="adm-modal-cancel" onClick={() => { setShowReset(false); setResetError('') }}>Cancel</button>
                <button type="submit" className="adm-modal-save">Save New PIN</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <nav className="adm-nav">
        <img src={logoImg} alt="Landmark Pallavaa" className="adm-nav-logo" />
        <span className="adm-nav-title">Booking Manager</span>
        <button className="adm-reset-pin" onClick={() => setShowReset(true)}>&#128273; Reset PIN</button>
        <button className="adm-logout" onClick={() => setAuthed(false)}>Logout</button>
      </nav>

      {/* Stats */}
      <div className="adm-stats">
        <div className="adm-stat">
          <span className="adm-stat-num">{upcoming}</span>
          <span className="adm-stat-label">Upcoming</span>
        </div>
        <div className="adm-stat amber">
          <span className="adm-stat-num">{pending}</span>
          <span className="adm-stat-label">Pending</span>
        </div>
        <div className="adm-stat green">
          <span className="adm-stat-num">{confirmed}</span>
          <span className="adm-stat-label">Confirmed</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="adm-tabs">
        <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>
          Active Bookings
        </button>
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          All Bookings
        </button>
        <button className="adm-refresh" onClick={fetchBookings} title="Refresh">&#8635;</button>
      </div>

      {/* Booking list */}
      <div className="adm-list">
        {loading && <p className="adm-empty">Loading…</p>}
        {!loading && bookings.length === 0 && (
          <p className="adm-empty">No bookings found.</p>
        )}

        {bookings.map(b => (
          <div key={b.id} className={`adm-card ${b.status}`}>
            {/* Status badge */}
            <span className={`adm-badge ${STATUS_COLOR[b.status]}`}>
              {STATUS_LABEL[b.status]}
            </span>

            {/* Dates row */}
            <div className="adm-card-dates">
              <div className="adm-date-block">
                <span className="adm-date-label">Check-In</span>
                <span className="adm-date-val">{fmtDate(b.check_in)}</span>
              </div>
              <span className="adm-date-arrow">&#8594;</span>
              <div className="adm-date-block">
                <span className="adm-date-label">Check-Out</span>
                <span className="adm-date-val">{fmtDate(b.check_out)}</span>
              </div>
              <div className="adm-date-block">
                <span className="adm-date-label">Nights</span>
                <span className="adm-date-val">{b.nights}</span>
              </div>
              <div className="adm-date-block">
                <span className="adm-date-label">Guests</span>
                <span className="adm-date-val">{b.guests}</span>
              </div>
            </div>

            {/* Guest info */}
            <div className="adm-card-guest">
              <span className="adm-guest-name">{b.guest_name}</span>
              <a href={`tel:${b.guest_phone}`} className="adm-guest-phone">{b.guest_phone}</a>
              <a href={`mailto:${b.guest_email}`} className="adm-guest-email">{b.guest_email}</a>
            </div>

            {/* Amount */}
            <div className="adm-card-amount">
              &#8377;{b.total_amount.toLocaleString('en-IN')}
              <span className="adm-amount-note">est. total</span>
            </div>

            {/* Actions */}
            <div className="adm-card-actions">
              {b.status === 'pending' && (
                <button
                  className="adm-btn confirm"
                  disabled={actionId === b.id}
                  onClick={() => updateStatus(b.id, 'confirmed')}
                >
                  {actionId === b.id ? '…' : '✓ Confirm'}
                </button>
              )}
              {b.status !== 'cancelled' && (
                <button
                  className="adm-btn release"
                  disabled={actionId === b.id}
                  onClick={() => {
                    if (window.confirm(`Release dates for ${b.guest_name}?\nThis will unblock ${fmtDate(b.check_in)} – ${fmtDate(b.check_out)} for new bookings.`)) {
                      updateStatus(b.id, 'cancelled')
                    }
                  }}
                >
                  {actionId === b.id ? '…' : '✕ Release Dates'}
                </button>
              )}
              {b.status === 'cancelled' && (
                <button
                  className="adm-btn restore"
                  disabled={actionId === b.id}
                  onClick={() => updateStatus(b.id, 'pending')}
                >
                  {actionId === b.id ? '…' : '↺ Restore'}
                </button>
              )}
            </div>

            {/* Booked at */}
            <p className="adm-card-time">
              Requested: {new Date(b.created_at).toLocaleString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
