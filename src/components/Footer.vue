<template>
  <footer class="footer-container">

    <nav>
       <router-link v-for="nav in navData" :key="nav.id" :to="nav.path" exact> 
        <!-- <icon :name="nav.icon"></icon> -->
        <p>{{ nav.name }}</p>
      </router-link> 
    </nav> 
  </footer>
</template>

<script>
  export default {
    data () {
      return {
            navData: [
    {
      id: 1,
      icon: 'home',
      name: '首页',
      path: '/',
    },
    {
      id: 2,
      icon: 'me',
      name: '我',
      path: '/me',
    },]
      }
    },
    methods: {
    },
    mounted () {}

  }

</script>

<style scoped lang="scss">
.footer-container {
 
}
</style>
