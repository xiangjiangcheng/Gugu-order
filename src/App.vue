<template>
  <div id="app">
    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-view></router-view>
    <!--<div id="headerDiv">
      <mt-header fixed title="固定在顶部" style="height: 120px"></mt-header>
    </div>-->

  </div>

</template>

<script>
  import Login from "./components/Login";

  export default {
    name: 'App',
    components: {
      Login: Login
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
