
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"
import type { Article } from "@/lib/contentful"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="flex flex-row hover:shadow-lg transition-shadow overflow-hidden h-full">
      <Link href={`/article/${article.fields.slug}`} className="flex w-full">
        {article.fields.featuredImage && (
          <div className="relative min-w-[200px] w-[300px] h-auto">
            <Image
              src={`https:${article.fields.featuredImage.fields.file.url}`}
              alt={article.fields.featuredImage.fields.title || article.fields.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        )}
        <div className="flex flex-col justify-between p-4 flex-1">
          <CardHeader className="p-0">

            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.fields.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-3">{article.fields.excerpt}</p>
          </CardHeader>
          <CardFooter className="p-0 pt-4">
            <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{article.fields.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(article.fields.publishDate).toLocaleDateString()}</span>
              </div>
            </div>
          </CardFooter>
        </div>
      </Link>
    </Card>
  )
}

