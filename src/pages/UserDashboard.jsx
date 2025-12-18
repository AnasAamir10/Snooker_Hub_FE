"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ProfileCard from "../components/UserDashboard/ProfileCard"
import StatsOverview from "../components/UserDashboard/StatsOverview"
import ActiveRegistrations from "../components/UserDashboard/ActiveRegistrations"
import TournamentHistory from "../components/UserDashboard/TournamentHistory"
import NotificationCenter from "../components/UserDashboard/NotificationCenter"
import FeaturedTournament from "../components/UserDashboard/FeaturedTournament"
import Logo from "../assets/Logo.png"

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const navigate = useNavigate()

  const handleLogout = () => {
    // Mock logout logic (replace with actual logout functionality, e.g., clearing tokens)
    localStorage.clear() // Example: Clear any stored session data
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a]">
      <nav className="bg-[#121212] shadow-lg py-4 px-6 lg:px-12 fixed w-full z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src={Logo} alt="Snooker Hub Logo" className="w-10 h-10 mr-2 shadow-md" />
            <span className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
              Snooker <span className="text-[#03C05D]">Hub</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="px-4 py-2 rounded-full font-semibold text-gray-300 border border-gray-600 hover:border-[#03C05D] hover:text-[#03C05D] transition"
            >
              Home
            </Link>
            <Link
              to="/tournaments"
              className="px-4 py-2 rounded-full font-semibold text-gray-300 border border-gray-600 hover:border-[#03C05D] hover:text-[#03C05D] transition"
            >
              Tournaments
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile & Stats */}
            <div className="lg:col-span-1 space-y-6">
              <ProfileCard />
              <StatsOverview />
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 rounded-lg font-semibold bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500/20 hover:border-red-500 hover:text-red-300 transition shadow-sm"
              >
                Logout
              </button>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tab Navigation */}
              <div className="flex gap-2 p-1 bg-[#0f0f0f] rounded-lg border border-gray-800">
                {["overview", "history", "notifications"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      activeTab === tab
                        ? "bg-[#03C05D] text-white"
                        : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "overview" && (
                <>
                  <FeaturedTournament />
                  <ActiveRegistrations />
                </>
              )}
              {activeTab === "history" && <TournamentHistory />}
              {activeTab === "notifications" && <NotificationCenter />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}