"use client"

import { useState, useEffect } from "react"

export default function CountdownTimer({ deadline }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(deadline) - new Date()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [deadline])

  return (
    <div className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#03C05D]/20 to-orange-500/20 border border-[#03C05D]/30 rounded-lg p-2">
      <svg className="w-3.5 h-3.5 text-[#03C05D] animate-pulse" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
          clipRule="evenodd"
        />
      </svg>
      <div className="flex items-center gap-1 text-xs font-bold">
        <span className="text-white">{timeLeft.days}d</span>
        <span className="text-[#03C05D]">:</span>
        <span className="text-white">{String(timeLeft.hours).padStart(2, "0")}h</span>
        <span className="text-[#03C05D]">:</span>
        <span className="text-white">{String(timeLeft.minutes).padStart(2, "0")}m</span>
        <span className="text-[#03C05D]">:</span>
        <span className="text-white">{String(timeLeft.seconds).padStart(2, "0")}s</span>
      </div>
    </div>
  )
}