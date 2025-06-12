
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
    ],
  },  async redirects() {
    return [
      {
        source: '/time-poverty-in-a-fast-world-reclaiming-life-through-the-slow-movement',
        destination: '/library/time-poverty-in-a-fast-world-reclaiming-life-through-the-slow-movement',
        permanent: true,
      },
      {
        source: '/effective-accelerationism-eacc-and-how-you-can-be-a-part-of-it',
        destination: '/library/effective-accelerationism-eacc-and-how-you-can-be-a-part-of-it',
        permanent: true,
      },
{
        source: '/from-conformity-to-curiosity-why-pakistan-must-embrace-philosophy',
        destination: '/library/from-conformity-to-curiosity-why-pakistan-must-embrace-philosophy',
        permanent: true,
      },

      {
        source: '/can-ai-achieve-human-morality',
        destination: '/library/can-ai-achieve-human-morality',
        permanent: true,
      },
          ]
  },
}

export default nextConfig

