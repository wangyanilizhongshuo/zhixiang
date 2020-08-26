<template>
	<view>	
		<div class="info_head all_head flex flex_align_c all_pd_lr">
			<div class="info_bar all_bar"></div>
			<div class="info_title all_title">您描述的问题</div>
		</div>
		<div class="info_txt all_pd_lr">{{iss}}</div>
		<div class="img_info_head all_head flex flex_align_c all_pd_lr">
			<div class="img_info_bar all_bar"></div>
			<div class="img_info_title all_title">图片详情</div>
		</div>
		<div class="img_info_list all_pd_l flex flex_wrap" >
			<img :src="item" alt="" class="img_info_li  no_shrink" v-for="(item,index) in pic" :key="index"/>
		</div>
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
				iss:'',
				pic:''
				
			}
		},
		onLoad(options){
			this.setData(options);
			  let a =this.pic
			   a= a.split(',')
			  this.pic=a
			
			// this.getList()
		},
		methods: {
			getList(){
				// let userId=uni.getStorageSync('user').id;
				// uni.wjw_http({
    //                  url:'app/cdexpertconsultationrecord/list',
				// 	 type:'get',
				// 	 data:{
				// 		 expertId:this.userId,
				// 		 userId:userId,
				// 		 page:1,
				// 		 limit:1
						 
				// 	 }
				// })	
			}
		}
	}
</script>

<style>
	.all_pd_lr{
		padding: 0 21rpx;
	}
	.all_pd_l{
		padding-left: 21rpx;
	}
	.all_head{
		height: 100rpx;
	}
	.all_bar{
		width:8rpx;
		height:28rpx;
		background:linear-gradient(0deg,rgba(255,127,176,1) 0%,rgba(255,107,135,1) 100%);
		border-radius:4rpx;
		margin-right: 7rpx;
	}
	.all_title{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(65,65,65,1);
	}


	.info_head{}
	.info_bar{}
	.info_title{}
	.info_txt{
		width:700rpx;
		height:241rpx;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(0,0,0,1);
		line-height:36rpx;
	}



	.img_info_head{}
	.img_info_bar{}
	.img_info_title{}
	.img_info_list{}
	.img_info_li{
		width:220rpx;
		height:220rpx;
		border-radius:10rpx;
		margin-right: 23rpx;
		margin-bottom: 23rpx;
	}
</style>
