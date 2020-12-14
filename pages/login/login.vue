<template>
	<view class="uni-login">
		<image class="bgPhoto" src="../../static/login-bg.png"></image>
		<image class="people" src="../../static/login-people.png"></image>
		<view class="contents">
				<button class=" weixinLogin" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="getPhoneNumber">微信用户一键登录</button>
			<!-- <view class="tel_login_register">
				<view lass="field">手机号码登录/注册</view>
			</view> -->
			<view class="hbyOccurFlag" v-if="signalFlag">{{signalMsg}}</view>
		</view>
	</view>
</template>

<script> 
   export default{
	   data(){
		   return{
			   code:'',
			   signalFlag:false,
			   signalMsg:'',
			   smallRed:''
		   }
	   },
	   onLoad(options){
		   this.setData(options);
		   
	   },
	   methods:{
		   getPhoneNumber: function(e) {
			   console.log(e)
			   console.log('wangnina')
		   	let _this = this;
		   	if (e.detail.errMsg !== 'getPhoneNumber:ok') {
				
		   		return false;
		   	}
			// uni.showLoading({
			//   title: "正在登录",
			//   mask: true
			// });
		   	uni.login({
		   	  provider: 'weixin',
		   	  success: function (res) {
				    _this.code=res.code;
		   	// 发送用户信息
			uni.wjw_http({
				url:'app/wechat/bindPhone',
				method:'post',
				data: {
					code: _this.code,
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv,
				}
				}).then(res=>{
					if(res.code ==0){
						 wx.setStorageSync('token', res.data.data.token);
						 wx.setStorageSync('user', res.data.data.userModel);
						 wx.setStorageSync('userData', res.data.data.userModel);
						 if(res.data.data.userModel.password){
						 	uni.switchTab({
						 	  url:'/pages/index/index'
						     })
						 }else if(_this.smallRed==11){
							 // 被分享获取了小额红包
							uni.switchTab({
							  url:'/pages/index/index?xehb='+true
							 }) 
						 }
						 else  {
						 	uni.navigateTo({
						 		url:'/pages/login/specialPwd'
						 	})
						 }
					}
					console.log(res)
					console.log('login')
					
					
				}).catch(res=>{
					_this.signalFlag=true;
					_this.signalMsg='请重新登录';
					setTimeout(()=>{
						 _this.signalFlag=false;
					},2500)
				})
		  
		  	  }
		    	});
		    },
	   }
   }
</script>

<style scoped lang="scss">
	.uni-login{
		position: relative;
		left:0rpx;
		top:0rpx;
		.bgPhoto{
			display: block;
		    width: 750rpx;
		    height: 778rpx;
		}
		.people{
			display: block;
			width: 690rpx;
			height: 366rpx;
			position: absolute;
			top:206rpx;
			left:30rpx;
		}
		.contents{
			margin-top:-45rpx;
			.weixinLogin{
				width: 658rpx;
				height: 90rpx;
				background-color: #ff7092;
				border-radius: 8rpx;
				text-align: center;
				line-height: 90rpx;
				position: relative;
				left:46rpx;
				top:0rpx;
				color: #fff;
				}
			.tel_login_register{
				width: 750rpx;
				margin-top:52rpx;
				text-align: center;
				color: #222222;
				font-size: 28rpx;
				background-color: #fff;
				
			}
			
		}
		
	}
	.button::after{ border: none; }
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
