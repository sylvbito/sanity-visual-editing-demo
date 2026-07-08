import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

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
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Kicker',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
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
      description: 'Use a named measure instead of manual max-width tweaking.',
    }),
    defineField({
      name: 'showDivider',
      title: 'Show divider',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'spacingTop',
      title: 'Top spacing',
      type: 'string',
      initialValue: 'regular',
      options: {list: spacingOptions, layout: 'radio'},
    }),
    defineField({
      name: 'spacingBottom',
      title: 'Bottom spacing',
      type: 'string',
      initialValue: 'regular',
      options: {list: spacingOptions, layout: 'radio'},
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
