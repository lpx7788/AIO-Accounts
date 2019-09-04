<template>
    <div id="withDrawsApp">
        <div class="withDrawsAppTop">
            <p class="withDrawsAppTopTitle">到账银行</p>
            <div class="flex-con" @click="showBankPicker">
                <img :src="bankList[bankIndex].bankIcon" alt="">
                <div>
                    <p>{{bankList[bankIndex].bankName}}{{bankList[bankIndex].branchBankName}}</p>
                    <p>尾号{{bankList[bankIndex].cardNum}}<span v-if="bankList[bankIndex].cardType == '0'">借记卡</span><span v-if="bankList[bankIndex].cardType == '1'">信用卡</span>   </p>
                </div>
                <van-icon name="arrow" />
            </div>
        </div>
        <van-popup v-model="showBankList" position="bottom" :overlay="true">
            <van-picker :columns="bankPicker" @change="onChange" />
            <p class="cancel" @click="showBankList = false">取消选择</p>
        </van-popup>
        <div class="withDrawsAppBot">
            <p class="withDrawsAppBotTitle">提现金额</p>
            <div class="withDrawsAppBotCon">
                <div>
                    <span>￥</span>
                    <van-field type="number" v-model="withDrawsAmount" clearable placeholder="请输入提现金额(100元起)" :error-message="errorMessage" @input="keypress($event)"/>
                </div>
                <p class="fee">提现手续费￥{{fee}}</p>
                <p>当前可提现金额  ￥{{withDrawsMoney}}</p>
                <p>次日可提现金额  ￥{{nextDayWithDrawsMoney}}</p>
                <p class="tips">次日可提现金额：是指下个工作日可提现的金额。对方付款之后，由于银行卡需要1个工作日后才可以到账，因此，此部分金额需要次日才可以提现。</p>
            </div>
        </div>
        <van-button size="large" @click="sumbit">申请提现</van-button>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                fee: 0,
                withDrawsAmount: '',
                withDrawsMoney: '',
                nextDayWithDrawsMoney: '',
                token: '',
                bankIconUrl: '',
                columns: [],
                showBankList: false,
                bankList: [
                    {
                        bankIcon: '',
                        bankName: '',
                        cardNum: ''
                    }
                ],
                bankPicker: [

                ],
                bankIndex: 0,
                errorMessage: '',
                isAndroid: false,
                isIOS: false,
            }
        },
        methods:{
            keypress(val){
                if(this.withDrawsAmount >= 100){
                    this.errorMessage = ''
                    this.getWithDrawsFee()
                }else{
                    this.errorMessage = '请输入提现金额(100元起)'
                    this.fee = 0
                }
            },
            onChange(picker,value,index){
                this.bankIndex = index
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
                        _this.getAccountMessage()
                    }
                }
            },
            // ios获取token
            getAccessToken (token) {
                this.token = token
                this.getAccountMessage()
            },
            // 获取账户信息
            getAccountMessage(){
                const param = {
                    token: this.token
                }
                this.httpClient.requestPost(this.projectConfig.REQUEST_URL_SQ_PAY_ACCOUNTMESSAGE, param)
                    .then(response => {
                        let data = response.returnObject
                        this.withDrawsMoney = data.withDrawsMoney
                        this.nextDayWithDrawsMoney = data.nextDayWithDrawsMoney
                        this.getBankCardList()
                    })
            },
            // 提现手续费
            getWithDrawsFee(){
                const param = {
                    token: this.token,
                    amount: this.withDrawsAmount
                }
                this.httpClient.requestPost(this.projectConfig.REQUEST_URL_SQ_PAY_GETWITHDRAWSFEE, param)
                    .then(response => {
                        let data = response.returnObject
                        this.fee = data.fee
                    })
            },
            // 获取关联银行卡列表
            getBankCardList(){
                this.bankList = []
                const param = {
                    token: this.token,
                    pageNum: 1
                }
                this.httpClient.requestPost(this.projectConfig.REQUEST_URL_SQ_PAY_GETBANKCARDLIST, param)
                    .then(response => {
                        let data = response.returnObject.list
                        data.forEach(item => {
                             if(item.status == '2'){
                                this.bankList.push(item)
                                let bankName = item.bankName + ' ' + item.branchBankName + ' ' + item.cardNum
                                this.bankPicker.push(bankName)
                             }
                        });
                        this.init()
                    })
            },
            sumbit(){
                if(this.withDrawsAmount >= 100){
                    window.location.href = this.projectConfig.PROJECT_HOST_NAME + 'withDraws?amount=' + this.withDrawsAmount + '&bankCardId=' + this.bankList[this.bankIndex].bankCardId
                }else{
                    this.errorMessage = '请输入提现金额(100元起)'
                }
            },
            showBankPicker(){
                this.showBankList = true
                if (this.isAndroid) {
                var bridge = getJsBridge()
                // 禁止下拉刷新
                bridge.call('jsToggleRefreshState', {'refreshEnable': '0'})
                }
            },
            init(){
                if(this.bankPicker.length == 0){
                    this.$dialog.alert({
                        message: '没有可用的银行卡，请先关联银行卡',
                    }).then(() => {
                        if(this.isAndroid){
                            var bridge = getJsBridge();
                            bridge.call("jsNavigateBankingScreen");
                        }
                        if(this.isIOS){
                            window.webkit.messageHandlers.GoBack.postMessage('')
                        }
                    });
                    return;
                }
                if(this.withDrawsMoney < 100){
                    this.$dialog.alert({
                        message: '可提现金额小于100元，请先到网页端进行充值',
                    }).then(() => {
                        if(this.isAndroid){
                            var bridge = getJsBridge();
                            bridge.call("jsNavigateBankingScreen");
                        }
                        if(this.isIOS){
                            window.webkit.messageHandlers.GoBack.postMessage('')
                        }
                    });
                    return;
                }
            }
        },
        mounted(){
            // 判断终端
            var u = navigator.userAgent
            this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
            this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
            if(this.isAndroid){
                this.getTokenAndroid()
            }
            if(this.isIOS){
                window.getAccessToken = this.getAccessToken
                window.webkit.messageHandlers.AskForToken.postMessage('')
            }
        }
    }
</script>

<style lang="scss" scoped>
#withDrawsApp{
    padding: 0.4rem 0.2rem;
    background: #f1f1f1;
    height: 100%;
    .withDrawsAppTop{

        .withDrawsAppTopTitle{
            font-size: 0.3rem;
            color: #666;
            margin-bottom: 0.24rem;
        }
        .flex-con{
            align-items: center;
            background: #fff;
            padding: 0.2rem;
            img{
                width: 0.96rem;
                height: 0.96rem;
                margin-right: 0.28rem;
                border-radius: 50%;
                box-shadow: #666 0px 0px 2px;
            }
            div{
                flex: 1;
            }
        }
    }
    .withDrawsAppBot{

        .withDrawsAppBotTitle{
            font-size: 0.3rem;
            color: #666;
            margin:0.4rem 0 0.24rem 0;
        }
        .withDrawsAppBotCon{
            background: #fff;
            padding: 0.5rem 0.2rem 0.24rem 0.2rem;
            .fee{
                color: #666;
                font-size: 0.28rem;
                border-top: 1px solid #f1f1f1;
                padding: 0.24rem 0 0.4rem 0;
            }
            .tips{
                font-size: 0.24rem;
                color: #999;
                border-top: 1px solid #f1f1f1;
            }
            div{
                display: flex;
                align-items: center;
                .van-cell{
                    padding: 10px 15px 10px 0;
                }
            }
            p:nth-child(3),p:nth-child(4){
                margin-bottom: 0.24rem;
            }
        }
    }
    .van-button{
        margin-top: 0.4rem;
        background-color: #4d65fd;
        color: #fff;
    }
    .cancel{
        text-align: center;
        border-top: 1px solid #f1f1f1;
        line-height: 0.8rem;
    }
}
</style>
