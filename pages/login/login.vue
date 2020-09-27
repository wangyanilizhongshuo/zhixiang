<template>
   
	<view class="content">
		<view class="login-list">
			<img src="http://zxyp.hzbixin.cn/files/s_35201600410892078.jpg">
			<view class="login-content">
				<view class="login-box">
					<view class="form-input form_input_box flex flex_align_c">
						<img src="http://zxyp.hzbixin.cn/files/94981600410932077.jpg" class="no_shrink">
						<input type="number" id="phone" class="input-style flex_grow"  confirm-type="search" placeholder="请输入手机号" @confirm="enter" v-model='phone' >
					</view>
					<view class="form-input form_input_box flex flex_align_c">
						<img src="http://zxyp.hzbixin.cn/files/2171600410977948.jpg" class="no_shrink" >
						<input type="password" id="pwd" class="input-style flex_grow"  confirm-type="search" @confirm="enter" placeholder="请输入密码" v-model='pwd' >
					</view>
					<view class="form-input others">
						<span class="new-login" @tap.stop='jump' data-url='/pages/login/newUser1' >新用户注册</span>
						<span class="forget-password" @tap.stop='jump' data-url='/pages/login/forgetPassword'>忘记密码</span>
					</view>
					<view class="form-input " @tap.stop='login' data-url='/pages/index/index' data-type='3' >
						<button class="login-button flex_c">登录</button>
					</view>
				</view>
			</view>
		</view>
		<view class="hbyOccurFlag" v-if="seeMovieFlag">{{seeMpvieMsg}}</view>
	</view>
</template>

<script>


	export default {

		components: {
			// wq,
			// main,
		},

		data() {
			return {
				seeMovieFlag:false,
				seeMpvieMsg:'',
				phone: '',
				pwd: '',
				code:'',
				QRcode:'',
				scene:''
			}
		},
		
		onLoad(options){
			this.setData(options);
		},
		
		methods: {
			// 登录
			login(e) {
			     let that =this;
			    if(this.phone == "" && this.pwd == ""){
                    this.toastTip("信息未输入完整！");
                    return false;
                }
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))){
					uni.showToast({title: '请填写正确手机号码',icon:"none"});
					return false; 
				}
				
			    uni.wjw_http({
			        url: 'user/login',
			        method: 'post',
			        data: {
			        	phone: this.phone,
			        	password: this.pwd,
			        },
			    }).then(res => {
					
					if(res.status ==0){
						wx.setStorageSync('token', res.result.token);
			            wx.setStorageSync('user', res.result.user);
			            wx.setStorageSync('userData', res.result);
						 if(that.scene){
							// help  ==1是从 面对面邀请过来的flag
							uni.navigateTo({
								url:'/pages/QRcode/QRcode?scene='+this.scene
							})	
						}else{
							that.jump(this.create_dataset({
							    url: '/pages/index/index',
							    type: '3',
							}))
							
						}					
					}  
					else{
						this.seeMovieFlag=true;
						this.seeMpvieMsg=res.msg;
						setTimeout(()=>{
							this.seeMovieFlag=false;
						},2000)
					
					}
			    }).catch(res=>{
					console.log(res)
					console.log('请求失败')
				})

			},
			enter(){
				if(this.phone == "" && this.pwd == ""){
				    this.toastTip("信息未输入完整！");
				    return false;
				}
				else{
					this.login()
				}
			}

		}
	}
</script>

<style>
	


	.login-list img,
	.login-list image {
	    width: 100%;
	    /*height: 12rem;*/
	    height: calc(240 * 2rpx);
	}
	.login-box {
		position: absolute;
		top: calc(0 * 2rpx);
		left: 0;
		width: 100%;
		height: auto;
	}
	
	.form_input_box{
		box-shadow: calc(0 * 2rpx) calc(1 * 2rpx) calc(5 * 2rpx) calc(0 * 2rpx) rgba(156, 160, 156, 0.2);
		border: solid calc(1 * 2rpx) #e1e1e1;
		border-radius: calc(8 * 2rpx);
	}
	.form-input {
		position: relative;
		width: 92%;
		height: calc(40 * 2rpx);
		margin: 0 auto calc(10 * 2rpx);
	}

	.form-input img ,
	.form-input image {
		width: calc(21.5 * 2rpx);
		height: calc(23 * 2rpx);
		/*position: absolute;*/
		top: calc(8 * 2rpx);
		left: calc(13 * 2rpx);
		margin: 0 calc(13 * 2rpx);
	}

	.input-style {
		height: calc(40 * 2rpx);
		width: 100%;
		line-height: calc(45 * 2rpx);
		/*text-indent: calc(40 * 2rpx);*/
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

	.login-content {
		position: relative;
		margin-top: calc(20 * 2rpx);
	}

	.others {
		font-size: calc(14 * 2rpx);
		color: #414141;
	}

	.login-button {
		height: calc(45 * 2rpx);
		width: 100%;
		background-color: #FF7599;
		border-radius: calc(8 * 2rpx);
		font-size: calc(15 * 2rpx);
		color: #ffffff;
		position: relative;
		text-align: center;
		/*padding-top: calc(11 * 2rpx);*/
		/*margin-top: calc(8 * 2rpx);*/
		top: 0;
		left: 0;
	}
	
	.new-login{
	    position: absolute;
	    left: calc(4 * 2rpx);
	}

	.forget-password{
	    position: absolute;
	    right: calc(4 * 2rpx);
	}
</style>
