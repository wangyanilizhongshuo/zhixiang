<!-- 
	/pages/category/mybk/wiki/info/info
-->
<template>
	<view>
		<view class="info_title all_pd">{{title}}  </view>
		<view class="info_item all_pd">{{time}}</view>
		<view class="info_txt all_pd">{{content}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				time:'',
				content:'',
				id:''
			}
		},
		onLoad(options){
			this.setData(options);
		    this.getDetail();
		},
		methods: {
			getDetail(){
				let that=this;
				uni.wjw_http({
					url:'/app/cdmaternalchildencyclopedia/info',
					type:'get',
					data:{
						id:that.id
					}
				}).then(res=>{
					if(res.code ==0){
						that.title =res.data.title;
						let a = new Date(res.data.createTime);
						that.time= a.getFullYear()+"-"+(a.getMonth()+1).toString().padStart(2,'0')+"-"+a.getDate().toString().padStart(2,'0');
						that.content=res.data.detailsChinese
					}
				})
			 
			}
		},
		
	
	}
</script>

<style>
	.all_pd{
		padding: 0 17rpx;
	}
	.info_title{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(0,0,0,1);
		line-height:50rpx;
		margin-bottom: 55rpx;
		margin-top: 30rpx;
	}
	.info_item{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(136,136,136,1);
		margin-bottom: 55rpx;
	}
	.info_txt{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(52,52,52,1);
	}
</style>
