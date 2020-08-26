<template>
	<view class="uni-active" style="background-color: #ee5b4e;">
		 <!-- v-if="videoMask && redRainFlag && videoFlag" -->
		<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/red_page_active_bg.png"
		 alt="" class="active_bg">
		<div  class="active_content relative ta_c  ">
			<div class="active_top_info_box ov_hid">
				<div class="active_all_price">今日已送出现金 ¥ 18398233</div>
				<div class="active_info_box">
					<div class="active_info margin_auto ov_hid">
						<div class="active_tips flex flex_c lh1">
							<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/crown@2x.png" alt=""
							 class="active_tip_icon no_shrink">
							<div class="active_tip_txt">手气最佳</div>
						</div>
						<div class="cash_btn flex_c" @click='jump' data-url='/pages/red_page/cash/cash'>
							<span class="cash_btn_txt">提现</span>
							<span class="cash_btn_icon">></span>
						</div>
						<div class="active_price_box lh1">
							<span class="active_price_icon">¥</span>
							<span class="active_price_num">{{sumMoney}}</span>
						</div>
						<div class="active_price_bd margin_auto "></div>
						<div class="active_time">{{djsTime}}后现金将失效</div>
					</div>
					<div class="active_share_btn flex_c margin_auto">分享给好友，再领一次现金</div>
					<div class="active_rule">规则说明</div>
				</div>
			</div>
			<div class="active_category_list flex flex_jc_e">
				<div class="active_category_li" @tap.stop="videoOccur">
					<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/watch_veido@2x.png"
					 alt="" class="active_category_li_img">
				</div>
				<div class="active_category_li" @tap.stop="redRainOccur">
					<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/redbag_rain@2x.png"
					 alt="" class="active_category_li_img">
				</div>
				<div class="active_category_li" @tap.stop="inviteFlag=true">
					<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/scan_qrcode@2x.png"
					 alt="" class="active_category_li_img">
				</div>
			</div>
			<div class="record_list_warp">
				<div class="record_list_title record_bd ">现金记录</div>
				<div class="record_list_tip record_mg ">帮好友助力也可以领到现金噢</div>
				<div class="record_list record_mg ">
					<div class="record_li flex best_record_li record_bd_top ta_l " v-for="(item,index) in 15" :key='index'>
						<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/pc_head1.png" alt=""
						 class="record_li_img no_shrink">
						<div class="record_li_info_box flex_grow flex lh1">
							<div class="record_li_info flex_grow flex flex_column flex_jc_b">
								<div class="record_li_name">大胖胖</div>
								<div class="record_li_time">天天领红包，好运永不停</div>
							</div>
							<div class="record_li_price_box no_shrink flex_c">
								<div class="record_li_price_num">已获得283.76元</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 红包雨的遮罩层提示 -->
		<view class="rainMaskssss"  v-if="rainflagsss"></view>
		<view class="uni-redRainMask" v-if="!videoMask">
			<view class="uni-content">
				<image src="../../../static/cancel.png" class="uni-cancel" @tap.stop="videoMask=true,rainflagsss=false"></image>
				<image class="uni-image" src="http://zxyp.hzbixin.cn/files/13521597214805445.jpg"></image>
				<view class="uni-btn" @click="beginBattle">开始挑战</view>
			</view>
		</view>
		<!-- 点击视频观看 遮罩 -->
		     <view class="videooooMask" v-if="videoFlags"></view>
		    <view class="uni-videoMask" v-if="!videoFlag">
			<view class="uni-content" v-if="videoConFlag">
				<image class="cancel " src="../../../static/cancel.png" @tap.stop="videoFlag=true,videoFlags=false"></image>
				<view class="uni-video">
					<video class="video" @timeupdate="autoEnd" autoplay page-gesture controls id="myVideo" src="http://zxyp.hzbixin.cn/files/64101595293657312.mp4"></video>
				</view>
				<view class="btn" v-if="videoBtnFlag">看完领红包({{(watchTimes) ||15}}s)</view>
				<view class="btn btnStyle" v-if="!videoBtnFlag" @tap.stop="videoBtn" >立即领取</view>
			</view>
			</view>
		<!-- 红包雨的设置 -->
		<view v-for="(items,index) in packetList" :key="index" v-if="!redRainFlag">
			<image class="red-packet" :src="items.src" :style="'position:fixed;top:'+items.top+'px;left:'+items.left+'px;-webkit-transition:'+items.speed+'ms linear 0ms;transition:'+items.speed+'ms linear 0ms'"
			 @tap.stop='tapImages'>
			</image>
		</view>
		<!-- 点击红包的div -->
		<view class="uni-clickRed" v-if="redFlag">
			<image class="red" src="http://zxyp.hzbixin.cn/files/89271597215516079.jpg" @tap.stop="redSmallMoneyFlag=true,redFlag=false">
			</image>
		</view>
		<!-- 点击红包之后的金额显示 -->
		<view class=" uni-clickRedOpen" v-if="redSmallMoneyFlag">
			<!-- <image class="cancel" src="../../../static/cancel.png" @tap.stop="redSmallMoneyFlag=false"></image> -->
			<image class="red" src="http://zxyp.hzbixin.cn/files/41481597215595070.jpg" @tap.stop="redSmallMoneyFlag=false"></image>
			<view class="uni-title"@tap.stop="redSmallMoneyFlag=false">
				<view class="word">恭喜获得</view>
				<view class="word">此红包</view>
			</view>
		</view>
		<!-- 红包雨结束之后弹出的框 结算总金额 -->
		<view class="uni-RedRainAllSum" id="animation" v-if="redRainAllSumFlag">
			<image class="cancel " src="../../../static/cancel.png" @tap.stop="redRainAllSumFlag=false,videoMask=true,redRainFlag=true,
			rainflagsss=false"></image>
			<image class="image" src="http://zxyp.hzbixin.cn/files/78781597215788808.jpg"></image>
			<view class="content">
				<!-- <view class="first">恭喜获得<text class="money">0.12</text>元现金</view> -->
				<view class="first">恭喜获得红包</view>
				<view class="second">已存入现金账户</view>
				<view class="third">¥<text class="nn">{{redSmallMoney}}</text></view>
			</view>
			<button class="bottom" open-type="share">
				<image class="logo" src="http://zxyp.hzbixin.cn/files/25481597217656399.jpg"></image>
				<view class="go">分享给好友</view>
			</button>
		</view>
           <!-- 视频里面相应的弹框 -->
		   <!-- <view class="uni-RedRainAllSumss"></view> -->
		   <view class="uni-RedRainAllSum" id="animation"  v-if="videoMoneyFlag">
				<image class="cancel " src="../../../static/cancel.png" @tap.stop="videoMask=true,videoFlags=false,redRainFlag=true,videoMoneyFlag=false,videoFlag=true"></image>
				<image class="image" src="http://zxyp.hzbixin.cn/files/86041597371670973.jpg"></image>
				<view class="content">
		   		<!-- <view class="first">恭喜获得<text class="money">0.12</text>元现金</view> -->
					<view class="first">恭喜获得红包</view>
					<view class="second">已存入现金账户</view>
					<view class="third">¥<text class="nn">{{videoMoney}}</text></view>
		    	</view>
				<button class="bottom" open-type="share">
					<!-- <image class="logo" src="http://zxyp.hzbixin.cn/files/25481597217656399.jpg"></image> -->
					<image class="logo" src="data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACb0lEQVQ4T62UPWhTURTHf+e99Au7KCqF0qWgBRWKeVSokzqIFh1EK9KkqOjQQQdpXungUPBjaFIcdFGhi41VCw4OLbjUoZMkqRURFysOrW5SwY80effIe0lD2qYfQu/27v2f3z3n/O95whYvWcnrzFzfVWVqj1hok4EqVOftapl60pr4spm7S8DOdzcaq/OhQeC8CKHyYEVVkEmD6XvqDKXXAwfAyHRvG8YaF9i5nliVvIheG3ESD9fSiV9ijdZ+AHYr5EV5jtAONBeCNIfIqBo9KiJNgFFjTiXbhiYqQSWScROi9AahMJl04sei0+5VDI8LezKRdAY7oik3hhAv6j4lnfi+QsjyJdG0+3kpG79XwGuBAyCNRanx9wAHdEGxJlGT8yzrzrPw4PwqYCTl5laaUKGUr4KfnbYqchpoCDSic6LW2N9sLjF2+N5csBVNu99KgkpNUWZV9L4gd4G6imYIP9QzEb+vEk3HhkEur+muar+K3BYIoXwH/YnI3qJ+VlWrfLNU9Y+lHJKu9/3NksvPCFK/GqozCvOCnCw63uN53pRth/xXgYrpKFRujRfM0pfBO4ym3RMK/seykhSG/WOB6uJlvxWyAtuLbi+A2kvJKCyUJqUr5XZawosVWT4CrgD2eg++7OxXCRhJubdE6DbKA0uCDFqADHAWCG8KqPjTVliRlHt8sW7bm7H9A4vlwd2Z2AVVGd0YqFnLDrWv+ttUCiyfpjXAOYSLI+H46KaAQQXp2BlBbip6UJClOH+KPODViBM/Fzi+cSnLFZfeug1Z8i1YlpdfNB9ratih2H17wvU9AzJg/hu4UQJbDvwHe1HobjCwx2QAAAAASUVORK5CYII="></image>
					<view class="go">分享给好友</view>
				</button>
		   </view>

		<!-- 面对面邀请 -->
		<view class="uni-invite-code" v-if="inviteFlag">
              <view class="uni-code-content">
				 <image class="img" src="http://zxyp.hzbixin.cn/files/37291597214656386.jpg"></image> 
				 <image class="cancel" src="../../../static/cancel.png" @tap="inviteFlag=false"></image>
				 <image class="erweima" src="http://zxyp.hzbixin.cn/files/17631597216155587.jpg"></image>
			  </view>
		</view>
		<view v-if="hbyOccur" class="hbystyle">  
		</view>
		<view class="uni-cont" v-if="hbyOccur" >
			<view class="content" >
			    以下时间段出现红包雨
			</view>
			<view class="contents" v-for="(item,index) in timeList" :key="index">						
				  <view> {{item.startTime}}</view>  ~
				  <view>{{item.endTime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//点击 红包雨之前的遮罩层
				videoMask: true,
				// 红包雨的出现 为false 出现
				redRainFlag: true,
				// 在后端返回的时间内 才会有红包雨
				rainOccurFlag: false,
				// 红包雨出现后 点击红包雨 出现大红包
				redFlag: false,
				// 点击红包之后 数值出现
				redSmallMoneyFlag: false,
				// 红包雨总金额
				redRainAllSumFlag: false,
				redSmallMoney: 0,
				windowWidth: "", //窗口宽度
				windowHeigh: "", //窗口高度
				packetList: [{}], //红包队列
				packetNum: 100, //总共红包的数量
				showInter: '', //  循环动画定时器
				top: '',
				// 面对面邀请 二维码
				inviteFlag: false,
				// 个人领取红包得Id
				personMsg: 0,
				// 视频点击的flag
				videoFlag: true,
				videoBtnFlag:true,
				watchTimes:0,
				// 视频金额的弹框
				videoMoneyFlag:false,
				// 视频里面的内容
				videoConFlag:true,
				videoMoney:0,
				videoFlags:false,
				rainflagsss:false,
				// 红包雨 没有的时候 提示
				hbyOccur:false,
				
				timeList:[],
				// 红包总金额
				sumMoney:'',
				// 失效的时间
				sxtime:'',
				djsTime:''

			}
		},
		onLoad(options) {
			let that = this;
			// 红包雨
			wx.getSystemInfo({
				success: function(res) {
					that.windowWidth = res.windowWidth;
					that.windowHeigh = res.windowHeight;
					that.top = res.windowHeight - 800; //设置红包初始位置				
				}
			})
			this.getPerson();
			this.getRedRainDetail();
			this.getVideo();
            this.setData(options);
		     // 失效的时间
			 let aa=(new Date()).valueOf();//25 16-34-07
			 if(this.sxtime >aa){
				let bb =parseInt((this.sxtime-aa)/1000)
				let h=parseInt(bb/(60*60)%24);
				let m=parseInt(bb/60%60);
				let s=(bb%60);
				this.djsTime=h+':'+m+':'+s;		
			}
		},
		onShareAppMessage() {
			return {
				path: "/pages/red_page/active/active"
			};
		},
		methods: {
			// 红包雨开始挑战
			beginBattle() {
				// 红包雨提示的信息去掉
				this.videoMask = true;
				// 整体的页面  因为 redRain 为false 还是不会出现 必须 videoMask  和 redRain  都是true 
				this.redRainFlag = false;
				this.redRain();
			},
			// 红包雨 是否在启动的时间内
			redRainOccur() {
				if (this.rainOccurFlag == true) {
					this.videoMask = false;
					this.rainflagsss=true;
					this.getRedRainMoneny()
				}else{
					this.hbyOccur=true;
					setTimeout(()=>{
						this.hbyOccur=false;
					},3000)
				}
			},
			// 红包雨打开
			redRain() {
				// https://blog.csdn.net/qq_36934826/article/details/80772722?utm_source=blogxgwz6
				let that = this;
				let packetList = [{
					top: '',
					left: '',
					src: '',
					speed: ''
				}];
				let srcList = ["http://zxyp.hzbixin.cn/files/49781597215660082.jpg", "http://zxyp.hzbixin.cn/files/49781597215660082.jpg"];
				for (let i = 0; i < that.packetNum; i++) {
					// 生成随机位置（水平位置）
					let left = Math.random() * that.windowWidth - 160;
					// 优化位置，防止红包越界现象，保证每个红包都在屏幕之内
					if (left < 0) {
						left += 160;
					} else if (left > that.windowWidth) {
						left -= 160;
					}
					// 建立临时单个红包
					let packet = {
						src: srcList[Math.ceil(Math.random() * 3) - 1],
						top: -160,
						left: left,
						speed: Math.random() * 2500 + 3000 //生成随机掉落时间，保证每个掉落时间保持在3秒到5.5秒之间
					}
					// 将单个红包装入临时红包列表
					packetList.push(packet);
					// 将生成的临时红包列表更新至页面数据，页面内进行渲染
					that.packetList = packetList;
				}

				// 初始化动画执行当前索引
				var tempIndex = 0;
				// 开始定时器，每隔1秒掉落一次红包
				that.showInter = setInterval(function() {
					// 生成当前掉落红包的个数，1-3个
					var showNum = Math.ceil(Math.random() * 2);
					// 防止数组越界
					if (tempIndex * showNum >= that.packetNum) {
						// 如果所有预生成的红包已经掉落完，清除定时器
						// 加入定时器迟一点出来就好 不然红包没有在界面全部消失
						// 点开得红包可能没有 点走开
						let timer = setTimeout(() => {
							that.redFlag = false;
							that.redSmallMoneyFlag = false;
							that.redRainAllSumFlag = true;
							clearTimeout(timer)
						}, 3500)
						clearInterval(that.showInter);

					} else {
						switch (showNum) {
							case 1:
								//设置临时红包列表当前索引下的top值，此处top值为动画运动的最终top值 
								packetList[tempIndex].top = that.windowHeigh;
								// 当前次掉落几个红包，索引值就加几
								tempIndex += 1;
								break;
							case 2:
								packetList[tempIndex].top = that.windowHeigh;
								packetList[tempIndex + 1].top = that.windowHeigh;
								tempIndex += 2;
								break;
							case 3:
								packetList[tempIndex].top = that.windowHeigh;
								packetList[tempIndex + 1].top = that.windowHeigh;
								packetList[tempIndex + 2].top = that.windowHeigh;
								tempIndex += 3;
								break;
							default:

						}
						// 更新红包列表数据
						that.packetList = packetList


					}
				}, 500)

			},
			//点击某个红包
			tapImages() {
				var score = Math.ceil(Math.random() * 100);
				// 红包出现
				this.redFlag = true;
			},
			// 红包雨的时长
			getRedRainDetail() {
				uni.wjw_http({
					url: 'app/cdredenveloperain/list',
					type: 'get'
				}).then(res => {
					if (res.code == 0) {
						
						// 红包雨的开始和 结束时间 转化为秒进行对比
						let aa =res.data;
						this.timeList=aa;
						let flag=aa.some(res=>{
							let start = res.startTime;
							let end = res.endTime;
							let startTime = 0;
							let endTime = 0;
							let hour = start.split(':')[0];
							let min = start.split(':')[1];
							let sec = start.split(':')[2];
							startTime = Number(hour * 3600) + Number(min * 60) + Number(sec);
							let hour1 = end.split(':')[0];
							let min1 = end.split(':')[1];
							let sec1 = end.split(':')[2];
							endTime = Number(hour1 * 3600) + Number(min1 * 60) + Number(sec1);
							// 获取当前时间的时分秒
							let hh = new Date().getHours()
							let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() :
								new Date().getMinutes()
							let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() :
								new Date().getSeconds()
							let Timeinit = hh + ':' + mf + ':' + ss;
							let hour2 = Timeinit.split(':')[0];
							let min2 = Timeinit.split(':')[1];
							let sec2 = Timeinit.split(':')[2];
							let nowTime = Number(hour2 * 3600) + Number(min2 * 60) + Number(sec2);				
							// if (nowTime >= startTime && nowTime <= endTime) {
							// 	this.rainOccurFlag = true;
							// 	console.log(this.rainOccurFlag )
							// } else {
							// 	this.rainOccurFlag = false;
							// 	console.log(this.rainOccurFlag )
						
							// }
							return (nowTime >= startTime && nowTime <= endTime) 
						})
						
						if(flag ==true){
							this.rainOccurFlag = true;
							
						}else{
						 	this.rainOccurFlag = false;
							
						}
						
					}
				})
			},
			// 获取个个领取红包的id
			getPerson() {
				let id = wx.getStorageSync('user').id
				uni.wjw_http({
					url: 'app/cduserredenvelope/redInfo',
					type: 'post',
					data: {
						userId: id
					}
				}).then(res => {
					if (res.code == 0) {
						this.personMsg = res.data;
						// 个人信息出来 获取二维码
						// this.getQRerweima();
					}
				})
			},
			// 红包雨结束之后 获取的红包	
			getRedRainMoneny() {
				let that = this;
				let a = that.personMsg;
				uni.wjw_http({
					url: 'app/cduserredenvelopeassistance/assistance',
					type: 'post',
					data: {
						userId: a.userId,
						envelopeId: a.id,
						assistanceType: 3
					}
				}).then(res => {
					if (res.code == 0) {
						this.redSmallMoney = res.data;
					}
				})
			},
			// 点击视频
			videoOccur() {
				this.videoFlag = false;
				this.videoFlags=true;
				
			},
			// 得到视频的列表
			getVideo() {
				uni.wjw_http({
					url: 'app/cduserredvideoconfig/list',
					type: 'get',
					data: {
						page: 1,
						limit: 3
					}
				}).then(res => {
					this.videoList = res.data.list[0]
					this.watchTimes=(res.data.list[0].watchTime)/1000
				})
			},
			// 监测 观看视频的时长
			autoEnd(e) {
                let that = this;
				// 观看时间可能没有
				let limit=that.videoList.watchTime;
				if(!limit ){
					limit =15000
				}
				if(e.timeStamp>limit){
					this.videoBtnFlag=false;
				}
			},
			 // 观看视频的btn
			videoBtn(){
				let a = this.personMsg;
				let videoId=this.videoList.id;
				uni.wjw_http({
					url: 'app/cduserredenvelopeassistance/assistance',
					type: 'post',
					data: {
						userId: a.userId,
						videoId:videoId,
						envelopeId: a.id,
						assistanceType: 2
					}
				}).then(res => {
					if (res.code == 0) {
						this.videoMoney=res.data
						this.videoMoneyFlag=true;
						this.videoConFlag=false;
						this.videoFlag=false;
					}else{
						this.videoMoneyFlag=false;
						this.videoConFlag=false;
						this.videoFlag=true;
					}
				}).catch(res=>{
					this.videoMoneyFlag=false;
					this.videoConFlag=false;
					this.videoFlag=true;
				})
			},
			// 二维码
			// getQRerweima(){
			// 	let a = this.personMsg;
			// 	let id =wx.getStorageSync('user').id;
			// 	uni.wjw_http({
			// 		url:'app/cduserredenvelope/getQrCode',
			// 		data:{
			// 			page:'pages/index/index',
			// 			scene:a.id
			// 		}
			// 	}).then(res=>{
			// 		console.log(res)
			// 	})
			// }
		}
	}
</script>

<style scoped lang="scss">
	.hbystyle{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		background-color: #000;
		opacity: 0.5;}
		.uni-cont{
			width: 400rpx;
			height: 290rpx;
			background-color: #fff;	
			position: absolute;
			z-index:12;
			left:175rpx;
			top:350rpx;
			border-radius: 10rpx;
			padding:30rpx;
			box-sizing: border-box;			
			text-align: center;	
			.contents{
					display: flex;
					width:320rpx;
					justify-content: space-between;
					margin: 20rpx 0;	 
				
			}
		}			
		
	.red-packet {
		width: 160rpx;
		height: 170rpx;
		z-index: 20;
		transition-property: transform, top;
		transform-origin: 50% 50% 0;
		-webkit-transition-property: transform, top;
		-webkit-transform-origin: 50% 50% 0;
	}

	// 红包雨的样式
	.rainMaskssss{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		background-color: #000;
		opacity: 0.7;
	}
	.uni-redRainMask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 11;
		.uni-content {
			width: 614rpx;
			position: relative;
			margin: 0 auto;
			margin-top: 254rpx;

			.uni-image {
				width: 580rpx;
				height: 517rpx;
			}

			.uni-cancel {
				width: 60rpx;
				height: 60rpx;
				position: absolute;
				right: 0rpx;
				top: -60rpx;
			}

			.uni-btn {
				width: 570rpx;
				height: 98rpx;
				position: absolute;
				bottom: -5rpx;
				left: 22rpx;
				line-height: 98rpx;
				text-align: center;
				background: rgba(248, 223, 123, 1);
				border-radius: 16px;
			}
		}
	}
.videooooMask{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 10;
	background-color: #000;
	opacity: 0.5;
}
	//视频点击 
	.uni-videoMask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 20;
		}
		.uni-content {
			width: 700rpx;
			margin-top: 254rpx;
			margin-left:25rpx;
			
			.cancel {
				width: 60rpx;
				height: 60rpx;
				position: absolute;
				top: 127rpx;
				right: 60rpx;
			}
			.uni-video {
				.video {
					width: 700rpx;
					height: 500rpx;
				}
			}
		    .btn{
				width:500rpx;
				height:88rpx;
				background:rgba(156,156,156,1);
				border-radius:10px;
				line-height: 88rpx;
				margin:50rpx auto;
				text-align: center;
				font-size: 32rpx;
			}
			.btnStyle{
				background:rgba(248,223,123,1);
				color:#D0513B;
			}
		  }
	

	//点击红包
	.uni-clickRed {
		position: absolute;
		z-index: 30;
		top: 235rpx;
		left: 130rpx;
		.cancel {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			top: -80rpx;
			right: -80rpx;
		}
		.red {
			width: 490rpx;
			height: 650rpx;
		}
	}
	// 打开红包
	.uni-clickRedOpen {
		position: absolute;
		z-index: 30;
		top: 235rpx;
		left: 130rpx;
		.red {
			width: 490rpx;
			height: 650rpx;
		}
		.cancel {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			top: -80rpx;
			right: -55rpx;
		}
		.uni-title {
			position: absolute;
			width: 360rpx;
			top: 100rpx;
			left: 70rpx;
			font-size: 35rpx;
			text-align: center;
			.word {
				font-size: 50rpx;
				color: #9a5233;
			}
		}
	}
	// 红包结束,剩余的总金额
	.uni-RedRainAllSum {
		position: absolute;
		z-index: 40;
		top: 287rpx;
		left: 26rpx;
		.image {
			width: 701rpx;
			height: 685rpx;
		}
		.cancel {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			top: -60rpx;
			right: 40rpx;
		}
		.content {
			width: 430rpx;
			position: absolute;
			top: 116rpx;
			left: 138rpx;
			text-align: center;
			.first {
				color: #9A5233;
				font-weight: bold;
				font-size: 46rpx;
				.money {
					color: #E82C22;
				}
			}
			.second {
				font-weight: Medium;
				color: #9A5233;
				font-size: 36rpx;
				margin: 36rpx 0 43rpx;
			}
			.third {
				font-weight: bold;
				color: #9B5233;
				font-size: 50rpx;
				.nn {
					font-size: 90rpx;
				}
			}
		}
		.bottom {
			position: absolute;
			left: 84rpx;
			bottom: 64rpx;
			width: 535rpx;
			height: 110rpx;
			background: url(http://zxyp.hzbixin.cn/files/70861597215863284.jpg) no-repeat 0 0;
			background-size: 535rpx 123rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.logo {
				display: block;
				width: 40rpx;
				height: 40rpx;
				margin-right: 5rpx;
			}
			.go {
				color: #D0513B;
				font-size: 32rpx;
			}
		}
	}
	#animation {
		-webkit-animation: fadeInLeft 1s .2s ease both;
		-moz-animation: fadeInLeft 1s .2s ease both;
	}
	@-webkit-keyframes fadeInLeft {
		0% {
			opacity: 0;
			-webkit-transform: translateX(-20px)
		}
		100% {
			opacity: 1;
			-webkit-transform: translateX(0)
		}
	}
	@-moz-keyframes fadeInLeft {
		0% {
			opacity: 0;
			-moz-transform: translateX(-20px)
		}
		100% {
			opacity: 1;
			-moz-transform: translateX(0)
		}
	}
	// 二维码邀请
	.uni-invite-code{
	     position: fixed;
	     top: 0;
	     left: 0;
	     right: 0;
	     bottom: 0;
	     z-index: 10;
	     background-color: #000;
	     opacity: 0.9;
		 .uni-code-content{
			width:672rpx;
			height:642rpx;
			margin-left:40rpx;
			margin-top:150rpx;
			text-align: center;
			.img{
				width:672rpx;
				height:642rpx;
			}
			.erweima{
				width:270rpx;
				height:270rpx;
				position:absolute;
				top:325rpx;
				left:262rpx;
			}
			.cancel{
				width:40rpx;
				height:40rpx;
				margin-top:23rpx;
			}
		 }
			
	}

	.uni-active {
		width: 750rpx;
		position: relative;
		top: 0rpx;
		left: 0rpx;
	}
	.active_bg {
		/* 750 * 1700 */
		width: 750rpx;
		height: 1700rpx;
		position: absolute;
		top: 0;
		left: 0;
	}
	.active_top_info_box {
		height: 830rpx;
	}
	.active_all_price {
		margin: auto;
		text-align: center;
		max-width: 495rpx;
		height: 62rpx;
		line-height: 62rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(254, 233, 133, 1);
		margin-top: 148rpx;
		margin-bottom: 43rpx;
	}
	.active_info_box {}
	.active_info {
		width: 550rpx;
		height: 305rpx;
		position: relative;
		margin-bottom: 55rpx;
	}
	.active_tips {
		margin-top: 55rpx;
		margin-bottom: 40rpx;
	}
	.active_tip_icon {
		width: 30rpx;
		height: 30rpx;
		margin-right: 5rpx;
	}
	.active_tip_txt {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(239, 150, 26, 1);
	}
	.cash_btn {
		width: 106rpx;
		height: 50rpx;
		background-color: #fedddc;
		border-radius: 25rpx 0rpx 0rpx 25rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(224, 46, 36, 1);
		position: absolute;
		right: 0;
		top: 37rpx;
	}
	.cash_btn_txt {
		margin-right: 9rpx;
	}
	.active_price_box {
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(224, 46, 36, 1);
		margin-bottom: 40rpx;
		height: 76rpx;
	}
	.active_price_icon {
		font-size: 50rpx;
	}
	.active_price_num {
		font-size: 100rpx;
	}
	.active_price_bd {
		width: 249rpx;
		height: 3rpx;
		font-size: 18rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(253, 212, 210, 1);
		margin-bottom: 20rpx;
	}
	.active_time {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(145, 89, 86, 1);
	}
	.active_share_btn {
		width: 490rpx;
		height: 80rpx;
		background-color: #fede69;
		box-shadow: 2rpx 7rpx 7rpx 0rpx rgba(195, 53, 37, 0.44);
		border-radius: 10rpx;
		margin-bottom: 28rpx;
		font-family: PingFang-SC-Bold;
		font-size: 26rpx;
		font-weight: bold;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #e03025;
	}
	.active_rule {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
	.active_category_list {
		height: 213rpx;
		box-sizing: border-box;
		padding-top: 47rpx;
	}
	.active_category_li {
		width: 139rpx;
		height: 142rpx;
	}
	.active_category_li_img {
		width: 100%;
		height: 100%;
	}
	.record_list_warp {
		margin: 0 30rpx;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 16rpx;
	}
	.record_bd {
		border-bottom: 1rpx solid rgba(255, 139, 120, 1);
	}
	.record_bd_top {
		border-top: 1rpx solid rgba(255, 139, 120, 1);
	}
	.record_mg {
		margin: 0 33rpx;
	}
	.record_list_title {
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 245, 174, 1);
		line-height: 82rpx;
	}
	.record_list_tip {
		font-size: 26rpx;
		line-height: 95rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(254, 238, 167, 1);
	}
	.record_list {}
	.record_li {
		padding: 25rpx 0;
		height: 130rpx;
		box-sizing: border-box;
	}
	.record_li_img {
		width: 84rpx;
		height: 84rpx;
		margin-right: 27rpx;
	}
	.record_li_info_box {
		/*border-bottom: 1rpx solid rgba(244,244,244,1);*/
	}
	.record_li_info {}
	.record_li_name {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 245, 174, 1);
	}
	.record_li_time {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(254, 219, 153, 1);
	}
	.record_li_price_box {}
	.record_li_price_num {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 245, 174, 1);
	}
</style>
