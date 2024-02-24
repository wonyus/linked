/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/u/**',
            },
        ],
    },
}

module.exports = nextConfig
