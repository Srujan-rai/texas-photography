"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Award, Camera, Film, Users, Heart, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DynamicBackground } from "@/components/dynamic-background"
import { FadeIn, ParallaxSection, TextReveal, ScrollProgress } from "@/components/scroll-effects"
import { cn } from "@/lib/utils"

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Timeline data
  const timeline = [
    {
      year: "2010",
      title: "The Beginning",
      description: "Started the journey into photography with a focus on Texas landscapes and cultural documentation.",
      image: "/images/camera-hands.png",
    },
    {
      year: "2013",
      title: "First Exhibition",
      description: "Hosted first solo exhibition 'Texas Perspectives' at the Austin Visual Arts Center.",
      image: "/images/mattu-beach.png",
    },
    {
      year: "2015",
      title: "Wedding Photography",
      description: "Expanded into wedding photography, bringing cinematic vision to capturing special moments.",
      image: "/images/wedding-moment.png",
    },
    {
      year: "2018",
      title: "Documentary Series",
      description: "Released 'Lone Star Stories', a documentary series exploring Texas cultural heritage.",
      image: "/images/haldi-ceremony.png",
    },
    {
      year: "2020",
      title: "Dheeran cinematics",
      description: "Founded Dheeran cinematics studio, bringing together a team of visual storytellers.",
      image: "/images/kaif-portrait.png",
    },
    {
      year: "2023",
      title: "International Recognition",
      description: "Received international awards for cinematography and expanded services globally.",
      image: "/images/umbrella-portrait.png",
    },
  ]

  // Team members
  const team = [
    {
      name: "Alex Rodriguez",
      role: "Founder & Lead Cinematographer",
      bio: "With over 15 years of experience, Alex brings a unique cinematic vision to every project.",
      image: "/images/kaif-portrait.png",
    },
    {
      name: "Sarah Johnson",
      role: "Creative Director",
      bio: "Sarah's background in fine arts brings a distinctive aesthetic approach to our visual storytelling.",
      image: "/images/yellow-portrait.png",
    },
    {
      name: "Michael Chen",
      role: "Director of Photography",
      bio: "Michael specializes in capturing the perfect light and composition for every shot.",
      image: "/images/camera-hands.png",
    },
    {
      name: "Emily Williams",
      role: "Wedding Specialist",
      bio: "Emily has documented over 200 weddings with her signature emotional storytelling style.",
      image: "/images/bride-closeup.png",
    },
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
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
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
              Our Story
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-foreground/80">
              Discover the passion, vision, and journey behind Dheeran cinematics and the team dedicated to visual
              storytelling.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-16 sm:py-20 md:py-24">
        <DynamicBackground intensity={0.2} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="container relative z-10 px-4">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
            <ParallaxSection speed={0.2} direction="left">
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src="/images/kaif-portrait.png"
                  alt="Founder portrait"
                  width={800}
                  height={800}
                  className="h-full w-full object-cover cinematic-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>
            </ParallaxSection>

            <ParallaxSection speed={0.3} direction="right">
              <TextReveal
                text="Our Mission & Vision"
                className="mb-4 sm:mb-6 font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight dramatic-text"
              />
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <FadeIn delay={0.1}>
                  <p>
                    At Dheeran cinematics, our mission is to capture the authentic spirit and diverse beauty of Texas
                    through a cinematic lens. We believe that every moment, landscape, and story deserves to be
                    preserved with artistic integrity and technical excellence.
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p>
                    Founded in 2020, our studio has grown from a single photographer's passion project into a
                    collaborative team of visual storytellers united by our love for the Lone Star State and our
                    commitment to creating timeless imagery.
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <p>
                    Our vision extends beyond simply taking photographs—we aim to create visual narratives that resonate
                    emotionally, preserve cultural heritage, and reveal the extraordinary in everyday moments. Whether
                    documenting a wedding celebration, capturing the rugged beauty of West Texas, or telling the story
                    of a family legacy, we approach each project with the same dedication to authentic storytelling.
                  </p>
                </FadeIn>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-16 sm:py-20 md:py-24">
        <DynamicBackground intensity={0.3} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        <div className="container relative z-10 px-4">
          <FadeIn className="mb-10 sm:mb-16 text-center">
            <TextReveal
              text="Our Core Values"
              className="mb-3 sm:mb-4 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight dramatic-text"
            />
            <p className="mx-auto max-w-xs sm:max-w-md md:max-w-3xl text-base sm:text-lg text-muted-foreground">
              The principles that guide our approach to visual storytelling
            </p>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Camera className="h-8 w-8" />,
                title: "Technical Excellence",
                description:
                  "We are committed to mastering our craft, continuously refining our technical skills and embracing innovative approaches.",
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Authentic Storytelling",
                description:
                  "We believe in capturing genuine moments and emotions, creating visual narratives that reflect the true essence of our subjects.",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Collaborative Spirit",
                description:
                  "We work closely with our clients, valuing their vision and building relationships based on trust and mutual creativity.",
              },
              {
                icon: <Film className="h-8 w-8" />,
                title: "Cinematic Vision",
                description:
                  "We approach every project with a filmmaker's eye, considering composition, lighting, and narrative in creating compelling imagery.",
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Artistic Integrity",
                description:
                  "We maintain the highest standards in our work, never compromising our artistic vision or ethical principles.",
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Cultural Appreciation",
                description:
                  "We honor the diverse cultures and traditions of Texas, approaching each story with respect and sensitivity.",
              },
            ].map((value, index) => (
              <FadeIn key={index} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5 p-6 sm:p-8 backdrop-blur-sm transition-colors duration-300 hover:bg-foreground/10 shadow-lg cinematic-hover"
                >
                  <div className="mb-4 sm:mb-6 text-foreground/80">{value.icon}</div>
                  <h3 className="mb-2 sm:mb-4 font-serif text-lg sm:text-xl font-bold">{value.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{value.description}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="relative py-16 sm:py-20 md:py-24">
        <DynamicBackground intensity={0.2} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="container relative z-10 px-4">
          <FadeIn className="mb-10 sm:mb-16 text-center">
            <TextReveal
              text="Our Journey"
              className="mb-3 sm:mb-4 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight dramatic-text"
            />
            <p className="mx-auto max-w-xs sm:max-w-md md:max-w-3xl text-base sm:text-lg text-muted-foreground">
              The evolution of Dheeran cinematics through the years
            </p>
          </FadeIn>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-foreground/10 transform md:translate-x-[-0.5px]" />

            {/* Timeline events */}
            <div className="space-y-12 md:space-y-24">
              {timeline.map((event, index) => (
                <div key={index} className="relative">
                  <FadeIn
                    delay={index * 0.1}
                    direction={index % 2 === 0 ? "left" : "right"}
                    className="grid md:grid-cols-2 gap-8 items-center"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[-8px] md:left-1/2 top-0 h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transform md:translate-x-[-8px] shadow-lg z-10" />

                    {/* Content positioning based on index */}
                    <div className={cn("md:contents", index % 2 === 0 ? "" : "flex flex-col-reverse md:flex-row")}>
                      <div
                        className={cn(
                          "md:pr-12",
                          index % 2 === 0 ? "md:text-right md:col-start-1" : "md:pl-12 md:col-start-2",
                        )}
                      >
                        <span className="inline-block mb-2 text-sm font-bold text-foreground/60">{event.year}</span>
                        <h3 className="mb-2 font-serif text-xl sm:text-2xl font-bold">{event.title}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">{event.description}</p>
                      </div>

                      <div
                        className={cn(
                          "relative aspect-video overflow-hidden rounded-xl shadow-xl",
                          index % 2 === 0 ? "md:pl-12 md:col-start-2" : "md:pr-12 md:col-start-1 md:text-right",
                        )}
                      >
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          width={800}
                          height={450}
                          className="h-full w-full object-cover cinematic-image"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-background/20 to-transparent" />
                      </div>
                    </div>
                  </FadeIn>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-16 sm:py-20 md:py-24">
        <DynamicBackground intensity={0.3} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        <div className="container relative z-10 px-4">
          <FadeIn className="mb-10 sm:mb-16 text-center">
            <TextReveal
              text="Meet Our Team"
              className="mb-3 sm:mb-4 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight dramatic-text"
            />
            <p className="mx-auto max-w-xs sm:max-w-md md:max-w-3xl text-base sm:text-lg text-muted-foreground">
              The talented individuals behind Dheeran cinematics
            </p>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <FadeIn key={index} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-colors duration-300 hover:bg-foreground/10 shadow-lg cinematic-hover"
                >
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={600}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 cinematic-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="mb-1 font-serif text-lg sm:text-xl font-bold">{member.name}</h3>
                    <p className="mb-2 text-xs sm:text-sm text-foreground/80">{member.role}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{member.bio}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
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
                Let's Create Something Beautiful Together
              </h2>
              <p className="mb-8 sm:mb-10 text-base sm:text-lg text-muted-foreground">
                Ready to bring your vision to life? Our team is excited to collaborate with you on your next project.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 cinematic-hover">
                    Start a Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-foreground/30 bg-background/10 text-foreground backdrop-blur-md hover:bg-foreground/10 cinematic-hover"
                  >
                    View Our Work
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
