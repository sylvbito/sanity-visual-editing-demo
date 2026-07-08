import type {DefaultDocumentNodeResolver} from 'sanity/structure'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  return S.document().views([S.view.form()])
}
