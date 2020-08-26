<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>我的</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="shortcut icon" href="">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <link rel="stylesheet" href="../lib/light7/light7.min.css">
    <link rel="stylesheet" href="../lib/light7/light7-swiper.min.css">

    <link rel="stylesheet" href="../css/main.css">

    <style>
      .balance {
        background: 0!important;
      }

      #my-money {
        border-right: 1px solid #fff!important;
        color: #fff!important;
      }

      #my-fen {
        color: #fff!important;
      }

      .list3 {
        color: #fff!important;
      }
      #header-mes-img1122 {
        position: absolute!important;
        top: -8px!important;
        left: 4px!important;
        z-index: 999999!important;
      }
      .header-wrap .header-mes-img {
        position: absolute!important;
        top: -8px!important;
        left: 4px!important;
        z-index: 999999!important;
      }
    </style>
    <link rel="stylesheet" href="../css/otherCss/wq.css">

</head>
<body>
<!-- 你的html代码 -->
<div class="page">
    <!-- 工具栏 -->
    <nav class="bar bar-tab">
        <a class="tab-item external" href="index.html" id="home">
            <span class="icon"><img class="home-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/home1.png" alt=""></span>
            <span class="tab-label">商城首页</span>
        </a>
        <a class="tab-item external" href="allClassify.html" id="sort">
            <span class="icon"><img class="sort-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/classification1.png" alt=""></span>
            <span class="tab-label">产品分类</span>
        </a>
        <a class="tab-item external" href="shopCar.html" id="cart">
            <span class="icon"><img class="shopCart-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/cart1.png" alt=""></span>
            <span class="tab-label">购物车</span>
        </a>
        <a class="tab-item active external" href="personCenter.html" id="center">
            <span class="icon"><img class="center-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personal_center02.png" alt=""></span>
            <span class="tab-label">我的</span>
        </a>
    </nav>

    <div class="content">
        <div class="com-top" >
            
            <div class="page-title" style="color: #fff;background:url(http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/mineBg.png) no-repeat center;background-size: 100%;width: 100%;height: 46px;"></div>
            <div class="btn-message" style="background: url(http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/tongzhi.png) no-repeat center;background-size: 100%;"></div>
        </div>
        <div class="header-wrap ma-top44" style="margin-top: 16px!important;background: url(http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/mineBg.png) no-repeat center;background-size: 100%;background-size: 100% 120%;height: 210px;">
            <img class="header-mes-img header-mes-img11" id="header-mes-img1122" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personacenter_setting@3x.png" style="width: 20px;height: 20px;position: absolute;top: -8px;left: 4px;z-index: 999999;"><!--设置-->
            <div class="user-icon" style='top: 20px;'>
                <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personalcenter_head.png" >
                <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personalcenter_nohead.png"  style="display: none"><!--未登录时的头像-->
            </div>
            <div class="user-inform">
                <p class="user-name">小会</p>
                <div class="join-member1" style="display: none">加入会员</div><!--普通用户登陆时-->
                <p class="user-phone">138888888</p>
            </div>

            <div class="member-all">
                <div class="right-member right-member1" >会员权益</div>
                <div class="right-member right-member2">加入会员</div>
            </div>

            <div class="balance" style="border-bottom: 0;">
                <div class="list3" id="my-money">
                    <p>余额</p>
                    <p>20188.00元</p>
                    <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personacenter_balance.png" style="display: none">
                </div>
                <div class="list3" id="my-fen">
                    <p>积分</p>
                    <p>20188.00分</p>
                    <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personacenter_integral.png" style="display: none">
                </div>
            </div>
        </div>
        <div class="order-form" style="position: absolute;left: 5%;top:180px;width: 90%;border-radius: 10px;">
            <div  class="my-form ">
                <span class="myForm">我的订单</span>
                <span class="see-allOrder">查看全部订单</span>
                <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/pc_allorders.png">
            </div>

            <ul class="form-list">
                <li id="goPay">
                    <p class="goPay-img">
                        <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/my11.png">
                        <div class="bd_num" id="gopay-num"></div>
                    </p>
                    <p class="goPay-name">待付款</p>
                </li>
                <li id="goAllocate">
                    <p class="goPay-img"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/my12.png">
                        <div class="bd_num" id="goallocate_num"></div>
                    </p>
                    <p class="goPay-name">待发货</p>
                </li>
                <li id="goSend">
                    <p class="goPay-img"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/my13.png">
                        <div class="bd_num" id="gosend_num"></div>
                    </p>
                    <p class="goPay-name">待收货</p>
                </li>
                <li id="goPick">
                    <p class="goPay-img"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/my14.png">
                        <div class="bd_num" id="gopick_num" ></div>
                    </p>
                    <p class="goPay-name">已确认</p>
                </li>
                <li id="goFinish" class="last-li send-finish">
                     <p class="goPay-img"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/my15.png">
                        <div class="bd_num" id="gofinish_num"></div>
                    </p>
                     <p class="goPay-name">退货/售后</p>
                </li>
            </ul>
        </div>

        <!-- <div class="purchase-history">
            <div class="top1">消费记录</div>
            <div class="promotion-info">
                <div class="spacer"></div>
                <div class="list1">
                    <p class="text1" id="vip_price">0.00</p>
                    <p class="text2">累计可退金额</p>
                </div>
                <div class="list1">
                    <p class="text1"  id="vip_back_price">0.00</p>
                    <p class="text2">累计退款<br>（已入余额）</p>
                </div>
            </div>       
        </div> -->

        <div class="my-promotion" style="margin-top: 94px;">
            <div class="top1">我的推广</div>
             <div class="promotion-info">
                    <div class="spacer"></div>
                <div class="list1">
                    <p class="text1" id="point_reward">0.00</p>
                    <p class="text2" >累计积分</p>
                </div>
                <div class="list1">
                    <p class="text1" id="money_reward">0.00</p>
                    <p class="text2">累计红包<br>（已入余额）</p>
                </div>
           </div>  
        </div>

         <div class="person-module " style="color: #000;">
           <div class="module-list module-list1">
            <div class="module-img1"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/my_redbag.png"></div>
                <span class="module-text1">我的红包</span>
                <div class="module-img"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/pc_allorders.png"></div>
            </div>
            <div class="module-list module-list2">
               <div class="module-img1"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/my22.png"></div>
                <span class="module-text1">我的二维码</span>
               <div class="module-img"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/pc_allorders.png"></div>


            </div>
            <div class="module-list module-list3">
                <div class="module-img1"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/my23.png"></div>
                <span class="module-text1">我的举报</span>
                <div class="module-img"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/pc_allorders.png"></div>

            </div>
          <div class="module-list module-list4" style="border-bottom: 0;">
              <div class="module-img1"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/my24.png"></div>
               <span class="module-text1">意见反馈</span>
               <div class="module-img"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/pc_allorders.png"></div>
            </div>
       </div>

    </div>
</div>

<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/jquery/jquery.cookie.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7-swiper.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../del/main11.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/page.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/verify.js' charset='utf-8'></script>
<script src="../js/main.js"></script>
<script src="../js/personCenter.js"></script>

</body>
</html>