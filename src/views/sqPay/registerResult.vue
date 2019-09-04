<template>
    <div id="registerResult">
        <div class="success" v-if="errorCode == '0000'">
            <img src="../../assets/img/icon_succed.png" alt="" >
            <br>
            <p class="tips">{{message}}</p>
            <br>
            <van-button size="large" @click="returnAccount" :class="[(isAndroid || isIOS) ? 'appStyle' : 'pcStyle' ]">返回账户管理</van-button>
        </div>
        <div class="error" v-else>
            <img src="../../assets/img/icon_faiied.png" alt="">
            <br>
            <p class="tips">开户失败</p>
            <br>
            <p>{{message}}</p>
            <van-button size="large" @click="returnRegister" :class="[(isAndroid || isIOS) ? 'appStyle' : 'pcStyle' ]">重新开户</van-button>
            <van-button size="large" @click="returnAccount" :class="[(isAndroid || isIOS) ? 'appStyle' : 'pcStyle' ]">返回账户管理</van-button>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isAndroid: false,
      isIOS: false,
      errorCode: null,
      token: '',
      message: '',
    }
  },
  methods: {
    result () {
      this.errorCode = this.$route.query.errorCode
      if (this.errorCode == '0000') {
        setTimeout(function () {
          window.close()
        }, 5000)
      }
    },
    returnRegister(){
      if(this.isAndroid || this.isIOS){
        window.location.href = this.projectConfig.PROJECT_HOST_NAME + 'register'
      }else{
        const param ={
            type: '1',
            status: '0',
            token: this.token
        }
        this.httpClient.requestPost(this.projectConfig.REQUEST_URL_SQ_PAY_PUSHMESSAGE, param)
            .then(response => {
                window.close()
            })
      }
    },
    returnAccount(){
      if(this.isIOS){
          window.webkit.messageHandlers.GoBack.postMessage('')
      }else if(this.isAndroid){
          var bridge = getJsBridge();
          bridge.call("jsNavigateBankingScreen");
      }else{
          const param ={
              type: '1',
              status: '1',
              token: this.token
          }
          this.httpClient.requestPost(this.projectConfig.REQUEST_URL_SQ_PAY_PUSHMESSAGE, param)
              .then(response => {
                  window.close()
              })
      }
    },
    init(){
      this.errorCode = this.$route.query.errorCode
      this.message = this.$route.query.message
      this.token = sessionStorage.getItem('token')
    },
  },
  mounted () {
    // 判断终端
    var u = navigator.userAgent
    this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
    this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    this.init()
    setTimeout(function(){
      if(window._czc){
        window._czc.push(['_trackPageview', '/双乾开户结果/'])
      }
    })
  }
}
</script>

<style lang="scss" scoped>
#registerResult{
    text-align: center;
    padding: 1.38rem 10vw 0 10vw;
    .van-button:last-child{
        background-color: #4d65fd;
        color: #fff;
    }
    .tips{
        font-size: 0.32rem;
        color: #4d65fd;
    }
    .pcStyle{
        width: 10vw;
        margin: 30px auto;
    }
    .appStyle{
        width: 80vw;
        margin: 0.6rem auto;
    }
    button{
        display: block;
    }
}
</style>
