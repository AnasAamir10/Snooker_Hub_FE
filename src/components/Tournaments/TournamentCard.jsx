import CountdownTimer from "./CountdownTimer"

export default function TournamentCard({ tournament, type = "available", onRegister }) {
  const getUrgencyBadge = (current, max) => {
    const percent = (current / max) * 100
    if (percent >= 90)
      return { text: "ALMOST FULL", color: "text-orange-400", bg: "bg-orange-500/20", border: "border-orange-500/40" }
    if (percent >= 70)
      return { text: "FILLING FAST", color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/40" }
    return { text: "OPEN NOW", color: "text-[#03C05D]", bg: "bg-[#03C05D]/20", border: "border-[#03C05D]/40" }
  }

  const spotsLeft = tournament.maxEntries - tournament.currentEntries
  const urgency = type === "available" ? getUrgencyBadge(tournament.currentEntries, tournament.maxEntries) : null

  if (type === "previous") {
    return (
      <div className="bg-[#151515] rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 opacity-90 hover:opacity-100">
        <div className="relative h-40 overflow-hidden">
          <img
            src={tournament.image || "/placeholder.svg"}
            alt={tournament.name}
            className="w-full h-full object-cover opacity-60 grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute top-3 right-3 bg-gray-700/90 text-gray-300 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm">
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            COMPLETED
          </div>

          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm px-2 py-1.5 rounded-lg border border-gray-700 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="text-gray-300 text-xs font-bold">{tournament.totalEntries} Players</span>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <h3 className="text-xl font-bold text-gray-300">{tournament.name}</h3>

          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-gray-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs">{tournament.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-xs">{tournament.location}</span>
            </div>
          </div>

          <div className="bg-[#0a0a0a] rounded-lg p-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-xs">Winner</span>
              <span className="text-white font-bold text-base">{tournament.winner}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-xs">Runner-up</span>
              <span className="text-gray-300 font-semibold text-sm">{tournament.runnerUp}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-xs">3rd Place</span>
              <span className="text-gray-300 font-semibold text-sm">{tournament.thirdPlace}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-xs">Prize Money</span>
              <span className="text-gray-400 font-bold text-base">{tournament.prizeMoney}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl overflow-hidden border-2 border-[#03C05D]/30 hover:border-[#03C05D] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#03C05D]/20">
      <div className="relative h-40 overflow-hidden">
        <img
          src={tournament.image || "/placeholder.svg"}
          alt={tournament.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div
          className={`absolute top-3 right-3 ${urgency.bg} ${urgency.border} border backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1.5`}
        >
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          <span className={`${urgency.color} text-xs font-bold`}>{urgency.text}</span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="bg-black/80 backdrop-blur-sm px-2 py-1.5 rounded-lg border border-gray-700 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#03C05D]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="text-white text-xs font-bold">
              {tournament.currentEntries}/{tournament.maxEntries}
            </span>
          </div>
          <div className="bg-[#03C05D]/90 backdrop-blur-sm px-2 py-1.5 rounded-lg">
            <span className="text-black text-xs font-bold">{spotsLeft} LEFT</span>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-white group-hover:text-[#03C05D] transition-colors">
          {tournament.name}
        </h3>

        <div className="grid grid-cols-2 gap-1.5 text-xs">
          <div className="flex items-center gap-1.5 text-gray-400">
            <svg className="w-3.5 h-3.5 text-[#03C05D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs">{tournament.date}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <svg className="w-3.5 h-3.5 text-[#03C05D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-xs">Snooker HUB</span>
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-lg p-3 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">Entry Fee</span>
            <span className="text-[#03C05D] font-bold text-base">
              PKR {tournament.registrationFee.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">Prize Pool</span>
            <span className="text-white font-bold text-base">PKR {tournament.totalPrize.toLocaleString()}</span>
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-400 mb-1.5">Registration Closes:</div>
          <CountdownTimer deadline={tournament.registrationDeadline} />
        </div>

        <button
          onClick={() => onRegister(tournament)}
          className="w-full bg-gradient-to-r from-[#03C05D] to-[#02a04d] hover:from-[#02a04d] hover:to-[#028a42] text-black font-bold py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#03C05D]/50 transform hover:-translate-y-0.5 text-sm"
        >
          Register Now →
        </button>
      </div>
    </div>
  )
}