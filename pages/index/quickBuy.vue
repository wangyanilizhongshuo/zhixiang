
<template>
	<view class="quick-contnet">
		<view class="uni-list" v-for="(item,index) in quickgetList" :key="index" @click="detailJump(item)">
			<image class="uni-image" :src="item.photo" ></image>
			<!-- <view >{{item.eventName}}</view> -->
		</view>
	   
	</view>
</template>
<script>
	export default{
		data(){
			return {
				quickgetList:[]
			}
		},
		onLoad(e){
		 this.getList();
		},
		onShareAppMessage: function () {
		    let _this = this;
		    return {
		      title: "智享婴品",
		      path: "/pages/index/index?" + _this.getShareUrlParams()
		    };
		},
		methods:{
			// 数据列表
			getList(){
				 uni.wjw_http({
					 url: "bannergoods/list",
					 method: 'get',
					 data:{
						   page: 1,
						   pageSize:5
					 }
				 }).then(res => {
					 if(res.status ==0){
						  this.quickgetList=res.result.map(item=>item)
						  this.quickgetList[0].photo='http://zxyp.hzbixin.cn/files/44231597216034875.jpg';
						  this.quickgetList[1].photo='http://zxyp.hzbixin.cn/files/44231597216034875.jpg';
						  this.quickgetList[2].photo='http://zxyp.hzbixin.cn/files/44231597216034875.jpg';
						  this.quickgetList[3].photo='http://zxyp.hzbixin.cn/files/44231597216034875.jpg';
						  this.quickgetList[4].photo='http://zxyp.hzbixin.cn/files/44231597216034875.jpg';
						  this.quickgetList[5].photo='http://zxyp.hzbixin.cn/files/44231597216034875.jpg';
					 }
					 
				 }) 
			},
			// 详情页面的跳转
			detailJump(e){
				let quickId=e.id,quickTime=e.endTime,quickType=1;
				uni.navigateTo({
					url:'../goods/goods?type=1&id='+quickId+'&time='+quickTime
				})
				
			}
		}
	}
</script>
<style scoped lang="scss">
	.uni-list{
		width:750rpx;
		margin:0 auto;
		.uni-image{
			width:750rpx;
			height:300rpx;
			margin-right:125rpx;
			margin-bottom:20rpx;
		}
	}
    
</style>