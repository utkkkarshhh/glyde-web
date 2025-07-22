import { GraduationCap } from "lucide-react"

export default function Navbar() {
  return (
    <div className="bg-[#FF7F00]/10 backdrop-blur-md border-b border-[#FF7F00]/20 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#FF7F00] rounded-full flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Glyde</h1>
          <p className="text-xs text-gray-600">Denison University</p>
        </div>
      </div>
    </div>
  )
}
