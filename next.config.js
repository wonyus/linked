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
    env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        GITHUB_ID: process.env.GITHUB_ID,
        GITHUB_SECRET: process.env.GITHUB_SECRET,
        MIDDLEWARE_URL: process.env.MIDDLEWARE_URL,
    },
}

module.exports = nextConfig
