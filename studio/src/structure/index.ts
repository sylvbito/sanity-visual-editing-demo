import type {ListItemBuilder, StructureResolver} from 'sanity/structure'
import {DocumentsIcon, CogIcon, EarthGlobeIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .icon(DocumentsIcon)
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Navigation')
        .id('navigation')
        .schemaType('navigation')
        .icon(EarthGlobeIcon)
        .child(S.document().schemaType('navigation').documentId('navigation')),
      S.divider(),
      S.listItem()
        .title('Settings')
        .id('settings')
        .schemaType('settings')
        .icon(CogIcon)
        .child(S.document().schemaType('settings').documentId('settings')),
    ])
