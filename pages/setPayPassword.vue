<template>
    <view>
        
        <!-- 你的html代码 -->

            <div class="content">
                <!--<div class="com-top">-->
                    <!--<div class="arrow-l" @click='jump' data-url=' ' data-type='6'></div>-->
                    <!--<div class="page-title">设置密码</div>-->
                <!--</div>-->
                <!--绑定手机-->
                <div class="bind-phone-wrap">
                    <div class="send-message">
                        <input class="phone-number" type="number" id="phone" placeholder="请输入手机号"/>
                        <input class="verify-code" type="text" id="code" placeholder="请输入验证码" />
                        <input class="get-code-btn" type="button" value="获取验证码"/>
                    </div>
                    <div class="next-button" @click='jump' data-url='/pages/setPassword'>下一步</div>
                </div>
            </div>
    </view>
</template>

<script>
    import light7_min from "@/component/css/light7_min";
    import light7_swiper_min from "@/component/css/light7_swiper_min";
    import main from "@/component/css/main";
    import jzl from "@/component/css/jzl";


    export default {

        components: {
            jzl,
            main,
            light7_swiper_min,
            light7_min,
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
    /*@import "../common/commons/lib/light7/light7.min.css";

    @import "../common/commons/lib/light7/light7-swiper.min.css";

    @import "../common/commons/css/main.css";

    @import "../common/commons/css/otherCss/jzl.css";*/
    

</style>

<!--  
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>设置支付密码</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="shortcut icon" href="/favicon.ico">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">


</head>
<body>






<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script src="../js/main.js"></script>
<script src="../js/page.js"></script>
<script type="text/javascript" src="../del/main11.js"></script>

<script>
    // $(".bind-button a").click(function () {
    //     location.href="paySuccess.html";
    // })



    var user=new user();

    $(".get-code-btn").click(function () {
        countDown();
        60s倒计时
        user.Code();
    })
    function getRegisterOk(data) {
        console.log(data)
    }
    function codeOk(data) {
        console.log(data)
    }

    $(".next-button").click(function () {
        location.href="setPassword.html"
    })



</script>
</body>
</html>
-->
