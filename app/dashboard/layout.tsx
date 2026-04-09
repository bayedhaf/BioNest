import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Sidebar from '@/components/dashboard/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-[#0F172A] backdrop-blur-md p-6 hidden md:flex flex-col justify-between">
        <Sidebar />
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Topbar */}
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-[#0F172A] backdrop-blur-md">
          <h1 className="text-lg font-semibold">Dashboard</h1>

          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              <UserButton/>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  )
}