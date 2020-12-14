
<script>

	import wjw_util from 'common/wjw_uni/wjw_util';
	uni.wjw_http = wjw_util.https;
	// uni.formatTime=wjw_util.formatTime;

	// 挂载全局函数 -------------------------------
	import Vue from 'vue';
	// import wjw_util from 'common/wjw_uni/wjw_util';
	import wjw_com_uni from "@/common/wjw_uni/wjw_com";
	// 重新推入对象报错 JavaScript 程序错误Cannot use 'in' operator to search
	// Vue.prototype = {
	// 	...Vue.prototype,
	// 	...wjw_com_uni,
	// };
	Object.assign(Vue.prototype, wjw_com_uni, wjw_util);
	// 挂载全局函数 -end -------------------------------
  
	// var api = 'http://zxyp.hzbixin.cn:8083/';// 正式地址 
var api = 'https://zxyp.hzbixin.cn/';// 正式地址 -新
 //var api = 'http://zxyptest.hzbixin.cn/';// 测试s地址
	Array.prototype.notempty = function(){
	    for(var i=0; i<this.length; i++){
	        if(this[i] == "" || typeof(this[i]) == "undefined"){
	            this.splice(i,1);
	            i--;
	        }
	    }
	    return this;
	};

	export default {
	    globalData: {
	        api: api,
		
	    },
		 onLaunch: function(options) {
		            var self = this
		            // 获取小程序更新机制兼容
		            if (wx.canIUse('getUpdateManager')) {
		                const updateManager = wx.getUpdateManager()
		                //1. 检查小程序是否有新版本发布
		                updateManager.onCheckForUpdate(function(res) {
		                  // 请求完新版本信息的回调
		                  if (res.hasUpdate) {
		                    //检测到新版本，需要更新，给出提示
		                    wx.showModal({
		                      title: '更新提示',
		                      showCancel:false,//隐藏取消按钮
		                      confirmText:"确定更新",//只保留确定更新按钮
		                      content: '检测到新版本，是否下载新版本并重启小程序？',
		                      success: function(res) {
		                        if (res.confirm) {
		                          //2. 用户确定下载更新小程序，小程序下载及更新静默进行
		                          self.downLoadAndUpdate(updateManager)
		                        } else if (res.cancel) {
		                          //用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
		                          wx.showModal({
		                            title: '温馨提示~',
		                            content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
		                            showCancel:false,//隐藏取消按钮
		                            confirmText:"确定更新",//只保留确定更新按钮
		                            success: function(res) {
		                              if (res.confirm) {
		                                //下载新版本，并重新应用
		                                self.downLoadAndUpdate(updateManager)
		                              }
		                            }
		                          })
		                        }
		                      }
		                    })
		                  }
		                })
		              } else {
		                // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
		                wx.showModal({
		                  title: '提示',
		                  content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
		                })
		            }
		        },
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			  downLoadAndUpdate: function (updateManager){
			                var self=this
			                wx.showLoading();
			                //静默下载更新小程序新版本
			                updateManager.onUpdateReady(function () {
			                  wx.hideLoading()
			                  //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
			                  updateManager.applyUpdate()
			                })
			                updateManager.onUpdateFailed(function () {
			                  // 新的版本下载失败
			                  wx.showModal({
			                    title: '已经有新版本了哟~',
			                    content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
			                  })
			                })
			            },
		}
	}
</script>

<style>
	
	@import "/common/wjw_uni/wjw_com.wxss";
	@import "/common/commons/change_css.css";
    page{
		height:100%;
	}

	.title_li{
		margin: 30rpx 0rpx;
	}
	.title_li_divider{
		height: 1rpx;
		background: #ff0149;
	}
	.title_li_img{
		width: 36rpx;
		height: 36rpx;
		margin: 0 5rpx;
	}
	.title_li_name{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(0,0,0,1);
	}

	.play_box{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.play_icon{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		width: calc(40 / 750 * 100vw);
		height: calc(40 / 750 * 100vw);
	}
	.page{
		display: block !important;
		
	}
	.page_btn{
		border-radius: 0;
		background: #36acf7;
		color: #fff;
		line-height: 51px;
		font-size: 15px;
		font-family: PingFang SC;
		font-weight: 500;
		color: #fff;

		width: 90vw;
		margin: 5vw;
	}

	.mt0{
		margin-top: 0 !important;
	}
</style>
