<template>
    <div>
      <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" background="#4fc08d" />
      <van-tabs v-model="active">
        <van-tab title="推荐">推荐内容</van-tab>
        <van-tab title="视频">视频</van-tab>
        <van-tab title="热点">热点</van-tab>
        <van-tab title="社会">社会</van-tab>
        <van-tab title="娱乐">娱乐</van-tab>
        <van-tab title="美食">美食</van-tab>
      </van-tabs>
    </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      active: 0
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
