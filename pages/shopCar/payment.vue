<template>
	<view>
		<!-- 你的html代码 -->
		<view class="page" v-if="flags">
			<view class="content">
				<view class="payment-top">
					<span class="payment-text">订单金额</span>
					<p>￥<span id="zong">{{money}}</span></p>
				</view>
				<view class="pay-way">
					<view class="pay-way1 pay-way-list" id="pay-way1" @click="flags=false">
						<view class="pay-img1"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/payment_balance.png"></view>
						<span>余额</span>
						<view class="pay-img2"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/next.png"></view>
					</view>
					<view class="pay-way3 pay-way-list" @click='pay(1)'>
						<view class="pay-img1"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/wechat_icon.png"></view>
						<span>微信</span>
						<view class="pay-img2"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/next.png"></view>
					</view>
				</view>

			</view>
		</view>
		<view v-else @tap='KeyboarOpen' class="passInput">
			<password-input :numLng='password'></password-input>
			<number-keyboard tabBar ref='KeyboarHid' @input='clickInput' psdLength='6'></number-keyboard>
			<view class="btnPassword" @click="pay(3)">确定</view>
		</view>
		<view class="hbyOccurFlag"  v-if="signalFlag">{{signalMsg}}</view>
	</view>
</template>
<script>
	import light7_min from "@/component/css/light7_min";
	import light7_swiper_min from "@/component/css/light7_swiper_min";
	import main from "@/component/css/main";
	import wq from "@/component/css/wq";

	import payment from "@/component/css/page/payment";
	import numberKeyboard from '@/components/number-keyboard/number-keyboard.vue'
	import passwordInput from '@/components/password-input/password-input.vue'
	export default {

		components: {
			payment,
			wq,
			main,
			light7_swiper_min,
			light7_min,
			numberKeyboard,
			passwordInput

		},
		data() {
			return {
				money: '',
				jifen_show: false,
				zhifu_show: false,
				orderNumber: '',
				cartId: "",
				id: '',
				addressId: '',
				// 所有的字段
				filed: {},
				flagPsd: true,
				flags: true,
				password: '',
				type: '',
				repIds: '',
				// 商品详情的数量
				counts: '',
				// 继续支付的时候的订单号
				orderId: '',
				isSelfTake:'',
				memo:'',
				signalFlag:false,
				signalMsg:'',
				code:'',
				openId:""

			}
		},
		onLoad(options) {
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
					}
				}).catch(res=>{
					console.log(res)
				})
			},
			pay(sss) {
			         // 发起微信支付
				let callback = data => {					
					that.wxPayment({
						result: data,
						success: data => {
							//跳转到订单页面
							let types=2;
							uni.navigateTo({
								url:'/pages/orderMsg/successPage?type='+types
							})
						},
						fail: data => {
							console.log(data)	
							console.log('支付失败！')
						}
					});
				};
				let id = wx.getStorageSync('user').id;
				let that = this;
				let urls = '';
				let datas = {};
				// 购物车过来的
				if (that.type == 1) {
					urls = 'api/createOrderByCart',
						datas = {
							userId: id,
							payType: sss,
							password: that.password,
							addressId: that.addressId,
							cartIds: that.cartId,
							memo:that.memo,
							isSelfTake:that.isSelfTake,
							repIds:that.repIds,
							openid:that.openId
						}	
				}
				// 直接过来的付款
				else if (that.type == 0) {
					urls = 'api/createOrder';
					datas = {
						userId: id,
						id: that.id,
						payType: sss,
						repIds: that.repIds,
						counts: that.counts,
						password: that.password,
						addressId: that.addressId,
						isSelfTake:that.isSelfTake,
						repIds:that.repIds,
						openid:that.openId,
						memo:that.memo
					}
				}
				// 继续付款
				else if(that.type == 11){
					urls = 'api/payOrder';
					datas = {
						userId: id,
						merOrderId:that.orderId,
						password:that.password,
						openid:that.openId,
						payType: sss
					}
				}
				uni.wjw_http({
					url: urls,
					data: datas
				}).then(res => {
					if(sss ==3){
						if(res.status ==0){
							  let types=2;
							  uni.navigateTo({
								url:'/pages/orderMsg/successPage?type='+types
							  })
						}else{
							this.signalFlag=true;
							this.signalMsg=res.msg;
							setInterval(()=>{
								this.signalFlag=false
							},2500);
							
						}						
					}
					else if(sss ==1){
						let appids='wx74605d2c3744958c';
						if (res.status == 0) {
						let aa = res.result.payInfo ||res.result;
						let bb = that.filed;
						bb.appId = appids;
						bb.nonceStr = aa.nonceStr;
						bb.timeStamp = aa.timeStamp;
						bb.prepayId =aa.packageValue;
						bb.sign = aa.paySign;
						that.filed = bb;
						that.password = '';
						
						callback(that.filed);	
						
					  }
					}					
				}).catch(res => {					
					setInterval(() => {
						uni.navigateBack({
							delta: 2
						})
					}, 1000)
				})
			},
			// 插件里面的事件
			KeyboarOpen(e) {
				this.$refs.KeyboarHid.open();
			},
			//输入的值
			clickInput(val) {
				let a = val;
				this.password = val;

			},
		}
	}
</script>
<style scoped lang="scss">
	.passInput {
		margin-top: 100rpx;
	}
	.btnPassword {
		width: 700rpx;
		height: 100rpx;
		line-height: 100rpx;
		margin-left: 25rpx;
		text-align: center;
		background-color: #FF7295;
		font-size: 30rpx;
		border-radius: 20rpx;
		margin-top: 270rpx;
		color: #fff;
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
