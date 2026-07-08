import PageBuilderPage from '@/app/components/PageBuilder'
import DemoPageBuilder from '@/app/components/DemoPageBuilder'
import {sanityFetch} from '@/sanity/lib/live'
import {getHomePageQuery} from '@/sanity/lib/queries'
import type {GetPageQueryResult} from '@/sanity.types'
import {demoPage} from '@/app/demo-data'

export default async function Page() {
  const [{data: page}] = await Promise.all([sanityFetch({query: getHomePageQuery})])

  // If Sanity has a home page, render it with live preview
  if (page?._id) {
    return (
      <div className="my-12 lg:my-24">
        <div className="container">
          <div className="pb-6 border-b border-gray-100">
            <div className="max-w-3xl">
              <h1 className="text-4xl text-gray-900 sm:text-5xl lg:text-7xl">{page.heading}</h1>
              {page.subheading && (
                <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
                  {page.subheading}
                </p>
              )}
            </div>
          </div>
        </div>
        <PageBuilderPage page={page as GetPageQueryResult} />
      </div>
    )
  }

  // Fall back to static demo — no Sanity project needed
  return (
    <div className="my-12 lg:my-24">
      <div className="container">
        <div className="pb-6 border-b border-gray-100">
          <div className="max-w-3xl">
            <h1 className="text-4xl text-gray-900 sm:text-5xl lg:text-7xl">{demoPage.heading}</h1>
            {demoPage.subheading && (
              <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
                {demoPage.subheading}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 container">
        <div className="bg-brand/10 border border-brand/30 rounded-lg px-6 py-3 text-sm font-mono text-gray-700">
          🔧 <strong>Static demo mode</strong> — no Sanity project connected. Connect a project to enable the CMS and live preview.
        </div>
      </div>
      <DemoPageBuilder page={demoPage} />
    </div>
  )
}
