<template>
  <footer class="footer-container">
    <nav>
      <van-tabbar route>
        <van-tabbar-item  v-for="nav in navData"  :to="nav.path" :key="nav.id"
          replace
        >
          {{nav.name}}
        <img
            slot="icon"
            slot-scope="props"
            :src="tab_active==nav.path?nav.icon.active:nav.icon.normal"
        >
        </van-tabbar-item>
      </van-tabbar>
    </nav>
  </footer>
</template>

<script>
  export default {
    data () {
      return {
        tab_active: '/',
        
        navData: [
          {
            id: 'home',
            icon: {
              normal: 'https://b.yzcdn.cn/vant/icon-demo-1126.png',
              active: 'https://b.yzcdn.cn/vant/icon-demo-1126.png'
            },
            name: '首页',
            path: '/',
          },
          {
            id: 'mine',
            icon: {
              normal: 'https://b.yzcdn.cn/vant/icon-demo-1126.png',
              active: 'https://b.yzcdn.cn/vant/icon-demo-1126.png'
            },
            name: '我',
            path: '/mine',
          },
        ]
      }
    },
    methods: {

    },
    created(){
       console.log(this.$route.path)
       this.tab_active = this.$route.path
       
    },
    mounted () {

    }
  }

</script>

<style scoped  lang="less">
.footer-container {
 .nav_name{
   font-size: 28px;
 }
 img{
   height: 40px;
   width: 40px;
 }
}
</style>
