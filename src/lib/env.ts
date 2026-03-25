export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  contentDir: process.env.CONTENT_DIR || './content',
  adminKeyHash: process.env.ADMIN_KEY_HASH || '',
  sessionSecret: process.env.SESSION_SECRET || '',
  aiProviderApiKey: process.env.AI_PROVIDER_API_KEY || '',
} as const

export type Env = typeof env