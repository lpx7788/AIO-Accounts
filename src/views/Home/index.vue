<template>
  <div class="homePage">
    <van-pull-refresh class="content_body" v-model="isLoading" @refresh="onRefresh">
      <van-swipe :autoplay="2000" indicator-color="white">
          <van-swipe-item v-for="(image, index) in carousel_images" :key="index">
            <van-image :src="image" />
          </van-swipe-item>
      </van-swipe>
      <section class="content_list">
        <div class="title_hot">热门推荐</div>
        <van-list class="hot_list" v-model="hotListLoading" :finished="hotListFinished" finished-text="没有更多了" @load="hotListOnLoad">
          <div class="hot_list_item" v-for="item in hotList" :key="item.id">
            <p class="hot_list_item_title"><span>活动爆款</span></p>
            <p class="hot_list_item_name">聚点一号</p>
            <p class="hot_list_item_yield"><span class="num">6.0%</span><span class="yield">预计年化收益率</span></p>
            <p class="hot_list_item_data">投资期限：80天起，竞拍模式，1万起拍</p>
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
  import Foot  from '@/components/Footer';

  export default {
    components: {
      Foot,
    },
    data () {
      return {
        isLoading: false,// 下拉刷新
        // 轮播图列表
        carousel_images: [
          'https://shopstatic.vivo.com.cn/vivoshop/commodity/20180430/20180430232146894398_original.jpg',
          'https://shopstatic.vivo.com.cn/vivoshop/commodity/20180418/20180418104131830678_original.jpg'
        ],
        hotListLoading: false,// 热门推荐加载状态
        hotListFinished: false,// 热门推荐完成状态
        hotList: [],// 热门推荐列表
      }
    },
  
    methods: {
      onRefresh() {
        setTimeout(() => {
          this.$toast('刷新成功');
          this.isLoading = false;
        }, 500);
      },
      hotListOnLoad(){
        setTimeout(()=>{
          for (let i = 0; i < 10; i++) {
            this.hotList.push(this.hotList.length + 1);
          }
          // 加载状态结束
          this.hotListLoading = false;
          if(this.hotList.length >= 40){
            this.hotListFinished = true;
          }
        },500)
      },
    },
    mounted () {}

  }
</script>

<style lang="less" scoped>
.homePage{
  height: 100%;
  display: flex;
  flex-direction: column;
  .content_body{
    font-family: PingFangSC-Regular;
    
    flex: 1;
    overflow-y: auto;
    padding: 30px 30px 0;

    .van-swipe-item{
      // height: 320px !important;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .title_hot{
      height: 106px;
      line-height: 106px;
      font-size: 32px;
      color: #222;
    }
    .hot_list{

      .hot_list_item{
        padding: 6px 6px 28px 6px;
        border: solid #f9f9fb 1px;
        box-shadow: 0px 7px 7px #f1f1f1;
        margin-bottom: 30px;
        .hot_list_item_title{

          span{
            display: inline-block;
            height: 43px;
            line-height: 43px;
            background-color: #e8eef5;
            font-size: 24px;
            color: #8c909c;
            padding: 0 21px;
          }
        }
        .hot_list_item_name{
          font-size: 30px;
          color: #222;
          margin: 30px 0;
        }
        .hot_list_item_yield{
          margin-bottom: 20px;
          .num{
            font-size: 42px;
            color: #f6543f;
            margin-right: 21px;
          }
          .yield{
            font-size: 24px;
            color: #666;
          }
        }
        .hot_list_item_data{
          font-size: 24px;
          color: #666;
        }
        .hot_list_item_name,.hot_list_item_yield,.hot_list_item_data{
          margin-left: 34px;
        }
      }
    }
  }
}
</style>