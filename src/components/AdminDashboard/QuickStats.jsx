import React from 'react'

export default function QuickStats({ tournaments, registeredUsers, pendingRequests }) {
  const stats = [
    {
      value: tournaments.length,
      label: 'Active Tournaments',
      color: 'text-green-500'
    },
    {
      value: registeredUsers.length,
      label: 'Approved Users',
      color: 'text-blue-500'
    },
    {
      value: `PKR ${tournaments.reduce((sum, t) => sum + (t.fee * t.registered), 0).toLocaleString()}`,
      label: 'Revenue',
      color: 'text-yellow-500'
    },
    {
      value: pendingRequests.length,
      label: 'Pending Requests',
      color: 'text-orange-500'
    }
  ]

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Quick Stats</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}