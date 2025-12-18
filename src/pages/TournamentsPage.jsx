"use client"

import { useState, useEffect } from "react"
import RegisterModal from "../components/RegisterModal"
import HeroSection from "../components/Tournaments/HeroSection"
import SectionHeader from "../components/Tournaments/SectionHeader"
import Divider from "../components/Tournaments/Divider"
import TournamentCard from "../components/Tournaments/TournamentCard"
import { tournamentAPI } from "../services/api"

export default function TournamentsPage() {
  const [selectedTournament, setSelectedTournament] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [availableTournaments, setAvailableTournaments] = useState([])
  const [previousTournaments, setPreviousTournaments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTournaments()
  }, [])

  const fetchTournaments = async () => {
    try {
      setLoading(true)
      setError(null)
      const tournaments = await tournamentAPI.getAll()
      
      // Transform and separate tournaments
      const transformed = tournaments.map(t => ({
        id: t.id,
        name: t.name,
        date: t.date,
        registrationFee: t.fee || 0,
        totalPrize: Math.round((t.fee || 0) * (t.maxPlayers || 32) * 0.9), // Calculate prize pool (90% of total fees)
        image: t.image || "",
        currentEntries: t.registered || 0,
        maxEntries: t.maxPlayers || 32,
        registrationDeadline: calculateDeadline(t.date), // Calculate deadline from date
        status: t.status
      }))

      // Separate into available (upcoming/ongoing) and previous (completed)
      const available = transformed.filter(t => t.status === 'upcoming' || t.status === 'ongoing')
      const previous = transformed
        .filter(t => t.status === 'completed')
        .map(t => ({
          ...t,
          location: "Snooker Hub", // Default location
          winner: "TBD", // Placeholder - can be updated when tournament model includes winner info
          runnerUp: "TBD",
          thirdPlace: "TBD",
          prizeMoney: `PKR ${t.totalPrize.toLocaleString()}`,
          totalEntries: t.maxEntries
        }))

      setAvailableTournaments(available)
      setPreviousTournaments(previous)
    } catch (err) {
      console.error('Error fetching tournaments:', err)
      setError('Failed to load tournaments. Please try again later.')
      // Set empty arrays on error
      setAvailableTournaments([])
      setPreviousTournaments([])
    } finally {
      setLoading(false)
    }
  }

  // Helper function to calculate registration deadline (7 days before tournament date)
  const calculateDeadline = (dateString) => {
    try {
      // Try to parse the date string - it might be in various formats
      // For now, set deadline to 7 days from now as fallback
      const deadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      return deadline.toISOString()
    } catch {
      // Fallback: 7 days from now
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    }
  }

  const handleRegister = (tournament) => {
    setSelectedTournament(tournament)
    setIsModalOpen(true)
  }

  const availableIcon = (
    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
        clipRule="evenodd"
      />
    </svg>
  )

  const previousIcon = (
    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
      <path
        fillRule="evenodd"
        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
        clipRule="evenodd"
      />
    </svg>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <HeroSection />

      {loading ? (
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center text-gray-400">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#03C05D] mb-4"></div>
            <p>Loading tournaments...</p>
          </div>
        </section>
      ) : error ? (
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center text-red-400">
            <p>{error}</p>
            <button
              onClick={fetchTournaments}
              className="mt-4 px-4 py-2 bg-[#03C05D] text-black rounded-lg hover:bg-[#02a04d] transition"
            >
              Retry
            </button>
          </div>
        </section>
      ) : (
        <>
          <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto relative">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#03C05D]/5 to-transparent pointer-events-none"></div>

            <SectionHeader
              icon={availableIcon}
              title="Available Tournaments"
              subtitle="Open for Registration"
              accentColor="[#03C05D]"
            />

            {availableTournaments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableTournaments.map((tournament) => (
                  <TournamentCard
                    key={tournament.id}
                    tournament={tournament}
                    type="available"
                    onRegister={handleRegister}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <p>No available tournaments at the moment. Check back soon!</p>
              </div>
            )}
          </section>

          {previousTournaments.length > 0 && (
            <>
              <Divider text="Past Events" />

              <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto bg-gradient-to-b from-transparent to-[#0a0a0a] relative">
                <SectionHeader
                  icon={previousIcon}
                  title="Previous Tournaments"
                  subtitle="Completed Events & Champions"
                  accentColor="gray-600"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {previousTournaments.map((tournament) => (
                    <TournamentCard
                      key={tournament.id}
                      tournament={tournament}
                      type="previous"
                      onRegister={handleRegister}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </>
      )}

      {isModalOpen && selectedTournament && (
        <RegisterModal
          tournament={selectedTournament}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedTournament(null)
          }}
        />
      )}
    </div>
  )
}