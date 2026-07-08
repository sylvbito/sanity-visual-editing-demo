import {defineField, defineType} from 'sanity'
import type {Page} from '../../sanity.types'

import * as demo from '../../lib/initialValues'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  initialValue: {
    name: 'New page',
    heading: 'A new page',
    subheading: 'Add sections in the builder below.',
    pageBuilder: [],
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Page name',
      type: 'string',
      initialValue: 'Untitled',
      validation: (Rule) => Rule.required(),
      description: 'Used in the sidebar and page list.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      initialValue: {current: 'home'},
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'A controlled page builder, not a free-for-all.',
      description: 'Shorter headings work better. Think strong statement, not paragraph.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Sections',
      type: 'array',
      of: [
        {type: 'callToAction'},
        {type: 'infoSection'},
        {type: 'testimonial'},
      ],
      options: {
        insertMenu: {
          filter: true,
          views: [
            {name: 'grid', previewImageUrl: (schemaTypeName) => `/static/${schemaTypeName}.png`},
          ],
        },
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Untitled page',
        subtitle: subtitle ? `/${subtitle}` : '',
      }
    },
  },
})
