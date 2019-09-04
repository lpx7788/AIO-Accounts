<template>
  <div id="infoList">
    <div class="selectedBox">
      <mt-navbar v-model="selected" @click.native="handleChange">
        <mt-tab-item id="1">有色</mt-tab-item>
        <mt-tab-item id="2">黑色</mt-tab-item>
        <mt-tab-item id="3">化工</mt-tab-item>
        <mt-tab-item id="4">农产品</mt-tab-item>
        <mt-tab-item id="5">其他</mt-tab-item>
      </mt-navbar>
    </div>
    <div class="content">
      <mt-swipe :auto="2000" v-if="imgList.length != 0">
        <mt-swipe-item v-for="(item,index) in imgList" :key="index"
                       @click.native="goDetail(item)">
          <img :src="item.mobileCoverPicUrl" alt="" width="100%" height="100%">
          <p v-if="item.isAdvertisement == '0'">{{item.title}}</p>
        </mt-swipe-item>
      </mt-swipe>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="contentList"
      >
        <van-cell
          v-for="item in InfoList"
          :key="item.title"
          @click="goDetail(item)"
        >
          <div class="contentList-l">
            <p class="contentList-title">{{item.title}}</p>
            <span class="contentList-name">{{item.source}}</span>
            <span class="contentList-time">{{item.createDate}}</span>
          </div>
          <div class="contentList-r">
          </div>
        </van-cell>
      </van-list>
      
      <div class="nulldata" v-if="imgList.length == 0 && InfoList.length == 0 && !loading">
        <div class="nulldata-img">
          <img src="../../assets/img/empty.png" alt="">
        </div>
        <span> 暂无数据 </span>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        selected: '1',
        token: '',
        InfoList: [],
        isIOS: false,
        isAndroid: false,
        imgList: [],
        loading: false,
        finished: false,
        page: '1',
        total: null,
      }
    },
    methods: {
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          this.getInfoList()
        }, 500);
      },
      topSelected () {
        let h = document.getElementsByClassName('mint-navbar')[0].clientHeight
        document.getElementById('infoList').style.paddingTop = h + 'px'
      },
      handleChange () {
        // 1有色 2黑色 3化工 4农产品 5其他
        this.industryInformationTop()
        this.loading = false
        this.finished = false
        this.total = null
        this.page = '1'
        this.InfoList = []
        this.getInfoList()
      },
      goDetail (item) {
        if (this.isAndroid) {
          var bridge = window.getJsBridge()
          if(item.isAdvertisement==1){
            bridge.call('jsNavigateNewsDetail', {'url': this.projectConfig.PROJECT_HOST_NAME + 'infoDetail?id=' + item.industryInformationId+'&isAdvertisement=1'})
          }else{
            bridge.call('jsNavigateNewsDetail', {'url': this.projectConfig.PROJECT_HOST_NAME + 'infoDetail?id=' + item.industryInformationId})
          }
        }
        if (this.isIOS) {
          if(item.isAdvertisement==1){
            window.webkit.messageHandlers.GoNewsInfo.postMessage(this.projectConfig.PROJECT_HOST_NAME + 'infoDetail?id=' + item.industryInformationId+'&isAdvertisement=1')
          }else{
            window.webkit.messageHandlers.GoNewsInfo.postMessage(this.projectConfig.PROJECT_HOST_NAME + 'infoDetail?id=' + item.industryInformationId)
          }
        }
      },
      // 新闻列表
      async getInfoList () {
        const param = {
          type: '1',
          category: this.selected,
          pageNum: this.page,
          pageSize: 10,
        }
        this.httpClient.requestPost(this.projectConfig.REQUEST_URL_INFO_LIST_QUERY, param)
          .then(response => {
            this.loading = false;
            response.returnObject.list.forEach(item => {
              this.InfoList.push(item)
            })
            this.total = response.returnObject.total
            this.page++
            if(this.InfoList.length == this.total){
              this.finished = true
            }
            this.Distinct()
          })
      },
      // 轮播图内容
      async industryInformationTop () {
        const param = {
          type: '1',
          category: this.selected
        }
        this.httpClient.requestPost(this.projectConfig.REQUEST_URL_INFO_LIST_TOP, param)
          .then(response => {
            this.imgList = response.returnObject.list
            if(window._czc){
              window._czc.push(['_trackPageview', '/资讯列表/'])
            }
          })
      },
      // 去重
      Distinct () {
        let arr = []
        let arr2
        this.imgList.forEach(item => {
          for (var i = 0; i < this.InfoList.length; i++) {
            if (item.industryInformationId === this.InfoList[i].industryInformationId) {
              arr.push(i)
            }
          }
        })

        arr2 = this.InfoList.filter(function (element, index, array) {
          return (arr.indexOf(index) === -1)
        })
        this.InfoList = arr2
      }
    },
    mounted () {
      // 判断终端
      var u = navigator.userAgent
      this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      this.industryInformationTop()
      this.topSelected()
    }
  }
</script>

<style lang="scss" scoped>
  #infoList {
    // padding-top: ;
    .selectedBox {
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 9999;
    }
    .is-selected {
      color: #5970fd !important;
      margin-bottom: 0;
      border-bottom: 0.05rem solid #5970fd !important;
      .mint-tab-item-label {
        font-size: 0.32rem !important;
      }
    }
    .content {
      background: #fff;
      .mint-swipe {
        height: 2.56rem;
        p {
          position: absolute;
          bottom: 10%;
          z-index: 999;
          color: #fff;
          width: 100%;
          font-size: 0.3rem;
          // padding-left: 5%;
          background-color: rgba(2, 2, 2, 0.2);
        }
      }
      .nulldata-img {
        margin-top: 0;
      }
      .contentList {

        li {
          padding: 0.1rem 0.25rem;
          background: #fff;
          border-bottom: 1px solid #e5e5e5;
          .contentList-l {

            .contentList-title {
              color: #222;
              font-size: 0.3rem;
              // margin-bottom: 0.16rem;
            }
            .contentList-name {
              font-size: 0.24rem;
              color: #999;
            }
            .contentList-time {
              font-size: 0.24rem;
              color: #999;
            }
          }
          .contentList-r {

            img {
              width: 2.32rem;
              height: 1.46rem;
            }
          }
        }
      }
    }
  }
</style>
