(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/red_page/active/active"],{"075f":function(e,t,i){},"2cc3":function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={data:function(){return{videoMask:!0,redRainFlag:!0,rainOccurFlag:!1,redFlag:!1,redSmallMoneyFlag:!1,redRainAllSumFlag:!1,redSmallMoney:0,windowWidth:"",windowHeigh:"",packetList:[{}],packetNum:100,showInter:"",top:"",inviteFlag:!1,personMsg:0,videoFlag:!0,videoBtnFlag:!0,watchTimes:0,videoMoneyFlag:!1,videoConFlag:!0,videoMoney:0,videoFlags:!1,rainflagsss:!1,hbyOccur:!1,timeList:[],sumMoney:"",sxtime:"",djsTime:"",ewmPicture:"",token:"",pagess:"pages/QRcode/QRcode",urlSrc:"",hbyNum:0,hbyNumFlag:!1,maskOnMove:!1,videoUrl:"",redRecord:[],seeMovie:!1,seeMpvieMsg:""}},onLoad:function(e){var t=this;wx.getSystemInfo({success:function(e){t.windowWidth=e.windowWidth,t.windowHeigh=e.windowHeight,t.top=e.windowHeight-800}}),this.getPerson(),this.getRedRainDetail(),this.getVideo(),this.getRedRecord(),this.setData(e);var i=(new Date).valueOf();if(this.sxtime>i){var a=parseInt((this.sxtime-i)/1e3),n=parseInt(a/3600%24),o=parseInt(a/60%60),s=a%60;this.djsTime=n+":"+o+":"+s}this.token=wx.getStorageSync("token")},onShareAppMessage:function(e){var t=this;if("button"===e.from||"menu"===e.from)return{title:"智享婴品",path:"/pages/index/index?"+t.getShareUrlParams()}},methods:{withDrawals:function(){e.redirectTo({url:"/pages/red_page/cash/cash"})},getRedRecord:function(){var t=this;wx.getStorageSync("user").id;e.wjw_http({url:"app/cduserredenvelope/list",type:"get"}).then((function(e){if(0==e.code){var i=e.data;for(var a in i){var n=new Date(i[a].createTime);i[a].createTime=n.getHours().toString().padStart(2,"0")+":"+n.getMinutes().toString().padStart(2,"0")}t.redRecord=i}}))},beginBattle:function(){this.videoMask=!0,this.redRainFlag=!1,this.redRain()},redRainOccur:function(){var e=this;this.maskOnMove=!0,this.hbyNum=this.hbyNum+1,this.hbyNum<4?1==this.rainOccurFlag?(this.videoMask=!1,this.rainflagsss=!0,this.getRedRainMoneny()):(this.hbyOccur=!0,setTimeout((function(){e.hbyOccur=!1}),3e3)):(this.hbyNumFlag=!0,setTimeout((function(){e.hbyNumFlag=!1}),3e3))},redRain:function(){for(var e=this,t=[{top:"",left:"",src:"",speed:""}],i=["http://zxyp.hzbixin.cn/files/49781597215660082.jpg","http://zxyp.hzbixin.cn/files/49781597215660082.jpg"],a=0;a<e.packetNum;a++){var n=Math.random()*e.windowWidth-160;n<0?n+=160:n>e.windowWidth&&(n-=160);var o={src:i[Math.ceil(3*Math.random())-1],top:-160,left:n,speed:2500*Math.random()+3e3};t.push(o),e.packetList=t}var s=0;e.showInter=setTimeout((function(){var i=Math.ceil(2*Math.random());if(s*i>=e.packetNum){var a=setTimeout((function(){e.redFlag=!1,e.redSmallMoneyFlag=!1,e.redRainAllSumFlag=!0,clearTimeout(a)}),3500);clearInterval(e.showInter)}else{switch(i){case 1:t[s].top=e.windowHeigh,s+=1;break;case 2:t[s].top=e.windowHeigh,t[s+1].top=e.windowHeigh,s+=2;break;case 3:t[s].top=e.windowHeigh,t[s+1].top=e.windowHeigh,t[s+2].top=e.windowHeigh,s+=3;break;default:}e.packetList=t}}),500)},tapImages:function(){Math.ceil(100*Math.random());this.redFlag=!0},getRedRainDetail:function(){var t=this;e.wjw_http({url:"app/cdredenveloperain/list",type:"get"}).then((function(e){if(0==e.code){var i=e.data;t.timeList=i;var a=i.some((function(e){var t=e.startTime,i=e.endTime,a=0,n=0,o=t.split(":")[0],s=t.split(":")[1],r=t.split(":")[2];a=Number(3600*o)+Number(60*s)+Number(r);var d=i.split(":")[0],c=i.split(":")[1],u=i.split(":")[2];n=Number(3600*d)+Number(60*c)+Number(u);var l=(new Date).getHours(),g=(new Date).getMinutes()<10?"0"+(new Date).getMinutes():(new Date).getMinutes(),p=(new Date).getSeconds()<10?"0"+(new Date).getSeconds():(new Date).getSeconds(),h=l+":"+g+":"+p,v=h.split(":")[0],f=h.split(":")[1],m=h.split(":")[2],w=Number(3600*v)+Number(60*f)+Number(m);return w>=a&&w<=n}));t.rainOccurFlag=1==a}}))},getPerson:function(){var t=this,i=wx.getStorageSync("user").id;e.wjw_http({url:"app/cduserredenvelope/redInfo",type:"post",data:{userId:i}}).then((function(e){if(0==e.code){t.personMsg=e.data;var i=t.personMsg.id;t.urlSrc="https://zxyp.hzbixin.cn/app/cduserredenvelope/getQrCode?token="+t.token+"&page="+t.pagess+"&scene="+i}}))},getRedRainMoneny:function(){var t=this,i=this,a=i.personMsg;e.wjw_http({url:"app/cduserredenvelopeassistance/assistance",type:"post",data:{userId:a.userId,envelopeId:a.id,assistanceType:3}}).then((function(e){0==e.code&&(t.redSmallMoney=e.data)}))},videoOccur:function(){this.maskOnMove=!0,this.videoFlag=!1,this.videoFlags=!0},getVideo:function(){var t=this;e.wjw_http({url:"app/cduserredvideoconfig/list",type:"get",data:{page:1,limit:3}}).then((function(e){0==e.code&&(t.videoList=e.data.list[0],t.watchTimes=e.data.list[0].watchTime/1e3,t.videoUrl="https://zxyp.hzbixin.cn"+e.data.list[0].videoLink)}))},autoEnd:function(e){var t=this,i=t.videoList.watchTime;i||(i=15e3),e.timeStamp>i&&(this.videoBtnFlag=!1)},videoBtn:function(){var t=this,i=this.personMsg,a=this.videoList.id;e.wjw_http({url:"app/cduserredenvelopeassistance/assistance",type:"post",data:{userId:i.userId,videoId:a,envelopeId:i.id,assistanceType:2}}).then((function(e){0==e.code?(t.videoMoney=e.data,t.videoMoneyFlag=!0,t.videoConFlag=!1,t.videoFlag=!1,t.videoFlags=!1):(t.videoMoneyFlag=!1,t.videoConFlag=!1,t.videoFlag=!0,t.videoFlags=!1,t.seeMovie=!0,setTimeout((function(){t.seeMovie=!1}),2500),t.seeMpvieMsg=e.msg)})).catch((function(e){}))}}};t.default=i}).call(this,i("543d")["default"])},"585a":function(e,t,i){"use strict";var a=i("075f"),n=i.n(a);n.a},a483:function(e,t,i){"use strict";i.r(t);var a=i("b9e1"),n=i("f512");for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);i("585a");var s,r=i("f0c5"),d=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"1a26663f",null,!1,a["a"],s);t["default"]=d.exports},b0a3:function(e,t,i){"use strict";(function(e){i("a53d");a(i("66fd"));var t=a(i("a483"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,i("543d")["createPage"])},b9e1:function(e,t,i){"use strict";var a,n=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){t.stopPropagation(),e.inviteFlag=!0,e.QRflag=!0,e.maskOnMove=!0},e.e1=function(t){t.stopPropagation(),e.videoMask=!0,e.rainflagsss=!1,e.maskOnMove=!1},e.e2=function(t){t.stopPropagation(),e.videoFlag=!0,e.videoFlags=!1,e.maskOnMove=!1},e.e3=function(t){t.stopPropagation(),e.redSmallMoneyFlag=!0,e.redFlag=!1},e.e4=function(t){t.stopPropagation(),e.redSmallMoneyFlag=!1},e.e5=function(t){t.stopPropagation(),e.redSmallMoneyFlag=!1},e.e6=function(t){t.stopPropagation(),e.redRainAllSumFlag=!1,e.videoMask=!0,e.redRainFlag=!0,e.rainflagsss=!1,e.maskOnMove=!1},e.e7=function(t){t.stopPropagation(),e.videoMask=!0,e.videoFlags=!1,e.redRainFlag=!0,e.videoMoneyFlag=!1,e.videoFlag=!0,e.maskOnMove=!1},e.e8=function(t){e.inviteFlag=!1,e.maskOnMove=!1})},o=[];i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){return a}))},f512:function(e,t,i){"use strict";i.r(t);var a=i("2cc3"),n=i.n(a);for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);t["default"]=n.a}},[["b0a3","common/runtime","common/vendor"]]]);