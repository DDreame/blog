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

export default function ProofWall() {
  const projects = getPublicContent('projects') as ProjectFile[]

  const projectsWithEvidence = projects.filter((p) => {
    const hasEvidence = p.data.evidence && p.data.evidence.length > 0
    const hasVerification = p.data.verification && p.data.verification.length > 0
    return hasEvidence || hasVerification
  })

  if (projectsWithEvidence.length === 0) {
    return (
      <div className="text-center py-12 px-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
        <p className="text-slate-500 dark:text-slate-400 mb-4">
          暂无证明材料
        </p>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          前往{' '}
          <Link
            href="/update"
            className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-500 underline"
          >
            内容管理
          </Link>{' '}
          为项目添加证明材料
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-xl md:text-2xl">证明墙</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {projectsWithEvidence.length} 个项目
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectsWithEvidence.map((project) => (
          <article
            key={project.slug}
            className="border border-slate-200 dark:border-slate-700 rounded-lg p-5 bg-white dark:bg-slate-800/50"
          >
            {/* Project Title */}
            <div className="mb-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">
                  {project.data.title}
                </h3>
                {project.data.url && (
                  <a
                    href={project.data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-600 text-sm shrink-0"
                  >
                    查看项目 →
                  </a>
                )}
              </div>
              {project.data.description && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {project.data.description}
                </p>
              )}
              {project.data.role && (
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  角色：{project.data.role}
                </p>
              )}
            </div>

            {/* Evidence */}
            {project.data.evidence && project.data.evidence.length > 0 && (
              <div className="mb-3">
                <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                  证明材料
                </h4>
                <ul className="space-y-1">
                  {project.data.evidence.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"
                    >
                      <span className="text-green-500 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Verification */}
            {project.data.verification &&
              project.data.verification.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                    验证方式
                  </h4>
                  <ul className="space-y-1">
                    {project.data.verification.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"
                      >
                        <span className="text-blue-500 mt-0.5">◉</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </article>
        ))}
      </div>
    </div>
  )
}
