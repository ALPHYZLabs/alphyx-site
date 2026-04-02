import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function GuideTb500() {
  return (
    <div className="page">
      <Navbar />

      <section className="guide-wrap">
        <div className="section-kicker">Research Guide</div>
        <h1 className="section-title">Retatrutide</h1>
        <p className="section-text">
          Structured reference page presented in a clean, premium format.
        </p>

        <div className="guide-stack">
          <div className="guide-block">
            <h2>Vial Size</h2>
            <p>10mg vial.</p>
          </div>

          <div className="guide-block">
            <h2>Reconstitute with</h2>
            <p>2 mL bac water.</p>
          </div>

          <div className="guide-block">
            <h2>Concentration</h2>
            <p>5 mg/mL.</p>
          </div>

	  <div className="guide-block">
            <h2>Typical Dose</h2>
            <p>2-5mg (0.4-1.0 mL).</p>
          </div>

	  <div className="guide-block">
            <h2>Frequency</h2>
            <p>Loading: 2 times per week for 4 weeks; Maintenance: 1 time per week.</p>
          </div>

	  <div className="guide-block">
            <h2>Cycle</h2>
            <p>NA</p>
          </div>

	    <div className="guide-block">
            <h2>Storage</h2>
            <p>Keep refrigerated; use within 30 days.</p>
          </div>

          <div className="guide-block">
            <h2>Research Note</h2>
            <p>For research purposes only.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}