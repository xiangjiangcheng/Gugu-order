<!--
 @Author: ganxiaoping
 @Date: 2019年12月24日10:34:21
 @Desc: 404页面
-->
<template>
  <div class="no-found">
    <div class="notice">很抱歉，你访问的页面不存在</div>
    <div class="back" @click="back">返回登录页</div>
  </div>
</template>
<script>
export default {
  name: 'notFound',
  data () {
    return {
    }
  },
  methods: {
    /* 返回登录界面 */
    back () {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="less">
  .no-found {
    width: 100%;
    /*height: 100%;*/
    text-align: center;
    padding-top: 10%;
    .notice {
      color: #999;
      font-size: 20px;
      margin-top: 20px;
    }
    .back {
      color: #0091FF;
      margin-top: 10px;
      cursor: pointer;
    }
  }
</style>
