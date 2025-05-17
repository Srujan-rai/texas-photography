"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [isEnabled, setIsEnabled] = useState(true)
  const pathname = usePathname()

  // Disable smooth scrolling on problematic pages
  useEffect(() => {
    // Check if current page is causing issues
    if (pathname === "/portfolio") {
      setIsEnabled(false)
    } else {
      setIsEnabled(true)
    }
  }, [pathname])

  // Set up smooth scrolling
  useEffect(() => {
    if (!contentRef.current || !scrollerRef.current || !isEnabled) return

    const content = contentRef.current
    const scroller = scrollerRef.current

    // Set initial height
    scroller.style.height = `${content.scrollHeight}px`

    // Update height on resize with debounce
    let resizeTimeout: NodeJS.Timeout
    let animationFrame: number

    const resizeObserver = new ResizeObserver(() => {
      // Debounce resize updates to prevent loops
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        scroller.style.height = `${content.scrollHeight}px`
      }, 100)
    })

    try {
      resizeObserver.observe(content)
    } catch (error) {
      console.error("ResizeObserver error:", error)
    }

    // Smooth scroll animation
    let lastScrollY = window.scrollY
    let currentScrollY = window.scrollY
    let ticking = false

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const updateScroll = () => {
      currentScrollY = lerp(currentScrollY, window.scrollY, 0.05) // Smoother factor

      if (Math.abs(currentScrollY - lastScrollY) > 0.05) {
        content.style.transform = `translateY(${-currentScrollY}px)`
        lastScrollY = currentScrollY
      }

      ticking = false
      animationFrame = requestAnimationFrame(updateScroll)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        animationFrame = requestAnimationFrame(updateScroll)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    animationFrame = requestAnimationFrame(updateScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      clearTimeout(resizeTimeout)
      cancelAnimationFrame(animationFrame)

      try {
        resizeObserver.disconnect()
      } catch (error) {
        console.error("ResizeObserver disconnect error:", error)
      }
    }
  }, [isEnabled, pathname])

  if (!isEnabled) {
    // If smooth scrolling is disabled, just render children directly
    return <>{children}</>
  }

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
        }}
      >
        {children}
      </div>
    </>
  )
}
