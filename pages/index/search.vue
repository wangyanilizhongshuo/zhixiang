<template>
	<view class="uni-search">
		<view class="uni-input-content">
			<input  confirm-type="search" @confirm="doSearch"  class="uni-input" placeholder-style="font-size:26rpx;margin-left:5rpx;" placeholder="搜索" v-model="inputValue" @focus="searchFlag=false" />
		    <text class="word" @tap.stop="inputValue=''">取消</text>
			<image class="uni-search-img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/search.png"></image>
		</view>
		<view class="uni-histor-record">历史搜索</view>
		<view class="record-content">
			<view class="lists" @tap.stop="getOne(item)" v-for="(item,index) in hisWord" :key="index">
				<image class="uni-img-time" src="http://zxyp.hzbixin.cn/files/55371597900578994.jpg"></image>
				<view class="word">{{item}}</view>
			</view>
			<view class="clearHistory" @tap.stop="clearRecord">
				<view class="word">清空历史记录</view>
				<image class="uni-imgs" src="http://zxyp.hzbixin.cn/files/57091597900620568.jpg"></image>
			</view>
		</view>
	</view>
</template>

<script>
	// saleevent/listByPage
	export default{
		 data(){
			 return {
				 inputValue:'',
				 
				 hisWord:[]
			 }
		 },
		 onLoad(){			
			 console.log(this.value)
			 if(wx.getStorageSync('list')){
				 this.hisWord=wx.getStorageSync('list')
			 }
		 },
		 onShareAppMessage: function () {
		     let _this = this;
		     return {
		       title: "智享婴品",
		       path: "/pages/index/index?" + _this.getShareUrlParams()
		     };
		 },
		 methods:{	
			 //跳转
			doSearch(){
				this.hisWord.push(this.inputValue);
				wx.setStorageSync('list',this.hisWord)
				uni.navigateTo({
					url:'/pages/index/searchDetail?value='+this.inputValue
				})
			},
			clearRecord(){
				uni.removeStorageSync('list');
				this.$nextTick(()=>{
					this.hisWord=[]
				})
			},
			getOne(msg){
				this.inputValue=msg;
				uni.navigateTo({
					url:'/pages/index/searchDetail?value='+msg
				})
			}
			 
		 }
		 
	}
</script>

<style scoped lang="scss">
	.uni-input-content{
		width:750rpx;
		height: 60rpx;
		position: relative;
		padding:5rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		.uni-input{
			width:600rpx;
			height:60rpx;
			background-color: #f1f1f1;
			border-radius: 15rpx;
			margin:10rpx 15rpx  0  0rpx;
			padding-left:60rpx;
			box-sizing: border-box;
			font-size: 28rpx;
		}
        .word{
			font-size: 28rpx;
			color:#323232;
		}
		.uni-search-img{
			width: 30rpx;
			height: 30rpx;
			position: absolute;
			top:20rpx;
			left:50rpx;
		}
	}
	.uni-histor-record{
		width:750rpx;
		height: 80rpx;
		background-color: #f1f1f1;
		color: #969696;
		padding-left: 30rpx;
		box-sizing: border-box;
		line-height: 80rpx;
		font-size: 30rpx;
		margin-top: 20rpx;
	}
    .record-content{
		.record-content{
			font-size: 26rpx;

		}
		
	}
	
	.clearHistory{
		width: 750rpx;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.uni-imgs{
			width: 40rpx;
			height: 40rpx;
		}
		.word{
			color: #959595;
			margin-right:25rpx;
		}
	}
	.lists{
		width: 750rpx;
		height: 100rpx;
		display: flex;
		padding-left: 30rpx;
		box-sizing: border-box;
		border-bottom: 1rpx solid #dfdfe7;
		justify-content: flex-start;
	    align-items: center;
		.word{
			color: #000;
			font-size: 24rpx;
		}
		.uni-img-time{
			display: inline-block;
			width:36rpx ;
			height: 36rpx;
			margin-right:15rpx;
		}
	}
	
</style>
