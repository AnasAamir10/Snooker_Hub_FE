import React, { useEffect } from 'react'
import feather from 'feather-icons'

export default function PendingRequests({ pendingRequests, onApproveRequest, onRejectRequest }) {
  useEffect(() => {
    // Use setTimeout to ensure React has finished rendering before replacing icons
    const timer = setTimeout(() => {
      feather.replace()
    }, 0)
    return () => clearTimeout(timer)
  }, [pendingRequests])

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
          {pendingRequests.map((request, index) => {
            const userName = request.user?.name || 'Unknown User'
            const userEmail = request.user?.email || 'No email'
            const tournamentTitle = request.tournament?.title || 'N/A'
            const registrationDate = request.registrationDate 
              ? new Date(request.registrationDate).toLocaleDateString() 
              : 'Unknown date'
            
            return (
              <div key={request._id || `request-${index}`} className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-gray-800">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                        {userName 
                          ? userName.split(' ').map(n => n[0]).join('').toUpperCase() 
                          : (userEmail ? userEmail[0].toUpperCase() : '?')}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{userName}</h4>
                      <p className="text-gray-400 text-sm">{userEmail}</p>
                      <p className="text-gray-500 text-sm">
                        {tournamentTitle}
                      </p>
                      <p className="text-gray-500 text-xs">Applied on {registrationDate}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onApproveRequest(request._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => onRejectRequest(request._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center"
                  >
                    Reject
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400">No pending registration requests</p>
        </div>
      )}
    </div>
  )
}
