'use client'

import {SanityDocument} from 'next-sanity'
import {useOptimistic} from 'next-sanity/hooks'

import BlockRenderer from '@/app/components/BlockRenderer'
import {GetPageQueryResult} from '@/sanity.types'
import {dataAttr} from '@/sanity/lib/utils'
import {PageBuilderSection} from '@/sanity/lib/types'

type PageBuilderPageProps = {
  page: GetPageQueryResult
}

type PageData = {
  _id: string
  _type: string
  pageBuilder?: PageBuilderSection[]
}

/**
 * The PageBuilder component is used to render the blocks from the `pageBuilder` field in the Page type in your Sanity Studio.
 */

function RenderSections({
  pageBuilderSections,
  page,
}: {
  pageBuilderSections: PageBuilderSection[]
  page: GetPageQueryResult
}) {
  if (!page) {
    return null
  }
  return (
    <div
      data-sanity={dataAttr({
        id: page._id,
        type: page._type,
        path: `pageBuilder`,
      }).toString()}
    >
      {pageBuilderSections.map((block: PageBuilderSection, index: number) => (
        <BlockRenderer
          key={block._key}
          index={index}
          block={block}
          pageId={page._id}
          pageType={page._type}
        />
      ))}
    </div>
  )
}

function RenderEmptyState({page}: {page: GetPageQueryResult}) {
  if (!page) {
    return null
  }

  return (
    <div
      className="container mt-10"
      data-sanity={dataAttr({
        id: page._id,
        type: 'page',
        path: `pageBuilder`,
      }).toString()}
    >
      <div className="prose">
        <h2 className="">This page has no content!</h2>
        <p className="">Open the page in Sanity Studio to add content.</p>
      </div>
    </div>
  )
}

export default function PageBuilder({page}: PageBuilderPageProps) {
  const pageBuilderSections = useOptimistic<
    PageBuilderSection[] | undefined,
    SanityDocument<PageData>
  >(page?.pageBuilder || [], (currentSections, action) => {
    // The action contains updated document data from Sanity
    // when someone makes an edit in the Studio

    // If the edit was to a different document, ignore it
    if (action.id !== page?._id) {
      return currentSections
    }

    // The Presentation tool sends the changed section. The old reducer returned the
    // already-rendered section whenever its _key matched, which discarded every text
    // edit until a full browser refresh. Merge the incoming patch instead, retaining
    // any omitted fields/references from the current render.
    if (action.document.pageBuilder) {
      return action.document.pageBuilder.map((section) => {
        const currentSection = currentSections?.find((item) => item._key === section?._key)

        if (!currentSection) return section

        const currentItems = 'items' in currentSection ? currentSection.items : undefined
        const nextItems = 'items' in section ? section.items : undefined

        return {
          ...currentSection,
          ...section,
          ...(Array.isArray(nextItems)
            ? {
                items: nextItems.map((item) => {
                  const currentItem = currentItems?.find((existing) => existing._key === item._key)
                  return currentItem ? {...currentItem, ...item} : item
                }),
              }
            : {}),
        } as unknown as PageBuilderSection
      })
    }

    // Otherwise keep the current sections
    return currentSections
  })

  return pageBuilderSections && pageBuilderSections.length > 0 ? (
    <RenderSections pageBuilderSections={pageBuilderSections} page={page} />
  ) : (
    <RenderEmptyState page={page} />
  )
}
