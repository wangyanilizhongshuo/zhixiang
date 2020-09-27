<template>
    <view>


        <!-- 你的html代码 -->
        <div class="page">
            <div class="content">

              
                 
                <div class="choose-address-list">
                    <div class="choose-address-wrap wrap" data-add="1635" data-id="0">
                        <div class="address-detail"><span class="receive-name">收货人：测试</span> <span class="receive-phone">15868382139</span>
                            <p class="address-val"><span class="default-address" style="color:#00b8ee; ">[默认地址]</span>北京市北京市东城区123</p>
                        </div>
                    </div>
                    <div class="choose-address-wrap wrap" data-add="1634" data-id="1">
                        <div class="address-detail"><span class="receive-name">收货人：123</span> <span class="receive-phone">123</span>
                            <p class="address-val">北京市北京市东城区123</p>
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
    import ljh_main from "@/component/css/ljh_main";


    export default {

        components: {
            ljh_main,
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

    @import "../common/commons/css/otherCss/ljh-main.css";*/


</style>

<!--  
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>选择地址</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="shortcut icon" href="">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">


</head>
<body>
<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7-swiper.min.js' charset='utf-8'></script>
<script src="../del/main11.js"></script>
<script src="../js/main.js"></script>
<script src="../js/page.js"></script>
<script>
    addlist();
    function listOK(data) {
        var articleList = data.result;
        var articleHtml = "";
        if(articleList.length > 0){
            $(articleList).each(function (i,info) {
                if(i==0) {
                    articleHtml +=
                        '<div class="choose-address-wrap wrap" data-add="'+info.id+'" data-id="'+i+'">' +
                        '<div class="address-detail">' +
                        '<span class="receive-name">收货人：'+info.addressee+'</span>' +
                        '  <span class="receive-phone">'+info.phone+'</span>' +
                        '   <p class="address-val"><span class="default-address" style="color:#00b8ee; ">[默认地址]</span>'+info.province_name+info.city_name+info.area_name+info.address+'</p>' +
                        '            </div>' +
                        '        </div>'
                }
                if(i>=1) {
                    articleHtml +=
                        '<div class="choose-address-wrap wrap" data-add="'+info.id+'"  data-id="'+i+'">' +
                        '<div class="address-detail">' +
                        '<span class="receive-name">收货人：'+info.addressee+'</span>' +
                        '  <span class="receive-phone">'+info.phone+'</span>' +
                        '   <p class="address-val">'+info.province_name+info.city_name+info.area_name+info.address+'</p>' +
                        '            </div>' +
                        '        </div>'
                }

            })
            $("body").on("click",".choose-address-wrap",function () {
                var id2=$(this).attr("data-id");
                var id3=$(this).attr("data-add");
                location.href="confirmorder2.html?addressnum="+id2+'&addressid='+id3
            })
            $(".choose-address-list").html(articleHtml);
            console.log(data);

        }

    }
</script>


</body>
</html>
-->
