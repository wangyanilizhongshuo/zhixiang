(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/onlinePay"],{"108d":function(t,e,n){"use strict";(function(t){n("a53d");a(n("66fd"));var e=a(n("bd00"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"157e":function(t,e,n){"use strict";var a=n("7cef"),r=n.n(a);r.a},7571:function(t,e,n){"use strict";var a,r=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.recordList,(function(e,n){var a=e.memo.substr(0,6);return{$orig:t.__get_orig(e),g0:a}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},o=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}))},"7cef":function(t,e,n){},bd00:function(t,e,n){"use strict";n.r(e);var a=n("7571"),r=n("faea");for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n("157e");var i,u=n("f0c5"),c=Object(u["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);e["default"]=c.exports},d581:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{recordList:[],pageSize:1,page:1}},onLoad:function(){this.getRecord()},onReachBottom:function(){this.pageSize>this.page&&(this.page=this.page+1,this.getRecord())},methods:{getRecord:function(){var e=this,n=t.getStorageSync("user").id;t.wjw_http({url:"pointshistory/listByPage",data:{userId:n,page:1}}).then((function(t){if(0==t.status){e.pageSize=t.result.pages,console.log(t);var n=t.result.list;for(var a in n){var r=new Date(n[a].create_time);n[a].createTime=r.getFullYear()+"-"+(r.getMonth()+1).toString().padStart(2,"0")+"-"+r.getDate().toString().padStart(2,"0")+" "+r.getHours().toString().padStart(2,"0")+":"+r.getMinutes().toString().padStart(2,"0")+":"+r.getSeconds().toString().padStart(2,"0")}var o=e.recordList;e.recordList=o.concat(n)}}))}}};e.default=n}).call(this,n("543d")["default"])},faea:function(t,e,n){"use strict";n.r(e);var a=n("d581"),r=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=r.a}},[["108d","common/runtime","common/vendor"]]]);