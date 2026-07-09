import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
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
