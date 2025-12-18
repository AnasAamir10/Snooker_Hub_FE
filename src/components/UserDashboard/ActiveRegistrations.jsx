export default function ActiveRegistrations() {
  const registrations = [
    {
      id: 1,
      name: "National Championship 2024",
      date: "March 15, 2024",
      status: "confirmed",
      fee: 5000,
      location: "Snooker HUB",
    },
    {
      id: 2,
      name: "Spring Masters Cup",
      date: "March 22, 2024",
      status: "pending",
      fee: 3000,
      location: "Snooker HUB",
    },
    {
      id: 3,
      name: "Elite Pro Tournament",
      date: "April 5, 2024",
      status: "confirmed",
      fee: 8000,
      location: "Snooker HUB",
    },
  ]

  return (
    <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Active Registrations</h3>
      <div className="space-y-4">
        {registrations.map((reg) => (
          <div
            key={reg.id}
            className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 hover:border-[#03C05D]/30 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-2">{reg.name}</h4>
                <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                  <span>📅 {reg.date}</span>
                  <span>📍 {reg.location}</span>
                  <span>💰 Rs. {reg.fee.toLocaleString()}</span>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  reg.status === "confirmed"
                    ? "bg-[#03C05D]/20 text-[#03C05D] border border-[#03C05D]/30"
                    : "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"
                }`}
              >
                {reg.status === "confirmed" ? "✓ Confirmed" : "⏳ Pending"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
