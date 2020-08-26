<template>
	<view class="uni-wallet">
		<view class="uni-title">
			<view class="firsts">账户余额  (元)</view>
			<view class="second">{{extra/100}}</view>
			<view class="detailed" @tap.stop="jump" data-url='/pages/personCenter/wallet/details'>明细</view>
		</view>
		<view class="uni-second-title">当前可提现余额{{extra/100}}</view>
		<view class="uni-content">
			<view class="list" @tap.stop="jump" data-url='/pages/personCenter/wallet/reCharge'>
				<view class="left" >
					<image class="img" src="http://zxyp.hzbixin.cn/files/98121597913859317.jpg"></image>
				    <text class="word">充值</text>
				</view>
				<image class="zhixiang right" src="http://zxyp.hzbixin.cn/files/45161597915692314.jpg"></image>
			</view>
			<view class="list" @tap.stop="jump" data-url='/pages/personCenter/wallet/Withdrawal'>
				<view class="left" >
					<image class="img" src="http://zxyp.hzbixin.cn/files/56251597913946782.jpg"></image>
				    <text class="word">提现</text>
				</view>
				
				<image class="zhixiang right" src="http://zxyp.hzbixin.cn/files/45161597915692314.jpg"></image>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				extra:''
			}
		},
		onLoad(){
			this.extra =wx.getStorageSync('user').money
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.uni-wallet{
		.uni-title{
			width: 750rpx;
			height:200rpx;
			position: relative;
			top:0;
			left:0;
			display: flex;
			flex-flow: column;
			justify-content: space-between;
			background-color:#ff779f ;
			padding: 30rpx;
			box-sizing: border-box;
			color:#fff;
			.firsts{
				font-size: 26rpx;
			}
			.second{
				font-size: 72rpx;
			}
			.detailed{
				position: absolute;
				top:10rpx;
				right:30rpx;
				font-size: 24rpx;
			}
		}
	}
	.uni-second-title{
		width:750rpx;
		height:100rpx;
		padding-left:30rpx;
		box-sizing: border-box;
		line-height: 100rpx;
		color:white;
		font-size:26rpx;
		background-color:#d0668e ;
		// border: 20rpx solid #F3F4F6;
	}
 .uni-content{
	 .list{
		 width: 750rpx;
		 padding:30rpx;
		 height: 100rpx;
		 box-sizing: border-box;
		 display: flex;
		 justify-content: space-between;
		 align-items: center;
		 .left{
			 width:120rpx;
			 height:40rpx;
			
			 .img{
				 width:40rpx;
				 height:40rpx;
			 }
			 .word{
				 width:100rpx;
				 height:50rpx;
				 font-size:26rpx;
				 position: relative;
				 left:20rpx;
				 top:-5rpx;
				 font-family:PingFang SC;
				 font-weight:500;
				 color:rgba(0,0,0,1);
				
			 }
		 }
		 .right{
			 width:24rpx;
			 height:30rpx;
			
		 }
	 }
	 
 }
</style>
