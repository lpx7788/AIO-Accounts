<template>
  <div id="app">
    <loading v-show="LOADING"></loading>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>

import Loading  from '@/components/Loadding.vue';
import {mapState} from 'vuex'
export default {
  name: 'app',
  computed:{
    ...mapState([
      'LOADING'
    ])
  },
  components: {
    Loading,
	},

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
