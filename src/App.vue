<template>
  <div id="app">
    <router-view/>
    <van-tabbar v-model="active">
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/video" icon="search">西瓜视频</van-tabbar-item>
      <van-tabbar-item replace to="/top" icon="friends-o">微头条</van-tabbar-item>
      <van-tabbar-item replace to="/center" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
    }
  },
  mounted () {

  }
}
</script>

<style lang="less">
  #app {
    height: 100%;
    width: 100%;
  }
</style>
