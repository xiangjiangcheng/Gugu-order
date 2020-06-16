/** ************* 全局过滤器 *******************/
import Vue from 'vue'

// 截取字符串
Vue.filter('spliceStr', (value, len = 30) => {
  if (!value) {
    return ''
  }
  if (value.length > len) {
    return value.slice(0, len) + '...'
  } else {
    return value
  }
})

// 时间格式化
Vue.filter('date', (date, fmt = 'yyyy-MM-dd') => {
  if (!date) {
    return null
  }
  date = date.replace(/-/g, '/')
  date = new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''

      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
})

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
};
