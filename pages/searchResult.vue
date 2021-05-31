<template>
    <view>

        <div class="sp-top-bar">
            <div class="sp-search-bar">
                <label class="icon icon-search" for="search"></label>
                <input type="search" id="search" placeholder="搜索">
            </div>
            <div class="cancel-button">取消</div>
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
    <title>搜索</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="shortcut icon" href="">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">


</head>
<body>




</body>
</html>
-->
