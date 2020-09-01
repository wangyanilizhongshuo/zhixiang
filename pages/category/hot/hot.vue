
<template>
   
        <view class="page page-current">
            <view class="content">     
				<view class="save-1 sousuo" @click="sousuo()" style="display:none;">
					<img class="search" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/search.png" alt="sing_icon">
				</view>
                <view class="jzl-hotProducts-bigpic ">
                    <!-- <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/home_hotsell_banner.png" alt=""> -->
                    <img class="img" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/baoBanner.png" alt="">
                </view>
				
               <scroll-view class="nowrap scrollBg" :class="fixedFlag == true?'classify_box':'classify_boxfix'" scroll-x>
               	<view class="classify_item " style="width:80rpx;"  @click="delColor(1)">
               		<view class="classify_item_txt "  :class="{ select: true, firstActive: sels == 1 }"  >精选</view>
               		<view class="classify_item_bd"  :class="{ select: true, firstActives: sels ==1 }"></view>
               	</view>
               	<view class="classify_item" v-for="(item,index) in allGoodsCateList" :key='index'  @click="category(index,1)">
               		<view class="classify_item_txt" :class="{ select: true, active: index === sel }" >{{item}}</view>
               		<view class="classify_item_bd" :class="{ select: true, actives: index === sel }"></view>
               		<!-- :class="'activeWord+'index" -->
               	</view>
               </scroll-view>
			   <view class="goods_list flex flex_wrap">
					<view class="goods_li" v-for="(item,index) in allGoodsList" :key='index' 
						@click='cateDetail(item.id)' 
						>
						<img class="goods_li_img" :src="item.pic" />
						<view class="goods_li_info">
							<view class="goods_li_title">{{item.title}}</view>
							<view class="goods_li_price">￥<text>{{item.price}}</text> 积分<text>{{item.total_reper}}</text></view>
						</view>
					</view>
			   </view>
            
            </view>
        </view>
        
   
</template>

<script>
   
    export default {

        components: {
           
        },
        data() {
            return {
				// 获取所有商品的分类
				allGoodsCateList:[],
				allGoodsCateIdList:[],
				allGoodsList:[],
				// 所有商品切换的插件使用
				sel:-2,
				sels:1,
				page:1,
				// 这边是分类以后的 上拉加载
				catePage:1,
				cateIII:'',
				cateFlag:false,
				cateORallFlag:false,
				no_more:false,
				fixedFlag:true,
				pageSizes:0,
				pageallSizes:0,
                
            }
        },
		onShareAppMessage: function () {
		    let _this = this;
		    return {
		      title: "智享婴品",
		      path: "/pages/index/index?" + _this.getShareUrlParams()
		    };
		},
		 onLoad(){
			 this.getAllGoodsClassificate();
			 this.delColor(1);
		 },
		onReachBottom(){  
			 // 所有商品 以及其分类后的数据的上拉加载
			  if(this.cateFlag== false){
				  this.page=this.page+1;
				  if(this.pageallSizes>=this.apge){
					  this.delColor(this.page)
				  }
			  }
			   else if(this.cateFlag == true){
				  this.catePage=this.catePage+1;
				  if(this.pageSizes>=this.catePage){
					   this.category(this.sel,this.catePage)
				  }
				 
			  }
		 },
		 onPageScroll(res){		 
			 if(res.scrollTop >0){
				 this.fixedFlag=false
			 }else{
				 this.fixedFlag=true
			 }
		 },
		
        methods: {
            // 获取所有商品的分类
            getAllGoodsClassificate(){
            	let that=this;
            	uni.wjw_http({
            		url:'goodsclass/list',
            		data:{}
            	}).then(res=>{
					if(res.status ==0){
						that.allGoodsCateList=res.result.map(item=>item.class_name);
            		    that.allGoodsCateIdList=res.result.map(item=>item.id);
					}
            		
            	})
            },
            //获取所有产品当中的某一类进行渲染
            category(i,page){
            	// 来判断是全部还是分类的
            	this.cateFlag=true;
            	this.sels=0;
            	this.sel=i;
            	let pages=page;
            	let that=this;
            	 //这里出现的classid 是根据官网随便填写的 
            	 let a =uni.getStorageSync('userData');
            	 let use=a.user.id;
            	 let token=a.token;
            	 let ids=that.allGoodsCateIdList[i]
            	uni.wjw_http({
            		url:'saleevent/listByPage',
            		data:{
            			page:pages,
            			pageSize:6,
            			ower_type:2,
            			userId:use,
            			token:token,
            			class_id:ids
            		}
            	}).then(res=>{
					if(res.status ==0 ){
						this.pageSizes=res.result.pages;
						if(pages !=1){
            			let ii =res.result.list;
            			let jj =that.allGoodsList;
            			jj=jj.concat(ii);
            			that.allGoodsList=jj
						}else{
							that.allGoodsList=res.result.list;
						}
					}
            		
            	})
            	// 全部列表的内容 删除
            	 this.cateORallFlag=true;
            },
            delColor(pages1){
            	this.cateFlag=false;
            	this.sels=1;
            	this.sel=-3;
            	let pages=pages1;
            	let that=this;
            	let a =uni.getStorageSync('userData');
            	let use=a.user.id;
            	let token=a.token;
            	uni.wjw_http({
            		url:'saleevent/listByPage',
            		data:{
            			page:pages,
            			pageSize:6,
            			ower_type:1,
						orderType:1,
            			userId:use,
            			token:token
            		}
            	}).then(res=>{
					if(res.status ==0){
						this.pageallSizes=res.result.pages;
						if(pages !=1){
            			let ii =res.result.list;
            			let jj =that.allGoodsList;
            			jj=jj.concat(ii);
            			that.allGoodsList=jj
						}else{
							
							that.allGoodsList=res.result.list;
						}
					}
            	})
            },
            cateDetail(ids){
            	uni.navigateTo({
            		url:'../../goods/goods?id='+ids
            	})
            },
			sousuo(){
				uni.navigateTo({
					url:'./search'
				})
			}
        }
		
    }
</script>

<style scoped lang="scss">
	.classify_boxfix{
		position:fixed;
		top:0rpx;
		z-index:2
	}
	.jzl-hotProducts-bigpic{
		.img{
			height:260rpx;
			width:750rpx;
		}
	}
	.sousuo{
		width:750rpx;
		height:50rpx;
		position: relative;
		.search{
			width:40rpx;
			height:30rpx;
			position: absolute;
			right:50rpx;
			top:10rpx;
		}
	}
   .active , .firstActive{
     color: #f31641;
    }
    .actives, .firstActives{
   	 background-color: #f31641;
   	 height:10rpx;
    }
  .scrollBg{
	  background-color: white;
  }
   .classify_box{
   	height:80rpx; 
   	background:rgba(255,255,255,1);
   	box-shadow:0rpx 3rpx 3rpx 0rpx rgba(255,114,149,0.15);
	
   }
   .classify_item{
   	display: inline-flex;
   	text-align:center;
   	flex-direction: column;
   	height: 100%;
   	font-size:30rpx;
   	width:140rpx;
   	font-family:PingFang SC;
   	font-weight:500;
   	color:rgba(51,51,51,1);
	
   }
   .classify_item_txt{
   	flex-grow: 1;
   	display: flex;
   	justify-content: center;
   	align-items: center;
   	padding: 0 16rpx;
   }
   .classify_item_bd{
   	flex-shrink: 0;
   	width:100%;
   	/*height:4rpx;*/
   	height: 0;
   	background:rgba(255,114,149,1);
   	border-radius:2rpx;
   }
   .activeWord{
   	color:rgba(255,114,149,1)
   	
   }
   .activeBorder{
   	height: 10rpx;
   	background:rgba(255,114,149,1);
   }
   .classify_item_now {
   	.classify_item_txt{
   		color:rgba(255,114,149,1);
   	}
   	.classify_item_bd100{
		height: 10rpx;
		background:rgba(255,114,149,1);
   }
   }
   .goods_list{
   	padding: 20rpx 0 ;
	overflow: auto;
   }
   .goods_li{
   	width:330rpx;
   	min-height: -470rpx;
   	box-sizing: border-box;
   	border:1rpx solid rgba(229, 229, 229, 1);
   	border-radius:10rpx;
   	margin-left: 30rpx;
   	margin-bottom: 20rpx;
   }
   .goods_li_img{
   	width: 100%;
   	height: 300rpx;
   }
   .goods_li_img_li{
   	width: 690rpx;
   	height: 300rpx;
   	margin-left: 30rpx;
   	margin-bottom: 20rpx;
   }
   .goods_li_info{
   	padding: 21rpx;
   }
   .goods_li_title{
   	font-size:26rpx;
   	font-family:PingFang SC;
   	font-weight:500;
   	color:rgba(51,51,51,1);
   }
   .goods_li_price{
   	font-size:26rpx;
   	font-family:PingFang SC;
   	font-weight:bold;
   	color:rgba(254,94,84,1);
   }
  
   
</style>
