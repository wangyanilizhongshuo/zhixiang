<template>
    <view>


        <view class="content">

                <!-- <view class="com-top" style="background: none;">
                    <view class="arrow-l" @click='jump' data-url=' ' data-type='6'></view>
                    <view class="page-title" style=" color: #fff;">邀请好友</view>
                    <view class="save-1">
                    </view>
                </view> -->
            <view class="myTwoCode-page">
                <view class="myTwoCode-img">
                    <img id="qrcode" class="image" src="http://zxyp.hzbixin.cn/files/45131597215076490.jpg"/>
                </view>
                <!--<img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/evaluate_pic@3x.png"-->
                <view class="myCode-num">我的邀请码：<span>{{list.invite_code}}</span></view>
                <view class="myCode-text">一起邀请好友来注册吧</view>
               <view class="myCode-share">
                    <view class="myCode-line1"></view>
                    <view class="myCode-line2"></view>
                    <view>分享到</view>
                    <!--<view style=" color: #fff;">点击右上角按钮分享到朋友圈或者微信好友</view>-->
                </view>
                <view class="myCode-VX" @click='registerJump()'  >
                     <view type="button" open-type="share" class="myCode-VX-img1"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/inviting_friends_wechat@2x.png">微信</view>
                  <!--  <view class="myCode-VX-img2"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/inviting_wechat_friends@2x.png">朋友圈</view> -->
                </view>
            </view>
        </view>

    </view>
</template>

<script>
  import light7_min from "@/component/css/light7_min";
  import main from "@/component/css/main";
  import wq from "@/component/css/wq";
  import myTwoCode from "@/component/css/page/myTwoCode";


  export default {

      components: {
          myTwoCode,
          wq,
          main,
          light7_min,
      },
    data() {
      return {
		     // 获取页面信息
              list:'',
              jifen_show: false,
        
      }
    },
	onLoad(){
		this.getData();
		this.getCode();
	},
	// 分享
	onShareAppMessage: function () {
	    let _this = this;
	    return {
	      title: _this.list.invite_code,
	      
	    };
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
		},
		// 按下微信直接跳转到登录
		registerJump(){
			let a=this.list.invite_code
			uni.navigateTo({
				url:'/pages/userOp?code='+a
			})
		},
		// 获取二维码
		getCode(){
			
		}
      
    }
  }
</script>

<style lang="scss" scoped>
 .myCode-VX-img1{
	left:325rpx!important;
 }
 .myTwoCode-img{
	 .image{
	   width:340rpx;
	   height:382rpx;
	 }
	
 }
</style>
