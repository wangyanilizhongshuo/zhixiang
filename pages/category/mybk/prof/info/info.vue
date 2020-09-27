<template>
	<view>

		<view class="prof_li flex ov_hid bg_white"
			>
			
			<img :src="expertIntroduce.cover" alt="" class="prof_li_img no_shrink">
			<view class="prof_li_info">
				<view class="prof_li_name">{{expertIntroduce.name}}</view>
				<view class="prof_li_tag">{{expertIntroduce.title}}</view>
				<view class="prof_li_tip ">{{expertIntroduce.desc}}</view>
			</view>
		</view>

		<view class="record_list_wrap all_list_wrap  bg_white ">
			<view class="record_list_head all_list_head flex flex_align_c">
				<view class="record_list_title all_list_title flex_grow flex flex_align_c ">
					<span class="record_list_title_txt all_list_title_txt">咨询记录</span>
					<img src="http://zxyp.hzbixin.cn/files/18391600409269179.jpg" alt="" class="record_list_title_icon all_list_title_icon no_shrink">
				</view>
			</view>
		
			<view class="record_list ov_hid">
				<view class="record_li flex"
					v-for="(item,index) in getRecordList" :key='index' 
		 			@click='details(item.issues,item.picture)' 
					>
					<view class="record_li_tips txt_over_ell_2 flex_grow">{{item.issues}}</view>
					<img :src="item.expertCover" alt="" class="record_li_img no_shrink">
					<!-- <img :src="item.picture[0]" alt="" class="record_li_img no_shrink"> -->
				</view>
			</view>
			
		</view>
		<view class="consult_btn flex_c op_0">立即咨询</view>
		<view class="consult_btn flex_c fixed po_bottom width_perc"
			@click="AskQuesExpert()"
		>立即咨询</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				id:'',
				expertIntroduce:'',
				pigeSize:'',
				consultationRecord:'',
				pages:1,
				getRecordList:[],
				// 专家id
				personId:'',
				pics:''
			}
		},
		onLoad(options){
			 this.setData(options);
			 this.getPersonDetail();
			 this.getRecord();
		},
		onReachBottom(){
			if(this.pigeSize>this.pages){
				 this.pages+=1;
				 this.getRecord(this.pages);
			}
		},
		methods: {
			// 专家的详情
			getPersonDetail(){
				let that =this;
				uni.wjw_http({
				    url: 'app/cdmaternalchildexpert/info',
				    method: 'get',
					data:{
						id:that.id
					}
				}).then(res => {	
					that.expertIntroduce=res.data;
					that.personId=that.expertIntroduce.id;
					
				})
			},
			// 得到记录 
			getRecord(){
				let that=this;
				let userId=uni.getStorageSync('user').id;
				let token=uni.getStorageSync('token');
				uni.wjw_http({
				    url: 'app/cdexpertconsultationrecord/list',
				    method: 'get',
					data:{
						 // userId:userId,
						 expertId:that.id,
						 page:that.pages,
						 limit:5,
						 // token:token
					}
				}).then(res => {	
					if(res.code ==0){
						that.pigeSize=res.data.totalPage;
						let aa=res.data.list;
						let ab=that.getRecordList;
						that.getRecordList=ab.concat(aa)		
					}
					 })
			},
			// 提出问题  立即咨询
				AskQuesExpert(){
					let that=this;
					uni.navigateTo({
						url:'/pages/category/mybk/prof/consult/submit/submit?userId='+that.personId
					})
				},
				//咨询列表的详情
				details(issues,picture){
					uni.navigateTo({
						url:'/pages/category/mybk/prof/consult/record/record?iss='+issues+'&pic='+picture
					})
					
				}
		}
	}
</script>

<style>
	page{
		background: #F0F0F0;
	}

	.all_ma{
		margin: 20rpx;
	}
	.all_list_wrap{
		background:rgba(255,255,255,1);
		border-radius:10rpx;
		padding: 0 25rpx;
	}
	.all_list_head{
		height: 100rpx;
	}
	.all_list_title{}
	.all_list_title_txt{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(0,0,0,1);
		margin-right: 8rpx;
	}
	.all_list_title_icon{}
	.all_list_more{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(191,191,191,1);
	}
	

	.opts{}
	.opt{
		width:346rpx;
		height:190rpx;
		background:rgba(255,255,255,1);
		border-radius:10rpx;
	}
	.opt+.opt{
		margin-left: 20rpx;
	}
	.opt_img{
		width: 245rpx;
		height: 100rpx;
	}

	.prof_list_wrap{
	}
	.prof_list_head{}
	.prof_list_title_txt{}
	.prof_list_title{}
	.prof_list_title_icon{
		width: 39rpx;
		height: 26rpx;
	}
	.prof_list_more{}

	.prof_list{
		padding-bottom: 42rpx;
	}
	.prof_li{
		margin-top: 68rpx;
	}
	.prof_li_img{
		width: 100rpx;
		height: 100rpx;
		margin-right: 28rpx;
	}
	.prof_li_info{}
	.prof_li_name{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(0,0,0,1);
		margin-bottom: 18rpx;
	}
	.prof_li_tag{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(58,58,58,1);
		margin-bottom: 28rpx;
	}
	.prof_li_tip{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(146,146,146,1);
		line-height:31rpx;
		margin-bottom: 40rpx;
	}
	.prof_li_b{}
	.prof_li_price{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(89,89,89,1);
		margin-right: 38rpx;
	}
	.prof_li_btn{
		padding: 0 20rpx;
		height:52rpx;
		box-sizing: border-box;
		background:rgba(255,241,246,1);
		border:2rpx solid rgba(255,112,145,1);
		/*border-image:linear-gradient(0deg, rgba(255,107,134,1), rgba(255,127,176,1)) 10 10;*/
		border-radius:26rpx;

		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,112,145,1);
	}




	.wiki_list_wrap{}
	.wiki_list_head{}
	.wiki_list_title{}
	.wiki_list_title_icon{
		width: 34rpx;
		height: 36rpx;
	}
	.wiki_list_more{}

	.wiki_list{
		padding-bottom: 60rpx;
	}
	.wiki_li{
		margin-top: 60rpx;
	}
	.wiki_li_info{
		margin-right: 30rpx;
	}
	.wiki_li_title{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(0,0,0,1);
		margin-bottom: 22rpx;
	}
	.wiki_li_tip{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(191,191,191,1);
		margin-bottom: 22rpx;
	}
	.wiki_li_time{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(136,136,136,1);
	}
	.wiki_li_img{
		width: 310rpx;
		height: 166rpx;
		border-radius: 10rpx;
	}

	.prof_li{
		margin-top: 0rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
	}
	.prof_li_img{
		width: 140rpx;
		height: 140rpx;
		margin-right: 28rpx;
	}
	.prof_li_info{}
	.prof_li_name{
		font-size:50rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(0,0,0,1);
		margin-bottom: 50rpx;
	}
	.prof_li_tag{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(58,58,58,1);
		margin-bottom: 50rpx;
	}
	.prof_li_tip{
		margin-bottom: 34rpx;
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(146,146,146,1);
		line-height:31rpx;
	}



	.record_list_wrap{}
	.record_list_head{}
	.record_list_title{}
	.record_list_title_txt{}
	.record_list_title_icon{
		width: 40rpx;
		height: 40rpx;
	}
	.record_list{}
	.record_li{
		border-top: 1rpx solid #929292;
		/*height: 140rpx;*/
		box-sizing: border-box;
		padding: 35rpx 25rpx 40rpx;
	}
	.record_li_tips{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(0,0,0,1);
		line-height:36rpx;
		margin-right: 96rpx;
	}
	.record_li_img{
		width: 60rpx;
		height: 60rpx;
	}



	.consult_btn{
		height:98rpx;
		background:linear-gradient(90deg,rgba(255,107,134,1) 0%,rgba(255,127,176,1) 100%);


		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}


</style>
