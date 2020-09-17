<template>
	<view class="uni-index">
		<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/red_bagicon@2x.png"
		 alt="" class="red_bagicon z_999" @tap.stop='get_user_info'>
		<view class="red_page_mask z_1000 mask mask_bg" v-if='red_page_show' @tap.stop='red_page_show=false'>
			<!-- @click.stop -->
			<view class="red_page_box relative" @tap.stop='jump' data-url='/pages/red_page/red_page'>
				<image class="red_page_box_bg"  src="../../static/redbag.png" mode=""></image>
				<view class="red_page_box_info">
					<img :src="user_info.head_photo||'http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personalcenter_nohead.png'"
					 class="red_page_box_img">
					<view class="red_page_box_tip">你有现金红包待领取</view>
					<view class="red_page_box_txt">恭喜发财，大吉大利</view>
				</view>
			</view>
		</view>
		<!-- sticky fixed -->
		<view class="top_nav_box sticky ov_hid z_999 ">
			<!-- <view class="status_bar"></view> -->
			<view class="top_nav_addr_box flex flex_align_c">
				<img class="top_nav_addr_img" @tap.stop="getMap" src='http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/loaction.png' />
				<view class="top_nav_addr_txt" @tap.stop="getMap">{{addressName}}</view>
			</view>
			<view class="top_nav_search_box ">
				<!-- <view class="top_nav_search_occupy flex_c height_percent" @click='search_input=true' v-else> -->
				<view class="top_nav_search_occupy flex_c height_percent" @tap.stop="jump" data-url='/pages/index/search'>
					<img  class="top_nav_search_icon no_shrink" src='http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/search.png' />
					<view class="top_nav_search_input">搜索</view>
				</view>
			</view>
		</view>
		<view class="bannar_wrap relative ov_hid">
			<swiper class="bannar_box" circular>
				<swiper-item class="bannar_item " v-for="(item,index) in bannar" :key='index' @tap.stop='bannerJump(index)'>
					<img class="bannar_img" :src="item" />
				</swiper-item>
			</swiper>
			<view class="bannar_bottom"></view>
		</view>
		<view class="category_list flex flex_wrap">
			<view class="category_li" v-for="(item,index) in category_list" :key='index'@tap.stop='jump' :data-url='item.url'>
				<img class="category_li_img no_shrink" :src='item.img' />
				<view class="category_li_name">{{item.name}}</view>
			</view>
		</view>
		<!-- 公告 -->
		<view class="notice_box flex">
			<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/notice.png" alt=""
			 class="notice_logo no_shrink">
			<!-- height_percent -->
			<swiper class="notice_swiper flex_grow" display-multiple-items='2' circular vertical>
				<swiper-item class="notice_swiper_item flex flex_align_c" v-for="(item,index) in notice_list" :key='index'>
					<view class="notice_swiper_item_li txt_over_ell">{{item}}</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="title_li flex_c">
			<view class=" flex_grow "></view>
			<view class="title_li_name no_shrink ta_c flex flex_c">
				<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/组 36@2x.png" alt=""
				 class="title_li_img">
				快速抢购专区
				<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/组 36@2x.png" alt=""
				 class="title_li_img">
			</view>
			<view class=" flex_grow"></view>
		</view>
		<swiper class="ksqgSwiper category_goods_list" circular>
			<swiper-item class="classify_box  nowrap swi1" v-for="(item,index) in quickgetVipURl" :key='index'>
				<!-- <view class="swiper-item uni-bg-red">A</view> -->
				<view style="margin-right:30rpx;">
					<image class="active_img swi2" :src="item.photo" @tap.stop="quickList(item.id)" />
				</view>

			</swiper-item>
		</swiper>
		<view class="title_li flex_c" v-if="videoFlag">
			<view class=" flex_grow "></view>
			<view class="title_li_name no_shrink ta_c flex flex_c">
				<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/视频 拷贝@2x.png" alt=""
				 class="title_li_img">
				视频答题专区
				<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/视频 拷贝@2x.png" alt=""
				 class="title_li_img">
			</view>
			<view class=" flex_grow"></view>
		</view>
		<view class="category_goods_list flex flex_wrap " v-if="videoFlag">
			<view class="category_goods_box category_bd" v-for="(item,index) in videolist" autoplay :key='index'>

				<view class="relative   no_shrink videoBox ">
					<image class="category_goods_img videos" :src="item.facePhoto"></image>
					<image class="img" @tap.stop="videoJump(item.id)" src="http://zxyp.hzbixin.cn/files/70301597367898899.jpg"></image>
				</view>
			</view>
		</view>
		<view class="title_li flex_c">
			<view class=" flex_grow "></view>
			<view class="title_li_name no_shrink ta_c flex flex_c">
				<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/喜欢@2x.png" alt=""
				 class="title_li_img">
				猜您喜欢
				<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/喜欢@2x.png" alt=""
				 class="title_li_img">
			</view>
			<view class=" flex_grow"></view>
		</view>
		<view class="category_goods_list flex flex_wrap">
			<!-- quickList(item.id) -->
			<!-- <view class="category_goods_box" v-for="(item,index) in active_list" :key='index' @tap='jump' data-url='/pages/goods/goods'> -->
		<view class="category_goods_box" v-for="(item,index) in active_list" :key='index'  > 
				<img class="category_goods_img" @tap.stop='actiTop(item.id)' :src="item.pic" />
				<!-- <view class="category_goods_name txt_over_ell">{{item.name}}</view> -->
			</view>
		</view>
		<view class="title_li flex_c" v-if="videoFlag">
			<view class=" flex_grow "></view>
			<view class="title_li_name no_shrink ta_c flex flex_c">
				<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/组 36@2x.png" alt=""
				 class="title_li_img">
				活动专题页
				<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/组 36@2x.png" alt=""
				 class="title_li_img">
			</view>
			<view class=" flex_grow"></view>
		</view>
		<swiper class="active_box" circular v-if="videoFlag">
			<swiper-item class="active_item " v-for="(item,index) in huodongList" :key='index'>
				<img class="active_img" @click='actiTop(item.id)' :src="item.photo" />
			</swiper-item>
		</swiper>
		<view class="title_li flex_c">
			<view class=" flex_grow "></view>
			<view class="title_li_name no_shrink ta_c flex flex_c">
				<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/门店@2x.png" alt=""
				 class="title_li_img">
				门店专区
				<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/门店@2x.png" alt=""
				 class="title_li_img">
			</view>
			<view class=" flex_grow"></view>
		</view>
		<scroll-view class="classify_box nowrap" scroll-x>
			<view class="classify_item " @click="delColor(1)">
				<view class="classify_item_txt" :class="{ select: true, firstActive: sels == 1 }">全部商品</view>
				<view class="classify_item_bd" :class="{ select: true, firstActives: sels ==1 }"></view>
			</view>
			<view class="classify_item" v-for="(item,index) in allGoodsCateList" :key='index' @click="category(index,1)">
				<view class="classify_item_txt" :class="{ select: true, active: index === sel }">{{item}}</view>
				<view class="classify_item_bd" :class="{ select: true, actives: index === sel }"></view>
				<!-- :class="'activeWord+'index" -->
			</view>
		</scroll-view>
		<view class="goods_list flex flex_wrap">

			<view class="goods_li" v-for="(item,index) in allGoodsList" :key='index' @click='cateDetail(item.id)'>
				<img class="goods_li_img" :src="item.pic" />
				<view class="goods_li_info">
					<view class="goods_li_title">{{item.title}}</view>
					<view class="goods_li_price">￥<text>{{item.price}}</text> 积分<text>{{item.total_reper}}</text></view>
				</view>
			</view>

		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				//快速抢购专区的图片
				quickgetVipURl: [],
                   // 个人信息
				user_info:'',
				flagFalse: false,
				red_page_show: false,
				num: 0,
				search_input: false,
				search_value: '',
				// 轮播图
				bannar: [],
				bannerLink: [],
				// 活动话题的id
				activityTopicId: '',
				// 获取所有商品的分类
				allGoodsCateList: [],
				allGoodsCateIdList: [],
				allGoodsList: [],
				// 所有商品切换的插件使用
				sel: -2,
				sels: 1,
				page: 1,
				// 这边是分类以后的 上拉加载
				catePage: 1,
				cateIII: '',
				cateFlag: false,
				cateORallFlag: false,
				no_more: false,
				pageSizes: 0,
				pageallSizes: 0,
				videolist: [],
				huodongList: [],
				// 最上方 地址的名字
				addressName: '点击获取店名地址',
				// 视频显示的地方
				videoFlag:false,
				category_list: [
					// 
					{
						img: 'http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/category_list/hot@2x.png',
						name: '热销爆品',
						url: '/pages/category/hot/hot',
					},
					{
						img: 'http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/category_list/encyclopedia@2x.png',
						name: '母婴百科',
						url: '/pages/category/mybk/mybk',
					},
					{
						img: 'http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/category_list/bargain@2x.png',
						name: '特惠赚钱',
						url: '/pages/category/thzq/thzq',
					},
					{
						img: 'http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/category_list/service@2x.png',
						name: '孕婴服务',
						url: '/pages/category/childServe/childServe',
					},

				],


				notice_list: [
					'充值60元送120元+价值198元羊奶粉一盒',
					'9月平台充值上线啦，充值现金大送活动------------',
					'xxxxxxxxxxxxxxxxxx',
				],
				active_list: [

				],
				invite_id:'',
				openId:'',
				code:'',
				addresslist:''
			}
		},
		onLoad(options) {
            let that=this;
			this.setData(options);
			this.get_banner();
			// 公告
			this.getNews();
			this.quickVIP();
			this.getActivityTopic();
			this.getAllGoodsClassificate();
			this.delColor(1);
		    // console.log(this.invite_id+'inviteId')
			if(this.invite_id){
				console.log('获取code ')
				uni.login({
					  provider: 'weixin',
					  success: function (res) {
						   that.code=res.code;
						   that.getOpenId(); 
					  }
					  })	
			}
			
		},
		onShareAppMessage: function () {
		    let _this = this;
		    return {
		      title: "智享婴品",
		      path: "/pages/index/index?" + _this.getShareUrlParams()
		    };
		},
		onShow(){
			if(wx.getStorageSync('token')){
				this.getAddress();
				this.videoList();
				this.huodong();
				this.videoFlag=true;
			}
			if(wx.getStorageSync('token') && this.invite_id ){
				  // 绑定上下级关系
				  this.getOpenId();
			}
		},
		components: {

		},
		onReachBottom() {
			// 所有商品 以及其分类后的数据的上拉加载
			this.page = this.page + 1;
			this.catePage = this.catePage + 1;
			if (this.cateFlag == false) {
				if (this.pageallSizes >= this.page) {
					this.delColor(this.page)
				} else {}
			} else if (this.cateFlag == true) {
				if (this.pageSizes >= this.catePage) {
					this.category(this.sel, this.catePage)
				} else {}
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			//获取个人信息
			get_user_info() {
				this.red_page_show=true;
				let id =wx.getStorageSync('user').id
				uni.wjw_http({
					 url:'user/info/'+id,
					 type:'post'
			    }).then(res => {
			      if(res.status ==0){
					  this.user_info = res.result;
				  } 
			    }).catch(res=>{
					console.log(res.msg)
				})
			
			},
			// 绑定上下级关系
			bindRelation(){
				let that=this;
				let  id =wx.getStorageSync('user').id;
				console.log('调用函数bindrelation')
				uni.wjw_http({
					// header:{
					// 	 'content-type':'application/json;charset=UTF-8'
					// },
					url:'app/cduserspecialbalance/update',
					type:'get',
					data:{
						userId:id,
						openId:this.openId,
						supUserId:this.invite_id
					}
				}).then(res=>{
					if(res.code ==0){
						console.log('上下级关系成功')
					}
				}).catch(res=>{
					console.log(res)
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
						// 判断用户是否登录
						console.log('openId 获取之后，进行下一步调用函数')
						if(wx.getStorageSync('user')){
							console.log('连接上下级的关系 ，调用函数')
							this.bindRelation();
						}
						
					
					}
				}).catch(res=>{
					
				})
			},
			// 调用地图
			getMap() {
				let that=this;
				uni.getLocation({
					success: res => {
						uni.openLocation({
							latitude: res.latitude,
							longitude: res.longitude,
							scale: 18,
							success:(data)=>{
								console.log(data);
								console.log('getLocation')
							},
							fail:()=>{
								uni.showModal({
								    title: '温馨提示',
								    content: '您已拒绝定位,请开启',
								    confirmText: '去设置',
								    success(res){
								        if (res.confirm) {
								            //打开授权设置
								            uni.openSetting();
								        }
								    }
								})
							}
						})
					}
				});
			},
			// 获取店名字
			getAddress() {
				let that = this;
				let id = wx.getStorageSync('user').mer_id
				uni.wjw_http({
					url: 'merchant/info/' + id,
					type: 'post'
				}).then(res => {
					if (res.status == 0) {
						that.addressName = res.result.shop_name;
						this.addresslist=res.result;
						// console.log(111)
						// console.log(res)
					}
					
				})
				this.$forceUpdate()
			},
			//快速抢购专区
			quickVIP() {
				let that = this
				uni.wjw_http({
					url: "bannergoods/list",
					method: 'get',
					data: {
						page: 1,
						limit: 3
					}
				}).then(res => {
					if (res.status == 0) {
						let a = res.result.map(item => item);
						// a= a.slice(0,3)
						that.quickgetVipURl = res.result;
					}
				})
			},
			// 视频获取
			videoList() {
				let that = this;
				let id = wx.getStorageSync('user').id;
				uni.wjw_http({
					url: 'vedio/list',
					type: 'post',
					data: {
						userId: id,
						page: that.page,
						pageSize: 10
					}
				}).then(res => {
					if (res.status == 0) {
						let a = res.result;
						let num = Math.floor(Math.random() + 1);
						a = a.slice(num, num + 3)
						that.videolist = a;
					}
				}).catch(res=>{
					console.log(res)
				})

			},
			// 视频跳到 视频详情
			videoJump(ids) {
				uni.navigateTo({
					url: '/pages/video/detail?id=' + ids
				})
			},
			// 快速购买的时候跳转到list
			quickList(ids) {
				uni.navigateTo({
					url: '/pages/goods/goods?id=' + ids
				})
			},
			// 轮播图
			get_banner(e) {
				uni.wjw_http({
					url: "banner/list",
					data: {},
				}).then(res => {
					// console.log(res);
					if (res.status == 0) {
						this.bannar = res.result.map(item => item.photo);
						this.bannerLink = res.result.map(item => item.id)
					}

				})
			},
			//活动专区
			huodong() {
				let that = this;
				let id = wx.getStorageSync('user').mer_id;
				uni.wjw_http({
					url: "bannermer/list",
					type:'get',
					data: {
						merId: id
					}
				}).then(res => {
					if (res.status == 0) {
						
						that.huodongList = res.result;
					}
				})
			},
			bannerJump(id) {
				let num = this.bannerLink[id];
				uni.navigateTo({
					url: '../goods/goods?id=' + num
				})
			},
			// 公告
			getNews(e) {
				uni.wjw_http({
					url: "bannermsg/list",
					method: 'post',
					data: {
						phone: this.phone,
					},
				}).then(res => {
					if (res.status == 0) {
						this.notice_list = res.result.map(item => item.title);
					}
				})
			},
			// 获取猜你喜欢的banner
			getActivityTopic() {
				let that = this;
				uni.wjw_http({
					url: "saleevent/listByPage",
					method: 'post',
					data: {
						page: 1
					}
				}).then(res => {
					if (res.status == 0) {
						let a = res.result.list;
						// let num=Math.floor(Math.random()*(a.length));
						a = a.slice(0, 3)
						that.active_list = a;

					}
				})

			},
			// 猜你喜欢的跳转
			actiTop(ids) {
				let that = this;
				uni.navigateTo({
					url: '/pages/goods/goods?id=' + ids
				})
			},
			// 获取所有商品的分类
			getAllGoodsClassificate() {
				let that = this;
				uni.wjw_http({
					url: 'goodsclass/list'
				}).then(res => {
					if (res.status == 0) {
						that.allGoodsCateList = res.result.map(item => item.class_name);
						that.allGoodsCateIdList = res.result.map(item => item.id);
						this.$forceUpdate()
					}
				})
			},
			//获取所有产品当中的某一类进行渲染
			category(i, page) {
				// 来判断是全部还是分类的

				this.cateFlag = true;
				this.sels = 0;
				this.sel = i;
				let pages = page;
				let that = this;
				//这里出现的classid 是根据官网随便填写的 
				// let a =uni.getStorageSync('userData');
				// let use=a.user.id;
				// let token=a.token;
				let ids = that.allGoodsCateIdList[i]
				uni.wjw_http({
					url: 'saleevent/listByPage',
					data: {
						page: pages,
						pageSize: 6,
						ower_type: 2,
						// userId:use,
						// token:token,
						class_id: ids
					}
				}).then(res => {
					if (res.status == 0) {
						that.pageSizes = res.result.pages;
						if (pages != 1) {
							let ii = res.result.list;
							let jj = that.allGoodsList;
							jj = jj.concat(ii);
							that.allGoodsList = jj
						} else {
							that.allGoodsList = res.result.list;
						}
						that.cateORallFlag = true;
					}
				})
				// 全部列表的内容 删除
			},
			delColor(pages1) {
				this.cateFlag = false;
				this.sels = 1;
				this.sel = -3;
				let pages = pages1;
				let that = this;

				uni.wjw_http({
					url: 'saleevent/listByPage',
					data: {
						page: pages,
						pageSize: 6,
						ower_type: 2,
					}
				}).then(res => {
					if (res.status == 0) {
						this.pageallSizes = res.result.pages;
						if (pages != 1) {
							let ii = res.result.list;
							let jj = that.allGoodsList;
							jj = jj.concat(ii);
							that.allGoodsList = jj
						} else {
							that.allGoodsList = res.result.list;
						}
					}
				})
			},
			cateDetail(ids) {
				uni.navigateTo({
					url: '../goods/goods?id=' + ids
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.active,
	.firstActive {
		color: #f31641;
	}

	.actives,
	.firstActives {
		background-color: #f31641;
		height: 10rpx;
	}

	.red_bagicon {
		position: fixed;
		bottom: 80rpx;
		right: 40rpx;
		width: 144rpx;
		height: 180rpx;
		/*height: auto;*/
	}

	.red_page_mask {}

	.red_page_box {}

	.red_page_box_bg {
		width: 640rpx;
		height: 970rpx;
	}

	.red_page_box_info {
		position: absolute;
		top: 100rpx;
		width: 100%;
		text-align: center;
	}

	.red_page_box_img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-bottom: 26rpx;
	}

	.red_page_box_tip {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(254, 211, 167, 1);
		margin-bottom: 42rpx;
	}

	.red_page_box_txt {
		font-size: 50rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(254, 211, 167, 1);
	}

	.top_nav_box {
		width: 100%;
		top: 0;
		left: 0;
		background-color: #FF7599;
		/*height:114rpx;*/
		// background:linear-gradient(66deg,rgba(255,107,134,1) 0%,rgba(255,127,176,1) 100%);
	}

	.top_nav_addr_box {
		padding: 14rpx 0;
		padding-left: 28rpx;
	}

	.top_nav_addr_img {
		width: 40rpx;
		height: 40rpx;
		margin-right: 11rpx;
	}

	.top_nav_addr_txt {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}

	.top_nav_search_box {
		margin: 0 40rpx;
		margin-bottom: 21rpx;

		height: 60rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 29rpx;
	}

	.top_nav_search_occupy {}

	.top_nav_search_show {}

	.top_nav_search_icon {
		width: 28rpx;
		height: 28rpx;
		margin-right: 10rpx;
		margin-left: 30rpx;
	}

	.top_nav_search_input {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
	}




	.bannar_box {
		height: 300rpx;
	}

	.bannar_item {}

	.bannar_img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.bannar_bottom {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		height: 27rpx;
		margin-top: calc(-27rpx / 2);
		border-radius: 50%;
		background: white;
	}




	.category_list {
		padding: 0 60rpx;
		margin-bottom: 30rpx;
	}

	.category_li {}

	.category_li+.category_li {
		margin-left: 61rpx;
	}

	.category_li:nth-child(4n+1) {
		margin-left: 0rpx;
	}

	.category_li_img {
		width: 113rpx;
		height: 113rpx;
	}

	.category_li_name {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(0, 0, 0, 1);
	}

	.notice_box {
		/*width:690rpx;*/
		margin: 0 30rpx;
		/*height:100rpx;*/
		background: rgba(255, 255, 255, 1);
		border: 1rpx solid rgba(229, 229, 229, 1);
		border-radius: 10rpx;
		padding: 18rpx;
	}

	.notice_logo {
		width: 64rpx;
		height: 64rpx;
		margin-right: 8rpx;
	}

	.notice_swiper {
		height: 64rpx;
		border-left: 1rpx solid rgba(229, 229, 229, 1);
		padding-left: 30rpx;
	}

	.notice_swiper_item {}

	.notice_swiper_item_li {
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}



	.category_goods_list {
		padding: 0 30rpx;
	}

	.category_goods_box {
		width: 216rpx;
		border-radius: 10rpx;
		overflow: hidden;
		margin-top: 20rpx;
	}

	.category_goods_box+.category_goods_box {
		margin-left: 20rpx;
	}

	.category_goods_box:nth-child(3n+1) {
		margin-left: 0rpx;
	}

	.category_goods_img {
		/*width:216rpx;*/
		width: 100%;
		height: 200rpx;
	}

	.category_goods_name {
		font-size: 24rpx;
		line-height: 60rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(0, 0, 0, 1);
		text-align: center;
	}

	.category_bd {
		border: 1rpx solid rgba(229, 229, 229, 1);
		box-sizing: border-box;
	}

	.active_box {
		height: 300rpx;
		margin: 30rpx;
	}

	.active_item {}

	.active_img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 10rpx;
	}

	.classify_box {
		height: 80rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 3rpx 3rpx 0rpx rgba(255, 114, 149, 0.15);
	}

	.classify_item {
		display: inline-flex;
		text-align: center;
		flex-direction: column;
		height: 100%;
		font-size: 30rpx;
		width: 140rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.classify_item_txt {
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 16rpx;
	}

	.classify_item_bd {
		flex-shrink: 0;
		width: 100%;
		/*height:4rpx;*/
		height: 0;
		background: rgba(255, 114, 149, 1);
		border-radius: 2rpx;
	}

	.activeWord {
		color: rgba(255, 114, 149, 1)
	}

	.activeBorder {
		height: 10rpx;
		background: rgba(255, 114, 149, 1);
	}

	.classify_item_now {
		.classify_item_txt {
			color: rgba(255, 114, 149, 1);
		}

		.classify_item_bd100 {

			height: 10rpx;
			background: rgba(255, 114, 149, 1);
			// border-radius:2rpx;
			// color:rgba(255,114,149,1);
		}
	}


	.goods_list {
		padding: 20rpx 0;

	}

	.goods_li {
		width: 330rpx;
		min-height: -470rpx;
		box-sizing: border-box;
		border: 1rpx solid rgba(229, 229, 229, 1);
		border-radius: 10rpx;
		margin-left: 30rpx;
		margin-bottom: 20rpx;
	}

	.goods_li_img {
		width: 100%;
		height: 300rpx;
	}

	.goods_li_img_li {
		width: 690rpx;
		height: 300rpx;
		margin-left: 30rpx;
		margin-bottom: 20rpx;
	}

	.goods_li_info {
		padding: 21rpx;
	}

	.goods_li_title {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.goods_li_price {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(254, 94, 84, 1);
	}

	.videoBox {
		position: relative;

		.img {
			width: 50rpx;
			height: 50rpx;
			position: absolute;
			left: 84rpx;
			top: 74rpx;
		}
	}

	.swi2 {
		width: 212rpx !important;
		height: 195rpx !important;
	}

	.swi1 {
		width: 240rpx !important;
		height: 195rpx !important;
	}

	.ksqgSwiper {
		height: 170rpx !important;
	}
</style>
