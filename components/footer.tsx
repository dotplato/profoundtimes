"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription logic here
    console.log("Subscribing email:", email)
    setEmail("")
  }

  return (
    <footer className="border-t justify-center bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="py-8  max-w-lg mx-auto">
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit">Subscribe</Button>
            </form>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; 2025 ProfoundTimes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
