import { Suspense } from "react"
import { getArticles, getCategories } from "@/lib/contentful"
import { BannerSlider} from "@/components/BannerSlider"
import { ArticleCard } from "@/components/article-card"
import { CategoryCard } from "@/components/category-card"
import { Button } from "@/components/ui/button"
import { Separator} from "@/components/ui/separator"
import Link from "next/link"

export default async function HomePage() {
  const [articles, categories] = await Promise.all([
    getArticles(4), // Get only 4 articles for home page
    getCategories(),
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <BannerSlider/>
      {/* Library Section */}

<Separator className="mb-4"></Separator>
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold">Library</h2>
       </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Suspense fallback={<div>Loading articles...</div>}>
            {articles.map((article) => (
              <ArticleCard key={article.sys.id} article={article} />
            ))}
          </Suspense>
        </div>
<div className="flex justify-end mt-8">
  <Button asChild>
    <Link href="/library">Read More</Link>
  </Button>
</div>      </section>
<Separator className="mb-4"></Separator>
      <section>
        <h2 className="text-4xl font-bold mb-8">Curated Topics</h2>
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
