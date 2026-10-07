import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-x flex flex-col items-center py-28 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 text-7xl sm:text-8xl">Lost?</h1>
      <p className="mt-4 text-muted">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-primary mt-9">Back to home</Link>
    </div>
  )
}
