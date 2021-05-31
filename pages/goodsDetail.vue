<template>
    <view>


        <div class="page goods-detail">
            <div class="content">
                <!--<div class="com-top com-top-border">
                    <div class="arrow-l" @click='jump' data-url=' ' data-type='6'></div>
                    <div class="page-title">商品详情</div>
                </div>-->
                <div class="goods-info-1">
                    <div style="padding-bottom: 0" class="swiper-container goods-banner">
                            <div class="activity-diffTime">
                            <span class="joind">00</span><em>天</em><span class="joinh">00</span><em>时</em><span class="joinm">00</span><em>分</em><span
                                    class="joins">00</span><em>秒</em>

                            </div>

                        <div class="swiper-wrapper" id="bannerWrap">
                            <!--<div class="swiper-slide"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/evaluate_pic@3x.png"></div>
                            <div class="swiper-slide"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/evaluate_pic@3x.png"></div>
                            <div class="swiper-slide"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/evaluate_pic@3x.png"></div>-->
                        </div>
                        <div class="swiper-pagination" id="bannertion"></div>
                    </div>

                    <div class="goods-detail-popout">
                        <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/rob_integral_succeed@2x.png">
                        <span>已加入购物车</span>
                    </div>


                    <div class="goods-info">
                        <div class="goods-name">邦尼兔毛绒玩具兔子公仔邦妮兔抱枕可爱布娃娃玩偶儿童生日礼物</div>
                        <div class="goods-price">¥<span style="font-size: 25px">139.0</span></div>
                        <div class="old-price">原价：￥<span></span></div>
                        <div class="other-info">


                        </div>
                    </div>
                    <ul class="goods-tags">
                        <li class="goods-tag">
                            <div class="icon-gou"></div>
                            <div class="tag-name">正品保障</div>
                        </li>
                        <li class="goods-tag">
                            <div class="icon-gou"></div>
                            <div class="tag-name">质量保障</div>
                        </li>
                        <li class="goods-tag">
                            <div class="icon-gou"></div>
                            <div class="tag-name">公益商品</div>
                        </li>
                    </ul>
                </div>
                <div class="goods-num">
                    <div id="format">请选择商品规格及数量</div>
                    <div class="arrow-r"></div>
                </div>
                <div class="swiper-container goods-info-2" id="swiperInfo">
                    <div class="swiper-pagination tab-row">
                        <div class="tab-item active">详情</div>
                        <div class="tab-item">参数</div>
                        <div class="tab-item">评价</div>
                    </div>
                    <div class="swiper-wrapper tab-content">
                        <div class="swiper-slide tab-area" id="detail"></div>
                        <div class="swiper-slide tab-area">
                            <ul class="goods-canshu">
                            </ul>
                        </div>
                        <div class="swiper-slide tab-area">
                            <div class="goodsContent">
                                <div class="goodsContent-list">
                                    <div class="content-top">
                                        <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/rob_integral_evaluatedhead@2x.png">
                                        <span class="content-name">品***的</span>
                                        <span class="content-data">2017-02-24</span>
                                    </div>
                                    <div class="content-text">
                                        <span>宝贝收到，试用了一下很顺手，这个重量真的有些沉，要的就是这效果，夏日拉练走起！钢丝的看起来好结实，估计可以跳很长时间，每天15分钟，坚持下去，效果肯定不错！送的小袋子可以随身携带出去锻炼，很喜欢！</span>
                                    </div>
                                    <div class="content-img">
                                        <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/sign_lucky_runner.png">
                                        <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/sign_lucky_runner.png">
                                        <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/sign_lucky_runner.png">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bot-bar">
                <ul>
                    <li class="btn-cart">
                        <div class="cart-icon"></div>购物车<span class="cart-circle02" style="display: none;"></span>
                    </li>
                    <li class="btn-server"><a href="###" id="service"><div class="server-icon"></div>客服</a></li>
                    <li class="btn-addCart">加入购物车 </li>
                    <li class="btn-buy">立即购买</li>
                </ul>
            </div>
        </div>
        <!-- goods num Popup -->
        <div class="popup" id="popup-num">
            <div class="pop-content">
                <!--<div class="close-popup btn-close"></div>
                <image src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/evaluate_pic@3x.png" class="goods-img"></image>
                <div class="current-info">
                    <div class="current-price">￥139.0</div>
                    <div class="sold-num">已售333件</div>
                    <div class="current-choose">当前规格"米色"</div>
                </div>-->
                <div class="standard">
                    <div class="label">规格</div>
                    <ul class="standrd-list">
                        <!--<li class="standrd-item">米色</li>-->
                    </ul>
                </div>
                <div class="num-area">
                    <div class="label" style="left: 0;">数量</div>
                    <div class="btn-area">

                        <div class="choose-amount-btn">
                            <input class="reduce-amount-btn pull-left" type="button" value="-">
                            <input class="num-amount-btn pull-left" type="text" value="1" onfocus="this.blur()">
                            <input class="add-amount-btn pull-left" type="button" value="+">
                        </div>
                    </div>
                </div>
                <div class="btn-ok close-popup" id="cmBtn1">确定</div>
            </div>
        </div>

        <div class="popup" id="popup-num2">
            <div class="pop-content">
                <div class="standard">
                    <div class="label">规格</div>
                    <ul class="standrd-list">
                        <!--<li class="standrd-item">米色</li>-->
                    </ul>
                </div>
                <div class="num-area">
                    <div class="label" style="left: 0;">数量</div>
                    <div class="btn-area">

                        <div class="choose-amount-btn">
                            <input class="reduce-amount-btn pull-left" type="button" value="-">
                            <input class="num-amount-btn pull-left" type="text" value="1" onfocus="this.blur()">
                            <input class="add-amount-btn pull-left" type="button" value="+">
                        </div>
                    </div>
                </div>
                <div class="btn-ok" id="cmBtn2">确定</div>
            </div>
        </div>

        <div class="popup" id="popup-share">
            <div class="pop-content">
                <div class="popup-vx" >
                    <div class="popup-vx1">
                        <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/share_wechat@2x.png">
                        <span>微信好友</span>
                    </div>
                    <div class="popup-vx2">
                        <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/share_friends@2x.png">
                        <span>微信朋友圈</span>
                    </div>
                </div>
                <div class="close-popup btn-close3">取消</div>
            </div>
        </div>
        
    </view>
</template>

<script>
    import light7_min from "@/component/css/light7_min";
    import main from "@/component/css/main";
    import wq from "@/component/css/wq";
    import goodsDetail from "@/component/css/page/goodsDetail";


    export default {

        components: {
            goodsDetail,
            wq,
            main,
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

    @import "../common/commons/css/main.css";

    @import "../common/commons/css/otherCss/wq.css";*/

    /*#details img{width:100%}
    .com-top-border{ border-bottom: 1px solid #e6e6e6;}
    .activity-diffTime{
        position: absolute;
        bottom: 10px;
        left: 0;
        width: 100%;
        text-align: right;
        z-index:100;
        display:none;
    }
    .activity-diffTime span{
        font-size: 0.5rem;
        background: #000;
        padding: 0.2rem 0.15rem;
        text-align: center;
        color: #fff;
        border-radius: 4px;
    }
    .activity-diffTime em {
        font-style: normal;
        font-size: 0.6rem;
        margin: 0 0.2rem;
        text-align: center;
    }*/


</style>

<!--  
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>商品详情</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="shortcut icon" href="">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link href="https://cdn.bootcss.com/Swiper/4.3.0/css/swiper.min.css" rel="stylesheet">
</head>
<body>

<style>
</style>

<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/jquery/jquery.cookie.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7.min.js' charset='utf-8'></script>
<script src="https://cdn.bootcss.com/Swiper/4.3.0/js/swiper.min.js"></script>
<script type='text/javascript' src='../del/app.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/main.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/page.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/activity-time.js' charset='utf-8'></script>
<script>
    var LocString=String(window.document.location.href);
    var id = getQueryString("id");//获取页面id
    var repertory;
    var page=1;
    // goods = new getGoods();
    var getClass = new getClass(); 
    
    $(document).ready(function () {
        getGoods(id);
        goodscomment(id,page);
        getContent(id);//将id传给getContent
        // goods.goodsDetail();
        getClass.shop(); 
    })

    function mendianOk(data){
        var data="tel:"+data.result.phone;
        $("#service").attr("href",data);
    }
    var shoppingCar = new shoppingCar();

    
    function bannerTop() {
        var bannerSwiper = new Swiper('.goods-banner', {
            // autoplay:true,//等同于以下设置
            autoplay: {
                delay: 2000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
                 waitForTransition: false,
            },
            pagination: {
                el: '#bannertion',
            },
            uniqueNavElements: false,
            loop:true
        });
    }
    var mySwiper = new Swiper('#swiperInfo', {
        speed: 400,
        pagination: {
            type:null,
            el:'#swiperInfo .swiper-pagination',
            bulletElement : 'div',
            bulletClass : 'tab-item',
            clickable:true,
        },
        autoHeight: true,
    })

    /**商品评价**/
    function goodsContentOk(data) {
        console.log(data);//打印
                          //渲染
    }
/**商品信息**/
    function goodsDetailOk(data){
        console.log(data);
        var res= data.result;
        if(res!=null){
            var price = (res.repertory[0].price/100).toFixed(2);
            var oldPrice = (res.repertory[0].old_price/100).toFixed(2);
            repertory=res.repertory;
            var goodsHtml=
                '<div class="goods-name">'+ res.goods.name +'</div>' +
                '<div class="goods-price">¥<span style="font-size: 25px">'+ price +'</span> <span>积分'+ res.repertory[0].points+'</span></div>' +
                '<div class="old-price">原价：￥<span>'+ oldPrice +'</span> <span class="fr">已售 '+ res.repertory[0].sale_num +' 件</span></div>' +
                '<div class="other-info">' +
                //'    <div>快递：包邮</div>' +
                //'    <div>已售 '+ res.repertory[0].sale_num +' 件</div>' +
                //'    <div>'+ res.city +'</div>' +
                '</div>';
            var detailHtml='<iframe src="'+ res.goodsDetailUrl +'" id="details" frameborder="0" align="center" width="100%" height="1000px"></iframe>';
            var chooseDetail=
                '<div class="close-popup btn-close"></div>' +
                '        <image src="'+ res.pic[0].url +'" class="goods-img"></image>' +
                '        <div class="current-info">' +
                '            <div class="current-price"><span class="info-price">￥'+ price +'</span> <span class="points-num">积分'+ res.repertory[0].points+'</span></div>' +
                '            <div class="sold-num">已售'+ res.repertory[0].sale_num +'件</div>' +
                '            <div class="current-choose">已选择"'+ res.repertory[0].name +'"</div>' +
                '        </div>';
            /**商品参数**/
            var propertyList = res.property;
            var propertyHtml = "";
            console.log(propertyList)
            $(propertyList).each(function (i,info) {
                console.log(i)
                propertyHtml +=
                    '<li class="canshu-item">' +
                    '    <div class="detail-message-1">' +
                    '         <div class="detail-message-font">'+info.name+'</div>' +
                    '         <div class="detail-message-style ">'+info.value+'</div>' +
                    '    </div>' +
                    '</li>'
            })
            var tion="";
            var imghtml="";
            $(res.pic).each(function (i,item) {
                imghtml+='<div class="swiper-slide"><img src="'+ item.url +'"></div>';
                if(i==0){
                     tion+='<span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>';
                }else{
                     tion+='<span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>';
                }
              
            });
            $('#bannerWrap').append(imghtml);
            $("#bannertion").append(tion);
            var a='';
            $(res.repertory).each(function (i, item) {
                a+='<li class="standrd-item '+ (i==0?"standard-item-on":"") +'" data-id="'+item.id+'" saleEventid="'+ item.sale_event_id+'" data-name="'+ item.name +'" data-points="'+ item.points +'" data-price="'+ (item.price/100).toFixed(2) +'">'+ item.name +'</li>';
                $('.standard .standrd-list').html(a)
                if(i == 0){
                    window.localStorage.id2 = item.id;
                    window.localStorage.name = item.name;
                    window.localStorage.price = (item.price/100).toFixed(2);
                }

            })
            $('#popup-num .pop-content').prepend(chooseDetail);
            $('#popup-num2 .pop-content').prepend(chooseDetail);
            $('.goods-info').html(goodsHtml)
            $('#detail').html(detailHtml)

            $(".goods-canshu").html(propertyHtml)
        }
        bannerTop();//初始化
    }
    /*选择商品数量弹窗*/
    $(document).on('click','.goods-num', function () {
        $.popup('#popup-num');
    });
    $(document).on('click','.btn-addCart',function () {
        $.popup('#popup-num');
    })
    $(document).on('click','.btn-buy',function () {
        $.popup('#popup-num2');

    })
    /*选择规格*/
    $('.standrd-list').on('click','.standrd-item',function () {
        var id2 = $(this).attr('data-id');
        var name = $(this).attr('data-name');
        var price = $(this).attr('data-price');
        var points = $(this).attr('data-points');
        window.localStorage.id2 = id2;
        window.localStorage.name = name;
        window.localStorage.price = price;
        $(".info-price").html("￥"+price)
        $(".current-choose").html("已选择"+'"'+name+'"');
        $(".points-num").html("积分"+points);
        
        console.log(price)
        $('.standrd-item').removeClass('standard-item-on');
        $(this).addClass('standard-item-on');
    });
    /*微信分享*/
    $(document).on('click','.btn-share', function () {
        $.popup('#popup-share');
    });

    /*商品数量加减*/
    $(".reduce-amount-btn").click(function () {
        var amount = $(".num-amount-btn").val();
        if(amount == 1){
            return;
        };
        amount--;
        $(".num-amount-btn").val(amount);
    })
    $(".add-amount-btn").click(function () {
        var amount = $(".num-amount-btn").val();
        amount++;
        $(".num-amount-btn").val(amount);
    })
    /*点击确定商品弹框收起，出现已加入购物车*/
    $("#cmBtn1").click(function () {
        var re = /^[0-9]+$/ ;
        var num = parseInt($(".num-amount-btn").val());
        localStorage.num = num;
        
        //$("#popup-num").hide()
        $(".popup-overlay").hide()
        $(".goods-detail-popout").show().delay(500).fadeOut();
        // $.toast("加入购物车成功");
        $(".cart-circle").css("visibility","visible").html(num);
        $(".cart-circle02").show().html(parseInt($(".num-amount-btn").val()));

       console.log(num);
       var id2 = localStorage.id2
       console.log(id2);
        shoppingCar.getshopCar(id2,num);
        $("#format").html('已选'+num+'个');
    })

    $("#cmBtn2").click(function () {
        var box=$("#popup-num2").find(".standrd-list").find(".standard-item-on");
        var data = '';
        var num = parseInt($(".num-amount-btn").val());
        var name = localStorage.name;
        var price = localStorage.price;
        /*var title=$(".goods-name").text();
        var event_id=box.attr("data-id");//活动id
        var sub_event_id=box.attr("saleEventid");//规格id
        var attr_name=box.attr("data-name");//规格名称
        var points=box.attr("data-points");//积分
        var cartid = 0;
        if (event_id == ''||event_id==undefined||event_id==null) {
                event_id = 0;
         }
         if (sub_event_id == ''||sub_event_id==undefined||sub_event_id==null) {
             sub_event_id = 0;
        }
        if (points == ''||points ==undefined||points ==null) {
              points = 0;
           }
       // location.href="confirmorder.html?id="+id+"&&num="+num+'&&name='+name+'&&price='+price
       if (data) {
            data += ",";
      }
      data += '{id:'+event_id+',event_id:' + event_id + ',sub_event_id:' + sub_event_id + ',buy_num:' + num + ',attr_name:"' + attr_name + '",points:' +
                points + ',price:' + price + ',cartid:'+cartid+'}'
        var data2='['+data+']';
      location.href ="confirmorder.html?data="+data2;*/
      var repIds=parseInt($(".standrd-list").find(".standard-item-on").attr("data-id"));
      var points=parseInt($(".standrd-list").find(".standard-item-on").attr("data-points"));
      window.localStorage.id2=repIds;
    
      location.href="confirmorder.html?type=0&id="+id+"&num="+num+'&name='+name+'&price='+price+'&points='+points

    })

    function shopcarOk(data){
        console.log(data)
    }
    function goodscommentOk(data) {
        console.log(data)
        var data=data.result.list;
        var goods=''
        $(data).each(function (i,info) {
            goods += '<div class="goodsContent-list">\n';
                goods += '<div class="content-top">\n';
                    goods += '<span class="content-name">' + info.nickname + '</span>\n';
                    goods += '<span class="content-data">' + timestampToTime(info.create_time) + '</span>\n';
                goods += '</div>\n';
                
                goods += '<div class="content-text">\n';
                    goods += '<span>'+info.content+'</span >\n';
                goods += '</div>\n';
                  
                goods += '<div class="content-img">\n';
                   if(info.pic1){
                     goods += '< img src = "'+info.pic1+'" >\n';
                   } 
                   if(info.pic2){
                    goods += '<img src="' + info.pic2 + '">\n';
                   }  
                   if(info.pic3){
                    goods += '<img src="' + info.pic3 + '">\n';
                   } 
                goods += '</div>\n';
            goods += '</div>';
        })
        $(".goodsContent").html(goods)
    }
    $(".cart-icon").click(function () {
        location.href="shopCar.html";
    })
</script>


</body>
</html>
-->
