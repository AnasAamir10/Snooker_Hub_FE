export default function TournamentHistory() {
  const history = [
    {
      id: 1,
      name: "Winter Championship 2024",
      date: "Feb 10, 2024",
      position: 1,
      prize: 50000,
    },
    {
      id: 2,
      name: "New Year Cup",
      date: "Jan 20, 2024",
      position: 2,
      prize: 30000,
    },
    {
      id: 3,
      name: "December Masters",
      date: "Dec 15, 2023",
      position: 1,
      prize: 40000,
    },
    {
      id: 4,
      name: "Autumn Tournament",
      date: "Nov 5, 2023",
      position: 3,
      prize: 15000,
    },
  ]

  const getPositionBadge = (position) => {
    const badges = {
      1: { icon: "🥇", color: "from-yellow-500 to-yellow-600", text: "1st Place" },
      2: { icon: "🥈", color: "from-gray-400 to-gray-500", text: "2nd Place" },
      3: { icon: "🥉", color: "from-orange-600 to-orange-700", text: "3rd Place" },
    }
    return badges[position] || { icon: "🏆", color: "from-gray-600 to-gray-700", text: `${position}th Place` }
  }

  return (
    <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6">
     <h3 className="text-xl font-bold text-white mb-6">Tournament History</h3>
      <div className="space-y-4">
        {history.map((tournament) => {
          const badge = getPositionBadge(tournament.position)
          return (
            <div
              key={tournament.id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 hover:border-[#03C05D]/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-2">{tournament.name}</h4>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                    <span>📅 {tournament.date}</span>
                    <span>💰 Rs. {tournament.prize.toLocaleString()}</span>
                  </div>
                </div>
                <div
                  className={`px-4 py-2 rounded-lg bg-gradient-to-r ${badge.color} text-white text-sm font-medium whitespace-nowrap`}
                >
                  {badge.icon} {badge.text}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
