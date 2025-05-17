"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const opacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 0])

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 2 // Make it taller for parallax effect
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create stars
    const stars: Star[] = []
    const starCount = 200

    class Star {
      x: number
      y: number
      size: number
      opacity: number
      speed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.opacity = Math.random() * 0.8 + 0.2
        this.speed = Math.random() * 0.05 + 0.01
      }

      update() {
        this.y -= this.speed
        if (this.y < 0) {
          this.y = canvas.height
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx!.fill()
      }
    }

    // Create initial stars
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star())
    }

    // Create nebula clouds
    function drawNebula(x: number, y: number, width: number, height: number, color: string) {
      const gradient = ctx!.createRadialGradient(x, y, 0, x, y, width / 2)
      gradient.addColorStop(0, `${color}0.4)`)
      gradient.addColorStop(0.5, `${color}0.2)`)
      gradient.addColorStop(1, `${color}0)`)

      ctx!.beginPath()
      ctx!.fillStyle = gradient
      ctx!.ellipse(x, y, width / 2, height / 2, 0, 0, Math.PI * 2)
      ctx!.fill()
    }

    // Animation loop
    let animationFrameId: number
    let time = 0

    function animate() {
      time += 0.005
      ctx!.clearRect(0, 0, canvas.width, canvas.height)

      // Draw a dark background
      ctx!.fillStyle = "rgb(5, 5, 15)"
      ctx!.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        star.update()
        star.draw()
      })

      // Draw nebula clouds with movement
      drawNebula(
        canvas.width * (0.2 + 0.05 * Math.sin(time)),
        canvas.height * 0.3,
        canvas.width * 0.4,
        canvas.height * 0.3,
        "rgba(70, 0, 150, ",
      )
      drawNebula(
        canvas.width * (0.7 + 0.05 * Math.cos(time * 0.7)),
        canvas.height * 0.6,
        canvas.width * 0.5,
        canvas.height * 0.4,
        "rgba(0, 50, 150, ",
      )
      drawNebula(
        canvas.width * (0.5 + 0.07 * Math.sin(time * 0.5)),
        canvas.height * 0.8,
        canvas.width * 0.6,
        canvas.height * 0.5,
        "rgba(150, 0, 100, ",
      )

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
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <motion.div
        style={{ y: y1, opacity: opacity1 }}
        className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent"
      />
      <motion.div
        style={{ y: y2, opacity: opacity2 }}
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-pink-900/10 to-transparent"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"
      />
    </div>
  )
}
