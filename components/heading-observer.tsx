
"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import clsx from "clsx"

export default function HeadingObserver() {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([])
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll("h1, h2, h3")).filter(
      (el) => el.id
    ) as HTMLElement[]

    const headingData = headingElements.map((el) => ({
      id: el.id,
      text: el.textContent || "",
    }))
    setHeadings(headingData)

    const navLinks = document.querySelectorAll(".side-nav-link")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setCurrentId(id)

            navLinks.forEach((link) => {
              link.classList.remove("text-foreground-900", "font-semibold")
              if (link.getAttribute("data-heading-id") === id) {
                link.classList.add("text-foreground-900", "font-semibold")
              }
            })
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    headingElements.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:lg:hidden">
      <div className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative w-full px-4 py-2 bg-background/40 backdrop-blur border border-border rounded-full shadow"
        >
          {headings.find((h) => h.id === currentId)?.text || "Jump to Section"}
          <ArrowRight className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </button>

        {isOpen && (
          <div className="absolute bottom-full mb-2 w-full max-h-64 overflow-y-auto bg-background border border-border rounded-xl shadow">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                data-heading-id={heading.id}
                className={clsx(
                  "block px-4 py-2 side-nav-link text-sm hover:bg-muted",
                  currentId === heading.id && "text-foreground-900 font-semibold"
                )}
                onClick={() => setIsOpen(false)}
              >
                {heading.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

