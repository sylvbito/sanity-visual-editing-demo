import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'
import type {Link} from '../../../sanity.types'

/**
 * Link schema object. This link object lets the user first select the type of link and then
 * then enter the URL, page reference, or post reference - depending on the type selected.
 * Learn more: https://www.sanity.io/docs/studio/object-type
 */

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      initialValue: 'url',
      options: {
        list: [
          {title: 'URL', value: 'href'},
          {title: 'Page', value: 'page'},
          {title: 'Post', value: 'post'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'href',
      description: 'Paste a full URL. You can leave this blank while building the section and finish it before launch.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as Link
          if (parent?.linkType === 'href' && !value) {
            return 'Add a URL before launch'
          }
          return true
        }).warning(),
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{type: 'page'}],
      hidden: ({parent}) => parent?.linkType !== 'page',
      description: 'Choose an existing page. You can leave this blank while building the section and finish it before launch.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as Link
          if (parent?.linkType === 'page' && !value) {
            return 'Choose a destination page before launch'
          }
          return true
        }).warning(),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{type: 'post'}],
      hidden: ({parent}) => parent?.linkType !== 'post',
      description: 'Choose an existing article. You can leave this blank while building the section and finish it before launch.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as Link
          if (parent?.linkType === 'post' && !value) {
            return 'Choose an article before launch'
          }
          return true
        }).warning(),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
