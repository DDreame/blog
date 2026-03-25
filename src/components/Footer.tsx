import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} 莫向外求</p>
          <div className="flex items-center gap-4">
            <Link
              href="/update"
              className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              管理
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
