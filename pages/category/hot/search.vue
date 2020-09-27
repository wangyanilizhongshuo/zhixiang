<template>
    <view>


        <view class="content">
            <!--搜索栏-->
            <view class="sp-top-bar">
                <view class="sp-search-bar">
                    <label class="icon icon-search" @click="search()" for="search"></label>
                    <input type="search" id="search" placeholder="搜索">
                </view>
            <view class="cancel-button" @click="goBack()">取消</view>
        </view>

            <view class="search-history">历史搜索</view>

            <view class="search-history-list">
                    <view class="search-history-lab">
                        <img src="http://zxyp.hzbixin.cn/files/49731600408393422.jpg">
                        <span class="search-history-goods">健身器</span>
                    </view>
                    <view class="search-history-lab">
                        <img src="http://zxyp.hzbixin.cn/files/49731600408393422.jpg">
                        <span class="search-history-goods">棉麻素色床品</span>
                    </view>
                    <view class="search-history-lab">
                        <img src="http://zxyp.hzbixin.cn/files/49731600408393422.jpg">
                        <span class="search-history-goods">太阳眼镜</span>
                    </view>
                </view>
            <view class="search-empty"><a id="empty" href="javascript:;">清空历史记录 <img src="http://zxyp.hzbixin.cn/files/9371600408523265.jpg"></a></view>
        </view>
        <!--搜索内容-->
        <view class="packets" v-if="searchContent" style="display: block;"  >
            <view class="com-top boder-bottom">
                <view class="search-close"></view>
                <view class="top-search"><input type="text" id="search-cont"></view>
            </view>
            <view class="serviceTab ma-top44">
                <ul class="clearfix">
                    <li>
                        <a href="javascript:;" type="1" class="rvice">综合</a>
                        <a href="javascript:;" type="2">按新品</a>
                        <a href="javascript:;" type="3">按销量</a>
                        <a href="javascript:;" type="4" sort="0">按价格
                            <img id="sortimg" src="http://zxyp.hzbixin.cn/files/58431600410428199.jpg">
                        </a>
                    </li>
                </ul>
            </view>
            <view class="hotPrice-detail-wrap height_vh">
                <view class="points-scroll">
                    <view class="scroll-box">
                        <ul id="detailSale" class="hotPrice-detail clearfix">

                            <li class="pull-right">
                                        <img src=" http://zxyp.hzbixin.cn/files/20641600408571885.jpg" alt="">
                                        <p class="hotPrice-txt">纽太特中文版 乳蛋白深度水解配方粉450g</p>
                                        <view class="ht-price">
                                            <span>￥298</span>
                                            <span class="ht-sl">已售194件</span>
                                        </view>
                                    </li>
                        </ul>
                        <view class="infinite-scroll-preloader">
                            <view class="preloader"></view>
                        </view>
                    </view>
                </view>
            </view>
            <input type="hidden" id="type" value="0">
            <input type="hidden" id="sort" value="0">
        </view>
        
    </view>
</template>

<script>
    import light7_min from "@/component/css/light7_min";
    import main_20 from "@/component/css/main_20";
    import wq from "@/component/css/wq";
    import jzl from "@/component/css/jzl";
    import search from "@/component/css/page/search";


    export default {

        components: {
            search,
            jzl,
            wq,
            main_20,
            light7_min,
        },
        data() {
            return {
				// 搜索内容的出现
              searchContent:false
              
            }
        },
        methods: {
			// 取消按住返回上一级
            goBack(){
				uni.navigateTo({
					url:'./hot'
				})
			},
			search(){
			
				this.searchContent=true;
			}
        }
    }
</script>

<style scoped lang="scss">
 #search{
	 position:absulate;
	 top: 1rpx;
	 height: 50rpx!important;
 }  
  .icon-search{
	  height:50rpx!important;
  }
 
</style>

