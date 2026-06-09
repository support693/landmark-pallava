import { Link } from 'react-router-dom'

import beach1   from '../assets/gallery/Beach.png'
import pool1    from '../assets/gallery/Pool.png'
import room1    from '../assets/gallery/Room.png'
import dining   from '../assets/gallery/Dinning.png'
import resort1  from '../assets/gallery/Resort Veiw.png'
import hall1    from '../assets/gallery/Hall.png'
import beach2   from '../assets/gallery/Beach 2.png'
import statue1  from '../assets/gallery/Statue.png'

import './Gallery.css'

const cells = [
  { label:'Beachfront',      img: beach1,  span:'tall'  },
  { label:'Infinity Pool',   img: pool1,   span:''      },
  { label:'Resort View',     img: resort1, span:''      },
  { label:'Banquet Hall',    img: hall1,   span:'wide'  },
  { label:'Fine Dining',     img: dining,  span:''      },
]

export default function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <div className="gallery-intro">
        <p className="section-eyebrow">Visual Journey</p>
        <h2 className="section-heading">
          Resort <span className="gold">Gallery</span>
        </h2>
        <div className="section-divider" />
        <p className="section-desc">
          A glimpse into the beauty, serenity and grandeur that await you at Landmark Pallavaa.
        </p>
      </div>

      <div className="gallery-mosaic">
        {cells.map((c, i) => (
          <div key={i} className={`gallery-cell ${c.span}`}>
            <img src={c.img} alt={c.label} />
            <div className="gallery-cell-overlay" />
            <span className="gallery-cell-label">{c.label}</span>
          </div>
        ))}
      </div>

      <div className="gallery-cta-row">
        <Link to="/gallery" className="btn-gold-outline">View Full Gallery →</Link>
      </div>
    </section>
  )
}
