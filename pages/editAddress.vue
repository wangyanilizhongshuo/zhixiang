<template>
    <view class="uni-editAddress"> 
        <!-- 你的html代码 -->
        <div class="page">
            <div class="content">
             
                <div class="list-block mt0">
                    <ul>
                            <li>
                                <div class="weui-cells_form">
                                    <div class="weui-cell">
                                        <div class="weui-cell__hd"><label class="weui-label">收货人</label></div>
                                        <div class="weui-cell__bd">
                                            <input type="text" id="name" maxlength="8" class="weui-input" placeholder="请输入收货人姓名" v-model='article.addressee'>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="weui-cells_form">
                                    <div class="weui-cell">
                                        <div class="weui-cell__hd"><label class="weui-label">联系号码</label></div>
                                        <div class="weui-cell__bd">
                                            <input type="text" id="phone" maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')" class="weui-input"
                                                placeholder="请输入收货人联系方式" v-model='article.phone'>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="weui-cells_form">
                                    <div class="weui-cell">
                                        <div class="weui-cell__hd"><label class="weui-label">所在地区</label></div>
                                        <div class="weui-cell__bd">
                                            <!-- <input type="text" id='city-picker2' value="" class="weui-input" placeholder="请选择城市"> -->
                                            
                                              <picker mode="region" 
                                                @change="bindRegionChange" 
                                                  :value="[
                                                    article.province_name,
                                                    article.city_name,
                                                    article.area_name
                                                   ]"
                                                >
                                                
                                                <input type="text" id='city-picker2' value="" class="weui-input" placeholder="请选择城市" disabled  
                                                :value="
                                                    (article.province_name||'')+
                                                    (article.city_name||'')+
                                                    (article.area_name||'')
                                                ">
                                              </picker>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                            
                                <div class="weui-cells_form">
                                    <div class="weui-cell">
                                        <div class="weui-cell__hd"><label class="weui-label">详细地址</label></div>
                                        <div class="weui-cell__bd">
                                            <textarea class="weui-input editAddress-area" id="address-de" name="" placeholder="请输入详情地址" v-model='article.address'></textarea>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="weui-cells_form">
                                    <div class="weui-cell weui-cell_switch" >
                                        <div class="weui-cell__bd">设为默认地址</div>
                                        <div class="weui-cell__ft">
                                            <!-- <input type="checkbox" id="check" class="weui-switch"> -->
                                            <switch  :checked="article.is_default" @change="trigger" data-name='article.is_default' />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            </ul>

                <view class="page_btn" @click='address_save' >保存</view>

            </div>
        </div>
        </div>
        
    </view>
</template>

<script>
    import main from "@/component/css/main";
    import jzl from "@/component/css/jzl";
    import site from "@/component/css/site";
    import addAddress from "@/component/css/page/addAddress";


    export default {

        components: {
            addAddress,
            site,
            jzl,
            main,
        },
        data() {
            return {
                drawing: 0,
                article: {},
				id:'',
				addressee:'',
				phone:'',
				province_name:'',
				city_name:'',
				area_name:'',
				address:'',
				is_default:""              
            }
        },
		onLoad(options){
			this.setData(options)
			this.article.phone=this.phone;
			this.article.addressee=this.addressee;
			this.article.city_name=this.city_name;
			this.article.province_name=this.province_name;
			this.article.area_name=this.area_name;
			this.article.address=this.address;
			this.article.is_default=this.is_default;
		},
        methods: {
            bindRegionChange: function (e) {
                console.log('picker发送选择改变，携带值为', e.detail.value)
                var arr = e.detail.value;
                this.article.province_name = arr[0];
                this.article.city_name = arr[1];
                this.article.area_name = arr[2];
                // this.article = this.article;
                this.drawing++;
            },
            
            //新增地址
            address_save(e) {
                console.log('新增地址', arguments);
                    let that=this;
              

                var userData = wx.getStorageSync('userData');
                var userId = userData.id;
                var token = wx.getStorageSync('token')
                var adr = this.article;
                var data = {
                        token: token,
                        userId: userId,
						id:that.id
                        // id:adr.id,
                    };
                    Object.assign(data,adr);

                if(
                    !(
                        adr.addressee&&
                        adr.address&&
                        adr.phone&&
                        adr.province_name&&
                        adr.city_name&&
                        adr.area_name&&
                        true
                    )
                ){
                    this.toastTip('请完善信息')
                    return
                }

                this.city_data.some(item=>{
                    if(item.name==this.article.province_name){
                        this.article.province_id=item.code;
                        data.province_id=item.code;

                        item.sub.some(item=>{
                            if(item.name==this.article.city_name){
                                this.article.city_id=item.code;
                                data.city_id=item.code;

                                item.sub.some(item=>{
                                    if(item.name==this.article.area_name){
                                        this.article.area_id=item.code;
                                        data.area_id=item.code;

                                        return true;
                                    }
                                })

                                return true;
                            }
                        })

                        return true;
                    }
                })
                data.is_default = data.is_default?1:0;

                uni.wjw_http({
                    url: "address/update",
                    data: data,
                }).then(res => {
					if(res.status ==0){
						console.log('success')
						wx.navigateBack()
					}
                })
            },

        }
    }
</script>

<style scoped lang="scss">
 .uni-editAddress{
	 height: 100vh;
	 position: relative;
	 top:0;
	 left:0;
 }
 .page_btn{
	 width: 750rpx;
	 height: 100rpx;
	 line-height: 100rpx;
	 text-align: center;
	 background-color: #FF7599;
	 color: #fff;
	 position: absolute;
	 bottom: 0;
	 left: 0;
	 margin:0!important;
 }


</style>


