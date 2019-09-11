import wx from 'weixin-js-sdk'			//微信sdk依赖
import { httpClient } from '@/utils/httpClient'
import { projectConfig } from '@/utils/projectConfig'
const jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo']


function getJSSDK(callback) {
  console.log('分享ajax==');
  console.log(callback);
  callback();
  return;
  let url = window.location.href;
  httpClient.request(projectConfig.JSSDKCONFIG + '?url=' + encodeURIComponent(url), '', 'get').then(res => {
    if(!res) return;
    let datas = res.data;
    wx.config({
      debug: true, // 开启调试模式
      appId: 'wx9d399xxxxxxxxx14', // 必填，公众号的唯一标识
      timestamp: datas.timestamp, // 必填，生成签名的时间戳
      nonceStr: datas.noncestr, // 必填，生成签名的随机串
      signature: datas.signature, // 必填，签名
      jsApiList: jsApiList // 必填，需要使用的JS接口列表
    })
    

    wx.ready(function () {
      // if (callback) {
      //   callback()
      // }
    })
    wx.error(function (res) {
      alert("微信验证失败");
    });
  })
}

function shareMenu(opstion) {
  console.log('opstion====',opstion);
  // 2.1分享给朋友
  wx.onMenuShareAppMessage({
    title: opstion.title,
    desc: opstion.desc,
    link: opstion.linkurl,
    imgUrl: opstion.img,
    trigger: function trigger(res) { },
    success: function success(res) {
      console.log('已分享');
      opstion.success()
    },
    cancel: function cancel(res) {
      console.log('已取消');

    },
    fail: function fail(res) {
      opstion.error('分享错误')
      alert(JSON.stringify(res));
    }
  });
  // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
  wx.onMenuShareTimeline({
    title: opstion.title,
    link: opstion.linkurl,
    imgUrl: opstion.img,
    trigger: function trigger(res) {
      alert('用户点击分享到朋友圈');
    },
    success: function success(res) {
      opstion.success()
      alert('已分享');
    },
    cancel: function cancel(res) {
      alert('已取消');
    },
    fail: function fail(res) {
      opstion.error('分享错误')
      alert(JSON.stringify(res));
    }
  });
  // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
  wx.onMenuShareQQ({
    title: opstion.title,
    desc: opstion.desc,
    link: opstion.linkurl,
    imgUrl: opstion.img,
    trigger: function trigger(res) {
      alert('用户点击分享到QQ');
    },
    complete: function complete(res) {
      alert(JSON.stringify(res));
    },
    success: function success(res) {
      alert('已分享');
    },
    cancel: function cancel(res) {
      alert('已取消');
    },
    fail: function fail(res) {
      alert(JSON.stringify(res));
    }
  });
  // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
  wx.onMenuShareWeibo({
    title: opstion.title,
    desc: opstion.desc,
    link: opstion.linkurl,
    imgUrl: opstion.img,
    trigger: function trigger(res) {
      alert('用户点击分享到微博');
    },
    complete: function complete(res) {
      alert(JSON.stringify(res));
    },
    success: function success(res) {
      alert('已分享');
    },
    cancel: function cancel(res) {
      alert('已取消');
    },
    fail: function fail(res) {
      alert(JSON.stringify(res));
    }
  });
}





export default {
  // 获取JSSDK
  getJSSDK: getJSSDK,
  shareMenu: shareMenu
}
