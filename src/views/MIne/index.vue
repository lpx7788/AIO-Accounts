<template>
  <div class="homePage">

    <div class="homePage_body">
      <p class="referral_code ">
        <span>推荐码</span>
        <span>Q763</span>
      </p>
      <van-button class="recommend_btn"  type="info" size="large">大号按钮</van-button>
    </div>
  </div>
  
</template>

<script>
import Foot  from '@/components/Footer';

  export default {
    components: {
      Foot,
    },
    data () {
      return {
       
      }
    },
    
    methods: {
    },
    mounted () {}

  }
</script>

<style  lang="less" scoped>
.homePage{
  .homePage_body{
    display: flex;
    justify-content: center;
    
    .recommend_btn{
        height: 88px;
        width: 520px;
      }
  }
 
}
</style>