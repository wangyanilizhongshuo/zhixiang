<template>
    <view>
        
        <!-- 你的html代码 -->
        <div class="page">
            <div class="content">
                <div class="com-top">
                    <div class="arrow-2" @click='jump' data-url=' ' data-type='6'>取消</div>
                    <div class="page-title">设置密码</div>
                </div>
                <div class="passwordDiv">
                    <p class="passwordText">请输入6位支付密码</p>
                    <!--  @click='jump' data-url='/pages/setPasswordSecond' -->
                    <label for="ipt" class="passwordLabel"  @click='jump' data-url='/pages/setPasswordSecond' data-type='2' >
                        <ul class="clearfix">
                            <input type="password" maxlength="1" class="pwd">
                            <input type="password" maxlength="1" class="pwd">
                            <input type="password" maxlength="1" class="pwd">
                            <input type="password" maxlength="1" class="pwd">
                            <input type="password" maxlength="1" class="pwd">
                            <input type="password" maxlength="1" class="pwd">
                        </ul>
                    </label>
                    <input type="password" id="password" name="password" maxlength="6" >
                </div>

            </div>
        </div>

    </view>
</template>

<script>
    import light7_min from "@/component/css/light7_min";
    import light7_swiper_min from "@/component/css/light7_swiper_min";
    import main from "@/component/css/main";
    import jzl from "@/component/css/jzl";
    import setPassword from "@/component/css/page/setPassword";


    export default {

        components: {
            setPassword,
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
    
    /*.passwordDiv .pwd {
        float: left;
        width: 35px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        border: 1px solid #dedede;
        margin-left: -1px;
        background-color: #ffffff;
    }
    .passwordLabel ul {
        text-align: center;
    }
    .passwordLabel {
        position: absolute;
        left: 0%;
        top: 45%;
        height: 30px;
        clear: both;
        width:100%;
        transform: translate(0%,0%); 
    } 
    .passwordLabel ul{
        margin: 0 auto;
        width: 230px;
    } */  

</style>

<!--  
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>设置密码</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="shortcut icon" href="">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

</head>
<body>
<style>  
</style>

<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7-swiper.min.js' charset='utf-8'></script>
<script src="../del/main11.js"></script>
<script src="http://libs.baidu.com/jquery/2.1.4/jquery.min.js"></script>
<script>
    //密码框输入事件
    var phone = GetQueryString("phone");
    var code = GetQueryString("code");
    $('.passwordDiv input').on('input', function(e) {
        var number = 6;
        var pw = $("#password").val();
        var list = $('.passwordDiv .pwd');
        var ee =e.currentTarget.value;
        for(var i = 0; i < number; i++) {
            if(pw[i]) {
                $(list[i]).val('•');
            } else {
                $(list[i]).val('');
            };
        };
        var psw=e.currentTarget.value;
        if(psw.length==6){
            location.href="setPasswordSecond.html?password="+psw+'&phone='+phone+'&code='+code
        }
    });
    //点击密码框清除密码
    $('.passwordDiv ul').on("click",function() {
        $("#password").val('');
        $('#password').focus();
        $('.passwordDiv ul .pwd').val('');
    });
</script>
</body>
</html>
-->
