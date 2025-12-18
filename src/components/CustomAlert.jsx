import React, { useEffect } from 'react'

export default function CustomAlert ({ message, type = 'success', duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getAlertStyles = () => {
    const baseStyles = "fixed top-6 right-6 z-[100] p-6 rounded-2xl shadow-2xl border-l-4 flex items-center space-x-4 max-w-md animate-slide-in"
    
    const typeStyles = {
      success: "bg-gradient-to-r from-green-50 to-green-100 border-green-500 text-green-800",
      error: "bg-gradient-to-r from-red-50 to-red-100 border-red-500 text-red-800",
      warning: "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-500 text-yellow-800",
      info: "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-500 text-blue-800"
    }

    return `${baseStyles} ${typeStyles[type]}`
  }

  const getIcon = () => {
    const icons = {
      success: (
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
          <i data-feather="check" className="text-white w-6 h-6"></i>
        </div>
      ),
      error: (
        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
          <i data-feather="x" className="text-white w-6 h-6"></i>
        </div>
      ),
      warning: (
        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30">
          <i data-feather="alert-triangle" className="text-white w-6 h-6"></i>
        </div>
      ),
      info: (
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
          <i data-feather="info" className="text-white w-6 h-6"></i>
        </div>
      )
    }
    return icons[type]
  }

  const getTitle = () => {
    const titles = {
      success: 'Success!',
      error: 'Error!',
      warning: 'Warning!',
      info: 'Information'
    }
    return titles[type]
  }

  return (
    <div className={getAlertStyles()}>
      {getIcon()}
      <div className="flex-1">
        <h4 className="font-bold text-lg mb-1">{getTitle()}</h4>
        <p className="text-sm">{message}</p>
      </div>
      <button 
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-white/50"
      >
        <i data-feather="x" className="w-5 h-5"></i>
      </button>
    </div>
  )
}