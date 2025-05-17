"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
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

    // Create video element for cinematic background
    const video = videoRef.current
    if (!video) return

    // Simulate a cinematic video with canvas animation
    const particles: Particle[] = []
    const particleCount = 100
    const colors = [
      "rgba(255, 0, 0, ",
      "rgba(0, 0, 255, ",
      "rgba(255, 255, 0, ",
      "rgba(255, 0, 255, ",
      "rgba(0, 255, 255, ",
    ]

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
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.opacity = Math.random() * 0.5 + 0.1
        this.life = 0
        this.maxLife = Math.random() * 100 + 100
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

    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Create cinematic lens flares
    function drawLensFlare(x: number, y: number) {
      const gradient = ctx!.createRadialGradient(x, y, 0, x, y, 200)
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
      gradient.addColorStop(0.1, "rgba(255, 200, 100, 0.3)")
      gradient.addColorStop(0.2, "rgba(255, 100, 50, 0.2)")
      gradient.addColorStop(0.8, "rgba(50, 0, 100, 0.1)")
      gradient.addColorStop(1, "rgba(0, 0, 50, 0)")

      ctx!.beginPath()
      ctx!.fillStyle = gradient
      ctx!.arc(x, y, 200, 0, Math.PI * 2)
      ctx!.fill()

      // Add some smaller flares
      for (let i = 0; i < 5; i++) {
        const size = Math.random() * 30 + 10
        const distance = Math.random() * 150 + 50
        const angle = Math.random() * Math.PI * 2
        const flareX = x + Math.cos(angle) * distance
        const flareY = y + Math.sin(angle) * distance

        const flareGradient = ctx!.createRadialGradient(flareX, flareY, 0, flareX, flareY, size)
        flareGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
        flareGradient.addColorStop(0.5, "rgba(255, 200, 100, 0.3)")
        flareGradient.addColorStop(1, "rgba(255, 100, 50, 0)")

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

      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2
        const length = Math.random() * 300 + 200

        ctx!.rotate(angle)
        const gradient = ctx!.createLinearGradient(0, 0, length, 0)
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.5)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx!.beginPath()
        ctx!.strokeStyle = gradient
        ctx!.lineWidth = Math.random() * 5 + 2
        ctx!.moveTo(0, 0)
        ctx!.lineTo(length, 0)
        ctx!.stroke()
      }

      ctx!.restore()
    }

    // Create cinematic dust particles
    function drawDustParticles() {
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 2 + 0.5
        const opacity = Math.random() * 0.2

        ctx!.beginPath()
        ctx!.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx!.arc(x, y, size, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    // Create cinematic vignette effect
    function drawVignette() {
      const gradient = ctx!.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height / 2,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width,
      )
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
      gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.2)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.8)")

      ctx!.fillStyle = gradient
      ctx!.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Create cinematic film grain
    function drawFilmGrain() {
      const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      const noise = 10

      for (let i = 0; i < data.length; i += 4) {
        const grainAmount = Math.random() * noise - noise / 2
        data[i] += grainAmount // red
        data[i + 1] += grainAmount // green
        data[i + 2] += grainAmount // blue
      }

      ctx!.putImageData(imageData, 0, 0)
    }

    // Animation loop
    let animationFrameId: number
    let time = 0

    function animate() {
      time += 0.01
      ctx!.clearRect(0, 0, canvas.width, canvas.height)

      // Draw a dark background
      ctx!.fillStyle = "rgb(5, 5, 15)"
      ctx!.fillRect(0, 0, canvas.width, canvas.height)

      // Draw moving particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw lens flares that move slowly
      const flareX = canvas.width * (0.3 + 0.2 * Math.sin(time * 0.2))
      const flareY = canvas.height * (0.3 + 0.1 * Math.cos(time * 0.3))
      drawLensFlare(flareX, flareY)

      // Draw light rays
      drawLightRays(canvas.width * 0.7, canvas.height * 0.3)

      // Draw dust particles
      drawDustParticles()

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
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full" />
      <video ref={videoRef} className="hidden" muted loop playsInline crossOrigin="anonymous" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"
      />
    </>
  )
}
