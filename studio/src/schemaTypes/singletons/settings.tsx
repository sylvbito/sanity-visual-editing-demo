import {defineField, defineType} from 'sanity'
import {CogIcon, ColorWheelIcon} from '@sanity/icons'

import * as demo from '../../lib/initialValues'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'theme', title: 'Theme', icon: ColorWheelIcon},
  ],
  fields: [
    defineField({
      name: 'title',
      description: 'Site title, used in the header and browser tab.',
      title: 'Title',
      type: 'string',
      initialValue: demo.title,
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'description',
      description: 'Shown on the home page when no other page is created.',
      title: 'Description',
      type: 'array',
      initialValue: demo.description,
      of: [
        defineField({
          name: 'block',
          type: 'block',
          styles: [],
          lists: [],
          marks: {decorators: [], annotations: []},
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {hotspot: true},
      group: 'content',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (Rule) =>
            Rule.custom((alt, context) => {
              const doc = context.document as any
              if (doc?.ogImage?.asset?._ref && !alt) return 'Required'
              return true
            }),
        }),
      ],
    }),
    defineField({
      name: 'colorPreset',
      title: 'Brand color',
      type: 'string',
      initialValue: 'teal',
      options: {
        list: [
          {title: 'Teal', value: 'teal'},
          {title: 'Purple', value: 'purple'},
          {title: 'Green', value: 'green'},
          {title: 'Orange', value: 'orange'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      description: 'Changes the accent color used across the site. A design token, not a free-form color picker.',
      group: 'theme',
    }),
    defineField({
      name: 'headerStyle',
      title: 'Header style',
      type: 'string',
      initialValue: 'minimal',
      options: {
        list: [
          {title: 'Minimal', value: 'minimal'},
          {title: 'Boxed', value: 'boxed'},
        ],
        layout: 'radio',
      },
      description: 'Global header presentation. Minimal = transparent; Boxed = pill container.',
      group: 'theme',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Settings'}
    },
  },
})
