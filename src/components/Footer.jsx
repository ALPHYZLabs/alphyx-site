import Disclaimer from './Disclaimer'
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">

        <div className="footer-brand">
          <img
            src="/footer-logo.png"
            alt="ALPHYX Labs"
            className="footer-logo"
          />

          <p className="footer-small">
            Dominance, Engineered.
          </p>

                <Disclaimer variant="footer" />
        </div>

        <div className="footer-links">
          <a href="/products">Products</a>
          <a href="/guides">Guides</a>
          <a href="/contact">Contact</a>
        </div>

<div className="mt-6 text-center">
  <Link
    to="/admin"
    className="text-[10px] uppercase tracking-[0.3em] text-white/20 hover:text-[#39FF14] transition"
  >
    Admin
  </Link>
</div>

      </div>
<div className="footer-glow-line"></div>
    </footer>
  )
}
import { Link } from 'react-router-dom'