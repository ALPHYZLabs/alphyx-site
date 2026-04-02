import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function GuideRetatrutide() {
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
            <p>10 / 20 / 30 mg vials.</p>
          </div>

          <div className="guide-block">
            <h2>Reconstitute with</h2>
            <p>10mg: 1mL | 20mg: 2 mL | 30mg: 3mL .</p>
          </div>

          <div className="guide-block">
            <h2>Concentration</h2>
            <p>10-15 mg/mL (varies by vial).</p>
          </div>

	  <div className="guide-block">
            <h2>Typical Dose</h2>
            <p>Start: 0.5-1 mg/week. Titrate: +0.5-1 mg every 4 weeks. Target 4-8 mg/week.</p>
          </div>

	  <div className="guide-block">
            <h2>Frequency</h2>
            <p>Either same day every week or every 5 days.</p>
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