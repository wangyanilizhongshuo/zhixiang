(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/category/mybk/mybk"],{"38e0":function(t,e,n){"use strict";n.r(e);var a=n("8619"),i=n("9ebe");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("586e");var o,u=n("f0c5"),c=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=c.exports},"586e":function(t,e,n){"use strict";var a=n("60fb"),i=n.n(a);i.a},"60fb":function(t,e,n){},8619:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement;t._self._c},r=[]},"9ebe":function(t,e,n){"use strict";n.r(e);var a=n("e012"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},ab34:function(t,e,n){"use strict";(function(t){n("a53d");a(n("66fd"));var e=a(n("38e0"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},e012:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{expertList:[],bkRecomList:[]}},onLoad:function(){this.getExpert(),this.getbkRecommond()},onShareAppMessage:function(){var t=this;return{title:"智享婴品",path:"/pages/index/index?"+t.getShareUrlParams()}},methods:{getExpert:function(){var e=this;t.wjw_http({url:"app/cdmaternalchildexpert/list",method:"get",data:{page:1,limit:4}}).then((function(t){0==t.code&&(e.expertList=t.data.list)})).catch((function(t){}))},detailExpert:function(e){var n=e;t.navigateTo({url:"/pages/category/mybk/prof/info/info?id="+n})},AskQuesExpert:function(e){var n=e;t.navigateTo({url:"/pages/category/mybk/prof/consult/submit/submit?userId="+n})},getbkRecommond:function(){var e=this;t.wjw_http({url:"app/cdmaternalchildencyclopedia/list",type:"get",data:{page:1,limit:4}}).then((function(t){if(0==t.code)for(var n in e.bkRecomList=t.data.list,e.bkRecomList){var a=new Date(e.bkRecomList[n].createTime);e.bkRecomList[n].createTime=a.getFullYear()+"-"+(a.getMonth()+1).toString().padStart(2,"0")+"-"+a.getDate().toString().padStart(2,"0")}}))},bkDetail:function(e){t.navigateTo({url:"./wiki/info/info?id="+e})},bkList:function(){t.navigateTo({url:"./wiki/wiki"})}}};e.default=n}).call(this,n("543d")["default"])}},[["ab34","common/runtime","common/vendor"]]]);