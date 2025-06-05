
"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

interface SearchBoxProps {
  defaultValue?: string
}

export function SearchBox({ defaultValue = "" }: SearchBoxProps) {
  const [value, setValue] = useState(defaultValue)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value.trim()) {
        params.set("q", value)
      } else {
        params.delete("q")
      }
      router.push(`/library?${params.toString()}`)
    }, 500)

    return () => clearTimeout(delayDebounce)
  }, [value])

  return (
    <Input
      type="search"
      placeholder="Search articles..."
      className="w-full md:w-64"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

