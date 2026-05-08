"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Package, MessageCircle } from "lucide-react"
import { toast } from "sonner"
import { waLink } from "@/lib/site-config"
import { trackWhatsAppClick } from "@/lib/track-whatsapp"

export type ProductCardProduct = {
  id: string
  name: string
  slug: string
  price: number
  original_price: number | null
  image_url: string | null
  unit: string
  stock: number
  is_new?: boolean
  is_discount?: boolean
}

export function addToCart(product: ProductCardProduct, qty = 1) {
  try {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const idx = cart.findIndex((i: { id: string }) => i.id === product.id)
    if (idx >= 0) {
      cart[idx].qty += qty
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        unit: product.unit,
        qty,
      })
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new Event("cart-updated"))
    toast.success("Adicionado ao orçamento!")
  } catch {
    toast.error("Erro ao adicionar")
  }
}

export default function ProductCard({ product }: { product: ProductCardProduct }) {
  const [userCity, setUserCity] = useState("")

  useEffect(() => {
    // Set initial value only on client
    const saved = localStorage.getItem("user-location") || ""
    setUserCity(saved)

    const handleStorage = () => {
      setUserCity(localStorage.getItem("user-location") || "")
    }
    window.addEventListener("storage", handleStorage)
    // Also listen to custom event if needed
    window.addEventListener("user-location-updated", handleStorage)
    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("user-location-updated", handleStorage)
    }
  }, [])

  const discount =
    product.original_price && product.original_price > product.price
      ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
      : 0

  const waHref = waLink(
    `Olá! Tenho interesse em: ${product.name} — R$ ${Number(product.price).toFixed(2)} (${product.unit})`,
  )

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-app transition-all duration-500 hover:shadow-app-lg hover:-translate-y-2">
      {/* Premium Floating Badges */}
      <div className="pointer-events-none absolute left-0 top-6 z-10 flex flex-col gap-2">
        {product.is_new && (
          <div className="flex items-center bg-emerald-600 text-white pl-4 pr-3 py-1.5 rounded-r-2xl shadow-lg shadow-emerald-900/10 border-l-4 border-emerald-300">
            <span className="text-[10px] font-black uppercase tracking-widest">Novo</span>
          </div>
        )}
        {discount > 0 && (
          <div className="flex items-center bg-gradient-to-r from-[#F47920] to-[#e06b10] text-white pl-4 pr-3 py-1.5 rounded-r-2xl shadow-lg shadow-orange-900/10 border-l-4 border-orange-300">
            <span className="text-[11px] font-black uppercase tracking-tight">-{discount}% OFF</span>
          </div>
        )}
      </div>

      <Link
        href={`/produto/${product.slug}`}
        className="relative block aspect-[4/4] overflow-hidden bg-slate-50/50"
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-contain p-6 sm:p-10 transition-transform duration-[1500ms] group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package className="h-12 w-12 text-slate-200" />
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <div className="mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Estoque OK
            </div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60">ID: {product.id.slice(0, 4)}</span>
        </div>

        <Link href={`/produto/${product.slug}`} className="mb-4">
          <h3 className="line-clamp-2 text-sm sm:text-base font-black leading-tight text-[#002D5B] transition-colors group-hover:text-[#F47920] uppercase italic">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto space-y-4">
          <div className="border-t border-slate-100 pt-4">
            {product.original_price && product.original_price > product.price && (
              <p className="text-[11px] text-slate-400 line-through font-bold mb-0.5">
                R$ {Number(product.original_price).toFixed(2).replace(".", ",")}
              </p>
            )}
            <div className="flex items-baseline gap-1.5">
              <p className="text-2xl sm:text-3xl font-black text-[#002D5B] tabular-nums tracking-tighter">
                <span className="text-xs font-black mr-1 opacity-40">R$</span>
                {Number(product.price).toFixed(2).replace(".", ",")}
              </p>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">/{product.unit}</span>
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="group/buy relative flex-1 flex h-12 sm:h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#002D5B] to-[#003d7a] text-white text-[10px] font-black uppercase tracking-[0.15em] shadow-lg shadow-blue-900/10 transition-all duration-300 hover:shadow-blue-900/20 hover:-translate-y-1 active:scale-95 overflow-hidden"
            >
              <ShoppingCart className="h-4 w-4 mr-2 relative z-10" />
              <span className="relative z-10">Carrinho</span>
            </button>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group/wa relative flex h-12 sm:h-14 w-12 sm:w-14 items-center justify-center rounded-2xl bg-[#F47920] text-white shadow-lg shadow-orange-900/10 transition-all duration-300 hover:shadow-orange-900/20 hover:-translate-y-1 active:scale-95"
              title="Orçamento via WhatsApp"
            >
              <MessageCircle className="h-5 w-5 fill-current relative z-10" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
