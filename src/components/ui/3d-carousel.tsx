"use client"

import { memo, useLayoutEffect, useMemo, useRef, useState, useEffect } from "react"
import {
  motion,
  useAnimation,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== "undefined" && initializeWithValue) {
      return window.matchMedia(query).matches
    }
    return defaultValue
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const matchMedia = window.matchMedia(query)
    setMatches(matchMedia.matches)

    const handleChange = () => {
      setMatches(matchMedia.matches)
    }

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

const keywords = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=900&auto=format&fit=crop",
]

const Carousel = memo(
  ({
    controls,
    cards,
  }: {
    controls: any
    cards: string[]
  }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const isScreenSizeMd = useMediaQuery("(max-width: 1024px)")
    const cylinderWidth = isScreenSizeSm ? 1800 : isScreenSizeMd ? 2300 : 2800
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)

    // Scroll-linked dynamic 3D rotation across the viewport
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"],
    })

    const rawScrollRotation = useTransform(scrollYProgress, [0, 1], [-130, 150])
    const smoothScrollRotation = useSpring(rawScrollRotation, {
      stiffness: 75,
      damping: 24,
      mass: 0.15,
      restDelta: 0.001,
    })

    // Scroll-linked 3D perspective scale and tilt (maintained high for prominent card presence)
    const rawScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.96, 1, 1, 0.94])
    const smoothScale = useSpring(rawScale, { stiffness: 85, damping: 26 })

    const rawRotateX = useTransform(scrollYProgress, [0, 0.45, 0.75, 1], [6, 0, 0, -4])
    const smoothRotateX = useSpring(rawRotateX, { stiffness: 80, damping: 25 })

    const dragOffset = useMotionValue(0)
    const totalRotation = useTransform(
      [smoothScrollRotation, dragOffset],
      ([scrollVal, dragVal]) => (scrollVal as number) + (dragVal as number)
    )

    return (
      <div
        ref={containerRef}
        className="flex h-full items-center justify-center"
        style={{
          perspective: isScreenSizeSm ? "1200px" : "1400px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag="x"
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing items-center"
          style={{
            rotateY: totalRotation,
            rotateX: smoothRotateX,
            scale: smoothScale,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) => {
            dragOffset.set(dragOffset.get() + info.offset.x * 0.05)
          }}
          onDragEnd={(_, info) => {
            controls.start({
              rotateY: dragOffset.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }}
          animate={controls}
        >
          {cards.map((imgUrl, i) => (
            <div
              key={`key-${imgUrl}-${i}`}
              className="absolute flex origin-center items-center justify-center rounded-3xl p-3 select-none pointer-events-none"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
            >
              <img
                src={imgUrl}
                alt={`Selected Work project ${i + 1}`}
                draggable={false}
                className="w-full rounded-2xl sm:rounded-3xl object-cover aspect-[16/11] shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-white/80 bg-slate-100 select-none"
              />
            </div>
          ))}
        </motion.div>
      </div>
    )
  }
)

Carousel.displayName = "Carousel"

function ThreeDPhotoCarousel({ items }: { items?: string[] }) {
  const [mounted, setMounted] = useState(false)
  const controls = useAnimation()
  const cards = useMemo(
    () => items || keywords,
    [items]
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative w-full">
      {/* Interactive 3D Cylindrical Photo Carousel */}
      <div className="relative h-[420px] xs:h-[460px] sm:h-[500px] md:h-[560px] lg:h-[600px] w-full overflow-hidden flex items-center justify-center">
        {mounted ? (
          <Carousel
            controls={controls}
            cards={cards}
          />
        ) : (
          <div className="w-[280px] sm:w-[320px] md:w-[350px] aspect-[16/11] rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-slate-100/60 shadow-[0_20px_50px_rgba(0,0,0,0.06)] animate-pulse" />
        )}
      </div>
    </div>
  )
}

export { ThreeDPhotoCarousel }

