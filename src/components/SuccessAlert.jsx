import React, { useEffect } from 'react'

export default function SuccessAlert ({ 
  title = "Success!", 
  message, 
  duration = 3000, 
  onClose,
  showProgress = true 
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className="fixed top-6 right-6 z-[100] bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-2xl max-w-md animate-slide-in">
      {/* Progress Bar */}
      {showProgress && (
        <div className="w-full bg-green-400 rounded-full h-1 mb-4 overflow-hidden">
          <div 
            className="bg-white h-full rounded-full animate-progress"
            style={{ animationDuration: `${duration}ms` }}
          ></div>
        </div>
      )}
      
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <i data-feather="check-circle" className="w-6 h-6"></i>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-lg mb-1">{title}</h4>
          <p className="text-green-50 text-sm">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-green-100 hover:text-white transition-colors p-1 rounded-full hover:bg-white/20"
        >
          <i data-feather="x" className="w-5 h-5"></i>
        </button>
      </div>
    </div>
  )
}