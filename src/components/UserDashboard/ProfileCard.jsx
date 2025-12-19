"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { userAPI } from "../../services/api"

export default function ProfileCard() {
  const { user: authUser, updateProfile } = useAuth()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    avatar: '',
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (authUser) {
      fetchUserDetails()
    }
  }, [authUser])

  const fetchUserDetails = async () => {
    if (!authUser?.id) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const userData = await userAPI.getById(authUser.id)
      
      // Generate avatar from name/email
      const avatarSeed = userData.name || userData.email || 'User'
      const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed)}`
      
      // Format join date
      const joinDate = userData.createdAt 
        ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : 'Recently'

      const userProfile = {
        id: userData._id || userData.id,
        name: userData.name || authUser.name || 'User',
        email: userData.email || authUser.email || '',
        phone: userData.phone || 'Not provided',
        avatar: avatar,
        joinDate: joinDate,
      }

      setUser(userProfile)

      setFormData({
        name: userProfile.name,
        phone: userProfile.phone,
        avatar: userProfile.avatar,
      })
    } catch (error) {
      console.error('Error fetching user details:', error)
      // Fallback to user from context
      const avatarSeed = authUser.name || authUser.email || 'User'
      const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed)}`
      
      setUser({
        id: authUser.id,
        name: authUser.name || 'User',
        email: authUser.email || '',
        phone: 'Not provided',
        avatar: avatar,
        joinDate: 'Recently'
      })

      setFormData({
        name: authUser.name || '',
        phone: '',
        avatar: avatar,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    if (!user?.id) return

    try {
      setSaving(true)
      const updateData = {
        name: formData.name,
        phone: formData.phone,
      }

      const result = await userAPI.update(user.id, updateData)
      
      if (result.success) {
        // Update local state
        const updatedUser = { ...user, ...updateData }
        
        // Regenerate avatar with new name
        const avatarSeed = formData.name || user.email || 'User'
        const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed)}`
        updatedUser.avatar = newAvatar
        
        setUser(updatedUser)
        
        // Update auth context
        await updateProfile({ name: formData.name })
        
        setIsEditModalOpen(false)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-4">
        <div className="animate-pulse">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-700"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
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
                disabled={saving}
                className="flex-1 py-2 bg-gradient-to-r from-[#03C05D] to-[#02a04d] hover:from-[#02a04d] hover:to-[#03C05D] rounded-lg text-white font-semibold text-sm transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
