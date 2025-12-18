import React from 'react'

export default function StatsOverview({ tournaments, registeredUsers, pendingRequests }) {
  const stats = [
    {
      label: 'Total Tournaments',
      value: tournaments.length,
      icon: 'award',
      color: 'green'
    },
    {
      label: 'Total Registrations',
      value: registeredUsers.length,
      icon: 'users',
      color: 'blue'
    },
    {
      label: 'Total Revenue',
      value: `PKR ${tournaments.reduce((sum, t) => sum + (t.fee * t.registered), 0).toLocaleString()}`,
      icon: 'dollar-sign',
      color: 'yellow'
    },
    {
      label: 'Pending Requests',
      value: pendingRequests.length,
      icon: 'clock',
      color: 'orange'
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      green: 'bg-green-500/20 text-green-500',
      blue: 'bg-blue-500/20 text-blue-500',
      yellow: 'bg-yellow-500/20 text-yellow-500',
      orange: 'bg-orange-500/20 text-orange-500'
    }
    return colors[color] || colors.green
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700 flex items-center">
          <div className="flex items-center">
            <div className={`p-3 rounded-full mr-4 ${getColorClasses(stat.color)}`}>
              <i data-feather={stat.icon} className="w-6 h-6"></i>
            </div>
            <div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}