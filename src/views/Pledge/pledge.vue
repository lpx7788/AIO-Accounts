<template>
    <div class="pledge">
        <img src="../../assets/img/warehousePledge1.png" alt="">
        <div class="pledge-bot">
            <van-cell-group>
                <van-field v-model="form.name" label="姓名" clearable placeholder="请输入您的全名" :error-message="errMsgName" ref="inputName" @focus="intoView" :disabled="submitted"/>
                <van-field v-model="form.phoneNum" label="手机号码" type="tel" maxlength="11" clearable placeholder="请输入您的号码" :error-message="errMsgPhone" :disabled="submitted"/>
            </van-cell-group>
            <van-button type="default" :block="true" @click="submit" :disabled="submitted">{{submitted?'已提交':'提交'}}</van-button>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            form: {
                phoneNum: '',
                name: '',
            },
            submitted: false,
            errMsgName: '',
            errMsgPhone: '',
        }
    },
    methods:{
        submit(){
            let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
            let name = false
            let phoneNum = false
            if(!this.submitted){
                if(this.form.name.length == 0){
                    this.errMsgName = '请输入您的全名'
                }else{
                    this.errMsgName = ''
                    name = true
                }
                if(!phoneReg.test(this.form.phoneNum)){
                    this.errMsgPhone = '请输入11位有效手机号'
                }else{
                    this.errMsgPhone = ''
                    phoneNum = true
                }
                if(name && phoneNum){
                    this.httpClient.requestPost(this.projectConfig.REQUEST_URL_FUTURE_ACCOUNT_APPLY,{
                        name: this.form.name,
                        phone: this.form.phoneNum
                    }).then(response => {
                        localStorage.setItem('warehousePledge',JSON.stringify(this.form))
                        this.submitted = true
                    })
                }
            }
        },
        intoView(){
            setTimeout(()=>{
                this.$nextTick(()=>{
                    this.$refs.inputName.$el.scrollIntoView()
                })
            },500)
        },
    },
    mounted(){
        if(localStorage.getItem('warehousePledge')){
            let data = localStorage.getItem('warehousePledge')
            this.form.name = JSON.parse(data).name
            this.form.phoneNum = JSON.parse(data).phoneNum
            this.submitted = true
        }
        if (window._czc) {
            let refererUrl = '/'
            window._czc.push(['_trackPageview', refererUrl+'仓库质押', refererUrl])
        }
    }
}
</script>

<style lang="scss" scoped>
.pledge{

    img{
        width: 100%;
        display:block;
    }
    .pledge-bot{
        background: url('../../assets/img/warehousePledge2.jpg') ;background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
        height: 5.3rem;
        margin-top: -1px;
        .van-button{
            width: 6.90rem;
            margin: auto;
            margin-top: 0.3rem;
            border-radius: 0.1rem;
        }
        
    }
}
</style>

<style lang="scss">
.pledge{

    .van-cell-group{
        width: 6.90rem;
        margin: auto;
        border-radius: 0.1rem;
        .van-cell:first-child {
            border-radius: 0.1rem 0.1rem 0 0;
        }
        .van-cell:last-child {
            border-radius: 0 0 0.1rem 0.1rem;
        }
    }
    .van-hairline--top-bottom::after {
        border-width: 0px 0;
    }
}
</style>
