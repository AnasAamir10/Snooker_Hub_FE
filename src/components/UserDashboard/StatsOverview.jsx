export default function StatsOverview() {
  const stats = [
    { label: "Tournaments", value: "12", icon: "🏆" },
    { label: "Active", value: "3", icon: "⚡", color: "text-[#03C05D]" },
    { label: "Wins", value: "5", icon: "👑", color: "text-yellow-500" },
    { label: "Runner-up", value: "3", icon: "🥈", color: "text-gray-400" },
  ]

  return (
    <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4">Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800 hover:border-[#03C05D]/30 transition-all"
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className={`text-2xl font-bold ${stat.color || "text-white"}`}>{stat.value}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
