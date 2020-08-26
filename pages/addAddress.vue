<template>
    <view>


        <!-- 你的html代码 -->
        <div class="page">
            <div class="content">
                <!-- 
                <div class="com-top">
                    <div class="arrow-l" @click='jump' data-url=' ' data-type='6'></div>
                    <div class="page-title">新增地址</div>
                    <div class="save-1">
                        <a class="addsiteserve" href="javascript:;"  @click='jump' data-url=' ' data-type='6' >保存</a>
                    </div>
                </div>
                 -->
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

                <button class="page_btn" @click='address_save' >保存</button>

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

                var userData = wx.getStorageSync('userData');
                var userId = userData.user.id;
                var token = userData.token;
                var adr = this.article;
                var data = {
                        token: token,
                        userId: userId,
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
						wx.navigateBack()
					}
                })
            },

        }
    }
</script>

<style>

    /*@import "http://jqweui.com/dist/lib/weui.min.css";*/
    /*@import "../common/commons/cdn/weui.min.css";*/

    /*@import "http://jqweui.com/dist/css/jquery-weui.css">;*/
    /*@import "../common/commons/cdn/jquery-weui.css";*/

    /*@import "../common/commons/css/main.css";

    @import "../common/commons/css/otherCss/jzl.css";

    @import "../common/commons/css/otherCss/site.css";*/



    /*
    .weui-cell {
        padding: 10px 15px;
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
    }

    .weui-cell:first-child:before {
        display: none;
    }
    .weui-cell:before {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #e5e5e5;
        color: #e5e5e5;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        left: 15px;
        z-index: 2;
    }

    .weui-label {
        display: block;
        width: 105px;
        word-wrap: break-word;
        word-break: break-all;
    }
    .weui-cell__bd {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
    }

    .weui-cells_form input, .weui-cells_form label[for], .weui-cells_form textarea {
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

    .weui-input {
        width: 100%;
        border: 0;
        outline: 0;
        -webkit-appearance: none;
        background-color: transparent;
        font-size: inherit;
        color: inherit;
        height: 1.47058824em;
        line-height: 1.47058824;
    }
    .weui-switch-cp__box:before, .weui-switch:before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 30px;
        border-radius: 15px;
        background-color: #fdfdfd;
        -webkit-transition: -webkit-transform .35s cubic-bezier(.45,1,.4,1);
        transition: -webkit-transform .35s cubic-bezier(.45,1,.4,1);
        transition: transform .35s cubic-bezier(.45,1,.4,1);
        transition: transform .35s cubic-bezier(.45,1,.4,1),-webkit-transform .35s cubic-bezier(.45,1,.4,1);
    }
    .weui-switch-cp__box:after, .weui-switch:after {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(0,0,0,.4);
        -webkit-transition: -webkit-transform .35s cubic-bezier(.4,.4,.25,1.35);
        transition: -webkit-transform .35s cubic-bezier(.4,.4,.25,1.35);
        transition: transform .35s cubic-bezier(.4,.4,.25,1.35);
        transition: transform .35s cubic-bezier(.4,.4,.25,1.35),-webkit-transform .35s cubic-bezier(.4,.4,.25,1.35);
    }
    .weui-cells_form input, .weui-cells_form label[for], .weui-cells_form textarea {
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

    .weui-switch, .weui-switch-cp__box {
        position: relative;
        width: 52px;
        height: 32px;
        border: 1px solid #dfdfdf;
        outline: 0;
        border-radius: 16px;
        box-sizing: border-box;
        background-color: #dfdfdf;
        -webkit-transition: background-color .1s,border .1s;
        transition: background-color .1s,border .1s;
    }
    .weui-switch {
        -webkit-appearance: none;
        appearance: none;
    }
    .weui-switch-cp__box:before, .weui-switch:before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 30px;
        border-radius: 15px;
        background-color: #fdfdfd;
        -webkit-transition: -webkit-transform .35s cubic-bezier(.45,1,.4,1);
        transition: -webkit-transform .35s cubic-bezier(.45,1,.4,1);
        transition: transform .35s cubic-bezier(.45,1,.4,1);
        transition: transform .35s cubic-bezier(.45,1,.4,1),-webkit-transform .35s cubic-bezier(.45,1,.4,1);
    }

    .weui-switch-cp__box:after, .weui-switch:after {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(0,0,0,.4);
        -webkit-transition: -webkit-transform .35s cubic-bezier(.4,.4,.25,1.35);
        transition: -webkit-transform .35s cubic-bezier(.4,.4,.25,1.35);
        transition: transform .35s cubic-bezier(.4,.4,.25,1.35);
        transition: transform .35s cubic-bezier(.4,.4,.25,1.35),-webkit-transform .35s cubic-bezier(.4,.4,.25,1.35);
    }
    .weui-switch:checked {
        border-color: #04be02;
        background-color: #04be02;
    }


    .weui-cells_form {
        padding-left: 3%
    }
    
    .weui-cell {
        border-bottom: 1px solid #e7e7e7;
    }
    .list-block {
        margin-top: 50px;
    }
    
    */


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
