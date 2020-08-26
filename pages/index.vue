<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>首页</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=0">
    <link rel="shortcut icon" href="">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="stylesheet" href="../lib/light7/light7.min.css">
    <link href="https://cdn.bootcss.com/Swiper/4.3.0/css/swiper.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/otherCss/ljh-main.css">
    <link rel="stylesheet" href="../css/otherCss/ljh.css">
    <style>
      .search-index {
        position: absolute;
        top: 42px;
        left: 5%;
        border-radius: 12px;
        font-size: 13px;
        line-height: 24px;
        color: #999;
      }
      .location {
        width: 20px;
        height: 20px;
        position: absolute;
        left: 12px;
        top: 0.6rem;
      }
      .ljh-box8 {
        padding: 10px;
        background-color: #ffffff;
        width: 48%;
        display: inline-block;
        float: left;
        margin-right: 2%;
        margin-bottom: 8px;
        border-radius: 5px;
      }
    </style>
</head>

<body>
    <!-- 你的html代码 -->
    <div class="store-coupon"></div>
    <!--<div class="coupon-box">
    <div class="coupon-mian">
        <div class="coupon-list-bg">
            <div class="coupon-info">
                <p class="ma-bottom5">智享婴品逢8红包</p>
                <p class="coupon-ft1 ma-bottom7"><span>每月8号、18号、28号可使用</span> <span class="fr"><i>￥</i><em>1.40</em></span></p>
                <p class="coupon-ft2 ma-bottom5"><span>有效时间至2018.06.12</span> <span class="fr">满30可用</span></p>
        </div>
        </div>
        <div class="coupon-close"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/graycance.png" alt=""></div>
    </div>
</div>-->
    <div class="page">
        <!-- 工具栏 -->
        <nav class="bar bar-tab">
            <a class="tab-item active external" href="index.html" id="home">
                <span class="icon"><img class="home-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/home02.png" alt=""></span><span class="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/home02.png"></span>
                <span class="tab-label">商城首页</span>
            </a>
            <a class="tab-item external" href="allClassify.html" id="sort">
                <span class="icon"><img class="sort-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/classification1.png" alt=""></span>
                <span class="tab-label">产品分类</span>
            </a>
            <a class="tab-item external" href="shopCar.html" id="cart">
                <span class="icon"><img class="shopCart-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/shopping_cart01.png" alt="">
                </span>
                <span class="tab-label">购物车</span>
            </a>
            <a class="tab-item external" href="personCenter.html" id="center">
                <span class="icon"><img class="center-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personal_center01.png" alt=""></span>
                <span class="tab-label">我的</span>
            </a>
        </nav>
        <!-- 这里是页面内容区 -->

        <div class="content" data-distance="100">
            <div class="index-header top-index-header" style="height: 74px;">
                <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/loaction.png" alt="" class="location">
                <div class="ljh-font-1 ljh-address" style="left: 32px;">杭州江干区店</div>
                <div class="search-index" style="width: 90%;height: 24px;background: #fff;">搜索</div>
                <a class="external" href="#"><img class="message" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/search.png" alt="sing_icon" style="width: 16px;height:16px;position:absolute;top:48px;left:41%;"></a>
            </div>
            <div class="conceal ma-top44" style="margin-top: 74px;">
                <div class="swiper-container goods-banner3">
                    <div id="banner" class="swiper-wrapper"></div>
                </div>
                <div class="middle-wrap clearfix">
                    <img class="middle-wrap-bg" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/bannerdown.png">
                    <ul class="message-list">
                        <li class="message-list1"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/hot.png" alt=""><span>热销爆品</span></li>
                        <li class="message-list2"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/promotion.png" alt=""><span>逢8必折</span></li>
                        <li class="message-list3"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/bargain.png" alt=""><span>疯狂砍价</span></li>
                        <li class="message-list4"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/auction.png" alt=""><span>竞价拍卖</span></li>
                        <li class="message-list5"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/5.jpg" alt=""><span>孕婴服务</span></li>
                        <li class="message-list6"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/earn.png" alt=""><span>赚取积分</span></li>
                        <li class="message-list7"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/recharge.png" alt=""><span>在线充值</span></li>
                        <li class="message-list8"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/game.png" alt=""><span>游戏中心</span></li>
                        <li class="message-list9"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/coin.png" alt=""><span>积分兑换</span></li>
                        <li class="message-list10"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/category.png" alt=""><span>全部类目</span></li>
                    </ul>
                </div>

                <div class="ljh-wire1"></div>
                <div class="get-coupon">
                    <img class="ljh-pic1" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/notice.png" alt="">
                    <div class="ljh-box1">
                        <div class="news" id="news_box">
                            <div class="t_news" id="slider-news">
                                <ul class="news_li2" id="news-list">

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ljh-quickly" id="buying">
                    <div class="ljh-wire4"></div>
                    <div class="ljh-quickly-1">
                        <div class="ter-title">
                            <div class="ljh-wire5"></div>
                            <div class="ljh-font4"><span>快速抢购专区</span></div>
                            <div class="ljh-wire6"></div>
                        </div>
                        <img class="ljh-quickly_buy" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/quick_buy.png" alt="">
                    </div>
                </div>

                <div class="ljh-quickly">
                    <div class="ljh-wire4"></div>
                    <div class="ljh-quickly-Raiders">
                        <div class="ter-title">
                            <div class="ljh-wire5"></div>
                            <div class="ljh-font4"><span>积分夺宝专区</span></div>
                            <div class="ljh-wire6"></div>
                        </div>
                        <div class="points-win">
                            <div class="win-nav">
                                <label class="win-nav-1">夺宝规则</label>
                                <label class="win-nav-2">开奖记录</label>
                                <label class="win-nav-3">我的夺宝</label>
                                <label class="win-nav-4">我的中奖</label>
                            </div>
                            <div class="treasure-list">
                                <figure><img id="treasure-facePhoto" src="https://img.alicdn.com/bao/uploaded/i1/TB1S_dCoXzqK1RjSZFoSuvfcXXa.jpg_190x190Q75s0.jpg_.webp"></figure>
                                <div class="treasure-bot">
                                    <div class="f1">
                                        <span>夺宝价格：</span>
                                        <span class="c1" id="treasure-buyMoney"></span>
                                        <span class="c1" id="unitPoint"></span>
                                        <span class="fr" id="treasure-code"></span>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar"></div>
                                    </div>
                                    <div class="c2"><span id="totalTime"></span> <span class="fr" id="remainTime"></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ljh-quickly" id="bannertion-Carousel">
                    <div class="ljh-wire4"></div>
                    <div class="ter-title">
                        <div class="ljh-wire5"></div>
                        <div class="ljh-font4"><span>活动专题页</span></div>
                        <div class="ljh-wire6"></div>
                    </div>
                    <div id="mainWrap1">
                        <div style="padding-bottom: 0" class="swiper-container activity-banner">
                            <div class="swiper-wrapper" id="bannermer"></div>
                            <div class="swiper-pagination" id="bannertion"></div>
                        </div>
                    </div>
                </div>
                <div class="ljh-wire7"></div>
                <div class="index-good-title">
                    <div class="title-box">
                        <div class="ljh-title_name1"></div> <span>门店专区</span>
                    </div>
                </div>
            </div>
            <!--conceal-->
           
            <div class="ljh-box3">
                    <div class="scroll-index-header">
                            <div class="ljh-font-1">杭州江干区店</div>
                            <a class="external" href="#"><img class="message" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/serch.png" alt="sing_icon"></a>
                  </div>
                <div class="ljh-box5">
                    <div class="container bordernone">
                        <div class="swiper-container swiper1 swiper-ken">
                            <div class="swiper-wrapper nav">
                                <div class="swiper-slide selected click" paramtype="0" data-id="0">全部产品</div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- swiper2 -->
            <div class="swiper-container swiper2">
                <div class="points-scroll">
                    <div class="scroll-box">
                        <div class="detailSale"></div>
                        <div class="infinite-scroll-preloader">
                            <div class="preloader"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <input type="hidden" id="paramtype" value="0">
        <input type="hidden" id="catid" value="">
    </div>
    <style>
        .coupon-money{
        position: absolute;
        right:0;
        top:-5px;  
  }
</style>
    <script type='text/javascript' src='../lib/jquery/jquery-1.11.2.min.js' charset='utf-8'></script>
    <script type='text/javascript' src='../lib/jquery/jquery.cookie.js' charset='utf-8'></script>
    <script type='text/javascript' src='../lib/light7/light7.min.js' charset='utf-8'></script>
    <script src="https://cdn.bootcss.com/Swiper/4.3.0/js/swiper.min.js"></script>
    <script type='text/javascript' src='../del/app.js' charset='utf-8'></script>
    <script type="text/javascript" src="../js/main.js?v=1"></script>
    <script type='text/javascript' src='../js/page.js?v=1' charset='utf-8'></script>
    <script type='text/javascript' src='../js/verify.js' charset='utf-8'></script>
    <script type='text/javascript' src='../js/superSlide.js' charset='utf-8'></script>
    <script type='text/javascript' src='../js/indexpointevent.js?v=1' charset='utf-8'></script>
    <script type='text/javascript' src='../js/indexGoodsList.js?v=1' charset='utf-8'></script>
    <script>

        var getClass = new getClass();
        var Index = new Index();
        $(function () {
            nottoLog()//是否登录;
            getNews()//公告
            getClass.banner();
            getClass.shop();
        })
        var page = 1;
        var flag = true; //判断是否需要分页
        console.log(page);


        function mendianOk(data) {
            var shop_name = data.result.shop_name;
            $(".ljh-font-1").html(shop_name)
            /*if( $.cookie("latitude")==undefined||$.cookie("longitude")==undefined){
                $.cookie("latitude", data.result.latitude,{path:"/"});  
                $.cookie("longitude",data.result.longitude,{path:"/"});
            }*/
            $("body").data("latitude", data.result.latitude);
            $("body").data("longitude",data.result.longitude);
        }
        
        $(".ljh-font-1").on('click',function(e){
            var name=$(".ljh-address").text();
            var  latitude=$("body").data("latitude");
            var  longitude=$("body").data("longitude");
            location.href = 'https://m.amap.com/navigation/index/daddr='+longitude+'%2C'+latitude+'%2C'+name+'&src=jsapi';
        })    

        function bannerOk(data) {//轮播图
            var banner = data.result;
            var ban = '';
            $(banner).each(function (i, info) {
                ban +=
                    '<div link="' + info.link+ '" class="swiper-slide" link_type="' + info.link_type + '"  data-id="' + info.id + '" data-swiper-autoplay="2500" ><img src="' + info.photo + '" alt=""></div>';
            })
            $("#banner").html(ban)
            bannergo();
            $("#banner").on('click', ".swiper-slide", function (e) {
                
                
                var link_type = $(this).attr('link_type');
                var i = $(this).attr('data-id');
                var link = $(this).attr('link');
                
                if(link_type=="3"||link_type=="1"){
                    window.location.href =link;  
                }else{
                    window.location.href = 'goodsDetail.html?id=' + i;
                }
               

            })
        }
        function bannergo() {
            var mySwiper = new Swiper('.goods-banner3', {
                autoplay: {
                    stopOnLastSlide: false,
                    disableOnInteraction: true,
                }
            });
        }
        function getNews() {//公告html 
            var Src = datasrc + "bannermsg/list"
            $.post(Src, function (data) {
                if (data) {
                    if (data.result && data.result.length > 0) {
                        $.each(data.result, function (i, item) {
                            $("#news-list").append('<li create_time="' + item.create_time + '" data-id="' + item.id + '">' + item.title + '</li>');
                        })
                        $("#slider-news").slide({
                            mainCell: 'ul',
                            autoPage: true,
                            effect: 'topLoop',
                            autoPlay: "true",
                            vis: '2',
                            interTime: 3000,

                        })
                    }
                }
            })
        }


        $(".store-coupon").on("click", function () {//逢8红包
            Index.indexCoupon();
        })
        $(document).on("click", ".coupon-close img", function () {
            mytoast("领取成功");
            $(this).parents(".coupon-box").remove();
        })
        function indexCouponOk(data) {//逢8红包html
            if (data) {
                var info = data.result
                var html = '';
                if (data.status == -1) {
                    mytoast(data.msg);
                } else if (data.status == 0) {
                    html += '<div class="coupon-box">';
                    html += '<div class="coupon-mian">';
                    html += '<div class="coupon-list-bg">';
                    html += '<div class="coupon-info" data-id="' + info.id + '">';
                    html += '<p class="ma-bottom5">智享婴品逢8红包</p>';
                    html += '<p class="coupon-ft2 ma-bottom7"><span>每月8号、18号、28号可使用</span> <span class="fr coupon-money"><i>￥</i><em>' + (info.money / 100).toFixed(2) + '</em></span></p>';
                    html += '<p class="coupon-ft2 ma-bottom5"><span>有效时间至2018.06.12</span> <span class="fr">满' + (info.limitMoney / 100).toFixed(2) + '可用</span></p>';
                    html += '</div>';
                    html += '</div>';
                    html += ' <div class="coupon-close"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/graycance.png" alt=""></div>';
                    html += '</div>';
                    html += '</div">';
                    if ($(".coupon-box").length == 0) {
                        $("body").append(html)
                    }
                } else {
                    mytoast(data.msg);
                }

            }

        }

        /**抢购活动专题页**/
        Index.indexbanner();
        function indexbannerOk(data) {
            if (data.result && data.result.length > 0) {
                $(".ljh-quickly_buy").attr("src", data.result[0].photo)
            }
        }

        Index.bannermer() //活动活动专题页
        function bannermerOk(data) {
            if (data) {
                var tion = "";
                var imghtml = "";
                if (data.result && data.result.length > 0) {
                    $("#bannertion-Carousel").show();
                    $(data.result).each(function (i, item) {
                        imghtml += '<div class="swiper-slide" data-id="' + item.link + '" ><img src="' + item.photo + '"></div>';
                        if (i == 0) {
                            tion += '<span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>';
                        } else {
                            tion += '<span class="swiper-pagination-bullet"></span>';
                        }
                    });
                    $('#bannermer').append(imghtml);
                    $("#bannertion").append(tion);
                    $("#bannermer").on('click', ".swiper-slide", function (e) {
                        var i = $(this).attr('data-id');
                        window.location.href = 'goodsDetail.html?id=' + i;

                    })
                    bannermerTop();
                } else {
                    $("#bannertion-Carousel").hide();
                }



            }
        }
        function bannermerTop() {//轮播js调用
            var bannerSwiper = new Swiper('.activity-banner', {
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
                loop: true
            });

        }

        $(".message-list1").on("click", function () {
            location.href = "hotProducts.html";
        })

        $(".message-list2").on("click", function () {
            location.href = "eightDiscount.html";
        })
        $(".message-list3").on("click", function () {
            location.href = "bargain.html";
        })
        $(".message-list4").on("click", function () {
            location.href = "buyRightNow.html"
        })

        $(".message-list5").on("click", function () {
            location.href = "pregnantBaby.html";
        })
        $(".message-list6").on("click", function () {
            location.href = "gainNum.html";
        })
        $(".message-list7").on("click", function () {
            location.href = "online-rech.html";
        })
        $(".message-list8").on("click", function () {
            location.href = "game-center.html";
        })

        $(".message-list9").on("click", function () {
            location.href = "exchange.html";
        })

        $(".message-list10").on("click", function () {
            location.href = "allClassify.html";
        })

        $(".ljh-box8").on("click", function () {
            location.href = "goods-detail.html";
        })
        $("#buying").on("click", function () {
            location.href = "rushTobuy.html";
        })
        $(".message").on("click", function () {
            location.href = "search.html";
        })

    </script>
</body>

</html>