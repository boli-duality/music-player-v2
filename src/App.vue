<template>
  <div id="app">
    <!-- explain 动态设置网页标题 https://github.com/deboyblog/vue-wechat-title -->
    <router-view v-wechat-title="c_title" />
  </div>
</template>

<script>
import { title } from '@/common/config/website'

export default {
  name: 'App',
  computed: {
    c_title() {
      let {
        meta: { title: subtitle },
        params: { keyword },
      } = this.$route
      if (subtitle == '搜索') subtitle = `${subtitle}: ${keyword}`
      return `${title} - ${subtitle}`
    },
  },
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
</style>
