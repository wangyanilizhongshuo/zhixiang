<template>
   <view class="uni-category">
	   <view  class="uni-search">
		   <input class="unin-input" placeholder="搜索"  @tap='jump' data-url='/pages/index/search' />
		   <image  class="searchImg" src="http://zxyp.hzbixin.cn/files/16951600420855845.jpg"></image>
	   </view>
	   <view style="height: 80rpx;width:750rpx"></view>
	   <view class="uni-contents">
		   <view class="uni-left">
			   <view class="list" :class="nav_item_active==index?'actives':''" v-for="(item,index) in allGoodsCateList" :key="index" @tap.stop="categorys(index,1,1)">
				  {{item.class_name}}
				  <view class="lines" v-if="nav_item_active==index"></view>
			   </view>
		   </view>
		   <view style="width:180rpx;height: 100vh;"></view>
		   <view class="uni-right">
			   <view class="lists"  v-for="(item,index) in allGoodsList" :key="index"   :data-id="item.id"
                              @tap='jump' data-url='/pages/goods/goods'>
				   <image class="img" :src="item.pic"></image>
				   <view class="firstWord">{{item.title}}</view>
				   <view class="secondWord"><text style="display: inline-block;margin-right:10rpx;">￥{{item.raisePrice}}</text> <text>积分{{item.points}}</text></view>
				   <!--  -->
			   </view>
		   </view>
	   </view>
	   
   </view>
</template>
<script>
	export default{
		data(){
			return {
				nav_item_active: 0,
				goodsclass_list: [],
				oneFirst:1,
				goods_list: [],
				allGoodsCateList:'',
				allGoodsCateIdList:'',
				pages:1,
				ids:1,
				pageallSizes:1,
				allGoodsList:'',
				i:'',
				cc:[]
				
			}
		},
		 onShareAppMessage: function () {
				    let _this = this;
				    return {
				      title: "智享婴品",
				      path: "/pages/index/index?" + _this.getShareUrlParams()
				    };
				},
		onLoad(options){
			  this.get_goods_list();
		},
		onReachBottom(){
			if(this.pages< this.pageallSizes){
				this.pages+=1;
				this.categorys(this.i,this.pages,0)
			}
		},
		onTabItemTap(){
			if(wx.getStorageSync('user').id){
				
			}else{
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		},
		methods:{
			  // 获取商品列表
				get_goods_list(e) {
					let that = this;
					uni.wjw_http({
						url: 'goodsclass/list'
					}).then(res => {
						if (res.status == 0) {
							that.allGoodsCateList = res.result;
							that.allGoodsCateIdList = res.result.map(item => item.id);
							if(that.oneFirst ==1 ){
							  that.categorys(0,1);
							  that.oneFirst=0;
							}
							
						}
					})
				},
				// 价格处理的方法
				keepTwoDecimalFull(num,indexss) {
					          num=num/100;
							  var result = parseFloat(num);
							  if (isNaN(result)) {
							    return false;
							  }
							  result = Math.round(num * 100) / 100;
							  var s_x = result.toString(); //将数字转换为字符串
							 
							  var pos_decimal = s_x.indexOf('.'); //小数点的索引值
							
							  // 当整数时，pos_decimal=-1 自动补0
							  if (pos_decimal < 0) {
							    pos_decimal = s_x.length;
							    s_x += '.';
							  }
						
							  // 当数字的长度< 小数点索引+2时，补0
							  while (s_x.length <= pos_decimal + 2) {
							    s_x += '0';
							  }
							 
							  this.cc[indexss].raisePrice=s_x;
							  
							 
				},
				categorys(i,pages,msg){
					if(msg==1){
						uni.pageScrollTo({
						    scrollTop: 0,  //距离页面顶部的距离
						    duration: 300
						});
					}
					this.i=i;
					this.nav_item_active=i;
					let that = this;
					that.pages=pages;
					that.ids=that.allGoodsCateIdList[i];
					uni.wjw_http({
						url: 'saleevent/listByPage',
						data: {
							page: that.pages,
							pageSize: 6,
							ower_type: 2,
							class_id: that.ids
						}
					}).then(res => {
						if (res.status == 0) {
							that.pageallSizes = res.result.pages;
							that.cc=res.result.list;
							console.log(that.cc)
							that.cc.map((items,index,array)=>{
							      // items.raisePrice=(items.raisePrice/100).toFixed(2);
								that.keepTwoDecimalFull(items.raisePrice,index)
							})
							if (that.pages != 1) {
								let ii = res.result.list;
								let jj = that.allGoodsList;
								jj = jj.concat(ii);
								that.allGoodsList = jj;
								console.log(that.allGoodsList)
							} else {
								that.allGoodsList = res.result.list;
							}
						}
					})
				}
		}
	}
</script>
<style scoped lang="scss">
	.uni-category{
		width: 750rpx;
		height: 100vh;;
		font-size: 26rpx;
	}
	.uni-search{
		width: 750rpx;
		height: 80rpx;
		background-color: #FF7599;
		text-align: center;
		position: fixed;
		left:0;
		top:0;
		z-index:10;
		.unin-input{			
			width: 670rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			background-color: #fff;
			border-radius: 30rpx;
			color:#999;
		}
		.searchImg{
			display: block;
			width: 28rpx;
			height: 28rpx;
			position: absolute;
			top:17rpx;
			left:310rpx;
		}
	}
    .uni-contents{
		width: 750rpx;
		display: flex;
		.uni-left{
			width:180rpx;
			height: 100vh;
			background: #FFF6F8;;
			position: fixed;
			left:0;
			top:80rpx;
			.list{
				width:180rpx;
				height: 100rpx;
				line-height: 100rpx;;
				color:#FF7295;
				text-align: center;
				box-sizing: border-box;
				position: relative;
				left:0;
				top:0
			}
		}
		.uni-right{
			flex:1;
			background:#fff;
			display: flex;
			flex-wrap: wrap;
			.lists{
				margin-right: 25rpx;
				width:260rpx;
				 height: 420rpx;
				color:#FF7295;
				text-align: center;
				
				position: relative;
				left:0;
				top:0;
				.img{
					display: block;
					width: 260rpx;
					height: 260rpx;
					margin-top: 20rpx;
				}
				.firstWord{
					width: 240rpx;
					color: #333333;
					font-size: 24rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					margin:20rpx  10rpx;
					text-align: left;
				}
				.secondWord{
					color:#FE5E54;
					width: 240rpx;
					display: flex;
					justify-content: flex-start;
					position: absolute;;
					left:10rpx;
					bottom: 5rpx;
					
				}
			}
		}
	}
	.actives{
		background: #fff;
		
	}
	.lines{
		width: 4rpx;
		height: 100rpx;
		background: linear-gradient(0deg, #FF6B86 0%, #FF7FB0 100%);
		position: absolute;
		left:0;
		top:0
	}
</style>