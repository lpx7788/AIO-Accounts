<template>

  <div class="homePage textC">
    
    <van-pull-refresh class="content_body" v-model="isLoading" @refresh="onRefresh">
      <van-swipe :autoplay="2000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in CarouselList" :key="index">
          <van-image
            @click="toSwiperImgDetail(item.productUrl)"
            class="swipe-img"
            fit="cover"
            :src="item.pictureUrl"
          />
        </van-swipe-item>
      </van-swipe>
      <section class="content_list">
        <div class="title_hot">热门推荐</div>
        <van-list
          class="hot_list"
          v-model="dataListLoading"
          :offset="0"
          :finished="dataListFinished"
          finished-text="没有更多了"
          @load="onLoadList"
        >
          <div class="hot_list_item" v-for="item in dataList" :key="item.id" @click="toDetail(item.productUrl)">
            <p class="hot_list_item_title">
              <span>{{item.productDynamic}}</span>
            </p>
            <p class="hot_list_item_name">{{item.productName}}</p>
            <p class="hot_list_item_yield">
              <span class="num">{{item.annualizedReturns}}</span>
              <span class="yield">预计年化收益率</span>
            </p>
            <p class="hot_list_item_data">{{item.productInformation}}</p>
          </div>
        </van-list>
      </section>
    </van-pull-refresh>
    <div class="footer">
      <Foot></Foot>
    </div>
  </div>
</template>

<script>
import Foot from "@/components/Footer";

export default {
  components: {
    Foot
  },
  data() {
    return {
      isLoading: false, // 下拉刷新
      dataListLoading: false, // 热门推荐加载状态
      dataListFinished: false, // 热门推荐完成状态
      CarouselList: [], // 轮播图列表
      dataList: [], // 热门推荐列表
      parameter: {
        pageNum: 1,
        pageSize: "10",
        totalPage: 1
      }
    };
  },
  mounted() {
    this.getCarousel();
    this.getPageList();
    this.sdk.getJSSDK(this.wxRegCallback)
  },
  methods: {
    wxRegCallback() {
      let opstion = {
        title: "分享", //分享标题
        desc: "个人资料", //分享内容
        linkurl: "http://127.0.0.1:999/?home=1", //分享链接
        img:
          "https://shopstatic.vivo.com.cn/vivoshop/commodity/20180418/20180418104131830678_original.jpg", //分享内容显示的图片
        success: function() {
          console.log("分享成功");
        },
        error: function() {
          console.log("分享失败");
        }
      };
      this.sdk.shareMenu(opstion);
    },
    toDetail(productUrl) {
       window.location.href =  productUrl
    },

    toSwiperImgDetail(productUrl) {
      window.location.href = productUrl;
    },

    onRefresh() {
        setTimeout(() => {
          this.$toast('刷新成功');
          this.isLoading = false;
        }, 500);
        this.pageIndex = 1
        this.dataListFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.getPageList() // 加载数据
      },
      onLoadList() {
        if(this.totalPage&&this.totalPage>this.parameter.pageNum *his.parameter.pageSize){
          this.getPageList()
          }// 加载数据
      },
       getPageList () {
         let self = this;
         this.dataListLoading = true
         const param = {
          // pageSize:this.parameter.pageSize,
          // pageNum:this.parameter.pageNum,
        }
        this.httpClient.request(this.projectConfig.GET_HOT_RECOMMEND, param,'post')
        .then(res => {

          self.dataList = self.dataList.concat(res.returnObject)
          this.dataListLoading = false
          this.parameter.pageNum ++
          this.totalPage = res.total
         
          if(self.dataList.length == this.totalPage||res.returnObject.length===0|| !this.totalPage){
            self.dataListFinished = true
          }
        
        })
      },
    
    getCarousel() {
      this.httpClient
        .request(this.projectConfig.GET_CAROUSEL, {}, "post")
        .then(res => {
          this.CarouselList = res.returnObject;
      });
    },

  }
};
</script>

<style lang="less" scoped>
.homePage {
  height: 100%;
  display: flex;
  flex-direction: column;
  .swipe-img {
    height: 320px !important;
  }
  .content_body {
    font-family: PingFangSC-Regular;

    flex: 1;
    overflow-y: auto;
    padding: 30px;

    .title_hot {
      height: 106px;
      line-height: 106px;
      font-size: 32px;
      color: #222;
    }
    .hot_list {
      .hot_list_item {
        padding: 6px 6px 28px 6px;
        border: solid #f9f9fb 2px;
        border-bottom: 0;
        box-shadow: 0px 7px 7px #f9f9fb;
        margin-bottom: 30px;
        .hot_list_item_title {
          span {
            display: inline-block;
            height: 43px;
            line-height: 43px;
            background-color: #e8eef5;
            font-size: 24px;
            color: #8c909c;
            padding: 0 21px;
          }
        }
        .hot_list_item_name {
          font-size: 30px;
          color: #222;
          margin: 30px 0;
        }
        .hot_list_item_yield {
          margin-bottom: 20px;
          .num {
            font-size: 42px;
            color: #f6543f;
            margin-right: 21px;
            font-weight: he;
          }
          .yield {
            font-size: 24px;
            color: #666;
          }
        }
        .hot_list_item_data {
          font-size: 24px;
          color: #666;
        }
        .hot_list_item_name,
        .hot_list_item_yield,
        .hot_list_item_data {
          margin-left: 34px;
        }
      }
    }
  }
}
</style>