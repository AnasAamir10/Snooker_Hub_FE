"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function FeaturedTournament() {
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(null)

  const tournament = {
    name: "Grand Championship 2024",
    prize: 50000,
    fee: 5000,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime(),
    currentEntries: 28,
    maxEntries: 32,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/snooker-tournament-championship-5QH85hupD3zz9O9wBjnZkzbnRcBprY.jpg",
  }

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const distance = tournament.deadline - now

      if (distance < 0) {
        return { expired: true }
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        expired: false,
      }
    }

    // Calculate immediately on mount
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)

      // Clear interval if expired
      if (newTimeLeft.expired) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!timeLeft) {
    return <div className="text-white">Loading...</div>
  }

  const spotsLeft = tournament.maxEntries - tournament.currentEntries
  const urgencyLevel = spotsLeft <= 5 ? "critical" : spotsLeft <= 10 ? "high" : "normal"

  return (
    <div className="relative bg-gradient-to-r from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] border-2 border-[#03C05D] rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-[#03C05D]/20 transition-all duration-300">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#03C05D]/5 via-transparent to-[#03C05D]/5 animate-pulse"></div>

      <div className="relative flex flex-col md:flex-row gap-6 p-6">
        {/* Left: Image */}
        <div className="md:w-1/3">
          <img
            src={tournament.image || "/placeholder.svg"}
            alt={tournament.name}
            className="w-full h-48 md:h-full object-cover rounded-xl border border-gray-800"
          />
        </div>

        {/* Right: Content */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-gradient-to-r from-[#03C05D] to-[#02a04d] text-white text-xs font-bold rounded-full animate-pulse">
                ⚡ FEATURED
              </span>
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full ${
                  urgencyLevel === "critical"
                    ? "bg-orange-500/20 text-orange-500 border border-orange-500/30 animate-pulse"
                    : urgencyLevel === "high"
                      ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"
                      : "bg-[#03C05D]/20 text-[#03C05D] border border-[#03C05D]/30"
                }`}
              >
                {urgencyLevel === "critical"
                  ? "🔥 LAST FEW SPOTS!"
                  : urgencyLevel === "high"
                    ? "⚠️ FILLING FAST!"
                    : "✨ OPEN NOW"}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{tournament.name}</h3>
            <p className="text-gray-400 text-sm mb-4">Don't miss your chance to compete for glory!</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-[#0a0a0a] rounded-lg p-3 border border-gray-800">
                <div className="text-xs text-gray-400 mb-1">Prize Pool</div>
                <div className="text-lg font-bold text-[#03C05D]">Rs. {tournament.prize.toLocaleString()}</div>
              </div>
              <div className="bg-[#0a0a0a] rounded-lg p-3 border border-gray-800">
                <div className="text-xs text-gray-400 mb-1">Entry Fee</div>
                <div className="text-lg font-bold text-white">Rs. {tournament.fee.toLocaleString()}</div>
              </div>
              <div className="bg-[#0a0a0a] rounded-lg p-3 border border-gray-800">
                <div className="text-xs text-gray-400 mb-1">Spots Left</div>
                <div className="text-lg font-bold text-orange-500">
                  {spotsLeft}/{tournament.maxEntries}
                </div>
              </div>
              <div className="bg-[#0a0a0a] rounded-lg p-3 border border-gray-800">
                <div className="text-xs text-gray-400 mb-1">Location</div>
                <div className="text-sm font-bold text-white">Snooker HUB</div>
              </div>
            </div>
          </div>

          {/* Footer: Timer & CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-800">
            {/* Countdown Timer */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">
                {timeLeft.expired ? "Status:" : "Registration closes in:"}
              </span>
              <div className="flex gap-2">
                {!timeLeft.expired ? (
                  <>
                    <div className="bg-[#03C05D]/20 border border-[#03C05D]/30 rounded px-2 py-1">
                      <span className="text-[#03C05D] font-bold text-sm">{timeLeft.days}d</span>
                    </div>
                    <div className="bg-[#03C05D]/20 border border-[#03C05D]/30 rounded px-2 py-1">
                      <span className="text-[#03C05D] font-bold text-sm">{timeLeft.hours}h</span>
                    </div>
                    <div className="bg-[#03C05D]/20 border border-[#03C05D]/30 rounded px-2 py-1">
                      <span className="text-[#03C05D] font-bold text-sm">{timeLeft.minutes}m</span>
                    </div>
                    <div className="bg-[#03C05D]/20 border border-[#03C05D]/30 rounded px-2 py-1">
                      <span className="text-[#03C05D] font-bold text-sm">{timeLeft.seconds}s</span>
                    </div>
                  </>
                ) : (
                  <div className="px-4 py-2 bg-red-500/20 border-2 border-red-500 rounded-lg">
                    <span className="text-red-500 font-bold text-sm uppercase tracking-wider">⏰ EXPIRED</span>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => !timeLeft.expired && navigate("/tournaments")}
              disabled={timeLeft.expired}
              className={`w-full sm:w-auto px-6 py-2.5 font-semibold text-sm md:text-base rounded-lg transition-all duration-300 whitespace-nowrap ${
                timeLeft.expired
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#03C05D] to-[#02a04d] text-white hover:scale-105 hover:shadow-lg hover:shadow-[#03C05D]/50"
              }`}
            >
              {timeLeft.expired ? "Registration Closed" : "Register Now →"}
            </button>


          </div>
        </div>
      </div>
    </div>
  )
}
