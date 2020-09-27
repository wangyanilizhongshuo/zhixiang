<template>
    <view class="uni-code">
       <image class="imgsBg" src="http://zxyp.hzbixin.cn/files/1801600847548453.jpg"></image>
	   
	   <view class="contents">
		     <image class="imgCon" src="http://zxyp.hzbixin.cn/files/51741600847626272.jpg"></image>
			 <view  class="codenum">我的邀请码：{{list.invite_code || ''}}</view>
			 <view class="invite">一起邀请好友来注册吧</view>
			 <view class="share">分享到</view>
			  <button class="myCode-VX" open-type="share">
				  <image class="imgsss" src="http://zxyp.hzbixin.cn/files/84321600157308924.jpg"></image>
			  </button>
	   </view>
            

    </view>
</template>

<script>



  export default {

      
    data() {
      return {
		     // 获取页面信息
              list:'',
              jifen_show: false,
        
      }
    },
	onLoad(){
		this.getData();
		
	},
	// 分享
	onShareAppMessage: function (res) {
	  let _this = this;
	   if (res.from === 'button' || res.from ==='menu' ) {// 来自页面内分享按钮
	       return {
	         title: "智享婴品",
	         path: "/pages/index/index?" + _this.getShareUrlParams()
	       };
	      }
	},
    methods: {
		getData(){
			let id=wx.getStorageSync('user').id
			uni.wjw_http({
				url:'user/info/'+id
			}).then(res=>{
				if(res.status ==0){
					this.list=res.result;
					 // console.log(res)
				}
			})
		}
		
		
      
    }
  }
</script>

<style lang="scss" scoped>
.uni-code{
	position: relative;
	left:0;
	top:0;
}
  .imgsBg{
	  display: block;
	  width: 100vw;
	  height: 100vh;
  }
  .contents{
	  width: 580rpx;
	  position:absolute ;
	  z-index:10;
	  left:85rpx;
	  top:833rpx;
	  color:#FF9E4B;
	  font-weight: bold;
	  font-size: 32rpx;
	  text-align: center;
	  .imgCon{
		  display: block;
		  width:  580rpx;
		  height: 108rpx;
	  }
	  .codenum{
		  position: absolute;
		  left:115rpx;
		  top:36rpx;
	  }
	  .invite{
		  margin:43rpx 0;
	  } 
	   .imgsss{
		   display: block;	                                               
		   width: 120rpx;
		   height: 120rpx;
	   }
	   .share{
		   margin-bottom: 50rpx;
	   }
  }
</style>
