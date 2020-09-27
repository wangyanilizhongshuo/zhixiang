<template>
    <view>


        <div class="com-top">
            <div class="arrow-l" @click='jump' data-url=' ' data-type='6'></div>
            <div class="page-title">修改成功</div>
            <!-- <div class="save-1">完成</div> -->
        </div>
        <div class="submit-content">
            <div class="submit-content">
                <div class="submit-content1">
                    <img src="http://zxyp.hzbixin.cn/files/76211600415832285.jpg">
                    <div class="submit-center"><span>您的支付密码已修改成功</span></div>
                </div>
            </div>
        </div>
        
    </view>
</template>

<script>
    import light7_min from "@/component/css/light7_min";
    import light7_swiper_min from "@/component/css/light7_swiper_min";
    import main from "@/component/css/main";
    import wq from "@/component/css/wq";


    export default {

        components: {
            wq,
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


