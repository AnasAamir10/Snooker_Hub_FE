import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../assets/Logo.png'
import AOS from 'aos'
import 'aos/dist/aos.css'
import feather from 'feather-icons'

export default function Navbar () {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true })
  }, [])

  // Replace Feather icons after component mounts and state updates
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      feather.replace()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  // Update Feather icons when dropdown or mobile menu state changes
  useEffect(() => {
    feather.replace()
  }, [isDropdownOpen, isMobileMenuOpen])

  // Also replace icons after a short delay when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      feather.replace()
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Logout function
  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false)
    setIsMobileMenuOpen(false)
    navigate('/')
  }

  // Handle dashboard navigation based on user role
  const handleDashboard = () => {
    setIsDropdownOpen(false)
    setIsMobileMenuOpen(false)
    
    if (user?.role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/user')
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])
  
  return (
    <nav className="bg-[#121212] shadow-lg py-4 px-6 lg:px-12 fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="flex items-center">
          <img src={Logo} alt="Snooker Hub Logo" className="w-10 h-10 mr-2 shadow-md" />
          <span className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
            Snooker <span className="text-green-500">Hub</span>
          </span>
        </div>
        
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="font-medium text-gray-300 hover:text-green-500 transition">Home</Link>
          <a href="#about" className="font-medium text-gray-300 hover:text-green-500 transition">About Us</a>
          <a href="#pricing" className="font-medium text-gray-300 hover:text-green-500 transition">Pricing</a>
          <a href="#tournaments" className="font-medium text-gray-300 hover:text-green-500 transition">Tournaments</a>
          <a href="#contact" className="font-medium text-gray-300 hover:text-green-500 transition">Contact</a>
        </div>

        {/* Conditional rendering based on authentication status */}
        <div className="hidden md:flex space-x-4 items-center">
          {user ? (
            <div className="relative user-dropdown">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 px-4 py-2 rounded-full font-semibold text-gray-300 border border-gray-600 hover:border-green-500 hover:text-green-500 transition"
              >
                <div className="flex items-center space-x-2">
                  <i data-feather="user" className="w-4 h-4 text-green-500"></i>
                  <span className="text-green-500">{user.name || user.email}</span>
                </div>
                <div className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                  <i data-feather="chevron-down" className="w-4 h-4"></i>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-xl py-2 z-50">
                  <button
                    onClick={handleDashboard}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-green-500 transition flex items-center"
                  >
                    <i data-feather="layout" className="w-4 h-4 mr-3"></i>
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-red-500 transition flex items-center"
                  >
                    <i data-feather="log-out" className="w-4 h-4 mr-3"></i>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 rounded-full font-semibold text-gray-300 border border-gray-600 hover:border-green-500 hover:text-green-500 transition">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 rounded-full font-semibold bg-green-600 text-white hover:bg-green-700 shadow-md transition">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button 
          id="menu-btn" 
          className="md:hidden text-gray-300 hover:text-green-500 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i data-feather="menu"></i>
        </button>
      </div>

      <div 
        id="mobile-menu" 
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-[#1a1a1a] px-6 py-4 space-y-4`}
      >
        <Link to="/" className="block text-gray-300 hover:text-green-500" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
        <a href="#about" className="block text-gray-300 hover:text-green-500" onClick={() => setIsMobileMenuOpen(false)}>About Us</a>
        <a href="#pricing" className="block text-gray-300 hover:text-green-500" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
        <a href="#tournaments" className="block text-gray-300 hover:text-green-500" onClick={() => setIsMobileMenuOpen(false)}>Tournaments</a>
        <a href="#contact" className="block text-gray-300 hover:text-green-500" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        
        <div className="flex flex-col space-y-3 pt-4 border-t border-gray-700">
          {user ? (
            <>
              <div className="flex items-center justify-center space-x-2 text-gray-300 py-2">
                <i data-feather="user" className="w-4 h-4 text-green-500"></i>
                <span>Welcome, <span className="text-green-500">{user.name || user.email}</span></span>
              </div>
              <button 
                onClick={handleDashboard}
                className="px-4 py-2 rounded-full font-semibold text-gray-300 border border-gray-600 hover:border-green-500 hover:text-green-500 transition text-center flex items-center justify-center space-x-2"
              >
                <i data-feather="layout" className="w-4 h-4"></i>
                <span>Dashboard</span>
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 rounded-full font-semibold text-gray-300 border border-gray-600 hover:border-red-500 hover:text-red-500 transition flex items-center justify-center space-x-2"
              >
                <i data-feather="log-out" className="w-4 h-4"></i>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 rounded-full font-semibold text-gray-300 border border-gray-600 hover:border-green-500 hover:text-green-500 transition text-center" onClick={() => setIsMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 rounded-full font-semibold bg-green-600 text-white hover:bg-green-700 shadow-md transition text-center" onClick={() => setIsMobileMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}