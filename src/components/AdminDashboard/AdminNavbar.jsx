import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png'

export default function AdminNavbar() {
  return (
    <nav className="bg-[#121212] shadow-lg py-4 px-6 lg:px-12 fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={Logo} alt="Snooker Hub Logo" className="w-10 h-10 mr-2 shadow-md" />
          <span className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
            Snooker <span className="text-green-500">Hub</span> Admin
          </span>
        </div>
        <Link to="/" className="px-4 py-2 rounded-full font-semibold text-gray-300 border border-gray-600 hover:border-green-500 hover:text-green-500 transition">
          Back to Site
        </Link>
      </div>
    </nav>
  )
}