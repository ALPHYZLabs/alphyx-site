import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand brand-wrap">
          <img src="/logo.jpg" alt="ALPHYX Labs" className="brand-logo" />
          <span>ALPHYX Labs</span>
        </Link>

    <nav className="nav-links">
  <Link to="/">Home</Link>
  <Link to="/products">Products</Link>
  <Link to="/guides">Research Guides</Link>
  <Link to="/calculator">Calculator</Link>
  <Link to="/verification">COAs</Link>
  <Link to="/contact">Contact</Link>
</nav>
      </div>
    </header>
  )
}