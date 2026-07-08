import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const navLink = defineType({
  name: 'navLink',
  title: 'Navigation Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isPrimary',
      title: 'Primary button style',
      type: 'boolean',
      initialValue: false,
      description: 'Show as a pill-style CTA button instead of a text link.',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      primary: 'isPrimary',
    },
    prepare({title, primary}) {
      return {
        title: title || 'Untitled link',
        subtitle: primary ? 'Primary CTA' : 'Text link',
      }
    },
  },
})
