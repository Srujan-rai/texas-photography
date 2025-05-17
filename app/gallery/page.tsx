"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DynamicBackground } from "@/components/dynamic-background"
import { FadeIn, ScrollProgress } from "@/components/scroll-effects"
import { cn } from "@/lib/utils"

// Gallery categories
const categories = [
  { name: "All", count: 24 },
  { name: "Wedding", count: 6 },
  { name: "Portrait", count: 5 },
  { name: "Landscape", count: 3 },
  { name: "Documentary", count: 4 },
  { name: "Couples", count: 3 },
  { name: "Fashion", count: 3 },
]

// Gallery images with real images
const galleryImages = [
  {
    id: 1,
    title: "Wedding Moments",
    category: "Wedding",
    description: "Capturing the joy and emotion of the special day",
    image: "/images/wedding-moment.png",
    featured: true,
  },
  {
    id: 2,
    title: "Bridal Portrait",
    category: "Wedding",
    description: "Elegant bridal portrait with natural light",
    image: "/images/bride-closeup.png",
    featured: false,
  },
  {
    id: 3,
    title: "Beach Couple",
    category: "Couples",
    description: "Romantic couple portrait at sunset on the beach",
    image: "/images/beach-couple.png",
    featured: true,
  },
  {
    id: 4,
    title: "Coastal Landscape",
    category: "Landscape",
    description: "Breathtaking coastal view at golden hour",
    image: "/images/mattu-beach.png",
    featured: true,
  },
  {
    id: 5,
    title: "Cultural Ceremony",
    category: "Documentary",
    description: "Traditional cultural ceremony documentation",
    image: "/images/haldi-ceremony.png",
    featured: false,
  },
  {
    id: 6,
    title: "Fashion Portrait",
    category: "Fashion",
    description: "Stylish portrait with umbrella",
    image: "/images/umbrella-portrait.png",
    featured: true,
  },
  {
    id: 7,
    title: "Urban Portrait",
    category: "Portrait",
    description: "Dramatic portrait in urban setting",
    image: "/images/kaif-portrait.png",
    featured: false,
  },
  {
    id: 8,
    title: "Colorful Portrait",
    category: "Portrait",
    description: "Vibrant portrait with yellow background",
    image: "/images/yellow-portrait.png",
    featured: false,
  },
  {
    id: 9,
    title: "Wedding Dress",
    category: "Wedding",
    description: "Elegant white wedding dress portrait",
    image: "/images/white-dress.png",
    featured: true,
  },
  {
    id: 10,
    title: "Behind the Camera",
    category: "Documentary",
    description: "The art of cinematography in action",
    image: "/images/camera-hands.png",
    featured: false,
  },
  {
    id: 11,
    title: "Beach Wedding",
    category: "Wedding",
    description: "Romantic beach wedding ceremony",
    image: "/images/beach-couple.png",
    featured: false,
  },
  {
    id: 12,
    title: "Traditional Celebration",
    category: "Documentary",
    description: "Documenting cultural traditions and celebrations",
    image: "/images/haldi-ceremony.png",
    featured: false,
  },
  {
    id: 13,
    title: "Sunset Portrait",
    category: "Portrait",
    description: "Golden hour portrait with natural light",
    image: "/images/yellow-portrait.png",
    featured: false,
  },
  {
    id: 14,
    title: "Fashion Editorial",
    category: "Fashion",
    description: "High-end fashion editorial photography",
    image: "/images/umbrella-portrait.png",
    featured: false,
  },
  {
    id: 15,
    title: "Texas Landscape",
    category: "Landscape",
    description: "Stunning Texas landscape at dusk",
    image: "/images/mattu-beach.png",
    featured: false,
  },
  {
    id: 16,
    title: "Engagement Session",
    category: "Couples",
    description: "Romantic engagement photography session",
    image: "/images/beach-couple.png",
    featured: false,
  },
  {
    id: 17,
    title: "Wedding Details",
    category: "Wedding",
    description: "Capturing the beautiful details of the wedding day",
    image: "/images/bride-closeup.png",
    featured: false,
  },
  {
    id: 18,
    title: "Cinematic Portrait",
    category: "Portrait",
    description: "Dramatic portrait with cinematic lighting",
    image: "/images/kaif-portrait.png",
    featured: true,
  },
  {
    id: 19,
    title: "Coastal Sunset",
    category: "Landscape",
    description: "Beautiful coastal sunset landscape",
    image: "/images/mattu-beach.png",
    featured: false,
  },
  {
    id: 20,
    title: "Love Story",
    category: "Couples",
    description: "Telling love stories through the lens",
    image: "/images/beach-couple.png",
    featured: false,
  },
  {
    id: 21,
    title: "Fashion Story",
    category: "Fashion",
    description: "Visual storytelling through fashion",
    image: "/images/umbrella-portrait.png",
    featured: false,
  },
  {
    id: 22,
    title: "Documentary Series",
    category: "Documentary",
    description: "Part of an ongoing documentary series",
    image: "/images/camera-hands.png",
    featured: false,
  },
  {
    id: 23,
    title: "Wedding Ceremony",
    category: "Wedding",
    description: "Beautiful moments from the wedding ceremony",
    image: "/images/wedding-moment.png",
    featured: false,
  },
  {
    id: 24,
    title: "Portrait Session",
    category: "Portrait",
    description: "Professional portrait photography session",
    image: "/images/yellow-portrait.png",
    featured: false,
  },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredImages, setFilteredImages] = useState(galleryImages)
  const [isLoaded, setIsLoaded] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)

  // Filter images based on selected category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredImages(galleryImages)
    } else {
      setFilteredImages(galleryImages.filter((image) => image.category === selectedCategory))
    }
  }, [selectedCategory])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Lightbox navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1))
  }

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return

      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "Escape") setLightboxOpen(false)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, filteredImages.length])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [lightboxOpen])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <div
      className={cn(
        "flex min-h-screen w-full flex-col transition-opacity duration-1000",
        isLoaded ? "opacity-100" : "opacity-0",
      )}
    >
      {/* Scroll Progress Indicator */}
      <ScrollProgress color="linear-gradient(to right, #8B5CF6, #EC4899, #EF4444)" />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <DynamicBackground intensity={0.3} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
        <div className="container relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Link
              href="/"
              className="mb-6 inline-flex items-center text-sm font-medium text-foreground/70 hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="mb-4 font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight dramatic-text">
              Visual Gallery
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-foreground/80">
              Explore our complete collection of cinematic imagery, each frame telling a unique story through the lens
              of Texas Cinematography.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-30 bg-background/80 backdrop-blur-lg border-b border-foreground/10">
        <div className="container px-4 py-4 md:py-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className={cn(
                  "rounded-full",
                  selectedCategory === category.name
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "border-foreground/20 bg-background/20 text-foreground hover:bg-foreground/10",
                )}
              >
                {category.name} {category.name !== "All" && <span className="ml-1">({category.count})</span>}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section ref={galleryRef} className="relative py-12 sm:py-16 md:py-20">
        <DynamicBackground intensity={0.2} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="container relative z-10 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredImages.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                >
                  {filteredImages.map((image, index) => (
                    <motion.div
                      key={image.id}
                      variants={itemVariants}
                      className="group relative overflow-hidden rounded-xl shadow-xl shadow-foreground/5 cinematic-hover"
                      onClick={() => {
                        setCurrentImageIndex(index)
                        setLightboxOpen(true)
                      }}
                    >
                      <div className="aspect-square w-full overflow-hidden cursor-pointer">
                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/90 via-background/30 to-transparent transition-opacity group-hover:opacity-70" />
                        <Image
                          src={image.image || "/placeholder.svg"}
                          alt={image.title}
                          width={800}
                          height={800}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 cinematic-image"
                        />
                        {image.featured && (
                          <div className="absolute top-4 right-4 z-20">
                            <span className="inline-block rounded-full bg-foreground/20 px-3 py-1 text-xs font-medium backdrop-blur-md">
                              Featured
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                          <h3 className="mb-1 font-serif text-lg sm:text-xl font-bold">{image.title}</h3>
                          <p className="text-xs sm:text-sm text-foreground/80">{image.description}</p>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
                          <div className="rounded-full bg-foreground/20 p-3 backdrop-blur-md">
                            <Maximize2 className="h-6 w-6 text-foreground" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <h3 className="mb-2 text-xl font-bold">No images found</h3>
                  <p className="mb-6 text-muted-foreground">Try selecting a different category</p>
                  <Button onClick={() => setSelectedCategory("All")}>View All Images</Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[90vh] max-w-[90vw] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[currentImageIndex].image || "/placeholder.svg"}
                alt={filteredImages[currentImageIndex].title}
                width={1600}
                height={1200}
                className="max-h-[90vh] w-auto object-contain"
              />
              <button
                className="absolute top-4 right-4 rounded-full bg-background/20 p-2 text-foreground backdrop-blur-md transition-colors hover:bg-background/40"
                onClick={() => setLightboxOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="rounded-full bg-background/20 px-4 py-2 backdrop-blur-md">
                  <p className="text-sm font-medium">
                    {filteredImages[currentImageIndex].title} - {currentImageIndex + 1} of {filteredImages.length}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact CTA */}
      <section className="relative py-16 sm:py-20 md:py-24">
        <DynamicBackground intensity={0.3} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        <div className="container relative z-10 px-4 text-center">
          <FadeIn>
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-4 sm:mb-6 font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight dramatic-text">
                Ready to Create Your Visual Story?
              </h2>
              <p className="mb-8 sm:mb-10 text-base sm:text-lg text-muted-foreground">
                Let's collaborate to bring your vision to life through the cinematic lens of Texas Cinematography.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 cinematic-hover">
                    Start a Project
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-foreground/30 bg-background/10 text-foreground backdrop-blur-md hover:bg-foreground/10 cinematic-hover"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
