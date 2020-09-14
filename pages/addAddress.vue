<template>
    <view>
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

                <button class="page_btn" @tap='address_save' >保存</button>

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
                article: {}
                
            }
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

                // this.toastTip(JSON.stringify(this.article))
                // return

                var userData = wx.getStorageSync('user');
                // var userId = userData.user.id;
                 // var token = wx.getStorageSync('user');
                var adr = this.article;
                var data = {
            
                        userId: userData.id,
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
                    url: "address/save",
                    data: data,
                }).then(res => {
					if(res.status ==0){
						uni.navigateBack();
					}
                })
            },

        }
    }
</script>
<style>
</style>

<!--  
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>新增地址</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    
</head>
<body>

<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/jquery/jquery.cookie.js' charset='utf-8'></script>
<script type="text/javascript" src='../lib/jquery-weui/jquery-weui.js'></script>
<script type="text/javascript" src='../js/city-picker.js'></script>
<script src="../js/main.js"></script>
<script src="../js/page.js"></script>
<script type="text/javascript" src="../del/main11.js"></script>
<script>

    $("#city-picker2").cityPicker({
        title: "所在地区",
        onChange: function (picker, values, displayValues) {
    }
 });
   $(function(){

    /*$(".arrow-l").on("click", function () {
        history.go(-1);
        return false;
    })*/
      $(".addsiteserve").on("click",function(){
        nottoLog();//判断登录

        var userData = JSON.parse(localStorage.userData);//用户信息
        var userId =parseInt(userData.user.id); 
        var token = userData.token;
        var Src = datasrc + "address/save";
        var name=$("#name").val();
        var address=$("#address-de").val();//详情地址
        var phone=$("#phone").val();

        var city=$("#city-picker2").attr("data-codes");
        var arr=city.split(',');
        var province_id=arr[0];
        var city_id=arr[1];
        var area_id=arr[2];
        if(name==""){
            $.toast("请输入收货人姓名","text");
            return false; 
        }
        if(phone==""){
            $.toast("请输入收货人联系方式","text");
            return false; 
        } 
        if(city==""){
            $.toast("请选择城市","text");
            return false; 
        } 
        if(address==""){
            $.toast("请输入详情地址","text");
            return false; 
        }     
        var is_default="";//默认选择
        if($("#check").is(":checked")){
            is_default=1;
        }else{
            is_default=0;
        }

        $.post(Src, {token: token, userId: userId, addressee:name,address:address,phone:phone, is_default:is_default, province_id:province_id,city_id:city_id,area_id:area_id}, function (data) {
                 if (data) {
                     if (data.status == -1) {
                        $.toast(data.msg,"text");
                     } else if (data.status == 0) {
                        $.toast('添加成功',"text");
                        history.go(-1);
                     } else {
                        $.toast(data.msg,"text");
                     }
                 }
             });

      })


          
   }) 
</script>
</body>
</html>
-->
