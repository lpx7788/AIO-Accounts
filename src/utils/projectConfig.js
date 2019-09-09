/**
 * 项目配置文件
 * 配置状态码
 * 请求URL等
 */

class projectConfig {

  // 返回状态码=========================.start
  static RESPONSE_CODE_ERROR_SERVER_ERROR = 500; // 500 系统内部异常
  static RESPONSE_CODE_SUCESS = '0000';
  static PROJECT_HOST_NAME = process.env.PROJECT_HOST_NAME;
  static API_HOST_NAME = process.env.HOST_NAME;

 // 资讯列表查询
 static REQUEST_URL_INFO_LIST_QUERY = 'category/tree';

}

export {
  projectConfig
}
