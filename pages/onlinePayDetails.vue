<template>
    <view>


        <!-- 你的html代码 -->
        <div class="page">
            <div class="content">

                <div class="com-top">
                    <!-- <div class="arrow-l" @click='jump' data-url=' ' data-type='6'></div> -->
                    <a class="arrow-l" href="javascript:history.back(-1)" open-type='navigateBack'  ></a>
                    <div class="page-title">明细</div>
                </div>

                <div class="points-detail-data-page ma-top52">
                    <div class="points-box">
                        <!-- 
                        <div class="points-scroll">
                              <div class="scroll-box">
                                    <div class="points-cont"></div>
                                    <div class="infinite-scroll-preloader"><div class="preloader"></div></div>
                            </div>  
                        </div>
                        -->
                      
                        <div class="points-list">
                            <p><span class="list-consume">消费</span><span class="list-date fr cr1">2017-06-03</span></p>
                            <p><span>6+6+6+6+6+6+6+++</span></p>
                            <p><span class="list-points">余额：200.00</span> <span class="list-add fr">+200.00</span></p>
                        </div>
                       
                    </div>
                
                </div>
            </div>
        </div>
        
    </view>
</template>

<script>
    import light7_min from "@/component/css/light7_min";
    import light7_swiper_min from "@/component/css/light7_swiper_min";
    import main from "@/component/css/main";


    export default {

        components: {
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

    @import "../common/commons/css/main.css";*/


</style>

<!--  
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>积分明细</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

</head>
<body>

<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7-swiper.min.js' charset='utf-8'></script>
<script src="../js/main.js"></script>
<script src="../del/main11.js"></script>
<script src="../js/onlinePayDetails.js"></script>
</body>
</html>
-->
