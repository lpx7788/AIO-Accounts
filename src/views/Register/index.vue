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
        <van-cell-group>
          <van-field v-model="InvitationCode" placeholder="请输入邀请码"    label="邀请码"
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
      InvitationCode: "",
			btntxt: "获取验证码",
			disabled: false,
      time: 0,
      openId:'',
      accessToken:'',
    };
  },
  created(){
     this.openId=this.$route.query.openid
     this.accessToken=this.$route.query.accessToken

  },

  mounted() {
    
  },
  methods:{
    comfirmClick(){
      let self = this;
     var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
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
       else if (this.InvitationCode=='') {
        this.$toast("请输入邀请码");
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
        referralCode: this.InvitationCode,
        openId:this.openId,
        accessToken:this.accessToken,

      },'post')
        .then(res => {
          if(res.returnObject){
            this.$toast("注册成功");
            localStorage.setItem('userInfo',JSON.stringify(res.returnObject))
            setTimeout(function(){
              self.$router.push('/')
            },2000)
          }
        
      }).catch(function(err) {
        console.log(err);
      });
    },


    sendcode() {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
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
      // this.httpClient.request(this.projectConfig.ORDERLIST, {
      //   userPhone:this.userPhone
      // },'post')
      // .then(res => {
      //   if (res.status != 200) {
      //     this.$toast("网络错误");
      //   } else if (res.status == 200) {
      //     if (res.data.error == null && res.data.result == true) {
      //       this.$toast("请注意接收验证码");
      //     } else if (res.data.error != null && res.data.result == null) {
      //       this.$toast( res.data.error.msg);
      //     }
      //   }

      // }).catch(function(err) {
      //   console.log(err);
      // });

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