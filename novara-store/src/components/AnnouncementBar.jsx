export default function AnnouncementBar() {
  return (
    <div
      className="px-4 py-2.5 text-center text-xs font-medium tracking-[0.08em] text-white"
      style={{ backgroundImage: 'linear-gradient(90deg, #060607, #1a1814 50%, #060607)' }}
    >
      <span className="text-[#e4c290]">✦</span>
      <span className="mx-2">Free shipping on orders over $50</span>
      <span className="text-[#e4c290]">✦</span>
    </div>
  )
}
