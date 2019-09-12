<template>
  <div class="loginPage">
    <!-- <iframe :src="url" frameborder="0"></iframe> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
     url:''
    };
  },

  mounted() {
     let self = this
      self.httpClient.request(this.projectConfig.WECHAT_LOGIN,'','get')
      .then(res => {
        console.log(res);
        self.url = res  
    })
  },
  methods:{
    
  }
};
</script>

<style lang="less" scoped>

</style>