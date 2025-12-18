import React from 'react'

export default function TabNavigation({ activeTab, onTabChange, registeredUsersCount }) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tournaments', label: 'Tournaments' },
    { id: 'users', label: `Registered Users (${registeredUsersCount})` }
  ]

  return (
    <div className="flex space-x-4 mb-8 border-b border-gray-700">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`pb-4 px-4 font-semibold ${
            activeTab === tab.id 
              ? 'text-green-500 border-b-2 border-green-500' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}