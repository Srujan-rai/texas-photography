"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play, Instagram } from "lucide-react" // Added Instagram icon
import { motion, useScroll, useTransform } from "framer-motion"
import { Phone, Mail, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { DynamicBackground } from "@/components/dynamic-background"
import {
  FadeIn,
  FloatingElement,
  ParallaxSection,
  ScrollProgress,
  TextReveal,
  ZoomIn,
} from "@/components/scroll-effects"

export default function Home() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Add this after the existing useEffect
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll(".reveal")

      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight
        const elementTop = reveals[i].getBoundingClientRect().top
        const elementVisible = 150

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once on mount to check initial elements

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToPortfolio = () => {
    if (portfolioRef.current) {
      portfolioRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Portfolio projects data with real images
  const portfolioProjects = [
    {
      id: 1,
      title: "Wedding Cinematography",
      category: "Wedding",
      description: "Capturing the most beautiful moments of your special day with cinematic flair.",
      image: "/images/wedding-moment.png",
    },
    {
      id: 2,
      title: "Portrait Films",
      category: "Portrait",
      description: "Dynamic video portraits that reveal your authentic self and narrative.",
      image: "/images/white-dress.png",
    },
    {
      id: 3,
      title: "Coastal Vistas",
      category: "Landscape",
      description: "Breathtaking aerial and ground footage of coastal landscapes.",
      image: "/images/mattu-beach.png",
    },
    {
      id: 4,
      title: "Culinary Narratives",
      category: "Food",
      description: "Showcasing dishes in their most appetizing presentation through motion.",
      image: "/images/food-tiramisu-dome.jpeg",
    },
    {
      id: 5,
      title: "Gourmet Visuals",
      category: "Food",
      description: "Elevating food presentation through cinematic videography.",
      image: "/images/food-gourmet-salad.jpeg",
    },
    {
      id: 6,
      title: "Cultural Documentaries",
      category: "Documentary",
      description: "Authentic documentation of cultural traditions and ceremonies in motion.",
      image: "/images/haldi-ceremony.png",
    },
    {
      id: 7,
      title: "Engagement Films",
      category: "Couples",
      description: "Romantic and heartfelt films capturing moments between couples in beautiful settings.",
      image: "/images/beach-couple.png",
    },
    {
      id: 8,
      title: "Fashion Editorials",
      category: "Fashion",
      description: "Stylish and dynamic video editorials that showcase personality and fashion.",
      image: "/images/umbrella-portrait.png",
    },
  ]

  // Gallery images data (keeping these as images for variety, but can be adapted for video stills)
  const galleryImages = [
    { id: 9, aspect: "aspect-[1/1]", span: "md:col-span-1 md:row-span-1", image: "/images/camera-hands.png" },
    { id: 2, aspect: "aspect-[1/1]", span: "md:col-span-1 md:row-span-1", image: "/images/kaif-portrait.png" },
    { id: 4, aspect: "aspect-[1/1]", span: "md:col-span-1 md:row-span-1", image: "/images/food-pizza.jpeg" },
    { id: 8, aspect: "aspect-[1/2]", span: "md:col-span-1 md:row-span-2", image: "/images/umbrella-portrait.png" },
    { id: 10, aspect: "aspect-[1/1]", span: "md:col-span-1 md:row-span-1", image: "/images/yellow-portrait.png" },
    { id: 3, aspect: "aspect-[2/1]", span: "col-span-2 md:col-span-2 md:row-span-1", image: "/images/mattu-beach.png" },
    { id: 11, aspect: "aspect-[1/1]", span: "md:col-span-1 md:row-span-1", image: "/images/bride-closeup.png" },
    { id: 12, aspect: "aspect-[1/1]", span: "md:col-span-1 md:row-span-1", image: "/images/food-appetizers.jpeg" },
    { id: 7, aspect: "aspect-[1/1]", span: "md:col-span-1 md:row-span-1", image: "/images/beach-couple.png" },
    { id: 6, aspect: "aspect-[1/1]", span: "md:col-span-1 md:row-span-1", image: "/images/haldi-ceremony.png" },
  ]

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
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <DynamicBackground />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ opacity }}
          className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4 text-center"
        >
          <FloatingElement amplitude={15} frequency={6} className="mb-4 sm:mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, type: "spring" }}
              className="flex items-center justify-center"
            >
              <div className="relative h-24 w-48 sm:h-32 sm:w-64 md:h-40 md:w-80 overflow-hidden">
                <Image
                  src="/images/texas-logo.png" // Assuming this is your logo, replace if you have a "Dheeran cinematics" specific logo
                  alt="Dheeran cinematics"
                  fill
                  className="object-contain mix-blend-difference"
                  priority
                />
              </div>
            </motion.div>
          </FloatingElement>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl font-light text-foreground/80"
          >
            Crafting compelling visual narratives through the art of cinematography.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <Button
              size="sm"
              className="group bg-foreground text-background hover:bg-foreground/90 cinematic-hover sm:size-lg"
              onClick={scrollToPortfolio}
            >
              Explore Our Work
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-foreground/30 bg-background/10 text-foreground backdrop-blur-md hover:bg-foreground/10 cinematic-hover sm:size-lg"
            >
              <Play className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Watch Showreel
            </Button>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex h-10 w-6 sm:h-12 sm:w-8 items-start justify-center rounded-full border-2 border-foreground/30 p-2 bg-background/10 backdrop-blur-sm"
          >
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
              className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-foreground"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Work */}
      <section ref={portfolioRef} className="relative py-12 sm:py-16 md:py-20">
        <DynamicBackground />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="container relative z-10 px-4 md:px-6">
          <FadeIn className="mb-10 sm:mb-16 text-center">
            <TextReveal
              text="Featured Cinematography"
              className="mb-3 sm:mb-4 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight dramatic-text"
            />
            <p className="mx-auto max-w-xs sm:max-w-md md:max-w-3xl text-base sm:text-lg text-muted-foreground">
              Immerse yourself in the visual stories that define our craft
            </p>
          </FadeIn>

          <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioProjects.slice(0, 6).map((project, index) => (
              <FadeIn key={index} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-xl shadow-xl shadow-foreground/5 cinematic-hover"
                >
                  <ParallaxSection speed={0.2} direction="down" className="aspect-[16/9] w-full overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/90 via-background/30 to-transparent transition-opacity group-hover:opacity-70" />
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={1600}
                      height={900}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 cinematic-image"
                    />
                  </ParallaxSection>
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6">
                    <span className="mb-1 sm:mb-2 inline-block rounded-full bg-foreground/20 px-2 py-1 text-xs font-medium backdrop-blur-sm">
                      {project.category}
                    </span>
                    <h3 className="mb-1 sm:mb-2 font-serif text-xl sm:text-2xl font-bold">{project.title}</h3>
                    <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-foreground/80">{project.description}</p>
                    <div className="transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <Link href={`/project/${project.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-foreground text-foreground hover:bg-foreground/10"
                        >
                          View Project
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* Update the "View All Projects" button to link to the portfolio page */}
          <FadeIn className="mt-10 sm:mt-16 text-center" delay={0.3}>
            <Link href="/portfolio">
              <Button
                size="lg"
                variant="outline"
                className="border-foreground text-foreground hover:bg-foreground/10 cinematic-hover"
              >
                View All Projects
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <DynamicBackground intensity={0.3} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-8 sm:gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <ParallaxSection speed={0.3} direction="left">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src="/images/kaif-portrait.png" // Replace with an actual portrait of Dheeran if available
                  alt="Cinematographer portrait"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover cinematic-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                  <span className="mb-1 sm:mb-2 inline-block rounded-full bg-foreground/20 px-2 py-1 text-xs font-medium backdrop-blur-sm">
                    Director & Cinematographer
                  </span>
                </div>
                <FloatingElement
                  amplitude={5}
                  frequency={5}
                  className="absolute -bottom-2 -right-2 h-16 w-16 sm:h-24 sm:w-24 rounded-full border-8 border-background p-2 shadow-lg cinematic-glow"
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full">
                    <div className="relative h-full w-full p-2 overflow-hidden">
                      <Image src="/images/texas-logo.png" alt="Dheeran cinematics" fill className="object-contain" />
                    </div>
                  </div>
                </FloatingElement>
              </div>
            </ParallaxSection>

            <ParallaxSection speed={0.3} direction="right">
              <TextReveal
                text="The Vision Behind the Lens"
                className="mb-4 sm:mb-6 font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight dramatic-text"
              />
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <FadeIn delay={0.1}>
                  <p>
                    With over a decade immersed in the art of visual storytelling, I've dedicated my craft to capturing
                    the essence of moments through a cinematic perspective. My journey began with a passion for film and
                    a desire to bring stories to life.
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p>
                    Every frame I compose is a deliberate choice to reveal the extraordinary in the ordinary. From the
                    vibrant energy of events to the intricate details of products, my lens seeks to uncover the authentic
                    character that makes each project unique.
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <p>
                    My approach combines technical precision with artistic intuition, creating visual narratives that
                    resonate on an emotional level. Whether documenting significant life events or crafting compelling
                    commercials, I strive to create visuals that transcend mere documentation and become
                    timeless expressions of your vision.
                  </p>
                </FadeIn>
                {/* Update the "About the Artist" button to link to the about page */}
                <FadeIn delay={0.4} className="pt-4">
                  <Link href="/about">
                    <Button className="group bg-foreground text-background hover:bg-foreground/90 cinematic-hover">
                      About the Artist
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </FadeIn>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <DynamicBackground intensity={0.4} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="container relative z-10 px-4 md:px-6">
          <FadeIn className="mb-10 sm:mb-16 text-center">
            <TextReveal
              text="Visual Portfolio"
              className="mb-3 sm:mb-4 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight dramatic-text"
            />
            <p className="mx-auto max-w-xs sm:max-w-md md:max-w-3xl text-base sm:text-lg text-muted-foreground">
              A curated collection of cinematic imagery and videography that showcases our diverse work.
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-4">
            {galleryImages.map((item, index) => (
              <ZoomIn key={index} delay={index * 0.05} scale={0.8}>
                <Link href={`/project/${item.id}`}>
                  <div
                    className={cn(
                      "group relative overflow-hidden rounded-xl shadow-lg shadow-foreground/5 cinematic-hover",
                      item.span,
                      item.aspect,
                    )}
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 cinematic-image"
                    />
                    <div className="absolute inset-0 bg-background/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="rounded-full bg-foreground/20 p-2 sm:p-3 backdrop-blur-md">
                        <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6 text-foreground" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ZoomIn>
            ))}
          </div>

          {/* Update the "Explore Full Gallery" button to link to the gallery page */}
          <FadeIn className="mt-10 sm:mt-16 text-center" delay={0.3}>
            <Link href="/gallery">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 cinematic-hover">
                Explore Full Gallery
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="relative py-12 sm:py-16 md:py-20">
        <DynamicBackground intensity={0.2} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        <div className="container relative z-10 px-4 md:px-6">
          <FadeIn className="mb-8 sm:mb-12 text-center">
            <TextReveal
              text="Our Cinematography Services"
              className="mb-3 sm:mb-4 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight dramatic-text"
            />
            <p className="mx-auto max-w-xs sm:max-w-md md:max-w-3xl text-base sm:text-lg text-muted-foreground">
              Professional visual storytelling tailored to your creative vision
            </p>
          </FadeIn>

          <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Commercial & Brand Films",
                description:
                  "Elevate your brand with stunning visuals that capture your essence and connect with your audience.",
                icon: "🎬",
              },
              {
                title: "Documentary Filmmaking",
                description:
                  "Authentic storytelling that preserves moments and narratives with depth and artistic integrity.",
                icon: "📽️",
              },
              {
                title: "Aerial Cinematography",
                description:
                  "Breathtaking perspectives from above, revealing landscapes and structures in their full glory.",
                icon: "🚁",
              },
              {
                title: "Event Videography",
                description:
                  "Cinematic documentation of special occasions, from intimate gatherings to grand celebrations.",
                icon: "🎭",
              },
              {
                title: "Wedding Films",
                description:
                  "Crafting timeless and emotional wedding films that capture the magic of your special day.",
                icon: "💍",
              },
              {
                title: "Food & Product Videos",
                description:
                  "Capturing culinary artistry and product details with precision and style that makes them visually irresistible.",
                icon: "🍽️",
              },
              {
                title: "Music Videos",
                description:
                  "Dynamic and creative music videos that bring your artistic vision to life through compelling visuals.",
                icon: "🎤",
              },
            ].map((service, index) => (
              <FadeIn key={index} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5 p-6 sm:p-8 backdrop-blur-sm transition-colors duration-300 hover:bg-foreground/10 shadow-lg cinematic-hover"
                >
                  <div className="mb-4 sm:mb-6 text-3xl sm:text-4xl">{service.icon}</div>
                  <h3 className="mb-2 sm:mb-4 font-serif text-lg sm:text-xl font-bold">{service.title}</h3>
                  <p className="mb-4 sm:mb-6 text-sm sm:text-base text-muted-foreground">{service.description}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {/* Update the service "Learn More" buttons to link to the services page */}
                  <Button variant="link" className="group p-0">
                    <Link href="/services">
                      Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="relative py-12 sm:py-16 md:py-20 section-transition reveal">
        <DynamicBackground intensity={0.2} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-4 sm:mb-6 font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight dramatic-text">
              Let's Create Together
            </h2>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg text-muted-foreground">
              Ready to bring your vision to life? Contact us to discuss your cinematography needs and start crafting
              your visual story.
            </p>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-foreground/10 p-2 sm:p-3">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">+91 77601 32092</p>
                  <p className="text-xs sm:text-sm text-muted-foreground/70">Available Monday-Sunday, 9am-8pm IST</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-foreground/10 p-2 sm:p-3">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">dmashlesh@gmail.com</p>
                  <p className="text-xs sm:text-sm text-muted-foreground/70">We'll respond within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-foreground/10 p-2 sm:p-3">
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" /> {/* Added Instagram icon */}
                </div>
                <div>
                  <h3 className="font-medium">Instagram</h3>
                  <p className="text-muted-foreground">
                    <a
                      href="https://www.instagram.com/dheeran_cinematics?igsh=NzcwYjJ3YjhvZTFj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline"
                    >
                      @dheeran_cinematics
                    </a>
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground/70">Connect with us for daily updates!</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-foreground/10 p-2 sm:p-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-muted-foreground">Bengaluru, Karnataka, India</p>
                  <p className="text-xs sm:text-sm text-muted-foreground/70">
                    Available for travel throughout India and beyond
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12">
              <h3 className="mb-3 sm:mb-4 font-serif text-lg sm:text-xl font-bold">Follow Our Visual Journey</h3>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {["Instagram", "Vimeo", "YouTube", "Behance", "LinkedIn"].map((platform, index) => (
                  <motion.a
                    key={index}
                    href={
                      platform === "Instagram"
                        ? "https://www.instagram.com/dheeran_cinematics?igsh=NzcwYjJ3YjhvZTFj"
                        : "#" // Replace with actual links for other platforms
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="rounded-full border border-foreground/20 bg-foreground/5 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm backdrop-blur-sm transition-colors hover:bg-foreground/10 shadow-md cinematic-hover"
                  >
                    {platform}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 sm:p-8 backdrop-blur-sm shadow-2xl cinematic-hover"
          >
            <h3 className="mb-4 sm:mb-6 font-serif text-xl sm:text-2xl font-bold dramatic-text">Start Your Project</h3>
            <form className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                <div className="space-y-1 sm:space-y-2">
                  <label htmlFor="first-name" className="text-xs sm:text-sm font-medium">
                    First Name
                  </label>
                  <input
                    id="first-name"
                    name="first-name" // Added name attribute
                    className="w-full rounded-md border border-foreground/10 bg-foreground/5 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-foreground placeholder-foreground/50 backdrop-blur-sm transition-colors focus:border-foreground/20 focus:outline-none focus:ring-0"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <label htmlFor="last-name" className="text-xs sm:text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    name="last-name" // Added name attribute
                    className="w-full rounded-md border border-foreground/10 bg-foreground/5 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-foreground placeholder-foreground/50 backdrop-blur-sm transition-colors focus:border-foreground/20 focus:outline-none focus:ring-0"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <label htmlFor="email" className="text-xs sm:text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email" // Added name attribute
                  type="email"
                  className="w-full rounded-md border border-foreground/10 bg-foreground/5 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-foreground placeholder-foreground/50 backdrop-blur-sm transition-colors focus:border-foreground/20 focus:outline-none focus:ring-0"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <label htmlFor="phone" className="text-xs sm:text-sm font-medium">
                  Phone (Optional)
                </label>
                <input
                  id="phone"
                  name="phone" // Added name attribute
                  type="tel"
                  className="w-full rounded-md border border-foreground/10 bg-foreground/5 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-foreground placeholder-foreground/50 backdrop-blur-sm transition-colors focus:border-foreground/20 focus:outline-none focus:ring-0"
                  placeholder="77601 32092" // Updated placeholder
                />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <label htmlFor="project-type" className="text-xs sm:text-sm font-medium">
                  Project Type
                </label>
                <select
                  id="project-type"
                  name="project-type" // Added name attribute
                  className="w-full rounded-md border border-foreground/10 bg-foreground/5 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-foreground placeholder-foreground/50 backdrop-blur-sm transition-colors focus:border-foreground/20 focus:outline-none focus:ring-0"
                  required
                >
                  <option value="" className="bg-background">
                    Select project type
                  </option>
                  <option value="commercial" className="bg-background">
                    Commercial & Brand Film
                  </option>
                  <option value="documentary" className="bg-background">
                    Documentary Filmmaking
                  </option>
                  <option value="event" className="bg-background">
                    Event Videography
                  </option>
                  <option value="aerial" className="bg-background">
                    Aerial Cinematography
                  </option>
                  <option value="wedding" className="bg-background">
                    Wedding Film
                  </option>
                  <option value="food-product" className="bg-background">
                    Food & Product Video
                  </option>
                  <option value="music-video" className="bg-background">
                    Music Video
                  </option>
                  <option value="other" className="bg-background">
                    Other
                  </option>
                </select>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <label htmlFor="message" className="text-xs sm:text-sm font-medium">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message" // Added name attribute
                  className="h-24 sm:h-32 w-full rounded-md border border-foreground/10 bg-foreground/5 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-foreground placeholder-foreground/50 backdrop-blur-sm transition-colors focus:border-foreground/20 focus:outline-none focus:ring-0"
                  placeholder="Tell us about your vision..."
                  required
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-red-600 shadow-lg cinematic-hover"
              >
                Submit Inquiry
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-foreground/10 bg-background py-8 sm:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center mb-4">
                <div className="relative h-12 w-40 overflow-hidden">
                  <Image src="/images/texas-logo.png" alt="Dheeran cinematics" fill className="object-contain" />
                </div>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                Crafting compelling visual narratives through the art of cinematography.
              </p>
            </div>
            <div>
              <h3 className="mb-3 sm:mb-4 font-serif text-base sm:text-lg font-bold">Navigation</h3>
              {/* Update the footer navigation links */}
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "About", href: "/about" },
                  { name: "Portfolio", href: "/portfolio" },
                  { name: "Services", href: "/services" },
                  { name: "Contact", href: "/contact" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-sm sm:text-base text-muted-foreground transition-colors hover:text-foreground animated-underline"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 sm:mb-4 font-serif text-base sm:text-lg font-bold">Services</h3>
              {/* Updated services footer links to match the new service titles */}
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { name: "Commercial & Brand Films", href: "/services#commercial" },
                  { name: "Documentary Filmmaking", href: "/services#documentary" },
                  { name: "Aerial Cinematography", href: "/services#aerial" },
                  { name: "Event Videography", href: "/services#events" },
                  { name: "Wedding Films", href: "/services#wedding" },
                  { name: "Food & Product Videos", href: "/services#food-product" },
                  { name: "Music Videos", href: "/services#music-video" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-sm sm:text-base text-muted-foreground transition-colors hover:text-foreground animated-underline"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 sm:mb-4 font-serif text-base sm:text-lg font-bold">Connect</h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { name: "Instagram", href: "https://www.instagram.com/dheeran_cinematics?igsh=NzcwYjJ3YjhvZTFj" },
                  { name: "Vimeo", href: "#" }, // Replace with actual Vimeo link
                  { name: "YouTube", href: "#" }, // Replace with actual YouTube link
                  { name: "Behance", href: "#" }, // Replace with actual Behance link
                  { name: "LinkedIn", href: "#" }, // Replace with actual LinkedIn link
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      target="_blank" // Open in new tab
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-muted-foreground transition-colors hover:text-foreground animated-underline"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 sm:mt-16 border-t border-foreground/10 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground/60">
            <p>© {new Date().getFullYear()} Dheeran cinematics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}