import {PortableTextBlock} from 'next-sanity'
import ResolvedLink from '@/app/components/ResolvedLink'
import PortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
import {stegaClean} from '@sanity/client/stega'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

type CtaProps = {
  block: ExtractPageBuilderType<'callToAction'>
  index: number
  pageType: string
  pageId: string
}

const spacingMap: Record<string, string> = {
  tight: 'py-8 lg:py-12',
  regular: 'py-16 lg:py-20',
  roomy: 'py-24 lg:py-32',
  pageTop: 'pt-28 lg:pt-36',
}

const widthMap: Record<string, string> = {
  compact: 'max-w-xl',
  comfortable: 'max-w-2xl',
  wide: 'max-w-4xl',
}

const themeStyles: Record<string, {bg: string; text: string; pill: string; buttonBase: string}> = {
  light: {
    bg: 'bg-white',
    text: 'text-gray-900',
    pill: 'bg-gray-100 text-gray-600',
    buttonBase: 'bg-black text-white hover:bg-blue focus:bg-blue',
  },
  dark: {
    bg: 'bg-gray-950',
    text: 'text-white',
    pill: 'bg-white/10 text-white/70',
    buttonBase: 'bg-white text-black hover:bg-gray-200 focus:bg-gray-200',
  },
  accent: {
    bg: 'bg-brand text-white',
    text: 'text-white',
    pill: 'bg-white/20 text-white/90',
    buttonBase: 'bg-white text-brand hover:bg-white/90 focus:bg-white/90',
  },
}

function resolveButtonStyle(style: string | undefined, index: number): string {
  const cleaned = stegaClean(style) || 'auto'
  if (cleaned === 'primary') return 'primary'
  if (cleaned === 'secondary') return 'secondary'
  if (cleaned === 'ghost') return 'ghost'
  // auto: first is primary, second is secondary
  return index === 0 ? 'primary' : 'secondary'
}

export default function CTA({block}: CtaProps) {
  const {
    heading,
    eyebrow,
    body = [],
    buttons = [],
    image,
    theme,
    textAlign,
    contentWidth,
    visualMode,
    mediaLayout,
    overlayStrength = 52,
    spacingTop = 'regular',
    spacingBottom = 'regular',
  } = block

  const t = stegaClean(theme) || 'light'
  const align = stegaClean(textAlign) || 'left'
  const mode = stegaClean(visualMode) || 'inline'
  const mediaDir = stegaClean(mediaLayout) || 'textFirst'
  const styles = themeStyles[t] || themeStyles.light
  const top = spacingMap[spacingTop] || spacingMap.regular
  const bottom = spacingMap[spacingBottom] || spacingMap.regular
  const maxW = widthMap[contentWidth || 'comfortable'] || widthMap.comfortable
  const hasImage = Boolean(image?.asset?._ref)

  const contentBlock = (
    <div className={`${align === 'center' ? 'text-center mx-auto' : ''} ${maxW} flex flex-col gap-2`}>
      {eyebrow && (
        <span className={`text-sm uppercase font-mono tracking-tight ${styles.pill} inline-flex self-start px-3 py-1 rounded font-medium ${align === 'center' ? 'self-center' : ''}`}>
          {eyebrow}
        </span>
      )}
      {heading && (
        <h2 className={`text-2xl md:text-3xl lg:text-4xl ${styles.text}`}>{heading}</h2>
      )}
      {body && (
        <div className={align === 'center' ? 'text-center' : ''}>
          <PortableText
            value={body as PortableTextBlock[]}
            className={`prose max-w-none ${styles.text} ${t === 'dark' ? 'prose-invert' : ''}`}
          />
        </div>
      )}
      {buttons.length > 0 && (
        <div className={`flex gap-3 mt-2 ${align === 'center' ? 'justify-center' : ''}`}>
          {buttons.map((btn, i) => {
            const resolved = resolveButtonStyle(btn.style, i)
            const ghost = resolved === 'ghost'
            const secondary = resolved === 'secondary'
            const btnClass = ghost
              ? `border border-current ${styles.text} hover:opacity-70`
              : secondary
                ? `border ${t === 'dark' ? 'border-white/30 text-white hover:bg-white/10' : t === 'accent' ? 'border-white/40 text-white hover:bg-white/10' : 'border-gray-300 text-gray-900 hover:bg-gray-50'}`
                : styles.buttonBase
            return (
              <ResolvedLink
                key={btn._key || i}
                link={btn.link}
                className={`rounded-full flex gap-2 font-mono text-sm whitespace-nowrap items-center py-3 px-6 transition-colors duration-200 ${btnClass} ${ghost ? '' : 'font-medium'}`}
              >
                {btn.buttonText}
              </ResolvedLink>
            )
          })}
        </div>
      )}
    </div>
  )

  // Background image mode
  if (mode === 'background' && hasImage) {
    return (
      <section className={`relative ${top} ${bottom} ${styles.bg}`}>
        <Image
          id={image.asset!._ref}
          alt=""
          width={1440}
          mode="cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{backgroundColor: t === 'dark' ? `rgba(0,0,0,${overlayStrength / 100})` : `rgba(255,255,255,${overlayStrength / 100})`}}
        />
        <div className="container relative z-10 flex flex-col items-center justify-center">
          {contentBlock}
        </div>
      </section>
    )
  }

  // Inline image mode
  if (mode === 'inline' && hasImage) {
    return (
      <section className={`${styles.bg} ${top} ${bottom}`}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {mediaDir === 'imageFirst' && (
              <Image
                id={image.asset!._ref}
                alt=""
                width={704}
                crop={image.crop}
                mode="cover"
                className="rounded-sm w-full"
              />
            )}
            {mediaDir === 'imageFirst' ? (
              <div className="row-start-1 lg:row-start-auto">{contentBlock}</div>
            ) : (
              contentBlock
            )}
            {mediaDir === 'textFirst' && (
              <Image
                id={image.asset!._ref}
                alt=""
                width={704}
                crop={image.crop}
                mode="cover"
                className="rounded-sm w-full"
              />
            )}
          </div>
        </div>
      </section>
    )
  }

  // No image mode
  return (
    <section className={`${styles.bg} ${top} ${bottom}`}>
      <div className={`container flex flex-col ${align === 'center' ? 'items-center justify-center' : ''}`}>
        {contentBlock}
      </div>
    </section>
  )
}
