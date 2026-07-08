import 'server-only'

export const token = process.env.SANITY_API_READ_TOKEN || ''

if (!token) {
  console.warn('⚠️  SANITY_API_READ_TOKEN is not set. Running in read-only demo mode (no live preview or draft content).')
}
