/**
 * @Author: xulian
 * @Date: 2019-11-07 16:13:38
 * @Last Modified by: xulian
 * @Last Modified time: 2019-11-07 16:14:06
 * @Desc:   封装axios，统一配置拦截器级错误处理的，可根据具体的需求进行修改
 */
import axios from 'axios'
import { Message } from 'element-ui'
const serverUrl = process.env.VUE_APP_BASE_API// 服务器地址
const request = axios.create({
  timeout: 1000 * 1000,
  baseURL: serverUrl, // 如果多个服务器地址的话，可以新去掉该配置，新建文件进行配置，直接在写接口的地方调用服务器地址
  headers: {
    'Content-Type': 'application/json'
  }
})
// 请求发出拦截器

request.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})
// 请求结果拦截
request.interceptors.response.use(
  response => {
    // Message.closeAll()
    if (response.data.code === -1) {
      Message({
        type: 'error',
        message: response.data.msg,
        duration: 3000
      })
      setTimeout(() => {
        location.href = '/login'
      }, 3000)
      return
    } else if (response.data.code === 2) {
      Message({
        type: 'error',
        message: response.data.msg,
        duration: 3000
      })
    }
    // else if (response.code === 0 || response.data.code === 0) {
    return response.data
    // }else{
    //   Message({
    //     type: 'error',
    //     message: response.data.msg | response.message,
    //     duration: 3000
    //   })
    //   return response.data
    // }
  },
  error => {
    if (!error.response) {
      let data = {
        message: '网络异常'
      }

      return Promise.reject(data)
    }
    return Promise.reject(error.response.data)
  }
)
export default request
