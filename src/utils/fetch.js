import axios from 'axios'
// 遮罩层组件
// 消息通知组件
// import {Notification} from 'element-ui'
import {projectConfig} from '@/utils/projectConfig'
// 数据加载条显示组件

// 创建axios实例,用于请求后台,进行数据的交换
const service = axios.create({
  baseURL: process.env.HOST_NAME,
  timeout: 50000  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // 获得请求的URL何请求的方法
  const requestUrl = config.url

  // 请求url上面加上时间戳
  if (requestUrl.indexOf('?') === -1 && requestUrl.lastIndexOf('&') === -1) {
    config.url = requestUrl + '?timestamp=' + new Date().getTime()
  } else if (requestUrl.lastIndexOf('&') !== -1) {
    config.url = requestUrl + 'timestamp=' + new Date().getTime()
  } else {
    config.url = requestUrl + '&timestamp=+' + new Date().getTime()
  }

  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// response,服务器端返回拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    if (response.headers['content-type'].indexOf('text/html') !== -1) {
      return response.data
    }

    let res = response.data

    if (res.errorCode === projectConfig.RESPONSE_CODE_ERROR_SERVER_ERROR) {
      // Notification.warning({
      //   title: '警告',
      //   message: res.errorMsg
      // })
    } else {
      // 业务处理成功信息 success
      // 200 正常
      const _message = res.errorMsg
      if (res.errorCode !== projectConfig.RESPONSE_CODE_SUCESS && _message !== '') {
        // Notification.error({
        //   message: _message
        // })
      }
      return response.data
    }

    // 全局返回状态码拦截.end
  },
  error => {
    // Notification.error({
    //   title: '错误',
    //   message: error.message
    // })

    return Promise.reject(error)
  }
)

export default service
