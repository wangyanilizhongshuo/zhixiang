(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/category/mybk/prof/consult/submit/submit"],{"16e3":function(t,e,n){"use strict";(function(t){n("a53d");o(n("66fd"));var e=o(n("ba97"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"177f":function(t,e,n){},"34ea":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;o(n("0bc0"));function o(t){return t&&t.__esModule?t:{default:t}}var a={data:function(){return{userId:"",signalFlag:!1,signalMsg:"",bodyPhotoUrl:[],content:"",zhifuCode:"",upUrlList:[],code:"",openId:""}},onLoad:function(e){this.setData(e);var n=this;t.login({provider:"weixin",success:function(t){n.code=t.code,n.getOpenId()}})},methods:{getOpenId:function(){var e=this,n=this;t.wjw_http({header:{"content-type":"application/json;charset=UTF-8"},url:"app/wechat/getOpenId",type:"post",data:{appId:"wx74605d2c3744958c",code:n.code}}).then((function(t){0==t.code&&(e.openId=t.data.openid)})).catch((function(t){console.log(t)}))},submitMes:function(){var e=this,n=(e.bodyPhotoUrl,t.getStorageSync("user").id),o=function(n){e.wxPayment({result:n,success:function(e){t.navigateBack(2)},fail:function(t){console.log(t),console.log("提交失败")}})};""==!e.content&&t.wjw_http({url:"app/cdexpertconsultationrecord/advisory",method:"post",data:{expertId:e.userId,issues:e.content,userId:n,openId:e.openId,picture:e.upUrlList}}).then((function(t){if(0==t.code){if(e.zhifuCode=t.data,t.data){var n=t.data,a={};a.appId=n.appId,a.timeStamp=n.timeStamp,a.nonceStr=n.nonceStr,a.prepayId=n.packageValue,a.sign=n.paySign,o(a)}}else e.signalFlag=!0,e.signalMsg=t.msg,setTimeout((function(){e.signalFlag=!1}),2500)})).catch((function(t){}))},bodyPhotoAdd:function(){var e=this,n=e.bodyPhotoUrl;t.chooseImage({count:9-n.length,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(o){var a=o.tempFilePaths;e.bodyPhotoUrl=n.concat(o.tempFilePaths),a.map((function(n){t.uploadFile({url:"http://zxyptest.hzbixin.cn/file/upload",filePath:n,name:"file",success:function(t){var n="object"===typeof t.data?t.data:JSON.parse(t.data),o=n.result;e.upUrlList.push(o)},fail:function(t){}})}))}})},injuryPreviewImage:function(e){t.previewImage({current:this.bodyPhotoUrl[e],urls:this.bodyPhotoUrl,indicator:"number"})},delImg:function(t){var e=this.bodyPhotoUrl;e.splice(t,1),this.bodyPhotoUrl=e,this.upUrlList.splice(t,1)}}};e.default=a}).call(this,n("543d")["default"])},"9d7f":function(t,e,n){"use strict";n.r(e);var o=n("34ea"),a=n.n(o);for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);e["default"]=a.a},"9e1f":function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return o}));var a=function(){var t=this,e=t.$createElement;t._self._c},c=[]},ba97:function(t,e,n){"use strict";n.r(e);var o=n("9e1f"),a=n("9d7f");for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);n("cc13");var i,u=n("f0c5"),r=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);e["default"]=r.exports},cc13:function(t,e,n){"use strict";var o=n("177f"),a=n.n(o);a.a}},[["16e3","common/runtime","common/vendor"]]]);