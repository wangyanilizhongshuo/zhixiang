<template>
	<view>
		<view class="delet" @click="editBtn()"><text class="text">编辑</text></view>
		<view class="content">
			<view class="list-block block">
				<ul class="car-list" v-for="(item,index) in carList" key="index">
					<li class="swipeout" data-id="6128" eventid="50472" subeventid="145891" data-url='/pages/goods/goods'>
						<view class="swipeout-content order-content br-bt " data-id="1">
							<img class="cart-img" data-index="1" @click.native.stop="choice(index)" v-if="item.flagChoice" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/cart_selected.png"
							 alt="" date="0">
							<img class="cart-img" data-index="1" @click.native.stop="choice(index)" v-if="!item.flagChoice" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/cart_unselected.png"
							 alt="" date="0">
							<img class="order-img" data-index="1" :src="item.pic" alt="">
							<view class="cart-right pull-right">
								<p class="cart-title uni-titles">{{item.title}}</p>
								<p class="cart-style" attr_name="锌营养包">{{item.attr_name}}</p>
								<p class="cart-price pull-left">￥<span class="cart-num">{{item.price}}</span><span>积分<span class="cart-num2">{{item.points}}</span></span></p>
								<view class="num-choose-wrap pull-right clearfix">
									<button class="num-reduce left button pull-left" type="default" @tap.stop="subtraction(index)" data-id="6128">-</button>
									<label class="num-at pull-left uni-label" type="button" id="num">{{item.buy_num}}</label>
									<button class="num-add right button pull-left" type="default" data-id="6128" @tap.stop="addition(index)">+</button>
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
				<img class="check-all" v-if="allChoiceFlag" @click="allChoice()" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/cart_unselected.png"
				 alt="" date="0"><span class="selectAll">全选</span>
				<img class="check-all" v-if="!allChoiceFlag" @click="allChoice()" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/cart_selected.png"
				 alt="" date="0"><span class="selectAll">全选</span>
				<p class="cart-total-txt" v-if="deleFlag">合计:<span class="total-num">￥<span class="total-val">{{sumMoney}}</span></span></p>
				<p class="points-total-txt" v-if="deleFlag">积分:<span class="total-num total-num2"><span class="total-val total-val2">{{integral}}</span></span></p>
				<span class="postage" v-if="deleFlag">（不含运费）</span>
				<text class="cart-account" v-if="deleFlag" @click="settleMent()">结算</text>
				<text class="cart-account" v-if="!deleFlag" @click="delement()">删除</text>
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
				id: ''
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
						that.carList = res.result;
						that.carList.map(res => {
							res.flagChoice = false;
							res.price = (res.price / 100).toFixed(2);
						})
					}
				}).catch(res=>{
					console.log(res.msg)
				})
				this.$forceUpdate();
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
				this.calculMoney();
				this.sendNum(this.carList[index].buy_num, index)
			},
			//对每个商品 的按钮的加
			addition(indexs) {
				let index = indexs;
				if (this.carList[index].buy_num < this.carList[index].sub_event_id) {
					this.carList[index].buy_num += 1;
				}
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
			// border-radius: 0;
			// outline: none;
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
</style>
