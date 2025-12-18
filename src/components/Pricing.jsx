import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import feather from 'feather-icons'

export default function Pricing () {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true })
    feather.replace()
  }, [])
  
  const pricingItems = [
    { name: 'Single Frame (10 Balls)', price: 'Rs 160' },
    { name: 'Single Frame (15 Balls)', price: 'Rs 190' },
    { name: 'Double Frame', price: 'Rs 380' },
    { name: 'Century (Per Minute)', price: 'Rs 13' },
    { name: 'Table Booking (Per Hour)', price: 'Rs 1000' }
  ]

  return (
    <section id="pricing" className="py-20 px-6 lg:px-12 bg-gradient-to-r from-[#1a1a1a] to-[#0d0d0d] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-12">
          Snooker Hub <span className="text-[#03C05D]">Pricing</span>
        </h2>

        <div className="bg-[#121212] rounded-2xl shadow-2xl p-10 relative overflow-hidden border border-gray-800">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#03C05D] to-green-700"></div>

          <ul className="space-y-6 text-left">
            {pricingItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center border-b border-gray-700 pb-3">
                <span className="text-lg font-medium text-gray-300">{item.name}</span>
                <span className="text-2xl font-bold text-[#03C05D]">{item.price}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-400/30 rounded-xl p-4 max-w-md mx-auto">
              <p className="text-red-300 font-medium text-lg">
                📞 Bookings can only be done via call
              </p>
              <p className="text-white font-bold text-xl mt-2">
                Contact: +92 324 4494986
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}