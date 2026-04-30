"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { SITE } from "@/lib/site-config"

type Variant = "full" | "square"

export default function DynamicBrandLogo({
  variant = "full",
  className,
}: {
  variant?: Variant
  className?: string
}) {
  if (variant === "square") {
    return (
      <div className={cn("flex items-center justify-center overflow-hidden", className)}>
        <img
          src="/logo-footer.jpg"
          alt={SITE.name}
          className="w-full h-auto block rounded-xl"
        />
      </div>
    )
  }

  return (
    <div className={cn("flex items-center justify-center overflow-hidden", className)}>
      <img
        src="/logo-header.jpg"
        alt={SITE.name}
        className="w-full h-auto block"
      />
    </div>
  )
}
