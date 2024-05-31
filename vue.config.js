const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // chainWebpack(config) {
  //   config.entry('main').add('babel-polyfill')
  // },
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('postcss-pxtorem')({
              rootValue: 75, // （Number | Function）表示根元素字体大小或根据input参数返回根元素字体大小。
              unitPrecision: 5, //  （Number）允许REM单位增加的十进制数字。
              propList: ['*'], // （Array）可以从px更改为rem的属性。
              // 值必须完全匹配。wid
              // 使用通配符*启用所有属性。例：['*']
              // *在单词的开头或结尾使用。（['*position*']将匹配background-position-y）
              // 使用!不匹配的属性。例：['*', '!letter-spacing']
              // 将“ not”前缀与其他前缀组合。例：['*', '!font*']

              replace: true, // Boolean）替换包含rems的规则。
              mediaQuery: false, // （Boolean）允许在媒体查询中转换px。
              minPixelValue: 0, // Number）设置要替换的最小像素值。
              exclude: /node_modules/i // （String, Regexp, Function）要忽略并保留为px的文件路径。
            })
          ]
        }
      }
    }
  },

})
