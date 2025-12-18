export default function SectionHeader({ icon, title, subtitle, accentColor = "[#03C05D]" }) {
  return (
    <div className="mb-12 relative">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-10 h-10 rounded-full bg-${accentColor} flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
          <p className={`text-${accentColor} text-base font-semibold mt-1`}>{subtitle}</p>
        </div>
      </div>
      <div className={`h-1 w-24 bg-gradient-to-r from-${accentColor} to-transparent rounded-full`}></div>
    </div>
  )
}