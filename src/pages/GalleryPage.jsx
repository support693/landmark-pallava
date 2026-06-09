import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.jpeg'

import beach1   from '../assets/gallery/Beach.png'
import beach2   from '../assets/gallery/Beach 2.png'
import dining   from '../assets/gallery/Dinning.png'
import event    from '../assets/gallery/Event.png'
import ground   from '../assets/gallery/Ground.png'
import hall1    from '../assets/gallery/Hall.png'
import hall2    from '../assets/gallery/Hall 2.png'
import kidsPlay from '../assets/gallery/Kids Play.png'
import lawn2    from '../assets/gallery/Lawn 2.png'
import lawn3    from '../assets/gallery/Lawn 3.png'
import parking  from '../assets/gallery/Parking with Play Area.png'
import playArea from '../assets/gallery/Playing area.png'
import pool1    from '../assets/gallery/Pool.png'
import pool2    from '../assets/gallery/Pool 2.png'
import resort1  from '../assets/gallery/Resort Veiw.png'
import resort2  from '../assets/gallery/Resort Veiw 2.png'
import room1    from '../assets/gallery/Room.png'
import room2    from '../assets/gallery/Room 2.png'
import statue1  from '../assets/gallery/Statue.png'
import statue2  from '../assets/gallery/Staute 2.png'
import statue3  from '../assets/gallery/Staute 3.png'
import walkSpace from '../assets/gallery/Wlak Space.png'

import './GalleryPage.css'

const categories = ['All', 'Beach', 'Pool', 'Rooms', 'Dining', 'Events', 'Grounds', 'Heritage']

const photos = [
  { id:1,  src:resort1,  cat:'Grounds',  title:'Resort Overview',          span:'wide' },
  { id:2,  src:beach1,   cat:'Beach',    title:'Beachfront',                span:'' },
  { id:3,  src:pool1,    cat:'Pool',     title:'Infinity Pool',             span:'' },
  { id:4,  src:beach2,   cat:'Beach',    title:'Beach at Dusk',             span:'' },
  { id:5,  src:room1,    cat:'Rooms',    title:'Deluxe Room',               span:'' },
  { id:6,  src:dining,   cat:'Dining',   title:'Restaurant',                span:'wide' },
  { id:7,  src:pool2,    cat:'Pool',     title:'Pool Deck',                 span:'' },
  { id:8,  src:room2,    cat:'Rooms',    title:'Suite Interior',            span:'' },
  { id:10, src:hall1,    cat:'Events',   title:'Banquet Hall',              span:'wide' },
  { id:11, src:event,    cat:'Events',   title:'Event Setup',               span:'' },
  { id:12, src:hall2,    cat:'Events',   title:'Conference Hall',           span:'' },
  { id:13, src:statue1,  cat:'Heritage', title:'Pallava Heritage Statue',   span:'' },
  { id:14, src:lawn2,    cat:'Grounds',  title:'Lawn View',                 span:'' },
  { id:15, src:ground,   cat:'Grounds',  title:'Resort Grounds',            span:'wide' },
  { id:16, src:statue2,  cat:'Heritage', title:'Heritage Sculpture',        span:'' },
  { id:17, src:statue3,  cat:'Heritage', title:'Stone Carving',             span:'' },
  { id:18, src:kidsPlay, cat:'Grounds',  title:"Children's Play Area",      span:'' },
  { id:19, src:playArea, cat:'Grounds',  title:'Outdoor Play Zone',         span:'' },
  { id:20, src:parking,  cat:'Grounds',  title:'Parking & Play Area',       span:'wide' },
  { id:21, src:lawn3,    cat:'Grounds',  title:'Manicured Gardens',         span:'' },
  { id:22, src:walkSpace,cat:'Grounds',  title:'Walking Promenade',         span:'' },
  { id:23, src:resort2,  cat:'Grounds',  title:'Aerial Resort View',        span:'' },
]

export default function GalleryPage() {
  const [activeCat, setActiveCat] = useState('All')
  const [lightbox, setLightbox]   = useState(null) // index into filtered array

  const filtered = photos.filter(p => activeCat === 'All' || p.cat === activeCat)

  function openLightbox(idx) { setLightbox(idx) }
  function closeLightbox()   { setLightbox(null) }
  function prev() { setLightbox(i => (i - 1 + filtered.length) % filtered.length) }
  function next() { setLightbox(i => (i + 1) % filtered.length) }

  function handleKey(e) {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft')  prev()
    if (e.key === 'Escape')     closeLightbox()
  }

  return (
    <div className="gp-wrapper" onKeyDown={handleKey} tabIndex={-1}>

      {/* Navbar */}
      <nav className="gp-nav">
        <Link to="/"><img src={logoImg} alt="Landmark Pallavaa" className="gp-nav-logo" /></Link>
        <ul className="gp-nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/rooms">Rooms</Link></li>
          <li><a className="active">Gallery</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
        <a href="tel:+919940040372" className="gp-book-btn">📞 Book Now</a>
      </nav>

      {/* Hero */}
      <div className="gp-hero">
        <div className="gp-hero-overlay" />
        <div className="gp-hero-content">
          <p className="gp-eyebrow">Photo Gallery</p>
          <h1 className="gp-hero-title">A Glimpse of <span className="gold">Landmark Pallavaa</span></h1>
          <div className="gp-divider" />
          <p className="gp-hero-sub">Explore the beauty of our beachfront resort — from the infinity pool to heritage sculptures and lush gardens.</p>
        </div>
        <div className="gp-breadcrumb">
          <Link to="/">Home</Link><span>/</span><span>Gallery</span>
        </div>
      </div>

      {/* Filter bar */}
      <div className="gp-filter-bar">
        {categories.map(c => (
          <button
            key={c}
            className={`gp-filter-btn ${activeCat === c ? 'active' : ''}`}
            onClick={() => setActiveCat(c)}
          >{c}</button>
        ))}
      </div>

      {/* Count */}
      <div className="gp-count">
        {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
        {activeCat !== 'All' && ` · ${activeCat}`}
      </div>

      {/* Masonry grid */}
      <div className="gp-grid">
        {filtered.map((photo, idx) => (
          <div
            key={photo.id}
            className={`gp-tile ${photo.span}`}
            onClick={() => openLightbox(idx)}
          >
            <img src={photo.src} alt={photo.title} loading="lazy" />
            <div className="gp-tile-overlay">
              <div className="gp-tile-info">
                <span className="gp-tile-cat">{photo.cat}</span>
                <h3 className="gp-tile-title">{photo.title}</h3>
              </div>
              <span className="gp-tile-zoom">⊕</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="gp-lightbox" onClick={closeLightbox}>
          <button className="gp-lb-close" onClick={closeLightbox}>✕</button>
          <button className="gp-lb-prev" onClick={e => { e.stopPropagation(); prev() }}>‹</button>
          <div className="gp-lb-img-wrap" onClick={e => e.stopPropagation()}>
            <img src={filtered[lightbox].src} alt={filtered[lightbox].title} />
            <div className="gp-lb-caption">
              <span className="gp-lb-cat">{filtered[lightbox].cat}</span>
              <span className="gp-lb-title">{filtered[lightbox].title}</span>
              <span className="gp-lb-counter">{lightbox + 1} / {filtered.length}</span>
            </div>
          </div>
          <button className="gp-lb-next" onClick={e => { e.stopPropagation(); next() }}>›</button>
        </div>
      )}

      {/* Footer */}
      <div className="gp-footer">
        <p>© {new Date().getFullYear()} Landmark Pallavaa Beach Resort &amp; Spa. All rights reserved.</p>
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  )
}
