/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['three'])
module.exports = withTM()

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
}


module.exports = nextConfig
