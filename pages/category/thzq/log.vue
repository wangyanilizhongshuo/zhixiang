<template>
	<view>
		<div class="log_list bg_white">
			<div class="log_li flex lh1" v-for="(item,index) in recordList" :key='index'>
				<div class="log_li_left flex_grow">
					<div class="log_li_txt">{{item.changeTypeDesc}}  充值 {{item.changeSpecialBalance}}</div>
					<div class="log_li_tip">余额：{{item.beforeSpecialBalance}}</div>
				</div>
				<div class="log_li_right ta_r">
					<div class="log_li_time">{{item.createTime}}</div>
					<div class="log_li_num">+ {{item.changeSpecialBalance}}</div>
				</div>
			</div>
		</div>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				recordList:[],
				pageSize:1,
				page:1
			}
		},
		onLoad(){
			this.getRecord()
		},
		onReachBottom(){
			if(this.pageSize>this.page){
				this.page=this.page+1;
				this.getRecord()
			}
		},
		methods: {
			getRecord(){
				let that =this;
				let id =wx.getStorageSync('user').id;
				uni.wjw_http({
					url:'app/cduserspecialbalancechangerecord/list',
					type:'get',
					data:{
						userId:id,
						page:this.page,
						pageSize:10
					}
				}).then(res=>{
				     if(res.code ==0){
						that.pageSize=res.data.totalPage;
						let aa=res.data.list;
						for(let i in aa){
							 let a = new Date(aa[i].createTime);
							aa[i].createTime= a.getFullYear()+"-"+(a.getMonth()+1).toString().padStart(2,'0')+"-"+a.getDate().toString().padStart(2,'0')+" "+a.getHours().toString().padStart(2,'0')+":"+a.getMinutes().toString().padStart(2,'0')+":"+a.getSeconds().toString().padStart(2,'0')
						}
						let bb =that.recordList;	
						that.recordList=bb.concat(aa);
					 }
				})
			}
		}
	}
</script>

<style>
	body{
		background: #F0F0F0;
	}
	
	.log_list{}
	.log_li{
		height:122rpx;
		background:rgba(255,255,255,1);
		padding: 0 30rpx;
	}
	.log_li+
	.log_li{
		border-top: 1px solid #F0F0F0;
	}
	.log_li_left{}
	.log_li_txt{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(0,0,0,1);
		/*line-height:41rpx;*/
		margin-top: 24rpx;
	}
	.log_li_tip{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(0,0,0,1);
		/*line-height:41rpx;*/
		margin-top: 24rpx;
	}
	.log_li_right{}
	.log_li_time{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(191,191,191,1);
		/*line-height:41rpx;*/
		margin-top: 24rpx;
	}
	.log_li_num{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(0,0,0,1);
		/*line-height:41rpx;*/
		margin-top: 32rpx;
	}
</style>
