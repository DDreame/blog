import Link from 'next/link'
import { getPublicContent } from '@/lib/content/read'
import type { ContentFile } from '@/lib/content/read'

type ThinkingFile = ContentFile & {
  data: ContentFile['data'] & {
    problem?: string
    approach?: string
  }
}

export default function ThinkingWall() {
  const thoughts = getPublicContent('thinking') as ThinkingFile[]

  if (thoughts.length === 0) {
    return (
      <div className="text-center py-12 px-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
        <p className="text-slate-500 dark:text-slate-400 mb-4">
          暂无思维记录
        </p>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          前往{' '}
          <Link
            href="/update"
            className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-500 underline"
          >
            内容管理
          </Link>{' '}
          添加思维方式记录
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-xl md:text-2xl">思维方式</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {thoughts.length} 条记录
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {thoughts.map((thought) => {
          const formattedDate = new Date(thought.data.date).toLocaleDateString('zh-cn', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })

          return (
            <article
              key={thought.slug}
              className="border border-slate-200 dark:border-slate-700 rounded-lg p-5 bg-white dark:bg-slate-800/50 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* Title */}
                <h3 className="font-semibold text-base text-slate-800 dark:text-slate-100">
                  {thought.data.title}
                </h3>

                {/* Date */}
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {formattedDate}
                </p>

                {/* Description */}
                {thought.data.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                    {thought.data.description}
                  </p>
                )}

                {/* Problem / Approach */}
                {(thought.data.problem || thought.data.approach) && (
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                    {thought.data.problem && (
                      <div>
                        <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                          问题
                        </h4>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          {thought.data.problem}
                        </p>
                      </div>
                    )}
                    {thought.data.approach && (
                      <div>
                        <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                          方法
                        </h4>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          {thought.data.approach}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tags */}
                {thought.data.tags && thought.data.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {thought.data.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
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
