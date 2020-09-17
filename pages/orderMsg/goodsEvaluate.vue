<template>
	<view class="uni-evaluate">
		<view class="uni-title">
				<image class="uni-image uni-left" src="https://img02.miyabaobei.com/d1/p4/item/13/1375/1375041_normal_4.jpg"></image>
				<view class="uni-right"> 
					 <text class="word">评分	</text>
					  <uni-rate  :size="18" v-model="startNum" @change="onChange"/>
				</view>
		</view>
		<view class="uni-content">
			 <textarea maxlength="70" class="uni-textarea" v-model="textareaValue" placeholder-style="color:#9f9f9f" placeholder="请输入你的评价"  ></textarea>
		     <view class="uni-imgs-content">
				 <view class="img_info_li" v-for="(item,index) in bodyPhotoUrl" :key="index">
				 	<image @tap.stop="injuryPreviewImage(index)" :src="item" alt="" class="uni-img"/>
<!-- 				 	<image @tap.stop="delImg(index)" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/del@2x.png"
				 	 alt="" class="uni-imgs" /> -->
				 </view>
				 <view class="img_info_li">
				 	<image v-if="bodyPhotoUrl.length>=0 && bodyPhotoUrl.length<3" @click="bodyPhotoAdd()" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/upload@2x.png"
				 	 alt="" class="uni-img">
				 </view>
			 </view>
		</view> 
        <view class="uni-btn" @tap.stop="submit">提交</view>
	</view>
</template>

<script>
	import uniRate from '../../components/uni-rate/uni-rate.vue'
	export default{
          data(){
			 return {
				 startNum:0,
				 id:'',
				 subId:'',
				 url:'',
				 textareaValue:'',
				 imgFlag:true,
				 // 图片的数组 
				 bodyPhotoUrl: [],
				 upUrlList:[]
			 }
		  },
		  components:{
			  uniRate
		  },
		  onLoad(options){
			   this.setData(options)
			 
		  },
		  onShareAppMessage: function () {
		      let _this = this;
		      return {
		        title: "智享婴品",
		        path: "/pages/index/index?" + _this.getShareUrlParams()
		      };
		  },
		  methods:{
			  onChange(e){
				  let b=e.value
				  this.startNum=b;
			  },
			  bodyPhotoAdd(){
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
			 //删除某一项
			 // delImg(index) {
			 // 	let arr = this.bodyPhotoUrl
			 // 	arr.splice(index, 1)
				// this.bodyPhotoUrl = arr;
			 //      this.upUrlList.splice(index,1)
				//   this.$forceUpdate()
			 // },
			  // 照片预览
			  injuryPreviewImage(index) {
			  	uni.previewImage({
			  		current: this.bodyPhotoUrl[index],
			  		urls: this.bodyPhotoUrl,
			  		indicator: "number"
			  	})
			  },
			  submit(){
				
				  if(!this.startNum || !this.textareaValue || !this.upUrlList){
				  }else{
					    uni.wjw_http({
						  url:'goodscomment/save',
						  data:{
							  userId:this.id,
							  sub_order_id:this.subId,
							  grade:this.startNum*2,
							  content:this.textareaValue,
							  pic1:this.upUrlList[0],
							  pic2:this.upUrlList[1],
							  pic3:this.upUrlList[2]
						  }
					  }).then(res=>{
						  if(res.status ==0){
							  let types=1;
							  uni.navigateTo({
								url:'/pages/orderMsg/successPage?type='+types
							  })
						  }
					  }).catch(res=>{
						  console.log(res)
					  })
				  }
				
			  }
		  }
	}
	
	
	
	
</script>

<style scoped lang="scss">
.uni-evaluate{
	width: 750rpx;
	// border-top:20rpx solid #f1f1ef;
	
}
.uni-title{
	width: 750rpx;
	height: 100rpx;
	display: flex;
	align-items: center;
	padding:0 25rpx;
	box-sizing: border-box;
	justify-content: flex-start;
	background-color: #fff;
	border-bottom:1rpx  solid #eee;
	.uni-image{
		width: 80rpx;
		height:80rpx;
		margin-right: 20rpx;
	}
	.uni-right{
		flex:1;
		display: flex;
		align-items: center;
		height:100%;
		.word{
			color:#323232;
			font-size: 27rpx;
			margin-right:20rpx;
		}
	}
}
.uni-content{
	width: 750rpx;
	padding:30rpx 20rpx ;
	box-sizing: border-box;
	.uni-textarea{
		  width: 650rpx;
		  height:200rpx;
		 
	}
	.uni-img{
		width:200rpx;
		height: 200rpx;
	}
	.uni-imgs-content{
		width: 700rpx;
		display: flex;
		justify-content: flex-start;
		.img_info_li{
			position: relative;
			margin-right:40rpx;
			.uni-imgs{
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				right:-2rpx;
				top:-13rpx;
				
			}
		}
	}
}
.uni-btn{
	width: 700rpx;
	height:100rpx;
	margin:50rpx 25rpx;
	background-color: #FF7599;
	line-height: 100rpx;
	text-align: center;
	border-radius: 10rpx;
	color: #fff;
}
</style>
