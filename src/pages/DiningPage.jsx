import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.jpeg'
import './DiningPage.css'

const menuCategories = ['All', 'Breakfast', 'Starters', 'Mains', 'Seafood', 'Desserts', 'Beverages']

const dishes = [
  // Breakfast
  { id:1,  name:'Idli Sambar Platter',      cat:'Breakfast', price:320,  veg:true,  spice:0, desc:'Fluffy steamed rice cakes with aromatic lentil soup, coconut chutney & tomato thokku.',       img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80', tag:'Chef Pick' },
  { id:2,  name:'Masala Dosa',              cat:'Breakfast', price:280,  veg:true,  spice:1, desc:'Crispy rice crêpe filled with spiced potato & served with three house chutneys.',             img:'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&q=80', tag:null },
  { id:3,  name:'Continental Breakfast',    cat:'Breakfast', price:650,  veg:false, spice:0, desc:'Eggs your way, grilled mushrooms, baked beans, toast, seasonal fruits & fresh juice.',        img:'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80', tag:'Popular' },
  { id:4,  name:'Fruit & Granola Bowl',     cat:'Breakfast', price:380,  veg:true,  spice:0, desc:'House-made granola, Greek yogurt, seasonal tropical fruits & wild honey drizzle.',           img:'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&q=80', tag:null },
  // Starters
  { id:5,  name:'Prawn Koliwada',           cat:'Starters',  price:680,  veg:false, spice:2, desc:'Crispy coastal-spiced prawns with curry leaf aioli & pickled onion rings.',                  img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80', tag:'Chef Pick' },
  { id:6,  name:'Paneer Tikka',             cat:'Starters',  price:520,  veg:true,  spice:1, desc:'Hand-pressed cottage cheese marinated in saffron & tandoor-charred to perfection.',          img:'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80', tag:null },
  { id:7,  name:'Crab Cakes',              cat:'Starters',  price:780,  veg:false, spice:1, desc:'Delicate blue swimmer crab cakes, mango salsa, micro herbs & lemon butter sauce.',           img:'https://images.unsplash.com/photo-1559742811-822873691df8?w=400&q=80', tag:'Popular' },
  { id:8,  name:'Mezze Platter',           cat:'Starters',  price:580,  veg:true,  spice:0, desc:'Hummus, baba ganoush, falafel, pita bread & assorted Mediterranean accompaniments.',         img:'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&q=80', tag:null },
  // Mains
  { id:9,  name:'Chettinad Chicken Curry', cat:'Mains',     price:820,  veg:false, spice:3, desc:'Slow-cooked heritage recipe with 26 spices, kalpasi & freshly ground Chettinad masala.',    img:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80', tag:'Heritage' },
  { id:10, name:'Vegetable Biryani',       cat:'Mains',     price:620,  veg:true,  spice:2, desc:'Dum-cooked basmati rice layered with saffron, caramelised onions & seasonal vegetables.',   img:'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80', tag:null },
  { id:11, name:'Lamb Rogan Josh',         cat:'Mains',     price:950,  veg:false, spice:2, desc:'Kashmiri-style slow-braised lamb in aromatic gravy, served with saffron rice.',             img:'https://images.unsplash.com/photo-1545247181-516773cae754?w=400&q=80', tag:'Popular' },
  { id:12, name:'Palak Paneer',            cat:'Mains',     price:560,  veg:true,  spice:1, desc:'Creamed spinach & fresh cottage cheese cooked in a garlic-ginger base, butter-finished.',   img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80', tag:null },
  // Seafood
  { id:13, name:'Tandoori Lobster',        cat:'Seafood',   price:2200, veg:false, spice:2, desc:'Whole Bay of Bengal lobster marinated in coastal spices & grilled in the clay oven.',       img:'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80', tag:'Signature' },
  { id:14, name:'Grilled Sea Bass',        cat:'Seafood',   price:1400, veg:false, spice:1, desc:'Fresh catch of the day with lemon caper butter, seasonal vegetables & herb mash.',          img:'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80', tag:'Fresh Catch' },
  { id:15, name:'Prawn Masala',           cat:'Seafood',   price:980,  veg:false, spice:2, desc:'Jumbo tiger prawns in a rich tomato & coconut milk masala, served with appam.',             img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80', tag:null },
  { id:16, name:'Meen Kuzhambu',          cat:'Seafood',   price:860,  veg:false, spice:3, desc:'Traditional Tamil-style tangy fish curry with tamarind, fenugreek & stone flower.',         img:'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80', tag:'Chef Pick' },
  // Desserts
  { id:17, name:'Gulab Jamun Cheesecake', cat:'Desserts',  price:420,  veg:true,  spice:0, desc:'Silky cheesecake base topped with warm rose-soaked gulab jamun & pistachio crumble.',       img:'https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=400&q=80', tag:'Chef Pick' },
  { id:18, name:'Mango Panna Cotta',      cat:'Desserts',  price:380,  veg:true,  spice:0, desc:'Alphonso mango panna cotta with cardamom gel, dried rose petals & sesame brittle.',         img:'https://images.unsplash.com/photo-1615361200141-f45040f367be?w=400&q=80', tag:'Seasonal' },
  { id:19, name:'Chocolate Fondant',      cat:'Desserts',  price:450,  veg:true,  spice:0, desc:'Warm Belgian dark chocolate fondant with salted caramel ice cream & hazelnut praline.',      img:'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80', tag:'Popular' },
  { id:20, name:'Payasam',               cat:'Desserts',  price:280,  veg:true,  spice:0, desc:'Traditional Kerala rice pudding with coconut milk, jaggery & cashew-raisin tempering.',      img:'https://images.unsplash.com/photo-1601303516534-bf4552785b57?w=400&q=80', tag:'Heritage' },
  // Beverages
  { id:21, name:'Kokum Cooler',           cat:'Beverages', price:220,  veg:true,  spice:0, desc:'Chilled kokum sherbet with sea salt, cumin & fresh mint — the perfect coastal refresher.',  img:'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&q=80', tag:'House Special' },
  { id:22, name:'Masala Chai',            cat:'Beverages', price:160,  veg:true,  spice:1, desc:'Freshly brewed spiced tea with ginger, cardamom, cinnamon & full-cream milk.',              img:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80', tag:null },
  { id:23, name:'Fresh Coconut Water',    cat:'Beverages', price:180,  veg:true,  spice:0, desc:"Chilled tender coconut served fresh from our garden — nature's finest hydration.",          img:'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80', tag:'Fresh' },
  { id:24, name:'Sunrise Mocktail',       cat:'Beverages', price:320,  veg:true,  spice:0, desc:'Layered passion fruit, orange, grenadine & soda — a tropical sunset in a glass.',           img:'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80', tag:'Popular' },
]

function SpiceLevel({ level }) {
  return (
    <div className="dp-spice">
      {[1,2,3].map(i => (
        <span key={i} className={i <= level ? 'hot' : 'mild'}>🌶</span>
      ))}
    </div>
  )
}

/* ── Cart Panel ── */
function CartPanel({ cart, onClose, onAdd, onRemove, onClear, isOpen }) {
  const [roomNo, setRoomNo]       = useState('')
  const [note, setNote]           = useState('')
  const [ordered, setOrdered]     = useState(false)
  const [placing, setPlacing]     = useState(false)
  const [ref, setRef]             = useState('')

  const total     = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const itemCount = cart.reduce((s, i) => s + i.qty, 0)

  function handlePlace() {
    if (!roomNo.trim()) return
    setPlacing(true)
    setTimeout(() => {
      const orderRef = 'LP-' + Date.now().toString().slice(-6)
      const newOrder = {
        ref: orderRef,
        roomNo,
        note,
        items: cart.map(i => ({ id:i.id, name:i.name, img:i.img, price:i.price, qty:i.qty, veg:i.veg })),
        subtotal: total,
        total: Math.round(total * 1.05),
        placedAt: new Date().toISOString(),
        status: 'Preparing',
      }
      const prev = JSON.parse(localStorage.getItem('lp_orders') || '[]')
      localStorage.setItem('lp_orders', JSON.stringify([newOrder, ...prev]))
      setRef(orderRef)
      setPlacing(false)
      setOrdered(true)
    }, 1400)
  }

  if (ordered) return (
    <div className={`dp-cart-panel${isOpen ? ' open' : ''}`}>
      <div className="dp-cart-success">
        <span className="dp-cart-success-icon">✅</span>
        <h3>Order Placed!</h3>
        <p>Your order has been sent to the kitchen.<br />Delivery to <strong>Room {roomNo}</strong> in <strong>30–45 minutes</strong>.</p>
        <p className="dp-cart-ref">Order Ref: {ref}</p>
        <Link to="/my-orders" className="dp-cart-view-orders" onClick={() => { onClear(); onClose(); setOrdered(false); setRoomNo(''); setNote('') }}>
          View My Orders →
        </Link>
        <button className="dp-cart-close-btn" onClick={() => { onClear(); onClose(); setOrdered(false); setRoomNo(''); setNote('') }}>
          Done
        </button>
      </div>
    </div>
  )

  return (
    <div className={`dp-cart-panel${isOpen ? ' open' : ''}`}>
      <div className="dp-cart-header">
        <div>
          <h3 className="dp-cart-title">Room Service Order</h3>
          <p className="dp-cart-sub">{itemCount} item{itemCount !== 1 ? 's' : ''} · ₹{total.toLocaleString('en-IN')}</p>
        </div>
        <button className="dp-cart-x" onClick={onClose}>✕</button>
      </div>

      <div className="dp-cart-body">
        {cart.length === 0 ? (
          <div className="dp-cart-empty">
            <span>🍽️</span>
            <p>Your order is empty.<br />Add dishes from the menu.</p>
          </div>
        ) : (
          <ul className="dp-cart-items">
            {cart.map(item => (
              <li key={item.id} className="dp-cart-item">
                <img src={item.img} alt={item.name} className="dp-cart-item-img" />
                <div className="dp-cart-item-info">
                  <span className="dp-cart-item-name">{item.name}</span>
                  <span className="dp-cart-item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                </div>
                <div className="dp-cart-qty">
                  <button onClick={() => onRemove(item.id)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => onAdd(item)}>+</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <div className="dp-cart-totals">
            <div className="dp-cart-row"><span>Subtotal</span><span>₹{total.toLocaleString('en-IN')}</span></div>
            <div className="dp-cart-row"><span>Service Charge (5%)</span><span>₹{Math.round(total * 0.05).toLocaleString('en-IN')}</span></div>
            <div className="dp-cart-row grand"><span>Total</span><span>₹{Math.round(total * 1.05).toLocaleString('en-IN')}</span></div>
          </div>
        )}

        <div className="dp-cart-form">
          <label className="dp-cart-label">Room Number <span>*</span></label>
          <input
            className="dp-cart-input"
            type="text"
            placeholder="e.g. 204"
            value={roomNo}
            onChange={e => setRoomNo(e.target.value)}
          />
          <label className="dp-cart-label" style={{marginTop:14}}>Special Instructions</label>
          <textarea
            className="dp-cart-textarea"
            placeholder="Allergies, extra spice, no onion…"
            rows={3}
            value={note}
            onChange={e => setNote(e.target.value)}
          />
        </div>
      </div>

      <div className="dp-cart-footer">
        <button
          className="dp-cart-place-btn"
          disabled={cart.length === 0 || !roomNo.trim() || placing}
          onClick={handlePlace}
        >
          {placing ? 'Placing Order…' : `Place Order · ₹${Math.round(total * 1.05).toLocaleString('en-IN')}`}
        </button>
        {cart.length > 0 && (
          <button className="dp-cart-clear" onClick={onClear}>Clear Order</button>
        )}
      </div>
    </div>
  )
}

export default function DiningPage() {
  const [activeCat, setActiveCat]   = useState('All')
  const [cart, setCart]             = useState([])
  const [cartOpen, setCartOpen]     = useState(false)

  const filtered  = dishes.filter(d => activeCat === 'All' || d.cat === activeCat)
  const itemCount = cart.reduce((s, i) => s + i.qty, 0)

  function addToCart(dish) {
    setCart(prev => {
      const existing = prev.find(i => i.id === dish.id)
      if (existing) return prev.map(i => i.id === dish.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...dish, qty: 1 }]
    })
  }

  function removeFromCart(id) {
    setCart(prev => {
      const existing = prev.find(i => i.id === id)
      if (existing?.qty === 1) return prev.filter(i => i.id !== id)
      return prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i)
    })
  }

  function getQty(id) {
    return cart.find(i => i.id === id)?.qty || 0
  }

  return (
    <div className="dp-wrapper">
      {/* Navbar */}
      <nav className="dp-nav">
        <Link to="/"><img src={logoImg} alt="Landmark Pallavaa" className="dp-nav-logo" /></Link>
        <ul className="dp-nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/rooms">Rooms</Link></li>
          <li><a href="#" className="active">Dining</a></li>
          <li><a href="#">Gallery</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <div className="dp-nav-right">
          <Link to="/my-orders" className="dp-myorders-link">My Orders</Link>
          <button className="dp-cart-trigger" onClick={() => setCartOpen(o => !o)}>
            🛒 Order to Room
            {itemCount > 0 && <span className="dp-cart-badge">{itemCount}</span>}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="dp-hero">
        <div className="dp-hero-overlay" />
        <div className="dp-hero-content">
          <p className="dp-eyebrow">Culinary Experiences</p>
          <h1 className="dp-hero-title">Dining at <span className="gold">Landmark Pallavaa</span></h1>
          <p className="dp-hero-sub">Exclusively for our guests — savour authentic coastal cuisine, order to your room, and let every meal be part of your stay.</p>
          <a href="#menu" className="dp-hero-cta">Explore Our Menu ↓</a>
        </div>
        <div className="dp-hero-breadcrumb">
          <Link to="/">Home</Link><span>/</span><span>Dining</span>
        </div>
      </div>

      {/* Restaurant Info Strip */}
      <div className="dp-restaurant-info">
        <div className="dp-ri-item"><span className="dp-ri-icon">🕐</span><div><strong>Dining Hours</strong><p>7:00 AM – 11:00 PM daily</p></div></div>
        <div className="dp-ri-divider" />
        <div className="dp-ri-item"><span className="dp-ri-icon">🛏️</span><div><strong>Room Service</strong><p>Available 24 hours</p></div></div>
        <div className="dp-ri-divider" />
        <div className="dp-ri-item"><span className="dp-ri-icon">👤</span><div><strong>Guests Only</strong><p>Exclusively for resort guests</p></div></div>
        <div className="dp-ri-divider" />
        <div className="dp-ri-item"><span className="dp-ri-icon">🌊</span><div><strong>Setting</strong><p>Beachfront dining, Bay of Bengal</p></div></div>
      </div>

      {/* Room Service Banner */}
      <div className="dp-roomservice-banner">
        <div className="dp-rs-left">
          <span className="dp-rs-icon">🛏️</span>
          <div>
            <h3>In-Room Dining</h3>
            <p>Order from our full menu directly to your room — available 24 hours a day.</p>
          </div>
        </div>
        <button className="dp-rs-btn" onClick={() => { setCartOpen(true); document.getElementById('menu')?.scrollIntoView({ behavior:'smooth' }) }}>
          Order to Room ↓
        </button>
      </div>

      {/* Menu */}
      <section className="dp-menu" id="menu">
        <div className="dp-section-header">
          <p className="dp-eyebrow">What We Serve</p>
          <h2 className="dp-section-title">Our <span className="gold">Menu</span></h2>
          <div className="dp-divider" />
          <p className="dp-section-desc">A curated selection from our signature kitchens. Order directly to your room or reserve a table.</p>
        </div>

        {/* Category Filter */}
        <div className="dp-cat-bar">
          {menuCategories.map(c => (
            <button
              key={c}
              className={`dp-cat-btn ${activeCat === c ? 'active' : ''}`}
              onClick={() => setActiveCat(c)}
            >{c}</button>
          ))}
        </div>

        {/* Dish Grid */}
        <div className="dp-dishes-grid">
          {filtered.map(dish => {
            const qty = getQty(dish.id)
            return (
              <div className="dp-dish-card" key={dish.id}>
                {dish.tag && <span className="dp-dish-tag">{dish.tag}</span>}
                <div className="dp-dish-img-wrap">
                  <img src={dish.img} alt={dish.name} className="dp-dish-img" loading="lazy" />
                </div>
                <div className="dp-dish-body">
                  <div className="dp-dish-top">
                    <h3 className="dp-dish-name">{dish.name}</h3>
                    <span className={`dp-veg-dot ${dish.veg ? 'veg' : 'nonveg'}`} title={dish.veg ? 'Vegetarian' : 'Non-Vegetarian'} />
                  </div>
                  <p className="dp-dish-cat">{dish.cat}</p>
                  <p className="dp-dish-desc">{dish.desc}</p>
                  <div className="dp-dish-footer">
                    <span className="dp-dish-price">₹{dish.price.toLocaleString('en-IN')}</span>
                    {dish.spice > 0 && <SpiceLevel level={dish.spice} />}
                  </div>
                  {/* Add to order */}
                  {qty === 0 ? (
                    <button className="dp-add-btn" onClick={() => { addToCart(dish); setCartOpen(true) }}>
                      + Add to Room Order
                    </button>
                  ) : (
                    <div className="dp-qty-row">
                      <button className="dp-qty-btn" onClick={() => removeFromCart(dish.id)}>−</button>
                      <span className="dp-qty-val">{qty}</span>
                      <button className="dp-qty-btn" onClick={() => addToCart(dish)}>+</button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Dining Experience Strip */}
      <div className="dp-experience-strip">
        {[
          { icon:'👨‍🍳', title:'Master Chefs', desc:'Trained at leading culinary institutes across India & abroad' },
          { icon:'🌿', title:'Farm to Table', desc:'Ingredients sourced fresh daily from local farms & the sea' },
          { icon:'🛏️', title:'24-Hr Room Service', desc:'Full menu delivered to your room at any hour of the day' },
          { icon:'🔒', title:'Guests Exclusive', desc:'Dining is reserved exclusively for our resort guests' },
        ].map(e => (
          <div className="dp-exp-item" key={e.title}>
            <span className="dp-exp-icon">{e.icon}</span>
            <h4 className="dp-exp-title">{e.title}</h4>
            <p className="dp-exp-desc">{e.desc}</p>
          </div>
        ))}
      </div>

      {/* Guest CTA */}
      <div className="dp-reservation-cta">
        <div className="dp-res-inner">
          <div>
            <h2>Hungry? We'll Bring It to You.</h2>
            <p>Our kitchen is open 24 hours. Order directly from this menu or call the front desk — your meal will be at your door in 30–45 minutes.</p>
          </div>
          <div className="dp-res-actions">
            <button className="dp-res-btn-primary" onClick={() => setCartOpen(true)}>🛒 Order to Room</button>
            <a href="tel:+919688290594" className="dp-res-btn-outline">📞 Call Front Desk</a>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="dp-footer-strip">
        <p>© {new Date().getFullYear()} Landmark Pallavaa Beach Resort &amp; Spa. All rights reserved.</p>
        <Link to="/">← Back to Home</Link>
      </div>

      {/* Cart Panel Overlay */}
      {cartOpen && <div className="dp-cart-overlay" onClick={() => setCartOpen(false)} />}
      <CartPanel
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onAdd={addToCart}
        onRemove={removeFromCart}
        onClear={() => setCart([])}
      />

      {/* Floating cart button when cart has items and panel is closed */}
      {itemCount > 0 && !cartOpen && (
        <button className="dp-float-cart" onClick={() => setCartOpen(true)}>
          🛒 <span>{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
          <span className="dp-float-cart-badge">{itemCount}</span>
        </button>
      )}
    </div>
  )
}
