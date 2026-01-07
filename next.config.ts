import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { webpack }) => {
    // 使用 IgnorePlugin 忽略 @mapbox/node-pre-gyp 中的 HTML 文件
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /@mapbox\/node-pre-gyp\/.*\.html$/,
      })
    );
    return config;
  },
  turbopack: {},
};

export default nextConfig;
