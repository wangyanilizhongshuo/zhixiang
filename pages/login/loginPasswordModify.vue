<template>
        <view class="uni-loginPassword">
            <view class="content">
                <view class="oldPassword  list">
					<input v-model="oldPassword" type="password" placeholder="请输入原登录密码" />
				</view>
				<view class="password list" >
					<input v-model="newPassword" type="password" placeholder="请输入新密码" />
				</view>
				<view class="repassword list">
					<input v-model="reNewPassword" type="password" placeholder="请确认新密码" />
				</view>
				<view class="btn"  @tap.stop="submit">提交</view>
            </view>   
			 <view class="hbyOccurFlag" v-if="signalFlag">{{signalMsg}}</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
               oldPassword:'',
			   newPassword:'',
			   reNewPassword:'' ,
			   signalFlag:false,
			   signalMsg:''
			   
            }
        },
        methods: {
			submit(){
				let that=this
				if(this.oldPassword==''|| this.newPassword==''||  this.reNewPassword== '' ){
						
						that.signalFlag=true;
						that.signalMsg='密码填写出错';
						setTimeout(()=>{
							 that.signalFlag=false;
						},2500)
						return false; 
				}
				if(that.newPassword !==this.reNewPassword){
					// uni.showToast({
					// 	title:'新密码两次不相同',
					// 	duration:2000
					// })
					that.signalFlag=true;
					that.signalMsg='新密码两次不相同';
					setTimeout(()=>{
						 that.signalFlag=false;
					},2500)
					return false; 	
				}
				let id =wx.getStorageSync('user').id
				uni.wjw_http({
					url:'user/resetPassByOldPass',
					type:'post',
					data:{
						userId:id,
						oldPass:that.oldPassword,
						newPass:that.newPassword,
					}
				}).then(res=>{
					if(res.status ==0){
						 uni.showToast({
						 	title:'修改成功',
							duration:2000
						 })
						  setTimeout(()=>{
							  uni.navigateTo({
							  	url:'/pages/login/login'
							  })
						  },2500)
							
						
					}else{
						that.signalFlag=true;
						that.signalMsg=res.msg;
						setTimeout(()=>{
							 that.signalFlag=false;
						},2500)
						
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
		height: 100%;;
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
	   margin-top:80rpx;
	   color:#fff;
	   position: absolute;
	   left:0rpx;
	   bottom:0;
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

