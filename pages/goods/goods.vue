<template>
    <view class="uni-details">
        <div class="page goods-detail page-current page-inited" id="page-1589596989584">
            <div class="content">
                <div class="goods-info-1">

                    <div style="padding-bottom: 0" class="swiper-container goods-banner swiper-container-horizontal swiper-container-ios">

                        <div class="activity-diffTime">
                            <span class="joind">00</span><em>天</em><span class="joinh">00</span><em>时</em><span class="joinm">00</span><em>分</em><span class="joins">00</span><em>秒</em>
                        </div>

	                    <swiper indicator-dots autoplay circular style='height:380px;' indicator-active-color='#007aff' >
	                    	<swiper-item v-for="(item,index) in goods_info.pic" :key='index+"pic"'>
	                    		<img :src="item.url" alt="">
	                    	</swiper-item>
	                    </swiper>
                    </div>
                    <div class="goods-detail-popout" style="display: block;" v-if='cmBtn1_show'>
                        <img src="http://zxyp.hzbixin.cn/files/58981600407864722.jpg">
                        <span>已加入购物车</span>
                    </div>
                    <div class="goods-info">
                        <div class="goods-name">{{goods_info.goods.name}}</div>
                        <div class="goods-price">
                        	<span>¥</span>
                        	<span style="font-size: 25px">
		                        {{wjw_wxs.toFixed(goods_info.repertory[0].price/100,2)}} 
		                    </span> 
		                    <span style='margin-left: 30rpx;'> 积分{{goods_info.repertory[0].points}}</span>
		                </div>
                        <div class="old-price">原价：￥<span>{{wjw_wxs.toFixed((goods_info.repertory[0].old_price/100),2)}}</span> <span class="fr">已售 {{goods_info.repertory[0].sale_num}} 件</span></div>
                        <div class="other-info"></div>
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
                <div class="goods-num" @click='popup_num_show=true'>
                    <div id="format">{{amount?'已选'+amount+'个':'请选择商品规格及数量'}}</div>
                    <div class="arrow-r"></div>
                </div>
                <div class="swiper-container goods-info-2 swiper-container-horizontal swiper-container-autoheight swiper-container-ios" id="swiperInfo">
                    <div class="swiper-pagination tab-row swiper-pagination-null">
                        <div class="tab-item" :class='{active: tab_index==0}' @click='detailJump'>详情</div>
                        <div class="tab-item" :class='{active: tab_index==1}' @click='tab_index=1'>参数</div>
                        <div class="tab-item" :class='{active: tab_index==2}' @click='tab_index=2'>评价</div>
                    </div>
                   
                    <div class="swiper-wrapper tab-content" :style="'transform: translate3d(-' + (100*tab_index) + 'vw, 0px, 0px); transition-duration: 0ms; '">

                    	
                        <div class="swiper-slide tab-area" id="detail" style="width: 100vw;">
                        	<!-- <web-view :src="goods_info.goodsDetailUrl" id="details" frameborder="0" align="center" width="100%" height="100%"></web-view> -->
                        </div>

                        <!-- swiper-slide-prev -->
                        <div class="swiper-slide tab-area " style="width: 100vw;">
                        	
                            <ul class="goods-canshu">
                                <li class="canshu-item" v-for="(info,index) in goods_info.property" :key='index+"property"' >
                                    <div class="detail-message-1">
                                        <div class="detail-message-font" style="width:300rpx">{{info.name}}</div>
                                        <div class="detail-message-style" style="width:400rpx;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{info.value}}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="swiper-slide tab-area " style="width: 100vw;">
                        	
                            <div class="goodsContent">
                                <div class="goodsContent-list" v-for="(info,index) in goodscomment" :key='index+"goodscomment"' >
                                    <div class="content-top">
                                        <img style="display: inline-block;width:60rpx;height:60rpx;padding:0rpx;margin-right:15rpx;border-radius:30rpx; ;" :src="info.head_photo">
                                        <span class="content-name">{{info.nickname}}</span>
                                        <span class="content-data">{{timestampToTime(info.create_time)}}</span>
                                    </div>
                                    <div class="content-text">
                                        <span style="display: inline-block;margin:20rpx 0;;">{{info.content}}</span>
                                    </div>
                                    <div class="content-img" v-if=' info.pic1 || info.pic2 || info.pic3'>
                                        <img style="border-radius: 20rpx;" v-if='info.pic1!="undefined"' :src="info.pic1">
                                        <img style="border-radius: 20rpx;" v-if='info.pic2!="undefined"' :src="info.pic2">
                                        <img style="border-radius: 20rpx;" v-if='info.pic3!="undefined"' :src="info.pic3">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                </div>
            </div>
            <div class="bot-bar">
                <ul>
                    <li class="btn-cart" @click='jump' data-url='/pages/shopCar/shopCar' data-type='3'>
                        <div class="cart-icon"></div>购物车
                        <span class="cart-circle02" v-if='amounts'>{{amounts}}</span>
                    </li>
						<li class="btn-server">
							<button hover-class="none" class="btns"  open-type="contact"  sessionFrom="weapp">
								<a :href="'tel:'+phone" id="service" style="border: 3rpx solid white;">
								       <view class="server-icon"></view>
										客服
								 </a>
							</button>
						</li>
                    <li class="btn-addCart" v-if="specialMakeMoney==1"  @tap='popup_num_show=true'>加入购物车 </li>
                    <li class="btn-buy"  @tap='popup_num2_show=true'>立即购买</li>
                </ul>
            </div>
        </div>
        <!-- goods num Popup -->
        <div class="popup modal-in" id="popup-num" style="display: block;" v-if='popup_num_show'>
            <div class="pop-content">
                <div class="close-popup btn-close" @click='popup_num_show=false'></div> <img :src="goods_info.pic[0].url" class="goods-img">
                <div class="current-info">
                    <div class="current-price"><span class="info-price">￥{{price||wjw_wxs.toFixed((goods_info.repertory[0].price/100),2)}}</span> <span class="points-num" style='margin-left: 30rpx;'> 积分{{points||goods_info.repertory[0].points}}</span></div>
                    <div class="sold-num">已售{{goods_info.repertory[0].sale_num}}件</div>
                    <div class="current-choose">已选择"{{name||goods_info.repertory[0].name}}"</div>
                </div>
                <div class="standard">
                    <div class="label">规格</div>
                    <ul class="standrd-list">
                        <li  v-for="(item,index) in goods_info.repertory" :key='index+"standrd"' class="standrd-item " :class='{"standard-item-on":standrd_index==index}' :data-id="item.id" :saleeventid="item.sale_event_id" :data-name="item.name" :data-points="item.points" :data-price="wjw_wxs.toFixed((item.price/100),2)" :data-index='index' @click='standrd'>{{item.name}}</li>
                    </ul>
                </div>
                <div class="num-area">
                    <div class="label" style="left: 0;">数量</div>
                    <div class="btn-area">
                        <div class="choose-amount-btn num-choose-wrap">
                            <button class="num-reduce left button pull-left" type="default" @tap.stop="amount>0&&amount--" data-id="6128">-</button>
                            <label class="num-at pull-left uni-label" type="button" id="num">{{amount}}</label>
                            <button class="num-add right button pull-left" type="default" data-id="6128" @tap.stop="amount++">+</button>
                        </div>
                    </div>
                </div>
                <div class="btn-ok close-popup" id="cmBtn1" @click='popup_num_show=false,cmBtn1_fn()'>确定</div>
            </div>
        </div>
        <div class="popup-overlay modal-overlay-visible" @click='popup_num_show=false' v-if='popup_num_show'></div>

        <!-- 立即购买 -->
        <div class="popup modal-in" id="popup-num2" style="display: block;" v-if='popup_num2_show'>
            <div class="pop-content">
                <div class="close-popup btn-close" @click='popup_num2_show=false'></div> <img :src="goods_info.pic[0].url" class="goods-img">
                <div class="current-info">
                    <div class="current-price"><span class="info-price">￥{{price||wjw_wxs.toFixed((goods_info.repertory[0].price/100),2)}}</span> <span class="points-num" style='margin-left: 30rpx;'> 积分{{points||goods_info.repertory[0].points}}</span></div>
                    <div class="sold-num">已售{{goods_info.repertory[0].sale_num}}件</div>
                    <div class="current-choose">已选择"{{name||goods_info.repertory[0].name}}"</div>
                </div>
                <div class="standard">
                    <div class="label">规格</div>
                    <ul class="standrd-list">
                        <li  v-for="(item,index) in goods_info.repertory" :key='index+"standrd"' class="standrd-item " :class='{"standard-item-on":standrd_index==index}' :data-id="item.id" :saleeventid="item.sale_event_id" :data-name="item.name" :data-points="item.points" :data-price="wjw_wxs.toFixed((item.price/100),2)" :data-index='index' @click='standrd'>{{item.name}}</li>
                    </ul>
                </div>
                <div class="num-area">
                    <div class="label" style="left:0;display: inline-block;margin-top:35rpx;font-size: 24rpx;color:#aaa;">数量</div>
                    <div class="btn-area">
                        <div class="choose-amount-btn num-choose-wrap">
<!--                            <input class="reduce-amount-btn pull-left" type="button" value="-" @click='amount>0&&amount--'>
                            <input class="num-amount-btn pull-left" type="text" :value="amount" onfocus="this.blur()" disabled >
                            <input class="add-amount-btn pull-left" type="button" value="+" @click='amount++'> -->
                       
					   <button class="num-reduce left button pull-left" type="default" @tap.stop="amount>0&&amount--" data-id="6128">-</button>
					   <label class="num-at pull-left uni-label" type="button" id="num">{{amount}}</label>
					   <button class="num-add right button pull-left" type="default" data-id="6128" @tap.stop="amount++">+</button>
						</div>
                    </div>
                </div>
                <!-- type=0&id="+id+"&num="+num+'&name='+name+'&price='+price+'&points='+points -->
                <div class="btn-ok" id="cmBtn2" @click='jump' :data-url='"/pages/confirmorder"+"?"+"type=0&id="+id+"&id2="+(id2||goods_info.repertory[0].id)+"&num="+amount+"&name="+(name||goods_info.repertory[0].name)+"&price="+(price||wjw_wxs.toFixed((goods_info.repertory[0].price/100),2))+"&points="+(points||goods_info.repertory[0].points)+"&specialMakeMoney="+specialMakeMoney'>确定</div>
            </div>
        </div>
        <div class="popup-overlay modal-overlay-visible" @click='popup_num2_show=false' v-if='popup_num2_show'></div>


        <div class="popup" id="popup-share">
            <div class="pop-content">
                <div class="popup-vx">
                    <div class="popup-vx1">
                        <img src="http://zxyp.hzbixin.cn/files/48571600408249647.jpg">
                        <span>微信好友</span>
                    </div>
                    <div class="popup-vx2">
                        <img src="http://zxyp.hzbixin.cn/files/12321600408281138.jpg">
                        <span>微信朋友圈</span>
                    </div>
                </div>
                <div class="close-popup btn-close3">取消</div>
            </div>
        </div>
        <!-- <div class="popup-overlay modal-overlay-visible" @click='popup_num_show=false' v-if='popup_num_show'></div> -->


    </view>
</template>
<script module="wjw_wxs" lang="wxs" src="@/common/wjw_uni/wjw_com.wxs"></script>

<script>
import light7_min from "@/component/css/light7_min";
import main from "@/component/css/main";
import wq from "@/component/css/wq";
import cdn_swiper_min from "@/component/css/cdn_swiper_min";
import goodsDetail from "@/component/css/page/goodsDetail";
export default {
	
    components: {
        goodsDetail,
        cdn_swiper_min,
        wq,
        main,
        light7_min,
    },
    data() {
        return {
        	id: '',
        	id2: '',
            popup_num_show: false,
            popup_num2_show: false,
            cmBtn1_show: false,

            goods_info: {},

            goodscomment: [],
        	page:1,

        	price:'',
        	name:'',
        	points:'',
        	amount: 1,
        	tab_index: 1,
        	standrd_index: 0,
			// 购物车的列表 以及购物车数量
			carList:'',
			amounts:0,
			specialMakeMoney:1
        }
    },
    onShow() {
    	this.amount=1;
    },
	onShareAppMessage: function () {
	    let _this = this;
	    return {
	      title: "智享婴品",
	      path: "/pages/index/index?" + _this.getShareUrlParams()
	    };
	},
    onLoad(options) {
        console.log('onLoad 页面加载', options);
        this.setData(options);
        // 商品详情
        this.get_goods_info();
        // 商品评价
        this.get_goodscomment();
        // 商品评价 未应用
        this.getContent();
		// 购物车的数量
		this.getCarList();
		
		
		wx.removeStorageSync('sumMoney');
	    wx.removeStorageSync('sunJifen');
	    wx.removeStorageSync('cartBuy');
		// 这里来判断是不是特惠赚钱的 specialMakeMoney==4
		if(this.specialMakeMoney ==''){
			this.specialMakeMoney=1;
			console.log(this.specialMakeMoney+'specialMakeMoney');
		}else{
			console.log(this.specialMakeMoney+'specialMakeMoney');
		}
		var  height=0;//定义动态的高度变量，如高度为定值，可以直接写
		uni.getSystemInfo({
		//成功获取的回调函数，返回值为系统信息
		success: (sysinfo) => {
		height = sysinfo.windowHeight;//自行修改，自己需要的高度
		
		console.log(height);
		},
		complete: () => {
		}
		});
		
		// console.log(currentWebview)
		// setTimeout(function() {
		// var wv = currentWebview.children()[0];
		// console.log(wv);
		// wv.setStyle({//设置web-view距离顶部的距离以及自己的高度，单位为px
		// top: 800,
		// height:height
		// })
		// }, 1000);//如页面初始化调用需要写延迟
    },
    methods: {
         detailJump(){
			 this.tab_index=0;
			 uni.navigateTo({
			 	url:'/pages/goods/goodDetail?id='+this.id
			 })
		 },
        // 商品详情
        get_goods_info(e) {
            uni.wjw_http({
                url: 'saleevent/info/' + this.id,
                method: 'post',
                data: {
                    id: this.id
                },
            }).then(res => {
                // console.log('商品详情 接口 请求成功', res);
                this.goods_info = res.result;
				 console.log(this.goods_info.goodsDetailUrl)
               
               
            })

        },

        // 商品评价
        get_goodscomment(e) {
           // console.log('商品评价', e);
            uni.wjw_http({
                url: 'goodscomment/listByPage',
                method: 'post',
                data: {
                    event_id: this.id,
                    page: this.page,
                },
            }).then(res => {
               // console.log('商品评价 接口 请求成功', res);

                this.goodscomment = res.result.list;

            })

        },

        // 商品评价 未应用
        getContent(e) {
           // console.log('商品评价', e);

            uni.wjw_http({
				// url: 'ggetContent/listByPage',
                url: 'goodscomment/listByPage',
                method: 'post',
                data: {
                    event_id: this.id,
                    page: 1,
                },
            }).then(res => {
               // console.log('商品评价 接口 请求成功', res);


            })

        },

        // 获取服务电话
        get_phone(e) {
            //console.log('获取服务电话', e);
            var userData = wx.getStorageSync('userData');

         //   console.log(userData.user.mer_id)
            if(!userData.user.mer_id){
                return
            }

            uni.wjw_http({
                url: 'merchant/info/' + userData.user.mer_id,
                method: 'post',
                data: {
                },
            }).then(res => {
              //  console.log('获取服务电话 接口 请求成功', res);
		        this.phone = res.result.phone;


            })

        },

        // 选择规格
        standrd(e) {			
            //console.log('选择规格', e);
    		var _dataset = this.dataset(e);
    		var id2 = _dataset.id;
    		var name = _dataset.name;
    		var price = _dataset.price;
    		var points = _dataset.points;
    		this.id2=id2;
    		this.price=price;
    		this.name=name;
    		this.points=points;
    		this.standrd_index=_dataset.index;
    		
        },
		// 获取购物车的列表
		getCarList(){
			let that=this;
			let userId=uni.getStorageSync('user').id;
			let token=uni.getStorageSync('token')
			uni.wjw_http({
				url:'shoppingcart/list',
				data:{
					   token: token,
					   userId: userId,
				}
				}).then(res=>{
					if(res.status ==0){
					    this.amounts=res.result.length;
						this.carList=res.result;
						
					}
				})
				this.$forceUpdate()
		},
        // 确定加入购物车
        cmBtn1_fn(e) {
           // console.log('确定加入购物车');
            var userData = wx.getStorageSync('userData');
			if(this.id2==''){
				this.id2=this.goods_info.repertory[0].id;
			}
            uni.wjw_http({
            	url: 'shoppingcart/save',
                method: 'post',
                data: {
            	    token: userData.token,
            	    userId: userData.user.id,
            	    sub_event_id: this.id2,
            	    buy_num: this.amount,
                },
            }).then(res => {
                // console.log('确定加入购物车 接口 请求成功', res);
		        this.cmBtn1_show=true;
				this.getCarList()
		        setTimeout(res=>{
		        	this.cmBtn1_show=false;
		        },500)
            }).catch(res=>{
				
				console.log('error')
			
			})
        },
    },
}
</script>
<style scoped lang="scss">
	.num-choose-wrap {
		.uni-label {
			border-top: 2rpx solid rgba(0, 0, 0, .2);
			border-bottom: 2rpx solid rgba(0, 0, 0, .2);
		}
	
		.button {
			// border-radius: 0;
			// outline: none;
			box-shadow: none;
			border-top: 2rpx solid rgba(0, 0, 0, .2);
			border-bottom: 2rpx solid rgba(0, 0, 0, .2);
			// box-shadow: none
		}
	
		.left {
			border-left: 2rpx solid rgba(0, 0, 0, .2);
		}
	
		.right {
			border-right: 2rpx solid rgba(0, 0, 0, .2);
		}
	}
 
   .btns{
 		// background-color:white!important;
 		 // margin: 0;
 		 //  padding: 0;
 		 //  outline: none;
 		 //  border-radius: 0;
 		 //  background-color: transparent;
 		 //  line-height: inherit;
 		 //  width: max-content;
 	}
 .btns::after {
 	  // border: none;
 	}
 	.btns{
 		// background-color:white!important;
 		
 	}
</style>