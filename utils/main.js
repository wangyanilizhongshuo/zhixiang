/********************************系统配置值开始********************************/
var config =
    [
        //服务器信息
        {            
            //服务器地址
         //serverUrl:"http://10.172.16.175:8083/"
        serverUrl:"http://billionhappy.hyweb.com.cn:8083/",
        // serverUrl:"http://47.99.107.54:8083/",
        },
        //界面配置
        {            //errorToast
            ajaxError:"1",
        },
        //常用值
        {
            userInfo:"",
            size:10,
        },
        //界面回调值
        {
            loginUrl:"",
        },
        //微信值配置
        {
            APPID:localStorage.getItem("APPID"),
            MCHID:localStorage.getItem("MCHID"),
            APPSECRET:localStorage.getItem("APPSECRET"),
            KEY:localStorage.getItem("KEY")
        }
    ];
/*
** Created by ma jun  hua
* */
var datasrc="http://billionhappy.hyweb.com.cn:8083/";

var webConfig = {
    //服务器连接地址
    url: "http://billionhappy.hyweb.com.cn:8083/",
    imgUrl:"http://billionhappy.hyweb.com.cn:8083/",
    serverUrl:"http://billionhappy.hyweb.com.cn:8083/",
    server: "http://billionhappy.hyweb.com.cn:8083/",
    userInfo:"",
    userData:"",
};

var ajaxFunction = {
    //普通ajax
    common:function(param,success,type){
        wx.request({
            method: "post",
            url: webConfig.serverUrl+param.url,
            data:param.data[0],
            dataType:'json', //接受数据格式
            enableCache:false,
            success: function(data){
                if(typeof(data)=="object"){
                    var data=data;
                }else{
                    var data=eval('(' + data + ')');
                };
                if(data.status==0){
                    success(data,type);
                }else if(data.status==-95){
                    window.location.href ='login.html';
                }else{
                    mytoast(data.msg)
                }
            },
            error: function(){

            }
        });
    },
};
var ajaxFunction2 = {
    common:function(param,success,type){
        wx.request({
            method: "post",
            url: webConfig.serverUrl+param.url,
            data:param.data[0],
            dataType:'json', //接受数据格式
            enableCache:false,
            success: function(data){
                if(data.status==0){
                    success(data,type);
                }else if(data.status==-95){
                    window.location.href = 'login.html'
                }else{
                    mytoast(data.msg)
                }
            },
            error: function(){

            }
        });
    },
};


var ajaxFunction3 = {//视频提交，音频提交 专用
    common:function(param,success,type){
        wx.request({
            method: "post",
            url: webConfig.serverUrl+param.url,
            data:param.data[0],
            dataType:'json', //接受数据格式
            enableCache:false,
            success: function(data){
                if(data.status==0){
                    success(data,type);
                }else if(data.status==-95){
                    window.location.href ='login.html';
                }
            },
        });
    },
};

//截取url?后的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
//时间戳转时间
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
    h =(date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
    m =(date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
    s =(date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
    return Y+M+D+h+m+s;
}
/**************JS精确计算函数**************/
//加法
function accAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2))
    return (arg1*m+arg2*m)/m;
}

//减法
function accSubtr(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
//动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
}

//乘法
function accMul(arg1,arg2)
{
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}
//验证码倒计时
// function countDown(){
//     var time = 60;
//     var timeId = setInterval(function(){
//         if(time>0){
//             time = time -1;
//             var minute = time/60;
//             if(minute.toString().indexOf(".")!=-1){
//                 minute = minute.toString().split(".")[0];
//             }
//             if(minute<10){
//                 minute = "0"+minute;
//             }
//             var second = time - 60*minute;
//             if(second<0){
//                 second =  "0"+second;
//             }
//             $(".get-code").addClass("disabled");
//             $(".get-code").val( second + "秒" + "重新获取");
//         }else{
//            $(".get-code").removeClass("disabled");
//             $(".get-code").val("获取验证码");

//             clearInterval(timeId);
//         }
//     },1000);
// }
Array.prototype.notempty = function(){
    for(var i=0; i<this.length; i++){
        if(this[i] == "" || typeof(this[i]) == "undefined"){
            this.splice(i,1);
            i--;
        }
    }
    return this;
};

// function mytoast(mess){//toast 效果
//     var str='<div class="mytoast"><div class="mytoast-box"><span></span></div></div>';
//     $("body").append(str);
//     $(".mytoast").fadeIn().find("span").html(mess);
//     setTimeout(function(){
//         $(".mytoast").fadeOut().remove();
//     },2000)
// }