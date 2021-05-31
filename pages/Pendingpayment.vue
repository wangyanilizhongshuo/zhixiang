<template>
    <view>

        
        <div class="page">
            <div class="content">
                <!-- 
                <div class="com-top">
                    <div class="arrow-l" @click='jump' data-url=' ' data-type='6'></div>
                    <div class="page-title">订单详情</div>
                </div> 
                -->
                <div class="top">
                    <p class="top-1">等待买家付款</p>
                    <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/order_pay.png" class="top-2">
                </div>
                <div class="middle">
                    <p  class="middle-3">收货人:&nbsp;</span>小会</p>
                    <span class="middle-1">18888888888</span>
                    <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/order_add_icon.png" >
                    <p class="middle-2">浙江省绍兴市越城区镜湖新区金滩大厦3楼会友网络科技有限公司</p>
                </div>
                <div class="storename">
                    <div class="storename-img1"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/dp.png"></div>
                    <p>妈咪宝贝</p>
                </div>
                <div class="listgoods-1">
                    <div class="listgoods-list">
                        <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/sp.jpg">
                        <div class="listgoods-name">jELLYCAT害羞系列之邦尼兔子米色中号儿童玩具</div>
                        <div class="listgoods-size">规格<span>米色</span></div>
                        <div class="listgoods-money">
                            <span class="listgoods-1">￥139.00</span>
                            <span class="listgoods-2">35积分</span>
                            <span class="listgoods-3">x1</span>
                        </div>
                    </div>
                    <div class="background-null"></div>
                    <div class="listgoods-list">
                        <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/sp.jpg">
                        <div class="listgoods-name">jELLYCAT害羞系列之邦尼兔子米色中号儿童玩具</div>
                        <div class="listgoods-size">规格<span>米色</span></div>
                        <div class="listgoods-money">
                            <span class="listgoods-1">￥139.00</span>
                            <span class="listgoods-2">35积分</span>
                            <span class="listgoods-3">x1</span>
                        </div>
                    </div>
                </div>
                <div class="total">
                    <p class="total_goods">共计商品<span>2件</span></p>
                    <p class="totalPrice">合计：<span class="total_Price">¥</span><span class="total-Price">139.00</span></p>
                    <p class="total-1"><span>35</span><span>积分</span></p>
                </div>
                <div class="remarks">
                    <p><span>备注:</span><span>双休日送货</span></p>
                </div>
                <div class="orderNum">
                    <p class="orderNum-1"><span>订单编号：</span><span>454216453215</span></p>
                    <p class="orderNum-2"><span>下单时间：</span><span>2017-3-24</span><span>16:20:02</span></p>
                </div>
                <div class="calculation">
                    <span>订单总金额</span>
                    <span>¥230.00</span>
                    <span>积分</span>
                    <span>35积分</span>
                    <span>运费</span>
                    <span>¥6.00</span>
                </div>
                <div class="end">
                    <p>实付金额：<span>¥231.00</span></p>
                </div>

                <div class="my-order-pay-qq">
                    <div class="cancle-myOrder" @click='jifen_show=true' >取消订单</div>
                    <div class="goPay" @click.stop='jump' data-url='/pages/payment' >去付款</div>
                </div>
            </div>
        </div>

        <div class="popup-overlay modal-overlay-visible" style="display: block;" v-if='jifen_show'  @click='jifen_show=false' ></div>
        <div class="popup modal-in" id="popup-refund" style="display: block;" v-if='jifen_show' >
            <div class="popup-content">
                <div class="popup-top">
                    <span>退款原因</span>
                    <div class="close-popup btn-close2" @click='jifen_show=false'></div>
                </div>
                <div class="popup-center">
                    <div class="popup-list">
                        <label class="label-checkbox item-content">
                            <input type="radio" name="my-radio">
                            <div class="item-media item-media-popup"><i class="icon icon-form-checkbox"></i></div>
                            <span>拍错/误拍</span>
                        </label>
                    </div>
                    <div class="popup-list">
                        <label class="label-checkbox item-content">
                            <input type="radio" name="my-radio">
                            <div class="item-media item-media-popup"><i class="icon icon-form-checkbox" ></i></div>
                            <span>信息填写错误，重新拍</span>
                        </label>
                    </div>
                    <div class="popup-list">
                        <label class="label-checkbox item-content">
                            <input type="radio" name="my-radio">
                            <div class="item-media item-media-popup"><i class="icon icon-form-checkbox" ></i></div>
                            <span>我不想买了</span>
                        </label>
                    </div>
                    <div class="popup-list">
                        <label class="label-checkbox item-content">
                            <input type="radio" name="my-radio">
                            <div class="item-media item-media-popup"><i class="icon icon-form-checkbox" ></i></div>
                            <span>其他原因</span>
                        </label>
                    </div>
                    <div class="popup-text">
                        <textarea type="text" placeholder="请输入退款原因"></textarea>
                    </div>
                </div>
                <div class="popup-btn" @click='jifen_show=false' >确定</div>
            </div>
        </div>
        
    </view>
</template>

<script>
    import light7_min from "@/component/css/light7_min";
    import cj_1 from "@/component/css/cj_1";
    import cj from "@/component/css/cj";
    import reset1 from "@/component/css/reset1";
    import main from "@/component/css/main";


    export default {

        components: {
            main,
            reset1,
            cj,
            cj_1,
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

    @import "../common/commons/css/otherCss/cj-1.css";
    @import "../common/commons/css/otherCss/cj.css";

    @import "../common/commons/css/reset1.css";


    @import "../common/commons/css/main.css";*/


</style>

<!--  
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>订单详情//待付款</title>


    <script src="../lib/jquery/jquery1.12.4.js"></script>
    <script src="../del/index1.js"></script>





</head>
<body>
<script src="../lib/jquery/jquery1.12.4.js"></script>
<script src="../del/index1.js"></script>
<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7-swiper.min.js' charset='utf-8'></script>
<script type="text/javascript" src="../del/main11.js"></script>
<script>
    $(document).on('click','.cancle-myOrder', function () {
        $.popup('#popup-refund');
    });
    $('.goPay').click(function () {
        location.href='payment.html'
    })
</script>
</body>
</html>
-->
