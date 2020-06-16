const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin// 打包文件分析，优化
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩资源
const CompressionWebpackPlugin = require('compression-webpack-plugin') // gzip压缩
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV) // 生产环境判断条件

module.exports = {
  publicPath: IS_PROD ? '/' : './', // 默认'/'，部署应用包时的基本 URL
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境的 source map
  transpileDependencies: [], // 使用babel单独转一些依赖
  // https://cli.vuejs.org/zh/guide/webpack.html#简单的配置方式
  configureWebpack: config => {
    if (IS_PROD) {
      const plugins = []

      plugins.push(
        new UglifyJsPlugin({
          test: [/\.(js|jsx)$/],
          exclude: [/node_modules/, /src\/components\/vendor/],
          uglifyOptions: {
            output: {
              comments: false
            },
            compress: {
              // warnings: false,
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      config.plugins = [...config.plugins, ...plugins]
    }
  },
  chainWebpack: config => { /// no found
    // 修复HMR
    config.resolve.symlinks(true)
    config.performance.set('hints', false)
    // 修复Lazy loading routes Error： Cyclic dependency  [https://github.com/vuejs/vue-cli/issues/1669]
    config.plugin('html').tap(args => {
      args[0].chunksSortMode = 'none'
      return args
    })
    // // 打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }// 测试环境下使用report打包分析环境
  },
  css: {
    requireModuleExtension: true,
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    hot: false,
    port: 1689,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        ws: true,
        target: 'http://192.168.110.208:30020',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/dt': { // 菜单的本地跨域接口
        ws: true,
        target: 'http://192.168.110.208:30017',
        changeOrigin: true,
        pathRewrite: {
          '^/dt': ''
        }
      },
      '/y': { // 业务类的本地跨域接口
        ws: true,
        // target: 'http://172.16.110.57:9527/supervision/v1',
        target: 'http://172.16.110.57:9527',
        changeOrigin: true,
        pathRewrite: {
          '^/y': ''
        }
      },
      '/cs': { // 测试
        ws: true,
        target: 'http://192.168.110.208:30017',
        changeOrigin: true,
        pathRewrite: {
          '^/cs': ''
        }
      }
    }
  }
}
