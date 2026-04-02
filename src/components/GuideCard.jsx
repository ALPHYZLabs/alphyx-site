import { Link } from 'react-router-dom'

export default function GuideCard({ title, description, link }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{description}</p>
      <Link to={link} className="card-link">
        Open Guide
      </Link>
    </div>
  )
}