/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  webpack(config, { webpack }) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.plugins.push(
      new webpack.DefinePlugin({
        "globalThis.__DEV__": false,
      })
    );
    return config;
  },
};

module.exports = nextConfig;
