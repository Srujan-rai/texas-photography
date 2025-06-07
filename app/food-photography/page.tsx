"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, X, Maximize2, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DynamicBackground } from "@/components/dynamic-background"
import { FadeIn, ScrollProgress } from "@/components/scroll-effects"
import { cn } from "@/lib/utils"

// Food photography categories
const categories = [
  { name: "All", count: 9 },
  { name: "Fine Dining", count: 3 },
  { name: "Desserts", count: 2 },
  { name: "Breakfast", count: 2 },
  { name: "Appetizers", count: 2 },
]

// Food photography images
const foodImages = [
  {
    id: 1,
    title: "Mango Parfait",
    category: "Desserts",
    description: "Layered mango parfait with fresh fruit and cream",
    image: "/images/food-dessert-mango.jpeg",
    featured: true,
  },
  {
    id: 2,
    title: "Tiramisu Under Glass",
    category: "Desserts",
    description: "Classic tiramisu with a modern presentation under glass dome",
    image: "/images/food-tiramisu-dome.jpeg",
    featured: true,
  },
  {
    id: 3,
    title: "Gourmet Quinoa Salad",
    category: "Fine Dining",
    description: "Artfully presented quinoa salad with gold accents",
    image: "/images/food-gourmet-salad.jpeg",
    featured: true,
  },
  {
    id: 4,
    title: "Tandoori Platter",
    category: "Fine Dining",
    description: "Spiced tandoori skewers with fresh greens and dipping sauce",
    image: "/images/food-tandoori-plate.jpeg",
    featured: false,
  },
  {
    id: 5,
    title: "English Breakfast",
    category: "Breakfast",
    description: "Traditional English breakfast with eggs, beans, and sausage",
    image: "/images/food-breakfast-plate.jpeg",
    featured: false,
  },
  {
    id: 6,
    title: "Eggs on Toast",
    category: "Breakfast",
    description: "Perfectly fried eggs on a bed of sautéed greens and toast",
    image: "/images/food-egg-toast.jpeg",
    featured: false,
  },
  {
    id: 7,
    title: "Spiced Appetizers",
    category: "Appetizers",
    description: "Delicate spiced appetizers with tomato relish",
    image: "/images/food-appetizers.jpeg",
    featured: false,
  },
  {
    id: 8,
    title: "Artisanal Pizza",
    category: "Fine Dining",
    description: "Wood-fired artisanal pizza with fresh herbs and mushrooms",
    image: "/images/food-pizza.jpeg",
    featured: true,
  },
  {
    id: 9,
    title: "Pumpkin Risotto",
    category: "Appetizers",
    description: "Creamy risotto with roasted pumpkin and fresh herbs",
    image: "/images/food-risotto.jpeg",
    featured: false,
  },
]

export default function FoodPhotographyPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredImages, setFilteredImages] = useState(foodImages)
  const [isLoaded, setIsLoaded] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const galleryRef = useRef<HTMLDivElement>(null)
  const lightboxImageRef = useRef<HTMLImageElement>(null)

  // Filter images based on selected category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredImages(foodImages)
    } else {
      setFilteredImages(foodImages.filter((image) => image.category === selectedCategory))
    }
  }, [selectedCategory])

  useEffect(() => {
    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 200)

    return () => clearTimeout(timer)
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
      if (e.key === "Escape") {
        setIsFullscreen(false)
        setLightboxOpen(false)
      }
      if (e.key === "f") toggleFullscreen()
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

  // Toggle fullscreen for the lightbox image
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

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
        <DynamicBackground intensity={0.3} quality="medium" />
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
              Food Photography
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-foreground/80">
              Capturing the art of culinary excellence through our cinematic lens, where every dish tells a story of
              flavor and passion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 sm:top-20 z-30 bg-background/80 backdrop-blur-lg border-b border-foreground/10">
        <div className="container px-3 sm:px-4 py-3 sm:py-4 md:py-6">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="xs"
                onClick={() => setSelectedCategory(category.name)}
                className={cn(
                  "rounded-full text-xs sm:text-sm",
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
        <DynamicBackground intensity={0.2} quality="low" />
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
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
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
            onClick={() => {
              setIsFullscreen(false)
              setLightboxOpen(false)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "relative overflow-hidden",
                isFullscreen ? "fixed inset-0 z-60" : "max-h-[90vh] max-w-[90vw]",
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                ref={lightboxImageRef}
                src={filteredImages[currentImageIndex].image || "/placeholder.svg"}
                alt={filteredImages[currentImageIndex].title}
                width={1600}
                height={1200}
                className={cn("object-contain", isFullscreen ? "h-screen w-screen" : "max-h-[90vh] max-w-[90vw]")}
                onClick={(e) => {
                  // Double click to toggle fullscreen
                  if (e.detail === 2) {
                    toggleFullscreen()
                  }
                  e.stopPropagation()
                }}
              />
              <button
                className="absolute top-4 right-4 rounded-full bg-background/20 p-2 text-foreground backdrop-blur-md transition-colors hover:bg-background/40"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFullscreen(false)
                  setLightboxOpen(false)
                }}
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
              <button
                className="absolute top-4 left-4 rounded-full bg-background/20 p-2 text-foreground backdrop-blur-md transition-colors hover:bg-background/40"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFullscreen()
                }}
              >
                <Maximize2 className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Food Photography Services */}
      <section className="relative py-16 sm:py-20 md:py-24">
        <DynamicBackground intensity={0.3} quality="low" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        <div className="container relative z-10 px-4">
          <FadeIn className="mb-10 sm:mb-16 text-center">
            <h2 className="mb-3 sm:mb-4 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight dramatic-text">
              Culinary Visual Storytelling
            </h2>
            <p className="mx-auto max-w-xs sm:max-w-md md:max-w-3xl text-base sm:text-lg text-muted-foreground">
              Elevate your culinary creations with our specialized food photography services
            </p>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Restaurant Menu Photography",
                description:
                  "Showcase your menu items with stunning visuals that entice customers and elevate your brand.",
                features: [
                  "Professional styling and composition",
                  "Custom lighting setup for each dish",
                  "High-resolution images for print and digital use",
                  "Same-day delivery options available",
                ],
              },
              {
                title: "Food Editorial & Advertising",
                description: "Create compelling visual narratives for magazines, cookbooks, and advertising campaigns.",
                features: [
                  "Creative concept development",
                  "Full prop and styling services",
                  "Post-production and retouching",
                  "Commercial usage rights",
                ],
              },
              {
                title: "Social Media Content",
                description: "Build a mouth-watering social media presence with regular, high-quality food content.",
                features: [
                  "Optimized for Instagram, TikTok, and other platforms",
                  "Consistent visual style and branding",
                  "Short-form video options",
                  "Content calendar planning",
                ],
              },
            ].map((service, index) => (
              <FadeIn key={index} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5 p-6 sm:p-8 backdrop-blur-sm transition-colors duration-300 hover:bg-foreground/10 shadow-lg cinematic-hover h-full flex flex-col"
                >
                  <h3 className="mb-2 sm:mb-4 font-serif text-xl font-bold">{service.title}</h3>
                  <p className="mb-4 sm:mb-6 text-sm sm:text-base text-muted-foreground">{service.description}</p>
                  <div className="mt-auto">
                    <h4 className="font-medium mb-2 text-sm">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-muted-foreground">
                          <span className="mr-2 text-foreground">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="relative py-16 sm:py-20 md:py-24">
        <DynamicBackground intensity={0.2} quality="low" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="container relative z-10 px-4">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
            <FadeIn direction="left">
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src="/images/food-tiramisu-dome.jpeg"
                  alt="Food photography approach"
                  width={800}
                  height={800}
                  className="h-full w-full object-cover cinematic-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <h2 className="mb-4 sm:mb-6 font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight dramatic-text">
                Our Culinary Photography Approach
              </h2>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p>
                  We approach food photography as a delicate art form that requires technical precision, creative
                  vision, and an understanding of culinary craftsmanship. Our process begins with understanding the
                  story behind each dish—its ingredients, preparation, and cultural significance.
                </p>
                <p>
                  Using cinematic lighting techniques and careful composition, we create images that not only showcase
                  the visual appeal of food but also evoke its aromas, textures, and flavors. We believe that
                  exceptional food photography should make viewers taste the dish with their eyes.
                </p>
                <p>
                  Whether working with fine dining establishments, food brands, or cookbook publishers, we bring the
                  same attention to detail and passion for visual storytelling to every project, creating images that
                  are as memorable as the culinary experiences they represent.
                </p>
                <div className="pt-4">
                  <Link href="/contact">
                    <Button className="group bg-foreground text-background hover:bg-foreground/90 cinematic-hover">
                      Discuss Your Project
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative py-16 sm:py-20 md:py-20">
        <DynamicBackground intensity={0.3} quality="low" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        <div className="container relative z-10 px-4 text-center">
          <FadeIn>
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-4 sm:mb-6 font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight dramatic-text">
                Ready to Showcase Your Culinary Creations?
              </h2>
              <p className="mb-8 sm:mb-10 text-base sm:text-lg text-muted-foreground">
                Let's collaborate to bring your food story to life through our cinematic lens.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 cinematic-hover">
                    Start a Project
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-foreground/30 bg-background/10 text-foreground backdrop-blur-md hover:bg-foreground/10 cinematic-hover"
                  >
                    View All Services
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
