/**
 * 项目配置文件
 * 配置状态码
 * 请求URL等
 */

class projectConfig {

  // 返回状态码=========================.start
  static RESPONSE_CODE_ERROR_SERVER_ERROR = 500; // 500 系统内部异常

  // 平台状态码
  static RESPONSE_CODE_SUCESS = '0000';

  // 返回状态码=========================.end

  static PROJECT_HOST_NAME = process.env.PROJECT_HOST_NAME;

  static API_HOST_NAME = process.env.HOST_NAME;

  // ============商城首页二维码扫描跳转地址 start============
  // ANDROID下载地址
  static REQUEST_URL_DOWNLOAD_ANDROID = 'http://apk.manytrader.net/AIO.apk';
  // IOS下载地址
  static REQUEST_URL_DOWNLOAD_IOS = 'https://itunes.apple.com/cn/app/id1381360114?mt=8&at=1001lvCH&ct=safari_app';
  // PC下载地址
  static REQUEST_URL_DOWNLOAD_PC = 'http://www.manytrader.net';
  // ============商城首页二维码扫描跳转地址 end============

  // ============资讯 start============
  // 资讯列表查询
  static REQUEST_URL_INFO_LIST_QUERY = 'industryInformation/query';
  // 资讯TOP查询
  static REQUEST_URL_INFO_LIST_TOP = 'industryInformation/getTop';
  // 资讯详情查询
  static REQUEST_URL_INFO_DETAIL_QUERY = 'industryInformation/detail';
  // 资讯点赞查询
  static REQUEST_URL_INFO_DETAIL_LIKE = 'industryInformation/likeArticle';
  // ============资讯 end============

  // ============期货开户 start============
  // 期货开户申请
  static REQUEST_URL_FUTURE_ACCOUNT_APPLY = 'userAccountOpening/apply';
  // 期货公司查询
  static REQUEST_URL_FUTURE_DEFAULT_COMPANY = 'userAccountOpening/getFuturesCompany';
  // 期货开户用户信息查询
  static REQUEST_URL_FUTURE_USER_QUERY = 'user/query';
  // 期货开户省市数据查询
  static REQUEST_URL_FUTURE_CITY_QUERY = 'company/provinceCityList';
  // ============期货开户 end============

  // ============企业报表 start============
  // 企业报表统计数据查询
  static REQUEST_URL_COMPANY_REPORT_SUM_QUERY = 'report/sum';
  // 企业报表统计数据详情查询
  static REQUEST_URL_COMPANY_REPORT_DETAIL_QUERY = 'report/detail';
  // 企业报表统计数据直方图查询
  static REQUEST_URL_COMPANY_REPORT_HISTOGRAM_QUERY = 'report/histogram';
  // 企业报表统计数据饼形图查询
  static REQUEST_URL_COMPANY_REPORT_PIECHART_QUERY = 'report/pieChart';
  // 企业报表统计数据用户刷新
  static REQUEST_URL_COMPANY_REPORT_USER_REFRESH = '/user/refresh';
  // ============企业报表 end============

  // ============双乾支付 start============
  // 双乾支付 充值接口
  static REQUEST_URL_SQ_PAY_RECHARGE = 'sqPay/recharge/init';
  // 双乾支付 注册接口
  static REQUEST_URL_SQ_PAY_REGISTER = 'sqPay/register/init';
  // 双乾支付 申请提现接口
  static REQUEST_URL_SQ_PAY_WITHDRAWS = '/sqPay/withDraws/init';
  // 双乾支付 获取账号信息
  static REQUEST_URL_SQ_PAY_ACCOUNTMESSAGE = '/sqPay/getAccountMessage'
  // 双乾支付 获取提现手续费
  static REQUEST_URL_SQ_PAY_GETWITHDRAWSFEE = 'sqPay/getWithDrawsFee'
  // 双乾支付 关联银行卡
  static REQUEST_URL_SQ_PAY_GETBANKCARDLIST = 'sqPay/getBankCardList'
  // 双乾支付 反馈结果操作
  static REQUEST_URL_SQ_PAY_PUSHMESSAGE = 'sqPay/pushMessage'
  // 双乾支付 支付接口
  static REQUEST_URL_SQ_PAY_PAYMENT = 'sqPay/payment/init'
  // ============双乾支付 end============
}

export {
  projectConfig
}
