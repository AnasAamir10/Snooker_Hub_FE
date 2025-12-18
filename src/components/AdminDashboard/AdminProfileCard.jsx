import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { userAPI } from '../../services/api'

export default function AdminProfileCard() {
  const { user, logout, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user) {
      fetchUserDetails()
    }
  }, [user])

  const fetchUserDetails = async () => {
    if (!user?.id) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const userData = await userAPI.getById(user.id)
      
      // Generate avatar from name/email
      const avatarSeed = userData.name || userData.email || 'Admin'
      const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed)}`
      
      // Format join date
      const joinDate = userData.createdAt 
        ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : 'Recently'

      setAdmin({
        id: userData._id || userData.id,
        name: userData.name || 'Admin User',
        email: userData.email || '',
        role: userData.role === 'admin' ? 'Administrator' : 'Player',
        avatar: avatar,
        joinDate: joinDate,
        phone: userData.phone || 'Not provided'
      })

      setFormData({
        name: userData.name || '',
      })
    } catch (error) {
      console.error('Error fetching user details:', error)
      // Fallback to user from context
      const avatarSeed = user.name || user.email || 'Admin'
      const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed)}`
      
      setAdmin({
        id: user.id,
        name: user.name || 'Admin User',
        email: user.email || '',
        role: user.role === 'admin' ? 'Administrator' : 'Player',
        avatar: avatar,
        joinDate: 'Recently',
        phone: 'Not provided'
      })

      setFormData({
        name: user.name || '',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    if (!admin?.id) return

    try {
      setSaving(true)
      const result = await userAPI.update(admin.id, { name: formData.name })
      
      if (result.success) {
        // Update local state
        setAdmin({ ...admin, name: formData.name })
        
        // Update auth context
        await updateProfile({ name: formData.name })
        
        // Regenerate avatar with new name
        const avatarSeed = formData.name || admin.email || 'Admin'
        const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed)}`
        setAdmin(prev => ({ ...prev, avatar: newAvatar }))
        
        setIsEditModalOpen(false)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (loading || !admin) {
    return (
      <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-4">
        <div className="text-center text-gray-400 py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mb-2"></div>
          <p className="text-sm">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-gray-800 rounded-xl p-4 hover:border-green-500/30 transition-all shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <img src={admin.avatar} alt={admin.name} className="w-16 h-16 rounded-full shadow-lg" />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white mb-1 truncate">{admin.name}</h2>
            <span className="inline-block mt-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
              {admin.role}
            </span>
          </div>
        </div>

        <div className="space-y-3 pt-3 border-t border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <span className="text-green-500 text-sm">📧</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm text-gray-200 truncate">{admin.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <span className="text-green-500 text-sm">📱</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm text-gray-200">{admin.phone}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="w-full py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-600 rounded-lg text-white font-semibold text-sm transition-all shadow-lg hover:shadow-green-500/20"
          >
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500/20 hover:border-red-500 hover:text-red-300 rounded-lg font-semibold text-sm transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] rounded-2xl max-w-md w-full border border-gray-800 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-800">
              <h3 className="text-xl font-bold text-white">Edit Admin Profile</h3>
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
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all text-sm"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-1">Email</p>
                <p className="text-sm text-gray-300">{admin.email}</p>
                <p className="text-xs text-gray-500 mt-2">Email cannot be changed</p>
              </div>

              <div className="bg-[#0a0a0a] border border-gray-700 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-1">Member Since</p>
                <p className="text-sm text-gray-300">{admin.joinDate}</p>
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
                className="flex-1 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-600 rounded-lg text-white font-semibold text-sm transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}