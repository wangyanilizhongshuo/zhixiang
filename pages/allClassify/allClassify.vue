<template>
    <view>	
        <!-- 页面代码 -->
      <div class="content">     
            <div class="yzl-top-bar">
                <div class="yzl-search-bar" style="background: linear-gradient(66deg,rgba(255,107,134,1) 0%,rgba(255,127,176,1) 100%);">
                    <div class="search-input" style="border-radius: 12px;background: #fff;"  @click='jump' data-url='/pages/index/search'  >
                        <label class="icon icon-search" for="search" style="left: 42%;"></label>
                        <input type="search" id='search' placeholder='搜索' style="border: none;padding-left: 47%;" />
                    </div>
                </div>
            </div>
            <div class="classify-area">
                <div class="left-area">
                    <ul class="nav-bar" style="height: 100vh;">
                    	<block
                    	>
	                        <li 
	                        	v-for="(item,index) in goodsclass_list" 
	                        	:key='index+"goodsclass_list"' 
	                        	class="nav-item" 
	                        	:class="nav_item_active==index?'nav-item-active':''" 
	                        	:data-id="item.id" 
	                        	:catnmae="item.class_name" 
	                        	@click='do_fns' 
                                data-fns='set_value,get_goods_list'
	                        	data-name='nav_item_active'
	                        	:data-value='index'
	                        >{{item.class_name}}</li>
                    	</block>
                      
                    </ul>
                </div>
                <div class="right-area">
                    <div class="class-item">
                        <div class="class-title" id="class-title">{{goodsclass_list[nav_item_active].class_name}}</div>
                        <ul class="goods-list">
                            <li class="goods-item goods-box" 

                                v-for="(goods_item,index) in goods_list" 
                                :key='index+"goods_list"' 
                                :data-id="goods_item.id"
                                @click='jump' data-url='/pages/goods/goods'
                                >
                                <p><img :src="goods_item.pic" class="goods-img"></p>
                                <p class="goods-name"> <span>{{goods_item.title}}</span></p>
                            </li>
                           
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </view>
</template>
<script>
import reset1 from "@/component/css/reset1";
import light7_min from "@/component/css/light7_min";
import main from "@/component/css/main";
import allClassify from "@/component/css/page/allClassify";


export default {

    components: {
        allClassify,
        main,
        light7_min,
        reset1,
    },
    data() {
        return {
        	nav_item_active: 0,
            goodsclass_list: [],
            goods_list: [],
        }
    },
    onShareAppMessage: function () {
		    let _this = this;
		    return {
		      title: "智享婴品",
		      path: "/pages/index/index?" + _this.getShareUrlParams()
		    };
		},
    onLoad(options) {
        // console.log('onLoad 页面加载', options);

        // 商品分类列表
         this.get_goodsclass_list();
    },
    methods: {


        // 商品分类列表
        get_goodsclass_list(e) {
            console.log('商品分类列表', e);

            uni.wjw_http({
                url: "goodsclass/list",
                method: 'post',
                data: {
                },
            }).then(res => {
                // console.log('商品分类列表 接口 请求成功', res);
             
                this.goodsclass_list = res.result;

                // 获取商品列表
                this.get_goods_list();
				
                
            })

        },


        // 获取商品列表
        get_goods_list(e) {
          //  var userData =  wx.getStorageSync('userData');
            // var userId = userData.user.id;
            // var token = userData.token;
            var class_id = this.goodsclass_list[this.nav_item_active].id;
            uni.wjw_http({
                url: "saleevent/list",
                method: 'post',
                data: {
                    // userId: userId,  
                    class_id: class_id,
					// token:token
                },
            }).then(res => {
           
                this.goods_list = res.result;   
            })

        },

    }
}
</script>
<style>

</style>