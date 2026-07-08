import {type PortableTextBlock} from 'next-sanity'
import PortableText from '@/app/components/PortableText'
import {ExtractPageBuilderType} from '@/sanity/lib/types'
import {stegaClean} from '@sanity/client/stega'

type InfoProps = {
  block: ExtractPageBuilderType<'infoSection'>
  index: number
  pageId: string
  pageType: string
}

const spacingMap: Record<string, string> = {
  tight: 'py-8 lg:py-12',
  regular: 'py-16 lg:py-20',
  roomy: 'py-24 lg:py-32',
}

const measureMap: Record<string, string> = {
  compact: 'max-w-xl',
  comfortable: 'max-w-2xl',
  wide: 'max-w-4xl',
  auto: '',
}

const themeStyles: Record<string, string> = {
  light: 'bg-white text-gray-900',
  tint: 'bg-gray-50 text-gray-900',
  ink: 'bg-gray-950 text-white',
}

export default function InfoSection({block}: InfoProps) {
  const {
    heading,
    subheading,
    content = [],
    theme,
    textAlign,
    measure,
    showDivider,
    spacingTop = 'regular',
    spacingBottom = 'regular',
  } = block

  const t = stegaClean(theme) || 'light'
  const align = stegaClean(textAlign) || 'left'
  const maxW = measureMap[measure || 'comfortable'] || measureMap.comfortable
  const top = spacingMap[spacingTop] || spacingMap.regular
  const bottom = spacingMap[spacingBottom] || spacingMap.regular
  const divider = showDivider
  const bg = themeStyles[t] || themeStyles.light

  return (
    <section className={`${bg} ${top} ${bottom}`}>
      <div className="container">
        <div className={`${align === 'center' ? 'mx-auto text-center' : ''} ${maxW} ${align === 'center' ? '' : ''}`}>
          {subheading && (
            <span className={`block mb-2 text-sm uppercase font-mono tracking-tight ${t === 'ink' ? 'text-white/60' : 'text-gray-500'}`}>
              {subheading}
            </span>
          )}
          {heading && (
            <h2 className={`text-2xl md:text-3xl lg:text-4xl ${t === 'ink' ? 'text-white' : 'text-gray-900'}`}>
              {heading}
            </h2>
          )}
          <div className="mt-4">
            {content?.length > 0 && (
              <PortableText
                value={content as PortableTextBlock[]}
                className={`prose max-w-none ${t === 'ink' ? 'prose-invert text-white/90' : 'text-gray-700'}`}
              />
            )}
          </div>
        </div>
        {divider && (
          <div className={`mt-8 ${t === 'ink' ? 'border-white/10' : 'border-gray-100'} ${maxW}`}>
            <hr className="border-t" />
          </div>
        )}
      </div>
    </section>
  )
}
