<template>
  <div class="registerPage">
    <div class="registerPage_body">
        <div class="registerPage-cell-group">
 
        <van-cell-group>
          <van-field
          v-model="userName" placeholder="请输入姓名" 
          label="姓名"
          type="textarea"
          rows="1"
          autosize
        />
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="userPhone" placeholder="请输入手机号码"    label="手机号码"
          type="textarea"
          rows="1"
          autosize
        />
        </van-cell-group>
        <van-cell-group>
          <van-field
            v-model="verification"
            center
            clearable
            label="短信验证码"
            placeholder="请输入短信验证码"
          >
            <van-button slot="button"  :disabled="disabled" @click="sendcode"  plain hairline size="small" type="info">{{btntxt}}</van-button>
          </van-field>
        </van-cell-group>
        <van-cell-group v-if="referralCode">
          <van-field v-model="referralCode" :readonly='true' placeholder="请输入邀请码"    label="邀请码"
          type="textarea"
          rows="1"
          autosize
        />
        </van-cell-group>
      </div>
      <div class="register_btn"  @click="comfirmClick"> <van-button class="comfirm_btn"  type="info" size="large">确认提交</van-button></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      userPhone: "",
      verification: "",
      referralCode: "",
			btntxt: "获取验证码",
			disabled: false,
      time: 0,
      openId:'',
      accessToken:'',
      userInfo:''
    };
  },
  created(){
 
    this.accessToken=this.$route.query.accessToken
  
    this.referralCode = sessionStorage.getItem('referralCode')!=='null'&&sessionStorage.getItem('referralCode')!==null?sessionStorage.getItem('referralCode'):''
    this.sdk.getJSSDK(this.wxRegCallback)
    if(localStorage.getItem('userInfo')){
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    }      
  },

  mounted() {
    
  },
  methods:{
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
    comfirmClick(){
      let self = this;
    //  var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
    let reg = /^1[3456789]\d{9}$/
      if (this.userName == '') {
        this.$toast("请输入用户名");
        return
      }else if(this.userPhone == ''){
       this.$toast("请输入手机号码");
        return
      }
       else if (!reg.test(this.userPhone)) {
        this.$toast("手机号格式不正确");
        return
      } 
       else if (this.verification=='') {
        this.$toast("请输入验证码");
        return
      } 
   
  
      
      this.httpClient.request(this.projectConfig.WX_REGISTER, {
        // openId	是	string	openId
        // userName	是	string	用户名
        // userPhone	否	string	电话号码
        // referralCode	是	string	推荐码
        // verificationCode	是	string	验证码
        userName: this.userName,
        userPhone: this.userPhone,
        verificationCode: this.verification,
        referralCode: this.referralCode,
        openId:this.$route.query.openid,
        accessToken:this.accessToken,

      },'post')
        .then(res => {
          if(res.returnObject){
            this.$toast("注册成功");
            console.log(this.$route.query.openid)
          
            localStorage.setItem('userInfo',JSON.stringify(res.returnObject))
            setTimeout(function(){
                self.$router.push( {name: 'home',query:{
                  openid:self.$route.query.openid
                }
              })

            },1000)
          }
        
      }).catch(function(err) {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
        console.log(err);
      });
    },


    sendcode() {
      let reg = /^1[3456789]\d{9}$/
      if (this.userPhone == '') {
        this.$toast("请输入手机号码");
        return
      } else if (!reg.test(this.userPhone)) {
        this.$toast("手机号格式不正确");
        return
      } 

      this.time = 60;
      this.disabled = true;
      this.timer();
      this.httpClient.request(this.projectConfig.GET_VERIFICATIONCODE, {
        userPhone:this.userPhone
      },'post')
      .then(res => {
         this.$toast("请注意接收验证码");

      }).catch(function(err) {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
      });

	},
	//验证码的倒计时
	timer() {
		if (this.time > 0) {
			this.time--;
			this.btntxt = this.time + "s后获取";
			setTimeout(this.timer, 1000);
		} else {
			this.time = 0;
			this.btntxt = "获取验证码";
			this.disabled = false;
		}
	},


  }
};
</script>

<style lang="less" scoped>
.registerPage {
  .registerPage_body{
  font-size: 32px;
    .register_btn{
      .comfirm_btn{
        height: 88px;
        line-height: 88px;
      }
  
      padding: 0 30px;
      margin-top: 60px;
    }
  }
 
}
</style>