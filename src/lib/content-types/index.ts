import { z } from 'zod'

// Base schemas
export const visibilitySchema = z.enum(['public', 'private'])
export const statusSchema = z.enum(['draft', 'published'])

export type Visibility = z.infer<typeof visibilitySchema>
export type Status = z.infer<typeof statusSchema>

// Provenance for tracking source of content
export const provenanceSchema = z.object({
  source: z.string().optional(),
  original_url: z.string().url().optional(),
  segment_id: z.string().optional(),
  published_at: z.string().optional(),
})

export type Provenance = z.infer<typeof provenanceSchema>

// Base content schema
const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  visibility: visibilitySchema.default('private'),
  status: statusSchema.default('draft'),
  tags: z.array(z.string()).optional(),
  provenance: provenanceSchema.optional(),
})

// Post-specific schema
export const postSchema = baseSchema.extend({
  summary: z.string().optional(),
})

export type Post = z.infer<typeof postSchema>

// Project-specific schema
export const projectSchema = baseSchema.extend({
  summary: z.string().optional(),
  demo_url: z.string().url().optional(),
  code_url: z.string().url().optional(),
  cover_image: z.string().optional(),
  role: z.string().optional(),
  evidence: z.array(z.string()).optional(),
  verification: z.array(z.string()).optional(),
})

export type Project = z.infer<typeof projectSchema>

// Thinking-specific schema
export const thinkingSchema = baseSchema.extend({
  problem: z.string().optional(),
  approach: z.string().optional(),
})

export type Thinking = z.infer<typeof thinkingSchema>

// Conversation-specific schema
export const conversationSchema = baseSchema.extend({
  participants: z.array(z.string()).optional(),
  transcript_url: z.string().url().optional(),
})

export type Conversation = z.infer<typeof conversationSchema>

// Union type for all content types
export const contentFileSchema = z.object({
  slug: z.string(),
  content: z.string(),
  data: z.union([postSchema, projectSchema, thinkingSchema, conversationSchema]),
})

export type ContentFile = z.infer<typeof contentFileSchema>

// Helper function to check if content is public and published
export function isPublicAndPublished(
  visibility: Visibility,
  status: Status
): boolean {
  return visibility === 'public' && status === 'published'
}

// Content type registry
export const contentTypes = ['posts', 'projects', 'thinking', 'conversations'] as const
export type ContentType = typeof contentTypes[number]