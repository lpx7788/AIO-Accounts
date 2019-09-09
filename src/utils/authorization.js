
import {httpClient} from '@/utils/httpClient'

let getWxLogin ={}
getWxLogin.request = (url, data, method) => {
  httpClient.request(url, data, method)
  .then(res => {
     window.location.href = res
  })
}

export default getWxLogin;

