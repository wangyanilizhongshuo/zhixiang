(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/category/mybk/prof/prof"],{"2be6":function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement;t._self._c},r=[]},4908:function(t,e,a){"use strict";(function(t){a("a53d");n(a("66fd"));var e=n(a("944a"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},"4d41":function(t,e,a){"use strict";var n=a("60ab"),i=a.n(n);i.a},"5c37":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{expertList:[],pages:0,pageSize:1}},onLoad:function(){this.getExpert(1)},onReachBottom:function(){this.pages+=1,this.pageSize>=this.pages&&this.getExpert(this.pages)},onShareAppMessage:function(){var t=this;return{title:"智享婴品",path:"/pages/index/index?"+t.getShareUrlParams()}},methods:{getExpert:function(e){var a=this,n=this;n.pages=e,t.wjw_http({url:"app/cdmaternalchildexpert/list",method:"get",data:{page:n.pages,limit:6}}).then((function(t){if(0==t.code){n.pageSize=t.data.totalPage;var e=t.data.list,i=n.expertList;a.expertList=i.concat(e)}}))},details:function(e){t.navigateTo({url:"/pages/category/mybk/prof/info/info?id="+e})},AskQuesExpert:function(e){t.navigateTo({url:"/pages/category/mybk/prof/consult/submit/submit?userId="+e})}}};e.default=a}).call(this,a("543d")["default"])},"60ab":function(t,e,a){},"944a":function(t,e,a){"use strict";a.r(e);var n=a("2be6"),i=a("c288");for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);a("4d41");var u,o=a("f0c5"),c=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);e["default"]=c.exports},c288:function(t,e,a){"use strict";a.r(e);var n=a("5c37"),i=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);e["default"]=i.a}},[["4908","common/runtime","common/vendor"]]]);