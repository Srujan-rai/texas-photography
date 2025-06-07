"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)
  const pathname = usePathname()

  // Reset scroll position on page change
  useEffect(() => {
    window.scrollTo(0, 0)

    // Small delay to ensure DOM is ready after navigation
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 200)

    return () => clearTimeout(timer)
  }, [pathname])

  // Set up smooth scrolling with optimized performance
  useEffect(() => {
    if (!contentRef.current || !scrollerRef.current || !isReady) return

    const content = contentRef.current
    const scroller = scrollerRef.current

    // Set initial height
    const updateHeight = () => {
      scroller.style.height = `${content.scrollHeight}px`
    }

    updateHeight()

    // Optimize ResizeObserver with throttling
    let resizeTimeout: NodeJS.Timeout
    const resizeObserver = new ResizeObserver(() => {
      if (resizeTimeout) return

      resizeTimeout = setTimeout(() => {
        updateHeight()
        resizeTimeout = undefined as unknown as NodeJS.Timeout
      }, 250) // Increased timeout for less frequent updates
    })

    try {
      resizeObserver.observe(content)
    } catch (error) {
      console.error("ResizeObserver error:", error)
    }

    // Optimized smooth scroll animation
    let rafId: number
    let lastScrollY = window.scrollY
    let currentScrollY = window.scrollY

    // Optimized lerp function with configurable smoothness
    const smoothness = 0.12 // Higher value = smoother scrolling (0.08-0.15 is a good range)

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    // Use timestamp-based animation for consistent performance
    let lastTime = performance.now()

    const updateScroll = (time: number) => {
      // Calculate delta time for consistent animation regardless of frame rate
      const deltaTime = Math.min(time - lastTime, 50) / 16.67 // Cap at 50ms, normalize to 60fps
      lastTime = time

      // Get current scroll position
      const targetScrollY = window.scrollY

      // Apply smoothing with time-based adjustment
      currentScrollY = lerp(currentScrollY, targetScrollY, smoothness * deltaTime)

      // Only update DOM when there's a noticeable change and not too frequently
      if (Math.abs(currentScrollY - lastScrollY) > 0.5) {
        content.style.transform = `translate3D(0, ${-Math.round(currentScrollY)}px, 0)`
        lastScrollY = currentScrollY
      }

      rafId = requestAnimationFrame(updateScroll)
    }

    // Start the animation
    rafId = requestAnimationFrame(updateScroll)

    // Handle window resize
    const handleResize = () => {
      updateHeight()
      // Reset scroll position to avoid jumps
      currentScrollY = window.scrollY
      lastScrollY = window.scrollY
      content.style.transform = `translate3D(0, ${-currentScrollY}px, 0)`
    }

    window.addEventListener("resize", handleResize, { passive: true })

    // Cleanup
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (resizeTimeout) clearTimeout(resizeTimeout)
      window.removeEventListener("resize", handleResize)

      try {
        resizeObserver.disconnect()
      } catch (error) {
        console.error("ResizeObserver disconnect error:", error)
      }
    }
  }, [isReady, pathname])

  return (
    <>
      <div ref={scrollerRef} style={{ position: "relative", width: "100%" }} />
      <div
        ref={contentRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          willChange: "transform",
          transform: "translate3D(0, 0, 0)", // Use translate3D for hardware acceleration
          backfaceVisibility: "hidden", // Prevent flickering in some browsers
        }}
      >
        {children}
      </div>
    </>
  )
}
