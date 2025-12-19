import React from 'react'

export default function UsersTab({ registeredUsers, onDeleteUser }) {
  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Registered Users</h2>
      <div className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4 text-gray-400 font-semibold">Name</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Email</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Phone</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Tournament</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Date</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Status</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {registeredUsers.map(registration => {
                // Handle nested structure from backend
                const userName = registration.user?.name || registration.name || 'N/A'
                const userEmail = registration.user?.email || registration.email || 'N/A'
                const userPhone = registration.user?.phone || registration.phone || 'N/A'
                const tournamentName = typeof registration.tournament === 'object' 
                  ? registration.tournament?.title || registration.tournament?.name || 'N/A'
                  : registration.tournament || 'N/A'
                const registrationDate = registration.registrationDate || registration.date || registration.createdAt
                const paymentStatus = registration.paymentStatus || 'pending'
                const registrationId = registration._id || registration.id

                return (
                  <tr key={registrationId} className="border-b border-gray-800 hover:bg-gray-900/50">
                    <td className="p-4 text-white">{userName}</td>
                    <td className="p-4 text-gray-400">{userEmail}</td>
                    <td className="p-4 text-gray-400">{userPhone}</td>
                    <td className="p-4 text-gray-400">{tournamentName}</td>
                    <td className="p-4 text-gray-400">{formatDate(registrationDate)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        paymentStatus === 'paid' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {paymentStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      <button 
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                        onClick={() => onDeleteUser(registrationId)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
