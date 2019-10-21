<template>
  <div class="homePage textC">
    <van-pull-refresh class="content_body" v-model="isLoading" @refresh="onRefresh">
      <van-swipe :autoplay="2000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in CarouselList" :key="index">
          <van-image
            @click="toSwiperImgDetail(item.productUrl,item.id)"
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
          :finished-text="dataList.length>=5?'没有更多了':''"
          @load="onLoadList"
        >
          <div
            class="hot_list_item"
            v-for="item in dataList"
            :key="item.id"
            @click="toDetail(item.productUrl,item.id)"
          >
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
      },
      userInfo: {}
    };
  },
  created() {
    this.sdk.getJSSDK(this.wxRegCallback);
    if (localStorage.getItem("userInfo")) {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    }
  },
  mounted() {
    this.getCarousel();
    this.getPageList();
  },
  methods: {
    wxRegCallback() {
      let url = window.location.href;
      let param = "referralCode=" + this.userInfo.invitationCode;
      if (url.indexOf("?") != -1) {
        url = url.split("?")[0] + "?" + param;
      } else {
        url = url + "?" + param;
      }
      let opstion = {
        title: "聚点推荐", //分享标题
        desc: "分享一个超高收益的项目，没时间了，快抢", //分享内容
        linkurl: url, //分享链接
        img: "http://jtapi.manytrader.net/preViewIndustry/logo.png", //分享内容显示的图片
        success: function() {},
        error: function() {}
      };
      this.sdk.shareMenu(opstion);
    },

    // 跳转列表详情
    toDetail(productUrl, productId) {
      this.getRecord(productUrl, productId);
    },

    //跳转轮播图详情
    toSwiperImgDetail(productUrl, productId) {
      this.getRecord(productUrl, productId);
    },

    //记录用户信息
    getRecord(productUrl, productId) {
      let param = {
        userName: this.userInfo.userName,
        userCode: this.userInfo.userCode,
        userPhone: this.userInfo.userPhone,
        productId: productId,
        referralCode: this.userInfo.referralCode,
        logo:this.userInfo.headimgurl
      };
      this.httpClient
        .request(this.projectConfig.SHARE_RECORDSHAREMESS, param, "post")
        .then(res => {
          window.location.href = res.returnObject;
        });
    },

    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
      this.pageIndex = 1;
      this.dataListFinished = false; // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      this.dataList = [];
      this.getPageList(); // 加载数据
    },
    onLoadList() {
      if (
        this.totalPage &&
        this.totalPage > this.parameter.pageNum * his.parameter.pageSize
      ) {
        this.getPageList();
      } // 加载数据
    },

    //获取列表信息列表
    getPageList() {
      let self = this;
      this.dataListLoading = true;
      const param = {
        // pageSize:this.parameter.pageSize,
        // pageNum:this.parameter.pageNum,
      };
      this.httpClient
        .request(this.projectConfig.GET_HOT_RECOMMEND, param, "post")
        .then(res => {
          self.dataList = self.dataList.concat(res.returnObject);
          this.dataListLoading = false;
          this.parameter.pageNum++;
          this.totalPage = res.total;
          if (
            self.dataList.length == this.totalPage ||
            res.returnObject.length === 0 ||
            !this.totalPage
          ) {
            self.dataListFinished = true;
          }
        });
    },

    //获取轮播图信息列表
    getCarousel() {
      this.httpClient
        .request(this.projectConfig.GET_CAROUSEL, {}, "post")
        .then(res => {
          this.CarouselList = res.returnObject;
        });
    }
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