<template>
    <view class="uni-mes">
        <view class="uni-content">
			 <view class="read" @click="allRead">全部已读</view>
			 <view class="uni-message" v-for="(item,index) in messageList" :key="index" @click='jumpDetail(item.id,item.content,item.create_time)'>
				 <view class="uni-left">
					 <image class="img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/sys_msg.png"></image>
				     <text v-if="item.unread ==0" class="spot"></text>
				 </view>
				 <view class="uni-right">
					 <view class="up">
						 <view class="sign">系统通知</view>
						 <view class="timer">{{item.create_time}}</view>
					 </view>
					 <view class="down">{{item.content}} </view>
				 </view>
			 </view>
       
        </view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
               messageList:[],
			   pagess:1,
			   totalPage:0,
			   flag:true

            }
        },
		onLoad(){
			this.getNews();
		},
		onShow(){
			
			// this.getNews();
		},
		onReachBottom(){
			
			if(this.totalPage>this.pagess){
				 this.pagess+=1;
				 this.getNews()
			
			} 
			   
		},
        methods: {
			// 得到所有的信息
             getNews(){
				 let that=this;
				 let id=wx.getStorageSync('user').id;
				 uni.wjw_http({
					 url:'usermessage/listByPage',
					 type:'post',
					 data:{
						 page:that.pagess,
						 pageSize:15,
						 userId:id 
					 }
				 }).then(res=>{
					 if(res.status ==0){
						 that.totalPage=res.result.pages;	
						  let  aa =res.result.list;
						  let bb=that.messageList;
						 for(let i in aa){
						 	 let a = new Date(aa[i].create_time);
						 	aa[i].create_time= a.getFullYear()+"-"+(a.getMonth()+1).toString().padStart(2,'0')+"-"+a.getDate().toString().padStart(2,'0')+" "+a.getHours().toString().padStart(2,'0')+"-"+a.getMinutes().toString().padStart(2,'0')+"-"+a.getSeconds().toString().padStart(2,'0')
						 }
						 that.messageList=bb.concat(aa)
					 }
				 })
			 },
			 // 跳转详情页
			 jumpDetail(ids,content,create_time){
					 let id=wx.getStorageSync('user').id;
					 uni.wjw_http({
						 url:'usermessage/setRead',
						 type:'post',
						 data:{
							 id:ids,
							 userId:id
						 } 
					 }).then(res=>{
						 if(res.status ==0){
							 uni.navigateTo({
								url:'/pages/personCenter/newsCenter-details?content='+content+'&create_time='+create_time
							 })
							
						 }
					 })
			 
			 },
			 // 设置为全部已经读取
			 allRead(){
				  // 判断是否调用接口
				 let flass=this.messageList.some(res=>{
					return  res.unread == 0
				 })
				  let id=wx.getStorageSync('user').id;
				 let that=this;
				 if(flass){
					  uni.wjw_http({
						 url:'usermessage/setAllRead',
						 type:'post',
						 data:{
							 userId:id 
						 }
					  }).then(res=>{
						  if(res.status ==0){
							  that.messageList.map(item=>{
								 item.unread=1
							  })
							 that.getNews();
							 that.$forceUpdate()
						 }
					  }).catch(res=>{				 
					  })
				 }
				
				
			 }
			
        }
    }
</script>
<style scoped lang="scss">
	.uni-mes{
		.uni-content{
		   width: 750rpx;
		   background-color: #fff;
		  .read{
			   width: 730rpx;
			   text-align: right;
			   margin-top:20rpx;
			   color: #00b7ee;
			   font-size: 28rpx;
		  }
		}
	}
	.uni-message{
		width:750rpx;
		height:140rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #e5e5e5;
		.uni-left{
			position: relative;
			margin-right:30rpx;
			margin-left:30rpx;
			.img{
				height: 100rpx;
				width: 100rpx;
			}
			.spot{
				position: absolute;
				top: -1px;
				right: 0px;
				background: #db0002fc;
				width: 7px;
				height: 7px;
				border-radius: 50%;
				display: block;
				z-index: 10;
			}
		}
	}
	.uni-right{
		flex:1;
		color:#999;
		font-size: 28rpx;
		height:100rpx;
		display: flex;
		flex-direction :column;
		justify-content: space-between;
		.up{
			display: flex;
			justify-content: space-between;
			.timer{
				margin-right: 20rpx;
			}
		}
	}
	.down{
		width:500rpx;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
		
	}
   
</style>
