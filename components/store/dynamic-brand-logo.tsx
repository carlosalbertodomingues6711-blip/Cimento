"use client"

import useSWR from "swr"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { SITE } from "@/lib/site-config"
import { getSiteSettingsPublic } from "@/lib/fetchers/site-settings-public"

type Variant = "full" | "compact" | "mono"

export default function DynamicBrandLogo({
  variant = "full",
  className,
  inverted = false,
}: {
  variant?: Variant
  className?: string
  inverted?: boolean
}) {
  const { data: row } = useSWR("site-settings-public", getSiteSettingsPublic, { revalidateOnFocus: false })
  
  // Use user-provided logo path first
  const url = "/logo-oficial.png" 

  const FallbackLogo = () => (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl rotate-3 shadow-lg transition-transform hover:rotate-0",
        inverted ? "bg-white text-[#002D5B]" : "bg-[#002D5B] text-white"
      )}>
        <div className="relative">
          <div className="w-5 h-5 border-2 border-current rounded-sm rotate-45" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#F47920] rounded-full animate-pulse" />
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-xl font-bold tracking-tighter sm:text-2xl italic",
            inverted ? "text-white" : "text-[#002D5B]",
          )}
        >
          {SITE.shortName.toUpperCase()}
        </span>
        <span
          className={cn(
            "text-[9px] font-bold uppercase tracking-[0.3em] sm:text-[10px]",
            inverted ? "text-white/60" : "text-[#F47920]",
          )}
        >
          Distribuidora
        </span>
      </div>
    </div>
  )

  // In a real scenario, we'd check if /logo-oficial.png exists. 
  // For now, we'll assume it exists if the user sent it, 
  // but if it fails to load, the browser will show a broken image.
  // To be safe, we could use a state to handle error and fallback.

  return (
    <div
      className={cn(
        "flex items-center select-none",
        className,
      )}
    >
      <svg 
        viewBox="0 0 400 130" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Navy Background */}
        <rect width="400" height="95" fill="#002D5B" />
        
        {/* Orange Bottom Bar */}
        <rect y="95" width="400" height="35" fill="#F47920" />
        
        {/* Main Text: CIMENTO & CAI */}
        <text 
          x="20" 
          y="68" 
          fill="white" 
          style={{ font: '900 68px var(--font-heading), sans-serif', letterSpacing: '-0.02em' }}
        >
          CIMENTO
        </text>
        
        <text 
          x="282" 
          y="72" 
          fill="#F47920" 
          style={{ font: '900 82px var(--font-heading), sans-serif' }}
        >
          &
        </text>
        
        <text 
          x="332" 
          y="68" 
          fill="white" 
          style={{ font: '900 68px var(--font-heading), sans-serif', letterSpacing: '-0.02em' }}
        >
          CAI
        </text>
        
        {/* Subtitle: DISTRIBUIDORA */}
        <text 
          x="200" 
          y="90" 
          fill="white" 
          textAnchor="middle"
          style={{ font: '700 18px var(--font-heading), sans-serif', letterSpacing: '0.6em' }}
        >
          DISTRIBUIDORA
        </text>
        
        {/* Bottom Text: ATACADO DE CONSTRUÇÃO */}
        <text 
          x="200" 
          y="120" 
          fill="white" 
          textAnchor="middle"
          style={{ font: '900 20px var(--font-heading), sans-serif', letterSpacing: '0.1em' }}
        >
          ATACADO DE CONSTRUÇÃO
        </text>
      </svg>
    </div>
  )
}
