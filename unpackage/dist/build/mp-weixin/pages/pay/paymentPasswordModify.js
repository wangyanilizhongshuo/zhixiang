(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pay/paymentPasswordModify"],{"545e":function(e,n,t){"use strict";t.r(n);var o=t("f972"),u=t("b36f");for(var r in u)"default"!==r&&function(e){t.d(n,e,(function(){return u[e]}))}(r);t("b2cb");var s,i=t("f0c5"),a=Object(i["a"])(u["default"],o["b"],o["c"],!1,null,"1f71f63e",null,!1,o["a"],s);n["default"]=a.exports},b2cb:function(e,n,t){"use strict";var o=t("b89c"),u=t.n(o);u.a},b36f:function(e,n,t){"use strict";t.r(n);var o=t("d21f"),u=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=u.a},b89c:function(e,n,t){},d21f:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){t.e("components/number-keyboard/number-keyboard").then(function(){return resolve(t("1007"))}.bind(null,t)).catch(t.oe)},u=function(){t.e("components/password-input/password-input").then(function(){return resolve(t("fd0f"))}.bind(null,t)).catch(t.oe)},r={data:function(){return{phone:"",security:"",yzphone:!1,isSendCode:!0,sendCodeTime:60,flag:!0,password:""}},components:{numberKeyboard:o,passwordInput:u},onLoad:function(){},methods:{inputPhone:function(e){/^1(3|4|5|6|7|8|9)\d{9}$/.test(e.detail.value)?this.yzphone=!0:this.yzphone=!1},getCode:function(){var n=this,t=n.phone,o=Number(t)+100;e.wjw_http({url:"userverify/save",type:"post",data:{phone:n.phone,configCode:o}}).then((function(t){e.showToast({title:"发送成功",duration:2e3}),clearInterval(n.timer),n.isSendCode=!1,n.timer=setInterval((function(){n.sendCodeTime=n.sendCodeTime-1,n.sendCodeTime<1&&(n.sendCodeTime=60,n.isSendCode=!0,clearInterval(n.timer))}),1e3)}))},submit:function(){var n=this;if(""==this.phone||""==this.security)return e.showToast({title:"信息填写完整",duration:2e3}),!1;e.wjw_http({url:"userverify/check",type:"post",data:{phone:n.phone,code:n.security}}).then((function(e){0==e.status?n.flag=!1:console.log(e.msg)})).catch((function(n){e.showToast({title:"修改失败",duration:2e3})}))},KeyboarOpen:function(e){this.$refs.KeyboarHid.open()},clickInput:function(e){this.password=e},submitPassword:function(){var n=this,t=wx.getStorageSync("user").id;e.showModal({title:"提示",content:"确认支付密码?",success:function(o){o.confirm?e.wjw_http({url:"user/resetPayPass",data:{userId:t,code:n.security,password:n.password}}).then((function(n){0==n.status?e.reLaunch({url:"/pages/index/index"}):e.showToast({title:"修改失败",duration:3e3})})).catch((function(n){e.navigateBack()})):o.cancel&&console.log("用户点击取消")}})}}};n.default=r}).call(this,t("543d")["default"])},f238:function(e,n,t){"use strict";(function(e){t("a53d");o(t("66fd"));var n=o(t("545e"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},f972:function(e,n,t){"use strict";t.d(n,"b",(function(){return u})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return o}));var o={passwordInput:function(){return t.e("components/password-input/password-input").then(t.bind(null,"fd0f"))},numberKeyboard:function(){return t.e("components/number-keyboard/number-keyboard").then(t.bind(null,"1007"))}},u=function(){var e=this,n=e.$createElement;e._self._c},r=[]}},[["f238","common/runtime","common/vendor"]]]);