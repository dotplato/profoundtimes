"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronDown, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArticleCard } from "@/components/article-card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import type { Category, Article } from "@/lib/contentful"

interface TopicsClientProps {
  categories: Category[]
  articles: Article[]
  selectedTopic?: string
}

export function TopicsClient({ categories, articles, selectedTopic }: TopicsClientProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleTopicClick = (topicSlug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("topic", topicSlug)
    router.push(`/topics?${params.toString()}`)
  }

  const clearFilter = () => {
    router.push("/topics")
  }

  // Filter articles by selected topic
  const filteredArticles = selectedTopic
    ? articles.filter((article) => article.fields.topics?.some((topic) => topic.fields.slug === selectedTopic))
    : []

  if (selectedTopic) {
    const selectedTopicName = categories
      .flatMap((cat) => cat.fields.topics || [])
      .find((topic) => topic.fields.slug === selectedTopic)?.fields.name

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">Articles for:</h2>
            <Badge variant="default" className="text-base px-3 py-1">
              {selectedTopicName}
            </Badge>
          </div>
          <Button variant="outline" size="sm" onClick={clearFilter}>
            <X className="h-4 w-4 mr-2" />
            Clear Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.sys.id} article={article} />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found for this topic.</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <Card id={category.fields.name} key={category.sys.id}>
          <CardContent className="p-0">
            <button
              onClick={() => toggleCategory(category.sys.id)}
              className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                {category.fields.image && (
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <Image
                      src={`https:${category.fields.image.fields.file.url}`}
                      alt={category.fields.image.fields.title || category.fields.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="text-left">
                  <h3 className="font-semibold text-lg">{category.fields.name}</h3>
                  <p className="text-muted-foreground text-sm">{category.fields.topics?.length || 0} topics</p>
                </div>
              </div>
              {expandedCategories.includes(category.sys.id) ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>

            {expandedCategories.includes(category.sys.id) && category.fields.topics && (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.fields.topics.map((topic) => (
                    <Button
                      key={topic.sys.id}
                      variant="outline"
                      className="justify-start h-auto p-3"
                      onClick={() => handleTopicClick(topic.fields.slug)}
                    >
                      <div className="text-left">
                        <div className="font-medium">{topic.fields.name}</div>
                        {topic.fields.description && (
                          <div className="text-xs text-muted-foreground mt-1">{topic.fields.description}</div>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
