import React from 'react'

export default function TournamentCard({ tournament, onEdit, onDelete }) {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <img 
              src={tournament.image} 
              alt={tournament.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-xl font-bold text-white">{tournament.name}</h3>
              <p className="text-gray-400">{tournament.date}</p>
              <p className="text-green-500 font-semibold">Entry Fee: PKR {tournament.fee}</p>
              <p className="text-blue-400">Registered: {tournament.registered} players</p>
              {tournament.description && (
                <p className="text-gray-500 text-sm mt-2">{tournament.description}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center"
            onClick={() => onEdit(tournament)}
          >
            <i data-feather="edit" className="mr-2 w-4 h-4"></i>
            Edit
          </button>
          <button 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition flex items-center"
            onClick={() => onDelete(tournament.id)}
          >
            <i data-feather="trash" className="mr-2 w-4 h-4"></i>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}