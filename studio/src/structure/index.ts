import type {ListItemBuilder, StructureResolver} from 'sanity/structure'
import {InfoOutlineIcon, DocumentsIcon, CogIcon} from '@sanity/icons'

/**
 * Structure builder — this controls the sidebar.
 * Pages and Settings. No blog clutter.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Pages group
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .icon(DocumentsIcon)
        .child(S.documentTypeList('page').title('Pages')),
      S.divider(),
      // Settings singleton
      S.listItem()
        .title('Settings')
        .id('settings')
        .schemaType('settings')
        .icon(CogIcon)
        .child(S.document().schemaType('settings').documentId('settings')),
    ])
