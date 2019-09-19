<template>
  <div class="loading">
    <van-loading type="spinner" color="#1989fa" />
  </div>
</template>
 
<script>
  export default {
    name: 'LOADING',
    data () {
      return {}
    },
  }
</script>
<style scoped>
  .loading{
    position: fixed;
    top:0;
    left:0;
    z-index:99;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
   .van-loading{
     position: fixed;
     top: 50%;
     left: 50%;
     transform: translate(-50%,-50%)
  }
</style>