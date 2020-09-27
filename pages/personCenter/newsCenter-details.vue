<template>
    <view class="uni-mes">
        <view class="uni-content">
			 <view class="uni-message" >
				 <view class="uni-left">
					 <image class="img" src="http://zxyp.hzbixin.cn/files/63931600411911684.jpg"></image>
				 </view>
				 <view class="uni-right">
					 <view class="up">
						 <view class="sign">系统通知</view>
						 <view class="timer">{{create_time}}</view>
					 </view>
					 <view class="down">{{content}} </view>
				 </view>
			 </view>
       
        </view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
               create_time:'',
			   content:''

            }
        },
		onLoad(options){
			this.setData(options)
			console.log(this.create_time)
		},
		
        methods: {
		
			 
			
        }
    }
</script>
<style scoped lang="scss">
	.uni-mes{
		.uni-content{
		   width: 750rpx;
		   background-color: #fff;
		 
		}
	}
	.uni-message{
		width:750rpx;
		height:140rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		// border-bottom: 2rpx solid #e5e5e5;
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
   
</style>
