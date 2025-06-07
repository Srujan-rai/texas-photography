"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Full galleryImages array (ideally imported from a shared data file)
// This should be the same array used in your GalleryPage.tsx
const galleryImages = [
  { id: 1, title: "Wedding Moments", category: "Wedding", description: "Capturing the joy and emotion of the special day", image: "/images/wedding-moment.png", featured: true },
  { id: 2, title: "Bridal Portrait", category: "Wedding", description: "Elegant bridal portrait with natural light", image: "/images/bride-closeup.png", featured: false },
  { id: 3, title: "Beach Couple", category: "Couples", description: "Romantic couple portrait at sunset on the beach", image: "/images/beach-couple.png", featured: true },
  { id: 4, title: "Coastal Landscape", category: "Landscape", description: "Breathtaking coastal view at golden hour", image: "/images/mattu-beach.png", featured: true },
  { id: 5, title: "Cultural Ceremony", category: "Documentary", description: "Traditional cultural ceremony documentation", image: "/images/haldi-ceremony.png", featured: false },
  { id: 6, title: "Fashion Portrait", category: "Fashion", description: "Stylish portrait with umbrella", image: "/images/umbrella-portrait.png", featured: true },
  { id: 7, title: "Urban Portrait", category: "Portrait", description: "Dramatic portrait in urban setting", image: "/images/kaif-portrait.png", featured: false },
  { id: 8, title: "Colorful Portrait", category: "Portrait", description: "Vibrant portrait with yellow background", image: "/images/yellow-portrait.png", featured: false },
  { id: 9, title: "Wedding Dress", category: "Wedding", description: "Elegant white wedding dress portrait", image: "/images/white-dress.png", featured: true },
  { id: 10, title: "Behind the Camera", category: "Documentary", description: "The art of cinematography in action", image: "/images/camera-hands.png", featured: false },
  { id: 11, title: "Beach Wedding", category: "Wedding", description: "Romantic beach wedding ceremony", image: "/images/beach-couple.png", featured: false },
  { id: 12, title: "Traditional Celebration", category: "Documentary", description: "Documenting cultural traditions and celebrations", image: "/images/haldi-ceremony.png", featured: false },
  { id: 13, title: "Sunset Portrait", category: "Portrait", description: "Golden hour portrait with natural light", image: "/images/yellow-portrait.png", featured: false },
  { id: 14, title: "Fashion Editorial", category: "Fashion", description: "High-end fashion editorial photography", image: "/images/umbrella-portrait.png", featured: false },
  { id: 15, title: "Texas Landscape", category: "Landscape", description: "Stunning Texas landscape at dusk", image: "/images/mattu-beach.png", featured: false },
  { id: 16, title: "Engagement Session Photo", category: "Couples", description: "Romantic engagement photography session image", image: "/images/beach-couple.png", featured: false },
  { id: 17, title: "Wedding Details", category: "Wedding", description: "Capturing the beautiful details of the wedding day", image: "/images/bride-closeup.png", featured: false },
  { id: 18, title: "Cinematic Portrait", category: "Portrait", description: "Dramatic portrait with cinematic lighting", image: "/images/kaif-portrait.png", featured: true },
  { id: 19, title: "Coastal Sunset", category: "Landscape", description: "Beautiful coastal sunset landscape", image: "/images/mattu-beach.png", featured: false },
  { id: 20, title: "Love Story Frame", category: "Couples", description: "A single frame telling a love story", image: "/images/beach-couple.png", featured: false },
  { id: 21, title: "Fashion Story Image", category: "Fashion", description: "A key visual from a fashion story", image: "/images/umbrella-portrait.png", featured: false },
  { id: 22, title: "Documentary Still", category: "Documentary", description: "A still image from an ongoing documentary series", image: "/images/camera-hands.png", featured: false },
  { id: 23, title: "Wedding Ceremony Shot", category: "Wedding", description: "Beautiful moment captured from the wedding ceremony", image: "/images/wedding-moment.png", featured: false },
  { id: 24, title: "Portrait Session Image", category: "Portrait", description: "A highlight from a professional portrait photography session", image: "/images/yellow-portrait.png", featured: false },
  // New images (Pre-wedding, Street Portraits, Engagements)
  { id: 25, title: "Joyful Anticipation", category: "Pre-wedding", description: "Couple sharing a laugh during their pre-wedding shoot in a scenic park.", image: "/images/prewedding-park-laugh.png", featured: true },
  { id: 26, title: "Sunset Embrace", category: "Pre-wedding", description: "Romantic silhouette of a couple against a vibrant pre-wedding sunset.", image: "/images/prewedding-sunset-silhouette-new.png", featured: false },
  { id: 27, title: "Urban Musician", category: "Street Portraits", description: "Capturing the soulful performance of a musician on the city streets.", image: "/images/street-musician-portrait.png", featured: true },
  { id: 28, title: "Graffiti Backdrop Portrait", category: "Street Portraits", description: "A candid street portrait with colorful graffiti art in the background.", image: "/images/street-portrait-graffiti.png", featured: false },
  { id: 29, title: "The 'Yes!' Moment", category: "Engagements", description: "The raw emotion of a surprise marriage proposal captured.", image: "/images/engagement-proposal-reaction.png", featured: true },
  { id: 30, title: "Engagement Ring Detail", category: "Engagements", description: "Close-up artistic shot of the engagement ring.", image: "/images/engagement-ring-detail-shot.png", featured: false },
];

export default function CategoryPage({ params }: { params: { category: string } }) {
  // Format the category name from the param for display (e.g., "pre-wedding" -> "Pre-wedding")
  // This also handles single-word categories like "wedding" -> "Wedding"
  const displayCategoryName = params.category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Filter the actual gallery images based on the param
  // We compare the param (e.g., "pre-wedding") with the image.category transformed to a similar slug format
  const photos = galleryImages.filter((photo) => {
    const photoCategorySlug = photo.category.toLowerCase().replace(/\s+/g, '-');
    return photoCategorySlug === params.category;
  });

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-24">
      <div className="mb-8">
        <Link
          href="/gallery" // Assuming your main gallery page is at /gallery
          className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Gallery
        </Link>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">{displayCategoryName} Photography</h1>
        <p className="max-w-3xl text-muted-foreground">
          Explore my collection of {displayCategoryName.toLowerCase()} photography from across Texas.
        </p>
      </div>

      {photos.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative overflow-hidden rounded-lg">
              <div className="aspect-[4/3] w-full">
                <Image
                  src={photo.image || "/placeholder.svg"} // Changed from photo.src to photo.image
                  alt={photo.title}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{photo.title}</h3>
                <p className="text-sm text-muted-foreground">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">
            No photos found for the "{displayCategoryName}" category yet.
          </p>
        </div>
      )}
    </div>
  )
}