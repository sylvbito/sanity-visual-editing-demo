import {defineField, defineType} from 'sanity'
import {BlockquoteIcon, UserIcon, ComposeSparklesIcon, ControlsIcon} from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial / Quote',
  type: 'object',
  icon: BlockquoteIcon,
  groups: [
    {name: 'content', title: 'Content', icon: ComposeSparklesIcon, default: true},
    {name: 'layout', title: 'Layout', icon: ControlsIcon},
  ],
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(280),
      description: 'Keep it punchy. The schema enforces a tight character limit — editors can\'t write essays here.',
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Author name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'role',
      title: 'Role / title',
      type: 'string',
      description: 'Optional — shown below the author name.',
      group: 'content',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {hotspot: true},
      description: 'Square headshot. Crops to a circle.',
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
          {title: 'Dark', value: 'dark'},
          {title: 'Tint', value: 'tint'},
        ],
        layout: 'radio',
      },
      group: 'layout',
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
      name: 'showDivider',
      title: 'Show divider after',
      type: 'boolean',
      initialValue: false,
      group: 'layout',
    }),
    defineField({
      name: 'spacingTop',
      title: 'Top spacing',
      type: 'string',
      initialValue: 'regular',
      options: {
        list: [
          {title: 'Tight', value: 'tight'},
          {title: 'Regular', value: 'regular'},
          {title: 'Roomy', value: 'roomy'},
        ],
        layout: 'radio',
      },
      group: 'layout',
    }),
    defineField({
      name: 'spacingBottom',
      title: 'Bottom spacing',
      type: 'string',
      initialValue: 'regular',
      options: {
        list: [
          {title: 'Tight', value: 'tight'},
          {title: 'Regular', value: 'regular'},
          {title: 'Roomy', value: 'roomy'},
        ],
        layout: 'radio',
      },
      group: 'layout',
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'quote',
      media: 'avatar',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled testimonial',
        subtitle: subtitle ? (subtitle.length > 80 ? subtitle.slice(0, 80) + '…' : subtitle) : '',
        media: media || BlockquoteIcon,
      }
    },
  },
})
