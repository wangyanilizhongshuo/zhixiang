(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/category/mybk/wiki/info/info"],{"042a":function(t,e,n){"use strict";(function(t){n("a53d");a(n("66fd"));var e=a(n("edce"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},1826:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{title:"",time:"",content:"",id:""}},onLoad:function(t){this.setData(t),this.getDetail()},methods:{getDetail:function(){var e=this;t.wjw_http({url:"/app/cdmaternalchildencyclopedia/info",type:"get",data:{id:e.id}}).then((function(t){if(0==t.code){e.title=t.data.title;var n=new Date(t.data.createTime);e.time=n.getFullYear()+"-"+(n.getMonth()+1).toString().padStart(2,"0")+"-"+n.getDate().toString().padStart(2,"0"),e.content=t.data.detailsChinese}}))}}};e.default=n}).call(this,n("543d")["default"])},"3d86":function(t,e,n){"use strict";var a=n("a012"),i=n.n(a);i.a},"987a":function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return a}))},a012:function(t,e,n){},b404:function(t,e,n){"use strict";n.r(e);var a=n("1826"),i=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);e["default"]=i.a},edce:function(t,e,n){"use strict";n.r(e);var a=n("987a"),i=n("b404");for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);n("3d86");var c,o=n("f0c5"),r=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);e["default"]=r.exports}},[["042a","common/runtime","common/vendor"]]]);