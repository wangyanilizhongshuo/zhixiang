<template>
    <view>

        <div class="content">
            <div class="newUser-phone">
                <input class="phone-number" id="spw1" name="spw1" type="password" placeholder="请输入新密码"/>
            </div>
            <div class="newUser-phone">
                <input class="phone-number"  id="spw2" name="spw2"  type="password" placeholder="请确认新密码"/>
            </div>
            <div class="User-confirm" @click='jump' data-url='/pages/login/login' data-type='4'>确定</div>
        </div>
        
    </view>
</template>

<script>
    import light7_min from "@/component/css/light7_min";
    import light7_swiper_min from "@/component/css/light7_swiper_min";
    import main from "@/component/css/main";
    import wq from "@/component/css/wq";
    import resetPwd from "@/component/css/page/resetPwd";


    export default {

        components: {
            resetPwd,
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
    }*/

</style>

<!--  
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>重置密码</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="shortcut icon" href="">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">


</head>
<body>
<style>

</style>   
<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/jquery/jquery.cookie.js' charset='utf-8'></script>
<script src="../lib/light7/light7.js"></script>
<script src="../js/main.js"></script>
<script src="../js/page.js"></script>
<script>
     $('input[name="spw1"],input[name="spw2"]').bind('input propertychange', function () {//监听
        var val = $(this).val();
        if( val.length>0){
            $(".User-confirm").addClass("confirm_bg");
        }else{
            $(".User-confirm").removeClass("confirm_bg")
        }
     }) 
    var code=getQueryString("code");
    var phone=getQueryString("phone");
    console.log(code+'     '+phone)
    var user = new user();
    $(".User-confirm").click(function () {
        var psd1=$("#spw1").val();
        var psd2=$("#spw2").val();
        if(psd1==''||psd2==""){
            $.toast("抱歉，请确认密码")
        }else{
            if(psd1==psd2){
                user.codechange(code,phone);
            }else{
                $.toast("抱歉，您的输入有误！")
            }
        }
    })
    function codechangeOk() {
        window.location.href="login.html"
    }
</script>
</body>
</html>
-->
