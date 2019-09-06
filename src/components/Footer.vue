<template>
  <footer class="footer-container">
    <nav>
      <van-tabbar v-model="tab_active" :fixed="false">
        <van-tabbar-item v-for="nav in navData" :to="nav.path" :key="nav.id">
          <span>{{nav.name}}</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="tab_active==nav.id?nav.icon.active:nav.icon.normal"
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
        tab_active: 0,
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
    mounted () {

    }
  }

</script>

<style scoped lang="scss">
.footer-container {
 
}
</style>
