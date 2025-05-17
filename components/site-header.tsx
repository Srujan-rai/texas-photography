"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()

  // Use CSS variables for theme-aware styling
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(var(--background-rgb), 0)", "rgba(var(--background-rgb), 0.8)"],
  )

  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(10px)"])
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Gallery", href: "/gallery" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <motion.header
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
      }}
      className="fixed top-0 z-50 w-full border-b border-border/[var(--border-opacity)]"
      initial={{ borderOpacity: 0 }}
      animate={{ borderOpacity: scrollY.get() > 50 ? 0.1 : 0 }}
    >
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <div className="relative h-10 w-40 sm:w-48 bg-black rounded-md overflow-hidden">
            <Image
              src="/images/texas-logo.png"
              alt="Texas Cinematography"
              fill
              className="object-contain mix-blend-screen"
              priority
            />
          </div>
        </Link>
        <nav className="hidden md:flex md:items-center md:space-x-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                pathname === item.href ? "text-foreground" : "text-foreground/80",
              )}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link href="/contact">
            <Button className="bg-foreground text-background hover:bg-foreground/90">Book Now</Button>
          </Link>
        </nav>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="border-foreground/20 bg-background/20 text-foreground backdrop-blur-sm"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-foreground/10 bg-background/95 backdrop-blur-md">
            <div className="flex flex-col space-y-6 pt-6">
              <div className="mx-auto relative h-10 w-40 bg-black rounded-md overflow-hidden">
                <Image
                  src="/images/texas-logo.png"
                  alt="Texas Cinematography"
                  fill
                  className="object-contain mix-blend-screen"
                />
              </div>
              <div className="mt-6">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "block py-3 text-lg font-medium transition-colors hover:text-foreground",
                      pathname === item.href ? "text-foreground" : "text-foreground/80",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-6 flex items-center space-x-4">
                  <ThemeToggle />
                  <Link href="/contact">
                    <Button
                      className="bg-foreground text-background hover:bg-foreground/90"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}
