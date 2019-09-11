
import {httpClient} from '@/utils/httpClient'

let getWxLogin ={}
getWxLogin.request = (url, data, method) => {
  httpClient.request(url, data, method)
  .then(res => {
    console.log(res);
    //  window.location.href = res;

     let code = this.commonJs.getUrlKey(window.location.href,"code")
    //  alert(code)
     console.log(code);
     console.log(code);
  })
}

export default getWxLogin;

