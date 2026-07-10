import {defineField, defineType} from 'sanity'
import {
  TextIcon,
  ComposeSparklesIcon,
  ControlsIcon,
} from '@sanity/icons'

const spacingOptions = [
  {title: 'Tight', value: 'tight'},
  {title: 'Regular', value: 'regular'},
  {title: 'Roomy', value: 'roomy'},
]

export const infoSection = defineType({
  name: 'infoSection',
  title: 'Content Section',
  type: 'object',
  icon: TextIcon,
  groups: [
    {name: 'content', title: 'Content', icon: ComposeSparklesIcon, default: true},
    {name: 'layout', title: 'Layout', icon: ControlsIcon},
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'subheading',
      title: 'Kicker',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      initialValue: 'light',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Tint', value: 'tint'},
          {title: 'Ink', value: 'ink'},
        ],
        layout: 'radio',
      },
      group: 'content',
    }),
    defineField({
      name: 'showDivider',
      title: 'Show divider',
      type: 'boolean',
      initialValue: false,
      group: 'content',
    }),
    defineField({
      name: 'textAlign',
      title: 'Text alignment',
      type: 'string',
      initialValue: 'left',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
        ],
        layout: 'radio',
      },
      group: 'layout',
    }),
    defineField({
      name: 'measure',
      title: 'Reading width',
      type: 'string',
      initialValue: 'comfortable',
      options: {
        list: [
          {title: 'Compact', value: 'compact'},
          {title: 'Comfortable', value: 'comfortable'},
          {title: 'Wide', value: 'wide'},
          {title: 'Auto', value: 'auto'},
        ],
        layout: 'radio',
      },
      description: 'Named measure instead of manual max-width tweaking.',
      group: 'layout',
    }),
    defineField({
      name: 'spacingTop',
      title: 'Top spacing',
      type: 'string',
      initialValue: 'regular',
      options: {list: spacingOptions, layout: 'radio'},
      group: 'layout',
    }),
    defineField({
      name: 'spacingBottom',
      title: 'Bottom spacing',
      type: 'string',
      initialValue: 'regular',
      options: {list: spacingOptions, layout: 'radio'},
      group: 'layout',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
      theme: 'theme',
    },
    prepare({title, subtitle, theme}) {
      return {
        title: title || 'Untitled content section',
        subtitle: subtitle ? `${subtitle} • ${theme || 'light'}` : `Content Section • ${theme || 'light'}`,
      }
    },
  },
})
