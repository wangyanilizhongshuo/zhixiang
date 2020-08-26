<template>
    <view>


        <!-- 你的html代码 -->
        <div class="page">
            <div class="content">
                <div class="com-top">
                    <div class="arrow-l" @click='jump' data-url=' ' data-type='6'></div>
                    <div class="page-title">填写退货信息</div>
                </div>
                <div class="list-block ma-top44">
                    <div class="newUser-text">
                        <div class="newUser-label">
                            <input type="text" id="return_cmp" maxlength="20" class="newUser-input" placeholder="请输入物流公司">
                        </div>
                        <div class="newUser-label">
                            <input type="text" id="return_order" maxlength="40" class="newUser-input" placeholder="请输入运单号">
                        </div>

                        <div class="weui-btn-area newUser-label"><button class="weui-btn" id="submission" @click='jump' data-url='/pages/toexamineSuccess' data-type='2' >提交</button></div>
                    </div>

                </div>
            </div>
        </div>
        
    </view>
</template>

<script>
    import main from "@/component/css/main";


    export default {

        components: {
            main,
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

    /*@import "../common/commons/css/main.css";*/


    .com-top{ border-bottom: 1px solid #e6e6e6}
    .weui-btn-area{ text-align: center}
    #submission{
        background-color: #00b8ee; 
        border-radius: 5px;
        text-align: center;
        margin-top:50px;
        color: #ffffff;
        width: 100%;
        margin: 0 auto;
        height: 40px;
        line-height:40px; 
    }
    .newUser-text{
        padding: 0 20px;
        margin-top: 80px;
    }
    .newUser-label {
        margin-bottom:20px;
        position: relative;
        width: 100%;
    }
    .newUser-input {
        width: 100%;
        background-color: #ffffff;
        border-radius: 4px;
        text-indent: 10px; 
        font-size: 14px;
        border: 0;
        height: 40px;
        line-height: 40px;
        position: relative;
        border:1px solid #e6e6e6;
    }
    .newUser-input:focus{
        outline: 0
    }
    #submission:focus{
        outline: #00b8ee; 
    }
           
    


</style>

<!--  
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>退货信息</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
</head>

<body>
    <style></style>

    <script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
    <script type='text/javascript' src='../lib/jquery/jquery.cookie.js' charset='utf-8'></script>
    <script src="../js/main.js"></script>
    <script src="../js/page.js"></script>
    <script type="text/javascript" src="../del/main11.js"></script>
</body>
<script>
    var id = GetQueryString("orderId");
    var suborde = new OrderDetail();
    $("#submission").on("click", function () {
        nottoLog();
        var return_cmp = $("#return_cmp").val();
        var return_order = $("#return_order").val();
        suborde.suborder(id, return_cmp, return_order);
    })
    function suborderOk(data) {
        if (data) {
            if (data) {
                var info = data.result
                if (data.status == -1) {
                    mytoast(data.msg);
                } else if (data.status == 0) {
                    history.go(-1);
                    return false;
                } else {
                    mytoast(data.msg);
                }
            }
        }
    }   
</script>

</html>
-->
