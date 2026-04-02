import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ReconstitutionCalculator from '../components/ReconstitutionCalculator'

export default function Calculator() {
  return (
    <div className="page">
      <Navbar />

      <section className="section">
        <div className="container">
          <div className="section-kicker">Calculator</div>
          <h1 className="section-title">Research Reconstitution Calculator</h1>
          <p className="section-text">
            Calculate concentration, draw amount in mL, and insulin syringe units
            based on vial strength, BAC water volume, and desired dose.
          </p>

          <div style={{ marginTop: '32px' }}>
            <ReconstitutionCalculator defaultVialMg={10} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}