import Link from 'next/link'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

export default async function Header() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <header className="fixed z-50 h-20 inset-0 bg-white/80 flex items-center backdrop-blur-lg border-b border-gray-100">
      <div className="container py-4 px-2 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2" href="/">
            <span className="text-lg font-semibold tracking-tight">
              {settings?.title || 'Visual Editing Demo'}
            </span>
          </Link>
          <nav className="flex items-center gap-3">
            <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
              Sanity CMS Demo
            </span>
          </nav>
        </div>
      </div>
    </header>
  )
}
