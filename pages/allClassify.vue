<template>
    <view>


        <!-- 你的html代码 -->
        <div class="page">
            <!-- 工具栏 -->
            <nav class="bar bar-tab">
                <a class="tab-item external" href="index.html" id="home">
                    <span class="icon"><img class="home-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/home01.png" alt=""></span>
                    <span class="tab-label">商城首页</span>
                </a>
                <a class="tab-item active  external" href="classify.html" id="sort">
                    <span class="icon"><img class="sort-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/classification02.png" alt=""></span><span class="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/classification02.png"></span>
                    <span class="tab-label">产品分类</span>
                </a>
                <a class="tab-item external" href="shopCar.html" id="cart">
                    <span class="icon"><img class="shopCart-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/shopping_cart01.png" alt=""></span>
                    <span class="tab-label">购物车</span>
                </a>
                <a class="tab-item external" href="personCenter.html" id="center">
                    <span class="icon"><img class="center-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personal_center01.png" alt=""></span>
                    <span class="tab-label">我的</span>
                </a>
            </nav>
            <!-- 页面代码 -->
            <div class="content">
                <!--搜索栏-->
                <div class="yzl-top-bar">
                    <div class="yzl-search-bar" style="background: linear-gradient(66deg,rgba(255,107,134,1) 0%,rgba(255,127,176,1) 100%);">
                        <div class="search-input" style="border-radius: 12px;background: #fff;">
                            <label class="icon icon-search" for="search" style="left: 42%;"></label>
                            <input type="search" id='search' placeholder='搜索' style="border: none;padding-left: 47%;"/>
                        </div>
                    </div>
                </div>
                <!--分类区-->
                <div class="classify-area">
                    <div class="left-area">
                        <ul class="nav-bar">

                        </ul>
                    </div>
                    <div class="right-area">
                        <div  class="class-item">
                            <ul class="goods-list">
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
         <input type="hidden" id="catid" value="">
         <input type="hidden" id="catnmae" value="">
        </div>
        
    </view>
</template>

<script>
    import reset1 from "@/component/css/reset1";
    import light7_min from "@/component/css/light7_min";
    import main from "@/component/css/main";

    import allClassify from "@/component/css/page/allClassify";

    export default {

        components: {
            allClassify,
            main,
            light7_min,
            reset1,
        },
        data() {
            return {
                /*
                    true false
                    style="display: block;" v-if='jifen_show' 
                    @click='jifen_show=true' 
                    @click='jifen_show=false' 
                */
                jifen_show: false,
                
            }
        },
        methods: {
            
        }
    }
</script>

<style>
    /*@import "../common/commons/css/reset1.css";
    @import "../common/commons/lib/light7/light7.min.css";
    @import "../common/commons/css/main.css"; */   


    /*.left-area .nav-bar{
      width: 100%;
      height: 100%;
      background-color: #FFF6F8!important;
      overflow-y: scroll;
    }
    .classify-area .left-area .nav-item-active{
      background-color: #ffffff;
      border-bottom: unset;
      color:#FF7295 !important;
    }

    .classify-area .nav-item-active::before{
      content: '';
      width: 0.1rem;
      height: 100%;
      background-color: #FF7295 !important;
      position: absolute;
      left: 0;
      top: 0;
    }
    .classify-area .left-area .nav-item {
      width: 4.1rem;
      height: 2.4rem;
      line-height: 2.4rem;
      text-align: center;
      font-size: .7rem;
      position: relative;
      border-bottom: 0!important;
      color: #FF7295 !important;
    }*/

</style>

<!--  
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>分类</title>
    <meta name="viewport" content="width=device-width,maximum-scale=1.0">
    <style>
    </style>
</head>
<body>
</body>
<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/jquery/jquery.cookie.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/main.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/page.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/allClassify.js' charset='utf-8'></script>
</html>
-->
