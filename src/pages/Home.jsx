import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FadeInSection from '../components/FadeInSection'

export default function Home() {
  return (
    <div className="page">
      <Navbar />

      <section className="hero hero-center">
        <div className="container hero-center-inner">
          <div className="hero-logo-shell">
            <img src="/logo.jpg" alt="ALPHYX Labs" className="hero-logo-large" />
          </div>

          <div className="hero-kicker">ALPHYX Labs</div>
          <h1 className="hero-title">Dominance, Engineered.</h1>
          <p className="hero-text">
            Premium research compounds presented with precision, clarity, and a
            laboratory-grade visual identity.
          </p>

          <div className="button-row">
            <Link to="/products" className="button-primary">
              View Products
            </Link>
            <Link to="/guides" className="button-secondary">
              Research Guides
            </Link>
            <Link to="/verification" className="button-secondary">
              View COAs
            </Link>
          </div>
        </div>
      </section>

      <FadeInSection>
        <section className="section">
          <div className="container">
            <div className="section-kicker">Featured Products</div>
            <h2 className="section-title">Core catalogue</h2>
            <p className="section-text">
              Clean presentation for flagship compounds and stacks.
            </p>

            <div className="grid">
  <Link to="/products/retatrutide-30mg" className="card">
    <div className="card-media-wrap">
      <span className="product-badge badge-bestseller">BEST SELLER</span>
      <img src="/products/reta30.jpg" alt="Retatrutide 30mg" className="product-image" />
    </div>
    <div className="card-topline">
      <h3 className="card-title">Retatrutide 30mg</h3>
      <div className="product-price">$175</div>
    </div>
    <p className="card-text">
      Retatrutide is a triple hormone receptor agonist targeting GLP-1, GIP, and glucagon receptors, designed to support fat loss, metabolic rate, and blood sugar control.
    </p>
  </Link>

  <Link to="/products/mots-c" className="card">
    <div className="card-media-wrap">
      <img src="/products/mots.jpg" alt="MOTS-C" className="product-image" />
    </div>
    <div className="card-topline">
      <h3 className="card-title">MOTS-C</h3>
      <div className="product-price">$80</div>
    </div>
    <p className="card-text">
      MOTS-C is a mitochondria-derived peptide that supports energy metabolism, improves insulin sensitivity, and promotes fat utilisation.
    </p>
  </Link>

  <Link to="/products/shred-max" className="card stack-card">
    <div className="card-media-wrap">
      <span className="product-badge badge-bestseller">BEST SELLER</span>
      <img src="/products/shredmax.png" alt="Shred Max" className="product-image" />
    </div>
    <div className="card-topline">
      <h3 className="card-title">Shred Max</h3>
      <div className="product-price">$275</div>
    </div>
    <p className="card-text">
      Includes 1 x Retatrutide 30mg and 2 x MOTS-C.
    </p>
  </Link>

  <Link to="/products/tesamorelin-10mg" className="card">
    <div className="card-media-wrap">
      <img src="/products/tesamorelin.jpg" alt="Tesamorelin 10mg" className="product-image" />
    </div>
    <div className="card-topline">
      <h3 className="card-title">Tesamorelin 10mg</h3>
      <div className="product-price">$120</div>
    </div>
    <p className="card-text">
      Tesamorelin is a growth hormone-releasing hormone analogue that stimulates natural GH production to support fat loss, particularly in the abdominal region.
    </p>
  </Link>
</div>

            <div className="button-row">
              <Link to="/products" className="button-primary">
                Full Product Page
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="section">
          <div className="container">
            <div className="section-kicker">Research Guides</div>
            <h2 className="section-title">Structured information pages</h2>
            <p className="section-text">
              Keep the homepage clean and let users open detailed information pages
              for each compound.
            </p>

            <div className="grid">
              <div className="card">
                <h3 className="card-title">Retatrutide</h3>
                <p className="card-text">Detailed structured research guide.</p>
                <Link to="/guides/retatrutide" className="card-link">Open Guide</Link>
              </div>

              <div className="card">
                <h3 className="card-title">MOTS-C</h3>
                <p className="card-text">Clean guide layout with consistent structure.</p>
                <Link to="/guides/mots-c" className="card-link">Open Guide</Link>
              </div>

              <div className="card">
                <h3 className="card-title">NAD+</h3>
                <p className="card-text">Premium formatted guide page.</p>
                <Link to="/guides/nad-plus" className="card-link">Open Guide</Link>
              </div>

              <div className="card">
                <h3 className="card-title">GHK-Cu</h3>
                <p className="card-text">Consistent ALPHYX guide structure.</p>
                <Link to="/guides/ghk-cu" className="card-link">Open Guide</Link>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="section">
          <div className="container">
            <div className="section-kicker">Verification</div>
            <p className="section-text">
            </p>

            <div className="button-row">
              <Link to="/verification" className="button-primary">
                Open COA Page
              </Link>
              <Link to="/contact" className="button-secondary">
                Contact
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

      <Footer />
    </div>
  )
}