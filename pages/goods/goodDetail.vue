<template>
	<view class="goodsDetail">
		<web-view :src="goods_info.goodsDetailUrl"  ></web-view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				id:'',
				goods_info:''
			}
		},
		onLoad(options){
			  this.setData(options);
			  this.get_goods_info();
		},
		methods:{
			// 商品详情
			get_goods_info(e) {
			    uni.wjw_http({
			        url: 'saleevent/info/' + this.id,
			        method: 'post',
			        data: {
			            id: this.id
			        },
			    }).then(res => {
			        // console.log('商品详情 接口 请求成功', res);
			        this.goods_info = res.result;
					 console.log(this.goods_info.goodsDetailUrl)
			       
			       
			    })
			
			},
		}
	}
</script>

<style  scoped lang="scss">
	
</style>
