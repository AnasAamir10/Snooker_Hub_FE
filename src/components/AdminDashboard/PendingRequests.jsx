import React from 'react'

export default function PendingRequests({ pendingRequests, onApproveRequest, onRejectRequest }) {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Pending Registration Requests</h3>
        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {pendingRequests.length} Pending
        </span>
      </div>
      
      {pendingRequests.length > 0 ? (
        <div className="space-y-4">
          {pendingRequests.map(request => (
            <div key={request.id} className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-gray-800">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                      {request.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{request.name}</h4>
                    <p className="text-gray-400 text-sm">{request.email}</p>
                    <p className="text-gray-500 text-sm">
                      {request.tournament} • {request.phone}
                    </p>
                    <p className="text-gray-500 text-xs">Applied on {request.date}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onApproveRequest(request.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center"
                >
                  <i data-feather="check" className="mr-2 w-4 h-4"></i>
                  Approve
                </button>
                <button
                  onClick={() => onRejectRequest(request.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center"
                >
                  <i data-feather="x" className="mr-2 w-4 h-4"></i>
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <i data-feather="check-circle" className="w-12 h-12 text-green-500 mx-auto mb-4"></i>
          <p className="text-gray-400">No pending registration requests</p>
        </div>
      )}
    </div>
  )
}