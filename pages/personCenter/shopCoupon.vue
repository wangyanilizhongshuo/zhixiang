<template>
    <view>
        <view class="app-cont">
            <view class="tab">
                <view class="tab-box"><a  :class="useFlag==true? 'atian':''" @click="useFlag=true" >未使用</a></view>
                <view class="tab-box"><a :class="useFlag==false? 'atian':''" @click="useFlag=false">已使用</a></view>
				
            </view>
            <view class="tab-cont" v-if="useFlag">
               <view class="list-main-mian " id="listwrap" style="height:100%; position: relative;  overflow:auto;  z-index: 1">
                <view class="scroll-box">
                    <ul>
                        <li v-for="(item,index) in unUsePacket" :key="index">
							<blcok v-if="item.redType==1">
								<view class="cont-txt">
									<view class="txt-box">
											<p class="coupon-name">每月8日、18日、28日可用</p>
											<p class="coupon-color">满{{item.limitMoney/100}}可用</p>
								
									</view> 
									<view class="txt-box">
										<view class="price color1">
											<span>￥</span><em class="price-one">{{item.money}}</em></i>
										</view>
									</view>     
								</view> 
							</blcok>
							<blcok v-if="item.redType==2">
								 <view class="cont-txt">
								 	<view class="txt-box">
								 			<p class="coupon-name">智享婴品新人红包</p>
								 			<p class="coupon-color">满{{item.limitMoney/100}}可用</p>

								 	</view> 
								 	<view class="txt-box">
								 		<view class="price color1">
								 			<span>￥</span><em class="price-one">{{item.money}}</em></i>
								 		</view>
								 	</view>     
								 </view>
								
							</blcok>
							<blcok v-if="item.redType==3">
								<view class="cont-txt">
									<view class="txt-box">	
											<p class="coupon-color">满{{item.limitMoney/100}}可用</p>
									</view> 
									<view class="txt-box">
										<view class="price color1">
											<span>￥</span><em class="price-one">{{item.money}}</em></i>
										</view>
									</view>     
								</view>
							</blcok>
						    <view class="cont-font">限手机号{{item.phone}}的用户使用</view>
                        </li>     
                    </ul>
                </view>
            </view> 
           </view>  
		   <view class="tab-cont" v-if="!useFlag">
				<view class="list-main-mian " id="listwrap" style="height:100%; position: relative;  overflow:auto;  z-index: 1">
				   <view class="scroll-box">
					   <ul>
						   <li v-for="(item,index) in usePacket" :key="index">
								<blcok v-if="item.redType==1">
									<view class="cont-txt">
										<view class="txt-box">
												<p class="coupon-name">每月8日、18日、28日可用</p>
												<p class="coupon-color">满{{item.limitMoney/100}}可用</p>
									
										</view> 
										<view class="txt-box">
											<view class="price color1">
												<span>￥</span><em class="price-one">{{item.money}}</em></i>
											</view>
										</view>     
									</view> 
								</blcok>
								<blcok v-if="item.redType==2">
									 <view class="cont-txt">
										<view class="txt-box">
												<p class="coupon-name">智享婴品新人红包</p>
												<p class="coupon-color">满{{item.limitMoney/100}}可用</p>
	   
										</view> 
										<view class="txt-box">
											<view class="price color1">
												<span>￥</span><em class="price-one">{{item.money}}</em></i>
											</view>
										</view>     
									 </view>
									
								</blcok>
								<blcok v-if="item.redType==3">
									<view class="cont-txt">
										<view class="txt-box">	
												<p class="coupon-color">满{{item.limitMoney/100}}可用</p>
										</view> 
										<view class="txt-box">
											<view class="price color1">
												<span>￥</span><em class="price-one">{{item.money}}</em></i>
											</view>
										</view>     
									</view>
								</blcok>
								<view class="cont-font">限手机号{{item.phone}}的用户使用</view>
						   </li>     
					   </ul>
				   </view>
			   </view> 
		   </view>
        </view> 
    </view>
</template>
<script>
    import main from "@/component/css/main";
    import styel from "@/component/css/styel";
    import shopCoupon from "@/component/css/shopCoupon";
    export default {
        components: {
            shopCoupon,
            styel,
            main,
        },
        data() {
            return {             
                jifen_show: false,
				usePacket:'',
				unUsePacket:'',
				useFlag:true
                
            }
        },
		onLoad(){
			this.getPacket();
			this.wuxiaoPacket();
			
		},
        methods: {
			 // 没有使用的红包
             getPacket(){
				 let  userData = wx.getStorageSync('userData').user.id;
				 let that=this;
				 uni.wjw_http({
				 	url: "red/list",
				 	method: 'post',
				 	data: {
				 		// status: 0,// 选填 0未使用 1已使用 
						userId: userData,
				 		status:0
				 	}
					}).then(res=>{
						if(res.status==0 ){
							that.unUsePacket=res.result;
							that.unUsePacket.map(res=>{
								res.money=(res.money/100).toFixed(2)
							})
							console.log(that.unUsePacket)
						}
					})
			 },
			 // 使用的红包
			 wuxiaoPacket(){
				 let  userData = wx.getStorageSync('userData').user.id;
				 let that=this;
				 uni.wjw_http({
					url: "red/list",
					method: 'post',
					data: {
						// status: 0,// 选填 0未使用 1已使用 
						userId: userData,
						status:1
					}
					}).then(res=>{
						if(res.status==0 ){
							that.usePacket=res.result;
							console.log(that.usePacket)
						}
			 	})
			 },
			
			 
			 
			 
        }
    }
</script>

<style lang="scss" scoped>
	.tap{
		position: relative;
		top:0rpx;
		left:0rpx;
	}
    .app-cont{
		margin-top:0!important;
	}

</style>

