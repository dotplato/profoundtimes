import { notFound } from "next/navigation"
import { getArticleBySlug } from "@/lib/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article>
        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <Badge variant="secondary">{article.fields.category?.fields.name}</Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">{article.fields.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{article.fields.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>By {article.fields.author}</span>
            <span>•</span>
            <span>{new Date(article.fields.publishDate).toLocaleDateString()}</span>
          </div>
        </header>

        {/* Featured Image */}
        {article.fields.featuredImage && (
          <div className="mb-8">
            <Image
              src={`https:${article.fields.featuredImage.fields.file.url}`}
              alt={article.fields.featuredImage.fields.title || article.fields.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">{documentToReactComponents(article.fields.content)}</div>

        {/* Topics */}
        {article.fields.topics && article.fields.topics.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {article.fields.topics.map((topic) => (
                <Badge key={topic.sys.id} variant="outline">
                  {topic.fields.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
