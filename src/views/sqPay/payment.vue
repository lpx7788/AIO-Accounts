<template>
    <div>
        <form action="" id="form1" method="post" name="form1">
            <input id="Action" name="Action" type="hidden">
            <input id="AuthCode" name="AuthCode" type="hidden">
            <input id="PlatformMoneymoremore" name="PlatformMoneymoremore" type="hidden"/>
            <input id="FeeType" name="FeeType" type="hidden">
            <input id="TranCode" name="TranCode" type="hidden">
            <input id="TransferAction" name="TransferAction" type="hidden">
            <input id="SignInfo" name="SignInfo" type="hidden"/>
            <input id="RechargeType" name="RechargeType" type="hidden">
            <input id="ReturnURL" name="ReturnURL" type="hidden"/>
            <input id="TransferType" name="TransferType" type="hidden">
            <input id="NeedAudit" name="NeedAudit" type="hidden">
            <input id="DelayTransfer" name="DelayTransfer" type="hidden">
            <input id="Remark1" name="Remark1" type="hidden"/>
            <input id="Remark2" name="Remark2" type="hidden"/>
            <input id="Remark3" name="Remark3" type="hidden"/>
            <input id="LoanJsonList" name="LoanJsonList" type="hidden">
            <input id="NotifyURL" name="NotifyURL" type="hidden"/>
            <input id="RandomTimeStamp" name="RandomTimeStamp" type="hidden"/>
            <input id="ArrivalTime" name="ArrivalTime" type="hidden">
        </form>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        token: '',
        amount: '',
        shopOrderCode: '',
        payeeCompanyCode: '',
        transferName: '',
      }
    },
    methods: {
      getToken () {
        this.token = Base64.decode(this.$route.query.token)
        this.shopOrderCode = this.$route.query.shopOrderCode
        this.amount = this.$route.query.amount
        this.payeeCompanyCode = this.$route.query.payeeCompanyCode
        this.transferName = this.$route.query.transferName
        sessionStorage.setItem('token',this.token)
        sessionStorage.setItem('amount',this.amount)
        sessionStorage.setItem('shopOrderCode',this.shopOrderCode)
        sessionStorage.setItem('payeeCompanyCode',this.payeeCompanyCode)
        sessionStorage.setItem('transferName',this.transferName)
        this.submit()
      },
      submit () {
        const param = {
          token: this.token,
          amount: this.amount,
          shopOrderCode: this.shopOrderCode,
          payeeCompanyCode: this.payeeCompanyCode,
          transferName: this.transferName,
          resultHtmlUrl: this.projectConfig.PROJECT_HOST_NAME + 'paymentResult'
        }
        this.httpClient.requestPost(this.projectConfig.REQUEST_URL_SQ_PAY_PAYMENT, param)
          .then(response => {
            let data = response.returnObject.submitForm
            if (data != null) {
                document.getElementById('Action').value = data.Action
                document.getElementById('PlatformMoneymoremore').value = data.PlatformMoneymoremore
                document.getElementById('AuthCode').value = data.AuthCode
                document.getElementById('FeeType').value = data.FeeType
                document.getElementById('TranCode').value = data.TranCode
                document.getElementById('TransferAction').value = data.TransferAction
                document.getElementById('SignInfo').value = data.SignInfo
                document.getElementById('RechargeType').value = data.RechargeType
                document.getElementById('ReturnURL').value = data.ReturnURL
                document.getElementById('TransferType').value = data.TransferType
                document.getElementById('NeedAudit').value = data.NeedAudit
                document.getElementById('DelayTransfer').value = data.DelayTransfer
                document.getElementById('Remark1').value = data.Remark1
                document.getElementById('Remark2').value = data.Remark2
                document.getElementById('Remark3').value = data.Remark3
                document.getElementById('LoanJsonList').value = data.LoanJsonList
                document.getElementById('NotifyURL').value = data.NotifyURL
                document.getElementById('RandomTimeStamp').value = data.RandomTimeStamp
                document.getElementById('ArrivalTime').value = data.ArrivalTime
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
