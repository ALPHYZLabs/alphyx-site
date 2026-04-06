import { Link } from 'react-router-dom'

export default function GuideCard({ title, description, link }) {
  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <div
        className="card"
        style={{
          textAlign: 'center',
        }}
      >
        <div className="card-topline">
          <h3
  className="card-title"
  style={{
    textAlign: 'center',
    width: '100%',
  }}
>
  {title}
</h3>
        </div>

        <p
  className="card-text"
  style={{
    textAlign: 'center',
    margin: '0 auto',
  }}
>
  {description}
</p>

        <span
  className="card-link"
  style={{
    display: 'block',
    textAlign: 'center',
    marginTop: '14px',
  }}
>
  Open Guide →
</span>
      </div>
    </Link>
  )
}