import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function GuideBpc157() {
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
            <p>10 mg vial.</p>
          </div>

          <div className="guide-block">
            <h2>Reconstitute with</h2>
            <p>10mg: 2 mL bacteriostatic water.</p>
          </div>

          <div className="guide-block">
            <h2>Concentration</h2>
            <p>5 mg/mL.</p>
          </div>

	  <div className="guide-block">
            <h2>Typical Dose</h2>
            <p>Start: 200-500mcg (0.04-0.1 mL)..</p>
          </div>

	  <div className="guide-block">
            <h2>Frequency</h2>
            <p>1-2 times daily.</p>
          </div>

	  <div className="guide-block">
            <h2>Cycle</h2>
            <p>4-6 week cycles</p>
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