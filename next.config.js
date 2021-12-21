module.exports = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001'],
  },
}
