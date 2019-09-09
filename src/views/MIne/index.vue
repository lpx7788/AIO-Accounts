<template>
  <div class="minePage">
    <div class="minePage_body">
      <div class="minePage_user">
         <img src="https://shopstatic.vivo.com.cn/vivoshop/commodity/20180430/20180430232146894398_original.jpg" alt="">
         <p>蓝色天空</p>
         <p class="phone">13430319375</p>
      </div>
      <div class="minePage_referral">
        <span class="code_text">推荐码</span>
        <span>Q763</span>
      </div>
      <div class="minePage_btn"> <van-button class="recommend_btn"  type="info" size="large">推荐给好友</van-button></div>
    </div>
    <div class="footer">
      <Foot></Foot>
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
.minePage{
  .minePage_body{
    display: flex;
    
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .minePage_user{
      padding: 80px 0;
      text-align: center;
      img{
        width: 140px;
        height: 140px;
        border-radius: 50%;
      }
      p{
        margin: 20px 0;
        font-size: 32px;
        color: #222;
      }
      .phone{
        color: #999;
      }
    }
    .minePage_referral{
       font-size: 32px;
 
    .code_text{
        color: #666;
      }
    }

    .minePage_btn{
     text-align: center;
      margin-top: 40px;
      width: 100%;
      .recommend_btn{
        height: 88px;
        line-height: 88px;
        width: 520px;
        font-size: 32px;
      }
    }
    
  }
 
}
</style>