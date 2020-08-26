<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <link rel="shortcut icon" href="">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title>在线充值</title>
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
<!-- 你的html代码 -->
<div class="page" style="display: inline;">
    <div class="content">
        <div class="com-top">
            <div class="arrow-l" @click='jump' data-url=' ' data-type='6'></div>
            <div class="page-title">在线充值</div>
            <div class="save-1"><a class="bock" href="online-rech-record.html">充值记录</a></div>
        </div> 
        <div class="rech ma-top44">
          <div class="points-scroll"> 
             <div class="scroll-box"> 
            <div class="rech-box">
                <!--<div class="box-list">
                        <div class="list-title"><span>充值返现送豪礼</span></div>
                        <div class="cont-tetle">
                            <div class="tetle-box">
                                <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/xiantiao.png" alt="">
                                <span class="rech-nama">70充值返现豪礼送</span>
                                <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/xiantiaoyou.png" alt="">
                            </div>  
                         </div>
                         <p class="tc"><label class="tern-title">余额赠品二选一</label></p>  
                        <div class="cont-info">
                                <p class="goods-cr"><span>送120元现金+198元羊奶粉一盒</span></p>
                            <div class="cont-wp">
                                <div class="info-money">
                                    <p class="money-img"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/red_bag.png"></p>
                                    <p class="money-cr"><span>53000金额</span></p>
                                </div>
                                <div class="info-goods">
                                    <p class="goods-img"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/commodity_pictures.png"></p>
                                </div> 
                            </div> 
                        </div> 
                        <p class="tc rech-but">
                            <a href="javascript:;" class="rech-serve"><span class="cr1">60充值返现豪礼送</span><span class="cr2 fr">立即充值</span></a>
                        </p>
                    </div>-->
                </div>
                <div class="infinite-scroll-preloader"><div class="preloader"></div></div>

            </div> 
            </div> 
            </div>
        </div>
   </div>
<style>
  .page {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    width: 100%;
    height: 100%;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: #efeff4;
}
.content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
    .rech{
        width:100%; 
        background:#eff8ffad url(http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/diwen.png) no-repeat;
        background-size:100% auto;
        padding-top:0.3rem; 
        position: relative;
        overflow: hidden;
    }
    .rech-box{
        padding:0 0.26rem 0.1rem;
       
    }
    .rech-box .box-list{
        border-radius:5px;
        background:#fff;
        padding-bottom:0.2rem; 
        margin-bottom:0.4rem; 
        -webkit-box-shadow: #2082afde 0px 0px 0.2rem;
        -moz-box-shadow: #2082afde 0px 0px 0.2rem; 
        box-shadow: #2082afde 0px 0px 0.2rem; 
    } 
    .rech-box .box-list .list-title{
        padding-left:0.2rem; 
        color:#fff;
        height:0.80rem;
        line-height:0.7rem; 
        background:#eff8ffad url(http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/dikuang.png) no-repeat;
        background-size:100% 100%;
    }
.cont-tetle{ width:100%; display: block; text-align: center }

.tern-title{
    border: 1px solid #73B1D6;
    text-align: center;
    font-size:0.22rem; 
    padding:0 0.1rem;
    margin:0.2rem 0;
    height:0.46rem;
    line-height:0.46rem;
    color:#73B1D6;
    display:inline-block;
    border-radius:0.20rem;  
}
.tetle-box{
    width: 100%;
    height:0.5rem;
    line-height:0.5rem; 
    text-align: center;
}

.tetle-box .rech-nama{
    color:#73B1D6;
    margin:0 0.2rem;
    font-size:0.3rem;  
}
.tetle-box img{
    height:1px;
    width:0.9rem;
    margin-top:-0.08rem;   
}
.cont-info{ 
    width:100%;
    height:100%;
    margin:0.2rem 0 0.3rem;
    position: relative; 
}

.cont-wp{
    width:60%;
    margin:0.1rem auto;
    display: flex;
    position: relative;
}
.cont-wp div{
    width:50%;
 
}
.info-money{ text-align: center; }
.info-goods{ text-align: center; }
.cont-wp .info-money img,.info-goods img{
    width:1.1rem;
    height:1.1rem;
    margin-bottom:0.2rem; 
}
.cont-wp .money-cr{
    color: #f00;
    font-size:0.26rem;
    height:19px;  
}
 .goods-cr{
     width:50%;
    color: #c2c2c2;
    font-size:0.26rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    text-align: center;
    position: absolute;
    bottom:0.08rem;
    right:0  
}
.rech-but{
    width:100%;
    margin-bottom:0.1rem;  
}
.rech-serve{
        color:#fff;
        width:80%;
        margin:0 auto; 
        height:0.6rem;
        line-height:0.6rem;
        display: inline-block; 
        background: url(http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/anniu.png) no-repeat;
        background-size:100% 100%;
        -webkit-box-shadow:  #Ffffff 0px 0px 0.2rem;
        -moz-box-shadow:  #Ffffff  0px 0px 0.2rem; 
        box-shadow:  #Ffffff  0px 0px 0.2rem; 
       
}

.rech-serve .cr1{
    color: #000;
    font-size:0.22rem;
    width:54%;
    display:inline-block;
}
.rech-serve .cr2{
    color: #fff;
    font-size:0.26rem; 
    width:30%;
    display:inline-block;
    text-align: left
}
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
<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/main.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/page.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/online-rech.js?v=1.2' charset='utf-8'></script>
</body>
</html>