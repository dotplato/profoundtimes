import { Suspense } from "react"
import { getCategories, getArticles } from "@/lib/contentful"
import { TopicsClient } from "@/components/topics-client"

export default async function TopicsPage({
  searchParams,
}: {
  searchParams: { topic?: string }
}) {
  const [categories, articles] = await Promise.all([getCategories(), getArticles()])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Topics</h1>
        <p className="text-xl text-muted-foreground">Curated list of all articles based on topics</p>
      </div>

      <Suspense fallback={<div>Loading topics...</div>}>
        <TopicsClient categories={categories} articles={articles} selectedTopic={searchParams.topic} />
      </Suspense>
    </div>
  )
}
