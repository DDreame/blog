import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { env } from '../../src/lib/env'
import {
  contentFileSchema,
  isPublicAndPublished,
  type ContentFile,
} from '../../src/lib/content-types'

const CONTENT_DIR = env.contentDir

export type { ContentFile }

/**
 * Get the full path to the content directory
 */
function getContentDir(): string {
  if (path.isAbsolute(CONTENT_DIR)) {
    return CONTENT_DIR
  }
  return path.join(process.cwd(), CONTENT_DIR)
}

/**
 * Read a single markdown file and parse its frontmatter.
 * Returns null if file doesn't exist or has invalid frontmatter.
 */
export function readContentFile(
  contentType: string,
  slug: string
): ContentFile | null {
  const filePath = path.join(getContentDir(), contentType, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    return contentFileSchema.parse({
      slug,
      content,
      data,
    })
  } catch (error) {
    console.warn(`Failed to parse content file: ${filePath}`, error)
    return null
  }
}

/**
 * Get all content files of a specific type.
 * Skips files that fail to parse.
 */
export function getAllContent(contentType: string): ContentFile[] {
  const dirPath = path.join(getContentDir(), contentType)

  if (!fs.existsSync(dirPath)) {
    return []
  }

  const files = fs.readdirSync(dirPath)
  const contentFiles: ContentFile[] = []

  for (const file of files) {
    if (!file.endsWith('.md')) continue

    const slug = file.replace(/\.md$/, '')
    const contentFile = readContentFile(contentType, slug)

    if (contentFile) {
      contentFiles.push(contentFile)
    }
  }

  return contentFiles.sort(
    (a, b) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  )
}

/**
 * Get only public and published content
 */
export function getPublicContent(contentType: string): ContentFile[] {
  return getAllContent(contentType).filter((file) =>
    isPublicAndPublished(file.data.visibility, file.data.status)
  )
}

/**
 * Get all content types with their files
 */
export function getAllContentByType(): Record<string, ContentFile[]> {
  const contentTypes = ['posts', 'projects', 'thinking', 'conversations', 'drafts']
  const result: Record<string, ContentFile[]> = {}

  for (const type of contentTypes) {
    result[type] = getAllContent(type)
  }

  return result
}
