(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/personData"],{"02e0":function(t,e,n){},"5caa":function(t,e,n){"use strict";(function(t){n("a53d");o(n("66fd"));var e=o(n("dd58"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},7291:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){n.e("component/css/light7_min").then(function(){return resolve(n("6800"))}.bind(null,n)).catch(n.oe)},a=function(){n.e("component/css/mobiscroll").then(function(){return resolve(n("2600"))}.bind(null,n)).catch(n.oe)},r=function(){n.e("component/css/main").then(function(){return resolve(n("1321"))}.bind(null,n)).catch(n.oe)},i=function(){n.e("component/css/jzl").then(function(){return resolve(n("676a"))}.bind(null,n)).catch(n.oe)},s=function(){n.e("component/css/personData").then(function(){return resolve(n("d881"))}.bind(null,n)).catch(n.oe)},u=function(){Promise.all([n.e("common/vendor"),n.e("components/e-picker/e-picker")]).then(function(){return resolve(n("a6aa"))}.bind(null,n)).catch(n.oe)},c={components:{personData:s,jzl:i,main:r,mobiscroll:a,light7_min:o,ePicker:u},data:function(){return{jifen_show:!1,personList:"",headProtraitflag:!1,repName:"dasf ",pickFlag:!1,date:"1997-02-16"}},onLoad:function(){this.getPersonMsg()},methods:{getPersonMsg:function(){var e=this,n=this,o=wx.getStorageSync("user").id;t.wjw_http({url:"user/info/"+o,type:"post"}).then((function(t){if(0==t.status){n.personList=t.result;var o=n.personList;o.head_photo?e.headProtraitflag=!0:e.headProtraitflag=!1}})).catch((function(t){console.log(t)}))},uploadPhoto:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(n){t.uploadFile({url:"http://zxyptest.hzbixin.cn/file/upload",filePath:n.tempFilePaths[0],name:"file",success:function(n){var o="object"===typeof n.data?n.data:JSON.parse(n.data),a=o.result,r=wx.getStorageSync("user").id;t.wjw_http({url:"user/update",data:{userId:r,head_photo:a}}).then((function(n){0==n.status&&(t.showToast({title:"头像上传成功",duration:1e3}),e.getPersonMsg())}))}})}})},birthChange:function(e){var n=this;this.showValue=e,this.personList.birthday=e;var o=this,a=wx.getStorageSync("user").id;t.wjw_http({url:"user/update",data:{userId:a,birthday:o.personList.birthday}}).then((function(e){0==e.status&&(t.showToast({title:"生日日期修改成功",duration:1e3}),n.jifen_show=!1,o.getPersonMsg())}))},repairName:function(){var e=this,n=this,o=wx.getStorageSync("user").id;t.wjw_http({url:"user/update",data:{userId:o,nickname:n.personList.nickname}}).then((function(o){0==o.status&&(t.showToast({title:"昵称修改成功",duration:1e3}),e.jifen_show=!1,n.getPersonMsg())}))}}};e.default=c}).call(this,n("543d")["default"])},d18e:function(t,e,n){"use strict";n.r(e);var o=n("7291"),a=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=a.a},dd58:function(t,e,n){"use strict";n.r(e);var o=n("f4b6"),a=n("d18e");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("ebe5");var i,s=n("f0c5"),u=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,"636bb16e",null,!1,o["a"],i);e["default"]=u.exports},ebe5:function(t,e,n){"use strict";var o=n("02e0"),a=n.n(o);a.a},f4b6:function(t,e,n){"use strict";var o={ePicker:function(){return Promise.all([n.e("common/vendor"),n.e("components/e-picker/e-picker")]).then(n.bind(null,"a6aa"))}},a=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.jifen_show=!0})},r=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}))}},[["5caa","common/runtime","common/vendor"]]]);