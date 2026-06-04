import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.jpeg'
import './MyOrdersPage.css'

const STATUS_STEPS = ['Order Placed', 'Preparing', 'On the Way', 'Delivered']

function statusIndex(status) {
  const i = STATUS_STEPS.indexOf(status)
  return i === -1 ? 1 : i
}

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000)
  if (diff < 60)  return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`
  return new Date(iso).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('lp_orders') || '[]')
    // Auto-advance status based on elapsed time for demo realism
    const updated = stored.map(o => {
      const mins = (Date.now() - new Date(o.placedAt)) / 60000
      let status = 'Order Placed'
      if (mins >= 2)  status = 'Preparing'
      if (mins >= 20) status = 'On the Way'
      if (mins >= 35) status = 'Delivered'
      return { ...o, status }
    })
    setOrders(updated)
  }, [])

  function clearAll() {
    localStorage.removeItem('lp_orders')
    setOrders([])
  }

  return (
    <div className="mo-wrapper">
      {/* Navbar */}
      <nav className="mo-nav">
        <Link to="/"><img src={logoImg} alt="Landmark Pallavaa" className="mo-nav-logo" /></Link>
        <ul className="mo-nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/rooms">Rooms</Link></li>
          <li><Link to="/dining">Dining</Link></li>
        </ul>
        <Link to="/dining" className="mo-back-btn">← Back to Menu</Link>
      </nav>

      {/* Header */}
      <div className="mo-header">
        <div className="mo-header-inner">
          <p className="mo-eyebrow">Room Service</p>
          <h1 className="mo-title">My <span className="gold">Orders</span></h1>
          <div className="mo-divider" />
          <p className="mo-sub">Track all your in-room dining orders below.</p>
        </div>
      </div>

      {/* Content */}
      <div className="mo-content">
        {orders.length === 0 ? (
          <div className="mo-empty">
            <span>🍽️</span>
            <h3>No orders yet</h3>
            <p>Browse our menu and order your favourite dishes to your room.</p>
            <Link to="/dining" className="mo-browse-btn">Browse Menu</Link>
          </div>
        ) : (
          <>
            <div className="mo-list">
              {orders.map(order => (
                <div className="mo-card" key={order.ref}>
                  {/* Order Header */}
                  <div className="mo-card-head">
                    <div>
                      <span className="mo-ref">{order.ref}</span>
                      <span className="mo-time">{timeAgo(order.placedAt)}</span>
                    </div>
                    <div className="mo-room-badge">Room {order.roomNo}</div>
                  </div>

                  {/* Progress tracker */}
                  <div className="mo-progress">
                    {STATUS_STEPS.map((step, i) => {
                      const si = statusIndex(order.status)
                      const done    = i <= si
                      const current = i === si
                      return (
                        <div className="mo-step" key={step}>
                          <div className={`mo-step-dot ${done ? 'done' : ''} ${current ? 'current' : ''}`}>
                            {done && i < si ? '✓' : i + 1}
                          </div>
                          <span className={`mo-step-label ${current ? 'active' : ''}`}>{step}</span>
                          {i < STATUS_STEPS.length - 1 && (
                            <div className={`mo-step-line ${i < si ? 'done' : ''}`} />
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Items */}
                  <ul className="mo-items">
                    {order.items.map(item => (
                      <li key={item.id} className="mo-item">
                        <img src={item.img} alt={item.name} className="mo-item-img" />
                        <div className="mo-item-info">
                          <div className="mo-item-name-row">
                            <span className={`mo-veg-dot ${item.veg ? 'veg' : 'nonveg'}`} />
                            <span className="mo-item-name">{item.name}</span>
                          </div>
                          <span className="mo-item-qty">× {item.qty}</span>
                        </div>
                        <span className="mo-item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Totals */}
                  <div className="mo-totals">
                    <div className="mo-total-row"><span>Subtotal</span><span>₹{order.subtotal.toLocaleString('en-IN')}</span></div>
                    <div className="mo-total-row"><span>Service Charge (5%)</span><span>₹{(order.total - order.subtotal).toLocaleString('en-IN')}</span></div>
                    <div className="mo-total-row grand"><span>Total Paid</span><span>₹{order.total.toLocaleString('en-IN')}</span></div>
                  </div>

                  {/* Note */}
                  {order.note && (
                    <div className="mo-note">
                      <span>📝</span> {order.note}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mo-clear-row">
              <button className="mo-clear-btn" onClick={clearAll}>Clear Order History</button>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="mo-footer">
        <p>© {new Date().getFullYear()} Landmark Pallavaa Beach Resort &amp; Spa. All rights reserved.</p>
        <a href="tel:+919688290594">📞 Front Desk: +91 96882 90594</a>
      </div>
    </div>
  )
}
