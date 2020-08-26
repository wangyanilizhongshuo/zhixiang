
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
		onLaunch: function() {
			console.log('App Launch');
			
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide')
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
