"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface LightboxImage {
  src: string
  alt: string
  title?: string
  description?: string
}

interface LightboxProps {
  images: LightboxImage[]
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
}

export function Lightbox({ images, isOpen, onClose, initialIndex = 0 }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const lightboxImageRef = useRef<HTMLImageElement>(null)

  // Reset current index when images change
  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex, images])

  // Navigation functions
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "Escape") {
        setIsFullscreen(false)
        onClose()
      }
      if (e.key === "f") toggleFullscreen()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, images.length, onClose])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Handle actual fullscreen API
  const requestFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error(`Error attempting to exit full-screen mode: ${err.message}`)
      })
    } else {
      const lightboxElement = lightboxImageRef.current
      if (lightboxElement) {
        if (lightboxElement.requestFullscreen) {
          lightboxElement.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`)
          })
        }
      }
    }
  }

  if (!isOpen || images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
        onClick={() => {
          setIsFullscreen(false)
          onClose()
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn("relative overflow-hidden", isFullscreen ? "fixed inset-0 z-60" : "max-h-[90vh] max-w-[90vw]")}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            ref={lightboxImageRef}
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.alt}
            width={1600}
            height={1200}
            className={cn("object-contain", isFullscreen ? "h-screen w-screen" : "max-h-[90vh] max-w-[90vw]")}
            onClick={(e) => {
              // Double click to toggle fullscreen
              if (e.detail === 2) {
                toggleFullscreen()
                requestFullscreen()
              }
              e.stopPropagation()
            }}
          />
          <button
            className="absolute top-4 right-4 rounded-full bg-background/20 p-2 text-foreground backdrop-blur-md transition-colors hover:bg-background/40"
            onClick={(e) => {
              e.stopPropagation()
              setIsFullscreen(false)
              onClose()
            }}
          >
            <X className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="rounded-full bg-background/20 px-4 py-2 backdrop-blur-md">
              <p className="text-sm font-medium">
                {currentImage.title || currentImage.alt} - {currentIndex + 1} of {images.length}
              </p>
            </div>
          </div>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/20 p-2 text-foreground backdrop-blur-md transition-colors hover:bg-background/40"
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/20 p-2 text-foreground backdrop-blur-md transition-colors hover:bg-background/40"
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <button
            className="absolute top-4 left-4 rounded-full bg-background/20 p-2 text-foreground backdrop-blur-md transition-colors hover:bg-background/40"
            onClick={(e) => {
              e.stopPropagation()
              toggleFullscreen()
              requestFullscreen()
            }}
          >
            <Maximize2 className="h-6 w-6" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
