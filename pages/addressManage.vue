<template>
    <view class=" uni-addAdresss">
        <!-- 你的html代码 -->
        <view class="page" >
           
            <view class="content">
                <view class="choose-address-list">
                    <!-- <view class="list-box"  v-for="(info,index) in articleList" :key="index" @click='types=="choose"?choose($event):""' :data-id='info.id' >
					 -->
					 <view class="list-box"  v-for="(info,index) in articleList" :key="index" @click='choose($event,info)' >
                        <view class="box-detail">
                            <p class="list-box-info">
                                <span class="receive-name">收货人： {{info.addressee}}</span>
                                <span class="receive-phone">{{info.phone}}</span>
                            </p>
                            <p class="address-val">{{info.province_name+info.city_name+info.area_name+info.address}}</p>
                        </view>
                        <view class="box-but">
                            <!-- :checked='info.is_default==1' -->
                            <view class="choice" style="width:230rpx;"  @tap.stop='address_update' :data-index='index' data-type='is_default' >
								<label class="label-checkbox refund-checkbox">
									<input type="radio" data-checked=true class="my-radio" value="" name="my-radio">
									<view class="item-media">
                                <!-- <i class="icon icon-form-checkbox" ></i> -->
                                <!-- @click.stop='set_value' :data-value='info.is_default==1?0:1' -->
                                        <radio :checked="info.is_default==1" disable  color="#FF7599" />   
                                    </view>
								</label>默认地址</view>

                            <view class="operate">
                                <a href="javascript:;" @tap.stop="address_edit(info.id,info.addressee,info.phone,info.province_name,info.city_name,info.area_name,info.address,info.is_default)">
                                    <img  src="http://zxyp.hzbixin.cn/files/52151600848347156.jpg"> 编辑</a>
                                <a href="javascript:;" @tap.stop='address_delete'  :data-id='info.id' >
                                    <img src="http://zxyp.hzbixin.cn/files/94391600848361468.jpg"> 删除</a>
                            </view>
                        </view>
                    </view>

                </view>

                <view class="page_btn" style="" @click='jump' data-url='/pages/addAddress'>新增地址</view>
            </view>
        </view>


        
    </view>
</template>

<script>
    import light7_min from "@/component/css/light7_min";
    import light7_swiper_min from "@/component/css/light7_swiper_min";
    import main from "@/component/css/main";
    import ljh_main from "@/component/css/ljh_main";
    import addressManage from "@/component/css/page/addressManage";

    export default {

        components: {
            addressManage,
            ljh_main,
            main,
            light7_swiper_min,
            light7_min,
        },
        data() {
            return {
                types: '',// choose-选择
                articleList: [],
            }
        },

        onLoad(options) {
            // console.log('onLoad 页面加载', options);
            this.setData(options);
			this.addlist();
        },

        // 页面显示
        onShow() {
           this.addlist();
            // 获取地址列表
           
        },
        methods: {
             // 获取地址列表
             addlist() {
                 var userData = wx.getStorageSync('user');
                 if (userData) {
                     var id = userData.id;
					 uni.wjw_http({
						 url: 'address/list',
						 data: {
							 userId: userData.id
						 },
					 }).then(res => {
						 if(res.status ==0){
							  this.articleList = res.result||[];
						 }
					 })
				}
             },

            // 选择地址
            choose(e,msg) {
				let message=msg;
                var {id} = this.dataset(e);
                var pages = getCurrentPages();
                pages.pop();
                var page = pages.pop().$vm;
                page.addressid=id;
				let userId=wx.getStorageSync('user').id;
				 uni.wjw_http({
					 url:'address/update',
					 data:{
						 id:message.id,
						 userId:userId,
						 addressee:message.addressee,
						 address:message.address,
						 phone:message.phone,
						 is_default:1,
						 province_id:message.province_id,
						 city_id:message.city_id,
						 area_id:message.area_id 
					 }
				 }).then(res=>{
					 if(res.status ==0){
						wx.navigateBack();
					 }
				 })
            },
			address_edit(id,addressee,phone,province_name,city_name,area_name,address,is_default){
				let aa =province_name+city_name+area_name+address;
				uni.navigateTo({					url:'/pages/editAddress?id='+id+'&addressee='+addressee+'&phone='+phone+'&province_name='+province_name+'&city_name='+city_name+'&area_name='+area_name+'&address='+address+'&is_default='+is_default				 })
			 },
            //更换默认地址
            //编辑地址
            address_update(e) {
              
                var {index,type} = this.dataset(e);

                var userData = wx.getStorageSync('userData');
                var userId = userData.id;
                var token = wx.getStorageSync('token');
                var adr = this.articleList[index];
                var data = {
                        token: token,
                        userId: userId,
                        id:adr.id,
                    };
                if(type=='is_default'){
                    var is_default=adr.is_default==0?1:0;
                    data.is_default=is_default;
                    console.log('编辑地址 data', data);
                }else{
                    Object.assign(data,adr);
                }
                   // /pages/editAddress
                uni.wjw_http({
                    url: "address/update",
                    data: data,
                }).then(res => {
                    console.log('编辑地址 接口 请求成功', res);
                    this.articleList.map(item=>item.is_default=0);
                    this.articleList[index].is_default=is_default;

                    // 获取地址列表
                    // this.addlist();

                })
            },


            //删除地址
            address_delete(e) {
				let that=this;
                console.log('删除地址', arguments, JSON.stringify(arguments));
                var {id} = this.dataset(e);
                
                var userData = wx.getStorageSync('userData');
                var userId = userData.id;
                var token = wx.getStorageSync('token');
				console.log(id)
				console.log('删除')
                 uni.showModal({
                     title: '提示',
                     content: '确认删除此地址',
                     success: function (datas) {
                         if (datas.confirm) {
                            uni.wjw_http({
                                url: "address/delete/"+id,
                                data: {
                                   
                                    userId: userId,
                                    id:id,
                                },
                            }).then(res => {
								if(res.status ==0){
									// console.log(res)
									// console.log(333333)
									that.addlist()
									that.$forceUpdate()
								}
                               
                            })
                         } else if (datas.cancel) {
                             console.log('用户点击取消');
                         }
                     }
                 });
             
            },


        }
    }
</script>

<style  scoped>
	button::after{
		border:none;
	}
    label.label-checkbox input[type=checkbox][data-checked=true]+.item-media i.icon-form-checkbox, 
    label.label-checkbox input[type=radio][data-checked=true]+.item-media i.icon-form-checkbox 
    {
        background-color: #0894ec;
        border: none;
    }
    label.label-checkbox input[type=checkbox][data-checked=true]+.item-media i.icon-form-checkbox:after, 
    label.label-checkbox input[type=radio][data-checked=true]+.item-media i.icon-form-checkbox:after {
        background: no-repeat center;
        background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%…%2C4.2%200%2C4.9%203.9%2C8.8%203.9%2C8.8%203.9%2C8.8%20'%2F%3E%3C%2Fsvg%3E);
        background-size: .6rem .45rem;
    }

    .choose-address-list{
        margin-top: 3rpx !important;
    }

 .operate{
	 display: flex;
 }
 .uni-addAdresss{
	 width: 750rpx;
	 height: 100vh;
	position: relative;;
	 left:0;
	 top:0;
 }
 .page_btn{
	 width: 750rpx!important;
	 border-radius: 0!important;
	 background-color: #FF7599;
	 text-align: center;
	 border-radius: 40rpx;
	 position: fixed;
	 left:0rpx;
	 bottom:0rpx;
	 z-index:10;
	 margin:0!important;
 }
</style>
