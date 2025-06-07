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

// Gallery categories - UPDATED
const categories = [
  { name: "All", count: 30 }, // Updated: 24 + 6 new images
  { name: "Wedding", count: 6 },
  { name: "Portrait", count: 5 },
  { name: "Landscape", count: 3 },
  { name: "Documentary", count: 4 },
  { name: "Couples", count: 3 },
  { name: "Fashion", count: 3 },
  { name: "Pre-wedding", count: 2 },    // New
  { name: "Street Portraits", count: 2 }, // New
  { name: "Engagements", count: 2 },     // New
];

// Gallery images - UPDATED with new images at the end
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
    image: "/images/beach-couple.png", // Note: duplicate image path, ensure unique content
    featured: false,
  },
  {
    id: 12,
    title: "Traditional Celebration",
    category: "Documentary",
    description: "Documenting cultural traditions and celebrations",
    image: "/images/haldi-ceremony.png", // Note: duplicate image path
    featured: false,
  },
  {
    id: 13,
    title: "Sunset Portrait",
    category: "Portrait",
    description: "Golden hour portrait with natural light",
    image: "/images/yellow-portrait.png", // Note: duplicate image path
    featured: false,
  },
  {
    id: 14,
    title: "Fashion Editorial",
    category: "Fashion",
    description: "High-end fashion editorial photography",
    image: "/images/umbrella-portrait.png", // Note: duplicate image path
    featured: false,
  },
  {
    id: 15,
    title: "Texas Landscape",
    category: "Landscape",
    description: "Stunning Texas landscape at dusk",
    image: "/images/mattu-beach.png", // Note: duplicate image path
    featured: false,
  },
  {
    id: 16,
    title: "Engagement Session Photo", // Clarified title for gallery context
    category: "Couples",
    description: "Romantic engagement photography session image",
    image: "/images/beach-couple.png", // Note: duplicate image path
    featured: false,
  },
  {
    id: 17,
    title: "Wedding Details",
    category: "Wedding",
    description: "Capturing the beautiful details of the wedding day",
    image: "/images/bride-closeup.png", // Note: duplicate image path
    featured: false,
  },
  {
    id: 18,
    title: "Cinematic Portrait",
    category: "Portrait",
    description: "Dramatic portrait with cinematic lighting",
    image: "/images/kaif-portrait.png", // Note: duplicate image path
    featured: true,
  },
  {
    id: 19,
    title: "Coastal Sunset",
    category: "Landscape",
    description: "Beautiful coastal sunset landscape",
    image: "/images/mattu-beach.png", // Note: duplicate image path
    featured: false,
  },
  {
    id: 20,
    title: "Love Story Frame", // Clarified title for gallery context
    category: "Couples",
    description: "A single frame telling a love story",
    image: "/images/beach-couple.png", // Note: duplicate image path
    featured: false,
  },
  {
    id: 21,
    title: "Fashion Story Image", // Clarified title for gallery context
    category: "Fashion",
    description: "A key visual from a fashion story",
    image: "/images/umbrella-portrait.png", // Note: duplicate image path
    featured: false,
  },
  {
    id: 22,
    title: "Documentary Still", // Clarified title for gallery context
    category: "Documentary",
    description: "A still image from an ongoing documentary series",
    image: "/images/camera-hands.png", // Note: duplicate image path
    featured: false,
  },
  {
    id: 23,
    title: "Wedding Ceremony Shot", // Clarified title for gallery context
    category: "Wedding",
    description: "Beautiful moment captured from the wedding ceremony",
    image: "/images/wedding-moment.png", // Note: duplicate image path
    featured: false,
  },
  {
    id: 24,
    title: "Portrait Session Image", // Clarified title for gallery context
    category: "Portrait",
    description: "A highlight from a professional portrait photography session",
    image: "/images/yellow-portrait.png", // Note: duplicate image path
    featured: false,
  },
  // --- NEW IMAGES START HERE ---
  {
    id: 25,
    title: "Joyful Anticipation",
    category: "Pre-wedding",
    description: "Couple sharing a laugh during their pre-wedding shoot in a scenic park.",
    image: "/images/prewedding-park-laugh.png",
    featured: true,
  },
  {
    id: 26,
    title: "Sunset Embrace",
    category: "Pre-wedding",
    description: "Romantic silhouette of a couple against a vibrant pre-wedding sunset.",
    image: "/images/prewedding-sunset-silhouette-new.png",
    featured: false,
  },
  {
    id: 27,
    title: "Urban Musician",
    category: "Street Portraits",
    description: "Capturing the soulful performance of a musician on the city streets.",
    image: "/images/street-musician-portrait.png",
    featured: true,
  },
  {
    id: 28,
    title: "Graffiti Backdrop Portrait",
    category: "Street Portraits",
    description: "A candid street portrait with colorful graffiti art in the background.",
    image: "/images/street-portrait-graffiti.png",
    featured: false,
  },
  {
    id: 29,
    title: "The 'Yes!' Moment",
    category: "Engagements",
    description: "The raw emotion of a surprise marriage proposal captured.",
    image: "/images/engagement-proposal-reaction.png",
    featured: true,
  },
  {
    id: 30,
    title: "Engagement Ring Detail",
    category: "Engagements",
    description: "Close-up artistic shot of the engagement ring.",
    image: "/images/engagement-ring-detail-shot.png",
    featured: false,
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredImages, setFilteredImages] = useState(galleryImages)
  const [isLoaded, setIsLoaded] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const galleryRef = useRef<HTMLDivElement>(null)
  const lightboxImageRef = useRef<HTMLImageElement>(null)

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
    // Use a callback with setCurrentImageIndex to ensure we're working with the latest filteredImages if it could change
    setCurrentImageIndex((prevIndex) => {
      // Need to ensure we're referencing the correct length for the currently filtered images
      const currentFiltered = selectedCategory === "All" ? galleryImages : galleryImages.filter(img => img.category === selectedCategory);
      return prevIndex === currentFiltered.length - 1 ? 0 : prevIndex + 1;
    });
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const currentFiltered = selectedCategory === "All" ? galleryImages : galleryImages.filter(img => img.category === selectedCategory);
      return prevIndex === 0 ? currentFiltered.length - 1 : prevIndex - 1;
    });
  };

  const openLightbox = (index: number) => {
    // The index received is based on the currently filteredImages array used in the map function
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };


  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return

      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "Escape") {
        setIsFullscreen(false) // Exit fullscreen first if active
        setLightboxOpen(false)
      }
      if (e.key === "f" && lightboxImageRef.current) toggleFullscreen() // Check ref
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  // IMPORTANT: Add dependencies for functions called inside (nextImage, prevImage, toggleFullscreen)
  // if they are not stable (e.g., rely on state/props not listed).
  // For simplicity here, assuming they are stable or their own dependencies are handled.
  // filteredImages.length should be tracked if next/prev logic depends on its current state.
  }, [lightboxOpen]); // Add more deps if needed, e.g., currentImageIndex, filteredImages.length if next/prev are not memoized

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
    if (!lightboxImageRef.current) return;

    if (!document.fullscreenElement && !isFullscreen) {
        lightboxImageRef.current.requestFullscreen().then(() => {
            setIsFullscreen(true);
        }).catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            setIsFullscreen(false); // Ensure state is correct if request fails
        });
    } else if (document.fullscreenElement && isFullscreen) {
        document.exitFullscreen().then(() => {
            setIsFullscreen(false);
        }).catch(err => {
            console.error(`Error attempting to disable full-screen mode: ${err.message} (${err.name})`);
            // setIsFullscreen(true); // State might be out of sync
        });
    } else {
      // Fallback for browsers not supporting API perfectly or state is misaligned
      setIsFullscreen(!isFullscreen);
    }
  };
  
  useEffect(() => {
    const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);


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
  
  const currentLightboxImage = filteredImages[currentImageIndex];

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
              of Dheeran cinematics.
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
      <section ref={galleryRef} className="relative py-8 sm:py-12 md:py-16 lg:py-20">
        <DynamicBackground intensity={0.2} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="container relative z-10 px-3 sm:px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory} // Ensures re-render on category change for animations
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
                  className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-6"
                >
                  {filteredImages.map((image, index) => (
                    <motion.div
                      key={image.id + "-" + index} // More robust key if IDs could repeat across filters (though unlikely here)
                      variants={itemVariants}
                      className="group relative overflow-hidden rounded-lg sm:rounded-xl shadow-xl shadow-foreground/5 cinematic-hover"
                      onClick={() => openLightbox(index)}
                    >
                      <div className="aspect-square w-full overflow-hidden cursor-pointer">
                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/90 via-background/30 to-transparent transition-opacity group-hover:opacity-70" />
                        <Image
                          src={image.image || "/placeholder.svg"}
                          alt={image.title}
                          width={800}
                          height={800}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 cinematic-image"
                          priority={index < 8} // Prioritize loading images visible above the fold
                        />
                        {image.featured && (
                          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20">
                            <span className="inline-block rounded-full bg-foreground/20 px-2 py-0.5 sm:px-3 sm:py-1 text-xs font-medium backdrop-blur-md">
                              Featured
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 z-20 p-2 sm:p-4">
                          <h3 className="mb-0.5 sm:mb-1 font-serif text-base sm:text-lg md:text-xl font-bold line-clamp-1">
                            {image.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-foreground/80 line-clamp-1 sm:line-clamp-2">
                            {image.description}
                          </p>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
                          <div className="rounded-full bg-foreground/20 p-2 sm:p-3 backdrop-blur-md">
                            <Maximize2 className="h-4 w-4 sm:h-6 sm:w-6 text-foreground" />
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
        {lightboxOpen && currentLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md" // Increased z-index
            onClick={() => {
              if (isFullscreen && document.fullscreenElement) {
                document.exitFullscreen().catch(err => console.error(err));
              }
              setIsFullscreen(false);
              setLightboxOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "relative overflow-hidden rounded-lg shadow-2xl", // Added rounded-lg and shadow
                isFullscreen ? "fixed inset-0 z-[110]" : "max-h-[90vh] max-w-[90vw]",
              )}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image/controls
            >
              <Image
                ref={lightboxImageRef}
                src={currentLightboxImage.image || "/placeholder.svg"}
                alt={currentLightboxImage.title}
                width={isFullscreen ? window.innerWidth : 1600} // Adjust width for fullscreen
                height={isFullscreen ? window.innerHeight : 1200} // Adjust height for fullscreen
                className={cn(
                    "object-contain transition-all duration-300 ease-in-out",
                    isFullscreen ? "h-screen w-screen" : "max-h-[90vh] max-w-[90vw]"
                )}
                onClick={(e) => {
                  if (e.detail === 2) { // Double click
                    toggleFullscreen();
                  }
                  e.stopPropagation();
                }}
                priority // Prioritize loading lightbox image
              />
              <button
                title="Close (Esc)"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/60 z-[120]"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isFullscreen && document.fullscreenElement) {
                     document.exitFullscreen().catch(err => console.error(err));
                  }
                  setIsFullscreen(false);
                  setLightboxOpen(false);
                }}
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:bottom-4 rounded-full bg-black/40 px-3 py-1.5 sm:px-4 sm:py-2 text-white backdrop-blur-sm z-[120]">
                <p className="text-xs sm:text-sm font-medium">
                  {currentLightboxImage.title} - {currentImageIndex + 1} of {filteredImages.length}
                </p>
              </div>
              <button
                title="Previous (Left Arrow)"
                className="absolute left-3 top-1/2 -translate-y-1/2 sm:left-4 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/60 z-[120]"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                title="Next (Right Arrow)"
                className="absolute right-3 top-1/2 -translate-y-1/2 sm:right-4 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/60 z-[120]"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                title="Toggle Fullscreen (F)"
                className="absolute top-3 left-3 sm:top-4 sm:left-4 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/60 z-[120]"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
              >
                <Maximize2 className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact CTA */}
      <section className="relative py-16 sm:py-20 md:py-20">
        <DynamicBackground intensity={0.3} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        <div className="container relative z-10 px-4 text-center">
          <FadeIn>
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-4 sm:mb-6 font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight dramatic-text">
                Ready to Create Your Visual Story?
              </h2>
              <p className="mb-8 sm:mb-10 text-base sm:text-lg text-muted-foreground">
                Let's collaborate to bring your vision to life through the cinematic lens of Dheeran cinematics.
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