import {defineField, defineType} from 'sanity'
import {LaunchIcon} from '@sanity/icons'

export const featureCard = defineType({
  name: 'featureCard',
  title: 'Feature card',
  type: 'object',
  icon: LaunchIcon,
  initialValue: {
    eyebrow: 'Feature',
    heading: 'A useful outcome',
    body: 'Explain the benefit in one concise sentence.',
    visualMode: 'standard',
  },
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required().max(72),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: 'visualMode',
      title: 'Card style',
      type: 'string',
      initialValue: 'standard',
      options: {
        list: [
          {title: 'Standard', value: 'standard'},
          {title: 'Image', value: 'image'},
          {title: 'Metric', value: 'metric'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.visualMode !== 'image',
    }),
    defineField({
      name: 'metric',
      title: 'Metric',
      type: 'string',
      description: 'For example: 42%, 3×, or 12 days.',
      hidden: ({parent}) => parent?.visualMode !== 'metric',
      validation: (Rule) => Rule.max(18),
    }),
    defineField({
      name: 'metricLabel',
      title: 'Metric label',
      type: 'string',
      hidden: ({parent}) => parent?.visualMode !== 'metric',
      validation: (Rule) => Rule.max(48),
    }),
    defineField({name: 'link', title: 'Optional link', type: 'link'}),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'visualMode', media: 'image'},
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled feature card',
        subtitle: subtitle ? `Feature card • ${subtitle}` : 'Feature card',
        media,
      }
    },
  },
})
