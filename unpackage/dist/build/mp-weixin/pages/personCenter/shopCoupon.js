(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/personCenter/shopCoupon"],{"007d":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=function(){n.e("component/css/main").then(function(){return resolve(n("5547"))}.bind(null,n)).catch(n.oe)},o=function(){n.e("component/css/styel").then(function(){return resolve(n("cd9e"))}.bind(null,n)).catch(n.oe)},c=function(){n.e("component/css/shopCoupon").then(function(){return resolve(n("64ea"))}.bind(null,n)).catch(n.oe)},a={components:{shopCoupon:c,styel:o,main:u},data:function(){return{jifen_show:!1,usePacket:"",unUsePacket:"",useFlag:!0}},onLoad:function(){this.getPacket(),this.wuxiaoPacket()},methods:{getPacket:function(){var e=wx.getStorageSync("userData").user.id,n=this;t.wjw_http({url:"red/list",method:"post",data:{userId:e,status:0}}).then((function(t){0==t.status&&(n.unUsePacket=t.result,n.unUsePacket.map((function(t){t.money=(t.money/100).toFixed(2)})),console.log(n.unUsePacket))}))},wuxiaoPacket:function(){var e=wx.getStorageSync("userData").user.id,n=this;t.wjw_http({url:"red/list",method:"post",data:{userId:e,status:1}}).then((function(t){0==t.status&&(n.usePacket=t.result,console.log(n.usePacket))}))}}};e.default=a}).call(this,n("543d")["default"])},3144:function(t,e,n){"use strict";(function(t){n("ac40");u(n("66fd"));var e=u(n("744b"));function u(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"466b":function(t,e,n){"use strict";n.r(e);var u=n("007d"),o=n.n(u);for(var c in u)"default"!==c&&function(t){n.d(e,t,(function(){return u[t]}))}(c);e["default"]=o.a},"4afc":function(t,e,n){"use strict";var u,o=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.useFlag=!0},t.e1=function(e){t.useFlag=!1})},c=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return u}))},"744b":function(t,e,n){"use strict";n.r(e);var u=n("4afc"),o=n("466b");for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);n("fa09");var a,s=n("f0c5"),r=Object(s["a"])(o["default"],u["b"],u["c"],!1,null,"286e6fe0",null,!1,u["a"],a);e["default"]=r.exports},caf9:function(t,e,n){},fa09:function(t,e,n){"use strict";var u=n("caf9"),o=n.n(u);o.a}},[["3144","common/runtime","common/vendor"]]]);