<template>
  <div style="height:100%">
    <div class="loading" v-if="isAndroid || isIOS">
      正在加载，请耐心等候
    </div>
    <form action="" id="form1" method="post" name="form1">
      <input id="WithdrawMoneymoremore" name="WithdrawMoneymoremore" type="hidden"/>
      <input id="PlatformMoneymoremore" name="PlatformMoneymoremore" type="hidden"/>
      <input id="RandomTimeStamp" name="RandomTimeStamp" type="hidden"/>
      <input id="Remark1" name="Remark1" type="hidden"/>
      <input id="Remark2" name="Remark2" type="hidden"/>
      <input id="Remark3" name="Remark3" type="hidden"/>
      <input id="ReturnURL" name="ReturnURL" type="hidden"/>
      <input id="NotifyURL" name="NotifyURL" type="hidden"/>
      <input id="SignInfo" name="SignInfo" type="hidden"/>
      <input id="Amount" name="Amount" type="hidden">
      <input id="OrderNo" name="OrderNo" type="hidden">
      <input id="BankCode" name="BankCode" type="hidden">
      <input id="City" name="City" type="hidden">
      <input id="Province" name="Province" type="hidden">
      <input id="CardNo" name="CardNo" type="hidden">
      <input id="FeePercent" name="FeePercent" type="hidden">
      <input id="BankRemark" name="BankRemark" type="hidden">
      <input id="CardType" name="CardType" type="hidden">
      <input id="WithdrawsArrivalTime" name="WithdrawsArrivalTime" type="hidden">
      <input id="BranchBankName" name="BranchBankName" type="hidden">
      <input id="FeeQuota" name="FeeQuota" type="hidden">
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        token: '',
        amount: '',
        bankCardId: '',
        resultHtmlUrl: '',
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
        this.amount = this.$route.query.amount
        this.bankCardId = this.$route.query.bankCardId
        sessionStorage.setItem('token',this.token)
        sessionStorage.setItem('amount',this.amount)
        sessionStorage.setItem('bankCardId',this.bankCardId)
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
            _this.amount = this.$route.query.amount
            _this.bankCardId = this.$route.query.bankCardId
            _this.submit()
          }
        }
      },
      // ios获取token
      getAccessToken (token) {
        this.token = token
        this.amount = this.$route.query.amount
        this.bankCardId = this.$route.query.bankCardId
        this.submit()
      },
      submit () {
        const param = {
          token: this.token,
          amount: this.amount,
          resultHtmlUrl: this.projectConfig.PROJECT_HOST_NAME + 'withDrawsResult',
          bankCardId: this.bankCardId
        }
        this.httpClient.requestPost(this.projectConfig.REQUEST_URL_SQ_PAY_WITHDRAWS, param)
          .then(response => {
            let data = response.returnObject.submitForm
            if (data != null) {
              document.getElementById('WithdrawMoneymoremore').value = data.WithdrawMoneymoremore
              document.getElementById('PlatformMoneymoremore').value = data.PlatformMoneymoremore
              document.getElementById('RandomTimeStamp').value = data.RandomTimeStamp
              document.getElementById('Remark1').value = data.Remark1
              document.getElementById('Remark2').value = data.Remark2
              document.getElementById('Remark3').value = data.Remark3
              document.getElementById('ReturnURL').value = data.ReturnURL
              document.getElementById('NotifyURL').value = data.NotifyURL
              document.getElementById('SignInfo').value = data.SignInfo
              document.getElementById('Amount').value = data.Amount
              document.getElementById('OrderNo').value = data.OrderNo
              document.getElementById('BankCode').value = data.BankCode
              document.getElementById('City').value = data.City
              document.getElementById('Province').value = data.Province
              document.getElementById('CardNo').value = data.CardNo
              document.getElementById('FeePercent').value = data.FeePercent
              document.getElementById('BankRemark').value = data.BankRemark
              document.getElementById('CardType').value = data.CardType
              document.getElementById('WithdrawsArrivalTime').value = data.WithdrawsArrivalTime
              document.getElementById('BranchBankName').value = data.BranchBankName
              document.getElementById('FeeQuota').value = data.FeeQuota
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
}
</style>
