"use client"

import { useState, useEffect } from "react"
import { MapPin, Navigation, ChevronDown, Loader2, Target, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LocationSelector() {
  const [location, setLocation] = useState<string>("São Paulo, SP")
  const [isDetecting, setIsDetecting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("user-location")
    if (!saved || saved === "São Paulo, SP") {
      detectLocation()
    } else {
      setLocation(saved)
    }
  }, [])

  const detectLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) return

    setIsDetecting(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
          )
          const data = await response.json()
          
          const city = data.address.city || data.address.town || data.address.village || data.address.suburb || "Brasil"
          const state = data.address.state_code || data.address.state || ""
          
          const formattedLocation = state ? `${city}, ${state}` : city
          setLocation(formattedLocation)
          localStorage.setItem("user-location", formattedLocation)
          
          window.dispatchEvent(new Event("user-location-updated"))
          setIsOpen(false)
        } catch (error) {
          console.error("Error fetching location details:", error)
        } finally {
          setIsDetecting(false)
        }
      },
      (error) => {
        console.warn("Geolocation detection skipped/failed:", error.message)
        setIsDetecting(false)
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
    )
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 group transition-opacity hover:opacity-80 outline-none py-1"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600">
            <Zap className="w-3.5 h-3.5 fill-emerald-600" />
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#002D5B]/40">Entrega para</span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-xs font-bold text-[#002D5B] whitespace-nowrap">{location}</span>
              <ChevronDown className={cn("w-3 h-3 text-slate-300 transition-transform duration-300", isOpen && "rotate-180")} />
            </div>
          </div>
        </div>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[60]" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute top-full left-0 mt-3 w-80 p-6 bg-white rounded-[2.5rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] border border-border/40 z-[70] animate-in fade-in zoom-in-95 duration-200">
            <div className="mb-6">
              <h3 className="text-sm font-black text-[#002D5B] tracking-tight">Onde você está?</h3>
              <p className="text-[11px] text-slate-500">Mostraremos as ofertas disponíveis para sua região.</p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={detectLocation}
                disabled={isDetecting}
                className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#002D5B] text-white text-xs font-black uppercase tracking-widest hover:bg-[#003d7a] transition-all disabled:opacity-50"
              >
                {isDetecting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Navigation className="w-4 h-4" />
                )}
                {isDetecting ? "Buscando..." : "Detectar Automaticamente"}
              </button>

              <div className="grid grid-cols-2 gap-2">
                {["São Paulo, SP", "Rio de Janeiro, RJ", "Campinas, SP", "Ribeirão Preto, SP"].map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setLocation(city)
                      localStorage.setItem("user-location", city)
                      setIsOpen(false)
                    }}
                    className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-bold text-[#002D5B] hover:bg-[#F47920]/5 hover:border-[#F47920]/30 transition-all"
                  >
                    {city.split(',')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
