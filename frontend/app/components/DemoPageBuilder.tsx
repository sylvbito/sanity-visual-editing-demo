'use client'

import BlockRenderer from '@/app/components/BlockRenderer'
import {PageBuilderSection} from '@/sanity/lib/types'

type DemoPageBuilderProps = {
  page: {
    _id: string
    _type: string
    pageBuilder?: PageBuilderSection[]
  }
}

export default function DemoPageBuilder({page}: DemoPageBuilderProps) {
  if (!page?.pageBuilder?.length) return null

  return (
    <div>
      {page.pageBuilder.map((block: PageBuilderSection, index: number) => (
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
