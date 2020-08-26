<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>支付密码</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="shortcut icon" href="">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <link rel="stylesheet" href="../lib/light7/light7.min.css">
    <link rel="stylesheet" href="../lib/light7/light7-swiper.min.css">

    <link rel="stylesheet" href="../css/main.css">
</head>
<body>
<!-- 你的html代码 -->
<div class="page">
    <div class="content">
        <div class="pay-code-warp pay-code-warp02 clearfix">
            <p>请输入6位支付密码</p>
            <div class="code-content clearfix">
                <div class="pas-input"><i></i></div>
                <div class="pas-input"><i></i></div>
                <div class="pas-input"><i></i></div>
                <div class="pas-input"><i></i></div>
                <div class="pas-input"><i></i></div>
                <div class="pas-input input06"><i></i></div>
            </div>
            <div class="key-board-wrap">
                <table class="key-board">
                    <tr><td date="1">1</td><td date="1">2</td><td date="1">3</td></tr>
                    <tr><td date="1">4</td><td date="1">5</td><td date="1">6</td></tr>
                    <tr><td date="1">7</td><td date="1">8</td><td date="1">9</td></tr>
                    <tr><td date="0">取消</td><td date="1">0</td><td date="-1">X</td></tr>
                </table>
            </div>
            <!--        <img class="code-cancel" src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/cancel.png" alt="">-->
        </div>
    </div>
</div>
<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7-swiper.min.js' charset='utf-8'></script>

<script src="../del/main11.js"></script>
<script>
    var index = 0;
    var str = [];
    $(".key-board td").click(function(){
        if($(this).attr("date") == 1){
            var pasNum = parseInt($(this).html());
            $(".code-content i:eq("+index+")").addClass("password-num");
            str.push(pasNum);
            index++;
            if(index > 5){
                index = 6;
            }
            if(str.length == 6){
                location.href = "paymentCode.html";
            }
        }else if($(this).attr("date") == -1){
            str.pop();
            index--;
            if(index <= 0){
                index = 0;
            }
            $(".code-content i:eq("+index+")").removeClass("password-num");
        }else if($(this).attr("date") == 0){
            str = [];
            index = 0;
            $(".code-content i").removeClass("password-num");
            $(".mask-layer04").hide();
            $(".pay-code-warp").slideUp();
        }
    })
</script>
</body>
</html>