import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import feather from 'feather-icons'

export default function AllTournamentsModal ({ tournaments, onClose, onRegister }) {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true })
    feather.replace()
  }, [])

  const allTournaments = [
    ...tournaments,
    {
      id: 4,
      name: 'Weekend Special',
      date: 'Every Friday, 6PM',
      fee: 1200,
      description: 'Perfect for weekend warriors',
      image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 5,
      name: 'Rookie Rumble',
      date: 'Every Wednesday, 3PM',
      fee: 800,
      description: 'Beginner-friendly tournament',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 6,
      name: 'Champions League',
      date: 'Monthly Finals',
      fee: 3500,
      description: 'Elite players only',
      image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=600&auto=format&fit=crop&q=60'
    }
  ]

  const handleRegisterClick = (tournament) => {
    onClose() // Close the modal first
    onRegister(tournament) // Then open the registration modal
  }

  const handleContactClick = () => {
    onClose() // Close the modal
    // Scroll to contact section
    setTimeout(() => {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#121212] rounded-2xl shadow-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              All Tournaments
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <i data-feather="x" className="w-6 h-6"></i>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-6">
            {allTournaments.map((tournament) => (
              <div key={tournament.id} className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-700 hover:border-green-500 transition">
                <div className="flex flex-col md:flex-row">
                  <img 
                    src={tournament.image} 
                    alt={tournament.name}
                    className="w-full md:w-48 h-48 object-cover"
                  />
                  <div className="flex-1 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{tournament.name}</h3>
                        <div className="flex items-center text-gray-400 mb-2">
                          <i data-feather="calendar" className="mr-2 w-4 h-4"></i>
                          <span>{tournament.date}</span>
                        </div>
                        <div className="flex items-center text-green-500 font-semibold mb-3">
                          <i data-feather="dollar-sign" className="mr-2 w-4 h-4"></i>
                          <span>Entry Fee: PKR {tournament.fee}</span>
                        </div>
                        {tournament.description && (
                          <p className="text-gray-400 text-sm mb-4">{tournament.description}</p>
                        )}
                      </div>
                      <div className="flex justify-end">
                        <button 
                          onClick={() => handleRegisterClick(tournament)}
                          className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition whitespace-nowrap"
                        >
                          Register Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Can't find what you're looking for?{' '}
              <button 
                onClick={handleContactClick}
                className="text-green-500 hover:text-green-400 font-semibold"
              >
                Contact us
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}