<template>
	<view>


		<view class="opts flex  all_ma ">
			<view class="opt  flex_c flex_shrink flex_grow "
		 		@click='jump' data-url='/pages/category/mybk/wiki/wiki' 
				>
				<img src="http://zxyp.hzbixin.cn/files/15481600396817971.jpg" alt="" class="opt_img no_shrink">
			</view>

			<view class="opt  flex_c flex_shrink flex_grow "
		 		@click='jump' data-url='/pages/category/mybk/prof/consult/consult' 
			>
				<img src="http://zxyp.hzbixin.cn/files/50471600396878436.jpg" alt="" class="opt_img no_shrink">
			</view>
		</view>

		<view class="prof_list_wrap all_list_wrap all_ma ">
			<view class="prof_list_head all_list_head flex flex_align_c">
				<view class="prof_list_title all_list_title flex_grow flex flex_align_c ">
					<span class="prof_list_title_txt all_list_title_txt">推荐专家</span>
					<img src="http://zxyp.hzbixin.cn/files/73911600409325966.jpg" alt="" class="prof_list_title_icon all_list_title_icon no_shrink">
				</view>
				<view class="prof_list_more no_shrink all_list_more "
		 			@tap='jump' data-url='/pages/category/mybk/prof/prof' 
				>查看更多>></view>
			</view>

			<view class="prof_list ov_hid">
				<view class="prof_li flex"
					v-for="(item,index) in expertList" :key='index' 
		 			@click='detailExpert(item.id)' 
					>
					
					<img :src="item.cover" alt="" class="prof_li_img no_shrink">
					<view class="prof_li_info">
						<view class="prof_li_name">{{item.name}}</view>
						<view class="prof_li_tag">{{itme.title}}</view>
						<view class="prof_li_tip txt_over_ell_2">{{item.desc}}</view>
						<view class="prof_li_b flex flex_c ">
							<view class="prof_li_price ta_r flex_grow ">咨询价格:  ¥{{item.price}}</view>
							<view class="prof_li_btn no_shrink flex_c"
								@click.native.stop='AskQuesExpert(item.id)' 
							>问专家</view>
						</view>
					</view>
				</view>
			</view>
		</view>




		<view class="wiki_list_wrap all_list_wrap all_ma ">
			<view class="wiki_list_head all_list_head flex flex_align_c">
				<view class="wiki_list_title all_list_title flex_grow flex flex_align_c ">
					<span class="wiki_list_title_txt all_list_title_txt">推荐百科</span>
					<img src="http://zxyp.hzbixin.cn/files/68561600409404894.jpg" alt="" class="wiki_list_title_icon all_list_title_icon no_shrink">
				</view>
				<view class="wiki_list_more no_shrink all_list_more"
		 			@click='bkList()' data-url='/pages/category/mybk/wiki/wiki' 
				>查看更多>></view>
			</view>

			<view class="wiki_list ov_hid">
				<view class="wiki_li flex"
					v-for="(item,index) in bkRecomList" :key='index' 
					@click='bkDetail(item.id)' 
					>
					
					<view class="wiki_li_info">
						<view class="wiki_li_title">{{item.title}}</view>
						<view class="wiki_li_tip txt_over_ell_2">{{item.detailsChinese}}</view>
						<view class="wiki_li_time">{{item.createTime}}</view>
					</view>
					<img src="http://zxyp.hzbixin.cn/files/10371600409442368.jpg" alt="" class="wiki_li_img no_shrink">

				</view>
			</view>
		</view>

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 专家列表
				expertList:[],
				bkRecomList:[]
			}
		},
		onLoad(){
			this.getExpert()
			this.getbkRecommond();
		},
		 onShareAppMessage: function () {
            let _this = this;
            return {
              title: "智享婴品",
              path: "/pages/index/index?" + _this.getShareUrlParams(),
            };
        },
		methods: {
			// 获取专家 列表
			getExpert(){
				uni.wjw_http({
					url: "app/cdmaternalchildexpert/list",
				    method: 'get',
					data:{
						page:1,
						limit:4
					}
				}).then(res => {	
					if(res.code ==0){
						 this.expertList=res.data.list;
					}
				}).catch(res=>{
					
				})
			},
			// 去专家的详情页 这边去详情页之前 需要付钱
			detailExpert(id){
				// uni.showModal({
				//     title: '提示',
				//     content: "前往付款",
				//     success: function (res) {
				//         if (res.confirm) {
				// 			console.log('确认地方')
				//            uni.navigateTo({
				// 			   url:'/pages/pay/pay?price='+price
				//            	// url:'pages/pay/pay?price='+price
				//            })
				//         } else if (res.cancel) { 
				//         }
				//     }
				// });
				let ids=id
				uni.navigateTo({
					url:'/pages/category/mybk/prof/info/info?id='+ids 
				})
			},
		// 提出问题
			AskQuesExpert(useId){
				let user=useId;
				uni.navigateTo({
					url:'/pages/category/mybk/prof/consult/submit/submit?userId='+user
				})
			},
			getbkRecommond(){
				let that =this;
				uni.wjw_http({
					url:'app/cdmaternalchildencyclopedia/list',
					type:'get',
					data:{
						page:1,
						limit:4
					}
				}).then(res=>{
					if(res.code==0){
						that.bkRecomList=res.data.list;
						for(let i in that.bkRecomList){
							 let a = new Date(that.bkRecomList[i].createTime);
							 that.bkRecomList[i].createTime= a.getFullYear()+"-"+(a.getMonth()+1).toString().padStart(2,'0')+"-"+a.getDate().toString().padStart(2,'0')
						}
						
					}
				})
			},
			//百科 详情
			bkDetail(ids){
				uni.navigateTo({
				url:'./wiki/info/info?id='+ids
			})
			},
			//百科列表
			bkList(){
				uni.navigateTo({
					url:'./wiki/wiki'
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



</style>
