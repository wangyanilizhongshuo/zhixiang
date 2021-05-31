<template>
	<view  class="uni-call">
		<view class="mask"></view>
		<image class="uni-img" @tap.stop="decision"  src="http://zxyp.hzbixin.cn/files/27351597214998680.jpg"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scene:''
			}
		},
		onLoad(options){
			this.setData(options);
			console.log(this.scene)
		},
		methods: {
			// 助力成功的红包
			getRed(){
				 let that = this;
				 let a = wx.getStorageSync('user').id;
				 let sceneid=wx.getStorageSync('sceneId');
				 uni.wjw_http({
					url: 'app/cduserredenvelopeassistance/assistance',
					type: 'post',
					data: {
						 userId: a,
						 envelopeId: that.scene,
						 assistanceType: 4
					}
				  }).then(res => {
					 
					if (res.code == 0) {
						uni.showToast({
							title:'邀请成功!',
							duration:2500
						})
						 setTimeout(()=>{
						 	uni.reLaunch({
							    url:'/pages/index/index'
						    })
					    },3000)
					}else{
						uni.showToast({
							title:'每个会员只可以邀请一次!',
							duration:2500
						});
						setTimeout(()=>{
							uni.reLaunch({
								url:'/pages/index/index'
							})
						},3000)
						
					}					
				 }).catch(res=>{
				 })				
			},
			// 判断跳转登录还是index 页面
			decision(){
				if(wx.getStorageSync('user')){
					this.getRed();

				}else if(!wx.getStorageSync('user')){
					this.jump(this.create_dataset({
					    url: '/pages/login/login',
					    scene: this.scene,
					}))
				}
			},
			// 初次自己领取了多少红包
			getMyself(){
				let that = this;
				let a = wx.getStorageSync('user').id;
				uni.wjw_http({
					url: 'app/cduserredenvelopeassistance/assistance',
					type: 'post',
					data: {
						 userId: a,
						 envelopeId: this.scene,
						 assistanceType: 1
					}
				 }).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title:'您领取了'+res.data+'元红包'
						})
						uni.reLaunch({
							url:'/pages/index/index'
						})					
					}
				}).catch(res=>{
					
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.mask{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		background-color: #000;
		
		 }
		.uni-img{
			width: 500rpx;
			height: 700rpx;
			position:absolute;
			left:125rpx;
			top:300rpx;
			z-index: 20;;
		
	}
	
</style>
