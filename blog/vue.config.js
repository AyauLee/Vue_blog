const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false, // 打包时不生成map文件，map文件用来上线后如果运行报错，准确输出哪一行那一列报错。
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    proxy: {
      '/web': { // 在发请求时，路径中带有/api这样的请求，代理服务器会工作，找下方地址的服务器要数据
        target: 'http://127.0.0.1:3007',
        pathRewrite: { '^web': '' },
      }
    }
  },
})
