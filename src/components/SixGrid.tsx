import Link from 'next/link'
import { getPublicContent } from '@/lib/content/read'
import type { ContentFile } from '@/lib/content/read'

type ExtendedContentFile = ContentFile & {
  data: ContentFile['data'] & { url?: string; role?: string }
}

export default function SixGrid() {
  const posts = getPublicContent('posts') as ExtendedContentFile[]
  const projects = getPublicContent('projects') as ExtendedContentFile[]

  const featuredPosts = posts.slice(0, 3)
  const featuredProjects = projects.slice(0, 3)

  const gridItems = [
    ...featuredPosts.map((p) => ({
      type: 'post' as const,
      slug: p.slug,
      title: p.data.title,
      date: p.data.date,
      url: `/posts/${p.slug}`,
      description: p.data.description,
    })),
    ...featuredProjects.map((p) => ({
      type: 'project' as const,
      slug: p.slug,
      title: p.data.title,
      date: p.data.date,
      url: p.data.url ?? `/projects/${p.slug}`,
      description: p.data.description,
      isExternal: !!p.data.url,
    })),
  ]

  return (
    <section className="mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-xl md:text-2xl">精选内容</h2>
        <div className="flex gap-3 text-sm">
          <Link
            href="/posts"
            className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-500 font-medium transition-colors"
          >
            博客
          </Link>
          <span className="text-slate-400">/</span>
          <Link
            href="/projects"
            className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-500 font-medium transition-colors"
          >
            项目
          </Link>
        </div>
      </div>

      {gridItems.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gridItems.map((item) => {
            const card = (
              <CardContent
                key={`${item.type}-${item.slug}`}
                item={item}
              />
            )
            if (item.type === 'project' && item.isExternal) {
              return (
                <article
                  key={`${item.type}-${item.slug}`}
                  className="group relative border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 bg-white dark:bg-slate-800/50"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-5 h-full"
                  >
                    {card}
                  </a>
                </article>
              )
            }
            return (
              <article
                key={`${item.type}-${item.slug}`}
                className="group relative border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 bg-white dark:bg-slate-800/50"
              >
                <Link href={item.url} className="block p-5 h-full">
                  {card}
                </Link>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

function CardContent({
  item,
}: {
  item: {
    type: 'post' | 'project'
    title: string
    date: string
    description?: string
  }
}) {
  const formattedDate = new Date(item.date).toLocaleDateString('zh-cn', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <>
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
            item.type === 'post'
              ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
          }`}
        >
          {item.type === 'post' ? '文章' : '项目'}
        </span>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {formattedDate}
        </span>
      </div>

      <h3 className="font-semibold text-base md:text-lg mb-2 text-slate-800 dark:text-slate-100 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
        {item.title}
      </h3>

      {item.description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
          {item.description}
        </p>
      )}

      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg
          className="w-5 h-5 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-12 px-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
      <p className="text-slate-500 dark:text-slate-400 mb-4">
        暂无已发布内容
      </p>
      <p className="text-sm text-slate-400 dark:text-slate-500">
        前往{' '}
        <Link
          href="/update"
          className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-500 underline"
        >
          内容管理
        </Link>{' '}
        发布内容
      </p>
    </div>
  )
}