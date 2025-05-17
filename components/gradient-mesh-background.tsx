"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function GradientMeshBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 1.5 // Make it taller for scrolling effect
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create gradient mesh
    class Point {
      x: number
      y: number
      originX: number
      originY: number
      color: string
      size: number
      vx: number
      vy: number

      constructor(x: number, y: number, color: string) {
        this.x = this.originX = x
        this.y = this.originY = y
        this.color = color
        this.size = Math.random() * 2 + 1
        this.vx = Math.random() * 0.2 - 0.1
        this.vy = Math.random() * 0.2 - 0.1
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Bounce back when reaching boundaries
        if (Math.abs(this.x - this.originX) > 50) {
          this.vx *= -1
        }
        if (Math.abs(this.y - this.originY) > 50) {
          this.vy *= -1
        }
      }

      draw() {
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fillStyle = this.color
        ctx!.fill()
      }
    }

    // Create grid of points
    const points: Point[] = []
    const gridSize = 30
    const cols = Math.floor(canvas.width / gridSize) + 1
    const rows = Math.floor(canvas.height / gridSize) + 1

    const colors = [
      "rgba(147, 51, 234, 0.7)", // purple
      "rgba(219, 39, 119, 0.7)", // pink
      "rgba(239, 68, 68, 0.7)", // red
      "rgba(59, 130, 246, 0.7)", // blue
      "rgba(16, 185, 129, 0.7)", // green
    ]

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * gridSize
        const y = j * gridSize
        const color = colors[Math.floor(Math.random() * colors.length)]
        points.push(new Point(x, y, color))
      }
    }

    // Draw connections between points
    function drawConnections() {
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < gridSize * 2) {
            ctx!.beginPath()
            ctx!.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - distance / (gridSize * 2))})`
            ctx!.lineWidth = 1
            ctx!.moveTo(points[i].x, points[i].y)
            ctx!.lineTo(points[j].x, points[j].y)
            ctx!.stroke()
          }
        }
      }
    }

    // Animation loop
    let animationFrameId: number
    let time = 0

    function animate() {
      time += 0.01
      ctx!.clearRect(0, 0, canvas.width, canvas.height)

      // Draw a dark background
      const gradient = ctx!.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgb(10, 10, 30)")
      gradient.addColorStop(1, "rgb(5, 5, 15)")
      ctx!.fillStyle = gradient
      ctx!.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw points
      points.forEach((point) => {
        point.update()
        point.draw()
      })

      // Draw connections
      drawConnections()

      // Add some floating gradient orbs
      for (let i = 0; i < 5; i++) {
        const x = canvas.width * (0.2 + 0.6 * Math.sin(time * 0.2 + i))
        const y = canvas.height * (0.2 + 0.6 * Math.cos(time * 0.3 + i * 2))
        const size = canvas.width * (0.1 + 0.05 * Math.sin(time * 0.5 + i * 3))

        const orbGradient = ctx!.createRadialGradient(x, y, 0, x, y, size)
        orbGradient.addColorStop(0, `rgba(${100 + i * 30}, ${50 + i * 40}, ${150 + i * 20}, 0.1)`)
        orbGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx!.beginPath()
        ctx!.fillStyle = orbGradient
        ctx!.arc(x, y, size, 0, Math.PI * 2)
        ctx!.fill()
      }

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
        style={{ rotate, scale }}
        className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10"
      />
    </div>
  )
}
