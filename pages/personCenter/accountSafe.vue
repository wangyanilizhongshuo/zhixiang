<template>
    <view class="uni-safe">
		<view class="uni-list" @tap='jump' data-url='/pages/login/loginPasswordModify'>
			<view class="word">
				登陆密码修改
			</view>
			<image class="image" src="../../static/inter.png"></image>	
		</view>
		<view class="uni-list" @tap='jump' data-url='/pages/pay/paymentPasswordModify'>
			<view class="word">
				支付密码修改
			</view>
			<image class="image" src="../../static/inter.png"></image>	
		</view><strong></strong>
    </view>
</template>
<style scoped lang="scss">
	 .uni-list{
		 width: 750rpx;
		 height:100rpx;
		 display: flex;
		 align-items: center;
		 justify-content: space-between;
		 border-bottom:1rpx solid #aaa;
		 .word{
			 margin-left:30rpx;
			 font-size: 28rpx;
		 }
		 .image{
			 margin-right: 30rpx;
			 width: 30rpx;
			 height:30rpx;
		 }
	 }


</style>


