
//添加complete：便于网络请求的complete方法。
Promise.prototype.complete = function(callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
    );
};
//封装异步api
const wxPromisify = fn => {
    return function(obj = {}) {
        return new Promise((resolve, reject) => {
            obj.success = function(res) {
                resolve(res)
            }
            obj.fail = function(res) {
                reject(res)
            }

            fn(obj)
        })
    }
}

const getLocationPromisified = wxPromisify(uni.getLocation); //获取经纬度
const showModalPromisified = wxPromisify(uni.showModal); //弹窗
const getUrl = (url) => {
    if (url.indexOf('://') == -1) {
        url = getApp().globalData.api + url;
    }
    if(
        window
        && window.location
        && window.location.protocol
        && ['http:', 'https:'].indexOf(window.location.protocol)!=-1
    ){
        // console.log('判断请求网站, 是否添加前缀 判断当前协议 window.location.protocol', window.location.protocol);
        // console.log('判断请求网站, 是否添加前缀 判断当前协议 getApp().globalData.api', getApp().globalData.api);
        url=url.replace(/^(http|https):/, window.location.protocol);
    }
    return url
}

// token失效
function token_false(res){
    uni.clearStorageSync();
    uni.showToast({
        // title: res.data.msg,
		title: '请重新登录',
        icon: 'none', 
    });
    setTimeout(res=>{
        if(window&&window.Service){
            window.Service.loginOut();
            return
        }
        uni.reLaunch({
              url:'/pages/login/login',
			
        });
    }, 1000);
}

// 判断地址头是否是服务器地址
function judge_url_pre(url){
    url += '';
    var url_pre = '';
    var result = '';
    url_pre = getApp().globalData.api.replace(/^(http|https):/, '');;
    result = url.search( new RegExp('^(http|https):'+url_pre)) != -1;
    return result;
}
// method 必须大写，有效值在不同平台差异说明不同。
const https = ({ type = 'POST',method = type, url = '', data = {},param = data, isDebug = false, isLoad = false, header={}, } = {}) => {
    // method 必须大写，有效值在不同平台差异说明不同。
    method = method.toUpperCase()
    if (isLoad) {
        wx.showLoading({
            title: '请求中...'
        });
    }
	
    let timeStart = Date.now();

    var const_data={};
    var const_header={};
    if(judge_url_pre(getUrl(url))){
        const_data.token = wx.getStorageSync('token');
        const_header.token = wx.getStorageSync('token');
        const_header['content-type'] = "application/x-www-form-urlencoded";
    }
    return new Promise((resolve, reject) => {
        uni.request({
            url: getUrl(url),
            data: {
				token: wx.getStorageSync('token'),
                // ...const_data,
                ...param,
            },
            method: method,
            header: {
                // 'content-type': 'application/json', // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
                // 'content-type': 'application/x-www-form-urlencoded', 
                // 'token': wx.getStorageSync('token'),

                // 'content-type': judge_url_pre(getUrl(url))?'application/x-www-form-urlencoded':"application/json", 
                 token: judge_url_pre(getUrl(url))?wx.getStorageSync('token'):'',

                'content-type': 'application/json', 

                ...const_header,

                ...header,
            },
            complete(res){
				
                if(judge_url_pre(getUrl(url))){
                        // 针对 非app内嵌h5 即浏览器h5
                    if(window&&window.location&&window.location.hostname=='localhost'){
                        if(res.errMsg=="request:fail" ){
                            // token失效
                            token_false({
                                ...res, 
                                data:{
                                    code: '自定义code',
                                    msg: 'token失效',
                                },
                            });
                            reject(res);
                        }
                    }
					
                    // 本地 -end --------------------------------------------
                    switch (res.statusCode) {
                        case -97:
                            // 无效参数
							wx.redirectTo(
							{
								url:'/pages/login/login'
							})
                            break;
						case 401:
							// 无效参数
							wx.redirectTo(
							{
								url:'/pages/login/login'
							})
							break;
							
						case 403:
							// 无效参数
							wx.redirectTo(
							{
								url:'/pages/login/login'
							})
							break;
						case 404:
							// 无效参数
							wx.redirectTo(
							{
								url:'/pages/login/login'
							})
							break;
						case 201:
							// 无效参数
							wx.redirectTo(
							{
								url:'/pages/login/login'
							})
							break;
						case -95:
							wx.redirectTo(
							{
								url:'/pages/login/login'
							})
							// toastTip(res.data.msg);
							break;
						case -10:
							wx.redirectTo(
							{
								url:'/pages/login/login'
							})
							
							break;
						case -96:
						
							wx.redirectTo(
							{ 
								url:'/pages/login/login'
							})
							break;
							default:
							   break;
                    }

                }


                if (isLoad) {
                    uni.hideLoading()
                }
                if (isDebug) {
                }
                if (res.statusCode >= 200 && res.statusCode < 300) {
					
                    if(!judge_url_pre(getUrl(url)) ){
                        resolve(res.data)
                        return;
                    }
					// &&res.data
                    if (res.data.status==-95&&res.data.msg&&res.data.msg.indexOf('token')!=-1) {
                        // token失效
						
                        token_false(res);
                        reject(res);
                    } else 
					if (res.data.status==0|| res.data.code==0 ||res.statusCode ==200) {
					    resolve(res.data)
					} 
					// res.data.status ==-96|| res.data.status==-11 ||res.data.status ==-97 ||
					else if(res.data.code ==-95){
						 token_false(res);
						  reject(res);
					}
					// 个人中心没有登录 返回-97s  详情页没有选择 也是返回97     res.data.status==-97 ||
					else if(res.data.status==-96){
						token_false(res);
						 reject(res);
					}
					// 测试 购物车没有id   的返回值  是500 
					else {
						res.data.msg && uni.showToast({
						    // title: res.data.msg,
							title: '请重新登录',
							icon: 'none', 
						});
					    reject(res)
					}
                } else {
                    reject(res)
                }
            }
        })
    })
}


// 延迟跳转
function delayJump(url = '/pages/index/index', duration = 1000, type = 1) {
    setTimeout(function() {
        switch (type) {
            case 1:
                uni.navigateTo({
                    url: url
                })
                break;
            case 2:
                uni.redirectTo({
                    url: url
                })
                break;
            case 3:
                uni.switchTab({
                    url: url
                })
                break;
            default:
                break;
        }
    }, duration)
}
// 验证手机号
function is_phone(phone) {
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(phone)) {
        console.log("手机号正确");
        return true;
    } else {
       //console.log("手机号错误");
        return false;
    }
}
// 验证中文
function is_zh_CN(name, length = 3) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
    if (name.length > length) {
        console.log("文字字数超出", name, length);
        return false;
    }
    var reg = /[\u4e00-\u9fa5]/ig;
    if (reg.test(name)) {
        console.log("文字为全中文");
        return true;
    } else {
        console.log("文字非全中文");
        return false;
    }
}

// 验证身份证号码
function isCardNo(card) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card)) {
        console.log("身份证输入合法");
        return true;
    } else {
        console.log("身份证输入不合法");
        return false;
    }
}
 function urlEncode(data) {
     var _result = [];
     for (var key in data) {
       var value = data[key];
       if (value.constructor == Array) {
         value.forEach(function(_value) {
            _result.push(key + "=" + _value);
         });
       } else {
         _result.push(key + '=' + value);
       }
      }
     return _result.join('&');
   }
 function wxPayment(option) {
        let options = Object.assign({
          result: {},
          success: () => {},
          fail: () => {},
          complete: () => {},
        }, option);
		console.log(options)
        uni.requestPayment({
		  'appId':options.result.appId,
          'timeStamp': options.result.timeStamp,
          'nonceStr': options.result.nonceStr,
          'package': options.result.prepayId,
          'signType': 'MD5',
          'paySign': options.result.sign,
          success(res) {
            options.success(res);
          },
          fail(res) {
            options.fail(res);
          },
          complete(res) {
            options.complete(res);
          }
        });
    }
	function getUserId() {
	      return wx.getStorageSync('user').id;
	  }
	  function getMerId() {
	        return wx.getStorageSync('user').mer_id ||0;
	    }
	   /**
	   * 生成转发的url参数getShareUrlParams
	   */
	function  getShareUrlParams(params) {
	      let _this = this;
		   // console.log(getMerId())
	       return urlEncode(Object.assign({
	         invite_id: getUserId(),
			 mer_id:getMerId()
			 // mer_id:getMerId()
			
	       }, params));
	  }


module.exports = {
    https,
	wxPayment,
    getLocationPromisified,
    showModalPromisified,
    delayJump,
    is_phone, // 验证手机号
    is_zh_CN, // 验证中文
    isCardNo, // 验证身份证号码
    urlEncode,
	getShareUrlParams
}