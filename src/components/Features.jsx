import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import feather from 'feather-icons'

export default function Features () {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true })
    feather.replace()
  }, [])

  return (
    <section className="relative py-20 px-6 lg:px-12 bg-gradient-to-r from-[#1a1a1a] to-[#0d0d0d] text-white">
    
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#121212] to-transparent"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        <h2 className="text-4xl font-extrabold text-center mb-16">
          Relax, Refresh & Play at <span className="text-[#03C05D]">Snooker Hub</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-[#121212] p-10 rounded-2xl shadow-xl text-center hover:scale-105 hover:shadow-[#03C05D]/40 transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
            <div className="w-16 h-16 bg-[#03C05D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#03C05D]/50">
              <i data-feather="coffee" className="text-white w-8 h-8"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Just Relax</h3>
            <p className="text-gray-300">Chill in our comfy lounge and enjoy refreshments between your snooker sessions.</p>
          </div>

          <div className="bg-[#121212] p-10 rounded-2xl shadow-xl text-center hover:scale-105 hover:shadow-[#03C05D]/40 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
            <div className="w-16 h-16 bg-[#03C05D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#03C05D]/50">
              <i data-feather="shopping-bag" className="text-white w-8 h-8"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Eat Well</h3>
            <p className="text-gray-300">Fuel your game with snacks and beverages from our café — perfect for long playing hours.</p>
          </div>

          <div className="bg-[#121212] p-10 rounded-2xl shadow-xl text-center hover:scale-105 hover:shadow-[#03C05D]/40 transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
            <div className="w-16 h-16 bg-[#03C05D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#03C05D]/50">
              <i data-feather="activity" className="text-white w-8 h-8"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Play On</h3>
            <p className="text-gray-300">Enjoy premium snooker tables and pro equipment designed for a world-class experience.</p>
          </div>
        </div>
      </div>
    </section>
  )
}