const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081
  },
  configureWebpack: {
    optimization: {
      usedExports: false, // Disable tree shaking
    }
  }
});
