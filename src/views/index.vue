<template>
    <div>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">选项一</mt-tab-item>
            <mt-tab-item id="2">选项二</mt-tab-item>
            <mt-tab-item id="3">选项三</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
            <mt-cell v-for="n in 10" :title="'内容 ' + n" :key='n' />
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
            <mt-cell v-for="n in 4" :title="'测试 ' + n" :key='n' />
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
            <mt-cell v-for="n in 6" :title="'选项 ' + n"  :key='n' />
        </mt-tab-container-item>
        </mt-tab-container>
        <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="40">
            <li v-for="item in list">{{ item }}</li>
            </ul>
    </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '捕捉一只向帅帅',
      loading: false,
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      selected: '1'
    }
  },
  methods: {
    loadMore () {
      this.loading = true
      setTimeout(() => {
        let last = this.list[this.list.length - 1]

        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i)
        }
        this.loading = false
      }, 2500)
    }
  }
}
</script>

<style lang='less'>

</style>
