<template>
	<view>
		<view class="delet" @click="editBtn()"><text class="text">编辑</text></view>
		<view class="content">
			<view class="list-block block">
				<ul class="car-list" v-for="(item,index) in carList" key="index">
					<li class="swipeout" data-id="6128" eventid="50472" subeventid="145891" data-url='/pages/goods/goods'>
						<view class="swipeout-content order-content br-bt " data-id="1">
							<img class="cart-img" data-index="1" @tap.stop="choice(index)" v-if="item.flagChoice" src="http://zxyp.hzbixin.cn/files/11511600414285168.jpg"
							 alt="" date="0">
							<img class="cart-img" data-index="1" @tap.stop="choice(index)" v-if="!item.flagChoice" src="http://zxyp.hzbixin.cn/files/62141600414451868.jpg"
							 alt="" date="0">
							<img class="order-img  orderImg" data-index="1" :src="item.pic" alt="">
							<view class="cart-right pull-right">
								<p class="cart-title uni-titles">{{item.title}}</p>
								<p class="cart-style" attr_name="锌营养包">{{item.attr_name}}</p>
								<view class="third-style">
									<view class="cart-price pull-left" style="font-size: 26rpx;">
										<span style="margin-right: 10rpx;">￥{{item.price}}</span>
										<span >积分{{item.points}}</span>
									</view>
									<view class="carBtns">
										<view class="carBtn-left carBtn-style" @tap.stop="subtraction(index)">-</view>
										<view class="carBtn-center">{{item.buy_num}}</view>
										<view class="carBtn-right carBtn-style"@tap.stop="addition(index)" >+</view>
									</view>
									
								</view>
								
							</view>
						</view>
						<!-- Swipeout actions right -->
						<view class="swipeout-actions-right">
							<!-- Swipeout actions links/buttons -->
							<a class="swipeout-delete" href="#" data-id="6128">删除</a>
						</view>
					</li>
				</ul>
			</view>
			<view style="height: 50px"></view>
			<!--<p class="post-free">还差<span class="lack-num">9</span>元就能包邮<a class="external" href="index.html">[去凑单]</a></p>-->
			<view class="settle-accounts-wrap">
				<img class="check-all" style="width:30rpx;" v-if="allChoiceFlag" @tap="allChoice" src="http://zxyp.hzbixin.cn/files/62141600414451868.jpg"
				 alt="" date="0"><span class="selectAll">全选</span>
				<img class="check-all" style="width:30rpx;" v-if="!allChoiceFlag" @tap="allChoice"  src="http://zxyp.hzbixin.cn/files/11511600414285168.jpg" 
				 alt="" date="0"><span class="selectAll">全选</span>
				<p class="cart-total-txt" v-if="deleFlag" >合计: <span class="total-num" style="position:relative;top:-5rpx;font-size: 36rpx;">  ￥<span class="total-val" >{{sumMoney}}</span></span></p>
				<p class="points-total-txt" v-if="deleFlag" style="left:11.5rem">积分: <span class="total-num total-num2"><span class="total-val total-val2"  style="position:relative;top:-5rpx;font-size: 36rpx;margin-left:10rpx">  {{integral}}</span></span></p>
				<span class="postage" v-if="deleFlag">（不含运费）</span>
				<text class="cart-account" v-if="deleFlag" @tap="settleMent()">去结算</text>
				<text class="cart-account" v-if="!deleFlag" @tap="delement()">删除</text>
			</view>
		</view>
	</view>
</template>

<script>
	import light7_min from "@/component/css/light7_min";
	import light7_swipeout from "@/component/css/light7_swipeout";
	import light7_swiper_min from "@/component/css/light7_swiper_min";
	import main from "@/component/css/main";
	import jzl from "@/component/css/jzl";
	import shopCar from "@/component/css/page/shopCar";


	export default {
		components: {
			shopCar,
			jzl,
			main,
			light7_swiper_min,
			light7_swipeout,
			light7_min,

		},
		data() {
			return {
				carList: [],
				chioceFlag: [],
				// 全选按钮的时候为全选的false
				allChoiceFlag: true,
				//付款是总积分 和总共需要的钱
				integral: 0,
				sumMoney: 0,
				// 最上方的删除
				deleFlag: true,
				// 更新购物车数据userid  id 
				userId: '',
				id: '',
				chooseMove:false
				
			}
		},
		onLoad() {
			this.getCarList();
		},
		onShow() {
			this.integral = 0;
			this.sumMoney = 0;
		    this.getCarList();
		},
        onShareAppMessage: function () {
            let _this = this;
            return {
              title: "智享婴品",
              path: "/pages/index/index?" + _this.getShareUrlParams()
            };
        },
		methods: {
			//购物车的列表
			getCarList() {
				let that = this;
				 let userId = uni.getStorageSync('user').id;
				
				uni.wjw_http({
					url: 'shoppingcart/list',
					data: {
						 userId: userId,
					}
				}).then(res => {
					if (res.status == 0) {
						let aa = res.result;
						if(that.chooseMove==true){	
							that.carList.map((currentValue, index,arr)=>{
								aa[index].flagChoice=currentValue.flagChoice;
								aa[index].price=(aa[index].price/100).toFixed(2)
							})
						}else{
							aa.map(res => {
								 res.flagChoice = false;
								 res.price = (res.price / 100).toFixed(2);
							})
						}
						 that.carList=aa;
					}
				}).catch(res=>{
					console.log(res.msg)
				})
			},
			//计算总共多少钱以及总积分
			calculMoney() {
				this.sumMoney = 0;
				this.integral = 0;
				this.carList.map(res => {
					if (res.flagChoice == true) {
						let smallMoney = res.buy_num * res.price;
						let smallintegral = res.buy_num * res.points;
						this.sumMoney = this.sumMoney + smallMoney;
						this.integral = this.integral + smallintegral;
					}
				})
				this.$forceUpdate()
			},
			//加减商品 将数据传到后台
			sendNum(num, index) {
				let token = wx.getStorageSync('userData').token;
				let userId = uni.getStorageSync('user').id;
				let that = this;
				let a = that.carList[index]
				
				uni.wjw_http({
					url: 'shoppingcart/update',
					data: {
						buy_num: num,
						userId: userId,
						id: a.id,
						token: token
					}
				}).then(res => {
					this.getCarList();

				})
			},
			//对每一个商品的选择 以及对应的 choice  的选项
			choice(index) {
				let that = this;
				that.carList[index].flagChoice = (that.carList[index].flagChoice == true ? that.$set(that.carList[index],
					'flagChoice', false) : that.$set(that.carList[index], 'flagChoice', true))
				// 当选择了所有的时候 让全选按钮亮起来
				let flags = that.carList.every(res => {
					return res.flagChoice == true;
				})
				if (flags == true) {
					that.allChoiceFlag = false;
				} else {
					that.allChoiceFlag = true;
				}
				// 计算总共的钱
				this.calculMoney()

			},
			//对每个商品 的按钮的减
			subtraction(indexs) {
				let index = indexs
				if (this.carList[index].buy_num == 0) {
					this.carList[index].buy_num = 0;
				} else {
					this.carList[index].buy_num -= 1;
				}
				// console.log(this.carList[index].buy_num)
				this.chooseMove=true;
				this.calculMoney();
				this.sendNum(this.carList[index].buy_num, index);
				
			},
			//对每个商品 的按钮的加
			addition(indexs) {
				let index = indexs;
				if (this.carList[index].buy_num < this.carList[index].sub_event_id) {
					this.carList[index].buy_num += 1;
				}
				this.chooseMove=true;
				 this.calculMoney();
				 this.sendNum(this.carList[index].buy_num, index);
			},
			//选泽全选按钮的时候
			allChoice() {
				// 全选按钮的变化
				this.allChoiceFlag = (this.allChoiceFlag == true ? false : true)
				// 单选按钮的全部改变
				if (this.allChoiceFlag == false) {
					this.carList.map(res => {
						res.flagChoice = true;
					})
				} else {
					this.carList.map(res => {
						res.flagChoice = false;
					})
				}
				this.calculMoney();
			},
			// 最上方编辑的时候 下方是删除
			editBtn() {
				this.deleFlag = (this.deleFlag == true ? false : true)
			},
			// 对购物车里面的内容进行删除
			delement() {
				let that = this;
				this.carList.map(res => {
					if (res.flagChoice == true) {
						uni.showModal({
							title: '提示',
							content: '确定删除？',
							success: function(data) {
								if (data.confirm) {
										uni.wjw_http({
											url: 'shoppingcart/delete/' + res.id,
											type: 'get'
										}).then(d => {
											if (d.status == 0) {
												that.getCarList();
											}
										})
								} else if (data.cancel) {
								}
						    }
						});

					}
				})
			},
			// 结账
			settleMent() {
				let arrs = []
				wx.removeStorageSync('cartBuy');
				wx.removeStorageSync('sumMoney');
				wx.removeStorageSync('sunJifen');
				// 这里判断那可能没有选择商品 ,不选择的情况下flags  =true
				let flags = this.carList.every(res => {
					return res.flagChoice == false;
				})
				if (flags == false) {
					this.carList.map((currentValue, index, arr) => {
						if (currentValue.flagChoice) {
							arrs.push(currentValue)
						}
					
					})
					wx.setStorageSync('cartBuy', arrs);
					wx.setStorageSync('sumMoney', this.sumMoney);
					wx.setStorageSync('sunJifen', this.integral);
					uni.navigateTo({
						url: '/pages/confirmorder'
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.uni-titles {
		height: 40rpx;
	}

	.content {
		position: relative !important;
	}

	.num-choose-wrap {
		.uni-label {
			border-top: 2rpx solid rgba(0, 0, 0, .2);
			border-bottom: 2rpx solid rgba(0, 0, 0, .2);
		}

		.button {
			box-shadow: none;
			border-top: 2rpx solid rgba(0, 0, 0, .2);
			border-bottom: 2rpx solid rgba(0, 0, 0, .2);
			// box-shadow: none
		}

		.left {
			border-left: 2rpx solid rgba(0, 0, 0, .2);
		}

		.right {
			border-right: 2rpx solid rgba(0, 0, 0, .2);
		}
	}
	.delet {
		width: 750rpx;
		height: 50rpx;
		font-size: 30rpx;
		text-align: right;
		background-color: #FF7599;
		color: #fff;

		.text {
			display: inline-block;
			padding-right: 50rpx;
			width: 100rpx;
			height: 50rpx;

		}
	}
	.orderImg{
		width:160rpx ;
		height: 160rpx;
	}
	.third-style{
		width: 450rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		color: #FE5E54;
		margin-top:15rpx;
		
	}
	.carBtns{
		width: 168rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
		border: 1rpx solid #C5C5C5;
		border-radius: 21px;
		box-sizing: border-box;
		.carBtn-style{
			flex: 0.5;
			height: 40rpx;
			line-height: 40rpx;
			text-align: center;
			color: #C5C5C5;
		}
		.carBtn-center{
			width: 60rpx;
			height: 40rpx;
			line-height: 40rpx;
			text-align: center;
			border-right: 1rpx solid #C5C5C5;
			border-left: 1rpx solid #C5C5C5;
			box-sizing: border-box;
		}
	}
	.cart-right{
		padding-top:22rpx;
	}
	.settle-accounts-wrap{
		height: 100rpx;
	}
	.cart-account{
		height: 100rpx;
		line-height: 100rpx;
		font-size: 32rpx;
	}
</style>
