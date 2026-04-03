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

          <div className="grid">
            <GuideCard title="Retatrutide" description="Dose, frequency, cycle, storage, and general research reference." link="/guides/retatrutide" />
            <GuideCard title="MOTS-C" description="Structured guide with clean layout." link="/guides/mots-c" />
            <GuideCard title="NAD+" description="Premium guide layout for dosage, frequency, and long-term reference." link="/guides/nad-plus" />
            <GuideCard title="BPC-157" description="Clean information page consistent with the ALPHYX visual system." link="/guides/bpc-157" />
            <GuideCard title="TB-500" description="Structured research guide format with storage and reference notes." link="/guides/tb-500" />
            <GuideCard title="Tesamorelin" description="Dedicated guide page with the same premium layout and spacing." link="/guides/tesamorelin" />
            <GuideCard title="PT-141" description="Presented in a simple, clean, high-end guide page format." link="/guides/pt-141" />
            <GuideCard title="GHK-Cu" description="Consistent page structure for storage, guide details, and notes." link="/guides/ghk-cu" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
<Disclaimer variant="compact" />