<template>
	<view class="ui-getPwd">
		 <input class="firstPwd" password="true" v-model="password" placeholder="请设置密码"   />
		 <input class="secondPwd" password="true" v-model="rePassword" placeholder="请再次输入密码" />
	 	 <view class="hbyOccurFlag" v-if="signalFlag">{{signalMsg}}</view>
		  <view  class="sumbit" @tap="submit">确定</view>
		
	</view>
</template>

<script> 
    export default{
		data(){
			return {
				password:'',
				rePassword:'',
				signalFlag:false,
				signalMsg:''
			}
		},
		onLoad(){
			
		},
		methods:{
			submit(){
				let that=this;
				if(that.password !==this.rePassword){
					
					that.signalFlag=true;
					that.signalMsg='两次密码输入不一致';
					setTimeout(()=>{
						 that.signalFlag=false;
					},2500)
					return false; 	
				}
				let id =wx.getStorageSync('user').id;
				uni.wjw_http({
					url:'app/wechat/setNewPassword',
					method:'post',
					data: {
						userId: id,
						newPass: that.password
					}
					}).then(res=>{
						if(res.status ==0){
							uni.switchTab({
							  url:'/pages/index/index'
							})
						}
					})
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.ui-getPwd{
		width: 750rpx;
		height: 100vh;
		position: relative;
		top:0rpx;
		left:0rpx;
		font-size: 24rpx;;
		.firstPwd{
			margin:50rpx 0rpx 20rpx 0rpx;
		}
		.firstPwd,.secondPwd{
			width: 600rpx;
			height: 90rpx;
			margin-left:75rpx;
			border-radius: 50rpx;
			padding-left: 30rpx;
			box-sizing: border-box;
			background-color: #efefef;
		}
		.sumbit{
			width: 600rpx;
			height: 98rpx;
			line-height: 98rpx;
			border-radius: 50rpx;
			color: #fff;
			background-color:#ee7d99 ;
			position: absolute;
			bottom:30rpx;
			left:75rpx;
			text-align: center;
		}
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
