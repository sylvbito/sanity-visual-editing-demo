import {stegaClean} from '@sanity/client/stega'

import Image from '@/app/components/SanityImage'
import PortableLink from '@/app/components/ResolvedLink'
import {ExtractPageBuilderType} from '@/sanity/lib/types'
import {dataAttr} from '@/sanity/lib/utils'

type FeatureGridProps = {
  block: ExtractPageBuilderType<'featureGrid'>
  pageId: string
  pageType: string
}

const spacingMap: Record<string, string> = {
  tight: 'py-8 lg:py-12',
  regular: 'py-16 lg:py-20',
  roomy: 'py-24 lg:py-32',
}

const themes: Record<string, {section: string; card: string; eyebrow: string; text: string; muted: string}> = {
  light: {
    section: 'bg-white',
    card: 'bg-gray-50 border-gray-200',
    eyebrow: 'text-brand',
    text: 'text-gray-950',
    muted: 'text-gray-600',
  },
  tint: {
    section: 'bg-brand-50',
    card: 'bg-white border-brand-100',
    eyebrow: 'text-brand',
    text: 'text-gray-950',
    muted: 'text-gray-600',
  },
  ink: {
    section: 'bg-gray-950',
    card: 'bg-white/5 border-white/10',
    eyebrow: 'text-brand-200',
    text: 'text-white',
    muted: 'text-white/65',
  },
}

export default function FeatureGrid({block, pageId, pageType}: FeatureGridProps) {
  const theme = stegaClean(block.theme) || 'light'
  const columns = stegaClean(block.columns) || '3'
  const styles = themes[theme] || themes.light
  const items = block.items || []
  const gridColumns = columns === '2' ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'

  return (
    <section className={`${styles.section} ${spacingMap[block.spacingTop || 'regular']} ${spacingMap[block.spacingBottom || 'regular']}`}>
      <div className="container">
        <div className="max-w-2xl mb-10">
          <h2 className={`text-2xl md:text-3xl ${styles.text}`}>{block.heading}</h2>
          {block.intro && <p className={`mt-3 text-lg ${styles.muted}`}>{block.intro}</p>}
        </div>
        <div className={`grid gap-4 ${gridColumns}`}>
          {items.map((item) => {
            const mode = stegaClean(item.visualMode) || 'standard'
            const imageId = item.image?.asset?._ref
            const card = (
              <article className={`min-h-full border rounded-sm overflow-hidden p-6 flex flex-col ${styles.card}`}>
                {mode === 'image' && imageId && (
                  <Image alt="" className="w-full aspect-[4/3] object-cover -mt-6 -mx-6 mb-6 w-[calc(100%+3rem)]" id={imageId} mode="cover" width={560} />
                )}
                {mode === 'metric' && item.metric && (
                  <p className={`text-5xl font-medium tracking-tight mb-2 ${styles.text}`}>{item.metric}</p>
                )}
                {item.eyebrow && <p className={`font-mono text-xs uppercase tracking-wide ${styles.eyebrow}`}>{item.eyebrow}</p>}
                <h3 className={`text-xl mt-2 ${styles.text}`}>{item.heading}</h3>
                {mode === 'metric' && item.metricLabel && <p className={`text-sm mt-1 ${styles.muted}`}>{item.metricLabel}</p>}
                {item.body && <p className={`mt-3 ${styles.muted}`}>{item.body}</p>}
              </article>
            )
            return (
              <div
                data-sanity={dataAttr({
                  id: pageId,
                  type: pageType,
                  path: `pageBuilder[_key=="${block._key}"].items[_key=="${item._key}"]`,
                }).toString()}
                key={item._key}
              >
                {item.link ? (
                  <PortableLink className="block transition-transform hover:-translate-y-0.5" link={item.link}>{card}</PortableLink>
                ) : card}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
