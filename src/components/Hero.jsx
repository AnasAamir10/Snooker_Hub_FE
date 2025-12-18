import React, { useEffect } from 'react'
import heropic from '../assets/heropic.png'
import AOS from 'aos'
import 'aos/dist/aos.css'
import feather from 'feather-icons'

export default function Hero () {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true })
    feather.replace()
  }, [])

  return (
    <section className="hero-section relative min-h-screen flex items-center bg-black text-white pt-24 lg:pt-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 relative z-10">
        
        <div className="w-full lg:w-1/2 text-center lg:text-left" data-aos="fade-right">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-green-500">SNOOKER</span> HUB
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-300">
            Join thrilling tournaments, and experience snooker like never before.
          </p>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center relative" data-aos="fade-left">
          <img src={heropic} alt="Snooker Balls" 
            className="w-64 sm:w-80 md:w-[26rem] drop-shadow-2xl relative z-10" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#0d0d0d] z-0"></div>
    </section>
  )
}