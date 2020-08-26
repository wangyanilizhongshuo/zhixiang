<template>
	<view  class="uni-myzixun">
			<view class="uni-content"
				v-for="(item,index) in getRecordList" :key='index'>	
				<!-- @click='jump' data-url='/pages/category/mybk/prof/consult/info/info' -->
		     <!-- <text>客服帮助</text> -->
			    <button hover-class="none" class="btn uni-left"    >
			    <!-- <button hover-class="none" class="btn uni-left"    open-type="contact" sessionFrom="weapp"> -->
				    <img :src="item.expertCover" alt="" class="consult_li_img ">
				</button>
				<button hover-class="none" class="btn uni-right"   >
				<!-- <button hover-class="none" class="btn uni-right"    open-type="contact" sessionFrom="weapp"> -->
					<view class="uni-up ">
						  <view  class="name">{{item.expertName}}</view>
						 <view class="time">{{item.createTime}}</view>
					</view>
					<view class="description">{{item.issues}}</view>
			   </button>
			</view>
		</view>
</template>
<script>
	export default {
		data() {
			return {
				pages:1,
				getRecordList:[],
				total:''
			}
		},
		onLoad() {
          this.getRecord(1);
		},
		onReachBottom(){
			if(this.total>this.pages){
				 this.pages+=1;
		         this.getRecord(this.pages)
			}
		 
		},
		methods: {
			getRecord(page){
				let that=this;
				that.pages=page;
				let userId=uni.getStorageSync('user').id;
				 let token=uni.getStorageSync('token');
				uni.wjw_http({
				    url: 'app/cdexpertconsultationrecord/list',
				    method: 'get',
					data:{
						 userId:userId,
						 page:that.pages,
						 limit:10,
						 token:token
						
					}
				}).then(res => {	
					if(res.code ==0){
						that.total=res.data.totalPage;
						let aa=res.data.list;
						for(let i in aa){
							 let a = new Date(aa[i].createTime);
							aa[i].createTime= a.getFullYear()+"-"+(a.getMonth()+1).toString().padStart(2,'0')+"-"+a.getDate().toString().padStart(2,'0')+" "+a.getHours().toString().padStart(2,'0')+"-"+a.getMinutes().toString().padStart(2,'0')+"-"+a.getSeconds().toString().padStart(2,'0')
						}
						let bb =that.getRecordList;				
						that.getRecordList=bb.concat(aa)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
  .uni-content{
	  width:750rpx;
	  height:140rpx;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  border-bottom: 1rpx solid #F0F0F0;
	  .uni-left{
		  margin-left:30rpx;
		   .consult_li_img{
				width: 120rpx;
				height: 120rpx;
				margin-right: 27rpx;
				
			 }
	  }
	  .uni-right{
		  flex:1;
		  height:120rpx;
		  display: flex;
		  flex-direction: column;
		  justify-content: space-between;
		  .uni-up{
			  display: flex;
			  justify-content: space-between;
			  .name{
				  font-size:32rpx;
				  font-family:PingFang SC;
				  font-weight:bold;
				  color:rgba(0,0,0,1);
			  }
			  .time{
				  font-size:22rpx;
				  font-family:PingFang SC;
				  font-weight:500;
				  color:rgba(157,157,157,1);
				  margin-right:30rpx;
			  }
		  }
		  .description{
			  font-size:28rpx;
			  font-family:PingFang SC;
			  font-weight:500;
			  color:rgba(157,157,157,1);
			  text-align: left;
			  margin-right:30rpx;
			  width:540rpx;
			  overflow : hidden;
			  text-overflow: ellipsis;
			  display: -webkit-box;
			  -webkit-line-clamp: 2;
			  -webkit-box-orient: vertical;
			  text-indent: 20rpx;
		  }
	  }
	 
  }
	button{
		background-color:white!important;
		 margin: 0;
		  padding: 0;
		  outline: none;
		  border-radius: 0;
		  background-color: transparent;
		  line-height: inherit;
		  width: max-content;
	}
   .btn::after {
	  border: none;
	}
	.btn{
		background-color:white!important;
		
	}
	/* .consult_list{}
	.consult_li{
		padding: 20rpx;
	} */
	
	
	
	/* .consult_li_name{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(0,0,0,1);
	}
	.consult_li_time{
		font-size:22rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(157,157,157,1);
	}
	.consult_li_txt{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(157,157,157,1);
	} */

</style>
