import { notFound } from "next/navigation"
import { getArticleBySlug } from "@/lib/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  BLOCKS,
  INLINES,
  MARKS,
} from "@contentful/rich-text-types"
import  HeadingObserver from "@/components/heading-observer" // ✅ Import here

const generateId = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)
  if (!article) notFound()

  const headings: { id: string; text: string; level: string }[] = []
  const extractHeadings = (node: any) => {
    if (
      node.nodeType === BLOCKS.HEADING_1 ||
      node.nodeType === BLOCKS.HEADING_2 ||
      node.nodeType === BLOCKS.HEADING_3
    ) {
      const text = node.content[0]?.value || ""
      headings.push({ id: generateId(text), text, level: node.nodeType })
    }
    if (node.content) node.content.forEach(extractHeadings)
  }
  extractHeadings(article.fields.content)

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => (
        <strong className="font-semibold text-foreground">{text}</strong>
      ),
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
        <h1 id={generateId(node.content[0]?.value || "")} className="text-4xl font-bold mb-4">
          {children}
        </h1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
        <h2 id={generateId(node.content[0]?.value || "")} className="text-3xl font-semibold mt-6 mb-3">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
        <h3 id={generateId(node.content[0]?.value || "")} className="text-2xl font-semibold mt-6 mb-3">
          {children}
        </h3>
      ),
      [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
        <blockquote className="border-l-4 bg-amber-50 border-foreground-300 pl-4 italic text-gray-600 my-6">
          {children}
        </blockquote>
      ),
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
        <p className="text-lg leading-relaxed mb-4">{children}</p>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
        <ul className="list-disc list-outside pl-6 space-y-2">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
        <ol className="list-decimal list-outside pl-6 space-y-2">{children}</ol>
      ),
      [BLOCKS.HR]: () => <hr className="my-8 border-gray-300" />,
      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground-600 underline hover:text-accent-800"
        >
          {children}
        </a>
      ),
    },
  }

  return (
    <div className="container mx-auto py-8 max-w-8xl">
      <div className="flex flex-col lg:flex-row lg:justify-around gap-8">
        <aside className="lg:max-w-52 text-sm ">
          <nav className="sticky top-24 border-t pt-6 hidden lg:block">
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  className={`${
                    heading.level === BLOCKS.HEADING_1
                      ? "pl-0"
                      : heading.level === BLOCKS.HEADING_2
                      ? "pl-4"
                      : "pl-8"
                  }`}
                >
                  <a
                    href={`#${heading.id}`}
                    className="block text-foreground-600 hover:text-foreground-900 transition-colors duration-200 side-nav-link"
                    data-heading-id={heading.id}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="lg:w-4/6">
          <Card className="py-8 px-10 bg-background/40 backdrop-blur">
            <article>
              <header className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight mb-4">
                  {article.fields.title}
                </h1>
                <p className="text-md text-muted-foreground mb-6">
                  {article.fields.excerpt}
                </p>
                <div className="flex items-center gap-4 text-lg font-medium text-muted-foreground">
                  <span>{article.fields.author}</span>
                  <span>•</span>
                  <span>
                    {new Date(article.fields.publishDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </header>

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

              <div className="prose prose-xl text-foreground-100 max-w-none">
                {documentToReactComponents(article.fields.content, options)}
              </div>

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
          </Card>
        </div>
      </div>

      <HeadingObserver />
    </div>
  )
}

