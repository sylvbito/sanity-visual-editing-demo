import {getCliClient} from 'sanity/cli'

async function main() {
  const client = getCliClient({apiVersion: '2025-08-15'}).withConfig({useCdn: false})
  const page = await client.fetch<{_id: string; pageBuilder?: Array<{_type: string}>} | null>(
    '*[_type == "page" && slug.current == "home"][0]{_id, pageBuilder}',
  )

  if (!page) throw new Error('Could not find the home page')
  if (page.pageBuilder?.some((section) => section._type === 'featureGrid')) {
    console.log('Feature Grid already exists on the home page; no changes made.')
    return
  }

  await client
    .patch(page._id)
    .append('pageBuilder', [
      {
        _type: 'featureGrid',
        _key: 'feature-grid-demo',
        heading: 'A safer way to build pages',
        intro: 'A nested component system: editors can change content freely without dismantling the design.',
        columns: '3',
        theme: 'tint',
        spacingTop: 'regular',
        spacingBottom: 'regular',
        items: [
          {
            _type: 'featureCard',
            _key: 'feature-constraint',
            eyebrow: 'Constraints',
            heading: 'Only valid blocks',
            body: 'This grid accepts feature cards and nothing else. The design stays intact by construction.',
            visualMode: 'standard',
          },
          {
            _type: 'featureCard',
            _key: 'feature-defaults',
            eyebrow: 'Defaults',
            heading: 'Useful from the first click',
            body: 'New sections and cards arrive with real starter content instead of an empty void.',
            visualMode: 'standard',
          },
          {
            _type: 'featureCard',
            _key: 'feature-metric',
            eyebrow: 'Live editing',
            heading: 'Change it in context',
            metric: '3×',
            metricLabel: 'fewer ways to break the page',
            body: 'Drag cards or sections in Presentation and the content model follows cleanly.',
            visualMode: 'metric',
          },
        ],
      },
    ])
    .commit()

  console.log(`Added Feature Grid to ${page._id}.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
