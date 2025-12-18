export default function NotificationItem({ notification }) {
  const typeStyles = {
    success: { bg: "bg-[#03C05D]/10", border: "border-[#03C05D]/30", icon: "✓" },
    warning: { bg: "bg-yellow-500/10", border: "border-yellow-500/30", icon: "⚠" },
    info: { bg: "bg-blue-500/10", border: "border-blue-500/30", icon: "ℹ" },
  }

  const style = typeStyles[notification.type]

  return (
    <div
      className={`${style.bg} border ${style.border} rounded-lg p-4 ${
        !notification.read ? "opacity-100" : "opacity-60"
      } hover:opacity-100 transition-all`}
    >
      <div className="flex gap-3">
        <div className="text-xl">{style.icon}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-white">{notification.title}</h4>
            {!notification.read && <span className="w-2 h-2 bg-[#03C05D] rounded-full mt-1.5"></span>}
          </div>
          <p className="text-sm text-gray-400 mb-2">{notification.message}</p>
          <span className="text-xs text-gray-500">{notification.time}</span>
        </div>
      </div>
    </div>
  )
}
