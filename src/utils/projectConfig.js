/**
 * 项目配置文件
 * 配置状态码
 * 请求URL等
 */

class projectConfig {

  // 返回状态码 =========================.start
  static RESPONSE_CODE_ERROR_SERVER_ERROR = 500; // 500 系统内部异常
  static RESPONSE_CODE_SUCESS = '0000';
  static PROJECT_HOST_NAME = process.env.PROJECT_HOST_NAME;
  static API_HOST_NAME = process.env.HOST_NAME;
  
  // 项目接口 =========================.start
  static WECHAT_LOGIN = 'wechat/wxLogin';//微信登录
  static GET_USERINFO = 'wechat/getUserInfo';//获取用户信息
  static WX_REGISTER = 'wechat/register';//用户注册
  static GET_CAROUSEL = 'product/queryCarousel';//首页轮播图
  static GET_HOT_RECOMMEND = 'product/queryHotRecommend';//首页热门推荐
  static GET_VERIFICATIONCODE = 'user/verificationCode';//验证码
  static SHARE_GETSIGNATURE = 'share/getSignature';//sdk签名
  static SHARE_RECORDSHAREMESS = 'share/recordShareMess';//记录用户信息
}

export {
  projectConfig
}
