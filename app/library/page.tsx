import { Suspense } from "react"
import { getArticles } from "@/lib/contentful"
import { ArticleCard } from "@/components/article-card"
import { SearchBox } from "@/components/search-box"
import { notFound } from "next/navigation"

import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer"
interface LibraryPageProps {
  searchParams: {
    q?: string
  }
}

export default async function LibraryPage({ searchParams }: LibraryPageProps) {
  const articles = await getArticles()

  const query = searchParams.q?.toLowerCase().trim() || ""

  const filteredArticles = query
    ? articles.filter((article) => {
        const title = article.fields.title?.toLowerCase() || ""
        const author = article.fields.author?.toLowerCase() || ""
  const content = article.fields.content
        ? documentToPlainTextString(article.fields.content).toLowerCase()
        : ""
        return (
          title.includes(query) ||
          author.includes(query) ||
          content.includes(query)
        )
      })
    : articles

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Library</h1>
          <p className="text-xl text-muted-foreground">Authors are writing good stuff here...</p>
        </div>
        <SearchBox defaultValue={query} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<div>Loading articles...</div>}>
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <ArticleCard key={article.sys.id} article={article} />
            ))
          ) : (
            <div className="col-span-full text-muted-foreground">No articles found.</div>
          )}
        </Suspense>
      </div>
    </div>
  )
}

