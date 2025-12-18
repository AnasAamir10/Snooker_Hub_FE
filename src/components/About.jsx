import React, { useEffect } from 'react'
import Table from '../assets/Table.png' 
import AOS from 'aos'
import 'aos/dist/aos.css'
import feather from 'feather-icons'

export default function About () {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true })
    feather.replace()
  }, [])

  return (
    <section id="about" className="py-20 px-6 lg:px-12 bg-gradient-to-b from-[#0d0d0d] to-[#000000] text-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2" data-aos="fade-right">
            <h2 className="text-3xl font-extrabold mb-6">
              The Best Snooker Experience is at 
              <span className="bg-gradient-to-r from-[#03C05D] to-green-700 bg-clip-text text-transparent tracking-wide"> SNOOKER</span> 
              <span className="text-white"> Hub</span>
            </h2>
            <p className="text-gray-300 mb-6">
              Snooker Hub is more than just a club – it's a community of passionate players. 
              Our state-of-the-art tables, professional-grade equipment, and welcoming atmosphere 
              make us the premier destination for snooker enthusiasts of all skill levels.
            </p>
            <p className="text-gray-300">
              Whether you're looking for casual play, competitive tournaments, or professional coaching, 
              we have everything you need to elevate your game.
            </p>
          </div>
          
          <div className="lg:w-1/2" data-aos="fade-left">
            <img src={Table} alt="Snooker Table" className="rounded-xl" />
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up">
          
          <div className="bg-[#121212] border border-gray-700 rounded-xl shadow-lg p-6 flex items-center gap-4 hover:shadow-2xl transition duration-300">
            <div className="bg-[#03C05D]/20 p-3 rounded-full">
              <i data-feather="phone" className="text-[#03C05D] w-6 h-6"></i>
            </div>
            <div>
              <p className="text-sm text-gray-400">Contact Us</p>
              <a href="tel:+92 324 4494986" className="text-lg font-semibold text-white hover:text-[#03C05D] transition">
                +92 324 4494986
              </a>
            </div>
          </div>

          <div className="bg-[#121212] border border-gray-700 rounded-xl shadow-lg p-6 flex items-center gap-4 hover:shadow-2xl transition duration-300">
            <div className="bg-[#03C05D]/20 p-3 rounded-full">
              <i data-feather="clock" className="text-[#03C05D] w-6 h-6"></i>
            </div>
            <div>
              <p className="text-sm text-gray-400">Opening Hours</p>
              <p className="text-lg font-semibold text-white">Mon–Sun: 10AM - 12AM</p>
            </div>
          </div>

          <div className="bg-[#121212] border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#03C05D]/20 p-3 rounded-full">
                <i data-feather="map-pin" className="text-[#03C05D] w-6 h-6"></i>
              </div>
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-lg font-semibold text-white">
                  Branch Walton Rd, Madina Colony, Lahore, 54000
                </p>
              </div>
            </div>
            <a href="https://maps.app.goo.gl/aMVSyUHuiHeHuZgp7" target="_blank" 
              className="inline-block bg-[#03C05D] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition">
              View on Map
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}