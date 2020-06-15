<template>

  <div id="app">
    <!--<div id="headerDiv">
      <mt-header fixed title="固定在顶部" style="height: 120px"></mt-header>
    </div>-->
    <!-- <div>
       <mt-navbar v-model="selected">
         <mt-tab-item id="1">选项一</mt-tab-item>
         <mt-tab-item id="2">选项二</mt-tab-item>
         <mt-tab-item id="3">选项三</mt-tab-item>
       </mt-navbar>

       &lt;!&ndash; tab-container &ndash;&gt;
       <mt-tab-container v-model="selected">
         <mt-tab-container-item id="1">
           <mt-cell v-for="n in 10" :title="'内容 ' + n" />
         </mt-tab-container-item>
         <mt-tab-container-item id="2">
           <mt-cell v-for="n in 4" :title="'测试 ' + n" />
         </mt-tab-container-item>
         <mt-tab-container-item id="3">
           <mt-cell v-for="n in 6" :title="'选项 ' + n" />
         </mt-tab-container-item>
       </mt-tab-container>
     </div>-->
    <Login></Login>
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
