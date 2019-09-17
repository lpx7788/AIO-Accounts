<template>
  <div class="loginPage" style="width:100%;height:100%;">
    <!-- <iframe src="https://m.51paiyide.com/dist/#/" frameborder="0" style="width:100%;height:100%;"></iframe> -->
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