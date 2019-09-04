<template>
  <div class="infoDetail">
    <div class="infoDetailContent">
      <div v-html="industryInformationHTML" class="content2" ref="industryInformationHTML" v-if="isAdvertisement==0"></div> 
      <div class="accessoryList" v-if="isAdvertisement==0">
        <p v-for="(item,index) in attachmentList" :key="index" v-if="isAndroid">
          <span>附件{{index+1}}：</span>
          <a
            :href="projectConfig.API_HOST_NAME + '/industryInformation/download?industryInformationId=' + industryInformationId + '&fileName=' + item">{{item}}</a>
        </p>
        <p v-for="(item,index) in attachmentList" :key="index" v-if="isIOS">
          <span>附件{{index+1}}：</span>
          <a href="javascript:;" @click="PresentSafari(item)">{{item}}</a>
        </p>
      </div>
      <PledgeItem v-if="isAdvertisement==1"></PledgeItem>
    </div>
    <div class="q-footer">
      <div class="q-footer-t flex-around">
        <div class="flex-center">
          <i>T</i>
          <span>字体大小</span>
        </div>
        <el-radio-group v-model="fontSize" size="medium" @change="changeFontSize">
          <el-radio-button label="小"></el-radio-button>
          <el-radio-button label="中"></el-radio-button>
          <el-radio-button label="大"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="q-footer-b">
        <p @click="likeArticle">
          <img src="../../assets/img/bottom_icon_praise_nor.png" alt="" v-if="!zanStatus">
          <img src="../../assets/img/bottom_icon_praise_p.png" alt="" v-else>
          <span>赞<i>({{zanNum}})</i> </span>
        </p>
        <p @click="share">
          <img src="../../assets/img/bottom_icon_share.png" alt="">
          <span>分享</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import PledgeItem from '../Pledge/pledge.vue'

  export default {
    components:{
      'PledgeItem': PledgeItem
    },
    data () {
      return {
        zanNum: 0,
        token: "",
        industryInformationId: '',
        attachmentList: [],
        zanStatus: false,
        industryInformationHTML: '',
        isAndroid: false,
        isIOS: false,
        title: '',
        description: '',
        externalUrl: '',
        fontSize: '中',
        showFsStatus: false,
        userIsLike: '',
        loading: null,
        isAdvertisement: 0,
      }
    },
    methods: {
      // android获取token
      getTokenAndroid () {
        let _this = this
        if (!window.getJsBridge) {
          let arg = {}
          let argString = JSON.stringify(arg)
          let jsonObj = _dsbridge.call('jsGetUserSync', argString)
          if (JSON.parse(jsonObj).data) {
            _this.token = JSON.parse(jsonObj).data.token
            sessionStorage.setItem('accountToken', _this.token)
          }
          this.industryInformationId = this.$route.query.id
          this.getInfoDetail()
          this.hideFontSize()
        }
      },
      // ios获取token
      getAccessToken (token) {
        this.token = token
        sessionStorage.setItem('accountToken', this.token)
        this.industryInformationId = this.$route.query.id
        this.getInfoDetail()
        this.hideFontSize()
      },
      changeFontSize () {
        let industryInformationHTML = this.$refs.industryInformationHTML
        switch (this.fontSize) {
          case '小':
            industryInformationHTML.className = 'content'
            break
          case '中':
            industryInformationHTML.className = 'content2'
            break
          case '大':
            industryInformationHTML.className = 'content3'
        }
      },
      async getInfoDetail () {
        const param = {
          industryInformationId: this.industryInformationId,
          token: this.token
        }
        this.httpClient.requestPost(this.projectConfig.REQUEST_URL_INFO_DETAIL_QUERY, param)
          .then(response => {
            let res = response.returnObject
            this.attachmentList = res.attachmentList
            this.industryInformationHTML = res.content
            this.zanNum = res.likes
            this.title = res.title
            this.externalUrl = res.externalUrl
            if (res.userIsLike == 1) {
              this.zanStatus = true
            }
            if(window._czc){
              window._czc.push(['_trackPageview', '/资讯详情(' + this.title, ')/'])
            }
          })
      },
      // 点赞
      async likeArticle () {
        if (!this.zanStatus) {
          const param = {
            industryInformationId: this.industryInformationId,
            token: this.token
          }
          this.httpClient.requestPost(this.projectConfig.REQUEST_URL_INFO_DETAIL_LIKE, param)
            .then(response => {
              if (response.errorCode == 8701) {
                //this.showErrorMsg('点赞资讯文章,用户请先登录')
              } else {
                this.zanNum++
                this.zanStatus = true
              }
            })
        }
      },
      // 图片自适应
      imgAuto () {
        let w = document.body.clientWidth
        this.$nextTick(function () {
          let html = this.$refs.industryInformationHTML
          html.style.padding = '0.2rem 0'
          let p = html.getElementsByTagName('p')
          for (var i = 0; i < p.length; i++) {
            p[i].style.padding = '0 3%'
          }
          let img = html.getElementsByTagName('img')
          for (var i = 0; i < img.length; i++) {
            img[i].style.width = '100%'
          }
        })
      },
      // 分享
      share () {
        if (this.isAndroid) {
          var bridge = window.getJsBridge()
          if(this.isAdvertisement==1){
            bridge.call('jsShareNews', {'desc': '仓单质押融资，利息低至6%', 'url': process.env.PROJECT_HOST_NAME+'pledge', 'title': '资金周转慢？融资难？ 找我们就对了！'})
          }else{
            bridge.call('jsShareNews', {'desc': this.title, 'url': this.externalUrl, 'title': this.title})
          }
        }
        if (this.isIOS) {
          if(this.isAdvertisement==1){
            window.webkit.messageHandlers.ShareUrl.postMessage({
              'description': '仓单质押融资，利息低至6%',
              'webpageUrl': process.env.PROJECT_HOST_NAME+'pledge',
              'title': '资金周转慢？融资难？ 找我们就对了！'
            })
          }else{
            window.webkit.messageHandlers.ShareUrl.postMessage({
              'description': this.title,
              'webpageUrl': this.externalUrl,
              'title': this.title
            })
          }
        }
      },
      hideFontSize () {
        this.$nextTick(function () {
          let infoDetail = document.getElementsByClassName('app')[0]
          let fontSizeBox = document.getElementsByClassName('q-footer-t')[0]
          let footerBottom = document.getElementsByClassName('q-footer-b')[0]
          infoDetail.addEventListener('click', function () {
            fontSizeBox.style.display = 'none'
            footerBottom.style.display = 'flex'
          })
          fontSizeBox.addEventListener('click', function () {
            event.stopPropagation()
          })
        })
      },
      showFontSize () {
        let fontSizeBox = document.getElementsByClassName('q-footer-t')[0]
        let footerBottom = document.getElementsByClassName('q-footer-b')[0]
        if (!this.showFsStatus) {
          fontSizeBox.style.display = 'flex'
          footerBottom.style.display = 'none'
          this.showFsStatus = true
        } else {
          fontSizeBox.style.display = 'none'
          footerBottom.style.display = 'flex'
          this.showFsStatus = false
        }
      },
      PresentSafari (fileName) {
        let url = this.projectConfig.API_HOST_NAME + 'industryInformation/download?industryInformationId=' + this.industryInformationId + '&fileName=' + fileName
        window.webkit.messageHandlers.DownloadFile.postMessage(url)
      }
    },
    mounted () {
      if(this.$route.query.isAdvertisement){
        this.isAdvertisement = 1
      }
      // 判断终端
      var u = navigator.userAgent
      this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      if (this.isIOS) {
        window.getAccessToken = this.getAccessToken
        window.webkit.messageHandlers.AskForToken.postMessage('')
      }
      if (this.isAndroid) {
        this.getTokenAndroid()
      }
      window['showFontSize'] = this.showFontSize
    }
  }
</script>

<style lang="scss" scoped>
  .infoDetail {
    padding-bottom: 1rem;
    .infoDetailContent {
      text-align: justify;
      background: #fff;
      .content1,.content2,.content3{
        padding-top: 0.1rem;
      }
      span {
        color: #4d65fd;
        font-size: 0.3rem;
      }
      a {
        color: #666;
        font-size: 0.3rem;
      }
      .accessoryList {
        background: #fff;
        margin: 0.2rem 0;
        padding: 0 0.2rem;
        p {
          border-bottom: 1px solid #e5e5e5;
          padding: 0.20rem 0;
          span {
            color: #666;
          }
          a {
            color: #4d65fd;
          }
        }
      }
    }
  }

  .q-footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    // display: flex;
    .q-footer-t {
      display: none;
      background: #fff;
      height: 0.76rem;
      padding: 0.12rem 0;
      border-top: 1px solid #e5e5e5;
      .flex-center {

        i {
          color: #fff;
          background: #4d65fd;
          display: inline-block;
          width: 0.34rem;
          height: 0.34rem;
          margin-right: 0.2rem;
          text-align: center;
          line-height: 0.34rem;
        }
        span {
          font-size: 0.36rem;
        }
      }
    }
    .q-footer-b {
      border-top: 1px solid #e5e5e5;
      width: 100%;
      background: #fff;
      height: 0.76rem;
      padding: 0.12rem 0;
      display: flex;
      justify-content: space-between;
      p:first-child {
        border-right: 1px solid #ccc;
      }
      p {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        span {
          margin-left: 0.2rem;
          font-size: 0.36rem;
          color: #222;
          i {
            font-size: 0.36rem;
            color: #999;
          }
        }
        img {
          width: 0.5rem;
          height: 0.5rem;
          margin: inherit;
        }
      }
    }
  }
</style>
<style lang="scss">
  .infoDetail {

    .infoDetailContent {

      h1 {
        font-size: 22px;
        padding: 0 16px;
      }
      .content {
        background: #fff;
        p {
          font-size: 0.30rem;
        }
      }
      .content2 {
        background: #fff;
        p {
          font-size: 0.34rem;
        }
      }
      .content3 {
        background: #fff;
        p {
          font-size: 0.38rem;
        }
      }
      p, pre {
        white-space: pre-wrap;
        word-wrap: break-word;
      }
      p, pre {
        padding: 2% 24px;
      }
      img {
        width: auto !important;
        height: auto !important;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
</style>
