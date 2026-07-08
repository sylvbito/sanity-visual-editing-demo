import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'button',
  type: 'object',
  title: 'Button',
  description: 'Action button used inside CTA sections',
  fields: [
    defineField({
      name: 'buttonText',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      initialValue: 'auto',
      options: {
        list: [
          {title: 'Auto', value: 'auto'},
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Ghost', value: 'ghost'},
        ],
        layout: 'radio',
      },
      description: 'Auto makes the first button primary and the second one secondary.',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      options: {collapsible: true, collapsed: false},
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'buttonText',
      style: 'style',
    },
    prepare({title, style}) {
      return {
        title: title || 'Untitled button',
        subtitle: style ? `Button • ${style}` : 'Button',
      }
    },
  },
  options: {collapsible: true},
})
