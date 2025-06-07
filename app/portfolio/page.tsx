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

// Project data
// NOTE: For full functionality with a detail page (ProjectPage.tsx), 
// ensure all projects (IDs 1-16 as well) have comprehensive fields like 
// location, date, equipment, detailedDescription, and gallery.
const allProjects = [
  {
    id: 1,
    title: "Wedding Stories",
    category: "Wedding",
    description: "Capturing the most beautiful moments of your special day",
    image: "/images/wedding-moment.png",
    featured: true,
    // TODO: Add detailed fields: location, date, equipment, detailedDescription, gallery
  },
  {
    id: 2,
    title: "Portrait Sessions",
    category: "Portrait",
    description: "Professional portraits that reveal your authentic self",
    image: "/images/white-dress.png",
    featured: true,
    // TODO: Add detailed fields
  },
  {
    id: 3,
    title: "Coastal Dreams",
    category: "Landscape",
    description: "Breathtaking views of coastal landscapes",
    image: "/images/mattu-beach.png",
    featured: true,
    // TODO: Add detailed fields
  },
  {
    id: 4,
    title: "Cultural Ceremonies",
    category: "Documentary",
    description: "Authentic documentation of cultural traditions and ceremonies",
    image: "/images/haldi-ceremony.png",
    featured: true,
    // TODO: Add detailed fields
  },
  {
    id: 5,
    title: "Engagement Sessions",
    category: "Couples",
    description: "Romantic moments between couples in beautiful settings",
    image: "/images/beach-couple.png",
    featured: true,
    // TODO: Add detailed fields
  },
  {
    id: 6,
    title: "Fashion Photography",
    category: "Fashion",
    description: "Stylish portraits that showcase personality and fashion",
    image: "/images/umbrella-portrait.png",
    featured: true,
    // TODO: Add detailed fields
  },
  {
    id: 7,
    title: "Urban Exploration",
    category: "Urban",
    description: "Discovering the hidden beauty in city landscapes",
    image: "/images/kaif-portrait.png",
    featured: false,
    // TODO: Add detailed fields
  },
  {
    id: 8,
    title: "Bridal Elegance",
    category: "Wedding",
    description: "Elegant portraits capturing the bride's special moments",
    image: "/images/bride-closeup.png",
    featured: false,
    // TODO: Add detailed fields
  },
  {
    id: 9,
    title: "Sunset Romance",
    category: "Couples",
    description: "Romantic couples photography in golden hour light",
    image: "/images/beach-couple.png",
    featured: false,
    // TODO: Add detailed fields
  },
  {
    id: 10,
    title: "Traditional Celebrations",
    category: "Documentary",
    description: "Documenting the rich traditions of cultural ceremonies",
    image: "/images/haldi-ceremony.png",
    featured: false,
    // TODO: Add detailed fields
  },
  {
    id: 11,
    title: "Cinematic Portraits",
    category: "Portrait",
    description: "Dramatic portraits with cinematic lighting and composition",
    image: "/images/yellow-portrait.png",
    featured: false,
    // TODO: Add detailed fields
  },
  {
    id: 12,
    title: "Behind the Lens",
    category: "Documentary",
    description: "The art and craft of cinematography",
    image: "/images/camera-hands.png",
    featured: false,
    // TODO: Add detailed fields
  },
  {
    id: 13,
    title: "Culinary Elegance",
    category: "Food",
    description: "Capturing the artistry of fine dining presentations",
    image: "/images/food-gourmet-salad.jpeg",
    featured: true,
    // TODO: Add detailed fields like location, date, equipment, detailedDescription, gallery
  },
  {
    id: 14,
    title: "Sweet Indulgence",
    category: "Food",
    description: "Showcasing desserts in their most tempting form",
    image: "/images/food-dessert-mango.jpeg",
    featured: true,
    // TODO: Add detailed fields
  },
  {
    id: 15,
    title: "Artisanal Pizza",
    category: "Food",
    description: "Highlighting the craftsmanship of wood-fired pizza",
    image: "/images/food-pizza.jpeg",
    featured: false,
    // TODO: Add detailed fields
  },
  {
    id: 16,
    title: "Breakfast Delights",
    category: "Food",
    description: "Morning meals presented with cinematic flair",
    image: "/images/food-breakfast-plate.jpeg",
    featured: false,
    // TODO: Add detailed fields
  },
  // --- NEW PROJECTS (Pre-wedding, Street Portraits, Engagements) START HERE ---
  {
    id: 17,
    title: "Love's Prelude",
    category: "Pre-wedding",
    description: "Capturing the joyful anticipation before the big day.",
    image: "/images/prewedding-romantic-pose.png",
    featured: true,
    location: "Hill Country, Texas",
    date: "October 2025",
    equipment: "Nikon Z7, 50mm f1.8, 85mm f1.8",
    detailedDescription:
      "Our pre-wedding sessions are designed to tell your unique love story in a relaxed and fun atmosphere. We explore beautiful locations that reflect your personality as a couple, creating timeless images filled with genuine emotion and connection. These photos serve as beautiful memories and can be used for save-the-dates, wedding websites, or displayed at your wedding.",
    gallery: [
      { src: "/images/prewedding-couple-laughing.png", alt: "Couple laughing in a field", title: "Joyful Moments" },
      { src: "/images/prewedding-sunset-silhouette.png", alt: "Couple silhouette at sunset", title: "Golden Hour Love" },
      { src: "/images/prewedding-urban-explore.png", alt: "Couple exploring urban setting", title: "City Adventures" },
    ],
  },
  {
    id: 18,
    title: "Urban Narratives",
    category: "Street Portraits",
    description: "Candid and styled portraits capturing the soul of the streets.",
    image: "/images/street-portrait-artist.png",
    featured: true,
    location: "Downtown Austin, Texas",
    date: "November 2025",
    equipment: "Fujifilm X-T4, 35mm f1.4, Leica Q2",
    detailedDescription:
      "This collection of street portraits seeks to find the extraordinary in the ordinary. We connect with individuals in their urban environments, capturing authentic expressions and stories. Using natural light and the vibrant backdrop of the city, these portraits highlight the diverse personalities and hidden narratives that make our streets come alive.",
    gallery: [
      { src: "/images/street-portrait-musician.png", alt: "Street musician playing guitar", title: "Melody of the Street" },
      { src: "/images/street-portrait-elderly-man.png", alt: "Close-up of an elderly man with character", title: "Stories in Wrinkles" },
      { src: "/images/street-portrait-fashionable-youth.png", alt: "Young person in trendy attire on a vibrant street", title: "Urban Edge" },
    ],
  },
  {
    id: 19,
    title: "The Proposal Journey",
    category: "Engagements",
    description: "Documenting the surprise, joy, and romance of proposals.",
    image: "/images/engagement-proposal-moment.png",
    featured: true,
    location: "Zilker Park, Austin",
    date: "December 2025",
    equipment: "Sony A7IV, 70-200mm f2.8, Drone for aerial shots",
    detailedDescription:
      "Capturing the magic of 'Yes!' is an honor. We specialize in discreetly documenting proposal moments, preserving the surprise, raw emotion, and intimate celebration. From planning the perfect spot to capturing the joyful aftermath, these sessions tell the beautiful beginning of a lifelong commitment. We also include a mini-session post-proposal to get those lovely just-engaged shots.",
    gallery: [
      { src: "/images/engagement-ring-closeup.png", alt: "Close-up of an engagement ring on hand", title: "The Sparkle of Commitment" },
      { src: "/images/engagement-surprise-reaction.png", alt: "Candid reaction to a marriage proposal", title: "The 'Yes!' Moment" },
      { src: "/images/engagement-celebratory-hug.png", alt: "Couple embracing after proposal", title: "Joyful Embrace" },
    ],
  },
];

// All available categories - updated
const categories = [
  "All", 
  "Wedding", 
  "Portrait", 
  "Landscape", 
  "Documentary", 
  "Couples", 
  "Fashion", 
  "Urban", 
  "Food",
  "Pre-wedding",      // New
  "Street Portraits", // New
  "Engagements",      // New
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(allProjects)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  // Filter projects based on category and search query
  useEffect(() => {
    let filtered = allProjects.map(project => ({
      // Ensure all projects have the basic fields needed for filtering and display on this page,
      // even if full data is more extensive.
      // The detail page will use the full object from allProjects.
      id: project.id,
      title: project.title,
      category: project.category,
      description: project.description,
      image: project.image,
      featured: project.featured,
      // Include other fields if they were part of the filtering logic, but here we only use title, desc, category.
    }));

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
              Dheeran cinematics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="sticky top-16 sm:top-20 z-30 bg-background/80 backdrop-blur-lg border-b border-foreground/10">
        <div className="container px-3 sm:px-4 py-3 sm:py-4 md:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full sm:w-auto justify-center sm:justify-start">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="xs" // Kept as "xs" from your latest code
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "rounded-full text-xs", // Kept as "xs" from your latest code
                    selectedCategory === category
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "border-foreground/20 bg-background/20 text-foreground hover:bg-foreground/10",
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="relative w-full sm:w-auto mt-2 sm:mt-0">
              <Search className="absolute left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-foreground/50" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-[180px] md:w-[200px] rounded-full border border-foreground/10 bg-foreground/5 py-1.5 sm:py-2 pl-8 sm:pl-10 pr-3 sm:pr-4 text-xs sm:text-sm text-foreground placeholder-foreground/50 backdrop-blur-sm transition-colors focus:border-foreground/20 focus:outline-none focus:ring-0"
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
                      <Link href={`/project/${project.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-foreground text-foreground hover:bg-foreground/10"
                        >
                          View Details
                        </Button>
                      </Link>
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

      {/* Featured Project Highlight - (content from your latest version) */}
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
                  src="/images/food-gourmet-salad.jpeg"
                  alt="Featured project - Culinary Artistry"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover cinematic-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>
            </ParallaxSection>

            <ParallaxSection speed={0.3} direction="right">
              <h3 className="mb-2 font-serif text-2xl sm:text-3xl font-bold tracking-tight dramatic-text">
                Culinary Artistry: Fine Dining Series
              </h3>
              <p className="mb-4 text-sm text-foreground/70">Food Photography • 2023</p>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p>
                  This culinary photography series explores the artistry of fine dining, capturing the meticulous
                  presentation and vibrant colors that define high-end gastronomy in Texas.
                </p>
                <p>
                  Through careful composition and dramatic lighting, we showcase each dish as both a culinary creation
                  and a work of art, highlighting textures, colors, and the chef's attention to detail.
                </p>
                <p>
                  The project spanned several months, working with award-winning restaurants across Austin to document
                  their signature dishes and elevate their visual presence in the competitive dining landscape.
                </p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <Link href="/food-photography"> {/* Make sure this link is correct */}
                    <Button className="group bg-foreground text-background hover:bg-foreground/90 cinematic-hover">
                      View Food Gallery
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
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