<template>
	<view :class="style">
		<view class="ta_c">
			<img class="succimg_cls" :src='img' >
		</view>
		<view class="pre_line status_tips ta_c">
			<view class="uni-content"v-if="type==1" >
				<view class="up">评价成功</view>
				<view class="down">感谢您对我们的评价</view>
			</view>
			<view class="uni-content"v-if="type==2" >
				<view class="up">支付成功</view>
				<view class="down">感谢您对我们产品的支持</view>
			</view>
			<view class="uni-content"v-if="type==3" >
				<view class="up">信息填写完成</view>
				<view class="down">感谢您对我们产品的支持</view>
			</view>
			<view class="uni-content"v-if="type==4" >
				<view class="up">退款成功</view>
				<view class="down">期待您的下次光临</view>
			</view>
			<view class="uni-content"v-if="type==5" >
				<view class="up">交易成功</view>
				<view class="down">期待您的下次光临</view>
			</view>
			<view class="uni-content"v-if="type==5" >
				<view class="up">余额充值成功</view>
				<view class="down">期待您的下次光临</view>
			</view>
			<view class="uni-content"v-if="type==6" >
				<view class="up">提现成功</view>
				<view class="down">期待您的下次光临</view>
			</view>
			<view class="uni-content"v-if="type==7" >
				<view class="up">充值成功</view>
				<view class="down">期待您的下次光临</view>
			</view>
			<view class="uni-content"v-if="type==8" >
				<view class="up">提交成功</view>
				<view class="down">请等待后台审核</view>
			</view>
		</view>
		<view class='ta_c'><button class="button_cls flex_c" @tap.stop="back" >到首页</button></view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				type:1,
				style: 'pink_style',// pink_style red_style skyblue_style
				img: 'http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/ok@2x.png',// succimg_cls 
				content: '提交成功，请等待后台审核',
			}
		},
		onLoad(options){
			// type ==1 是评价的内容
			this.setData(options)
		},
		onShareAppMessage: function () {
		    let _this = this;
		    return {
		      title: "智享婴品",
		      path: "/pages/index/index?" + _this.getShareUrlParams()
		    };
		},
		methods:{
			back(){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-content{
		width:750rpx;
		height:150rpx;
		// background-color: #FF7599;
		padding: 0 50rpx;
		box-sizing: border-box;
		color:#000;
		font-size: 26rpx;
		display: flex;
        flex-direction: column;
		align-items: center;
		justify-content: center;
		.up{
			margin-bottom:25rpx;
		}
	}
	.uni-back{
		width: 750rpx;
		height:100rpx;
		background-color: #fff;
		text-align: center;
		margin-top:30rpx;
		.uni-word{
			display: block;
			width: 200rpx;
			height:50rpx;
			line-height: 50rpx;
			text-align: center;
			border-radius: 15rpx;
			border:1rpx solid #FF7599;
			color:#FF7599;
			font-size: 26rpx;
			margin:0 auto;
		}
		
	}
	.succimg_cls{
	   width: 195rpx;
	   height: 195rpx;
	   margin: auto;
	   margin-top: 183rpx;
	   margin-bottom: 126rpx;
	   object-fit: cover;
	}
	.status_tips{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(0,0,0,1);
		margin-bottom: 82rpx;
	}
	.button_cls{
		max-width: 260rpx;
		box-sizing: border-box;
		padding: 20rpx;
		height: 86rpx;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
		border-radius: 43rpx;
	
	}
	.pre_line{
		white-space: pre-line;
	}
	
	
	.skyblue_style{}
	.red_style .succimg_cls{
		color: #82D2DC;
	}
	.red_style .button_cls{
		background: #82D2DC;
	}
	
	
	.red_style{}
	.red_style .succimg_cls{
		color: #F93C41;
	}
	.red_style .button_cls{
		background: #F93C41;
	}
	
	
	.red_style2{}
	.red_style2 .succimg_cls{
		color: #E86F6B;
	}
	.red_style2 .button_cls{
		background: #E86F6B;
	}
	
	
	.pink_style{}
	.pink_style .succimg_cls{}
	.pink_style .button_cls{
		background:linear-gradient(90deg,rgba(255,107,134,1) 0%,rgba(255,127,176,1) 100%);
	}
</style>
