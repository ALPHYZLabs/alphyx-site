import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Disclaimer from '../components/Disclaimer'

export default function GuideMotsC() {
  return (
    <div className="page">
      <Navbar />

      <section className="guide-wrap">
        <div className="section-kicker">Research Guide</div>
        <h1 className="section-title">MOTS-C</h1>
        <p className="section-text">
          Structured reference page presented in a clean, premium format.
        </p>

        <div className="guide-stack">
          <div className="guide-block">
            <h2>Vial Size</h2>
            <p>10mg / 20mg vials.</p>
          </div>

          <div className="guide-block">
            <h2>Reconstitute with</h2>
            <p>10mg: 1mL | 20mg: 2 mL.</p>
          </div>

          <div className="guide-block">
            <h2>Concentration</h2>
            <p>10 mg/mL.</p>
          </div>

	  <div className="guide-block">
            <h2>Typical Dose</h2>
            <p>Start: 1 mg.</p>
          </div>

	  <div className="guide-block">
            <h2>Frequency</h2>
            <p>Every day you train about an hour before.</p>
          </div>

	  <div className="guide-block">
            <h2>Cycle</h2>
            <p>6-8 weeks on / 2 weeks off</p>
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
<Disclaimer variant="compact" />