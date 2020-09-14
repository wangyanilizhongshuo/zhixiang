<template>
	<view class="uni-cz">
		<view class="invest_box">
			<view class="invest_title">充值金额</view>
			<view class="invest_input_box flex flex_align_end">
				<text class="invest_icon lh1">¥</text>
				<input  type="number" v-model="money" class="invest_input">
			</view>
		</view>
		<view class="uni-sub" @tap.stop="submit">确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recharge:0,
				code:'',
				openId:'',
				money:'',
				filed:{}
			}
		},
		onLoad(options){
			
			this.setData(options);
			let that=this;
			uni.login({
				  provider: 'weixin',
				  success: function (res) {
					   that.code=res.code;
					   that.getOpenId(); 
				  }
				  })
		},
		methods: {
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
						// this.sessionKey=res.data.sessionKey;
						// this.getMsg();
					}
				}).catch(res=>{
					console.log(res)
				})
			},
			// 提交数据
			submit(){
				let  id =wx.getStorageSync('user').id;
				let callback = data => {
					this.wxPayment({
						result: data,
						success: data => {
							//跳转到订单页面
							
							let types=7;
							uni.navigateTo({
								url:'/pages/orderMsg/successPage?type='+types
							})
						},
						fail: data => {
							console.log(data)
								console.log(22222)
						}
					});
				};
				uni.wjw_http({
					url:'app/cduserspecialbalance/charge',
					data:{
                        userId:id,
						openId:this.openId,
						chargeMoney:this.money
					}
				}).then(res=>{
					 if(res.code==0){
						    let aa = res.data;
						    let bb = {};
							bb.appId = aa.appId;
							bb.timeStamp = aa.timeStamp;
							bb.nonceStr = aa.nonceStr;
							bb.prepayId = aa.packageValue;
							bb.sign = aa.paySign;
							callback(bb);
						  
						 
						 
					 }
				})
				
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.uni-cz{
		width: 750rpx;
		background-color: #f1f1f1;
		height: 100%;
	}
	.invest_box{
		width:710rpx;
		margin: auto;
		border-top: 20rpx solid #f1f1f1;
		height:320rpx;
		background:rgba(255,255,255,1);
		border-radius:8rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
		overflow: hidden;
	}
	.invest_title{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(0,0,0,1);
		margin: 36rpx 0;
	}
	.invest_input_box{
		height: 150rpx;
		border-bottom: 1px solid rgba(234,234,234,1);
	}
	.invest_icon{
		font-size:40rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(0,0,0,1);
		margin-bottom: 21rpx;
		margin-left: 10rpx;
		margin-right: 30rpx;
	}
	.invest_input{
		font-size:50rpx;
		height:100rpx;
	}
	.uni-sub{
		width: 750rpx;
		height: 98rpx;
		background-color: #FF7599;
		line-height: 98rpx;
		text-align: center;
		color: #fff;
		position: absolute;
		bottom: 0;
		left:0;
	}

</style>
