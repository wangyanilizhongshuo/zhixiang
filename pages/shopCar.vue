<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>购物车</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="shortcut icon" href="">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">


    <link rel="stylesheet" href="../lib/light7/light7.min.css">
    <link rel="stylesheet" href="../lib/light7/light7-swipeout.css">
    <link rel="stylesheet" href="../lib/light7/light7-swiper.min.css">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/otherCss/jzl.css">

</head>
<style>
   /*.Noexist{ margin-top:40px; }*/
   .Noexist p{ text-align:center; margin-bottom:15px; font-size:14px;}
   .Noexist-img img{ 
       width:4rem ;
   }
</style>
<body>
<!-- 你的html代码 -->
<div class="page">

    <!-- 工具栏 -->
    <nav class="bar bar-tab">
        <a class="tab-item external" href="index.html" id="home">
            <span class="icon"><img class="home-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/home1.png" alt=""></span>
            <span class="tab-label">首页</span>
        </a>
        <a class="tab-item external" href="allClassify.html" id="sort">
            <span class="icon"><img class="sort-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/classification1.png" alt=""></span>
            <span class="tab-label">分类</span>
        </a>
        <a class="tab-item active external" href="shopCar.html" id="cart">
            <span class="icon"><img class="shopCart-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/shopping_cart02.png" alt=""></span>
            <span class="tab-label">购物车</span>
        </a>
        <a class="tab-item external" href="personCenter.html" id="center">
            <span class="icon"><img class="center-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personal_center01.png" alt=""></span>
            <span class="tab-label">我的</span>
        </a>
    </nav>
    <!-- <div style="width: 100%;height: 44px;color:#fff;line-height:44px;text-align: center;background:linear-gradient(66deg,rgba(255,107,134,1) 0%,rgba(255,127,176,1) 100%);">购物车</div> -->

    <div class="content">

        <!--<div class="com-top2">-->
            <!--<div class="com-title">购物车</div>-->
        <!--</div>-->
        <div class="list-block block">
            <ul class="car-list">
            </ul>
        </div>
        <div style="height: 50px"></div>
        <!--<p class="post-free">还差<span class="lack-num">9</span>元就能包邮<a class="external" href="index.html">[去凑单]</a></p>-->
        <div class="settle-accounts-wrap">
            <img class="check-all" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/cart_unselected.png" alt="" date="0"><span class="selectAll">全选</span>
            <p class="cart-total-txt">合计:<span class="total-num">￥<span class="total-val">0.00</span></span></p>
            <p class="points-total-txt">积分:<span class="total-num total-num2"><span class="total-val total-val2">0</span></span></p>
            <span class="postage">（不含运费）</span>
            <a class="cart-account" href="javascript:;">结算</a>
        </div>
    </div>
</div>


<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/jquery/jquery.cookie.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7-swipeout.js' charset='utf-8'></script>
<script type='text/javascript' src='../del/app.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7-swiper.min.js' charset='utf-8'></script>
<script src="../js/main.js"></script>
<script src="../js/page.js"></script>
<script src="../del/main11.js"></script>
<script src="../js/shopCar.js"></script>
<script>


</script>
</body>
</html>