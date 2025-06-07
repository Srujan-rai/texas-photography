"use client"

import { useState } from "react"
import { Mail, MapPin, Phone, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { submitContactForm } from "../actions/contact-form"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setFormStatus(null)

    try {
      const result = await submitContactForm(formData)
      setFormStatus(result)

      // Reset form if successful
      if (result.success) {
        const form = document.getElementById("contact-form") as HTMLFormElement
        form?.reset()
      }
    } catch (error) {
      setFormStatus({
        success: false,
        message: "There was an error sending your message. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:px-6 md:py-24">
      <div className="mb-6 sm:mb-8 md:mb-12 text-center">
        <h1 className="mb-2 sm:mb-3 md:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          Start Your Project
        </h1>
        <p className="mx-auto max-w-3xl text-xs sm:text-sm md:text-base text-muted-foreground">
          Ready to capture your special moments? Get in touch to discuss your photography needs.
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-2">
        <div>
          <h2 className="mb-3 sm:mb-4 md:mb-6 text-lg sm:text-xl md:text-2xl font-bold">Get in Touch</h2>
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
              <Phone className="mt-1 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
              <div>
                <h3 className="text-sm md:text-base font-medium">Phone</h3>
                <p className="text-sm md:text-base text-muted-foreground">(512) 555-0123</p>
                <p className="text-xs md:text-sm text-muted-foreground">Available Monday-Friday, 9am-5pm CST</p>
              </div>
            </div>
            <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
              <Mail className="mt-1 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
              <div>
                <h3 className="text-sm md:text-base font-medium">Email</h3>
                <p className="text-sm md:text-base text-muted-foreground">contact@texasphotography.com</p>
                <p className="text-xs md:text-sm text-muted-foreground">We'll respond within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
              <MapPin className="mt-1 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
              <div>
                <h3 className="text-sm md:text-base font-medium">Location</h3>
                <p className="text-sm md:text-base text-muted-foreground">Austin, Texas</p>
                <p className="text-xs md:text-sm text-muted-foreground">Available for travel throughout Texas</p>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-6 md:mt-10">
            <h2 className="mb-2 sm:mb-3 md:mb-4 text-lg sm:text-xl md:text-2xl font-bold">Booking Information</h2>
            <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base text-muted-foreground">
              For booking inquiries, please include the following information in your message:
            </p>
            <ul className="ml-4 sm:ml-5 md:ml-6 list-disc space-y-1 md:space-y-2 text-xs sm:text-sm md:text-base text-muted-foreground">
              <li>Type of photography service needed</li>
              <li>Preferred date and time</li>
              <li>Location (if known)</li>
              <li>Any special requirements or ideas</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-3 sm:p-4 md:p-6 shadow-sm">
          <h2 className="mb-3 sm:mb-4 md:mb-6 text-lg sm:text-xl md:text-2xl font-bold">Send a Message</h2>

          {formStatus && (
            <div
              className={`mb-3 sm:mb-4 md:mb-6 p-2 sm:p-3 md:p-4 rounded-lg flex items-start gap-2 md:gap-3 text-xs sm:text-sm md:text-base ${
                formStatus.success
                  ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {formStatus.success ? (
                <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 mt-0.5" />
              )}
              <div>{formStatus.message}</div>
            </div>
          )}

          <form id="contact-form" action={handleSubmit} className="space-y-3 md:space-y-4">
            <div className="grid gap-3 md:gap-4 sm:grid-cols-2">
              <div className="space-y-1 md:space-y-2">
                <label
                  htmlFor="first-name"
                  className="text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  First Name
                </label>
                <input
                  id="first-name"
                  name="first-name"
                  className="flex h-8 sm:h-9 md:h-10 w-full rounded-md border border-input bg-background px-3 py-1 md:py-2 text-xs sm:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-1 md:space-y-2">
                <label
                  htmlFor="last-name"
                  className="text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="last-name"
                  className="flex h-8 sm:h-9 md:h-10 w-full rounded-md border border-input bg-background px-3 py-1 md:py-2 text-xs sm:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            <div className="space-y-1 md:space-y-2">
              <label
                htmlFor="email"
                className="text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="flex h-8 sm:h-9 md:h-10 w-full rounded-md border border-input bg-background px-3 py-1 md:py-2 text-xs sm:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="john.doe@example.com"
                required
              />
            </div>
            <div className="space-y-1 md:space-y-2">
              <label
                htmlFor="phone"
                className="text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="flex h-8 sm:h-9 md:h-10 w-full rounded-md border border-input bg-background px-3 py-1 md:py-2 text-xs sm:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="(123) 456-7890"
              />
            </div>
            <div className="space-y-1 md:space-y-2">
              <label
                htmlFor="service"
                className="text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Service Interested In
              </label>
              <select
                id="service"
                name="service"
                className="flex h-8 sm:h-9 md:h-10 w-full rounded-md border border-input bg-background px-3 py-1 md:py-2 text-xs sm:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="">Select a service</option>
                <option value="portrait">Portrait Session</option>
                <option value="wedding">Wedding Photography</option>
                <option value="commercial">Commercial Project</option>
                <option value="event">Event Coverage</option>
                <option value="real-estate">Real Estate Photography</option>
                <option value="food">Food Photography</option>
              </select>
            </div>
            <div className="space-y-1 md:space-y-2">
              <label
                htmlFor="message"
                className="text-xs md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="flex min-h-[80px] sm:min-h-[100px] md:min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-xs sm:text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Tell us about your project..."
                required
              />
            </div>
            <Button type="submit" className="w-full h-8 sm:h-9 md:h-10 text-xs sm:text-sm" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
