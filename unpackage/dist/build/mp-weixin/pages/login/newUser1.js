(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/newUser1"],{"02a5":function(e,t,n){"use strict";var o,i=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}))},"2dba":function(e,t,n){"use strict";n.r(t);var o=n("02a5"),i=n("3705");for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);n("5906");var u,s=n("f0c5"),r=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,"d94f8d58",null,!1,o["a"],u);t["default"]=r.exports},3705:function(e,t,n){"use strict";n.r(t);var o=n("63d1"),i=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=i.a},5906:function(e,t,n){"use strict";var o=n("aed6"),i=n.n(o);i.a},"63d1":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{phone:"",security:"",yzphone:!1,isSendCode:!0,sendCodeTime:60,flag:!0,password:"",rePassword:"",valueflag:!1,yqCode:""}},onLoad:function(){},methods:{inputPhone:function(e){/^1(3|4|5|6|7|8|9)\d{9}$/.test(e.detail.value)?this.yzphone=!0:this.yzphone=!1},getCode:function(){var t=this,n=t.phone,o=Number(n)+100;e.wjw_http({url:"userverify/save",type:"post",data:{phone:t.phone,configCode:o}}).then((function(n){e.showToast({title:"发送成功",duration:2e3}),clearInterval(t.timer),t.isSendCode=!1,t.timer=setInterval((function(){t.sendCodeTime=t.sendCodeTime-1,t.sendCodeTime<1&&(t.sendCodeTime=60,t.isSendCode=!0,clearInterval(t.timer))}),1e3)}))},choice:function(e){this.valueflag=!this.valueflag},submit:function(){var t=this,n=this.password.split("");return n.length<6||n.length>20?(e.showToast({title:"密码长度大于6小于20",duration:2e3}),!1):""==this.phone||""==this.security?(e.showToast({title:"信息填写完整",duration:2e3}),!1):0==this.valueflag?(e.showToast({title:"用户协议请同意",duration:2e3}),!1):void e.wjw_http({url:"user/register",type:"post",data:{phone:t.phone,code:t.security,password:t.password,inviteCode:t.yqCode}}).then((function(t){0==t.status&&(e.showToast({title:"注册成功",duration:2e3}),e.reLaunch({url:"/pages/login/login"}))})).catch((function(t){e.showToast({title:"修改失败",duration:2e3})}))}}};t.default=n}).call(this,n("543d")["default"])},aed6:function(e,t,n){},e47c:function(e,t,n){"use strict";(function(e){n("a53d");o(n("66fd"));var t=o(n("2dba"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["e47c","common/runtime","common/vendor"]]]);