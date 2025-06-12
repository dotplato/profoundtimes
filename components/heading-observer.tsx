
"use client"

import { useRef, useState } from "react"
import clsx from "clsx"

import {ArrowRight} from "lucide-react"
export default function HeadingObserver() {
  const navRef = useRef<HTMLDivElement>(null)
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  function initObserver(container: HTMLDivElement | null) {
    if (!container || container.dataset.initialized === "true") return
    container.dataset.initialized = "true"

    const headings = document.querySelectorAll("h1, h2, h3")
    const navLinks = container.querySelectorAll(".side-nav-link")

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

    headings.forEach((heading) => observer.observe(heading))
  }

  // Create the floating nav (visible only on small screens)
  const headings = Array.from(document.querySelectorAll("h1, h2, h3")).map((el) => ({
    id: el.id,
    text: el.textContent || "",
  }))

  return (
    <div
      ref={(ref) => {
        navRef.current = ref
        initObserver(ref)
      }}
      className="fixed bottom-4 left-4 right-4 z-50 block md:lg:hidden"
    >
      <div className="relative">

<button
  onClick={() => setIsOpen((prev) => !prev)}
  className="relative w-full px-4 py-2 bg-background/40 backdrop-blur border border-border rounded-full shadow"
>
  {headings.find((h) => h.id === currentId)?.text || "Jump to Section"}

  <ArrowRight className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
</button>
       {isOpen && (
          <div className="absolute bottom-full mb-2 w-full max-h-64 overflow-y-auto bg-background border border-border rounded-lg shadow">
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
                {heading.text}               </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

