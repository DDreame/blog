import Link from 'next/link'

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/posts', label: '博客' },
  { href: '/projects', label: '项目' },
  { href: '/thinking', label: '思维' },
]

export default function Header() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="font-bold text-lg text-slate-800 dark:text-slate-100">
            莫向外求
          </Link>
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
