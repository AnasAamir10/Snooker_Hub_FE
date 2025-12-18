import React, { useState } from 'react'

export default function TournamentModal({
  editingTournament,
  newTournament,
  showModal,
  onClose,
  onInputChange,
  onSubmit,
  onFileChange
}) {
  const [imagePreview, setImagePreview] = useState(null)
  
  if (!showModal) return null

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
      
      // Call parent handler
      if (onFileChange) {
        onFileChange(file)
      }
    } else {
      // Clear preview if no file selected
      setImagePreview(null)
      if (onFileChange) {
        onFileChange(null)
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#121212] rounded-2xl shadow-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-white">
              {editingTournament ? 'Edit Tournament' : 'Add New Tournament'}
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <i data-feather="x" className="w-6 h-6"></i>
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tournament Name</label>
              <input
                type="text"
                name="name"
                placeholder="Tournament Name"
                value={editingTournament ? editingTournament.name : newTournament.name}
                onChange={onInputChange}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date & Time</label>
              <input
                type="text"
                name="date"
                placeholder="e.g., Every Saturday, 2PM"
                value={editingTournament ? editingTournament.date : newTournament.date}
                onChange={onInputChange}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Entry Fee (PKR)</label>
              <input
                type="number"
                name="fee"
                placeholder="Entry Fee"
                value={editingTournament ? editingTournament.fee : newTournament.fee}
                onChange={onInputChange}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Max Players</label>
              <input
                type="number"
                name="maxPlayers"
                placeholder="Max Players"
                value={editingTournament ? editingTournament.maxPlayers : newTournament.maxPlayers || 32}
                onChange={onInputChange}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tournament Image</label>
            <div className="space-y-2">
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
              />
              <p className="text-xs text-gray-400">Or provide an image URL below</p>
              <input
                type="url"
                name="image"
                placeholder="Image URL (if not uploading file)"
                value={editingTournament ? editingTournament.image : newTournament.image}
                onChange={onInputChange}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                </div>
              )}
              {(editingTournament?.image || newTournament?.image) && !imagePreview && (
                <div className="mt-2">
                  <img src={editingTournament?.image || newTournament?.image} alt="Current" className="w-full h-48 object-cover rounded-lg" />
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Tournament description"
              value={editingTournament ? editingTournament.description : newTournament.description}
              onChange={onInputChange}
              rows="3"
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
            />
          </div>
          
          <div className="flex space-x-4 pt-4">
            <button type="submit" className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
              {editingTournament ? 'Update Tournament' : 'Add Tournament'}
            </button>
            <button 
              type="button" 
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}