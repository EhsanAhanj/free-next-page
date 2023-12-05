/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  scope: "/app",
});

const nextConfig = withPWA({
  output: "export",
});

module.exports = nextConfig;
