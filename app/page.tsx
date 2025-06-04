import { Suspense } from "react"
import { getArticles, getCategories } from "@/lib/contentful"
import { ArticleCard } from "@/components/article-card"
import { CategoryCard } from "@/components/category-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function HomePage() {
  const [articles, categories] = await Promise.all([
    getArticles(4), // Get only 4 articles for home page
    getCategories(),
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Welcome to Our Article Hub</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover insightful articles, explore diverse topics, and expand your knowledge with our curated content
          library.
        </p>
      </section>

      {/* Library Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Latest Articles</h2>
          <Button asChild>
            <Link href="/library">Read More</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Suspense fallback={<div>Loading articles...</div>}>
            {articles.map((article) => (
              <ArticleCard key={article.sys.id} article={article} />
            ))}
          </Suspense>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Explore Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={<div>Loading categories...</div>}>
            {categories.map((category) => (
              <CategoryCard key={category.sys.id} category={category} />
            ))}
          </Suspense>
        </div>
      </section>
    </div>
  )
}
