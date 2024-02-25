const dotenv = require('dotenv');
dotenv.config();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */

const nextConfig = {
    cacheHandler: require.resolve('./cache-handler.js'),
    cacheMaxMemorySize: 0, // disable default in-memory caching
    output: process.env.BUILD_STANDALONE === "true" ? "standalone" : "standalone",
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
        HOSTNAME: process.env.HOSTNAME,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        GITHUB_ID: process.env.GITHUB_ID,
        GITHUB_SECRET: process.env.GITHUB_SECRET,
        MIDDLEWARE_URL: process.env.MIDDLEWARE_URL,
    },
}

module.exports = withBundleAnalyzer(nextConfig)