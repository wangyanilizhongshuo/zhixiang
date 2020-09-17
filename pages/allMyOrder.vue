
<template>
	<view class="uni-myAllOrder">
		<view class="content" >
		<view class="buttons-tab2" >
				<text class="tab-link2 button2 " :class='{"actives":types==0}' @tap.stop='jumps(0)' type="0"> 全 部 </text>
				<text class="tab-link2 button2" :class='{"actives":types==1}' @tap.stop='jumps(1)' type="1"> 待付款 </text>
				<text class="tab-link2 button2" :class='{"actives":types==2}' @tap.stop='jumps(2)' type="2"> 待发货 </text>
				<text class="tab-link2 button2" :class='{"actives":types==3}' @tap.stop='jumps(3)' type="3"> 待收货 </text>
				<text class="tab-link2 button2" :class='{"actives":types==4}' @tap.stop='jumps(4)' type="4"> 已确认 </text>
			</view> 
			<!-- 所有的列表 
			<!-- http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/my11.png -->
			<view v-if="types==0">
				<view class="uni-container" v-for="(item,index) in allLists" :key="index" @tap.stop="jumpsOne(item)" >
					<view class="uni-title">
						<view class="uni-left">
							<image class="logo" src="../static/shoppingLogo.png"></image>
							<text class="sdName">{{item.shop_name}}</text>
						</view>
						<view class="uni-right" v-if="item.status==0" >
							待付款
						</view>
						<view class="uni-right" v-if="item.status==2">
							待发货
							
						</view>
						<view class="uni-right" v-if="item.status==3">
							付款中
						</view>
						<view class="uni-right" v-if="item.status==4">
							已关闭
						</view>
						<view class="uni-right" v-if="item.status==6">
							已发货
						</view>
						<view class="uni-right" v-if="item.status==7">
							待评价
						</view>
					</view>
					<view class="uni-content" v-for="(itemss,indexss) in item.subOrderModelList">
						<image class="uni-con-left img" :src="itemss.pic"></image>
						<view class="uni-con-right">
							<view class="uni-first">{{itemss.event_name}}</view>
							<view class="uni-second specificate">
								规格  <text class="style" style="margin-left:20rpx;">{{itemss.attr_name}}</text>
							</view>
							<view class="uni-third">								
								<text class="left redStyle">￥{{((itemss.unit_price/100))}}.00 积分{{itemss.unit_points}}</text></text>
								<text class="right">x{{itemss.count}}</text>
							</view>
						</view>
					</view>
					<view class="uni-bottom" style="height: 50rpx;">
						<view class="uni-up ">
							<text class="first">共计<text class="redStyle">{{item.total_num}}</text>件商品</text>
							<text class="second">合计<text class="redStyle">￥{{(item.total_price/100)}}.00  {{item.total_points}}积分</text></text>
							<text>(含运费$ <text class="redStyle">{{(item.freight/100)}}.00元</text>)</text>
						</view>
						<!-- <view class="uni-down" v-if="item.status==0">
							<view class="cancel styBor" @tap.stop="cancelOrder(item.id)">取消订单</view>
							<view  class="goPayMoney styBor redStyle borderRed" @tap.stop="continuePayOrder(item.id,item.total_price)">去付款</view>
						</view> -->
					</view>
				</view>
				
			</view>
			<!-- 等待付款 -->
			<view v-if="types==1">
				<view class="uni-container" v-for="(item,index) in noPayList" :key="index" @tap.stop="noPayDetail(item,1)" >
					<view class="uni-title">
						<view class="uni-left">
							<image class="logo" src="../static/shoppingLogo.png"></image>
							<text class="sdName">{{item.shop_name}}</text>

						</view>
						<view class="uni-right">
							待付款
						</view>
					</view>
					<view class="uni-content" v-for="(itemss,indexss) in item.subOrderModelList">
						<image class="uni-con-left img" :src="itemss.pic"></image>
						<view class="uni-con-right">
							<view class="uni-first">{{itemss.event_name}}</view>
							<view class="uni-second specificate">
								规格  <text class="style" style="margin-left:20rpx;">{{itemss.attr_name}}</text>
							</view>
							<view class="uni-third">								
								<text class="left redStyle">￥{{((itemss.unit_price/100))}}.00 积分{{itemss.unit_points}}</text></text>
								<text class="right">x{{itemss.count}}</text>
							</view>
						</view>
					</view>
					<view class="uni-bottom">
						<view class="uni-up ">
							<text class="first">共计<text class="redStyle">{{item.total_num}}</text>件商品</text>
							<text class="second">合计<text class="redStyle">￥{{(item.total_price/100)}}.00  {{item.total_points}}积分</text></text>
							<text>(含运费$ <text class="redStyle">{{(item.freight/100)}}.00元</text>)</text>
						</view>
						<view class="uni-down">
							<view class="cancel styBor" @tap.stop="cancelOrder(item.id)">取消订单</view>
							<view class="goPayMoney styBor redStyle" @tap.stop="continuePayOrder(item.id,item.total_price)">去付款</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 等待发货 -->
			<view v-if="types==2">
				<view class="uni-container" v-for="(item,index) in hasPayList" :key="index"  @tap.stop="noPayDetail(item,2)">
					<view class="uni-title">
						<view class="uni-left">
							<image class="logo" src="../static/shoppingLogo.png"></image>
							<text class="sdName">{{item.shop_name}}</text>
						</view>
						<view class="uni-right">
							待发货 
						</view>
					</view>
					<view class="uni-content" v-for="(itemss,indexss) in item.subOrderModelList">
						<image class="uni-con-left img" :src="itemss.pic"></image>
						<view class="uni-con-right">
							<view class="uni-first">{{itemss.event_name}}</view>
							<view class="uni-second specificate">
								规格<text class="style" style="margin-left:20rpx;">  {{itemss.attr_name}}</text>
							</view>
							<view class="uni-third">
								<text class="left redStyle">￥{{((itemss.unit_price/100))}}.00 积分{{itemss.unit_points}}</text></text>
                                <text class="right">x{{itemss.count}}</text>
							</view>
						</view>
					</view>
					<view class="uni-bottom" style="height: 50rpx;">
						<view class="uni-up ">
							<text class="first">共计<text class="redStyle">{{item.total_num}}</text>件商品</text>
							<text class="second">合计<text class="redStyle">￥{{(item.total_price/100)}}.00  {{item.total_points}}积分</text></text>
							<text>(含运费$ <text class="redStyle">{{(item.freight/100)}}.00元</text>)</text>
						</view>
						<!-- <view class="uni-down">
							<view class="cancel styBor" @tap="cancelOrder(item.id)">取消订单</view>
							<view class="goPayMoney styBor redStyle" @tap.stop="continuePayOrder(item.id,item.total_price)">去付款</view>
						</view> -->
					</view>
				</view>
			</view>
			<!-- y已经收货 -->
			<view v-if="types==3">
				<view class="uni-container" v-for="(item,index) in hasSendList" :key="index"  @tap.stop="noPayDetail(item,3)">
					<view class="uni-title">
						<view class="uni-left">
							<image class="logo" src="../static/shoppingLogo.png"></image>
							<text class="sdName">{{item.shop_name}}</text>
						</view>
						<view class="uni-right">
							待收货
						</view>
					</view>
					<view class="uni-content" v-for="(itemss,indexss) in item.subOrderModelList">
						<image class="uni-con-left img" :src="itemss.pic"></image>
						<view class="uni-con-right">
							<view class="uni-first">{{itemss.event_name}}</view>
							<view class="uni-second specificate">
								规格<text class="style" style="margin-left:20rpx;">  {{itemss.attr_name}}</text>
							</view>
							<view class="uni-third">
								<text class="left redStyle">￥{{((itemss.unit_price/100))}}.00 积分{{itemss.unit_points}}</text></text>
				                <text class="right">x{{itemss.count}}</text>
							</view>
						</view>
					</view>
					<view class="uni-bottom">
						<view class="uni-up ">
							<text class="first">共计<text class="redStyle">{{item.total_num}}</text>件商品</text>
							<text class="second">合计<text class="redStyle">￥{{(item.total_price/100)}}.00  {{item.total_points}}积分</text></text>
							<text>(含运费$ <text class="redStyle">{{(item.freight/100)}}.00元</text>)</text>
						</view>
						<view class="uni-down">
							<view class="goPayMoney styBor redStyle borderRed" @tap.stop="confirmReceive(item.id)">确认收货</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 已经确认收货 -->
			<view v-if="types==4">
				<view class="uni-container" v-for="(item,index) in hasSureList" :key="index"  @tap.stop="noPayDetail(item,4)">
					<view class="uni-title">
						<view class="uni-left">
							<image class="logo" src="../static/shoppingLogo.png"></image>
							<text class="sdName">{{item.shop_name}}</text>
						</view>
						<view class="uni-right">
							待评价
						</view>
					</view>
					<view class="uni-content" v-for="(itemss,indexss) in item.subOrderModelList">
						<image class="uni-con-left img" :src="itemss.pic"></image>
						<view class="uni-con-right">
							<view class="uni-first">{{itemss.event_name}}</view>
							<view class="uni-second specificate">
								规格<text class="style" style="margin-left:20rpx;">  {{itemss.attr_name}}</text>
							</view>
							<view class="uni-third">
								<text class="left redStyle">￥{{((itemss.unit_price/100))}}.00 积分{{itemss.unit_points}}</text></text>
				                <text class="right">x{{itemss.count}}</text>
							</view>
						</view>
					</view>
					<view class="uni-bottom" style="height: 50rpx;">
						<view class="uni-up ">
							<text class="first">共计<text class="redStyle">{{item.total_num}}</text>件商品</text>
							<text class="second">合计<text class="redStyle">￥{{(item.total_price/100)}}.00  {{item.total_points}}积分</text></text>
							<text>(含运费$ <text class="redStyle">{{(item.freight/100)}}.00元</text>)</text>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<view class="hbyOccurFlag" v-if="seeMovie">{{seeMpvieMsg}}</view>
	</view>
</template>
<script>
	
	export default {
		data() {
			return {
				seeMovie:false,
				seeMpvieMsg:'',
				types: 0,
				noPayList: [], //未付款
				hasPayList: [] ,//已付款
				allLists:[],//全部订单
				hasSendList:[],// 已经发货
				hasSureList:[],
				page:1,
				pageNum:'',
				cancelFlag:false
			}
		},
		
		onReachBottom(){
			console.log('onreacth bottom')
			if(this.types == 0){
				this.page+=1;
				 if(this.pageNum>=this.page){
					  this.getAllList();
				 }
			}
			else if (this.types == 1) {
				this.page+=1;
				 if(this.pageNum>=this.page){
					  this.getNoPayList();
				 }
			}
			else if(this.types ==2){
				this.page+=1;
				 if(this.pageNum>=this.page){
					 this.getHasPayList();
				 }
			}
			else if(this.types ==3){
				this.page+=1;
				 if(this.pageNum>=this.page){
					 this.getSend();
				 }
			}
			else if(this.types ==4){
				this.page+=1;
				 if(this.pageNum>=this.page){
					 this.getSend();
				 }
			}
		},
		// 页面加载 
		onLoad(options) {
			this.setData(options);
			wx.removeStorageSync('goodDetail');
			wx.removeStorageSync('types');			
			// types ==1 的时候 执行 未付款的状态
			
		   if(this.types == 0){
				this.getAllList();
			}
			else if (this.types == 1) {
				this.getNoPayList()
			}
			else if(this.types ==2){
				this.getHasPayList();
			}
			else if(this.types ==3){
				this.getSend();
			}
			else if(this.types ==4){
				this.getFinish();
			}
		},
		
		methods: {
			// 哪一个方法执行
			jumps(one) {
				if (one == 0) {
					this.types = 0;
					this.pages=1;
					this.getAllList();
				} else if (one == 1) {
					this.pages=1;
					this.types = 1;
					this.getNoPayList();
				} else if (one == 2) {
					this.pages=1;
					this.types = 2;
					this.getHasPayList();
				} else if (one == 3) {
					this.pages=1;
					this.types = 3;
					this.getSend();
				} else if (one == 4) {
					this.pages=1;
					this.types = 4;
					this.getFinish()
				}
			},
			// 所有订单里面 不一样的  点击参数不一样
			jumpsOne(msg){
				if(msg.status==0){
					this.noPayDetail(msg,1)
				}
				if(msg.status==2){
					this.noPayDetail(msg,2)
				}
				if(msg.status==7){
					this.noPayDetail(msg,4)
				}				
			},
			getNoPayList() {
				// nopay=1  未付款   代付款的状态
				let id = wx.getStorageSync('user').id;
				let that = this;
				uni.wjw_http({
					url: 'merorder/listByPage',
					data: {
						userId: id,
						page: this.page,
						nopay: 1
					}
				}).then(res => {
					if (res.status == 0) {
						that.pageNum=res.result.pages;
						let aa = res.result.list;
						let bb = that.noPayList;
						if(that.cancelFlag){
							that.noPayList=res.result.list; 
							that.cancelFlag=false;
						}else{
							that.noPayList = bb.concat(aa)			 
						}
						
						
					}
				})
			},
		
			noPayDetail(e,type) {
				let types =type;
				// 对所有订单里面的数据进行 分开
			   if(types ==0){
				   if(e.status == 0){
					   types=1
				   }
				   else if(e.status == 2){
					   types=2
				   }
				   // 订单关闭
				   else if(e.status == 4){
				   		 types=7
				   }
				   
			   }
				wx.setStorageSync('goodDetail',e);
				wx.setStorageSync('types',types);
				uni.navigateTo({
					url:'/pages/orderMsg/orderMsg'
				})

			},
			// 已付款的列表
			getHasPayList() {
				//  代发货付款
				let id = wx.getStorageSync('user').id;
				let that = this;
				uni.wjw_http({
					url: 'merorder/listByPage',
					data: {
						userId: id,
						page: this.page,
						status: 2
					}
				}).then(res => {
					if (res.status == 0) {
						that.pageNum=res.result.pages;
						let aa = res.result.list;
						let bb = that.hasPayList;
						that.hasPayList = bb.concat(aa)
					}
				})
				this.$forceUpdate()
			},
			// 取消订单
			cancelOrder(code) {
				let id = wx.getStorageSync('user').id;
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定取消此订单',
					success: function(data) {
						if (data.confirm) {
							uni.wjw_http({
								url: 'api/closeOrder',
								data: {
									userId: id,
									merOrderId: code,
								}
							}).then(res => {
								if (res.status == 0) {
									uni.showToast({
										title:'取消成功'
									})
									  that.cancelFlag=true;
									  that.getNoPayList();
									

								}else{
									that.seeMovie=true;
									that.seeMpvieMsg=res.msg;
									setInterval(()=>{
										that.seeMovie=false;
									},2500)
								}
							})
						} else if (data.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			//继续支付订单
			continuePayOrder(code, money) {
				let moneys = (money / 100).toFixed(2)
				uni.navigateTo({
					url: '/pages/shopCar/payment?orderId=' + code + '&type=' + '11' + '&money=' + moneys
				})
				
			},
			// 全部列表
			getAllList(){
				let that=this;
				let id = wx.getStorageSync('user').id;
				uni.wjw_http({
					url:'merorder/listByPage',
					data:{
						userId:id,
						page:this.page
					}
				}).then(res=>{
					if(res.status ==0){
						// this.allLists=res.result.list;
						this.pageNum=res.result.pages;
						let aa = res.result.list;
						let bb = that.allLists;
						that.allLists = bb.concat(aa)
					}
				})
			},
			//已经发货
			getSend(){
				let id = wx.getStorageSync('user').id;
				let that=this;
				uni.wjw_http({
					url:'merorder/listByPage',
					data:{
						userId:id,
						page:this.page,
						status:6
					}
				}).then(res=>{
					if(res.status ==0){
						// this.hasSendList=res.result.list;
						this.pageNum=res.result.pages;
						let aa = res.result.list;
						let bb = that.hasSendList;
						that.hasSendList = bb.concat(aa)
					}
				})
			},
			// 确认收货
			confirmReceive(msg){
				let that=this;
				let use=wx.getStorageSync('user').id;
				uni.showModal({
				    title: '提示',
				    content: '是否确认收货',
				    success: function (ress) {
				        if (ress.confirm) {
				            uni.wjw_http({
				            	url:'merorder/confirm',
				            	data:{
				            		merOrderId:msg,
				            		userId:use
				            	}
				            }).then(res=>{
				            	if(res.status ==0){
									uni.showToast({
										title:'收货成功',
										duration:2000											
									})
									that.$nextTick(()=>{
										that.getSend()
									})
				            	}
				            
				            }).catch(res=>{
								console.log(res)
							})
				        } else if (ress.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
			},
		    // 已确认的订单
			getFinish(){
				let id = wx.getStorageSync('user').id;
				let that=this;
				uni.wjw_http({
					url:'merorder/listByPage',
					data:{
						userId:id,
						page:this.page,
						status:7
					}
				}).then(res=>{
					if(res.status ==0){
						// this.hasSureList=res.result.list;
						that.pageNum=res.result.pages;
						let aa = res.result.list;
						let bb = that.hasSureList;
						that.hasSureList = bb.concat(aa)
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.buttons-tab2{
		width: 750rpx;
		font-size: 30rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		position: fixed;
		top:0;
		left:0;
		background: white;
		z-index:10;
		.tab-link2 {
			font-size: 30rpx !important;
			width:150rpx;
			text-align: center;
			
		}
	}
	.actives{
		z-index: 1;
		color: #FF7599 !important;
		border-color: #FF7599 !important;

	}
	.button2{
		bottom: -1px;
		width: 100%;
		height: calc( 2 * 20px);
		font-size: calc( .8 * 20px);
		line-height: calc( 2 * 20px);
		color: #5f646e;
		border: 0;
		border-bottom: 2px solid transparent;
		border-radius: 0;
		-webkit-box-flex: 1;
		-ms-flex: 1;
		position: relative;
		display: block;
		box-sizing: border-box;
		-webkit-appearance: none;
		padding: 0 calc( .5 * 20px);
		margin: 0;
		font-family: inherit;

	}

	.actives {
		z-index: 1;
		color: #FF7599 !important;
		border-color: #FF7599 !important;
	}
	.redStyle {
		color: #ff0000;
	}
	.uni-container {
		border-top:10rpx solid #f1f1f1;
		.uni-title {
			width: 700rpx;
			height: 80rpx;
			padding: 0 25rpx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.uni-left {
				width: 280rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.logo {
					width: 30rpx;
					height: 30rpx;
					margin-right:20rpx;
				}
				.sdName {
					font-size: 30rpx;
				}
				.zhixiang {
					width: 20rpx;
					height: 20rpx;
				}
			}

			.uni-right {
				color: red;
				font-size: 26rpx;
			}
		}
		.uni-content {
			display: flex;
			width: 700rpx;
			height: 250rpx;
			padding: 0 25rpx;
			justify-content: space-between;
			align-items: center;
			background-color: #efeff4;
			border-bottom: 4rpx solid #fff;

			.uni-con-left {
				width: 180rpx;
				height: 180rpx;
				margin-right: 30rpx;
			}

			.uni-con-right {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;
				height: 180rpx;
				position: relative;

				.uni-first {
					font-size: 28rpx;
					color: #6d6d72;

				}

				.uni-second {
					font-size: 26rpx;
					color: #bfbfbf;
				}

				.uni-third {
					.right {
						position: absolute;
						right: 10rpx;
						color: #bfbfbf;
					}
				}

			}
		}
		.uni-bottom {
			width: 700rpx;
			height: 120rpx;
			padding: 20rpx 25rpx;
			background-color: #fff;
			text-align: right;

			.uni-up {
				font-size: 24rpx;

				.second {
					margin: 0 20rpx;
				}
			}

			.uni-down {
				display: flex;
				justify-content: flex-end;
				margin-top: 35rpx;
				font-size: 25rpx;

				.styBor {
					width: 150rpx;
					height: 45rpx;
					text-align: center;
					line-height: 45rpx;
					border-radius: 15rpx;
					border: 1rpx solid #505050;
				}

				.cancel {
					margin-right: 20rpx;
				}

				
			}
		}

	}
	.borderRed{
		border:1rpx solid #ff0000!important;
		font-size: 23rpx!important;
	}
	.hbyOccurFlag{
			position: absolute;
			top:400rpx;
			left:250rpx;
			background-color: green;
			width:300rpx;height:130rpx;
			line-height: 130rpx;
			background-color: #000;
			color:#fff;
			text-align: center;
			opacity: 0.7;
			border-radius: 20rpx;
		}

</style>