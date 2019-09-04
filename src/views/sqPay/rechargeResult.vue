<template>
    <div id="rechargeResult">
        <div class="success" v-if="errorCode == '0000'">
            <img src="../../assets/img/icon_succed.png" alt="" >
            <br>
            <p class="tips">充值成功</p>
            <br>
            <p>{{message}}</p>
            <van-button size="large" @click="returnAccount" class="pcStyle">返回账户管理</van-button>
        </div>
        <div class="error" v-else>
            <img src="../../assets/img/icon_faiied.png" alt="">
            <br>
            <p class="tips">充值失败</p>
            <br>
            <p>{{message}}</p>
            <van-button size="large" @click="returnRecharge" class="pcStyle">重新提现</van-button>
            <van-button size="large" @click="returnAccount" class="pcStyle">返回账户管理</van-button>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            errorCode: null,
            token: '',
            amount: '',
            message: '',
        }
    },
    methods:{
        returnRecharge(){
            const param ={
                type: '2',
                status: '0',
                token: this.token
            }
            this.httpClient.requestPost(this.projectConfig.REQUEST_URL_SQ_PAY_PUSHMESSAGE, param)
                .then(response => {
                    window.close()
                })
        },
        returnAccount(){
            const param ={
                type: '2',
                status: '1',
                token: this.token
            }
            this.httpClient.requestPost(this.projectConfig.REQUEST_URL_SQ_PAY_PUSHMESSAGE, param)
                .then(response => {
                    window.close()
                })
        },
        init(){
            this.errorCode = this.$route.query.errorCode
            this.message = this.$route.query.message
            this.token = sessionStorage.getItem('token')
            this.amount = sessionStorage.getItem('amount')
        },
    },
    mounted(){
        this.init()
        setTimeout(function(){
            if(window._czc){
                window._czc.push(['_trackPageview', '/双乾充值结果/'])
            }
        },1000)
    }
}
</script>

<style lang="scss" scoped>
#rechargeResult{
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

<style lang="scss">

</style>
