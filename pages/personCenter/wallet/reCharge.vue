<template>
	<view class="recharge">
		<view  class="uni-momenyInput styles">
			<text class="word">金额</text>
			<input v-model="money" type="number" class="uni-input" placeholder="请输入充值金额,充值金额大于1元" />
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
				code:'',
				openId:'',
				filed:{}
			}
		},
		onLoad(){
			let that=this;
			uni.login({
				  provider: 'weixin',
				  success: function (res) {
					   that.code=res.code;
					   that.getOpenId(); 
				  }
				})	
		},
		methods:{// 获取openId
			getOpenId(){	
				let that=this;
				uni.wjw_http({
					header:{
						 'content-type':'application/json;charset=UTF-8'
					},
					url:'app/wechat/getOpenId',
					type:'post',
					data:{
						appId:'wx74605d2c3744958c',
						code:that.code
					}
				}).then(res=>{
					if(res.code ==0){
						this.openId=res.data.openid;
						console.log('this.openid')
						console.log(thsi.openId)
						
					}
				}).catch(res=>{
					
				})
			},
			getPort(){
				let that=this;
				let id =wx.getStorageSync('user').id;
				let callback = data => {
					this.wxPayment({
						result: data,
						success: data => {
							//跳转到订单页面
							// console.log(1111)
							let types=9;
							uni.navigateTo({
								url:'/pages/orderMsg/successPage?type='+types
							})
						},
						fail: data => {
							
						}
					});
				};
				uni.wjw_http({
					url:'userrecharge/recharge',
					data:{
						userId:id,
						payType:1,
						money:(this.money)*100,
						openid:that.openId
					}
				}).then(res=>{
					// let bb = that.filed;
					// bb.appId = appids;
					// bb.nonceStr = aa.nonceStr;
					// bb.timeStamp = aa.timeStamp;
					// bb.prepayId =aa.packageValue;
					// bb.sign = aa.paySign;
					// that.filed = bb;
					// that.password = '';
					if(res.status ==0){
						let appids='wx74605d2c3744958c';
						let aa = res.result;
						let bb = this.filed;
						bb.appId = appids;
						bb.timeStamp = aa.timeStamp;
						bb.nonceStr = aa.nonceStr;
						bb.prepayId =aa.packageValue;
						bb.sign = aa.paySign;
						
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
