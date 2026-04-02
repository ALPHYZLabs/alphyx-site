import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const coas = [
  { name: 'Retatrutide 30mg COA', file: '/coas/reta30.jpg' },
  { name: 'MOTS-C COA', file: '/coas/mots.jpg' },
  { name: 'GHK-Cu COA', file: '/coas/ghk.jpg' },
]

export default function Verification() {
  return (
    <div className="page">
      <Navbar />

      <section className="section">
        <div className="container">
          <div className="section-kicker">Verification</div>
          <h1 className="section-title">COAs and batch documentation</h1>
          <p className="section-text">
            Present supporting documentation in a clear, premium layout.
          </p>

          <div className="grid">
            {coas.map((coa) => (
              <div className="card" key={coa.name}>
                <h3 className="card-title">{coa.name}</h3>
                <p className="card-text">Preview or replace this item with your final documentation image.</p>
                <a href={coa.file} target="_blank" rel="noreferrer" className="card-link">
                  Open COA
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}