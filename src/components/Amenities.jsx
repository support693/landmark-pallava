import './Amenities.css'

const amenities = [
  { icon: '🏖️', title: 'Private Beach', desc: 'Exclusive beachfront access with sun loungers and cabanas' },
  { icon: '♾️', title: 'Infinity Pool', desc: 'Temperature-controlled pool overlooking the Bay of Bengal' },
  { icon: '🧖', title: 'Luxury Spa', desc: 'Holistic treatments inspired by ancient Pallava wellness traditions' },
  { icon: '🍽️', title: 'Fine Dining', desc: 'Three signature restaurants serving coastal and international cuisine' },
  { icon: '🏋️', title: 'Fitness Centre', desc: 'State-of-the-art gym with personal training services' },
  { icon: '🎾', title: 'Sports Courts', desc: 'Tennis, badminton and indoor games for active guests' },
  { icon: '🚤', title: 'Water Sports', desc: 'Kayaking, snorkelling, jet ski and boat rides available' },
  { icon: '🎪', title: 'Event Spaces', desc: 'Versatile venues for weddings, conferences and celebrations' },
  { icon: '🧒', title: "Kids' Club", desc: 'Supervised play area and activities for younger guests' },
  { icon: '🚗', title: 'Valet Parking', desc: 'Complimentary valet and chauffeur services on request' },
  { icon: '📶', title: 'High-Speed Wi-Fi', desc: 'Seamless connectivity across all rooms and public areas' },
  { icon: '🌿', title: 'Garden Walks', desc: 'Curated nature trails through our lush landscaped gardens' },
]

export default function Amenities() {
  return (
    <section className="amenities" id="amenities">
      <div className="amenities-inner">
        <div className="amenities-intro">
          <p className="section-eyebrow">World-Class Facilities</p>
          <h2 className="section-heading">
            Resort <span className="gold">Amenities</span>
          </h2>
          <div className="section-divider" />
          <p className="section-desc">
            Every amenity at Landmark Pallavaa has been thoughtfully curated to deliver
            an unmatched experience — from serene wellness to thrilling adventure.
          </p>
        </div>

        <div className="amenities-grid">
          {amenities.map(a => (
            <div className="amenity-card" key={a.title}>
              <div className="amenity-icon">{a.icon}</div>
              <h3 className="amenity-title">{a.title}</h3>
              <p className="amenity-desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
