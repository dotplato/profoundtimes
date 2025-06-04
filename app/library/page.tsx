import { Suspense } from "react"
import { getArticles } from "@/lib/contentful"
import { ArticleCard } from "@/components/article-card"

export default async function LibraryPage() {
  const articles = await getArticles()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Article Library</h1>
        <p className="text-xl text-muted-foreground">Browse our complete collection of articles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<div>Loading articles...</div>}>
          {articles.map((article) => (
            <ArticleCard key={article.sys.id} article={article} />
          ))}
        </Suspense>
      </div>
    </div>
  )
}
