(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"117d":function(t,e,i){"use strict";var n=i("5464"),a=i.n(n);a.a},5464:function(t,e,i){},5915:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{quickgetVipURl:[],user_info:"",flagFalse:!1,red_page_show:!1,num:0,search_input:!1,search_value:"",bannar:[],bannerLink:[],activityTopicId:"",allGoodsCateList:[],allGoodsCateIdList:[],allGoodsList:[],sel:-2,sels:1,page:1,catePage:1,cateIII:"",cateFlag:!1,cateORallFlag:!1,no_more:!1,pageSizes:0,pageallSizes:0,videolist:[],huodongList:[],addressName:"点击获取店名地址",videoFlag:!1,category_list:[{img:"http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/category_list/hot@2x.png",name:"热销爆品",url:"/pages/category/hot/hot"},{img:"http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/category_list/encyclopedia@2x.png",name:"母婴百科",url:"/pages/category/mybk/mybk"},{img:"http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/category_list/bargain@2x.png",name:"特惠赚钱",url:"/pages/category/thzq/thzq"},{img:"http://webh5.wangjiangwei.top/01-project/03-hzbixin/09-zxyp/01-wx_public_h5/code/img/category_list/service@2x.png",name:"孕婴服务",url:"/pages/category/childServe/childServe"}],notice_list:["充值60元送120元+价值198元羊奶粉一盒","9月平台充值上线啦，充值现金大送活动------------","xxxxxxxxxxxxxxxxxx"],active_list:[],invite_id:"",openId:"",code:""}},onLoad:function(e){var i=this;this.setData(e),this.get_banner(),this.getNews(),this.quickVIP(),this.getActivityTopic(),this.getAllGoodsClassificate(),this.delColor(1),this.invite_id&&(console.log("获取code "),t.login({provider:"weixin",success:function(t){i.code=t.code,i.getOpenId()}}))},onShareAppMessage:function(){var t=this;return{title:"智享婴品",path:"/pages/index/index?"+t.getShareUrlParams()}},onShow:function(){wx.getStorageSync("token")&&(this.getAddress(),this.videoList(),this.huodong(),this.videoFlag=!0),wx.getStorageSync("token")&&this.invite_id&&this.getOpenId()},components:{},onReachBottom:function(){this.page=this.page+1,this.catePage=this.catePage+1,0==this.cateFlag?this.pageallSizes>=this.page&&this.delColor(this.page):1==this.cateFlag&&this.pageSizes>=this.catePage&&this.category(this.sel,this.catePage)},methods:{onClickItem:function(t){this.current!==t.currentIndex&&(this.current=t.currentIndex)},get_user_info:function(){var e=this;this.red_page_show=!0;var i=wx.getStorageSync("user").id;t.wjw_http({url:"user/info/"+i,type:"post"}).then((function(t){0==t.status&&(e.user_info=t.result)})).catch((function(t){console.log(t.msg)}))},bindRelation:function(){var e=wx.getStorageSync("user").id;console.log("调用函数bindrelation"),t.wjw_http({url:"app/cduserspecialbalance/update",type:"get",data:{userId:e,openId:this.openId,supUserId:this.invite_id}}).then((function(t){0==t.code&&console.log("上下级关系成功")})).catch((function(t){console.log(t)}))},getOpenId:function(){var e=this,i=this;t.wjw_http({header:{"content-type":"application/json;charset=UTF-8"},url:"app/wechat/getOpenId",type:"post",data:{appId:"wx74605d2c3744958c",code:i.code}}).then((function(t){0==t.code&&(e.openId=t.data.openid,console.log("openId 获取之后，进行下一步调用函数"),wx.getStorageSync("user")&&(console.log("连接上下级的关系 ，调用函数"),e.bindRelation()))})).catch((function(t){}))},getMap:function(){t.getLocation({success:function(e){t.openLocation({latitude:e.latitude,longitude:e.longitude,scale:18})}})},getAddress:function(){var e=this,i=wx.getStorageSync("user").mer_id;t.wjw_http({url:"merchant/info/"+i,type:"post"}).then((function(t){0==t.status&&(e.addressName=t.result.shop_name)})),this.$forceUpdate()},quickVIP:function(){var e=this;t.wjw_http({url:"bannergoods/list",method:"get",data:{page:1,limit:3}}).then((function(t){if(0==t.status){t.result.map((function(t){return t}));e.quickgetVipURl=t.result}}))},videoList:function(){var e=this,i=wx.getStorageSync("user").id;t.wjw_http({url:"vedio/list",type:"post",data:{userId:i,page:e.page,pageSize:10}}).then((function(t){if(0==t.status){var i=t.result,n=Math.floor(Math.random()+1);i=i.slice(n,n+3),e.videolist=i}})).catch((function(t){console.log(t)}))},videoJump:function(e){t.navigateTo({url:"/pages/video/detail?id="+e})},quickList:function(e){t.navigateTo({url:"/pages/goods/goods?id="+e})},get_banner:function(e){var i=this;t.wjw_http({url:"banner/list",data:{}}).then((function(t){0==t.status&&(i.bannar=t.result.map((function(t){return t.photo})),i.bannerLink=t.result.map((function(t){return t.id})))}))},huodong:function(){var e=this,i=wx.getStorageSync("user").mer_id;t.wjw_http({url:"bannermer/list",type:"get",data:{merId:i}}).then((function(t){0==t.status&&(e.huodongList=t.result)}))},bannerJump:function(e){var i=this.bannerLink[e];t.navigateTo({url:"../goods/goods?id="+i})},getNews:function(e){var i=this;t.wjw_http({url:"bannermsg/list",method:"post",data:{phone:this.phone}}).then((function(t){0==t.status&&(i.notice_list=t.result.map((function(t){return t.title})))}))},getActivityTopic:function(){var e=this;t.wjw_http({url:"saleevent/listByPage",method:"post",data:{page:1}}).then((function(t){if(0==t.status){var i=t.result.list;i=i.slice(0,3),e.active_list=i}}))},actiTop:function(e){t.navigateTo({url:"/pages/goods/goods?id="+e})},getAllGoodsClassificate:function(){var e=this,i=this;t.wjw_http({url:"goodsclass/list"}).then((function(t){0==t.status&&(i.allGoodsCateList=t.result.map((function(t){return t.class_name})),i.allGoodsCateIdList=t.result.map((function(t){return t.id})),e.$forceUpdate())}))},category:function(e,i){this.cateFlag=!0,this.sels=0,this.sel=e;var n=i,a=this,o=a.allGoodsCateIdList[e];t.wjw_http({url:"saleevent/listByPage",data:{page:n,pageSize:6,ower_type:2,class_id:o}}).then((function(t){if(0==t.status){if(a.pageSizes=t.result.pages,1!=n){var e=t.result.list,i=a.allGoodsList;i=i.concat(e),a.allGoodsList=i}else a.allGoodsList=t.result.list;a.cateORallFlag=!0}}))},delColor:function(e){var i=this;this.cateFlag=!1,this.sels=1,this.sel=-3;var n=e,a=this;t.wjw_http({url:"saleevent/listByPage",data:{page:n,pageSize:6,ower_type:2}}).then((function(t){if(0==t.status)if(i.pageallSizes=t.result.pages,1!=n){var e=t.result.list,o=a.allGoodsList;o=o.concat(e),a.allGoodsList=o}else a.allGoodsList=t.result.list}))},cateDetail:function(e){t.navigateTo({url:"../goods/goods?id="+e})}}};e.default=i}).call(this,i("543d")["default"])},7148:function(t,e,i){"use strict";(function(t){i("a53d");n(i("66fd"));var e=n(i("eb38"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},db11:function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.red_page_show=!1})},o=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}))},e735:function(t,e,i){"use strict";i.r(e);var n=i("5915"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},eb38:function(t,e,i){"use strict";i.r(e);var n=i("db11"),a=i("e735");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("117d");var s,c=i("f0c5"),l=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"7ec3a51e",null,!1,n["a"],s);e["default"]=l.exports}},[["7148","common/runtime","common/vendor"]]]);