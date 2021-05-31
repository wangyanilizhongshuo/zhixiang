<template>
    <view>


        <div class="com-top">
            <div class="arrow-l" @click='jump' data-url=' ' data-type='6'></div>
            <div class="page-title">修改成功</div>
            <!-- <div class="save-1">完成</div> -->
        </div>
        <div class="submit-content">
            <div class="submit-content">
                <div class="submit-content1">
                    <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/commodity_identification.png">
                    <div class="submit-center"><span>您的支付密码已修改成功</span></div>
                </div>
            </div>
        </div>
        
    </view>
</template>

<script>
    import light7_min from "@/component/css/light7_min";
    import light7_swiper_min from "@/component/css/light7_swiper_min";
    import main from "@/component/css/main";
    import wq from "@/component/css/wq";


    export default {

        components: {
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


</style>

<!--  
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>修改成功</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="shortcut icon" href="">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">


</head>
<body>



</body>
</html>
-->
