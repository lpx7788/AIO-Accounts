<template>
    <div style="width:1460px;">
        <div class="bigboox">   
            <h2>新 <span>&nbsp&nbsp&nbsp&nbsp</span> 手<span>&nbsp&nbsp&nbsp&nbsp</span>指<span>&nbsp&nbsp&nbsp&nbsp</span>引</h2>
            <h4>买家操作</h4>
            <ul>
                <li><router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'买家点价采购',type:'buy',length:6,handle:'DJ'}}" tag="span" class="router-btn">点价采购</router-link></li>
                <li><router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'买家申请点价额度',type:'buy',length:2,handle:'Quota'}}" tag="span" class="router-btn">申请点价额度</router-link></li>
                <li><router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'买家申请撤单',type:'buy',length:3,handle:'Revoke'}}" tag="span" class="router-btn">申请撤单</router-link></li>
            </ul>
             <ul class="ulelse">
                <li><router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'买家发布求购',type:'buy',length:4,handle:'Release'}}" tag="span" class="router-btn">发布求购</router-link></li>
                <li><router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'买家审批和添加销售额度',type:'buy',length:6,handle:'Examine'}}" tag="span" class="router-btn">审批和添加销售额度</router-link></li>
                <li><router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'买家处理求购订单',type:'buy',length:3,handle:'DealOrder'}}" tag="span" class="router-btn">处理求购订单</router-link></li>
            </ul> 
            <h4>卖家操作</h4>
            <ul>
                <li><router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'卖家发布报价',type:'sell',length:4,handle:'Release'}}" tag="span" class="router-btn">发布报价</router-link></li>
                <li><router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'卖家审批和添加采购额度',type:'sell',length:6,handle:'Examine'}}" tag="span" class="router-btn">审批和添加采购额度</router-link></li>
                <li><router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'卖家处理商城订单',type:'sell',length:3,handle:'DealOrder'}}" tag="span" class="router-btn">处理商城订单</router-link></li>
            </ul>
             <ul class="ulelse">
                <li><router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'卖家点价销售',type:'sell',length:6,handle:'DJ'}}" tag="span" class="router-btn">点价销售</router-link></li>
                <li><router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'卖家申请销售额度',type:'sell',length:2,handle:'Quota'}}" tag="span" class="router-btn">申请销售额度</router-link></li>
                <li><router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'卖家撤销求购订单',type:'sell',length:3,handle:'Revoke'}}" tag="span" class="router-btn">撤销求购订单</router-link></li>
            </ul> 
            <ul class="ulelse">
                <li> <router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'卖家生成合同',type:'sell',length:6,handle:'Contract'}}" tag="span" class="router-btn">生成合同</router-link></li>
            </ul>
            <h4 class="qy">企业管理</h4>
            <ul>
                <li><router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'企业管理员工审核',type:'company',length:3,handle:'Check'}}" tag="span" class="router-btn">员工审核</router-link></li>
                <li><router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'企业管理业务跟进',type:'company',length:4,handle:'Business'}}" tag="span" class="router-btn">业务跟进</router-link></li>
                <li><router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'企业管理员工权限设置',type:'company',length:4,handle:'Rule'}}" tag="span" class="router-btn">员工权限设置</router-link></li>
            </ul>
             <ul class="ulelse">
                <li><router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'企业管理更换超级管理员',type:'company',length:4,handle:'Admin'}}" tag="span" class="router-btn">更换超级管理员</router-link></li>
                <li><router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'企业管理点价价格限制',type:'company',length:4,handle:'DJ'}}" tag="span" class="router-btn">点价价格限制</router-link></li>
                <li><router-link :to="{path:'newGuidelines/newGuidelinesDetails',query:{title:'企业管理保证金限制',type:'company',length:4,handle:'Pledge'}}" tag="span" class="router-btn">保证金限制</router-link></li>
            </ul>                 
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.router-btn{
    width: 200px;
    height: 50px;
    font-size: 12px;
    border-radius: 3px;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    display: inline-block;
    text-align: center;
    line-height: 50px;
}
.router-btn:hover{
    color: #4d65fd;
    border-color: #cad1fe;
    background-color: #edf0ff;
}

h4{
    margin:26px 0 0 0;
    color:#666;
    font-size:16px;
}
h2{
    text-align: center;
    font-size: 24px;
    color:#222;
    height:95px;
    line-height: 95px;
    border-bottom: 1px solid #e5e5e5;
}
.bigboox{
    margin: auto;
    width:900px;
    height:800px;
    background-color: #fff;
    padding: 0px 50px 70px 50px;
    ul{
        display:flex;
        li{
            flex:1;
            font-size:14px;
            color:#222;
            margin-top:26px;
            width:168px;
        }
    }
}

</style>
