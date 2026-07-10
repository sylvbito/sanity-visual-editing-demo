import path from 'node:path'
import {fileURLToPath} from 'node:url'
import type {NextConfig} from 'next'

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const nextConfig: NextConfig = {
  allowedDevOrigins: ['*.trycloudflare.com'],
  turbopack: {
    root: workspaceRoot,
  },
  images: {
    remotePatterns: [new URL('https://cdn.sanity.io/**')],
  },
  async rewrites() {
    return [
      {
        source: '/studio',
        destination: 'http://localhost:3333/studio/',
      },
      {
        source: '/studio/',
        destination: 'http://localhost:3333/studio/',
      },
      {
        source: '/studio/:path*',
        destination: 'http://localhost:3333/studio/:path*',
      },
    ]
  },
}

export default nextConfig
