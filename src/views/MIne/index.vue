<template>
  <div class="minePage">
    <div class="minePage_body">
      <div class="minePage_user">
         <img :src="userInfo.headimgurl" alt="">
         <p>{{userInfo.userName}}</p>
         <p class="phone">{{userInfo.userPhone}}</p>
      </div>
      <div class="minePage_referral">
        <span class="code_text">推荐码</span>
        <span>{{userInfo.referralCode}}</span>
      </div>
      <div class="minePage_btn"> <van-button class="recommend_btn"  type="info" size="large"  @click="show = true">推荐给好友</van-button></div>
      <div class="overlay" v-if="show">
        <div class="bg"  @click="show = false"></div>
        <p>点击右上角分享给好友</p>
      </div>

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
       userInfo:{}, 
       show: false
      }
    },
    created(){
     this.sdk.getJSSDK(this.wxRegCallback)
     if(localStorage.getItem('userInfo')){
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
     }
    },
    methods: {
     wxRegCallback() {
       let url = window.location.href
       let param = 'referralCode='+this.userInfo.invitationCode

      if(url.indexOf("?") != -1){
        url = url.split("?")[0]+'?'+param
      }else{
        url =url+'?'+param
      }
      
      console.log(url);
     
      let opstion = {
        title: "聚点推荐", //分享标题
        desc: "分享一个超高收益的项目，没时间了，快抢", //分享内容
        linkurl: url, //分享链接
        img:"http://jtapi.manytrader.net/preViewIndustry/logo.png", //分享内容显示的图片
        success: function() {
          console.log("分享成功");
        },
        error: function() {
          console.log("分享失败");
        }
      };
      this.sdk.shareMenu(opstion);
    },
    },
    mounted () {

    }
  }
</script>

<style  lang="less" scoped>
.minePage{
  display: flex;
    flex-direction: column;
    height: 100%;
   .overlay{
     position: fixed;
     top: 0;
     left: 0;
     height: 100%;
     width: 100%;
     z-index: 1000;
     color: #fff;
     .bg{
        height: 100%;
        width: 100%;
        background: #000;
        opacity: 0.7;
     }
     p{
       position: fixed;
       top: 50%;
       left: 50%;
       transform: translate(-50%,-50%);
       font-size: 40px;
       width: 100%;
       text-align: center;
     }
   }
  .minePage_body{

    flex: 1;
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
       text-align: center;
 
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