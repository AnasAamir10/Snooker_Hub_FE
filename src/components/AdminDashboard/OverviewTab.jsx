import React from 'react'
import PendingRequests from './PendingRequests'
import QuickStats from './QuickStats'
import RecentActivity from './RecentActivity'

export default function OverviewTab({ 
  pendingRequests, 
  registeredUsers, 
  tournaments, 
  onApproveRequest, 
  onRejectRequest 
}) {
  return (
    <div className="space-y-6">
      <PendingRequests 
        pendingRequests={pendingRequests}
        onApproveRequest={onApproveRequest}
        onRejectRequest={onRejectRequest}
      />
      
      <QuickStats 
        tournaments={tournaments}
        registeredUsers={registeredUsers}
        pendingRequests={pendingRequests}
      />
      
      <RecentActivity registeredUsers={registeredUsers} />
    </div>
  )
}