import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const coas = [
  { name: 'Retatrutide 30mg COA', file: '/coas/reta30.jpg' },
  { name: 'MOTS-C COA', file: '/coas/mots.jpg' },
  { name: 'GHK-Cu COA', file: '/coas/ghk.jpg' },
  { name: 'BPC-157 10mg COA', file: '/coas/bpc.jpg' },
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
          </p>

          <div className="grid">
            {coas.map((coa) => (
              <div className="card" key={coa.name}>
                <h3 className="card-title">{coa.name}</h3>

                {/* 🔥 ALPHYX STYLE BUTTON */}
                <a
                  href={coa.file}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "12px",
                    padding: "12px 20px",
                    border: "1px solid rgba(57,255,20,0.5)",
                    borderRadius: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    fontWeight: "600",
                    color: "#fff",
                    background: "rgba(57,255,20,0.08)",
                    boxShadow: "0 0 10px rgba(57,255,20,0.2)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(57,255,20,0.5)";
                    e.currentTarget.style.background = "rgba(57,255,20,0.15)";
                    e.currentTarget.style.borderColor = "#39FF14";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 10px rgba(57,255,20,0.2)";
                    e.currentTarget.style.background = "rgba(57,255,20,0.08)";
                    e.currentTarget.style.borderColor = "rgba(57,255,20,0.5)";
                  }}
                >
                  View COA
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