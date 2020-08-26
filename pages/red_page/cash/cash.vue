<template>
	<view  class="uni-tixian">
		<div class="form_li flex_c form_style form_ma">
			<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/alipay.png" alt="" class="form_li_head_icon no_shrink">
			<input type="text" v-model="account" class="form_li_input flex_grow" placeholder="请输入您的支付宝账号" />
		</div>
		<div class="form_area form_style form_ma form_pd_lr">
			<div class="form_area_title">提现金额</div>
			<div class="form_area_li flex flex_align_end ">
				<span class="form_area_li_icon no_shrink">￥</span>
				<input type="number" v-model="money" class="form_area_li_input flex_grow " />
			</div>
			<div class="form_bd_b"></div>
			<div class="form_li_tips flex_c">
				<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/hint@2x.png" alt="" class="form_li_tip_icon no_shrink">
				<div class="form_li_tip_txt flex_grow">提现规则</div>
			</div>
		</div>
		<div class="form_btn_submit flex_c page_b width_perc " @click='onSubmit'  >提交</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money:'',
				account:'',
				redId:''
			}
		},
		onLoad(){
			this.getRedId();
		},
		methods: {
			onSubmit(){
				let id =uni.getStorageSync('user').id;
				 uni.wjw_http({
					 url:'app/cduserredenvelope/withdrawal',
					 data:{
						 userId:id,
						 envelopeId:this.redId,
						 alipayAccount:this.account						 
					 }
				 }).then(res=>{
					 if(res.code ==0){
						 let types=8;
						 uni.navigateTo({
						 	url:'/pages/orderMsg/successPage?type='+types
						 })
					 }
				 }).catch(res=>{
					 
				 })
			},
			getRedId(){
				let id =uni.getStorageSync('user').id;
				uni.wjw_http({
					url:'app/cduserredenvelope/redInfo',
					data:{
						 userId:id
					}
				}).then(res=>{
				     if(res.code ==0){
						this.redId=res.data.id;
						 
					 }
				})
			}
		}
	}
</script>

<style>
	page{
		background: #F0F0F0;
	}
	
	.form_ma{
		margin: 20rpx;
	}
	.form_pd_lr{
		padding: 0 30rpx;
	}
	.form_style{
		background:rgba(255,255,255,1);
		border-radius:8rpx;
	}
	.form_bd_b{
		border-bottom:1rpx solid rgba(234,234,234,1);
	}



	.form_li{
		height:100rpx;
		/*line-height:100rpx;*/
	}
	.form_li_head_icon{
		width: 40rpx;
		height: 40rpx;
		margin: 0 20rpx;
	}
	.form_li_input{}




	.form_area{
	}
	.form_area_title{
		font-size:26rpx;
		line-height:1;
		padding: 36rpx 0 ;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(0,0,0,1);
	}
	.form_area_li{
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(0,0,0,1);

		height: 150rpx;
		box-sizing: border-box;

		

	}
	.form_area_li_icon{
		font-size:60rpx;
	}
	.form_area_li_input{
		font-size: 90rpx;
	}
	.form_li_tips{
		height: 76rpx;
	}
	.form_li_tip_icon{
		width: 40rpx;
		height: 40rpx;
		margin-right: 8rpx;
	}
	.form_li_tip_txt{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
	}



	.form_btn_submit{
		background:linear-gradient(90deg,rgba(255,107,134,1) 0%,rgba(255,127,176,1) 100%);
		height: 98rpx;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}

</style>
