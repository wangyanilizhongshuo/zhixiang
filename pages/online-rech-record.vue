<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <link rel="shortcut icon" href="">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title>充值记录</title>
    <script>
            (function () {//手机适配
                var html = document.querySelector("html");
                var width = html.clientWidth > 320 ? html.clientWidth : 320;
                html.style.fontSize = (width / 750) * 100 + 'px';
    
                window.addEventListener('resize', function () {
                    var html = document.querySelector("html");
                    var width = html.clientWidth > 320 ? html.clientWidth : 320;
                    html.style.fontSize = (width / 750) * 100 + 'px';
                })
            })()
        </script>
    <link rel="stylesheet" href="../css/styel.css">
    <link rel="stylesheet" href="../css/main.css">  
    <script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
</head>
<style>
    .com-top{
        border-bottom: 1px solid #e6e6e6;
    }
    .points-box{ width:100%}
    .points-list{
        padding: 0.2rem 0.2rem 0.1rem;
    }
    .infinite-scroll-preloader{margin:.3rem;text-align:center}
    .infinite-scroll-preloader .preloader{width:0.65rem;height:0.65rem; margin:0 auto;}
    .preloader:after{
        display:block;
        width:100%;
        height:100%;
        content:"";background-image:url(http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/load.gif);
        background-repeat:no-repeat;
        background-size:100%;
}
</style>
<body>
    <div class="contnet">
        <div class="com-top">
            <div class="arrow-l" @click='jump' data-url=' ' data-type='6'></div>
            <div class="page-title">充值记录</div>
            <div class="save-1">
            </div>
        </div>
        <div class="bargain-cont ma-top44">
                <div class="points-box">
                <div class="points-scroll">
                    <div class="scroll-box">
                        <div class="points-cont">
                            
                        </div>
                        <div class="infinite-scroll-preloader"><div class="preloader"></div></div>
                    </div>
                </div>
                </div>
        </div>
    </div>
    </div>
</body>
</html>
<script type="text/javascript" src="../lib/jquery/jquery.js" charset="utf-8"></script>
<script src="../js/main.js"></script>
<script src="../js/online-rech-record.js"></script>
<script>
     $(".arrow-l").on("click", function () {
            history.go(-1);
            return false;
        })
</script>