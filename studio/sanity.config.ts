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
      // The shared preview origin is injected by the deployment environment; localhost remains available for development.
      allowOrigins: [
        'http://localhost:*',
        ...(process.env.SANITY_STUDIO_PREVIEW_URL
          ? [process.env.SANITY_STUDIO_PREVIEW_URL]
          : []),
      ],
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
        previewMode: {
          enable: `${process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'}/api/draft-mode/enable`,
        },
      },
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
