"use client"

import { useState, useEffect, useCallback } from "react"
import useSWR from "swr"
import useEmblaCarousel from "embla-carousel-react"
import { createClient } from "@/lib/supabase/client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const supabase = createClient()

async function fetchBanners() {
  const { data } = await supabase
    .from("banners")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true })
  return data || []
}

type DbBanner = {
  id: string
  image_url: string
  link?: string | null
}

export default function HeroBanner() {
  const { data: slides, isLoading } = useSWR<DbBanner[]>("store-banners", fetchBanners, {
    revalidateOnFocus: false,
  })

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: (slides?.length ?? 0) > 1,
    align: "start",
    duration: 30,
  })

  const [selected, setSelected] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
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
    if (!emblaApi || !slides || slides.length <= 1 || isPaused) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [emblaApi, slides, isPaused])

  if (isLoading || !slides || slides.length === 0) {
    return null
  }

  return (
    <section 
      className="w-full bg-background" 
      aria-label="Banners principais"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="relative mx-auto w-full max-w-[1920px]">
        <div className="overflow-hidden sm:rounded-[2.5rem] shadow-app-lg" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {slides.map((banner, i) => (
              <div key={banner.id} className="relative min-w-0 shrink-0 grow-0 basis-full">
                <div className="relative aspect-[4/5] sm:aspect-[16/7] lg:aspect-[1920/520] w-full overflow-hidden">
                  {banner.link ? (
                    <Link href={banner.link} className="block size-full group/banner">
                      <Image
                        src={banner.image_url}
                        alt="Banner"
                        fill
                        priority={i === 0}
                        sizes="100vw"
                        className="object-cover transition-transform duration-[2000ms] group-hover/banner:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                    </Link>
                  ) : (
                    <>
                      <Image
                        src={banner.image_url}
                        alt="Banner"
                        fill
                        priority={i === 0}
                        sizes="100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-2xl glass h-14 w-14 text-[#002D5B] shadow-app-lg transition-all hover:bg-[#F47920] hover:text-white lg:flex active:scale-90"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-2xl glass h-14 w-14 text-[#002D5B] shadow-app-lg transition-all hover:bg-[#F47920] hover:text-white lg:flex active:scale-90"
              aria-label="Próximo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3 bg-black/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === selected ? "w-10 bg-[#F47920]" : "w-2 bg-white/60 hover:bg-white"
                  }`}
                  aria-label={`Ir para slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
