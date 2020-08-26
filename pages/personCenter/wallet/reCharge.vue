<template>
	<view class="recharge">
		<view  class="uni-momenyInput styles">
			<text class="word">金额</text>
			<input v-model="money" type="number" class="uni-input" placeholder="请输入充值金额" />
		</view>
		<view  class="uni-pay styles" @tap.stop="getPort">
			 <image class="img" src="http://zxyp.hzbixin.cn/files/75901597916988861.jpg"></image>
			 <text class="word">微信</text>	
		</view>
		<view class="sure"  @tap.stop="getPort">确认</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				money:'',
				filed:{}
			}
		},
		onLoad(){
			
		},
		methods:{
			getPort(){
				let id =wx.getStorageSync('user').id;
				let callback = data => {
					this.wxPayment({
						result: data,
						success: data => {
							//跳转到订单页面
							console.log(1111)
							let types=5;
							uni.navigateTo({
								url:'/pages/orderMsg/successPage?type='+types
							})
						},
						fail: data => {
							console.log(data)	
							console.log(222222)
						}
					});
				};
				uni.wjw_http({
					url:'userrecharge/recharge',
					data:{
						userId:id,
						payType:1,
						money:this.money
					}
				}).then(res=>{
					if(res.status ==0){
						let aa = res.result;
						let bb = this.filed;
						bb.appId = aa.appid;
						bb.timeStamp = aa.timestamp;
						bb.nonceStr = aa.noncestr;
						bb.prepayId = aa.prepayid;
						bb.sign = aa.sign;
						this.filed = bb;
						callback(this.filed);
						
					}
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.styles{
		width: 750rpx;
		height: 100rpx;
		line-height: 100rpx;
		padding:0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		color: #4e4e4e;
		background-color: #fff;
	}
	.recharge{
	    background-color: #f1f1f1;
		height: 100%;
	}
	.uni-momenyInput{
		border-top: 15rpx solid  #f1f1f1;
		.word{
			margin-right:30rpx;		
		
		}
		.uni-input{
			width: 500rpx;
		}
	}
    .uni-pay{
	    margin-top:15rpx;
		.img{
			width: 60rpx;
			height: 60rpx;
			margin-right:30rpx;
		}
	}
	.sure{
		width:750rpx;
		height: 100rpx;
		background-color: #FF7599;
		line-height: 100rpx;
		text-align: center;
		color:#fff;
		position: absolute;
		bottom: 0;
		left:0;
	}
</style>
