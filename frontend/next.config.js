module.exports = {
  eslint: {
    dirs: ["pages", "src", "components", "__mocks__", "__tests__", "types"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false,
            dimensions: false,
          },
        },
      ],
    });

    return config;
  },
};
