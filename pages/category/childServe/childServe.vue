<template>
	<view class="uni-activity">
		<!--:class="fixedFlag == true?'classify_box':'classify_boxfix'"  -->
		<view class="uni-top" :class="{'classify_box':fixedFlag == true}">
			<view class="uni-sty" @tap.stop="jumps(1)" :class="{'active':types==1}">综合</view>
			<view class="uni-sty" @tap.stop="jumps(3)" :class="{'active':types==3}">按新品</view>
			<view class="uni-sty" @tap.stop="jumps(4)" :class="{'active':types==4}">按销量</view>
			<view class="uni-sty" @tap.stop="jumps(5)" :class="{'active':types==5}">按价格</view>
			<view class="tranTop" @tap.stop="biggs" :class="tranTopActive==true? 'triangleFlow1':'triangleFlow'"></view>
			<view class="tranDown" @tap.stop="smalls" :class="tranDownActive==true? 'triangleDown1':'triangleDown'"></view>
		</view>
		<view class="uni-content" v-if="types==1">
			<view class="uni-list" v-for="(item,index) in allList" :key="index">
				<image class="uni-img" :src="item.pic"></image>
				<view class="down">
					<view class="uni-title">{{item.title}}</view>
					<view class="uni-bot">
						<view class="uni-left">￥{{(item.price)/100}}.00</view>
						<view class="uni-right">已售{{item.sale_num}}件</view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-content" v-if="types==3">
			<view class="uni-list" v-for="(item,index) in allList" :key="index">
				<image class="uni-img" :src="item.pic"></image>
				<view class="down">
					<view class="uni-title">{{item.title}}</view>
					<view class="uni-bot">
						<view class="uni-left">￥{{(item.price)/100}}.00</view>
						<view class="uni-right">已售{{item.sale_num}}件</view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-content" v-if="types==4">
			<view class="uni-list" v-for="(item,index) in allList" :key="index">
				<image class="uni-img" :src="item.pic"></image>
				<view class="down">
					<view class="uni-title">{{item.title}}</view>
					<view class="uni-bot">
						<view class="uni-left">￥{{(item.price)/100}}.00</view>
						<view class="uni-right">已售{{item.sale_num}}件</view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-content" v-if="types==5">
			<view class="uni-list" v-for="(item,index) in allList" :key="index">
				<image class="uni-img" :src="item.pic"></image>
				<view class="down">
					<view class="uni-title">{{item.title}}</view>
					<view class="uni-bot">
						<view class="uni-left">￥{{(item.price)/100}}.00</view>
						<view class="uni-right">已售{{item.sale_num}}件</view>
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
				types: 1,
				// 页面数
				pages: 1,
				pagess: 1,
				allList: [],
				fixedFlag: false,
				tranTopActive: false,
				tranDownActive: false
			}
		},
		onLoad() {
			this.getAllList();
		},
		onReachBottom() {
			if (this.pagess > this.pages) {
				this.pages += 1;
				this.getAllList();
			}
		},
		onPageScroll(res) {
			if (res.scrollTop > 0) {
				this.fixedFlag = true
			} else {
				this.fixedFlag = false
			}
		},
		methods: {
			biggs() {
				this.allList = []
				this.types = 5;
				this.tranTopActive = true;
				this.tranDownActive = false;
				this.getAllList()
			},
			smalls() {
				this.allList = [];
				this.types = 5;
				this.tranDownActive = true;
				this.tranTopActive = false;
				this.getAllList()
			},
			jumps(one) {
				this.allList = []
				if (one == 1) {
					this.types = 1;
					this.getAllList()
				} else if (one == 3) {
					this.types = 3;
					this.getAllList()

				} else if (one == 4) {
					this.types = 4;
					this.getAllList()

				} else if (one == 5) {

					this.types = 5;
					this.getAllList(this.types)
				}
			},
			//得到所有的列表
			getAllList() {
				let id = wx.getStorageSync('user').id;
				let that = this;
				let datas = {};

				if (that.types == 1 || that.types == 3) {
					datas = {
						userId: id,
						ower_type: 2,
						page: this.pages,
						pageSize: 6
					}
				} else if (that.types == 4) {
					datas = {
						userId: id,
						ower_type: 2,
						page: this.pages,
						orderType: 1,
						pageSize: 6
					}
				}
				// orderType  2 从高到底 
				// orderType  3 从底到高
				else if (that.types == 5) {
					if (this.tranTopActive == true || this.tranDownActive == false) {
						datas = {
							userId: id,
							ower_type: 2,
							page: this.pages,
							orderType: 2,
							pageSize: 6
						}
					} else if (this.tranDownActive == true || this.tranTopActive == false) {
						datas = {
							userId: id,
							ower_type: 3,
							page: this.pages,
							orderType: 2,
							pageSize: 6
						}
					}
				}
				uni.wjw_http({
					url: 'saleevent/listByPage',
					type: 'post',
					data: datas
				}).then(res => {
					if (res.status == 0) {
						that.pagess = res.result.pages;
						let aa = res.result.list;
						let bb = that.allList;
						that.allList = bb.concat(aa)
					}
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.active {
		color: #FF7599;
	}

	.classify_box {
		position: fixed;
		top: 0rpx;
		z-index: 2;
		background-color: #fff;
	}

	// 三角形
	.tranTop {
		position: absolute;
		right: 25rpx;
		top: 25rpx;
		width: 0;
		border-left: 10rpx solid white;
		border-right: 10rpx solid white;
	}

	.triangleFlow {
		border-top: 10rpx solid #ccc;
	}

	.triangleFlow1 {
		border-top: 10rpx solid #FF7599;
	}

	.tranDown {
		position: absolute;
		right: 25rpx;
		top: 30rpx;
		width: 0;
		border-width: 10rpx;
		border-style: solid;
	}

	.triangleDown {
		border-color: transparent transparent #ccc transparent;
	}

	.triangleDown1 {
		border-color: transparent transparent #FF7599 transparent;
	}

	.uni-activity {
		position: relative;
		top: 0rpx;
		left: 0rpx;

		.uni-top {
			width: 750rpx;
			height: 64rpx;
			color: #5f646e;
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid #d0d0d0;

			.uni-sty {
				width: 187rpx;
				text-align: center;
			}
		}

		.uni-content {
			width: 750rpx;
			height: auto;
			background-color: #eee;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;

			.uni-list {
				width: 350rpx;
				margin: 10rpx;
				background-color: #fff;
				border-radius: 5rpx;

				.uni-img {
					width: 350rpx;
					height: 350rpx;
				}

				.down {
					width: 350rpx;
					height: 130rpx;
					background-color: #fff;
					margin-top: 8rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.uni-title {
						font-size: 13px;
						color: #414141;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						margin: 0 8rpx;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.uni-bot {
						margin-bottom: 8rpx;
						display: flex;
						justify-content: space-between;

						.uni-left {
							font-size: 28rpx;
							color: #ff0101;
							margin-left: 10rpx;
						}

						.uni-right {
							color: #bfbfbf;
							font-size: 22rpx;
							margin-right: 10rpx;

						}
					}
				}
			}

		}
	}
</style>
