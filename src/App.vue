<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){

  },
  watch: {
    '$route' (to, from) {
      // console.log(to);
    }
  }
}
</script>

<style lang="less">
  @import '~@/assets/less/core/index';
  html, body {
    box-sizing: border-box;
    background-color: #fff;
    color: #222222;
  }
  #app{
    height: 100%;
  }
</style>
