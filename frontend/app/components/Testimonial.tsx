import Image from '@/app/components/SanityImage'
import {stegaClean} from '@sanity/client/stega'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

type TestimonialProps = {
  block: ExtractPageBuilderType<'testimonial'>
  index: number
  pageType: string
  pageId: string
}

const spacingMap: Record<string, string> = {
  tight: 'py-8 lg:py-12',
  regular: 'py-16 lg:py-20',
  roomy: 'py-24 lg:py-32',
}

const themeStyles: Record<string, {bg: string; text: string; mute: string; quote: string}> = {
  light: {
    bg: 'bg-white',
    text: 'text-gray-900',
    mute: 'text-gray-500',
    quote: 'text-gray-700',
  },
  dark: {
    bg: 'bg-gray-950',
    text: 'text-white',
    mute: 'text-white/60',
    quote: 'text-white/80',
  },
  tint: {
    bg: 'bg-brand-50',
    text: 'text-gray-900',
    mute: 'text-gray-500',
    quote: 'text-gray-700',
  },
}

export default function Testimonial({block}: TestimonialProps) {
  const {
    quote,
    author,
    role,
    avatar,
    theme,
    textAlign,
    showDivider,
    spacingTop = 'regular',
    spacingBottom = 'regular',
  } = block

  const t = stegaClean(theme) || 'light'
  const align = stegaClean(textAlign) || 'left'
  const styles = themeStyles[t] || themeStyles.light
  const top = spacingMap[spacingTop] || spacingMap.regular
  const bottom = spacingMap[spacingBottom] || spacingMap.regular
  const isCenter = align === 'center'
  const avatarId = avatar?.asset?._ref

  return (
    <section className={`${styles.bg} ${top} ${bottom}`}>
      <div className={`container max-w-2xl ${isCenter ? 'text-center mx-auto' : ''}`}>
        <blockquote className={`text-xl md:text-2xl leading-relaxed font-light ${styles.quote}`}>
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className={`mt-6 flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}>
          {avatarId && (
            <Image
              id={avatarId}
              alt={author || ''}
              width={48}
              height={48}
              mode="cover"
              className="rounded-full shrink-0"
            />
          )}
          <div>
            <p className={`text-sm font-medium ${styles.text}`}>{author}</p>
            {role && <p className={`text-sm ${styles.mute}`}>{role}</p>}
          </div>
        </div>
        {showDivider && <hr className="mt-8 border-gray-200" />}
      </div>
    </section>
  )
}
