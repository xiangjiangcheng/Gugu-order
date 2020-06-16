<template>
    <div>
        {{msg}}
        <mt-cell title="测试"></mt-cell>
        <mt-cell title="小帅" value="不要摸鱼哦"></mt-cell>
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
            list:[1,2,3,4,5,6,7,8,9,10]
        }
    },
    methods: {
        loadMore() {
        this.loading = true;
        setTimeout(() => {
            let last = this.list[this.list.length - 1];
            for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
            }
            this.loading = false;
        }, 2500);
        }
    }
}
</script>

<style lang='less'>

</style>