// Static demo content — rendered when no Sanity CMS data exists.
// This lets you test the editing patterns before connecting a real project.

import type {GetPageQueryResult} from '@/sanity.types'

const paragraph = (text: string, key: string) => ({
  _key: key,
  _type: 'block' as const,
  children: [
    {
      _key: `${key}-span`,
      _type: 'span' as const,
      marks: [],
      text,
    },
  ],
  markDefs: [],
  style: 'normal',
})

export const demoPage: GetPageQueryResult = {
  _id: 'demo-home',
  _type: 'page',
  name: 'Home',
  slug: {current: 'home', _type: 'slug'},
  heading: 'A controlled page builder, not a free-for-all.',
  subheading: 'Edit structure in the Studio, keep the frontend deliberately bare.',
  pageBuilder: [
    {
      _key: 'hero-demo',
      _type: 'callToAction',
      eyebrow: 'Live preview demo',
      heading: 'Build fast, but keep the rules tight.',
      body: [
        paragraph(
          'This section shows the core pattern from the video: editors can change copy, layout, theme, spacing, and buttons without learning the implementation details underneath.',
          'hero-body-1',
        ),
      ],
      buttons: [
        {
          _key: 'hero-button-primary',
          _type: 'button',
          buttonText: 'Open the Studio',
          style: 'auto',
          link: {
            _type: 'link',
            linkType: 'href',
            href: 'http://localhost:3333',
            openInNewTab: true,
          },
        },
        {
          _key: 'hero-button-secondary',
          _type: 'button',
          buttonText: 'Visual editing docs',
          style: 'auto',
          link: {
            _type: 'link',
            linkType: 'href',
            href: 'https://www.sanity.io/docs/visual-editing/introduction-to-visual-editing',
            openInNewTab: true,
          },
        },
      ],
      theme: 'dark',
      textAlign: 'left',
      contentWidth: 'comfortable',
      spacingTop: 'pageTop',
      spacingBottom: 'roomy',
      visualMode: 'none',
    },
    {
      _key: 'principles-demo',
      _type: 'infoSection',
      heading: 'What this demo is proving',
      subheading: 'Constraint-driven authoring',
      content: [
        paragraph(
          'Themes, alignment, measure, spacing, and section order are controlled with a narrow set of options. That means cleaner content editing and fewer ways to wreck the layout.',
          'principles-body-1',
        ),
        paragraph(
          'Use Presentation to click directly into fields, drag sections around, and watch the preview update without digging through a messy schema tree.',
          'principles-body-2',
        ),
      ],
      theme: 'tint',
      textAlign: 'left',
      measure: 'comfortable',
      showDivider: true,
      spacingTop: 'regular',
      spacingBottom: 'regular',
    },
    {
      _key: 'notes-demo',
      _type: 'infoSection',
      heading: 'Suggested tests for tomorrow',
      subheading: 'Try to break it a bit',
      content: [
        paragraph(
          'Drag sections into a different order, switch the hero theme, duplicate a button, and flip the visual mode between none, inline, and background. The preview should stay coherent.',
          'notes-body-1',
        ),
        paragraph(
          'If a control feels too open-ended, tighten the schema rather than trusting editors to remember the design system. That is the whole point.',
          'notes-body-2',
        ),
      ],
      theme: 'ink',
      textAlign: 'left',
      measure: 'wide',
      showDivider: false,
      spacingTop: 'regular',
      spacingBottom: 'roomy',
    },
  ],
} as unknown as GetPageQueryResult
