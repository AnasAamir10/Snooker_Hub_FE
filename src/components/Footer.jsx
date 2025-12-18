import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import AOS from 'aos'
import 'aos/dist/aos.css'
import feather from 'feather-icons'

export default function Footer () {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true })
    feather.replace()
  }, [])

  return (
    <footer id="contact" className="bg-black text-white py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center mb-4">
              <img src={Logo} alt="Snooker Hub Logo" className="w-10 h-10 rounded-full mr-2 shadow-md" />
              <span className="text-2xl font-extrabold text-white tracking-wide">
                Snooker <span className="text-green-500">Hub</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">Play. Connect. Compete.</p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#121212] flex items-center justify-center hover:bg-green-600 transition">
                <i data-feather="facebook"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#121212] flex items-center justify-center hover:bg-green-600 transition">
                <i data-feather="instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#121212] flex items-center justify-center hover:bg-green-600 transition">
                <i data-feather="twitter"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition">About Us</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition">Pricing</a></li>
              <li><a href="#tournaments" className="text-gray-400 hover:text-white transition">Tournaments</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i data-feather="map-pin" className="mr-3 mt-1"></i>
                <span className="text-gray-400">Branch Walton Rd, Madina Colony, Lahore, 54000</span>
              </li>
              <li className="flex items-start">
                <i data-feather="mail" className="mr-3 mt-1"></i>
                <span className="text-gray-400">info@snookerhub.com</span>
              </li>
              <li className="flex items-start">
                <i data-feather="phone" className="mr-3 mt-1"></i>
                <span className="text-gray-400">+92 324 4494986</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>© 2025 Snooker Hub ~ By Zain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}