<template>
    <view class="uni-setting">
		 <view class="uni-content">
			 <view class="uni-list" @click='jump' data-url='/pages/personData'>
				 <view class="uni-left">
					 <img class="image" src="http://zxyp.hzbixin.cn/files/53971597914293776.jpg">
				      <text class="word">个人资料</text>
				 </view>
				 <!-- <image class="images"  src="../../static/inter.png"></image> -->
			 </view>
			 <view class="uni-list" @click='jump' data-url='/pages/addressManage'>
				 <view class="uni-left">
					 <img  class="image" src="http://zxyp.hzbixin.cn/files/59041597914377642.jpg">
					  <text class="word">收货地址</text>
				 </view>
				 <!-- <image class="images"  src="../../static/inter.png"></image> -->
			 </view>
			 <view class="uni-list" @click='jump' data-url='/pages/personCenter/accountSafe'>
				 <view class="uni-left">
					 <img class="image" src="http://zxyp.hzbixin.cn/files/75391597914335922.jpg">
					  <text class="word">账户安全</text>
				 </view>
				 <!-- <image class="images"  src="../../static/inter.png"></image> -->
			 </view>
			 
		 </view>
		 <view class="btn"  @click='jump' data-url='/pages/login/login'>
		   去登录
		 </view>
    </view>
</template>

<script>
</script>

<style scoped lang="scss">
   .setting-content{
	   margin-top:0!important
   }
   .btn{
   	   width:700rpx;
   	   height:100rpx;
   	   line-height:100rpx;
   	   margin-left:25rpx;
   	   text-align: center;
   	   background-color:#FF7295 ;
   	   font-size: 30rpx;
   	   border-radius: 40rpx;
   	   position: absolute;
   	   bottom:40rpx;
   	   color:#fff;
      }
	  .setting-message{
		  height:100rpx;
	  }
	  .uni-list{
		  width:750rpx;
		  height:100rpx;
		  background-color: #fff;
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  border-bottom:1rpx solid #aaa;
		  .uni-left{
			  margin-left:25rpx;
			  .image{
				  display: inline-block;
				  width:40rpx;
				  height:40rpx;
				  margin-right:20rpx;
			  }
			  .word{
				  
				  font-size: 28rpx;
			  }
		  }
		  .images{
			  display: inline-block;
			  width:30rpx;
			  height:30rpx;
			  margin-right:50rpx;
		  }
	  }

</style>
