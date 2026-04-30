"use client"

import useSWR from "swr"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { SITE } from "@/lib/site-config"
import { getSiteSettingsPublic } from "@/lib/fetchers/site-settings-public"

type Variant = "full" | "compact" | "mono" | "square"

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
  
  if (variant === "square") {
    return (
      <div className={cn("flex items-center justify-center select-none", className)}>
        <svg 
          viewBox="0 0 400 400" 
          className="w-full h-auto drop-shadow-md"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rounded Navy Background */}
          <rect width="400" height="400" rx="40" fill="#002D5B" />
          
          {/* White Main Shape (Bag-like) */}
          <path 
            d="M100 100 Q100 80 120 80 H280 Q300 80 300 100 V300 Q300 320 280 320 H120 Q100 320 100 300 Z" 
            fill="white" 
          />
          
          {/* Orange Top Triangle */}
          <path d="M140 80 L200 160 L260 80 Z" fill="#F47920" />
          <path d="M140 80 L200 160 L260 80" fill="none" stroke="#002D5B" strokeWidth="8" strokeLinejoin="round" />

          {/* Central Blue 'C' with Trowel */}
          <g transform="translate(140, 180)">
            <path 
              d="M100 0 A50 50 0 1 0 100 100" 
              fill="none" 
              stroke="#002D5B" 
              strokeWidth="45" 
              strokeLinecap="butt" 
            />
            {/* Trowel Icon */}
            <g transform="translate(45, 35) scale(1.2)">
              <path d="M0 0 L25 -10 L45 10 L20 20 Z" fill="#002D5B" />
              <rect x="45" y="5" width="20" height="10" rx="2" fill="#002D5B" />
            </g>
          </g>

          {/* Bottom Orange Bag */}
          <g transform="translate(175, 275) scale(1.2)">
            <rect width="42" height="50" rx="6" fill="#F47920" />
            <circle cx="15" cy="20" r="3" fill="#002D5B" />
            <circle cx="27" cy="20" r="3" fill="#002D5B" />
          </g>

          {/* Text: C&C DISTRIBUIDORA */}
          <text 
            x="200" 
            y="370" 
            fill="white" 
            textAnchor="middle"
            style={{ font: 'bold 24px sans-serif', letterSpacing: '0.1em' }}
          >
            C&C DISTRIBUIDORA
          </text>
        </svg>
      </div>
    )
  }

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
