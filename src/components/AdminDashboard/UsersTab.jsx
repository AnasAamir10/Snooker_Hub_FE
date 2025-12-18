import React from 'react'

export default function UsersTab({ registeredUsers, onDeleteUser }) {
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
                <th className="text-left p-4 text-gray-400 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {registeredUsers.map(user => (
                <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                  <td className="p-4 text-white">{user.name}</td>
                  <td className="p-4 text-gray-400">{user.email}</td>
                  <td className="p-4 text-gray-400">{user.phone}</td>
                  <td className="p-4 text-gray-400">{user.tournament}</td>
                  <td className="p-4 text-gray-400">{user.date}</td>
                  <td className="p-4">
                    <button 
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                      onClick={() => onDeleteUser(user.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}