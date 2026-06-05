import { useState } from 'react'
import { Link } from 'react-router-dom'
import { rooms } from '../data/rooms'
import './Rooms.css'

function RoomSlider({ images }) {
  const [current, setCurrent] = useState(0)

  return (
    <div className="room-slider">
      <img key={current} src={images[current]} alt={`Room view ${current + 1}`} className="room-slider-img" />
      <button type="button" className="room-slider-btn prev" onClick={() => setCurrent(i => (i - 1 + images.length) % images.length)}>&#8249;</button>
      <button type="button" className="room-slider-btn next" onClick={() => setCurrent(i => (i + 1) % images.length)}>&#8250;</button>
      <div className="room-slider-dots">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`room-slider-dot${i === current ? ' active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
      <div className="room-slider-counter">{current + 1} / {images.length}</div>
    </div>
  )
}

export default function Rooms() {
  const room = rooms[0]

  return (
    <section className="rooms" id="rooms">
      <div className="rooms-intro">
        <p className="section-eyebrow">Accommodations</p>
        <h2 className="section-heading">
          Rooms &amp; <span className="gold">Suites</span>
        </h2>
        <div className="section-divider" />
        <p className="section-desc">
          Our thoughtfully appointed Deluxe Family Room offers the perfect blend of comfort, elegance
          and modern amenities — with a lush garden view and generous space for your family.
        </p>
      </div>

      <div className="rooms-single-wrap">
        <div className="room-card-single">
          <span className="room-tag">{room.tag}</span>

          <RoomSlider images={room.images} />

          <div className="room-body">
            <div className="room-meta">
              <span className="room-view">&#127795; {room.view}</span>
              <span className="room-size">&#9632; {room.size}</span>
              <span className="room-size">&#128716; {room.bed}</span>
            </div>

            <h3 className="room-name">{room.type}</h3>
            <p className="room-occupancy">&#128100; 2 Adults &nbsp;·&nbsp; Children below 5 yrs FREE</p>

            <ul className="room-amenities">
              {room.amenities.map(a => (
                <li key={a}>{a}</li>
              ))}
            </ul>

            <div className="room-footer">
              <div className="room-price-block">
                <div className="room-price">
                  <span className="price-label">Weekdays</span>
                  <span className="price-val">&#8377;{room.priceWeekday.toLocaleString('en-IN')}</span>
                  <span className="price-night">+ taxes / night</span>
                </div>
                <div className="room-price">
                  <span className="price-label">Weekends</span>
                  <span className="price-val">&#8377;{room.priceWeekend.toLocaleString('en-IN')}</span>
                  <span className="price-night">+ taxes / night</span>
                </div>
              </div>
              <div className="room-card-actions">
                <Link to={`/rooms/${room.slug}`} className="room-details-btn">View Details</Link>
                <Link to={`/book/${room.slug}`} className="room-book-btn">Book Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
