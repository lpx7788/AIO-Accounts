<template>
  <div class="homePage textC">
   
    <van-pull-refresh class="content_body" v-model="isLoading" @refresh="onRefresh">
      <van-swipe :autoplay="2000" indicator-color="white">
          <van-swipe-item v-for="(image, index) in carousel_images" :key="index" >
            <van-image class="swipe-img" fit="cover" :src="image" />
          </van-swipe-item>
      </van-swipe>
      <section class="content_list">
        <div class="title_hot">热门推荐</div>
        <van-list class="hot_list" v-model="hotListLoading" :finished="hotListFinished" finished-text="没有更多了" @load="hotListOnLoad">
          <div class="hot_list_item" v-for="item in hotList" :key="item.id" @click="toDetail">
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
      mounted () {
      this.getPageList();
      this.sdk.getJSSDK(this.wxRegCallback)
    },
    methods: {

     wxRegCallback(){

      let opstion = {
          title: '分享',		//分享标题
          desc: '个人资料',						//分享内容
          linkurl: 	'http://127.0.0.1:7089/?home=1',//分享链接
          img: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/20180418/20180418104131830678_original.jpg',				//分享内容显示的图片
          success: function () {
            console.log('分享成功');
          },
          error: function () {
            console.log('分享失败');
          }
        }
        this.sdk.shareMenu(opstion)
     },
     toDetail(){
       window.location.href='https://www.baidu.com'
     },
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
       getPageList () {
        const param = {
  
        }
        // this.httpClient.request(this.projectConfig.REQUEST_URL_INFO_LIST_QUERY, param)
        //   .then(res => {

        //   })
      },
    },


  }
</script>

<style lang="less" scoped>
.homePage{
  height: 100%;
  display: flex;
  flex-direction: column;
  .swipe-img{
    height: 320px !important;
  }
  .content_body{
    font-family: PingFangSC-Regular;
    
    flex: 1;
    overflow-y: auto;
    padding: 30px;


    .title_hot{
      height: 106px;
      line-height: 106px;
      font-size: 32px;
      color: #222;
    }
    .hot_list{

      .hot_list_item{
        padding: 6px 6px 28px 6px;
        border: solid #f9f9fb 2px;
        border-bottom: 0;
        box-shadow: 0px 7px 7px #f9f9fb;
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
            font-weight: he;
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