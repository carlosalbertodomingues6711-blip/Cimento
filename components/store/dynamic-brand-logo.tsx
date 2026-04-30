"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { SITE } from "@/lib/site-config"

type Variant = "full" | "compact" | "mono" | "square"

export default function DynamicBrandLogo({
  variant = "full",
  className,
}: {
  variant?: Variant
  className?: string
}) {
  // We use the image files directly to ensure they match the user's vision.
  // The user provided logo-oficial.png (horizontal) and we'll use it for full/compact.
  // For the footer (square), we'll use the same or a specific square one if it existed.
  
  const isSquare = variant === "square"
  
  return (
    <div className={cn("flex items-center justify-center overflow-hidden", className)}>
      <img
        src="/logo-oficial.png"
        alt={SITE.name}
        className="w-full h-auto block"
        style={{ minWidth: '100%' }}
      />
    </div>
  )
}
