<template>
	<view>

		<div class="wiki_list ov_hid">
			<div class="wiki_li flex"
				v-for="(item,index) in getlists" :key='index' 
				@click='details(item.id)' 
				>
				<div class="wiki_li_info">
					<div class="wiki_li_title">{{item.title}}</div>
					<div class="wiki_li_tip txt_over_ell_2">{{item.detailsChinese}}</div>
					<div class="wiki_li_time">{{item.createTime}}</div>
				</div>
				<img :src="item.cover" alt="" class="wiki_li_img no_shrink">

			</div>
		</div>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pages:1,
				getlists:[],
				pageSize:0
			}
		},
		onLoad(){
			this.getList(1);
		},
		onReachBottom(){
			this.pages+=1;
			if(this.pageSize>=this.pages){
				this.getList(this.pages);
			}
		},
		methods: {
			getList(pages){
				let that =this;
				that.pages=pages;
				uni.wjw_http({
					url:'/app/cdmaternalchildencyclopedia/list',
					type:'get',
					data:{
						page:that.pages,
						limit:6
					}
				}).then(res=>{
					if(res.code ==0 ){
						 that.pageSize=res.data.totalPage;
						 let aa=res.data.list;
						 for(let i in aa){
						 	 let a = new Date(aa[i].createTime);
						 	  aa[i].createTime= a.getFullYear()+"-"+(a.getMonth()+1).toString().padStart(2,'0')+"-"+a.getDate().toString().padStart(2,'0')
						 }
						 let b =that.getlists;
						 this.getlists=b.concat(aa);
						
					}
				})
			},
			details(ids){
				uni.navigateTo({
					url:'./info/info?id='+ids
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
	.wiki_list_title_icon{
		width: 34rpx;
		height: 36rpx;
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

	.wiki_li{
		margin-top: 0rpx;
		background: white;
		padding: 40rpx;
		border-bottom: 1rpx solid rgba(136,136,136,1);
	}



</style>
