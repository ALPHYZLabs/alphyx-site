import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Disclaimer from '../components/Disclaimer'

export default function GuideNadPlus() {
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
            <p>500mg / 1000mg.</p>
          </div>

          <div className="guide-block">
            <h2>Reconstitute with</h2>
            <p>500mg: 5 mL | 1000mg: 10mL .</p>
          </div>

          <div className="guide-block">
            <h2>Concentration</h2>
            <p>100 mg/mL.</p>
          </div>

	  <div className="guide-block">
            <h2>Typical Dose</h2>
            <p>250-1000 mg per session.</p>
          </div>

	  <div className="guide-block">
            <h2>Frequency</h2>
            <p>3-5 times per week loading; 1-2 times per week maintenance.</p>
          </div>

	  <div className="guide-block">
            <h2>Cycle</h2>
            <p>NA</p>
          </div>

	    <div className="guide-block">
            <h2>Storage</h2>
            <p>Keep refrigerated; use within 7 days.</p>
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