<template>
    <div class="newGuidelinesDetails">       
        <h2>{{title}}<router-link to="/newGuidelinesMenu" tag="span" class="back-btn">返回新手指引首页</router-link></h2>
        <el-carousel :interval="5000" arrow="always" height="810px" :loop="false">
            <el-carousel-item  v-for="num in length" :key="num">
                <img :src="'../../../static/newUser/'+type+'/'+type+handle+num+'.png'" alt="">
            </el-carousel-item>
        </el-carousel>    
    </div>
</template>
<script>
export default {
    data(){
        return{
            title: null,
            length: 3,
            type: null,
            handle: null,
        }
    },
    methods:{

    },
    created(){
        this.title = this.$route.query.title+'教程'
        this.length = this.$route.query.length
        this.type = this.$route.query.type
        this.handle = this.$route.query.handle
    },
    mounted(){
        
    }
}
</script>
<style lang="scss" scoped>
h2{
    margin-bottom:20px;
    text-align: center;
    position: relative;
    .back-btn{
        position: absolute;
        right: 20px;
        top: 2px;
        height: 32px;
        color: #fff;
        background-color: #4d65fd;
        border-color: #4d65fd;
        padding: 0 15px;
        cursor: pointer;
        border-radius: 3px;
        font-size: 12px;
    }
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 650px;
    margin: 0;
}
  
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}
  
.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>

<style lang="scss">
.newGuidelinesDetails{

    .el-carousel{
        width:1413px;
        margin:0 auto;
        img{
            width: 100%;
        }
    }
}
</style>
