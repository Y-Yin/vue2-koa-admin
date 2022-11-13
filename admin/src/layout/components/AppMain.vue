<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- 
        Vue会有组件之间的复用，两个路由都使用到了某一个组件，这个组件是不会再去执行created和mounted这些钩子函数的
        加了key就是可以当成两个不同的界面去使用
       -->
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
