# AIO-H5
> A Vue.js project for AIO

## 介绍

    聚点商城信公众号项目

### 说明
　　聚点商城微信公众号
　　git:  XX

### 相关技术：

	1. vuejs(2.3.3)：一套构建用户界面的渐进式框架，易用、灵活、高效。
    2. ui: vant  https://youzan.github.io/vant/#/zh-CN/tabbar
	3. vue-router(2.7.0)：官方的路由组件，配合vue.js创建单页应用（SPA）非常简单。
	4. axios(2.6.0): 基于 Promise 的 HTTP 请求客户端，可同时在浏览器和 node.js 中使用。
	5. webpack,项目模板
    6.postcss-pxtorem:px转rem 插件会转化所有的样式的px(比例1:1)。注意引入了三方UI，也会被转化。可以使用selectorBlackList字段来过滤。
如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。

### 相关技术文档地址

	1. vuejs: https://cn.vuejs.org/
	2. vant:  https://youzan.github.io/vant/#/zh-CN/tabbar
	3. vue-router: https://router.vuejs.org/zh-cn/
	4. axios: https://www.npmjs.com/package/axios,https://www.kancloud.cn/yunye/axios/234845
	5. mock.js: http://mockjs.com/
	6. webpack: http://www.css88.com/doc/webpack2/guides/development/
	7. localStorage: https://developer.mozilla.org/zh-CN/docs/Web/Guide/API/DOM/Storage,http://www.jianshu.com/p/fb758398268a
	8. es6: http://es6.ruanyifeng.com/

    项目使用的js语法是es6,比如箭头函数等,不懂的可以看es6的语法文档

    vue 开源项目插件库汇总
    https://segmentfault.com/p/1210000008583242/read?from=timeline

### 项目目录结构
    ├── build                      // 构建相关
    ├── config                     // 配置相关
    ├── src                        // 源代码
    │   ├── assets                 // 主题 字体 样式等静态资源
    │   ├── components             // 公共组件
    │   ├── router                 // 路由
    │   ├── utils                  // 全局公用方法
    │   ├── views                  // vue文件页面目录
    |   |   ├──Home                //首页       
    │   ├── App.vue                // 入口页面
    │   └── main.js                // 入口 加载组件 初始化等
    ├── static                     // 第三方不打包资源
    ├── .babelrc                   // babel-loader 配置
    ├── favicon.ico                // favicon图标
    ├── index.html                 // html模板
    └── package.json               // 依赖配置文件package.json

## Build Setup

``` bash
# 安装依赖
npm install
// or
npm install --registry=https://registry.npm.taobao.org

# 本地开发,开启服务
## 三种模式启动,任意选择一种
## 连接开发服务器
npm run dev dev
## 连接生产服务器
npm run dev prod
## 连接测试服务器
npm run dev test


# 打包发布项目,最终的打包文件在/dist
## 打包发布测试
npm run build dev
## 打包发布生产
npm run build prod
## 打包发布调试模式
npm run build test
```
