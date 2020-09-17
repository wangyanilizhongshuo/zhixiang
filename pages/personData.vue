<template>
    <view>
        <!-- 你的html代码 -->
        <view class="page" id="page-datetime-picker">
            <view class="content">
              
                <view class="pet-name ma-top52" id="cg-hd" @click="uploadPhoto()">
                    <view class="name-img touxiang" >
                        <image class="img" v-if="!headProtraitflag" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/personalcenter_nohead.png" alt="">
                        <image class="img" v-if="headProtraitflag" :src="personList.head_photo" alt="">
					</view>
                    <p class="amend">修改头像</p>
                </view>
                <view class="person-message wrap">
                    <view class="nick-name" @click='jifen_show=true' >
                        <p>姓名</p><input style="text-align: right;" class="person-small-title person-name" v-model="personList.nickname">
                    </view>
                    <view class="person-birthday" >
						<e-picker  :showValue="date" @change="birthChange()">
							<a class="external" >
							    <p>生日</p><text class="person-small-title">{{personList.birthday}}</text>
							</a>
						</e-picker>
						
					</view>	
					
                    <view class="bind-phone"><a class="external" href="">
                            <p>手机</p><input :disabled="disabled" style="text-align: right;" class="person-small-phonetitle" v-model="personList.phone"  />
                        </a></view>
                    <a class="external" href="addressManage.html" url="addressManage">
                        <view class="address-manage">
                            <p>收货地址</p>
                        </view>
                    </a>
					
                </view>
            </view>
        </view>
        <view class="portrait-box">
            <view class="portrait-modal">
                <view class="portrait-modal-group">
                    <span id="felladd" class="portrait-modal-button ">从本地相册上传</span>
                </view>
                <view class="portrait-modal-group">
                    <span class="portrait-modal-button2 color-danger">取消</span>
                </view>
            </view>
        </view>
        <input type="hidden" id="name-img" value="">
        <view class="changeN-box" style="display: block;" v-if='jifen_show' ><!--修改昵称-->   
            <view class="changeN-wrap personWrap ma-top52"  style="height: 100vh;position: relative;left:0;top:0">
                <input class="chanNameInput"  type="text" v-model="personList.nickname"  id="name"  placeholder="请输入的说法您的昵称">
                <view class="changeBtn"  @tap='repairName'>
                    保存
                </view>
            </view>
			
        </view>
    </view>
</template>

<script>
    import light7_min from "@/component/css/light7_min";
    import mobiscroll from "@/component/css/mobiscroll";
    import main from "@/component/css/main";
    import jzl from "@/component/css/jzl";
    import personData from "@/component/css/personData";
	import ePicker from './../components/e-picker/e-picker.vue'
    export default {
        components: {
            personData,
            jzl,
            main,
            mobiscroll,
            light7_min,
			ePicker
        },
       data(){
			
            return {
                jifen_show: false,
				// 详细的个人信息 
				personList:'',
				// 头像的显示
				headProtraitflag:false,
				// 修改昵称
				repName:'dasf ',
				// 时间选择器
				pickFlag:false,
				date: '1997-02-16'
				
                
            }
        },
		onLoad(){
			this.getPersonMsg();
		},
        methods: {
			// 获取个人信息
            getPersonMsg(){
				let that =this;
				let id=wx.getStorageSync('user').id
				uni.wjw_http({
					url:'user/info/'+id,
					type:'post',
					
				}).then(res=>{
					if(res.status ==0){
						that.personList=res.result;
						let a=that.personList
							if(a.head_photo){
								this.headProtraitflag=true
							}else{
								this.headProtraitflag=false
							}	
					 }
				}).catch(res=>{
					 console.log(res)
				})
			},
			// 上传图片
			uploadPhoto(){
				let that=this;
				uni.chooseImage({
					count: 1, //上传图片的数量，默认是9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						uni.uploadFile({
							 url:'http://zxyptest.hzbixin.cn/file/upload',
							 filePath:res.tempFilePaths[0],
							 name:'file',
							 success:function(datas){
								 let results = typeof datas.data === "object" ? datas.data : JSON.parse(datas.data);
								 let aa =results.result;
								 let id=wx.getStorageSync('user').id
								uni.wjw_http({
									url:'user/update',
									data:{
										userId:id,
										head_photo:aa
									}
								}).then(ress=>{
									if(ress.status ==0){
										uni.showToast({
										    title: '头像上传成功',
										    duration: 1000
										});
										that.getPersonMsg()
									}
								})
							 }
							 })
					}
				})
			},
			 //生日选择
			birthChange(e){
				this.showValue = e
				this.personList.birthday=e;
				let that=this;
				 let id=wx.getStorageSync('user').id
				 uni.wjw_http({
					url:'user/update',
					data:{
						userId:id,
						birthday:that.personList.birthday
					}
				}).then(res=>{
					if(res.status ==0){
						uni.showToast({
						    title: '修改成功',
						    duration: 1000
						});
						this.jifen_show=false;
						that.getPersonMsg()
					}
				})
			},
			//修改 名字
			repairName(){
				 let that=this;
				 let id=wx.getStorageSync('user').id
				 uni.wjw_http({
					url:'user/update',
					data:{
						userId:id,
						nickname:that.personList.nickname
					}
				}).then(res=>{
					if(res.status ==0){
						uni.showToast({
						    title: '昵称修改成功',
						    duration: 1000
						});
						this.jifen_show=false;
						that.getPersonMsg()
					}
				})
				
			}
			// 生日选择器
 
        }
    }
</script>

<style scoped lang="scss">
    .touxiang{
		.img{
			width:100rpx;
			height:100rpx;
		}
	}
	.pet-name{
		margin-top:0rpx!important;
	}
	.ma-top52{
		margin-top:0!important
	}
	.personWrap{
		width:750rpx;
		
		#name{
			width:650rpx;
			margin-left:50rpx;
			
		}
		.changeBtn{
			width:750rpx;
			background-color:#FF7599 ;
			text-align: center;
			color:#fff;
			height: 100rpx;
			line-height: 100rpx;
			position: absolute;
			left:0;
			bottom:0;
			
		}
		
	}
  .chanNameInput{
	  background-color: #fff;
	  width:750rpx!important;
	  margin-left:0rpx!important;
	  padding-left:30rpx;
	  box-sizing: border-box;
	  text-indent: 0!important;
  }  

</style>


  


