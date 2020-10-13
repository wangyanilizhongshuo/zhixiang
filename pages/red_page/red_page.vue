<template>
	<view>
		<!-- 弹窗  ----------------------   -->
		<!--  v-if='red_page_cash_show' @click='red_page_cash_show=false' -->
		<div class="red_page_cash_mask z_1000 mask mask_bg" v-if='red_page_cash_show' @tap.stop='red_page_cash_show=false'>
			<div class="red_page_cash_warp">
				<div class="red_page_cash_false ov_hid">
					<img @tap.stop="jumpNext"  src="http://zxyp.hzbixin.cn/files/95061600400579273.jpg" alt="" class="red_page_cash_false_img"  />
				</div>
				<div class="red_page_cash_box relative" @tap.stop="jumpNext"  >
					<img src="http://zxyp.hzbixin.cn/files/73041598325949807.jpg" alt="" class="red_page_cash_box_bg" />
					<div class="red_page_cash_box_info relative">
						<view class="uni-signal">
							<view class="uni-left">{{numericalValue }}</view>
							<view class="uni-right">
								<view class="top">待提现</view>
								<view class="down">元</view>
							</view>
						</view>
						<div class="red_page_cash_tip_box flex_c ">
							<img src="http://zxyp.hzbixin.cn/files/14341600400382526.jpg" alt="" class="red_page_cash_tip_icon" />
							<div class="red_page_cash_tip_txt">累计到{{numericalValue}}元就能提现</div>
						</div>
						<div class="red_page_cash_progress_box relative">
							<div class="red_page_cash_progress relative" :style="'width:'+percents+'%'">
								<div class="red_page_cash_progress_tip_box width_percent">
									<img src=" http://zxyp.hzbixin.cn/files/46021600400803422.jpg" alt="" class="red_page_cash_progress_bg float_r" />
									<div class="red_page_cash_progress_txt txt_over_ell progress_po_a max_width_percent">仅差{{cPrice}}元</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 弹窗 -end ----------------------  -->

		<div class="red_page_info relative">
			<div class="red_page_info_bg_box flex_c ov_hid">
				<img src="http://zxyp.hzbixin.cn/files/38691600399942625.jpg" alt="" class="red_page_info_bg no_shrink">
			</div>
			<div class="red_page_info_content absolute">
				<div class="red_page_info_title">恭喜获得现金</div>
				<!--  flex flex_jc_c -->
				<div class="red_page_info_price_box lh1">
					<span class="red_page_info_price_icon">¥</span>
					<span class="red_page_info_price_num"> {{redDetail.currentAmount ||0.00}}</span>
				</div>
				<div class="red_page_info_price_btn" @tap.stop='nowWithDrawl'>立即提现</div>
			</div>
		</div>
		<div class="received_list_wrap">
			<div class="received_list_title">已领取{{redRecord.length}}个</div>
			<div class="received_list">
				
				<div class="received_li flex"  v-for="(item,index) in redRecord" :key='index' >
					<img :src="item.headPhoto" class="received_li_img no_shrink">
					<div class="received_li_info_box flex_grow flex lh1">
						<div class="received_li_info flex_grow">
							<div class="received_li_name">{{item.nickname}}</div>
							<div class="received_li_time">{{item.createTime}}</div>
						</div>
						<div class="received_li_price_box no_shrink">
							<div class="received_li_price_num">{{item.assistanceAmount}}元</div>
							<!-- <div class="received_li_price_tip_box flex flex_c">
								<img src="http://zxyp.hzbixin.cn/files/96321600413808233.jpg" alt="" class="received_li_price_tip_icon no_shrink">
								<div class="received_li_price_tip_txt">手气最佳</div>
							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				red_page_cash_show: false,
				redDetail:'',
				// 红包砍价的记录
				redRecord:'',
				// 提现的数值
				numericalValue:'',
				percents:'',
				cPrice:''
			}
		},
		onLoad(){		
			this.getRedDetail();
			this.getRedRecord();
			this.getBalance();
			this.getRedzhuli();
		},
		methods: {
			// 领取红包
			getRed(){
				let id =wx.getStorageSync('user').id;
				uni.wjw_http({
					url:'app/cduserredenvelope/getRed',
					type:'post',
					data:{
						userId:id
					}
				}).then(res=>{
					if(res.code ==0){
						this.getRedDetail();
					}
				}).catch(res=>{
					// console.log(res)
				})				
			},
			// 计算还需要砍价多少 以及 进度条的长度                            
			nowWithDrawl(){
				let a=this.redDetail.currentAmount;
				let b=this.numericalValue;
				if(a==b){
					uni.redirectTo({
						url:'/pages/red_page/cash/cash'
					})
				}else{
					this.red_page_cash_show=true;
					this.percents=((a/b)*100);
					this.cPrice=(b-a).toFixed(2);
				}
			},
			// 红包得详情
			getRedDetail(){
				let id =wx.getStorageSync('user').id
				uni.wjw_http({
					url:'app/cduserredenvelope/redInfo',
					type:'post',
					data:{
						userId:id
					}
				}).then(res=>{
					if(res.code ==0){
						this.redDetail=res.data;
						let aa=(new Date()).valueOf();		
						// 监测红包是否失效 失效的话不要限制领取
					
						if(this.redDetail){
							if(this.redDetail.expirationTime <aa){
								
								this.getRed();
							}
						}else{
							// 用户初次登陆
							this.getRed();
							
							
						}
													
					}
				})
			},
			// 红包领取列表
			getRedRecord(){
				let id =wx.getStorageSync('user').id;
				uni.wjw_http({
					url:'app/cduserredenvelope/list',
					type:'get',
					
				}).then(res=>{
					if(res.code ==0){
						
					
					}
				})
			},
		
			// 获取最终余额
			getBalance(){
				let id =wx.getStorageSync('user').id
				uni.wjw_http({
					url:'app/cduserredenvelope/finalAmount',
					type:'get',
					
					data:{
						userId:id
					}
				}).then(res=>{
					if(res.code ==0){
						this.numericalValue=res.data;
						
						
					}
				}).catch(res=>{
					
				})
			},
			//跳转到获取红包的页面
			jumpNext(){
				this.red_page_cash_show=false;
				 if(this.numericalValue ){
					 
				 }
				uni.redirectTo({
					url:'/pages/red_page/active/active?sumMoney='+this.numericalValue+'&sxtime='+this.redDetail.expirationTime+'&precent='+this.percents+'&cPrice='+this.cPrice
				})
			},
			getRedzhuli(){
				let id =wx.getStorageSync('user').id;
				uni.wjw_http({
					url:'app/cduserredenvelopeassistance/list',
					type:'get',
					data:{
						userId:id,
						 limit:4,
						 page:1
						
					}
				}).then(res=>{
					if(res.code==0){
						let a=res.data.list;
						let aa=[];
						// 判断是不是面对面邀请的数据
						a.map((res)=>{
							if(res.assistanceType==4){
								aa.push(res)
							}
						})
						console.log(aa)
						for(let i in aa){
							 let a = new Date(aa[i].createTime);
							aa[i].createTime= a.getFullYear()+"-"+(a.getMonth()+1).toString().padStart(2,'0')+"-"+a.getDate().toString().padStart(2,'0')
							// aa[i].createTime= a.getHours().toString().padStart(2,'0')+":"+a.getMinutes().toString().padStart(2,'0')
						}
						this.redRecord=aa;
					}
					
				})
			}
			
		}
	}
</script>
<style scoped lang="scss">

	.red_page_cash_mask{}
	.red_page_cash_warp{}
	.red_page_cash_false{
		margin-bottom: 32rpx;
	}
	.red_page_cash_false_img{
		float: right;
		width: 60rpx;
		height: 60rpx;
		margin-right: 43rpx;
	}
	.red_page_cash_box{}
	.red_page_cash_box_bg{
		width: 701rpx;
		height: 447rpx;
	}
	.red_page_cash_box_info{
		position: absolute;
		top: 0;
		width: 100%;
		text-align: center;
		padding-top: 228rpx;
	}
	.red_page_cash_tip_box{
		margin-bottom: 100rpx;
	}
	.red_page_cash_tip_icon{
		width: 40rpx;
		height: 40rpx;
		margin-right: 17rpx;
	}
	.red_page_cash_tip_txt{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	.red_page_cash_progress_box{
		width:520rpx;
		height:16rpx;
		background:rgba(205,43,30,1);
		border-radius:8rpx;
		margin: auto;
	}
	.red_page_cash_progress{
		width: 95%;
		height:100%;
		background:rgba(248,223,123,1);
		border-radius:8rpx;
	}
	.red_page_cash_progress_tip_box{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(208,81,59,1);

		position: absolute;
		bottom: calc(100% + 12rpx + (62rpx - 55rpx));
		bottom: calc(100% + 12rpx );
		right: calc(0rpx - (16rpx + 19rpx));
	}
	.red_page_cash_progress_bg{
		width: 151rpx;
		height: 62rpx;
	}
	.red_page_cash_progress_txt{
		padding: 0 12rpx;
		height:55rpx;
		line-height:55rpx;;

		background:rgba(248,223,123,1);
		border-radius:8rpx;
	}
	.progress_po_a{
		/* absolute po_top po_right  */
		position: absolute;
		top: 0;
		right: 0;
	}
	.red_page_info_bg{

		width: 992rpx;
		height: 571rpx;
		margin-top: -10rpx;
	}
	.red_page_info_content{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		padding-top: 85rpx;
		text-align: center;
	}
	.red_page_info_title{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(254,211,167,1);
		margin-bottom: 64rpx;
	}
	.red_page_info_price_box{
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(250,226,182,1);
		margin-bottom: 70rpx;
	}
	.red_page_info_price_icon{
		font-size:50rpx;
		margin-right: 1em;
	}
	.red_page_info_price_num{
		font-size:100rpx;
	}
	.red_page_info_price_btn{
		margin: auto;
		width:430rpx;
		height:80rpx;
		line-height:80rpx;
		text-align: center;

		background:rgba(240,223,167,1);
		border-radius:8rpx;

		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(224,96,76,1);
	}
	.received_list_wrap{
		padding: 0 20rpx;
	}
	.received_list_title{
		height: 100rpx;
		line-height: 100rpx;

		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(87,87,87,1);
	}
	.received_li{
		padding-top: 25rpx;
		height: 130rpx;
		box-sizing: border-box;
	}
	.received_li_img{
		width: 84rpx;
		height: 84rpx;
		margin-right: 27rpx;
	}
	.received_li_info_box{
		border-bottom: 1rpx solid rgba(244,244,244,1);
	}
	.received_li_info{}
	.received_li_name{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(19,19,19,1);
		margin-bottom: 25rpx;
	}
	.received_li_time{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(142,142,142,1);
	}
	.received_li_price_box{}
	.received_li_price_num{
		font-size:34rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(17,17,17,1);
		margin-bottom: 25rpx;
	}
	.received_li_price_tip_box{
		opacity: 0;
	}
	.received_li_price_tip_icon{
		width: 30rpx;
		height: 30rpx;
		margin-right: 5rpx;
	}
	.received_li_price_tip_txt{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(239,150,26,1);
	}
	.best_received_li{}
	.best_received_li .received_li_price_tip_box{
		opacity: 1;
	}
 .uni-signal{
	 position: absolute;
	 // width:300rpx;
	 height:150rpx;
	 padding:20rpx 0rpx;
	 top:25rpx;
	 left:260rpx;
	 display: flex;
	 justify-content: space-between;
	 align-items: center;
	 color: red;
	.uni-left{
		 font-size: 90rpx;
		 margin-right:40rpx;
	 }
	 .uni-right{
		 flex:1;
		 height:90rpx;
		 display: flex;
		 flex-direction: column;
		 justify-content: space-between;
		 align-items: center;
		 .top{
			 width:80rpx;
			 height:30rpx;
			 font-size: 20rpx;
			 background-color: white;
			 border-radius: 20rpx;
		 }
		 .down{
			 font-size: 40rpx;
		 }
		 
	 }
 }







</style>
