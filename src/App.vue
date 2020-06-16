<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    mounted() {
      let el = document.querySelector('.v-modal')
      if(el) {
        document.body.removeChild(el)
      }
    }
  }
</script>

<style lang="less">
  #app {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
