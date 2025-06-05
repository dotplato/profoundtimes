"use client"

import { Button } from "@/components/ui/button"

import Link from "next/link"
export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen  flex-col text-center px-4">
      <div className="text-6xl text-foreground animate-bounce-slow mb-4">
        (ಥ﹏ಥ)
      </div>
      <h1 className="text-xl text-foreground font-semibold">
        Oops! You got lost I think?
      </h1>
 <Button variant="secondary" asChild className="mt-4">
    <Link href="/library">Go Read > </Link>
  </Button>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>
    </div>
  );
}

