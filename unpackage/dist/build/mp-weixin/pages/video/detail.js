(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/video/detail"],{"3d8b":function(t,a,e){"use strict";e.r(a);var i=e("ccf6"),c=e.n(i);for(var n in i)"default"!==n&&function(t){e.d(a,t,(function(){return i[t]}))}(n);a["default"]=c.a},"4aa5":function(t,a,e){"use strict";var i=e("50c3"),c=e.n(i);c.a},"50c3":function(t,a,e){},9870:function(t,a,e){"use strict";e.r(a);var i=e("ce47"),c=e("3d8b");for(var n in c)"default"!==n&&function(t){e.d(a,t,(function(){return c[t]}))}(n);e("4aa5");var o,u=e("f0c5"),s=Object(u["a"])(c["default"],i["b"],i["c"],!1,null,"7973a628",null,!1,i["a"],o);a["default"]=s.exports},"9b3f":function(t,a,e){"use strict";(function(t){e("a53d");i(e("66fd"));var a=i(e("9870"));function i(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("543d")["createPage"])},ccf6:function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={data:function(){return{id:"",detailData:"",chioceFlag1:!1,chioceFlag2:!1,chioceFlag3:!1,subFlag:!1}},onLoad:function(t){this.setData(t),this.getData()},methods:{getData:function(){var a=this,e=wx.getStorageSync("user").id;t.wjw_http({url:"vedio/info/"+a.id,type:"post",data:{userId:e}}).then((function(t){0===t.status&&(a.detailData=t.result)}))},choice:function(t){1==t?(this.chioceFlag1=1!=this.chioceFlag1,this.chioceFlag2=!1,this.chioceFlag3=!1):2==t?(this.chioceFlag2=1!=this.chioceFlag2,this.chioceFlag1=!1,this.chioceFlag3=!1):3==t&&(this.chioceFlag3=1!=this.chioceFlag3,this.chioceFlag2=!1,this.chioceFlag1=!1)},autoEnd:function(){this.subFlag=!0},submit:function(){var a=0;1==this.chioceFlag1?a=1:1==this.chioceFlag2?a=2:1==this.chioceFlag3&&(a=3);var e=this,i=wx.getStorageSync("user").id;0!=a&&t.wjw_http({url:"vedio/answer",type:"post",data:{userId:i,vedio_id:e.id,answer:a}}).then((function(a){0==a.status&&(t.showToast({title:"回答成功",duration:2e3}),t.navigateBack())}))}}};a.default=e}).call(this,e("543d")["default"])},ce47:function(t,a,e){"use strict";var i,c=function(){var t=this,a=t.$createElement;t._self._c},n=[];e.d(a,"b",(function(){return c})),e.d(a,"c",(function(){return n})),e.d(a,"a",(function(){return i}))}},[["9b3f","common/runtime","common/vendor"]]]);