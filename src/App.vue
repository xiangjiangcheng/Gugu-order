<template>
  <div id="app">
    <router-link>首页</router-link>
    <router-link>关于</router-link>
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
<!--<script>-->
<!--  let app = new Vue({-->
<!--    el: '#app',-->
<!--    data: {-->
<!--      selected: true-->
<!--    }-->
<!--  })-->
<!--</script>-->

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
