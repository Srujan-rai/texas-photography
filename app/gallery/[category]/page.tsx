import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1)

  // This would be replaced with actual data in a real application
  const photos = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `${category} Photo ${i + 1}`,
    description: `Beautiful ${category.toLowerCase()} photo taken in Texas`,
    src: `/placeholder.svg?height=800&width=1200&text=${category}+${i + 1}`,
  }))

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-24">
      <div className="mb-8">
        <Link
          href="/gallery"
          className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Gallery
        </Link>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">{category} Photography</h1>
        <p className="max-w-3xl text-muted-foreground">
          Explore my collection of {category.toLowerCase()} photography from across Texas.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative overflow-hidden rounded-lg">
            <div className="aspect-[4/3] w-full">
              <Image
                src={photo.src || "/placeholder.svg"}
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
    </div>
  )
}
