import Link from 'next/link'
import {settingsQuery, navigationQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import ResolvedLink from '@/app/components/ResolvedLink'

export default async function Header() {
  const [{data: settings}, {data: nav}] = await Promise.all([
    sanityFetch({query: settingsQuery}),
    sanityFetch({query: navigationQuery}),
  ])

  const navLinks = nav?.links || []
  const headerStyle = settings?.headerStyle || 'minimal'
  const isBoxed = headerStyle === 'boxed'

  return (
    <header
      className={`fixed z-50 h-20 inset-0 flex items-center backdrop-blur-lg border-b ${
        isBoxed
          ? 'top-4 mx-4 rounded-2xl bg-white/90 shadow-sm border-gray-200'
          : 'bg-white/80 border-gray-100'
      }`}
    >
      <div className="container py-4 px-2 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2" href="/">
            <span className="text-lg font-semibold tracking-tight">
              {nav?.title || settings?.title || 'Visual Editing Demo'}
            </span>
          </Link>
          {navLinks.length > 0 ? (
            <nav className="flex items-center gap-3">
              {navLinks.map((link: any) =>
                link.isPrimary ? (
                  <ResolvedLink
                    key={link._key}
                    link={link.link}
                    className="bg-brand text-white rounded-full font-mono text-sm px-4 py-2 transition-colors hover:bg-brand-600"
                  >
                    {link.label}
                  </ResolvedLink>
                ) : (
                  <ResolvedLink
                    key={link._key}
                    link={link.link}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </ResolvedLink>
                ),
              )}
            </nav>
          ) : (
            <nav className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                Sanity CMS Demo
              </span>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
