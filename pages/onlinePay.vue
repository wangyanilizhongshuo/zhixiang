<template>
    <view>
        <!-- 你的html代码 -->
        <div class="page">
            <div class="content">
                <div class="wallet-head wrap">
                    <div class="com-top3">
                        <!-- <div class="arrow-3" @click='jump' data-url=' ' data-type='6'></div> -->
                      <!--  <a class="arrow-l" href="javascript:history.back(-1)" open-type='navigateBack'  ></a>
                        <div class="com-title1">我的积分</div> -->
                        <div class="save-3 wall-detail"><a class="color_i" url="onlinePayDetails" href="onlinePayDetails">明细</a></div>
                    </div>
                    <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/walletmypink.png" alt="">
                    <p class="account">账号积分</p>
                    <!--<span class="wallet-detail"><a class="external" href="walletDetails.html">明细</a></span>-->
                    <span class="wallet-number">0</span>
                    <div class="withdraw">
                        <span class="withdraw-num">积分规则</span>
                    </div>
                </div>
                <div class="pay-num ma-top52">
                    <div class="top-pay">购买数量</div>
                    <div class="pay-detail">
                        <div class="bear-pay">
                            <div class="bear-label clearfix">
                                <div class="bear-list1 ation M" data-id="" price="" points="">
                                    <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/bear.JPG">
                                    <div class="bear">
                                        <p> 小号玩偶熊</p>
                                        <p class="M-points"> 100积分</p><br>
                                        <span class="M-price">￥10.00</span>
                                    </div>
                                </div>
                                <div class="bear-list1 L" data-id="" price="" points="">
                                    <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/bear.JPG">
                                    <div class="bear">
                                        <p>中号玩偶熊</p>
                                        <p class="L-points"> 100积分</p><br>
                                        <span class="L-price">￥10.00</span>
                                    </div>
                                </div>
                                <div class="bear-list1 XL" data-id="" price="" points="">
                                    <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/bear.JPG">
                                    <div class="bear">
                                        <p>大号玩偶熊</p>
                                        <p class="XL-points"> 100积分</p><br>
                                        <span class="XL-price">￥10.00</span>
                                    </div>
                                </div>
                                <div class="bear-list1 XXL" data-id="" price="" points="">
                                    <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/bear.JPG">
                                    <div class="bear">
                                        <p>特大号玩偶熊</p>
                                        <p class="XXL-points"> 100积分</p><br>
                                        <span class="XXL-price">￥10.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="recharge-choose">
                            <!--<div class="move-wrap">
                                <label class="label-checkbox item-content">
                                    <input type="radio" name="my-radio">
                                    <div class="item-media"><i class="icon icon-form-checkbox"></i></div>
                                    <div class="item-inner">
                                        <div class="item-title-row">
                                            <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/alipay_icon.png" alt="">
                                            <span>支付宝</span>
                                        </div>
                                    </div>
                                </label>
                            </div>-->
                            <div class="move-wrap">
                                <label class="label-checkbox item-content">
                                    <input type="radio" checked name="my-radio" id="weixin" value="1">
                                    <div class="item-media"><i class="icon icon-form-checkbox" id="online-icon"></i></div>
                                    <div class="item-inner">
                                        <div class="item-title-row">
                                            <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/wechatpay.png" alt="">
                                            <span>微信</span>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <button class="recharge-confirm-btn" @click='jump' data-url=' ' data-type='6'>确认</button>
                    </div>
                </div>
            </div>
        </div>
    </view>
</template>
<script>
    import light7_20 from "@/component/css/light7_20";
    import light7_swiper_min from "@/component/css/light7_swiper_min";
    import main_20 from "@/component/css/main_20";
    import wq from "@/component/css/wq";
    import onlinePay from "@/component/css/page/onlinePay";


    export default {

        components: {
            onlinePay,
            wq,
            main_20,
            light7_swiper_min,
            light7_20,
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
    /*// @import "../common/commons/lib/light7/light7.min.css";
    @import "../common/commons/rem_to_vw/light7_20.min.css";
    @import "../common/commons/lib/light7/light7-swiper.min.css";
    // @import "../common/commons/css/main.css";
    @import "../common/commons/rem_to_vw/main_20.css";
    @import "../common/commons/css/otherCss/wq.css";*/

    /*.ation {
        border: solid 1px #FF7295;
        color: #FF7295;
    }

    .wallet-head .withdraw {
        background: rgba(255, 255, 255, 1) !important;
        opacity: 0.3 !important;
        color: #000;
    }

    .recharge-confirm-btn {

        background-color: #FF7295;

    }*/
</style>
<!-- 
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>我的积分</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">


</head>
<body>


<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/jquery/jquery.cookie.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7-swiper.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/main.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/page.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/verify.js' charset='utf-8'></script>
<script>
 $(".arrow-3").on("click", function () {//返回
    history.go(-1);
    return false;
 })
 /***账号积分列表console***/  
var getinfo = new GetInfo();
getinfo.getInfo();
function getInfoOk(data) {
    console.log(data)
    var info = data.result;
    $(".wallet-number").html(info.points);
}

/***积分列表 console***/
var config = new Config();
config.config();
function configOk(data){
 if(data&&data.result){
    var json=data.result;
    /**m小号**/
    $(".M").attr("data-id",json[7].id);
    $(".M").attr("price",json[6].value);
    $(".M").attr("points",json[7].value);
    $(".M-points").html(json[7].value+"积分");
    $(".M-price").html("￥"+json[6].value);
    /**L中号**/
    $(".L").attr("data-id",json[9].id);
    $(".L").attr("price",json[8].value);
    $(".L").attr("points",json[9].value);
    $(".L-points").html(json[9].value+"积分");
    $(".L-price").html("￥"+json[8].value);
    /**XL大号**/
    $(".XL").attr("data-id",json[11].id);
    $(".XL").attr("price",json[10].value);
    $(".XL").attr("points",json[11].value);
    $(".XL-points").html(json[11].value+"积分");
    $(".XL-price").html("￥"+json[10].value);
    /**xxL特大号**/
    $(".XXL").attr("data-id",json[13].id);
    $(".XXL").attr("price",json[12].value);
    $(".XXL").attr("points",json[13].value);
    $(".XXL-points").html(json[13].value+"积分");
    $(".XXL-price").html("￥"+json[13].value);
    }
}
    $(".bear-label").on('click',".bear-list1",function(){
      $(".bear-label").find(".bear-list1").removeClass("ation");
      $(this).addClass("ation");
    })
    $(".wall-detail").on("click",function () {
        location.href="onlinePayDetails.html?type=1";
    })
    $(".recharge-confirm-btn").on("click",function () {
      var box=$(".bear-label").find(".ation");
      var price=parseInt(box.attr("price")); 
      var points=parseInt(box.attr("points")); 
      $("#weixin:checked").val();
    })

    
</script>
</body>
</html>

 -->