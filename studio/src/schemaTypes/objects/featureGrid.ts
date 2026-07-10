import {defineField, defineType} from 'sanity'
import {ControlsIcon, DashboardIcon, ComposeSparklesIcon} from '@sanity/icons'

const spacingOptions = [
  {title: 'Tight', value: 'tight'},
  {title: 'Regular', value: 'regular'},
  {title: 'Roomy', value: 'roomy'},
]

export const featureGrid = defineType({
  name: 'featureGrid',
  title: 'Feature Grid',
  type: 'object',
  icon: DashboardIcon,
  groups: [
    {name: 'content', title: 'Content', icon: ComposeSparklesIcon, default: true},
    {name: 'layout', title: 'Layout', icon: ControlsIcon},
  ],
  initialValue: {
    heading: 'Everything your team needs',
    columns: '3',
    theme: 'light',
    items: [
      {_type: 'featureCard', eyebrow: 'First', heading: 'Start with clarity', body: 'A safe, opinionated default that is ready to edit.'},
      {_type: 'featureCard', eyebrow: 'Second', heading: 'Compose safely', body: 'Only approved feature cards can live inside this grid.'},
      {_type: 'featureCard', eyebrow: 'Third', heading: 'Keep it consistent', body: 'The layout stays intact even as content changes.'},
    ],
  },
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().max(90),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 2,
      group: 'content',
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: 'items',
      title: 'Cards',
      type: 'array',
      of: [{type: 'featureCard'}],
      group: 'content',
      validation: (Rule) => Rule.required().min(2).max(6),
      options: {
        insertMenu: {
          filter: true,
          views: [{name: 'grid'}],
        },
      },
      description: 'This grid accepts feature cards only. Drag cards here to reorder them.',
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
      name: 'columns',
      title: 'Columns',
      type: 'string',
      initialValue: '3',
      options: {
        list: [
          {title: 'Two columns', value: '2'},
          {title: 'Three columns', value: '3'},
        ],
        layout: 'radio',
      },
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
    select: {title: 'heading', count: 'items.length', theme: 'theme'},
    prepare({title, count, theme}) {
      return {
        title: title || 'Untitled feature grid',
        subtitle: `${count || 0} cards • ${theme || 'light'}`,
      }
    },
  },
})
