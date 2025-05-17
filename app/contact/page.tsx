import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Contact Us</h1>
        <p className="mx-auto max-w-3xl text-muted-foreground">
          Ready to capture your special moments? Get in touch to discuss your photography needs.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-bold">Get in Touch</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Phone className="mt-1 h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground">(512) 555-0123</p>
                <p className="text-sm text-muted-foreground">Available Monday-Friday, 9am-5pm CST</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="mt-1 h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">contact@texasphotography.com</p>
                <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-muted-foreground">Austin, Texas</p>
                <p className="text-sm text-muted-foreground">Available for travel throughout Texas</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="mb-4 text-2xl font-bold">Booking Information</h2>
            <p className="mb-4 text-muted-foreground">
              For booking inquiries, please include the following information in your message:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
              <li>Type of photography service needed</li>
              <li>Preferred date and time</li>
              <li>Location (if known)</li>
              <li>Any special requirements or ideas</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold">Send a Message</h2>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="first-name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  First Name
                </label>
                <input
                  id="first-name"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="last-name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Last Name
                </label>
                <input
                  id="last-name"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="john.doe@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="(123) 456-7890"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="service"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Service Interested In
              </label>
              <select
                id="service"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="">Select a service</option>
                <option value="portrait">Portrait Session</option>
                <option value="wedding">Wedding Photography</option>
                <option value="commercial">Commercial Project</option>
                <option value="event">Event Coverage</option>
                <option value="real-estate">Real Estate Photography</option>
                <option value="prints">Fine Art Prints</option>
              </select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Message
              </label>
              <textarea
                id="message"
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Tell us about your project..."
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
