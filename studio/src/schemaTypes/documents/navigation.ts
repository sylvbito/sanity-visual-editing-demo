import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Site title',
      type: 'string',
      description: 'Shown in the header. Falls back to Settings → Title if empty.',
    }),
    defineField({
      name: 'links',
      title: 'Navigation links',
      type: 'array',
      of: [{type: 'navLink'}],
      validation: (Rule) => Rule.max(5),
      description: 'Max 5 links. This is a constraint on purpose — forces prioritisation.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Navigation'}
    },
  },
})
