import type React from "react"
import "@/app/globals.css"
import { Playfair_Display, Inter } from "next/font/google"

import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Texas Cinematography",
  description: "Capturing the soul of the Lone Star State through cinematic vision",
    generator: 'srujan'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SmoothScrollProvider>
            <SiteHeader />
            <main className="min-h-screen">{children}</main>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
