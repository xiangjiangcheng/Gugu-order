<template>
    <div>
      西瓜视频
    </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
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
