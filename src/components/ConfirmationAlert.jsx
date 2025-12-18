import React from 'react'

export default function ConfirmationAlert ({ 
  title = "Are you sure?", 
  message = "This action cannot be undone.", 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  type = "warning",
  onConfirm, 
  onCancel 
}) {
  const getStyles = () => {
    const baseStyles = "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4"
    return baseStyles
  }

  const getButtonStyles = () => {
    const styles = {
      warning: {
        confirm: "bg-red-600 hover:bg-red-700 text-white",
        cancel: "bg-gray-600 hover:bg-gray-700 text-white"
      },
      danger: {
        confirm: "bg-red-600 hover:bg-red-700 text-white",
        cancel: "bg-gray-600 hover:bg-gray-700 text-white"
      },
      info: {
        confirm: "bg-blue-600 hover:bg-blue-700 text-white",
        cancel: "bg-gray-600 hover:bg-gray-700 text-white"
      },
      success: {
        confirm: "bg-green-600 hover:bg-green-700 text-white",
        cancel: "bg-gray-600 hover:bg-gray-700 text-white"
      }
    }
    return styles[type]
  }

  const getIcon = () => {
    const icons = {
      warning: (
        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30 mb-4">
          <i data-feather="alert-triangle" className="text-white w-8 h-8"></i>
        </div>
      ),
      danger: (
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 mb-4">
          <i data-feather="alert-octagon" className="text-white w-8 h-8"></i>
        </div>
      ),
      info: (
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
          <i data-feather="info" className="text-white w-8 h-8"></i>
        </div>
      ),
      success: (
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 mb-4">
          <i data-feather="check-circle" className="text-white w-8 h-8"></i>
        </div>
      )
    }
    return icons[type]
  }

  return (
    <div className={getStyles()}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform animate-scale-in">
        {getIcon()}
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-8">{message}</p>
        
        <div className="flex space-x-4">
          <button 
            onClick={onCancel}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${getButtonStyles().cancel}`}
          >
            {cancelText}
          </button>
          <button 
            onClick={onConfirm}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${getButtonStyles().confirm}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}