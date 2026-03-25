import Link from 'next/link'
import { getPublicContent } from '@/lib/content/read'
import type { ContentFile } from '@/lib/content/read'

type ProjectFile = ContentFile & {
  data: ContentFile['data'] & {
    url?: string
    role?: string
    evidence?: string[]
    verification?: string[]
  }
}

export default function ProjectDemo() {
  const projects = getPublicContent('projects') as ProjectFile[]

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 px-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
        <p className="text-slate-500 dark:text-slate-400 mb-4">
          暂无项目展示
        </p>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          前往{' '}
          <Link
            href="/update"
            className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-500 underline"
          >
            内容管理
          </Link>{' '}
          添加项目
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-xl md:text-2xl">项目演示</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {projects.length} 个项目
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => {
          const formattedDate = new Date(project.data.date).toLocaleDateString('zh-cn', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })

          return (
            <article
              key={project.slug}
              className="border border-slate-200 dark:border-slate-700 rounded-lg p-5 bg-white dark:bg-slate-800/50 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                {/* Title + External Link */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100 flex-1">
                    {project.data.title}
                  </h3>
                  {project.data.url && (
                    <a
                      href={project.data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:text-orange-600 text-sm shrink-0 flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      项目
                    </a>
                  )}
                </div>

                {/* Description */}
                {project.data.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                    {project.data.description}
                  </p>
                )}

                {/* Role + Date */}
                <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                  {project.data.role && (
                    <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                      {project.data.role}
                    </span>
                  )}
                  <span>{formattedDate}</span>
                </div>

                {/* Tags */}
                {project.data.tags && project.data.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.data.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Evidence count indicator */}
                {(project.data.evidence?.length || 0) > 0 && (
                  <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 pt-1">
                    <span>✓</span>
                    <span>{project.data.evidence!.length} 项证明材料</span>
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
