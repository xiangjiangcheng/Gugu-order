<template>
  <div id=login>
    我是登陆页面：
    <br>
    请登录：
    <p>用户名： <input type="text" name="username"></p>
    <p>密码：<input type="password" name="password"></p>

    <h1>测试axios请求...</h1>
    <p>查看用户:id <input type="text" placeholder="用户ID"></p>
    <button v-on:click="getUserById">查询</button>
  </div>
</template>

<script>
// 导入axios
const axios = require('axios')

export default {
  name: 'Login', // 这个name没多大意义，也可以不用写
  data () { // data 是函数的话，每次创建一个新实例后，调用 data 函数，用return返回初始数据的一个全新副本数据对象，就避免了所有实例共享引用同一个数据对象
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    getUserById () {
      // Make a request for a user with a given ID
      axios.get('/user?ID=12345')
        .then(function (response) {
          // handle success
          console.log('测试axios------------')
          console.log(response)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
        .finally(function () {
          // always executed
          console.log('finally function. from /user?ID=12345')
        })
    }
  }
}
</script>

<style scoped>
  /*样式*/


</style>
