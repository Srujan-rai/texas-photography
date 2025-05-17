"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
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

  const scrollToPortfolio = () => {
    if (portfolioRef.current) {
      portfolioRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Portfolio projects data with real images
  const portfolioProjects = [
    {
      title: "Wedding Stories",
      category: "Wedding",
      description: "Capturing the most beautiful moments of your special day",
      image: "/images/wedding-moment.png",
    },
    {
      title: "Portrait Sessions",
      category: "Portrait",
      description: "Professional portraits that reveal your authentic self",
      image: "/images/white-dress.png",
    },
    {
      title: "Coastal Dreams",
      category: "Landscape",
      description: "Breathtaking views of coastal landscapes",
      image: "/images/mattu-beach.png",
    },
    {
      title: "Cultural Ceremonies",
      category: "Documentary",
      description: "Authentic documentation of cultural traditions and ceremonies",
      image: "/images/haldi-ceremony.png",
    },
    {
      title: "Engagement Sessions",
      category: "Couples",
      description: "Romantic moments between couples in beautiful settings",
      image: "/images/beach-couple.png",
    },
    {
      title: "Fashion Photography",
      category: "Fashion",
      description: "Stylish portraits that showcase personality and fashion",
      image: "/images/umbrella-portrait.png",
    },
  ]

  // Gallery images data
  const galleryImages = [
    { aspect: "aspect-[1/1]", span: "md:col-span-1 md:row-span-1", image: "/images/camera-hands.png" },
    { aspect: "aspect-[1/1]", span: "md:col-span-1 md:row-span-1", image: "/images/kaif-portrait.png" },
    { aspect: "aspect-[1/2]", span: "md:col-span-1 md:row-span-2", image: "/images/umbrella-portrait.png" },
    { aspect: "aspect-[1/1]", span: "md:col-span-1 md:row-span-1", image: "/images/yellow-portrait.png" },
    { aspect: "aspect-[2/1]", span: "col-span-2 md:col-span-2 md:row-span-1", image: "/images/mattu-beach.png" },
    { aspect: "aspect-[1/1]", span: "md:col-span-1 md:row-span-1", image: "/images/bride-closeup.png" },
    { aspect: "aspect-[1/1]", span: "md:col-span-1 md:row-span-1", image: "/images/beach-couple.png" },
    { aspect: "aspect-[1/1]", span: "md:col-span-1 md:row-span-1", image: "/images/haldi-ceremony.png" },
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
          <FloatingElement amplitude={15} frequency={6} className="mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, type: "spring" }}
              className="flex items-center justify-center"
            >
              <div className="relative h-32 w-64 sm:h-40 sm:w-80  rounded-md overflow-hidden ">
                <Image
                  src="/images/texas-logo.png"
                  alt="Texas Cinematography"
                  fill
                  className="object-contain mix-blend-screen"
                  priority
                />
              </div>
            </motion.div>
          </FloatingElement>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl font-light text-foreground/80"
          >
            Capturing the soul of the Lone Star State through cinematic vision
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <Button
              size="lg"
              className="group bg-foreground text-background hover:bg-foreground/90 cinematic-hover"
              onClick={scrollToPortfolio}
            >
              Explore Our Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-foreground/30 bg-background/10 text-foreground backdrop-blur-md hover:bg-foreground/10 cinematic-hover"
            >
              <Play className="mr-2 h-4 w-4" /> Watch Showreel
            </Button>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex h-12 w-8 items-start justify-center rounded-full border-2 border-foreground/30 p-2 bg-background/10 backdrop-blur-sm"
          >
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
              className="h-2 w-2 rounded-full bg-foreground"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Work */}
      <section ref={portfolioRef} className="relative py-16 sm:py-20 md:py-24 lg:py-32">
        <DynamicBackground />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="container relative z-10 px-4 md:px-6">
          <FadeIn className="mb-10 sm:mb-16 text-center">
            <TextReveal
              text="Featured Cinematography"
              className="mb-3 sm:mb-4 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight dramatic-text"
            />
            <p className="mx-auto max-w-xs sm:max-w-md md:max-w-3xl text-base sm:text-lg text-muted-foreground">
              Immerse yourself in the visual stories that define the Texas experience
            </p>
          </FadeIn>

          <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioProjects.map((project, index) => (
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-foreground text-foreground hover:bg-foreground/10"
                      >
                        View Project
                      </Button>
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
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32">
        <DynamicBackground intensity={0.3} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-8 sm:gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <ParallaxSection speed={0.3} direction="left">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src="/images/yellow-portrait.png"
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
                  className="absolute -bottom-2 -right-2 h-16 w-16 sm:h-24 sm:w-24 rounded-full border-8 border-background bg-foreground p-2 shadow-lg cinematic-glow"
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full ">
                    <div className="relative h-full w-full p-2  rounded-full overflow-hidden">
                      <Image
                        src="/images/texas-logo.png"
                        alt="Texas Cinematography"
                        fill
                        className="object-contain mix-blend-screen"
                      />
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
                    the essence of Texas through a cinematic perspective. My journey began in the vast landscapes of
                    West Texas, where the interplay of light and shadow taught me the power of patience and perspective.
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p>
                    Every frame I compose is a deliberate choice to reveal the extraordinary in the ordinary. From the
                    rugged beauty of Big Bend to the neon-lit streets of Austin, my lens seeks to uncover the authentic
                    character that makes Texas unlike anywhere else.
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <p>
                    My approach combines technical precision with artistic intuition, creating visual narratives that
                    resonate on an emotional level. Whether documenting the quiet dignity of ranch life or the vibrant
                    energy of urban centers, I strive to create images that transcend mere documentation and become
                    timeless expressions of place and moment.
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
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32">
        <DynamicBackground intensity={0.4} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="container relative z-10 px-4 md:px-6">
          <FadeIn className="mb-10 sm:mb-16 text-center">
            <TextReveal
              text="Visual Portfolio"
              className="mb-3 sm:mb-4 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight dramatic-text"
            />
            <p className="mx-auto max-w-xs sm:max-w-md md:max-w-3xl text-base sm:text-lg text-muted-foreground">
              A curated collection of cinematic imagery capturing the diverse soul of Texas
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-4">
            {galleryImages.map((item, index) => (
              <ZoomIn key={index} delay={index * 0.05} scale={0.8}>
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
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32">
        <DynamicBackground intensity={0.2} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        <div className="container relative z-10 px-4 md:px-6">
          <FadeIn className="mb-10 sm:mb-16 text-center">
            <TextReveal
              text="Cinematography Services"
              className="mb-3 sm:mb-4 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight dramatic-text"
            />
            <p className="mx-auto max-w-xs sm:max-w-md md:max-w-3xl text-base sm:text-lg text-muted-foreground">
              Professional visual storytelling tailored to your creative vision
            </p>
          </FadeIn>

          <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Commercial Cinematography",
                description:
                  "Elevate your brand with stunning visuals that capture your essence and connect with your audience.",
                icon: "🎬",
              },
              {
                title: "Documentary Projects",
                description:
                  "Authentic storytelling that preserves moments and narratives with depth and artistic integrity.",
                icon: "📽️",
              },
              {
                title: "Aerial Photography",
                description:
                  "Breathtaking perspectives from above, revealing landscapes and structures in their full glory.",
                icon: "🚁",
              },
              {
                title: "Event Coverage",
                description:
                  "Cinematic documentation of special occasions, from intimate gatherings to grand celebrations.",
                icon: "🎭",
              },
              {
                title: "Fine Art Photography",
                description:
                  "Museum-quality prints that transform spaces and evoke emotion through visual storytelling.",
                icon: "🖼️",
              },
              {
                title: "Creative Direction",
                description: "Comprehensive visual strategy and artistic guidance for brands and creative projects.",
                icon: "🎨",
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

      {/* Testimonials */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 section-transition reveal">
        <DynamicBackground intensity={0.3} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10 sm:mb-16 text-center"
          >
            <h2 className="mb-3 sm:mb-4 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight dramatic-text">
              Client Experiences
            </h2>
            <p className="mx-auto max-w-xs sm:max-w-md md:max-w-3xl text-base sm:text-lg text-muted-foreground">
              Stories from those who have collaborated with Texas Cinematography
            </p>
          </motion.div>

          <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                role: "Film Producer",
                testimonial:
                  "The visual storytelling brought to our documentary exceeded all expectations. Every frame was thoughtfully composed, capturing the essence of Texas with remarkable authenticity.",
              },
              {
                name: "Michael Rodriguez",
                role: "Creative Director",
                testimonial:
                  "Our brand campaign was transformed through this cinematic vision. The images perfectly captured our ethos and have significantly elevated our visual identity in the market.",
              },
              {
                name: "Emily Chen",
                role: "Gallery Curator",
                testimonial:
                  "The fine art prints we commissioned have become the centerpiece of our exhibition. The technical mastery combined with artistic sensitivity creates truly transcendent work.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5 p-6 sm:p-8 backdrop-blur-sm shadow-xl cinematic-hover"
              >
                <div className="absolute -right-4 -top-4 text-4xl sm:text-6xl opacity-10">❝</div>
                <p className="mb-4 sm:mb-6 text-base sm:text-lg italic text-foreground/80">
                  "{testimonial.testimonial}"
                </p>
                <div className="flex items-center space-x-4">
                  <div className="relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-[2px] shadow-md cinematic-glow">
                    <div className="h-full w-full rounded-full bg-background">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-foreground/10">
                        <span className="font-serif text-lg font-bold">{testimonial.name[0]}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 section-transition reveal">
        <DynamicBackground intensity={0.2} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-8 sm:gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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
                    <p className="text-muted-foreground">(512) 555-0123</p>
                    <p className="text-xs sm:text-sm text-muted-foreground/70">Available Monday-Friday, 9am-5pm CST</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-foreground/10 p-2 sm:p-3">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">contact@texascinematography.com</p>
                    <p className="text-xs sm:text-sm text-muted-foreground/70">We'll respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-foreground/10 p-2 sm:p-3">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-muted-foreground">Austin, Texas</p>
                    <p className="text-xs sm:text-sm text-muted-foreground/70">
                      Available for travel throughout Texas and beyond
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:mt-12">
                <h3 className="mb-3 sm:mb-4 font-serif text-lg sm:text-xl font-bold">Follow Our Visual Journey</h3>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  {["Instagram", "Vimeo", "YouTube", "Behance"].map((platform, index) => (
                    <motion.a
                      key={index}
                      href="#"
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
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 sm:p-8 backdrop-blur-sm shadow-2xl cinematic-hover"
            >
              <h3 className="mb-4 sm:mb-6 font-serif text-xl sm:text-2xl font-bold dramatic-text">
                Start Your Project
              </h3>
              <form className="space-y-4 sm:space-y-6">
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                  <div className="space-y-1 sm:space-y-2">
                    <label htmlFor="first-name" className="text-xs sm:text-sm font-medium">
                      First Name
                    </label>
                    <input
                      id="first-name"
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
                    type="email"
                    className="w-full rounded-md border border-foreground/10 bg-foreground/5 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-foreground placeholder-foreground/50 backdrop-blur-sm transition-colors focus:border-foreground/20 focus:outline-none focus:ring-0"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <label htmlFor="project-type" className="text-xs sm:text-sm font-medium">
                    Project Type
                  </label>
                  <select
                    id="project-type"
                    className="w-full rounded-md border border-foreground/10 bg-foreground/5 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-foreground placeholder-foreground/50 backdrop-blur-sm transition-colors focus:border-foreground/20 focus:outline-none focus:ring-0"
                    required
                  >
                    <option value="" className="bg-background">
                      Select project type
                    </option>
                    <option value="commercial" className="bg-background">
                      Commercial
                    </option>
                    <option value="documentary" className="bg-background">
                      Documentary
                    </option>
                    <option value="event" className="bg-background">
                      Event Coverage
                    </option>
                    <option value="aerial" className="bg-background">
                      Aerial Photography
                    </option>
                    <option value="fine-art" className="bg-background">
                      Fine Art
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
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-foreground/10 bg-background py-12 sm:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center mb-4">
                <div className="relative h-12 w-40  rounded-md overflow-hidden">
                  <Image
                    src="/images/texas-logo.png"
                    alt="Texas Cinematography"
                    fill
                    className="object-contain mix-blend-screen"
                  />
                </div>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                Capturing the soul of the Lone Star State through cinematic vision.
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
              {/* Update the services footer links */}
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { name: "Commercial", href: "/services#commercial" },
                  { name: "Documentary", href: "/services#documentary" },
                  { name: "Aerial", href: "/services#aerial" },
                  { name: "Events", href: "/services#events" },
                  { name: "Portrait", href: "/services#portrait" },
                  { name: "Wedding", href: "/services#wedding" },
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
                {["Instagram", "Vimeo", "YouTube", "Behance", "LinkedIn"].map((item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-sm sm:text-base text-muted-foreground transition-colors hover:text-foreground animated-underline"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 sm:mt-16 border-t border-foreground/10 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground/60">
            <p>© {new Date().getFullYear()} Texas Cinematography. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
