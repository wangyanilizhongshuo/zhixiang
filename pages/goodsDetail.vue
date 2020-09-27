<template>
    <view>


        <div class="page goods-detail">
            <div class="content">
                <div class="goods-info-1">
                    <div style="padding-bottom: 0" class="swiper-container goods-banner">
                            <div class="activity-diffTime">
                            <span class="joind">00</span><em>天</em><span class="joinh">00</span><em>时</em><span class="joinm">00</span><em>分</em><span
                                    class="joins">00</span><em>秒</em>
                            </div>
                        <div class="swiper-wrapper" id="bannerWrap">
                        </div>
                        <div class="swiper-pagination" id="bannertion"></div>
                    </div>

                    <div class="goods-detail-popout">
                        <img src="http://zxyp.hzbixin.cn/files/84911600416788073.jpg">
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
                                        <img src="http://zxyp.hzbixin.cn/files/50671600416830553.jpg">
                                        <span class="content-name">品***的</span>
                                        <span class="content-data">2017-02-24</span>
                                    </div>
                                    <div class="content-text">
                                        <span>宝贝收到，试用了一下很顺手，这个重量真的有些沉，要的就是这效果，夏日拉练走起！钢丝的看起来好结实，估计可以跳很长时间，每天15分钟，坚持下去，效果肯定不错！送的小袋子可以随身携带出去锻炼，很喜欢！</span>
                                    </div>
                                    <div class="content-img">
                                        <img src="http://zxyp.hzbixin.cn/files/93381600416860573.jpg">
                                        <img src="http://zxyp.hzbixin.cn/files/93381600416860573.jpg">
                                        <img src="http://zxyp.hzbixin.cn/files/93381600416860573.jpg">
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
             
                <div class="standard">
                    <div class="label">规格</div>
                    <ul class="standrd-list">
                        
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
                        <img src="http://zxyp.hzbixin.cn/files/94481600416926671.jpg">
                        <span>微信好友</span>
                    </div>
                    <div class="popup-vx2">
                        <img src="http://zxyp.hzbixin.cn/files/77361600416959081.jpg">
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
                jifen_show: false,
                
            }
        },
        methods: {
            
        }
    }
</script>

<style>
   


</style>

