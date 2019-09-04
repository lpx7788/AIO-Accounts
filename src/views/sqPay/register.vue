<template>
    <div style="height: 100%;">
        <div class="loading" v-if="isAndroid || isIOS">
          正在加载，请耐心等候
        </div>
        <form action="" id="form1" method="post" name="form1">
            <input id="RegisterType" name="RegisterType" type="hidden" />
            <input id="AccountType" name="AccountType" type="hidden" />
            <input id="Mobile" name="Mobile" type="hidden" />
            <input id="MobileCode" name="MobileCode" type="hidden" />
            <input id="Email" name="Email" type="hidden" />
            <input id="EmailCode" name="EmailCode" type="hidden" />
            <input id="RealName" name="RealName" type="hidden" />
            <input id="IdentificationNo" name="IdentificationNo" type="hidden" />
            <input id="LoanPlatformAccount" name="LoanPlatformAccount" type="hidden" />
            <input id="ParentMoneymoremore" name="ParentMoneymoremore" type="hidden" />
            <input id="PlatformMoneymoremore" name="PlatformMoneymoremore" type="hidden" />
            <input id="RandomTimeStamp" name="RandomTimeStamp" type="hidden" />
            <input id="Remark1" name="Remark1" type="hidden" />
            <input id="Remark2" name="Remark2" type="hidden" />
            <input id="Remark3" name="Remark3" type="hidden" />
            <input id="ReturnURL" name="ReturnURL" type="hidden" />
            <input id="NotifyURL" name="NotifyURL" type="hidden" />
            <input id="SignInfo" name="SignInfo" type="hidden" />
        </form>
    </div>
</template>

<script>

export default {
  data () {
    return {
      token: '',
      isAndroid: false,
      isIOS: false,
    }
  },
  methods: {
    getToken () {
      const loading = this.$loading({
        lock: true,
        text: '正在加载，请耐心等候',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.token = Base64.decode(this.$route.query.token)
      sessionStorage.setItem('token',this.token)
      this.submit()
    },
    // android获取token
    getTokenAndroid () {
      let _this = this
      if (!window.getJsBridge) {
        let arg = {}
        let argString = JSON.stringify(arg)
        let jsonObj = _dsbridge.call('jsGetUserSync', argString)
        if (JSON.parse(jsonObj).data) {
          _this.token = JSON.parse(jsonObj).data.token
          _this.submit()
        }
      }
    },
    // ios获取token
    getAccessToken (token) {
      this.token = token
      this.submit()
    },
    submit () {
      const param = {
        token: this.token,
        resultHtmlUrl: this.projectConfig.PROJECT_HOST_NAME + 'registerResult',
      }
      this.httpClient.requestPost(this.projectConfig.REQUEST_URL_SQ_PAY_REGISTER, param)
        .then(response => {
          let data = response.returnObject.submitForm
          if (data != null) {
            document.getElementById('RegisterType').value = data.RegisterType
            document.getElementById('AccountType').value = data.AccountType
            document.getElementById('Mobile').value = data.Mobile
            document.getElementById('MobileCode').value = data.MobileCode
            document.getElementById('Email').value = data.Email
            document.getElementById('EmailCode').value = data.EmailCode
            document.getElementById('RealName').value = data.RealName
            document.getElementById('IdentificationNo').value = data.IdentificationNo
            document.getElementById('LoanPlatformAccount').value = data.LoanPlatformAccount
            document.getElementById('PlatformMoneymoremore').value = data.PlatformMoneymoremore
            document.getElementById('RandomTimeStamp').value = data.RandomTimeStamp
            document.getElementById('Remark1').value = data.Remark1
            document.getElementById('Remark2').value = data.Remark2
            document.getElementById('Remark3').value = data.Remark3
            document.getElementById('ReturnURL').value = data.ReturnURL
            document.getElementById('NotifyURL').value = data.NotifyURL
            document.getElementById('SignInfo').value = data.SignInfo
            document.getElementById('form1').action = response.returnObject.submitUrl
            document.getElementById('form1').submit()
          }
        })
    }
  },
  mounted () {
    // 判断终端
    var u = navigator.userAgent
    this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
    this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    if(this.isAndroid){
      this.getTokenAndroid()
    }else if(this.isIOS){
      window.getAccessToken = this.getAccessToken
      window.webkit.messageHandlers.AskForToken.postMessage('')
    }else{
      this.getToken()
    }
  }
}
</script>

<style lang="scss" scoped>
.loading{
  width: 100%;
  height: 100%;
  line-height: 100vh;
  text-align: center;
  color: #4d65fd;
  background: rgba(0, 0, 0, 0.7);
}
</style>
