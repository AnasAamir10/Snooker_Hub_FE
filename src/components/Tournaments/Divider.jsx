export default function Divider({ text = "Past Events" }) {
  return (
    <div className="relative py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-800"></div>
          <div className="flex-shrink-0 px-6">
            <div className="flex items-center gap-2 bg-[#1a1a1a] px-5 py-2 rounded-full border border-gray-800">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-400 text-sm font-semibold">{text}</span>
            </div>
          </div>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>
      </div>
    </div>
  )
}