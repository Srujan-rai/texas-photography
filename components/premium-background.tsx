"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"

interface PremiumBackgroundProps {
  variant?: "hero" | "parallax" | "gradient" | "minimal"
  intensity?: number
  className?: string
}

export function PremiumBackground({ variant = "hero", intensity = 1, className = "" }: PremiumBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * intensity])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Ensure component is mounted to access theme
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 1.5
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create particles
    const particles: Particle[] = []
    const particleCount = variant === "hero" ? 100 : variant === "parallax" ? 150 : 80

    // Determine color scheme based on theme
    const isDark = theme === "dark"

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.3 - 0.15
        this.speedY = Math.random() * 0.3 - 0.15

        // Different color schemes for different variants and themes
        if (variant === "hero") {
          if (isDark) {
            const colors = ["rgba(255, 255, 255, ", "rgba(200, 200, 255, ", "rgba(255, 200, 200, "]
            this.color = colors[Math.floor(Math.random() * colors.length)]
          } else {
            const colors = ["rgba(50, 50, 100, ", "rgba(100, 50, 150, ", "rgba(150, 50, 100, "]
            this.color = colors[Math.floor(Math.random() * colors.length)]
          }
        } else if (variant === "parallax") {
          if (isDark) {
            const colors = ["rgba(100, 100, 255, ", "rgba(100, 200, 255, ", "rgba(150, 100, 255, "]
            this.color = colors[Math.floor(Math.random() * colors.length)]
          } else {
            const colors = ["rgba(50, 50, 150, ", "rgba(50, 100, 150, ", "rgba(100, 50, 150, "]
            this.color = colors[Math.floor(Math.random() * colors.length)]
          }
        } else {
          if (isDark) {
            const colors = ["rgba(200, 100, 200, ", "rgba(255, 100, 150, ", "rgba(150, 100, 255, "]
            this.color = colors[Math.floor(Math.random() * colors.length)]
          } else {
            const colors = ["rgba(100, 50, 100, ", "rgba(150, 50, 100, ", "rgba(100, 50, 150, "]
            this.color = colors[Math.floor(Math.random() * colors.length)]
          }
        }

        this.opacity = Math.random() * 0.5 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fillStyle = `${this.color}${this.opacity})`
        ctx!.fill()
      }
    }

    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Connect particles with lines
    function connectParticles() {
      const maxDistance = 150

      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx!.strokeStyle = `${particles[a].color}${opacity * 0.2})`
            ctx!.lineWidth = 0.5
            ctx!.beginPath()
            ctx!.moveTo(particles[a].x, particles[a].y)
            ctx!.lineTo(particles[b].x, particles[b].y)
            ctx!.stroke()
          }
        }
      }
    }

    // Create gradient background
    function drawGradientBackground() {
      let gradient

      if (isDark) {
        if (variant === "hero") {
          gradient = ctx!.createLinearGradient(0, 0, canvas.width, canvas.height)
          gradient.addColorStop(0, "rgba(10, 10, 30, 1)")
          gradient.addColorStop(1, "rgba(30, 10, 40, 1)")
        } else if (variant === "parallax") {
          gradient = ctx!.createLinearGradient(0, 0, canvas.width, canvas.height)
          gradient.addColorStop(0, "rgba(5, 15, 30, 1)")
          gradient.addColorStop(1, "rgba(20, 5, 30, 1)")
        } else {
          gradient = ctx!.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            0,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 1.5,
          )
          gradient.addColorStop(0, "rgba(20, 10, 30, 1)")
          gradient.addColorStop(1, "rgba(10, 5, 15, 1)")
        }
      } else {
        if (variant === "hero") {
          gradient = ctx!.createLinearGradient(0, 0, canvas.width, canvas.height)
          gradient.addColorStop(0, "rgba(240, 240, 255, 1)")
          gradient.addColorStop(1, "rgba(255, 240, 250, 1)")
        } else if (variant === "parallax") {
          gradient = ctx!.createLinearGradient(0, 0, canvas.width, canvas.height)
          gradient.addColorStop(0, "rgba(230, 240, 255, 1)")
          gradient.addColorStop(1, "rgba(240, 230, 255, 1)")
        } else {
          gradient = ctx!.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            0,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 1.5,
          )
          gradient.addColorStop(0, "rgba(245, 240, 255, 1)")
          gradient.addColorStop(1, "rgba(235, 245, 255, 1)")
        }
      }

      ctx!.fillStyle = gradient
      ctx!.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Add film grain effect
    function addFilmGrain() {
      const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      const noise = isDark ? 10 : 5
      const grainOpacity = isDark ? 0.1 : 0.05

      for (let i = 0; i < data.length; i += 4) {
        const grainAmount = Math.random() * noise - noise / 2
        if (Math.random() < grainOpacity) {
          data[i] += grainAmount // red
          data[i + 1] += grainAmount // green
          data[i + 2] += grainAmount // blue
        }
      }

      ctx!.putImageData(imageData, 0, 0)
    }

    // Animation loop
    let animationFrameId: number
    let time = 0

    function animate() {
      time += 0.01
      ctx!.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      drawGradientBackground()

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Connect particles
      if (variant !== "minimal") {
        connectParticles()
      }

      // Add subtle light effects based on variant
      if (variant === "hero") {
        // Add a subtle glow in the center
        const centerGlow = ctx!.createRadialGradient(
          canvas.width / 2,
          canvas.height / 3,
          0,
          canvas.width / 2,
          canvas.height / 3,
          canvas.width / 2,
        )

        if (isDark) {
          centerGlow.addColorStop(0, "rgba(255, 255, 255, 0.05)")
          centerGlow.addColorStop(0.5, "rgba(150, 100, 255, 0.03)")
          centerGlow.addColorStop(1, "rgba(0, 0, 0, 0)")
        } else {
          centerGlow.addColorStop(0, "rgba(255, 255, 255, 0.1)")
          centerGlow.addColorStop(0.5, "rgba(100, 50, 200, 0.05)")
          centerGlow.addColorStop(1, "rgba(255, 255, 255, 0)")
        }

        ctx!.fillStyle = centerGlow
        ctx!.fillRect(0, 0, canvas.width, canvas.height)
      } else if (variant === "parallax") {
        // Add moving light beams
        for (let i = 0; i < 3; i++) {
          const x = canvas.width * (0.2 + 0.6 * Math.sin(time * 0.1 + i))
          const y = canvas.height * 0.3

          const beam = ctx!.createRadialGradient(x, y, 0, x, y, canvas.width / 3)

          if (isDark) {
            beam.addColorStop(0, "rgba(100, 100, 255, 0.05)")
            beam.addColorStop(1, "rgba(0, 0, 0, 0)")
          } else {
            beam.addColorStop(0, "rgba(100, 50, 255, 0.03)")
            beam.addColorStop(1, "rgba(255, 255, 255, 0)")
          }

          ctx!.fillStyle = beam
          ctx!.fillRect(0, 0, canvas.width, canvas.height)
        }
      }

      // Add film grain for cinematic effect
      addFilmGrain()

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [variant, intensity, theme, mounted])

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
