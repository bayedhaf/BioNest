"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import React from "react"
import {
  Link as LinkIcon,
  MousePointerClick,
  Globe,
  ExternalLink,
   Settings,
  User,
  Share2,
} from "lucide-react"

export default function Dashboard() {
  const info = [
    {
      icon: LinkIcon,
      title: "Total Links",
      value: 120,
    },
    {
      icon: MousePointerClick,
      title: "Total Clicks",
      value: 3500,
    },
    {
      icon: Globe,
      title: "Top Location",
      value: "United States",
    },
    {
      icon: ExternalLink,
      title: "Top Referrer",
      value: "Google",
    },
  ]

  return (
    <div className="p-4">
      {/* KEEP YOUR TOP CARD AS IS */}
 <div className="rounded-2xl p-[2px] bg-gradient-to-r from-[#bb33cd] via-purple-500 to-[#0fda6a] shadow-[0_0_25px_rgba(187,51,205,0.25)]">
        
        {/* Inner Card */}
        <Card className="w-full rounded-2xl bg-gradient-to-r from-[#2c1e2e] to-[#10492a]">
          
          <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
            
            {/* Text Section */}
            <div className="text-white max-w-xl">
              <h2 className="text-2xl font-bold leading-tight">
                Unlock Premium Analytics and Custom Domain
              </h2>
              <p className="mt-2 text-sm text-zinc-200">
                Join creators who have grown faster this month using BioNest Pro.
              </p>
            </div>

            {/* CTA Button */}
            <Button className="h-10 rounded-xl bg-white px-6 font-semibold text-[#0F172A] transition-all hover:bg-zinc-200">
              Upgrade to Pro
            </Button>

          </CardContent>

        </Card>
      </div>
      {/* 🔽 Stats + Preview Section */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {info.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className="bg-[#0F172A] border border-zinc-800 hover:border-emerald-500/40 transition-all rounded-xl"
              >
                <CardContent className="p-5 flex flex-col gap-3">
                  
                  {/* Icon */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-500/10">
                    <Icon className="h-5 w-5 text-emerald-400" />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm text-zinc-400 font-medium">
                    {item.title}
                  </h3>

                  {/* Value */}
                  <p className="text-2xl font-bold text-white">
                    {item.value}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Preview Card */}
        {/* Preview Card */}
<Card className="relative bg-gradient-to-b from-[#172442] to-[#020813] border-4 border-[#334155] rounded-[28px] flex flex-col justify-between overflow-hidden">
<div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
  
  {/* 📷 Camera dot */}
  <span className="bg-black rounded-full h-2 w-2" />

  {/* 📱 Notch */}
  <div className="h-5 w-24 rounded-full bg-[#334155]" />

</div>

  {/* 📱 Screen */}
  <div className="p-3 pt-10 h-full">
    
    <div className="w-full h-full  p-3 flex flex-col gap-3">
      
      {/* Fake Profile Header */}
      <div className="flex flex-col items-center gap-2 mt-2">
        <div className="w-14 h-14 rounded-full bg-emerald-500/70" />
        <div className="h-3 w-24 bg-zinc-600 rounded" />
        <div className="h-2 w-16 bg-zinc-700 rounded" />
      </div>

      {/* Fake Links */}
      <div className="flex flex-col gap-2 mt-4">
        <div className="h-8 rounded-lg bg-zinc-800" />
        <div className="h-8 rounded-lg bg-zinc-800" />
        <div className="h-8 rounded-lg bg-zinc-800" />
      </div>

    </div>

  </div>

 
  
     {/* 📱 Bottom Navigation INSIDE mobile */}
<div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[90%]  px-12 py-2 flex justify-between items-center shadow-md">
  
  {/* Settings */}
  <button className="flex flex-col items-center gap-1 text-zinc-400 hover:text-emerald-400 transition">
    <span className="p-1.5 rounded-full bg-zinc-800">
      <Settings className="w-4 h-4" />
    </span>
    
  </button>

  {/* Profile */}
  <button className="flex flex-col items-center gap-1 text-zinc-400 hover:text-emerald-400 transition">
    <span className="p-1.5 rounded-full bg-zinc-800">
      <User className="w-4 h-4" />
    </span>
  
  </button>

  {/* Share */}
  <button className="flex flex-col items-center gap-1 text-zinc-400 hover:text-emerald-400 transition">
    <span className="p-1.5 rounded-full bg-zinc-800">
      <Share2 className="w-4 h-4" />
    </span>
  
  </button>

</div>


</Card>
      </div>
    </div>
  )
}