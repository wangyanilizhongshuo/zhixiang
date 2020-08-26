<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>确认订单</title>
    <link rel="syslesheet" href="../lib/jquery-weui/jquery-weui.css">
    <link rel="stylesheet" href="../css/reset1.css">
    <link rel="stylesheet" href="../css/otherCss/cj.css">
    <link rel="stylesheet" href="../css/otherCss/cj-1.css">
    <script src="../lib/jquery/jquery1.12.4.js"></script>
    <script src="../del/index1.js"></script>

</head>
<body>
<style>
.addrder{ 
    display:inline-block;
    width:100%;
    height:100%;  
}
</style>
<div class="confirmorder-top">
   </div>
<div class="address_bar"><img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/address_bar.png" alt="" ></div>

<div id="concon"></div>
<div class="confirmorder-send">
    <div><p>配送方式</p><p>快递：包邮</p></div>
    <div><p>备注</p><input type="text"placeholder="请输入备注信息"></div>
    <div><p>共计商品<span id="numm"></span>件</p><p>合计:</p><p id="zong"></p></div>
</div>

<div class="confirmorder-hb">
    <div><p>红包</p><label class="tr" style="color: #bfbfbf">未使用<span> ></span></label></div>
    <div><p>红包</p><label class="tr" style="color: #bfbfbf">未使用</label></div>
    <div><p>是否自提</p><label><input class="weui-switch" type="checkbox" value=""></label></div>
    </div>
</div>

<div class="confirmorder-botton">
    <div class="botton-mon">
        实付金额:  <span id="zong2"></span>
    </div>
    <div class="botton-finish">结算</div>
    <div class="mask-layer"></div><!--遮罩-->
    <div class="tips">
        <p class="tips-text1">提示</p>
        <p class="tips-text2">确认提交订单?</p>
        <div class="tips-button">
            <div class="tips-cancle">取消</div>
            <div class="tip-line"></div>
            <div class="tips-confirm">确定</div>
        </div>

    </div>

</div>
<script type='text/javascript' src='../lib/jquery/jquery.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../lib/light7/light7-swiper.min.js' charset='utf-8'></script>
<script type='text/javascript' src="../lib/jquery-weui/jquery-weui.js" charset="UTF-8"></script>
<script src="../del/main11.js"></script>
<script type='text/javascript' src='../js/main.js' charset='utf-8'></script>
<script type='text/javascript' src='../js/page.js' charset='utf-8'></script>
<script>

    var LocString=String(window.document.location.href);
    var num = GetQueryString("num");
    var price = GetQueryString("price");
    var name =  decodeURI(GetQueryString("name"));
    var addressnum =  GetQueryString("addressnum");
    var addressid =  GetQueryString("addressid");
    console.log(addressid)
    localStorage.addressid=addressid;
    addlist();
    function listOK(data) {
        var articleList = data.result;
        var articleHtml = "";
        if(articleList.length > 0){
            if(addressid=='没有这个参数'){
                localStorage.addressid=data.result[0].id;
                console.log(localStorage.addressid)
            }
            $(articleList).each(function (i,info) {
                if(i==0&&addressid=='没有这个参数') {
                    articleHtml +=
                       ' <p  class="confirmorder-top-per">收货人:&nbsp;'+info.addressee+'</p>' +
                        '    <span class="confirmorder-top-tel">'+info.phone+'</span>' +
                        '    <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/order_add_icon.png" >\n' +
                        '    <p class="confirmorder-top-add">'+info.province_name+info.city_name+info.area_name+info.address+'</p>'
                }
                if(i==addressnum){
                    articleHtml +=
                        ' <p  class="confirmorder-top-per">收货人:&nbsp;'+info.addressee+'</p>' +
                        '    <span class="confirmorder-top-tel">'+info.phone+'</span>' +
                        '    <img src="http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/order_add_icon.png" >\n' +
                        '    <p class="confirmorder-top-add">'+info.province_name+info.city_name+info.area_name+info.address+'</p>'
                }

                // if(i>=1) {
                //     articleHtml +=
                //         '<div class="choose-address-wrap wrap" data-id="'+i+'">' +
                //         '<div class="address-detail">' +
                //         '<span class="receive-name">收货人：'+info.addressee+'</span>' +
                //         '  <span class="receive-phone">'+info.phone+'</span>' +
                //         '   <p class="address-val">'+info.province_name+info.city_name+info.area_name+info.address+'</p>' +
                //         '            </div>' +
                //         '        </div>'
                // }

            })
            $("body").on("click",".choose-address-wrap",function () {
                var id=$(this).attr("data-id");
                var name=data.result[id].addressee;
                var phone=data.result[id].phone;
                var address=data.result[id].province_name+data.result[id].city_name+data.result[id].city_name+data.result[id].address;
                console.log(name+phone+address)
                history.back(name+phone+address)
            })
            $(".confirmorder-top").html(articleHtml);
            console.log(data);
        }else{
            articleHtml+='<a class="addrder" href="">你还没有添加收货地址 点击这里添加</a>';
            $(".confirmorder-top").html(articleHtml);
        }

    }
    var shoppingCar = new shoppingCar();
    shoppingCar.getshopCarList();
    function getshopCarListOk(data){
        console.log(data)
        var carList = data.result;
        var carHtml = '';
        var indexnum=localStorage.carnum.split(",");
        console.log(indexnum);
        var total=0;
        var total2=0;
        var num=0;
        var idnum=Array();
        if(carList.length > 0){
            $(carList).each(function (i,goods) {
                if(i==parseInt(indexnum[i])){
                    carHtml +=
                        '<div class="confirmorder-middle"><img src="'+goods.pic+'" alt="">' +
                        '    <p class="confirmorder-middle-num">'+goods.title+'</p>' +
                        '    <p class="confirmorder-middle-gg">规格：<span>'+goods.attr_name+'</span></p>' +
                        '    <p class="confirmorder-middle-price"><span>¥'+(goods.price/100).toFixed(2)+'</span><span>&nbsp;&nbsp;&nbsp;积分：'+goods.points+'</span></p>' +
                        '    <span class="confirmorder-middle-amount">×<span>'+goods.buy_num+'</span></span></div>';
                    var proc=(goods.price/100)*goods.buy_num;
                    var jifen=goods.points*goods.buy_num;
                    total+=proc;
                    total2+=jifen;
                    num+=goods.buy_num
                    console.log(total+"     "+total2)
                    $("#zong").html("¥"+total+" 积分"+total2)
                    $("#zong2").html(total.toFixed(2))
                    $("#numm").html(num);

                }

            })

            $("#concon").append(carHtml)
            // if(data.result.hasNextPage == true){
            //     console.log(page+1)
            //     new getshopCarList(page+1);
            // }
        }
    }

    console.log(name)
    $(".botton-finish").click(function () {
        $(".tips").show()
        $(".mask-layer").show()
    })
    $(".tips-confirm").click(function () {
        var price= $("#zong2").text();
        location.href="payment2.html?price="+price
    })
    $(".tips-cancle").click(function () {
        $(".tips").hide()
        $(".mask-layer").hide()
    })
    $(".confirmorder-top").click(function(){
        location.href = "chooseAddress2.html"
    })
</script>

</body>
</html>