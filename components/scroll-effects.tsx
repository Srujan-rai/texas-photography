"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"

interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}

export function ParallaxSection({ children, speed = 0.5, direction = "up", className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Calculate transform based on direction
  const transformRange = useRef({ start: "0%", end: "0%" })

  useEffect(() => {
    switch (direction) {
      case "up":
        transformRange.current = { start: "0%", end: `${-speed * 100}%` }
        break
      case "down":
        transformRange.current = { start: "0%", end: `${speed * 100}%` }
        break
      case "left":
        transformRange.current = { start: "0%", end: `${-speed * 100}%` }
        break
      case "right":
        transformRange.current = { start: "0%", end: `${speed * 100}%` }
        break
      default:
        transformRange.current = { start: "0%", end: `${-speed * 100}%` }
        break
    }
  }, [direction, speed])

  const transform = useTransform(scrollYProgress, [0, 1], [transformRange.current.start, transformRange.current.end])

  // Optimize spring animation for smoother parallax
  const springTransform = useSpring(transform, {
    stiffness: 50, // Lower stiffness for smoother movement
    damping: 20, // Lower damping for smoother movement
    mass: 0.5, // Lower mass for more responsive movement
  })

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{
          [direction === "left" || direction === "right" ? "x" : "y"]: springTransform,
          willChange: "transform", // Hint to browser to optimize
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

interface FadeInProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right" | "none"
  delay?: number
  duration?: number
  threshold?: number
  className?: string
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = "",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  // Set initial and animate values based on direction
  const getVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration, delay, ease: "easeOut" } },
    }

    switch (direction) {
      case "up":
        return {
          hidden: { ...baseVariants.hidden, y: 50 },
          visible: { ...baseVariants.visible, y: 0 },
        }
      case "down":
        return {
          hidden: { ...baseVariants.hidden, y: -50 },
          visible: { ...baseVariants.visible, y: 0 },
        }
      case "left":
        return {
          hidden: { ...baseVariants.hidden, x: 50 },
          visible: { ...baseVariants.visible, x: 0 },
        }
      case "right":
        return {
          hidden: { ...baseVariants.hidden, x: -50 },
          visible: { ...baseVariants.visible, x: 0 },
        }
      case "none":
        return baseVariants
      default:
        return {
          hidden: { ...baseVariants.hidden, y: 50 },
          visible: { ...baseVariants.visible, y: 0 },
        }
    }
  }

  const variants = getVariants()

  return (
    <div ref={ref} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration, delay }}
        style={{ willChange: "transform, opacity" }} // Optimize rendering
      >
        {children}
      </motion.div>
    </div>
  )
}

interface ZoomInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  threshold?: number
  scale?: number
  className?: string
}

export function ZoomIn({
  children,
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  scale = 0.9,
  className = "",
}: ZoomInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, scale }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale }}
        transition={{ duration, delay, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }} // Optimize rendering
      >
        {children}
      </motion.div>
    </div>
  )
}

interface ScrollProgressProps {
  color?: string
  height?: number
  zIndex?: number
}

export function ScrollProgress({ color = "#8B5CF6", height = 4, zIndex = 100 }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()

  // Optimize spring animation for smoother progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 15,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0"
      style={{
        transformOrigin: "0%",
        scaleX,
        height,
        background: color,
        zIndex,
        willChange: "transform", // Optimize rendering
      }}
    />
  )
}

interface TextRevealProps {
  text: string
  delay?: number
  duration?: number
  staggerChildren?: number
  className?: string
}

export function TextReveal({
  text,
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.03,
  className = "",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren, delayChildren: delay },
    }),
  }

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration },
    },
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-flex flex-wrap"
        style={{ willChange: "opacity" }} // Optimize rendering
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            className="mr-1 inline-block"
            style={{ willChange: "transform, opacity" }} // Optimize rendering
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

interface FloatingElementProps {
  children: React.ReactNode
  amplitude?: number
  frequency?: number
  className?: string
}

export function FloatingElement({ children, amplitude = 10, frequency = 4, className = "" }: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [`-${amplitude}px`, `${amplitude}px`, `-${amplitude}px`],
      }}
      transition={{
        duration: frequency,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        times: [0, 0.5, 1], // Optimize animation keyframes
      }}
      style={{ willChange: "transform" }} // Optimize rendering
    >
      {children}
    </motion.div>
  )
}
