(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/category/mybk/wiki/wiki"],{8389:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{pages:1,getlists:[],pageSize:0}},onLoad:function(){this.getList(1)},onReachBottom:function(){this.pages+=1,this.pageSize>=this.pages&&this.getList(this.pages)},methods:{getList:function(e){var a=this,n=this;n.pages=e,t.wjw_http({url:"/app/cdmaternalchildencyclopedia/list",type:"get",data:{page:n.pages,limit:6}}).then((function(t){if(0==t.code){n.pageSize=t.data.totalPage;var e=t.data.list;for(var i in e){var o=new Date(e[i].createTime);e[i].createTime=o.getFullYear()+"-"+(o.getMonth()+1).toString().padStart(2,"0")+"-"+o.getDate().toString().padStart(2,"0")}var r=n.getlists;a.getlists=r.concat(e)}}))},details:function(e){t.navigateTo({url:"./info/info?id="+e})}}};e.default=a}).call(this,a("543d")["default"])},"8db6":function(t,e,a){"use strict";a.r(e);var n=a("adc7"),i=a("9594");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("ba9d");var r,u=a("f0c5"),c=Object(u["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=c.exports},9594:function(t,e,a){"use strict";a.r(e);var n=a("8389"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},adc7:function(t,e,a){"use strict";var n,i=function(){var t=this,e=t.$createElement;t._self._c},o=[];a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}))},ae3b:function(t,e,a){"use strict";(function(t){a("a53d");n(a("66fd"));var e=n(a("8db6"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},ba9d:function(t,e,a){"use strict";var n=a("df1b"),i=a.n(n);i.a},df1b:function(t,e,a){}},[["ae3b","common/runtime","common/vendor"]]]);