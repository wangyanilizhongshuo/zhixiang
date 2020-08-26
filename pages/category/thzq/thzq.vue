<template>
	<view>
		<view class="info_wrap relative">
			<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/thzq_bg@2x.png" alt="" class="info_rule_bg">
			<view class="info_box flex flex_column ">
				<view class="info_rule">规则说明</view>
				<view class="info_num flex_grow flex_c" v-if="!zqExtra">00.00元</view>
				<view class="info_num flex_grow flex_c" v-if="zqExtra">{{zqExtra}}.00元</view>
				<view class="info_btns flex_c">
					<view class="info_btn flex_c" @click='jump' data-url='/pages/category/thzq/log'>记录明细</view>
					<view class="info_btn flex_c" @tap.stop="addMoney">我要充值</view>
				</view>
			</view>
		</view>

		<view class="goods_list flex flex_wrap">
			<view class="goods_li" v-for="(item,index) in allGoodList" :key='index' @tap.stop='jumpDetail(item.id)' >
				<img :src="item.pic" alt="" class="goods_li_img">
				<view class="goods_li_info">
					<view class="goods_li_txt">{{item.title}}</view>
					<view class="goods_li_num">￥{{(item.oldPrice/100)}}.00</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				 allGoodList:[],
				 pages:1,
				 pageSizes:1,
				 zqExtra:'',
				 code:'',
				 openId:'',
				 money:'',
				 up_id:''
			}
		},
		onLoad(e){
			// invest修改上下级的关系
			this.getAllList();
			this.getBalance();
			let that=this;
			uni.login({
				  provider: 'weixin',
				  success: function (res) {
					   that.code=res.code;
					   that.getOpenId(); 
				  }
				  })	
				  if(e.up_id){
					  this.up_id=e.up_id;
					  this.getMsg()
				  }
		},
		onReachBottom(){
			if(this.pageSizes>this.pages){
				this.pages=this.pages+1;
				 this.getAllList()
			} 
		},
		// 分享
		onShareAppMessage: function () {
		    let _this = this;
			let id=wx.getStorageSync('user').id;
		    // 构建页面参数
		    let params = this.getShareUrlParams({
		      'up_id': id
		    });
		    return {
		      // title: _this.detail.title,
			  path: '/pages/category/thzq/thzq?'+params
		      // path: "/pages/assemble/detail/detail?" + params
		    };
		},
		
		methods: {
			// 获取数据的详细列表
			getAllList(){
				let that=this;
				uni.wjw_http({
					url:'saleevent/listByPage',
					data:{
						page:that.pages,
						pageSize:6

						}
					}).then(res=>{					
						if(res.status ==0){
							that.pageSizes=res.result.pages;
							 let ii =res.result.list;							
							let jj =that.allGoodList;						
							jj=jj.concat(ii);
							that.allGoodList=jj;	
							
						}
					})
			},
		    // 跳转到详情页
			jumpDetail(ids){
				uni.navigateTo({
					url:'/pages/goods/goods?id='+ids
				})
			},
			// 跳转---充钱
			addMoney(){
				uni.navigateTo({
					url:'/pages/category/thzq/invest?openId='+this.openId
				})
			},
			// 获取专区的余额
			getBalance(){
				let id=wx.getStorageSync('user').id;
				uni.wjw_http({
					url:'app/cduserspecialbalance/get',
					type:'get',
					data:{
						userId:id
					}
				}).then(res=>{
					if(res.code ==0){
						this.zqExtra=res.data.specialBalance;
					}
				}).catch(res=>{
					
				})
			},
			// 获取openId
			getOpenId(){	
				let that=this;
				uni.wjw_http({
					header:{
						 'content-type':'application/json;charset=UTF-8'
					},
					url:'app/wechat/getOpenId',
					type:'post',
					data:{
						appId:'wx74605d2c3744958c',
						code:that.code
					}
				}).then(res=>{
					if(res.code ==0){
						this.openId=res.data.openid;
						this.sessionKey=res.data.sessionKey;
						// this.getMsg();
					}
				}).catch(res=>{
					console.log(res)
				})
			},
			// 上下级的关系
			getMsg(){
				let that=this;
				let  id =wx.getStorageSync('user').id;
				uni.wjw_http({
					// header:{
					// 	 'content-type':'application/json;charset=UTF-8'
					// },
					url:'app/cduserspecialbalance/update',
					type:'get',
					data:{
						userId:id,
						openId:this.openId,
						supUserId:this.up_id
					}
				}).then(res=>{
					if(res.code ==0){
						console.log(52345)
						console.log(res)
					}
				}).catch(res=>{
					console.log(res)
				})
			},
			
		}
	}
</script>

<style>
	body{
		background: #F0F0F0;
	}
	.info_wrap{}
	.info_rule_bg{
		width: 100%;
		height: 333rpx;
	}
	.info_box{
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		height: 100%;
	}
	.info_rule{
		position: absolute;
		top: 10rpx;
		right: 20rpx;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	.info_num{
		font-size:80rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	.info_btns{
		padding: 47rpx 0;
	}
	.info_btn{
		width:146rpx;
		height:60rpx;
		border:2rpx solid rgba(255,255,255,1);
		border-radius:30rpx;

		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	.info_btn+
	.info_btn{
		margin-left: 45rpx;
	}

	.goods_list{}
	.goods_li{
		margin-top: 30rpx;
		margin-left: 30rpx;

		width:330rpx;
		/*height:442rpx;*/
		background:rgba(255,255,255,1);
		border:1px solid rgba(229, 229, 229, 1);
		border-radius:10rpx;
		box-sizing: border-box;
	}
	.goods_li_img{
		width: 320rpx;
		height: 330rpx;
		display: block;
		margin: auto;
	}
	.goods_li_info{
		padding: 20rpx;
		padding-top: 0;
	}
	.goods_li_txt{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.goods_li_num{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(254,94,84,1);
		margin-top: 16rpx;
	}

</style>
