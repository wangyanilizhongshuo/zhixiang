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
    <link rel="stylesheet" href="../css/otherCss/wq.css">
</head>
<body>
<!-- 你的html代码 -->
<div class="page1">
    <!-- 工具栏 -->
    <nav class="bar bar-tab">
        <a class="tab-item external" href="index.html" id="home">
            <span class="icon"><img class="home-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/home1.png" alt=""></span>
            <span class="tab-label">首页</span>
        </a>
        <a class="tab-item external" href="fruitMenu.html" id="sort">
            <span class="icon"><img class="sort-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/classification1.png" alt=""></span>
            <span class="tab-label">分类</span>
        </a>
        <a class="tab-item external" href="shopCar.html" id="cart">
            <span class="icon"><img class="shopCart-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/cart1.png" alt=""><span class="cart-circle02"></span></span>
            <span class="tab-label">购物车</span>
        </a>
        <a class="tab-item active external" href="personCenter.html" id="center">
            <span class="icon"><img class="center-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personalcenter1.png" alt=""></span>
            <span class="tab-label">个人中心</span>
        </a>
    </nav>

    <div class="content">
        <div class="header-wrap">
            <!--<a class="external" href="inform.html"><img class="header-mes-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personacenter_setting@3x.png" alt=""><span class="msg-circle"></span></a>-->
            <div class="user-icon">
                <a class="external" href="personData.html"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personalcenter_head.png" alt=""></a>
            </div>

            <div class="user-inform">
                <p class="user-name">小会</p>
                <p class="user-phone">138888888</p>
            </div>
               <div class="join-member1"><p class="join-member-text">加入会员</p></div>



            <div class="balance">
                <div class="list3">
                    <p class="text3">余额<br>0.00元</p>
                </div>
                <div class="list3">
                    <p class="text3">积分<br>0.00分</p>
                </div>


            </div>
        </div>


        <div class="order-form">
            <a href="allMyOrder.html"  class="all-form external" >我的订单<span class="see-allOrder">查看全部订单</span></a>



            <ul class="form-list">
                <li id="goPay" data-type="-1"><a href="javascript:;" class="wait-pay"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/pc_pay.png" alt="wait-pay" /><span class="order-circle1"></span><p>待付款</p></a></li>
                <li id="goAllocate" data-type="0"><a href="javascript:;" class="wait-send"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/pc_distribution.png" alt="wait-send" /><span class="order-circle2"></span><p>配货中</p></a></li>
                <li id="goSend" data-type="1"><a href="javascript:;" class="send-goods"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/pc_send.png" alt="send-goods" /><span class="order-circle3"></span><p>配送中</p></a></li>
                <li id="goPick" data-type="3"><a href="javascript:;" class="wait-pick"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/order_pickup.png" alt="wait-pick" /><span class="order-circle4"></span><p/>待自提</p></a></li>
                <li id="goFinish" class="last-li send-finish" data-type="4"><a  href="javascript:;"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/pc_finish.png" alt="send-finish" /><span class="order-circle5"></span><p>已完成</p></a></li>
            </ul>
        </div>

        <div class="purchase-history">
            <div class="ph-top">
                <p class="top1">消费记录</p>
            </div>
            <div class="list1">
                <div class="list-list1">
                    <p class="text1">0.00</p>
                    <p class="text2-1">累计可退金额</p>
                </div>
            </div>
            <div class="list2">
                <div class="list-list2">
                <p class="text1">0.00</p>
                <p class="text2">累计退款<br>（已入余额）</p>
                </div>
            </div>
        </div>
        <div class="my-promotion">
            <div class="ph-top">
                <p class="top1">我的推广</p>
            </div>
            <div class="list1">
                <div class="list-list1">
                    <p class="text1">0.00</p>
                    <p class="text2-1">累计积分</p>
                </div>
            </div>
            <div class="list2">
                <div class="list-list2">
                    <p class="text1">0.00</p>
                    <p class="text2">累计红包<br>（已入余额）</p>
                </div>
            </div>
        </div>

        <div class="person-module clearfix">
            <ul class="module-list01">
                <li><a class="external" href="wallet.html"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/pc_mywallet.png" alt="my-wallet" /><span >我的红包</span></a></li>
                <li><a class="external" href="myCredits.html"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/pc_mypoints.png" alt="my-points" /><span>我的二维码</span></a></li>
                <li><a class="external" href="discountWuse.html"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/pc_mytickets.png" alt="my-points" /><span>我的举报</span></a></li>
                <li><a class="external" href="calender.html"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/pc_sign.png" alt="my-points" /><span>意见反馈</span></a></li>
            </ul>
        </div>
    </div>
</div>

<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7-swiper.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../del/main11.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/page.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/verify.js' charset='utf-8'></script>

<script>
    var carNum = JSON.parse(localStorage.carNum);
    var getInfo = new GetInfo();
    var order = new OrderDetail();
    var inform = new Inform();

    $(function () {
        if(carNum > 0){
            $(".cart-circle02").show().html(carNum);
        }
    })

    /***********加载完后设置昵称**************/
    $(function () {
        getInfo.getInfo();
        order.orderNum();
        inform.getInform(1);
    })

    /*************获取列表消息总条数成功***********/
    function getInformOk(data){
        console.log(data);
        var num = data.result.num;
        if(num > 0){
            $(".msg-circle").show().html(num);
        }
    }

    /***************获取用户信息成功*****************/
    function getInfoOk(data) {
        console.log(data);
        localStorage.setItem('userInfo',JSON.stringify(data.result));
        var userData = data.result;
        var nickName = userData.nickName;
        var userGrade = parseInt(userData.gradeId);
        switch (userGrade){
            case 1:
                $(".user-level").html("咸菜窝头");
                break;
            case 2:
                $(".user-level").html("煎饼果子");
                break;
            case 3:
                $(".user-level").html("炖肉烙饼");
                break
            case 4:
                $(".user-level").html("西湖醋鱼");
                break
            case 5:
                $(".user-level").html("鸡腿汉堡");
                break
            case 6:
                $(".user-level").html("法式鹅肝");
                break
            case 7:
                $(".user-level").html("脆烤乳猪");
                break
            case 8:
                $(".user-level").html("满汉全席");
                break
        }
        $(".user-name a").html(nickName); //记载完后用本地缓存修改用户昵称
    }

    /*********获取订单数量成功********/
    function getOrderNumOk(data){
        console.log(data);
        var orderNum = data.result;
        if(orderNum.num1 > 0){
            $(".order-circle1").show().html(orderNum.num1);
        }
        if(orderNum.num2 > 0){
            $(".order-circle2").show().html(orderNum.num2);
        }
        if(orderNum.num3 > 0){
            $(".order-circle3").show().html(orderNum.num3);
        }
        if(orderNum.num3 > 0){
            $(".order-circle3").show().html(orderNum.num3);
        }
        if(orderNum.num4 > 0){
            $(".order-circle4").show().html(orderNum.num4);
        }
    }

    /************点击跳转事件***********/
    $(".user-icon").click(function () {
        /*食之味会员等级说明*/
    })

    $("#goPay").click(function () {
        location.href = "allMyOrder.html?type="+$(this).attr("data-type");
    })
    $("#goAllocate").click(function () {
        location.href = "allMyOrder.html?type="+$(this).attr("data-type");
    })
    $("#goSend").click(function () {
        location.href = "allMyOrder.html?type="+$(this).attr("data-type");
    })
    $("#goPick").click(function () {
        location.href = "allMyOrder.html?type="+$(this).attr("data-type");
    })
    $("#goFinish").click(function () {
        location.href = "allMyOrder.html?type="+$(this).attr("data-type");
    })
</script>
</body>
</html>