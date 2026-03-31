import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link
          to="/"
          className="brand"
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
        >
       <img
  src={logo}
  alt="ALPHYX Labs logo"
  style={{
    height: "42px",
    filter: "drop-shadow(0 0 6px rgba(57,255,20,0.4))"
  }}
/>
          
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
	<Link to="/coas" className="nav-link">COAs</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
