<template>
	<view class="uni-videoDetail">
		  <view class="uni-video">
				<video class="video" @ended="autoEnd" autoplay page-gesture controls  id="myVideo" 
				:src="detailData.vedioUrl"
					></video>
		  </view>
		  <view class="uni-question">
			 <view class="uni-title">{{detailData.question}}</view>
			 <view class="list">
					<img class="image"  @tap="choice(1)" v-if="chioceFlag1" src="http://zxyp.hzbixin.cn/files/55921600414667652.jpg"
					 >
					<img class="image" @tap="choice(1)" v-if="!chioceFlag1" src="http://zxyp.hzbixin.cn/files/39771600414731408.jpg"
					>
					<text class="uni-text">{{detailData.answer1}}</text>
			 </view>
			 <view class="list">
						<img  class="image" @tap="choice(2)" v-if="chioceFlag2" src="http://zxyp.hzbixin.cn/files/55921600414667652.jpg"
						 >
						<img class="image" @tap="choice(2)" v-if="!chioceFlag2" src="http://zxyp.hzbixin.cn/files/39771600414731408.jpg"
						>
						<text class="uni-text">{{detailData.answer2}}</text>
			 </view>
			 <view class="list">
						<img class="image"  @tap="choice(3)" v-if="chioceFlag3" src="http://zxyp.hzbixin.cn/files/55921600414667652.jpg"
						 >
						<img class="image" @tap="choice(3)" v-if="!chioceFlag3" src="http://zxyp.hzbixin.cn/files/39771600414731408.jpg"
						>
						<text class="uni-text">{{detailData.answer3}}</text>
			 </view>
			  <view class="uni-btn" v-if="subFlag" @click="submit">提交答案</view>
			  <view class="uni-btn" v-if="!subFlag" style="background-color: #aaa;">提交答案</view>
		  </view>
	</view>
	
</template>

<script>
	export  default{
		data(){
			return {
				id:'',
				detailData:'',
				chioceFlag1:false,
				chioceFlag2:false,
				chioceFlag3:false,
				subFlag:false
				
			}
		},
		onLoad(options){
			this.setData(options);
			this.getData();
		},
		methods:{
			 getData(){
				 let that=this;
				 let id = wx.getStorageSync('user').id;
				 uni.wjw_http({
					 url:'vedio/info/'+that.id,
					 type:'post',
					 data:{
						 userId:id
					 }
				 }).then(res=>{
					 if(res.status ===0){
						 that.detailData=res.result;
						 // console.log(res.result)
					 }
				 })
			 },
			 // 选择那一项
			 choice(id){
				 if(id==1){
					 this.chioceFlag1=(this.chioceFlag1 ==true?false:true)
					 this.chioceFlag2=false
					 this.chioceFlag3=false
				 }
				 else if(id==2){
					this.chioceFlag2=(this.chioceFlag2 ==true?false:true)
					 this.chioceFlag1=false
					 this.chioceFlag3=false
				 }
				 else if(id==3){
				 	 this.chioceFlag3=(this.chioceFlag3 ==true?false:true)
					 this.chioceFlag2=false
					 this.chioceFlag1=false
				 }
				
			 },
			 //自动播放完成
			 autoEnd(){
				 this.subFlag=true;
			 },
			 // 提交答案
			 submit(){
				 let flagnum=0;
				 if(this.chioceFlag1 ==true){
					 flagnum=1
				 }
				 else if(this.chioceFlag2 ==true){
					 flagnum=2
				 }
				 else if(this.chioceFlag3==true){
				 	 flagnum=3
				 }
				 let that=this;
				
				 let id = wx.getStorageSync('user').id;
				 if(flagnum!=0){
					
					 uni.wjw_http({
						 url:'vedio/answer',
						 type:'post',
						 data:{
							 userId:id,
							 vedio_id:that.id,
							 answer:flagnum 
						 }
					 }).then(res=>{
						 if(res.status ==0){
							 uni.showToast({
							 	title:'回答成功',
								duration:2000
							 })
							 uni.navigateBack()
							 
						 }
					 })
				 }
				
			 }
		}
	}
</script>

<style  scoped lang="scss">
	.uni-video{
		.video{
			width:750rpx;
			height:600rpx;
		}
	}
	.uni-question{
		width:650rpx;
		margin:50rpx auto 0;
		font-size: 15px;
		.uni-title,.list{
			margin-bottom:30rpx;
		}
		.list{
			.image{
				width:32rpx;
				height:32rpx;
				position: relative;
				bottom:-8rpx;
			}
		}
	}
	.uni-text{
		margin-left:20rpx;
	}
	.uni-btn{
		
		height: 110rpx;
		line-height: 110rpx;
		text-align: center;
		background-color: #00b8ee;
		color: #fff;
		border-radius: 10rpx;;
	}
</style>
