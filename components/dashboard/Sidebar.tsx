"use client"

import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboard,
  Palette,
  BarChart3,
  Settings,
  CreditCard,
  Link as LinkIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
  { title: "Links", icon: LinkIcon, url: "/dashboard/links" },
  { title: "Analytics", icon: BarChart3, url: "/dashboard/analytics" },
  { title: "Themes", icon: Palette, url: "/themes" },
  { title: "Billings", icon: CreditCard, url: "/billings" },
  { title: "Settings", icon: Settings, url: "/settings" },
]

export default function AppSidebar() {
  return (
    <Sidebar className="border-zinc-800 bg-[#0F172A]">
      
      {/* Header */}
      <SidebarHeader className="pt-6 px-4 bg-[#0F172A]">
        <Link href="/" className="flex items-center gap-2 group mb-6">
          <div className="relative h-10 w-10 flex items-center justify-center">
            <Image
              src="/uploads/logo33.png"
              alt="BioNest Logo"
              fill
              className="object-contain brightness-150 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <span className="text-xl font-bold text-white group-hover:text-emerald-400 transition">
            BioNest
          </span>
        </Link>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="bg-[#0F172A]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  
                  {/* ✅ FIX: Link wraps the button (NO asChild) */}
                  <Link href={item.url} className="block">
                    <SidebarMenuButton
                      className="flex items-center gap-3 text-zinc-400 hover:text-[#50C878] hover:bg-white/5 transition-all py-6 w-full hover:border-r-2 hover:border-r-[#50C878]"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-[15px] font-medium">
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </Link>

                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t border-zinc-800 bg-[#0F172A]">
        <div className="text-[10px] text-zinc-500 font-medium tracking-widest">
          © 2026 BIONEST
        </div>
      </SidebarFooter>

    </Sidebar>
  )
}