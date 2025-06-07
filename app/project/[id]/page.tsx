"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Camera, Grid, Info, MapPin } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { DynamicBackground } from "@/components/dynamic-background"
import { FadeIn, ParallaxSection } from "@/components/scroll-effects"
import { Lightbox } from "@/components/lightbox"
import { cn } from "@/lib/utils"

// Project data with real images - same as in portfolio page
const allProjects = [
  {
    id: 1,
    title: "Wedding Stories",
    category: "Wedding",
    description: "Capturing the most beautiful moments of your special day",
    image: "/images/wedding-moment.png",
    featured: true,
    location: "Austin, Texas",
    date: "June 2023",
    equipment: "Sony Alpha, Canon EOS",
    detailedDescription:
      "This wedding photography collection captures the essence of love and celebration. From the intimate moments of preparation to the joyous reception, every photograph tells a story of the couple's special day. Using a combination of natural light and carefully positioned artificial lighting, we created a cinematic atmosphere that enhances the emotional impact of each image.",
    gallery: [
      { src: "/images/wedding-moment.png", alt: "Wedding ceremony", title: "The Ceremony" },
      { src: "/images/bride-closeup.png", alt: "Bride portrait", title: "Bridal Portrait" },
      { src: "/images/beach-couple.png", alt: "Beach couple", title: "Sunset Session" },
    ],
  },
  {
    id: 2,
    title: "Portrait Sessions",
    category: "Portrait",
    description: "Professional portraits that reveal your authentic self",
    image: "/images/white-dress.png",
    featured: true,
    location: "Houston, Texas",
    date: "May 2023",
    equipment: "Sony Alpha, Profoto Lighting",
    detailedDescription:
      "Our portrait sessions are designed to capture the essence of your personality. Using a combination of natural and studio lighting, we create images that are both flattering and authentic. Each session is tailored to the individual, ensuring that the final images reflect their unique character and style.",
    gallery: [
      { src: "/images/white-dress.png", alt: "White dress portrait", title: "Elegance in White" },
      { src: "/images/yellow-portrait.png", alt: "Yellow background portrait", title: "Vibrant Character" },
      { src: "/images/kaif-portrait.png", alt: "Urban portrait", title: "Urban Style" },
    ],
  },
  {
    id: 3,
    title: "Coastal Dreams",
    category: "Landscape",
    description: "Breathtaking views of coastal landscapes",
    image: "/images/mattu-beach.png",
    featured: true,
    location: "Galveston, Texas",
    date: "July 2023",
    equipment: "Canon EOS, Wide-angle Lenses",
    detailedDescription:
      "This landscape series captures the serene beauty of Texas coastal regions. From dramatic sunrises to peaceful sunsets, these images showcase the diverse moods of the shoreline. Using long exposures and careful composition, we've created images that convey both the power and tranquility of these natural environments.",
    gallery: [
      { src: "/images/mattu-beach.png", alt: "Beach landscape", title: "Coastal Sunrise" },
      { src: "/images/beach-couple.png", alt: "Beach couple", title: "Shoreline Romance" },
      { src: "/images/mattu-beach.png", alt: "Beach landscape sunset", title: "Golden Hour" },
    ],
  },
  {
    id: 4,
    title: "Cultural Ceremonies",
    category: "Documentary",
    description: "Authentic documentation of cultural traditions and ceremonies",
    image: "/images/haldi-ceremony.png",
    featured: true,
    location: "Dallas, Texas",
    date: "April 2023",
    equipment: "Sony Alpha, Nikon Z",
    detailedDescription:
      "This documentary series focuses on the rich cultural traditions of various communities in Texas. With a respectful and observant approach, we document ceremonies and celebrations that showcase cultural heritage. Our aim is to preserve these moments while highlighting the beauty and significance of these traditions.",
    gallery: [
      { src: "/images/haldi-ceremony.png", alt: "Haldi ceremony", title: "Haldi Celebration" },
      { src: "/images/wedding-moment.png", alt: "Cultural ceremony", title: "Traditional Moments" },
      { src: "/images/haldi-ceremony.png", alt: "Cultural celebration", title: "Festive Gathering" },
    ],
  },
  {
    id: 5,
    title: "Engagement Sessions",
    category: "Couples",
    description: "Romantic moments between couples in beautiful settings",
    image: "/images/beach-couple.png",
    featured: true,
    location: "San Antonio, Texas",
    date: "March 2023",
    equipment: "Canon EOS, Natural Light",
    detailedDescription:
      "Our engagement photography captures the unique connection between couples. Set in carefully selected locations that complement each couple's personality, these sessions create a visual narrative of their relationship. Using a mix of posed and candid approaches, we document genuine moments of affection and joy.",
    gallery: [
      { src: "/images/beach-couple.png", alt: "Beach couple", title: "Coastal Romance" },
      { src: "/images/beach-couple.png", alt: "Couple portrait", title: "Connected Hearts" },
      { src: "/images/beach-couple.png", alt: "Couple silhouette", title: "Sunset Silhouette" },
    ],
  },
  {
    id: 6,
    title: "Fashion Photography",
    category: "Fashion",
    description: "Stylish portraits that showcase personality and fashion",
    image: "/images/umbrella-portrait.png",
    featured: true,
    location: "Austin, Texas",
    date: "February 2023",
    equipment: "Sony Alpha, Studio Lighting",
    detailedDescription:
      "This fashion series blends artistic vision with commercial appeal. Working with designers and models, we create images that showcase clothing and accessories while telling a compelling visual story. Our approach emphasizes both the garments and the mood they evoke, resulting in photographs that are both stylish and emotionally resonant.",
    gallery: [
      { src: "/images/umbrella-portrait.png", alt: "Fashion portrait with umbrella", title: "Rainy Day Chic" },
      { src: "/images/yellow-portrait.png", alt: "Yellow background portrait", title: "Bold Contrast" },
      { src: "/images/white-dress.png", alt: "White dress portrait", title: "Minimalist Elegance" },
    ],
  },
  {
    id: 7,
    title: "Urban Exploration",
    category: "Urban",
    description: "Discovering the hidden beauty in city landscapes",
    image: "/images/kaif-portrait.png",
    featured: false,
    location: "Houston, Texas",
    date: "January 2023",
    equipment: "Nikon Z, Wide-angle Lenses",
    detailedDescription:
      "This urban photography series explores the architectural diversity and street life of Texas cities. From towering skyscrapers to hidden alleyways, these images reveal the character and energy of urban environments. Using a documentary approach with an artistic eye, we capture both the grandeur and intimate details of city spaces.",
    gallery: [
      { src: "/images/kaif-portrait.png", alt: "Urban portrait", title: "City Dweller" },
      { src: "/images/kaif-portrait.png", alt: "Urban landscape", title: "Concrete Jungle" },
      { src: "/images/kaif-portrait.png", alt: "Street photography", title: "Street Life" },
    ],
  },
  {
    id: 13, // This ID is out of sequence with 7 and 9, but present in your original list
    title: "Culinary Elegance",
    category: "Food",
    description: "Capturing the artistry of fine dining presentations",
    image: "/images/food-gourmet-salad.jpeg",
    featured: true,
    location: "Austin, Texas",
    date: "August 2023",
    equipment: "Canon EOS, Macro Lenses, Studio Lighting",
    detailedDescription:
      "This food photography series showcases the artistry of culinary creations from top restaurants in Texas. With careful attention to composition, lighting, and styling, we highlight the colors, textures, and details that make each dish special. Our approach emphasizes both aesthetic beauty and the appetizing quality of the food.",
    gallery: [
      { src: "/images/food-gourmet-salad.jpeg", alt: "Gourmet salad", title: "Garden Composition" },
      { src: "/images/food-risotto.jpeg", alt: "Risotto dish", title: "Creamy Risotto" },
      { src: "/images/food-appetizers.jpeg", alt: "Appetizer plate", title: "Starter Selection" },
    ],
  },
  {
    id: 14, // This ID is out of sequence, but present in your original list
    title: "Sweet Indulgence",
    category: "Food",
    description: "Showcasing desserts in their most tempting form",
    image: "/images/food-dessert-mango.jpeg",
    featured: true,
    location: "Dallas, Texas",
    date: "September 2023",
    equipment: "Sony Alpha, Macro Lenses, Controlled Lighting",
    detailedDescription:
      "This dessert photography series celebrates the art of pastry and confectionery. Each image is carefully composed to highlight the intricate details, vibrant colors, and tempting textures of these sweet creations. Using controlled lighting and styling, we create photographs that evoke desire and appreciation for these culinary masterpieces.",
    gallery: [
      { src: "/images/food-dessert-mango.jpeg", alt: "Mango dessert", title: "Tropical Delight" },
      { src: "/images/food-tiramisu-dome.jpeg", alt: "Tiramisu dome", title: "Coffee Infusion" },
      { src: "/images/food-dessert-mango.jpeg", alt: "Plated dessert", title: "Sweet Finale" },
    ],
  },
  {
    id: 9, // This ID is out of sequence, but present in your original list
    title: "Behind the Lens",
    category: "Documentary",
    description: "A look at the art and craft of photography",
    image: "/images/camera-hands.png",
    featured: false,
    location: "Austin, Texas",
    date: "October 2023",
    equipment: "Canon EOS, Prime Lenses",
    detailedDescription:
      "This documentary series explores the art and craft of photography itself. Through carefully composed images of photographers at work, their equipment, and the environments they operate in, we provide insight into the creative process. These images celebrate both the technical and artistic aspects of the photographic medium.",
    gallery: [
      { src: "/images/camera-hands.png", alt: "Hands holding camera", title: "The Tool of the Trade" },
      { src: "/images/camera-hands.png", alt: "Photography in action", title: "Capturing the Moment" },
      { src: "/images/camera-hands.png", alt: "Camera close-up", title: "Technical Precision" },
    ],
  },
  {
    id: 10, // This ID is out of sequence, but present in your original list
    title: "Vibrant Portraits",
    category: "Portrait",
    description: "Bold and colorful character studies",
    image: "/images/yellow-portrait.png",
    featured: false,
    location: "San Antonio, Texas",
    date: "November 2023",
    equipment: "Sony Alpha, Colored Gels, Studio Lighting",
    detailedDescription:
      "This portrait series uses bold colors and dramatic lighting to create striking character studies. Moving away from traditional portrait approaches, these images employ vibrant backgrounds and creative lighting techniques to reveal personality in unexpected ways. Each portrait is a collaboration between photographer and subject to create a unique visual statement.",
    gallery: [
      { src: "/images/yellow-portrait.png", alt: "Portrait with yellow background", title: "Golden Aura" },
      { src: "/images/yellow-portrait.png", alt: "Colorful portrait", title: "Vibrant Character" },
      { src: "/images/yellow-portrait.png", alt: "Studio portrait", title: "Bold Expression" },
    ],
  },
  {
    id: 11, // This ID is out of sequence, but present in your original list
    title: "Bridal Elegance",
    category: "Wedding",
    description: "Intimate portraits capturing bridal beauty",
    image: "/images/bride-closeup.png",
    featured: false,
    location: "Houston, Texas",
    date: "December 2023",
    equipment: "Canon EOS, Prime Lenses, Natural Light",
    detailedDescription:
      "This bridal portrait series focuses on capturing the elegance and emotion of brides on their special day. Using primarily natural light and minimal posing, these images aim to document authentic moments of joy, anticipation, and reflection. The photographs emphasize both the personal details of bridal styling and the emotional significance of the occasion.",
    gallery: [
      { src: "/images/bride-closeup.png", alt: "Bride close-up portrait", title: "Radiant Moment" },
      { src: "/images/bride-closeup.png", alt: "Bridal details", title: "Delicate Details" },
      { src: "/images/bride-closeup.png", alt: "Bride portrait", title: "Timeless Beauty" },
    ],
  },
  {
    id: 12, // This ID is out of sequence, but present in your original list
    title: "Appetizing Arrangements",
    category: "Food",
    description: "Artfully arranged appetizers and small plates",
    image: "/images/food-appetizers.jpeg",
    featured: false,
    location: "Dallas, Texas",
    date: "January 2024",
    equipment: "Nikon Z, Macro Lenses, Controlled Lighting",
    detailedDescription:
      "This food photography series focuses on the art of appetizers and small plates. Through careful composition and lighting, we highlight the colors, textures, and presentation of these culinary creations. The photographs emphasize both the individual components and the overall aesthetic appeal of these dishes, showcasing the chef's creativity and attention to detail.",
    gallery: [
      { src: "/images/food-appetizers.jpeg", alt: "Appetizer platter", title: "Starter Selection" },
      { src: "/images/food-appetizers.jpeg", alt: "Small plates", title: "Tasting Experience" },
      { src: "/images/food-appetizers.jpeg", alt: "Finger food", title: "Elegant Bites" },
    ],
  },
  // New Projects Start Here with updated IDs
  {
    id: 17, // UPDATED ID for Pre-wedding
    title: "Love's Prelude",
    category: "Pre-wedding",
    description: "Capturing the joyful anticipation before the big day.",
    image: "/images/prewedding-romantic-pose.png",
    featured: true,
    location: "Hill Country, Texas",
    date: "October 2024", // Assuming you want to keep future dates for new projects
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
    id: 18, // UPDATED ID for Street Portraits
    title: "Urban Narratives",
    category: "Street Portraits",
    description: "Candid and styled portraits capturing the soul of the streets.",
    image: "/images/street-portrait-artist.png",
    featured: true,
    location: "Downtown Austin, Texas",
    date: "November 2024",
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
    id: 19, // UPDATED ID for Engagements
    title: "The Proposal Journey",
    category: "Engagements",
    description: "Documenting the surprise, joy, and romance of proposals.",
    image: "/images/engagement-proposal-moment.png",
    featured: true,
    location: "Zilker Park, Austin",
    date: "December 2024",
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

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    // Find the project by ID
    const foundProject = allProjects.find((p) => p.id === Number.parseInt(params.id))
    setProject(foundProject)

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [params.id])

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Project Not Found</h1>
          <p className="mb-6 text-muted-foreground">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/portfolio">
            <Button>Back to Portfolio</Button>
          </Link>
        </div>
      </div>
    )
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
  }

  return (
    <div
      className={cn(
        "flex min-h-screen w-full flex-col transition-opacity duration-1000",
        isLoaded ? "opacity-100" : "opacity-0",
      )}
    >
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </div>
        <DynamicBackground intensity={0.2} />
        <div className="container relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Link
              href="/portfolio"
              className="mb-6 inline-flex items-center text-sm font-medium text-foreground/70 hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Link>
           
            <h1 className="mb-4 font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight dramatic-text">
              {project.title}
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-foreground/80">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="relative py-16 sm:py-20">
        <DynamicBackground intensity={0.2} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="container relative z-10 px-4">
          <div className="grid gap-12 md:grid-cols-3 md:gap-16 items-start">
            <div className="md:col-span-2">
              <FadeIn>
                <h2 className="mb-6 font-serif text-2xl sm:text-3xl font-bold tracking-tight dramatic-text">
                  About This Project
                </h2>
                <div className="prose prose-lg dark:prose-invert">
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    {project.detailedDescription}
                  </p>
                </div>
              </FadeIn>
            </div>

            <div>
              <FadeIn>
                <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm">
                  <h3 className="mb-4 text-xl font-bold">Project Details</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <MapPin className="mr-3 h-5 w-5 text-foreground/70" />
                      <div>
                        <span className="block text-sm font-medium">Location</span>
                        <span className="text-muted-foreground">{project.location}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Calendar className="mr-3 h-5 w-5 text-foreground/70" />
                      <div>
                        <span className="block text-sm font-medium">Date</span>
                        <span className="text-muted-foreground">{project.date}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Camera className="mr-3 h-5 w-5 text-foreground/70" />
                      <div>
                        <span className="block text-sm font-medium">Equipment</span>
                        <span className="text-muted-foreground">{project.equipment}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Info className="mr-3 h-5 w-5 text-foreground/70" />
                      <div>
                        <span className="block text-sm font-medium">Category</span>
                        <span className="text-muted-foreground">{project.category}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="relative py-16 sm:py-20">
        <DynamicBackground intensity={0.3} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        <div className="container relative z-10 px-4">
          <FadeIn className="mb-10 sm:mb-16 text-center">
            <h2 className="mb-4 font-serif text-2xl sm:text-3xl font-bold tracking-tight dramatic-text">
              Project Gallery
            </h2>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground">
              Explore the complete collection of images from this project
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {project.gallery.map((image: any, index: number) => (
              <ParallaxSection key={index} speed={0.1} direction={index % 2 === 0 ? "up" : "down"}>
                <div
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl cursor-pointer cinematic-hover"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 cinematic-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h3 className="text-lg sm:text-xl font-bold">{image.title}</h3>
                    <p className="text-sm text-foreground/80">{image.alt}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Grid className="h-10 w-10 text-foreground/90" />
                  </div>
                </div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative py-16 sm:py-20">
        <DynamicBackground intensity={0.3} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        <div className="container relative z-10 px-4 text-center">
          <FadeIn>
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-4 sm:mb-6 font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight dramatic-text">
                Interested in a Similar Project?
              </h2>
              <p className="mb-8 sm:mb-10 text-base sm:text-lg text-muted-foreground">
                Let's collaborate to create something amazing together. Contact us to discuss your vision.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 cinematic-hover">
                    Start a Project
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-foreground/30 bg-background/10 text-foreground backdrop-blur-md hover:bg-foreground/10 cinematic-hover"
                  >
                    Explore More Projects
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Lightbox */}
      {project.gallery && (
        <Lightbox
          images={project.gallery}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          initialIndex={lightboxIndex}
        />
      )}
    </div>
  )
}