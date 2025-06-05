
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Library", href: "/library" },
  { name: "Topics", href: "/topics" },
]

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/ProfoundTimes.png"
              alt="Profound Times Logo"
              width={30}
              height={30}
              className="h-8 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 bg-background border-t py-4 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-4 py-2 rounded text-sm font-medium transition-colors hover:bg-muted",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)} 
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

