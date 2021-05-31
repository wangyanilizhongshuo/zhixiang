<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <link rel="shortcut icon" href="">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title>快速抢购</title>
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
</head>
<body>
    <div class="contnet">
        <div class="com-top">
            <div class="arrow-l" @click='jump' data-url=' ' data-type='6'></div>
            <div class="page-title">快速抢购</div>
            <div class="save-1">
            </div>
        </div>
        <div class="rushTobuy ma-top44">
            <div class="points-scroll">
                <div class="scroll-box">
                    <div class="rush-box">
                        <ul>
                                
                            <!--<li><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/commodity_pictures.png"></li>
                            <li><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/commodity_pictures.png"></li>
                            <li><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/commodity_pictures.png"></li>
                            <li><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/commodity_pictures.png"></li>-->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</body>         
</html>

<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/main.js' charset='utf-8'></script> 
<script type='text/javascript' src='../js/rushTobuy.js' charset='utf-8'></script> 
<script>
        $(function () {
            $(".arrow-l").on("click", function () {
                history.go(-1);
                return false;
            })
        })
</script>  
<style>
        .rushTobuy{
            width:100%;
            position: relative;
            overflow: hidden; 
            border-top: 1px solid #e6e6e6;
        }
         body{ background: #fff;}
         .rush-box{
             padding:0 2% 5px; 
         }
         .rush-box li{
             width:100%;
             height:3rem;
             margin-bottom:10px;
             float: left;
         }
         .rush-box li img{
             width:100%;
             height:100%;
         }
         .rushTobuy-img img{ 
         width:100%; 
        height: 2.6rem;
        }
        </style>