import {person} from './documents/person'
import {page} from './documents/page'
import {navigation} from './documents/navigation'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {testimonial} from './objects/testimonial'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {navLink} from './objects/navLink'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'
import {featureCard} from './objects/featureCard'
import {featureGrid} from './objects/featureGrid'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/studio/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  navigation,
  post,
  person,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  infoSection,
  testimonial,
  callToAction,
  featureCard,
  featureGrid,
  link,
  navLink,
]
