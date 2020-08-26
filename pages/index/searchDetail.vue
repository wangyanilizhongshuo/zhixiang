<template>
	<view class="uni-searchDetail">
	<view class="uni-fixed">
		<input v-model="value" class="uni-input" @tap.stop="search" >
		<view class="uni-title">
			<view class="title-list" :class='{"actives":types==0}' @tap.stop="types=0">综合</view>
			<view class="title-list" :class='{"actives":types==1}' @tap.stop="types=1">按新品</view>
			<view class="title-list" :class='{"actives":types==2}' @tap.stop="jumpOne" >按销量</view>
			<view class="title-list" :class='{"actives":types==3}' @tap.stop="jumptwo">按价格</view>
			<view class="trancdown trangle"    @tap.stop="jumpsi"></view>
			<view class="trancup trangle"  @tap.stop="jumpthree"></view>
			
		</view> 
	</view>
	<view style="height: 170rpx;"></view>
	<view class="uni-content" v-if="types ==0||types==1">
		 <view class="uni-list" v-for="(item,index) in list" :key="index"  @tap.stop='cateDetail(item.id)'>
			 <image class="imgs" :src="item.pic"></image>
			 <view class="uni-bottom">
				 <view class="first">{{item.title}}</view>
				 <view class="second">已售{{item.sale_num}}件</view>
				 <view class="third">￥{{item.price/100}}.00</view>			 
			 </view>
		 </view>
	</view>
	<view class="uni-content" v-if="types==2">
		 <view class="uni-list" v-for="(item,index) in lists" :key="index" @tap.stop='cateDetail(item.id)'>
			 <image class="imgs" :src="item.pic"></image>
			 <view class="uni-bottom">
				 <view class="first">{{item.title}}</view>
				 <view class="second">已售{{item.sale_num}}件</view>
				 <view class="third">￥{{item.price/100}}.00</view>			 
			 </view>
		 </view>
	</view>
	<view class="uni-content" v-if="types==3">
		 <view class="uni-list" v-for="(item,index) in lists" :key="index" @tap.stop='cateDetail(item.id)'>
			 <image class="imgs" :src="item.pic"></image>
			 <view class="uni-bottom">
				 <view class="first">{{item.title}}</view>
				 <view class="second">已售{{item.sale_num}}件</view>
				 <view class="third">￥{{item.price/100}}.00</view>			 
			 </view>
		 </view>
	</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				value:'',
				types:0,
				pages:1,
				pagess:1,
				list:[],
				lists:[],
				pageNum:0,
				pageNums:0,
				orderNum:0
			}
		},
		onLoad(options){
			this.setData(options);
			this.getList();
		},
		onReachBottom(){
			if(this.pageNums >this.pages){
				this.pages+=1;
				this.getList()
			}
			if(this.pageNum >this.pages){
				this.pages+=1;
				this.getxiliang();
			}
			
		},
		methods:{
			search(){
				uni.navigateBack()	
			},
			
			// 按照销量
			jumpOne(){
				this.lists=[];
				this.types=2;
				this.orderNum=1;
				this.getxiliang()
			},
			// 按照销量
			jumptwo(){
				this.lists=[];
				this.types=3;
				this.orderNum=2;
				this.getxiliang()
			},
			jumpsi(){
				this.lists=[];
				this.types=3;
				this.orderNum=2;
				this.getxiliang()
				
			},
		    // 从下向上
			jumpthree(){
				this.lists=[];
				this.types=3;
				this.orderNum=3;
				this.getxiliang()
			
			},
			getList(){
				let id=uni.getStorageSync('user').id
				uni.wjw_http({
					url:'saleevent/listByPage',
					data:{
						userId :id,
						page:this.pages,
						searchKey:this.value
					}
				}).then(res=>{
					this.pageNum=res.result.pageSize;
					let aa = res.result.list;
					let bb = this.list;
					this.list = bb.concat(aa)
				}).catch(res=>{
					
				})
			},
			getxiliang(){
				let id=uni.getStorageSync('user').id
				uni.wjw_http({
					url:'saleevent/listByPage',
					data:{
						userId :id,
						page:this.pagess,
						orderType:this.orderNum,
						searchKey:this.value
					}
				}).then(res=>{
					this.pageNums=res.result.pageSize;
					let aa = res.result.list;
					let bb = this.lists;
					this.lists = bb.concat(aa)
				}).catch(res=>{
					
				})
			},
			cateDetail(ids) {
				uni.navigateTo({
					url: '/pages/goods/goods?id=' + ids
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	// 三角形
	.trangle{
		width: 0rpx;
		height:0rpx;
		border:10rpx solid ;
		position: absolute;
		right:17rpx;
	}
	.trancup{
	    border-color: transparent transparent #424242;
		top:100rpx;
		z-index:100;
		
	}
	.trancdown{
	    border-color: #424242 transparent transparent;
		top:130rpx;
		z-index:100;
	}
	.uni-searchDetail{
		font-size: 26rpx;
		width: 750rpx;
		.uni-fixed{
			position: fixed;
			z-index: 10;
			background-color: white;
		}
		.uni-input{
			width: 700rpx;
			height:60rpx;
			background-color: #f1f1f1;
			border-radius: 15rpx;
			padding-left:30rpx;
			box-sizing: border-box;
			margin:10rpx 25rpx ;
		}
		.uni-title{
			width: 750rpx;
			height:90rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		    text-align: center;
			border-top:1rpx solid #dedede;
			box-sizing: border-box;
			.title-list{
				width: 187.5rpx;
				height:90rpx;
				line-height: 90rpx;
				border-bottom: 4rpx solid transparent;
			}
		}
	}
	.actives {
		z-index: 1;
		color: #FF7599 !important;
		border-color: #FF7599 !important;
	}
	.uni-content{
		background-color: #f1f1f1;
		padding-top: 20rpx;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		.uni-list{
			background-color: #fff;
			border-radius: 10rpx;
			padding:10rpx;
			box-sizing: border-box;
			margin:0 15rpx 15rpx 0;
			.imgs{
				 width:340rpx;
				 height:340rpx;
			 }
			 .uni-bottom{
				 width: 340rpx;
				 padding:15rpx;
				 box-sizing: border-box;
				 .second{
					 // width:340rpx;
					 font-size: 22rpx;
					 text-align: right;
					 color: #929292;
				 }
				 .third{
					 color:#f34451;
					 font-size: 24rpx;
				 }
			 }
		}
		
	}
	
</style>
