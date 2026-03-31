import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Home() {
  return (
    <div>

      {/* HERO */}
      <section
        className="section"
        style={{
          textAlign: "center",
          paddingTop: "120px",
          paddingBottom: "60px",
          maxWidth: "1100px",
          margin: "0 auto"
        }}
      >
        {/* LOGO */}
        <img
          src={logo}
          alt="ALPHYX Labs"
          className="logo-hero logo-glow logo-blend"
        />

        {/* TAGLINE */}
        <p
          className="hero-text"
          style={{
            marginTop: "25px",
            fontSize: "1.15rem",
            maxWidth: "760px",
            marginInline: "auto",
            lineHeight: "1.7"
          }}
        >
          Premium compounds. Clean systems. Optimized stacks.
          Built for disciplined performance.
        </p>

        {/* BUTTONS */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >
          <Link to="/products">
            <button className="btn-primary">VIEW PRODUCTS</button>
          </Link>

          <Link to="/contact">
            <button className="btn-secondary">CONTACT</button>
          </Link>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="section-divider"></div>

      {/* FEATURES */}
      <section
  className="section"
  style={{
    marginTop: "10px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto"
  }}
>
        <div className="card">
          <h3>ENGINEERED STACKS</h3>
          <p className="subtle">
            Strategically built combinations designed for simplicity, clarity, and structured product selection.
          </p>
        </div>

        <div className="card">
          <h3>VERIFIED QUALITY</h3>
          <p className="subtle">
            Third-party tested products with accessible COAs for transparency and confidence.
          </p>
        </div>

        <div className="card">
          <h3>STRUCTURED SYSTEM</h3>
          <p className="subtle">
            Standardized sizing, clear pricing, and streamlined catalogue structure for a disciplined experience.
          </p>
        </div>
      </section>

    </div>
  );
}