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
            <van-button slot="button"  plain hairline size="small" type="info">发送验证码</van-button>
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
      <div class="register_btn"> <van-button class="comfirm_btn"  type="info" size="large">确认提交</van-button></div>
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
      InvitationCode: ""
    };
  },

  mounted() {}
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