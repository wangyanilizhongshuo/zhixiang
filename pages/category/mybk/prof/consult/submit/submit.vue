<template>
	<view>

		<view class="info_head all_head flex flex_align_c all_pd_lr">
			<view class="info_bar all_bar"></view>
			<view class="info_title all_title">请描述您的问题</view>
		</view>
		<textarea class="info_textarea all_ma_lr" focus v-model="content"></textarea>

		<view class="img_info_head all_head flex flex_align_c all_pd_lr">
			<view class="img_info_bar all_bar"></view>
			<view class="img_info_title all_title">图片详情</view>
		</view>
		<view class="img_info_list all_pd_l flex flex_wrap">
			<view class="img_info_li" v-for="(item,index) in bodyPhotoUrl" :key="index">
				<image @tap="injuryPreviewImage(index)" :src="item" alt="" class="img_info_li_img  no_shrink" />
				<image @click="delImg(index)" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/del@2x.png"
				 alt="" class="img_info_li_icon  no_shrink" />
			</view>
			<view class="img_info_li">
				<image v-if="bodyPhotoUrl.length>=0 && bodyPhotoUrl.length<9" @click="bodyPhotoAdd()" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/upload@2x.png"
				 alt="" class="img_info_li_icon_add">
			</view>
		</view>
		<!-- <view class="consult_btn flex_c op_0">提交</view> -->
		<!-- @click='jump' data-url='/pages/category/mybk/prof/consult/consult' -->
		<view class="consult_btn flex_c fixed po_bottom width_perc" @click='submitMes()'>提交</view>

	</view>
</template>
<script>
	import wxPayment from '../../../../../../common/wjw_uni/wjw_util.js'
	export default {
		data() {
			return {
				userId: '',
				bodyPhotoUrl: [],
				content: '',
				zhifuCode: '',
				upUrlList: [],
				code:'',
				openId:''
			}
		},
		onLoad(options) {
			this.setData(options);
			let that=this;
			uni.login({
				  provider: 'weixin',
				  success: function (res) {
					   that.code=res.code;
					   that.getOpenId(); 
				  }
		    })
		},
		methods: {
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
						// this.sessionKey=res.data.sessionKey;
						// this.getMsg();
					}
				}).catch(res=>{
					console.log(res)
				})
			},
			submitMes() {
				let that = this;
				let a = that.bodyPhotoUrl;
				let userId = uni.getStorageSync('user').id;
				let callback = data => {
					// 发起微信支付
					// console.log(data)
					that.wxPayment({
						result: data,
						success: data => {

							//跳转到订单页面
							// _this.redirectToOrderIndex();
							uni.navigateBack(2)
						},
						fail: data => {
							console.log(data)
							console.log('提交失败')
						},
					});
				};
				if (!that.content == '') {
					uni.wjw_http({
						//  header:{
						//  'content-type':'application/json;charset=UTF-8'
						//  },
						url: 'app/cdexpertconsultationrecord/advisory',
						method: 'post',
						data: {
							expertId: that.userId,
							issues: that.content,
							userId: userId,
							// token:token,
							openId:that.openId,
							picture: that.upUrlList
						},
					}).then(res => {
						if (res.code == 0) {
							// uni.showToast({
							// 	title: '提交成功',
							// 	duration: 2000
							// });
							that.zhifuCode = res.data;
							if (res.data) {
								let aa = res.data;
								let bb = {};
								bb.appId = aa.appId;
								bb.timeStamp = aa.timeStamp;
								bb.nonceStr = aa.nonceStr;
								bb.prepayId = aa.packageValue;
								 // bb.sign = aa.signType;
								bb.sign = aa.paySign;
								callback(bb);

							}

						}
					}).catch(res => {

					})
				}



			},
			//添加照片
			bodyPhotoAdd() {
				let _that = this;
				let lls = _that.bodyPhotoUrl;

				uni.chooseImage({
					count: 9 - lls.length, //上传图片的数量，默认是9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths; //拿到选择的图片，是一个数组
						_that.bodyPhotoUrl = lls.concat(res.tempFilePaths)
						tempFilePaths.map(sos => {
							uni.uploadFile({
								url: 'http://zxyptest.hzbixin.cn/file/upload',
								filePath: sos,
								name: 'file',
								success: function(datas) {
									let results = typeof datas.data === "object" ? datas.data : JSON.parse(datas.data);
									let aa = results.result;
									_that.upUrlList.push(aa)

								},
								fail: function(datas) {}
							})
						})
					}
				});
			},
			// 照片预览
			injuryPreviewImage(index) {
				uni.previewImage({
					current: this.bodyPhotoUrl[index],
					urls: this.bodyPhotoUrl,
					indicator: "number"
				})
			},
			//删除某一项
			delImg(index) {
				let arr = this.bodyPhotoUrl
				arr.splice(index, 1)
				this.bodyPhotoUrl = arr;
				this.upUrlList.splice(index, 1)
			}

		}
	}
</script>

<style>
	.all_pd_lr {
		padding: 0 21rpx;
	}

	.all_pd_l {
		padding-left: 21rpx;
	}

	.all_ma_lr {
		margin: 0 21rpx;
	}

	.all_ma_l {
		margin-left: 21rpx;
	}

	.all_head {
		height: 100rpx;
	}

	.all_bar {
		width: 8rpx;
		height: 28rpx;
		background: linear-gradient(0deg, rgba(255, 127, 176, 1) 0%, rgba(255, 107, 135, 1) 100%);
		border-radius: 4rpx;
		margin-right: 7rpx;
	}

	.all_title {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(65, 65, 65, 1);
	}


	.info_head {}

	.info_bar {}

	.info_title {}

	.info_txt {
		width: 700rpx;
		height: 241rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(0, 0, 0, 1);
		line-height: 36rpx;
	}



	.img_info_head {}

	.img_info_bar {}

	.img_info_title {}

	.img_info_list {}

	.img_info_li {
		width: 220rpx;
		height: 220rpx;
		border-radius: 10rpx;
		margin-right: 23rpx;
		margin-bottom: 23rpx;
	}

	.info_textarea {
		width: 710rpx;
		box-sizing: border-box;
		padding: 20rpx;
		height: 311rpx;
		color: #000000;
		font-size: 26rpx;
		background: rgba(240, 240, 240, 1);
		border-radius: 10rpx;
	}


	.img_info_li {
		position: relative;
	}

	.img_info_li_img {
		width: 100%;
		height: 100%;
	}

	.img_info_li_icon {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		right: -15rpx;
		top: -15rpx;
	}

	.img_info_li {}

	.img_info_li_icon_add {
		width: 100%;
		height: 100%;
	}

	.consult_btn {
		height: 98rpx;
		background: linear-gradient(90deg, rgba(255, 107, 134, 1) 0%, rgba(255, 127, 176, 1) 100%);


		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
</style>
