"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DynamicBackground } from "@/components/dynamic-background"
import { FadeIn, ParallaxSection, TextReveal, ScrollProgress } from "@/components/scroll-effects"
import { cn } from "@/lib/utils"

// Service data
const services = [
  {
    id: "wedding",
    title: "Wedding Cinematography",
    description:
      "Capturing the emotion, beauty, and unique moments of your special day with a cinematic approach that creates timeless memories.",
    features: [
      "Full-day coverage with multiple cinematographers",
      "Drone aerial footage for stunning establishing shots",
      "Cinematic highlight film (5-10 minutes)",
      "Full ceremony and reception documentation",
      "Color grading and professional audio",
      "Digital delivery and optional physical media",
    ],
    image: "/images/wedding-moment.png",
  },
  {
    id: "commercial",
    title: "Commercial Photography",
    description:
      "Elevate your brand with stunning visuals that communicate your values, showcase your products, and connect with your audience.",
    features: [
      "Brand strategy consultation",
      "Professional studio or location shooting",
      "Product photography with styling",
      "Team and corporate portraits",
      "Post-production and retouching",
      "Full commercial usage rights",
    ],
    image: "/images/kaif-portrait.png",
  },
  {
    id: "documentary",
    title: "Documentary Projects",
    description:
      "Telling authentic stories through a cinematic lens, documenting cultural events, personal journeys, and historical moments.",
    features: [
      "In-depth pre-production planning",
      "Multiple shooting days with full crew",
      "Interview filming and direction",
      "Archival research and integration",
      "Professional editing and sound design",
      "Festival submission preparation",
    ],
    image: "/images/haldi-ceremony.png",
  },
  {
    id: "portrait",
    title: "Portrait Sessions",
    description:
      "Professional portrait photography that captures personality, emotion, and authentic moments in a cinematic style.",
    features: [
      "Pre-session consultation and styling advice",
      "Location scouting or studio setup",
      "2-3 hour shooting session",
      "Multiple outfit changes",
      "Professional retouching and editing",
      "Digital gallery and print options",
    ],
    image: "/images/yellow-portrait.png",
  },
  {
    id: "aerial",
    title: "Aerial Photography",
    description:
      "Breathtaking perspectives from above, revealing landscapes, architecture, and events from a whole new angle.",
    features: [
      "FAA-licensed drone operators",
      "4K and 6K aerial video capture",
      "High-resolution still photography",
      "Property and land surveys",
      "Custom flight paths and shot planning",
      "Post-production and color grading",
    ],
    image: "/images/mattu-beach.png",
  },
  {
    id: "events",
    title: "Event Coverage",
    description:
      "Comprehensive documentation of special events, from corporate gatherings to milestone celebrations, with a cinematic approach.",
    features: [
      "Multiple photographer coverage",
      "Candid and directed photography",
      "Event timeline planning",
      "VIP and speaker coverage",
      "Same-day preview images available",
      "Quick turnaround for social media",
    ],
    image: "/images/beach-couple.png",
  },
  {
    id: "food",
    title: "Food Photography",
    description:
      "Specialized culinary photography that showcases dishes in their most appetizing and visually stunning presentation.",
    features: [
      "Professional food styling and composition",
      "Custom lighting setups for each dish",
      "Menu and editorial photography",
      "Social media content creation",
      "Commercial and advertising shoots",
      "Same-day delivery options available",
    ],
    image: "/images/food-tiramisu-dome.jpeg",
  },
]

// Packages data
const packages = [
  {
    title: "Essential",
    description: "Perfect for individuals and small projects",
    price: "$500",
    features: [
      "Single location shoot",
      "2-3 hour session",
      "Professional editing",
      "10 digital images",
      "Online gallery",
      "1 revision round",
    ],
    popular: false,
  },
  {
    title: "Professional",
    description: "Ideal for businesses and special events",
    price: "$2,000",
    features: [
      "Multiple location shoots",
      "Full day coverage",
      "Advanced editing and color grading",
      "50+ digital images",
      "Online gallery with download",
      "3 revision rounds",
      "Social media optimized files",
      "Commercial usage rights",
    ],
    popular: true,
  },
  {
    title: "Premium",
    description: "Comprehensive solution for major projects",
    price: "$5,000+",
    features: [
      "Multi-day shooting schedule",
      "Full production team",
      "Director and cinematographer",
      "Custom shot list and storyboarding",
      "Drone and specialty equipment",
      "Unlimited digital assets",
      "Extensive post-production",
      "Full commercial rights",
      "Dedicated project manager",
    ],
    popular: false,
  },
]

export default function ServicesPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeService, setActiveService] = useState("wedding")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

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
              Our Services
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-foreground/80">
              Professional visual storytelling tailored to your creative vision, from weddings and portraits to
              commercial projects and documentaries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="relative py-16 sm:py-20 md:py-24">
        <DynamicBackground intensity={0.2} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="container relative z-10 px-4">
          <FadeIn className="mb-10 sm:mb-16 text-center">
            <TextReveal
              text="What We Offer"
              className="mb-3 sm:mb-4 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight dramatic-text"
            />
            <p className="mx-auto max-w-xs sm:max-w-md md:max-w-3xl text-base sm:text-lg text-muted-foreground">
              Explore our range of professional cinematography and photography services
            </p>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <FadeIn key={service.id} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-colors duration-300 hover:bg-foreground/10 shadow-lg cinematic-hover h-full flex flex-col"
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      width={800}
                      height={450}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 cinematic-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="mb-2 font-serif text-xl font-bold">{service.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground flex-grow">{service.description}</p>
                    <Link href={`/services#${service.id}`}>
                      <Button
                        variant="outline"
                        className="w-full border-foreground/30 text-foreground hover:bg-foreground/10"
                        onClick={() => setActiveService(service.id)}
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="relative py-16 sm:py-20 md:py-24">
        <DynamicBackground intensity={0.3} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        <div className="container relative z-10 px-4">
          <FadeIn className="mb-10 sm:mb-16 text-center">
            <TextReveal
              text="Service Details"
              className="mb-3 sm:mb-4 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight dramatic-text"
            />
            <p className="mx-auto max-w-xs sm:max-w-md md:max-w-3xl text-base sm:text-lg text-muted-foreground">
              In-depth information about our specialized services
            </p>
          </FadeIn>

          {/* Service tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {services.map((service) => (
              <Button
                key={service.id}
                variant={activeService === service.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveService(service.id)}
                className={cn(
                  "rounded-full",
                  activeService === service.id
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "border-foreground/20 bg-background/20 text-foreground hover:bg-foreground/10",
                )}
              >
                {service.title}
              </Button>
            ))}
          </div>

          {/* Active service details */}
          {services
            .filter((service) => service.id === activeService)
            .map((service) => (
              <div key={service.id} id={service.id}>
                <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
                  <ParallaxSection speed={0.2} direction="left">
                    <div className="relative aspect-video overflow-hidden rounded-xl shadow-2xl">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        width={800}
                        height={450}
                        className="h-full w-full object-cover cinematic-image"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                    </div>
                  </ParallaxSection>

                  <ParallaxSection speed={0.3} direction="right">
                    <h3 className="mb-2 font-serif text-2xl sm:text-3xl font-bold tracking-tight dramatic-text">
                      {service.title}
                    </h3>
                    <p className="mb-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-medium mb-2">What's Included:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="mr-2 h-5 w-5 text-foreground/60 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link href="/contact">
                        <Button className="bg-foreground text-background hover:bg-foreground/90 cinematic-hover">
                          Book This Service
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/portfolio">
                        <Button
                          variant="outline"
                          className="border-foreground/30 text-foreground hover:bg-foreground/10"
                        >
                          View Related Work
                        </Button>
                      </Link>
                    </div>
                  </ParallaxSection>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-16 sm:py-20 md:py-24">
        <DynamicBackground intensity={0.3} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        <div className="container relative z-10 px-4">
          <FadeIn className="mb-10 sm:mb-16 text-center">
            <TextReveal
              text="Our Process"
              className="mb-3 sm:mb-4 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight dramatic-text"
            />
            <p className="mx-auto max-w-xs sm:max-w-md md:max-w-3xl text-base sm:text-lg text-muted-foreground">
              How we work with you from concept to final delivery
            </p>
          </FadeIn>

          <div className="relative">
            {/* Process line */}
            <div className="absolute left-16 sm:left-24 top-0 bottom-0 w-px bg-foreground/10" />

            {/* Process steps */}
            <div className="space-y-12 sm:space-y-16">
              {[
                {
                  number: "01",
                  title: "Consultation",
                  description:
                    "We begin with an in-depth consultation to understand your vision, goals, and requirements. This helps us tailor our approach specifically to your project.",
                },
                {
                  number: "02",
                  title: "Planning & Preparation",
                  description:
                    "Our team develops a detailed plan including shot lists, location scouting, equipment preparation, and scheduling to ensure everything runs smoothly on shooting day.",
                },
                {
                  number: "03",
                  title: "Production",
                  description:
                    "During the shoot, our experienced team works efficiently to capture all necessary footage while maintaining a creative and adaptable approach to unexpected opportunities.",
                },
                {
                  number: "04",
                  title: "Post-Production",
                  description:
                    "Our editors and colorists work their magic, carefully selecting the best shots, applying color grading, and crafting the narrative flow to create a cohesive and impactful final product that exceeds your expectations.",
                },
                {
                  number: "05",
                  title: "Review & Refinement",
                  description:
                    "We present the initial edit for your feedback and make any necessary adjustments to ensure the final result perfectly aligns with your vision and goals.",
                },
                {
                  number: "06",
                  title: "Final Delivery",
                  description:
                    "Once approved, we deliver your project in all requested formats along with any additional assets, ensuring you have everything needed for your intended use.",
                },
              ].map((step, index) => (
                <FadeIn key={index} delay={index * 0.1} direction="right">
                  <div className="relative flex items-start">
                    {/* Step number */}
                    <div className="absolute left-0 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-foreground/5 border border-foreground/10 text-lg sm:text-xl font-bold z-10">
                      {step.number}
                    </div>
                    {/* Step content */}
                    <div className="ml-20 sm:ml-28">
                      <h3 className="mb-2 font-serif text-xl sm:text-2xl font-bold">{step.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 sm:py-20 md:py-24">
        <DynamicBackground intensity={0.2} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="container relative z-10 px-4">
          <FadeIn className="mb-10 sm:mb-16 text-center">
            <TextReveal
              text="Frequently Asked Questions"
              className="mb-3 sm:mb-4 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight dramatic-text"
            />
            <p className="mx-auto max-w-xs sm:max-w-md md:max-w-3xl text-base sm:text-lg text-muted-foreground">
              Answers to common questions about our services
            </p>
          </FadeIn>

          <div className="mx-auto max-w-3xl space-y-6">
            {[
              {
                question: "How far in advance should I book your services?",
                answer:
                  "For wedding and event photography, we recommend booking 6-12 months in advance to secure your date. Commercial projects typically require 4-8 weeks of lead time, while portrait sessions can often be accommodated within 2-3 weeks.",
              },
              {
                question: "Do you travel for projects?",
                answer:
                  "Yes, we are available for travel throughout Texas and beyond. Travel fees may apply depending on the location and duration of the project. We've worked on projects across the United States and internationally.",
              },
              {
                question: "What is your payment structure?",
                answer:
                  "We typically require a 50% deposit to secure your booking, with the remaining balance due upon project completion. For larger projects, we can arrange a custom payment schedule. We accept credit cards, bank transfers, and other payment methods.",
              },
              {
                question: "How long does it take to receive the final images?",
                answer:
                  "Delivery timelines vary by project type. Portrait sessions are typically delivered within 1-2 weeks, weddings within 4-6 weeks, and commercial projects within 2-4 weeks. Rush delivery is available for an additional fee.",
              },
              {
                question: "Do you provide raw files?",
                answer:
                  "We generally do not provide raw files as part of our standard packages. Our editing process is an essential part of our artistic vision and final product. However, we can discuss raw file delivery for commercial projects with appropriate licensing fees.",
              },
              {
                question: "What equipment do you use?",
                answer:
                  "We use professional-grade equipment including Canon and Sony camera systems, cinema-quality lenses, professional lighting, stabilization systems, and drones. Our gear is regularly updated to ensure the highest quality results.",
              },
            ].map((faq, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-foreground/10"
                >
                  <h3 className="mb-2 font-serif text-lg sm:text-xl font-bold">{faq.question}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{faq.answer}</p>
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
                Ready to Discuss Your Project?
              </h2>
              <p className="mb-8 sm:mb-10 text-base sm:text-lg text-muted-foreground">
                Contact us today to schedule a consultation and learn how we can bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 cinematic-hover">
                    Get in Touch
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
