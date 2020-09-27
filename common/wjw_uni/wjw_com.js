/* 微信小程序 转 uniapp
	1.wx=>uni
	2.this.data=>this.$data
	3.uniapp无setData相关函数, 添加翻译后的setData函数
*/
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
function setData(obj) {
   // console.log('wjw自定义 setData 注意复制的变量需要在vue.data里声明', obj);
    // console.log('setData', this, obj);
    let that = this;
    let keys = [];
    let val, data;
    Object.keys(obj).forEach(function(key) {
        keys = key.split('.');
        val = obj[key];
        data = that.$data;
        if(!(keys[0] in data)){
            return
        }
        keys.forEach(function(key2, index) {
            if (index + 1 == keys.length) {
                that.$set(data, key2, val);
            } else {
                if (!data[key2]) {
                    that.$set(data, key2, isNaN(keys[index+1])?{}:[]);
                }
            }
            data = data[key2];
        })
    });
}



    // console.log(this, wx, wx.do, wx.do_judge);
    // console.log('wx.do--自定义延迟执行wx方法, 参数一填对应方法, 后面是原来参数');
    // 小程序 个人自定义函数
    wx.do = function(method, ...obj) {
        if (wx.do_judge) {
            console.log(method + '正在执行, 1.5秒后可执行');
            return;
        } else {
            wx.do_judge = true;
            setTimeout(() => {
                wx.do_judge = false;
            }, 1500)
        }
        setTimeout(() => {
            wx[method](...obj);
        }, 1000)
    };



// 登录页面
var login_url = '/pages/common/login/login';

// 页面名称简化 set_pages() 用于app.js
// console.log(__wxConfig);
function set_pages() {
   // console.log('页面名称简化');
    var {
        pages
    } = __wxConfig;
    var arr, str, obj = {};
    pages_for: for (var i = pages.length - 1; i >= 0; i--) {
        arr = pages[i].split('/');
        if (arr[0] == '') {
            arr.shift();
        }
        page_for: for (var j = arr.length - 1; j >= 0; j--) {
            str = arr[j];
            if (str == 'pages' && j == 0) {
                str = arr[arr.length - 1];
                break page_for;
            }
            if (str != 'index') {
                if (arr[1] != str) {
                    str = arr[1] + '_' + str;
                }
                if (obj[str]) {
                    // str = arr[1] + '_' + str;
                    // if (obj[str]){
                    str += 2;
                    // }
                }
                // console.log(str);
                break page_for;
            }
        }
        obj[str] = pages[i];
    }
   // console.log(obj);
    return obj;
}
// set_pages();  


// 变量路径拆分 var_path_split({path, start, is_data:true, _this}) path->路径 start->初始值
function var_path_split({
    path,
    start,
    is_data = true,
    _this
}) {
    var reg = /[^\[\]\.]+/g;
    var arr = path.match(reg);

    var var_v = start || (is_data ? (_this || this).$data : _this); // var_value
    // console.log('变量路径拆分', {
    //     path,
    //     start
    // });
    var new_path = arr[0];
    for (let v of arr) {
        if (var_v == undefined) {
            // console.log('添加', {
            //     new_path,
            //     var_v,
            //     v
            // })
            if (isNaN(v)) {
                var_v = {};
            } else {
                var_v = [];
            }
            if (is_data) {
                var that = _this || this;
               // console.log(this, new_path);
                that.setData({
                    [new_path]: var_v,
                })
            }
        }
        var_v = var_v[v || var_v.length];
        if (v != new_path) {
            // console.log(v, isNaN(v));
            if (isNaN(v)) {
                new_path += '.' + v;
            } else {
                new_path += `[${v}]`;
            }
        }
    }
   // console.log('变量路径拆分返回值: ', var_v);
    return var_v;
}

// 设置自定义参数
function dataset(e) {
    // console.log('设置自定义参数', e);
    if(e){
        var param = e.currentTarget.dataset.param;
        param && (param = JSON.parse(param));
        var obj = {
            ...e.detail,
            ...e.currentTarget.dataset,
            // ...e.currentTarget.dataset.param,
        };
        param && (obj = { ...obj, ...param });
        return obj;
    }else{
        return {};
    }
}

// 应用到util的 request请求函数 与 delayJump延迟跳转函数
var util = require('./wjw_util.js');


// 判断请求网站, 是否添加前缀;  getUrl(url);
function getUrl(url){
 //   console.log('判断请求网站, 是否添加前缀', url, url.indexOf('://') == -1, getApp().globalData.api);
    if (url.indexOf('://') == -1) {
        // console.log('this.$scope', this.$scope);
        // console.log('getApp()', getApp());
        url = getApp().globalData.api + url;
        // var config = require("../utils/config");
        // url = config.url + url;
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

// 延迟跳转
function delayJump(url = '/pages/index/index', duration = 1000, type = 1, delta=1) {
    // console.log('延迟跳转', {
    //     url,
    //     duration,
    //     type,
    //     delta,
    // });
    setTimeout(function() {
        var method = '';
        type -= 0;
        switch (type) {
            case 1:
                method = 'navigateTo';//跳转
                break;
            case 2:
                method = 'redirectTo';//关闭当前页面，跳转
                break;
            case 3:
                method = 'switchTab';// 跳转到tabbar页面
                break;
            case 4:
                method = 'reLaunch';// 关闭所有页面，跳转
                break;
            case 5:
              //  console.log('路由判断 返回/跳转', url);
				return
                break;
            case 6:
                method = 'navigateBack';// 关闭当前页面，返回上一页面或多级页面
                break;
            default:
                break;
        }
        uni[method]({
            url: url,
            delta: delta,
            fail(err) {
                // console.log('页面不存在', err);
                toastTip('页面不存在');
            }
        })
    }, duration)
};

// 网络请求 对象参数
function buildRequest({
    url = '',
    param = {},
    method = 'POST',
    isDebug = false,
    isshowLoading = false
} = {}) {
    // console.log('网络请求', {
    //     url,
    //     param,
    //     method,
    //     isDebug,
    //     isshowLoading,
    // });
    if (isshowLoading) {
        uni.showLoading({
            title: '请求中...'
        });
    }
    let timeStart = Date.now();
    return new Promise((resolve, reject) => {
        uni.request({
            url: getUrl(url),
            data: param,
            method: method,
            header: {
                'content-type': 'application/json', // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
                'token': uni.getStorageSync('token'),
            },
            complete: (res) => {
                if (isshowLoading) {
                    uni.hideLoading()
                }
                if (isDebug) {
                    // console.log(`耗时${Date.now() - timeStart}`);
                    // console.log(res.data)
                }
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            }
        })
    })
}

// 网络请求 一对一参数
function request(url, param = {}, method = 'POST', isDebug, isshowLoading) {
    return buildRequest({
        url,
        param,
        isDebug: isDebug,
        isshowLoading: isshowLoading,
        method: method
    })
}

// 提示信息
function toastTip(msg = 'Error', icon = 'none', duration = 1000) {
    uni.showToast({
        title: msg,
        icon: icon,
        duration: duration
    })
}


// 提示加载信息
function loadTip(msg = '加载中...') {
    uni.showToast({
        title: msg,
        mask: true,
        icon: 'loading',
        // #ifdef MP-ALIPAY
        icon: 'none',
        // #endif
        duration: 55000,
    });
}

//  登录检测
function login_check() {
    // console.log('登录检测');
    let token = uni.getStorageSync('token');
    return token;
}

// 页面跳转 基于delayJump延迟跳转函数
// 参数: 1.data-url 页面地址; 2.data-type 跳转类型; 3.data-time 跳转延迟时间; 4.data-check 跳转前判断; 其他皆为传递参数
function jump(e) {
    var obj = dataset(e);
    var fixed_param_arr = ['url', 'time', 'type', 'check', 'phone_check', 'param']; //固定参数数组
    var {
        url,
        time = 0,
        type,
        check,
        phone_check,
    } = obj;
    if (!url) {
        // console.log('无跳转页面', url);
        return
    }
    // 登录检测
    if (check) {

        // login_check 登录检测
        if (login_check && login_check()) {
              delayJump(login_url, 0);
            return;
        }
    }
    if (uni.jump) {
        return;
    } else {
        uni.jump = true;
        uni.jump_time = time / 1000 + 0.5;
        setTimeout(() => {
            uni.jump = false;
        }, time + 500)
    }
    var param = '?'; //存储拼接的参数
    for (let i in obj) {
        if (fixed_param_arr.indexOf(i) != -1) {
            continue
        }
        if (param != '?') {
            param += '&'
        }
        param += `${i}=${obj[i]}`;
    }
    if (param == '?') {
        param = '';
    }

    // 手机号检测
    if (phone_check) {
        // console.log('需要绑定手机号, 判断用户是否绑定手机号');
        var {
            user_info
        } = getApp().globalData;
        if (!user_info) {
            // toastTip('需要绑定手机号');
            getApp().globalData.phone_check_data = {
                url: type == 3 ? url : (url + param),
                type,
            }
            delayJump(`/${getApp().globalData.page_data.pages.common_accounts}`);
            return;
        }
    }
    // console.log('跳转地址: ', url + param);
    delayJump(type == 3 ? url : (url + param), time, type);
}



// 输入框修改属性 bindinput='input_set_value' data-name='name' data-int='{{true}}'(取整) catchtap='input_set_value'
function input_set_value(e) {
    var {
        name,
        int,
    } = dataset(e);
    var {
        value = '',
            current = '',
    } = e.detail;
    value || (value = current)
    if (int) {
        value = isNaN(parseInt(value)) ? 0 : parseInt(value);
    }
    console.log('输入框修改属性', e, {
        name,
        value
    });
    try {
        this.setData({
            [name]: value
        });
    } catch (err) {
        // 验证路径以及补齐路径
        var_path_split.call(this, {
            path: name,
            start: this.$data
        });
        this.setData({
            [name]: value
        });
    }
}

// 设置属性值 bindtap='set_value' data-name='name' data-value='{{index}}' data-method='push' catchtap='set_value'
function set_value(e) {
    var {
        name,
        value = '',
        index = 0,
        method,
        no_report,
    } = dataset(e);
    console.log('设置属性值', e, {
        name,
        value,
        method,
    });
    var name_arr = name.split(/ *[,， ] */g);
    var value_arr = [];
    if (typeof value == 'string') {
        value_arr = value.split(/ *[,， ] */g);
    } else {
        value_arr.push(value);
    }
    console.log({
        name_arr,
        value_arr
    });
    name_arr.map((item, indexs, arr) => {
        if (!item) {
            console.log('路径为空 不设置', item);
            return;
        }
        var value = value_arr[indexs] == 'false' ? false :
            (
                value_arr[indexs] == undefined ?
                value_arr[indexs - 1] || value_arr[value_arr.length - 1] :
                value_arr[indexs]
            );
        // console.log({
        //     item,
        //     indexs,
        //     value
        // }, this);
        // 验证路径以及补齐路径
        var data_v = var_path_split.call(this, {
            path: item,
            start: this.$data
        });
        if (no_report && data_v == value) {
            // console.log('属性值相同, 不设置', {
            //     name: item,
            //     value,
            //     data_v,
            // }, data_v == value);
            return
        }
        if (method == 'push' && index == indexs) {
            if (!Array.isArray(data_v)) {
                data_v = [];
            }
            data_v.push(value);
            value = data_v;
        }
       
        if (method == 'splice' && index == indexs) {
            if (!Array.isArray(data_v)) {
                data_v = [];
            }
            var arr_index = -1;
            while ((arr_index = data_v.indexOf(value)) != -1) {
                console.log('删除', arr_index);
                data_v.splice(arr_index, 1)
            }
            console.log('删除111', data_v.indexOf(value));
            value = data_v;
        }
        console.log(item, value);
        this.setData({
            [item]: value
        })
    })
}

// 增减属性值 bindtap='count_value' data-name='name' data-count='add/min' catchtap='count_value'
function count_value(e) {
    console.log('增减属性值', e);
    var {
        name,
        count,
    } = dataset(e);
    var data_v = var_path_split.call(this, {
        path: name,
        start: this.$data
    });
    isNaN(data_v) && (data_v = 0);
    data_v = (data_v - 0) || 0;
    if (count == 'add') {
        data_v++;
    } else {
        data_v--;
    }
    this.setData({
        [name]: data_v
    })
}

// 阻止事件冒泡 catchtap='event_false'
function event_false(e) {
    console.log('阻止事件冒泡', e);
    return false;
}

//禁止滑动
function stop_swiper(e) {
    console.log('禁止滑动', e);
    return true;
}

// 显示提示
function showToast(e) {
    console.log('显示提示', e);
    var {
        title = '提示',
            icon = 'none',
            duration = 2000,
    } = dataset(e);
    uni.showToast({
        title,
        icon,
        duration,
    });
}

// 执行多个方法 bindtap="do_fns" data-fns='fn1 fn2'
function do_fns(e) {
    console.log('执行多个方法', e);
    var {
        fns,
    } = dataset(e);
    var fn_arr = fns.split(/ *[,， ] */g);
    fn_arr.map((item, index, arr) => {
        console.log({
            item,
            index
        });
        this[item](e);
    });
}



// 上传文件 递归调用 需要页面this
function uploadFiles({
    file,//array []
    i = 0,
    url = getApp().globalData.api + 'upload',
    name = 'file',
    data_name = 'files',
    header,
    is_new = false,
    res_name = 'url',
    back_fn,
}) {
    url = getUrl(url);
    console.log("上传文件", file[i]);
    var arg = arguments;
    var that = this;
    var success = url => {
        var arr = this.$data[data_name] || this.var_path_split({
            path: data_name
        }) || [];
        if (is_new && i == 0) {
            arr = [];
        }
        arr.push(url);
        this.setData({
            [data_name]: arr,
        });
        if (i < file.length - 1) {
            console.log(arguments, { ...arg[0],
                i: i + 1
            });
            this.uploadFiles({ ...arg[0],
                i: i + 1
            });
        } else {
            back_fn && back_fn(arr);
        }
    }
   
    if (
        file[i].indexOf(getApp().globalData.api) != -1 
        ) {
        console.log("已上传文件, 下一个");
        success(file[i]);
        return;
    }

    console.log('uploadFile', {
        url,
        filePath: file[i],
        name,
        header: {
            "Content-Type": "multipart/form-data",
            // "Content-Type": "application/json",
            'token': uni.getStorageSync('token'),
            ...header,
        },
    });
    uni.uploadFile({
        url,
        filePath: file[i],
        name,
        header: {
            // "Content-Type": "multipart/form-data",
            // "Content-Type": "multipart/form-data; boundary=------WebKitFormBoundaryA54cVlVB3pIghAN2",

            // "Content-Type": "application/json",
            'token': uni.getStorageSync('token'),
            ...header,
        },
        success: (res) => {
            console.log("上传文件 成功", i + '/' + file.length, res);
            var res_data = JSON.parse(res.data).data;
            var url = res_data[res_name]||res_data;
            url = url.replace('http://127.0.0.1:8080/renren-fast', getUrl(''));
            url = url.replace('https://127.0.0.1:8080/renren-fast', getUrl(''));

            // prompt('上传文件 成功 file[i] '+ (i + 1), url);
        
            success(url);
        },
        fail: function(err) {
            console.log('上传文件 失败', err);
            // that.uploadFile2(arguments);
            toastTip('上传文件 失败');
        },
        // complete: function(res) {
        //     console.log('上传文件 complete', res);
        //     // prompt('uploadFile complete', JSON.stringify(err));
        // },

    })
}





// 创建dataset
function create_dataset(obj) {
    console.log('创建dataset', obj);
    return {
        currentTarget: {
            dataset: obj
        },
        detail: {
            value:obj,
        },
    };

}

// 发送请求 dataset参数 需要页面this
/*
    this.http_dataset(this.create_dataset({
        url: '',
        https_param: {}, undefined
        method: 'get',
        back_fn: res => {
            this.setData({
                navlist: res.data
            })
        }
    }))
*/
function http_dataset(e) {
    console.log('发送请求 dataset参数', e);
    var {
        url,
        https_param,
        method,
        https_then,
        https_catch,
        back_fn,
    } = dataset(e);
    https_param = { ...dataset(e),
        ...https_param
    };
    (util.https ? util.https : request)(
        url,
        https_param,
        method, ).then(res => {
        console.log('接口回调成功', res);
        typeof back_fn === 'function' && back_fn(res);
        https_then && this[https_then] && this[https_then]({ ...e,
            ...res
        });
    }).catch(res => {
        console.log('接口回调失败', res);
        https_catch && this[https_catch] && this[https_catch]({ ...e,
            ...res
        });
    });

}


function show_modal(e) {
    console.log('确认对话框', e);
    var obj = dataset(e);
    var content = obj.contents;
    uni.showModal({
        title: '提示',
        ...obj,
        content,
        success: res => {
            if (res.confirm) {
                console.log('用户点击确定');
                typeof obj.confirm == 'function' && obj.confirm();
                obj.confirm && this[obj.confirm] && this[obj.confirm](e);
            } else if (res.cancel) {
                console.log('用户点击取消')
                obj.cancel && this[obj.cancel] && this[obj.cancel](e);
            }
        }
    })

}

// 获取地址
function get_addr(e) {
    console.log('获取地址', e);
  
}



//页面加载完成函数
function onReady() {
    return
    console.log('onReady 页面初次渲染');
    var that = this;
    setTimeout(function() {
        console.log('关闭加载动画');
        that.setData({
            remind: true,
        });
    }, 800);
}

//设置全局变量
function set_glo(e) {
    console.log('设置全局变量');
    var {
        glo = {}
    } = dataset(e);

    var glos = getApp().globalData;
    for (var i in glo) {
        glos[i] = glo[i];
    }
    // console.log(glos, getApp().globalData);
}

//设置缓存
function set_stor(e) {
    console.log('设置缓存');
    var {
        name,
        value,
    } = dataset(e);
    if (!name) {
        console.log('未输入缓存名', {
            name
        });
        return;
    }
    uni.setStorageSync(name, value);
}


//判断对象属性值是否存在空
function obj_value_empty(obj) {
    console.log('判断对象属性值是否存在空');
    for (var i in obj) {
        if (obj[i] == '' || obj[i] == null || obj[i] == undefined) {
            return true;
        }
    }
    return false;
}

// 弹框事件
function popup_fn(e) {
    var {
        fn
    } = dataset(e);
    console.log('弹框事件', this, fn);
    fn && this.popup[fn](e);
}



// 判断授权 
function judge_auth(back_fn) {
    console.log('判断授权', back_fn)
    var auth_false = res => {
        console.log('未授权 后续执行事件');
        console.log('getCurrentPages', getCurrentPages());
        // uni.navigateTo({
        uni.redirectTo({
            url: '/pages/login/login',
            complete: res => {
                console.log('redirectTo complete', res);
                console.log('getCurrentPages complete', getCurrentPages());
                // console.log('this', this);//app
                // console.log('this.route', this.route);

            },
        })
    };
    uni.getSetting({
        success(res) {
            console.log('判断授权 返回成功', res, Page)
            if (!res.authSetting['scope.userInfo']) {
                console.log('判断授权 未授权', res)
                if (typeof back_fn === 'function') {
                    return
                }

                // 页面注册前无法跳转页面
                console.log('判断授权 未授权 判断 页面注册 是否已完成', getCurrentPages())
                if (getCurrentPages().length) {
                    console.log('判断授权 未授权  页面注册 已完成', getCurrentPages())
                    auth_false();
                } else {
                    console.log('判断授权 未授权  页面注册 未完成', getCurrentPages())
                    var timer = setInterval(res => {
                        if (getCurrentPages().length) {
                            console.log('判断授权 未授权  页面注册 已完成 清除定时器', getCurrentPages())
                            clearInterval(timer);
                            auth_false();
                        } else {
                            console.log('判断授权 未授权  页面注册 未完成 继续定时器', getCurrentPages())
                        }
                    }, 200);
                }
            } else {
                typeof back_fn === 'function' && back_fn(res);
            }
        },
    })
}





// 测试获取未使用的code
function get_codes(e) {
    console.log('测试获取未使用的code get_codes', e);
    var all_num = 10;
    var num = 0;
    var timer = setInterval(res => {
        if (num >= all_num) {
            clearInterval(timer);
            return;
        }
        num++;
        //获取登录凭证
        uni.login({
            success: res => {
                var code = res.code
                console.log('code', code);
            },
        })
    }, 10);
}


Date.prototype.Format = function(fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[
            k]).substr(("" + o[k]).length)));
    return fmt;
}



// 收集formID
function getFormId(ev) {
    console.log('收集formID', ev);
    let formId = ev.detail.formId;
    console.log('formId', ev.detail.formId);
    // 虚假formid，模拟器测试使用
    formId == 'the formId is a mock one' && (formId = 'cf5867a6fb5f49feb4bc442fd0eb39ea');
    /* formId被后台使用时
        返回码 说明
        40037 template_id不正确
        41028 form_id不正确，或者过期
        41029 form_id已被使用
        41030 page不正确
        45009 接口调用超过限额（目前默认每个帐号日调用限额为100万）
    */


    // POST
    // /p/formid/addFormId
    uni.https({
        url: '/p/formid/addFormId',
        method: 'POST',
        header: {
            "content-type": "application/x-www-form-urlencoded",
        },
        data: {
            formId,
        },
        success: res => {
            console.log('收集formID 接口调取成功', res);
        },
    })
}

// 打印
function console_log(...arg) {
    console.log(...arg);
}

// 表单提交
// function formSubmit(e) {
//     console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
//     var formdata = e.detail.value
//     uni.showModal({
//         content: '表单数据内容：' + JSON.stringify(formdata),
//         showCancel: false
//     });
// }

/*
	this.set_navName(this.create_dataset({title: '123'}));
*/
// 修改导航栏标题
function set_navName(e) {

    console.log('修改导航栏标题', e);
    var {
        title,
    } = dataset(e);
    uni.setNavigationBarTitle({
        title,
    });
}




// 选择_返回操作
function chose_back(obj) {
    console.log('选择_返回操作', obj);
    var pages = getCurrentPages();
    console.log('pages', pages);
    pages.pop();
    pages.pop().get_chose(...arguments);
}
// 获取_选择页返回数据
function get_chose(obj) {
    console.log('获取_选择页返回数据', obj, this.route);
}

function chooseLocation(obj) {
    console.log('打开地图选择位置', obj);
    uni.chooseLocation({
        success: function (res) {
            // prompt('chooseLocation', JSON.stringify(res));
            /*
                {
                    "name":"庆春广场[地铁站]",
                    "address":"浙江省杭州市江干区地铁2号线",
                    "latitude":30.257597,
                    "longitude":120.204748,
                    "errMsg":"chooseLocation:ok"
                }
            */
            console.log('位置名称：' + res.name);
            console.log('详细地址：' + res.address);
            console.log('纬度：' + res.latitude);
            console.log('经度：' + res.longitude);
        }
    });
}


// 判断登陆
function judge_login(e) {
    console.log('判断登陆', e);
    var judge = uni.getStorageSync('token');
    judge && this.judge_login_back && this.judge_login_back(judge);
    return judge;
}
// 判断登陆_回调
function judge_login_back(judge) {
    console.log('判断登陆_回调', judge);
}
// 返回上一页
// function page_back(judge) {
//     console.log('返回上一页', judge);
//     wx.navigateBack();
// }

// function toFixed(num, length){
//     console.log('toFixed', arguments);
//     console.log('toFixed return', num.toFixed?num.toFixed(length):false);
//     return num.toFixed?num.toFixed(length):false;
// }


// 多页面重复时间 - 单个项目 --------------------------------------------- 
    var project_fn = {


        //时间戳转时间
       timestampToTime(timestamp) {
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
            var h =(date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
            var m =(date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
            var s =(date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
            return Y+M+D+h+m+s;
        },


        // 判断app返回功能
        back_judge_app(e) {
            console.log('判断返回', e);
            if(window&&window.Service){
                // app关闭网页
                window.Service.closeWebview();
            }else{
                wx.navigateBack()
            }
        },

        // 判断app返回功能之页面
        back_judge_app_page(e) {
            console.log('判断返回', e);
            if(getCurrentPages().length==1){
                // 判断app返回功能
                this.back_judge_app();
            }else{
                wx.navigateBack();
            }
        },



        // 获取地址列表
        addlist(e) {
            var userData = wx.getStorageSync('userData');
            if (userData) {
                var id = userData.user.id;
                var token = userData.token;
            }
            uni.wjw_http({
                url: 'address/list',
                data: {
                    userId: id,
                    token: token
                },
            }).then(res => {
                console.log('获取地址列表 接口 请求成功', res);
                  
                this.articleList = res.result||[];
                
                this.addlist_back && this.addlist_back(res);


            })

        },

        // 获取地址列表_回调 
        addlist_back(e) {
            console.log('获取地址列表_回调', e);
        },
            
    };

 var city_data=[
                    // 
                    {
                        "code": 10,
                        "name": "北京市",
                        "sub": [{
                            "code": 1001,
                            "name": "北京市",
                            "sub": [{
                                    "code": 100101,
                                    "name": "东城区"
                                },
                                {
                                    "code": 100102,
                                    "name": "西城区"
                                },
                                {
                                    "code": 100119,
                                    "name": "亦庄开发区"
                                }, {
                                    "code": 100118,
                                    "name": "密云县"
                                }, {
                                    "code": 100117,
                                    "name": "平谷区"
                                }, {
                                    "code": 100116,
                                    "name": "怀柔区"
                                }, {
                                    "code": 100115,
                                    "name": "延庆县"
                                }, {
                                    "code": 100114,
                                    "name": "大兴区"
                                }, {
                                    "code": 100113,
                                    "name": "房山区"
                                }, {
                                    "code": 100112,
                                    "name": "通州区"
                                }, {
                                    "code": 100111,
                                    "name": "门头沟区"
                                }, {
                                    "code": 100110,
                                    "name": "昌平区"
                                }, {
                                    "code": 100109,
                                    "name": "顺义区"
                                }, {
                                    "code": 100108,
                                    "name": "石景山区"
                                }, {
                                    "code": 100107,
                                    "name": "丰台区"
                                }, {
                                    "code": 100106,
                                    "name": "海淀区"
                                }, {
                                    "code": 100105,
                                    "name": "朝阳区"
                                },
                            ]
                        }]
                    },
                    {
                        "code": 11,
                        "name": "天津市",
                        "sub": [{
                            "code": 1101,
                            "name": "天津市",
                            "sub": [{
                                "code": 110118,
                                "name": "静海县"
                            }, {
                                "code": 110117,
                                "name": "宁河县"
                            }, {
                                "code": 110116,
                                "name": "蓟县"
                            }, {
                                "code": 110115,
                                "name": "宝坻区"
                            }, {
                                "code": 110114,
                                "name": "武清区"
                            }, {
                                "code": 110113,
                                "name": "北辰区"
                            }, {
                                "code": 110112,
                                "name": "津南区"
                            }, {
                                "code": 110111,
                                "name": "西青区"
                            }, {
                                "code": 110110,
                                "name": "东丽区"
                            }, {
                                "code": 110107,
                                "name": "滨海新区"
                            }, {
                                "code": 110106,
                                "name": "红桥区"
                            }, {
                                "code": 110105,
                                "name": "南开区"
                            }, {
                                "code": 110104,
                                "name": "河西区"
                            }, {
                                "code": 110103,
                                "name": "河东区"
                            }, {
                                "code": 110102,
                                "name": "河北区"
                            }, {
                                "code": 110101,
                                "name": "和平区"
                            }]
                        }]
                    }, {
                        "code": 12,
                        "name": "河北省",
                        "sub": [{
                            "code": 1211,
                            "name": "邯郸市",
                            "sub": [{
                                "code": 121120,
                                "name": "武安市"
                            }, {
                                "code": 121119,
                                "name": "曲周县"
                            }, {
                                "code": 121118,
                                "name": "魏县"
                            }, {
                                "code": 121117,
                                "name": "馆陶县"
                            }, {
                                "code": 121116,
                                "name": "广平县"
                            }, {
                                "code": 121115,
                                "name": "鸡泽县"
                            }, {
                                "code": 121114,
                                "name": "邱县"
                            }, {
                                "code": 121113,
                                "name": "永年县"
                            }, {
                                "code": 121112,
                                "name": "肥乡县"
                            }, {
                                "code": 121111,
                                "name": "磁县"
                            }, {
                                "code": 121110,
                                "name": "涉县"
                            }, {
                                "code": 121109,
                                "name": "大名县"
                            }, {
                                "code": 121108,
                                "name": "成安县"
                            }, {
                                "code": 121107,
                                "name": "临漳县"
                            }, {
                                "code": 121106,
                                "name": "邯郸县"
                            }, {
                                "code": 121105,
                                "name": "峰峰矿区"
                            }, {
                                "code": 121104,
                                "name": "复兴区"
                            }, {
                                "code": 121103,
                                "name": "丛台区"
                            }, {
                                "code": 121102,
                                "name": "邯山区"
                            }]
                        }, {
                            "code": 1210,
                            "name": "沧州市",
                            "sub": [{
                                "code": 121017,
                                "name": "河间市"
                            }, {
                                "code": 121016,
                                "name": "黄骅市"
                            }, {
                                "code": 121015,
                                "name": "任丘市"
                            }, {
                                "code": 121014,
                                "name": "泊头市"
                            }, {
                                "code": 121013,
                                "name": "孟村县"
                            }, {
                                "code": 121012,
                                "name": "献县"
                            }, {
                                "code": 121011,
                                "name": "吴桥县"
                            }, {
                                "code": 121010,
                                "name": "南皮县"
                            }, {
                                "code": 121009,
                                "name": "肃宁县"
                            }, {
                                "code": 121008,
                                "name": "盐山县"
                            }, {
                                "code": 121007,
                                "name": "海兴县"
                            }, {
                                "code": 121006,
                                "name": "东光县"
                            }, {
                                "code": 121005,
                                "name": "青县"
                            }, {
                                "code": 121004,
                                "name": "沧县"
                            }, {
                                "code": 121003,
                                "name": "运河区"
                            }, {
                                "code": 121002,
                                "name": "新华区"
                            }]
                        }, {
                            "code": 1209,
                            "name": "邢台市",
                            "sub": [{
                                "code": 120920,
                                "name": "沙河市"
                            }, {
                                "code": 120919,
                                "name": "南宫市"
                            }, {
                                "code": 120918,
                                "name": "临西县"
                            }, {
                                "code": 120917,
                                "name": "清河县"
                            }, {
                                "code": 120916,
                                "name": "威县"
                            }, {
                                "code": 120915,
                                "name": "平乡县"
                            }, {
                                "code": 120914,
                                "name": "广宗县"
                            }, {
                                "code": 120913,
                                "name": "新河县"
                            }, {
                                "code": 120912,
                                "name": "巨鹿县"
                            }, {
                                "code": 120911,
                                "name": "宁晋县"
                            }, {
                                "code": 120910,
                                "name": "南和县"
                            }, {
                                "code": 120909,
                                "name": "任县"
                            }, {
                                "code": 120908,
                                "name": "隆尧县"
                            }, {
                                "code": 120907,
                                "name": "柏乡县"
                            }, {
                                "code": 120906,
                                "name": "内丘县"
                            }, {
                                "code": 120905,
                                "name": "临城县"
                            }, {
                                "code": 120904,
                                "name": "邢台县"
                            }, {
                                "code": 120903,
                                "name": "桥西区"
                            }, {
                                "code": 120902,
                                "name": "桥东区"
                            }]
                        }, {
                            "code": 1208,
                            "name": "承德市",
                            "sub": [{
                                "code": 120812,
                                "name": "围场县"
                            }, {
                                "code": 120811,
                                "name": "宽城县"
                            }, {
                                "code": 120810,
                                "name": "丰宁县"
                            }, {
                                "code": 120809,
                                "name": "隆化县"
                            }, {
                                "code": 120808,
                                "name": "滦平县"
                            }, {
                                "code": 120807,
                                "name": "平泉县"
                            }, {
                                "code": 120806,
                                "name": "兴隆县"
                            }, {
                                "code": 120805,
                                "name": "承德县"
                            }, {
                                "code": 120804,
                                "name": "鹰手营子"
                            }, {
                                "code": 120803,
                                "name": "双滦区"
                            }, {
                                "code": 120802,
                                "name": "双桥区"
                            }]
                        }, {
                            "code": 1207,
                            "name": "保定市",
                            "sub": [{
                                "code": 120727,
                                "name": "高新区"
                            }, {
                                "code": 120726,
                                "name": "高碑店市"
                            }, {
                                "code": 120725,
                                "name": "安国市"
                            }, {
                                "code": 120724,
                                "name": "定州市"
                            }, {
                                "code": 120723,
                                "name": "涿州市"
                            }, {
                                "code": 120722,
                                "name": "雄县"
                            }, {
                                "code": 120721,
                                "name": "博野县"
                            }, {
                                "code": 120720,
                                "name": "顺平县"
                            }, {
                                "code": 120719,
                                "name": "蠡县"
                            }, {
                                "code": 120718,
                                "name": "曲阳县"
                            }, {
                                "code": 120717,
                                "name": "易县"
                            }, {
                                "code": 120716,
                                "name": "安新县"
                            }, {
                                "code": 120715,
                                "name": "望都县"
                            }, {
                                "code": 120714,
                                "name": "涞源县"
                            }, {
                                "code": 120713,
                                "name": "容城县"
                            }, {
                                "code": 120712,
                                "name": "高阳县"
                            }, {
                                "code": 120711,
                                "name": "唐县"
                            }, {
                                "code": 120710,
                                "name": "定兴县"
                            }, {
                                "code": 120709,
                                "name": "徐水县"
                            }, {
                                "code": 120708,
                                "name": "阜平县"
                            }, {
                                "code": 120707,
                                "name": "涞水县"
                            }, {
                                "code": 120706,
                                "name": "清苑县"
                            }, {
                                "code": 120705,
                                "name": "满城县"
                            }, {
                                "code": 120703,
                                "name": "南市区"
                            }, {
                                "code": 120702,
                                "name": "北市区"
                            }, {
                                "code": 120701,
                                "name": "新市区"
                            }]
                        }, {
                            "code": 1206,
                            "name": "衡水市",
                            "sub": [{
                                "code": 120612,
                                "name": "深州市"
                            }, {
                                "code": 120611,
                                "name": "冀州市"
                            }, {
                                "code": 120610,
                                "name": "阜城县"
                            }, {
                                "code": 120609,
                                "name": "景县"
                            }, {
                                "code": 120608,
                                "name": "故城县"
                            }, {
                                "code": 120607,
                                "name": "安平县"
                            }, {
                                "code": 120606,
                                "name": "饶阳县"
                            }, {
                                "code": 120605,
                                "name": "武强县"
                            }, {
                                "code": 120604,
                                "name": "武邑县"
                            }, {
                                "code": 120603,
                                "name": "枣强县"
                            }, {
                                "code": 120602,
                                "name": "桃城区"
                            }]
                        }, {
                            "code": 1205,
                            "name": "廊坊市",
                            "sub": [{
                                "code": 120511,
                                "name": "三河市"
                            }, {
                                "code": 120510,
                                "name": "霸州市"
                            }, {
                                "code": 120509,
                                "name": "大厂县"
                            }, {
                                "code": 120508,
                                "name": "文安县"
                            }, {
                                "code": 120507,
                                "name": "大城县"
                            }, {
                                "code": 120506,
                                "name": "香河县"
                            }, {
                                "code": 120505,
                                "name": "永清县"
                            }, {
                                "code": 120504,
                                "name": "固安县"
                            }, {
                                "code": 120503,
                                "name": "广阳区"
                            }, {
                                "code": 120502,
                                "name": "安次区"
                            }]
                        }, {
                            "code": 1204,
                            "name": "张家口市",
                            "sub": [{
                                "code": 120418,
                                "name": "崇礼县"
                            }, {
                                "code": 120417,
                                "name": "赤城县"
                            }, {
                                "code": 120416,
                                "name": "涿鹿县"
                            }, {
                                "code": 120415,
                                "name": "怀来县"
                            }, {
                                "code": 120414,
                                "name": "万全县"
                            }, {
                                "code": 120413,
                                "name": "怀安县"
                            }, {
                                "code": 120412,
                                "name": "阳原县"
                            }, {
                                "code": 120411,
                                "name": "蔚县"
                            }, {
                                "code": 120410,
                                "name": "尚义县"
                            }, {
                                "code": 120409,
                                "name": "沽源县"
                            }, {
                                "code": 120408,
                                "name": "康保县"
                            }, {
                                "code": 120407,
                                "name": "张北县"
                            }, {
                                "code": 120406,
                                "name": "宣化县"
                            }, {
                                "code": 120405,
                                "name": "下花园区"
                            }, {
                                "code": 120404,
                                "name": "宣化区"
                            }, {
                                "code": 120403,
                                "name": "桥西区"
                            }, {
                                "code": 120402,
                                "name": "桥东区"
                            }]
                        }, {
                            "code": 1203,
                            "name": "唐山市",
                            "sub": [{
                                "code": 120315,
                                "name": "迁安市"
                            }, {
                                "code": 120314,
                                "name": "遵化市"
                            }, {
                                "code": 120313,
                                "name": "唐海县"
                            }, {
                                "code": 120312,
                                "name": "玉田县"
                            }, {
                                "code": 120311,
                                "name": "迁西县"
                            }, {
                                "code": 120310,
                                "name": "乐亭县"
                            }, {
                                "code": 120309,
                                "name": "滦南县"
                            }, {
                                "code": 120308,
                                "name": "滦县"
                            }, {
                                "code": 120307,
                                "name": "丰润区"
                            }, {
                                "code": 120306,
                                "name": "丰南区"
                            }, {
                                "code": 120305,
                                "name": "开平区"
                            }, {
                                "code": 120304,
                                "name": "古冶区"
                            }, {
                                "code": 120303,
                                "name": "路北区"
                            }, {
                                "code": 120302,
                                "name": "路南区"
                            }]
                        }, {
                            "code": 1202,
                            "name": "秦皇岛市",
                            "sub": [{
                                "code": 120208,
                                "name": "卢龙县"
                            }, {
                                "code": 120207,
                                "name": "抚宁县"
                            }, {
                                "code": 120206,
                                "name": "昌黎县"
                            }, {
                                "code": 120205,
                                "name": "青龙县"
                            }, {
                                "code": 120204,
                                "name": "北戴河区"
                            }, {
                                "code": 120203,
                                "name": "山海关区"
                            }, {
                                "code": 120202,
                                "name": "海港区"
                            }]
                        }, {
                            "code": 1201,
                            "name": "石家庄市",
                            "sub": [{
                                "code": 120125,
                                "name": "高新区"
                            }, {
                                "code": 120124,
                                "name": "鹿泉市"
                            }, {
                                "code": 120123,
                                "name": "新乐市"
                            }, {
                                "code": 120122,
                                "name": "晋州市"
                            }, {
                                "code": 120121,
                                "name": "藁城市"
                            }, {
                                "code": 120120,
                                "name": "辛集市"
                            }, {
                                "code": 120119,
                                "name": "赵县"
                            }, {
                                "code": 120118,
                                "name": "元氏县"
                            }, {
                                "code": 120117,
                                "name": "平山县"
                            }, {
                                "code": 120116,
                                "name": "无极县"
                            }, {
                                "code": 120115,
                                "name": "赞皇县"
                            }, {
                                "code": 120114,
                                "name": "深泽县"
                            }, {
                                "code": 120113,
                                "name": "高邑县"
                            }, {
                                "code": 120112,
                                "name": "灵寿县"
                            }, {
                                "code": 120111,
                                "name": "行唐县"
                            }, {
                                "code": 120110,
                                "name": "栾城县"
                            }, {
                                "code": 120109,
                                "name": "正定县"
                            }, {
                                "code": 120108,
                                "name": "井陉县"
                            }, {
                                "code": 120107,
                                "name": "裕华区"
                            }, {
                                "code": 120106,
                                "name": "井陉矿区"
                            }, {
                                "code": 120105,
                                "name": "新华区"
                            }, {
                                "code": 120104,
                                "name": "桥西区"
                            }, {
                                "code": 120103,
                                "name": "桥东区"
                            }, {
                                "code": 120102,
                                "name": "长安区"
                            }]
                        }]
                    }, {
                        "code": 13,
                        "name": "内蒙古",
                        "sub": [{
                            "code": 1314,
                            "name": "二连浩特"
                        }, {
                            "code": 1313,
                            "name": "满洲里"
                        }, {
                            "code": 1312,
                            "name": "阿拉善盟",
                            "sub": [{
                                "code": 131203,
                                "name": "额济纳旗"
                            }, {
                                "code": 131202,
                                "name": "阿拉善右旗"
                            }, {
                                "code": 131201,
                                "name": "阿拉善左旗"
                            }]
                        }, {
                            "code": 1311,
                            "name": "乌海市",
                            "sub": [{
                                "code": 131104,
                                "name": "乌达区"
                            }, {
                                "code": 131103,
                                "name": "海南区"
                            }, {
                                "code": 131102,
                                "name": "海勃湾区"
                            }]
                        }, {
                            "code": 1310,
                            "name": "巴彦淖尔市",
                            "sub": [{
                                "code": 131008,
                                "name": "杭锦后旗"
                            }, {
                                "code": 131007,
                                "name": "乌拉特后旗"
                            }, {
                                "code": 131006,
                                "name": "乌拉特中旗"
                            }, {
                                "code": 131005,
                                "name": "乌拉特前旗"
                            }, {
                                "code": 131004,
                                "name": "磴口县"
                            }, {
                                "code": 131003,
                                "name": "五原县"
                            }, {
                                "code": 131002,
                                "name": "临河区"
                            }]
                        }, {
                            "code": 1309,
                            "name": "鄂尔多斯市",
                            "sub": [{
                                "code": 130909,
                                "name": "伊金霍洛旗"
                            }, {
                                "code": 130908,
                                "name": "乌审旗"
                            }, {
                                "code": 130907,
                                "name": "杭锦旗"
                            }, {
                                "code": 130906,
                                "name": "鄂托克旗"
                            }, {
                                "code": 130905,
                                "name": "鄂托克前旗"
                            }, {
                                "code": 130904,
                                "name": "准格尔旗"
                            }, {
                                "code": 130903,
                                "name": "达拉特旗"
                            }, {
                                "code": 130902,
                                "name": "东胜区"
                            }]
                        }, {
                            "code": 1308,
                            "name": "乌兰察布市",
                            "sub": [{
                                "code": 130812,
                                "name": "丰镇市"
                            }, {
                                "code": 130811,
                                "name": "四子王旗"
                            }, {
                                "code": 130810,
                                "name": "察右后旗"
                            }, {
                                "code": 130809,
                                "name": "察右中旗"
                            }, {
                                "code": 130808,
                                "name": "察右前旗"
                            }, {
                                "code": 130807,
                                "name": "凉城县"
                            }, {
                                "code": 130806,
                                "name": "兴和县"
                            }, {
                                "code": 130805,
                                "name": "商都县"
                            }, {
                                "code": 130804,
                                "name": "化德县"
                            }, {
                                "code": 130803,
                                "name": "卓资县"
                            }, {
                                "code": 130802,
                                "name": "集宁区"
                            }]
                        }, {
                            "code": 1307,
                            "name": "锡林郭勒盟",
                            "sub": [{
                                "code": 130712,
                                "name": "多伦县"
                            }, {
                                "code": 130711,
                                "name": "正蓝旗"
                            }, {
                                "code": 130710,
                                "name": "正镶白旗"
                            }, {
                                "code": 130709,
                                "name": "镶黄旗"
                            }, {
                                "code": 130708,
                                "name": "太仆寺旗"
                            }, {
                                "code": 130707,
                                "name": "西乌珠穆沁旗"
                            }, {
                                "code": 130706,
                                "name": "东乌珠穆沁旗"
                            }, {
                                "code": 130705,
                                "name": "苏尼特右旗"
                            }, {
                                "code": 130704,
                                "name": "苏尼特左旗"
                            }, {
                                "code": 130703,
                                "name": "阿巴嘎旗"
                            }, {
                                "code": 130702,
                                "name": "锡林浩特市"
                            }]
                        }, {
                            "code": 1306,
                            "name": "赤峰市",
                            "sub": [{
                                "code": 130613,
                                "name": "敖汉旗"
                            }, {
                                "code": 130612,
                                "name": "宁城县"
                            }, {
                                "code": 130611,
                                "name": "喀喇沁旗"
                            }, {
                                "code": 130610,
                                "name": "翁牛特旗"
                            }, {
                                "code": 130609,
                                "name": "克什克腾旗"
                            }, {
                                "code": 130608,
                                "name": "林西县"
                            }, {
                                "code": 130607,
                                "name": "巴林右旗"
                            }, {
                                "code": 130606,
                                "name": "巴林左旗"
                            }, {
                                "code": 130605,
                                "name": "阿鲁科尔沁旗"
                            }, {
                                "code": 130604,
                                "name": "松山区"
                            }, {
                                "code": 130603,
                                "name": "元宝山区"
                            }, {
                                "code": 130602,
                                "name": "红山区"
                            }]
                        }, {
                            "code": 1305,
                            "name": "通辽市",
                            "sub": [{
                                "code": 130509,
                                "name": "霍林郭勒市"
                            }, {
                                "code": 130508,
                                "name": "扎鲁特旗"
                            }, {
                                "code": 130507,
                                "name": "奈曼旗"
                            }, {
                                "code": 130506,
                                "name": "库伦旗"
                            }, {
                                "code": 130505,
                                "name": "开鲁县"
                            }, {
                                "code": 130504,
                                "name": "科左后旗"
                            }, {
                                "code": 130503,
                                "name": "科左中旗"
                            }, {
                                "code": 130502,
                                "name": "科尔沁区"
                            }]
                        }, {
                            "code": 1304,
                            "name": "兴安盟",
                            "sub": [{
                                "code": 130406,
                                "name": "突泉县"
                            }, {
                                "code": 130405,
                                "name": "扎赉特旗"
                            }, {
                                "code": 130404,
                                "name": "科右中旗"
                            }, {
                                "code": 130403,
                                "name": "科右前旗"
                            }, {
                                "code": 130402,
                                "name": "阿尔山市"
                            }, {
                                "code": 130401,
                                "name": "乌兰浩特市"
                            }]
                        }, {
                            "code": 1303,
                            "name": "呼伦贝尔市",
                            "sub": [{
                                "code": 130314,
                                "name": "根河市"
                            }, {
                                "code": 130313,
                                "name": "额尔古纳市"
                            }, {
                                "code": 130312,
                                "name": "扎兰屯市"
                            }, {
                                "code": 130311,
                                "name": "牙克石市"
                            }, {
                                "code": 130309,
                                "name": "新巴尔虎右旗"
                            }, {
                                "code": 130308,
                                "name": "新巴尔虎左旗"
                            }, {
                                "code": 130307,
                                "name": "陈巴尔虎旗"
                            }, {
                                "code": 130306,
                                "name": "鄂温克旗"
                            }, {
                                "code": 130305,
                                "name": "鄂伦春自治旗"
                            }, {
                                "code": 130304,
                                "name": "莫旗"
                            }, {
                                "code": 130303,
                                "name": "阿荣旗"
                            }, {
                                "code": 130302,
                                "name": "海拉尔区"
                            }]
                        }, {
                            "code": 1302,
                            "name": "包头市",
                            "sub": [{
                                "code": 130211,
                                "name": "高新区"
                            }, {
                                "code": 130210,
                                "name": "达茂联合旗"
                            }, {
                                "code": 130209,
                                "name": "固阳县"
                            }, {
                                "code": 130208,
                                "name": "土默特右旗"
                            }, {
                                "code": 130207,
                                "name": "九原区"
                            }, {
                                "code": 130206,
                                "name": "白云鄂博"
                            }, {
                                "code": 130205,
                                "name": "石拐区"
                            }, {
                                "code": 130204,
                                "name": "青山区"
                            }, {
                                "code": 130203,
                                "name": "昆都仑区"
                            }, {
                                "code": 130202,
                                "name": "东河区"
                            }]
                        }, {
                            "code": 1301,
                            "name": "呼和浩特市",
                            "sub": [{
                                "code": 130110,
                                "name": "武川县"
                            }, {
                                "code": 130109,
                                "name": "清水河县"
                            }, {
                                "code": 130108,
                                "name": "和林格尔县"
                            }, {
                                "code": 130107,
                                "name": "托克托县"
                            }, {
                                "code": 130106,
                                "name": "土默特左旗"
                            }, {
                                "code": 130105,
                                "name": "赛罕区"
                            }, {
                                "code": 130104,
                                "name": "玉泉区"
                            }, {
                                "code": 130103,
                                "name": "回民区"
                            }, {
                                "code": 130102,
                                "name": "新城区"
                            }]
                        }]
                    }, {
                        "code": 14,
                        "name": "山西省",
                        "sub": [{
                            "code": 1411,
                            "name": "运城市",
                            "sub": [{
                                "code": 141114,
                                "name": "河津市"
                            }, {
                                "code": 141113,
                                "name": "永济市"
                            }, {
                                "code": 141112,
                                "name": "芮城县"
                            }, {
                                "code": 141111,
                                "name": "平陆县"
                            }, {
                                "code": 141110,
                                "name": "夏县"
                            }, {
                                "code": 141109,
                                "name": "垣曲县"
                            }, {
                                "code": 141108,
                                "name": "绛县"
                            }, {
                                "code": 141107,
                                "name": "新绛县"
                            }, {
                                "code": 141106,
                                "name": "稷山县"
                            }, {
                                "code": 141105,
                                "name": "闻喜县"
                            }, {
                                "code": 141104,
                                "name": "万荣县"
                            }, {
                                "code": 141103,
                                "name": "临猗县"
                            }, {
                                "code": 141102,
                                "name": "盐湖区"
                            }]
                        }, {
                            "code": 1410,
                            "name": "吕梁市",
                            "sub": [{
                                "code": 141014,
                                "name": "汾阳市"
                            }, {
                                "code": 141013,
                                "name": "孝义市"
                            }, {
                                "code": 141012,
                                "name": "交口县"
                            }, {
                                "code": 141011,
                                "name": "中阳县"
                            }, {
                                "code": 141010,
                                "name": "方山县"
                            }, {
                                "code": 141009,
                                "name": "岚县"
                            }, {
                                "code": 141008,
                                "name": "石楼县"
                            }, {
                                "code": 141007,
                                "name": "柳林县"
                            }, {
                                "code": 141006,
                                "name": "临县"
                            }, {
                                "code": 141005,
                                "name": "兴县"
                            }, {
                                "code": 141004,
                                "name": "交城县"
                            }, {
                                "code": 141003,
                                "name": "文水县"
                            }, {
                                "code": 141002,
                                "name": "离石区"
                            }]
                        }, {
                            "code": 1409,
                            "name": "临汾市",
                            "sub": [{
                                "code": 140918,
                                "name": "霍州市"
                            }, {
                                "code": 140917,
                                "name": "侯马市"
                            }, {
                                "code": 140916,
                                "name": "汾西县"
                            }, {
                                "code": 140915,
                                "name": "蒲县"
                            }, {
                                "code": 140914,
                                "name": "永和县"
                            }, {
                                "code": 140913,
                                "name": "隰县"
                            }, {
                                "code": 140912,
                                "name": "大宁县"
                            }, {
                                "code": 140911,
                                "name": "乡宁县"
                            }, {
                                "code": 140910,
                                "name": "吉县"
                            }, {
                                "code": 140909,
                                "name": "浮山县"
                            }, {
                                "code": 140908,
                                "name": "安泽县"
                            }, {
                                "code": 140907,
                                "name": "古县"
                            }, {
                                "code": 140906,
                                "name": "洪洞县"
                            }, {
                                "code": 140905,
                                "name": "襄汾县"
                            }, {
                                "code": 140904,
                                "name": "翼城县"
                            }, {
                                "code": 140903,
                                "name": "曲沃县"
                            }, {
                                "code": 140902,
                                "name": "尧都区"
                            }]
                        }, {
                            "code": 1408,
                            "name": "晋中市",
                            "sub": [{
                                "code": 140812,
                                "name": "介休市"
                            }, {
                                "code": 140811,
                                "name": "灵石县"
                            }, {
                                "code": 140810,
                                "name": "平遥县"
                            }, {
                                "code": 140809,
                                "name": "祁县"
                            }, {
                                "code": 140808,
                                "name": "太谷县"
                            }, {
                                "code": 140807,
                                "name": "寿阳县"
                            }, {
                                "code": 140806,
                                "name": "昔阳县"
                            }, {
                                "code": 140805,
                                "name": "和顺县"
                            }, {
                                "code": 140804,
                                "name": "左权县"
                            }, {
                                "code": 140803,
                                "name": "榆社县"
                            }, {
                                "code": 140802,
                                "name": "榆次区"
                            }]
                        }, {
                            "code": 1407,
                            "name": "忻州市",
                            "sub": [{
                                "code": 140715,
                                "name": "原平市"
                            }, {
                                "code": 140714,
                                "name": "偏关县"
                            }, {
                                "code": 140713,
                                "name": "保德县"
                            }, {
                                "code": 140712,
                                "name": "河曲县"
                            }, {
                                "code": 140711,
                                "name": "岢岚县"
                            }, {
                                "code": 140710,
                                "name": "五寨县"
                            }, {
                                "code": 140709,
                                "name": "神池县"
                            }, {
                                "code": 140708,
                                "name": "静乐县"
                            }, {
                                "code": 140707,
                                "name": "宁武县"
                            }, {
                                "code": 140706,
                                "name": "繁峙县"
                            }, {
                                "code": 140705,
                                "name": "代县"
                            }, {
                                "code": 140704,
                                "name": "五台县"
                            }, {
                                "code": 140703,
                                "name": "定襄县"
                            }, {
                                "code": 140702,
                                "name": "忻府区"
                            }]
                        }, {
                            "code": 1406,
                            "name": "朔州市",
                            "sub": [{
                                "code": 140607,
                                "name": "怀仁县"
                            }, {
                                "code": 140606,
                                "name": "右玉县"
                            }, {
                                "code": 140605,
                                "name": "应县"
                            }, {
                                "code": 140604,
                                "name": "山阴县"
                            }, {
                                "code": 140603,
                                "name": "平鲁区"
                            }, {
                                "code": 140602,
                                "name": "朔城区"
                            }]
                        }, {
                            "code": 1405,
                            "name": "晋城市",
                            "sub": [{
                                "code": 140507,
                                "name": "高平市"
                            }, {
                                "code": 140506,
                                "name": "泽州县"
                            }, {
                                "code": 140505,
                                "name": "陵川县"
                            }, {
                                "code": 140504,
                                "name": "阳城县"
                            }, {
                                "code": 140503,
                                "name": "沁水县"
                            }, {
                                "code": 140502,
                                "name": "城区"
                            }]
                        }, {
                            "code": 1404,
                            "name": "长治市",
                            "sub": [{
                                "code": 140414,
                                "name": "潞城市"
                            }, {
                                "code": 140413,
                                "name": "沁源县"
                            }, {
                                "code": 140412,
                                "name": "沁县"
                            }, {
                                "code": 140411,
                                "name": "武乡县"
                            }, {
                                "code": 140410,
                                "name": "长子县"
                            }, {
                                "code": 140409,
                                "name": "壶关县"
                            }, {
                                "code": 140408,
                                "name": "黎城县"
                            }, {
                                "code": 140407,
                                "name": "平顺县"
                            }, {
                                "code": 140406,
                                "name": "屯留县"
                            }, {
                                "code": 140405,
                                "name": "襄垣县"
                            }, {
                                "code": 140404,
                                "name": "长治县"
                            }, {
                                "code": 140403,
                                "name": "郊区"
                            }, {
                                "code": 140402,
                                "name": "城区"
                            }]
                        }, {
                            "code": 1403,
                            "name": "阳泉市",
                            "sub": [{
                                "code": 140306,
                                "name": "盂县"
                            }, {
                                "code": 140305,
                                "name": "平定县"
                            }, {
                                "code": 140304,
                                "name": "郊区"
                            }, {
                                "code": 140303,
                                "name": "矿区"
                            }, {
                                "code": 140302,
                                "name": "城区"
                            }]
                        }, {
                            "code": 1402,
                            "name": "大同市",
                            "sub": [{
                                "code": 140212,
                                "name": "大同县"
                            }, {
                                "code": 140211,
                                "name": "左云县"
                            }, {
                                "code": 140210,
                                "name": "浑源县"
                            }, {
                                "code": 140209,
                                "name": "灵丘县"
                            }, {
                                "code": 140208,
                                "name": "广灵县"
                            }, {
                                "code": 140207,
                                "name": "天镇县"
                            }, {
                                "code": 140206,
                                "name": "阳高县"
                            }, {
                                "code": 140205,
                                "name": "新荣区"
                            }, {
                                "code": 140204,
                                "name": "南郊区"
                            }, {
                                "code": 140203,
                                "name": "矿区"
                            }, {
                                "code": 140202,
                                "name": "城区"
                            }]
                        }, {
                            "code": 1401,
                            "name": "太原市",
                            "sub": [{
                                "code": 140111,
                                "name": "古交市"
                            }, {
                                "code": 140110,
                                "name": "娄烦县"
                            }, {
                                "code": 140109,
                                "name": "阳曲县"
                            }, {
                                "code": 140108,
                                "name": "清徐县"
                            }, {
                                "code": 140107,
                                "name": "晋源区"
                            }, {
                                "code": 140106,
                                "name": "万柏林区"
                            }, {
                                "code": 140105,
                                "name": "尖草坪区"
                            }, {
                                "code": 140104,
                                "name": "杏花岭区"
                            }, {
                                "code": 140103,
                                "name": "迎泽区"
                            }, {
                                "code": 140102,
                                "name": "小店区"
                            }]
                        }]
                    }, {
                        "code": 20,
                        "name": "辽宁省",
                        "sub": [{
                            "code": 2014,
                            "name": "葫芦岛市",
                            "sub": [{
                                "code": 201407,
                                "name": "兴城市"
                            }, {
                                "code": 201406,
                                "name": "建昌县"
                            }, {
                                "code": 201405,
                                "name": "绥中县"
                            }, {
                                "code": 201404,
                                "name": "南票区"
                            }, {
                                "code": 201403,
                                "name": "龙港区"
                            }, {
                                "code": 201402,
                                "name": "连山区"
                            }]
                        }, {
                            "code": 2013,
                            "name": "朝阳市",
                            "sub": [{
                                "code": 201308,
                                "name": "凌源市"
                            }, {
                                "code": 201307,
                                "name": "北票市"
                            }, {
                                "code": 201306,
                                "name": "喀左县"
                            }, {
                                "code": 201305,
                                "name": "建平县"
                            }, {
                                "code": 201304,
                                "name": "朝阳县"
                            }, {
                                "code": 201303,
                                "name": "龙城区"
                            }, {
                                "code": 201302,
                                "name": "双塔区"
                            }]
                        }, {
                            "code": 2012,
                            "name": "本溪市",
                            "sub": [{
                                "code": 201207,
                                "name": "桓仁县"
                            }, {
                                "code": 201206,
                                "name": "本溪县"
                            }, {
                                "code": 201205,
                                "name": "南芬区"
                            }, {
                                "code": 201204,
                                "name": "明山区"
                            }, {
                                "code": 201203,
                                "name": "溪湖区"
                            }, {
                                "code": 201202,
                                "name": "平山区"
                            }]
                        }, {
                            "code": 2011,
                            "name": "阜新市",
                            "sub": [{
                                "code": 201108,
                                "name": "彰武县"
                            }, {
                                "code": 201107,
                                "name": "阜新县"
                            }, {
                                "code": 201106,
                                "name": "细河区"
                            }, {
                                "code": 201105,
                                "name": "清河门区"
                            }, {
                                "code": 201104,
                                "name": "太平区"
                            }, {
                                "code": 201103,
                                "name": "新邱区"
                            }, {
                                "code": 201102,
                                "name": "海州区"
                            }]
                        }, {
                            "code": 2010,
                            "name": "辽阳市",
                            "sub": [{
                                "code": 201009,
                                "name": "高新区"
                            }, {
                                "code": 201008,
                                "name": "灯塔市"
                            }, {
                                "code": 201007,
                                "name": "辽阳县"
                            }, {
                                "code": 201006,
                                "name": "太子河区"
                            }, {
                                "code": 201005,
                                "name": "弓长岭区"
                            }, {
                                "code": 201004,
                                "name": "宏伟区"
                            }, {
                                "code": 201003,
                                "name": "文圣区"
                            }, {
                                "code": 201002,
                                "name": "白塔区"
                            }]
                        }, {
                            "code": 2009,
                            "name": "营口市",
                            "sub": [{
                                "code": 200907,
                                "name": "大石桥市"
                            }, {
                                "code": 200906,
                                "name": "盖州市"
                            }, {
                                "code": 200905,
                                "name": "老边区"
                            }, {
                                "code": 200904,
                                "name": "鲅鱼圈区"
                            }, {
                                "code": 200902,
                                "name": "站前区"
                            }]
                        }, {
                            "code": 2008,
                            "name": "抚顺市",
                            "sub": [{
                                "code": 200808,
                                "name": "清原县"
                            }, {
                                "code": 200807,
                                "name": "新宾县"
                            }, {
                                "code": 200806,
                                "name": "抚顺县"
                            }, {
                                "code": 200805,
                                "name": "顺城区"
                            }, {
                                "code": 200804,
                                "name": "望花区"
                            }, {
                                "code": 200803,
                                "name": "东洲区"
                            }, {
                                "code": 200802,
                                "name": "新抚区"
                            }]
                        }, {
                            "code": 2007,
                            "name": "铁岭市",
                            "sub": [{
                                "code": 200708,
                                "name": "开原市"
                            }, {
                                "code": 200707,
                                "name": "调兵山市"
                            }, {
                                "code": 200706,
                                "name": "昌图县"
                            }, {
                                "code": 200705,
                                "name": "西丰县"
                            }, {
                                "code": 200704,
                                "name": "铁岭县"
                            }, {
                                "code": 200703,
                                "name": "清河区"
                            }, {
                                "code": 200702,
                                "name": "银州区"
                            }]
                        }, {
                            "code": 2006,
                            "name": "盘锦市",
                            "sub": [{
                                "code": 200605,
                                "name": "盘山县"
                            }, {
                                "code": 200604,
                                "name": "大洼县"
                            }, {
                                "code": 200603,
                                "name": "兴隆台区"
                            }, {
                                "code": 200602,
                                "name": "双台子区"
                            }]
                        }, {
                            "code": 2005,
                            "name": "丹东市",
                            "sub": [{
                                "code": 200507,
                                "name": "凤城市"
                            }, {
                                "code": 200506,
                                "name": "东港市"
                            }, {
                                "code": 200505,
                                "name": "宽甸县"
                            }, {
                                "code": 200504,
                                "name": "振安区"
                            }, {
                                "code": 200503,
                                "name": "振兴区"
                            }, {
                                "code": 200502,
                                "name": "元宝区"
                            }]
                        }, {
                            "code": 2004,
                            "name": "锦州市",
                            "sub": [{
                                "code": 200408,
                                "name": "北镇市"
                            }, {
                                "code": 200407,
                                "name": "凌海市"
                            }, {
                                "code": 200406,
                                "name": "义县"
                            }, {
                                "code": 200405,
                                "name": "黑山县"
                            }, {
                                "code": 200404,
                                "name": "太和区"
                            }, {
                                "code": 200403,
                                "name": "凌河区"
                            }, {
                                "code": 200402,
                                "name": "古塔区"
                            }]
                        }, {
                            "code": 2003,
                            "name": "鞍山市",
                            "sub": [{
                                "code": 200309,
                                "name": "高新区"
                            }, {
                                "code": 200308,
                                "name": "海城市"
                            }, {
                                "code": 200307,
                                "name": "岫岩县"
                            }, {
                                "code": 200306,
                                "name": "台安县"
                            }, {
                                "code": 200305,
                                "name": "千山区"
                            }, {
                                "code": 200304,
                                "name": "立山区"
                            }, {
                                "code": 200303,
                                "name": "铁西区"
                            }, {
                                "code": 200302,
                                "name": "铁东区"
                            }]
                        }, {
                            "code": 2002,
                            "name": "大连市",
                            "sub": [{
                                "code": 200211,
                                "name": "庄河市"
                            }, {
                                "code": 200210,
                                "name": "普兰店市"
                            }, {
                                "code": 200209,
                                "name": "瓦房店市"
                            }, {
                                "code": 200208,
                                "name": "长海县"
                            }, {
                                "code": 200207,
                                "name": "金州区"
                            }, {
                                "code": 200206,
                                "name": "旅顺口区"
                            }, {
                                "code": 200205,
                                "name": "甘井子区"
                            }, {
                                "code": 200204,
                                "name": "沙河口区"
                            }, {
                                "code": 200203,
                                "name": "西岗区"
                            }, {
                                "code": 200202,
                                "name": "中山区"
                            }]
                        }, {
                            "code": 2001,
                            "name": "沈阳市",
                            "sub": [{
                                "code": 200115,
                                "name": "浑南新区"
                            }, {
                                "code": 200114,
                                "name": "新民市"
                            }, {
                                "code": 200113,
                                "name": "法库县"
                            }, {
                                "code": 200112,
                                "name": "康平县"
                            }, {
                                "code": 200111,
                                "name": "辽中县"
                            }, {
                                "code": 200110,
                                "name": "于洪区"
                            }, {
                                "code": 200109,
                                "name": "沈北新区"
                            }, {
                                "code": 200108,
                                "name": "东陵区"
                            }, {
                                "code": 200107,
                                "name": "苏家屯区"
                            }, {
                                "code": 200106,
                                "name": "铁西区"
                            }, {
                                "code": 200105,
                                "name": "皇姑区"
                            }, {
                                "code": 200104,
                                "name": "大东区"
                            }, {
                                "code": 200103,
                                "name": "沈河区"
                            }, {
                                "code": 200102,
                                "name": "和平区"
                            }]
                        }]
                    }, {
                        "code": 21,
                        "name": "吉林省",
                        "sub": [{
                            "code": 2109,
                            "name": "延边州",
                            "sub": [{
                                "code": 210909,
                                "name": "高新区"
                            }, {
                                "code": 210908,
                                "name": "安图县"
                            }, {
                                "code": 210907,
                                "name": "汪清县"
                            }, {
                                "code": 210906,
                                "name": "和龙市"
                            }, {
                                "code": 210905,
                                "name": "龙井市"
                            }, {
                                "code": 210904,
                                "name": "珲春市"
                            }, {
                                "code": 210903,
                                "name": "敦化市"
                            }, {
                                "code": 210902,
                                "name": "图们市"
                            }, {
                                "code": 210901,
                                "name": "延吉市"
                            }]
                        }, {
                            "code": 2108,
                            "name": "白城市",
                            "sub": [{
                                "code": 210806,
                                "name": "大安市"
                            }, {
                                "code": 210805,
                                "name": "洮南市"
                            }, {
                                "code": 210804,
                                "name": "通榆县"
                            }, {
                                "code": 210803,
                                "name": "镇赉县"
                            }, {
                                "code": 210802,
                                "name": "洮北区"
                            }]
                        }, {
                            "code": 2107,
                            "name": "松原市",
                            "sub": [{
                                "code": 210706,
                                "name": "扶余县"
                            }, {
                                "code": 210705,
                                "name": "乾安县"
                            }, {
                                "code": 210704,
                                "name": "长岭县"
                            }, {
                                "code": 210703,
                                "name": "前郭县"
                            }, {
                                "code": 210702,
                                "name": "宁江区"
                            }]
                        }, {
                            "code": 2106,
                            "name": "白山市",
                            "sub": [{
                                "code": 210607,
                                "name": "临江市"
                            }, {
                                "code": 210606,
                                "name": "长白县"
                            }, {
                                "code": 210605,
                                "name": "靖宇县"
                            }, {
                                "code": 210604,
                                "name": "抚松县"
                            }, {
                                "code": 210603,
                                "name": "江源区"
                            }, {
                                "code": 210602,
                                "name": "八道江区"
                            }]
                        }, {
                            "code": 2105,
                            "name": "通化市",
                            "sub": [{
                                "code": 210508,
                                "name": "集安市"
                            }, {
                                "code": 210507,
                                "name": "梅河口市"
                            }, {
                                "code": 210506,
                                "name": "柳河县"
                            }, {
                                "code": 210505,
                                "name": "辉南县"
                            }, {
                                "code": 210504,
                                "name": "通化县"
                            }, {
                                "code": 210503,
                                "name": "二道江区"
                            }, {
                                "code": 210502,
                                "name": "东昌区"
                            }]
                        }, {
                            "code": 2104,
                            "name": "辽源市",
                            "sub": [{
                                "code": 210405,
                                "name": "东辽县"
                            }, {
                                "code": 210404,
                                "name": "东丰县"
                            }, {
                                "code": 210403,
                                "name": "西安区"
                            }, {
                                "code": 210402,
                                "name": "龙山区"
                            }]
                        }, {
                            "code": 2103,
                            "name": "四平市",
                            "sub": [{
                                "code": 210307,
                                "name": "双辽市"
                            }, {
                                "code": 210306,
                                "name": "公主岭市"
                            }, {
                                "code": 210305,
                                "name": "伊通县"
                            }, {
                                "code": 210304,
                                "name": "梨树县"
                            }, {
                                "code": 210303,
                                "name": "铁东区"
                            }, {
                                "code": 210302,
                                "name": "铁西区"
                            }]
                        }, {
                            "code": 2102,
                            "name": "吉林市",
                            "sub": [{
                                "code": 210210,
                                "name": "磐石市"
                            }, {
                                "code": 210209,
                                "name": "舒兰市"
                            }, {
                                "code": 210208,
                                "name": "桦甸市"
                            }, {
                                "code": 210207,
                                "name": "蛟河市"
                            }, {
                                "code": 210206,
                                "name": "永吉县"
                            }, {
                                "code": 210205,
                                "name": "丰满区"
                            }, {
                                "code": 210204,
                                "name": "船营区"
                            }, {
                                "code": 210203,
                                "name": "龙潭区"
                            }, {
                                "code": 210202,
                                "name": "昌邑区"
                            }]
                        }, {
                            "code": 2101,
                            "name": "长春市",
                            "sub": [{
                                "code": 210111,
                                "name": "德惠市"
                            }, {
                                "code": 210110,
                                "name": "榆树市"
                            }, {
                                "code": 210109,
                                "name": "九台市"
                            }, {
                                "code": 210108,
                                "name": "农安县"
                            }, {
                                "code": 210107,
                                "name": "双阳区"
                            }, {
                                "code": 210106,
                                "name": "绿园区"
                            }, {
                                "code": 210105,
                                "name": "二道区"
                            }, {
                                "code": 210104,
                                "name": "朝阳区"
                            }, {
                                "code": 210103,
                                "name": "宽城区"
                            }, {
                                "code": 210102,
                                "name": "南关区"
                            }]
                        }]
                    }, {
                        "code": 22,
                        "name": "黑龙江省",
                        "sub": [{
                            "code": 2213,
                            "name": "大兴安岭地区",
                            "sub": [{
                                "code": 221307,
                                "name": "漠河县"
                            }, {
                                "code": 221306,
                                "name": "塔河县"
                            }, {
                                "code": 221305,
                                "name": "呼玛县"
                            }, {
                                "code": 221304,
                                "name": "呼中区"
                            }, {
                                "code": 221303,
                                "name": "新林区"
                            }, {
                                "code": 221302,
                                "name": "松岭区"
                            }, {
                                "code": 221301,
                                "name": "加格达奇区"
                            }]
                        }, {
                            "code": 2212,
                            "name": "绥化市",
                            "sub": [{
                                "code": 221211,
                                "name": "海伦市"
                            }, {
                                "code": 221210,
                                "name": "肇东市"
                            }, {
                                "code": 221209,
                                "name": "安达市"
                            }, {
                                "code": 221208,
                                "name": "绥棱县"
                            }, {
                                "code": 221207,
                                "name": "明水县"
                            }, {
                                "code": 221206,
                                "name": "庆安县"
                            }, {
                                "code": 221205,
                                "name": "青冈县"
                            }, {
                                "code": 221204,
                                "name": "兰西县"
                            }, {
                                "code": 221203,
                                "name": "望奎县"
                            }, {
                                "code": 221202,
                                "name": "北林区"
                            }]
                        }, {
                            "code": 2211,
                            "name": "黑河市",
                            "sub": [{
                                "code": 221107,
                                "name": "五大连池市"
                            }, {
                                "code": 221106,
                                "name": "北安市"
                            }, {
                                "code": 221105,
                                "name": "孙吴县"
                            }, {
                                "code": 221104,
                                "name": "逊克县"
                            }, {
                                "code": 221103,
                                "name": "嫩江县"
                            }, {
                                "code": 221102,
                                "name": "爱辉区"
                            }]
                        }, {
                            "code": 2210,
                            "name": "牡丹江市",
                            "sub": [{
                                "code": 221011,
                                "name": "穆棱市"
                            }, {
                                "code": 221010,
                                "name": "宁安市"
                            }, {
                                "code": 221009,
                                "name": "海林市"
                            }, {
                                "code": 221008,
                                "name": "绥芬河市"
                            }, {
                                "code": 221007,
                                "name": "林口县"
                            }, {
                                "code": 221006,
                                "name": "东宁县"
                            }, {
                                "code": 221005,
                                "name": "西安区"
                            }, {
                                "code": 221004,
                                "name": "爱民区"
                            }, {
                                "code": 221003,
                                "name": "阳明区"
                            }, {
                                "code": 221002,
                                "name": "东安区"
                            }]
                        }, {
                            "code": 2209,
                            "name": "七台河市",
                            "sub": [{
                                "code": 220905,
                                "name": "勃利县"
                            }, {
                                "code": 220904,
                                "name": "茄子河区"
                            }, {
                                "code": 220903,
                                "name": "桃山区"
                            }, {
                                "code": 220902,
                                "name": "新兴区"
                            }]
                        }, {
                            "code": 2208,
                            "name": "佳木斯市",
                            "sub": [{
                                "code": 220811,
                                "name": "富锦市"
                            }, {
                                "code": 220810,
                                "name": "同江市"
                            }, {
                                "code": 220809,
                                "name": "抚远县"
                            }, {
                                "code": 220808,
                                "name": "汤原县"
                            }, {
                                "code": 220807,
                                "name": "桦川县"
                            }, {
                                "code": 220806,
                                "name": "桦南县"
                            }, {
                                "code": 220805,
                                "name": "郊区"
                            }, {
                                "code": 220804,
                                "name": "东风区"
                            }, {
                                "code": 220803,
                                "name": "前进区"
                            }, {
                                "code": 220802,
                                "name": "向阳区"
                            }]
                        }, {
                            "code": 2207,
                            "name": "伊春市",
                            "sub": [{
                                "code": 220718,
                                "name": "铁力市"
                            }, {
                                "code": 220717,
                                "name": "嘉荫县"
                            }, {
                                "code": 220716,
                                "name": "上甘岭区"
                            }, {
                                "code": 220715,
                                "name": "红星区"
                            }, {
                                "code": 220714,
                                "name": "乌伊岭区"
                            }, {
                                "code": 220713,
                                "name": "带岭区"
                            }, {
                                "code": 220712,
                                "name": "汤旺河区"
                            }, {
                                "code": 220711,
                                "name": "乌马河区"
                            }, {
                                "code": 220710,
                                "name": "五营区"
                            }, {
                                "code": 220709,
                                "name": "金山屯区"
                            }, {
                                "code": 220708,
                                "name": "美溪区"
                            }, {
                                "code": 220707,
                                "name": "新青区"
                            }, {
                                "code": 220706,
                                "name": "翠峦区"
                            }, {
                                "code": 220705,
                                "name": "西林区"
                            }, {
                                "code": 220704,
                                "name": "友好区"
                            }, {
                                "code": 220703,
                                "name": "南岔区"
                            }, {
                                "code": 220702,
                                "name": "伊春区"
                            }]
                        }, {
                            "code": 2206,
                            "name": "大庆市",
                            "sub": [{
                                "code": 220611,
                                "name": "高新区"
                            }, {
                                "code": 220610,
                                "name": "杜尔伯特县"
                            }, {
                                "code": 220609,
                                "name": "林甸县"
                            }, {
                                "code": 220608,
                                "name": "肇源县"
                            }, {
                                "code": 220607,
                                "name": "肇州县"
                            }, {
                                "code": 220606,
                                "name": "大同区"
                            }, {
                                "code": 220605,
                                "name": "红岗区"
                            }, {
                                "code": 220604,
                                "name": "让胡路区"
                            }, {
                                "code": 220603,
                                "name": "龙凤区"
                            }, {
                                "code": 220602,
                                "name": "萨尔图区"
                            }]
                        }, {
                            "code": 2205,
                            "name": "双鸭山市",
                            "sub": [{
                                "code": 220509,
                                "name": "饶河县"
                            }, {
                                "code": 220508,
                                "name": "宝清县"
                            }, {
                                "code": 220507,
                                "name": "友谊县"
                            }, {
                                "code": 220506,
                                "name": "集贤县"
                            }, {
                                "code": 220505,
                                "name": "宝山区"
                            }, {
                                "code": 220504,
                                "name": "四方台区"
                            }, {
                                "code": 220503,
                                "name": "岭东区"
                            }, {
                                "code": 220502,
                                "name": "尖山区"
                            }]
                        }, {
                            "code": 2204,
                            "name": "鹤岗市",
                            "sub": [{
                                "code": 220409,
                                "name": "绥滨县"
                            }, {
                                "code": 220408,
                                "name": "萝北县"
                            }, {
                                "code": 220407,
                                "name": "兴山区"
                            }, {
                                "code": 220406,
                                "name": "东山区"
                            }, {
                                "code": 220405,
                                "name": "兴安区"
                            }, {
                                "code": 220404,
                                "name": "南山区"
                            }, {
                                "code": 220403,
                                "name": "工农区"
                            }, {
                                "code": 220402,
                                "name": "向阳区"
                            }]
                        }, {
                            "code": 2203,
                            "name": "鸡西市",
                            "sub": [{
                                "code": 220310,
                                "name": "密山市"
                            }, {
                                "code": 220309,
                                "name": "虎林市"
                            }, {
                                "code": 220308,
                                "name": "鸡东县"
                            }, {
                                "code": 220307,
                                "name": "麻山区"
                            }, {
                                "code": 220306,
                                "name": "城子河区"
                            }, {
                                "code": 220305,
                                "name": "梨树区"
                            }, {
                                "code": 220304,
                                "name": "滴道区"
                            }, {
                                "code": 220303,
                                "name": "恒山区"
                            }, {
                                "code": 220302,
                                "name": "鸡冠区"
                            }]
                        }, {
                            "code": 2202,
                            "name": "齐齐哈尔市",
                            "sub": [{
                                "code": 220218,
                                "name": "高新区"
                            }, {
                                "code": 220217,
                                "name": "讷河市"
                            }, {
                                "code": 220216,
                                "name": "拜泉县"
                            }, {
                                "code": 220215,
                                "name": "克东县"
                            }, {
                                "code": 220214,
                                "name": "克山县"
                            }, {
                                "code": 220213,
                                "name": "富裕县"
                            }, {
                                "code": 220212,
                                "name": "甘南县"
                            }, {
                                "code": 220211,
                                "name": "泰来县"
                            }, {
                                "code": 220210,
                                "name": "依安县"
                            }, {
                                "code": 220209,
                                "name": "龙江县"
                            }, {
                                "code": 220208,
                                "name": "梅里斯区"
                            }, {
                                "code": 220207,
                                "name": "碾子山区"
                            }, {
                                "code": 220206,
                                "name": "富拉尔基区"
                            }, {
                                "code": 220205,
                                "name": "昂昂溪区"
                            }, {
                                "code": 220204,
                                "name": "铁锋区"
                            }, {
                                "code": 220203,
                                "name": "建华区"
                            }, {
                                "code": 220202,
                                "name": "龙沙区"
                            }]
                        }, {
                            "code": 2201,
                            "name": "哈尔滨市",
                            "sub": [{
                                "code": 220119,
                                "name": "五常市"
                            }, {
                                "code": 220118,
                                "name": "尚志市"
                            }, {
                                "code": 220117,
                                "name": "双城市"
                            }, {
                                "code": 220116,
                                "name": "延寿县"
                            }, {
                                "code": 220115,
                                "name": "通河县"
                            }, {
                                "code": 220114,
                                "name": "木兰县"
                            }, {
                                "code": 220113,
                                "name": "巴彦县"
                            }, {
                                "code": 220112,
                                "name": "宾县"
                            }, {
                                "code": 220111,
                                "name": "方正县"
                            }, {
                                "code": 220110,
                                "name": "依兰县"
                            }, {
                                "code": 220109,
                                "name": "阿城区"
                            }, {
                                "code": 220108,
                                "name": "呼兰区"
                            }, {
                                "code": 220107,
                                "name": "香坊区"
                            }, {
                                "code": 220106,
                                "name": "松北区"
                            }, {
                                "code": 220105,
                                "name": "平房区"
                            }, {
                                "code": 220104,
                                "name": "道外区"
                            }, {
                                "code": 220103,
                                "name": "南岗区"
                            }, {
                                "code": 220102,
                                "name": "道里区"
                            }]
                        }]
                    }, {
                        "code": 30,
                        "name": "上海市",
                        "sub": [{
                            "code": 3001,
                            "name": "上海市",
                            "sub": [{
                                "code": 300119,
                                "name": "嘉定区"
                            }, {
                                "code": 300118,
                                "name": "徐汇区"
                            }, {
                                "code": 300117,
                                "name": "闵行区"
                            }, {
                                "code": 300116,
                                "name": "黄浦区"
                            }, {
                                "code": 300115,
                                "name": "闸北区"
                            }, {
                                "code": 300114,
                                "name": "普陀区"
                            }, {
                                "code": 300113,
                                "name": "虹口区"
                            }, {
                                "code": 300112,
                                "name": "杨浦区"
                            }, {
                                "code": 300111,
                                "name": "浦东新区"
                            }, {
                                "code": 300110,
                                "name": "奉贤区"
                            }, {
                                "code": 300109,
                                "name": "松江区"
                            }, {
                                "code": 300107,
                                "name": "崇明县"
                            }, {
                                "code": 300106,
                                "name": "青浦区"
                            }, {
                                "code": 300105,
                                "name": "静安区"
                            }, {
                                "code": 300104,
                                "name": "长宁区"
                            }, {
                                "code": 300102,
                                "name": "金山区"
                            }, {
                                "code": 300101,
                                "name": "宝山区"
                            }]
                        }]
                    }, {
                        "code": 31,
                        "name": "江苏省",
                        "sub": [{
                            "code": 3113,
                            "name": "宿迁市",
                            "sub": [{
                                "code": 311306,
                                "name": "泗洪县"
                            }, {
                                "code": 311305,
                                "name": "泗阳县"
                            }, {
                                "code": 311304,
                                "name": "沭阳县"
                            }, {
                                "code": 311303,
                                "name": "宿豫区"
                            }, {
                                "code": 311302,
                                "name": "宿城区"
                            }]
                        }, {
                            "code": 3112,
                            "name": "泰州市",
                            "sub": [{
                                "code": 311208,
                                "name": "高新区"
                            }, {
                                "code": 311207,
                                "name": "姜堰市"
                            }, {
                                "code": 311206,
                                "name": "泰兴市"
                            }, {
                                "code": 311205,
                                "name": "靖江市"
                            }, {
                                "code": 311204,
                                "name": "兴化市"
                            }, {
                                "code": 311203,
                                "name": "高港区"
                            }, {
                                "code": 311202,
                                "name": "海陵区"
                            }]
                        }, {
                            "code": 3111,
                            "name": "淮安市",
                            "sub": [{
                                "code": 311109,
                                "name": "金湖县"
                            }, {
                                "code": 311108,
                                "name": "盱眙县"
                            }, {
                                "code": 311107,
                                "name": "洪泽县"
                            }, {
                                "code": 311106,
                                "name": "涟水县"
                            }, {
                                "code": 311105,
                                "name": "清浦区"
                            }, {
                                "code": 311104,
                                "name": "淮阴区"
                            }, {
                                "code": 311103,
                                "name": "楚州区"
                            }, {
                                "code": 311102,
                                "name": "清河区"
                            }]
                        }, {
                            "code": 3110,
                            "name": "盐城市",
                            "sub": [{
                                "code": 311010,
                                "name": "大丰市"
                            }, {
                                "code": 311009,
                                "name": "东台市"
                            }, {
                                "code": 311008,
                                "name": "建湖县"
                            }, {
                                "code": 311007,
                                "name": "射阳县"
                            }, {
                                "code": 311006,
                                "name": "阜宁县"
                            }, {
                                "code": 311005,
                                "name": "滨海县"
                            }, {
                                "code": 311004,
                                "name": "响水县"
                            }, {
                                "code": 311003,
                                "name": "盐都区"
                            }, {
                                "code": 311002,
                                "name": "亭湖区"
                            }]
                        }, {
                            "code": 3109,
                            "name": "连云港市",
                            "sub": [{
                                "code": 310908,
                                "name": "灌南县"
                            }, {
                                "code": 310907,
                                "name": "灌云县"
                            }, {
                                "code": 310906,
                                "name": "东海县"
                            }, {
                                "code": 310905,
                                "name": "赣榆县"
                            }, {
                                "code": 310904,
                                "name": "海州区"
                            }, {
                                "code": 310903,
                                "name": "新浦区"
                            }, {
                                "code": 310902,
                                "name": "连云区"
                            }]
                        }, {
                            "code": 3108,
                            "name": "徐州市",
                            "sub": [{
                                "code": 310812,
                                "name": "邳州市"
                            }, {
                                "code": 310811,
                                "name": "新沂市"
                            }, {
                                "code": 310810,
                                "name": "睢宁县"
                            }, {
                                "code": 310809,
                                "name": "铜山县"
                            }, {
                                "code": 310808,
                                "name": "沛县"
                            }, {
                                "code": 310807,
                                "name": "丰县"
                            }, {
                                "code": 310806,
                                "name": "泉山区"
                            }, {
                                "code": 310805,
                                "name": "贾汪区"
                            }, {
                                "code": 310804,
                                "name": "九里区"
                            }, {
                                "code": 310803,
                                "name": "云龙区"
                            }, {
                                "code": 310802,
                                "name": "鼓楼区"
                            }]
                        }, {
                            "code": 3107,
                            "name": "常州市",
                            "sub": [{
                                "code": 310708,
                                "name": "金坛市"
                            }, {
                                "code": 310707,
                                "name": "溧阳市"
                            }, {
                                "code": 310706,
                                "name": "武进区"
                            }, {
                                "code": 310705,
                                "name": "新北区"
                            }, {
                                "code": 310704,
                                "name": "戚墅堰区"
                            }, {
                                "code": 310703,
                                "name": "钟楼区"
                            }, {
                                "code": 310702,
                                "name": "天宁区"
                            }]
                        }, {
                            "code": 3106,
                            "name": "南通市",
                            "sub": [{
                                "code": 310609,
                                "name": "海门市"
                            }, {
                                "code": 310608,
                                "name": "通州市"
                            }, {
                                "code": 310607,
                                "name": "如皋市"
                            }, {
                                "code": 310606,
                                "name": "启东市"
                            }, {
                                "code": 310605,
                                "name": "如东县"
                            }, {
                                "code": 310604,
                                "name": "海安县"
                            }, {
                                "code": 310603,
                                "name": "港闸区"
                            }, {
                                "code": 310602,
                                "name": "崇川区"
                            }]
                        }, {
                            "code": 3105,
                            "name": "扬州市",
                            "sub": [{
                                "code": 310508,
                                "name": "江都区"
                            }, {
                                "code": 310507,
                                "name": "高邮市"
                            }, {
                                "code": 310506,
                                "name": "仪征市"
                            }, {
                                "code": 310505,
                                "name": "宝应县"
                            }, {
                                "code": 310503,
                                "name": "邗江区"
                            }, {
                                "code": 310502,
                                "name": "广陵区"
                            }]
                        }, {
                            "code": 3104,
                            "name": "镇江市",
                            "sub": [{
                                "code": 310407,
                                "name": "句容市"
                            }, {
                                "code": 310406,
                                "name": "扬中市"
                            }, {
                                "code": 310405,
                                "name": "丹阳市"
                            }, {
                                "code": 310404,
                                "name": "丹徒区"
                            }, {
                                "code": 310403,
                                "name": "润州区"
                            }, {
                                "code": 310402,
                                "name": "京口区"
                            }]
                        }, {
                            "code": 3103,
                            "name": "无锡市",
                            "sub": [{
                                "code": 310310,
                                "name": "高新区"
                            }, {
                                "code": 310309,
                                "name": "宜兴市"
                            }, {
                                "code": 310308,
                                "name": "江阴市"
                            }, {
                                "code": 310307,
                                "name": "滨湖区"
                            }, {
                                "code": 310306,
                                "name": "惠山区"
                            }, {
                                "code": 310305,
                                "name": "锡山区"
                            }, {
                                "code": 310304,
                                "name": "北塘区"
                            }, {
                                "code": 310303,
                                "name": "南长区"
                            }, {
                                "code": 310302,
                                "name": "崇安区"
                            }]
                        }, {
                            "code": 3102,
                            "name": "苏州市",
                            "sub": [{
                                "code": 310214,
                                "name": "高新区"
                            }, {
                                "code": 310213,
                                "name": "工业园区"
                            }, {
                                "code": 310212,
                                "name": "太仓市"
                            }, {
                                "code": 310211,
                                "name": "吴江市"
                            }, {
                                "code": 310210,
                                "name": "昆山市"
                            }, {
                                "code": 310209,
                                "name": "张家港市"
                            }, {
                                "code": 310208,
                                "name": "常熟市"
                            }, {
                                "code": 310207,
                                "name": "相城区"
                            }, {
                                "code": 310206,
                                "name": "吴中区"
                            }, {
                                "code": 310205,
                                "name": "虎丘区"
                            }, {
                                "code": 310204,
                                "name": "金阊区"
                            }, {
                                "code": 310203,
                                "name": "平江区"
                            }, {
                                "code": 310202,
                                "name": "沧浪区"
                            }]
                        }, {
                            "code": 3101,
                            "name": "南京市",
                            "sub": [{
                                "code": 310114,
                                "name": "高淳县"
                            }, {
                                "code": 310113,
                                "name": "溧水县"
                            }, {
                                "code": 310112,
                                "name": "六合区"
                            }, {
                                "code": 310111,
                                "name": "江宁区"
                            }, {
                                "code": 310110,
                                "name": "雨花台区"
                            }, {
                                "code": 310109,
                                "name": "栖霞区"
                            }, {
                                "code": 310108,
                                "name": "浦口区"
                            }, {
                                "code": 310107,
                                "name": "下关区"
                            }, {
                                "code": 310106,
                                "name": "鼓楼区"
                            }, {
                                "code": 310105,
                                "name": "建邺区"
                            }, {
                                "code": 310104,
                                "name": "秦淮区"
                            }, {
                                "code": 310103,
                                "name": "白下区"
                            }, {
                                "code": 310102,
                                "name": "玄武区"
                            }]
                        }]
                    }, {
                        "code": 32,
                        "name": "山东省",
                        "sub": [{
                            "code": 3217,
                            "name": "临沂市",
                            "sub": [{
                                "code": 321713,
                                "name": "临沭县"
                            }, {
                                "code": 321712,
                                "name": "蒙阴县"
                            }, {
                                "code": 321711,
                                "name": "莒南县"
                            }, {
                                "code": 321710,
                                "name": "平邑县"
                            }, {
                                "code": 321709,
                                "name": "费县"
                            }, {
                                "code": 321708,
                                "name": "苍山县"
                            }, {
                                "code": 321707,
                                "name": "沂水县"
                            }, {
                                "code": 321706,
                                "name": "郯城县"
                            }, {
                                "code": 321705,
                                "name": "沂南县"
                            }, {
                                "code": 321704,
                                "name": "河东区"
                            }, {
                                "code": 321703,
                                "name": "罗庄区"
                            }, {
                                "code": 321702,
                                "name": "兰山区"
                            }]
                        }, {
                            "code": 3216,
                            "name": "菏泽市",
                            "sub": [{
                                "code": 321610,
                                "name": "东明县"
                            }, {
                                "code": 321609,
                                "name": "定陶县"
                            }, {
                                "code": 321608,
                                "name": "鄄城县"
                            }, {
                                "code": 321607,
                                "name": "郓城县"
                            }, {
                                "code": 321606,
                                "name": "巨野县"
                            }, {
                                "code": 321605,
                                "name": "成武县"
                            }, {
                                "code": 321604,
                                "name": "单县"
                            }, {
                                "code": 321603,
                                "name": "曹县"
                            }, {
                                "code": 321602,
                                "name": "牡丹区"
                            }]
                        }, {
                            "code": 3215,
                            "name": "聊城市",
                            "sub": [{
                                "code": 321510,
                                "name": "高新区"
                            }, {
                                "code": 321509,
                                "name": "临清市"
                            }, {
                                "code": 321508,
                                "name": "高唐县"
                            }, {
                                "code": 321507,
                                "name": "冠县"
                            }, {
                                "code": 321506,
                                "name": "东阿县"
                            }, {
                                "code": 321505,
                                "name": "茌平县"
                            }, {
                                "code": 321504,
                                "name": "莘县"
                            }, {
                                "code": 321503,
                                "name": "阳谷县"
                            }, {
                                "code": 321502,
                                "name": "东昌府区"
                            }]
                        }, {
                            "code": 3214,
                            "name": "东营市",
                            "sub": [{
                                "code": 321406,
                                "name": "广饶县"
                            }, {
                                "code": 321405,
                                "name": "利津县"
                            }, {
                                "code": 321404,
                                "name": "垦利县"
                            }, {
                                "code": 321403,
                                "name": "河口区"
                            }, {
                                "code": 321402,
                                "name": "东营区"
                            }]
                        }, {
                            "code": 3213,
                            "name": "滨州市",
                            "sub": [{
                                "code": 321308,
                                "name": "邹平县"
                            }, {
                                "code": 321307,
                                "name": "博兴县"
                            }, {
                                "code": 321306,
                                "name": "沾化县"
                            }, {
                                "code": 321305,
                                "name": "无棣县"
                            }, {
                                "code": 321304,
                                "name": "阳信县"
                            }, {
                                "code": 321303,
                                "name": "惠民县"
                            }, {
                                "code": 321302,
                                "name": "滨城区"
                            }]
                        }, {
                            "code": 3212,
                            "name": "莱芜市",
                            "sub": [{
                                "code": 321203,
                                "name": "钢城区"
                            }, {
                                "code": 321202,
                                "name": "莱城区"
                            }]
                        }, {
                            "code": 3211,
                            "name": "日照市",
                            "sub": [{
                                "code": 321105,
                                "name": "莒县"
                            }, {
                                "code": 321104,
                                "name": "五莲县"
                            }, {
                                "code": 321103,
                                "name": "岚山区"
                            }, {
                                "code": 321102,
                                "name": "东港区"
                            }]
                        }, {
                            "code": 3210,
                            "name": "威海市",
                            "sub": [{
                                "code": 321005,
                                "name": "乳山市"
                            }, {
                                "code": 321004,
                                "name": "荣成市"
                            }, {
                                "code": 321003,
                                "name": "文登市"
                            }, {
                                "code": 321002,
                                "name": "环翠区"
                            }]
                        }, {
                            "code": 3209,
                            "name": "德州市",
                            "sub": [{
                                "code": 320912,
                                "name": "禹城市"
                            }, {
                                "code": 320911,
                                "name": "乐陵市"
                            }, {
                                "code": 320910,
                                "name": "武城县"
                            }, {
                                "code": 320909,
                                "name": "夏津县"
                            }, {
                                "code": 320908,
                                "name": "平原县"
                            }, {
                                "code": 320907,
                                "name": "齐河县"
                            }, {
                                "code": 320906,
                                "name": "临邑县"
                            }, {
                                "code": 320905,
                                "name": "庆云县"
                            }, {
                                "code": 320904,
                                "name": "宁津县"
                            }, {
                                "code": 320903,
                                "name": "陵县"
                            }, {
                                "code": 320902,
                                "name": "德城区"
                            }]
                        }, {
                            "code": 3208,
                            "name": "枣庄市",
                            "sub": [{
                                "code": 320808,
                                "name": "高新区"
                            }, {
                                "code": 320807,
                                "name": "滕州市"
                            }, {
                                "code": 320806,
                                "name": "山亭区"
                            }, {
                                "code": 320805,
                                "name": "台儿庄区"
                            }, {
                                "code": 320804,
                                "name": "峄城区"
                            }, {
                                "code": 320803,
                                "name": "薛城区"
                            }, {
                                "code": 320802,
                                "name": "市中区"
                            }]
                        }, {
                            "code": 3207,
                            "name": "济宁市",
                            "sub": [{
                                "code": 320714,
                                "name": "高新区"
                            }, {
                                "code": 320713,
                                "name": "邹城市"
                            }, {
                                "code": 320712,
                                "name": "兖州市"
                            }, {
                                "code": 320711,
                                "name": "曲阜市"
                            }, {
                                "code": 320710,
                                "name": "梁山县"
                            }, {
                                "code": 320709,
                                "name": "泗水县"
                            }, {
                                "code": 320708,
                                "name": "汶上县"
                            }, {
                                "code": 320707,
                                "name": "嘉祥县"
                            }, {
                                "code": 320706,
                                "name": "金乡县"
                            }, {
                                "code": 320705,
                                "name": "鱼台县"
                            }, {
                                "code": 320704,
                                "name": "微山县"
                            }, {
                                "code": 320703,
                                "name": "任城区"
                            }, {
                                "code": 320702,
                                "name": "市中区"
                            }]
                        }, {
                            "code": 3206,
                            "name": "潍坊市",
                            "sub": [{
                                "code": 320613,
                                "name": "昌邑市"
                            }, {
                                "code": 320612,
                                "name": "高密市"
                            }, {
                                "code": 320611,
                                "name": "安丘市"
                            }, {
                                "code": 320610,
                                "name": "寿光市"
                            }, {
                                "code": 320609,
                                "name": "诸城市"
                            }, {
                                "code": 320608,
                                "name": "青州市"
                            }, {
                                "code": 320607,
                                "name": "昌乐县"
                            }, {
                                "code": 320606,
                                "name": "临朐县"
                            }, {
                                "code": 320605,
                                "name": "奎文区"
                            }, {
                                "code": 320604,
                                "name": "坊子区"
                            }, {
                                "code": 320603,
                                "name": "寒亭区"
                            }, {
                                "code": 320602,
                                "name": "潍城区"
                            }]
                        }, {
                            "code": 3205,
                            "name": "泰安市",
                            "sub": [{
                                "code": 320507,
                                "name": "肥城市"
                            }, {
                                "code": 320506,
                                "name": "新泰市"
                            }, {
                                "code": 320505,
                                "name": "东平县"
                            }, {
                                "code": 320504,
                                "name": "宁阳县"
                            }, {
                                "code": 320503,
                                "name": "岱岳区"
                            }, {
                                "code": 320502,
                                "name": "泰山区"
                            }]
                        }, {
                            "code": 3204,
                            "name": "淄博市",
                            "sub": [{
                                "code": 320410,
                                "name": "高新区"
                            }, {
                                "code": 320409,
                                "name": "沂源县"
                            }, {
                                "code": 320408,
                                "name": "高青县"
                            }, {
                                "code": 320407,
                                "name": "桓台县"
                            }, {
                                "code": 320406,
                                "name": "周村区"
                            }, {
                                "code": 320405,
                                "name": "临淄区"
                            }, {
                                "code": 320404,
                                "name": "博山区"
                            }, {
                                "code": 320403,
                                "name": "张店区"
                            }, {
                                "code": 320402,
                                "name": "淄川区"
                            }]
                        }, {
                            "code": 3203,
                            "name": "烟台市",
                            "sub": [{
                                "code": 320314,
                                "name": "高新区"
                            }, {
                                "code": 320313,
                                "name": "海阳市"
                            }, {
                                "code": 320312,
                                "name": "栖霞市"
                            }, {
                                "code": 320311,
                                "name": "招远市"
                            }, {
                                "code": 320310,
                                "name": "蓬莱市"
                            }, {
                                "code": 320309,
                                "name": "莱州市"
                            }, {
                                "code": 320308,
                                "name": "莱阳市"
                            }, {
                                "code": 320307,
                                "name": "龙口市"
                            }, {
                                "code": 320306,
                                "name": "长岛县"
                            }, {
                                "code": 320305,
                                "name": "莱山区"
                            }, {
                                "code": 320304,
                                "name": "牟平区"
                            }, {
                                "code": 320303,
                                "name": "福山区"
                            }, {
                                "code": 320302,
                                "name": "芝罘区"
                            }]
                        }, {
                            "code": 3202,
                            "name": "青岛市",
                            "sub": [{
                                "code": 320213,
                                "name": "莱西市"
                            }, {
                                "code": 320212,
                                "name": "胶南市"
                            }, {
                                "code": 320211,
                                "name": "平度市"
                            }, {
                                "code": 320210,
                                "name": "即墨市"
                            }, {
                                "code": 320209,
                                "name": "胶州市"
                            }, {
                                "code": 320208,
                                "name": "城阳区"
                            }, {
                                "code": 320207,
                                "name": "李沧区"
                            }, {
                                "code": 320206,
                                "name": "崂山区"
                            }, {
                                "code": 320205,
                                "name": "黄岛区"
                            }, {
                                "code": 320204,
                                "name": "四方区"
                            }, {
                                "code": 320203,
                                "name": "市北区"
                            }, {
                                "code": 320202,
                                "name": "市南区"
                            }]
                        }, {
                            "code": 3201,
                            "name": "济南市",
                            "sub": [{
                                "code": 320112,
                                "name": "高新区"
                            }, {
                                "code": 320111,
                                "name": "章丘市"
                            }, {
                                "code": 320110,
                                "name": "商河县"
                            }, {
                                "code": 320109,
                                "name": "济阳县"
                            }, {
                                "code": 320108,
                                "name": "平阴县"
                            }, {
                                "code": 320107,
                                "name": "长清区"
                            }, {
                                "code": 320106,
                                "name": "历城区"
                            }, {
                                "code": 320105,
                                "name": "天桥区"
                            }, {
                                "code": 320104,
                                "name": "槐荫区"
                            }, {
                                "code": 320103,
                                "name": "市中区"
                            }, {
                                "code": 320102,
                                "name": "历下区"
                            }]
                        }]
                    }, {
                        "code": 33,
                        "name": "安徽省",
                        "sub": [{
                            "code": 3317,
                            "name": "亳州市",
                            "sub": [{
                                "code": 331705,
                                "name": "利辛县"
                            }, {
                                "code": 331704,
                                "name": "蒙城县"
                            }, {
                                "code": 331703,
                                "name": "涡阳县"
                            }, {
                                "code": 331702,
                                "name": "谯城区"
                            }]
                        }, {
                            "code": 3316,
                            "name": "宣城市",
                            "sub": [{
                                "code": 331608,
                                "name": "宁国市"
                            }, {
                                "code": 331607,
                                "name": "旌德县"
                            }, {
                                "code": 331606,
                                "name": "绩溪县"
                            }, {
                                "code": 331605,
                                "name": "泾县"
                            }, {
                                "code": 331604,
                                "name": "广德县"
                            }, {
                                "code": 331603,
                                "name": "郎溪县"
                            }, {
                                "code": 331602,
                                "name": "宣州区"
                            }]
                        }, {
                            "code": 3315,
                            "name": "六安市",
                            "sub": [{
                                "code": 331508,
                                "name": "霍山县"
                            }, {
                                "code": 331507,
                                "name": "金寨县"
                            }, {
                                "code": 331506,
                                "name": "舒城县"
                            }, {
                                "code": 331505,
                                "name": "霍邱县"
                            }, {
                                "code": 331504,
                                "name": "寿县"
                            }, {
                                "code": 331503,
                                "name": "裕安区"
                            }, {
                                "code": 331502,
                                "name": "金安区"
                            }]
                        }, {
                            "code": 3314,
                            "name": "阜阳市",
                            "sub": [{
                                "code": 331409,
                                "name": "界首市"
                            }, {
                                "code": 331408,
                                "name": "颍上县"
                            }, {
                                "code": 331407,
                                "name": "阜南县"
                            }, {
                                "code": 331406,
                                "name": "太和县"
                            }, {
                                "code": 331405,
                                "name": "临泉县"
                            }, {
                                "code": 331404,
                                "name": "颍泉区"
                            }, {
                                "code": 331403,
                                "name": "颍东区"
                            }, {
                                "code": 331402,
                                "name": "颍州区"
                            }]
                        }, {
                            "code": 3313,
                            "name": "巢湖市",
                            "sub": [{
                                "code": 331306,
                                "name": "和县"
                            }, {
                                "code": 331305,
                                "name": "含山县"
                            }, {
                                "code": 331304,
                                "name": "无为县"
                            }, {
                                "code": 331303,
                                "name": "庐江县"
                            }, {
                                "code": 331302,
                                "name": "居巢区"
                            }]
                        }, {
                            "code": 3312,
                            "name": "淮南市",
                            "sub": [{
                                "code": 331207,
                                "name": "凤台县"
                            }, {
                                "code": 331206,
                                "name": "潘集区"
                            }, {
                                "code": 331205,
                                "name": "八公山区"
                            }, {
                                "code": 331204,
                                "name": "谢家集区"
                            }, {
                                "code": 331203,
                                "name": "田家庵区"
                            }, {
                                "code": 331202,
                                "name": "大通区"
                            }]
                        }, {
                            "code": 3311,
                            "name": "池州市",
                            "sub": [{
                                "code": 331105,
                                "name": "青阳县"
                            }, {
                                "code": 331104,
                                "name": "石台县"
                            }, {
                                "code": 331103,
                                "name": "东至县"
                            }, {
                                "code": 331102,
                                "name": "贵池区"
                            }]
                        }, {
                            "code": 3310,
                            "name": "宿州市",
                            "sub": [{
                                "code": 331006,
                                "name": "泗县"
                            }, {
                                "code": 331005,
                                "name": "灵璧县"
                            }, {
                                "code": 331004,
                                "name": "萧县"
                            }, {
                                "code": 331003,
                                "name": "砀山县"
                            }, {
                                "code": 331002,
                                "name": "埇桥区"
                            }]
                        }, {
                            "code": 3309,
                            "name": "滁州市",
                            "sub": [{
                                "code": 330909,
                                "name": "明光市"
                            }, {
                                "code": 330908,
                                "name": "天长市"
                            }, {
                                "code": 330907,
                                "name": "凤阳县"
                            }, {
                                "code": 330906,
                                "name": "定远县"
                            }, {
                                "code": 330905,
                                "name": "全椒县"
                            }, {
                                "code": 330904,
                                "name": "来安县"
                            }, {
                                "code": 330903,
                                "name": "南谯区"
                            }, {
                                "code": 330902,
                                "name": "琅琊区"
                            }]
                        }, {
                            "code": 3308,
                            "name": "黄山市",
                            "sub": [{
                                "code": 330808,
                                "name": "祁门县"
                            }, {
                                "code": 330807,
                                "name": "黟县"
                            }, {
                                "code": 330806,
                                "name": "休宁县"
                            }, {
                                "code": 330805,
                                "name": "歙县"
                            }, {
                                "code": 330804,
                                "name": "徽州区"
                            }, {
                                "code": 330803,
                                "name": "黄山区"
                            }, {
                                "code": 330802,
                                "name": "屯溪区"
                            }]
                        }, {
                            "code": 3307,
                            "name": "安庆市",
                            "sub": [{
                                "code": 330712,
                                "name": "桐城市"
                            }, {
                                "code": 330711,
                                "name": "岳西县"
                            }, {
                                "code": 330710,
                                "name": "望江县"
                            }, {
                                "code": 330709,
                                "name": "宿松县"
                            }, {
                                "code": 330708,
                                "name": "太湖县"
                            }, {
                                "code": 330707,
                                "name": "潜山县"
                            }, {
                                "code": 330706,
                                "name": "枞阳县"
                            }, {
                                "code": 330705,
                                "name": "怀宁县"
                            }, {
                                "code": 330704,
                                "name": "宜秀区"
                            }, {
                                "code": 330703,
                                "name": "大观区"
                            }, {
                                "code": 330702,
                                "name": "迎江区"
                            }]
                        }, {
                            "code": 3306,
                            "name": "铜陵市",
                            "sub": [{
                                "code": 330605,
                                "name": "铜陵县"
                            }, {
                                "code": 330604,
                                "name": "郊区"
                            }, {
                                "code": 330603,
                                "name": "狮子山区"
                            }, {
                                "code": 330602,
                                "name": "铜官山区"
                            }]
                        }, {
                            "code": 3305,
                            "name": "淮北市",
                            "sub": [{
                                "code": 330505,
                                "name": "濉溪县"
                            }, {
                                "code": 330504,
                                "name": "烈山区"
                            }, {
                                "code": 330503,
                                "name": "相山区"
                            }, {
                                "code": 330502,
                                "name": "杜集区"
                            }]
                        }, {
                            "code": 3304,
                            "name": "马鞍山市",
                            "sub": [{
                                "code": 330405,
                                "name": "当涂县"
                            }, {
                                "code": 330404,
                                "name": "雨山区"
                            }, {
                                "code": 330403,
                                "name": "花山区"
                            }, {
                                "code": 330402,
                                "name": "金家庄区"
                            }]
                        }, {
                            "code": 3303,
                            "name": "蚌埠市",
                            "sub": [{
                                "code": 330309,
                                "name": "高新区"
                            }, {
                                "code": 330308,
                                "name": "固镇县"
                            }, {
                                "code": 330307,
                                "name": "五河县"
                            }, {
                                "code": 330306,
                                "name": "怀远县"
                            }, {
                                "code": 330305,
                                "name": "淮上区"
                            }, {
                                "code": 330304,
                                "name": "禹会区"
                            }, {
                                "code": 330303,
                                "name": "蚌山区"
                            }, {
                                "code": 330302,
                                "name": "龙子湖区"
                            }]
                        }, {
                            "code": 3302,
                            "name": "芜湖市",
                            "sub": [{
                                "code": 330208,
                                "name": "南陵县"
                            }, {
                                "code": 330207,
                                "name": "繁昌县"
                            }, {
                                "code": 330206,
                                "name": "芜湖县"
                            }, {
                                "code": 330205,
                                "name": "三山区"
                            }, {
                                "code": 330204,
                                "name": "鸠江区"
                            }, {
                                "code": 330203,
                                "name": "弋江区"
                            }, {
                                "code": 330202,
                                "name": "镜湖区"
                            }]
                        }, {
                            "code": 3301,
                            "name": "合肥市",
                            "sub": [{
                                "code": 330108,
                                "name": "肥西县"
                            }, {
                                "code": 330107,
                                "name": "肥东县"
                            }, {
                                "code": 330106,
                                "name": "长丰县"
                            }, {
                                "code": 330105,
                                "name": "包河区"
                            }, {
                                "code": 330104,
                                "name": "蜀山区"
                            }, {
                                "code": 330103,
                                "name": "庐阳区"
                            }, {
                                "code": 330102,
                                "name": "瑶海区"
                            }]
                        }]
                    }, {
                        "code": 34,
                        "name": "福建省",
                        "sub": [{
                            "code": 3409,
                            "name": "宁德市",
                            "sub": [{
                                "code": 340910,
                                "name": "福鼎市"
                            }, {
                                "code": 340909,
                                "name": "福安市"
                            }, {
                                "code": 340908,
                                "name": "柘荣县"
                            }, {
                                "code": 340907,
                                "name": "周宁县"
                            }, {
                                "code": 340906,
                                "name": "寿宁县"
                            }, {
                                "code": 340905,
                                "name": "屏南县"
                            }, {
                                "code": 340904,
                                "name": "古田县"
                            }, {
                                "code": 340903,
                                "name": "霞浦县"
                            }, {
                                "code": 340902,
                                "name": "蕉城区"
                            }]
                        }, {
                            "code": 3408,
                            "name": "龙岩市",
                            "sub": [{
                                "code": 340808,
                                "name": "漳平市"
                            }, {
                                "code": 340807,
                                "name": "连城县"
                            }, {
                                "code": 340806,
                                "name": "武平县"
                            }, {
                                "code": 340805,
                                "name": "上杭县"
                            }, {
                                "code": 340804,
                                "name": "永定县"
                            }, {
                                "code": 340803,
                                "name": "长汀县"
                            }, {
                                "code": 340802,
                                "name": "新罗区"
                            }]
                        }, {
                            "code": 3407,
                            "name": "南平市",
                            "sub": [{
                                "code": 340711,
                                "name": "建阳市"
                            }, {
                                "code": 340710,
                                "name": "建瓯市"
                            }, {
                                "code": 340709,
                                "name": "武夷山市"
                            }, {
                                "code": 340708,
                                "name": "邵武市"
                            }, {
                                "code": 340707,
                                "name": "政和县"
                            }, {
                                "code": 340706,
                                "name": "松溪县"
                            }, {
                                "code": 340705,
                                "name": "光泽县"
                            }, {
                                "code": 340704,
                                "name": "浦城县"
                            }, {
                                "code": 340703,
                                "name": "顺昌县"
                            }, {
                                "code": 340702,
                                "name": "延平区"
                            }]
                        }, {
                            "code": 3406,
                            "name": "三明市",
                            "sub": [{
                                "code": 340613,
                                "name": "永安市"
                            }, {
                                "code": 340612,
                                "name": "建宁县"
                            }, {
                                "code": 340611,
                                "name": "泰宁县"
                            }, {
                                "code": 340610,
                                "name": "将乐县"
                            }, {
                                "code": 340609,
                                "name": "沙县"
                            }, {
                                "code": 340608,
                                "name": "尤溪县"
                            }, {
                                "code": 340607,
                                "name": "大田县"
                            }, {
                                "code": 340606,
                                "name": "宁化县"
                            }, {
                                "code": 340605,
                                "name": "清流县"
                            }, {
                                "code": 340604,
                                "name": "明溪县"
                            }, {
                                "code": 340603,
                                "name": "三元区"
                            }, {
                                "code": 340602,
                                "name": "梅列区"
                            }]
                        }, {
                            "code": 3405,
                            "name": "莆田市",
                            "sub": [{
                                "code": 340506,
                                "name": "仙游县"
                            }, {
                                "code": 340505,
                                "name": "秀屿区"
                            }, {
                                "code": 340504,
                                "name": "荔城区"
                            }, {
                                "code": 340503,
                                "name": "涵江区"
                            }, {
                                "code": 340502,
                                "name": "城厢区"
                            }]
                        }, {
                            "code": 3404,
                            "name": "泉州市",
                            "sub": [{
                                "code": 340413,
                                "name": "南安市"
                            }, {
                                "code": 340412,
                                "name": "晋江市"
                            }, {
                                "code": 340411,
                                "name": "石狮市"
                            }, {
                                "code": 340410,
                                "name": "金门县"
                            }, {
                                "code": 340409,
                                "name": "德化县"
                            }, {
                                "code": 340408,
                                "name": "永春县"
                            }, {
                                "code": 340407,
                                "name": "安溪县"
                            }, {
                                "code": 340406,
                                "name": "惠安县"
                            }, {
                                "code": 340405,
                                "name": "泉港区"
                            }, {
                                "code": 340404,
                                "name": "洛江区"
                            }, {
                                "code": 340403,
                                "name": "丰泽区"
                            }, {
                                "code": 340402,
                                "name": "鲤城区"
                            }]
                        }, {
                            "code": 3403,
                            "name": "漳州市",
                            "sub": [{
                                "code": 340312,
                                "name": "龙海市"
                            }, {
                                "code": 340311,
                                "name": "华安县"
                            }, {
                                "code": 340310,
                                "name": "平和县"
                            }, {
                                "code": 340309,
                                "name": "南靖县"
                            }, {
                                "code": 340308,
                                "name": "东山县"
                            }, {
                                "code": 340307,
                                "name": "长泰县"
                            }, {
                                "code": 340306,
                                "name": "诏安县"
                            }, {
                                "code": 340305,
                                "name": "漳浦县"
                            }, {
                                "code": 340304,
                                "name": "云霄县"
                            }, {
                                "code": 340303,
                                "name": "龙文区"
                            }, {
                                "code": 340302,
                                "name": "芗城区"
                            }]
                        }, {
                            "code": 3402,
                            "name": "厦门市",
                            "sub": [{
                                "code": 340207,
                                "name": "翔安区"
                            }, {
                                "code": 340206,
                                "name": "同安区"
                            }, {
                                "code": 340205,
                                "name": "集美区"
                            }, {
                                "code": 340204,
                                "name": "湖里区"
                            }, {
                                "code": 340203,
                                "name": "海沧区"
                            }, {
                                "code": 340202,
                                "name": "思明区"
                            }]
                        }, {
                            "code": 3401,
                            "name": "福州市",
                            "sub": [{
                                "code": 340114,
                                "name": "长乐市"
                            }, {
                                "code": 340113,
                                "name": "福清市"
                            }, {
                                "code": 340112,
                                "name": "平潭县"
                            }, {
                                "code": 340111,
                                "name": "永泰县"
                            }, {
                                "code": 340110,
                                "name": "闽清县"
                            }, {
                                "code": 340109,
                                "name": "罗源县"
                            }, {
                                "code": 340108,
                                "name": "连江县"
                            }, {
                                "code": 340107,
                                "name": "闽侯县"
                            }, {
                                "code": 340106,
                                "name": "晋安区"
                            }, {
                                "code": 340105,
                                "name": "马尾区"
                            }, {
                                "code": 340104,
                                "name": "仓山区"
                            }, {
                                "code": 340103,
                                "name": "台江区"
                            }, {
                                "code": 340102,
                                "name": "鼓楼区"
                            }]
                        }]
                    }, {
                        "code": 35,
                        "name": "浙江省",
                        "sub": [{
                            "code": 3511,
                            "name": "丽水市",
                            "sub": [{
                                "code": 351110,
                                "name": "龙泉市"
                            }, {
                                "code": 351109,
                                "name": "景宁县"
                            }, {
                                "code": 351108,
                                "name": "庆元县"
                            }, {
                                "code": 351107,
                                "name": "云和县"
                            }, {
                                "code": 351106,
                                "name": "松阳县"
                            }, {
                                "code": 351105,
                                "name": "遂昌县"
                            }, {
                                "code": 351104,
                                "name": "缙云县"
                            }, {
                                "code": 351103,
                                "name": "青田县"
                            }, {
                                "code": 351102,
                                "name": "莲都区"
                            }]
                        }, {
                            "code": 3510,
                            "name": "台州市",
                            "sub": [{
                                "code": 351010,
                                "name": "临海市"
                            }, {
                                "code": 351009,
                                "name": "温岭市"
                            }, {
                                "code": 351008,
                                "name": "仙居县"
                            }, {
                                "code": 351007,
                                "name": "天台县"
                            }, {
                                "code": 351006,
                                "name": "三门县"
                            }, {
                                "code": 351005,
                                "name": "玉环县"
                            }, {
                                "code": 351004,
                                "name": "路桥区"
                            }, {
                                "code": 351003,
                                "name": "黄岩区"
                            }, {
                                "code": 351002,
                                "name": "椒江区"
                            }]
                        }, {
                            "code": 3509,
                            "name": "舟山市",
                            "sub": [{
                                "code": 350905,
                                "name": "嵊泗县"
                            }, {
                                "code": 350904,
                                "name": "岱山县"
                            }, {
                                "code": 350903,
                                "name": "普陀区"
                            }, {
                                "code": 350902,
                                "name": "定海区"
                            }]
                        }, {
                            "code": 3508,
                            "name": "衢州市",
                            "sub": [{
                                "code": 350807,
                                "name": "江山市"
                            }, {
                                "code": 350806,
                                "name": "龙游县"
                            }, {
                                "code": 350805,
                                "name": "开化县"
                            }, {
                                "code": 350804,
                                "name": "常山县"
                            }, {
                                "code": 350803,
                                "name": "衢江区"
                            }, {
                                "code": 350802,
                                "name": "柯城区"
                            }]
                        }, {
                            "code": 3507,
                            "name": "金华市",
                            "sub": [{
                                "code": 350710,
                                "name": "永康市"
                            }, {
                                "code": 350709,
                                "name": "东阳市"
                            }, {
                                "code": 350708,
                                "name": "义乌市"
                            }, {
                                "code": 350707,
                                "name": "兰溪市"
                            }, {
                                "code": 350706,
                                "name": "磐安县"
                            }, {
                                "code": 350705,
                                "name": "浦江县"
                            }, {
                                "code": 350704,
                                "name": "武义县"
                            }, {
                                "code": 350703,
                                "name": "金东区"
                            }, {
                                "code": 350702,
                                "name": "婺城区"
                            }]
                        }, {
                            "code": 3506,
                            "name": "绍兴市",
                            "sub": [{
                                "code": 350607,
                                "name": "嵊州市"
                            }, {
                                "code": 350606,
                                "name": "上虞市"
                            }, {
                                "code": 350605,
                                "name": "诸暨市"
                            }, {
                                "code": 350604,
                                "name": "新昌县"
                            }, {
                                "code": 350603,
                                "name": "绍兴县"
                            }, {
                                "code": 350602,
                                "name": "越城区"
                            }]
                        }, {
                            "code": 3505,
                            "name": "湖州市",
                            "sub": [{
                                "code": 350506,
                                "name": "安吉县"
                            }, {
                                "code": 350505,
                                "name": "长兴县"
                            }, {
                                "code": 350504,
                                "name": "德清县"
                            }, {
                                "code": 350503,
                                "name": "南浔区"
                            }, {
                                "code": 350502,
                                "name": "吴兴区"
                            }]
                        }, {
                            "code": 3504,
                            "name": "嘉兴市",
                            "sub": [{
                                "code": 350408,
                                "name": "桐乡市"
                            }, {
                                "code": 350407,
                                "name": "平湖市"
                            }, {
                                "code": 350406,
                                "name": "海宁市"
                            }, {
                                "code": 350405,
                                "name": "海盐县"
                            }, {
                                "code": 350404,
                                "name": "嘉善县"
                            }, {
                                "code": 350403,
                                "name": "秀洲区"
                            }, {
                                "code": 350402,
                                "name": "南湖区"
                            }]
                        }, {
                            "code": 3503,
                            "name": "温州市",
                            "sub": [{
                                "code": 350312,
                                "name": "乐清市"
                            }, {
                                "code": 350311,
                                "name": "瑞安市"
                            }, {
                                "code": 350310,
                                "name": "泰顺县"
                            }, {
                                "code": 350309,
                                "name": "文成县"
                            }, {
                                "code": 350308,
                                "name": "苍南县"
                            }, {
                                "code": 350307,
                                "name": "平阳县"
                            }, {
                                "code": 350306,
                                "name": "永嘉县"
                            }, {
                                "code": 350305,
                                "name": "洞头县"
                            }, {
                                "code": 350304,
                                "name": "瓯海区"
                            }, {
                                "code": 350303,
                                "name": "龙湾区"
                            }, {
                                "code": 350302,
                                "name": "鹿城区"
                            }]
                        }, {
                            "code": 3502,
                            "name": "宁波市",
                            "sub": [{
                                "code": 350212,
                                "name": "奉化市"
                            }, {
                                "code": 350211,
                                "name": "慈溪市"
                            }, {
                                "code": 350210,
                                "name": "余姚市"
                            }, {
                                "code": 350209,
                                "name": "宁海县"
                            }, {
                                "code": 350208,
                                "name": "象山县"
                            }, {
                                "code": 350207,
                                "name": "鄞州区"
                            }, {
                                "code": 350206,
                                "name": "镇海区"
                            }, {
                                "code": 350205,
                                "name": "北仑区"
                            }, {
                                "code": 350204,
                                "name": "江北区"
                            }, {
                                "code": 350203,
                                "name": "江东区"
                            }, {
                                "code": 350202,
                                "name": "海曙区"
                            }]
                        }, {
                            "code": 3501,
                            "name": "杭州市",
                            "sub": [{
                                "code": 350114,
                                "name": "临安市"
                            }, {
                                "code": 350113,
                                "name": "富阳市"
                            }, {
                                "code": 350112,
                                "name": "建德市"
                            }, {
                                "code": 350111,
                                "name": "淳安县"
                            }, {
                                "code": 350110,
                                "name": "桐庐县"
                            }, {
                                "code": 350109,
                                "name": "余杭区"
                            }, {
                                "code": 350108,
                                "name": "萧山区"
                            }, {
                                "code": 350107,
                                "name": "滨江区"
                            }, {
                                "code": 350106,
                                "name": "西湖区"
                            }, {
                                "code": 350105,
                                "name": "拱墅区"
                            }, {
                                "code": 350104,
                                "name": "江干区"
                            }, {
                                "code": 350103,
                                "name": "下城区"
                            }, {
                                "code": 350102,
                                "name": "上城区"
                            }]
                        }]
                    }, {
                        "code": 36,
                        "name": "江西省",
                        "sub": [{
                            "code": 3611,
                            "name": "上饶市",
                            "sub": [{
                                "code": 361113,
                                "name": "德兴市"
                            }, {
                                "code": 361112,
                                "name": "婺源县"
                            }, {
                                "code": 361111,
                                "name": "万年县"
                            }, {
                                "code": 361110,
                                "name": "鄱阳县"
                            }, {
                                "code": 361109,
                                "name": "余干县"
                            }, {
                                "code": 361108,
                                "name": "弋阳县"
                            }, {
                                "code": 361107,
                                "name": "横峰县"
                            }, {
                                "code": 361106,
                                "name": "铅山县"
                            }, {
                                "code": 361105,
                                "name": "玉山县"
                            }, {
                                "code": 361104,
                                "name": "广丰县"
                            }, {
                                "code": 361103,
                                "name": "上饶县"
                            }, {
                                "code": 361102,
                                "name": "信州区"
                            }]
                        }, {
                            "code": 3610,
                            "name": "抚州市",
                            "sub": [{
                                "code": 361012,
                                "name": "广昌县"
                            }, {
                                "code": 361011,
                                "name": "东乡县"
                            }, {
                                "code": 361010,
                                "name": "资溪县"
                            }, {
                                "code": 361009,
                                "name": "金溪县"
                            }, {
                                "code": 361008,
                                "name": "宜黄县"
                            }, {
                                "code": 361007,
                                "name": "乐安县"
                            }, {
                                "code": 361006,
                                "name": "崇仁县"
                            }, {
                                "code": 361005,
                                "name": "南丰县"
                            }, {
                                "code": 361004,
                                "name": "黎川县"
                            }, {
                                "code": 361003,
                                "name": "南城县"
                            }, {
                                "code": 361002,
                                "name": "临川区"
                            }]
                        }, {
                            "code": 3609,
                            "name": "宜春市",
                            "sub": [{
                                "code": 360911,
                                "name": "高安市"
                            }, {
                                "code": 360910,
                                "name": "樟树市"
                            }, {
                                "code": 360909,
                                "name": "丰城市"
                            }, {
                                "code": 360908,
                                "name": "铜鼓县"
                            }, {
                                "code": 360907,
                                "name": "靖安县"
                            }, {
                                "code": 360906,
                                "name": "宜丰县"
                            }, {
                                "code": 360905,
                                "name": "上高县"
                            }, {
                                "code": 360904,
                                "name": "万载县"
                            }, {
                                "code": 360903,
                                "name": "奉新县"
                            }, {
                                "code": 360902,
                                "name": "袁州区"
                            }]
                        }, {
                            "code": 3608,
                            "name": "吉安市",
                            "sub": [{
                                "code": 360814,
                                "name": "井冈山市"
                            }, {
                                "code": 360813,
                                "name": "永新县"
                            }, {
                                "code": 360812,
                                "name": "安福县"
                            }, {
                                "code": 360811,
                                "name": "万安县"
                            }, {
                                "code": 360810,
                                "name": "遂川县"
                            }, {
                                "code": 360809,
                                "name": "泰和县"
                            }, {
                                "code": 360808,
                                "name": "永丰县"
                            }, {
                                "code": 360807,
                                "name": "新干县"
                            }, {
                                "code": 360806,
                                "name": "峡江县"
                            }, {
                                "code": 360805,
                                "name": "吉水县"
                            }, {
                                "code": 360804,
                                "name": "吉安县"
                            }, {
                                "code": 360803,
                                "name": "青原区"
                            }, {
                                "code": 360802,
                                "name": "吉州区"
                            }]
                        }, {
                            "code": 3607,
                            "name": "赣州市",
                            "sub": [{
                                "code": 360719,
                                "name": "南康市"
                            }, {
                                "code": 360718,
                                "name": "瑞金市"
                            }, {
                                "code": 360717,
                                "name": "石城县"
                            }, {
                                "code": 360716,
                                "name": "寻乌县"
                            }, {
                                "code": 360715,
                                "name": "会昌县"
                            }, {
                                "code": 360714,
                                "name": "兴国县"
                            }, {
                                "code": 360713,
                                "name": "于都县"
                            }, {
                                "code": 360712,
                                "name": "宁都县"
                            }, {
                                "code": 360711,
                                "name": "全南县"
                            }, {
                                "code": 360710,
                                "name": "定南县"
                            }, {
                                "code": 360709,
                                "name": "龙南县"
                            }, {
                                "code": 360708,
                                "name": "安远县"
                            }, {
                                "code": 360707,
                                "name": "崇义县"
                            }, {
                                "code": 360706,
                                "name": "上犹县"
                            }, {
                                "code": 360705,
                                "name": "大余县"
                            }, {
                                "code": 360704,
                                "name": "信丰县"
                            }, {
                                "code": 360703,
                                "name": "赣县"
                            }, {
                                "code": 360702,
                                "name": "章贡区"
                            }]
                        }, {
                            "code": 3606,
                            "name": "鹰潭市",
                            "sub": [{
                                "code": 360604,
                                "name": "贵溪市"
                            }, {
                                "code": 360603,
                                "name": "余江县"
                            }, {
                                "code": 360602,
                                "name": "月湖区"
                            }]
                        }, {
                            "code": 3605,
                            "name": "新余市",
                            "sub": [{
                                "code": 360504,
                                "name": "高新区"
                            }, {
                                "code": 360503,
                                "name": "分宜县"
                            }, {
                                "code": 360502,
                                "name": "渝水区"
                            }]
                        }, {
                            "code": 3604,
                            "name": "九江市",
                            "sub": [{
                                "code": 360413,
                                "name": "瑞昌市"
                            }, {
                                "code": 360412,
                                "name": "彭泽县"
                            }, {
                                "code": 360411,
                                "name": "湖口县"
                            }, {
                                "code": 360410,
                                "name": "都昌县"
                            }, {
                                "code": 360409,
                                "name": "星子县"
                            }, {
                                "code": 360408,
                                "name": "德安县"
                            }, {
                                "code": 360407,
                                "name": "永修县"
                            }, {
                                "code": 360406,
                                "name": "修水县"
                            }, {
                                "code": 360405,
                                "name": "武宁县"
                            }, {
                                "code": 360404,
                                "name": "九江县"
                            }, {
                                "code": 360403,
                                "name": "浔阳区"
                            }, {
                                "code": 360402,
                                "name": "庐山区"
                            }]
                        }, {
                            "code": 3603,
                            "name": "萍乡市",
                            "sub": [{
                                "code": 360306,
                                "name": "芦溪县"
                            }, {
                                "code": 360305,
                                "name": "上栗县"
                            }, {
                                "code": 360304,
                                "name": "莲花县"
                            }, {
                                "code": 360303,
                                "name": "湘东区"
                            }, {
                                "code": 360302,
                                "name": "安源区"
                            }]
                        }, {
                            "code": 3602,
                            "name": "景德镇市",
                            "sub": [{
                                "code": 360206,
                                "name": "高新区"
                            }, {
                                "code": 360205,
                                "name": "乐平市"
                            }, {
                                "code": 360204,
                                "name": "浮梁县"
                            }, {
                                "code": 360203,
                                "name": "珠山区"
                            }, {
                                "code": 360202,
                                "name": "昌江区"
                            }]
                        }, {
                            "code": 3601,
                            "name": "南昌市",
                            "sub": [{
                                "code": 360110,
                                "name": "进贤县"
                            }, {
                                "code": 360109,
                                "name": "安义县"
                            }, {
                                "code": 360108,
                                "name": "新建县"
                            }, {
                                "code": 360107,
                                "name": "南昌县"
                            }, {
                                "code": 360106,
                                "name": "青山湖区"
                            }, {
                                "code": 360105,
                                "name": "湾里区"
                            }, {
                                "code": 360104,
                                "name": "青云谱区"
                            }, {
                                "code": 360103,
                                "name": "西湖区"
                            }, {
                                "code": 360102,
                                "name": "东湖区"
                            }]
                        }]
                    }, {
                        "code": 40,
                        "name": "广东省",
                        "sub": [{
                            "code": 4021,
                            "name": "云浮市",
                            "sub": [{
                                "code": 402106,
                                "name": "罗定市"
                            }, {
                                "code": 402105,
                                "name": "云安县"
                            }, {
                                "code": 402104,
                                "name": "郁南县"
                            }, {
                                "code": 402103,
                                "name": "新兴县"
                            }, {
                                "code": 402102,
                                "name": "云城区"
                            }]
                        }, {
                            "code": 4020,
                            "name": "揭阳市",
                            "sub": [{
                                "code": 402006,
                                "name": "普宁市"
                            }, {
                                "code": 402005,
                                "name": "惠来县"
                            }, {
                                "code": 402004,
                                "name": "揭西县"
                            }, {
                                "code": 402003,
                                "name": "揭东县"
                            }, {
                                "code": 402002,
                                "name": "榕城区"
                            }]
                        }, {
                            "code": 4019,
                            "name": "潮州市",
                            "sub": [{
                                "code": 401904,
                                "name": "饶平县"
                            }, {
                                "code": 401903,
                                "name": "潮安县"
                            }, {
                                "code": 401902,
                                "name": "湘桥区"
                            }]
                        }, {
                            "code": 4018,
                            "name": "清远市",
                            "sub": [{
                                "code": 401809,
                                "name": "连州市"
                            }, {
                                "code": 401808,
                                "name": "英德市"
                            }, {
                                "code": 401807,
                                "name": "清新县"
                            }, {
                                "code": 401806,
                                "name": "连南县"
                            }, {
                                "code": 401805,
                                "name": "连山县"
                            }, {
                                "code": 401804,
                                "name": "阳山县"
                            }, {
                                "code": 401803,
                                "name": "佛冈县"
                            }, {
                                "code": 401802,
                                "name": "清城区"
                            }]
                        }, {
                            "code": 4017,
                            "name": "肇庆市",
                            "sub": [{
                                "code": 401710,
                                "name": "高新区"
                            }, {
                                "code": 401709,
                                "name": "四会市"
                            }, {
                                "code": 401708,
                                "name": "高要市"
                            }, {
                                "code": 401707,
                                "name": "德庆县"
                            }, {
                                "code": 401706,
                                "name": "封开县"
                            }, {
                                "code": 401705,
                                "name": "怀集县"
                            }, {
                                "code": 401704,
                                "name": "广宁县"
                            }, {
                                "code": 401703,
                                "name": "鼎湖区"
                            }, {
                                "code": 401702,
                                "name": "端州区"
                            }]
                        }, {
                            "code": 4016,
                            "name": "茂名市",
                            "sub": [{
                                "code": 401607,
                                "name": "信宜市"
                            }, {
                                "code": 401606,
                                "name": "化州市"
                            }, {
                                "code": 401605,
                                "name": "高州市"
                            }, {
                                "code": 401604,
                                "name": "电白县"
                            }, {
                                "code": 401603,
                                "name": "茂港区"
                            }, {
                                "code": 401602,
                                "name": "茂南区"
                            }]
                        }, {
                            "code": 4015,
                            "name": "湛江市",
                            "sub": [{
                                "code": 401510,
                                "name": "吴川市"
                            }, {
                                "code": 401509,
                                "name": "雷州市"
                            }, {
                                "code": 401508,
                                "name": "廉江市"
                            }, {
                                "code": 401507,
                                "name": "徐闻县"
                            }, {
                                "code": 401506,
                                "name": "遂溪县"
                            }, {
                                "code": 401505,
                                "name": "麻章区"
                            }, {
                                "code": 401504,
                                "name": "坡头区"
                            }, {
                                "code": 401503,
                                "name": "霞山区"
                            }, {
                                "code": 401502,
                                "name": "赤坎区"
                            }]
                        }, {
                            "code": 4014,
                            "name": "阳江市",
                            "sub": [{
                                "code": 401405,
                                "name": "阳春市"
                            }, {
                                "code": 401404,
                                "name": "阳东县"
                            }, {
                                "code": 401403,
                                "name": "阳西县"
                            }, {
                                "code": 401402,
                                "name": "江城区"
                            }]
                        }, {
                            "code": 4013,
                            "name": "佛山市",
                            "sub": [{
                                "code": 401307,
                                "name": "高新区"
                            }, {
                                "code": 401306,
                                "name": "高明区"
                            }, {
                                "code": 401305,
                                "name": "三水区"
                            }, {
                                "code": 401304,
                                "name": "顺德区"
                            }, {
                                "code": 401303,
                                "name": "南海区"
                            }, {
                                "code": 401302,
                                "name": "禅城区"
                            }]
                        }, {
                            "code": 4012,
                            "name": "江门市",
                            "sub": [{
                                "code": 401209,
                                "name": "高新区"
                            }, {
                                "code": 401208,
                                "name": "恩平市"
                            }, {
                                "code": 401207,
                                "name": "鹤山市"
                            }, {
                                "code": 401206,
                                "name": "开平市"
                            }, {
                                "code": 401205,
                                "name": "台山市"
                            }, {
                                "code": 401204,
                                "name": "新会区"
                            }, {
                                "code": 401203,
                                "name": "江海区"
                            }, {
                                "code": 401202,
                                "name": "蓬江区"
                            }]
                        }, {
                            "code": 4011,
                            "name": "中山市",
                            "sub": [{
                                "code": 401101,
                                "name": "高新区"
                            }]
                        }, {
                            "code": 4010,
                            "name": "东莞市",
                            "sub": [{
                                "code": 401001,
                                "name": "高新区"
                            }]
                        }, {
                            "code": 4009,
                            "name": "汕尾市",
                            "sub": [{
                                "code": 400905,
                                "name": "陆丰市"
                            }, {
                                "code": 400904,
                                "name": "陆河县"
                            }, {
                                "code": 400903,
                                "name": "海丰县"
                            }, {
                                "code": 400902,
                                "name": "城区"
                            }]
                        }, {
                            "code": 4008,
                            "name": "惠州市",
                            "sub": [{
                                "code": 400807,
                                "name": "高新区"
                            }, {
                                "code": 400806,
                                "name": "龙门县"
                            }, {
                                "code": 400805,
                                "name": "惠东县"
                            }, {
                                "code": 400804,
                                "name": "博罗县"
                            }, {
                                "code": 400803,
                                "name": "惠阳区"
                            }, {
                                "code": 400802,
                                "name": "惠城区"
                            }]
                        }, {
                            "code": 4007,
                            "name": "梅州市",
                            "sub": [{
                                "code": 400709,
                                "name": "兴宁市"
                            }, {
                                "code": 400708,
                                "name": "蕉岭县"
                            }, {
                                "code": 400707,
                                "name": "平远县"
                            }, {
                                "code": 400706,
                                "name": "五华县"
                            }, {
                                "code": 400705,
                                "name": "丰顺县"
                            }, {
                                "code": 400704,
                                "name": "大埔县"
                            }, {
                                "code": 400703,
                                "name": "梅县"
                            }, {
                                "code": 400702,
                                "name": "梅江区"
                            }]
                        }, {
                            "code": 4006,
                            "name": "河源市",
                            "sub": [{
                                "code": 400607,
                                "name": "东源县"
                            }, {
                                "code": 400606,
                                "name": "和平县"
                            }, {
                                "code": 400605,
                                "name": "连平县"
                            }, {
                                "code": 400604,
                                "name": "龙川县"
                            }, {
                                "code": 400603,
                                "name": "紫金县"
                            }, {
                                "code": 400602,
                                "name": "源城区"
                            }]
                        }, {
                            "code": 4005,
                            "name": "韶关市",
                            "sub": [{
                                "code": 400511,
                                "name": "南雄市"
                            }, {
                                "code": 400510,
                                "name": "乐昌市"
                            }, {
                                "code": 400509,
                                "name": "新丰县"
                            }, {
                                "code": 400508,
                                "name": "乳源县"
                            }, {
                                "code": 400507,
                                "name": "翁源县"
                            }, {
                                "code": 400506,
                                "name": "仁化县"
                            }, {
                                "code": 400505,
                                "name": "始兴县"
                            }, {
                                "code": 400504,
                                "name": "曲江区"
                            }, {
                                "code": 400503,
                                "name": "浈江区"
                            }, {
                                "code": 400502,
                                "name": "武江区"
                            }]
                        }, {
                            "code": 4004,
                            "name": "汕头市",
                            "sub": [{
                                "code": 400408,
                                "name": "南澳县"
                            }, {
                                "code": 400407,
                                "name": "澄海区"
                            }, {
                                "code": 400406,
                                "name": "潮南区"
                            }, {
                                "code": 400405,
                                "name": "潮阳区"
                            }, {
                                "code": 400404,
                                "name": "濠江区"
                            }, {
                                "code": 400403,
                                "name": "金平区"
                            }, {
                                "code": 400402,
                                "name": "龙湖区"
                            }]
                        }, {
                            "code": 4003,
                            "name": "珠海市",
                            "sub": [{
                                "code": 400305,
                                "name": "高新区"
                            }, {
                                "code": 400304,
                                "name": "金湾区"
                            }, {
                                "code": 400303,
                                "name": "斗门区"
                            }, {
                                "code": 400302,
                                "name": "香洲区"
                            }]
                        }, {
                            "code": 4002,
                            "name": "深圳市",
                            "sub": [{
                                "code": 400208,
                                "name": "高新区"
                            }, {
                                "code": 400207,
                                "name": "盐田区"
                            }, {
                                "code": 400206,
                                "name": "龙岗区"
                            }, {
                                "code": 400205,
                                "name": "宝安区"
                            }, {
                                "code": 400204,
                                "name": "南山区"
                            }, {
                                "code": 400203,
                                "name": "福田区"
                            }, {
                                "code": 400202,
                                "name": "罗湖区"
                            }]
                        }, {
                            "code": 4001,
                            "name": "广州市",
                            "sub": [{
                                "code": 400113,
                                "name": "从化市"
                            }, {
                                "code": 400112,
                                "name": "增城市"
                            }, {
                                "code": 400111,
                                "name": "萝岗区"
                            }, {
                                "code": 400110,
                                "name": "南沙区"
                            }, {
                                "code": 400109,
                                "name": "花都区"
                            }, {
                                "code": 400108,
                                "name": "番禺区"
                            }, {
                                "code": 400107,
                                "name": "黄埔区"
                            }, {
                                "code": 400106,
                                "name": "白云区"
                            }, {
                                "code": 400105,
                                "name": "天河区"
                            }, {
                                "code": 400104,
                                "name": "海珠区"
                            }, {
                                "code": 400103,
                                "name": "越秀区"
                            }, {
                                "code": 400102,
                                "name": "荔湾区"
                            }]
                        }]
                    }, {
                        "code": 41,
                        "name": "广西",
                        "sub": [{
                            "code": 4114,
                            "name": "崇左市",
                            "sub": [{
                                "code": 411408,
                                "name": "凭祥市"
                            }, {
                                "code": 411407,
                                "name": "天等县"
                            }, {
                                "code": 411406,
                                "name": "大新县"
                            }, {
                                "code": 411405,
                                "name": "龙州县"
                            }, {
                                "code": 411404,
                                "name": "宁明县"
                            }, {
                                "code": 411403,
                                "name": "扶绥县"
                            }, {
                                "code": 411402,
                                "name": "江洲区"
                            }]
                        }, {
                            "code": 4113,
                            "name": "来宾市",
                            "sub": [{
                                "code": 411307,
                                "name": "合山市"
                            }, {
                                "code": 411306,
                                "name": "金秀县"
                            }, {
                                "code": 411305,
                                "name": "武宣县"
                            }, {
                                "code": 411304,
                                "name": "象州县"
                            }, {
                                "code": 411303,
                                "name": "忻城县"
                            }, {
                                "code": 411302,
                                "name": "兴宾区"
                            }]
                        }, {
                            "code": 4112,
                            "name": "河池市",
                            "sub": [{
                                "code": 411212,
                                "name": "宜州市"
                            }, {
                                "code": 411211,
                                "name": "大化县"
                            }, {
                                "code": 411210,
                                "name": "都安县"
                            }, {
                                "code": 411209,
                                "name": "巴马县"
                            }, {
                                "code": 411208,
                                "name": "环江县"
                            }, {
                                "code": 411207,
                                "name": "罗城县"
                            }, {
                                "code": 411206,
                                "name": "东兰县"
                            }, {
                                "code": 411205,
                                "name": "凤山县"
                            }, {
                                "code": 411204,
                                "name": "天峨县"
                            }, {
                                "code": 411203,
                                "name": "南丹县"
                            }, {
                                "code": 411202,
                                "name": "金城江区"
                            }]
                        }, {
                            "code": 4111,
                            "name": "贺州市",
                            "sub": [{
                                "code": 411105,
                                "name": "富川县"
                            }, {
                                "code": 411104,
                                "name": "钟山县"
                            }, {
                                "code": 411103,
                                "name": "昭平县"
                            }, {
                                "code": 411102,
                                "name": "八步区"
                            }]
                        }, {
                            "code": 4110,
                            "name": "百色市",
                            "sub": [{
                                "code": 411013,
                                "name": "隆林县"
                            }, {
                                "code": 411012,
                                "name": "西林县"
                            }, {
                                "code": 411011,
                                "name": "田林县"
                            }, {
                                "code": 411010,
                                "name": "乐业县"
                            }, {
                                "code": 411009,
                                "name": "凌云县"
                            }, {
                                "code": 411008,
                                "name": "那坡县"
                            }, {
                                "code": 411007,
                                "name": "靖西县"
                            }, {
                                "code": 411006,
                                "name": "德保县"
                            }, {
                                "code": 411005,
                                "name": "平果县"
                            }, {
                                "code": 411004,
                                "name": "田东县"
                            }, {
                                "code": 411003,
                                "name": "田阳县"
                            }, {
                                "code": 411002,
                                "name": "右江区"
                            }]
                        }, {
                            "code": 4109,
                            "name": "玉林市",
                            "sub": [{
                                "code": 410907,
                                "name": "北流市"
                            }, {
                                "code": 410906,
                                "name": "兴业县"
                            }, {
                                "code": 410905,
                                "name": "博白县"
                            }, {
                                "code": 410904,
                                "name": "陆川县"
                            }, {
                                "code": 410903,
                                "name": "容县"
                            }, {
                                "code": 410902,
                                "name": "玉州区"
                            }]
                        }, {
                            "code": 4108,
                            "name": "贵港市",
                            "sub": [{
                                "code": 410806,
                                "name": "桂平市"
                            }, {
                                "code": 410805,
                                "name": "平南县"
                            }, {
                                "code": 410804,
                                "name": "覃塘区"
                            }, {
                                "code": 410803,
                                "name": "港南区"
                            }, {
                                "code": 410802,
                                "name": "港北区"
                            }]
                        }, {
                            "code": 4107,
                            "name": "钦州市",
                            "sub": [{
                                "code": 410705,
                                "name": "浦北县"
                            }, {
                                "code": 410704,
                                "name": "灵山县"
                            }, {
                                "code": 410703,
                                "name": "钦北区"
                            }, {
                                "code": 410702,
                                "name": "钦南区"
                            }]
                        }, {
                            "code": 4106,
                            "name": "防城港市",
                            "sub": [{
                                "code": 410605,
                                "name": "东兴市"
                            }, {
                                "code": 410604,
                                "name": "上思县"
                            }, {
                                "code": 410603,
                                "name": "防城区"
                            }, {
                                "code": 410602,
                                "name": "港口区"
                            }]
                        }, {
                            "code": 4105,
                            "name": "北海市",
                            "sub": [{
                                "code": 410505,
                                "name": "合浦县"
                            }, {
                                "code": 410504,
                                "name": "铁山港区"
                            }, {
                                "code": 410503,
                                "name": "银海区"
                            }, {
                                "code": 410502,
                                "name": "海城区"
                            }]
                        }, {
                            "code": 4104,
                            "name": "梧州市",
                            "sub": [{
                                "code": 410408,
                                "name": "岑溪市"
                            }, {
                                "code": 410407,
                                "name": "蒙山县"
                            }, {
                                "code": 410406,
                                "name": "藤县"
                            }, {
                                "code": 410405,
                                "name": "苍梧县"
                            }, {
                                "code": 410404,
                                "name": "长洲区"
                            }, {
                                "code": 410403,
                                "name": "蝶山区"
                            }, {
                                "code": 410402,
                                "name": "万秀区"
                            }]
                        }, {
                            "code": 4103,
                            "name": "桂林市",
                            "sub": [{
                                "code": 410319,
                                "name": "高新区"
                            }, {
                                "code": 410318,
                                "name": "恭城县"
                            }, {
                                "code": 410317,
                                "name": "荔蒲县"
                            }, {
                                "code": 410316,
                                "name": "平乐县"
                            }, {
                                "code": 410315,
                                "name": "资源县"
                            }, {
                                "code": 410314,
                                "name": "龙胜县"
                            }, {
                                "code": 410313,
                                "name": "灌阳县"
                            }, {
                                "code": 410312,
                                "name": "永福县"
                            }, {
                                "code": 410311,
                                "name": "兴安县"
                            }, {
                                "code": 410310,
                                "name": "全州县"
                            }, {
                                "code": 410309,
                                "name": "灵川县"
                            }, {
                                "code": 410308,
                                "name": "临桂县"
                            }, {
                                "code": 410307,
                                "name": "阳朔县"
                            }, {
                                "code": 410306,
                                "name": "雁山区"
                            }, {
                                "code": 410305,
                                "name": "七星区"
                            }, {
                                "code": 410304,
                                "name": "象山区"
                            }, {
                                "code": 410303,
                                "name": "叠彩区"
                            }, {
                                "code": 410302,
                                "name": "秀峰区"
                            }]
                        }, {
                            "code": 4102,
                            "name": "柳州市",
                            "sub": [{
                                "code": 410212,
                                "name": "高新区"
                            }, {
                                "code": 410211,
                                "name": "三江县"
                            }, {
                                "code": 410210,
                                "name": "融水县"
                            }, {
                                "code": 410209,
                                "name": "融安县"
                            }, {
                                "code": 410208,
                                "name": "鹿寨县"
                            }, {
                                "code": 410207,
                                "name": "柳城县"
                            }, {
                                "code": 410206,
                                "name": "柳江县"
                            }, {
                                "code": 410205,
                                "name": "柳北区"
                            }, {
                                "code": 410204,
                                "name": "柳南区"
                            }, {
                                "code": 410203,
                                "name": "鱼峰区"
                            }, {
                                "code": 410202,
                                "name": "城中区"
                            }]
                        }, {
                            "code": 4101,
                            "name": "南宁市",
                            "sub": [{
                                "code": 410113,
                                "name": "横县"
                            }, {
                                "code": 410112,
                                "name": "宾阳县"
                            }, {
                                "code": 410111,
                                "name": "上林县"
                            }, {
                                "code": 410110,
                                "name": "马山县"
                            }, {
                                "code": 410109,
                                "name": "隆安县"
                            }, {
                                "code": 410108,
                                "name": "武鸣县"
                            }, {
                                "code": 410107,
                                "name": "邕宁区"
                            }, {
                                "code": 410106,
                                "name": "良庆区"
                            }, {
                                "code": 410105,
                                "name": "西乡塘区"
                            }, {
                                "code": 410104,
                                "name": "江南区"
                            }, {
                                "code": 410103,
                                "name": "青秀区"
                            }, {
                                "code": 410102,
                                "name": "兴宁区"
                            }]
                        }]
                    }, {
                        "code": 42,
                        "name": "海南省",
                        "sub": [{
                            "code": 4219,
                            "name": "洋浦"
                        }, {
                            "code": 4218,
                            "name": "白沙县"
                        }, {
                            "code": 4217,
                            "name": "昌江县"
                        }, {
                            "code": 4216,
                            "name": "乐东县"
                        }, {
                            "code": 4215,
                            "name": "保亭县"
                        }, {
                            "code": 4214,
                            "name": "琼中县"
                        }, {
                            "code": 4213,
                            "name": "陵水县"
                        }, {
                            "code": 4212,
                            "name": "临高县"
                        }, {
                            "code": 4211,
                            "name": "澄迈县"
                        }, {
                            "code": 4210,
                            "name": "屯昌县"
                        }, {
                            "code": 4209,
                            "name": "定安县"
                        }, {
                            "code": 4208,
                            "name": "万宁市"
                        }, {
                            "code": 4207,
                            "name": "五指山市"
                        }, {
                            "code": 4206,
                            "name": "东方市"
                        }, {
                            "code": 4205,
                            "name": "文昌市"
                        }, {
                            "code": 4204,
                            "name": "儋州市"
                        }, {
                            "code": 4203,
                            "name": "琼海市"
                        }, {
                            "code": 4202,
                            "name": "三亚市"
                        }, {
                            "code": 4201,
                            "name": "海口市",
                            "sub": [{
                                "code": 420106,
                                "name": "高新区"
                            }, {
                                "code": 420105,
                                "name": "美兰区"
                            }, {
                                "code": 420104,
                                "name": "琼山区"
                            }, {
                                "code": 420103,
                                "name": "龙华区"
                            }, {
                                "code": 420102,
                                "name": "秀英区"
                            }]
                        }]
                    }, {
                        "code": 60,
                        "name": "重庆市",
                        "sub": [{
                            "code": 6001,
                            "name": "重庆市",
                            "sub": [{
                                "code": 600140,
                                "name": "彭水苗族县"
                            }, {
                                "code": 600139,
                                "name": "酉阳县"
                            }, {
                                "code": 600138,
                                "name": "秀山县"
                            }, {
                                "code": 600137,
                                "name": "石柱县"
                            }, {
                                "code": 600136,
                                "name": "巫溪县"
                            }, {
                                "code": 600135,
                                "name": "巫山县"
                            }, {
                                "code": 600134,
                                "name": "奉节县"
                            }, {
                                "code": 600133,
                                "name": "云阳县"
                            }, {
                                "code": 600132,
                                "name": "开县"
                            }, {
                                "code": 600131,
                                "name": "忠县"
                            }, {
                                "code": 600130,
                                "name": "武隆县"
                            }, {
                                "code": 600129,
                                "name": "垫江县"
                            }, {
                                "code": 600128,
                                "name": "丰都县"
                            }, {
                                "code": 600127,
                                "name": "城口县"
                            }, {
                                "code": 600126,
                                "name": "梁平县"
                            }, {
                                "code": 600125,
                                "name": "璧山县"
                            }, {
                                "code": 600124,
                                "name": "荣昌县"
                            }, {
                                "code": 600123,
                                "name": "大足县"
                            }, {
                                "code": 600122,
                                "name": "铜梁县"
                            }, {
                                "code": 600121,
                                "name": "潼南县"
                            }, {
                                "code": 600120,
                                "name": "綦江县"
                            }, {
                                "code": 600119,
                                "name": "南川区"
                            }, {
                                "code": 600118,
                                "name": "永川区"
                            }, {
                                "code": 600117,
                                "name": "合川区"
                            }, {
                                "code": 600116,
                                "name": "江津区"
                            }, {
                                "code": 600115,
                                "name": "长寿区"
                            }, {
                                "code": 600114,
                                "name": "黔江区"
                            }, {
                                "code": 600113,
                                "name": "巴南区"
                            }, {
                                "code": 600112,
                                "name": "渝北区"
                            }, {
                                "code": 600111,
                                "name": "双桥区"
                            }, {
                                "code": 600110,
                                "name": "万盛区"
                            }, {
                                "code": 600109,
                                "name": "北碚区"
                            }, {
                                "code": 600108,
                                "name": "南岸区"
                            }, {
                                "code": 600107,
                                "name": "九龙坡区"
                            }, {
                                "code": 600106,
                                "name": "沙坪坝区"
                            }, {
                                "code": 600105,
                                "name": "江北区"
                            }, {
                                "code": 600104,
                                "name": "大渡口区"
                            }, {
                                "code": 600103,
                                "name": "渝中区"
                            }, {
                                "code": 600102,
                                "name": "涪陵区"
                            }, {
                                "code": 600101,
                                "name": "万州区"
                            }]
                        }]
                    }, {
                        "code": 61,
                        "name": "四川省",
                        "sub": [{
                            "code": 6121,
                            "name": "凉山州",
                            "sub": [{
                                "code": 612117,
                                "name": "雷波县"
                            }, {
                                "code": 612116,
                                "name": "美姑县"
                            }, {
                                "code": 612115,
                                "name": "甘洛县"
                            }, {
                                "code": 612114,
                                "name": "越西县"
                            }, {
                                "code": 612113,
                                "name": "冕宁县"
                            }, {
                                "code": 612112,
                                "name": "喜德县"
                            }, {
                                "code": 612111,
                                "name": "昭觉县"
                            }, {
                                "code": 612110,
                                "name": "金阳县"
                            }, {
                                "code": 612109,
                                "name": "布拖县"
                            }, {
                                "code": 612108,
                                "name": "普格县"
                            }, {
                                "code": 612107,
                                "name": "宁南县"
                            }, {
                                "code": 612106,
                                "name": "会东县"
                            }, {
                                "code": 612105,
                                "name": "会理县"
                            }, {
                                "code": 612104,
                                "name": "德昌县"
                            }, {
                                "code": 612103,
                                "name": "盐源县"
                            }, {
                                "code": 612102,
                                "name": "木里县"
                            }, {
                                "code": 612101,
                                "name": "西昌市"
                            }]
                        }, {
                            "code": 6120,
                            "name": "甘孜州",
                            "sub": [{
                                "code": 612018,
                                "name": "得荣县"
                            }, {
                                "code": 612017,
                                "name": "稻城县"
                            }, {
                                "code": 612016,
                                "name": "乡城县"
                            }, {
                                "code": 612015,
                                "name": "巴塘县"
                            }, {
                                "code": 612014,
                                "name": "理塘县"
                            }, {
                                "code": 612013,
                                "name": "色达县"
                            }, {
                                "code": 612012,
                                "name": "石渠县"
                            }, {
                                "code": 612011,
                                "name": "白玉县"
                            }, {
                                "code": 612010,
                                "name": "德格县"
                            }, {
                                "code": 612009,
                                "name": "新龙县"
                            }, {
                                "code": 612008,
                                "name": "甘孜县"
                            }, {
                                "code": 612007,
                                "name": "炉霍县"
                            }, {
                                "code": 612006,
                                "name": "道孚县"
                            }, {
                                "code": 612005,
                                "name": "雅江县"
                            }, {
                                "code": 612004,
                                "name": "九龙县"
                            }, {
                                "code": 612003,
                                "name": "丹巴县"
                            }, {
                                "code": 612002,
                                "name": "泸定县"
                            }, {
                                "code": 612001,
                                "name": "康定县"
                            }]
                        }, {
                            "code": 6119,
                            "name": "攀枝花市",
                            "sub": [{
                                "code": 611906,
                                "name": "盐边县"
                            }, {
                                "code": 611905,
                                "name": "米易县"
                            }, {
                                "code": 611904,
                                "name": "仁和区"
                            }, {
                                "code": 611903,
                                "name": "西区"
                            }, {
                                "code": 611902,
                                "name": "东区"
                            }]
                        }, {
                            "code": 6118,
                            "name": "阿坝州",
                            "sub": [{
                                "code": 611813,
                                "name": "红原县"
                            }, {
                                "code": 611812,
                                "name": "若尔盖县"
                            }, {
                                "code": 611811,
                                "name": "阿坝县"
                            }, {
                                "code": 611810,
                                "name": "壤塘县"
                            }, {
                                "code": 611809,
                                "name": "马尔康县"
                            }, {
                                "code": 611808,
                                "name": "黑水县"
                            }, {
                                "code": 611807,
                                "name": "小金县"
                            }, {
                                "code": 611806,
                                "name": "金川县"
                            }, {
                                "code": 611805,
                                "name": "九寨沟县"
                            }, {
                                "code": 611804,
                                "name": "松潘县"
                            }, {
                                "code": 611803,
                                "name": "茂县"
                            }, {
                                "code": 611802,
                                "name": "理县"
                            }, {
                                "code": 611801,
                                "name": "汶川县"
                            }]
                        }, {
                            "code": 6117,
                            "name": "资阳市",
                            "sub": [{
                                "code": 611705,
                                "name": "简阳市"
                            }, {
                                "code": 611704,
                                "name": "乐至县"
                            }, {
                                "code": 611703,
                                "name": "安岳县"
                            }, {
                                "code": 611702,
                                "name": "雁江区"
                            }]
                        }, {
                            "code": 6116,
                            "name": "广安市",
                            "sub": [{
                                "code": 611606,
                                "name": "华蓥市"
                            }, {
                                "code": 611605,
                                "name": "邻水县"
                            }, {
                                "code": 611604,
                                "name": "武胜县"
                            }, {
                                "code": 611603,
                                "name": "岳池县"
                            }, {
                                "code": 611602,
                                "name": "广安区"
                            }]
                        }, {
                            "code": 6115,
                            "name": "广元市",
                            "sub": [{
                                "code": 611508,
                                "name": "苍溪县"
                            }, {
                                "code": 611507,
                                "name": "剑阁县"
                            }, {
                                "code": 611506,
                                "name": "青川县"
                            }, {
                                "code": 611505,
                                "name": "旺苍县"
                            }, {
                                "code": 611504,
                                "name": "朝天区"
                            }, {
                                "code": 611503,
                                "name": "元坝区"
                            }, {
                                "code": 611502,
                                "name": "市中区"
                            }]
                        }, {
                            "code": 6114,
                            "name": "巴中市",
                            "sub": [{
                                "code": 611405,
                                "name": "平昌县"
                            }, {
                                "code": 611404,
                                "name": "南江县"
                            }, {
                                "code": 611403,
                                "name": "通江县"
                            }, {
                                "code": 611402,
                                "name": "巴州区"
                            }]
                        }, {
                            "code": 6113,
                            "name": "达州市",
                            "sub": [{
                                "code": 611308,
                                "name": "万源市"
                            }, {
                                "code": 611307,
                                "name": "渠县"
                            }, {
                                "code": 611306,
                                "name": "大竹县"
                            }, {
                                "code": 611305,
                                "name": "开江县"
                            }, {
                                "code": 611304,
                                "name": "宣汉县"
                            }, {
                                "code": 611303,
                                "name": "达县"
                            }, {
                                "code": 611302,
                                "name": "通川区"
                            }]
                        }, {
                            "code": 6112,
                            "name": "遂宁市",
                            "sub": [{
                                "code": 611206,
                                "name": "大英县"
                            }, {
                                "code": 611205,
                                "name": "射洪县"
                            }, {
                                "code": 611204,
                                "name": "蓬溪县"
                            }, {
                                "code": 611203,
                                "name": "安居区"
                            }, {
                                "code": 611202,
                                "name": "船山区"
                            }]
                        }, {
                            "code": 6111,
                            "name": "雅安市",
                            "sub": [{
                                "code": 611109,
                                "name": "宝兴县"
                            }, {
                                "code": 611108,
                                "name": "芦山县"
                            }, {
                                "code": 611107,
                                "name": "天全县"
                            }, {
                                "code": 611106,
                                "name": "石棉县"
                            }, {
                                "code": 611105,
                                "name": "汉源县"
                            }, {
                                "code": 611104,
                                "name": "荥经县"
                            }, {
                                "code": 611103,
                                "name": "名山县"
                            }, {
                                "code": 611102,
                                "name": "雨城区"
                            }]
                        }, {
                            "code": 6110,
                            "name": "乐山市",
                            "sub": [{
                                "code": 611012,
                                "name": "峨眉山市"
                            }, {
                                "code": 611011,
                                "name": "马边县"
                            }, {
                                "code": 611010,
                                "name": "峨边县"
                            }, {
                                "code": 611009,
                                "name": "沐川县"
                            }, {
                                "code": 611008,
                                "name": "夹江县"
                            }, {
                                "code": 611007,
                                "name": "井研县"
                            }, {
                                "code": 611006,
                                "name": "犍为县"
                            }, {
                                "code": 611005,
                                "name": "金口河区"
                            }, {
                                "code": 611004,
                                "name": "五通桥区"
                            }, {
                                "code": 611003,
                                "name": "沙湾区"
                            }, {
                                "code": 611002,
                                "name": "市中区"
                            }]
                        }, {
                            "code": 6109,
                            "name": "宜宾市",
                            "sub": [{
                                "code": 610911,
                                "name": "屏山县"
                            }, {
                                "code": 610910,
                                "name": "兴文县"
                            }, {
                                "code": 610909,
                                "name": "筠连县"
                            }, {
                                "code": 610908,
                                "name": "珙县"
                            }, {
                                "code": 610907,
                                "name": "高县"
                            }, {
                                "code": 610906,
                                "name": "长宁县"
                            }, {
                                "code": 610905,
                                "name": "江安县"
                            }, {
                                "code": 610904,
                                "name": "南溪县"
                            }, {
                                "code": 610903,
                                "name": "宜宾县"
                            }, {
                                "code": 610902,
                                "name": "翠屏区"
                            }]
                        }, {
                            "code": 6108,
                            "name": "内江市",
                            "sub": [{
                                "code": 610806,
                                "name": "隆昌县"
                            }, {
                                "code": 610805,
                                "name": "资中县"
                            }, {
                                "code": 610804,
                                "name": "威远县"
                            }, {
                                "code": 610803,
                                "name": "东兴区"
                            }, {
                                "code": 610802,
                                "name": "市中区"
                            }]
                        }, {
                            "code": 6107,
                            "name": "自贡市",
                            "sub": [{
                                "code": 610708,
                                "name": "高新区"
                            }, {
                                "code": 610707,
                                "name": "富顺县"
                            }, {
                                "code": 610706,
                                "name": "荣县"
                            }, {
                                "code": 610705,
                                "name": "沿滩区"
                            }, {
                                "code": 610704,
                                "name": "大安区"
                            }, {
                                "code": 610703,
                                "name": "贡井区"
                            }, {
                                "code": 610702,
                                "name": "自流井区"
                            }]
                        }, {
                            "code": 6106,
                            "name": "南充市",
                            "sub": [{
                                "code": 610610,
                                "name": "阆中市"
                            }, {
                                "code": 610609,
                                "name": "西充县"
                            }, {
                                "code": 610608,
                                "name": "仪陇县"
                            }, {
                                "code": 610607,
                                "name": "蓬安县"
                            }, {
                                "code": 610606,
                                "name": "营山县"
                            }, {
                                "code": 610605,
                                "name": "南部县"
                            }, {
                                "code": 610604,
                                "name": "嘉陵区"
                            }, {
                                "code": 610603,
                                "name": "高坪区"
                            }, {
                                "code": 610602,
                                "name": "顺庆区"
                            }]
                        }, {
                            "code": 6105,
                            "name": "泸州市",
                            "sub": [{
                                "code": 610508,
                                "name": "古蔺县"
                            }, {
                                "code": 610507,
                                "name": "叙永县"
                            }, {
                                "code": 610506,
                                "name": "合江县"
                            }, {
                                "code": 610505,
                                "name": "泸县"
                            }, {
                                "code": 610504,
                                "name": "龙马潭区"
                            }, {
                                "code": 610503,
                                "name": "纳溪区"
                            }, {
                                "code": 610502,
                                "name": "江阳区"
                            }]
                        }, {
                            "code": 6104,
                            "name": "眉山市",
                            "sub": [{
                                "code": 610407,
                                "name": "青神县"
                            }, {
                                "code": 610406,
                                "name": "丹棱县"
                            }, {
                                "code": 610405,
                                "name": "洪雅县"
                            }, {
                                "code": 610404,
                                "name": "彭山县"
                            }, {
                                "code": 610403,
                                "name": "仁寿县"
                            }, {
                                "code": 610402,
                                "name": "东坡区"
                            }]
                        }, {
                            "code": 6103,
                            "name": "绵阳市",
                            "sub": [{
                                "code": 610311,
                                "name": "高新区"
                            }, {
                                "code": 610310,
                                "name": "江油市"
                            }, {
                                "code": 610309,
                                "name": "平武县"
                            }, {
                                "code": 610308,
                                "name": "北川县"
                            }, {
                                "code": 610307,
                                "name": "梓潼县"
                            }, {
                                "code": 610306,
                                "name": "安县"
                            }, {
                                "code": 610305,
                                "name": "盐亭县"
                            }, {
                                "code": 610304,
                                "name": "三台县"
                            }, {
                                "code": 610303,
                                "name": "游仙区"
                            }, {
                                "code": 610302,
                                "name": "涪城区"
                            }]
                        }, {
                            "code": 6102,
                            "name": "德阳市",
                            "sub": [{
                                "code": 610207,
                                "name": "绵竹市"
                            }, {
                                "code": 610206,
                                "name": "什邡市"
                            }, {
                                "code": 610205,
                                "name": "广汉市"
                            }, {
                                "code": 610204,
                                "name": "罗江县"
                            }, {
                                "code": 610203,
                                "name": "中江县"
                            }, {
                                "code": 610202,
                                "name": "旌阳区"
                            }]
                        }, {
                            "code": 6101,
                            "name": "成都市",
                            "sub": [{
                                "code": 610121,
                                "name": "高新区"
                            }, {
                                "code": 610120,
                                "name": "崇州市"
                            }, {
                                "code": 610119,
                                "name": "邛崃市"
                            }, {
                                "code": 610118,
                                "name": "彭州市"
                            }, {
                                "code": 610117,
                                "name": "都江堰市"
                            }, {
                                "code": 610116,
                                "name": "新津县"
                            }, {
                                "code": 610115,
                                "name": "蒲江县"
                            }, {
                                "code": 610114,
                                "name": "大邑县"
                            }, {
                                "code": 610113,
                                "name": "郫县"
                            }, {
                                "code": 610112,
                                "name": "双流县"
                            }, {
                                "code": 610111,
                                "name": "金堂县"
                            }, {
                                "code": 610110,
                                "name": "温江区"
                            }, {
                                "code": 610109,
                                "name": "新都区"
                            }, {
                                "code": 610108,
                                "name": "青白江区"
                            }, {
                                "code": 610107,
                                "name": "龙泉驿区"
                            }, {
                                "code": 610106,
                                "name": "成华区"
                            }, {
                                "code": 610105,
                                "name": "武侯区"
                            }, {
                                "code": 610104,
                                "name": "金牛区"
                            }, {
                                "code": 610103,
                                "name": "青羊区"
                            }, {
                                "code": 610102,
                                "name": "锦江区"
                            }]
                        }]
                    }, {
                        "code": 62,
                        "name": "云南省",
                        "sub": [{
                            "code": 6216,
                            "name": "临沧市",
                            "sub": [{
                                "code": 621609,
                                "name": "沧源县"
                            }, {
                                "code": 621608,
                                "name": "耿马傣族县"
                            }, {
                                "code": 621607,
                                "name": "双江县"
                            }, {
                                "code": 621606,
                                "name": "镇康县"
                            }, {
                                "code": 621605,
                                "name": "永德县"
                            }, {
                                "code": 621604,
                                "name": "云县"
                            }, {
                                "code": 621603,
                                "name": "凤庆县"
                            }, {
                                "code": 621602,
                                "name": "临翔区"
                            }]
                        }, {
                            "code": 6215,
                            "name": "怒江",
                            "sub": [{
                                "code": 621504,
                                "name": "兰坪县"
                            }, {
                                "code": 621503,
                                "name": "贡山县"
                            }, {
                                "code": 621502,
                                "name": "福贡县"
                            }, {
                                "code": 621501,
                                "name": "泸水县"
                            }]
                        }, {
                            "code": 6214,
                            "name": "德宏",
                            "sub": [{
                                "code": 621405,
                                "name": "陇川县"
                            }, {
                                "code": 621404,
                                "name": "盈江县"
                            }, {
                                "code": 621403,
                                "name": "梁河县"
                            }, {
                                "code": 621402,
                                "name": "潞西市"
                            }, {
                                "code": 621401,
                                "name": "瑞丽市"
                            }]
                        }, {
                            "code": 6213,
                            "name": "保山市",
                            "sub": [{
                                "code": 621306,
                                "name": "昌宁县"
                            }, {
                                "code": 621305,
                                "name": "龙陵县"
                            }, {
                                "code": 621304,
                                "name": "腾冲县"
                            }, {
                                "code": 621303,
                                "name": "施甸县"
                            }, {
                                "code": 621302,
                                "name": "隆阳区"
                            }]
                        }, {
                            "code": 6212,
                            "name": "大理",
                            "sub": [{
                                "code": 621212,
                                "name": "鹤庆县"
                            }, {
                                "code": 621211,
                                "name": "剑川县"
                            }, {
                                "code": 621210,
                                "name": "洱源县"
                            }, {
                                "code": 621209,
                                "name": "云龙县"
                            }, {
                                "code": 621208,
                                "name": "永平县"
                            }, {
                                "code": 621207,
                                "name": "巍山彝族县"
                            }, {
                                "code": 621206,
                                "name": "南涧县"
                            }, {
                                "code": 621205,
                                "name": "弥渡县"
                            }, {
                                "code": 621204,
                                "name": "宾川县"
                            }, {
                                "code": 621203,
                                "name": "祥云县"
                            }, {
                                "code": 621202,
                                "name": "漾濞县"
                            }, {
                                "code": 621201,
                                "name": "大理市"
                            }]
                        }, {
                            "code": 6211,
                            "name": "普洱市",
                            "sub": [{
                                "code": 621111,
                                "name": "西盟县"
                            }, {
                                "code": 621110,
                                "name": "澜沧县"
                            }, {
                                "code": 621109,
                                "name": "孟连县"
                            }, {
                                "code": 621108,
                                "name": "江城哈尼族县"
                            }, {
                                "code": 621107,
                                "name": "镇沅县"
                            }, {
                                "code": 621106,
                                "name": "景谷傣族县"
                            }, {
                                "code": 621105,
                                "name": "景东县"
                            }, {
                                "code": 621104,
                                "name": "墨江县"
                            }, {
                                "code": 621103,
                                "name": "宁洱哈尼族县"
                            }, {
                                "code": 621102,
                                "name": "思茅区"
                            }]
                        }, {
                            "code": 6210,
                            "name": "西双版纳州",
                            "sub": [{
                                "code": 621003,
                                "name": "勐腊县"
                            }, {
                                "code": 621002,
                                "name": "勐海县"
                            }, {
                                "code": 621001,
                                "name": "景洪市"
                            }]
                        }, {
                            "code": 6209,
                            "name": "文山州",
                            "sub": [{
                                "code": 620908,
                                "name": "富宁县"
                            }, {
                                "code": 620907,
                                "name": "广南县"
                            }, {
                                "code": 620906,
                                "name": "丘北县"
                            }, {
                                "code": 620905,
                                "name": "马关县"
                            }, {
                                "code": 620904,
                                "name": "麻栗坡县"
                            }, {
                                "code": 620903,
                                "name": "西畴县"
                            }, {
                                "code": 620902,
                                "name": "砚山县"
                            }, {
                                "code": 620901,
                                "name": "文山县"
                            }]
                        }, {
                            "code": 6208,
                            "name": "迪庆州",
                            "sub": [{
                                "code": 620803,
                                "name": "维西县"
                            }, {
                                "code": 620802,
                                "name": "德钦县"
                            }, {
                                "code": 620801,
                                "name": "香格里拉县"
                            }]
                        }, {
                            "code": 6207,
                            "name": "丽江市",
                            "sub": [{
                                "code": 620706,
                                "name": "宁蒗县"
                            }, {
                                "code": 620705,
                                "name": "华坪县"
                            }, {
                                "code": 620704,
                                "name": "永胜县"
                            }, {
                                "code": 620703,
                                "name": "玉龙县"
                            }, {
                                "code": 620702,
                                "name": "古城区"
                            }]
                        }, {
                            "code": 6206,
                            "name": "红河哈尼族州",
                            "sub": [{
                                "code": 620613,
                                "name": "河口县"
                            }, {
                                "code": 620612,
                                "name": "绿春县"
                            }, {
                                "code": 620611,
                                "name": "金平县"
                            }, {
                                "code": 620610,
                                "name": "红河县"
                            }, {
                                "code": 620609,
                                "name": "元阳县"
                            }, {
                                "code": 620608,
                                "name": "泸西县"
                            }, {
                                "code": 620607,
                                "name": "弥勒县"
                            }, {
                                "code": 620606,
                                "name": "石屏县"
                            }, {
                                "code": 620605,
                                "name": "建水县"
                            }, {
                                "code": 620604,
                                "name": "屏边县"
                            }, {
                                "code": 620603,
                                "name": "蒙自县"
                            }, {
                                "code": 620602,
                                "name": "开远市"
                            }, {
                                "code": 620601,
                                "name": "个旧市"
                            }]
                        }, {
                            "code": 6205,
                            "name": "楚雄州",
                            "sub": [{
                                "code": 620510,
                                "name": "禄丰县"
                            }, {
                                "code": 620509,
                                "name": "武定县"
                            }, {
                                "code": 620508,
                                "name": "元谋县"
                            }, {
                                "code": 620507,
                                "name": "永仁县"
                            }, {
                                "code": 620506,
                                "name": "大姚县"
                            }, {
                                "code": 620505,
                                "name": "姚安县"
                            }, {
                                "code": 620504,
                                "name": "南华县"
                            }, {
                                "code": 620503,
                                "name": "牟定县"
                            }, {
                                "code": 620502,
                                "name": "双柏县"
                            }, {
                                "code": 620501,
                                "name": "楚雄市"
                            }]
                        }, {
                            "code": 6204,
                            "name": "昭通市",
                            "sub": [{
                                "code": 620412,
                                "name": "水富县"
                            }, {
                                "code": 620411,
                                "name": "威信县"
                            }, {
                                "code": 620410,
                                "name": "彝良县"
                            }, {
                                "code": 620409,
                                "name": "镇雄县"
                            }, {
                                "code": 620408,
                                "name": "绥江县"
                            }, {
                                "code": 620407,
                                "name": "永善县"
                            }, {
                                "code": 620406,
                                "name": "大关县"
                            }, {
                                "code": 620405,
                                "name": "盐津县"
                            }, {
                                "code": 620404,
                                "name": "巧家县"
                            }, {
                                "code": 620403,
                                "name": "鲁甸县"
                            }, {
                                "code": 620402,
                                "name": "昭阳区"
                            }]
                        }, {
                            "code": 6203,
                            "name": "玉溪市",
                            "sub": [{
                                "code": 620310,
                                "name": "元江哈尼族县"
                            }, {
                                "code": 620309,
                                "name": "新平县"
                            }, {
                                "code": 620308,
                                "name": "峨山县"
                            }, {
                                "code": 620307,
                                "name": "易门县"
                            }, {
                                "code": 620306,
                                "name": "华宁县"
                            }, {
                                "code": 620305,
                                "name": "通海县"
                            }, {
                                "code": 620304,
                                "name": "澄江县"
                            }, {
                                "code": 620303,
                                "name": "江川县"
                            }, {
                                "code": 620302,
                                "name": "红塔区"
                            }]
                        }, {
                            "code": 6202,
                            "name": "曲靖市",
                            "sub": [{
                                "code": 620210,
                                "name": "宣威市"
                            }, {
                                "code": 620209,
                                "name": "沾益县"
                            }, {
                                "code": 620208,
                                "name": "会泽县"
                            }, {
                                "code": 620207,
                                "name": "富源县"
                            }, {
                                "code": 620206,
                                "name": "罗平县"
                            }, {
                                "code": 620205,
                                "name": "师宗县"
                            }, {
                                "code": 620204,
                                "name": "陆良县"
                            }, {
                                "code": 620203,
                                "name": "马龙县"
                            }, {
                                "code": 620202,
                                "name": "麒麟区"
                            }]
                        }, {
                            "code": 6201,
                            "name": "昆明市",
                            "sub": [{
                                "code": 620115,
                                "name": "安宁市"
                            }, {
                                "code": 620114,
                                "name": "寻甸回族县"
                            }, {
                                "code": 620113,
                                "name": "禄劝县"
                            }, {
                                "code": 620112,
                                "name": "嵩明县"
                            }, {
                                "code": 620111,
                                "name": "石林县"
                            }, {
                                "code": 620110,
                                "name": "宜良县"
                            }, {
                                "code": 620109,
                                "name": "富民县"
                            }, {
                                "code": 620108,
                                "name": "晋宁县"
                            }, {
                                "code": 620107,
                                "name": "呈贡县"
                            }, {
                                "code": 620106,
                                "name": "东川区"
                            }, {
                                "code": 620105,
                                "name": "西山区"
                            }, {
                                "code": 620104,
                                "name": "官渡区"
                            }, {
                                "code": 620103,
                                "name": "盘龙区"
                            }, {
                                "code": 620102,
                                "name": "五华区"
                            }]
                        }]
                    }, {
                        "code": 63,
                        "name": "贵州省",
                        "sub": [{
                            "code": 6309,
                            "name": "黔东南",
                            "sub": [{
                                "code": 630916,
                                "name": "丹寨县"
                            }, {
                                "code": 630915,
                                "name": "麻江县"
                            }, {
                                "code": 630914,
                                "name": "雷山县"
                            }, {
                                "code": 630913,
                                "name": "从江县"
                            }, {
                                "code": 630912,
                                "name": "榕江县"
                            }, {
                                "code": 630911,
                                "name": "黎平县"
                            }, {
                                "code": 630910,
                                "name": "台江县"
                            }, {
                                "code": 630909,
                                "name": "剑河县"
                            }, {
                                "code": 630908,
                                "name": "锦屏县"
                            }, {
                                "code": 630907,
                                "name": "天柱县"
                            }, {
                                "code": 630906,
                                "name": "岑巩县"
                            }, {
                                "code": 630905,
                                "name": "镇远县"
                            }, {
                                "code": 630904,
                                "name": "三穗县"
                            }, {
                                "code": 630903,
                                "name": "施秉县"
                            }, {
                                "code": 630902,
                                "name": "黄平县"
                            }, {
                                "code": 630901,
                                "name": "凯里市"
                            }]
                        }, {
                            "code": 6308,
                            "name": "毕节地区",
                            "sub": [{
                                "code": 630808,
                                "name": "赫章县"
                            }, {
                                "code": 630807,
                                "name": "威宁县"
                            }, {
                                "code": 630806,
                                "name": "纳雍县"
                            }, {
                                "code": 630805,
                                "name": "织金县"
                            }, {
                                "code": 630804,
                                "name": "金沙县"
                            }, {
                                "code": 630803,
                                "name": "黔西县"
                            }, {
                                "code": 630802,
                                "name": "大方县"
                            }, {
                                "code": 630801,
                                "name": "毕节市"
                            }]
                        }, {
                            "code": 6307,
                            "name": "铜仁地区",
                            "sub": [{
                                "code": 630710,
                                "name": "万山特区"
                            }, {
                                "code": 630709,
                                "name": "松桃县"
                            }, {
                                "code": 630708,
                                "name": "沿河县"
                            }, {
                                "code": 630707,
                                "name": "德江县"
                            }, {
                                "code": 630706,
                                "name": "印江县"
                            }, {
                                "code": 630705,
                                "name": "思南县"
                            }, {
                                "code": 630704,
                                "name": "石阡县"
                            }, {
                                "code": 630703,
                                "name": "玉屏县"
                            }, {
                                "code": 630702,
                                "name": "江口县"
                            }, {
                                "code": 630701,
                                "name": "铜仁市"
                            }]
                        }, {
                            "code": 6306,
                            "name": "黔南",
                            "sub": [{
                                "code": 630612,
                                "name": "三都县"
                            }, {
                                "code": 630611,
                                "name": "惠水县"
                            }, {
                                "code": 630610,
                                "name": "龙里县"
                            }, {
                                "code": 630609,
                                "name": "长顺县"
                            }, {
                                "code": 630608,
                                "name": "罗甸县"
                            }, {
                                "code": 630607,
                                "name": "平塘县"
                            }, {
                                "code": 630606,
                                "name": "独山县"
                            }, {
                                "code": 630605,
                                "name": "瓮安县"
                            }, {
                                "code": 630604,
                                "name": "贵定县"
                            }, {
                                "code": 630603,
                                "name": "荔波县"
                            }, {
                                "code": 630602,
                                "name": "福泉市"
                            }, {
                                "code": 630601,
                                "name": "都匀市"
                            }]
                        }, {
                            "code": 6305,
                            "name": "黔西南",
                            "sub": [{
                                "code": 630508,
                                "name": "安龙县"
                            }, {
                                "code": 630507,
                                "name": "册亨县"
                            }, {
                                "code": 630506,
                                "name": "望谟县"
                            }, {
                                "code": 630505,
                                "name": "贞丰县"
                            }, {
                                "code": 630504,
                                "name": "晴隆县"
                            }, {
                                "code": 630503,
                                "name": "普安县"
                            }, {
                                "code": 630502,
                                "name": "兴仁县"
                            }, {
                                "code": 630501,
                                "name": "兴义市"
                            }]
                        }, {
                            "code": 6304,
                            "name": "安顺市",
                            "sub": [{
                                "code": 630407,
                                "name": "紫云县"
                            }, {
                                "code": 630406,
                                "name": "关岭布依族县"
                            }, {
                                "code": 630405,
                                "name": "镇宁布依族县"
                            }, {
                                "code": 630404,
                                "name": "普定县"
                            }, {
                                "code": 630403,
                                "name": "平坝县"
                            }, {
                                "code": 630402,
                                "name": "西秀区"
                            }]
                        }, {
                            "code": 6303,
                            "name": "六盘水市",
                            "sub": [{
                                "code": 630304,
                                "name": "盘县"
                            }, {
                                "code": 630303,
                                "name": "水城县"
                            }, {
                                "code": 630302,
                                "name": "六枝特区"
                            }, {
                                "code": 630301,
                                "name": "钟山区"
                            }]
                        }, {
                            "code": 6302,
                            "name": "遵义市",
                            "sub": [{
                                "code": 630215,
                                "name": "仁怀市"
                            }, {
                                "code": 630214,
                                "name": "赤水市"
                            }, {
                                "code": 630213,
                                "name": "习水县"
                            }, {
                                "code": 630212,
                                "name": "余庆县"
                            }, {
                                "code": 630211,
                                "name": "湄潭县"
                            }, {
                                "code": 630210,
                                "name": "凤冈县"
                            }, {
                                "code": 630209,
                                "name": "务川仡佬族县"
                            }, {
                                "code": 630208,
                                "name": "道真仡佬族县"
                            }, {
                                "code": 630207,
                                "name": "正安县"
                            }, {
                                "code": 630206,
                                "name": "绥阳县"
                            }, {
                                "code": 630205,
                                "name": "桐梓县"
                            }, {
                                "code": 630204,
                                "name": "遵义县"
                            }, {
                                "code": 630203,
                                "name": "汇川区"
                            }, {
                                "code": 630202,
                                "name": "红花岗区"
                            }]
                        }, {
                            "code": 6301,
                            "name": "贵阳市",
                            "sub": [{
                                "code": 630111,
                                "name": "清镇市"
                            }, {
                                "code": 630110,
                                "name": "修文县"
                            }, {
                                "code": 630109,
                                "name": "息烽县"
                            }, {
                                "code": 630108,
                                "name": "开阳县"
                            }, {
                                "code": 630107,
                                "name": "小河区"
                            }, {
                                "code": 630106,
                                "name": "白云区"
                            }, {
                                "code": 630105,
                                "name": "乌当区"
                            }, {
                                "code": 630104,
                                "name": "花溪区"
                            }, {
                                "code": 630103,
                                "name": "云岩区"
                            }, {
                                "code": 630102,
                                "name": "南明区"
                            }]
                        }]
                    }, {
                        "code": 64,
                        "name": "西藏",
                        "sub": [{
                            "code": 6407,
                            "name": "阿里地区",
                            "sub": [{
                                "code": 640707,
                                "name": "措勤县"
                            }, {
                                "code": 640706,
                                "name": "改则县"
                            }, {
                                "code": 640705,
                                "name": "革吉县"
                            }, {
                                "code": 640704,
                                "name": "日土县"
                            }, {
                                "code": 640703,
                                "name": "噶尔县"
                            }, {
                                "code": 640702,
                                "name": "札达县"
                            }, {
                                "code": 640701,
                                "name": "普兰县"
                            }]
                        }, {
                            "code": 6406,
                            "name": "那曲地区",
                            "sub": [{
                                "code": 640610,
                                "name": "尼玛县"
                            }, {
                                "code": 640609,
                                "name": "巴青县"
                            }, {
                                "code": 640608,
                                "name": "班戈县"
                            }, {
                                "code": 640607,
                                "name": "索县"
                            }, {
                                "code": 640606,
                                "name": "申扎县"
                            }, {
                                "code": 640605,
                                "name": "安多县"
                            }, {
                                "code": 640604,
                                "name": "聂荣县"
                            }, {
                                "code": 640603,
                                "name": "比如县"
                            }, {
                                "code": 640602,
                                "name": "嘉黎县"
                            }, {
                                "code": 640601,
                                "name": "那曲县"
                            }]
                        }, {
                            "code": 6405,
                            "name": "昌都地区",
                            "sub": [{
                                "code": 640511,
                                "name": "边坝县"
                            }, {
                                "code": 640510,
                                "name": "洛隆县"
                            }, {
                                "code": 640509,
                                "name": "芒康县"
                            }, {
                                "code": 640508,
                                "name": "左贡县"
                            }, {
                                "code": 640507,
                                "name": "八宿县"
                            }, {
                                "code": 640506,
                                "name": "察雅县"
                            }, {
                                "code": 640505,
                                "name": "丁青县"
                            }, {
                                "code": 640504,
                                "name": "类乌齐县"
                            }, {
                                "code": 640503,
                                "name": "贡觉县"
                            }, {
                                "code": 640502,
                                "name": "江达县"
                            }, {
                                "code": 640501,
                                "name": "昌都县"
                            }]
                        }, {
                            "code": 6404,
                            "name": "林芝地区",
                            "sub": [{
                                "code": 640407,
                                "name": "朗县"
                            }, {
                                "code": 640406,
                                "name": "察隅县"
                            }, {
                                "code": 640405,
                                "name": "波密县"
                            }, {
                                "code": 640404,
                                "name": "墨脱县"
                            }, {
                                "code": 640403,
                                "name": "米林县"
                            }, {
                                "code": 640402,
                                "name": "工布江达县"
                            }, {
                                "code": 640401,
                                "name": "林芝县"
                            }]
                        }, {
                            "code": 6403,
                            "name": "山南地区",
                            "sub": [{
                                "code": 640312,
                                "name": "浪卡子县"
                            }, {
                                "code": 640311,
                                "name": "错那县"
                            }, {
                                "code": 640310,
                                "name": "隆子县"
                            }, {
                                "code": 640309,
                                "name": "加查县"
                            }, {
                                "code": 640308,
                                "name": "洛扎县"
                            }, {
                                "code": 640307,
                                "name": "措美县"
                            }, {
                                "code": 640306,
                                "name": "曲松县"
                            }, {
                                "code": 640305,
                                "name": "琼结县"
                            }, {
                                "code": 640304,
                                "name": "桑日县"
                            }, {
                                "code": 640303,
                                "name": "贡嘎县"
                            }, {
                                "code": 640302,
                                "name": "扎囊县"
                            }, {
                                "code": 640301,
                                "name": "乃东县"
                            }]
                        }, {
                            "code": 6402,
                            "name": "日喀则地区",
                            "sub": [{
                                "code": 640218,
                                "name": "岗巴县"
                            }, {
                                "code": 640217,
                                "name": "萨嘎县"
                            }, {
                                "code": 640216,
                                "name": "聂拉木县"
                            }, {
                                "code": 640215,
                                "name": "吉隆县"
                            }, {
                                "code": 640214,
                                "name": "亚东县"
                            }, {
                                "code": 640213,
                                "name": "仲巴县"
                            }, {
                                "code": 640212,
                                "name": "定结县"
                            }, {
                                "code": 640211,
                                "name": "康马县"
                            }, {
                                "code": 640210,
                                "name": "仁布县"
                            }, {
                                "code": 640209,
                                "name": "白朗县"
                            }, {
                                "code": 640208,
                                "name": "谢通门县"
                            }, {
                                "code": 640207,
                                "name": "昂仁县"
                            }, {
                                "code": 640206,
                                "name": "拉孜县"
                            }, {
                                "code": 640205,
                                "name": "萨迦县"
                            }, {
                                "code": 640204,
                                "name": "定日县"
                            }, {
                                "code": 640203,
                                "name": "江孜县"
                            }, {
                                "code": 640202,
                                "name": "南木林县"
                            }, {
                                "code": 640201,
                                "name": "日喀则市"
                            }]
                        }, {
                            "code": 6401,
                            "name": "拉萨市",
                            "sub": [{
                                "code": 640109,
                                "name": "墨竹工卡县"
                            }, {
                                "code": 640108,
                                "name": "达孜县"
                            }, {
                                "code": 640107,
                                "name": "堆龙德庆县"
                            }, {
                                "code": 640106,
                                "name": "曲水县"
                            }, {
                                "code": 640105,
                                "name": "尼木县"
                            }, {
                                "code": 640104,
                                "name": "当雄县"
                            }, {
                                "code": 640103,
                                "name": "林周县"
                            }, {
                                "code": 640102,
                                "name": "城关区"
                            }]
                        }]
                    }, {
                        "code": 70,
                        "name": "河南省",
                        "sub": [{
                            "code": 7018,
                            "name": "济源市"
                        }, {
                            "code": 7017,
                            "name": "信阳市",
                            "sub": [{
                                "code": 701711,
                                "name": "息县"
                            }, {
                                "code": 701710,
                                "name": "淮滨县"
                            }, {
                                "code": 701709,
                                "name": "潢川县"
                            }, {
                                "code": 701708,
                                "name": "固始县"
                            }, {
                                "code": 701707,
                                "name": "商城县"
                            }, {
                                "code": 701706,
                                "name": "新县"
                            }, {
                                "code": 701705,
                                "name": "光山县"
                            }, {
                                "code": 701704,
                                "name": "罗山县"
                            }, {
                                "code": 701703,
                                "name": "平桥区"
                            }, {
                                "code": 701702,
                                "name": "浉河区"
                            }]
                        }, {
                            "code": 7016,
                            "name": "南阳市",
                            "sub": [{
                                "code": 701615,
                                "name": "高新区"
                            }, {
                                "code": 701614,
                                "name": "邓州市"
                            }, {
                                "code": 701613,
                                "name": "桐柏县"
                            }, {
                                "code": 701612,
                                "name": "新野县"
                            }, {
                                "code": 701611,
                                "name": "唐河县"
                            }, {
                                "code": 701610,
                                "name": "社旗县"
                            }, {
                                "code": 701609,
                                "name": "淅川县"
                            }, {
                                "code": 701608,
                                "name": "内乡县"
                            }, {
                                "code": 701607,
                                "name": "镇平县"
                            }, {
                                "code": 701606,
                                "name": "西峡县"
                            }, {
                                "code": 701605,
                                "name": "方城县"
                            }, {
                                "code": 701604,
                                "name": "南召县"
                            }, {
                                "code": 701603,
                                "name": "卧龙区"
                            }, {
                                "code": 701602,
                                "name": "宛城区"
                            }]
                        }, {
                            "code": 7015,
                            "name": "周口市",
                            "sub": [{
                                "code": 701511,
                                "name": "项城市"
                            }, {
                                "code": 701510,
                                "name": "鹿邑县"
                            }, {
                                "code": 701509,
                                "name": "太康县"
                            }, {
                                "code": 701508,
                                "name": "淮阳县"
                            }, {
                                "code": 701507,
                                "name": "郸城县"
                            }, {
                                "code": 701506,
                                "name": "沈丘县"
                            }, {
                                "code": 701505,
                                "name": "商水县"
                            }, {
                                "code": 701504,
                                "name": "西华县"
                            }, {
                                "code": 701503,
                                "name": "扶沟县"
                            }, {
                                "code": 701502,
                                "name": "川汇区"
                            }]
                        }, {
                            "code": 7014,
                            "name": "驻马店市",
                            "sub": [{
                                "code": 701411,
                                "name": "新蔡县"
                            }, {
                                "code": 701410,
                                "name": "遂平县"
                            }, {
                                "code": 701409,
                                "name": "汝南县"
                            }, {
                                "code": 701408,
                                "name": "泌阳县"
                            }, {
                                "code": 701407,
                                "name": "确山县"
                            }, {
                                "code": 701406,
                                "name": "正阳县"
                            }, {
                                "code": 701405,
                                "name": "平舆县"
                            }, {
                                "code": 701404,
                                "name": "上蔡县"
                            }, {
                                "code": 701403,
                                "name": "西平县"
                            }, {
                                "code": 701402,
                                "name": "驿城区"
                            }]
                        }, {
                            "code": 7013,
                            "name": "平顶山市",
                            "sub": [{
                                "code": 701311,
                                "name": "汝州市"
                            }, {
                                "code": 701310,
                                "name": "舞钢市"
                            }, {
                                "code": 701309,
                                "name": "郏县"
                            }, {
                                "code": 701308,
                                "name": "鲁山县"
                            }, {
                                "code": 701307,
                                "name": "叶县"
                            }, {
                                "code": 701306,
                                "name": "宝丰县"
                            }, {
                                "code": 701305,
                                "name": "湛河区"
                            }, {
                                "code": 701304,
                                "name": "石龙区"
                            }, {
                                "code": 701303,
                                "name": "卫东区"
                            }, {
                                "code": 701302,
                                "name": "新华区"
                            }]
                        }, {
                            "code": 7012,
                            "name": "漯河市",
                            "sub": [{
                                "code": 701206,
                                "name": "临颍县"
                            }, {
                                "code": 701205,
                                "name": "舞阳县"
                            }, {
                                "code": 701204,
                                "name": "召陵区"
                            }, {
                                "code": 701203,
                                "name": "郾城区"
                            }, {
                                "code": 701202,
                                "name": "源汇区"
                            }]
                        }, {
                            "code": 7011,
                            "name": "许昌市",
                            "sub": [{
                                "code": 701107,
                                "name": "长葛市"
                            }, {
                                "code": 701106,
                                "name": "禹州市"
                            }, {
                                "code": 701105,
                                "name": "襄城县"
                            }, {
                                "code": 701104,
                                "name": "鄢陵县"
                            }, {
                                "code": 701103,
                                "name": "许昌县"
                            }, {
                                "code": 701102,
                                "name": "魏都区"
                            }]
                        }, {
                            "code": 7010,
                            "name": "商丘市",
                            "sub": [{
                                "code": 701010,
                                "name": "永城市"
                            }, {
                                "code": 701009,
                                "name": "夏邑县"
                            }, {
                                "code": 701008,
                                "name": "虞城县"
                            }, {
                                "code": 701007,
                                "name": "柘城县"
                            }, {
                                "code": 701006,
                                "name": "宁陵县"
                            }, {
                                "code": 701005,
                                "name": "睢县"
                            }, {
                                "code": 701004,
                                "name": "民权县"
                            }, {
                                "code": 701003,
                                "name": "睢阳区"
                            }, {
                                "code": 701002,
                                "name": "梁园区"
                            }]
                        }, {
                            "code": 7009,
                            "name": "三门峡市",
                            "sub": [{
                                "code": 700907,
                                "name": "灵宝市"
                            }, {
                                "code": 700906,
                                "name": "义马市"
                            }, {
                                "code": 700905,
                                "name": "卢氏县"
                            }, {
                                "code": 700904,
                                "name": "陕县"
                            }, {
                                "code": 700903,
                                "name": "渑池县"
                            }, {
                                "code": 700902,
                                "name": "湖滨区"
                            }]
                        }, {
                            "code": 7008,
                            "name": "鹤壁市",
                            "sub": [{
                                "code": 700806,
                                "name": "淇县"
                            }, {
                                "code": 700805,
                                "name": "浚县"
                            }, {
                                "code": 700804,
                                "name": "淇滨区"
                            }, {
                                "code": 700803,
                                "name": "山城区"
                            }, {
                                "code": 700802,
                                "name": "鹤山区"
                            }]
                        }, {
                            "code": 7007,
                            "name": "焦作市",
                            "sub": [{
                                "code": 700711,
                                "name": "孟州市"
                            }, {
                                "code": 700710,
                                "name": "沁阳市"
                            }, {
                                "code": 700709,
                                "name": "温县"
                            }, {
                                "code": 700708,
                                "name": "武陟县"
                            }, {
                                "code": 700707,
                                "name": "博爱县"
                            }, {
                                "code": 700706,
                                "name": "修武县"
                            }, {
                                "code": 700705,
                                "name": "山阳区"
                            }, {
                                "code": 700704,
                                "name": "马村区"
                            }, {
                                "code": 700703,
                                "name": "中站区"
                            }, {
                                "code": 700702,
                                "name": "解放区"
                            }]
                        }, {
                            "code": 7006,
                            "name": "濮阳市",
                            "sub": [{
                                "code": 700607,
                                "name": "濮阳县"
                            }, {
                                "code": 700606,
                                "name": "台前县"
                            }, {
                                "code": 700605,
                                "name": "范县"
                            }, {
                                "code": 700604,
                                "name": "南乐县"
                            }, {
                                "code": 700603,
                                "name": "清丰县"
                            }, {
                                "code": 700602,
                                "name": "华龙区"
                            }]
                        }, {
                            "code": 7005,
                            "name": "新乡市",
                            "sub": [{
                                "code": 700513,
                                "name": "辉县市"
                            }, {
                                "code": 700512,
                                "name": "卫辉市"
                            }, {
                                "code": 700511,
                                "name": "长垣县"
                            }, {
                                "code": 700510,
                                "name": "封丘县"
                            }, {
                                "code": 700509,
                                "name": "延津县"
                            }, {
                                "code": 700508,
                                "name": "原阳县"
                            }, {
                                "code": 700507,
                                "name": "获嘉县"
                            }, {
                                "code": 700506,
                                "name": "新乡县"
                            }, {
                                "code": 700505,
                                "name": "牧野区"
                            }, {
                                "code": 700504,
                                "name": "凤泉区"
                            }, {
                                "code": 700503,
                                "name": "卫滨区"
                            }, {
                                "code": 700502,
                                "name": "红旗区"
                            }]
                        }, {
                            "code": 7004,
                            "name": "安阳市",
                            "sub": [{
                                "code": 700411,
                                "name": "高新区"
                            }, {
                                "code": 700410,
                                "name": "林州市"
                            }, {
                                "code": 700409,
                                "name": "内黄县"
                            }, {
                                "code": 700408,
                                "name": "滑县"
                            }, {
                                "code": 700407,
                                "name": "汤阴县"
                            }, {
                                "code": 700406,
                                "name": "安阳县"
                            }, {
                                "code": 700405,
                                "name": "龙安区"
                            }, {
                                "code": 700404,
                                "name": "殷都区"
                            }, {
                                "code": 700403,
                                "name": "北关区"
                            }, {
                                "code": 700402,
                                "name": "文峰区"
                            }]
                        }, {
                            "code": 7003,
                            "name": "开封市",
                            "sub": [{
                                "code": 700311,
                                "name": "兰考县"
                            }, {
                                "code": 700310,
                                "name": "开封县"
                            }, {
                                "code": 700309,
                                "name": "尉氏县"
                            }, {
                                "code": 700308,
                                "name": "通许县"
                            }, {
                                "code": 700307,
                                "name": "杞县"
                            }, {
                                "code": 700306,
                                "name": "金明区"
                            }, {
                                "code": 700305,
                                "name": "禹王台区"
                            }, {
                                "code": 700304,
                                "name": "鼓楼区"
                            }, {
                                "code": 700303,
                                "name": "顺河回族区"
                            }, {
                                "code": 700302,
                                "name": "龙亭区"
                            }]
                        }, {
                            "code": 7002,
                            "name": "洛阳市",
                            "sub": [{
                                "code": 700217,
                                "name": "高新区"
                            }, {
                                "code": 700216,
                                "name": "偃师市"
                            }, {
                                "code": 700215,
                                "name": "伊川县"
                            }, {
                                "code": 700214,
                                "name": "洛宁县"
                            }, {
                                "code": 700213,
                                "name": "宜阳县"
                            }, {
                                "code": 700212,
                                "name": "汝阳县"
                            }, {
                                "code": 700211,
                                "name": "嵩县"
                            }, {
                                "code": 700210,
                                "name": "栾川县"
                            }, {
                                "code": 700209,
                                "name": "新安县"
                            }, {
                                "code": 700208,
                                "name": "孟津县"
                            }, {
                                "code": 700207,
                                "name": "洛龙区"
                            }, {
                                "code": 700206,
                                "name": "吉利区"
                            }, {
                                "code": 700205,
                                "name": "涧西区"
                            }, {
                                "code": 700204,
                                "name": "瀍河回族区"
                            }, {
                                "code": 700203,
                                "name": "西工区"
                            }, {
                                "code": 700202,
                                "name": "老城区"
                            }]
                        }, {
                            "code": 7001,
                            "name": "郑州市",
                            "sub": [{
                                "code": 700116,
                                "name": "高新区"
                            }, {
                                "code": 700115,
                                "name": "郑东新区"
                            }, {
                                "code": 700114,
                                "name": "经济开发区"
                            }, {
                                "code": 700113,
                                "name": "登封市"
                            }, {
                                "code": 700112,
                                "name": "新郑市"
                            }, {
                                "code": 700111,
                                "name": "新密市"
                            }, {
                                "code": 700110,
                                "name": "荥阳市"
                            }, {
                                "code": 700109,
                                "name": "巩义市"
                            }, {
                                "code": 700108,
                                "name": "中牟县"
                            }, {
                                "code": 700107,
                                "name": "惠济区"
                            }, {
                                "code": 700106,
                                "name": "上街区"
                            }, {
                                "code": 700105,
                                "name": "金水区"
                            }, {
                                "code": 700104,
                                "name": "管城回族区"
                            }, {
                                "code": 700103,
                                "name": "二七区"
                            }, {
                                "code": 700102,
                                "name": "中原区"
                            }]
                        }]
                    }, {
                        "code": 71,
                        "name": "湖北省",
                        "sub": [{
                            "code": 7117,
                            "name": "神农架林区"
                        }, {
                            "code": 7116,
                            "name": "天门市"
                        }, {
                            "code": 7115,
                            "name": "仙桃市"
                        }, {
                            "code": 7114,
                            "name": "潜江市"
                        }, {
                            "code": 7113,
                            "name": "恩施",
                            "sub": [{
                                "code": 711308,
                                "name": "鹤峰县"
                            }, {
                                "code": 711307,
                                "name": "来凤县"
                            }, {
                                "code": 711306,
                                "name": "咸丰县"
                            }, {
                                "code": 711305,
                                "name": "宣恩县"
                            }, {
                                "code": 711304,
                                "name": "巴东县"
                            }, {
                                "code": 711303,
                                "name": "建始县"
                            }, {
                                "code": 711302,
                                "name": "利川市"
                            }, {
                                "code": 711301,
                                "name": "恩施市"
                            }]
                        }, {
                            "code": 7112,
                            "name": "随州市",
                            "sub": [{
                                "code": 711203,
                                "name": "广水市"
                            }, {
                                "code": 711202,
                                "name": "曾都区"
                            }]
                        }, {
                            "code": 7111,
                            "name": "咸宁市",
                            "sub": [{
                                "code": 711107,
                                "name": "赤壁市"
                            }, {
                                "code": 711106,
                                "name": "通山县"
                            }, {
                                "code": 711105,
                                "name": "崇阳县"
                            }, {
                                "code": 711104,
                                "name": "通城县"
                            }, {
                                "code": 711103,
                                "name": "嘉鱼县"
                            }, {
                                "code": 711102,
                                "name": "咸安区"
                            }]
                        }, {
                            "code": 7110,
                            "name": "黄冈市",
                            "sub": [{
                                "code": 711011,
                                "name": "武穴市"
                            }, {
                                "code": 711010,
                                "name": "麻城市"
                            }, {
                                "code": 711009,
                                "name": "黄梅县"
                            }, {
                                "code": 711008,
                                "name": "蕲春县"
                            }, {
                                "code": 711007,
                                "name": "浠水县"
                            }, {
                                "code": 711006,
                                "name": "英山县"
                            }, {
                                "code": 711005,
                                "name": "罗田县"
                            }, {
                                "code": 711004,
                                "name": "红安县"
                            }, {
                                "code": 711003,
                                "name": "团风县"
                            }, {
                                "code": 711002,
                                "name": "黄州区"
                            }]
                        }, {
                            "code": 7109,
                            "name": "孝感市",
                            "sub": [{
                                "code": 710908,
                                "name": "汉川市"
                            }, {
                                "code": 710907,
                                "name": "安陆市"
                            }, {
                                "code": 710906,
                                "name": "应城市"
                            }, {
                                "code": 710905,
                                "name": "云梦县"
                            }, {
                                "code": 710904,
                                "name": "大悟县"
                            }, {
                                "code": 710903,
                                "name": "孝昌县"
                            }, {
                                "code": 710902,
                                "name": "孝南区"
                            }]
                        }, {
                            "code": 7108,
                            "name": "鄂州市",
                            "sub": [{
                                "code": 710804,
                                "name": "鄂城区"
                            }, {
                                "code": 710803,
                                "name": "华容区"
                            }, {
                                "code": 710802,
                                "name": "梁子湖区"
                            }]
                        }, {
                            "code": 7107,
                            "name": "荆门市",
                            "sub": [{
                                "code": 710706,
                                "name": "钟祥市"
                            }, {
                                "code": 710705,
                                "name": "沙洋县"
                            }, {
                                "code": 710704,
                                "name": "京山县"
                            }, {
                                "code": 710703,
                                "name": "掇刀区"
                            }, {
                                "code": 710702,
                                "name": "东宝区"
                            }]
                        }, {
                            "code": 7106,
                            "name": "宜昌市",
                            "sub": [{
                                "code": 710615,
                                "name": "高新区"
                            }, {
                                "code": 710614,
                                "name": "枝江市"
                            }, {
                                "code": 710613,
                                "name": "当阳市"
                            }, {
                                "code": 710612,
                                "name": "宜都市"
                            }, {
                                "code": 710611,
                                "name": "五峰县"
                            }, {
                                "code": 710610,
                                "name": "长阳县"
                            }, {
                                "code": 710609,
                                "name": "秭归县"
                            }, {
                                "code": 710608,
                                "name": "兴山县"
                            }, {
                                "code": 710607,
                                "name": "远安县"
                            }, {
                                "code": 710606,
                                "name": "夷陵区"
                            }, {
                                "code": 710605,
                                "name": "猇亭区"
                            }, {
                                "code": 710604,
                                "name": "点军区"
                            }, {
                                "code": 710603,
                                "name": "伍家岗区"
                            }, {
                                "code": 710602,
                                "name": "西陵区"
                            }]
                        }, {
                            "code": 7105,
                            "name": "荆州市",
                            "sub": [{
                                "code": 710509,
                                "name": "松滋市"
                            }, {
                                "code": 710508,
                                "name": "洪湖市"
                            }, {
                                "code": 710507,
                                "name": "石首市"
                            }, {
                                "code": 710506,
                                "name": "江陵县"
                            }, {
                                "code": 710505,
                                "name": "监利县"
                            }, {
                                "code": 710504,
                                "name": "公安县"
                            }, {
                                "code": 710503,
                                "name": "荆州区"
                            }]
                        }, {
                            "code": 7104,
                            "name": "十堰市",
                            "sub": [{
                                "code": 710409,
                                "name": "丹江口市"
                            }, {
                                "code": 710408,
                                "name": "房县"
                            }, {
                                "code": 710407,
                                "name": "竹溪县"
                            }, {
                                "code": 710406,
                                "name": "竹山县"
                            }, {
                                "code": 710405,
                                "name": "郧西县"
                            }, {
                                "code": 710404,
                                "name": "郧县"
                            }, {
                                "code": 710403,
                                "name": "张湾区"
                            }, {
                                "code": 710402,
                                "name": "茅箭区"
                            }]
                        }, {
                            "code": 7103,
                            "name": "襄阳市",
                            "sub": [{
                                "code": 710310,
                                "name": "宜城市"
                            }, {
                                "code": 710309,
                                "name": "枣阳市"
                            }, {
                                "code": 710308,
                                "name": "老河口市"
                            }, {
                                "code": 710307,
                                "name": "保康县"
                            }, {
                                "code": 710306,
                                "name": "谷城县"
                            }, {
                                "code": 710305,
                                "name": "南漳县"
                            }, {
                                "code": 710304,
                                "name": "襄州区"
                            }, {
                                "code": 710303,
                                "name": "樊城区"
                            }, {
                                "code": 710302,
                                "name": "襄城区"
                            }]
                        }, {
                            "code": 7102,
                            "name": "黄石市",
                            "sub": [{
                                "code": 710207,
                                "name": "大冶市"
                            }, {
                                "code": 710206,
                                "name": "阳新县"
                            }, {
                                "code": 710205,
                                "name": "铁山区"
                            }, {
                                "code": 710204,
                                "name": "下陆区"
                            }, {
                                "code": 710203,
                                "name": "西塞山区"
                            }, {
                                "code": 710202,
                                "name": "黄石港区"
                            }]
                        }, {
                            "code": 7101,
                            "name": "武汉市",
                            "sub": [{
                                "code": 710114,
                                "name": "新洲区"
                            }, {
                                "code": 710113,
                                "name": "黄陂区"
                            }, {
                                "code": 710112,
                                "name": "江夏区"
                            }, {
                                "code": 710111,
                                "name": "蔡甸区"
                            }, {
                                "code": 710110,
                                "name": "汉南区"
                            }, {
                                "code": 710109,
                                "name": "东西湖区"
                            }, {
                                "code": 710108,
                                "name": "洪山区"
                            }, {
                                "code": 710107,
                                "name": "青山区"
                            }, {
                                "code": 710106,
                                "name": "武昌区"
                            }, {
                                "code": 710105,
                                "name": "汉阳区"
                            }, {
                                "code": 710104,
                                "name": "硚口区"
                            }, {
                                "code": 710103,
                                "name": "江汉区"
                            }, {
                                "code": 710102,
                                "name": "江岸区"
                            }]
                        }]
                    }, {
                        "code": 72,
                        "name": "湖南省",
                        "sub": [{
                            "code": 7214,
                            "name": "湘西",
                            "sub": [{
                                "code": 721408,
                                "name": "龙山县"
                            }, {
                                "code": 721407,
                                "name": "永顺县"
                            }, {
                                "code": 721406,
                                "name": "古丈县"
                            }, {
                                "code": 721405,
                                "name": "保靖县"
                            }, {
                                "code": 721404,
                                "name": "花垣县"
                            }, {
                                "code": 721403,
                                "name": "凤凰县"
                            }, {
                                "code": 721402,
                                "name": "泸溪县"
                            }, {
                                "code": 721401,
                                "name": "吉首市"
                            }]
                        }, {
                            "code": 7213,
                            "name": "张家界市",
                            "sub": [{
                                "code": 721305,
                                "name": "桑植县"
                            }, {
                                "code": 721304,
                                "name": "慈利县"
                            }, {
                                "code": 721303,
                                "name": "武陵源区"
                            }, {
                                "code": 721302,
                                "name": "永定区"
                            }]
                        }, {
                            "code": 7212,
                            "name": "怀化市",
                            "sub": [{
                                "code": 721213,
                                "name": "洪江市"
                            }, {
                                "code": 721212,
                                "name": "通道县"
                            }, {
                                "code": 721211,
                                "name": "靖州苗族县"
                            }, {
                                "code": 721210,
                                "name": "芷江县"
                            }, {
                                "code": 721209,
                                "name": "新晃县"
                            }, {
                                "code": 721208,
                                "name": "麻阳县"
                            }, {
                                "code": 721207,
                                "name": "会同县"
                            }, {
                                "code": 721206,
                                "name": "溆浦县"
                            }, {
                                "code": 721205,
                                "name": "辰溪县"
                            }, {
                                "code": 721204,
                                "name": "沅陵县"
                            }, {
                                "code": 721203,
                                "name": "中方县"
                            }, {
                                "code": 721202,
                                "name": "鹤城区"
                            }]
                        }, {
                            "code": 7211,
                            "name": "永州市",
                            "sub": [{
                                "code": 721112,
                                "name": "江华县"
                            }, {
                                "code": 721111,
                                "name": "新田县"
                            }, {
                                "code": 721110,
                                "name": "蓝山县"
                            }, {
                                "code": 721109,
                                "name": "宁远县"
                            }, {
                                "code": 721108,
                                "name": "江永县"
                            }, {
                                "code": 721107,
                                "name": "道县"
                            }, {
                                "code": 721106,
                                "name": "双牌县"
                            }, {
                                "code": 721105,
                                "name": "东安县"
                            }, {
                                "code": 721104,
                                "name": "祁阳县"
                            }, {
                                "code": 721103,
                                "name": "冷水滩区"
                            }, {
                                "code": 721102,
                                "name": "零陵区"
                            }]
                        }, {
                            "code": 7210,
                            "name": "娄底市",
                            "sub": [{
                                "code": 721006,
                                "name": "涟源市"
                            }, {
                                "code": 721005,
                                "name": "冷水江市"
                            }, {
                                "code": 721004,
                                "name": "新化县"
                            }, {
                                "code": 721003,
                                "name": "双峰县"
                            }, {
                                "code": 721002,
                                "name": "娄星区"
                            }]
                        }, {
                            "code": 7209,
                            "name": "郴州市",
                            "sub": [{
                                "code": 720912,
                                "name": "资兴市"
                            }, {
                                "code": 720911,
                                "name": "安仁县"
                            }, {
                                "code": 720910,
                                "name": "桂东县"
                            }, {
                                "code": 720909,
                                "name": "汝城县"
                            }, {
                                "code": 720908,
                                "name": "临武县"
                            }, {
                                "code": 720907,
                                "name": "嘉禾县"
                            }, {
                                "code": 720906,
                                "name": "永兴县"
                            }, {
                                "code": 720905,
                                "name": "宜章县"
                            }, {
                                "code": 720904,
                                "name": "桂阳县"
                            }, {
                                "code": 720903,
                                "name": "苏仙区"
                            }, {
                                "code": 720902,
                                "name": "北湖区"
                            }]
                        }, {
                            "code": 7208,
                            "name": "邵阳市",
                            "sub": [{
                                "code": 720813,
                                "name": "武冈市"
                            }, {
                                "code": 720812,
                                "name": "城步县"
                            }, {
                                "code": 720811,
                                "name": "新宁县"
                            }, {
                                "code": 720810,
                                "name": "绥宁县"
                            }, {
                                "code": 720809,
                                "name": "洞口县"
                            }, {
                                "code": 720808,
                                "name": "隆回县"
                            }, {
                                "code": 720807,
                                "name": "邵阳县"
                            }, {
                                "code": 720806,
                                "name": "新邵县"
                            }, {
                                "code": 720805,
                                "name": "邵东县"
                            }, {
                                "code": 720804,
                                "name": "北塔区"
                            }, {
                                "code": 720803,
                                "name": "大祥区"
                            }, {
                                "code": 720802,
                                "name": "双清区"
                            }]
                        }, {
                            "code": 7207,
                            "name": "岳阳市",
                            "sub": [{
                                "code": 720710,
                                "name": "临湘市"
                            }, {
                                "code": 720709,
                                "name": "汨罗市"
                            }, {
                                "code": 720708,
                                "name": "平江县"
                            }, {
                                "code": 720707,
                                "name": "湘阴县"
                            }, {
                                "code": 720706,
                                "name": "华容县"
                            }, {
                                "code": 720705,
                                "name": "岳阳县"
                            }, {
                                "code": 720704,
                                "name": "君山区"
                            }, {
                                "code": 720703,
                                "name": "云溪区"
                            }, {
                                "code": 720702,
                                "name": "岳阳楼区"
                            }]
                        }, {
                            "code": 7206,
                            "name": "常德市",
                            "sub": [{
                                "code": 720610,
                                "name": "津市市"
                            }, {
                                "code": 720609,
                                "name": "石门县"
                            }, {
                                "code": 720608,
                                "name": "桃源县"
                            }, {
                                "code": 720607,
                                "name": "临澧县"
                            }, {
                                "code": 720606,
                                "name": "澧县"
                            }, {
                                "code": 720605,
                                "name": "汉寿县"
                            }, {
                                "code": 720604,
                                "name": "安乡县"
                            }, {
                                "code": 720603,
                                "name": "鼎城区"
                            }, {
                                "code": 720602,
                                "name": "武陵区"
                            }]
                        }, {
                            "code": 7205,
                            "name": "益阳市",
                            "sub": [{
                                "code": 720508,
                                "name": "高新区"
                            }, {
                                "code": 720507,
                                "name": "沅江市"
                            }, {
                                "code": 720506,
                                "name": "安化县"
                            }, {
                                "code": 720505,
                                "name": "桃江县"
                            }, {
                                "code": 720504,
                                "name": "南县"
                            }, {
                                "code": 720503,
                                "name": "赫山区"
                            }, {
                                "code": 720502,
                                "name": "资阳区"
                            }]
                        }, {
                            "code": 7204,
                            "name": "衡阳市",
                            "sub": [{
                                "code": 720413,
                                "name": "常宁市"
                            }, {
                                "code": 720412,
                                "name": "耒阳市"
                            }, {
                                "code": 720411,
                                "name": "祁东县"
                            }, {
                                "code": 720410,
                                "name": "衡东县"
                            }, {
                                "code": 720409,
                                "name": "衡山县"
                            }, {
                                "code": 720408,
                                "name": "衡南县"
                            }, {
                                "code": 720407,
                                "name": "衡阳县"
                            }, {
                                "code": 720406,
                                "name": "南岳区"
                            }, {
                                "code": 720405,
                                "name": "蒸湘区"
                            }, {
                                "code": 720404,
                                "name": "石鼓区"
                            }, {
                                "code": 720403,
                                "name": "雁峰区"
                            }, {
                                "code": 720402,
                                "name": "珠晖区"
                            }]
                        }, {
                            "code": 7203,
                            "name": "湘潭市",
                            "sub": [{
                                "code": 720307,
                                "name": "高新区"
                            }, {
                                "code": 720306,
                                "name": "韶山市"
                            }, {
                                "code": 720305,
                                "name": "湘乡市"
                            }, {
                                "code": 720304,
                                "name": "湘潭县"
                            }, {
                                "code": 720303,
                                "name": "岳塘区"
                            }, {
                                "code": 720302,
                                "name": "雨湖区"
                            }]
                        }, {
                            "code": 7202,
                            "name": "株洲市",
                            "sub": [{
                                "code": 720211,
                                "name": "高新区"
                            }, {
                                "code": 720210,
                                "name": "醴陵市"
                            }, {
                                "code": 720209,
                                "name": "炎陵县"
                            }, {
                                "code": 720208,
                                "name": "茶陵县"
                            }, {
                                "code": 720207,
                                "name": "攸县"
                            }, {
                                "code": 720206,
                                "name": "株洲县"
                            }, {
                                "code": 720205,
                                "name": "天元区"
                            }, {
                                "code": 720204,
                                "name": "石峰区"
                            }, {
                                "code": 720203,
                                "name": "芦淞区"
                            }, {
                                "code": 720202,
                                "name": "荷塘区"
                            }]
                        }, {
                            "code": 7201,
                            "name": "长沙市",
                            "sub": [{
                                "code": 720110,
                                "name": "浏阳市"
                            }, {
                                "code": 720109,
                                "name": "宁乡县"
                            }, {
                                "code": 720108,
                                "name": "望城县"
                            }, {
                                "code": 720107,
                                "name": "长沙县"
                            }, {
                                "code": 720106,
                                "name": "雨花区"
                            }, {
                                "code": 720105,
                                "name": "开福区"
                            }, {
                                "code": 720104,
                                "name": "岳麓区"
                            }, {
                                "code": 720103,
                                "name": "天心区"
                            }, {
                                "code": 720102,
                                "name": "芙蓉区"
                            }]
                        }]
                    }, {
                        "code": 80,
                        "name": "陕西省",
                        "sub": [{
                            "code": 8011,
                            "name": "杨凌",
                            "sub": [{
                                "code": 801101,
                                "name": "农业示范区"
                            }]
                        }, {
                            "code": 8010,
                            "name": "商洛市",
                            "sub": [{
                                "code": 801008,
                                "name": "柞水县"
                            }, {
                                "code": 801007,
                                "name": "镇安县"
                            }, {
                                "code": 801006,
                                "name": "山阳县"
                            }, {
                                "code": 801005,
                                "name": "商南县"
                            }, {
                                "code": 801004,
                                "name": "丹凤县"
                            }, {
                                "code": 801003,
                                "name": "洛南县"
                            }, {
                                "code": 801002,
                                "name": "商州区"
                            }]
                        }, {
                            "code": 8009,
                            "name": "安康市",
                            "sub": [{
                                "code": 800911,
                                "name": "白河县"
                            }, {
                                "code": 800910,
                                "name": "旬阳县"
                            }, {
                                "code": 800909,
                                "name": "镇坪县"
                            }, {
                                "code": 800908,
                                "name": "平利县"
                            }, {
                                "code": 800907,
                                "name": "岚皋县"
                            }, {
                                "code": 800906,
                                "name": "紫阳县"
                            }, {
                                "code": 800905,
                                "name": "宁陕县"
                            }, {
                                "code": 800904,
                                "name": "石泉县"
                            }, {
                                "code": 800903,
                                "name": "汉阴县"
                            }, {
                                "code": 800902,
                                "name": "汉滨区"
                            }]
                        }, {
                            "code": 8008,
                            "name": "汉中市",
                            "sub": [{
                                "code": 800812,
                                "name": "佛坪县"
                            }, {
                                "code": 800811,
                                "name": "留坝县"
                            }, {
                                "code": 800810,
                                "name": "镇巴县"
                            }, {
                                "code": 800809,
                                "name": "略阳县"
                            }, {
                                "code": 800808,
                                "name": "宁强县"
                            }, {
                                "code": 800807,
                                "name": "勉县"
                            }, {
                                "code": 800806,
                                "name": "西乡县"
                            }, {
                                "code": 800805,
                                "name": "洋县"
                            }, {
                                "code": 800804,
                                "name": "城固县"
                            }, {
                                "code": 800803,
                                "name": "南郑县"
                            }, {
                                "code": 800802,
                                "name": "汉台区"
                            }]
                        }, {
                            "code": 8007,
                            "name": "铜川市",
                            "sub": [{
                                "code": 800705,
                                "name": "宜君县"
                            }, {
                                "code": 800704,
                                "name": "耀州区"
                            }, {
                                "code": 800703,
                                "name": "印台区"
                            }, {
                                "code": 800702,
                                "name": "王益区"
                            }]
                        }, {
                            "code": 8006,
                            "name": "榆林市",
                            "sub": [{
                                "code": 800613,
                                "name": "子洲县"
                            }, {
                                "code": 800612,
                                "name": "清涧县"
                            }, {
                                "code": 800611,
                                "name": "吴堡县"
                            }, {
                                "code": 800610,
                                "name": "佳县"
                            }, {
                                "code": 800609,
                                "name": "米脂县"
                            }, {
                                "code": 800608,
                                "name": "绥德县"
                            }, {
                                "code": 800607,
                                "name": "定边县"
                            }, {
                                "code": 800606,
                                "name": "靖边县"
                            }, {
                                "code": 800605,
                                "name": "横山县"
                            }, {
                                "code": 800604,
                                "name": "府谷县"
                            }, {
                                "code": 800603,
                                "name": "神木县"
                            }, {
                                "code": 800602,
                                "name": "榆阳区"
                            }]
                        }, {
                            "code": 8005,
                            "name": "延安市",
                            "sub": [{
                                "code": 800514,
                                "name": "黄陵县"
                            }, {
                                "code": 800513,
                                "name": "黄龙县"
                            }, {
                                "code": 800512,
                                "name": "宜川县"
                            }, {
                                "code": 800511,
                                "name": "洛川县"
                            }, {
                                "code": 800510,
                                "name": "富县"
                            }, {
                                "code": 800509,
                                "name": "甘泉县"
                            }, {
                                "code": 800508,
                                "name": "吴起县"
                            }, {
                                "code": 800507,
                                "name": "志丹县"
                            }, {
                                "code": 800506,
                                "name": "安塞县"
                            }, {
                                "code": 800505,
                                "name": "子长县"
                            }, {
                                "code": 800504,
                                "name": "延川县"
                            }, {
                                "code": 800503,
                                "name": "延长县"
                            }, {
                                "code": 800502,
                                "name": "宝塔区"
                            }]
                        }, {
                            "code": 8004,
                            "name": "渭南市",
                            "sub": [{
                                "code": 800413,
                                "name": "高新区"
                            }, {
                                "code": 800412,
                                "name": "华阴市"
                            }, {
                                "code": 800411,
                                "name": "韩城市"
                            }, {
                                "code": 800410,
                                "name": "富平县"
                            }, {
                                "code": 800409,
                                "name": "白水县"
                            }, {
                                "code": 800408,
                                "name": "蒲城县"
                            }, {
                                "code": 800407,
                                "name": "澄城县"
                            }, {
                                "code": 800406,
                                "name": "合阳县"
                            }, {
                                "code": 800405,
                                "name": "大荔县"
                            }, {
                                "code": 800404,
                                "name": "潼关县"
                            }, {
                                "code": 800403,
                                "name": "华县"
                            }, {
                                "code": 800402,
                                "name": "临渭区"
                            }]
                        }, {
                            "code": 8003,
                            "name": "咸阳市",
                            "sub": [{
                                "code": 800315,
                                "name": "兴平市"
                            }, {
                                "code": 800314,
                                "name": "武功县"
                            }, {
                                "code": 800313,
                                "name": "淳化县"
                            }, {
                                "code": 800312,
                                "name": "旬邑县"
                            }, {
                                "code": 800311,
                                "name": "长武县"
                            }, {
                                "code": 800310,
                                "name": "彬县"
                            }, {
                                "code": 800309,
                                "name": "永寿县"
                            }, {
                                "code": 800308,
                                "name": "礼泉县"
                            }, {
                                "code": 800307,
                                "name": "乾县"
                            }, {
                                "code": 800306,
                                "name": "泾阳县"
                            }, {
                                "code": 800305,
                                "name": "三原县"
                            }, {
                                "code": 800304,
                                "name": "渭城区"
                            }, {
                                "code": 800302,
                                "name": "秦都区"
                            }]
                        }, {
                            "code": 8002,
                            "name": "宝鸡市",
                            "sub": [{
                                "code": 800214,
                                "name": "高新区"
                            }, {
                                "code": 800213,
                                "name": "太白县"
                            }, {
                                "code": 800212,
                                "name": "凤县"
                            }, {
                                "code": 800211,
                                "name": "麟游县"
                            }, {
                                "code": 800210,
                                "name": "千阳县"
                            }, {
                                "code": 800209,
                                "name": "陇县"
                            }, {
                                "code": 800208,
                                "name": "眉县"
                            }, {
                                "code": 800207,
                                "name": "扶风县"
                            }, {
                                "code": 800206,
                                "name": "岐山县"
                            }, {
                                "code": 800205,
                                "name": "凤翔县"
                            }, {
                                "code": 800204,
                                "name": "陈仓区"
                            }, {
                                "code": 800203,
                                "name": "金台区"
                            }, {
                                "code": 800202,
                                "name": "渭滨区"
                            }]
                        }, {
                            "code": 8001,
                            "name": "西安市",
                            "sub": [{
                                "code": 800116,
                                "name": "高新区"
                            }, {
                                "code": 800115,
                                "name": "经济开发区"
                            }, {
                                "code": 800114,
                                "name": "高陵县"
                            }, {
                                "code": 800113,
                                "name": "户县"
                            }, {
                                "code": 800112,
                                "name": "周至县"
                            }, {
                                "code": 800111,
                                "name": "蓝田县"
                            }, {
                                "code": 800110,
                                "name": "长安区"
                            }, {
                                "code": 800109,
                                "name": "临潼区"
                            }, {
                                "code": 800108,
                                "name": "阎良区"
                            }, {
                                "code": 800107,
                                "name": "雁塔区"
                            }, {
                                "code": 800106,
                                "name": "未央区"
                            }, {
                                "code": 800105,
                                "name": "灞桥区"
                            }, {
                                "code": 800104,
                                "name": "莲湖区"
                            }, {
                                "code": 800103,
                                "name": "碑林区"
                            }, {
                                "code": 800102,
                                "name": "新城区"
                            }]
                        }]
                    }, {
                        "code": 81,
                        "name": "青海省",
                        "sub": [{
                            "code": 8108,
                            "name": "玉树州",
                            "sub": [{
                                "code": 810806,
                                "name": "曲麻莱县"
                            }, {
                                "code": 810805,
                                "name": "囊谦县"
                            }, {
                                "code": 810804,
                                "name": "治多县"
                            }, {
                                "code": 810803,
                                "name": "称多县"
                            }, {
                                "code": 810802,
                                "name": "杂多县"
                            }, {
                                "code": 810801,
                                "name": "玉树县"
                            }]
                        }, {
                            "code": 8107,
                            "name": "果洛州",
                            "sub": [{
                                "code": 810706,
                                "name": "玛多县"
                            }, {
                                "code": 810705,
                                "name": "久治县"
                            }, {
                                "code": 810704,
                                "name": "达日县"
                            }, {
                                "code": 810703,
                                "name": "甘德县"
                            }, {
                                "code": 810702,
                                "name": "班玛县"
                            }, {
                                "code": 810701,
                                "name": "玛沁县"
                            }]
                        }, {
                            "code": 8106,
                            "name": "黄南州",
                            "sub": [{
                                "code": 810604,
                                "name": "河南县"
                            }, {
                                "code": 810603,
                                "name": "泽库县"
                            }, {
                                "code": 810602,
                                "name": "尖扎县"
                            }, {
                                "code": 810601,
                                "name": "同仁县"
                            }]
                        }, {
                            "code": 8105,
                            "name": "海西蒙古族州",
                            "sub": [{
                                "code": 810505,
                                "name": "天峻县"
                            }, {
                                "code": 810504,
                                "name": "都兰县"
                            }, {
                                "code": 810503,
                                "name": "乌兰县"
                            }, {
                                "code": 810502,
                                "name": "德令哈市"
                            }, {
                                "code": 810501,
                                "name": "格尔木市"
                            }]
                        }, {
                            "code": 8104,
                            "name": "海北州",
                            "sub": [{
                                "code": 810404,
                                "name": "刚察县"
                            }, {
                                "code": 810403,
                                "name": "海晏县"
                            }, {
                                "code": 810402,
                                "name": "祁连县"
                            }, {
                                "code": 810401,
                                "name": "门源县"
                            }]
                        }, {
                            "code": 8103,
                            "name": "海南州",
                            "sub": [{
                                "code": 810305,
                                "name": "贵南县"
                            }, {
                                "code": 810304,
                                "name": "兴海县"
                            }, {
                                "code": 810303,
                                "name": "贵德县"
                            }, {
                                "code": 810302,
                                "name": "同德县"
                            }, {
                                "code": 810301,
                                "name": "共和县"
                            }]
                        }, {
                            "code": 8102,
                            "name": "海东地区",
                            "sub": [{
                                "code": 810206,
                                "name": "循化县"
                            }, {
                                "code": 810205,
                                "name": "化隆县"
                            }, {
                                "code": 810204,
                                "name": "互助县"
                            }, {
                                "code": 810203,
                                "name": "乐都县"
                            }, {
                                "code": 810202,
                                "name": "民和县"
                            }, {
                                "code": 810201,
                                "name": "平安县"
                            }]
                        }, {
                            "code": 8101,
                            "name": "西宁市",
                            "sub": [{
                                "code": 810108,
                                "name": "湟源县"
                            }, {
                                "code": 810107,
                                "name": "湟中县"
                            }, {
                                "code": 810106,
                                "name": "大通县"
                            }, {
                                "code": 810105,
                                "name": "城北区"
                            }, {
                                "code": 810104,
                                "name": "城西区"
                            }, {
                                "code": 810103,
                                "name": "城中区"
                            }, {
                                "code": 810102,
                                "name": "城东区"
                            }]
                        }]
                    }, {
                        "code": 82,
                        "name": "宁夏",
                        "sub": [{
                            "code": 8205,
                            "name": "中卫市",
                            "sub": [{
                                "code": 820504,
                                "name": "海原县"
                            }, {
                                "code": 820503,
                                "name": "中宁县"
                            }, {
                                "code": 820502,
                                "name": "沙坡头区"
                            }]
                        }, {
                            "code": 8204,
                            "name": "固原市",
                            "sub": [{
                                "code": 820406,
                                "name": "彭阳县"
                            }, {
                                "code": 820405,
                                "name": "泾源县"
                            }, {
                                "code": 820404,
                                "name": "隆德县"
                            }, {
                                "code": 820403,
                                "name": "西吉县"
                            }, {
                                "code": 820402,
                                "name": "原州区"
                            }]
                        }, {
                            "code": 8203,
                            "name": "吴忠市",
                            "sub": [{
                                "code": 820305,
                                "name": "青铜峡市"
                            }, {
                                "code": 820304,
                                "name": "同心县"
                            }, {
                                "code": 820303,
                                "name": "盐池县"
                            }, {
                                "code": 820302,
                                "name": "利通区"
                            }]
                        }, {
                            "code": 8202,
                            "name": "石嘴山市",
                            "sub": [{
                                "code": 820204,
                                "name": "平罗县"
                            }, {
                                "code": 820203,
                                "name": "惠农区"
                            }, {
                                "code": 820202,
                                "name": "大武口区"
                            }]
                        }, {
                            "code": 8201,
                            "name": "银川市",
                            "sub": [{
                                "code": 820107,
                                "name": "灵武市"
                            }, {
                                "code": 820106,
                                "name": "贺兰县"
                            }, {
                                "code": 820105,
                                "name": "永宁县"
                            }, {
                                "code": 820104,
                                "name": "金凤区"
                            }, {
                                "code": 820103,
                                "name": "西夏区"
                            }, {
                                "code": 820102,
                                "name": "兴庆区"
                            }]
                        }]
                    }, {
                        "code": 83,
                        "name": "新疆",
                        "sub": [{
                            "code": 8318,
                            "name": "图木舒克市"
                        }, {
                            "code": 8317,
                            "name": "阿拉尔市"
                        }, {
                            "code": 8316,
                            "name": "五家渠市"
                        }, {
                            "code": 8315,
                            "name": "石河子市"
                        }, {
                            "code": 8314,
                            "name": "克拉玛依市",
                            "sub": [{
                                "code": 831405,
                                "name": "乌尔禾区"
                            }, {
                                "code": 831404,
                                "name": "白碱滩区"
                            }, {
                                "code": 831403,
                                "name": "克拉玛依区"
                            }, {
                                "code": 831402,
                                "name": "独山子区"
                            }]
                        }, {
                            "code": 8313,
                            "name": "喀什地区",
                            "sub": [{
                                "code": 831312,
                                "name": "塔什库尔干"
                            }, {
                                "code": 831311,
                                "name": "巴楚县"
                            }, {
                                "code": 831310,
                                "name": "伽师县"
                            }, {
                                "code": 831309,
                                "name": "岳普湖县"
                            }, {
                                "code": 831308,
                                "name": "麦盖提县"
                            }, {
                                "code": 831307,
                                "name": "叶城县"
                            }, {
                                "code": 831306,
                                "name": "莎车县"
                            }, {
                                "code": 831305,
                                "name": "泽普县"
                            }, {
                                "code": 831304,
                                "name": "英吉沙县"
                            }, {
                                "code": 831303,
                                "name": "疏勒县"
                            }, {
                                "code": 831302,
                                "name": "疏附县"
                            }, {
                                "code": 831301,
                                "name": "喀什市"
                            }]
                        }, {
                            "code": 8312,
                            "name": "克孜勒苏",
                            "sub": [{
                                "code": 831204,
                                "name": "乌恰县"
                            }, {
                                "code": 831203,
                                "name": "阿合奇县"
                            }, {
                                "code": 831202,
                                "name": "阿克陶县"
                            }, {
                                "code": 831201,
                                "name": "阿图什市"
                            }]
                        }, {
                            "code": 8311,
                            "name": "阿克苏地区",
                            "sub": [{
                                "code": 831109,
                                "name": "柯坪县"
                            }, {
                                "code": 831108,
                                "name": "阿瓦提县"
                            }, {
                                "code": 831107,
                                "name": "乌什县"
                            }, {
                                "code": 831106,
                                "name": "拜城县"
                            }, {
                                "code": 831105,
                                "name": "新和县"
                            }, {
                                "code": 831104,
                                "name": "沙雅县"
                            }, {
                                "code": 831103,
                                "name": "库车县"
                            }, {
                                "code": 831102,
                                "name": "温宿县"
                            }, {
                                "code": 831101,
                                "name": "阿克苏市"
                            }]
                        }, {
                            "code": 8310,
                            "name": "和田地区",
                            "sub": [{
                                "code": 831008,
                                "name": "民丰县"
                            }, {
                                "code": 831007,
                                "name": "于田县"
                            }, {
                                "code": 831006,
                                "name": "策勒县"
                            }, {
                                "code": 831005,
                                "name": "洛浦县"
                            }, {
                                "code": 831004,
                                "name": "皮山县"
                            }, {
                                "code": 831003,
                                "name": "墨玉县"
                            }, {
                                "code": 831002,
                                "name": "和田县"
                            }, {
                                "code": 831001,
                                "name": "和田市"
                            }]
                        }, {
                            "code": 8309,
                            "name": "哈密地区",
                            "sub": [{
                                "code": 830903,
                                "name": "伊吾县"
                            }, {
                                "code": 830902,
                                "name": "巴里坤县"
                            }, {
                                "code": 830901,
                                "name": "哈密市"
                            }]
                        }, {
                            "code": 8308,
                            "name": "巴音郭楞",
                            "sub": [{
                                "code": 830809,
                                "name": "博湖县"
                            }, {
                                "code": 830808,
                                "name": "和硕县"
                            }, {
                                "code": 830807,
                                "name": "和静县"
                            }, {
                                "code": 830806,
                                "name": "焉耆县"
                            }, {
                                "code": 830805,
                                "name": "且末县"
                            }, {
                                "code": 830804,
                                "name": "若羌县"
                            }, {
                                "code": 830803,
                                "name": "尉犁县"
                            }, {
                                "code": 830802,
                                "name": "轮台县"
                            }, {
                                "code": 830801,
                                "name": "库尔勒市"
                            }]
                        }, {
                            "code": 8307,
                            "name": "吐鲁番地区",
                            "sub": [{
                                "code": 830703,
                                "name": "托克逊县"
                            }, {
                                "code": 830702,
                                "name": "鄯善县"
                            }, {
                                "code": 830701,
                                "name": "吐鲁番市"
                            }]
                        }, {
                            "code": 8306,
                            "name": "昌吉",
                            "sub": [{
                                "code": 830608,
                                "name": "高新区"
                            }, {
                                "code": 830607,
                                "name": "木垒县"
                            }, {
                                "code": 830606,
                                "name": "吉木萨尔县"
                            }, {
                                "code": 830605,
                                "name": "奇台县"
                            }, {
                                "code": 830604,
                                "name": "玛纳斯县"
                            }, {
                                "code": 830603,
                                "name": "呼图壁县"
                            }, {
                                "code": 830602,
                                "name": "阜康市"
                            }, {
                                "code": 830601,
                                "name": "昌吉市"
                            }]
                        }, {
                            "code": 8305,
                            "name": "博尔塔拉",
                            "sub": [{
                                "code": 830503,
                                "name": "温泉县"
                            }, {
                                "code": 830502,
                                "name": "精河县"
                            }, {
                                "code": 830501,
                                "name": "博乐市"
                            }]
                        }, {
                            "code": 8304,
                            "name": "塔城地区",
                            "sub": [{
                                "code": 830407,
                                "name": "和布克赛尔"
                            }, {
                                "code": 830406,
                                "name": "裕民县"
                            }, {
                                "code": 830405,
                                "name": "托里县"
                            }, {
                                "code": 830404,
                                "name": "沙湾县"
                            }, {
                                "code": 830403,
                                "name": "额敏县"
                            }, {
                                "code": 830402,
                                "name": "乌苏市"
                            }, {
                                "code": 830401,
                                "name": "塔城市"
                            }]
                        }, {
                            "code": 8303,
                            "name": "阿勒泰地区",
                            "sub": [{
                                "code": 830307,
                                "name": "吉木乃县"
                            }, {
                                "code": 830306,
                                "name": "青河县"
                            }, {
                                "code": 830305,
                                "name": "哈巴河县"
                            }, {
                                "code": 830304,
                                "name": "福海县"
                            }, {
                                "code": 830303,
                                "name": "富蕴县"
                            }, {
                                "code": 830302,
                                "name": "布尔津县"
                            }, {
                                "code": 830301,
                                "name": "阿勒泰市"
                            }]
                        }, {
                            "code": 8302,
                            "name": "伊犁州",
                            "sub": [{
                                "code": 830210,
                                "name": "尼勒克县"
                            }, {
                                "code": 830209,
                                "name": "特克斯县"
                            }, {
                                "code": 830208,
                                "name": "昭苏县"
                            }, {
                                "code": 830207,
                                "name": "新源县"
                            }, {
                                "code": 830206,
                                "name": "巩留县"
                            }, {
                                "code": 830205,
                                "name": "霍城县"
                            }, {
                                "code": 830204,
                                "name": "察布查尔"
                            }, {
                                "code": 830203,
                                "name": "伊宁县"
                            }, {
                                "code": 830202,
                                "name": "奎屯市"
                            }, {
                                "code": 830201,
                                "name": "伊宁市"
                            }]
                        }, {
                            "code": 8301,
                            "name": "乌鲁木齐市",
                            "sub": [{
                                "code": 830110,
                                "name": "新市区(高新区)"
                            }, {
                                "code": 830109,
                                "name": "乌鲁木齐县"
                            }, {
                                "code": 830108,
                                "name": "米东区"
                            }, {
                                "code": 830107,
                                "name": "达坂城区"
                            }, {
                                "code": 830106,
                                "name": "头屯河区(开发区)"
                            }, {
                                "code": 830105,
                                "name": "水磨沟区"
                            }, {
                                "code": 830103,
                                "name": "沙依巴克区"
                            }, {
                                "code": 830102,
                                "name": "天山区"
                            }]
                        }]
                    }, {
                        "code": 84,
                        "name": "甘肃省",
                        "sub": [{
                            "code": 8414,
                            "name": "甘南州",
                            "sub": [{
                                "code": 841408,
                                "name": "夏河县"
                            }, {
                                "code": 841407,
                                "name": "碌曲县"
                            }, {
                                "code": 841406,
                                "name": "玛曲县"
                            }, {
                                "code": 841405,
                                "name": "迭部县"
                            }, {
                                "code": 841404,
                                "name": "舟曲县"
                            }, {
                                "code": 841403,
                                "name": "卓尼县"
                            }, {
                                "code": 841402,
                                "name": "临潭县"
                            }, {
                                "code": 841401,
                                "name": "合作市"
                            }]
                        }, {
                            "code": 8413,
                            "name": "临夏",
                            "sub": [{
                                "code": 841308,
                                "name": "积石山县"
                            }, {
                                "code": 841307,
                                "name": "东乡族自治县"
                            }, {
                                "code": 841306,
                                "name": "和政县"
                            }, {
                                "code": 841305,
                                "name": "广河县"
                            }, {
                                "code": 841304,
                                "name": "永靖县"
                            }, {
                                "code": 841303,
                                "name": "康乐县"
                            }, {
                                "code": 841302,
                                "name": "临夏县"
                            }, {
                                "code": 841301,
                                "name": "临夏市"
                            }]
                        }, {
                            "code": 8412,
                            "name": "陇南市",
                            "sub": [{
                                "code": 841210,
                                "name": "两当县"
                            }, {
                                "code": 841209,
                                "name": "徽县"
                            }, {
                                "code": 841208,
                                "name": "礼县"
                            }, {
                                "code": 841207,
                                "name": "西和县"
                            }, {
                                "code": 841206,
                                "name": "康县"
                            }, {
                                "code": 841205,
                                "name": "宕昌县"
                            }, {
                                "code": 841204,
                                "name": "文县"
                            }, {
                                "code": 841203,
                                "name": "成县"
                            }, {
                                "code": 841202,
                                "name": "武都区"
                            }]
                        }, {
                            "code": 8411,
                            "name": "定西市",
                            "sub": [{
                                "code": 841108,
                                "name": "岷县"
                            }, {
                                "code": 841107,
                                "name": "漳县"
                            }, {
                                "code": 841106,
                                "name": "临洮县"
                            }, {
                                "code": 841105,
                                "name": "渭源县"
                            }, {
                                "code": 841104,
                                "name": "陇西县"
                            }, {
                                "code": 841103,
                                "name": "通渭县"
                            }, {
                                "code": 841102,
                                "name": "安定区"
                            }]
                        }, {
                            "code": 8410,
                            "name": "白银市",
                            "sub": [{
                                "code": 841007,
                                "name": "高新区"
                            }, {
                                "code": 841006,
                                "name": "景泰县"
                            }, {
                                "code": 841005,
                                "name": "会宁县"
                            }, {
                                "code": 841004,
                                "name": "靖远县"
                            }, {
                                "code": 841003,
                                "name": "平川区"
                            }, {
                                "code": 841002,
                                "name": "白银区"
                            }]
                        }, {
                            "code": 8409,
                            "name": "平凉市",
                            "sub": [{
                                "code": 840908,
                                "name": "静宁县"
                            }, {
                                "code": 840907,
                                "name": "庄浪县"
                            }, {
                                "code": 840906,
                                "name": "华亭县"
                            }, {
                                "code": 840905,
                                "name": "崇信县"
                            }, {
                                "code": 840904,
                                "name": "灵台县"
                            }, {
                                "code": 840903,
                                "name": "泾川县"
                            }, {
                                "code": 840902,
                                "name": "崆峒区"
                            }]
                        }, {
                            "code": 8408,
                            "name": "庆阳市",
                            "sub": [{
                                "code": 840809,
                                "name": "镇原县"
                            }, {
                                "code": 840808,
                                "name": "宁县"
                            }, {
                                "code": 840807,
                                "name": "正宁县"
                            }, {
                                "code": 840806,
                                "name": "合水县"
                            }, {
                                "code": 840805,
                                "name": "华池县"
                            }, {
                                "code": 840804,
                                "name": "环县"
                            }, {
                                "code": 840803,
                                "name": "庆城县"
                            }, {
                                "code": 840802,
                                "name": "西峰区"
                            }]
                        }, {
                            "code": 8407,
                            "name": "张掖市",
                            "sub": [{
                                "code": 840707,
                                "name": "山丹县"
                            }, {
                                "code": 840706,
                                "name": "高台县"
                            }, {
                                "code": 840705,
                                "name": "临泽县"
                            }, {
                                "code": 840704,
                                "name": "民乐县"
                            }, {
                                "code": 840703,
                                "name": "肃南县"
                            }, {
                                "code": 840702,
                                "name": "甘州区"
                            }]
                        }, {
                            "code": 8406,
                            "name": "酒泉市",
                            "sub": [{
                                "code": 840608,
                                "name": "敦煌市"
                            }, {
                                "code": 840607,
                                "name": "玉门市"
                            }, {
                                "code": 840606,
                                "name": "阿克塞县"
                            }, {
                                "code": 840605,
                                "name": "肃北县"
                            }, {
                                "code": 840604,
                                "name": "瓜州县"
                            }, {
                                "code": 840603,
                                "name": "金塔县"
                            }, {
                                "code": 840602,
                                "name": "肃州区"
                            }]
                        }, {
                            "code": 8405,
                            "name": "金昌市",
                            "sub": [{
                                "code": 840503,
                                "name": "永昌县"
                            }, {
                                "code": 840502,
                                "name": "金川区"
                            }]
                        }, {
                            "code": 8404,
                            "name": "武威市",
                            "sub": [{
                                "code": 840405,
                                "name": "天祝县"
                            }, {
                                "code": 840404,
                                "name": "古浪县"
                            }, {
                                "code": 840403,
                                "name": "民勤县"
                            }, {
                                "code": 840402,
                                "name": "凉州区"
                            }]
                        }, {
                            "code": 8403,
                            "name": "嘉峪关市"
                        }, {
                            "code": 8402,
                            "name": "天水市",
                            "sub": [{
                                "code": 840208,
                                "name": "张家川县"
                            }, {
                                "code": 840207,
                                "name": "武山县"
                            }, {
                                "code": 840206,
                                "name": "甘谷县"
                            }, {
                                "code": 840205,
                                "name": "秦安县"
                            }, {
                                "code": 840204,
                                "name": "清水县"
                            }, {
                                "code": 840203,
                                "name": "麦积区"
                            }, {
                                "code": 840202,
                                "name": "秦州区"
                            }]
                        }, {
                            "code": 8401,
                            "name": "兰州市",
                            "sub": [{
                                "code": 840109,
                                "name": "榆中县"
                            }, {
                                "code": 840108,
                                "name": "皋兰县"
                            }, {
                                "code": 840107,
                                "name": "永登县"
                            }, {
                                "code": 840106,
                                "name": "红古区"
                            }, {
                                "code": 840105,
                                "name": "安宁区"
                            }, {
                                "code": 840104,
                                "name": "西固区"
                            }, {
                                "code": 840103,
                                "name": "七里河区"
                            }, {
                                "code": 840102,
                                "name": "城关区"
                            }]
                        }]
                    }
                ]
// 多页面重复时间 - 单个项目 -edn --------------------------------------------- 



module.exports = {
   city_data,
    ...project_fn,

   // toFixed,


    // isJSON,    // 判断字符串是否为json格式

    setData,
    set_pages, // 页面名称简化 用于app.js

    var_path_split, // 变量路径拆分 需要页面this
    dataset, // 设置自定义参数 需要事件event

    getUrl, // 判断请求网站, 是否添加前缀;  getUrl(url);
    delayJump, // 延迟跳转
    buildRequest, // 网络请求 对象参数
    request, // 网络请求 一对一参数
    toastTip, // 提示信息
    loadTip,// 提示加载信息
    //get_list, // 获取列表, 依赖1.request函数; 2.toastTip函数 需要页面this

    login_check, // 登录检测
    jump, // 页面跳转, 依赖1.request函数; 2.login_check函数

    input_set_value, // 输入框修改属性 需要页面this

    set_value, // 设置属性值 需要页面this

    count_value, // 增减属性值 需要页面this

    event_false, // 阻止事件冒泡
    stop_swiper, // 禁止滑动

    showToast, // 显示提示
    show_modal, // 确认对话框

    do_fns, // 执行多个方法 需要页面this

    uploadFiles, // 上传文件 递归调用 需要页面this

  

    create_dataset, // 创建dataset

    http_dataset, // 发送请求 dataset参数 需要页面this

    get_addr, // 获取地址

  //  get_addr_info, // 根据 经纬度 获取地址

    onReady, //页面加载完成函数

    set_glo, //设置全局变量
    set_stor, // 设置缓存

    obj_value_empty, //判断对象属性值是否存在空

    popup_fn, // 弹框事件

    // submit, // 默认表单提交事件

    judge_auth, // 判断授权

   // do_app_fn, // 使用app方法
   // do_app_fns, // 使用app多个方法


    get_codes, // 测试获取未使用的code

   // set_stro, // 设置缓存

   // do_wx, // 使用微信的方法

    getFormId, // 收集formID


    console_log, // 打印
   // formSubmit, //表单提交
    set_navName, // 修改导航栏标题
  

	chose_back,// 选择_返回操作
	get_chose,// 获取_选择页返回数据

    chooseLocation,// 打开地图选择位置

    judge_login,// 判断登陆

    judge_login_back,// 判断登陆_回调

    urlEncode

}