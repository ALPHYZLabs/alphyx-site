import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GuideCard from '../components/GuideCard'
import Disclaimer from '../components/Disclaimer'

export default function Guides() {
  return (
    <div className="page">
      <Navbar />

      <section className="section">
        <div className="container">
          <div className="section-kicker">Research Guides</div>
          <h1 className="section-title">Compound Information</h1>
          <p className="section-text">
            Structured compound information presented in a clean, consistent format.
          </p>

          <div style={{ marginBottom: '28px' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(circle at 50% 0%, rgba(57,255,20,0.22), transparent 72%)',
                  filter: 'blur(22px)',
                  opacity: 0.9,
                  zIndex: 0,
                }}
              />

              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
		  textAlign: 'center',
                  border: '1px solid rgba(57,255,20,0.16)',
                  background: 'rgba(255,255,255,0.035)',
                  borderRadius: '24px',
                  padding: '28px',
                  backdropFilter: 'blur(14px)',
                  boxShadow: '0 0 30px rgba(57,255,20,0.08)',
                }}
              >
                <div
                  style={{
                    color: '#39FF14',
                    fontSize: '11px',
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}
                >
                  Start Here
                </div>

                <h2
                  style={{
                    margin: '0 0 14px 0',
                    fontSize: 'clamp(28px, 4vw, 42px)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em',
                  }}
                >
                  Beginner Guide
                </h2>

                <p
  style={{
    margin: '0 auto 22px auto',
    color: 'rgba(255,255,255,0.68)',
    lineHeight: 1.75,
    maxWidth: '720px',
    fontSize: '16px',
    textAlign: 'center',
  }}
>
                  A clean starting point for understanding peptides, common goals,
                  mechanisms, safety considerations, and foundational research context.
                </p>

                <a
                  href="/guides/beginner-guide"
                  style={{
                    display: 'inline-block',
		    margin: '0 auto',
                    textDecoration: 'none',
                    padding: '14px 22px',
                    borderRadius: '16px',
                    border: '1px solid rgba(57,255,20,0.35)',
                    background: 'rgba(57,255,20,0.10)',
                    color: '#39FF14',
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                    fontSize: '12px',
                    fontWeight: 700,
                    boxShadow: '0 0 20px rgba(57,255,20,0.12)',
                  }}
                >
                  Open Beginner Guide
                </a>
              </div>
            </div>
          </div>

          <div className="grid">
            <GuideCard
              title="Retatrutide"
              description="Retatrutide is a triple hormone receptor agonist targeting GLP-1, GIP, and glucagon receptors, designed to support fat loss, metabolic rate, and blood sugar control."
              link="/guides/retatrutide"
            />
            <GuideCard
              title="MOTS-C"
              description="MOTS-C is a mitochondria-derived peptide that supports energy metabolism, improves insulin sensitivity, and promotes fat utilisation."
              link="/guides/mots-c"
            />
            <GuideCard
              title="NAD+"
              description="NAD+ is a coenzyme essential for cellular energy production and DNA repair, playing a key role in metabolism, ageing, and overall cellular function."
              link="/guides/nad-plus"
            />
            <GuideCard
              title="BPC-157"
              description="BPC-157 is a synthetic peptide known for supporting tissue healing, reducing inflammation, and promoting recovery of muscles, tendons, and gut health."
              link="/guides/bpc-157"
            />
            <GuideCard
              title="TB-500"
              description="TB-500 is a synthetic peptide that supports cell migration and tissue repair, helping recovery from muscle, tendon, and ligament injuries."
              link="/guides/tb-500"
            />
            <GuideCard
              title="Tesamorelin"
              description="Tesamorelin is a growth hormone-releasing hormone analogue that stimulates natural GH production to support fat loss, particularly in the abdominal region."
              link="/guides/tesamorelin"
            />
            <GuideCard
              title="PT-141"
              description="PT-141 is a peptide that activates melanocortin receptors to support libido and sexual arousal independently of blood flow mechanisms."
              link="/guides/pt-141"
            />
            <GuideCard
              title="GHK-Cu"
              description="GHK-Cu is a copper-binding peptide known for supporting skin repair, collagen production, and tissue regeneration."
              link="/guides/ghk-cu"
            />
          </div>

          <div className="mt-8">
            <Disclaimer variant="compact" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}