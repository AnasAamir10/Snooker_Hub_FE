"use client"

import { useState, useEffect } from "react"
import SuccessAlert from "./SuccessAlert"
import { registrationAPI } from "../services/api"

export default function RegisterModal({ tournament, onClose }) {
  const [step, setStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    paymentAccount: "jazzcash",
    paymentSlip: null,
  })

  useEffect(() => {
    if (typeof window !== "undefined" && window.feather) {
      window.feather.replace()
    }
  }, [showSuccess])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (error) setError(null)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, paymentSlip: file }))
    }
  }

  const handleNext = () => {
    if (step < 3) {
      setError(null)
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setError(null)
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    // Validate form data
    if (!formData.fullName.trim()) {
      setError("Please enter your full name")
      return
    }
    if (!formData.phone.trim()) {
      setError("Please enter your phone number")
      return
    }
    if (!formData.paymentSlip) {
      setError("Please upload a payment slip")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Try multiple possible ID fields
      const tournamentId = tournament._id || tournament.id || tournament.tournamentId


      if (!tournamentId) {
        console.error("Tournament object structure:", JSON.stringify(tournament, null, 2))
        throw new Error("Tournament ID is missing. Please refresh the page and try again.")
      }
      const result = await registrationAPI.register(
        tournamentId,
        formData,
        formData.paymentSlip
      )

      if (result.success) {
        setShowSuccess(true)
      } else {
        throw new Error(result.message || "Registration failed")
      }
    } catch (err) {
      console.error("Registration error:", err)
      setError(err.message || "Failed to submit registration. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    onClose()
  }

  const paymentAccounts = {
    jazzcash: {
      name: "JazzCash",
      icon: "📱",
      accountNumber: "0300-1234567",
      accountName: "Snooker Hub",
    },
    easypaisa: {
      name: "Easypaisa",
      icon: "💳",
      accountNumber: "0321-7654321",
      accountName: "Snooker Hub",
    },
    bank: {
      name: "Bank Account",
      icon: "🏦",
      accountNumber: "PK12 HABB 0012 3456 7890 1234",
      accountName: "Snooker Hub",
      bankName: "Habib Bank Limited (HBL)",
    },
  }

  return (
    <>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0a0a0a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #03C05D;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #02a04d;
        }
      `}</style>

      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="custom-scrollbar bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border-b border-gray-800 p-6 flex items-center justify-between backdrop-blur-sm z-10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Tournament Registration</h2>
              <p className="text-gray-400 text-sm">{tournament.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors hover:rotate-90 duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-8 border-b border-gray-800">
            <div className="relative max-w-lg mx-auto">
              {/* Connecting Line Background */}
              <div
                className="absolute top-5 left-0 right-0 h-1 bg-gray-800"
                style={{ left: "2.5rem", right: "2.5rem" }}
              ></div>
              {/* Connecting Line Progress */}
              <div
                className="absolute top-5 left-0 h-1 bg-gradient-to-r from-[#03C05D] to-[#02a04d] transition-all duration-500"
                style={{
                  left: "2.5rem",
                  width: step === 1 ? "0%" : step === 2 ? "calc(50% - 2.5rem)" : "calc(100% - 5rem)",
                }}
              ></div>

              {/* Steps */}
              <div className="relative flex items-center justify-between">
                {[
                  { num: 1, label: "Personal Info" },
                  { num: 2, label: "Payment" },
                  { num: 3, label: "Upload Slip" },
                ].map((item) => (
                  <div key={item.num} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= item.num
                          ? "bg-gradient-to-br from-[#03C05D] to-[#02a04d] text-black shadow-lg shadow-[#03C05D]/50 scale-110"
                          : "bg-gray-800 text-gray-400"
                        }`}
                    >
                      {step > item.num ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        item.num
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium transition-colors ${step >= item.num ? "text-[#03C05D]" : "text-gray-500"
                        }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">Personal Information</h3>
                  <p className="text-gray-400 text-sm">Please provide your basic details to continue</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#03C05D] focus:ring-2 focus:ring-[#03C05D]/20 transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#03C05D] focus:ring-2 focus:ring-[#03C05D]/20 transition-all"
                    placeholder="+92 3XX XXXXXXX"
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">Payment Details</h3>
                  <p className="text-gray-400 text-sm">Select your preferred payment method</p>
                </div>

                {/* Entry Fee Display */}
                <div className="bg-gradient-to-r from-[#03C05D]/10 to-[#02a04d]/10 border border-[#03C05D]/30 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Entry Fee</p>
                      <p className="text-3xl font-bold text-[#03C05D]">{tournament.registrationFee}</p>
                    </div>
                    <div className="w-16 h-16 bg-[#03C05D]/20 rounded-full flex items-center justify-center">
                      <span className="text-3xl">💰</span>
                    </div>
                  </div>
                </div>

                {/* Payment Account Options */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-4">Select Payment Account *</label>
                  <div className="space-y-3">
                    {Object.entries(paymentAccounts).map(([key, account]) => (
                      <label
                        key={key}
                        className={`block cursor-pointer transition-all duration-300 ${formData.paymentAccount === key ? "scale-[1.02]" : "hover:scale-[1.01]"
                          }`}
                      >
                        <input
                          type="radio"
                          name="paymentAccount"
                          value={key}
                          checked={formData.paymentAccount === key}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        <div
                          className={`bg-[#0a0a0a] border-2 rounded-xl p-5 transition-all ${formData.paymentAccount === key
                              ? "border-[#03C05D] shadow-lg shadow-[#03C05D]/20"
                              : "border-gray-800 hover:border-gray-700"
                            }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="text-4xl">{account.icon}</div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-white font-bold text-lg">{account.name}</h4>
                                {formData.paymentAccount === key && (
                                  <div className="w-6 h-6 bg-[#03C05D] rounded-full flex items-center justify-center">
                                    <svg
                                      className="w-4 h-4 text-black"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div className="space-y-1">
                                <p className="text-gray-400 text-sm">
                                  <span className="text-gray-500">Account:</span>{" "}
                                  <span className="text-white font-mono">{account.accountNumber}</span>
                                </p>
                                <p className="text-gray-400 text-sm">
                                  <span className="text-gray-500">Name:</span>{" "}
                                  <span className="text-white">{account.accountName}</span>
                                </p>
                                {account.bankName && (
                                  <p className="text-gray-400 text-sm">
                                    <span className="text-gray-500">Bank:</span>{" "}
                                    <span className="text-white">{account.bankName}</span>
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment Instructions */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 mt-6">
                  <div className="flex gap-3">
                    <svg
                      className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="text-sm">
                      <p className="font-semibold text-amber-300 mb-2">Important Instructions:</p>
                      <p className="text-amber-200 leading-relaxed">
                        Please transfer the <span className="font-bold">exact amount</span> to the selected account and
                        upload the payment slip in the next step. Your registration will be confirmed once the payment
                        is verified by our team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Upload Payment Slip */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">Upload Payment Slip</h3>
                  <p className="text-gray-400 text-sm">Upload proof of payment to complete registration</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <div className="flex gap-3">
                      <svg
                        className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold text-red-300 mb-1">Error</p>
                        <p className="text-red-200 text-sm">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-[#0a0a0a] border-2 border-dashed border-gray-800 hover:border-[#03C05D]/50 rounded-xl p-8 text-center transition-all cursor-pointer group">
                  <label className="cursor-pointer block">
                    <div className="mb-4">
                      <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#03C05D]/10 transition-colors">
                        <svg
                          className="w-10 h-10 text-gray-600 group-hover:text-[#03C05D] transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <p className="text-white font-semibold mb-1">
                        <span className="text-[#03C05D]">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, or PDF (max 10MB)</p>
                    </div>
                    <input type="file" onChange={handleFileChange} accept="image/*,.pdf" className="hidden" />
                  </label>
                </div>

                {formData.paymentSlip && (
                  <div className="bg-gradient-to-r from-[#03C05D]/10 to-[#02a04d]/10 border-2 border-[#03C05D] rounded-xl p-5 flex items-center justify-between animate-in fade-in duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#03C05D] rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-semibold">{formData.paymentSlip.name}</p>
                        <p className="text-xs text-gray-400">{(formData.paymentSlip.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setFormData((prev) => ({ ...prev, paymentSlip: null }))}
                      className="text-red-400 hover:text-red-300 hover:scale-110 transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                )}

                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 mt-6">
                  <div className="flex gap-3">
                    <svg
                      className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="text-sm">
                      <p className="font-semibold text-green-300 mb-2">Almost Done!</p>
                      <p className="text-green-200 leading-relaxed">
                        Upload your payment receipt to complete the registration. We'll verify and confirm your spot
                        within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-gradient-to-t from-[#1a1a1a] to-[#0f0f0f] border-t border-gray-800 p-6 flex items-center justify-between backdrop-blur-sm">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="px-6 py-2.5 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all font-medium"
            >
              ← Back
            </button>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 rounded-xl transition-all font-medium"
              >
                Cancel
              </button>

              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-8 py-2.5 bg-gradient-to-r from-[#03C05D] to-[#02a04d] hover:from-[#02a04d] hover:to-[#028a42] text-black font-bold rounded-xl transition-all shadow-lg hover:shadow-[#03C05D]/50 hover:scale-105"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!formData.paymentSlip || isSubmitting}
                  className="px-8 py-2.5 bg-gradient-to-r from-[#03C05D] to-[#02a04d] hover:from-[#02a04d] hover:to-[#028a42] text-black font-bold rounded-xl transition-all shadow-lg hover:shadow-[#03C05D]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <SuccessAlert
          title="Registered Successfully!"
          message={`Your registration for ${tournament.name} has been submitted. We'll verify your payment and confirm your spot within 24 hours.`}
          duration={4000}
          onClose={handleSuccessClose}
          showProgress={true}
        />
      )}
    </>
  )
}
