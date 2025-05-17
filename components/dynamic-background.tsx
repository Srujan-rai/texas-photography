"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"

interface DynamicBackgroundProps {
  intensity?: number
  className?: string
}

export function DynamicBackground({ intensity = 1, className = "" }: DynamicBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * intensity])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Add error handling
    try {
      // Set canvas dimensions
      const setCanvasDimensions = () => {
        try {
          const dpr = window.devicePixelRatio || 1
          const rect = canvas.getBoundingClientRect()

          canvas.width = rect.width * dpr
          canvas.height = rect.height * dpr

          ctx.scale(dpr, dpr)

          // Reset canvas styles to ensure proper display
          canvas.style.width = `${rect.width}px`
          canvas.style.height = `${rect.height}px`
        } catch (error) {
          console.error("Error setting canvas dimensions:", error)
        }
      }

      setCanvasDimensions()
      window.addEventListener("resize", setCanvasDimensions)

      // Create dynamic gradient waves
      class Wave {
        x: number
        y: number
        width: number
        height: number
        color: string
        speed: number
        offset: number

        constructor(width: number, height: number, color: string, speed: number, offset = 0) {
          this.x = 0
          this.y = 0
          this.width = width
          this.height = height
          this.color = color
          this.speed = speed
          this.offset = offset
        }

        draw(ctx: CanvasRenderingContext2D, time: number) {
          const amplitude = this.height / 4
          const wavelength = this.width / 2

          ctx.beginPath()
          ctx.moveTo(this.x, this.y + this.height)

          for (let x = 0; x <= this.width; x += 10) {
            const y =
              amplitude * Math.sin((x / wavelength) * Math.PI * 2 + time * this.speed + this.offset) + this.height / 2
            ctx.lineTo(x, y)
          }

          ctx.lineTo(this.width, this.height)
          ctx.lineTo(0, this.height)
          ctx.closePath()

          const gradient = ctx.createLinearGradient(0, 0, this.width, this.height)
          gradient.addColorStop(0, `${this.color}00`)
          gradient.addColorStop(0.5, `${this.color}40`)
          gradient.addColorStop(1, `${this.color}00`)

          ctx.fillStyle = gradient
          ctx.fill()
        }
      }

      // Create floating orbs
      class Orb {
        x: number
        y: number
        radius: number
        color: string
        speed: number
        amplitude: number
        offset: number

        constructor(x: number, y: number, radius: number, color: string, speed: number, amplitude: number, offset = 0) {
          this.x = x
          this.y = y
          this.radius = radius
          this.color = color
          this.speed = speed
          this.amplitude = amplitude
          this.offset = offset
        }

        draw(ctx: CanvasRenderingContext2D, time: number) {
          const x = this.x + Math.sin(time * this.speed + this.offset) * this.amplitude
          const y = this.y + Math.cos(time * this.speed * 0.5 + this.offset) * this.amplitude

          const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius)
          gradient.addColorStop(0, `${this.color}40`)
          gradient.addColorStop(1, `${this.color}00`)

          ctx.beginPath()
          ctx.arc(x, y, this.radius, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }
      }

      // Create waves and orbs
      const waves: Wave[] = []
      const orbs: Orb[] = []
      const rect = canvas.getBoundingClientRect()

      // Colors based on theme
      const colors = isDark
        ? ["#8B5CF6", "#EC4899", "#3B82F6", "#10B981"] // Dark theme colors
        : ["#C4B5FD", "#F9A8D4", "#93C5FD", "#6EE7B7"] // Light theme colors

      // Create waves
      for (let i = 0; i < 4; i++) {
        waves.push(new Wave(rect.width, rect.height, colors[i % colors.length], 0.0005 + i * 0.0002, (i * Math.PI) / 2))
      }

      // Create orbs - number based on screen size
      const orbCount = Math.max(3, Math.min(10, Math.floor(rect.width / 150)))

      for (let i = 0; i < orbCount; i++) {
        orbs.push(
          new Orb(
            Math.random() * rect.width,
            Math.random() * rect.height,
            Math.random() * 150 + 50,
            colors[i % colors.length],
            0.0003 + Math.random() * 0.0005,
            Math.random() * 100 + 50,
            Math.random() * Math.PI * 2,
          ),
        )
      }

      // Add error handling for animation frame
      let animationFrameId: number
      let isAnimating = true
      let time = 0

      function animate() {
        if (!isAnimating) return

        try {
          // Clear canvas with a gradient background
          const bgGradient = ctx.createLinearGradient(0, 0, 0, rect.height)

          if (isDark) {
            bgGradient.addColorStop(0, "rgba(0, 0, 0, 1)")
            bgGradient.addColorStop(1, "rgba(10, 10, 30, 1)")
          } else {
            bgGradient.addColorStop(0, "rgba(255, 255, 255, 1)")
            bgGradient.addColorStop(1, "rgba(240, 240, 255, 1)")
          }

          ctx.fillStyle = bgGradient
          ctx.fillRect(0, 0, rect.width, rect.height)

          // Draw orbs
          orbs.forEach((orb) => orb.draw(ctx, time))

          // Draw waves
          waves.forEach((wave) => wave.draw(ctx, time))

          animationFrameId = requestAnimationFrame(animate)
          time += 0.01 // Increment time for the next frame
        } catch (error) {
          console.error("Animation error:", error)
          isAnimating = false
        }
      }

      animate()

      // Cleanup
      return () => {
        isAnimating = false
        window.removeEventListener("resize", setCanvasDimensions)
        cancelAnimationFrame(animationFrameId)
      }
    } catch (error) {
      console.error("Dynamic background error:", error)
      // Provide a fallback - just a simple gradient
      if (canvas && ctx) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, "rgb(10, 10, 30)")
        gradient.addColorStop(1, "rgb(5, 5, 15)")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [isDark, intensity, mounted])

  return (
    <div ref={containerRef} className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"
      />
    </div>
  )
}
