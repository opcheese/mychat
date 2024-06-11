/** @type {import('next').NextConfig} */
module.exports = {
  publicRuntimeConfig: {
    API_URL: process.env.API_URL, // Expose this variable to the client side
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**'
      }
    ]
  }
}
