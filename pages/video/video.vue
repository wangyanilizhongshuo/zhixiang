<template>
<view class="uni-video"> 
     <view class="uni-content" v-for="(item,index) in videoList" :key="index" >
		 <view class="list" @tap.stop="videoJump(item.id,item.is_right)"  >
			 <view class="list-left" >
				  <image  class="image" :src="item.facePhoto"></image>
			 </view>
			 <view class="list-right">
				 <view class="uni-up">
					  <view :class="item.is_right==1?'titlebf':'title'"  >{{item.name}}</view>
				 </view>
				 <view class="uni-down">
					  <view class="left">
						  <text class="text">{{item.createTime}}</text>
				      </view>
					  <view class="right">
						   <img class="poinImg" src="http://zxyp.hzbixin.cn/files/92091600414557199.jpg">
						   <text class="titleSmall">+100</text>
					  </view>
				  </view> 
			 </view>
		 </view>
		
	 </view>
</view>
</template>
<script>
   export default{
	   data(){
		   return{
			   page:1,
			   videoList:''
		   }
	   },
	   onLoad(){
		     this.getVideo();
			
	   },
	   methods:{
		   // 视频列表 这边 200 条数据 全部加载 后端接口问题
		     getVideo(){
				 let that=this;
				 let id = wx.getStorageSync('user').id;
				 uni.wjw_http({
					 url:'vedio/list',
					 type:'post',
					 data:{
						 userId:id,
						 page:that.page,
						 pageSize:10
					 }
				 }).then(res=>{
					 if(res.status ==0){
					  that.videoList=res.result;
						 for(let i in that.videoList){
							 let a = new Date(that.videoList[i].createTime);
							 that.videoList[i].createTime= a.getFullYear()+"-"+(a.getMonth()+1).toString().padStart(2,'0')+"-"+a.getDate().toString().padStart(2,'0')+" "+a.getHours().toString().padStart(2,'0')+"-"+a.getMinutes().toString().padStart(2,'0')+"-"+a.getSeconds().toString().padStart(2,'0')
						 }
					 }
				 })
			 },
			 // 视频答题
			 videoJump(ids,is_right){
				if(is_right !=1){
					uni.navigateTo({
					 url:'/pages/video/detail?id='+ids
				   })
				} 
			 }
			 
			 
	   }
	   
   }
</script>
<style scoped lang="scss">
	.uni-content{
		width:750rpx;
		height:200rpx;
		.list{
			width:700rpx;
			height:150rpx;
			display: flex;
			margin:25rpx;
			justify-content: space-between;
            .list-left{
				margin-right:20rpx;
				.image{
					width:180rpx;
					height:150rpx;
				}
			}
			.list-right{
				flex:1;
				.uni-up{
					margin:30rpx 0rpx;
					.title{
						font-size:30rpx;
					}
				}
				.uni-down{
					display: flex;
					justify-content: space-between;
					.left{
						.text{
							font-size: 30rpx;
							color: #bfbfbf;
						}
					}
					.right{
						.poinImg{
							display: inline-block;
							width:30rpx;
							height:33rpx;
							position:relative;
							bottom: -6rpx;
						}
						.titleSmall{
							color: #ff911b;
						}
					}
				}
			}
		}
	}
	.titlebf{
		color:#bfbfbf;
	}
	
</style>