import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthNavbar from '../components/AuthNavbar'
import SuccessAlert from '../components/SuccessAlert'

export default function ForgotPassword () {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [confirmationCode, setConfirmationCode] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()

  const handleSendCode = (e) => {
    e.preventDefault()
    setStep(2)
    setShowAlert(true)
  }

  const handleConfirmCode = (e) => {
    e.preventDefault()
    setShowAlert(true)
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
    if (step === 2) {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a]">
      <AuthNavbar />
      
      {showAlert && (
        <SuccessAlert 
          message={step === 1 ? "Confirmation code sent to your email!" : "Password reset successfully!"}
          onClose={handleCloseAlert}
        />
      )}

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-md mx-auto bg-[#121212] rounded-2xl shadow-2xl p-8 border border-gray-800">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {step === 1 ? 'Reset Password' : 'Enter Confirmation Code'}
            </h2>
            <p className="text-gray-400">
              {step === 1 
                ? 'Enter your email to receive a confirmation code' 
                : 'Enter the 6-digit code sent to your email'
              }
            </p>
          </div>
          
          {step === 1 ? (
            <form onSubmit={handleSendCode} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg"
              >
                Send Confirmation Code
              </button>
            </form>
          ) : (
            <form onSubmit={handleConfirmCode} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirmation Code</label>
                <input 
                  type="text" 
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength="6"
                  required
                />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Code sent to: {email}
                </p>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg"
              >
                Confirm Code & Reset Password
              </button>
            </form>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Remember your password?{' '}
              <Link to="/login" className="text-green-500 hover:text-green-400 font-semibold">
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}