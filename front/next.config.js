/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['three'])
module.exports = withTM()

const nextConfig = {
  api: {
    bodyParser: false
  },
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
}


module.exports = nextConfig
