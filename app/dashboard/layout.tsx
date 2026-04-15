import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from '@/components/dashboard/Sidebar'
import UserSync from '@/components/common/UserSync'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <UserSync />
      <div className="flex min-h-screen w-full bg-[#0F172A] text-zinc-100">
        <AppSidebar />
        
        <main className="flex-1 overflow-y-auto">
          <nav className="sticky top-0 z-30 w-full border-b border-zinc-800 bg-[#0F172A]/95 backdrop-blur-md">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6">
              
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-zinc-400 hover:bg-zinc-800 hover:text-emerald-400 transition-colors" />
                
                <div className="flex flex-col hidden sm:flex">
                  <h2 className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Dashboard</h2>
                  <p className="text-sm font-semibold text-white">Bayisa Balcha</p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-6">
                {/* Search Bar */}
                <div className="relative hidden lg:block">
                  <input 
                    type="text" 
                    placeholder="Search links..." 
                    className="w-72 rounded-xl bg-zinc-950/50 border border-zinc-800 px-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none transition-all"
                  />
                </div>

                {/* Upgrade Button - Corrected visibility and contrast */}
                <Button className="bg-[#50C878] hover:bg-[#42a866] text-[#0F172A] font-bold rounded-xl px-6 h-9 transition-all">
                  Upgrade
                </Button>

                {/* User Controls */}
                <div className="flex items-center gap-3 border-l border-zinc-800 pl-4">
                   <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "h-9 w-9 border-2 border-emerald-500/20"
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </nav>

          <div className="p-4  sm:p-8 lg:p-10 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}