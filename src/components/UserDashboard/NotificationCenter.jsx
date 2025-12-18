"use client"
import { useState } from "react"
import NotificationItem from "./NotificationItem"

export default function NotificationCenter() {
  const [filter, setFilter] = useState("all")

  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Registration Confirmed",
      message: "Your registration for National Championship 2024 has been confirmed.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Payment Pending",
      message: "Please complete payment for Spring Masters Cup. Registration closes in 24 hours.",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "New Tournament Available",
      message: "Elite Pro Tournament registration is now open. Limited spots available!",
      time: "1 day ago",
      read: true,
    },
    {
      id: 4,
      type: "success",
      title: "Tournament Results",
      message: "Congratulations! You won 1st place in Winter Championship 2024.",
      time: "3 days ago",
      read: true,
    },
  ]

  const filteredNotifications =
    filter === "all" ? notifications : notifications.filter((n) => !n.read)

  return (
    <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-xl font-bold">Notifications</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-[#03C05D] text-white"
                : "bg-[#1a1a1a] text-gray-400 hover:text-white"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "unread"
                ? "bg-[#03C05D] text-white"
                : "bg-[#1a1a1a] text-gray-400 hover:text-white"
            }`}
          >
            Unread ({notifications.filter((n) => !n.read).length})
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  )
}
