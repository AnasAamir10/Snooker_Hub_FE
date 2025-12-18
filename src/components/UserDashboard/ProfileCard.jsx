"use client"

import { useState } from "react"

export default function ProfileCard() {
  const [user, setUser] = useState({
    name: "Ahmed Khan",
    phone: "+92 300 1234567",
    email: "ahmed.khan@example.com",
    joinDate: "January 2024",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
  })

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    avatar: user.avatar,
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    setUser({ ...user, ...formData })
    setIsEditModalOpen(false)
  }

  return (
    <>
      <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-4 hover:border-[#03C05D]/30 transition-all shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-16 h-16 rounded-full shadow-lg" />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white mb-1 truncate">{user.name}</h2>
            <p className="text-xs text-gray-400">Member since {user.joinDate}</p>
          </div>
        </div>

        <div className="space-y-3 pt-3 border-t border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#03C05D]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[#03C05D] text-sm">📧</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm text-gray-200 truncate">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#03C05D]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[#03C05D] text-sm">📱</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm text-gray-200">{user.phone}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="w-full mt-4 py-2 bg-gradient-to-r from-[#03C05D] to-[#02a04d] hover:from-[#02a04d] hover:to-[#03C05D] rounded-lg text-white font-semibold text-sm transition-all shadow-lg hover:shadow-[#03C05D]/20"
        >
          Edit Profile
        </button>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 mb-[-20px]">
          <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] rounded-2xl max-w-md w-full border border-gray-800 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-800">
              <h3 className="text-xl font-bold text-white">Edit Profile</h3>
              <p className="text-gray-400 text-xs mt-1">Update your personal information</p>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:border-[#03C05D] focus:ring-1 focus:ring-[#03C05D] outline-none transition-all text-sm"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:border-[#03C05D] focus:ring-1 focus:ring-[#03C05D] outline-none transition-all text-sm"
                  placeholder="+92 300 1234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Profile Picture URL</label>
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:border-[#03C05D] focus:ring-1 focus:ring-[#03C05D] outline-none transition-all text-sm"
                  placeholder="https://example.com/avatar.jpg"
                />
                {formData.avatar && (
                  <div className="mt-2 flex justify-center">
                    <img
                      src={formData.avatar || "/placeholder.svg"}
                      alt="Preview"
                      className="w-16 h-16 rounded-full shadow-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-800 flex gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 py-2 bg-[#1a1a1a] hover:bg-[#252525] border border-gray-700 rounded-lg text-gray-300 font-medium text-sm transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2 bg-gradient-to-r from-[#03C05D] to-[#02a04d] hover:from-[#02a04d] hover:to-[#03C05D] rounded-lg text-white font-semibold text-sm transition-all shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}