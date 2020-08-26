<template>
	<view class="uni-aftersales">
		<view class="uni-container" v-for="(items,index) in list" :key="index" >
			<view class="uni-title">
				<view class="uni-left">
					<image class="logo" :src="items.pic"></image>
					<text class="sdName">{{items.shop_name}}</text>
		
				</view>
				<view class="uni-right">
					
				</view>
			</view>
			<view class="uni-content" >
					<image class="uni-con-left img" :src="items.pic"></image>
					<view class="uni-con-right">
						<view class="uni-first">{{items.event_name}}</view>
						<view class="uni-second specificate">
							<view class="left">
								规格  <text class="style" style="margin-left:20rpx;">{{items.attr_name}}</text>
							</view>
							<view class="right">x{{items.count}}</view>
						</view>
						<view class="uni-third">
							<text class=" redStyle">退款金额： {{items.unit_price/100}}</text></text>		
						</view>
				    </view>					
		    </view>		
				<!-- 未发货退款 -->
			<view class="uni-bottom" v-if="items.return_type == 1">
				 
				<text class="word" v-if="items.status ==1" >审核中</text>
				<text class="words"v-if="items.status ==4">退款成功</text>
			</view>
			<!-- 发货退款 -->
			<view class="uni-bottom" v-if="items.return_type == 2">
				 <text class="word"v-if="items.status ==1 ">审核中</text>
				 <text class="word"v-if="items.status ==3 ">审核中</text>
				<text class="word" v-if="items.status ==2" @tap.stop="openPop(items)">填写信息</text>
				<text class="words"v-if="items.status ==4">退款成功</text>
			</view>
			<view class="uni-bottom" v-if="items.return_type == 3">
				 <text class="word" v-if="items.status ==1" @tap.stop="openPop(items)">填写信息</text>
			</view>
	      </view>
		   <uni-popup  ref="popup" type="bottom">
			   <view class="popups"> 
			   				<view class="pop-title">
			   				  <text class="refundReason">退款信息</text>
			   			    </view>
			   				<view class="pop-content">
			   		             <view class="first style">
			   						 <view class="left">物流信息</view>
			   						 <input  class="input" v-model="comName" placeholder-style="color:#989898" placeholder="请输入物流公司">
			   					 </view>
			   					 <view class="second style">
			   						 <view class="left">运单号</view>
			   						 <input  class="input" v-model="expressCode" placeholder-style="color:#989898" placeholder="请输入运单编号">
			   					 </view>	
			   					<view class="subBtn" @tap.stop="refundSubmit">确定</view>					
			   				</view>
			   			</view>	
			   
	       </uni-popup>
		</view>		
	</view>
</template>
<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data(){
			return {
				list:[],
				comName:'',
				expressCode:'',
				submitMsg:''
			}
		},
		onLoad(){
			this.getList();
			 
		},
		components:{
			uniPopup		
		},
		methods:{
			getList(){
				let id =wx.getStorageSync('user').id;
				uni.wjw_http({
					url:'suborder/listByPage',
					data:{
						userId:id,
						page:1,
						showReturn:1
					}
				}).then(res=>{
					this.list=res.result.list;
					console.log(this.list)
				}).catch(res=>{
					
				})
			},
			openPop(msg){
				this.submitMsg=msg;
			    this.$refs.popup.open();
			},
			refundSubmit(){
				let  id =uni.getStorageSync('user').id;
				let ids=this.submitMsg.id;
				uni.wjw_http({
					url:'suborder/returnInfo',
					data:{
						userId:id,
						return_cmp:this.comName,
						return_order:this.expressCode,
						id:ids
					}
				}).then(res=>{
					if(res.status==0){
						let types=3;
						uni.navigateTo({
							url:'/pages/orderMsg/successPage?type='+types
						})
					}
				}).catch(res=>{
					
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
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
				font-size: 30rpx;
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
					width: 100%;
					font-size: 26rpx;
					color: #bfbfbf;
					display: flex;
					justify-content: space-between;
				}
				.uni-third {
					width: 100%;
					text-align: right;
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
			height: 60rpx;
			padding: 10rpx 25rpx;
			background-color: #fff;
			text-align: right;	
			.word {
				display: inline-block;
				font-size: 24rpx;
				color:#656565;
				width: 150rpx;
				height:40rpx;
				line-height:40rpx;
				text-align: center;
				border:1rpx solid #353535;
				border-radius: 10rpx;
			}
			.words{
				display: inline-block;
				font-size: 24rpx;
				color:#656565;
				width: 150rpx;
				height:40rpx;
				line-height:40rpx;
				text-align: center;
				
			}

		}
	
	}
	.redStyle {
		color: #ecd69c;
	}
	.popups{
		width: 750rpx;
		height:500rpx;
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
			height:400rpx;
			.style{
				width:750rpx;
				height:90rpx;
				display: flex;
				align-items: center;
				font-size: 27rpx;			
				border-bottom:1rpx solid #dfdfdf;
				.left{
					width:200rpx;
					margin-left:20rpx;
				}				
			}
		    
			
		}
	    .subBtn{
			width: 750rpx;
			height:100rpx;
			line-height:100rpx;
			background-color: #FF7599;
			text-align: center;
			color:#fff;
			margin-top:126rpx;
			
		}
	}
</style>
