<template>
    <view>


        <div class="content">
            <div class="newUser-text">
                <div class="newUser-phone">
                    <input class="phone-number" id="phone" type="number" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="11" placeholder="请输入手机号"/>
                </div>
                <div class="newUser-code">
                    <input class="input-code" id="code" type="text" name="code" maxlength="4" placeholder="请输入验证码"/>
                    <input class="get-code" type="button" value="获取验证码"/>
                </div>
                <div class="User-confirm" @click='jump' data-url='/pages/resetPwd' >下一步</div>
            </div>
        </div>
        
    </view>
</template>

<script>
    import light7_min from "@/component/css/light7_min";
    import light7_swiper_min from "@/component/css/light7_swiper_min";
    import main from "@/component/css/main";
    import wq from "@/component/css/wq";

    import forgetPwd from "@/component/css/page/forgetPwd";

    export default {

        components: {
            forgetPwd,
            wq,
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

    @import "../common/commons/css/otherCss/wq.css";*/


    /*.confirm_bg{
        background-color: #00b8ee;
    }
    .disabled {
        pointer-events: none;
        cursor: default;
        opacity: 0.6;
        background: #bfbfbf;
    }*/


</style>

<!--  
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>忘记密码</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="shortcut icon" href="">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">


</head>
<body>
</body>
<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/jquery/jquery.cookie.js' charset='utf-8'></script>
<script src="../lib/light7/light7.js"></script>
<script src="../js/main.js"></script>
<script src="../js/page.js"></script>
<script>
    var user = new user();

     $('input[name="code"]').bind('input propertychange', function (){//监听
        var val = $(this).val();
        if( val.length==4 ){
            $(".User-confirm").addClass("confirm_bg");
        }else{
            $(".User-confirm").removeClass("confirm_bg")
        }
     })   

    $(".get-code").click(function () {
        if($("#phone").val() == "") {
            $.toast("请输入手机号");
            return false;
        }else {
            countDown();
            user.Code();
        }
    })
    function codeOk(data) {
        console.log(data)
    }
    if($("#code").val()!=''&&$("#phone").val() == ""){
            console.log(1)
    }
    $(".User-confirm").click(function () {
        var code=$("#code").val();
        var phone=$("#phone").val();
        if($("#phone").val() == "") {
            $.toast("请输入手机号");
            return false;
        }
        if($("#code").val() == "") {
            $.toast("请输入验证码");
            return false;
        }
        location.href="resetPwd.html?code="+code+'&phone='+phone;
    })
</script>

</html>
-->
