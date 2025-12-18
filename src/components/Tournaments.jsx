"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import RegisterModal from "./RegisterModal"
import SuccessAlert from "./SuccessAlert"

function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
      }
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return [ref, isInView]
}

function CountdownTimer({ deadline }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(deadline) - new Date()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [deadline])

  return (
    <div className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#03C05D]/20 to-orange-500/20 border border-[#03C05D]/30 rounded-lg p-2">
      <svg className="w-3.5 h-3.5 text-[#03C05D] animate-pulse" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
          clipRule="evenodd"
        />
      </svg>
      <div className="flex items-center gap-1 text-xs font-bold">
        <span className="text-white">{timeLeft.days}d</span>
        <span className="text-[#03C05D]">:</span>
        <span className="text-white">{String(timeLeft.hours).padStart(2, "0")}h</span>
        <span className="text-[#03C05D]">:</span>
        <span className="text-white">{String(timeLeft.minutes).padStart(2, "0")}m</span>
        <span className="text-[#03C05D]">:</span>
        <span className="text-white">{String(timeLeft.seconds).padStart(2, "0")}s</span>
      </div>
    </div>
  )
}

export default function Tournaments() {
  const navigate = useNavigate()
  const [selectedTournament, setSelectedTournament] = useState(null)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const [headerRef, headerInView] = useInView({ threshold: 0.1 })
  const [cardsRef, cardsInView] = useInView({ threshold: 0.1 })
  const [buttonRef, buttonInView] = useInView({ threshold: 0.1 })

  const activeTournaments = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1488923566472-4b2d13a4af3b?w=600&auto=format&fit=crop&q=60",
      title: "Weekly Amateur Cup",
      date: "Every Saturday, 2PM",
      fee: 1000,
      totalPrize: 10000,
      currentEntries: 23,
      maxEntries: 30,
      registrationDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1651158752557-7b535a968188?w=600&auto=format&fit=crop&q=60",
      title: "Monthly Pro Challenge",
      date: "First Sunday, 4PM",
      fee: 2500,
      totalPrize: 30000,
      currentEntries: 15,
      maxEntries: 24,
      registrationDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1730581042361-4c14470a4550?w=600&auto=format&fit=crop&q=60",
      title: "Annual Championship",
      date: "Dec 15-20, 6PM",
      fee: 5000,
      totalPrize: 100000,
      currentEntries: 8,
      maxEntries: 32,
      registrationDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  const getUrgencyBadge = (current, max) => {
    const percent = (current / max) * 100
    if (percent >= 90)
      return { text: "ALMOST FULL", color: "text-orange-400", bg: "bg-orange-500/20", border: "border-orange-500/40" }
    if (percent >= 70)
      return { text: "FILLING FAST", color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/40" }
    return { text: "OPEN NOW", color: "text-[#03C05D]", bg: "bg-[#03C05D]/20", border: "border-[#03C05D]/40" }
  }

  const handleRegisterClick = (tournament) => {
    setSelectedTournament(tournament)
    setShowRegisterModal(true)
  }

  const handleRegistrationComplete = () => {
    setShowRegisterModal(false)
    setShowSuccessAlert(true)
  }

  const handleViewAllClick = () => {
    navigate("/tournaments")
  }

  return (
    <>
      <section id="tournaments" className="py-20 px-6 lg:px-12 bg-gradient-to-r from-[#1a1a1a] to-[#0d0d0d] text-white">
        <div className="max-w-7xl mx-auto">
          <div
            ref={headerRef}
            className={`transition-all duration-1000 ${headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl font-bold text-center mb-4 text-white">
              Upcoming <span className="text-[#03C05D]">Tournaments</span>
            </h2>
            <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
              Register now for our featured tournaments and compete with the best players
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeTournaments.map((tournament, index) => {
              const urgency = getUrgencyBadge(tournament.currentEntries, tournament.maxEntries)
              const spotsLeft = tournament.maxEntries - tournament.currentEntries

              return (
                <div
                  key={tournament.id}
                  className={`bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl overflow-hidden border-2 border-gray-800 hover:border-[#03C05D] hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-[#03C05D]/30 ${cardsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: cardsInView ? `${index * 150}ms` : "0ms" }}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={tournament.image || "/placeholder.svg"}
                      alt={tournament.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div
                      className={`absolute top-3 right-3 ${urgency.bg} ${urgency.border} border backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5`}
                    >
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      <span className={`${urgency.color} text-xs font-bold`}>{urgency.text}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                      <div className="bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-700 flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#03C05D]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        <span className="text-white text-sm font-bold">
                          {tournament.currentEntries}/{tournament.maxEntries}
                        </span>
                      </div>
                      <div className="bg-[#03C05D]/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                        <span className="text-black text-xs font-bold">{spotsLeft} LEFT</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-xl font-bold text-white">{tournament.title}</h3>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <svg className="w-4 h-4 text-[#03C05D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-xs">{tournament.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <svg className="w-4 h-4 text-[#03C05D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                    <div className="bg-[#0a0a0a] rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs">Entry Fee</span>
                        <span className="text-[#03C05D] font-bold">PKR {tournament.fee}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs">Prize Pool</span>
                        <span className="text-white font-bold">PKR {tournament.totalPrize.toLocaleString()}</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-400 mb-1.5">Registration Closes:</div>
                      <CountdownTimer deadline={tournament.registrationDeadline} />
                    </div>

                    <button
                      onClick={() => handleRegisterClick(tournament)}
                      className="w-full py-2.5 rounded-lg font-semibold bg-gradient-to-r from-[#03C05D] to-[#02a04d] text-black hover:from-[#02a04d] hover:to-[#028a40] transition-all duration-300 shadow-lg hover:shadow-[#03C05D]/50"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <div
            ref={buttonRef}
            className={`text-center mt-12 transition-all duration-1000 ${buttonInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <button
              onClick={handleViewAllClick}
              className="px-8 py-3 rounded-full font-semibold border-2 border-[#03C05D] text-[#03C05D] hover:bg-[#03C05D] hover:text-white transition-all duration-300 shadow-lg hover:shadow-[#03C05D]/50"
            >
              View All Tournaments
            </button>
          </div>
        </div>
      </section>

      {showRegisterModal && selectedTournament && (
        <RegisterModal
          tournament={selectedTournament}
          onClose={() => setShowRegisterModal(false)}
          onRegister={handleRegistrationComplete}
        />
      )}

      {showSuccessAlert && (
        <SuccessAlert
          message="Registration successful! Your entry will be confirmed once payment is verified."
          onClose={() => setShowSuccessAlert(false)}
        />
      )}
    </>
  )
}
