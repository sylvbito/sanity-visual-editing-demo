import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'

import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'
import {defaultDocumentNode} from './src/defaultDocumentNode'

export default defineConfig({
  name: 'sanity-visual-editing-demo',
  title: 'Visual Editing Demo',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    presentationTool({
      previewUrl: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
      resolve: {
        mainDocuments: [
          {
            route: '/',
            filter: `_type == "page" && slug.current == "home"`,
          },
          {
            route: '/:slug',
            filter: `_type == "page" && slug.current == $slug`,
          },
        ],
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
