import logoImg from '../assets/logo.jpeg'
import './Footer.css'

export default function Footer() {
  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919688290594"
        className="whatsapp-fab"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <footer className="footer" id="contact">
        {/* CTA Banner */}
        <div className="footer-cta-banner">
          <div className="footer-cta-inner">
            <div>
              <h3 className="footer-cta-title">Ready for an Unforgettable Stay?</h3>
              <p className="footer-cta-sub">Book directly for the best rates and exclusive offers.</p>
            </div>
            <a href="#booking" className="footer-cta-btn">Reserve Now</a>
          </div>
        </div>

        {/* Main footer */}
        <div className="footer-main">
          <div className="footer-brand">
            <img src={logoImg} alt="Landmark Pallavaa" className="footer-logo" />
            <p className="footer-tagline">
              A beacon of refined hospitality on the shores of Mahabalipuram, Tamil Nadu.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Instagram" className="social-icon">IG</a>
              <a href="#" aria-label="Facebook"  className="social-icon">FB</a>
              <a href="#" aria-label="Twitter"   className="social-icon">TW</a>
              <a href="#" aria-label="YouTube"   className="social-icon">YT</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#rooms">Rooms &amp; Suites</a></li>
              <li><a href="/gallery">Gallery</a></li>
              <li><a href="#testimonials">Guest Reviews</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Experiences</h4>
            <ul>
              <li><a href="#">Beach Activities</a></li>
              <li><a href="#">Spa &amp; Wellness</a></li>
              <li><a href="#">Water Sports</a></li>
              <li><a href="#">Cultural Tours</a></li>
              <li><a href="#">Events &amp; Weddings</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <span>🌐</span>
                <a href="https://www.landmarkpallavaresort.com" target="_blank" rel="noreferrer">
                  www.landmarkpallavaresort.com
                </a>
              </li>
              <li>
                <span>📍</span>
                Krishna Karanai Village, 67A, SH 49,<br />Mahabalipuram, Tamil Nadu 603104
              </li>
              <li>
                <span>📞</span>
                <a href="tel:+919688290594">+91 96882 90594</a>
              </li>
              <li>
                <span>✉️</span>
                <a href="mailto:reservations@landmarkpallavaresort.com">reservations@landmarkpallavaresort.com</a>
              </li>
              <li>
                <span>🕐</span>
                Check-in: 2:00 PM · Check-out: 12:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Landmark Pallavaa Beach Resort &amp; Spa. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Cancellation Policy</a>
          </div>
        </div>
      </footer>
    </>
  )
}
