import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const pdfHref = '/guides/alphyx-beginner-guide.pdf'

const sections = [
  {
    number: '01',
    title: 'What Are Peptides?',
    text:
      'Peptides are short chains of amino acids that act as signaling molecules in the body. They influence processes such as muscle growth, fat metabolism, tissue repair, hormone release, and cellular communication.',
    bullets: [
      'They are smaller than proteins and function like targeted biological messengers.',
      'Unlike blunt-force hormone approaches, peptides work through specific pathways.',
      'They are used in research settings for performance, recovery, metabolic support, and wellness applications.',
    ],
  },
  {
    number: '02',
    title: 'How They Work',
    text:
      'Peptides bind to specific receptors and trigger targeted biological responses. Depending on the compound, this can influence growth hormone release, appetite regulation, glucose control, healing, inflammation, or mitochondrial function.',
    bullets: [
      'GH-related peptides stimulate growth hormone and IGF-1 pathways.',
      'GLP-1 based compounds support appetite control, insulin response, and weight management.',
      'Healing peptides target tissue repair, blood flow, and anti-inflammatory signaling.',
    ],
  },
  {
    number: '03',
    title: 'Core Benefits',
    text:
      'Different peptides are researched for different goals, but the major categories are relatively consistent across performance and wellness use cases.',
    bullets: [
      'Muscle growth and recovery support',
      'Fat loss and appetite control',
      'Injury repair and connective tissue support',
      'Gut health, immune modulation, and reduced inflammation',
      'Sleep, skin quality, metabolic resilience, and healthy aging support',
    ],
  },
  {
    number: '04',
    title: 'Popular Goals',
    text:
      'Most beginners start by understanding peptides through goals rather than chemistry. The most common categories are fat loss, lean mass support, recovery, gut health, and anti-aging.',
    bullets: [
      'Fat loss: compounds like Retatrutide, Semaglutide, Tirzepatide, Tesamorelin, and AOD 9604 are often discussed for metabolic support and weight reduction.',
      'Muscle growth: CJC-1295, Ipamorelin, IGF-1 LR3, and related GH-supportive compounds are commonly researched.',
      'Recovery: BPC-157, TB-500, KPV, and GHK-Cu are often referenced in tissue repair and inflammation-focused protocols.',
      'Gut and immune support: BPC-157, KPV, LL-37, and Thymosin Alpha-1 are commonly grouped in this category.',
    ],
  },
  {
    number: '05',
    title: 'Safety First',
    text:
      'Peptides are not risk-free. Side effects, misuse, poor sourcing, overuse, and incorrect dosing can create problems quickly. Responsible research starts with conservative structure, documentation, and respect for contraindications.',
    bullets: [
      'Common issues can include GI distress, appetite disruption, fatigue, water retention, and injection-site irritation.',
      'Some compounds require extra caution around blood glucose, inflammation markers, and individual tolerance.',
      'Anyone with medical complexity, pregnancy, breastfeeding, or other contraindications should not treat research content as personal medical instruction.',
    ],
  },
]

const goalCards = [
  {
    title: 'Fat Loss',
    text:
      'Research commonly focuses on appetite regulation, glucose control, metabolic efficiency, and body composition support.',
  },
  {
    title: 'Muscle Growth',
    text:
      'This category usually centers on GH/IGF-1 pathways, anabolic signaling, sleep quality, and recovery capacity.',
  },
  {
    title: 'Recovery',
    text:
      'These compounds are often researched for tissue repair, collagen support, inflammation control, and injury recovery.',
  },
  {
    title: 'Gut + Immunity',
    text:
      'A major category for reducing inflammation, supporting mucosal integrity, and improving systemic resilience.',
  },
  {
    title: 'Longevity',
    text:
      'Often discussed through mitochondrial health, immune regulation, neuroprotection, sleep quality, and healthy aging.',
  },
]

export default function BeginnerGuide() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <Navbar />

      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '88px 24px 70px',
          background:
            'radial-gradient(circle at top, rgba(57,255,20,0.08), transparent 32%), linear-gradient(to bottom, #050505 0%, #000 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            opacity: 0.05,
          }}
        >
          <img
            src="/logo.png"
            alt=""
            style={{
              width: '900px',
              maxWidth: '96vw',
              objectFit: 'contain',
              filter: 'blur(0.8px)',
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1220px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              maxWidth: '840px',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                color: '#39FF14',
                fontSize: '12px',
                letterSpacing: '0.34em',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}
            >
              ALPHYX Guide
            </div>

            <h1
              style={{
                fontSize: 'clamp(42px, 7vw, 84px)',
                lineHeight: 1,
                letterSpacing: '-0.05em',
                fontWeight: 700,
                margin: '0 0 22px 0',
                textTransform: 'uppercase',
              }}
            >
              Beginner Guide
              <br />
              To Peptides
            </h1>

            <p
              style={{
                maxWidth: '760px',
                margin: '0 auto 34px auto',
                color: 'rgba(255,255,255,0.68)',
                fontSize: '18px',
                lineHeight: 1.75,
              }}
            >
              A clean starting point for understanding peptide categories, mechanisms,
              use-case goals, and core safety considerations before deeper research.
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                flexWrap: 'wrap',
                marginBottom: '24px',
              }}
            >
              <a
                href="#guide-sections"
                style={{
                  minWidth: '220px',
                  textDecoration: 'none',
                  textAlign: 'center',
                  padding: '16px 24px',
                  borderRadius: '18px',
                  border: '1px solid #39FF14',
                  background: 'rgba(57,255,20,0.10)',
                  color: '#39FF14',
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  boxShadow: '0 0 26px rgba(57,255,20,0.14)',
                }}
              >
                Read Guide
              </a>

              <a
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  minWidth: '220px',
                  textDecoration: 'none',
                  textAlign: 'center',
                  padding: '16px 24px',
                  borderRadius: '18px',
                  border: '1px solid rgba(255,255,255,0.14)',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                }}
              >
                Download Full PDF
              </a>
            </div>

            <div
              style={{
                color: 'rgba(255,255,255,0.42)',
                fontSize: '12px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              Clean education. Structured reference. Research context only.
            </div>
          </div>
        </div>
      </section>

      <section
        id="guide-sections"
        style={{
          padding: '28px 24px 80px',
          background: '#000',
        }}
      >
        <div style={{ maxWidth: '1220px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '18px',
              marginBottom: '28px',
            }}
          >
            {goalCards.map((card) => (
              <div
                key={card.title}
                style={{
                  border: '1px solid rgba(57,255,20,0.14)',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: '26px',
                  padding: '24px',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 0 24px rgba(57,255,20,0.04)',
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
                  Goal
                </div>
                <h3
                  style={{
                    fontSize: '24px',
                    margin: '0 0 12px 0',
                    lineHeight: 1.1,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: 'rgba(255,255,255,0.66)',
                    lineHeight: 1.7,
                    fontSize: '15px',
                  }}
                >
                  {card.text}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gap: '18px',
            }}
          >
            {sections.map((section) => (
              <div
                key={section.number}
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: '30px',
                  padding: '28px',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div
                  style={{
                    color: '#39FF14',
                    fontSize: '12px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}
                >
                  Section {section.number}
                </div>

                <h2
                  style={{
                    fontSize: 'clamp(28px, 4vw, 42px)',
                    lineHeight: 1.05,
                    margin: '0 0 16px 0',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {section.title}
                </h2>

                <p
                  style={{
                    color: 'rgba(255,255,255,0.72)',
                    lineHeight: 1.8,
                    fontSize: '16px',
                    margin: '0 0 18px 0',
                    maxWidth: '980px',
                  }}
                >
                  {section.text}
                </p>

                <div
                  style={{
                    display: 'grid',
                    gap: '10px',
                    maxWidth: '980px',
                  }}
                >
                  {section.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start',
                        color: 'rgba(255,255,255,0.68)',
                        lineHeight: 1.75,
                        fontSize: '15px',
                      }}
                    >
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '999px',
                          background: '#39FF14',
                          marginTop: '10px',
                          boxShadow: '0 0 12px rgba(57,255,20,0.45)',
                          flexShrink: 0,
                        }}
                      />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '28px',
              border: '1px solid rgba(245,158,11,0.20)',
              background: 'rgba(245,158,11,0.08)',
              borderRadius: '30px',
              padding: '28px',
            }}
          >
            <div
              style={{
                color: '#f59e0b',
                fontSize: '12px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              Important Notice
            </div>

            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                lineHeight: 1.08,
                margin: '0 0 14px 0',
              }}
            >
              Research Use Only
            </h2>

            <p
              style={{
                margin: 0,
                color: 'rgba(255,255,255,0.74)',
                lineHeight: 1.8,
                fontSize: '15px',
                maxWidth: '980px',
              }}
            >
              All content on this page is presented for informational and research-context
              purposes only. It is not medical advice, not a substitute for professional
              oversight, and not intended for human consumption. Not suitable for use by
              individuals who are pregnant or breastfeeding.
            </p>
          </div>

          <div
            style={{
              marginTop: '28px',
              border: '1px solid rgba(57,255,20,0.14)',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '30px',
              padding: '30px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                color: '#39FF14',
                fontSize: '12px',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}
            >
              Full Version
            </div>

            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                lineHeight: 1.08,
                margin: '0 0 14px 0',
              }}
            >
              Download The Complete Guide
            </h2>

            <p
              style={{
                maxWidth: '760px',
                margin: '0 auto 24px auto',
                color: 'rgba(255,255,255,0.68)',
                lineHeight: 1.75,
                fontSize: '16px',
              }}
            >
              Use the full PDF version for the extended breakdown, more detailed goal-based
              sections, and additional reference material.
            </p>

            <a
              href={pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                minWidth: '260px',
                textDecoration: 'none',
                textAlign: 'center',
                padding: '16px 24px',
                borderRadius: '18px',
                border: '1px solid #39FF14',
                background: 'rgba(57,255,20,0.10)',
                color: '#39FF14',
                fontSize: '13px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                boxShadow: '0 0 26px rgba(57,255,20,0.14)',
              }}
            >
              Download Full PDF
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}