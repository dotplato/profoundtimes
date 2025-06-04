
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Category } from "@/lib/contentful"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const topicCount = category.fields.topics?.length || 0

  return (
    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
      <Link href={`/topics#${category.fields.name}`}>
        <CardHeader className="p-0">
          {category.fields.image && (
            <div className="relative h-48 w-full">
              <Image
                src={`https:${category.fields.image.fields.file.url}`}
                alt={category.fields.image.fields.title || category.fields.name}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1">{category.fields.name}</h3>
          <p className="text-muted-foreground text-sm">
            {topicCount} {topicCount === 1 ? "topic" : "topics"}
          </p>
        </CardContent>
      </Link>
    </Card>
  )
}

