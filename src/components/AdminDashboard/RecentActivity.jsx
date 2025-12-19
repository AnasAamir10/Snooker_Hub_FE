import React from 'react'

export default function RecentActivity({ registeredUsers }) {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {registeredUsers.slice(0, 3).map((user, index) => (
          <div key={user._id || user.id || index} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-b-0">
            <div>
              <p className="text-white font-medium">{user.name}</p>
              <p className="text-gray-400 text-sm">Registered for {typeof user.tournament === 'object' && user.tournament ? user.tournament.title || user.tournament.name : user.tournament}</p>
            </div>
            <span className="text-gray-500 text-sm">{user.date || user.createdAt}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
