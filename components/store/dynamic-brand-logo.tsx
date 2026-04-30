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
        viewBox="0 0 500 160" 
        className="w-full h-auto drop-shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Navy Background Wrapper */}
        <rect width="500" height="110" fill="#002D5B" rx="4" />
        
        {/* Bottom Orange Bar */}
        <rect y="110" width="500" height="50" fill="#F47920" rx="4" />
        
        {/* Divider Line (Optional, for crispness) */}
        <line x1="0" y1="110" x2="500" y2="110" stroke="white" strokeWidth="1" opacity="0.1" />

        {/* Icon Group (Left Side) */}
        <g transform="translate(20, 15) scale(1.1)">
          {/* Cement Mixer Body - Refined */}
          <path d="M40 10C25 10 15 20 15 35C15 50 25 60 40 60H65L80 35L65 10H40Z" fill="white" />
          <circle cx="42" cy="35" r="12" fill="#002D5B" />
          <path d="M20 70L40 60L60 70" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="20" cy="70" r="5" fill="white" />
          
          {/* Hand with Trowel - Refined */}
          <g transform="translate(55, 45)">
            <path d="M0 0L18 -18L40 5L22 23Z" fill="white" />
            <path d="M15 -5C12 -5 10 -3 10 0V15H20V0C20 -3 18 -5 15 -5Z" fill="#002D5B" transform="translate(8, 2) scale(0.7)" />
          </g>
        </g>
        
        {/* Main Text Content */}
        <g transform="translate(135, 5)">
          {/* CIMENTO & CAL */}
          <text 
            y="65" 
            fill="white" 
            style={{ font: '900 68px sans-serif', letterSpacing: '-0.03em' }}
          >
            CIMENTO
          </text>
          
          <text 
            x="320" 
            y="68" 
            fill="#F47920" 
            style={{ font: '900 82px sans-serif' }}
          >
            &
          </text>
          
          <text 
            x="385" 
            y="65" 
            fill="white" 
            style={{ font: '900 68px sans-serif', letterSpacing: '-0.03em' }}
          >
            CAL
          </text>
          
          {/* DISTRIBUIDORA */}
          <text 
            x="200" 
            y="98" 
            fill="white" 
            textAnchor="middle"
            style={{ font: '700 34px sans-serif', letterSpacing: '0.42em' }}
          >
            DISTRIBUIDORA
          </text>
        </g>
        
        {/* Bottom Bar Text: ATACADO DE CONSTRUÇÃO */}
        <text 
          x="250" 
          y="144" 
          fill="white" 
          textAnchor="middle"
          style={{ font: '900 30px sans-serif', letterSpacing: '0.12em' }}
        >
          ATACADO DE CONSTRUÇÃO
        </text>
      </svg>
    </div>
  )
}
