// The fixed "photo studio" wall behind the whole website.
// All the styling lives in src/index.css (search for ".studio-bg").
export default function StudioBackground() {
  return (
    <div className="studio-bg" aria-hidden="true">
      <div className="sb-base" />
      <div className="sb-clouds" />
      <div className="sb-marble" />
      <div className="sb-fabric" />
      <div className="sb-light" />
      <div className="sb-vignette" />
    </div>
  )
}
