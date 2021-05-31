<template>
    <view>

        <!-- 你的html代码 -->
        <div class="page">
            <div class="content">
             
            </div>
        </div>
        
    </view>
</template>

<script>
    import light7_min from "@/component/css/light7_min";
    import light7_swiper_min from "@/component/css/light7_swiper_min";
    import main from "@/component/css/main";
    import jzl from "@/component/css/jzl";
    import search_cont from "@/component/css/page/search_cont";


    export default {

        components: {
            search_cont,
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
    

    /*.rvice{color: #0894ec;}
    .top-search{ 
        width:calc(100% - 60px);
        position:absolute;
        left:40px;
        top:7px;
        z-index:99;
    }
    #search-cont{
        border-radius: 8px;
        height: 30px;
        line-height:30px;
        font-size:14px;   
        width:100%;
        text-indent:30px; 
        background: #dddddd78; 
    }*/

</style>

<!--  
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>搜索内容</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="shortcut icon" href="">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

</head>

<body>
    <input type="hidden" id="type" value="0">
    <input type="hidden" id="sort" value="0">
    <script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
    <script type='text/javascript' src='../lib/light7/light7.min.js' charset='utf-8'></script>
    <script type='text/javascript' src='../lib/light7/light7-swiper.min.js' charset='utf-8'></script>
    <script src="../js/main.js"></script>  
    <script src="../js/pregnantBaby-list.js"></script>  
    <script>

    </script>


</body>

</html>
-->
