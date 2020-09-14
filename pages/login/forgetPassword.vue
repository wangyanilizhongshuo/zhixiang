<template>
        <view class="uni-forgetPassword">
            <view class="content" v-if="flag">
                <view class="oldPassword  list">
					<input v-model="phone"  @input='inputPhone' type="number" placeholder="请输入手机号" />
				</view>
				<view class="oldPassword  list">
					<input v-model="password"   placeholder="请输入您的密码" />
				</view>
				<view class="oldPassword  list">
					<input v-model="rePassword"   placeholder="请再次输入您的密码" />
				</view>
				<view class="password list yz" >
					<input v-model="security" type="number" placeholder="请输入验证码" />
					<view class="yzm" v-if="isSendCode" @tap.stop="getCode" :class="yzphone==true?'yamTrue':'yamFalse'">获取验证码</view>
				    <view class="yzm yamFalse" v-if="!isSendCode"  ><text style="font-size: 32rpx;">{{sendCodeTime}}</text>s后重试</view>
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
			   rePassword:""
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
			// 下一步重置支付密码
			submit(){
				let that=this
				if(this.phone==''|| this.security=='' ){
						uni.showToast({
							title:'信息填写完整',
							duration:2000
						})
						return false; 
				}
				if(that.password !==this.rePassword){
					uni.showToast({
						title:'新密码两次不相同',
						duration:2000
					})
					return false; 	
				}
				uni.wjw_http({
					url:'user/resetPassByCode',
					type:'post',
					data:{
						phone:that.phone,
						code:that.security,
						password:this.password
					}
				}).then(res=>{
					if(res.status ==0){
						uni.showToast({
							title:'密码重置成功',
							duration:2000
						})
						setInterval(()=>{
							uni.reLaunch({
							   url:'/pages/index/index'
						    })
						},2100)
						
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
	.uni-forgetPassword{
		background-color: #f1f1f1;
		height: 100%;;
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
	   color:#fff;
	   position: absolute;
	   left:0rpx;
	   bottom:0;
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
	 height:100rpx;
	 line-height:100rpx;
	 margin-left:25rpx;
	 text-align: center;
	 background-color:#FF7295 ;
	 font-size: 30rpx;
	 border-radius: 20rpx;
	 margin-top:270rpx;
	 color:#fff;
 }
</style>

