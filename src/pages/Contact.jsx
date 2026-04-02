import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const EMAIL = 'alphyxlabs@yahoo.com'
const WHATSAPP = '61466985311'

export default function Contact() {
  const emailHref = `mailto:${EMAIL}?subject=${encodeURIComponent('ALPHYX Enquiry')}`
  const whatsappHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    'Hi, I’m enquiring about ALPHYX Labs products.'
  )}`

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <Navbar />

      <section
        style={{
          position: 'relative',
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
          overflow: 'hidden',
          background:
            'radial-gradient(circle at center, rgba(57,255,20,0.06) 0%, rgba(57,255,20,0.02) 20%, rgba(0,0,0,0) 55%), linear-gradient(to bottom, #050505 0%, #000 100%)',
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
            opacity: 0.035,
          }}
        >
          <img
            src="/logo.png"
            alt=""
            style={{
              width: '1100px',
              maxWidth: '120vw',
              objectFit: 'contain',
              filter: 'blur(1px)',
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: '920px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: '#39FF14',
              fontSize: '12px',
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              marginBottom: '18px',
            }}
          >
            Contact
          </div>

          <h1
            style={{
              fontSize: 'clamp(42px, 7vw, 78px)',
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: '-0.04em',
              margin: '0 0 20px 0',
              textTransform: 'uppercase',
            }}
          >
            Direct Contact
          </h1>

          <p
            style={{
              maxWidth: '720px',
              margin: '0 auto 42px auto',
              color: 'rgba(255,255,255,0.68)',
              fontSize: '18px',
              lineHeight: 1.7,
            }}
          >
            For orders, availability, or direct enquiries, contact ALPHYX Labs through
            the channels below.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '18px',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '34px',
            }}
          >
            <a
              href={emailHref}
              style={{
                minWidth: '240px',
                padding: '18px 30px',
                borderRadius: '18px',
                border: '1px solid #39FF14',
                background: 'rgba(57,255,20,0.08)',
                color: '#39FF14',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.24em',
                fontSize: '13px',
                fontWeight: 700,
                boxShadow: '0 0 28px rgba(57,255,20,0.16)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#39FF14'
                e.currentTarget.style.color = '#000'
                e.currentTarget.style.boxShadow = '0 0 38px rgba(57,255,20,0.34)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(57,255,20,0.08)'
                e.currentTarget.style.color = '#39FF14'
                e.currentTarget.style.boxShadow = '0 0 28px rgba(57,255,20,0.16)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Email
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                minWidth: '240px',
                padding: '18px 30px',
                borderRadius: '18px',
                border: '1px solid rgba(255,255,255,0.16)',
                background: 'rgba(255,255,255,0.04)',
                color: '#fff',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.24em',
                fontSize: '13px',
                fontWeight: 700,
                boxShadow: '0 0 20px rgba(255,255,255,0.04)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid #39FF14'
                e.currentTarget.style.color = '#39FF14'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(57,255,20,0.22)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.16)'
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.04)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              WhatsApp
            </a>
          </div>

          <div
            style={{
              width: '100%',
              maxWidth: '620px',
              margin: '0 auto',
              paddingTop: '22px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.38)',
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Clean communication. Direct response.
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}