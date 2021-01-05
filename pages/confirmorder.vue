<template>
	<view>
		<view class="page-main">
			<view class="confirmorder-top " style='margin-top: 8px;' v-if='articleList.length==0'>
				<view class="addrder AddTheaddress" @click='jump' data-url='/pages/addressManage' data-types='choose'><span>你还没有添加收货地址
						点击这里添加<span></span></span></view>
			</view>
			<block v-if='articleList.length'>
				<view class="confirmorder-top " style='margin-top: 8px;' @click='jump' data-url='/pages/addressManage' data-types='choose'
				 v-for="(info,index) in articleList" :key='index' v-if="addressid =='没有这个参数'?index==0:(info.id == (addressnum||addressid))">
					<p class="confirmorder-top-per">收货人:&nbsp;{{info.addressee}}</p> <span class="confirmorder-top-tel">{{info.phone}}</span>
					<img src="http://zxyp.hzbixin.cn/files/311600415912418.jpg">
					<p class="confirmorder-top-add">{{info.province_name + info.city_name + info.area_name + info.address}}</p>
				</view>
			</block>
			<view class="address_bar">
				<img src="http://zxyp.hzbixin.cn/files/69311600415949059.jpg" alt="">
			</view>
			<view id="concon">
				<view class="confirmorder-middle" v-for="(goods,index) in carList" :key='index+"11"' v-if='carList.length>0'>
					<img :src="goods.pic" alt="">
					<p class="confirmorder-middle-num">{{ goods.title}}</p>
					<p class="confirmorder-middle-gg">规格：<span>{{goods.attr_name}}</span></p>
					<p class="confirmorder-middle-price"><span>¥{{goods.price}}</span><span style="
                    margin-left: 20rpx;">积分：{{goods.points}}</span></p>
					<span class="confirmorder-middle-amount">×<span>{{goods.buy_num}}</span></span>
				</view>
			</view>
			<view class="confirmorder-middle2" v-if='carList.length==0'><img :src="goods.saleEvent.pic" alt="">
				<p class="confirmorder-middle-num">{{goods.goods.name}}</p>
				<p class="confirmorder-middle-gg">规格：<span>{{name}}</span></p>
				<p class="confirmorder-middle-price"><span>¥{{price}}</span> <span>积分{{points}}</span></p> <span class="confirmorder-middle-amount">×<span>{{num}}</span></span>
			</view>
			<view class="confirmorder-send">
				<view class="expressChoice styleAll">
					<p class="left">配送方式</p>
					<p class="right">快递：<span id="express">￥{{express||'0.00'}}</span></p>
				</view>
				<view class="beizhu styleAll">
					<p class="left">备注</p>
					<input class="right" type="text" maxlength="30" id="memo" placeholder="请输入备注信息" v-model='memo'>
				</view>
				<view class="styleAll">
					<view class="left">共计商品
						<text id="numm" style="color:#ff4d49">&nbsp;&nbsp;{{type==0?num:sumNUMber}}&nbsp;&nbsp;</text>件
						
						 <!-- <text id="numm" style="color:#ff4d49">&nbsp;&nbsp;{{num}}大{{sumNUMber}}&nbsp;&nbsp;</text>件 -->
					</view>
					<view class="right" style="display: flex;">
						<p>合计:</p>
						<p id="zong" style="color:#ff4d49">¥{{ totalmPrice || ( type==0 ? num*price :carSumMoney) }} 积分{{total_points||( type==0?points*num:carSumji )}}</p>
						<!-- <p id="zong" style="color:#ff4d49">¥{{ totalmPrice || ( type==0 ? price*num :carList.reduce( function(prev, goods, idx, arr){return prev + (goods.price / 100) * goods.buy_num;
							   }, 0)) }} 积分{{total_points||( type==0?points*num:carList.reduce(function(prev, goods, idx, arr){return prev + (goods.points / 100) * goods.buy_num;},0) )}}</p
							> -->
					</view>
				</view>
			</view>
			<view class="confirmorder-hb">
				<view class="envelopes styleAll" @tap.stop='packets_show=true'>
					<p class="left">红包</p>
					<view id="use" class="tr right">
						<text style="color: #FF7599" v-if="useRedPacket">1个已使用</text>
						<text  style="color: #bfbfbf" v-if="!useRedPacket">未使用</text>
						<img  src="http://zxyp.hzbixin.cn/files/74201600415986744.jpg"></view>
				</view>
				<view class="styleAll">
					<view class="left">红包</view>
					<view class="tr right" id="tern">
						<text style="color: #bfbfbf" v-if="!useRedPacket">未使用</text>
						<text style="color: #FF7599;font-size:28rpx;inline-block ;width:120rpx;text-align: left;" v-if="useRedPacket">-{{useRedPacket}}</text>
					</view>
				</view>
				<view class="Selflifting styleAll">
					<view class="left">是否自提</view>
					<!-- <label for="isSelfTake"><input class="mui-switch" type="checkbox" id="isSelfTake" value="1" v-model='isSelfTake'></label> -->
					<view class="right" style="margin-right:30rpx" for="isSelfTake">
						<switch style="zoom:0.9" id="isSelfTake" :checked="isSelfTake" @change="selfRaise" data-name='isSelfTake' />
					</view>
				</view>
			</view>
		</view>
		<view class="confirmorder-botton styleAll">
			<view class="botton-mon">
				实付金额:
				<!-- <text id="zong2" price="" points="" style="color:#ff4d49">{{ totalmPrice ||
                    ( type==0? 
					  price*num :
					 carList.reduce(function(prev, goods, idx, arr){ return prev + (goods.price / 100) * goods.buy_num; },
                   0 )  )}}</text> -->
				<text id="zong2" price="" points="" style="color:#ff4d49">{{ totalmPrice ||
				    ( type==0? 
					  detailSumMoney :
					userRedSumMoney)}}</text>
			</view>
			<view class="botton-finish" @click='jifen_show=true'>结算</view>
			<input type="hidden" id="couponid" value="">
		</view>
		<!--遮罩-->
		<view class="mask-layer" style="display: block;" v-if='jifen_show' @click='jifen_show=false'></view>
		<view class="tips" style="display: block;" v-if='jifen_show'>
			<p class="tips-text1">提示</p>
			<p class="tips-text2">确认提交订单?</p>
			<view class="tips-button">
				<view class="tips-cancle" @click='jifen_show=false'>取消</view>
				<view class="tip-line"></view>
				<view class="tips-confirm" @click='payMoney' >确定</view>
			</view>
		</view>
		<view class="packets">
			<!--红包-->
			<view class="packets-top">
				<view class="packets-arrow">关闭</view>
				<view class="packets-title">我的红包</view>
				<view class="packets-save">
					<!--<a href="javascript:;">使用规则</a>-->
				</view>
			</view>
			<view class="app-cont">
				<view class="tab">
					<view class="tab-box"><a class="atian" status="0" href="javascript:;">未使用</a></view>
					<view class="tab-box"><a status="1" href="javascript:;">已使用</a></view>
				</view>
				<view class="tab-cont" style="height: 482px;">
					<view class="list-main-mian infinite" id="listwrap" style="height:100%; position: relative;  overflow:auto;  z-index: 1">
						<view class="scroll-box">
							<ul></ul>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom-fell">
				<view class="fell-box"><a id="donotuse" href="javascript:;">不使用红包</a></view>
				<view class="fell-box"><a id="sure" href="javascript:;" >确定使用</a></view>
			</view>
			<input type="hidden" id="status" value="0">
		</view>
		<view class="packets" style="display: block;" v-if='packets_show'>
			<!--红包-->
			<view class="packets-top">
				<view class="packets-arrow" @click='closeRed()'>关闭</view>
				<view class="packets-title">我的红包</view>
				<view class="packets-save">
					<!--<a href="javascript:;">使用规则</a>-->
				</view>
			</view>
			<view class="app-cont">
				<!-- <view class="tab">
					<view class="tab-box"><a class="atian" status="0" href="javascript:;">未使用</a></view>
					<view class="tab-box"><a status="1" href="javascript:;">已使用</a></view>
				</view> -->
				<view class="tab-cont" style="height: 482px;">
			 	<view class="list-main-mian infinite" id="listwrap" style="height:100%; position: relative;  overflow:auto;  z-index: 1">
						<view class="scroll-box">
							<ul>
								<li v-for="(item,index) in redList" :key='index+"12"' :data-id="item.id">
									<label for="s56988" class="" :class='item.redType==1?"bui-checkbox-label bui-checkbox-anim":"bui-radios-label bui-radios-anim"'>
										<view class="cont-txt">
											<view class="txt-box ">
												<p class="coupon-name " :class='item.status==1?"color2":""'>{{
                                                    item.redType==1
                                                        ?
                                                        '逢8必折专区红包'
                                                        :
                                                            item.redType==2
                                                            ?
                                                            '智享婴品新人红包'
                                                            :
                                                                item.redType==3
                                                                ?
                                                                '充值优惠券'
                                                                :
                                                                ''
                                                }}</p>
												<block class="block" v-if='item.redType==1'>
													<view class="position">
														<!-- <checkbox type="checkbox" name="checkbox" :limitmone="item.limitMoney" class="choose choice1" :value="item.id"
														 typeof="1" :id="'s'+item.id" /> -->
														 <radio type="radio" name="radio" :limitmone="item.limitMoney" class="choose choice1" :value="item.flags"
														  typeof="1" :id="'s'+item.id" />
														<!-- <i class="bui-checkbox"></i> -->
													</view>

													<p class="coupon-color">满{{item.limitMoney/100}}可用</p>
													<p class="coupon-color">每月8日、18日、28日可用</p>
												</block>
												<block class="block" v-if='item.redType==2'>
													<block class="block" v-if='item.status==0'>
														<view class="position" @click="choice(index)">
															<image v-if="!item.flags" style="width:40rpx;height:36rpx" src="http://zxyp.hzbixin.cn/files/79841600416030911.jpg"></image>
															<radio v-if="item.flags" style="zoom: 0.8;" type="radio" name="radio" :limitmone="item.limitMoney" class="choose choice" checked="item.flags"
															 typeof="2" :id="'s'+item.id" /><i class="bui-radios"></i></view>
													</block>
													<p class="coupon-color">满{{item.limitMoney/100}}可用</p>
													<p class="coupon-color"></p>
												</block>
												<block class="block" v-if='item.redType==3'>
													<block class="block" v-if='item.status==0'>
														<view class="position">
															<image  v-if="!item.flags" style="width:30rpx;height:36rpx" src="http://zxyp.hzbixin.cn/files/79841600416030911.jpg"></image>
															<radio v-if="item.flags" style="zoom: 0.8;" type="radio" name="radio" :limitmone="item.limitMoney" class="choose choice" 
															 typeof="3" :id="'s'+item.id" /><i class="bui-radios"></i></view>
													</block>
													<p class="coupon-color limitmoney">满{{item.limitMoney/100}}可用</p>
													<p class="coupon-color"></p>
												</block>
											</view>
											<view class="txt-box">
												<view class="price color1 " :money="wjw_wxs.toFixed(item.money/100,2)">
													<span>￥</span>
													<em class="price-one">{{wjw_wxs.split(wjw_wxs.toFixed(item.money/100,2),'.')[0]}}</em>
													<i class="price-two">.{{wjw_wxs.split(wjw_wxs.toFixed(item.money/100,2),'.')[1]}}</i>
												</view>
											</view>
										</view>
										<view class="cont-font">限手机号 {{item.phone}} 的用户使用</view>
									</label>
								</li>
							</ul>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom-fell">
				<view class="fell-box" @click="useless"><a id="donotuse"  >不使用红包</a></view>
				<view class="fell-box"  @click="useful"><a id="sure" >确定使用</a></view>
			</view>

			<input type="hidden" id="status" value="0">
		</view>
		<view class="hbyOccurFlag" v-if="signalFlag">请重新登录</view>
	</view>
</template>
<script module="wjw_wxs" lang="wxs" src="@/common/wjw_uni/wjw_com.wxs"></script>
<script>
	import main from "@/component/css/main";
	import styel from "@/component/css/styel";
	import reset1 from "@/component/css/reset1";
	import cj from "@/component/css/cj";
	import cj_1 from "@/component/css/cj_1";
	import red_packets from "@/component/css/red_packets";
	import confirmorder from "@/component/css/page/confirmorder";


	export default {

		components: {
			confirmorder,
			red_packets,
			cj_1,
			cj,
			reset1,
			styel,
			main,
		},

		data() {
			return {
				signalFlag:false,
				signalMsg:'',
				packets_show: false,
				jifen_show: false,
				type: 0, // 0-商品详情页的商品 1-购物车的商品
				id: '', // 商品详情页商品的id  
				id2: '', // 规格id
				// 使用红包得金额
				detailSumMoney:0,
				num: '',
				price: '',
				name: '',
				points: '',
				buy_num: '', // 购买数量，get参数
				redId: '', // 红包id
				repIds:'',//商品规格
				memo: '', // 备注
				isSelfTake: false, //是否自提
				express: '', // 快递费  
				totalmPrice: 0, // 总价  
				total_points: '', // 总积分  
				goods: {},
				carList: [],
				cartid: 0, //购物车的id  
				indexcartid: '',
				articleList: [],
				addressnum: '',
				addressid: '',
				redList: [],
				// 购物车 l里面的总金额
				buyGoods: [],
				carSumMoney: 0,
				// 购物车 使用红包得钱
				userRedSumMoney:0,
				carSumji: 0,
				// c从购物车过来的数量
				sumNUMber: 0,
				useRedPacket:'',
				idss:[],
				// 使用某个红包得ID
				// 备注
				// 订单号:
				orderNumber:0,
				specialMakeMoney:''
				 
			}
		},

		onLoad(options) {
			 this.setData(options);
			 console.log(options);
			 if(wx.getStorageSync('cartBuy')){
				  this.carList = wx.getStorageSync('cartBuy');
				  this.carList.map(res=>{
					this.idss.push(res.id) ; 
				  })
			     this.cartid= this.idss.join(',');
			 }
			
			this.goodsDetail();
			this.CarList();
			this.get_redList();
			  // 从详情页面过来的总金额
			this.detailSumMoney=this.num*this.price;
			// 打开需要
			 this.addlist();
		},
		// 页面显示
		onShow() {
			console.log('onShow 页面显示');
			// 获取地址列表
			//获得红包列表
			// this.CarList();
			this.addlist();
			this.$forceUpdate();
		},
		methods: {
			//商品详情页的商品
			goodsDetail(ids) {
				uni.wjw_http({
					url: "saleevent/info/" + (ids || this.id),
					method: 'post',
					data: {
						id: ids || this.id,
					},
				}).then(res => {
					// console.log('商品详情页的商品 接口 请求成功', res);
					var goods = res.result || {};
					this.goods = goods;
					
				})
			},
			// 是否自提的按钮
			selfRaise(e){
				this.isSelfTake=e.target.value
			},
			//购物车的商品
			CarList() {
				this.carSumMoney = wx.getStorageSync('sumMoney');
				this.carSumji = wx.getStorageSync('sunJifen');
				this.carList = wx.getStorageSync('cartBuy');
				this.userRedSumMoney=this.carSumMoney;
				if(this.carList){
					this.carList.map(res => {
					let a =Number(res.buy_num) 
					this.sumNUMber = this.sumNUMber + a;
					})
					if (this.carSumMoney >0) {
						this.type = 1;
					}
				}
				this.$forceUpdate()
			},
			// 获取地址列表_回调
			addlist_back(res) {
				console.log('获取地址列表_回调', res);
				// if(this.articleList.length>0){
				// 	this.addressid = this.articleList[0].id
				// }else{
				// 	this.addressid = this.addressid;
				// }
				 this.addressid || (this.addressid = this.articleList[0].id);
			
				if (this.type == "0") {
					var repIds = this.id2;
					//商品详情过来的 获取运费等信息
					
					this.createExpress(this.addressid, this.num, repIds);
				} else if (this.type == "1") {
					this.cartExpress(this.addressid, this.cartid); //购物车商品获取运费等信息
				}
			},

			// 获取运费信息-商品详情结算
			createExpress(addressid, counts, repIds) {
				let that=this;
				//商品规格
				that.repIds=repIds
				let userData = wx.getStorageSync('user');
				let id =userData.id;
				if(that.isSelfTake ==true){
					that.isSelfTake =1
				}
				else if (that.isSelfTake ==false) {
					that.isSelfTake =0
				}
				uni.wjw_http({
					url: 'api/createOrder',
					data: {
						userId: id,
						addressId: addressid || that.addressid,
						counts: counts,
						isFirst: 1,
						id:that.id,
						memo:that.memo,
						counts:that.num,
						// payType: 1,
						redId:that.redId,
						repIds: repIds,
						isSelfTake:that.isSelfTake
					}
				}).then(res => {
					if(res.status==0){
						var data = res;
						this.orderNumber=data.order_code
						that.createExpressOk(data);
						console.log(res)
					}else{
						that.signalMsg=res.msg;
						that.signalFlag=true;
						setTimeout(()=>{
							this.signalFlag=false;
						},2500)
					}
					
				}).catch(res=>{
					console.log(res)
				})

			},

			// 获取运费信息-购物车结算
			cartExpress(addressid, cartIds) {
				let that=this;
				// console.log('获取运费信息-购物车结算', arguments);
				if(that.isSelfTake ==true){
					that.isSelfTake =1
				}
				else if (that.isSelfTake ==false) {
					that.isSelfTake =0
				}
				let id = wx.getStorageSync('user').id;
				uni.wjw_http({
					url: 'api/createOrderByCart',
					data: {
						 userId: id,
						 password:'',
						  // payType:2,
						addressId: addressid,
						memo:that.memo,
						cartIds: cartIds,
						isFirst: 1,
						redId:that.redId,
						isSelfTake:that.isSelfTake	
					},
				}).then(res => {
					// console.log('获取运费信息-购物车结算 接口 请求成功', res);
					var data = res;
					 this.orderNumber=data.order_code
					this.createExpressOk(data);
				})
			},

			// 获取运费信息-砍价商品
			bargainExpress(addressid, bargainId) {
				console.log('获取运费信息-砍价商品', arguments);
				var userData = wx.getStorageSync('userData');
				if (userData) {
					var id = userData.id;
					
				}
				uni.wjw_http({
					url: 'api/createOrder',
					data: {
						userId: id,
						addressId: addressid,
						bargainId: bargainId,
						counts: 1,
						isFirst: 1
					},
				}).then(res => {
					if(res.status ==0){
						console.log('获取运费信息-砍价商品 接口 请求成功', res);
						var data = res;
						// bargainExpressOk
						this.createExpressOk(data);
					}else{
						
						this.signalMsg=res.msg;
						this.signalFlag=true;
						setTimeout(()=>{
							this.signalFlag=false;
						},2500)
					}
					
					
					
					
				})
			},
			//商品详情过来商品运费调用快递函数成功回调
			// 运费调用快递函数
			createExpressOk(data) {
				// console.log('运费调用快递函数');
				if (data) {
					var info = data.result;
					if (data.status == 0) {
						var totalmPrice = (info.total_price / 100).toFixed(2);
						var freight = (info.freight / 100).toFixed(2);
						if (info.freight <= 0) {
							this.express = '0.00';
						} else {
							this.express = freight;
						}
						totalmPrice = totalmPrice - info.freight; //减去邮费
						this.totalmPrice = totalmPrice;
						this.total_points = info.total_points;
					}
				}
			},
			//获得红包列表
			get_redList() {
				let that=this;
				var userData = wx.getStorageSync('user');
				var token = wx.getStorageSync('token')
				uni.wjw_http({
					url: "red/list",
					method: 'post',
					data: {
						token: token,
						userId: userData.id,
						// status: 0,// 选填 0未使用 1已使用 
						status:0
					},
				}).then(res => {
					console.log('获得红包列表 接口 请求成功', res);
					that.redList = res.result;
					that.redList.map(res=>{
                   // 判断红包是否可以使用
        
				   // 在这里判断 红包数值 是否大于账单值
				   let a=(res.limitMoney)/100;
				   let cc=that.num*that.price;
				  // disable为true的时候 不可以点击选择使用
				   if(cc>0){
					    if(a>=cc){
							res.disable=true;
						}else{
							res.disable=false;
						}
				   }else if(that.carSumMoney>0){
					     if(a>=that.carSumMoney){
							 res.disable=true;
						 }else{
							 res.disable=false
						 }
				   }
						// 给所有的红包 设置 不选中的状态
						res.flags=false
					})
				})
				
			},
			// 选择某一个券
			choice(index){
				this.redList.map((value,key,arr)=>{
					// 这里设置 能选择一个
					if(index!=key){
						value.flags=false;
					}
				})
				if(this.redList[index].disable==false){
					this.redList[index].flags=(this.redList[index].flags== false?true:false)
				}else{
				}
				this.$forceUpdate();
			},
			//不用红包
			useless(){
				this.redList.map(res=>{
					res.flags=false
				})
				this.useRedPacket=0;
				// 购物车过来的不使用红包的时候的钱
				this.userRedSumMoney=this.carSumMoney;
				this.detailSumMoney=this.num*this.price;
				this.$forceUpdate()
			},
			//使用红包
			useful(){
				this.redList.map(res=>{
				if(res.flags==true){
					this.redId=res.id;
					this.useRedPacket=res.money/100;
					this.packets_show=false;
				}
				})				
				if(this.type ==0){
					this.detailSumMoney=(this.num*this.price)-this.useRedPacket;
					this.totalmPrice=this.detailSumMoney;					
				}else if(this.type ==1){
					this.userRedSumMoney=this.carSumMoney-this.useRedPacket;
					this.totalmPrice=this.userRedSumMoney;
				}
				this.$forceUpdate()
			},
			// 关闭红包页面 所有的金额回到最初
			closeRed(){
				this.redList.map(res=>{
					res.flags=false;
					this.useRedPacket=0;
					if(this.type ==0){
						this.detailSumMoney=this.num*this.price;
						this.totalmPrice=this.detailSumMoney;
					}else if(this.type ==1){
						this.userRedSumMoney=this.carSumMoney;
						this.totalmPrice=this.userRedSumMoney;
					}
				})
				this.packets_show=false;
			},
			// 结算 去付钱
			payMoney(){
				this.jifen_show=false;
				this.addlist_back();
				uni.redirectTo({
					url:'/pages/shopCar/payment?money='+this.totalmPrice+'&orderNumber='+ this.orderNumber+'&memo='+ this.memo+'&isSelfTake='+ this.isSelfTake+'&repIds='+ this.repIds+'&id='+ this.id+'&addressId='+this.addressid+'&cartId='+this.cartid+'&type='+this.type+'&counts='+this.num+'&specialMakeMoney='+this.specialMakeMoney
				})
			}
		},

	}
</script>
<style scoped lang="scss">
	.confirmorder-top{
		margin-top: 0!important;
	}
	.styleAll {
		width: 750rpxt;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			margin-left: 40rpx !important;
		}

		.right {
			margin-right: 40rpx !important;
		}
	}

	.beizhu {
		.right {
			width: 530rpx !important;
			margin-right: 40rpx !important;
			text-align: right;
			margin-left: 0 !important;
		}
	}
	.botton-mon {
		background-color: #fff;
		text-align: center !important;
	}
	.botton-finish {
		padding: 0rpx !important;
		font-size: 30rpx;
		text-align: center;
		height: 90rpx;
		line-height: 90rpx!important;
		box-sizing: border-box;
	}
	.position{
		top:50rpx!important;
	}
	
	.hbyOccurFlag{
			position: absolute;
			top:400rpx;
			left:250rpx;
			background-color: green;
			width:300rpx;
			height:100rpx;
			line-height: 100rpx;
			background-color: #000;
			color:#fff;
			text-align: center;
			opacity: 0.7;
			border-radius: 20rpx;
		}
</style>
