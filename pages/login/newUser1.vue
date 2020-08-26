<template>
        <view class="uni-loginPassword">
            <view class="content" v-if="flag">
                <view class="oldPassword  list">
					<input v-model="phone"  @input='inputPhone' type="number" placeholder="请输入手机号" />
				</view>
				<view class="oldPassword  list">
					<input v-model="yqCode"   placeholder="请输入邀请码(选填)" />
				</view>
						
				<view class="password list yz" >
					<input v-model="security" type="number" placeholder="请输入验证码" />
					<view class="yzm" v-if="isSendCode" @tap.stop="getCode" :class="yzphone==true?'yamTrue':'yamFalse'">获取验证码</view>
				    <view class="yzm yamFalse" v-if="!isSendCode"  ><text style="font-size: 32rpx;">{{sendCodeTime}}</text>s后重试</view>
				</view>
				<view class="oldPassword  list mm">
					<input v-model="password"   placeholder="请设置您的密码" />
				</view>	
				<view class="uni-agreement">
					  <checkbox @tap.stop="choice" color="#ff7599"  v-model="valueflag"  />
					  <text class="word">同意用户协议</text>
				</view>
				<view class="btn"  @tap.stop="submit">确定</view>
            </view> 
		
    </view>
</template>
<script>
    export default {
        data() {
            return {
               phone:'',
			   // 验证码
			   security:'',
			   yzphone:false,
			   // 验证码按钮出现与否
			   isSendCode:true,
			   // 计数器
			   sendCodeTime:60,
			   // 布局 两者切换
			   flag:true,
			   password:'',
			   rePassword:"",
			   valueflag:false,
			   // 邀请码
			   yqCode:''
            }
        },
		
		onLoad(){
			
		
				},
        methods: {
			// 手机号码的验证
			inputPhone(e){
				if(/^1(3|4|5|6|7|8|9)\d{9}$/.test(e.detail.value)){
					this.yzphone=true;
				}else{
					this.yzphone=false;
				}
			},
			//获取验证码
			getCode(){
				let that =this;
				let a=that.phone
				let b=Number(a)+100;
				uni.wjw_http({
					url:'userverify/save',
					type:'post',
					data:{
						phone:that.phone,
						configCode:b
					}
				}).then(res=>{
					uni.showToast({
						title:'发送成功',
						duration: 2000
					})
					clearInterval(that.timer);
					 that.isSendCode = false;
					 that.timer = setInterval(()=>{
							that.sendCodeTime=that.sendCodeTime-1;
							if(that.sendCodeTime < 1){
								that.sendCodeTime = 60;
								that.isSendCode = true;
								clearInterval(that.timer);
						}
					},1000)
				})
			},
			///协议同意
			choice(e){
				this.valueflag=!this.valueflag
			},
			// 下一步重置支付密码
			submit(){
				let that=this;
				let aaa=this.password.split('');
				if(aaa.length<6 || aaa.length>20){
				   uni.showToast({
					title:'密码长度大于6小于20',
					duration:2000
				   })
				   return false; 
				}
				if(this.phone==''|| this.security==''  ){
					uni.showToast({
						title:'信息填写完整',
						duration:2000
					})
					return false; 
				}
				if(this.valueflag ==false){
					uni.showToast({
						title:'用户协议请同意',
						duration:2000
					})
					return false; 
				}
				
				uni.wjw_http({
					url:'user/register',
					type:'post',
					data:{
						phone:that.phone,
						code:that.security,
						password:that.password,
						inviteCode:that.yqCode
					}
				}).then(res=>{
					if(res.status ==0){
						uni.showToast({
							title:'密码重置成功',
							duration:2000
						})
						setTimeout(()=>{
							uni.reLaunch({
							   url:'/pages/index/index'
						    })
						},3000)
						
					}
				}).catch(res=>{
					uni.showToast({
						title:'修改失败',
						duration:2000
					})
				})

			}   
        }
    }
</script>

<style scoped lang="scss">
	.uni-loginPassword{
		background-color: #f1f1f1;
		height: 100%;
	}
   .yz{
	   position: relative;
	   top:0rpx;
	   left:0rpx;
   }
	.list{
		width:640rpx;
		height:60rpx;
		line-height:60rpx;
		margin-left:35rpx;
		padding:10rpx 20rpx;
		background-color: #fff;
		border-top: 40rpx solid #f1f1f1;
	}
.btn{
	   width:750rpx;
	   height:90rpx;
	   line-height:90rpx;
	   text-align: center;
	   background-color:#FF7295 ;
	   font-size: 30rpx;
	   position: absolute;
	   left:0rpx;
	   bottom:0;
	   color:#fff;
   }
 .yzm{
	width:200rpx ;
	height:60rpx;
	position: absolute;
	top:10rpx;
	right:5rpx;
	line-height: 60rpx;
	text-align: center;
	border-radius: 30rpx;
	font-size:26rpx;
	color:#fff;
	background-color: #FF7599;
 }
 .yamTrue{
	 background-color: #FF7599;
 }
 .yamFalse{
	 background-color:#aaa;
 }
 .passInput{
	 margin-top:100rpx;
 }
 .btnPassword{
	 width:700rpx;
	 height:90rpx;
	 line-height:90rpx;
	 margin-left:25rpx;
	 text-align: center;
	 background-color:#FF7295 ;
	 font-size: 30rpx;
	 border-radius: 20rpx;
	 margin-top:270rpx;
	 color:#fff;
 }
 .mm{
	// border-top: 40rpx solid #f1f1f1;
 }
 .uni-agreement{
	 margin: 30rpx 0 0 35rpx;	 
	 .word{
		 font-size: 24rpx;
		 // #FF7599
	 }
 }
</style>

