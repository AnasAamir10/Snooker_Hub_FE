import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Features from '../components/Features'
import Perks from '../components/Perks'
import Pricing from '../components/Pricing'
import Tournaments from '../components/Tournaments'
import Reviews from '../components/Reviews'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton' 

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Perks />
      <Pricing />
      <Tournaments />
      <Reviews />
      <Footer />
      <WhatsAppButton /> {/* 👈 Add here */}
    </div>
  )
}
