"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface CinematicVideoBackgroundProps {
  overlayOpacity?: number
  className?: string
}

export function CinematicVideoBackground({ overlayOpacity = 0.5, className = "" }: CinematicVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [fallbackActive, setFallbackActive] = useState(true)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Handle video loading and fallback
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsVideoLoaded(true)
      setFallbackActive(false)
      video.play().catch(() => {
        // If autoplay is blocked, keep the fallback active
        setFallbackActive(true)
      })
    }

    const handleError = () => {
      setFallbackActive(true)
    }

    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("error", handleError)
    }
  }, [])

  // Canvas-based fallback animation
  useEffect(() => {
    if (!fallbackActive) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create cinematic particles
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
      life: number
      maxLife: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25

        // Different colors based on theme - using more dramatic colors for dark theme
        if (isDark) {
          const colors = [
            "rgba(255, 255, 255, ", // white
            "rgba(100, 100, 255, ", // blue
            "rgba(255, 100, 100, ", // red
            "rgba(255, 200, 100, ", // gold
          ]
          this.color = colors[Math.floor(Math.random() * colors.length)]
        } else {
          const colors = ["rgba(50, 50, 100, ", "rgba(100, 50, 150, ", "rgba(150, 50, 100, "]
          this.color = colors[Math.floor(Math.random() * colors.length)]
        }

        this.opacity = Math.random() * 0.5 + 0.1
        this.life = 0
        this.maxLife = Math.random() * 200 + 100
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life++

        // Fade out as life increases
        if (this.life > this.maxLife / 2) {
          this.opacity = 0.5 - (this.life - this.maxLife / 2) / (this.maxLife / 2)
        }

        // Reset particle when it dies
        if (this.life >= this.maxLife) {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.life = 0
          this.opacity = Math.random() * 0.5 + 0.1
        }

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

    // Create particles
    const particles: Particle[] = []
    const particleCount = 150 // Increased particle count for more dramatic effect

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Create cinematic lens flares
    function drawLensFlare(x: number, y: number) {
      const gradient = ctx!.createRadialGradient(x, y, 0, x, y, 300) // Increased size for more dramatic effect

      if (isDark) {
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
        gradient.addColorStop(0.1, "rgba(255, 200, 100, 0.3)")
        gradient.addColorStop(0.2, "rgba(255, 100, 50, 0.2)")
        gradient.addColorStop(0.8, "rgba(50, 0, 100, 0.1)")
        gradient.addColorStop(1, "rgba(0, 0, 50, 0)")
      } else {
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
        gradient.addColorStop(0.1, "rgba(200, 150, 255, 0.3)")
        gradient.addColorStop(0.2, "rgba(150, 100, 255, 0.2)")
        gradient.addColorStop(0.8, "rgba(100, 50, 200, 0.1)")
        gradient.addColorStop(1, "rgba(50, 0, 150, 0)")
      }

      ctx!.beginPath()
      ctx!.fillStyle = gradient
      ctx!.arc(x, y, 300, 0, Math.PI * 2)
      ctx!.fill()

      // Add some smaller flares
      for (let i = 0; i < 8; i++) {
        // More flares for dramatic effect
        const size = Math.random() * 50 + 20 // Larger flares
        const distance = Math.random() * 250 + 100
        const angle = Math.random() * Math.PI * 2
        const flareX = x + Math.cos(angle) * distance
        const flareY = y + Math.sin(angle) * distance

        const flareGradient = ctx!.createRadialGradient(flareX, flareY, 0, flareX, flareY, size)

        if (isDark) {
          flareGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
          flareGradient.addColorStop(0.5, "rgba(255, 200, 100, 0.3)")
          flareGradient.addColorStop(1, "rgba(255, 100, 50, 0)")
        } else {
          flareGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
          flareGradient.addColorStop(0.5, "rgba(200, 150, 255, 0.3)")
          flareGradient.addColorStop(1, "rgba(150, 100, 255, 0)")
        }

        ctx!.beginPath()
        ctx!.fillStyle = flareGradient
        ctx!.arc(flareX, flareY, size, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    // Create cinematic light rays
    function drawLightRays(x: number, y: number) {
      ctx!.save()
      ctx!.translate(x, y)

      for (let i = 0; i < 18; i++) {
        // More rays for dramatic effect
        const angle = (i / 18) * Math.PI * 2
        const length = Math.random() * 500 + 300 // Longer rays

        ctx!.rotate(angle)
        const gradient = ctx!.createLinearGradient(0, 0, length, 0)
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.5)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx!.beginPath()
        ctx!.strokeStyle = gradient
        ctx!.lineWidth = Math.random() * 8 + 3 // Thicker rays
        ctx!.moveTo(0, 0)
        ctx!.lineTo(length, 0)
        ctx!.stroke()
      }

      ctx!.restore()
    }

    // Create cinematic vignette effect
    function drawVignette() {
      const gradient = ctx!.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height / 3, // Stronger vignette
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 1.2,
      )

      if (isDark) {
        gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.4)") // Stronger vignette
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.9)") // Almost black at edges
      } else {
        gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
        gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.1)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.4)")
      }

      ctx!.fillStyle = gradient
      ctx!.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Create cinematic film grain
    function drawFilmGrain() {
      const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      const noise = isDark ? 15 : 5 // More grain in dark mode

      for (let i = 0; i < data.length; i += 4) {
        const grainAmount = Math.random() * noise - noise / 2
        data[i] += grainAmount // red
        data[i + 1] += grainAmount // green
        data[i + 2] += grainAmount // blue
      }

      ctx!.putImageData(imageData, 0, 0)
    }

    // Draw stars in the background
    function drawStars() {
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 1.5 + 0.5
        const opacity = Math.random() * 0.8 + 0.2

        ctx!.beginPath()
        ctx!.arc(x, y, size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx!.fill()
      }
    }

    // Animation loop
    let animationFrameId: number
    let time = 0

    function animate() {
      time += 0.01
      ctx!.clearRect(0, 0, canvas.width, canvas.height)

      // Draw a true black background
      ctx!.fillStyle = "rgb(0, 0, 0)" // Pure black
      ctx!.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars for deep space effect
      if (isDark) {
        drawStars()
      }

      // Draw moving particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw lens flares that move slowly
      const flareX1 = canvas.width * (0.3 + 0.2 * Math.sin(time * 0.2))
      const flareY1 = canvas.height * (0.3 + 0.1 * Math.cos(time * 0.3))
      drawLensFlare(flareX1, flareY1)

      // Add a second lens flare for more dramatic effect
      const flareX2 = canvas.width * (0.7 + 0.15 * Math.cos(time * 0.15))
      const flareY2 = canvas.height * (0.6 + 0.12 * Math.sin(time * 0.25))
      drawLensFlare(flareX2, flareY2)

      // Draw light rays
      drawLightRays(canvas.width * 0.7, canvas.height * 0.3)

      // Draw vignette
      drawVignette()

      // Draw film grain
      drawFilmGrain()

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [fallbackActive, isDark])

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      {/* Video background */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded && !fallbackActive ? "opacity-100" : "opacity-0"
        }`}
        playsInline
        autoPlay
        muted
        loop
        poster="/placeholder.svg?height=1080&width=1920&text=Loading+Video"
      >
        {/* This is a placeholder. In a real implementation, you would use actual video files */}
        <source src="/assets/videos/cinematic-background.mp4" type="video/mp4" />
        <source src="/assets/videos/cinematic-background.webm" type="video/webm" />
      </video>

      {/* Canvas fallback for when video can't play */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
          fallbackActive ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Overlay gradients for better text readability */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: overlayOpacity }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80"
      />

      {/* Additional cinematic overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-pink-900/20"
      />
    </div>
  )
}
