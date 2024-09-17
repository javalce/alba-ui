// @ts-check

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: isProd ? '/alba' : '',
};

module.exports = nextConfig;
