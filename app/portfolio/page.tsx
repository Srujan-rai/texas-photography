"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DynamicBackground } from "@/components/dynamic-background"
import { FadeIn, ParallaxSection, TextReveal } from "@/components/scroll-effects"
import { cn } from "@/lib/utils"

// Project data with real images
const allProjects = [
  {
    id: 1,
    title: "Wedding Stories",
    category: "Wedding",
    description: "Capturing the most beautiful moments of your special day",
    image: "/images/wedding-moment.png",
    featured: true,
  },
  {
    id: 2,
    title: "Portrait Sessions",
    category: "Portrait",
    description: "Professional portraits that reveal your authentic self",
    image: "/images/white-dress.png",
    featured: true,
  },
  {
    id: 3,
    title: "Coastal Dreams",
    category: "Landscape",
    description: "Breathtaking views of coastal landscapes",
    image: "/images/mattu-beach.png",
    featured: true,
  },
  {
    id: 4,
    title: "Cultural Ceremonies",
    category: "Documentary",
    description: "Authentic documentation of cultural traditions and ceremonies",
    image: "/images/haldi-ceremony.png",
    featured: true,
  },
  {
    id: 5,
    title: "Engagement Sessions",
    category: "Couples",
    description: "Romantic moments between couples in beautiful settings",
    image: "/images/beach-couple.png",
    featured: true,
  },
  {
    id: 6,
    title: "Fashion Photography",
    category: "Fashion",
    description: "Stylish portraits that showcase personality and fashion",
    image: "/images/umbrella-portrait.png",
    featured: true,
  },
  {
    id: 7,
    title: "Urban Exploration",
    category: "Urban",
    description: "Discovering the hidden beauty in city landscapes",
    image: "/images/kaif-portrait.png",
    featured: false,
  },
  {
    id: 8,
    title: "Bridal Elegance",
    category: "Wedding",
    description: "Elegant portraits capturing the bride's special moments",
    image: "/images/bride-closeup.png",
    featured: false,
  },
  {
    id: 9,
    title: "Sunset Romance",
    category: "Couples",
    description: "Romantic couples photography in golden hour light",
    image: "/images/beach-couple.png",
    featured: false,
  },
  {
    id: 10,
    title: "Traditional Celebrations",
    category: "Documentary",
    description: "Documenting the rich traditions of cultural ceremonies",
    image: "/images/haldi-ceremony.png",
    featured: false,
  },
  {
    id: 11,
    title: "Cinematic Portraits",
    category: "Portrait",
    description: "Dramatic portraits with cinematic lighting and composition",
    image: "/images/yellow-portrait.png",
    featured: false,
  },
  {
    id: 12,
    title: "Behind the Lens",
    category: "Documentary",
    description: "The art and craft of cinematography",
    image: "/images/camera-hands.png",
    featured: false,
  },
]

// All available categories
const categories = ["All", "Wedding", "Portrait", "Landscape", "Documentary", "Couples", "Fashion", "Urban"]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(allProjects)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  // Filter projects based on category and search query
  useEffect(() => {
    let filtered = allProjects

    if (selectedCategory !== "All") {
      filtered = filtered.filter((project) => project.category === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.category.toLowerCase().includes(query),
      )
    }

    setFilteredProjects(filtered)
  }, [selectedCategory, searchQuery])

  useEffect(() => {
    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
            onError={(error) => console.error("Animation error:", error)}
          >
            <Link
              href="/"
              className="mb-6 inline-flex items-center text-sm font-medium text-foreground/70 hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="mb-4 font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight dramatic-text">
              Our Visual Portfolio
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-foreground/80">
              Explore our complete collection of cinematic projects, each telling a unique story through the lens of
              Texas Cinematography.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="sticky top-20 z-30 bg-background/80 backdrop-blur-lg border-b border-foreground/10">
        <div className="container px-4 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "rounded-full",
                    selectedCategory === category
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "border-foreground/20 bg-background/20 text-foreground hover:bg-foreground/10",
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-[200px] rounded-full border border-foreground/10 bg-foreground/5 py-2 pl-10 pr-4 text-sm text-foreground placeholder-foreground/50 backdrop-blur-sm transition-colors focus:border-foreground/20 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <DynamicBackground intensity={0.2} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="container relative z-10 px-4">
          {filteredProjects.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
              onError={(error) => console.error("Animation error:", error)}
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="group relative overflow-hidden rounded-xl shadow-xl shadow-foreground/5 cinematic-hover"
                  onError={(error) => console.error("Animation error:", error)}
                >
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/90 via-background/30 to-transparent transition-opacity group-hover:opacity-70" />
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={1600}
                      height={900}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 cinematic-image"
                    />
                    {project.featured && (
                      <div className="absolute top-4 right-4 z-20">
                        <span className="inline-block rounded-full bg-foreground/20 px-3 py-1 text-xs font-medium backdrop-blur-md">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6">
                    <span className="mb-1 sm:mb-2 inline-block rounded-full bg-foreground/20 px-2 py-1 text-xs font-medium backdrop-blur-sm">
                      {project.category}
                    </span>
                    <h3 className="mb-1 sm:mb-2 font-serif text-xl sm:text-2xl font-bold">{project.title}</h3>
                    <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-foreground/80">{project.description}</p>
                    <div
                      className={cn(
                        "transform transition-all duration-300",
                        hoveredProject === project.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                      )}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-foreground text-foreground hover:bg-foreground/10"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Filter className="mb-4 h-12 w-12 text-foreground/30" />
              <h3 className="mb-2 text-xl font-bold">No projects found</h3>
              <p className="mb-6 text-muted-foreground">Try adjusting your filters or search query</p>
              <Button
                onClick={() => {
                  setSelectedCategory("All")
                  setSearchQuery("")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Project Highlight */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        <DynamicBackground intensity={0.4} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        <div className="container relative z-10 px-4">
          <FadeIn className="mb-10 sm:mb-16 text-center">
            <TextReveal
              text="Featured Project"
              className="mb-3 sm:mb-4 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight dramatic-text"
            />
            <p className="mx-auto max-w-xs sm:max-w-md md:max-w-3xl text-base sm:text-lg text-muted-foreground">
              An in-depth look at one of our most celebrated visual stories
            </p>
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
            <ParallaxSection speed={0.2} direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src="/images/mattu-beach.png"
                  alt="Featured project"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover cinematic-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>
            </ParallaxSection>

            <ParallaxSection speed={0.3} direction="right">
              <h3 className="mb-2 font-serif text-2xl sm:text-3xl font-bold tracking-tight dramatic-text">
                Coastal Dreams: The Texas Shoreline
              </h3>
              <p className="mb-4 text-sm text-foreground/70">Documentary Series • 2023</p>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p>
                  This documentary series explores the diverse and breathtaking coastline of Texas, from the bustling
                  shores of Galveston to the serene natural beauty of South Padre Island.
                </p>
                <p>
                  Through a combination of aerial cinematography, intimate portraits, and landscape photography, we
                  captured the relationship between Texans and their 367 miles of Gulf coastline.
                </p>
                <p>
                  The project spanned over six months, documenting the changing seasons and the communities whose lives
                  are intertwined with the rhythms of the sea.
                </p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <Button className="group bg-foreground text-background hover:bg-foreground/90 cinematic-hover">
                    View Full Project
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button variant="outline" className="border-foreground/30 text-foreground hover:bg-foreground/10">
                    Behind the Scenes
                  </Button>
                </div>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>

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
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 cinematic-hover">
                  Start a Project
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-foreground/30 bg-background/10 text-foreground backdrop-blur-md hover:bg-foreground/10 cinematic-hover"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
