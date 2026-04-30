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
        <rect width="500" height="115" fill="#002D5B" rx="2" />
        
        {/* Bottom Orange Bar */}
        <rect y="115" width="500" height="45" fill="#F47920" rx="2" />
        
        {/* Icon Group (Left Side) */}
        <g transform="translate(25, 20) scale(1.1)">
          {/* Cement Mixer Body */}
          <path d="M40 15C30 15 20 25 20 35C20 45 30 55 40 55H60L75 35L60 15H40Z" fill="white" />
          <circle cx="40" cy="35" r="10" fill="#002D5B" />
          <path d="M25 65L40 55L55 65" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="25" cy="65" r="4" fill="white" />
          
          {/* Hand with Trowel */}
          <g transform="translate(50, 45)">
            <path d="M0 0L15 -15L35 5L20 20Z" fill="white" />
            <path d="M15 -5C12 -5 10 -3 10 0V15H20V0C20 -3 18 -5 15 -5Z" fill="#002D5B" transform="translate(5, 0) scale(0.6)" />
          </g>
        </g>
        
        {/* Main Text Content */}
        <g transform="translate(130, 0)">
          {/* CIMENTO & CAL */}
          <text 
            y="65" 
            fill="white" 
            style={{ font: '900 64px sans-serif', letterSpacing: '-0.02em' }}
          >
            CIMENTO
          </text>
          
          <text 
            x="300" 
            y="68" 
            fill="#F47920" 
            style={{ font: '900 78px sans-serif' }}
          >
            &
          </text>
          
          <text 
            x="360" 
            y="65" 
            fill="white" 
            style={{ font: '900 64px sans-serif', letterSpacing: '-0.02em' }}
          >
            CAL
          </text>
          
          {/* DISTRIBUIDORA */}
          <text 
            x="180" 
            y="98" 
            fill="white" 
            textAnchor="middle"
            style={{ font: '700 32px sans-serif', letterSpacing: '0.45em' }}
          >
            DISTRIBUIDORA
          </text>
        </g>
        
        {/* Bottom Bar Text: ATACADO DE CONSTRUÇÃO */}
        <text 
          x="250" 
          y="146" 
          fill="white" 
          textAnchor="middle"
          style={{ font: '900 28px sans-serif', letterSpacing: '0.15em' }}
        >
          ATACADO DE CONSTRUÇÃO
        </text>
      </svg>
    </div>
  )
}
