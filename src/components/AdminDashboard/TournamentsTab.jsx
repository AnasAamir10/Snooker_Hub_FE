import React from 'react'
import TournamentCard from './TournamentCard'

export default function TournamentsTab({ tournaments, onEditTournament, onDeleteTournament, onAddTournament }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Tournaments</h2>
        <button 
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center"
          onClick={onAddTournament}
        >
          <i data-feather="plus" className="mr-2 w-4 h-4"></i>
          Add Tournament
        </button>
      </div>

      <div className="grid gap-6">
        {tournaments.map(tournament => (
          <TournamentCard
            key={tournament.id}
            tournament={tournament}
            onEdit={onEditTournament}
            onDelete={onDeleteTournament}
          />
        ))}
      </div>
    </div>
  )
}