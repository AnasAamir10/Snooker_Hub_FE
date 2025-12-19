"use client"
import React, { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import feather from "feather-icons"

export default function Reviews() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true })
    feather.replace()
  }, [])

  const reviews = [
    {
      initial: "A",
      name: "Ahsan Hashmi",
      details: "5 reviews · 11 photos",
      rating: 5,
      comment:
        "Best place for snooker lovers in Walton. Professional setup, perfect tables, and a welcoming vibe.",
    },
    {
      initial: "L",
      name: "Liam Khan",
      details: "2 reviews",
      rating: 5,
      comment:
        "The tables are in excellent condition, and the staff is really helpful. A perfect spot to improve your game.",
    },
    {
      initial: "U",
      name: "Usama Awan",
      details: "1 review",
      rating: 5,
      comment:
        "Great environment for serious snooker practice. Respectful staff and professional atmosphere.",
    },
    {
      initial: "M",
      name: "Moiz Ahmed",
      details: "3 reviews",
      rating: 5,
      comment:
        "Love the ambiance and the quality of tables here. Great lighting and professional setup!",
    },
    {
      initial: "Z",
      name: "Zeeshan Malik",
      details: "4 reviews",
      rating: 5,
      comment:
        "One of the best snooker clubs I’ve been to. Super clean and organized!",
    },
  ]

  const renderStars = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating)

  return (
    <section
      id="reviews"
      className="relative py-28 px-6 lg:px-12 overflow-hidden bg-gradient-to-r from-[#1a1a1a] to-[#0d0d0d] text-white"
    >
      {/* Keyframes for infinite horizontal scroll */}
      <style>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div className="max-w-[95rem] mx-auto text-center relative z-10">
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-5xl font-extrabold mb-20 text-white tracking-tight"
        >
          What Our <span className="text-[#03C05D]">Players Say</span>
        </h2>

        {/* Carousel container */}
        <div className="relative overflow-visible" data-aos="fade-up">
          <div className="flex gap-10 w-[220rem] animate-[scrollLeft_30s_linear_infinite] hover:[animation-play-state:paused]">
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="min-w-[24rem] max-w-[25rem] bg-gradient-to-br from-[#1f1f1f]/90 to-[#121212]/90 backdrop-blur-md 
                border border-[#03C05D]/20 rounded-2xl shadow-[0_0_20px_rgba(3,192,93,0.15)] 
                p-7 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 
                hover:shadow-[0_0_35px_rgba(3,192,93,0.35)]"
              >
                <div className="flex items-center mb-5">
                  <div className="bg-gradient-to-br from-[#03C05D]/40 to-[#02a04d]/20 text-[#03C05D] font-bold rounded-full w-12 h-12 flex items-center justify-center text-lg">
                    {review.initial}
                  </div>
                  <div className="ml-3 text-left">
                    <p className="font-semibold text-white text-lg">{review.name}</p>
                    <p className="text-sm text-gray-400">{review.details}</p>
                  </div>
                </div>

                <div className="flex text-yellow-400 mb-4 text-lg">
                  {renderStars(review.rating)}
                </div>

                <p className="text-gray-300 leading-relaxed text-base">
                  “{review.comment}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
