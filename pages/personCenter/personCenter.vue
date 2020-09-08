<template>
	<view>
		<view class="content">
		    <view class="header-wrap " style="background: url(http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/mineBg.png) no-repeat center;background-size: 100%;background-size: 100% 120%;height: 210px;">
		       
		        <view class="user-icon" @tap="jump"  data-url='/pages/personData'>
		        	<!-- personalcenter_head personalcenter_nohead -->
		            <img :src="user_info.head_photo||'http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personalcenter_nohead.png'" >
		            <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personalcenter_nohead.png"  style="display: none"><!--未登录时的头像-->
		            <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/vip@2x.png" alt="" class="vip_icon" @click='showToast' data-title='请前往APP内进行开通' v-if='user_info.is_vip'>
		        </view>
		        <view class="user-inform" @click='jump' data-url='/pages/personData'>
		            <p class="user-name">{{user_info.nickname}}</p>
		            <view class="join-member1" style="display: none" @click='jump' data-url='/pages/rightMember-join'>加入会员</view><!--普通用户登陆时-->
		            <p class="user-phone">{{user_info.phone}}</p>
		        </view>

		        <view class="member-all">
		        </view>
		        <view class="balance user_opts" style="border-bottom: 0;">
		        	<!--  id="my-money" -->
		            <view class="list3 user_opt"  @tap.stop='jump' data-url='/pages/personCenter/wallet/wallet'>
		                <p class="user_opt_num">{{(user_info.money/100)||'0.00'}}</p>
		                <p class="user_opt_txt">余额</p>
		                <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personacenter_balance.png" style="display: none">
		            </view>
		            <view class="list3 user_opt" id="my-fen"  @click='jump' data-url='/pages/onlinePay'>
		                <p class="user_opt_num">{{user_info.points||'0'}}</p>
		                <p class="user_opt_txt">积分</p>
		                <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personacenter_integral.png" style="display: none">
		            </view>
		            <view class="list3 user_opt">
		            	<!-- 未确定 {{user_info.nickname||'0'}} -->
		                <p class="user_opt_num">0</p>
		                <p class="user_opt_txt">我的关注</p>
		                <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personacenter_integral.png" style="display: none">
		            </view>

		        </view>
		    </view>
		    <view class="order-form" style="position: absolute;left: 5%;top:180px;width: 90%;border-radius: 10px;">
		        <view  class="my-form " @click='jump' data-url='/pages/allMyOrder' data-types="0" >
		            <span class="myForm">我的订单</span>
		            <span class="see-allOrder" >查看全部订单</span>
		            <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/pc_allorders.png">
		        </view>

		        <ul class="form-list">
		            <li id="goPay" @click='jump' data-url='/pages/allMyOrder' data-types="1" >
		                <p class="goPay-img" style="position:relative" >
		                    <img class="order_icon" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/my11.png">
		                    <view class="bd_num" id="gopay-num"></view>
							<text v-if="orderList.noPay"  class="signedMes" >{{orderList.noPay}}</text>
		                </p>
		                <p class="goPay-name">待付款</p>
		            </li>
		            <li id="goAllocate" @click='jump' data-url='/pages/allMyOrder' data-types="2" >
		                <p class="goPay-img" style="position:relative">
							<img class="order_icon" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/my12.png">
		                    <view class="bd_num" id="goallocate_num"></view>
		                    <text  v-if="orderList.noSend" class="signedMes" >{{orderList.noSend}}</text>
						</p>
		                <p class="goPay-name">待发货</p>
		            </li>
		            <li id="goSend" @click='jump' data-url='/pages/allMyOrder' data-types="3" >
		                <p class="goPay-img" style="position:relative">
							<img class="order_icon" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/my13.png">
		                    <view class="bd_num" id="gosend_num"></view>
		                    <text v-if="orderList.hasSend" class="signedMes" >{{orderList.hasSend}}</text>
						</p>
		                <p class="goPay-name">待收货</p>
		            </li>
		            <li id="goPick" @click='jump' data-url='/pages/allMyOrder' data-types="4" >
		                <p class="goPay-img" style="position:relative">
							<img class="order_icon" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/my14.png">
		                    <view class="bd_num" id="gopick_num" ></view>
		                    <text  v-if="hasSureLength" class="signedMes" >{{hasSureLength}}</text> 
						</p>
		                <p class="goPay-name">已确认</p>
		            </li>
		            <li id="goFinish" class="last-li send-finish" @click='jump' data-url='/pages/orderMsg/afterSales' >
		                 <p class="goPay-img"><img class="order_icon" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/my15.png">
		                    <view class="bd_num" id="gofinish_num"></view>
							<text v-if="refundNum" class="signedMes" >{{refundNum}}</text>
		                </p>
		                 <p class="goPay-name">退货/售后</p>
		            </li>
		        </ul>
		    </view>
		    
		    <!-- 94px -->
		    <view class="order_form_occupy" style="height: 117px;"></view>
		    <view class="notice_box flex">
		    	<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/notice@2x.png" alt="" class="notice_logo no_shrink">
		    	<swiper class="notice_swiper flex_grow" 
		    		circular vertical 
		    		>
		    		<swiper-item class="notice_swiper_item flex flex_align_c"
		    			v-for="(item,index) in notice_list" :key='index' 
		    			>
		    			<view class="notice_swiper_item_li txt_over_ell_2">{{item}}</view>
		    		</swiper-item>
		    	</swiper>
		    </view>

		    <view class="my-promotion popular" 
		    	style="
		    		width:670rpx;
		    		margin: 20rpx auto;
		    		background:rgba(255,255,255,1);
		    		border-radius:20rpx;
		    	"
		    	>
		        <view class="top1">我的推广</view>
		         <view class="promotion-info">
		                <view class="spacer"></view>
		            <view class="list1">
		                <p class="text1 popular_num" id="point_reward">{{user_info.total_point_reward||'0.00'}}</p>
		                <p class="text2 popular_txt" >累计积分</p>
		            </view>
		            <view class="list1">
		                <p class="text1 popular_num" id="money_reward">{{(user_info.total_money_reward)/100||'0.00'}}</p>
		                <p class="text2 popular_txt">累计红包<!-- <br> -->（已入余额）</p>
		            </view>
		       </view>  
		    </view>
		    <view class="mine_opts flex flex_wrap " style="color: #000;">
		    	<view class="mine_opt flex flex_column no_shrink flex_c"  @click='jump' data-url='/pages/personCenter/shopCoupon' >
			    	<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/my_redbag.png" alt="" class="mine_opt_img">
			    	<view class="mine_opt_span">我的红包</view>
		    	</view>
		    	<view class="mine_opt flex flex_column no_shrink flex_c"  @click='jump' data-url='/pages/myTwoCode' >
			    	<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/my22.png" alt="" class="mine_opt_img">
			    	<view class="mine_opt_span">我的二维码</view>
		    	</view>
		    	<view class="mine_opt flex flex_column no_shrink flex_c"  @click='jump' data-url='/pages/personCenter/appDownload' >
			    	<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/report@2x.png" alt="" class="mine_opt_img">
			    	<view class="mine_opt_span">APP下载</view>
		    	</view>
		    	<view class="mine_opt flex flex_column no_shrink flex_c"  @click='jump' data-url='/pages/personCenter/myOpinion' >
			    	<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/my24.png" alt="" class="mine_opt_img">
			    	<view class="mine_opt_span">意见反馈</view>
		    	</view>
		    	<view class="mine_opt flex flex_column no_shrink flex_c"  @click='jump' data-url='/pages/gainNum' >
			    	<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/integral@2x.png" alt="" class="mine_opt_img">
			    	<view class="mine_opt_span">赚取积分</view>
		    	</view>
		    	<view class="mine_opt flex flex_column no_shrink flex_c"  @click='jump' data-url='/pages/personCenter/newsCenter' >
			    	<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/msg@2x.png" alt="" class="mine_opt_img">
			    	<view class="mine_opt_span">我的消息</view>
		    	</view>
		    	<view class="mine_opt flex flex_column no_shrink flex_c"  @click='jump' data-url='/pages/personCenter/setting' >
			    	<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/setting@2x.png" alt="" class="mine_opt_img">
			    	<view class="mine_opt_span">我的设置</view>
		    	</view>
			</view>

		</view>

	</view>
</template>

<script>
	import light7_min from "@/component/css/light7_min";
    import light7_swiper_min from "@/component/css/light7_swiper_min";
    import main_20 from "@/component/css/main_20";
    import wq from "@/component/css/wq";
	import personCenter from "@/component/css/page/personCenter";
    export default {

        components: {
        	personCenter,
            wq,
            main_20,
            light7_swiper_min,
            light7_min,
        },
		data() {
			return {
				user_info: {},
				// 订单的情况
				orderList:'',
				refundNum:'',
				hasSureLength:'',
				notice_list: [
					'恭喜您的下级  王小二  卖出商品【欢恩宝奶粉 500ml】，您获得佣金8元',
					'9月平台充值上线啦，充值现金大送活动------------',
					'xxxxxxxxxxxxxxxxxx',
				],
				
			}
		},
		
		onLoad(options) {
	        // 获取用户信息
	        this.get_user_info();
			this.getOrder();
			this.getRufundLength();
			this.getSureOrder();
			this.setData(options);
		},
		onShareAppMessage: function () {
		    let _this = this;
		    return {
		      title: "智享婴品",
		      path: "/pages/index/index?" + _this.getShareUrlParams()
		    };
		},
		onShow(){
			// 获取用户信息
			this.get_user_info();
			this.getRufundLength();
			// 付款 发货的Number
			this.getOrder();
			// 确认收货的Num
			this.getSureOrder();
		},
		methods: {
			// 获取用户信息
			get_user_info(e) {
			    console.log('获取用户信息', e);
				let id =wx.getStorageSync('user').id
				uni.wjw_http({
					 url:'user/info/'+id,
					 type:'post'
			    }).then(res => {
			      if(res.status ==0){
					  this.user_info = res.result;
				  } 
			    }).catch(res=>{
					console.log(res.msg)
				})

			},
			//获取 订单情况列表
			getOrder(){
				let id =wx.getStorageSync('user').id;
				let that =this;
				uni.wjw_http({
					url:'merorder/getOrderNum',
					type:'post',
					data:{
						userId:id
					}
				}).then(res=>{
					if(res.status ==0){
						that.orderList=res.result;	
					}
				}).catch(res=>{
					console.log(res.msg)
				})
			},
			//订单详情里面的退款的length
			getRufundLength(){
				let id =wx.getStorageSync('user').id;
				uni.wjw_http({
					url:'suborder/listByPage',
					data:{
						userId:id,
						page:1,
						showReturn:1
					}
				}).then(res=>{
					this.refundNum=(res.result.list.length)
				}).catch(res=>{
					
				})
			},
			// 待收货  确认订单
			getSureOrder(){
				let id = wx.getStorageSync('user').id;
				uni.wjw_http({
					url:'merorder/listByPage',
					data:{
						userId:id,
						page:1,
						status:7
					}
				}).then(res=>{
					if(res.status ==0){
						this.hasSureLength=res.result.list.length;
					}
				}).catch(res=>{
					
				})
			}
			
		}
	}
</script>

<style scoped lang="scss">
 .my-form{
	 width:565rpx;
 }
 .signedMes{
	 text-align: center;
	 line-height:35rpx;
	 width:35rpx;
	 height:35rpx;
	 font-size:25rpx;
	 border:2rpx solid #ff7599;
	 border-radius:35rpx;
	 position: absolute;
	 top:-5px;
	 right:26rpx;
	 background-color: white;
	 color:#FF7599;
	 z-index: 2;
 }


	

</style>
