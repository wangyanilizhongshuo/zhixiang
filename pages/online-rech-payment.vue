<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>充值</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="shortcut icon" href="">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="stylesheet" href="../lib/light7/light7.min.css">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/otherCss/wq.css">
    <link rel="stylesheet" href="../css/otherCss/member.css">
</head>
<body>
<!-- 你的html代码 -->
<style>
   .cr{ color: #bfbfbf}
   .pay-way3{ position: relative;}
   .pay-way-list label {
    position: absolute;
    top: 3px;
    right: 10px;
    z-index: 299;
}
</style>
<div class="page">
    <div class="content">
        <div class="pay-way">
            <div class="pay-way3 pay-way-list" >
                <div class="pay-img1"><img src="http://zxyp.hzbixin.cn/files/54881600417780274.jpg"></div>
                <span>微信</span>
                <label for="s1" class="bui-radios-label bui-radios-anim">
                        <input type="radio" name="memberpay" class="choose choice" value="0" checked typeof="0" id="s1">
                        <i class="bui-radios"></i>
                      </label>
            </div>
        </div>
    </div>

</div>
<div class="payment-but">
        <button class="exit-btn">确认</button>
</div>
<style>
.passwordLabel-1 .pwd {
    float: left;
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border: 1px solid #dedede;
    margin-left: -1px;
    background-color: #ffffff;
}
.payment-but{
    position:fixed;
    bottom:35px;
    left:0; 
    height:40px;
    z-index: 2100;
    width: 100%;
    text-align: center;
}
.exit-btn{
    width: 95%;
    height: 40px;
    line-height: 40px;
    background-color: #00b8ee;
    text-align: center;
    font-size: 14px;
    color: #ffffff;
    border-radius: 4px;
}   
</style>

<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/jquery/jquery.query-2.1.7.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7-swiper.min.js' charset='utf-8'></script>
<script src="../del/main11.js"></script>
<script type='text/javascript' src='../js/main.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/page.js' charset='utf-8'></script>
<script>
        var pay = new toPay();
        var id = $.query.get("id");
        var money = $.query.get("money");

        $(".pay-way3").on("click", function () {
            var addressid = localStorage.addressid;
            var num = localStorage.counts;
            var repid = parseInt(localStorage.repIds);
            var psw = localStorage.psw;
            pay.Pay(psw, addressid, num, repid);

        })



        function toPayOK(data) {
            if (data.status == -1) {
                $.toast(data.msg);
            } else if (data.status == 0) {
                location.href = "paySuccess.html"
            } else {
                $.toast(data.msg);
            }
        }

  
</script>

</body>
</html>