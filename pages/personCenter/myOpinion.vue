<template>
    <view class="uni-opinion">
        <view class="uni-content">
            <view class="myReport-content">
                <textarea focus="true" v-model="content"  class="textarea" placeholder="请输入您对我们的意见或建议"></textarea>
            </view>
        </view>
		<view class="submit" @click="submit">提交</view>
    </view>
</template>
<script>
    import light7_min from "@/component/css/light7_min";
    import light7_swiper_min from "@/component/css/light7_swiper_min";
    import main from "@/component/css/main";
    import wq from "@/component/css/wq";
    export default {
        components: {
            wq,
            main,
            light7_swiper_min,
            light7_min,
        },
        data() {
            return {
              content:''
              
                
            }
        },
		onLoad(){
			
		},
        methods: {
            submit(){
				console.log(this.content)
				let id =wx.getStorageSync('user').id;
				let that =this;
				uni.wjw_http({
					url:'suggestion/save',
					data:{
						userId:id,
						type:1,
						content:that.content
					}
					
				}).then(res=>{
					if(res.status ==0){
						uni.showToast({
							title:'意见提交成功',
							duration:3000
						})
						setTimeout(()=>{
							uni.navigateBack()
						},2000)
						
					}
					
				}).catch(res=>{
					console.log(res.msg)
				})
			}
        }
    }
</script>

<style scoped lang="scss">
    .myReport-content{
		margin-top:0!important;
		height: 400rpx;;
	}
	.submit{
		width:750rpx;
		height:100rpx;
		line-height: 100rpx;
		text-align: center;
		margin-top:40rpx;
		color:#fff;
		background-color: #FF7599;
	}
	.textarea{
		height: 400rpx;
	}
	


</style>
