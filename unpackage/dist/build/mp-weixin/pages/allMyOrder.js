(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/allMyOrder"],{2988:function(t,e,s){"use strict";(function(t){s("ac40");a(s("66fd"));var e=a(s("8b1a"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,s("543d")["createPage"])},"44ab":function(t,e,s){"use strict";s.r(e);var a=s("a492"),i=s.n(a);for(var n in a)"default"!==n&&function(t){s.d(e,t,(function(){return a[t]}))}(n);e["default"]=i.a},"7c59":function(t,e,s){},"8b1a":function(t,e,s){"use strict";s.r(e);var a=s("d0ad"),i=s("44ab");for(var n in i)"default"!==n&&function(t){s.d(e,t,(function(){return i[t]}))}(n);s("e28c");var r,o=s("f0c5"),u=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,"3dbd7b19",null,!1,a["a"],r);e["default"]=u.exports},a492:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={data:function(){return{types:0,noPayList:[],hasPayList:[],allLists:[],hasSendList:[],hasSureList:[],page:1,pageNum:""}},onReachBottom:function(){0==this.types?(this.page+=1,this.pageNum>=this.page&&this.getAllList()):1==this.types?this.getNoPayList():2==this.types?this.getHasPayList():3==this.types?this.getSend():4==this.types&&this.getFinish()},onLoad:function(t){this.setData(t),wx.removeStorageSync("goodDetail"),wx.removeStorageSync("types"),0==this.types?this.getAllList():1==this.types?this.getNoPayList():2==this.types?this.getHasPayList():3==this.types?this.getSend():4==this.types&&this.getFinish()},methods:{jumps:function(t){0==t?(this.types=0,this.pages=1,this.getAllList()):1==t?(this.pages=1,this.types=1,this.getNoPayList()):2==t?(this.pages=1,this.types=2,this.getHasPayList()):3==t?(this.pages=1,this.types=3,this.getSend()):4==t&&(this.pages=1,this.types=4,this.getFinish())},jumpsOne:function(t){0==t.status&&this.noPayDetail(t,1),2==t.status&&this.noPayDetail(t,2),7==t.status&&this.noPayDetail(t,4)},getNoPayList:function(){var e=wx.getStorageSync("user").id,s=this;t.wjw_http({url:"merorder/listByPage",data:{userId:e,page:this.page,nopay:1}}).then((function(t){if(0==t.status){s.pageNum=t.result.pages;var e=t.result.list,a=s.noPayList;s.noPayList=a.concat(e)}}))},noPayDetail:function(e,s){var a=s;0==a&&(0==e.status?a=1:2==e.status?a=2:4==e.status&&(a=7)),wx.setStorageSync("goodDetail",e),wx.setStorageSync("types",a),t.navigateTo({url:"/pages/orderMsg/orderMsg"})},getHasPayList:function(){var e=wx.getStorageSync("user").id,s=this;t.wjw_http({url:"merorder/listByPage",data:{userId:e,page:this.page,status:2}}).then((function(t){if(0==t.status){s.pageNum=t.result.pages;var e=t.result.list,a=s.hasPayList;s.hasPayList=a.concat(e)}})),this.$forceUpdate()},cancelOrder:function(e){var s=wx.getStorageSync("user").id,a=this;t.showModal({title:"提示",content:"确定取消此订单",success:function(i){var n=this;i.confirm?t.wjw_http({url:"api/closeOrder",data:{userId:s,merOrderId:e}}).then((function(t){0==t.status&&a.$nextTick((function(){n.getNoPayList()}))})):i.cancel&&console.log("用户点击取消")}})},continuePayOrder:function(e,s){var a=(s/100).toFixed(2);t.navigateTo({url:"/pages/shopCar/payment?orderId="+e+"&type=11&money="+a})},getAllList:function(){var e=this,s=this,a=wx.getStorageSync("user").id;t.wjw_http({url:"merorder/listByPage",data:{userId:a,page:this.page}}).then((function(t){if(0==t.status){e.pageNum=t.result.pages;var a=t.result.list,i=s.allLists;s.allLists=i.concat(a)}}))},getSend:function(){var e=this,s=wx.getStorageSync("user").id,a=this;t.wjw_http({url:"merorder/listByPage",data:{userId:s,page:this.page,status:6}}).then((function(t){if(0==t.status){e.pageNum=t.result.pages;var s=t.result.list,i=a.hasSendList;a.hasSendList=i.concat(s)}}))},confirmReceive:function(e){var s=this,a=wx.getStorageSync("user").id;t.showModal({title:"提示",content:"是否确认收货",success:function(i){i.confirm?t.wjw_http({url:"merorder/confirm",data:{merOrderId:e,userId:a}}).then((function(e){0==e.status&&(t.showToast({title:"收货成功",duration:2e3}),s.$nextTick((function(){s.getSend()})))})).catch((function(t){console.log(t)})):i.cancel&&console.log("用户点击取消")}})},getFinish:function(){var e=wx.getStorageSync("user").id,s=this;t.wjw_http({url:"merorder/listByPage",data:{userId:e,page:this.page,status:7}}).then((function(t){if(0==t.status){s.pageNum=t.result.pages;var e=t.result.list,a=s.hasSureList;s.hasSureList=a.concat(e)}}))}}};e.default=s}).call(this,s("543d")["default"])},d0ad:function(t,e,s){"use strict";var a,i=function(){var t=this,e=t.$createElement;t._self._c},n=[];s.d(e,"b",(function(){return i})),s.d(e,"c",(function(){return n})),s.d(e,"a",(function(){return a}))},e28c:function(t,e,s){"use strict";var a=s("7c59"),i=s.n(a);i.a}},[["2988","common/runtime","common/vendor"]]]);