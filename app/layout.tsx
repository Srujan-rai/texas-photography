import type React from "react"
import "@/app/globals.css"
import { Playfair_Display, Inter } from "next/font/google"

import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap", // Optimize font loading
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Optimize font loading
})

export const metadata = {
  title: "Dheeran cinematics",
  description: "Capturing the soul of the Lone Star State through cinematic vision",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          <SmoothScrollProvider>
            <SiteHeader />
            <main className="min-h-screen">{children}</main>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
