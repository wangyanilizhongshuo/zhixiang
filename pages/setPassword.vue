<template>
    <view>
        
        <!-- 你的html代码 -->
        <div class="page">
            <div class="content">
                <div class="com-top">
                    <div class="arrow-2" @click='jump' data-url=' ' data-type='6'>取消</div>
                    <div class="page-title">设置密码</div>
                </div>
                <div class="passwordDiv">
                    <p class="passwordText">请输入6位支付密码</p>
                    <!--  @click='jump' data-url='/pages/setPasswordSecond' -->
                    <label for="ipt" class="passwordLabel"  @click='jump' data-url='/pages/setPasswordSecond' data-type='2' >
                        <ul class="clearfix">
                            <input type="password" maxlength="1" class="pwd">
                            <input type="password" maxlength="1" class="pwd">
                            <input type="password" maxlength="1" class="pwd">
                            <input type="password" maxlength="1" class="pwd">
                            <input type="password" maxlength="1" class="pwd">
                            <input type="password" maxlength="1" class="pwd">
                        </ul>
                    </label>
                    <input type="password" id="password" name="password" maxlength="6" >
                </div>

            </div>
        </div>

    </view>
</template>

<script>
    import light7_min from "@/component/css/light7_min";
    import light7_swiper_min from "@/component/css/light7_swiper_min";
    import main from "@/component/css/main";
    import jzl from "@/component/css/jzl";
    import setPassword from "@/component/css/page/setPassword";


    export default {

        components: {
            setPassword,
            jzl,
            main,
            light7_swiper_min,
            light7_min,
        },
        data() {
            return {
                /*
                    true false
                    style="display: block;" v-if='jifen_show' 
                    @click='jifen_show=true' 
                    @click='jifen_show=false' 
                */
                jifen_show: false,
                
            }
        },
        methods: {
            
        }
    }
</script>

<style>
  

</style>

