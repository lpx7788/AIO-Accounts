<template>
    <van-swipe 
    :autoplay="10000" 
    :loop="false" 
    :show-indicators="false"
    :vertical="true">
      <van-swipe-item style="background: #4F66FD;">
        <div class="flex-center share_title" v-if="$route.query.phone">
          <img src="../../../static/qrCode/w_touxiang.png" alt="">
          <div class="share_title_left">
            <p>
              发现了一个超赞的大宗交易平台
            </p>
            <p>
              推荐码：<span id="recommendPhone">{{$route.query.phone}} </span> <span @click="copyCode" class="copy">复制</span>
            </p>
          </div>
        </div>
        <img src="../../../static/qrCode/w_share_1.png" class="img-responsive" alt="">
        <div class="rightan">
          <img src="../../../static/qrCode/huadong.png" class="img-responsive" style="width: 50px;">
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../../static/qrCode/w_share_2.png" class="img-responsive" alt="">
        <div class="rightan">
          <img src="../../../static/qrCode/huadong.png" class="img-responsive" style="width: 50px;">
        </div>
        <van-button type="primary" @click="goDownload">下载使用</van-button>
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../../static/qrCode/w_share_3.png" class="img-responsive" alt="">
        <div class="rightan">
          <img src="../../../static/qrCode/huadong.png" class="img-responsive" style="width: 50px;">
        </div>
        <van-button type="primary" @click="goDownload">下载使用</van-button>
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../../static/qrCode/w_share_4.png" class="img-responsive" alt="">
        <div class="rightan">
          <img src="../../../static/qrCode/huadong.png" class="img-responsive" style="width: 50px;">
        </div>
        <van-button type="primary" @click="goDownload">下载使用</van-button>
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../../static/qrCode/w_share_5.png" class="img-responsive" alt="">
        <div class="rightan">
          <img src="../../../static/qrCode/huadong.png" class="img-responsive" style="width: 50px;">
        </div>
        <van-button type="primary" @click="goDownload">下载使用</van-button>
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../../static/qrCode/w_share_6.png" class="img-responsive" alt="">
        <div class="rightan">
          <img src="../../../static/qrCode/huadong.png" class="img-responsive" style="width: 50px;">
        </div>
        <van-button type="primary" @click="goDownload">下载使用</van-button>
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../../static/qrCode/w_share_7.png" class="img-responsive" alt="">
        <van-button type="primary" @click="goDownload">欢迎下载使用</van-button>
      </van-swipe-item>
    </van-swipe>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    watch: {},
    methods: {
      copyCode(){
        let logisticsNumber=document.getElementById("recommendPhone").innerText;
        let oInput = document.createElement('input');
        oInput.value = logisticsNumber;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display='none';
        this.$toast({
          duration: 1000,
          message: '复制成功'
        })
      },
      goDownload(){
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        // 这里是安卓浏览器
        if (isAndroid) {
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.zktec.app.store&from=singlemessage'; // 跳安卓端下载地址
        }
        // 这里是iOS浏览器
        if (isIOS) {
            window.location.href = 'https://itunes.apple.com/cn/app/id1381360114?mt=8&at=1001lvCH&ct=safari_app'; // 跳AppStore下载地址
        }
      }
    },
    async mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  @-webkit-keyframes rightan {
    from {
      bottom: 2%;
      opacity: 1;
    }
    to {
      bottom: 0%;
      opacity: 0;
    }
  }

  .rightan {
    -webkit-animation: rightan 1s infinite;
    -webkit-animation-fill-mode: both;
    position: absolute; 
    bottom: 0; 
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    pointer-events: none;
  }

  .img-responsive{
    width: 100%;
  }

  .share_title{
    padding-top: 0.2rem;
    background: #fff;
    img{
      width: 1.5rem;
      height: 1.5rem;
    }
    .share_title_left{
      padding-left: 0.2rem;
      .copy{
        color: #8795FE;
      }
    }
  }

  .van-swipe-item{
    position: relative;
    .van-button{
      position: fixed;
      width: 75%;
      bottom: 0.68rem;
      left: 50%;
      transform: translateX(-50%);
      background: #4D65FD;
      border: 1px solid #4D65FD;
    }
  }

  .van-swipe,.van-swipe__track{
    height: 100%;
  }
</style>
