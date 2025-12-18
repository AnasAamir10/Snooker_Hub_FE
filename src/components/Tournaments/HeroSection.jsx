export default function HeroSection() {
  return (
    <div className="relative h-[40vh] min-h-[400px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/snooker-table-aerial-view-B4Mx7k2tgeuTLhQsMaIXaz5ZlLWti0.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">TOURNAMENTS</h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">Compete at the highest level</p>
      </div>
      <a
        href="/"
        className="absolute top-8 left-8 text-white hover:text-[#03C05D] transition-colors flex items-center gap-2 group"
      >
        <svg
          className="w-5 h-5 transition-transform group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </a>
    </div>
  )
}