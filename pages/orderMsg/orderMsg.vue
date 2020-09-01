<template>
	<view class="uni-detail">
		<view class="uni-title">
			<text v-if="type ==1">等待买家付款</text>
			<text v-if="type ==2">等待买家收货</text>
			<text v-if="type ==3">等待买家收货</text>
			<text v-if="type ==7">已关闭</text>
		</view>
		<view class="uni-personInfo">
			<image class="uni-left" src="../../static/colorAddress.png"></image>
		    <view class="uni-right">
				<view class="up">
					<view class="left">收货人 :  {{addRess.addressee}}</view>
					<view class="right">{{addRess.phone}}</view>
				</view>
				<view class="down">{{addRess.province_name}}{{addRess.city_name}}{{addRess.area_name}}{{addRess.address}}</view>
			</view>
		</view>
		<view class="goodDetail" >
			<view class="uni-title-first">
				<image  class="img" src="../../static/colorAddress.png"></image>
				<text class="name">{{msg.shop_name}}</text>
			</view>
			<view style="display: flex;flex-direction: column;" v-for="(item,index) in msg.subOrderModelList" :key="index">
				  <view class="uni-content-second">
				 		<image class="uni-left" :src="item.pic"></image>
				         <view  class="uni-right">
				 			<view class="uni-up">
				 				<view class="up">{{item.event_name}}</view>
				 				<view class="down">规格 {{item.attr_name}}</view>
				 			</view>
				 			<view class="uni-down">
				 				<!-- ￥{{((itemss.unit_price/100))}}.00 积分{{itemss.unit_points}} -->
				 				<view  class="left">￥{{((item.unit_price/100))}}.00<text class="jifen">积分{{item.unit_points}}</text></view>
				 				<view class="right">x{{item.count}}</view>
				 			</view>
				 </view>
			      </view>
			     <view class="uni-refundMoney" v-if="type==2">
				     <view class="money" v-if="item.status ==0"  @tap.stop="openPop(item.id)">申请退款</view>
					 <view class="money" v-if="item.status ==1" >退款中</view>
					 
			     </view> 
				 <view class="uni-refundMoney" v-if="type==7">
					 <view class="money" >已关闭</view>			 
				 </view> 
				 <view class="uni-refundMoney" v-if="type==3">
				 	  <view class="money" v-if="item.status ==0" @tap.stop="refundGood(item.id)" >申请退货</view>
					 <view class="money" v-if="item.status ==1" >退款中</view>
				 </view> 
				 <view class="uni-refundMoney" v-if="type==4">
					  <!-- v-if="item.status ==0" -->
					 
				 	  <view class="money" v-if="item.status ==1"  >已评价</view>
					  <view class="money" v-if="item.status ==0" @tap.stop="goEvaluate(item)" >去评价</view>
				 </view> 
			</view>
			<view class="uni-bottom-third">
				<view class="left">共计商品 <text style="color:#FE5E54;">{{msg.total_num}}</text>件</view>
				<!-- {{(item.total_price/100)}}.00 -->
				<view class="right">合计:<text  class="num">￥{{(msg.total_price/100)}}.00  积分{{msg.total_points}}</text></view>
			</view>
		</view>
		<view class="uni-remarks uni-styles">备注: {{msg.memo}}</view>
		<view class="uni-orderNumber uni-styles">
			<view class="code">订单编号: {{msg.code}}</view>
			<view class="beTime">下单时间: {{msg.create_time}}</view>
		</view>
		<view class="uni-all-bottom">
			<view class="first style">
				<view class="left">订单总金额</view>
				<view class="right">￥{{(msg.total_price/100)}}.00</view>
			</view>
			<view class="first style">
				<view class="left">积分</view>
				<view class="right">{{msg.total_points}}积分</view>
			</view>
			<view class="first style">
				<view class="left">运费</view>
				<view class="right">￥{{msg.freight}}</view>
			</view>
			<view class="first style">
				<view class="left">红包</view>
				<view class="right">{{msg.red_price}}</view>
			</view>
			<view class="first style">
				<view class="left">配送方式</view>
				<view class="right">{{msg.is_self_take}}</view>
			</view>
		</view>
        <view class="uni-chioce" v-if="type==1">
			 <view class="cancel sty" @tap.stop="cancelOrder(msg.id)">取消订单</view>
			 <view class="toPay sty" @tap.stop="toPay(msg.id,msg.total_price)">去付款</view>
		</view>
		<view class="uni-chioce" v-if="type==2">
			 <view class="" >实付金额 : <text style="color:#FE5E54">￥{{(msg.total_price/100)}}.00</text></view>
		</view>
		<view class="uni-chioce" v-if="type==3">
			 <view class="cancel sty" style="position: relative;right:-37rpx!important" @tap.stop="confirmReceive(msg.id)">确认收货</view>
		</view>
		<uni-popup  ref="popup" type="bottom">
			<view class="popups" > 
				<view class="pop-title">
				  <text class="refundReason">退款原因</text>
			    </view>
				<view class="pop-content">
                     <view class="pop-list" v-for="(item,index) in reasonList" :key="index">
						 <image  class="img" v-if="item.choiceFlag" @tap.stop="choiceReason(item,index)" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/cart_unselected.png"></image>
					     <image class="img"  v-if="!item.choiceFlag" @tap.stop="item.choiceFlag=true" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/cart_selected.png"></image>
						  <text class="word">{{item.value}}</text>
					 </view>
						 <textarea  class="poptextarea" :value="textContent" @blur="contents" ></textarea> 
						 <view class="subBtn"   @tap.stop="refundSubmit">确定</view>
					
				</view>
			</view>
		</uni-popup>
		<uni-popup  ref="popups" type="bottom">
			<view class="popups" style="height:500rpx"> 
				<view class="pop-title">
				  <text class="refundReason">退款原因</text>
			    </view>
				<view class="pop-content">
						 <textarea  class="poptextarea" style="height:260rpx;"   :value="popsContents" @blur="contentss" ></textarea> 
						 <view class="subBtn" style="margin-top: 37rpx;"  @tap.stop="popsRefundSubmit">确定</view>
					
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'

	export default {
		data() {
			return {
				msg:'',
				type:'',
				addRess:'',
				textContent:'',
				idss:0,
				idssss:0,
				popsContents:'',
				reasonList:[{num:1,value:'拍错/勿拍',choiceFlag:true},{num:2,value:'信息填写错误,重新拍',choiceFlag:true},
				{num:3,value:'我不想买了',choiceFlag:true},{num:4,value:'其他原因',choiceFlag:true}]
				
			}
		},
		components:{
			uniPopup		
		},
		onShareAppMessage: function () {
		    let _this = this;
		    return {
		      title: "智享婴品",
		      path: "/pages/index/index?" + _this.getShareUrlParams()
		    };
		},
		onLoad(options){
			this.msg=wx.getStorageSync('goodDetail');
			this.type=wx.getStorageSync('types');
			// 订单时间的格式改变
			let a = new Date(this.msg.create_time);
			this.msg.create_time= a.getFullYear()+"-"+(a.getMonth()+1).toString().padStart(2,'0')+"-"+a.getDate().toString().padStart(2,'0');
			if(this.msg.is_self_take ==0){
				this.msg.is_self_take ='物流配送'
			}else{
				this.msg.is_self_take ='自提'
			}
			this.getAddress();
			console.log(this.msg)
		},
		methods: {
			// 获取地址 匹配
			 getAddress(){
				 let that=this;
				 let mm=that.msg
				 let id =wx.getStorageSync('user').id
				 uni.wjw_http({
					 url:'address/list',
					 data:{
						 userId:id
					 }
				 }).then(res=>{
					 let a=res.result;
					 let cc=0;
					 a.map(res=>{
						if(mm.address_id == res.id){
						   cc=res;
						}
					 })
					 this.addRess=cc
					
				 })
			 },
			 // 取消订单
			 cancelOrder(code){
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
				 					uni.navigateBack()
				 				}
				 			})
				 		} else if (data.cancel) {
				 			console.log('用户点击取消');
				 		}
				 	}
				 })
			 },
			 // 去付款
			 toPay(code, money){
				let moneys = (money / 100).toFixed(2)
				uni.navigateTo({
					url: '/pages/shopCar/payment?orderId=' + code + '&type=' + '11' + '&money=' + moneys
				})
              } ,
			  // 退款出现弹框
			  openPop(ems){
				   this.$refs.popup.open();
				   this.idss=ems;
			  },
			  // 选择某一项 退款的原因
			  choiceReason(item,index){
				   this.reasonList.map(res=>{
					   res.choiceFlag=true;
				   })
				  this.reasonList[index].choiceFlag=false;
				 
				  this.$forceUpdate()
			  },
			  // textarea内容
			  contents(e){
				 this.textContent= e.detail.value
			  },
			  contentss(e){
				 this.popsContents= e.detail.value
			  },
				// 退款
				refundSubmit(){
					let useid=wx.getStorageSync('user').id;
					let reason='';
					this.reasonList.map(res=>{
						 if(res.choiceFlag == false){
							 if(res.num!==4){
								  reason=res.value
							 }
							 else if(res.num ==4){
								 reason=this.textContent
							 }
						 }
					})
					uni.wjw_http({
						url:'suborder/applyReturn',
						data:{
							id:this.idss,
							userId:useid,
							apply_reason:reason
						}
					}).then(res=>{
						if(res.status==0){
							 this.$refs.popup.close();
							let types=4;
							uni.navigateTo({
								url:'/pages/orderMsg/successPage?type='+types
							})
				         
						}
					})
				},
				// 确认收货
				confirmReceive(msg){
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
					            		let types=5;
										setTimeout(()=>{
											uni.navigateTo({
					            			   url:'/pages/orderMsg/successPage?type='+types
					            		      })
										},3000)
					            	
					            	}
					            	
					            })
					        } else if (ress.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				},
				// 申请退货
				refundGood(msg){
					this.$refs.popups.open();
					this.idssss=msg;
				
				},
				// 退货退款
				popsRefundSubmit(){
					this.$refs.popups.close();
					let useid=wx.getStorageSync('user').id;
					uni.wjw_http({
						url:'suborder/applyReturn',
						data:{
							id:this.idssss,
							userId:useid,
							apply_reason:this.popsContents
						}
					}).then(res=>{
						if(res.status==0){
							uni.showToast({
								title:'退款成功',
								duration:2000											
							})
							let types=4;
							setTimeout(()=>{
								uni.navigateTo({
								   url:'/pages/orderMsg/successPage?type='+types
							    })
							},3000)
							
						}
					}).catch(res=>{
						console.log(res)
					})
				},
				// 去评价
				goEvaluate(msg){
					wx.navigateTo({
						url:'/pages/orderMsg/goodsEvaluate?subId='+msg.id+'&url='+msg.pic+'&id='+msg.user_id
					})
				}
		         
		}
	}
</script>

<style scoped lang="scss">
.uni-title{
	width:750rpx;
	height:180rpx;
	line-height: 180rpx;
	padding-left: 70rpx;
	background:url(http://zxyp.hzbixin.cn/files/77631597214403866.jpg);
	background-repeat: no-repeat;
	background-size: 750rpx 180rpx;
	box-sizing:border-box ;
	color:#fff;
	font-size: 30rpx;
}
.uni-personInfo{
	width:750rpx;
	height:170rpx;
	box-sizing: border-box;
	padding:33rpx 90rpx 22rpx 30rpx; 
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 28rpx;
	border-bottom:20rpx solid rgba(243,244,246,1);
	color:#6a6a6a;
	.uni-left{
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
		margin-right:20rpx;
	}
	.uni-right{
		flex:1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height:100rpx;
		.up{
			display: flex;
			justify-content: space-between;
		}
	}
}
.goodDetail{
	width:750rpx;
	border-bottom:20rpx solid rgba(243,244,246,1);
	.uni-title-first{
		display: flex;
		align-items: center;
		height: 80rpx;
		background-color: #fff;
		padding: 0 30rpx ;
		box-sizing: border-box;
		.img{
			width: 40rpx;
			height:40rpx;
			margin-right:15rpx;
		}
		.name{
			color: #000000;
			font-size: 28rpx;
		}
	}
    .uni-content-second{
		width:750rpx;
		height:220rpx;
		background-color:#F8F8F8 ;
		display: flex;
		align-items: center;
		.uni-left{
			width:180rpx;
			height:180rpx;
			margin-right:10rpx;
			margin-left: 30rpx;;
		}
		.uni-right{
			flex:1;
			height:180rpx;
			padding:15rpx 0;
			padding-right:30rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.uni-up{
				.up{
					color:#333;
				    font-size: 26rpx;
					margin-bottom: 15rpx;
				}
				.down{
					color:#999;
					font-size: 20rpx;;
				}
			}
			.uni-down{
				display: flex;
				justify-content: space-between;
				.left{
					color:#FE5E54;
					font-size: 26rpx;
					.jifen{
						margin-left:10rpx;
					}
				}
				.right{
					color: #333;
					font-size: 26rpx;
				}
			}
			
		}
	}
    .uni-bottom-third{
		display: flex;
		width:750rpx;
		background-color: white;
		height:90rpx;
		padding:0 30rpx 0 30rpx;
		box-sizing: border-box;
		line-height:90rpx;
		font-size: 28rpx;
		justify-content: flex-end;
		.right{
			margin-left:50rpx;
			.num{
				color:#FE5E54;
			}
		}
	}
}
.uni-styles{
	width: 750rpx;
	padding-left: 30rpx;
	box-sizing: border-box;
	background-color: #fff;
	font-size: 28rpx;
	color:#000;
	border-bottom:20rpx solid rgba(243,244,246,1);
}
.uni-remarks{
	height: 100rpx;
	line-height: 80rpx;
}
.uni-orderNumber{
	height:140rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	.code{
		
	}
}
.uni-all-bottom{
	width: 750rpx;
	background-color: #fff;
	font-size: 26rpx;
	color: #000;
	padding:30rpx;
	box-sizing: border-box;
	border-bottom:20rpx solid rgba(243,244,246,1);
	.style{
		display: flex;
		justify-content: space-between;
		height: 70rpx;
		line-height: 70rpx;
		.right{
			color:#FE5E54
		}
	}
}
.uni-chioce{
	width: 750rpx;
	height:60rpx;
	display: flex;
	align-items: center;
	padding-left:500rpx;
	padding-right:15rpx;
	box-sizing: border-box;
	font-size: 20rpx;
	.sty{
		border:1rpx solid #505050;
		border-radius: 8rpx;;
		height:35rpx;
		line-height: 35rpx;
		text-align: center;
		width:150rpx;
	}
	.cancel{
		border:1rpx solid  #FE5E54;
		color:#FE5E54;
		margin-right:25rpx;
	}
}
.uni-refundMoney{
	width: 750rpx;
	height:95rpx;
	background-color:#F8F8F8 ;
	padding-left:550rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	border-bottom:20rpx solid #fff;
	.money{
		border:1rpx solid #505050;
		border-radius: 8rpx;;
		height:40rpx;
		line-height: 40rpx;
		text-align: center;
		width:150rpx;
		font-size: 22rpx;;
	}
	
}
//弹框
.popups{
	width: 750rpx;
	height:700rpx;
	background-color: white;
	.pop-title{
		width: 750rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		border-bottom:1rpx solid #dfdfdf;
		.refundReason{
			color:#3b3b3b;
			font-size: 30rpx;
			font-weight: bold;
		}
	}
	.pop-content{
		width: 750rpx;
		padding: 30rpx;
		height:600rpx;
		box-sizing: border-box;
		.pop-list{
			display: flex;
			justify-content: flex-start;
			margin-bottom: 30rpx;
			height: 45rpx;
			align-items: center;
			.img{
				width: 45rpx;
				height:45rpx;
				margin-right:40rpx;
			}
			.word{
				font-size: 26rpx;
				color: #5a5a5a;
				
			}
		}
	    .poptextarea{
			width:600rpx;
			height: 160rpx;
			background-color: #f2f2f2;
			text-indent: 20rpx;
			margin:0 auto;
			border-radius: 15rpx;
			font-size: 26rpx;
		}
		
	}
}
.placeTextarea{
	color:red!important;
	font-size:300rpx
}
.subBtn{
	width:670rpx;
	height:80rpx;
	line-height:80rpx;
	background-color: #FF7599;
	text-align: center;
	color:#fff;
	margin-top: 30rpx;
	border-radius: 15rpx;
	
}
</style>
