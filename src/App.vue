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
    const script = document.createElement('script')
    script.src = 'https://s22.cnzz.com/z_stat.php?id=1275436931&web_id=1275436931'
    script.language = 'JavaScript'
    document.body.appendChild(script)
  },
  watch: {
    '$route' (to, from) {
      if (window._czc) {
        let refererUrl = '/'
        window._czc.push(['_trackPageview', refererUrl+to.meta.title, refererUrl])
      }
    }
  }
}
</script>

<style lang="less">

  html, body {
    background-color: #fff;
  }
  #app{
    height: 100%;
  }
</style>
