<template>
  
        <!-- 你的html代码 -->
     <view class="page" >
           <view class="uni-container" v-for="(item,index) in refundindList" :key="index"  >
           	<view class="uni-title">
           		<view class="uni-left">
           			<image class="logo" src="../static/shoppingLogo.png"></image>
           			<text class="sdName">{{item.shop_name}}</text>
           		</view>
           		<view class="uni-right" v-if="item.status==1">	
           		审核中
           		</view>
				<view class="uni-right" v-if="item.status==2">
				退款成功
				</view>
           	</view>
           	<view class="uni-content" >
           		<image class="uni-con-left img" :src="item.pic"></image>
           		<view class="uni-con-right">
           			<view class="uni-first">{{item.event_name}}</view>
           			<view class="uni-second specificate">
           				 <text class="style" >规格 {{item.attr_name}}</text>
						<text class="right">x{{item.count}}</text>
           			</view>
           			<view class="uni-third" >								
           				退款金额:  ￥{{item.total_price/100}}
           			</view>
           		</view>
           	</view>
         
           </view>
        
    </view>
</template>

<script>
    export default {
        data() {
            return {
				refundindList:[]
                
            }
        },
		onLoad(){
			this.getList()
		},
        methods: {
			getList(){
				let id =wx.getStorageSync('user').id;
				uni.wjw_http({
					url:'suborder/listByPage',
					data:{
						userId:id,
						page:1,
						status:1
					}
				}).then(res=>{
					this.refundindList=res.result.list
					console.log(this.refundindList)
				})
			}
            
        }
    }
</script>
<style scoped lang="scss">

	.uni-container {
		.uni-title {
			width: 700rpx;
			height: 80rpx;
			padding: 0 25rpx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.uni-left {
				width: 280rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.logo {
					width: 30rpx;
					height: 30rpx;
					margin-right:20rpx;
				}
				.sdName {
					font-size: 30rpx;
				}
				.zhixiang {
					width: 20rpx;
					height: 20rpx;
				}
			}
			.uni-right {
				width:130rpx;
				height:40rpx;
				line-height:40rpx;
				color: #474747;
				font-size: 25rpx;
				border:1rpx solid #343434;
				border-radius: 10rpx;
				text-align: center;
			}
		}
		.uni-content {
			display: flex;
			width: 700rpx;
			height: 250rpx;
			padding: 0 25rpx;
			justify-content: space-between;
			align-items: center;
			background-color: #efeff4;
			border-bottom: 4rpx solid #fff;
			.uni-con-left {
				width: 180rpx;
				height: 180rpx;
				margin-right: 30rpx;
			}
			.uni-con-right {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;
				height: 160rpx;
				position: relative;
				.uni-first {
					font-size: 28rpx;
					color: #6d6d72;

				}
				.uni-second {
					font-size: 26rpx;
					color: #bfbfbf;
					display: flex;
					width:100%;
					justify-content: space-between;
				}

				.uni-third {
					width: 100%;
					text-align: right;
					color: #eed489;
					font-size: 28rpx;
					
				}

			}
		}

	
	}

</style>

