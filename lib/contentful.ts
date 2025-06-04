import { createClient } from "contentful"
import type { Document } from "@contentful/rich-text-types"

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

// Type definitions
export interface Asset {
  sys: {
    id: string
  }
  fields: {
    title: string
    file: {
      url: string
      details: {
        size: number
        image?: {
          width: number
          height: number
        }
      }
      fileName: string
      contentType: string
    }
  }
}

export interface Topic {
  sys: {
    id: string
  }
  fields: {
    name: string
    slug: string
    description?: string
  }
}

export interface Category {
  sys: {
    id: string
  }
  fields: {
    name: string
    slug: string
    description?: string
    image?: Asset
    topics?: Topic[]
  }
}

export interface Article {
  sys: {
    id: string
  }
  fields: {
    title: string
    slug: string
    excerpt: string
    content: Document
    author: string
    publishDate: string
    featuredImage?: Asset
    category?: Category
    topics?: Topic[]
  }
}

// Fetch functions
export async function getArticles(limit?: number): Promise<Article[]> {
  try {
    const response = await client.getEntries({
      content_type: "article",
      limit: limit || 100,
      order: "-fields.publishDate",
      include: 2,
    })

    return response.items as Article[]
  } catch (error) {
    console.error("Error fetching articles:", error)
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await client.getEntries({
      content_type: "article",
      "fields.slug": slug,
      include: 2,
    })

    return (response.items[0] as Article) || null
  } catch (error) {
    console.error("Error fetching article:", error)
    return null
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await client.getEntries({
      content_type: "category",
      include: 2,
    })

    return response.items as Category[]
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getTopics(): Promise<Topic[]> {
  try {
    const response = await client.getEntries({
      content_type: "topic",
    })

    return response.items as Topic[]
  } catch (error) {
    console.error("Error fetching topics:", error)
    return []
  }
}
