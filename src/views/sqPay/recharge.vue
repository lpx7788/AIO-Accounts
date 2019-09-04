<template>
  <div>
    <form action="" id="form1" method="post" name="form1">
      <input id="RechargeType" name="RechargeType" type="hidden"/>
      <input id="RechargeMoneymoremore" name="RechargeMoneymoremore" type="hidden"/>
      <input id="PlatformMoneymoremore" name="PlatformMoneymoremore" type="hidden"/>
      <input id="RandomTimeStamp" name="RandomTimeStamp" type="hidden"/>
      <input id="Remark1" name="Remark1" type="hidden"/>
      <input id="Remark2" name="Remark2" type="hidden"/>
      <input id="Remark3" name="Remark3" type="hidden"/>
      <input id="ReturnURL" name="ReturnURL" type="hidden"/>
      <input id="NotifyURL" name="NotifyURL" type="hidden"/>
      <input id="SignInfo" name="SignInfo" type="hidden"/>
      <input id="FeeType" name="FeeType" type="hidden">
      <input id="Amount" name="Amount" type="hidden">
      <input id="OrderNo" name="OrderNo" type="hidden">
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        token: '',
        amount: ''
      }
    },
    methods: {
      getToken () {
        this.token = Base64.decode(this.$route.query.token)
        this.amount = this.$route.query.amount
        sessionStorage.setItem('token',this.token)
        sessionStorage.setItem('amount',this.amount)
        this.submit()
      },
      submit () {
        const param = {
          token: this.token,
          amount: this.amount,
          resultHtmlUrl: this.projectConfig.PROJECT_HOST_NAME + 'rechargeResult'
        }
        this.httpClient.requestPost(this.projectConfig.REQUEST_URL_SQ_PAY_RECHARGE, param)
          .then(response => {
            let data = response.returnObject.submitForm
            if (data != null) {
              document.getElementById('RechargeType').value = data.RechargeType
              document.getElementById('RechargeMoneymoremore').value = data.RechargeMoneymoremore
              document.getElementById('PlatformMoneymoremore').value = data.PlatformMoneymoremore
              document.getElementById('RandomTimeStamp').value = data.RandomTimeStamp
              document.getElementById('Remark1').value = data.Remark1
              document.getElementById('Remark2').value = data.Remark2
              document.getElementById('Remark3').value = data.Remark3
              document.getElementById('ReturnURL').value = data.ReturnURL
              document.getElementById('NotifyURL').value = data.NotifyURL
              document.getElementById('SignInfo').value = data.SignInfo
              document.getElementById('FeeType').value = data.FeeType
              document.getElementById('Amount').value = data.Amount
              document.getElementById('OrderNo').value = data.OrderNo
              document.getElementById('form1').action = response.returnObject.submitUrl
              document.getElementById('form1').submit()
            }
          })
      }
    },
    mounted () {
      this.getToken()
      const loading = this.$loading({
        lock: true,
        text: '正在加载，请耐心等候',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    }
  }
</script>

<style lang="scss" scoped>

</style>
