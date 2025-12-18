import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import feather from 'feather-icons'

export default function Perks () {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true })
    feather.replace()
  }, [])

  const perks = [
    {
      icon: 'award',
      title: 'Tournament-Grade Tables',
      description: 'Play on 5 premium Rasson tables with professional cloth — built for tournaments and serious practice.'
    },
    {
      icon: 'users',
      title: 'Community & Events',
      description: 'Join exciting tournaments, meet new players, and be part of a thriving snooker community.'
    },
    {
      icon: 'smartphone',
      title: 'Easy Booking',
      description: 'Reserve tables anytime and pay easily via Easypaisa or JazzCash — quick and simple.'
    },
    {
      icon: 'coffee',
      title: 'Snacks & Café',
      description: 'Take a break and enjoy fresh snacks and drinks to recharge between matches.'
    },
    {
      icon: 'wifi',
      title: 'Free WiFi',
      description: 'Stay connected while you play, stream, or relax in our club environment.'
    },
    {
      icon: 'smile',
      title: 'Premium Experience',
      description: 'Play in a professional yet welcoming atmosphere crafted for snooker lovers of all levels.'
    }
  ]

  return (
    <section className="py-20 px-6 lg:px-12 bg-gradient-to-r from-[#1a1a1a] to-[#0d0d0d] text-white relative">
      <div className="max-w-7xl mx-auto text-center mb-16" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Why Choose <span className="text-[#03C05D]">Snooker Hub?</span>
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          A world-class snooker destination with seamless booking, premium facilities,
          and a welcoming community.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {perks.map((perk, index) => (
          <div 
            key={index}
            className="bg-[#121212] p-8 rounded-2xl shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300" 
            data-aos="zoom-in" 
            data-aos-delay={index * 100}
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#03C05D]/10 mb-6">
              <i data-feather={perk.icon} className="text-[#03C05D] w-7 h-7"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3">{perk.title}</h3>
            <p className="text-gray-400">{perk.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}