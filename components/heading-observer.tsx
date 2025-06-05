
"use client"

import { useEffect } from "react"

export default function HeadingObserver() {
  useEffect(() => {
    const headings = document.querySelectorAll("h1, h2, h3")
    const navLinks = document.querySelectorAll(".side-nav-link")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.remove("text-foreground-900", "font-semibold")
              if (link.getAttribute("data-heading-id") === entry.target.id) {
                link.classList.add("text-foreground-900", "font-semibold")
              }
            })
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    headings.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [])

  return null
}
