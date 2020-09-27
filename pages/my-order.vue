<template>
    <view>
        <div class="content">
            <div class="com-top">
                <div class="arrow-l" @click='jump' data-url=' ' data-type='6'></div>
                <div class="page-title">订单详情</div>
            </div>
            <ul class="my-order">
                <li class="my-order-all">全部</li>
                <li class="my-order-dfk">待付款</li>
                <li class="my-order-dfh">待发货</li>
                <li class="my-order-dsh">待收货</li>
                <li class="my-order-dpj">待评价</li>
            </ul>
            <div class="all">
                <div class="storename-1">
                    <img src="http://zxyp.hzbixin.cn/files/35691600417075204.jpg" alt="">
                    <p>妈咪宝贝</p>
                    <span>交易成功</span>
                </div>
                <ul class="listgoods-1">
                    <a href="refund.html">
                        <li class="list"><img src=" http://zxyp.hzbixin.cn/files/32701600417113728.jpg" alt="">
                            <p class="list_name">JELLYCAT害羞系列之邦尼兔子米色中号儿童玩具</p>
                            <p class="listSpecifications">规格：<span>米色</span></p>
                            <p class="listPrice"><span>¥139.00</span>
                                &nbsp;&nbsp;</p><span class="listamount">×<span>1</span></span>
                        </li>
                    </a>
                    <div class="white"></div>
                    <a href="refund.html">
                        <li class="list"><img src="http://zxyp.hzbixin.cn/files/32701600417113728.jpg" alt="">
                            <p class="list_name">JELLYCAT害羞系列之邦尼兔子米色中号儿童玩具</p>
                            <p class="listSpecifications">规格：<span>米色</span></p>
                            <p class="listPrice"><span>¥139.00</span>
                                &nbsp;&nbsp;</p><span class="listamount">×<span>1</span></span>
                        </li>
                    </a>
                </ul>
                <div class="my-order-amount">
                    <p>共计2件商品 合计<span>¥443.00</span>(含运费¥6.00)</p>
                </div>
            </div>
            <!--待付款-->
            <div class="dfk">
                <div class="storename-2">
                    <img src="http://zxyp.hzbixin.cn/files/33471600417160788.jpg" alt="">
                    <p>妈咪宝贝</p>
                    <span>待付款</span>
                </div>
                <ul class="listgoods-1">
                    <a href="Pendingpayment.html">
                        <li class="list"><img src="http://zxyp.hzbixin.cn/files/32701600417113728.jpg" alt="">
                            <p class="list_name">JELLYCAT害羞系列之邦尼兔子米色中号儿童玩具</p>
                            <p class="listSpecifications">规格：<span>米色</span></p>
                            <p class="listPrice"><span>¥139.00</span>
                                &nbsp;&nbsp;</p><span class="listamount">×<span>1</span></span>
                        </li>
                    </a>
                    <div class="white"></div>
                    <a href="Pendingpayment.html">
                        <li class="list"><img src="http://zxyp.hzbixin.cn/files/32701600417113728.jpg" alt="">
                            <p class="list_name">JELLYCAT害羞系列之邦尼兔子米色中号儿童玩具</p>
                            <p class="listSpecifications">规格：<span>米色</span></p>
                            <p class="listPrice"><span>¥139.00</span>
                                &nbsp;&nbsp;</p><span class="listamount">×<span>1</span></span>
                        </li>
                    </a>
                </ul>
                <div class="my-order-amount">
                    <p>共计2件商品 合计<span>¥443.00</span>(含运费¥6.00)</p>
                </div>
                <!-- 
                <div class="my-order-pay-qq">
                    <a class="qxdd">取消订单</a>
                    <a href="">去付款</a>
                </div>
                 -->
                <div class="confirm"  @click='jifen_show=true' ><a href="">取消订单</a></div>
                <div class="confirm"><a href="">去付款</a></div>

            </div>
            <!--待发货-->
            <div class="dfh">
                <div class="storename-2">
                    <img src="http://zxyp.hzbixin.cn/files/33471600417160788.jpg" alt="">
                    <p>妈咪宝贝</p>
                    <span>待发货</span>
                </div>
                <ul class="listgoods-1">
                    <a href="Pendingdelivery.html">
                        <li class="list"><img src="http://zxyp.hzbixin.cn/files/32701600417113728.jpg" alt="">
                            <p class="list_name">JELLYCAT害羞系列之邦尼兔子米色中号儿童玩具</p>
                            <p class="listSpecifications">规格：<span>米色</span></p>
                            <p class="listPrice"><span>¥139.00</span>
                                &nbsp;&nbsp;</p><span class="listamount">×<span>1</span></span>
                        </li>
                    </a>
                    <div class="white"></div>
                    <a href="Pendingdelivery.html">
                        <li class="list"><img src="http://zxyp.hzbixin.cn/files/32701600417113728.jpg" alt="">
                            <p class="list_name">JELLYCAT害羞系列之邦尼兔子米色中号儿童玩具</p>
                            <p class="listSpecifications">规格：<span>米色</span></p>
                            <p class="listPrice"><span>¥139.00</span>
                                &nbsp;&nbsp;</p><span class="listamount">×<span>1</span></span>
                        </li>
                    </a>
                </ul>
                <div class="my-order-amount">
                    <p>共计2件商品 合计<span>¥443.00</span>(含运费¥6.00)</p>
                </div>
            </div>
            <!--待收货-->
            <div class="dsh">
                <div class="storename-2">
                    <img src="http://zxyp.hzbixin.cn/files/33471600417160788.jpg" alt="">
                    <p>妈咪宝贝</p>
                    <span>待收货</span>
                </div>
                <ul class="listgoods-1">
                    <a href="Goodstobereceived.html">
                        <li class="list"><img src="http://zxyp.hzbixin.cn/files/32701600417113728.jpg" alt="">
                            <p class="list_name">JELLYCAT害羞系列之邦尼兔子米色中号儿童玩具</p>
                            <p class="listSpecifications">规格：<span>米色</span></p>
                            <p class="listPrice"><span>¥139.00</span>
                                &nbsp;&nbsp;</p><span class="listamount">×<span>1</span></span>
                        </li>
                    </a>
                    <div class="white"></div>
                    <a href="Goodstobereceived.html">
                        <li class="list"><img src="http://zxyp.hzbixin.cn/files/32701600417113728.jpg" alt="">
                            <p class="list_name">JELLYCAT害羞系列之邦尼兔子米色中号儿童玩具</p>
                            <p class="listSpecifications">规格：<span>米色</span></p>
                            <p class="listPrice"><span>¥139.00</span>
                                &nbsp;&nbsp;</p><span class="listamount">×<span>1</span></span>
                        </li>
                    </a>
                </ul>
                <div class="my-order-amount">
                    <p>共计2件商品 合计<span>¥443.00</span>(含运费¥6.00)</p>
                </div>
                <div class="confirm"><a href="">确认收货</a></div>
            </div>
            <!--待评价-->
            <div class="dpj">
                <div class="storename-2">
                    <img src="http://zxyp.hzbixin.cn/files/33471600417160788.jpg" alt="">
                    <p>妈咪宝贝</p>
                    <span>待评价</span>
                </div>
                <ul class="listgoods-1">
                    <a href="Tobeevaluated.html">
                        <li class="list"><img src="ttp://zxyp.hzbixin.cn/files/32701600417113728.jpg" alt="">
                            <p class="list_name">JELLYCAT害羞系列之邦尼兔子米色中号儿童玩具</p>
                            <p class="listSpecifications">规格：<span>米色</span></p>
                            <p class="listPrice"><span>¥139.00</span>
                                &nbsp;&nbsp;</p><span class="listamount">×<span>1</span></span>
                        </li>
                    </a>
                    <div class="white"></div>
                    <a href="Tobeevaluated.html">
                        <li class="list"><img src="ttp://zxyp.hzbixin.cn/files/32701600417113728.jpg" alt="">
                            <p class="list_name">JELLYCAT害羞系列之邦尼兔子米色中号儿童玩具</p>
                            <p class="listSpecifications">规格：<span>米色</span></p>
                            <p class="listPrice"><span>¥139.00</span>
                                &nbsp;&nbsp;</p><span class="listamount">×<span>1</span></span>
                        </li>
                    </a>
                </ul>
                <div class="my-order-amount">
                    <p>共计2件商品 合计<span>¥443.00</span>(含运费¥6.00)</p>
                </div>
                <div class="confirm"><a href="evaluate.html">去评价</a></div>
            </div>
            <div class="mengban" style="display: block;" v-if='jifen_show'  @click='jifen_show=false'  >
            </div>
            <div class="refund" id="qx1" style="display: block;" v-if='jifen_show' >
                <div class="reason">退款原因<div class="ggb"  @click='jifen_show=false' ></div>
                </div>
                <div class="details">
                    <div class="detail-1">
                        <div class="quan-1">
                            <div class="quan" id="quan1"></div>
                            <p>拍错/误拍</p>
                        </div>
                        <div class="quan-1">
                            <div class="quan" id="quan2"></div>
                            <p>信息填写错误，重新拍</p>
                        </div>
                        <div class="quan-1">
                            <div class="quan" id="quan3"></div>
                            <p>我不想买了</p>
                        </div>
                        <div class="quan-1">
                            <div class="quan" id="quan4"></div>
                            <p>其他原因</p>
                        </div>
                    </div>
                    <div class="details-2"><textarea class="shuru" placeholder="请输入退款原因"></textarea></div>
                </div>
                <a href="javascript:"  @click='jifen_show=false' >确定</a>
            </div>
        </div>
    </view>
</template>

<script>
    import cj from "@/component/css/cj";
    import reset1 from "@/component/css/reset1";
    import cj_1 from "@/component/css/cj_1";
    import main from "@/component/css/main";


    export default {

        components: {
            main,
            cj_1,
            reset1,
            cj,
        },
        data() {
            return {
                /*
                    true false
                    style="display: block;" v-if='jifen_show' 
                    @click='jifen_show=true' 
                    @click='jifen_show=false' 
                */
                jifen_show: true,
                
            }
        },
        methods: {
            
        }
    }
</script>

<style>

    /*@import "../common/commons/css/otherCss/cj.css";

    @import "../common/commons/css/reset1.css";

    @import "../common/commons/css/otherCss/cj-1.css";

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
    <title>订单详情</title>

    <script src="../lib/jquery/jquery1.12.4.js"></script>
    <script src="../del/index1.js"></script>

</head>
<body>


</body>

</html>
-->
