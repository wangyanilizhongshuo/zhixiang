(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myTwoCode"],{"328b":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{list:"",jifen_show:!1}},onLoad:function(){this.getData()},onShareAppMessage:function(t){var n=this;if("button"===t.from||"menu"===t.from)return{title:"智享婴品",path:"/pages/index/index?"+n.getShareUrlParams()}},methods:{getData:function(){var n=this,e=wx.getStorageSync("user").id;t.wjw_http({url:"user/info/"+e}).then((function(t){0==t.status&&(n.list=t.result)}))}}};n.default=e}).call(this,e("543d")["default"])},5978:function(t,n,e){},"779c":function(t,n,e){"use strict";(function(t){e("a53d");u(e("66fd"));var n=u(e("a257"));function u(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},a257:function(t,n,e){"use strict";e.r(n);var u=e("cbfd"),a=e("b324");for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);e("bf56");var o,c=e("f0c5"),i=Object(c["a"])(a["default"],u["b"],u["c"],!1,null,"3ba3cd51",null,!1,u["a"],o);n["default"]=i.exports},b324:function(t,n,e){"use strict";e.r(n);var u=e("328b"),a=e.n(u);for(var r in u)"default"!==r&&function(t){e.d(n,t,(function(){return u[t]}))}(r);n["default"]=a.a},bf56:function(t,n,e){"use strict";var u=e("5978"),a=e.n(u);a.a},cbfd:function(t,n,e){"use strict";var u,a=function(){var t=this,n=t.$createElement;t._self._c},r=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return u}))}},[["779c","common/runtime","common/vendor"]]]);