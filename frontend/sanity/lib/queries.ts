import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

export const navigationQuery = defineQuery(`*[_type == "navigation"][0]{title, links[]{..., link{..., "page": page->slug.current, "post": post->slug.current}}}`)

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const buttonFields = /* groq */ `
  _type == "button" => {
    _key,
    _type,
    buttonText,
    style,
    link {
      ...,
      ${linkReference}
    }
  }
`

const pageBuilderFragments = /* groq */ `
  _type == "callToAction" => {
    ...,
    buttons[]{
      ${buttonFields}
    }
  },
  _type == "infoSection" => {
    ...,
    content[]{
      ...,
      markDefs[]{
        ...,
        ${linkReference}
      }
    }
  },
  _type == "testimonial" => {
    ...
  },
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ${pageBuilderFragments}
    },
  }
`)

export const getHomePageQuery = defineQuery(`
  *[_type == 'page' && slug.current == "home"][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ${pageBuilderFragments}
    },
  }
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)
