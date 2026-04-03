export default function Footer() {
  return (
    <footer
      style={{
        background: '#000',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '60px 20px 40px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Glow line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '1px',
          background:
            'linear-gradient(to right, transparent, rgba(57,255,20,0.8), transparent)',
        }}
      />

      {/* Logo */}
<a href="/admin">
  <img
    src="/logo.jpg"
    alt="ALPHYX Labs"
    style={{
      width: '70px',
      margin: '0 auto 18px auto',
      opacity: 0.9,
      cursor: 'pointer',
      transition: 'all 0.25s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.opacity = '1'
      e.currentTarget.style.transform = 'scale(1.05)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.opacity = '0.9'
      e.currentTarget.style.transform = 'scale(1)'
    }}
  />
</a>

      {/* Tagline */}
      <div
        style={{
          color: '#fff',
          fontSize: '18px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          marginBottom: '12px',
        }}
      >
        Dominance, Engineered.
      </div>

      {/* Established */}
      <div
        style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '13px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: '22px',
        }}
      >
        Established 2026
      </div>

      {/* Divider */}
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          margin: '0 auto 20px auto',
          height: '1px',
          background:
            'linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)',
        }}
      />

      {/* Disclaimer */}
      <p
        style={{
          maxWidth: '520px',
          margin: '0 auto',
          color: 'rgba(255,255,255,0.35)',
          fontSize: '12px',
          lineHeight: 1.6,
        }}
      >
        All products and information are provided strictly for research purposes only.
        Not for human consumption. Not intended for use by individuals who are pregnant
        or breastfeeding.
      </p>
    </footer>
  )
}