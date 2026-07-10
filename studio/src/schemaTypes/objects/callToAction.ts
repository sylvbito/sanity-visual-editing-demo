import {defineField, defineType} from 'sanity'
import {
  BulbOutlineIcon,
  ComposeSparklesIcon,
  LinkIcon,
  ImageIcon,
  ControlsIcon,
} from '@sanity/icons'
import {RangeSliderInput} from '../../components/RangeSliderInput'

const spacingOptions = [
  {title: 'Tight', value: 'tight'},
  {title: 'Regular', value: 'regular'},
  {title: 'Roomy', value: 'roomy'},
  {title: 'Page top', value: 'pageTop'},
]

export const callToAction = defineType({
  name: 'callToAction',
  title: 'Hero / CTA Section',
  type: 'object',
  icon: BulbOutlineIcon,
  initialValue: {
    eyebrow: 'New section',
    heading: 'A clear next step',
    visualMode: 'none',
    theme: 'light',
    buttons: [
      {
        _type: 'button',
        buttonText: 'Get started',
        style: 'auto',
        link: {_type: 'link', linkType: 'href', href: '#'},
      },
    ],
  },
  groups: [
    {name: 'content', title: 'Content', icon: ComposeSparklesIcon, default: true},
    {name: 'buttons', title: 'Buttons', icon: LinkIcon},
    {name: 'visuals', title: 'Visuals', icon: ImageIcon},
    {name: 'layout', title: 'Layout', icon: ControlsIcon},
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Shorter headings work better here. Think strong statement, not paragraph.',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContentTextOnly',
      group: 'content',
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [{type: 'button'}],
      validation: (Rule) => Rule.max(2),
      description: 'Keep this to one or two actions. The second button is styled automatically unless you override it.',
      group: 'buttons',
    }),
    defineField({
      name: 'visualMode',
      title: 'Visual mode',
      type: 'string',
      initialValue: 'inline',
      options: {
        list: [
          {title: 'No image', value: 'none'},
          {title: 'Inline image', value: 'inline'},
          {title: 'Background image', value: 'background'},
        ],
        layout: 'radio',
      },
      group: 'visuals',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.visualMode === 'none',
      group: 'visuals',
    }),
    defineField({
      name: 'mediaLayout',
      title: 'Content order',
      type: 'string',
      initialValue: 'textFirst',
      options: {
        list: [
          {title: 'Text then image', value: 'textFirst'},
          {title: 'Image then text', value: 'imageFirst'},
        ],
        layout: 'radio',
      },
      hidden: ({parent}) => parent?.visualMode !== 'inline' || !parent?.image?.asset,
      group: 'visuals',
    }),
    defineField({
      name: 'overlayStrength',
      title: 'Background overlay',
      type: 'number',
      initialValue: 52,
      validation: (Rule) => Rule.min(0).max(90),
      components: {input: RangeSliderInput},
      description: 'Only used when the image is acting as the section background.',
      hidden: ({parent}) => parent?.visualMode !== 'background' || !parent?.image?.asset,
      group: 'visuals',
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
          {title: 'Accent', value: 'accent'},
        ],
        layout: 'radio',
      },
      group: 'content',
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
      name: 'contentWidth',
      title: 'Content width',
      type: 'string',
      initialValue: 'comfortable',
      options: {
        list: [
          {title: 'Compact', value: 'compact'},
          {title: 'Comfortable', value: 'comfortable'},
          {title: 'Wide', value: 'wide'},
        ],
        layout: 'radio',
      },
      description: 'Approved text widths only. No random pixel values.',
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
      options: {
        list: spacingOptions.filter((option) => option.value !== 'pageTop'),
        layout: 'radio',
      },
      group: 'layout',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      image: 'image.asset',
      theme: 'theme',
    },
    prepare({title, image, theme}) {
      return {
        title: title || 'Untitled hero section',
        subtitle: `Hero / CTA • ${theme || 'light'}`,
        media: image || undefined,
      }
    },
  },
})
