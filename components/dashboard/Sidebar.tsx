
import Link from 'next/link'
import {LayoutDashboard ,Palette , BarChart3, Settings, CreditCard, Link as LinkIcon } from 'lucide-react'
import Image from 'next/image'

export default function Sidebar() {
  return (
    
    
    <>
        <div>
          <Link href="/" className="flex items-center gap-3 mb-10 group">
              <div className="relative h-20 w-20 -mr-2 flex items-center justify-center transition-all duration-300">
                  <Image 
                    src="/uploads/logo33.png" 
                    alt="BioNest Logo" 
                    fill
                    priority
                    className="object-contain brightness-150 contrast-125 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                  />
                </div>
            <span className="text-lg font-bold text-white group-hover:text-emerald-400 transition">
              BioNest
            </span>
          </Link>

          <nav className="flex flex-col gap-4">
            <Link href="/dashboard" className="flex items-center gap-3 text-zinc-400 hover:text-[#50C878] transition">
              <LayoutDashboard size={18} /> Dashboard
            </Link>

            <Link href="/links" className="flex items-center gap-3 text-zinc-400 hover:text-[#50C878] transition">
              <LinkIcon size={18} /> Links
            </Link>

            <Link href="/analytics" className="flex items-center gap-3 text-zinc-400 hover:text-[#50C878] transition">
              <BarChart3 size={18} /> Analytics
            </Link>
             <Link href="/themes" className="flex items-center gap-3 text-zinc-400 hover:text-[#50C878] transition">
              <Palette  size={18} /> Themes
            </Link>
            <Link href="/billings" className="flex items-center gap-3 text-zinc-400 hover:text-[#50C878] transition">
              <CreditCard size={18} /> Billings
            </Link>


            <Link href="/settings" className="flex items-center gap-3 text-zinc-400 hover:text-[#50C878] transition">
              <Settings size={18} /> Settings
            </Link>
          </nav>
        </div>

        {/* Footer */}
        <div className="text-xs text-zinc-500">
          © 2026 BioNest
        </div>
      </>
   
  )
}
