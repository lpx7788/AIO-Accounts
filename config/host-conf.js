/**
 * 项目接口环境配置
 */
'use strict'
const chalk = require('chalk')
/*
* 环境列表，第一个环境为默认环境
* envName: 指明现在使用的环境
* dirName: 打包的路径，只在build的时候有用
* apiHostName: 这个环境下面的api 请求的域名
* assetHostName: 静态资源存放的域名，未指定则使用相对路径
* projectHostName: 项目访问地址
* pathLength: 1 1级域名 2二级域名
* */

const ENV_LIST = [

  {
    pathLength:'2',
    envName: 'dev',
    dirName: 'dev',
    apiHostName: 'http://ezg844.natappfree.cc/',
    assetHostName:'.',
    projectHostName: 'http://ezg844.natappfree.cc/',
  },
  {
    pathLength:'2',
    envName: 'test',
    dirName: 'test',
    apiHostName: 'http://ezg844.natappfree.cc/',
    assetHostName: '.',
    projectHostName: 'http://ezg844.natappfree.cc/'
  },
  {
    pathLength:'2',
    envName: 'AIO-WX',
    dirName: 'AIO-WX',
    apiHostName: 'http://ezg844.natappfree.cc/',
    assetHostName:'.',
    projectHostName: 'http://ezg844.natappfree.cc/'
  }
]

const HOST_ENV = process.env.HOST_ENV
let HOST_CONF
if ( HOST_ENV === undefined ) {
  // 没有设置环境，则默认为第一个
  HOST_CONF = ENV_LIST[0]
  console.log(chalk.bgYellow('缺少参数，默认使用 host-conf.js 的 ENV_LIST的第一个参数'))
} else {
  for (let i = 0; i < ENV_LIST.length; i++) {
    if ( ENV_LIST[i].envName === HOST_ENV) {
      HOST_CONF = ENV_LIST[i]
      break
    }
  }
}
// 如果没有匹配，发出警告，使用第一个
if( HOST_CONF === undefined) {
  HOST_CONF = ENV_LIST[0]
  console.log(chalk.bgRed('参数错误，默认使用 host-conf.js 的 ENV_LIST的第一个参数'))
  console.log(chalk.red('参数错误，默认使用 host-conf.js 的 ENV_LIST的第一个参数'))
}
// 把apiHostname设置到 node 的环境中 方便客户端使用
process.env.HOST_NAME = HOST_CONF.apiHostName
process.env.PROJECT_HOST_NAME = HOST_CONF.projectHostName
process.env.DIR_NAME = HOST_CONF.dirName
process.env.PATH_LENGTH = HOST_CONF.pathLength



// log选中的变量
console.log(chalk.green('选中的参数为：'))
console.log(HOST_CONF)

module.exports.HOST_CONF = HOST_CONF
module.exports.ENV_LIST = ENV_LIST

