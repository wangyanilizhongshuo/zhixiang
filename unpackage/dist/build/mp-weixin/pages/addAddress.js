(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/addAddress"],{"1bc4":function(e,n,t){"use strict";t.r(n);var a=t("d0f5"),c=t.n(a);for(var i in a)"default"!==i&&function(e){t.d(n,e,(function(){return a[e]}))}(i);n["default"]=c.a},5783:function(e,n,t){"use strict";var a,c=function(){var e=this,n=e.$createElement;e._self._c},i=[];t.d(n,"b",(function(){return c})),t.d(n,"c",(function(){return i})),t.d(n,"a",(function(){return a}))},"64d0":function(e,n,t){"use strict";var a=t("7443"),c=t.n(a);c.a},"660c":function(e,n,t){"use strict";(function(e){t("a53d");a(t("66fd"));var n=a(t("92fa"));function a(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},7443:function(e,n,t){},"92fa":function(e,n,t){"use strict";t.r(n);var a=t("5783"),c=t("1bc4");for(var i in c)"default"!==i&&function(e){t.d(n,e,(function(){return c[e]}))}(i);t("64d0");var r,o=t("f0c5"),u=Object(o["a"])(c["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);n["default"]=u.exports},d0f5:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=function(){t.e("component/css/main").then(function(){return resolve(t("1321"))}.bind(null,t)).catch(t.oe)},c=function(){t.e("component/css/jzl").then(function(){return resolve(t("676a"))}.bind(null,t)).catch(t.oe)},i=function(){t.e("component/css/site").then(function(){return resolve(t("7900"))}.bind(null,t)).catch(t.oe)},r=function(){t.e("component/css/page/addAddress").then(function(){return resolve(t("efdb"))}.bind(null,t)).catch(t.oe)},o={components:{addAddress:r,site:i,jzl:c,main:a},data:function(){return{drawing:0,article:{}}},methods:{bindRegionChange:function(e){console.log("picker发送选择改变，携带值为",e.detail.value);var n=e.detail.value;this.article.province_name=n[0],this.article.city_name=n[1],this.article.area_name=n[2],this.drawing++},address_save:function(n){var t=this;console.log("新增地址",arguments);var a=wx.getStorageSync("userData"),c=a.user.id,i=a.token,r=this.article,o={token:i,userId:c};Object.assign(o,r),r.addressee&&r.address&&r.phone&&r.province_name&&r.city_name&&r.area_name?(this.city_data.some((function(e){if(e.name==t.article.province_name)return t.article.province_id=e.code,o.province_id=e.code,e.sub.some((function(e){if(e.name==t.article.city_name)return t.article.city_id=e.code,o.city_id=e.code,e.sub.some((function(e){if(e.name==t.article.area_name)return t.article.area_id=e.code,o.area_id=e.code,!0})),!0})),!0})),o.is_default=o.is_default?1:0,e.wjw_http({url:"address/save",data:o}).then((function(e){0==e.status&&wx.navigateBack()}))):this.toastTip("请完善信息")}}};n.default=o}).call(this,t("543d")["default"])}},[["660c","common/runtime","common/vendor"]]]);