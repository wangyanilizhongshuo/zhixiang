/*  常用代码示例

    // 获取导航
    this.getNav()

    console.log(this);
    console.log('onLoad 页面加载', options);
    console.log('获取首页导航', e);
    console.log('获取首页导航 接口调取成功', res);
    console.log('获取首页导航 接口调取失败', res);
    this.toastTip(res.data.msg)
    util.toastTip(res.data.msg)

    if (obj.currentTarget) {
        obj = obj.currentTarget.dataset;
    }


    // 首页导航
    getNav() {
        console.log('获取首页导航');
        util.https('nav', undefined, 'GET').then(res => {
            console.log('获取首页导航 接口调取成功', res);
            res.msg && this.toastTip(res.msg);
            this.setData({
                navlist: res.data || [],
            })
        }).catch(res => {
            console.log('获取首页导航 接口调取失败', res);
            res.msg && this.toastTip(res.msg);
            res.data.msg && this.toastTip(res.data.msg);
        })
    },
            // this.toastTip(res.data.msg);


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

*/

// var sMD5 = require('spark-md5.js');

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
    console.log(obj);
    return obj;
}
// set_pages();  

// 登录页面
var login_url = '/pages/common/login/login';

// 变量路径拆分 var_path_split({path, start, is_data:true, _this}) path->路径 start->初始值
function var_path_split({
    path='',
    start,
    is_data = true,
    _this
}) {
    var reg = /[^\[\]\.]+/g;
    var arr = path.match(reg);
    var var_v = start || (is_data ? (_this || this).data : _this); // var_value
    if(!arr||!arr.length){
        console.log('无路径, 返回原数据', var_v)
        return var_v;
    }

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
    if (!e) {
        return {};
    }
    var param = e.currentTarget.dataset.param;
    var dataset = e.currentTarget.dataset;
    e.currentTarget.dataset.param = {};
    e.currentTarget.dataset = {
        ...e.currentTarget.dataset,
        ...param,
        ...e.detail,
    };
    return e.currentTarget.dataset;
}

// 应用到util的 request请求函数 与 delayJump延迟跳转函数
// var util = require('wjw_util.js');


// 判断请求网站, 是否添加前缀;  getUrl(url);
function getUrl(url) {
    // console.log('判断请求网站, 是否添加前缀', url, url.indexOf('://') == -1, getApp().globalData.api);
    if (url.indexOf('://') == -1) {
        url = getApp().globalData.api + url;
    }
    return url
}


// 延迟跳转
function delayJump(url = '/pages/index/index', duration = 1000, type = 1) {
    console.log('延迟跳转', {
        url,
        duration,
        type
    });
    setTimeout(function() {
        var method = '';
        switch (type) {
            case 1:
                method = 'navigateTo';
                break;
            case 2:
                method = 'redirectTo';
                break;
            case 3:
                method = 'switchTab';
                break;
            default:
                break;
        }
        wx[method]({
            url: url,
            fail(err) {
                console.log('页面不存在', err);
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
    console.log('网络请求', {
        url,
        param,
        method,
        isDebug,
        isshowLoading,
    });
    if (isshowLoading) {
        wx.showLoading({
            title: '请求中...'
        });
    }
    let timeStart = Date.now();
    return new Promise((resolve, reject) => {
        wx.request({
            url: getUrl(url),
            data: param,
            method: method,
            header: {
                'content-type': 'application/json', // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
                'token': wx.getStorageSync('token'),
            },
            complete: (res) => {
                if (isshowLoading) {
                    wx.hideLoading()
                }
                if (isDebug) {
                    console.log(`耗时${Date.now() - timeStart}`);
                    console.log(res.data)
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
    if (!msg || msg == 'Error') {
        console.log('msg不可为空或Error', arguments);
        return
    }
    wx.showToast({
        title: msg,
        icon: icon,
        duration: duration
    })
}

//  登录检测
function login_check() {
    console.log('登录检测');
    let token = wx.getStorageSync('token');
    return token;
}

// 页面跳转 基于delayJump延迟跳转函数
// 参数: 1.data-url 页面地址; 2.data-type 跳转类型; 3.data-time 跳转延迟时间; 4.data-check 跳转前判断; 其他皆为传递参数
function jump(e) {
    console.log('页面跳转', e, e.currentTarget.dataset.url);

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
        console.log('无跳转页面', url);
        return
    }

    // console.log(login_check);
    // 登录检测
    if (check) {
        // login_check 登录检测
        if (login_check && login_check()) {
            console.log('跳转到登录页面', e);

            console.log(getCurrentPages());
            getCurrentPages().some(item => {
                return item.route == getApp().globalData.page_data.pages.common_accounts;
            })
                ||
            delayJump(login_url, 0);
            return;
        }
    }

    if (wx.jump) {
        console.log('正在页面跳转, ' + wx.jump_time + '秒后可点击');
        return;
    } else {
        wx.jump = true;
        wx.jump_time = time / 1000 + 1;
        setTimeout(() => {
            wx.jump = false;
        }, time + 1000)
    }

    var param = '?'; //存储拼接的参数
    for (let i in obj) {
        if (fixed_param_arr.indexOf(i) != -1) {
            continue
        }
        param += `${i}=${obj[i]}&`;
    }
    if (param == '?') {
        param = '';
    }

    // 手机号检测
	console.log('phone_check', phone_check);
    if (phone_check) {
        console.log('需要绑定手机号, 判断用户是否绑定手机号');
        var {
            user_info
        } = getApp().globalData;
		if (!(user_info&&user_info.mobile)) {
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

// 随机范围
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// 随机色
function color_random() {
    console.log('随机色');

    var r = random(0, 255);
    var g = random(0, 255);
    var b = random(0, 255);
    // console.log('rgb('+r+','+g+','+b+')');
    return 'rgb(' + r + ',' + g + ',' + b + ')';

}

/**
 * html input 禁止输入中文
<input type="text" class="tel" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')" placeholder="请输入账号" />
 */

/**
 * <input id='txt' onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\u4E00-\u9FA5]/g,''))" >只能输入中文的
<input onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">只能输入数字
 */

// 验证邮箱
function is_email(email) {
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");;
    if (reg.test(email)) {
        console.log("邮箱正确");
        return true;
    } else {
        console.log("邮箱错误");
        return false;
    }
}

// 验证手机号
function is_phone(phone) {
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(phone)) {
        console.log("手机号正确");
        return true;
    } else {
        console.log("手机号错误");
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
    var reg = /^[\u4e00-\u9fa5]+$/ig;
    if (reg.test(name)) {
        console.log("文字为全中文");
        return true;
    } else {
        console.log("文字非全中文");
        return false;
    }
}

// 验证不含中文
function no_have_zh_CN(name) {
    var reg = /[\u4e00-\u9fa5]/ig;
    if (reg.test(name)) {
        console.log("文字含有中文");
        return false;
    } else {
        console.log("文字全非中文");
        return true;
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

// 获取列表 请求依赖request函数
function get_list({
    name, // string, 列表名称
    list_name = 'list', // string, page_data中对应的列表属性名, 默认为'list'
    dyadic_arr_index, // 二维数组下标, number
    page_prop = 'page', // string, page_data中对应的页码属性名, 默认为'page'
    page = (page_prop ? this.data[page_prop] : this.data.page) || 1, // number, 页码, 此处用到形参page_prop, 所以位置要在形参page_prop之后
    size_prop = 'size', // string, size有值，而size_prop无实参时，默认size_prop为字符串size
    size = (size_prop ? this.data[size_prop] : this.data.size) || 10, // number, 每页数量
    loading_prop = 'loading',

    url, //请求地址
    request_param, // obj, 请求传递的其他参数对象集合(page与size固定，不在此参数中，会被此对象属性替换)
    method = 'post',
    data_prop, // 在 返回数据列表 中需要提取的属性, 单个属性可以是字符串, 正常是数组, 缩减数据

    res_data, // 二级数据

    request_page1_fn, // page为1时执行的函数(在发送请求前执行)
    request_before_fn, // page不为1时执行的函数(在发送请求前执行)

    request_back_page1_fn, // page为1时请求后的执行函数
    request_back_fn, // 请求后的额外回调函数, 在get_list自带请求成功代码后 执行
    // request_stop_fn, // 请求后的数据如果小于size或res.size
    request_stop_fn, // 请求后的数据如果长度等于0

}) {
    console.log(`获取${name || list_name}列表`, list_name, page_prop, page);
    var const_size = 10;

    var event_data = '';
    typeof page == 'object' && (
        event_data = dataset(page),
        // console.log(event_data),
        // console.log(event_data, ' ----------------------- ', (event_data.page - 0)),
        page = (event_data.page - 0) || (page_prop ? this.data[page_prop] : this.data.page) || 1,
        size = (event_data.size - 0) || size
    );
    // console.log({
    //     page,
    //     size,
    // });
    if (typeof page != 'number') {
        page = Number(page);
        // console.log({
        //     page
        // });
        isNaN(page) && (
            page = 1
            // console.log('page', page)
        );
    }


    // page自增长, 同步page_data对应记录页面数据
    var obj = {};

    if (size_prop) {
        if (size) {
            obj[size_prop] = size;
        } else {
            size = this.data[size_prop];
        }
    } else if (size) {
        obj.size = size;
    } else if (this.data.size) {
        size = this.data.size;
    }
    // console.log(obj);
    this.setData(obj);
    this.setData({
        [loading_prop]: true,
    });

    if (page == 1) {
        console.log(`${name || list_name}列表刷新`, `${list_name}${dyadic_arr_index || ""}`);
        this.setData({
            [`${list_name}${dyadic_arr_index || ""}`]: []
        });

        if (request_page1_fn && request_page1_fn()) {
            return;
        }
    } else {
        if (request_before_fn && request_before_fn()) {
            return;
        }
    }

    // console.log({
    //     list_name
    // });
    if (this[list_name + '_request']) {
        this[list_name + '_request']++;
    } else {
        this[list_name + '_request'] = 1;
    }
    var list_request = this[list_name + '_request'];
    // console.log({
    //     list_request
    // });
    (util.https ? util.https : request)(url, {
        page,
        size,
        ...request_param,
    }, method)
    .then(res => {
            console.log(`${name || list_name}列表 接口调取成功`, res);

            if (list_request != this[list_name + '_request']) {
                console.log(
                    `非${list_name}列表最近请求的数据, 不执行页面数据对接`,
                    list_request,
                    this[list_name + '_request']
                );
                return;
            }

            this.setData({
                [loading_prop]: false,
            })

            var back_data = res_data ? res.data[res_data] : res.data;
            if (back_data) {

                if (back_data.length) {
                    // 页码加一
                    obj[page_prop] = page + 1;
                    // console.log(obj);
                    this.setData(obj);
                }

                obj = {};
                obj[list_name] = this.data[list_name] || [];
                if (page == 1) {
                    if (typeof dyadic_arr_index == 'number') {
                        obj[list_name][dyadic_arr_index] = [];
                    } else {
                        obj[list_name] = [];
                    }
                    console.log(`${name || list_name}${typeof dyadic_arr_index == 'number' && '第' + (dyadic_arr_index + 1) + '页' || ''}列表刷新完毕`);
                    if (request_back_page1_fn && request_back_page1_fn(res)) {
                        return;
                    }
                }

                // 简化数据
                // console.log('简化数据参数', typeof data_prop);
                data_prop && back_data.forEach((item, index, arr) => {
                    // console.log({ item, index, arr }, typeof data_prop);
                    // item.sss='1';//可修改
                    var obj = {};
                    if (typeof data_prop == 'string') {
                        obj[data_prop] = item[data_prop];
                    } else if (typeof data_prop == 'object') {
                        for (let i of data_prop) {
                            obj[i] = item[i];
                        }
                    }
                    arr[index] = obj;
                });

                if (typeof dyadic_arr_index == 'number') {
                    obj[list_name][dyadic_arr_index].push(...back_data);
                } else {
                    obj[list_name].push(...back_data);
                }

                // console.log({
                //     obj,
                //     list_name
                // })
                this.setData(obj);
                // console.log(this.data[list_name]);

                if (request_back_fn && request_back_fn(res)) {
                    return;
                }

                // console.log( back_data.length, size, const_size, back_data.length < size || const_size );
                // if (back_data.length < (size || const_size)) {
                if (back_data.length == 0) {
                    // toastTip(res.msg);
                    console.log(`${name || list_name}列表无后续数据, 结束后续操作`);
                    // console.log(this);
                    if (request_stop_fn && request_stop_fn(res)) {
                        return;
                    }
                }

                var data_list = typeof dyadic_arr_index == 'number' ? this.data[list_name][dyadic_arr_index] : this.data[list_name];
                if (res.data.dataCount && (res.data.dataCount < data_list.length)) {
                    console.error('数量异常', this.data.goods_list, res.data.dataCount);
                }

            } else {
                // toastTip(`第${page}页${name || list_name}获取失败, 暂无获取失败页操作， 可重新刷新该页面或联系客服升级VIP开通该功能`);
                toastTip(`第${page}页${name || list_name}获取失败, ${res.msg}, 请刷新页面`);
                console.log(`第${page}页${name || list_name}获取失败`);
                // this.setData({ opus_page: page });
            }

        })
        .catch(res => {
            console.log(`获取${name}列表 报错`, res);
            util.toastTip(res.data.msg);
            this.setData({
                [loading_prop]: false,
            })
        });
}

// 拨打电话 
// ---------------- 注意改成默认值为this.data -----------------------
function call(e) {
    console.log('拨打电话', e);
    var _dataset = dataset(e);
    var {
        phone = _dataset.phone
    } = this.data;

    // 转化为字符串
    phone += '';

    // console.log(phone);
    wx.makePhoneCall({
        phoneNumber: phone
    })
}

// 在新页面中全屏预览图片 绑定事件 元素自定义属性(data-) ( imgs(图片数组)与index(当前图片下标) ) 或者 img(当前图片)
function preview_img(e) {
    console.log('在新页面中全屏预览图片', e);

    var {
        index,
        imgs,
        img
    } = dataset(e);
    // console.log({
    //     index,
    //     imgs,
    //     img
    // });
    if (imgs && typeof imgs == 'object' && !Array.isArray(imgs)){
        imgs = Object.keys(imgs).map(i => {
            return imgs[i];
        });
    }
    console.log('imgs', imgs);
    wx.previewImage({
        current: img || imgs[index], // 当前显示图片的http链接
        urls: imgs || [img], // 需要预览的图片http链接列表
        success: res => {
            // console.log('预览图片 小程序接口调取成功', res);
            toastTip('长按出现“保存图片”选项', undefined, 1500);
        },
    })
}

// 图片加载失败
/*
    <image  src="{{item.img||'/img/default.png'}}" lazy-load
            bindload='img_load' 
            binderror='img_err' data-arr='merchlist' data-index='{{index}}' data-name='logo' 
            data-default_img='/img/default.png'
    />

    先报错再执行失败事件
*/
function img_err(e) {
    // console.log('图片加载失败', e);
    var glo = getApp().globalData;
    var {
        src,
        arr,
        index,
        name,
        default_img = (glo.page_data && glo.page_data.default_img) || '/img/default.png'
    } = dataset(e);
    var path =
        src ||
        (
            arr ?
            name ?
            `${arr}[${index}].${name}` :
            `${arr}[${index}]` :
            name
        );
    // console.log({
    //     src,
    //     arr,
    //     index,
    //     name,
    //     default_img,
    //     path
    // });
    if (path) {
        // console.log('替换图片路径', { path });
        this.setData({
            [path]: default_img
        });
    } else {
        // console.log('无替换路径');
        return;
    }

}

// 图片加载
function img_load(e) {
    // console.log('图片加载', e);
}

// 切换布尔值 bindtap='trigger' data-name='name' catchtap='trigger' 
function trigger(e) {
    var {
        name
    } = dataset(e);
    var data_v = var_path_split.call(this, {
        path: name,
        start: this.data
    });
    // console.log('切换布尔值', e, !data_v);
    this.setData({
        [name]: !data_v
    })

}

// 输入框修改属性 bindinput='input_set_value' data-name='name' data-int='{{true}}'(取整) catchtap='input_set_value'
function input_set_value(e) {
    var {
        name,
        int,
    } = dataset(e);
    var {
        value = ''
    } = e.detail;
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
            start: this.data
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
    // console.log('设置属性值', e, {
    //     name,
    //     value,
    //     method,
    // });
    var name_arr = name.split(/ *[,， ] */g);
    var value_arr = [];
    if (typeof value == 'string') {
        value_arr = value.split(/ *[,， ] */g);
    } else {
        value_arr.push(value);
    }
    // console.log({
    //     name_arr,
    //     value_arr
    // });
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
            start: this.data
        });
        if (no_report && data_v == value) {
            console.log('属性值相同, 不设置', {
                name: item,
                value,
                data_v,
            }, data_v == value);
            return
        }

        // console.log('push判断', method == 'push', index == indexs);
        if (method == 'push' && index == indexs) {
            // console.log('push');
            if (!Array.isArray(data_v)) {
                data_v = [];
            }
            data_v.push(value);
            value = data_v;
        }

        // console.log('splice判断', method == 'splice', index == indexs);
        if (method == 'splice' && index == indexs) {
            // console.log('splice');
            if (!Array.isArray(data_v)) {
                data_v = [];
            }
            var arr_index = -1;
            while ((arr_index = data_v.indexOf(value)) != -1) {
                // console.log('删除', arr_index);
                data_v.splice(arr_index, 1)
            }
            // console.log('删除111', data_v.indexOf(value));
            value = data_v;
        }

        // console.log('arr_push判断', method == 'arr_push', index == indexs);
        if (method == 'arr_push' && index == indexs) {
            // console.log('arr_push');
            if (!Array.isArray(data_v)) {
                data_v = [];
            }
            data_v.push(...value);
            value = data_v;
        }

        // console.log(item, value);
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
        start: this.data
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
    wx.showToast({
        title,
        icon,
        duration,
    });
}

// 执行多个方法 bindtap="do_fns" data-fns='fn1 fn2'
function do_fns(e) {
    // console.log('执行多个方法', e);
    var {
        fns = '',
    } = dataset(e);
    var fn_arr = fns.split(/ *[,， ] */g);
    fn_arr.map((item, index, arr) => {
        // console.log({
        //     item,
        //     index
        // });
        item && this[item](e);
    });
}

// 获取微信服务器临时文件 递归调用 需要页面this
function uploadFiles({
    file,
    i = 0,
    url = getApp().globalData.api + 'upload',
    name = 'file',
    data_name = 'files',
    header,
    formData,
    is_new = false,
    back_fn
}) {
    console.log("获取微信服务器临时文件", arguments, file[i]);
    wx.showLoading({
        title: '加载图片中',
        mask: true,
    });
    var arg = arguments;
    var that = this;
    var success = url => {
        var arr = this.data[data_name] || this.var_path_split({
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
            // console.log(arguments, {
            //     ...arg[0],
            //     i: i + 1
            // });
            this.uploadFiles({
                ...arg[0],
                i: i + 1
            });
        } else {
            wx.hideLoading();
            back_fn && back_fn(arr);
            this.msg && this.toastTip(this.msg);
            this.msg = undefined;
        }
    }
    if (file[i] && file[i].indexOf('http://tmp') == -1 && file[i].indexOf('https://tmp') == -1 && file[i].indexOf('wxfile://tmp') == -1) {
        console.log("非本地临时文件, 下一个");
        success(file[i]);
        return;
    }

    var upstate_success = res => {
        wx.uploadFile({
            url,
            filePath: file[i],
            name,
            formData: {
                watermark: 1,
                ...formData,
            },
            header: {
                "Content-Type": "multipart/form-data",
                // "Content-Type": "application/json",
                'token': wx.getStorageSync('token'),
                ...header,
            },
            success: (res) => {
                console.log("获取微信服务器临时文件 成功", i + '/' + file.length, res);
                var res_data = JSON.parse(res.data).data;
                if (res_data && res_data.url) {
                    var url = res_data.url;
                    success(url);
                } else {
                    file.splice(i, 1);
                    this.msg = JSON.parse(res.data).msg;
                    if (file.length <= i) {
                        var arr = this.data[data_name] || this.var_path_split({
                            path: data_name
                        }) || [];
                        if (is_new && i == 0) {
                            arr = [];
                        }
                        back_fn && back_fn(arr);
                        this.msg && this.toastTip(this.msg);
                        this.msg = undefined;
                    } else {
                        this.uploadFiles({
                            ...arg[0],
                        });
                    }
                }
            },
            fail: function (err) {
                console.log('获取微信服务器临时文件 失败', err);
                // that.uploadFile2(arguments);
            }
        })
    }


    // 上传检测
    var filePath = file[i];
    wx.getFileSystemManager().readFile({
        filePath, //选择图片返回的相对路径
        success: res => {
            //成功的回调
            console.log('data:image/png;base64,', res)
            console.log(res.data)
            var spark = new sMD5.ArrayBuffer();
            spark.append(res.data);
            var hexHash = spark.end(false);
            console.log(hexHash);
            // 上传检测
            util.https('upstate', {
                md5: hexHash,
                filename: filePath,
                watermark: 1,
                ...formData,
                
            }, 'POST').then(res => {
                console.log('上传检测 接口调取成功', res);
                if (res.data) {
                    console.log('文件已上传', res.data.site_url);
                    // this.toastTip(res.msg);
                    success(res.data.site_url);
                }else{
                    upstate_success()
                }
            }).catch(e => {
                console.log(e)
            })
        }
    });
}

// 滚动置底
function page_scroll(e) {
    console.log('页面滚动', e);
    var {
        top = wx.getSystemInfoSync().screenHeight,
    } = dataset(e);
    wx.pageScrollTo({
        duration: 0,
        scrollTop: top,
    })
}

/*
function get_glo_info(resolve)
 resolve 回调相关数据 函数/事件对象 data-back_fn
    //resolve 回调相关数据 解析
    var back_fn = undefined;
    if(resolve){
        typeof resolve == 'function'
        ?
            (back_fn = resolve)
        :
            typeof resolve == 'object' && resolve.currentTarget && resolve.currentTarget.dataset && JSON.stringify(resolve.currentTarget.dataset) != "{}" && resolve.currentTarget.dataset.bakc_fn


    }
*/
// 获取全局用户详情 需要页面this
function get_glo_info(back_fn) {
    var app = getApp();
    console.log('全局重新获取用户详情', back_fn);

    app.get_user_info(res => {
        console.log('获取用户数据成功', app.globalData.user_info);
        // console.log(this);
        this.setData({
            user_info: app.globalData.user_info,
        });
        app.globalData.user_info && app.globalData.user_info.mobile && back_fn && typeof back_fn == 'function' && back_fn(app.globalData.user_info);
    })
    // }

}

// 相对路由 需要页面this
function relative_route() {
    console.log('相对路由');
    var arr = this.route.split('/');
    // console.log(arr);
    var str = '';
    for (var i = 1; i < arr.length; i++) {
        str += '../';
    }
    // console.log(str);
    this.setData({
        relative_route: str,
    })

}

// 创建dataset
function create_dataset(obj) {
    console.log('创建dataset', obj);
    return {
        currentTarget: {
            dataset: obj
        }
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
    https_param = {
        ...dataset(e),
        ...https_param
    };
    (util.https ? util.https : request)(
        url,
        https_param,
        method
    )
    .then(res => {
            console.log('接口回调成功', res);
            typeof back_fn === 'function' && back_fn(res);
            https_then && this[https_then] && this[https_then]({
                ...e,
                ...res
            });
        })
        .catch(res => {
            console.log('接口回调失败', res);
            https_catch && this[https_catch] && this[https_catch]({
                ...e,
                ...res
            });
        });

}

// 确认对话框 catch bindtap='show_modal' data-title='title' data-contents='' data-confirm='' data-cancel=''
/*
    data-show-cancel='{{false}}' data-cancel='show_modal'
    this.show_modal(this.create_dataset({
        title:'',
        contents:'',
        confirm:'',
        cancel:'show_modal',
        showCancel: false,
    }))
*/
function show_modal(e) {
    console.log('确认对话框', e);
    var obj = dataset(e);
    var content = obj.contents || obj.content;
    wx.showModal({
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
                typeof obj.cancel == 'function' && obj.cancel();
                obj.cancel && this[obj.cancel] && this[obj.cancel](e);
            }
        }
    })

}

// 根据 经纬度 获取地址
function get_addr_info({
    latitude,
    longitude,
    back_fn,
}) {
    console.log('根据 经纬度 获取地址', {
        latitude,
        longitude
    });
    util.https('map/getAddress', {
        latitude,
        longitude
    }).then(res => {
        console.log('根据 经纬度 获取地址 接口调取成功', res);
        var title = res.data.result.formatted_addresses.recommend,
            city = res.data.result.address_component.city,
            area = res.data.result.address_component.district,
            latitude = res.data.result.location.lat,
            longitude = res.data.result.location.lng;

        var location = {
            title,
            city,
            area,
            latitude,
            longitude,
        };

        typeof back_fn === 'function' && back_fn(location);
    }).catch(e => {
        console.log('根据 经纬度 获取地址 报错', e);
    })
}

//页面加载完成函数
function onReady() {
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

//对象属性值遍历筛选
function obj_value_filter(obj, arr = ['', null, undefined]) {
    console.log('对象属性值遍历筛选');
    for (var i in obj) {
        if (arr.indexOf(obj[i]) != -1) {
            console.log('空值', i, obj[i]);
            return i;
        }
    }
    return false;
}

//回调判断
function fn_judeg(back_fn, e) {
    console.log('回调判断', {
        back_fn,
        e
    });
    // console.log(this);

    if (back_fn) {
        if (typeof back_fn == "function") {
            return back_fn(e)
        } else if (typeof back_fn == "string") {
            return this[back_fn] && this[back_fn](e);
        } else {
            console.error('回调类型不确定', back_fn);
        }
    } else {
        console.error('无回调', back_fn);
    }
}

// 使用自定义参数的数据来判断执行事件 judeg_prop, judeg_calc, judeg_true, judeg_false,
function dataset_judeg(e) {
    console.log('使用自定义参数的数据来判断执行事件');
    var data_set = dataset(e);
    var {
        judeg_prop, // 自定义参数判断属性
        judeg_calc, // 数据 计算判断
        judeg_true, // 为真回调
        judeg_false, // 为假回调
    } = data_set;
    if (judeg_calc) {
        if (this.fn_judeg(judeg_calc, data_set[judeg_prop])) {
            this.fn_judeg(judeg_true, e);
        } else {
            this.fn_judeg(judeg_false, e);
        }
    } else {
        console.error('无 自定义参数的数据 计算判断, 请补齐参数', judeg_calc);
    }
}

// 修改自定义参数
function dataset_edit(e) {
    console.log('修改自定义参数');
    var data_set = dataset(e);
    var {
        edit_names,
        edit_props,
        edit_obj = '', // 'this', 'data', ''
    } = data_set;
    if (edit_names == undefined || edit_props == undefined) {
        console.log('修改自定义参数 数据未传入');
        return
    }
    Array.isArray(edit_names) || (edit_names = edit_names.split(/ *[,， ] */g));
    Array.isArray(edit_props) || (edit_props = edit_props.split(/ *[,， ] */g));
    Array.isArray(edit_obj) || (edit_obj = edit_obj.split(/ *[,， ] */g));
    edit_names.map((edit_name, indexs, arr) => {
        // console.log(edit_name);
        indexs > edit_props.length - 1 && (indexs = edit_props.length - 1);
        var obj_index = indexs;
        obj_index > edit_obj.length - 1 && (obj_index = edit_obj.length - 1);
        if (edit_obj[obj_index] == 'this') {
            data_set[edit_name] = var_path_split({
                path: edit_props[indexs],
                start: this
            })
            // data_set[edit_name] = this[edit_props[indexs]];
        } else if (edit_obj[obj_index] == 'data') {
            data_set[edit_name] = var_path_split({
                path: edit_props[indexs],
                start: this.data
            })
            // data_set[edit_name] = this.data[edit_props[indexs]];
        } else {
            data_set[edit_name] = var_path_split({
                path: edit_props[indexs],
                start: data_set
            })
            // data_set[edit_name] = data_set[edit_props[indexs]];
        }
    });
    // console.log(data_set);
    e.currentTarget.dataset = data_set;
    // console.log(e);
}

//默认表单提交事件
function submit(e) {
    console.log('默认表单提交事件', e, e.detail.value);

    var that = this;
    var form_data = e.detail.value;
    var {
        form_data_require
    } = this.data;

    var require_data = Array.isArray(form_data_require) ? form_data_require : form_data_require == 'all' ? Object.keys(form_data) : [];
    // console.log(require_data);
    var require = require_data.some(item => {
        // console.log(item);
        var items = form_data[item];
        return items === '' || (Array.isArray(items) && !items.length);
    });
    // console.log(require);

    if (require) {
        console.log('请完善信息');
        util.toastTip('请完善信息');
        // return;
        // } else if (123) {
    } else {
        console.log('信息已完善');
        // util.toastTip('信息已完善');
    }
    return !require;
}

// 选择手机图片
function chooseImage(e) {
    console.log('选择手机图片', e);
    var data_set = dataset(e);
    var {
        success,
    } = data_set;
    wx.showLoading({
        title: '打开相册中...',
        mask: 1,
    });
    wx.chooseImage({
        sizeType: ['compressed'],
        ...data_set,
        success: res => {
            // console.log('选择手机图片成功', res);

            wx.showLoading({
                title: '加载图片中',
                mask: true,
            })
            this.uploadFiles({
                file: res.tempFilePaths,
                url: getApp().globalData.api + 'upload/upload',
                // data_name: '？？？',
                is_new: true,
                back_fn: arr => {
                    wx.hideLoading();
                    this.chooseImage_data = arr;
                    success && this[success] && this[success](e);
                }
            });
        },
        fail:res=>{
            console.log('选择手机图片失败', res);
            wx.hideLoading();
        },
    })
}


// 执行生命周期
function cycle(e) {
    console.log('使用自定义参数的数据来判断执行事件');
}


// 重复点击
function repeat_click(name) {
    console.log('重复点击', name);
    var fn = this[name];
    this[name] = function() {
        fn(...arguments);
        var fn2 = this[name];
        this[name] = null;
        setTimeout(function() {
            this[name] = fn2;
        }, 2000);
    }
}

// 页面唯一点击
function page_repeat_click(name) {
    console.log('页面唯一点击', name);
    var fn = this[name];
    this[name] = function() {
        if (this.repeat_click_judeg) {
            return;
        }
        this.page_repeat_click_judeg = true;
        fn(...arguments);
    }
}

// 请求数据之get
function c_https(e) {
    console.log('请求数据之get', e);
    var data_set = dataset(e);
    var {
        url,
        data = {},
        method = 'get',
        res_prop='',
        data_name='res',
    } = data_set;
    url && util.https(url, data, method).then(res => {
        console.log('请求数据之get 接口调取成功', res);
        var data = this.var_path_split({
            path: res_prop,
            start: res,
            is_data: false,
        })
        this.setData({
            [data_name]: data
        });
    }).catch(e => {
        console.log(e)
    })
}

// 事件对象添加函数
function dataset_fn(e) {
    console.log('事件对象添加函数', e);
    var data_set = dataset(e);
    var { data_fn = [] } = data_set;
    Array.isArray(data_fn) || (data_fn = [data_fn]);
    for (let item of data_fn) {
        // console.log(item, this[data_set[item]]);
        e.currentTarget.dataset.param || (e.currentTarget.dataset.param = {})
        e.currentTarget.dataset.param[item] = this[data_set[item]];
    }
}

// 调用微信方法
function use_wx(e) {
    console.log('调用微信方法', e);
    // 事件对象添加函数
    this.dataset_fn(e);
    console.log(e);
    var data_set = dataset(e);
    var { method } = data_set;
    console.log(data_set, method);
    method && wx[method](data_set);
}

// 千位分隔符
function cut_money(num, dot) {
    if (num && num != null) {
        num = String(num);
        var left = num.split('.')[0], right = num.split('.')[1];
        right = dot ? (right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00') : right?'.' +right:'';
        var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
        return (Number(num) < 0 ? "-" : "") + temp.join(',').split('').reverse().join('') + right;
    } else if (num === 0) {   //注意===在这里的使用，如果传入的num为0,if中会将其判定为boolean类型，故而要另外做===判断
        return dot ? '0.00' : num;
    } else {
        return "";
    }
}

// 清除图片  binderror='clear_img' data-path='data[{{item.name}}][{{imgIndex}}]'
function clear_img(e) {
    console.log('清除图片', e);
    var data_set = dataset(e);
    var { path, is_arr, arr, index, } = data_set;
    if (is_arr) {
        var data = var_path_split.call(this, {
            path: arr,
        })
        if(Array.isArray(data)){
            data.splice(index, 1);
            console.log(this, data, arr);
            this.setData({
                [arr]: data,
            });
        }else{
            console.log('非数组');
        }
    } else if (path) {
        this.setData({
            [path]: '',
        })
    }
}

// 引入js文件
function get_file(path) {
    console.log('引入js文件', path);
    return require(path);
}


// 计算时间差
function time_dif(time1 = '', time2 = '', icon) {
    console.log('计算时间差', {
        time1,
        time2
    })
    typeof time1 == 'string' && (time1 = time1.replace(/-/g, '/'));
    typeof time2 == 'string' && (time2 = time2.replace(/-/g, '/'));
    // time1 = time1.replace(/-/g, '/');
    // time2 = time1.replace(/-/g, '/');
    time1 = time1 ? new Date(time1) : new Date();
    time2 = time2 ? new Date(time2) : new Date();
    if (time1 == 'Invalid Date' || time2 == 'Invalid Date') {
        console.log('请传入有效的时间格式', {
            time1,
            time2
        })
        return
    }
    time1 = time1.getTime();
    time2 = time2.getTime();
    var dif = Math.abs(time1 - time2);

    // 得到的结果为 毫秒数，可根据 毫秒数的大小，来判断时间。

    // 当然根据毫秒数 可以根据他们的差值 来求相差的天数或是小时等。


    //计算出相差天数
    var days = Math.floor(dif / (24 * 3600 * 1000))

    //计算出小时数

    var leave1 = dif % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)
    var time_str = '';
    if (days) {
        time_str += days + (icon || '天');
    }
    if (hours) {
        time_str += hours + (icon || '小时');
    }
    if (minutes) {
        time_str += minutes + (icon || '分钟');
    }
    if (seconds) {
        time_str += seconds + (icon ? '' : '秒');
    }
    if (!time_str) {
        time_str = '0' + (icon ? '' : '秒');
    }
    // alert(" 相差 " + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
    return {
        time_str,
        time_obj: {
            days,
            hours,
            minutes,
            seconds,
        }
    }

}


module.exports = {
    set_pages, // 页面名称简化 用于app.js

    var_path_split, // 变量路径拆分 需要页面this
    dataset, // 设置自定义参数 需要事件event

    getUrl, // 判断请求网站, 是否添加前缀;  getUrl(url);
    delayJump, // 延迟跳转
    buildRequest, // 网络请求 对象参数
    request, // 网络请求 一对一参数
    toastTip, // 提示信息
    get_list, // 获取列表, 依赖1.request函数; 2.toastTip函数 需要页面this

    login_check, // 登录检测
    jump, // 页面跳转, 依赖1.request函数; 2.login_check函数

    random, // 随机范围
    color_random, // 随机色, 依赖random函数

    is_email, // 验证邮箱
    is_phone, // 验证手机号
    is_zh_CN, // 验证中文
    no_have_zh_CN,// 验证不含中文
    isCardNo, // 验证身份证号码

    call, // 拨打电话 需要页面this

    preview_img, // 在新页面中全屏预览图片

    img_err, // 图片加载失败 需要页面this
    img_load, // 图片加载

    trigger, // 切换布尔值 需要页面this

    input_set_value, // 输入框修改属性 需要页面this

    set_value, // 设置属性值 需要页面this

    count_value, // 增减属性值 需要页面this

    event_false, // 阻止事件冒泡
    stop_swiper, // 禁止滑动

    showToast, // 显示提示
    show_modal, // 确认对话框

    do_fns, // 执行多个方法 需要页面this

    uploadFiles, // 获取微信服务器临时文件 递归调用 需要页面this

    page_scroll, // 滚动置底

    get_glo_info, // 获取全局用户详情 需要页面this

    relative_route, // 相对路由 需要页面this

    create_dataset, // 创建dataset

    http_dataset, // 发送请求 dataset参数 需要页面this

    get_addr_info, // 根据 经纬度 获取地址

    onReady, //页面加载完成函数

    set_glo, //设置全局变量

    obj_value_filter, //对象属性值遍历筛选

    fn_judeg, //回调判断 fn_judeg(back_fn, e)

    dataset_judeg, // 使用自定义参数的数据来判断执行事件 dataset_judeg(e) judeg_prop, judeg_calc, judeg_true, judeg_false,

    dataset_edit, // 修改自定义参数

    submit, //默认表单提交事件

    chooseImage, // 选择手机图片

    repeat_click, // 重复点击
    page_repeat_click, // 页面唯一点击

    c_https,    // 请求数据之get
    
    dataset_fn,		// 事件对象添加函数
    use_wx,			// 调用微信方法

    cut_money,      // 千位分隔符

    clear_img,      // 清除图片

    time_dif,       // 计算时间差

}