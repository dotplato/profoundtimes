import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import { Analytics } from "@vercel/analytics/next"
export const metadata: Metadata = {
  title: "ProfoundTimes",
  description: "ProfoundTimes is the place where people write their minds and don't fear of consequences",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>        <div className="min-h-screen flex flex-col font-serif">
          <Header />
          <main className="flex-1">{children}</main>

        <Analytics/>
          <Footer />
        </div>
      </body>
    </html>
  )
}
