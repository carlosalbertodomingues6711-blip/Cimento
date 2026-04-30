"use client"

import { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from "@/components/store/product-card"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  discount_price?: number | null
  image_url?: string | null
  active: boolean
  is_new?: boolean
  is_discount?: boolean
  description?: string | null
}

interface ProductsCarouselProps {
  products: Product[]
}

export default function ProductsCarousel({ products }: ProductsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: products.length > 4,
    align: "start",
    skipSnaps: false,
  })

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  const [isPaused, setIsPaused] = useState(false)

  // Autoplay
  useEffect(() => {
    if (!emblaApi || products.length <= 4 || isPaused) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [emblaApi, products.length, isPaused])

  if (products.length === 0) return null

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden px-1" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-0 shrink-0 grow-0 px-2 basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute -left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#002D5B] shadow-xl border border-slate-100 transition-all hover:bg-[#F47920] hover:text-white disabled:opacity-0 max-lg:hidden"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute -right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#002D5B] shadow-xl border border-slate-100 transition-all hover:bg-[#F47920] hover:text-white disabled:opacity-0 max-lg:hidden"
        aria-label="Próximo"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      {/* Mobile Indicator */}
      <div className="mt-6 flex justify-center gap-1.5 lg:hidden">
        {products.slice(0, Math.ceil(products.length / 2)).map((_, i) => (
          <div key={i} className="h-1 w-4 rounded-full bg-slate-200" />
        ))}
      </div>
    </div>
  )
}
