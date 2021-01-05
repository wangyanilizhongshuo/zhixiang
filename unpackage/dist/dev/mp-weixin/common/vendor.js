(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });var


EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {var _this = this;_classCallCheck(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this.on(name, events[name]);
      });
    }
  }_createClass(EventChannel, [{ key: "emit", value: function emit(

    eventName) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {return opt.type !== 'once';});
    } }, { key: "on", value: function on(

    eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    } }, { key: "once", value: function once(

    eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    } }, { key: "off", value: function off(

    eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    } }, { key: "_clearCache", value: function _clearCache(

    eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    } }, { key: "_addListener", value: function _addListener(

    eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type });

    } }]);return EventChannel;}();


var eventChannels = {};

var eventChannelStack = [];

var id = 0;

function initEventChannel(events) {var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  } };


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  navigateTo: navigateTo,
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {args[_key4 - 1] = arguments[_key4];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 12:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!********************************************************!*\
  !*** C:/Users/19217/Desktop/works/zhixiang/pages.json ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 531:
/*!***************************************************************************!*\
  !*** C:/Users/19217/Desktop/works/zhixiang/components/uni-popup/popup.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _message = _interopRequireDefault(__webpack_require__(/*! ./message.js */ 532));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// 定义 type 类型:弹出类型：top/bottom/center
var config = {
  // 顶部弹出
  top: 'top',
  // 底部弹出
  bottom: 'bottom',
  // 居中弹出
  center: 'center',
  // 消息提示
  message: 'top',
  // 对话框
  dialog: 'center',
  // 分享
  share: 'bottom' };var _default =


{
  data: function data() {
    return {
      config: config };

  },
  mixins: [_message.default] };exports.default = _default;

/***/ }),

/***/ 532:
/*!*****************************************************************************!*\
  !*** C:/Users/19217/Desktop/works/zhixiang/components/uni-popup/message.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  created: function created() {
    if (this.type === 'message') {
      // 不显示遮罩
      this.maskShow = false;
      // 获取子组件对象
      this.childrenMsg = null;
    }
  },
  methods: {
    customOpen: function customOpen() {
      if (this.childrenMsg) {
        this.childrenMsg.open();
      }
    },
    customClose: function customClose() {
      if (this.childrenMsg) {
        this.childrenMsg.close();
      }
    } } };exports.default = _default;

/***/ }),

/***/ 694:
/*!*****************************************************************************!*\
  !*** C:/Users/19217/Desktop/works/zhixiang/components/e-picker/e-picker.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function getDayArr(e, t) {for (var r = e % 4 == 0 && e % 100 != 0 && e % 400 != 0, a = [31, r ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], n = [], o = 0; o < a[t - 1]; o++) {n.push(fmt(o + 1) + "日");}return n;}function getArr(e) {var t = [],r = 1,a = 13,n = "月";e > 2 && (r = 0, 3 == e && (a = 24, n = "时"), e > 3 && (a = 60, 4 == e && (n = "分"), 5 == e && (n = "秒")));for (var o = r; o < a; o++) {t.push(fmt(o) + n);}return t;}function fmt(e) {return e > 9 ? e : "0" + e;}function checkShowValue(e, t) {if ("date" != e && "dateTime" != e && "time" != e) throw Error("mode无" + e + "该选项配置");if ("date" == e && 10 != t.length || "time" == e && 8 != t.length || "dateTime" == e && 19 != t.length) throw Error("'showValue'有误，请根据当前mode 正确设置格式");}function getDateTimeValue(e, t) {var r = fmt(parseInt(e[0])),a = fmt(parseInt(e[1])),n = fmt(parseInt(e[2])),o = fmt(parseInt(e[3])),m = fmt(parseInt(e[4])),u = fmt(parseInt(e[5]));return "date" == t ? r + "-" + a + "-" + n : "dateTime" == t ? r + "-" + a + "-" + n + " " + o + ":" + m + ":" + u : r + ":" + a + ":" + n;}function getLocalTime(e) {var t = new Date();switch (e) {case "dateTime":return t.getFullYear() + "-" + fmt(t.getMonth() + 1) + "-" + fmt(t.getDate()) + " " + fmt(t.getHours()) + ":" + fmt(t.getMinutes()) + ":" + fmt(t.getSeconds());case "time":return fmt(t.getHours()) + ":" + fmt(t.getMinutes()) + ":" + fmt(t.getSeconds());default:return t.getFullYear() + "-" + fmt(t.getMonth() + 1) + "-" + fmt(t.getDate());}}Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getDayArr = getDayArr, exports.getArr = getArr, exports.checkShowValue = checkShowValue, exports.getDateTimeValue = getDateTimeValue, exports.getLocalTime = getLocalTime;

/***/ }),

/***/ 749:
/*!***************************************************************************!*\
  !*** C:/Users/19217/Desktop/works/zhixiang/components/uni-icons/icons.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 8:
/*!************************************************************************!*\
  !*** C:/Users/19217/Desktop/works/zhixiang/common/wjw_uni/wjw_util.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
//添加complete：便于网络请求的complete方法。
Promise.prototype.complete = function (callback) {
  var P = this.constructor;
  return this.then(
  function (value) {return P.resolve(callback()).then(function () {return value;});},
  function (reason) {return P.resolve(callback()).then(function () {throw reason;});});

};
//封装异步api
var wxPromisify = function wxPromisify(fn) {
  return function () {var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return new Promise(function (resolve, reject) {
      obj.success = function (res) {
        resolve(res);
      };
      obj.fail = function (res) {
        reject(res);
      };

      fn(obj);
    });
  };
};

var getLocationPromisified = wxPromisify(uni.getLocation); //获取经纬度
var showModalPromisified = wxPromisify(uni.showModal); //弹窗
var getUrl = function getUrl(url) {
  if (url.indexOf('://') == -1) {
    url = getApp().globalData.api + url;
  }
  if (
  window &&
  window.location &&
  window.location.protocol &&
  ['http:', 'https:'].indexOf(window.location.protocol) != -1)
  {
    // console.log('判断请求网站, 是否添加前缀 判断当前协议 window.location.protocol', window.location.protocol);
    // console.log('判断请求网站, 是否添加前缀 判断当前协议 getApp().globalData.api', getApp().globalData.api);
    url = url.replace(/^(http|https):/, window.location.protocol);
  }
  return url;
};

// token失效
function token_false(res) {
  uni.clearStorageSync();
  uni.showToast({
    // title: res.data.msg,
    title: '请重新登录',
    icon: 'none' });

  setTimeout(function (res) {
    if (window && window.Service) {
      window.Service.loginOut();
      return;
    }
    uni.reLaunch({
      url: '/pages/login/login' });


  }, 1000);
}

// 判断地址头是否是服务器地址
function judge_url_pre(url) {
  url += '';
  var url_pre = '';
  var result = '';
  url_pre = getApp().globalData.api.replace(/^(http|https):/, '');;
  result = url.search(new RegExp('^(http|https):' + url_pre)) != -1;
  return result;
}
// method 必须大写，有效值在不同平台差异说明不同。
var https = function https() {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$type = _ref.type,type = _ref$type === void 0 ? 'POST' : _ref$type,_ref$method = _ref.method,method = _ref$method === void 0 ? type : _ref$method,_ref$url = _ref.url,url = _ref$url === void 0 ? '' : _ref$url,_ref$data = _ref.data,data = _ref$data === void 0 ? {} : _ref$data,_ref$param = _ref.param,param = _ref$param === void 0 ? data : _ref$param,_ref$isDebug = _ref.isDebug,isDebug = _ref$isDebug === void 0 ? false : _ref$isDebug,_ref$isLoad = _ref.isLoad,isLoad = _ref$isLoad === void 0 ? false : _ref$isLoad,_ref$header = _ref.header,header = _ref$header === void 0 ? {} : _ref$header;
  // method 必须大写，有效值在不同平台差异说明不同。
  method = method.toUpperCase();
  if (isLoad) {
    wx.showLoading({
      title: '请求中...' });

  }

  var timeStart = Date.now();

  var const_data = {};
  var const_header = {};
  if (judge_url_pre(getUrl(url))) {
    const_data.token = wx.getStorageSync('token');
    const_header.token = wx.getStorageSync('token');
    const_header['content-type'] = "application/x-www-form-urlencoded";
  }
  return new Promise(function (resolve, reject) {
    uni.request({
      url: getUrl(url),
      data: _objectSpread({
        token: wx.getStorageSync('token') },

      param),

      method: method,
      header: _objectSpread(_objectSpread({
        // 'content-type': 'application/json', // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
        // 'content-type': 'application/x-www-form-urlencoded', 
        // 'token': wx.getStorageSync('token'),

        // 'content-type': judge_url_pre(getUrl(url))?'application/x-www-form-urlencoded':"application/json", 
        token: judge_url_pre(getUrl(url)) ? wx.getStorageSync('token') : '',

        'content-type': 'application/json' },

      const_header),

      header),

      complete: function complete(res) {

        if (judge_url_pre(getUrl(url))) {
          // 针对 非app内嵌h5 即浏览器h5
          if (window && window.location && window.location.hostname == 'localhost') {
            if (res.errMsg == "request:fail") {
              // token失效
              token_false(_objectSpread(_objectSpread({},
              res), {}, {
                data: {
                  code: '自定义code',
                  msg: 'token失效' } }));


              reject(res);
            }
          }

          // 本地 -end --------------------------------------------
          switch (res.statusCode) {
            case -97:
              // 无效参数
              wx.redirectTo(
              {
                url: '/pages/login/login' });

              break;
            case 401:
              // 无效参数
              wx.redirectTo(
              {
                url: '/pages/login/login' });

              break;

            case 403:
              // 无效参数
              wx.redirectTo(
              {
                url: '/pages/login/login' });

              break;
            case 404:
              // 无效参数
              wx.redirectTo(
              {
                url: '/pages/login/login' });

              break;
            case 201:
              // 无效参数
              wx.redirectTo(
              {
                url: '/pages/login/login' });

              break;
            case -95:
              wx.redirectTo(
              {
                url: '/pages/login/login' });

              // toastTip(res.data.msg);
              break;
            case -10:
              wx.redirectTo(
              {
                url: '/pages/login/login' });


              break;
            case -96:

              wx.redirectTo(
              {
                url: '/pages/login/login' });

              break;
            default:
              break;}


        }


        if (isLoad) {
          uni.hideLoading();
        }
        if (isDebug) {
        }
        if (res.statusCode >= 200 && res.statusCode < 300) {

          if (!judge_url_pre(getUrl(url))) {
            resolve(res.data);
            return;
          }
          // &&res.data
          if (res.data.status == -95 && res.data.msg && res.data.msg.indexOf('token') != -1) {
            // token失效

            token_false(res);
            reject(res);
          } else
          if (res.data.status == 0 || res.data.code == 0 || res.statusCode == 200) {
            resolve(res.data);
          }
          // res.data.status ==-96|| res.data.status==-11 ||res.data.status ==-97 ||
          else if (res.data.code == -95) {
              token_false(res);
              reject(res);
            }
            // 个人中心没有登录 返回-97s  详情页没有选择 也是返回97     res.data.status==-97 ||
            else if (res.data.status == -96) {
                token_false(res);
                reject(res);
              }
              // 测试 购物车没有id   的返回值  是500 
              else {
                  res.data.msg && uni.showToast({
                    // title: res.data.msg,
                    title: '请重新登录',
                    icon: 'none' });

                  reject(res);
                }
        } else {
          reject(res);
        }
      } });

  });
};


// 延迟跳转
function delayJump() {var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/pages/index/index';var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  setTimeout(function () {
    switch (type) {
      case 1:
        uni.navigateTo({
          url: url });

        break;
      case 2:
        uni.redirectTo({
          url: url });

        break;
      case 3:
        uni.switchTab({
          url: url });

        break;
      default:
        break;}

  }, duration);
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
function is_zh_CN(name) {var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
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
      value.forEach(function (_value) {
        _result.push(key + "=" + _value);
      });
    } else {
      _result.push(key + '=' + value);
    }
  }
  return _result.join('&');
}
function wxPayment(option) {
  var options = Object.assign({
    result: {},
    success: function success() {},
    fail: function fail() {},
    complete: function complete() {} },
  option);
  console.log(options);
  uni.requestPayment({
    'appId': options.result.appId,
    'timeStamp': options.result.timeStamp,
    'nonceStr': options.result.nonceStr,
    'package': options.result.prepayId,
    'signType': 'MD5',
    'paySign': options.result.sign,
    success: function success(res) {
      options.success(res);
    },
    fail: function fail(res) {
      options.fail(res);
    },
    complete: function complete(res) {
      options.complete(res);
    } });

}
function getUserId() {
  return wx.getStorageSync('user').id;
}
function getMerId() {
  return wx.getStorageSync('user').mer_id || 0;
}
/**
  * 生成转发的url参数getShareUrlParams
  */
function getShareUrlParams(params) {
  var _this = this;
  // console.log(getMerId())
  return urlEncode(Object.assign({
    invite_id: getUserId(),
    mer_id: getMerId()
    // mer_id:getMerId()
  },
  params));
}
function getShareSmallRed(params) {
  var _this = this;
  // console.log(getMerId())
  return urlEncode(Object.assign({
    invite_id: getUserId(),
    mer_id: getMerId(),
    smallRed: 11
    // mer_id:getMerId()
  },
  params));
}


module.exports = {
  https: https,
  wxPayment: wxPayment,
  getLocationPromisified: getLocationPromisified,
  showModalPromisified: showModalPromisified,
  delayJump: delayJump,
  is_phone: is_phone, // 验证手机号
  is_zh_CN: is_zh_CN, // 验证中文
  isCardNo: isCardNo, // 验证身份证号码
  urlEncode: urlEncode,
  getShareUrlParams: getShareUrlParams };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 9:
/*!***********************************************************************!*\
  !*** C:/Users/19217/Desktop/works/zhixiang/common/wjw_uni/wjw_com.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;} /* 微信小程序 转 uniapp
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  	1.wx=>uni
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  	2.this.data=>this.$data
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  	3.uniapp无setData相关函数, 添加翻译后的setData函数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */
function urlEncode(data) {
  var _result = [];
  for (var key in data) {
    var value = data[key];
    if (value.constructor == Array) {
      value.forEach(function (_value) {
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
  var that = this;
  var keys = [];
  var val, data;
  Object.keys(obj).forEach(function (key) {
    keys = key.split('.');
    val = obj[key];
    data = that.$data;
    if (!(keys[0] in data)) {
      return;
    }
    keys.forEach(function (key2, index) {
      if (index + 1 == keys.length) {
        that.$set(data, key2, val);
      } else {
        if (!data[key2]) {
          that.$set(data, key2, isNaN(keys[index + 1]) ? {} : []);
        }
      }
      data = data[key2];
    });
  });
}



// console.log(this, wx, wx.do, wx.do_judge);
// console.log('wx.do--自定义延迟执行wx方法, 参数一填对应方法, 后面是原来参数');
// 小程序 个人自定义函数
wx.do = function (method) {for (var _len = arguments.length, obj = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {obj[_key - 1] = arguments[_key];}
  if (wx.do_judge) {
    console.log(method + '正在执行, 1.5秒后可执行');
    return;
  } else {
    wx.do_judge = true;
    setTimeout(function () {
      wx.do_judge = false;
    }, 1500);
  }
  setTimeout(function () {var _wx;
    (_wx = wx)[method].apply(_wx, obj);
  }, 1000);
};



// 登录页面
var login_url = '/pages/common/login/login';

// 页面名称简化 set_pages() 用于app.js
// console.log(__wxConfig);
function set_pages() {
  // console.log('页面名称简化');
  var _wxConfig =

  __wxConfig,pages = _wxConfig.pages;
  var arr,str,obj = {};
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
function var_path_split(_ref)




{var path = _ref.path,start = _ref.start,_ref$is_data = _ref.is_data,is_data = _ref$is_data === void 0 ? true : _ref$is_data,_this = _ref._this;
  var reg = /[^\[\]\.]+/g;
  var arr = path.match(reg);

  var var_v = start || (is_data ? (_this || this).$data : _this); // var_value
  // console.log('变量路径拆分', {
  //     path,
  //     start
  // });
  var new_path = arr[0];var _iterator = _createForOfIteratorHelper(
  arr),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var v = _step.value;
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
          that.setData(_defineProperty({},
          new_path, var_v));

        }
      }
      var_v = var_v[v || var_v.length];
      if (v != new_path) {
        // console.log(v, isNaN(v));
        if (isNaN(v)) {
          new_path += '.' + v;
        } else {
          new_path += "[".concat(v, "]");
        }
      }
    }
    // console.log('变量路径拆分返回值: ', var_v);
  } catch (err) {_iterator.e(err);} finally {_iterator.f();}return var_v;
}

// 设置自定义参数
function dataset(e) {
  // console.log('设置自定义参数', e);
  if (e) {
    var param = e.currentTarget.dataset.param;
    param && (param = JSON.parse(param));
    var obj = _objectSpread(_objectSpread({},
    e.detail),
    e.currentTarget.dataset);


    param && (obj = _objectSpread(_objectSpread({}, obj), param));
    return obj;
  } else {
    return {};
  }
}

// 应用到util的 request请求函数 与 delayJump延迟跳转函数
var util = __webpack_require__(/*! ./wjw_util.js */ 8);


// 判断请求网站, 是否添加前缀;  getUrl(url);
function getUrl(url) {
  //   console.log('判断请求网站, 是否添加前缀', url, url.indexOf('://') == -1, getApp().globalData.api);
  if (url.indexOf('://') == -1) {
    // console.log('this.$scope', this.$scope);
    // console.log('getApp()', getApp());
    url = getApp().globalData.api + url;
    // var config = require("../utils/config");
    // url = config.url + url;
  }
  if (
  window &&
  window.location &&
  window.location.protocol &&
  ['http:', 'https:'].indexOf(window.location.protocol) != -1)
  {
    // console.log('判断请求网站, 是否添加前缀 判断当前协议 window.location.protocol', window.location.protocol);
    // console.log('判断请求网站, 是否添加前缀 判断当前协议 getApp().globalData.api', getApp().globalData.api);
    url = url.replace(/^(http|https):/, window.location.protocol);
  }
  return url;
}

// 延迟跳转
function delayJump() {var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/pages/index/index';var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;var delta = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  // console.log('延迟跳转', {
  //     url,
  //     duration,
  //     type,
  //     delta,
  // });
  setTimeout(function () {
    var method = '';
    type -= 0;
    switch (type) {
      case 1:
        method = 'navigateTo'; //跳转
        break;
      case 2:
        method = 'redirectTo'; //关闭当前页面，跳转
        break;
      case 3:
        method = 'switchTab'; // 跳转到tabbar页面
        break;
      case 4:
        method = 'reLaunch'; // 关闭所有页面，跳转
        break;
      case 5:
        //  console.log('路由判断 返回/跳转', url);
        return;
        break;
      case 6:
        method = 'navigateBack'; // 关闭当前页面，返回上一页面或多级页面
        break;
      default:
        break;}

    uni[method]({
      url: url,
      delta: delta,
      fail: function fail(err) {
        // console.log('页面不存在', err);
        toastTip('页面不存在');
      } });

  }, duration);
};

// 网络请求 对象参数
function buildRequest()





{var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref2$url = _ref2.url,url = _ref2$url === void 0 ? '' : _ref2$url,_ref2$param = _ref2.param,param = _ref2$param === void 0 ? {} : _ref2$param,_ref2$method = _ref2.method,method = _ref2$method === void 0 ? 'POST' : _ref2$method,_ref2$isDebug = _ref2.isDebug,isDebug = _ref2$isDebug === void 0 ? false : _ref2$isDebug,_ref2$isshowLoading = _ref2.isshowLoading,isshowLoading = _ref2$isshowLoading === void 0 ? false : _ref2$isshowLoading;
  // console.log('网络请求', {
  //     url,
  //     param,
  //     method,
  //     isDebug,
  //     isshowLoading,
  // });
  if (isshowLoading) {
    uni.showLoading({
      title: '请求中...' });

  }
  var timeStart = Date.now();
  return new Promise(function (resolve, reject) {
    uni.request({
      url: getUrl(url),
      data: param,
      method: method,
      header: {
        'content-type': 'application/json', // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
        'token': uni.getStorageSync('token') },

      complete: function complete(res) {
        if (isshowLoading) {
          uni.hideLoading();
        }
        if (isDebug) {
          // console.log(`耗时${Date.now() - timeStart}`);
          // console.log(res.data)
        }
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          reject(res);
        }
      } });

  });
}

// 网络请求 一对一参数
function request(url) {var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'POST';var isDebug = arguments.length > 3 ? arguments[3] : undefined;var isshowLoading = arguments.length > 4 ? arguments[4] : undefined;
  return buildRequest({
    url: url,
    param: param,
    isDebug: isDebug,
    isshowLoading: isshowLoading,
    method: method });

}

// 提示信息
function toastTip() {var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Error';var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
  uni.showToast({
    title: msg,
    icon: icon,
    duration: duration });

}


// 提示加载信息
function loadTip() {var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '加载中...';
  uni.showToast({
    title: msg,
    mask: true,
    icon: 'loading',



    duration: 55000 });

}

//  登录检测
function login_check() {
  // console.log('登录检测');
  var token = uni.getStorageSync('token');
  return token;
}

// 页面跳转 基于delayJump延迟跳转函数
// 参数: 1.data-url 页面地址; 2.data-type 跳转类型; 3.data-time 跳转延迟时间; 4.data-check 跳转前判断; 其他皆为传递参数
function jump(e) {
  var obj = dataset(e);
  var fixed_param_arr = ['url', 'time', 'type', 'check', 'phone_check', 'param']; //固定参数数组
  var
  url =




  obj.url,_obj$time = obj.time,time = _obj$time === void 0 ? 0 : _obj$time,type = obj.type,check = obj.check,phone_check = obj.phone_check;
  if (!url) {
    // console.log('无跳转页面', url);
    return;
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
    setTimeout(function () {
      uni.jump = false;
    }, time + 500);
  }
  var param = '?'; //存储拼接的参数
  for (var i in obj) {
    if (fixed_param_arr.indexOf(i) != -1) {
      continue;
    }
    if (param != '?') {
      param += '&';
    }
    param += "".concat(i, "=").concat(obj[i]);
  }
  if (param == '?') {
    param = '';
  }

  // 手机号检测
  if (phone_check) {
    // console.log('需要绑定手机号, 判断用户是否绑定手机号');
    var
    user_info =
    getApp().globalData.user_info;
    if (!user_info) {
      // toastTip('需要绑定手机号');
      getApp().globalData.phone_check_data = {
        url: type == 3 ? url : url + param,
        type: type };

      delayJump("/".concat(getApp().globalData.page_data.pages.common_accounts));
      return;
    }
  }
  // console.log('跳转地址: ', url + param);
  delayJump(type == 3 ? url : url + param, time, type);
}



// 输入框修改属性 bindinput='input_set_value' data-name='name' data-int='{{true}}'(取整) catchtap='input_set_value'
function input_set_value(e) {var _dataset =



  dataset(e),name = _dataset.name,_int = _dataset.int;var _e$detail =



  e.detail,_e$detail$value = _e$detail.value,value = _e$detail$value === void 0 ? '' : _e$detail$value,_e$detail$current = _e$detail.current,current = _e$detail$current === void 0 ? '' : _e$detail$current;
  value || (value = current);
  if (_int) {
    value = isNaN(parseInt(value)) ? 0 : parseInt(value);
  }
  console.log('输入框修改属性', e, {
    name: name,
    value: value });

  try {
    this.setData(_defineProperty({},
    name, value));

  } catch (err) {
    // 验证路径以及补齐路径
    var_path_split.call(this, {
      path: name,
      start: this.$data });

    this.setData(_defineProperty({},
    name, value));

  }
}

// 设置属性值 bindtap='set_value' data-name='name' data-value='{{index}}' data-method='push' catchtap='set_value'
function set_value(e) {var _this2 = this;var _dataset2 =






  dataset(e),name = _dataset2.name,_dataset2$value = _dataset2.value,value = _dataset2$value === void 0 ? '' : _dataset2$value,_dataset2$index = _dataset2.index,index = _dataset2$index === void 0 ? 0 : _dataset2$index,method = _dataset2.method,no_report = _dataset2.no_report;
  console.log('设置属性值', e, {
    name: name,
    value: value,
    method: method });

  var name_arr = name.split(/ *[,， ] */g);
  var value_arr = [];
  if (typeof value == 'string') {
    value_arr = value.split(/ *[,， ] */g);
  } else {
    value_arr.push(value);
  }
  console.log({
    name_arr: name_arr,
    value_arr: value_arr });

  name_arr.map(function (item, indexs, arr) {
    if (!item) {
      console.log('路径为空 不设置', item);
      return;
    }
    var value = value_arr[indexs] == 'false' ? false :

    value_arr[indexs] == undefined ?
    value_arr[indexs - 1] || value_arr[value_arr.length - 1] :
    value_arr[indexs];

    // console.log({
    //     item,
    //     indexs,
    //     value
    // }, this);
    // 验证路径以及补齐路径
    var data_v = var_path_split.call(_this2, {
      path: item,
      start: _this2.$data });

    if (no_report && data_v == value) {
      // console.log('属性值相同, 不设置', {
      //     name: item,
      //     value,
      //     data_v,
      // }, data_v == value);
      return;
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
        data_v.splice(arr_index, 1);
      }
      console.log('删除111', data_v.indexOf(value));
      value = data_v;
    }
    console.log(item, value);
    _this2.setData(_defineProperty({},
    item, value));

  });
}

// 增减属性值 bindtap='count_value' data-name='name' data-count='add/min' catchtap='count_value'
function count_value(e) {
  console.log('增减属性值', e);var _dataset3 =



  dataset(e),name = _dataset3.name,count = _dataset3.count;
  var data_v = var_path_split.call(this, {
    path: name,
    start: this.$data });

  isNaN(data_v) && (data_v = 0);
  data_v = data_v - 0 || 0;
  if (count == 'add') {
    data_v++;
  } else {
    data_v--;
  }
  this.setData(_defineProperty({},
  name, data_v));

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
  console.log('显示提示', e);var _dataset4 =




  dataset(e),_dataset4$title = _dataset4.title,title = _dataset4$title === void 0 ? '提示' : _dataset4$title,_dataset4$icon = _dataset4.icon,icon = _dataset4$icon === void 0 ? 'none' : _dataset4$icon,_dataset4$duration = _dataset4.duration,duration = _dataset4$duration === void 0 ? 2000 : _dataset4$duration;
  uni.showToast({
    title: title,
    icon: icon,
    duration: duration });

}

// 执行多个方法 bindtap="do_fns" data-fns='fn1 fn2'
function do_fns(e) {var _this3 = this;
  console.log('执行多个方法', e);var _dataset5 =


  dataset(e),fns = _dataset5.fns;
  var fn_arr = fns.split(/ *[,， ] */g);
  fn_arr.map(function (item, index, arr) {
    console.log({
      item: item,
      index: index });

    _this3[item](e);
  });
}



// 上传文件 递归调用 需要页面this
function uploadFiles(_ref3)









{var _arguments = arguments,_this4 = this;var file = _ref3.file,_ref3$i = _ref3.i,i = _ref3$i === void 0 ? 0 : _ref3$i,_ref3$url = _ref3.url,url = _ref3$url === void 0 ? getApp().globalData.api + 'upload' : _ref3$url,_ref3$name = _ref3.name,name = _ref3$name === void 0 ? 'file' : _ref3$name,_ref3$data_name = _ref3.data_name,data_name = _ref3$data_name === void 0 ? 'files' : _ref3$data_name,header = _ref3.header,_ref3$is_new = _ref3.is_new,is_new = _ref3$is_new === void 0 ? false : _ref3$is_new,_ref3$res_name = _ref3.res_name,res_name = _ref3$res_name === void 0 ? 'url' : _ref3$res_name,back_fn = _ref3.back_fn;
  url = getUrl(url);
  console.log("上传文件", file[i]);
  var arg = arguments;
  var that = this;
  var _success = function success(url) {
    var arr = _this4.$data[data_name] || _this4.var_path_split({
      path: data_name }) ||
    [];
    if (is_new && i == 0) {
      arr = [];
    }
    arr.push(url);
    _this4.setData(_defineProperty({},
    data_name, arr));

    if (i < file.length - 1) {
      console.log(_arguments, _objectSpread(_objectSpread({}, arg[0]), {}, {
        i: i + 1 }));

      _this4.uploadFiles(_objectSpread(_objectSpread({}, arg[0]), {}, {
        i: i + 1 }));

    } else {
      back_fn && back_fn(arr);
    }
  };

  if (
  file[i].indexOf(getApp().globalData.api) != -1)
  {
    console.log("已上传文件, 下一个");
    _success(file[i]);
    return;
  }

  console.log('uploadFile', {
    url: url,
    filePath: file[i],
    name: name,
    header: _objectSpread({
      "Content-Type": "multipart/form-data",
      // "Content-Type": "application/json",
      'token': uni.getStorageSync('token') },
    header) });


  uni.uploadFile({
    url: url,
    filePath: file[i],
    name: name,
    header: _objectSpread({
      // "Content-Type": "multipart/form-data",
      // "Content-Type": "multipart/form-data; boundary=------WebKitFormBoundaryA54cVlVB3pIghAN2",

      // "Content-Type": "application/json",
      'token': uni.getStorageSync('token') },
    header),

    success: function success(res) {
      console.log("上传文件 成功", i + '/' + file.length, res);
      var res_data = JSON.parse(res.data).data;
      var url = res_data[res_name] || res_data;
      url = url.replace('http://127.0.0.1:8080/renren-fast', getUrl(''));
      url = url.replace('https://127.0.0.1:8080/renren-fast', getUrl(''));

      // prompt('上传文件 成功 file[i] '+ (i + 1), url);

      _success(url);
    },
    fail: function fail(err) {
      console.log('上传文件 失败', err);
      // that.uploadFile2(arguments);
      toastTip('上传文件 失败');
    }
    // complete: function(res) {
    //     console.log('上传文件 complete', res);
    //     // prompt('uploadFile complete', JSON.stringify(err));
    // },
  });

}





// 创建dataset
function create_dataset(obj) {
  console.log('创建dataset', obj);
  return {
    currentTarget: {
      dataset: obj },

    detail: {
      value: obj } };



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
function http_dataset(e) {var _this5 = this;
  console.log('发送请求 dataset参数', e);var _dataset6 =







  dataset(e),url = _dataset6.url,https_param = _dataset6.https_param,method = _dataset6.method,https_then = _dataset6.https_then,https_catch = _dataset6.https_catch,back_fn = _dataset6.back_fn;
  https_param = _objectSpread(_objectSpread({}, dataset(e)),
  https_param);

  (util.https ? util.https : request)(
  url,
  https_param,
  method).then(function (res) {
    console.log('接口回调成功', res);
    typeof back_fn === 'function' && back_fn(res);
    https_then && _this5[https_then] && _this5[https_then](_objectSpread(_objectSpread({}, e),
    res));

  }).catch(function (res) {
    console.log('接口回调失败', res);
    https_catch && _this5[https_catch] && _this5[https_catch](_objectSpread(_objectSpread({}, e),
    res));

  });

}


function show_modal(e) {var _this6 = this;
  console.log('确认对话框', e);
  var obj = dataset(e);
  var content = obj.contents;
  uni.showModal(_objectSpread(_objectSpread({
    title: '提示' },
  obj), {}, {
    content: content,
    success: function success(res) {
      if (res.confirm) {
        console.log('用户点击确定');
        typeof obj.confirm == 'function' && obj.confirm();
        obj.confirm && _this6[obj.confirm] && _this6[obj.confirm](e);
      } else if (res.cancel) {
        console.log('用户点击取消');
        obj.cancel && _this6[obj.cancel] && _this6[obj.cancel](e);
      }
    } }));


}

// 获取地址
function get_addr(e) {
  console.log('获取地址', e);

}



//页面加载完成函数
function onReady() {
  return;
  console.log('onReady 页面初次渲染');
  var that = this;
  setTimeout(function () {
    console.log('关闭加载动画');
    that.setData({
      remind: true });

  }, 800);
}

//设置全局变量
function set_glo(e) {
  console.log('设置全局变量');var _dataset7 =


  dataset(e),_dataset7$glo = _dataset7.glo,glo = _dataset7$glo === void 0 ? {} : _dataset7$glo;

  var glos = getApp().globalData;
  for (var i in glo) {
    glos[i] = glo[i];
  }
  // console.log(glos, getApp().globalData);
}

//设置缓存
function set_stor(e) {
  console.log('设置缓存');var _dataset8 =



  dataset(e),name = _dataset8.name,value = _dataset8.value;
  if (!name) {
    console.log('未输入缓存名', {
      name: name });

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
function popup_fn(e) {var _dataset9 =


  dataset(e),fn = _dataset9.fn;
  console.log('弹框事件', this, fn);
  fn && this.popup[fn](e);
}



// 判断授权 
function judge_auth(back_fn) {
  console.log('判断授权', back_fn);
  var auth_false = function auth_false(res) {
    console.log('未授权 后续执行事件');
    console.log('getCurrentPages', getCurrentPages());
    // uni.navigateTo({
    uni.redirectTo({
      url: '/pages/login/login',
      complete: function complete(res) {
        console.log('redirectTo complete', res);
        console.log('getCurrentPages complete', getCurrentPages());
        // console.log('this', this);//app
        // console.log('this.route', this.route);

      } });

  };
  uni.getSetting({
    success: function success(res) {
      console.log('判断授权 返回成功', res, Page);
      if (!res.authSetting['scope.userInfo']) {
        console.log('判断授权 未授权', res);
        if (typeof back_fn === 'function') {
          return;
        }

        // 页面注册前无法跳转页面
        console.log('判断授权 未授权 判断 页面注册 是否已完成', getCurrentPages());
        if (getCurrentPages().length) {
          console.log('判断授权 未授权  页面注册 已完成', getCurrentPages());
          auth_false();
        } else {
          console.log('判断授权 未授权  页面注册 未完成', getCurrentPages());
          var timer = setInterval(function (res) {
            if (getCurrentPages().length) {
              console.log('判断授权 未授权  页面注册 已完成 清除定时器', getCurrentPages());
              clearInterval(timer);
              auth_false();
            } else {
              console.log('判断授权 未授权  页面注册 未完成 继续定时器', getCurrentPages());
            }
          }, 200);
        }
      } else {
        typeof back_fn === 'function' && back_fn(res);
      }
    } });

}





// 测试获取未使用的code
function get_codes(e) {
  console.log('测试获取未使用的code get_codes', e);
  var all_num = 10;
  var num = 0;
  var timer = setInterval(function (res) {
    if (num >= all_num) {
      clearInterval(timer);
      return;
    }
    num++;
    //获取登录凭证
    uni.login({
      success: function success(res) {
        var code = res.code;
        console.log('code', code);
      } });

  }, 10);
}


Date.prototype.Format = function (fmt) {//author: meizz 
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
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[
    k]).substr(("" + o[k]).length));}
  return fmt;
};



// 收集formID
function getFormId(ev) {
  console.log('收集formID', ev);
  var formId = ev.detail.formId;
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
      "content-type": "application/x-www-form-urlencoded" },

    data: {
      formId: formId },

    success: function success(res) {
      console.log('收集formID 接口调取成功', res);
    } });

}

// 打印
function console_log() {var _console;
  (_console = console).log.apply(_console, arguments);
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

  console.log('修改导航栏标题', e);var _dataset10 =


  dataset(e),title = _dataset10.title;
  uni.setNavigationBarTitle({
    title: title });

}




// 选择_返回操作
function chose_back(obj) {var _pages$pop;
  console.log('选择_返回操作', obj);
  var pages = getCurrentPages();
  console.log('pages', pages);
  pages.pop();
  (_pages$pop = pages.pop()).get_chose.apply(_pages$pop, arguments);
}
// 获取_选择页返回数据
function get_chose(obj) {
  console.log('获取_选择页返回数据', obj, this.route);
}

function chooseLocation(obj) {
  console.log('打开地图选择位置', obj);
  uni.chooseLocation({
    success: function success(res) {
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
    } });

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
  timestampToTime: function timestampToTime(timestamp) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  },


  // 判断app返回功能
  back_judge_app: function back_judge_app(e) {
    console.log('判断返回', e);
    if (window && window.Service) {
      // app关闭网页
      window.Service.closeWebview();
    } else {
      wx.navigateBack();
    }
  },

  // 判断app返回功能之页面
  back_judge_app_page: function back_judge_app_page(e) {
    console.log('判断返回', e);
    if (getCurrentPages().length == 1) {
      // 判断app返回功能
      this.back_judge_app();
    } else {
      wx.navigateBack();
    }
  },



  // 获取地址列表
  addlist: function addlist(e) {var _this7 = this;
    var userData = wx.getStorageSync('userData');
    var token = wx.getStorageSync('token');
    if (userData) {
      var id = userData.id;


      uni.wjw_http({
        url: 'address/list',
        data: {
          userId: id,
          token: token } }).

      then(function (res) {
        console.log('获取地址列表 接口 请求成功', res);

        _this7.articleList = res.result || [];

        _this7.addlist_back && _this7.addlist_back(res);

      });
    }

  },

  // 获取地址列表_回调 
  addlist_back: function addlist_back(e) {
    console.log('获取地址列表_回调', e);
  } };



var city_data = [
// 
{
  "code": 10,
  "name": "北京市",
  "sub": [{
    "code": 1001,
    "name": "北京市",
    "sub": [{
      "code": 100101,
      "name": "东城区" },

    {
      "code": 100102,
      "name": "西城区" },

    {
      "code": 100119,
      "name": "亦庄开发区" },
    {
      "code": 100118,
      "name": "密云县" },
    {
      "code": 100117,
      "name": "平谷区" },
    {
      "code": 100116,
      "name": "怀柔区" },
    {
      "code": 100115,
      "name": "延庆县" },
    {
      "code": 100114,
      "name": "大兴区" },
    {
      "code": 100113,
      "name": "房山区" },
    {
      "code": 100112,
      "name": "通州区" },
    {
      "code": 100111,
      "name": "门头沟区" },
    {
      "code": 100110,
      "name": "昌平区" },
    {
      "code": 100109,
      "name": "顺义区" },
    {
      "code": 100108,
      "name": "石景山区" },
    {
      "code": 100107,
      "name": "丰台区" },
    {
      "code": 100106,
      "name": "海淀区" },
    {
      "code": 100105,
      "name": "朝阳区" }] }] },




{
  "code": 11,
  "name": "天津市",
  "sub": [{
    "code": 1101,
    "name": "天津市",
    "sub": [{
      "code": 110118,
      "name": "静海县" },
    {
      "code": 110117,
      "name": "宁河县" },
    {
      "code": 110116,
      "name": "蓟县" },
    {
      "code": 110115,
      "name": "宝坻区" },
    {
      "code": 110114,
      "name": "武清区" },
    {
      "code": 110113,
      "name": "北辰区" },
    {
      "code": 110112,
      "name": "津南区" },
    {
      "code": 110111,
      "name": "西青区" },
    {
      "code": 110110,
      "name": "东丽区" },
    {
      "code": 110107,
      "name": "滨海新区" },
    {
      "code": 110106,
      "name": "红桥区" },
    {
      "code": 110105,
      "name": "南开区" },
    {
      "code": 110104,
      "name": "河西区" },
    {
      "code": 110103,
      "name": "河东区" },
    {
      "code": 110102,
      "name": "河北区" },
    {
      "code": 110101,
      "name": "和平区" }] }] },


{
  "code": 12,
  "name": "河北省",
  "sub": [{
    "code": 1211,
    "name": "邯郸市",
    "sub": [{
      "code": 121120,
      "name": "武安市" },
    {
      "code": 121119,
      "name": "曲周县" },
    {
      "code": 121118,
      "name": "魏县" },
    {
      "code": 121117,
      "name": "馆陶县" },
    {
      "code": 121116,
      "name": "广平县" },
    {
      "code": 121115,
      "name": "鸡泽县" },
    {
      "code": 121114,
      "name": "邱县" },
    {
      "code": 121113,
      "name": "永年县" },
    {
      "code": 121112,
      "name": "肥乡县" },
    {
      "code": 121111,
      "name": "磁县" },
    {
      "code": 121110,
      "name": "涉县" },
    {
      "code": 121109,
      "name": "大名县" },
    {
      "code": 121108,
      "name": "成安县" },
    {
      "code": 121107,
      "name": "临漳县" },
    {
      "code": 121106,
      "name": "邯郸县" },
    {
      "code": 121105,
      "name": "峰峰矿区" },
    {
      "code": 121104,
      "name": "复兴区" },
    {
      "code": 121103,
      "name": "丛台区" },
    {
      "code": 121102,
      "name": "邯山区" }] },

  {
    "code": 1210,
    "name": "沧州市",
    "sub": [{
      "code": 121017,
      "name": "河间市" },
    {
      "code": 121016,
      "name": "黄骅市" },
    {
      "code": 121015,
      "name": "任丘市" },
    {
      "code": 121014,
      "name": "泊头市" },
    {
      "code": 121013,
      "name": "孟村县" },
    {
      "code": 121012,
      "name": "献县" },
    {
      "code": 121011,
      "name": "吴桥县" },
    {
      "code": 121010,
      "name": "南皮县" },
    {
      "code": 121009,
      "name": "肃宁县" },
    {
      "code": 121008,
      "name": "盐山县" },
    {
      "code": 121007,
      "name": "海兴县" },
    {
      "code": 121006,
      "name": "东光县" },
    {
      "code": 121005,
      "name": "青县" },
    {
      "code": 121004,
      "name": "沧县" },
    {
      "code": 121003,
      "name": "运河区" },
    {
      "code": 121002,
      "name": "新华区" }] },

  {
    "code": 1209,
    "name": "邢台市",
    "sub": [{
      "code": 120920,
      "name": "沙河市" },
    {
      "code": 120919,
      "name": "南宫市" },
    {
      "code": 120918,
      "name": "临西县" },
    {
      "code": 120917,
      "name": "清河县" },
    {
      "code": 120916,
      "name": "威县" },
    {
      "code": 120915,
      "name": "平乡县" },
    {
      "code": 120914,
      "name": "广宗县" },
    {
      "code": 120913,
      "name": "新河县" },
    {
      "code": 120912,
      "name": "巨鹿县" },
    {
      "code": 120911,
      "name": "宁晋县" },
    {
      "code": 120910,
      "name": "南和县" },
    {
      "code": 120909,
      "name": "任县" },
    {
      "code": 120908,
      "name": "隆尧县" },
    {
      "code": 120907,
      "name": "柏乡县" },
    {
      "code": 120906,
      "name": "内丘县" },
    {
      "code": 120905,
      "name": "临城县" },
    {
      "code": 120904,
      "name": "邢台县" },
    {
      "code": 120903,
      "name": "桥西区" },
    {
      "code": 120902,
      "name": "桥东区" }] },

  {
    "code": 1208,
    "name": "承德市",
    "sub": [{
      "code": 120812,
      "name": "围场县" },
    {
      "code": 120811,
      "name": "宽城县" },
    {
      "code": 120810,
      "name": "丰宁县" },
    {
      "code": 120809,
      "name": "隆化县" },
    {
      "code": 120808,
      "name": "滦平县" },
    {
      "code": 120807,
      "name": "平泉县" },
    {
      "code": 120806,
      "name": "兴隆县" },
    {
      "code": 120805,
      "name": "承德县" },
    {
      "code": 120804,
      "name": "鹰手营子" },
    {
      "code": 120803,
      "name": "双滦区" },
    {
      "code": 120802,
      "name": "双桥区" }] },

  {
    "code": 1207,
    "name": "保定市",
    "sub": [{
      "code": 120727,
      "name": "高新区" },
    {
      "code": 120726,
      "name": "高碑店市" },
    {
      "code": 120725,
      "name": "安国市" },
    {
      "code": 120724,
      "name": "定州市" },
    {
      "code": 120723,
      "name": "涿州市" },
    {
      "code": 120722,
      "name": "雄县" },
    {
      "code": 120721,
      "name": "博野县" },
    {
      "code": 120720,
      "name": "顺平县" },
    {
      "code": 120719,
      "name": "蠡县" },
    {
      "code": 120718,
      "name": "曲阳县" },
    {
      "code": 120717,
      "name": "易县" },
    {
      "code": 120716,
      "name": "安新县" },
    {
      "code": 120715,
      "name": "望都县" },
    {
      "code": 120714,
      "name": "涞源县" },
    {
      "code": 120713,
      "name": "容城县" },
    {
      "code": 120712,
      "name": "高阳县" },
    {
      "code": 120711,
      "name": "唐县" },
    {
      "code": 120710,
      "name": "定兴县" },
    {
      "code": 120709,
      "name": "徐水县" },
    {
      "code": 120708,
      "name": "阜平县" },
    {
      "code": 120707,
      "name": "涞水县" },
    {
      "code": 120706,
      "name": "清苑县" },
    {
      "code": 120705,
      "name": "满城县" },
    {
      "code": 120703,
      "name": "南市区" },
    {
      "code": 120702,
      "name": "北市区" },
    {
      "code": 120701,
      "name": "新市区" }] },

  {
    "code": 1206,
    "name": "衡水市",
    "sub": [{
      "code": 120612,
      "name": "深州市" },
    {
      "code": 120611,
      "name": "冀州市" },
    {
      "code": 120610,
      "name": "阜城县" },
    {
      "code": 120609,
      "name": "景县" },
    {
      "code": 120608,
      "name": "故城县" },
    {
      "code": 120607,
      "name": "安平县" },
    {
      "code": 120606,
      "name": "饶阳县" },
    {
      "code": 120605,
      "name": "武强县" },
    {
      "code": 120604,
      "name": "武邑县" },
    {
      "code": 120603,
      "name": "枣强县" },
    {
      "code": 120602,
      "name": "桃城区" }] },

  {
    "code": 1205,
    "name": "廊坊市",
    "sub": [{
      "code": 120511,
      "name": "三河市" },
    {
      "code": 120510,
      "name": "霸州市" },
    {
      "code": 120509,
      "name": "大厂县" },
    {
      "code": 120508,
      "name": "文安县" },
    {
      "code": 120507,
      "name": "大城县" },
    {
      "code": 120506,
      "name": "香河县" },
    {
      "code": 120505,
      "name": "永清县" },
    {
      "code": 120504,
      "name": "固安县" },
    {
      "code": 120503,
      "name": "广阳区" },
    {
      "code": 120502,
      "name": "安次区" }] },

  {
    "code": 1204,
    "name": "张家口市",
    "sub": [{
      "code": 120418,
      "name": "崇礼县" },
    {
      "code": 120417,
      "name": "赤城县" },
    {
      "code": 120416,
      "name": "涿鹿县" },
    {
      "code": 120415,
      "name": "怀来县" },
    {
      "code": 120414,
      "name": "万全县" },
    {
      "code": 120413,
      "name": "怀安县" },
    {
      "code": 120412,
      "name": "阳原县" },
    {
      "code": 120411,
      "name": "蔚县" },
    {
      "code": 120410,
      "name": "尚义县" },
    {
      "code": 120409,
      "name": "沽源县" },
    {
      "code": 120408,
      "name": "康保县" },
    {
      "code": 120407,
      "name": "张北县" },
    {
      "code": 120406,
      "name": "宣化县" },
    {
      "code": 120405,
      "name": "下花园区" },
    {
      "code": 120404,
      "name": "宣化区" },
    {
      "code": 120403,
      "name": "桥西区" },
    {
      "code": 120402,
      "name": "桥东区" }] },

  {
    "code": 1203,
    "name": "唐山市",
    "sub": [{
      "code": 120315,
      "name": "迁安市" },
    {
      "code": 120314,
      "name": "遵化市" },
    {
      "code": 120313,
      "name": "唐海县" },
    {
      "code": 120312,
      "name": "玉田县" },
    {
      "code": 120311,
      "name": "迁西县" },
    {
      "code": 120310,
      "name": "乐亭县" },
    {
      "code": 120309,
      "name": "滦南县" },
    {
      "code": 120308,
      "name": "滦县" },
    {
      "code": 120307,
      "name": "丰润区" },
    {
      "code": 120306,
      "name": "丰南区" },
    {
      "code": 120305,
      "name": "开平区" },
    {
      "code": 120304,
      "name": "古冶区" },
    {
      "code": 120303,
      "name": "路北区" },
    {
      "code": 120302,
      "name": "路南区" }] },

  {
    "code": 1202,
    "name": "秦皇岛市",
    "sub": [{
      "code": 120208,
      "name": "卢龙县" },
    {
      "code": 120207,
      "name": "抚宁县" },
    {
      "code": 120206,
      "name": "昌黎县" },
    {
      "code": 120205,
      "name": "青龙县" },
    {
      "code": 120204,
      "name": "北戴河区" },
    {
      "code": 120203,
      "name": "山海关区" },
    {
      "code": 120202,
      "name": "海港区" }] },

  {
    "code": 1201,
    "name": "石家庄市",
    "sub": [{
      "code": 120125,
      "name": "高新区" },
    {
      "code": 120124,
      "name": "鹿泉市" },
    {
      "code": 120123,
      "name": "新乐市" },
    {
      "code": 120122,
      "name": "晋州市" },
    {
      "code": 120121,
      "name": "藁城市" },
    {
      "code": 120120,
      "name": "辛集市" },
    {
      "code": 120119,
      "name": "赵县" },
    {
      "code": 120118,
      "name": "元氏县" },
    {
      "code": 120117,
      "name": "平山县" },
    {
      "code": 120116,
      "name": "无极县" },
    {
      "code": 120115,
      "name": "赞皇县" },
    {
      "code": 120114,
      "name": "深泽县" },
    {
      "code": 120113,
      "name": "高邑县" },
    {
      "code": 120112,
      "name": "灵寿县" },
    {
      "code": 120111,
      "name": "行唐县" },
    {
      "code": 120110,
      "name": "栾城县" },
    {
      "code": 120109,
      "name": "正定县" },
    {
      "code": 120108,
      "name": "井陉县" },
    {
      "code": 120107,
      "name": "裕华区" },
    {
      "code": 120106,
      "name": "井陉矿区" },
    {
      "code": 120105,
      "name": "新华区" },
    {
      "code": 120104,
      "name": "桥西区" },
    {
      "code": 120103,
      "name": "桥东区" },
    {
      "code": 120102,
      "name": "长安区" }] }] },


{
  "code": 13,
  "name": "内蒙古",
  "sub": [{
    "code": 1314,
    "name": "二连浩特" },
  {
    "code": 1313,
    "name": "满洲里" },
  {
    "code": 1312,
    "name": "阿拉善盟",
    "sub": [{
      "code": 131203,
      "name": "额济纳旗" },
    {
      "code": 131202,
      "name": "阿拉善右旗" },
    {
      "code": 131201,
      "name": "阿拉善左旗" }] },

  {
    "code": 1311,
    "name": "乌海市",
    "sub": [{
      "code": 131104,
      "name": "乌达区" },
    {
      "code": 131103,
      "name": "海南区" },
    {
      "code": 131102,
      "name": "海勃湾区" }] },

  {
    "code": 1310,
    "name": "巴彦淖尔市",
    "sub": [{
      "code": 131008,
      "name": "杭锦后旗" },
    {
      "code": 131007,
      "name": "乌拉特后旗" },
    {
      "code": 131006,
      "name": "乌拉特中旗" },
    {
      "code": 131005,
      "name": "乌拉特前旗" },
    {
      "code": 131004,
      "name": "磴口县" },
    {
      "code": 131003,
      "name": "五原县" },
    {
      "code": 131002,
      "name": "临河区" }] },

  {
    "code": 1309,
    "name": "鄂尔多斯市",
    "sub": [{
      "code": 130909,
      "name": "伊金霍洛旗" },
    {
      "code": 130908,
      "name": "乌审旗" },
    {
      "code": 130907,
      "name": "杭锦旗" },
    {
      "code": 130906,
      "name": "鄂托克旗" },
    {
      "code": 130905,
      "name": "鄂托克前旗" },
    {
      "code": 130904,
      "name": "准格尔旗" },
    {
      "code": 130903,
      "name": "达拉特旗" },
    {
      "code": 130902,
      "name": "东胜区" }] },

  {
    "code": 1308,
    "name": "乌兰察布市",
    "sub": [{
      "code": 130812,
      "name": "丰镇市" },
    {
      "code": 130811,
      "name": "四子王旗" },
    {
      "code": 130810,
      "name": "察右后旗" },
    {
      "code": 130809,
      "name": "察右中旗" },
    {
      "code": 130808,
      "name": "察右前旗" },
    {
      "code": 130807,
      "name": "凉城县" },
    {
      "code": 130806,
      "name": "兴和县" },
    {
      "code": 130805,
      "name": "商都县" },
    {
      "code": 130804,
      "name": "化德县" },
    {
      "code": 130803,
      "name": "卓资县" },
    {
      "code": 130802,
      "name": "集宁区" }] },

  {
    "code": 1307,
    "name": "锡林郭勒盟",
    "sub": [{
      "code": 130712,
      "name": "多伦县" },
    {
      "code": 130711,
      "name": "正蓝旗" },
    {
      "code": 130710,
      "name": "正镶白旗" },
    {
      "code": 130709,
      "name": "镶黄旗" },
    {
      "code": 130708,
      "name": "太仆寺旗" },
    {
      "code": 130707,
      "name": "西乌珠穆沁旗" },
    {
      "code": 130706,
      "name": "东乌珠穆沁旗" },
    {
      "code": 130705,
      "name": "苏尼特右旗" },
    {
      "code": 130704,
      "name": "苏尼特左旗" },
    {
      "code": 130703,
      "name": "阿巴嘎旗" },
    {
      "code": 130702,
      "name": "锡林浩特市" }] },

  {
    "code": 1306,
    "name": "赤峰市",
    "sub": [{
      "code": 130613,
      "name": "敖汉旗" },
    {
      "code": 130612,
      "name": "宁城县" },
    {
      "code": 130611,
      "name": "喀喇沁旗" },
    {
      "code": 130610,
      "name": "翁牛特旗" },
    {
      "code": 130609,
      "name": "克什克腾旗" },
    {
      "code": 130608,
      "name": "林西县" },
    {
      "code": 130607,
      "name": "巴林右旗" },
    {
      "code": 130606,
      "name": "巴林左旗" },
    {
      "code": 130605,
      "name": "阿鲁科尔沁旗" },
    {
      "code": 130604,
      "name": "松山区" },
    {
      "code": 130603,
      "name": "元宝山区" },
    {
      "code": 130602,
      "name": "红山区" }] },

  {
    "code": 1305,
    "name": "通辽市",
    "sub": [{
      "code": 130509,
      "name": "霍林郭勒市" },
    {
      "code": 130508,
      "name": "扎鲁特旗" },
    {
      "code": 130507,
      "name": "奈曼旗" },
    {
      "code": 130506,
      "name": "库伦旗" },
    {
      "code": 130505,
      "name": "开鲁县" },
    {
      "code": 130504,
      "name": "科左后旗" },
    {
      "code": 130503,
      "name": "科左中旗" },
    {
      "code": 130502,
      "name": "科尔沁区" }] },

  {
    "code": 1304,
    "name": "兴安盟",
    "sub": [{
      "code": 130406,
      "name": "突泉县" },
    {
      "code": 130405,
      "name": "扎赉特旗" },
    {
      "code": 130404,
      "name": "科右中旗" },
    {
      "code": 130403,
      "name": "科右前旗" },
    {
      "code": 130402,
      "name": "阿尔山市" },
    {
      "code": 130401,
      "name": "乌兰浩特市" }] },

  {
    "code": 1303,
    "name": "呼伦贝尔市",
    "sub": [{
      "code": 130314,
      "name": "根河市" },
    {
      "code": 130313,
      "name": "额尔古纳市" },
    {
      "code": 130312,
      "name": "扎兰屯市" },
    {
      "code": 130311,
      "name": "牙克石市" },
    {
      "code": 130309,
      "name": "新巴尔虎右旗" },
    {
      "code": 130308,
      "name": "新巴尔虎左旗" },
    {
      "code": 130307,
      "name": "陈巴尔虎旗" },
    {
      "code": 130306,
      "name": "鄂温克旗" },
    {
      "code": 130305,
      "name": "鄂伦春自治旗" },
    {
      "code": 130304,
      "name": "莫旗" },
    {
      "code": 130303,
      "name": "阿荣旗" },
    {
      "code": 130302,
      "name": "海拉尔区" }] },

  {
    "code": 1302,
    "name": "包头市",
    "sub": [{
      "code": 130211,
      "name": "高新区" },
    {
      "code": 130210,
      "name": "达茂联合旗" },
    {
      "code": 130209,
      "name": "固阳县" },
    {
      "code": 130208,
      "name": "土默特右旗" },
    {
      "code": 130207,
      "name": "九原区" },
    {
      "code": 130206,
      "name": "白云鄂博" },
    {
      "code": 130205,
      "name": "石拐区" },
    {
      "code": 130204,
      "name": "青山区" },
    {
      "code": 130203,
      "name": "昆都仑区" },
    {
      "code": 130202,
      "name": "东河区" }] },

  {
    "code": 1301,
    "name": "呼和浩特市",
    "sub": [{
      "code": 130110,
      "name": "武川县" },
    {
      "code": 130109,
      "name": "清水河县" },
    {
      "code": 130108,
      "name": "和林格尔县" },
    {
      "code": 130107,
      "name": "托克托县" },
    {
      "code": 130106,
      "name": "土默特左旗" },
    {
      "code": 130105,
      "name": "赛罕区" },
    {
      "code": 130104,
      "name": "玉泉区" },
    {
      "code": 130103,
      "name": "回民区" },
    {
      "code": 130102,
      "name": "新城区" }] }] },


{
  "code": 14,
  "name": "山西省",
  "sub": [{
    "code": 1411,
    "name": "运城市",
    "sub": [{
      "code": 141114,
      "name": "河津市" },
    {
      "code": 141113,
      "name": "永济市" },
    {
      "code": 141112,
      "name": "芮城县" },
    {
      "code": 141111,
      "name": "平陆县" },
    {
      "code": 141110,
      "name": "夏县" },
    {
      "code": 141109,
      "name": "垣曲县" },
    {
      "code": 141108,
      "name": "绛县" },
    {
      "code": 141107,
      "name": "新绛县" },
    {
      "code": 141106,
      "name": "稷山县" },
    {
      "code": 141105,
      "name": "闻喜县" },
    {
      "code": 141104,
      "name": "万荣县" },
    {
      "code": 141103,
      "name": "临猗县" },
    {
      "code": 141102,
      "name": "盐湖区" }] },

  {
    "code": 1410,
    "name": "吕梁市",
    "sub": [{
      "code": 141014,
      "name": "汾阳市" },
    {
      "code": 141013,
      "name": "孝义市" },
    {
      "code": 141012,
      "name": "交口县" },
    {
      "code": 141011,
      "name": "中阳县" },
    {
      "code": 141010,
      "name": "方山县" },
    {
      "code": 141009,
      "name": "岚县" },
    {
      "code": 141008,
      "name": "石楼县" },
    {
      "code": 141007,
      "name": "柳林县" },
    {
      "code": 141006,
      "name": "临县" },
    {
      "code": 141005,
      "name": "兴县" },
    {
      "code": 141004,
      "name": "交城县" },
    {
      "code": 141003,
      "name": "文水县" },
    {
      "code": 141002,
      "name": "离石区" }] },

  {
    "code": 1409,
    "name": "临汾市",
    "sub": [{
      "code": 140918,
      "name": "霍州市" },
    {
      "code": 140917,
      "name": "侯马市" },
    {
      "code": 140916,
      "name": "汾西县" },
    {
      "code": 140915,
      "name": "蒲县" },
    {
      "code": 140914,
      "name": "永和县" },
    {
      "code": 140913,
      "name": "隰县" },
    {
      "code": 140912,
      "name": "大宁县" },
    {
      "code": 140911,
      "name": "乡宁县" },
    {
      "code": 140910,
      "name": "吉县" },
    {
      "code": 140909,
      "name": "浮山县" },
    {
      "code": 140908,
      "name": "安泽县" },
    {
      "code": 140907,
      "name": "古县" },
    {
      "code": 140906,
      "name": "洪洞县" },
    {
      "code": 140905,
      "name": "襄汾县" },
    {
      "code": 140904,
      "name": "翼城县" },
    {
      "code": 140903,
      "name": "曲沃县" },
    {
      "code": 140902,
      "name": "尧都区" }] },

  {
    "code": 1408,
    "name": "晋中市",
    "sub": [{
      "code": 140812,
      "name": "介休市" },
    {
      "code": 140811,
      "name": "灵石县" },
    {
      "code": 140810,
      "name": "平遥县" },
    {
      "code": 140809,
      "name": "祁县" },
    {
      "code": 140808,
      "name": "太谷县" },
    {
      "code": 140807,
      "name": "寿阳县" },
    {
      "code": 140806,
      "name": "昔阳县" },
    {
      "code": 140805,
      "name": "和顺县" },
    {
      "code": 140804,
      "name": "左权县" },
    {
      "code": 140803,
      "name": "榆社县" },
    {
      "code": 140802,
      "name": "榆次区" }] },

  {
    "code": 1407,
    "name": "忻州市",
    "sub": [{
      "code": 140715,
      "name": "原平市" },
    {
      "code": 140714,
      "name": "偏关县" },
    {
      "code": 140713,
      "name": "保德县" },
    {
      "code": 140712,
      "name": "河曲县" },
    {
      "code": 140711,
      "name": "岢岚县" },
    {
      "code": 140710,
      "name": "五寨县" },
    {
      "code": 140709,
      "name": "神池县" },
    {
      "code": 140708,
      "name": "静乐县" },
    {
      "code": 140707,
      "name": "宁武县" },
    {
      "code": 140706,
      "name": "繁峙县" },
    {
      "code": 140705,
      "name": "代县" },
    {
      "code": 140704,
      "name": "五台县" },
    {
      "code": 140703,
      "name": "定襄县" },
    {
      "code": 140702,
      "name": "忻府区" }] },

  {
    "code": 1406,
    "name": "朔州市",
    "sub": [{
      "code": 140607,
      "name": "怀仁县" },
    {
      "code": 140606,
      "name": "右玉县" },
    {
      "code": 140605,
      "name": "应县" },
    {
      "code": 140604,
      "name": "山阴县" },
    {
      "code": 140603,
      "name": "平鲁区" },
    {
      "code": 140602,
      "name": "朔城区" }] },

  {
    "code": 1405,
    "name": "晋城市",
    "sub": [{
      "code": 140507,
      "name": "高平市" },
    {
      "code": 140506,
      "name": "泽州县" },
    {
      "code": 140505,
      "name": "陵川县" },
    {
      "code": 140504,
      "name": "阳城县" },
    {
      "code": 140503,
      "name": "沁水县" },
    {
      "code": 140502,
      "name": "城区" }] },

  {
    "code": 1404,
    "name": "长治市",
    "sub": [{
      "code": 140414,
      "name": "潞城市" },
    {
      "code": 140413,
      "name": "沁源县" },
    {
      "code": 140412,
      "name": "沁县" },
    {
      "code": 140411,
      "name": "武乡县" },
    {
      "code": 140410,
      "name": "长子县" },
    {
      "code": 140409,
      "name": "壶关县" },
    {
      "code": 140408,
      "name": "黎城县" },
    {
      "code": 140407,
      "name": "平顺县" },
    {
      "code": 140406,
      "name": "屯留县" },
    {
      "code": 140405,
      "name": "襄垣县" },
    {
      "code": 140404,
      "name": "长治县" },
    {
      "code": 140403,
      "name": "郊区" },
    {
      "code": 140402,
      "name": "城区" }] },

  {
    "code": 1403,
    "name": "阳泉市",
    "sub": [{
      "code": 140306,
      "name": "盂县" },
    {
      "code": 140305,
      "name": "平定县" },
    {
      "code": 140304,
      "name": "郊区" },
    {
      "code": 140303,
      "name": "矿区" },
    {
      "code": 140302,
      "name": "城区" }] },

  {
    "code": 1402,
    "name": "大同市",
    "sub": [{
      "code": 140212,
      "name": "大同县" },
    {
      "code": 140211,
      "name": "左云县" },
    {
      "code": 140210,
      "name": "浑源县" },
    {
      "code": 140209,
      "name": "灵丘县" },
    {
      "code": 140208,
      "name": "广灵县" },
    {
      "code": 140207,
      "name": "天镇县" },
    {
      "code": 140206,
      "name": "阳高县" },
    {
      "code": 140205,
      "name": "新荣区" },
    {
      "code": 140204,
      "name": "南郊区" },
    {
      "code": 140203,
      "name": "矿区" },
    {
      "code": 140202,
      "name": "城区" }] },

  {
    "code": 1401,
    "name": "太原市",
    "sub": [{
      "code": 140111,
      "name": "古交市" },
    {
      "code": 140110,
      "name": "娄烦县" },
    {
      "code": 140109,
      "name": "阳曲县" },
    {
      "code": 140108,
      "name": "清徐县" },
    {
      "code": 140107,
      "name": "晋源区" },
    {
      "code": 140106,
      "name": "万柏林区" },
    {
      "code": 140105,
      "name": "尖草坪区" },
    {
      "code": 140104,
      "name": "杏花岭区" },
    {
      "code": 140103,
      "name": "迎泽区" },
    {
      "code": 140102,
      "name": "小店区" }] }] },


{
  "code": 20,
  "name": "辽宁省",
  "sub": [{
    "code": 2014,
    "name": "葫芦岛市",
    "sub": [{
      "code": 201407,
      "name": "兴城市" },
    {
      "code": 201406,
      "name": "建昌县" },
    {
      "code": 201405,
      "name": "绥中县" },
    {
      "code": 201404,
      "name": "南票区" },
    {
      "code": 201403,
      "name": "龙港区" },
    {
      "code": 201402,
      "name": "连山区" }] },

  {
    "code": 2013,
    "name": "朝阳市",
    "sub": [{
      "code": 201308,
      "name": "凌源市" },
    {
      "code": 201307,
      "name": "北票市" },
    {
      "code": 201306,
      "name": "喀左县" },
    {
      "code": 201305,
      "name": "建平县" },
    {
      "code": 201304,
      "name": "朝阳县" },
    {
      "code": 201303,
      "name": "龙城区" },
    {
      "code": 201302,
      "name": "双塔区" }] },

  {
    "code": 2012,
    "name": "本溪市",
    "sub": [{
      "code": 201207,
      "name": "桓仁县" },
    {
      "code": 201206,
      "name": "本溪县" },
    {
      "code": 201205,
      "name": "南芬区" },
    {
      "code": 201204,
      "name": "明山区" },
    {
      "code": 201203,
      "name": "溪湖区" },
    {
      "code": 201202,
      "name": "平山区" }] },

  {
    "code": 2011,
    "name": "阜新市",
    "sub": [{
      "code": 201108,
      "name": "彰武县" },
    {
      "code": 201107,
      "name": "阜新县" },
    {
      "code": 201106,
      "name": "细河区" },
    {
      "code": 201105,
      "name": "清河门区" },
    {
      "code": 201104,
      "name": "太平区" },
    {
      "code": 201103,
      "name": "新邱区" },
    {
      "code": 201102,
      "name": "海州区" }] },

  {
    "code": 2010,
    "name": "辽阳市",
    "sub": [{
      "code": 201009,
      "name": "高新区" },
    {
      "code": 201008,
      "name": "灯塔市" },
    {
      "code": 201007,
      "name": "辽阳县" },
    {
      "code": 201006,
      "name": "太子河区" },
    {
      "code": 201005,
      "name": "弓长岭区" },
    {
      "code": 201004,
      "name": "宏伟区" },
    {
      "code": 201003,
      "name": "文圣区" },
    {
      "code": 201002,
      "name": "白塔区" }] },

  {
    "code": 2009,
    "name": "营口市",
    "sub": [{
      "code": 200907,
      "name": "大石桥市" },
    {
      "code": 200906,
      "name": "盖州市" },
    {
      "code": 200905,
      "name": "老边区" },
    {
      "code": 200904,
      "name": "鲅鱼圈区" },
    {
      "code": 200902,
      "name": "站前区" }] },

  {
    "code": 2008,
    "name": "抚顺市",
    "sub": [{
      "code": 200808,
      "name": "清原县" },
    {
      "code": 200807,
      "name": "新宾县" },
    {
      "code": 200806,
      "name": "抚顺县" },
    {
      "code": 200805,
      "name": "顺城区" },
    {
      "code": 200804,
      "name": "望花区" },
    {
      "code": 200803,
      "name": "东洲区" },
    {
      "code": 200802,
      "name": "新抚区" }] },

  {
    "code": 2007,
    "name": "铁岭市",
    "sub": [{
      "code": 200708,
      "name": "开原市" },
    {
      "code": 200707,
      "name": "调兵山市" },
    {
      "code": 200706,
      "name": "昌图县" },
    {
      "code": 200705,
      "name": "西丰县" },
    {
      "code": 200704,
      "name": "铁岭县" },
    {
      "code": 200703,
      "name": "清河区" },
    {
      "code": 200702,
      "name": "银州区" }] },

  {
    "code": 2006,
    "name": "盘锦市",
    "sub": [{
      "code": 200605,
      "name": "盘山县" },
    {
      "code": 200604,
      "name": "大洼县" },
    {
      "code": 200603,
      "name": "兴隆台区" },
    {
      "code": 200602,
      "name": "双台子区" }] },

  {
    "code": 2005,
    "name": "丹东市",
    "sub": [{
      "code": 200507,
      "name": "凤城市" },
    {
      "code": 200506,
      "name": "东港市" },
    {
      "code": 200505,
      "name": "宽甸县" },
    {
      "code": 200504,
      "name": "振安区" },
    {
      "code": 200503,
      "name": "振兴区" },
    {
      "code": 200502,
      "name": "元宝区" }] },

  {
    "code": 2004,
    "name": "锦州市",
    "sub": [{
      "code": 200408,
      "name": "北镇市" },
    {
      "code": 200407,
      "name": "凌海市" },
    {
      "code": 200406,
      "name": "义县" },
    {
      "code": 200405,
      "name": "黑山县" },
    {
      "code": 200404,
      "name": "太和区" },
    {
      "code": 200403,
      "name": "凌河区" },
    {
      "code": 200402,
      "name": "古塔区" }] },

  {
    "code": 2003,
    "name": "鞍山市",
    "sub": [{
      "code": 200309,
      "name": "高新区" },
    {
      "code": 200308,
      "name": "海城市" },
    {
      "code": 200307,
      "name": "岫岩县" },
    {
      "code": 200306,
      "name": "台安县" },
    {
      "code": 200305,
      "name": "千山区" },
    {
      "code": 200304,
      "name": "立山区" },
    {
      "code": 200303,
      "name": "铁西区" },
    {
      "code": 200302,
      "name": "铁东区" }] },

  {
    "code": 2002,
    "name": "大连市",
    "sub": [{
      "code": 200211,
      "name": "庄河市" },
    {
      "code": 200210,
      "name": "普兰店市" },
    {
      "code": 200209,
      "name": "瓦房店市" },
    {
      "code": 200208,
      "name": "长海县" },
    {
      "code": 200207,
      "name": "金州区" },
    {
      "code": 200206,
      "name": "旅顺口区" },
    {
      "code": 200205,
      "name": "甘井子区" },
    {
      "code": 200204,
      "name": "沙河口区" },
    {
      "code": 200203,
      "name": "西岗区" },
    {
      "code": 200202,
      "name": "中山区" }] },

  {
    "code": 2001,
    "name": "沈阳市",
    "sub": [{
      "code": 200115,
      "name": "浑南新区" },
    {
      "code": 200114,
      "name": "新民市" },
    {
      "code": 200113,
      "name": "法库县" },
    {
      "code": 200112,
      "name": "康平县" },
    {
      "code": 200111,
      "name": "辽中县" },
    {
      "code": 200110,
      "name": "于洪区" },
    {
      "code": 200109,
      "name": "沈北新区" },
    {
      "code": 200108,
      "name": "东陵区" },
    {
      "code": 200107,
      "name": "苏家屯区" },
    {
      "code": 200106,
      "name": "铁西区" },
    {
      "code": 200105,
      "name": "皇姑区" },
    {
      "code": 200104,
      "name": "大东区" },
    {
      "code": 200103,
      "name": "沈河区" },
    {
      "code": 200102,
      "name": "和平区" }] }] },


{
  "code": 21,
  "name": "吉林省",
  "sub": [{
    "code": 2109,
    "name": "延边州",
    "sub": [{
      "code": 210909,
      "name": "高新区" },
    {
      "code": 210908,
      "name": "安图县" },
    {
      "code": 210907,
      "name": "汪清县" },
    {
      "code": 210906,
      "name": "和龙市" },
    {
      "code": 210905,
      "name": "龙井市" },
    {
      "code": 210904,
      "name": "珲春市" },
    {
      "code": 210903,
      "name": "敦化市" },
    {
      "code": 210902,
      "name": "图们市" },
    {
      "code": 210901,
      "name": "延吉市" }] },

  {
    "code": 2108,
    "name": "白城市",
    "sub": [{
      "code": 210806,
      "name": "大安市" },
    {
      "code": 210805,
      "name": "洮南市" },
    {
      "code": 210804,
      "name": "通榆县" },
    {
      "code": 210803,
      "name": "镇赉县" },
    {
      "code": 210802,
      "name": "洮北区" }] },

  {
    "code": 2107,
    "name": "松原市",
    "sub": [{
      "code": 210706,
      "name": "扶余县" },
    {
      "code": 210705,
      "name": "乾安县" },
    {
      "code": 210704,
      "name": "长岭县" },
    {
      "code": 210703,
      "name": "前郭县" },
    {
      "code": 210702,
      "name": "宁江区" }] },

  {
    "code": 2106,
    "name": "白山市",
    "sub": [{
      "code": 210607,
      "name": "临江市" },
    {
      "code": 210606,
      "name": "长白县" },
    {
      "code": 210605,
      "name": "靖宇县" },
    {
      "code": 210604,
      "name": "抚松县" },
    {
      "code": 210603,
      "name": "江源区" },
    {
      "code": 210602,
      "name": "八道江区" }] },

  {
    "code": 2105,
    "name": "通化市",
    "sub": [{
      "code": 210508,
      "name": "集安市" },
    {
      "code": 210507,
      "name": "梅河口市" },
    {
      "code": 210506,
      "name": "柳河县" },
    {
      "code": 210505,
      "name": "辉南县" },
    {
      "code": 210504,
      "name": "通化县" },
    {
      "code": 210503,
      "name": "二道江区" },
    {
      "code": 210502,
      "name": "东昌区" }] },

  {
    "code": 2104,
    "name": "辽源市",
    "sub": [{
      "code": 210405,
      "name": "东辽县" },
    {
      "code": 210404,
      "name": "东丰县" },
    {
      "code": 210403,
      "name": "西安区" },
    {
      "code": 210402,
      "name": "龙山区" }] },

  {
    "code": 2103,
    "name": "四平市",
    "sub": [{
      "code": 210307,
      "name": "双辽市" },
    {
      "code": 210306,
      "name": "公主岭市" },
    {
      "code": 210305,
      "name": "伊通县" },
    {
      "code": 210304,
      "name": "梨树县" },
    {
      "code": 210303,
      "name": "铁东区" },
    {
      "code": 210302,
      "name": "铁西区" }] },

  {
    "code": 2102,
    "name": "吉林市",
    "sub": [{
      "code": 210210,
      "name": "磐石市" },
    {
      "code": 210209,
      "name": "舒兰市" },
    {
      "code": 210208,
      "name": "桦甸市" },
    {
      "code": 210207,
      "name": "蛟河市" },
    {
      "code": 210206,
      "name": "永吉县" },
    {
      "code": 210205,
      "name": "丰满区" },
    {
      "code": 210204,
      "name": "船营区" },
    {
      "code": 210203,
      "name": "龙潭区" },
    {
      "code": 210202,
      "name": "昌邑区" }] },

  {
    "code": 2101,
    "name": "长春市",
    "sub": [{
      "code": 210111,
      "name": "德惠市" },
    {
      "code": 210110,
      "name": "榆树市" },
    {
      "code": 210109,
      "name": "九台市" },
    {
      "code": 210108,
      "name": "农安县" },
    {
      "code": 210107,
      "name": "双阳区" },
    {
      "code": 210106,
      "name": "绿园区" },
    {
      "code": 210105,
      "name": "二道区" },
    {
      "code": 210104,
      "name": "朝阳区" },
    {
      "code": 210103,
      "name": "宽城区" },
    {
      "code": 210102,
      "name": "南关区" }] }] },


{
  "code": 22,
  "name": "黑龙江省",
  "sub": [{
    "code": 2213,
    "name": "大兴安岭地区",
    "sub": [{
      "code": 221307,
      "name": "漠河县" },
    {
      "code": 221306,
      "name": "塔河县" },
    {
      "code": 221305,
      "name": "呼玛县" },
    {
      "code": 221304,
      "name": "呼中区" },
    {
      "code": 221303,
      "name": "新林区" },
    {
      "code": 221302,
      "name": "松岭区" },
    {
      "code": 221301,
      "name": "加格达奇区" }] },

  {
    "code": 2212,
    "name": "绥化市",
    "sub": [{
      "code": 221211,
      "name": "海伦市" },
    {
      "code": 221210,
      "name": "肇东市" },
    {
      "code": 221209,
      "name": "安达市" },
    {
      "code": 221208,
      "name": "绥棱县" },
    {
      "code": 221207,
      "name": "明水县" },
    {
      "code": 221206,
      "name": "庆安县" },
    {
      "code": 221205,
      "name": "青冈县" },
    {
      "code": 221204,
      "name": "兰西县" },
    {
      "code": 221203,
      "name": "望奎县" },
    {
      "code": 221202,
      "name": "北林区" }] },

  {
    "code": 2211,
    "name": "黑河市",
    "sub": [{
      "code": 221107,
      "name": "五大连池市" },
    {
      "code": 221106,
      "name": "北安市" },
    {
      "code": 221105,
      "name": "孙吴县" },
    {
      "code": 221104,
      "name": "逊克县" },
    {
      "code": 221103,
      "name": "嫩江县" },
    {
      "code": 221102,
      "name": "爱辉区" }] },

  {
    "code": 2210,
    "name": "牡丹江市",
    "sub": [{
      "code": 221011,
      "name": "穆棱市" },
    {
      "code": 221010,
      "name": "宁安市" },
    {
      "code": 221009,
      "name": "海林市" },
    {
      "code": 221008,
      "name": "绥芬河市" },
    {
      "code": 221007,
      "name": "林口县" },
    {
      "code": 221006,
      "name": "东宁县" },
    {
      "code": 221005,
      "name": "西安区" },
    {
      "code": 221004,
      "name": "爱民区" },
    {
      "code": 221003,
      "name": "阳明区" },
    {
      "code": 221002,
      "name": "东安区" }] },

  {
    "code": 2209,
    "name": "七台河市",
    "sub": [{
      "code": 220905,
      "name": "勃利县" },
    {
      "code": 220904,
      "name": "茄子河区" },
    {
      "code": 220903,
      "name": "桃山区" },
    {
      "code": 220902,
      "name": "新兴区" }] },

  {
    "code": 2208,
    "name": "佳木斯市",
    "sub": [{
      "code": 220811,
      "name": "富锦市" },
    {
      "code": 220810,
      "name": "同江市" },
    {
      "code": 220809,
      "name": "抚远县" },
    {
      "code": 220808,
      "name": "汤原县" },
    {
      "code": 220807,
      "name": "桦川县" },
    {
      "code": 220806,
      "name": "桦南县" },
    {
      "code": 220805,
      "name": "郊区" },
    {
      "code": 220804,
      "name": "东风区" },
    {
      "code": 220803,
      "name": "前进区" },
    {
      "code": 220802,
      "name": "向阳区" }] },

  {
    "code": 2207,
    "name": "伊春市",
    "sub": [{
      "code": 220718,
      "name": "铁力市" },
    {
      "code": 220717,
      "name": "嘉荫县" },
    {
      "code": 220716,
      "name": "上甘岭区" },
    {
      "code": 220715,
      "name": "红星区" },
    {
      "code": 220714,
      "name": "乌伊岭区" },
    {
      "code": 220713,
      "name": "带岭区" },
    {
      "code": 220712,
      "name": "汤旺河区" },
    {
      "code": 220711,
      "name": "乌马河区" },
    {
      "code": 220710,
      "name": "五营区" },
    {
      "code": 220709,
      "name": "金山屯区" },
    {
      "code": 220708,
      "name": "美溪区" },
    {
      "code": 220707,
      "name": "新青区" },
    {
      "code": 220706,
      "name": "翠峦区" },
    {
      "code": 220705,
      "name": "西林区" },
    {
      "code": 220704,
      "name": "友好区" },
    {
      "code": 220703,
      "name": "南岔区" },
    {
      "code": 220702,
      "name": "伊春区" }] },

  {
    "code": 2206,
    "name": "大庆市",
    "sub": [{
      "code": 220611,
      "name": "高新区" },
    {
      "code": 220610,
      "name": "杜尔伯特县" },
    {
      "code": 220609,
      "name": "林甸县" },
    {
      "code": 220608,
      "name": "肇源县" },
    {
      "code": 220607,
      "name": "肇州县" },
    {
      "code": 220606,
      "name": "大同区" },
    {
      "code": 220605,
      "name": "红岗区" },
    {
      "code": 220604,
      "name": "让胡路区" },
    {
      "code": 220603,
      "name": "龙凤区" },
    {
      "code": 220602,
      "name": "萨尔图区" }] },

  {
    "code": 2205,
    "name": "双鸭山市",
    "sub": [{
      "code": 220509,
      "name": "饶河县" },
    {
      "code": 220508,
      "name": "宝清县" },
    {
      "code": 220507,
      "name": "友谊县" },
    {
      "code": 220506,
      "name": "集贤县" },
    {
      "code": 220505,
      "name": "宝山区" },
    {
      "code": 220504,
      "name": "四方台区" },
    {
      "code": 220503,
      "name": "岭东区" },
    {
      "code": 220502,
      "name": "尖山区" }] },

  {
    "code": 2204,
    "name": "鹤岗市",
    "sub": [{
      "code": 220409,
      "name": "绥滨县" },
    {
      "code": 220408,
      "name": "萝北县" },
    {
      "code": 220407,
      "name": "兴山区" },
    {
      "code": 220406,
      "name": "东山区" },
    {
      "code": 220405,
      "name": "兴安区" },
    {
      "code": 220404,
      "name": "南山区" },
    {
      "code": 220403,
      "name": "工农区" },
    {
      "code": 220402,
      "name": "向阳区" }] },

  {
    "code": 2203,
    "name": "鸡西市",
    "sub": [{
      "code": 220310,
      "name": "密山市" },
    {
      "code": 220309,
      "name": "虎林市" },
    {
      "code": 220308,
      "name": "鸡东县" },
    {
      "code": 220307,
      "name": "麻山区" },
    {
      "code": 220306,
      "name": "城子河区" },
    {
      "code": 220305,
      "name": "梨树区" },
    {
      "code": 220304,
      "name": "滴道区" },
    {
      "code": 220303,
      "name": "恒山区" },
    {
      "code": 220302,
      "name": "鸡冠区" }] },

  {
    "code": 2202,
    "name": "齐齐哈尔市",
    "sub": [{
      "code": 220218,
      "name": "高新区" },
    {
      "code": 220217,
      "name": "讷河市" },
    {
      "code": 220216,
      "name": "拜泉县" },
    {
      "code": 220215,
      "name": "克东县" },
    {
      "code": 220214,
      "name": "克山县" },
    {
      "code": 220213,
      "name": "富裕县" },
    {
      "code": 220212,
      "name": "甘南县" },
    {
      "code": 220211,
      "name": "泰来县" },
    {
      "code": 220210,
      "name": "依安县" },
    {
      "code": 220209,
      "name": "龙江县" },
    {
      "code": 220208,
      "name": "梅里斯区" },
    {
      "code": 220207,
      "name": "碾子山区" },
    {
      "code": 220206,
      "name": "富拉尔基区" },
    {
      "code": 220205,
      "name": "昂昂溪区" },
    {
      "code": 220204,
      "name": "铁锋区" },
    {
      "code": 220203,
      "name": "建华区" },
    {
      "code": 220202,
      "name": "龙沙区" }] },

  {
    "code": 2201,
    "name": "哈尔滨市",
    "sub": [{
      "code": 220119,
      "name": "五常市" },
    {
      "code": 220118,
      "name": "尚志市" },
    {
      "code": 220117,
      "name": "双城市" },
    {
      "code": 220116,
      "name": "延寿县" },
    {
      "code": 220115,
      "name": "通河县" },
    {
      "code": 220114,
      "name": "木兰县" },
    {
      "code": 220113,
      "name": "巴彦县" },
    {
      "code": 220112,
      "name": "宾县" },
    {
      "code": 220111,
      "name": "方正县" },
    {
      "code": 220110,
      "name": "依兰县" },
    {
      "code": 220109,
      "name": "阿城区" },
    {
      "code": 220108,
      "name": "呼兰区" },
    {
      "code": 220107,
      "name": "香坊区" },
    {
      "code": 220106,
      "name": "松北区" },
    {
      "code": 220105,
      "name": "平房区" },
    {
      "code": 220104,
      "name": "道外区" },
    {
      "code": 220103,
      "name": "南岗区" },
    {
      "code": 220102,
      "name": "道里区" }] }] },


{
  "code": 30,
  "name": "上海市",
  "sub": [{
    "code": 3001,
    "name": "上海市",
    "sub": [{
      "code": 300119,
      "name": "嘉定区" },
    {
      "code": 300118,
      "name": "徐汇区" },
    {
      "code": 300117,
      "name": "闵行区" },
    {
      "code": 300116,
      "name": "黄浦区" },
    {
      "code": 300115,
      "name": "闸北区" },
    {
      "code": 300114,
      "name": "普陀区" },
    {
      "code": 300113,
      "name": "虹口区" },
    {
      "code": 300112,
      "name": "杨浦区" },
    {
      "code": 300111,
      "name": "浦东新区" },
    {
      "code": 300110,
      "name": "奉贤区" },
    {
      "code": 300109,
      "name": "松江区" },
    {
      "code": 300107,
      "name": "崇明县" },
    {
      "code": 300106,
      "name": "青浦区" },
    {
      "code": 300105,
      "name": "静安区" },
    {
      "code": 300104,
      "name": "长宁区" },
    {
      "code": 300102,
      "name": "金山区" },
    {
      "code": 300101,
      "name": "宝山区" }] }] },


{
  "code": 31,
  "name": "江苏省",
  "sub": [{
    "code": 3113,
    "name": "宿迁市",
    "sub": [{
      "code": 311306,
      "name": "泗洪县" },
    {
      "code": 311305,
      "name": "泗阳县" },
    {
      "code": 311304,
      "name": "沭阳县" },
    {
      "code": 311303,
      "name": "宿豫区" },
    {
      "code": 311302,
      "name": "宿城区" }] },

  {
    "code": 3112,
    "name": "泰州市",
    "sub": [{
      "code": 311208,
      "name": "高新区" },
    {
      "code": 311207,
      "name": "姜堰市" },
    {
      "code": 311206,
      "name": "泰兴市" },
    {
      "code": 311205,
      "name": "靖江市" },
    {
      "code": 311204,
      "name": "兴化市" },
    {
      "code": 311203,
      "name": "高港区" },
    {
      "code": 311202,
      "name": "海陵区" }] },

  {
    "code": 3111,
    "name": "淮安市",
    "sub": [{
      "code": 311109,
      "name": "金湖县" },
    {
      "code": 311108,
      "name": "盱眙县" },
    {
      "code": 311107,
      "name": "洪泽县" },
    {
      "code": 311106,
      "name": "涟水县" },
    {
      "code": 311105,
      "name": "清浦区" },
    {
      "code": 311104,
      "name": "淮阴区" },
    {
      "code": 311103,
      "name": "楚州区" },
    {
      "code": 311102,
      "name": "清河区" }] },

  {
    "code": 3110,
    "name": "盐城市",
    "sub": [{
      "code": 311010,
      "name": "大丰市" },
    {
      "code": 311009,
      "name": "东台市" },
    {
      "code": 311008,
      "name": "建湖县" },
    {
      "code": 311007,
      "name": "射阳县" },
    {
      "code": 311006,
      "name": "阜宁县" },
    {
      "code": 311005,
      "name": "滨海县" },
    {
      "code": 311004,
      "name": "响水县" },
    {
      "code": 311003,
      "name": "盐都区" },
    {
      "code": 311002,
      "name": "亭湖区" }] },

  {
    "code": 3109,
    "name": "连云港市",
    "sub": [{
      "code": 310908,
      "name": "灌南县" },
    {
      "code": 310907,
      "name": "灌云县" },
    {
      "code": 310906,
      "name": "东海县" },
    {
      "code": 310905,
      "name": "赣榆县" },
    {
      "code": 310904,
      "name": "海州区" },
    {
      "code": 310903,
      "name": "新浦区" },
    {
      "code": 310902,
      "name": "连云区" }] },

  {
    "code": 3108,
    "name": "徐州市",
    "sub": [{
      "code": 310812,
      "name": "邳州市" },
    {
      "code": 310811,
      "name": "新沂市" },
    {
      "code": 310810,
      "name": "睢宁县" },
    {
      "code": 310809,
      "name": "铜山县" },
    {
      "code": 310808,
      "name": "沛县" },
    {
      "code": 310807,
      "name": "丰县" },
    {
      "code": 310806,
      "name": "泉山区" },
    {
      "code": 310805,
      "name": "贾汪区" },
    {
      "code": 310804,
      "name": "九里区" },
    {
      "code": 310803,
      "name": "云龙区" },
    {
      "code": 310802,
      "name": "鼓楼区" }] },

  {
    "code": 3107,
    "name": "常州市",
    "sub": [{
      "code": 310708,
      "name": "金坛市" },
    {
      "code": 310707,
      "name": "溧阳市" },
    {
      "code": 310706,
      "name": "武进区" },
    {
      "code": 310705,
      "name": "新北区" },
    {
      "code": 310704,
      "name": "戚墅堰区" },
    {
      "code": 310703,
      "name": "钟楼区" },
    {
      "code": 310702,
      "name": "天宁区" }] },

  {
    "code": 3106,
    "name": "南通市",
    "sub": [{
      "code": 310609,
      "name": "海门市" },
    {
      "code": 310608,
      "name": "通州市" },
    {
      "code": 310607,
      "name": "如皋市" },
    {
      "code": 310606,
      "name": "启东市" },
    {
      "code": 310605,
      "name": "如东县" },
    {
      "code": 310604,
      "name": "海安县" },
    {
      "code": 310603,
      "name": "港闸区" },
    {
      "code": 310602,
      "name": "崇川区" }] },

  {
    "code": 3105,
    "name": "扬州市",
    "sub": [{
      "code": 310508,
      "name": "江都区" },
    {
      "code": 310507,
      "name": "高邮市" },
    {
      "code": 310506,
      "name": "仪征市" },
    {
      "code": 310505,
      "name": "宝应县" },
    {
      "code": 310503,
      "name": "邗江区" },
    {
      "code": 310502,
      "name": "广陵区" }] },

  {
    "code": 3104,
    "name": "镇江市",
    "sub": [{
      "code": 310407,
      "name": "句容市" },
    {
      "code": 310406,
      "name": "扬中市" },
    {
      "code": 310405,
      "name": "丹阳市" },
    {
      "code": 310404,
      "name": "丹徒区" },
    {
      "code": 310403,
      "name": "润州区" },
    {
      "code": 310402,
      "name": "京口区" }] },

  {
    "code": 3103,
    "name": "无锡市",
    "sub": [{
      "code": 310310,
      "name": "高新区" },
    {
      "code": 310309,
      "name": "宜兴市" },
    {
      "code": 310308,
      "name": "江阴市" },
    {
      "code": 310307,
      "name": "滨湖区" },
    {
      "code": 310306,
      "name": "惠山区" },
    {
      "code": 310305,
      "name": "锡山区" },
    {
      "code": 310304,
      "name": "北塘区" },
    {
      "code": 310303,
      "name": "南长区" },
    {
      "code": 310302,
      "name": "崇安区" }] },

  {
    "code": 3102,
    "name": "苏州市",
    "sub": [{
      "code": 310214,
      "name": "高新区" },
    {
      "code": 310213,
      "name": "工业园区" },
    {
      "code": 310212,
      "name": "太仓市" },
    {
      "code": 310211,
      "name": "吴江市" },
    {
      "code": 310210,
      "name": "昆山市" },
    {
      "code": 310209,
      "name": "张家港市" },
    {
      "code": 310208,
      "name": "常熟市" },
    {
      "code": 310207,
      "name": "相城区" },
    {
      "code": 310206,
      "name": "吴中区" },
    {
      "code": 310205,
      "name": "虎丘区" },
    {
      "code": 310204,
      "name": "金阊区" },
    {
      "code": 310203,
      "name": "平江区" },
    {
      "code": 310202,
      "name": "沧浪区" }] },

  {
    "code": 3101,
    "name": "南京市",
    "sub": [{
      "code": 310114,
      "name": "高淳县" },
    {
      "code": 310113,
      "name": "溧水县" },
    {
      "code": 310112,
      "name": "六合区" },
    {
      "code": 310111,
      "name": "江宁区" },
    {
      "code": 310110,
      "name": "雨花台区" },
    {
      "code": 310109,
      "name": "栖霞区" },
    {
      "code": 310108,
      "name": "浦口区" },
    {
      "code": 310107,
      "name": "下关区" },
    {
      "code": 310106,
      "name": "鼓楼区" },
    {
      "code": 310105,
      "name": "建邺区" },
    {
      "code": 310104,
      "name": "秦淮区" },
    {
      "code": 310103,
      "name": "白下区" },
    {
      "code": 310102,
      "name": "玄武区" }] }] },


{
  "code": 32,
  "name": "山东省",
  "sub": [{
    "code": 3217,
    "name": "临沂市",
    "sub": [{
      "code": 321713,
      "name": "临沭县" },
    {
      "code": 321712,
      "name": "蒙阴县" },
    {
      "code": 321711,
      "name": "莒南县" },
    {
      "code": 321710,
      "name": "平邑县" },
    {
      "code": 321709,
      "name": "费县" },
    {
      "code": 321708,
      "name": "苍山县" },
    {
      "code": 321707,
      "name": "沂水县" },
    {
      "code": 321706,
      "name": "郯城县" },
    {
      "code": 321705,
      "name": "沂南县" },
    {
      "code": 321704,
      "name": "河东区" },
    {
      "code": 321703,
      "name": "罗庄区" },
    {
      "code": 321702,
      "name": "兰山区" }] },

  {
    "code": 3216,
    "name": "菏泽市",
    "sub": [{
      "code": 321610,
      "name": "东明县" },
    {
      "code": 321609,
      "name": "定陶县" },
    {
      "code": 321608,
      "name": "鄄城县" },
    {
      "code": 321607,
      "name": "郓城县" },
    {
      "code": 321606,
      "name": "巨野县" },
    {
      "code": 321605,
      "name": "成武县" },
    {
      "code": 321604,
      "name": "单县" },
    {
      "code": 321603,
      "name": "曹县" },
    {
      "code": 321602,
      "name": "牡丹区" }] },

  {
    "code": 3215,
    "name": "聊城市",
    "sub": [{
      "code": 321510,
      "name": "高新区" },
    {
      "code": 321509,
      "name": "临清市" },
    {
      "code": 321508,
      "name": "高唐县" },
    {
      "code": 321507,
      "name": "冠县" },
    {
      "code": 321506,
      "name": "东阿县" },
    {
      "code": 321505,
      "name": "茌平县" },
    {
      "code": 321504,
      "name": "莘县" },
    {
      "code": 321503,
      "name": "阳谷县" },
    {
      "code": 321502,
      "name": "东昌府区" }] },

  {
    "code": 3214,
    "name": "东营市",
    "sub": [{
      "code": 321406,
      "name": "广饶县" },
    {
      "code": 321405,
      "name": "利津县" },
    {
      "code": 321404,
      "name": "垦利县" },
    {
      "code": 321403,
      "name": "河口区" },
    {
      "code": 321402,
      "name": "东营区" }] },

  {
    "code": 3213,
    "name": "滨州市",
    "sub": [{
      "code": 321308,
      "name": "邹平县" },
    {
      "code": 321307,
      "name": "博兴县" },
    {
      "code": 321306,
      "name": "沾化县" },
    {
      "code": 321305,
      "name": "无棣县" },
    {
      "code": 321304,
      "name": "阳信县" },
    {
      "code": 321303,
      "name": "惠民县" },
    {
      "code": 321302,
      "name": "滨城区" }] },

  {
    "code": 3212,
    "name": "莱芜市",
    "sub": [{
      "code": 321203,
      "name": "钢城区" },
    {
      "code": 321202,
      "name": "莱城区" }] },

  {
    "code": 3211,
    "name": "日照市",
    "sub": [{
      "code": 321105,
      "name": "莒县" },
    {
      "code": 321104,
      "name": "五莲县" },
    {
      "code": 321103,
      "name": "岚山区" },
    {
      "code": 321102,
      "name": "东港区" }] },

  {
    "code": 3210,
    "name": "威海市",
    "sub": [{
      "code": 321005,
      "name": "乳山市" },
    {
      "code": 321004,
      "name": "荣成市" },
    {
      "code": 321003,
      "name": "文登市" },
    {
      "code": 321002,
      "name": "环翠区" }] },

  {
    "code": 3209,
    "name": "德州市",
    "sub": [{
      "code": 320912,
      "name": "禹城市" },
    {
      "code": 320911,
      "name": "乐陵市" },
    {
      "code": 320910,
      "name": "武城县" },
    {
      "code": 320909,
      "name": "夏津县" },
    {
      "code": 320908,
      "name": "平原县" },
    {
      "code": 320907,
      "name": "齐河县" },
    {
      "code": 320906,
      "name": "临邑县" },
    {
      "code": 320905,
      "name": "庆云县" },
    {
      "code": 320904,
      "name": "宁津县" },
    {
      "code": 320903,
      "name": "陵县" },
    {
      "code": 320902,
      "name": "德城区" }] },

  {
    "code": 3208,
    "name": "枣庄市",
    "sub": [{
      "code": 320808,
      "name": "高新区" },
    {
      "code": 320807,
      "name": "滕州市" },
    {
      "code": 320806,
      "name": "山亭区" },
    {
      "code": 320805,
      "name": "台儿庄区" },
    {
      "code": 320804,
      "name": "峄城区" },
    {
      "code": 320803,
      "name": "薛城区" },
    {
      "code": 320802,
      "name": "市中区" }] },

  {
    "code": 3207,
    "name": "济宁市",
    "sub": [{
      "code": 320714,
      "name": "高新区" },
    {
      "code": 320713,
      "name": "邹城市" },
    {
      "code": 320712,
      "name": "兖州市" },
    {
      "code": 320711,
      "name": "曲阜市" },
    {
      "code": 320710,
      "name": "梁山县" },
    {
      "code": 320709,
      "name": "泗水县" },
    {
      "code": 320708,
      "name": "汶上县" },
    {
      "code": 320707,
      "name": "嘉祥县" },
    {
      "code": 320706,
      "name": "金乡县" },
    {
      "code": 320705,
      "name": "鱼台县" },
    {
      "code": 320704,
      "name": "微山县" },
    {
      "code": 320703,
      "name": "任城区" },
    {
      "code": 320702,
      "name": "市中区" }] },

  {
    "code": 3206,
    "name": "潍坊市",
    "sub": [{
      "code": 320613,
      "name": "昌邑市" },
    {
      "code": 320612,
      "name": "高密市" },
    {
      "code": 320611,
      "name": "安丘市" },
    {
      "code": 320610,
      "name": "寿光市" },
    {
      "code": 320609,
      "name": "诸城市" },
    {
      "code": 320608,
      "name": "青州市" },
    {
      "code": 320607,
      "name": "昌乐县" },
    {
      "code": 320606,
      "name": "临朐县" },
    {
      "code": 320605,
      "name": "奎文区" },
    {
      "code": 320604,
      "name": "坊子区" },
    {
      "code": 320603,
      "name": "寒亭区" },
    {
      "code": 320602,
      "name": "潍城区" }] },

  {
    "code": 3205,
    "name": "泰安市",
    "sub": [{
      "code": 320507,
      "name": "肥城市" },
    {
      "code": 320506,
      "name": "新泰市" },
    {
      "code": 320505,
      "name": "东平县" },
    {
      "code": 320504,
      "name": "宁阳县" },
    {
      "code": 320503,
      "name": "岱岳区" },
    {
      "code": 320502,
      "name": "泰山区" }] },

  {
    "code": 3204,
    "name": "淄博市",
    "sub": [{
      "code": 320410,
      "name": "高新区" },
    {
      "code": 320409,
      "name": "沂源县" },
    {
      "code": 320408,
      "name": "高青县" },
    {
      "code": 320407,
      "name": "桓台县" },
    {
      "code": 320406,
      "name": "周村区" },
    {
      "code": 320405,
      "name": "临淄区" },
    {
      "code": 320404,
      "name": "博山区" },
    {
      "code": 320403,
      "name": "张店区" },
    {
      "code": 320402,
      "name": "淄川区" }] },

  {
    "code": 3203,
    "name": "烟台市",
    "sub": [{
      "code": 320314,
      "name": "高新区" },
    {
      "code": 320313,
      "name": "海阳市" },
    {
      "code": 320312,
      "name": "栖霞市" },
    {
      "code": 320311,
      "name": "招远市" },
    {
      "code": 320310,
      "name": "蓬莱市" },
    {
      "code": 320309,
      "name": "莱州市" },
    {
      "code": 320308,
      "name": "莱阳市" },
    {
      "code": 320307,
      "name": "龙口市" },
    {
      "code": 320306,
      "name": "长岛县" },
    {
      "code": 320305,
      "name": "莱山区" },
    {
      "code": 320304,
      "name": "牟平区" },
    {
      "code": 320303,
      "name": "福山区" },
    {
      "code": 320302,
      "name": "芝罘区" }] },

  {
    "code": 3202,
    "name": "青岛市",
    "sub": [{
      "code": 320213,
      "name": "莱西市" },
    {
      "code": 320212,
      "name": "胶南市" },
    {
      "code": 320211,
      "name": "平度市" },
    {
      "code": 320210,
      "name": "即墨市" },
    {
      "code": 320209,
      "name": "胶州市" },
    {
      "code": 320208,
      "name": "城阳区" },
    {
      "code": 320207,
      "name": "李沧区" },
    {
      "code": 320206,
      "name": "崂山区" },
    {
      "code": 320205,
      "name": "黄岛区" },
    {
      "code": 320204,
      "name": "四方区" },
    {
      "code": 320203,
      "name": "市北区" },
    {
      "code": 320202,
      "name": "市南区" }] },

  {
    "code": 3201,
    "name": "济南市",
    "sub": [{
      "code": 320112,
      "name": "高新区" },
    {
      "code": 320111,
      "name": "章丘市" },
    {
      "code": 320110,
      "name": "商河县" },
    {
      "code": 320109,
      "name": "济阳县" },
    {
      "code": 320108,
      "name": "平阴县" },
    {
      "code": 320107,
      "name": "长清区" },
    {
      "code": 320106,
      "name": "历城区" },
    {
      "code": 320105,
      "name": "天桥区" },
    {
      "code": 320104,
      "name": "槐荫区" },
    {
      "code": 320103,
      "name": "市中区" },
    {
      "code": 320102,
      "name": "历下区" }] }] },


{
  "code": 33,
  "name": "安徽省",
  "sub": [{
    "code": 3317,
    "name": "亳州市",
    "sub": [{
      "code": 331705,
      "name": "利辛县" },
    {
      "code": 331704,
      "name": "蒙城县" },
    {
      "code": 331703,
      "name": "涡阳县" },
    {
      "code": 331702,
      "name": "谯城区" }] },

  {
    "code": 3316,
    "name": "宣城市",
    "sub": [{
      "code": 331608,
      "name": "宁国市" },
    {
      "code": 331607,
      "name": "旌德县" },
    {
      "code": 331606,
      "name": "绩溪县" },
    {
      "code": 331605,
      "name": "泾县" },
    {
      "code": 331604,
      "name": "广德县" },
    {
      "code": 331603,
      "name": "郎溪县" },
    {
      "code": 331602,
      "name": "宣州区" }] },

  {
    "code": 3315,
    "name": "六安市",
    "sub": [{
      "code": 331508,
      "name": "霍山县" },
    {
      "code": 331507,
      "name": "金寨县" },
    {
      "code": 331506,
      "name": "舒城县" },
    {
      "code": 331505,
      "name": "霍邱县" },
    {
      "code": 331504,
      "name": "寿县" },
    {
      "code": 331503,
      "name": "裕安区" },
    {
      "code": 331502,
      "name": "金安区" }] },

  {
    "code": 3314,
    "name": "阜阳市",
    "sub": [{
      "code": 331409,
      "name": "界首市" },
    {
      "code": 331408,
      "name": "颍上县" },
    {
      "code": 331407,
      "name": "阜南县" },
    {
      "code": 331406,
      "name": "太和县" },
    {
      "code": 331405,
      "name": "临泉县" },
    {
      "code": 331404,
      "name": "颍泉区" },
    {
      "code": 331403,
      "name": "颍东区" },
    {
      "code": 331402,
      "name": "颍州区" }] },

  {
    "code": 3313,
    "name": "巢湖市",
    "sub": [{
      "code": 331306,
      "name": "和县" },
    {
      "code": 331305,
      "name": "含山县" },
    {
      "code": 331304,
      "name": "无为县" },
    {
      "code": 331303,
      "name": "庐江县" },
    {
      "code": 331302,
      "name": "居巢区" }] },

  {
    "code": 3312,
    "name": "淮南市",
    "sub": [{
      "code": 331207,
      "name": "凤台县" },
    {
      "code": 331206,
      "name": "潘集区" },
    {
      "code": 331205,
      "name": "八公山区" },
    {
      "code": 331204,
      "name": "谢家集区" },
    {
      "code": 331203,
      "name": "田家庵区" },
    {
      "code": 331202,
      "name": "大通区" }] },

  {
    "code": 3311,
    "name": "池州市",
    "sub": [{
      "code": 331105,
      "name": "青阳县" },
    {
      "code": 331104,
      "name": "石台县" },
    {
      "code": 331103,
      "name": "东至县" },
    {
      "code": 331102,
      "name": "贵池区" }] },

  {
    "code": 3310,
    "name": "宿州市",
    "sub": [{
      "code": 331006,
      "name": "泗县" },
    {
      "code": 331005,
      "name": "灵璧县" },
    {
      "code": 331004,
      "name": "萧县" },
    {
      "code": 331003,
      "name": "砀山县" },
    {
      "code": 331002,
      "name": "埇桥区" }] },

  {
    "code": 3309,
    "name": "滁州市",
    "sub": [{
      "code": 330909,
      "name": "明光市" },
    {
      "code": 330908,
      "name": "天长市" },
    {
      "code": 330907,
      "name": "凤阳县" },
    {
      "code": 330906,
      "name": "定远县" },
    {
      "code": 330905,
      "name": "全椒县" },
    {
      "code": 330904,
      "name": "来安县" },
    {
      "code": 330903,
      "name": "南谯区" },
    {
      "code": 330902,
      "name": "琅琊区" }] },

  {
    "code": 3308,
    "name": "黄山市",
    "sub": [{
      "code": 330808,
      "name": "祁门县" },
    {
      "code": 330807,
      "name": "黟县" },
    {
      "code": 330806,
      "name": "休宁县" },
    {
      "code": 330805,
      "name": "歙县" },
    {
      "code": 330804,
      "name": "徽州区" },
    {
      "code": 330803,
      "name": "黄山区" },
    {
      "code": 330802,
      "name": "屯溪区" }] },

  {
    "code": 3307,
    "name": "安庆市",
    "sub": [{
      "code": 330712,
      "name": "桐城市" },
    {
      "code": 330711,
      "name": "岳西县" },
    {
      "code": 330710,
      "name": "望江县" },
    {
      "code": 330709,
      "name": "宿松县" },
    {
      "code": 330708,
      "name": "太湖县" },
    {
      "code": 330707,
      "name": "潜山县" },
    {
      "code": 330706,
      "name": "枞阳县" },
    {
      "code": 330705,
      "name": "怀宁县" },
    {
      "code": 330704,
      "name": "宜秀区" },
    {
      "code": 330703,
      "name": "大观区" },
    {
      "code": 330702,
      "name": "迎江区" }] },

  {
    "code": 3306,
    "name": "铜陵市",
    "sub": [{
      "code": 330605,
      "name": "铜陵县" },
    {
      "code": 330604,
      "name": "郊区" },
    {
      "code": 330603,
      "name": "狮子山区" },
    {
      "code": 330602,
      "name": "铜官山区" }] },

  {
    "code": 3305,
    "name": "淮北市",
    "sub": [{
      "code": 330505,
      "name": "濉溪县" },
    {
      "code": 330504,
      "name": "烈山区" },
    {
      "code": 330503,
      "name": "相山区" },
    {
      "code": 330502,
      "name": "杜集区" }] },

  {
    "code": 3304,
    "name": "马鞍山市",
    "sub": [{
      "code": 330405,
      "name": "当涂县" },
    {
      "code": 330404,
      "name": "雨山区" },
    {
      "code": 330403,
      "name": "花山区" },
    {
      "code": 330402,
      "name": "金家庄区" }] },

  {
    "code": 3303,
    "name": "蚌埠市",
    "sub": [{
      "code": 330309,
      "name": "高新区" },
    {
      "code": 330308,
      "name": "固镇县" },
    {
      "code": 330307,
      "name": "五河县" },
    {
      "code": 330306,
      "name": "怀远县" },
    {
      "code": 330305,
      "name": "淮上区" },
    {
      "code": 330304,
      "name": "禹会区" },
    {
      "code": 330303,
      "name": "蚌山区" },
    {
      "code": 330302,
      "name": "龙子湖区" }] },

  {
    "code": 3302,
    "name": "芜湖市",
    "sub": [{
      "code": 330208,
      "name": "南陵县" },
    {
      "code": 330207,
      "name": "繁昌县" },
    {
      "code": 330206,
      "name": "芜湖县" },
    {
      "code": 330205,
      "name": "三山区" },
    {
      "code": 330204,
      "name": "鸠江区" },
    {
      "code": 330203,
      "name": "弋江区" },
    {
      "code": 330202,
      "name": "镜湖区" }] },

  {
    "code": 3301,
    "name": "合肥市",
    "sub": [{
      "code": 330108,
      "name": "肥西县" },
    {
      "code": 330107,
      "name": "肥东县" },
    {
      "code": 330106,
      "name": "长丰县" },
    {
      "code": 330105,
      "name": "包河区" },
    {
      "code": 330104,
      "name": "蜀山区" },
    {
      "code": 330103,
      "name": "庐阳区" },
    {
      "code": 330102,
      "name": "瑶海区" }] }] },


{
  "code": 34,
  "name": "福建省",
  "sub": [{
    "code": 3409,
    "name": "宁德市",
    "sub": [{
      "code": 340910,
      "name": "福鼎市" },
    {
      "code": 340909,
      "name": "福安市" },
    {
      "code": 340908,
      "name": "柘荣县" },
    {
      "code": 340907,
      "name": "周宁县" },
    {
      "code": 340906,
      "name": "寿宁县" },
    {
      "code": 340905,
      "name": "屏南县" },
    {
      "code": 340904,
      "name": "古田县" },
    {
      "code": 340903,
      "name": "霞浦县" },
    {
      "code": 340902,
      "name": "蕉城区" }] },

  {
    "code": 3408,
    "name": "龙岩市",
    "sub": [{
      "code": 340808,
      "name": "漳平市" },
    {
      "code": 340807,
      "name": "连城县" },
    {
      "code": 340806,
      "name": "武平县" },
    {
      "code": 340805,
      "name": "上杭县" },
    {
      "code": 340804,
      "name": "永定县" },
    {
      "code": 340803,
      "name": "长汀县" },
    {
      "code": 340802,
      "name": "新罗区" }] },

  {
    "code": 3407,
    "name": "南平市",
    "sub": [{
      "code": 340711,
      "name": "建阳市" },
    {
      "code": 340710,
      "name": "建瓯市" },
    {
      "code": 340709,
      "name": "武夷山市" },
    {
      "code": 340708,
      "name": "邵武市" },
    {
      "code": 340707,
      "name": "政和县" },
    {
      "code": 340706,
      "name": "松溪县" },
    {
      "code": 340705,
      "name": "光泽县" },
    {
      "code": 340704,
      "name": "浦城县" },
    {
      "code": 340703,
      "name": "顺昌县" },
    {
      "code": 340702,
      "name": "延平区" }] },

  {
    "code": 3406,
    "name": "三明市",
    "sub": [{
      "code": 340613,
      "name": "永安市" },
    {
      "code": 340612,
      "name": "建宁县" },
    {
      "code": 340611,
      "name": "泰宁县" },
    {
      "code": 340610,
      "name": "将乐县" },
    {
      "code": 340609,
      "name": "沙县" },
    {
      "code": 340608,
      "name": "尤溪县" },
    {
      "code": 340607,
      "name": "大田县" },
    {
      "code": 340606,
      "name": "宁化县" },
    {
      "code": 340605,
      "name": "清流县" },
    {
      "code": 340604,
      "name": "明溪县" },
    {
      "code": 340603,
      "name": "三元区" },
    {
      "code": 340602,
      "name": "梅列区" }] },

  {
    "code": 3405,
    "name": "莆田市",
    "sub": [{
      "code": 340506,
      "name": "仙游县" },
    {
      "code": 340505,
      "name": "秀屿区" },
    {
      "code": 340504,
      "name": "荔城区" },
    {
      "code": 340503,
      "name": "涵江区" },
    {
      "code": 340502,
      "name": "城厢区" }] },

  {
    "code": 3404,
    "name": "泉州市",
    "sub": [{
      "code": 340413,
      "name": "南安市" },
    {
      "code": 340412,
      "name": "晋江市" },
    {
      "code": 340411,
      "name": "石狮市" },
    {
      "code": 340410,
      "name": "金门县" },
    {
      "code": 340409,
      "name": "德化县" },
    {
      "code": 340408,
      "name": "永春县" },
    {
      "code": 340407,
      "name": "安溪县" },
    {
      "code": 340406,
      "name": "惠安县" },
    {
      "code": 340405,
      "name": "泉港区" },
    {
      "code": 340404,
      "name": "洛江区" },
    {
      "code": 340403,
      "name": "丰泽区" },
    {
      "code": 340402,
      "name": "鲤城区" }] },

  {
    "code": 3403,
    "name": "漳州市",
    "sub": [{
      "code": 340312,
      "name": "龙海市" },
    {
      "code": 340311,
      "name": "华安县" },
    {
      "code": 340310,
      "name": "平和县" },
    {
      "code": 340309,
      "name": "南靖县" },
    {
      "code": 340308,
      "name": "东山县" },
    {
      "code": 340307,
      "name": "长泰县" },
    {
      "code": 340306,
      "name": "诏安县" },
    {
      "code": 340305,
      "name": "漳浦县" },
    {
      "code": 340304,
      "name": "云霄县" },
    {
      "code": 340303,
      "name": "龙文区" },
    {
      "code": 340302,
      "name": "芗城区" }] },

  {
    "code": 3402,
    "name": "厦门市",
    "sub": [{
      "code": 340207,
      "name": "翔安区" },
    {
      "code": 340206,
      "name": "同安区" },
    {
      "code": 340205,
      "name": "集美区" },
    {
      "code": 340204,
      "name": "湖里区" },
    {
      "code": 340203,
      "name": "海沧区" },
    {
      "code": 340202,
      "name": "思明区" }] },

  {
    "code": 3401,
    "name": "福州市",
    "sub": [{
      "code": 340114,
      "name": "长乐市" },
    {
      "code": 340113,
      "name": "福清市" },
    {
      "code": 340112,
      "name": "平潭县" },
    {
      "code": 340111,
      "name": "永泰县" },
    {
      "code": 340110,
      "name": "闽清县" },
    {
      "code": 340109,
      "name": "罗源县" },
    {
      "code": 340108,
      "name": "连江县" },
    {
      "code": 340107,
      "name": "闽侯县" },
    {
      "code": 340106,
      "name": "晋安区" },
    {
      "code": 340105,
      "name": "马尾区" },
    {
      "code": 340104,
      "name": "仓山区" },
    {
      "code": 340103,
      "name": "台江区" },
    {
      "code": 340102,
      "name": "鼓楼区" }] }] },


{
  "code": 35,
  "name": "浙江省",
  "sub": [{
    "code": 3511,
    "name": "丽水市",
    "sub": [{
      "code": 351110,
      "name": "龙泉市" },
    {
      "code": 351109,
      "name": "景宁县" },
    {
      "code": 351108,
      "name": "庆元县" },
    {
      "code": 351107,
      "name": "云和县" },
    {
      "code": 351106,
      "name": "松阳县" },
    {
      "code": 351105,
      "name": "遂昌县" },
    {
      "code": 351104,
      "name": "缙云县" },
    {
      "code": 351103,
      "name": "青田县" },
    {
      "code": 351102,
      "name": "莲都区" }] },

  {
    "code": 3510,
    "name": "台州市",
    "sub": [{
      "code": 351010,
      "name": "临海市" },
    {
      "code": 351009,
      "name": "温岭市" },
    {
      "code": 351008,
      "name": "仙居县" },
    {
      "code": 351007,
      "name": "天台县" },
    {
      "code": 351006,
      "name": "三门县" },
    {
      "code": 351005,
      "name": "玉环县" },
    {
      "code": 351004,
      "name": "路桥区" },
    {
      "code": 351003,
      "name": "黄岩区" },
    {
      "code": 351002,
      "name": "椒江区" }] },

  {
    "code": 3509,
    "name": "舟山市",
    "sub": [{
      "code": 350905,
      "name": "嵊泗县" },
    {
      "code": 350904,
      "name": "岱山县" },
    {
      "code": 350903,
      "name": "普陀区" },
    {
      "code": 350902,
      "name": "定海区" }] },

  {
    "code": 3508,
    "name": "衢州市",
    "sub": [{
      "code": 350807,
      "name": "江山市" },
    {
      "code": 350806,
      "name": "龙游县" },
    {
      "code": 350805,
      "name": "开化县" },
    {
      "code": 350804,
      "name": "常山县" },
    {
      "code": 350803,
      "name": "衢江区" },
    {
      "code": 350802,
      "name": "柯城区" }] },

  {
    "code": 3507,
    "name": "金华市",
    "sub": [{
      "code": 350710,
      "name": "永康市" },
    {
      "code": 350709,
      "name": "东阳市" },
    {
      "code": 350708,
      "name": "义乌市" },
    {
      "code": 350707,
      "name": "兰溪市" },
    {
      "code": 350706,
      "name": "磐安县" },
    {
      "code": 350705,
      "name": "浦江县" },
    {
      "code": 350704,
      "name": "武义县" },
    {
      "code": 350703,
      "name": "金东区" },
    {
      "code": 350702,
      "name": "婺城区" }] },

  {
    "code": 3506,
    "name": "绍兴市",
    "sub": [{
      "code": 350607,
      "name": "嵊州市" },
    {
      "code": 350606,
      "name": "上虞市" },
    {
      "code": 350605,
      "name": "诸暨市" },
    {
      "code": 350604,
      "name": "新昌县" },
    {
      "code": 350603,
      "name": "绍兴县" },
    {
      "code": 350602,
      "name": "越城区" }] },

  {
    "code": 3505,
    "name": "湖州市",
    "sub": [{
      "code": 350506,
      "name": "安吉县" },
    {
      "code": 350505,
      "name": "长兴县" },
    {
      "code": 350504,
      "name": "德清县" },
    {
      "code": 350503,
      "name": "南浔区" },
    {
      "code": 350502,
      "name": "吴兴区" }] },

  {
    "code": 3504,
    "name": "嘉兴市",
    "sub": [{
      "code": 350408,
      "name": "桐乡市" },
    {
      "code": 350407,
      "name": "平湖市" },
    {
      "code": 350406,
      "name": "海宁市" },
    {
      "code": 350405,
      "name": "海盐县" },
    {
      "code": 350404,
      "name": "嘉善县" },
    {
      "code": 350403,
      "name": "秀洲区" },
    {
      "code": 350402,
      "name": "南湖区" }] },

  {
    "code": 3503,
    "name": "温州市",
    "sub": [{
      "code": 350312,
      "name": "乐清市" },
    {
      "code": 350311,
      "name": "瑞安市" },
    {
      "code": 350310,
      "name": "泰顺县" },
    {
      "code": 350309,
      "name": "文成县" },
    {
      "code": 350308,
      "name": "苍南县" },
    {
      "code": 350307,
      "name": "平阳县" },
    {
      "code": 350306,
      "name": "永嘉县" },
    {
      "code": 350305,
      "name": "洞头县" },
    {
      "code": 350304,
      "name": "瓯海区" },
    {
      "code": 350303,
      "name": "龙湾区" },
    {
      "code": 350302,
      "name": "鹿城区" }] },

  {
    "code": 3502,
    "name": "宁波市",
    "sub": [{
      "code": 350212,
      "name": "奉化市" },
    {
      "code": 350211,
      "name": "慈溪市" },
    {
      "code": 350210,
      "name": "余姚市" },
    {
      "code": 350209,
      "name": "宁海县" },
    {
      "code": 350208,
      "name": "象山县" },
    {
      "code": 350207,
      "name": "鄞州区" },
    {
      "code": 350206,
      "name": "镇海区" },
    {
      "code": 350205,
      "name": "北仑区" },
    {
      "code": 350204,
      "name": "江北区" },
    {
      "code": 350203,
      "name": "江东区" },
    {
      "code": 350202,
      "name": "海曙区" }] },

  {
    "code": 3501,
    "name": "杭州市",
    "sub": [{
      "code": 350114,
      "name": "临安市" },
    {
      "code": 350113,
      "name": "富阳市" },
    {
      "code": 350112,
      "name": "建德市" },
    {
      "code": 350111,
      "name": "淳安县" },
    {
      "code": 350110,
      "name": "桐庐县" },
    {
      "code": 350109,
      "name": "余杭区" },
    {
      "code": 350108,
      "name": "萧山区" },
    {
      "code": 350107,
      "name": "滨江区" },
    {
      "code": 350106,
      "name": "西湖区" },
    {
      "code": 350105,
      "name": "拱墅区" },
    {
      "code": 350104,
      "name": "江干区" },
    {
      "code": 350103,
      "name": "下城区" },
    {
      "code": 350102,
      "name": "上城区" }] }] },


{
  "code": 36,
  "name": "江西省",
  "sub": [{
    "code": 3611,
    "name": "上饶市",
    "sub": [{
      "code": 361113,
      "name": "德兴市" },
    {
      "code": 361112,
      "name": "婺源县" },
    {
      "code": 361111,
      "name": "万年县" },
    {
      "code": 361110,
      "name": "鄱阳县" },
    {
      "code": 361109,
      "name": "余干县" },
    {
      "code": 361108,
      "name": "弋阳县" },
    {
      "code": 361107,
      "name": "横峰县" },
    {
      "code": 361106,
      "name": "铅山县" },
    {
      "code": 361105,
      "name": "玉山县" },
    {
      "code": 361104,
      "name": "广丰县" },
    {
      "code": 361103,
      "name": "上饶县" },
    {
      "code": 361102,
      "name": "信州区" }] },

  {
    "code": 3610,
    "name": "抚州市",
    "sub": [{
      "code": 361012,
      "name": "广昌县" },
    {
      "code": 361011,
      "name": "东乡县" },
    {
      "code": 361010,
      "name": "资溪县" },
    {
      "code": 361009,
      "name": "金溪县" },
    {
      "code": 361008,
      "name": "宜黄县" },
    {
      "code": 361007,
      "name": "乐安县" },
    {
      "code": 361006,
      "name": "崇仁县" },
    {
      "code": 361005,
      "name": "南丰县" },
    {
      "code": 361004,
      "name": "黎川县" },
    {
      "code": 361003,
      "name": "南城县" },
    {
      "code": 361002,
      "name": "临川区" }] },

  {
    "code": 3609,
    "name": "宜春市",
    "sub": [{
      "code": 360911,
      "name": "高安市" },
    {
      "code": 360910,
      "name": "樟树市" },
    {
      "code": 360909,
      "name": "丰城市" },
    {
      "code": 360908,
      "name": "铜鼓县" },
    {
      "code": 360907,
      "name": "靖安县" },
    {
      "code": 360906,
      "name": "宜丰县" },
    {
      "code": 360905,
      "name": "上高县" },
    {
      "code": 360904,
      "name": "万载县" },
    {
      "code": 360903,
      "name": "奉新县" },
    {
      "code": 360902,
      "name": "袁州区" }] },

  {
    "code": 3608,
    "name": "吉安市",
    "sub": [{
      "code": 360814,
      "name": "井冈山市" },
    {
      "code": 360813,
      "name": "永新县" },
    {
      "code": 360812,
      "name": "安福县" },
    {
      "code": 360811,
      "name": "万安县" },
    {
      "code": 360810,
      "name": "遂川县" },
    {
      "code": 360809,
      "name": "泰和县" },
    {
      "code": 360808,
      "name": "永丰县" },
    {
      "code": 360807,
      "name": "新干县" },
    {
      "code": 360806,
      "name": "峡江县" },
    {
      "code": 360805,
      "name": "吉水县" },
    {
      "code": 360804,
      "name": "吉安县" },
    {
      "code": 360803,
      "name": "青原区" },
    {
      "code": 360802,
      "name": "吉州区" }] },

  {
    "code": 3607,
    "name": "赣州市",
    "sub": [{
      "code": 360719,
      "name": "南康市" },
    {
      "code": 360718,
      "name": "瑞金市" },
    {
      "code": 360717,
      "name": "石城县" },
    {
      "code": 360716,
      "name": "寻乌县" },
    {
      "code": 360715,
      "name": "会昌县" },
    {
      "code": 360714,
      "name": "兴国县" },
    {
      "code": 360713,
      "name": "于都县" },
    {
      "code": 360712,
      "name": "宁都县" },
    {
      "code": 360711,
      "name": "全南县" },
    {
      "code": 360710,
      "name": "定南县" },
    {
      "code": 360709,
      "name": "龙南县" },
    {
      "code": 360708,
      "name": "安远县" },
    {
      "code": 360707,
      "name": "崇义县" },
    {
      "code": 360706,
      "name": "上犹县" },
    {
      "code": 360705,
      "name": "大余县" },
    {
      "code": 360704,
      "name": "信丰县" },
    {
      "code": 360703,
      "name": "赣县" },
    {
      "code": 360702,
      "name": "章贡区" }] },

  {
    "code": 3606,
    "name": "鹰潭市",
    "sub": [{
      "code": 360604,
      "name": "贵溪市" },
    {
      "code": 360603,
      "name": "余江县" },
    {
      "code": 360602,
      "name": "月湖区" }] },

  {
    "code": 3605,
    "name": "新余市",
    "sub": [{
      "code": 360504,
      "name": "高新区" },
    {
      "code": 360503,
      "name": "分宜县" },
    {
      "code": 360502,
      "name": "渝水区" }] },

  {
    "code": 3604,
    "name": "九江市",
    "sub": [{
      "code": 360413,
      "name": "瑞昌市" },
    {
      "code": 360412,
      "name": "彭泽县" },
    {
      "code": 360411,
      "name": "湖口县" },
    {
      "code": 360410,
      "name": "都昌县" },
    {
      "code": 360409,
      "name": "星子县" },
    {
      "code": 360408,
      "name": "德安县" },
    {
      "code": 360407,
      "name": "永修县" },
    {
      "code": 360406,
      "name": "修水县" },
    {
      "code": 360405,
      "name": "武宁县" },
    {
      "code": 360404,
      "name": "九江县" },
    {
      "code": 360403,
      "name": "浔阳区" },
    {
      "code": 360402,
      "name": "庐山区" }] },

  {
    "code": 3603,
    "name": "萍乡市",
    "sub": [{
      "code": 360306,
      "name": "芦溪县" },
    {
      "code": 360305,
      "name": "上栗县" },
    {
      "code": 360304,
      "name": "莲花县" },
    {
      "code": 360303,
      "name": "湘东区" },
    {
      "code": 360302,
      "name": "安源区" }] },

  {
    "code": 3602,
    "name": "景德镇市",
    "sub": [{
      "code": 360206,
      "name": "高新区" },
    {
      "code": 360205,
      "name": "乐平市" },
    {
      "code": 360204,
      "name": "浮梁县" },
    {
      "code": 360203,
      "name": "珠山区" },
    {
      "code": 360202,
      "name": "昌江区" }] },

  {
    "code": 3601,
    "name": "南昌市",
    "sub": [{
      "code": 360110,
      "name": "进贤县" },
    {
      "code": 360109,
      "name": "安义县" },
    {
      "code": 360108,
      "name": "新建县" },
    {
      "code": 360107,
      "name": "南昌县" },
    {
      "code": 360106,
      "name": "青山湖区" },
    {
      "code": 360105,
      "name": "湾里区" },
    {
      "code": 360104,
      "name": "青云谱区" },
    {
      "code": 360103,
      "name": "西湖区" },
    {
      "code": 360102,
      "name": "东湖区" }] }] },


{
  "code": 40,
  "name": "广东省",
  "sub": [{
    "code": 4021,
    "name": "云浮市",
    "sub": [{
      "code": 402106,
      "name": "罗定市" },
    {
      "code": 402105,
      "name": "云安县" },
    {
      "code": 402104,
      "name": "郁南县" },
    {
      "code": 402103,
      "name": "新兴县" },
    {
      "code": 402102,
      "name": "云城区" }] },

  {
    "code": 4020,
    "name": "揭阳市",
    "sub": [{
      "code": 402006,
      "name": "普宁市" },
    {
      "code": 402005,
      "name": "惠来县" },
    {
      "code": 402004,
      "name": "揭西县" },
    {
      "code": 402003,
      "name": "揭东县" },
    {
      "code": 402002,
      "name": "榕城区" }] },

  {
    "code": 4019,
    "name": "潮州市",
    "sub": [{
      "code": 401904,
      "name": "饶平县" },
    {
      "code": 401903,
      "name": "潮安县" },
    {
      "code": 401902,
      "name": "湘桥区" }] },

  {
    "code": 4018,
    "name": "清远市",
    "sub": [{
      "code": 401809,
      "name": "连州市" },
    {
      "code": 401808,
      "name": "英德市" },
    {
      "code": 401807,
      "name": "清新县" },
    {
      "code": 401806,
      "name": "连南县" },
    {
      "code": 401805,
      "name": "连山县" },
    {
      "code": 401804,
      "name": "阳山县" },
    {
      "code": 401803,
      "name": "佛冈县" },
    {
      "code": 401802,
      "name": "清城区" }] },

  {
    "code": 4017,
    "name": "肇庆市",
    "sub": [{
      "code": 401710,
      "name": "高新区" },
    {
      "code": 401709,
      "name": "四会市" },
    {
      "code": 401708,
      "name": "高要市" },
    {
      "code": 401707,
      "name": "德庆县" },
    {
      "code": 401706,
      "name": "封开县" },
    {
      "code": 401705,
      "name": "怀集县" },
    {
      "code": 401704,
      "name": "广宁县" },
    {
      "code": 401703,
      "name": "鼎湖区" },
    {
      "code": 401702,
      "name": "端州区" }] },

  {
    "code": 4016,
    "name": "茂名市",
    "sub": [{
      "code": 401607,
      "name": "信宜市" },
    {
      "code": 401606,
      "name": "化州市" },
    {
      "code": 401605,
      "name": "高州市" },
    {
      "code": 401604,
      "name": "电白县" },
    {
      "code": 401603,
      "name": "茂港区" },
    {
      "code": 401602,
      "name": "茂南区" }] },

  {
    "code": 4015,
    "name": "湛江市",
    "sub": [{
      "code": 401510,
      "name": "吴川市" },
    {
      "code": 401509,
      "name": "雷州市" },
    {
      "code": 401508,
      "name": "廉江市" },
    {
      "code": 401507,
      "name": "徐闻县" },
    {
      "code": 401506,
      "name": "遂溪县" },
    {
      "code": 401505,
      "name": "麻章区" },
    {
      "code": 401504,
      "name": "坡头区" },
    {
      "code": 401503,
      "name": "霞山区" },
    {
      "code": 401502,
      "name": "赤坎区" }] },

  {
    "code": 4014,
    "name": "阳江市",
    "sub": [{
      "code": 401405,
      "name": "阳春市" },
    {
      "code": 401404,
      "name": "阳东县" },
    {
      "code": 401403,
      "name": "阳西县" },
    {
      "code": 401402,
      "name": "江城区" }] },

  {
    "code": 4013,
    "name": "佛山市",
    "sub": [{
      "code": 401307,
      "name": "高新区" },
    {
      "code": 401306,
      "name": "高明区" },
    {
      "code": 401305,
      "name": "三水区" },
    {
      "code": 401304,
      "name": "顺德区" },
    {
      "code": 401303,
      "name": "南海区" },
    {
      "code": 401302,
      "name": "禅城区" }] },

  {
    "code": 4012,
    "name": "江门市",
    "sub": [{
      "code": 401209,
      "name": "高新区" },
    {
      "code": 401208,
      "name": "恩平市" },
    {
      "code": 401207,
      "name": "鹤山市" },
    {
      "code": 401206,
      "name": "开平市" },
    {
      "code": 401205,
      "name": "台山市" },
    {
      "code": 401204,
      "name": "新会区" },
    {
      "code": 401203,
      "name": "江海区" },
    {
      "code": 401202,
      "name": "蓬江区" }] },

  {
    "code": 4011,
    "name": "中山市",
    "sub": [{
      "code": 401101,
      "name": "高新区" }] },

  {
    "code": 4010,
    "name": "东莞市",
    "sub": [{
      "code": 401001,
      "name": "高新区" }] },

  {
    "code": 4009,
    "name": "汕尾市",
    "sub": [{
      "code": 400905,
      "name": "陆丰市" },
    {
      "code": 400904,
      "name": "陆河县" },
    {
      "code": 400903,
      "name": "海丰县" },
    {
      "code": 400902,
      "name": "城区" }] },

  {
    "code": 4008,
    "name": "惠州市",
    "sub": [{
      "code": 400807,
      "name": "高新区" },
    {
      "code": 400806,
      "name": "龙门县" },
    {
      "code": 400805,
      "name": "惠东县" },
    {
      "code": 400804,
      "name": "博罗县" },
    {
      "code": 400803,
      "name": "惠阳区" },
    {
      "code": 400802,
      "name": "惠城区" }] },

  {
    "code": 4007,
    "name": "梅州市",
    "sub": [{
      "code": 400709,
      "name": "兴宁市" },
    {
      "code": 400708,
      "name": "蕉岭县" },
    {
      "code": 400707,
      "name": "平远县" },
    {
      "code": 400706,
      "name": "五华县" },
    {
      "code": 400705,
      "name": "丰顺县" },
    {
      "code": 400704,
      "name": "大埔县" },
    {
      "code": 400703,
      "name": "梅县" },
    {
      "code": 400702,
      "name": "梅江区" }] },

  {
    "code": 4006,
    "name": "河源市",
    "sub": [{
      "code": 400607,
      "name": "东源县" },
    {
      "code": 400606,
      "name": "和平县" },
    {
      "code": 400605,
      "name": "连平县" },
    {
      "code": 400604,
      "name": "龙川县" },
    {
      "code": 400603,
      "name": "紫金县" },
    {
      "code": 400602,
      "name": "源城区" }] },

  {
    "code": 4005,
    "name": "韶关市",
    "sub": [{
      "code": 400511,
      "name": "南雄市" },
    {
      "code": 400510,
      "name": "乐昌市" },
    {
      "code": 400509,
      "name": "新丰县" },
    {
      "code": 400508,
      "name": "乳源县" },
    {
      "code": 400507,
      "name": "翁源县" },
    {
      "code": 400506,
      "name": "仁化县" },
    {
      "code": 400505,
      "name": "始兴县" },
    {
      "code": 400504,
      "name": "曲江区" },
    {
      "code": 400503,
      "name": "浈江区" },
    {
      "code": 400502,
      "name": "武江区" }] },

  {
    "code": 4004,
    "name": "汕头市",
    "sub": [{
      "code": 400408,
      "name": "南澳县" },
    {
      "code": 400407,
      "name": "澄海区" },
    {
      "code": 400406,
      "name": "潮南区" },
    {
      "code": 400405,
      "name": "潮阳区" },
    {
      "code": 400404,
      "name": "濠江区" },
    {
      "code": 400403,
      "name": "金平区" },
    {
      "code": 400402,
      "name": "龙湖区" }] },

  {
    "code": 4003,
    "name": "珠海市",
    "sub": [{
      "code": 400305,
      "name": "高新区" },
    {
      "code": 400304,
      "name": "金湾区" },
    {
      "code": 400303,
      "name": "斗门区" },
    {
      "code": 400302,
      "name": "香洲区" }] },

  {
    "code": 4002,
    "name": "深圳市",
    "sub": [{
      "code": 400208,
      "name": "高新区" },
    {
      "code": 400207,
      "name": "盐田区" },
    {
      "code": 400206,
      "name": "龙岗区" },
    {
      "code": 400205,
      "name": "宝安区" },
    {
      "code": 400204,
      "name": "南山区" },
    {
      "code": 400203,
      "name": "福田区" },
    {
      "code": 400202,
      "name": "罗湖区" }] },

  {
    "code": 4001,
    "name": "广州市",
    "sub": [{
      "code": 400113,
      "name": "从化市" },
    {
      "code": 400112,
      "name": "增城市" },
    {
      "code": 400111,
      "name": "萝岗区" },
    {
      "code": 400110,
      "name": "南沙区" },
    {
      "code": 400109,
      "name": "花都区" },
    {
      "code": 400108,
      "name": "番禺区" },
    {
      "code": 400107,
      "name": "黄埔区" },
    {
      "code": 400106,
      "name": "白云区" },
    {
      "code": 400105,
      "name": "天河区" },
    {
      "code": 400104,
      "name": "海珠区" },
    {
      "code": 400103,
      "name": "越秀区" },
    {
      "code": 400102,
      "name": "荔湾区" }] }] },


{
  "code": 41,
  "name": "广西",
  "sub": [{
    "code": 4114,
    "name": "崇左市",
    "sub": [{
      "code": 411408,
      "name": "凭祥市" },
    {
      "code": 411407,
      "name": "天等县" },
    {
      "code": 411406,
      "name": "大新县" },
    {
      "code": 411405,
      "name": "龙州县" },
    {
      "code": 411404,
      "name": "宁明县" },
    {
      "code": 411403,
      "name": "扶绥县" },
    {
      "code": 411402,
      "name": "江洲区" }] },

  {
    "code": 4113,
    "name": "来宾市",
    "sub": [{
      "code": 411307,
      "name": "合山市" },
    {
      "code": 411306,
      "name": "金秀县" },
    {
      "code": 411305,
      "name": "武宣县" },
    {
      "code": 411304,
      "name": "象州县" },
    {
      "code": 411303,
      "name": "忻城县" },
    {
      "code": 411302,
      "name": "兴宾区" }] },

  {
    "code": 4112,
    "name": "河池市",
    "sub": [{
      "code": 411212,
      "name": "宜州市" },
    {
      "code": 411211,
      "name": "大化县" },
    {
      "code": 411210,
      "name": "都安县" },
    {
      "code": 411209,
      "name": "巴马县" },
    {
      "code": 411208,
      "name": "环江县" },
    {
      "code": 411207,
      "name": "罗城县" },
    {
      "code": 411206,
      "name": "东兰县" },
    {
      "code": 411205,
      "name": "凤山县" },
    {
      "code": 411204,
      "name": "天峨县" },
    {
      "code": 411203,
      "name": "南丹县" },
    {
      "code": 411202,
      "name": "金城江区" }] },

  {
    "code": 4111,
    "name": "贺州市",
    "sub": [{
      "code": 411105,
      "name": "富川县" },
    {
      "code": 411104,
      "name": "钟山县" },
    {
      "code": 411103,
      "name": "昭平县" },
    {
      "code": 411102,
      "name": "八步区" }] },

  {
    "code": 4110,
    "name": "百色市",
    "sub": [{
      "code": 411013,
      "name": "隆林县" },
    {
      "code": 411012,
      "name": "西林县" },
    {
      "code": 411011,
      "name": "田林县" },
    {
      "code": 411010,
      "name": "乐业县" },
    {
      "code": 411009,
      "name": "凌云县" },
    {
      "code": 411008,
      "name": "那坡县" },
    {
      "code": 411007,
      "name": "靖西县" },
    {
      "code": 411006,
      "name": "德保县" },
    {
      "code": 411005,
      "name": "平果县" },
    {
      "code": 411004,
      "name": "田东县" },
    {
      "code": 411003,
      "name": "田阳县" },
    {
      "code": 411002,
      "name": "右江区" }] },

  {
    "code": 4109,
    "name": "玉林市",
    "sub": [{
      "code": 410907,
      "name": "北流市" },
    {
      "code": 410906,
      "name": "兴业县" },
    {
      "code": 410905,
      "name": "博白县" },
    {
      "code": 410904,
      "name": "陆川县" },
    {
      "code": 410903,
      "name": "容县" },
    {
      "code": 410902,
      "name": "玉州区" }] },

  {
    "code": 4108,
    "name": "贵港市",
    "sub": [{
      "code": 410806,
      "name": "桂平市" },
    {
      "code": 410805,
      "name": "平南县" },
    {
      "code": 410804,
      "name": "覃塘区" },
    {
      "code": 410803,
      "name": "港南区" },
    {
      "code": 410802,
      "name": "港北区" }] },

  {
    "code": 4107,
    "name": "钦州市",
    "sub": [{
      "code": 410705,
      "name": "浦北县" },
    {
      "code": 410704,
      "name": "灵山县" },
    {
      "code": 410703,
      "name": "钦北区" },
    {
      "code": 410702,
      "name": "钦南区" }] },

  {
    "code": 4106,
    "name": "防城港市",
    "sub": [{
      "code": 410605,
      "name": "东兴市" },
    {
      "code": 410604,
      "name": "上思县" },
    {
      "code": 410603,
      "name": "防城区" },
    {
      "code": 410602,
      "name": "港口区" }] },

  {
    "code": 4105,
    "name": "北海市",
    "sub": [{
      "code": 410505,
      "name": "合浦县" },
    {
      "code": 410504,
      "name": "铁山港区" },
    {
      "code": 410503,
      "name": "银海区" },
    {
      "code": 410502,
      "name": "海城区" }] },

  {
    "code": 4104,
    "name": "梧州市",
    "sub": [{
      "code": 410408,
      "name": "岑溪市" },
    {
      "code": 410407,
      "name": "蒙山县" },
    {
      "code": 410406,
      "name": "藤县" },
    {
      "code": 410405,
      "name": "苍梧县" },
    {
      "code": 410404,
      "name": "长洲区" },
    {
      "code": 410403,
      "name": "蝶山区" },
    {
      "code": 410402,
      "name": "万秀区" }] },

  {
    "code": 4103,
    "name": "桂林市",
    "sub": [{
      "code": 410319,
      "name": "高新区" },
    {
      "code": 410318,
      "name": "恭城县" },
    {
      "code": 410317,
      "name": "荔蒲县" },
    {
      "code": 410316,
      "name": "平乐县" },
    {
      "code": 410315,
      "name": "资源县" },
    {
      "code": 410314,
      "name": "龙胜县" },
    {
      "code": 410313,
      "name": "灌阳县" },
    {
      "code": 410312,
      "name": "永福县" },
    {
      "code": 410311,
      "name": "兴安县" },
    {
      "code": 410310,
      "name": "全州县" },
    {
      "code": 410309,
      "name": "灵川县" },
    {
      "code": 410308,
      "name": "临桂县" },
    {
      "code": 410307,
      "name": "阳朔县" },
    {
      "code": 410306,
      "name": "雁山区" },
    {
      "code": 410305,
      "name": "七星区" },
    {
      "code": 410304,
      "name": "象山区" },
    {
      "code": 410303,
      "name": "叠彩区" },
    {
      "code": 410302,
      "name": "秀峰区" }] },

  {
    "code": 4102,
    "name": "柳州市",
    "sub": [{
      "code": 410212,
      "name": "高新区" },
    {
      "code": 410211,
      "name": "三江县" },
    {
      "code": 410210,
      "name": "融水县" },
    {
      "code": 410209,
      "name": "融安县" },
    {
      "code": 410208,
      "name": "鹿寨县" },
    {
      "code": 410207,
      "name": "柳城县" },
    {
      "code": 410206,
      "name": "柳江县" },
    {
      "code": 410205,
      "name": "柳北区" },
    {
      "code": 410204,
      "name": "柳南区" },
    {
      "code": 410203,
      "name": "鱼峰区" },
    {
      "code": 410202,
      "name": "城中区" }] },

  {
    "code": 4101,
    "name": "南宁市",
    "sub": [{
      "code": 410113,
      "name": "横县" },
    {
      "code": 410112,
      "name": "宾阳县" },
    {
      "code": 410111,
      "name": "上林县" },
    {
      "code": 410110,
      "name": "马山县" },
    {
      "code": 410109,
      "name": "隆安县" },
    {
      "code": 410108,
      "name": "武鸣县" },
    {
      "code": 410107,
      "name": "邕宁区" },
    {
      "code": 410106,
      "name": "良庆区" },
    {
      "code": 410105,
      "name": "西乡塘区" },
    {
      "code": 410104,
      "name": "江南区" },
    {
      "code": 410103,
      "name": "青秀区" },
    {
      "code": 410102,
      "name": "兴宁区" }] }] },


{
  "code": 42,
  "name": "海南省",
  "sub": [{
    "code": 4219,
    "name": "洋浦" },
  {
    "code": 4218,
    "name": "白沙县" },
  {
    "code": 4217,
    "name": "昌江县" },
  {
    "code": 4216,
    "name": "乐东县" },
  {
    "code": 4215,
    "name": "保亭县" },
  {
    "code": 4214,
    "name": "琼中县" },
  {
    "code": 4213,
    "name": "陵水县" },
  {
    "code": 4212,
    "name": "临高县" },
  {
    "code": 4211,
    "name": "澄迈县" },
  {
    "code": 4210,
    "name": "屯昌县" },
  {
    "code": 4209,
    "name": "定安县" },
  {
    "code": 4208,
    "name": "万宁市" },
  {
    "code": 4207,
    "name": "五指山市" },
  {
    "code": 4206,
    "name": "东方市" },
  {
    "code": 4205,
    "name": "文昌市" },
  {
    "code": 4204,
    "name": "儋州市" },
  {
    "code": 4203,
    "name": "琼海市" },
  {
    "code": 4202,
    "name": "三亚市" },
  {
    "code": 4201,
    "name": "海口市",
    "sub": [{
      "code": 420106,
      "name": "高新区" },
    {
      "code": 420105,
      "name": "美兰区" },
    {
      "code": 420104,
      "name": "琼山区" },
    {
      "code": 420103,
      "name": "龙华区" },
    {
      "code": 420102,
      "name": "秀英区" }] }] },


{
  "code": 60,
  "name": "重庆市",
  "sub": [{
    "code": 6001,
    "name": "重庆市",
    "sub": [{
      "code": 600140,
      "name": "彭水苗族县" },
    {
      "code": 600139,
      "name": "酉阳县" },
    {
      "code": 600138,
      "name": "秀山县" },
    {
      "code": 600137,
      "name": "石柱县" },
    {
      "code": 600136,
      "name": "巫溪县" },
    {
      "code": 600135,
      "name": "巫山县" },
    {
      "code": 600134,
      "name": "奉节县" },
    {
      "code": 600133,
      "name": "云阳县" },
    {
      "code": 600132,
      "name": "开县" },
    {
      "code": 600131,
      "name": "忠县" },
    {
      "code": 600130,
      "name": "武隆县" },
    {
      "code": 600129,
      "name": "垫江县" },
    {
      "code": 600128,
      "name": "丰都县" },
    {
      "code": 600127,
      "name": "城口县" },
    {
      "code": 600126,
      "name": "梁平县" },
    {
      "code": 600125,
      "name": "璧山县" },
    {
      "code": 600124,
      "name": "荣昌县" },
    {
      "code": 600123,
      "name": "大足县" },
    {
      "code": 600122,
      "name": "铜梁县" },
    {
      "code": 600121,
      "name": "潼南县" },
    {
      "code": 600120,
      "name": "綦江县" },
    {
      "code": 600119,
      "name": "南川区" },
    {
      "code": 600118,
      "name": "永川区" },
    {
      "code": 600117,
      "name": "合川区" },
    {
      "code": 600116,
      "name": "江津区" },
    {
      "code": 600115,
      "name": "长寿区" },
    {
      "code": 600114,
      "name": "黔江区" },
    {
      "code": 600113,
      "name": "巴南区" },
    {
      "code": 600112,
      "name": "渝北区" },
    {
      "code": 600111,
      "name": "双桥区" },
    {
      "code": 600110,
      "name": "万盛区" },
    {
      "code": 600109,
      "name": "北碚区" },
    {
      "code": 600108,
      "name": "南岸区" },
    {
      "code": 600107,
      "name": "九龙坡区" },
    {
      "code": 600106,
      "name": "沙坪坝区" },
    {
      "code": 600105,
      "name": "江北区" },
    {
      "code": 600104,
      "name": "大渡口区" },
    {
      "code": 600103,
      "name": "渝中区" },
    {
      "code": 600102,
      "name": "涪陵区" },
    {
      "code": 600101,
      "name": "万州区" }] }] },


{
  "code": 61,
  "name": "四川省",
  "sub": [{
    "code": 6121,
    "name": "凉山州",
    "sub": [{
      "code": 612117,
      "name": "雷波县" },
    {
      "code": 612116,
      "name": "美姑县" },
    {
      "code": 612115,
      "name": "甘洛县" },
    {
      "code": 612114,
      "name": "越西县" },
    {
      "code": 612113,
      "name": "冕宁县" },
    {
      "code": 612112,
      "name": "喜德县" },
    {
      "code": 612111,
      "name": "昭觉县" },
    {
      "code": 612110,
      "name": "金阳县" },
    {
      "code": 612109,
      "name": "布拖县" },
    {
      "code": 612108,
      "name": "普格县" },
    {
      "code": 612107,
      "name": "宁南县" },
    {
      "code": 612106,
      "name": "会东县" },
    {
      "code": 612105,
      "name": "会理县" },
    {
      "code": 612104,
      "name": "德昌县" },
    {
      "code": 612103,
      "name": "盐源县" },
    {
      "code": 612102,
      "name": "木里县" },
    {
      "code": 612101,
      "name": "西昌市" }] },

  {
    "code": 6120,
    "name": "甘孜州",
    "sub": [{
      "code": 612018,
      "name": "得荣县" },
    {
      "code": 612017,
      "name": "稻城县" },
    {
      "code": 612016,
      "name": "乡城县" },
    {
      "code": 612015,
      "name": "巴塘县" },
    {
      "code": 612014,
      "name": "理塘县" },
    {
      "code": 612013,
      "name": "色达县" },
    {
      "code": 612012,
      "name": "石渠县" },
    {
      "code": 612011,
      "name": "白玉县" },
    {
      "code": 612010,
      "name": "德格县" },
    {
      "code": 612009,
      "name": "新龙县" },
    {
      "code": 612008,
      "name": "甘孜县" },
    {
      "code": 612007,
      "name": "炉霍县" },
    {
      "code": 612006,
      "name": "道孚县" },
    {
      "code": 612005,
      "name": "雅江县" },
    {
      "code": 612004,
      "name": "九龙县" },
    {
      "code": 612003,
      "name": "丹巴县" },
    {
      "code": 612002,
      "name": "泸定县" },
    {
      "code": 612001,
      "name": "康定县" }] },

  {
    "code": 6119,
    "name": "攀枝花市",
    "sub": [{
      "code": 611906,
      "name": "盐边县" },
    {
      "code": 611905,
      "name": "米易县" },
    {
      "code": 611904,
      "name": "仁和区" },
    {
      "code": 611903,
      "name": "西区" },
    {
      "code": 611902,
      "name": "东区" }] },

  {
    "code": 6118,
    "name": "阿坝州",
    "sub": [{
      "code": 611813,
      "name": "红原县" },
    {
      "code": 611812,
      "name": "若尔盖县" },
    {
      "code": 611811,
      "name": "阿坝县" },
    {
      "code": 611810,
      "name": "壤塘县" },
    {
      "code": 611809,
      "name": "马尔康县" },
    {
      "code": 611808,
      "name": "黑水县" },
    {
      "code": 611807,
      "name": "小金县" },
    {
      "code": 611806,
      "name": "金川县" },
    {
      "code": 611805,
      "name": "九寨沟县" },
    {
      "code": 611804,
      "name": "松潘县" },
    {
      "code": 611803,
      "name": "茂县" },
    {
      "code": 611802,
      "name": "理县" },
    {
      "code": 611801,
      "name": "汶川县" }] },

  {
    "code": 6117,
    "name": "资阳市",
    "sub": [{
      "code": 611705,
      "name": "简阳市" },
    {
      "code": 611704,
      "name": "乐至县" },
    {
      "code": 611703,
      "name": "安岳县" },
    {
      "code": 611702,
      "name": "雁江区" }] },

  {
    "code": 6116,
    "name": "广安市",
    "sub": [{
      "code": 611606,
      "name": "华蓥市" },
    {
      "code": 611605,
      "name": "邻水县" },
    {
      "code": 611604,
      "name": "武胜县" },
    {
      "code": 611603,
      "name": "岳池县" },
    {
      "code": 611602,
      "name": "广安区" }] },

  {
    "code": 6115,
    "name": "广元市",
    "sub": [{
      "code": 611508,
      "name": "苍溪县" },
    {
      "code": 611507,
      "name": "剑阁县" },
    {
      "code": 611506,
      "name": "青川县" },
    {
      "code": 611505,
      "name": "旺苍县" },
    {
      "code": 611504,
      "name": "朝天区" },
    {
      "code": 611503,
      "name": "元坝区" },
    {
      "code": 611502,
      "name": "市中区" }] },

  {
    "code": 6114,
    "name": "巴中市",
    "sub": [{
      "code": 611405,
      "name": "平昌县" },
    {
      "code": 611404,
      "name": "南江县" },
    {
      "code": 611403,
      "name": "通江县" },
    {
      "code": 611402,
      "name": "巴州区" }] },

  {
    "code": 6113,
    "name": "达州市",
    "sub": [{
      "code": 611308,
      "name": "万源市" },
    {
      "code": 611307,
      "name": "渠县" },
    {
      "code": 611306,
      "name": "大竹县" },
    {
      "code": 611305,
      "name": "开江县" },
    {
      "code": 611304,
      "name": "宣汉县" },
    {
      "code": 611303,
      "name": "达县" },
    {
      "code": 611302,
      "name": "通川区" }] },

  {
    "code": 6112,
    "name": "遂宁市",
    "sub": [{
      "code": 611206,
      "name": "大英县" },
    {
      "code": 611205,
      "name": "射洪县" },
    {
      "code": 611204,
      "name": "蓬溪县" },
    {
      "code": 611203,
      "name": "安居区" },
    {
      "code": 611202,
      "name": "船山区" }] },

  {
    "code": 6111,
    "name": "雅安市",
    "sub": [{
      "code": 611109,
      "name": "宝兴县" },
    {
      "code": 611108,
      "name": "芦山县" },
    {
      "code": 611107,
      "name": "天全县" },
    {
      "code": 611106,
      "name": "石棉县" },
    {
      "code": 611105,
      "name": "汉源县" },
    {
      "code": 611104,
      "name": "荥经县" },
    {
      "code": 611103,
      "name": "名山县" },
    {
      "code": 611102,
      "name": "雨城区" }] },

  {
    "code": 6110,
    "name": "乐山市",
    "sub": [{
      "code": 611012,
      "name": "峨眉山市" },
    {
      "code": 611011,
      "name": "马边县" },
    {
      "code": 611010,
      "name": "峨边县" },
    {
      "code": 611009,
      "name": "沐川县" },
    {
      "code": 611008,
      "name": "夹江县" },
    {
      "code": 611007,
      "name": "井研县" },
    {
      "code": 611006,
      "name": "犍为县" },
    {
      "code": 611005,
      "name": "金口河区" },
    {
      "code": 611004,
      "name": "五通桥区" },
    {
      "code": 611003,
      "name": "沙湾区" },
    {
      "code": 611002,
      "name": "市中区" }] },

  {
    "code": 6109,
    "name": "宜宾市",
    "sub": [{
      "code": 610911,
      "name": "屏山县" },
    {
      "code": 610910,
      "name": "兴文县" },
    {
      "code": 610909,
      "name": "筠连县" },
    {
      "code": 610908,
      "name": "珙县" },
    {
      "code": 610907,
      "name": "高县" },
    {
      "code": 610906,
      "name": "长宁县" },
    {
      "code": 610905,
      "name": "江安县" },
    {
      "code": 610904,
      "name": "南溪县" },
    {
      "code": 610903,
      "name": "宜宾县" },
    {
      "code": 610902,
      "name": "翠屏区" }] },

  {
    "code": 6108,
    "name": "内江市",
    "sub": [{
      "code": 610806,
      "name": "隆昌县" },
    {
      "code": 610805,
      "name": "资中县" },
    {
      "code": 610804,
      "name": "威远县" },
    {
      "code": 610803,
      "name": "东兴区" },
    {
      "code": 610802,
      "name": "市中区" }] },

  {
    "code": 6107,
    "name": "自贡市",
    "sub": [{
      "code": 610708,
      "name": "高新区" },
    {
      "code": 610707,
      "name": "富顺县" },
    {
      "code": 610706,
      "name": "荣县" },
    {
      "code": 610705,
      "name": "沿滩区" },
    {
      "code": 610704,
      "name": "大安区" },
    {
      "code": 610703,
      "name": "贡井区" },
    {
      "code": 610702,
      "name": "自流井区" }] },

  {
    "code": 6106,
    "name": "南充市",
    "sub": [{
      "code": 610610,
      "name": "阆中市" },
    {
      "code": 610609,
      "name": "西充县" },
    {
      "code": 610608,
      "name": "仪陇县" },
    {
      "code": 610607,
      "name": "蓬安县" },
    {
      "code": 610606,
      "name": "营山县" },
    {
      "code": 610605,
      "name": "南部县" },
    {
      "code": 610604,
      "name": "嘉陵区" },
    {
      "code": 610603,
      "name": "高坪区" },
    {
      "code": 610602,
      "name": "顺庆区" }] },

  {
    "code": 6105,
    "name": "泸州市",
    "sub": [{
      "code": 610508,
      "name": "古蔺县" },
    {
      "code": 610507,
      "name": "叙永县" },
    {
      "code": 610506,
      "name": "合江县" },
    {
      "code": 610505,
      "name": "泸县" },
    {
      "code": 610504,
      "name": "龙马潭区" },
    {
      "code": 610503,
      "name": "纳溪区" },
    {
      "code": 610502,
      "name": "江阳区" }] },

  {
    "code": 6104,
    "name": "眉山市",
    "sub": [{
      "code": 610407,
      "name": "青神县" },
    {
      "code": 610406,
      "name": "丹棱县" },
    {
      "code": 610405,
      "name": "洪雅县" },
    {
      "code": 610404,
      "name": "彭山县" },
    {
      "code": 610403,
      "name": "仁寿县" },
    {
      "code": 610402,
      "name": "东坡区" }] },

  {
    "code": 6103,
    "name": "绵阳市",
    "sub": [{
      "code": 610311,
      "name": "高新区" },
    {
      "code": 610310,
      "name": "江油市" },
    {
      "code": 610309,
      "name": "平武县" },
    {
      "code": 610308,
      "name": "北川县" },
    {
      "code": 610307,
      "name": "梓潼县" },
    {
      "code": 610306,
      "name": "安县" },
    {
      "code": 610305,
      "name": "盐亭县" },
    {
      "code": 610304,
      "name": "三台县" },
    {
      "code": 610303,
      "name": "游仙区" },
    {
      "code": 610302,
      "name": "涪城区" }] },

  {
    "code": 6102,
    "name": "德阳市",
    "sub": [{
      "code": 610207,
      "name": "绵竹市" },
    {
      "code": 610206,
      "name": "什邡市" },
    {
      "code": 610205,
      "name": "广汉市" },
    {
      "code": 610204,
      "name": "罗江县" },
    {
      "code": 610203,
      "name": "中江县" },
    {
      "code": 610202,
      "name": "旌阳区" }] },

  {
    "code": 6101,
    "name": "成都市",
    "sub": [{
      "code": 610121,
      "name": "高新区" },
    {
      "code": 610120,
      "name": "崇州市" },
    {
      "code": 610119,
      "name": "邛崃市" },
    {
      "code": 610118,
      "name": "彭州市" },
    {
      "code": 610117,
      "name": "都江堰市" },
    {
      "code": 610116,
      "name": "新津县" },
    {
      "code": 610115,
      "name": "蒲江县" },
    {
      "code": 610114,
      "name": "大邑县" },
    {
      "code": 610113,
      "name": "郫县" },
    {
      "code": 610112,
      "name": "双流县" },
    {
      "code": 610111,
      "name": "金堂县" },
    {
      "code": 610110,
      "name": "温江区" },
    {
      "code": 610109,
      "name": "新都区" },
    {
      "code": 610108,
      "name": "青白江区" },
    {
      "code": 610107,
      "name": "龙泉驿区" },
    {
      "code": 610106,
      "name": "成华区" },
    {
      "code": 610105,
      "name": "武侯区" },
    {
      "code": 610104,
      "name": "金牛区" },
    {
      "code": 610103,
      "name": "青羊区" },
    {
      "code": 610102,
      "name": "锦江区" }] }] },


{
  "code": 62,
  "name": "云南省",
  "sub": [{
    "code": 6216,
    "name": "临沧市",
    "sub": [{
      "code": 621609,
      "name": "沧源县" },
    {
      "code": 621608,
      "name": "耿马傣族县" },
    {
      "code": 621607,
      "name": "双江县" },
    {
      "code": 621606,
      "name": "镇康县" },
    {
      "code": 621605,
      "name": "永德县" },
    {
      "code": 621604,
      "name": "云县" },
    {
      "code": 621603,
      "name": "凤庆县" },
    {
      "code": 621602,
      "name": "临翔区" }] },

  {
    "code": 6215,
    "name": "怒江",
    "sub": [{
      "code": 621504,
      "name": "兰坪县" },
    {
      "code": 621503,
      "name": "贡山县" },
    {
      "code": 621502,
      "name": "福贡县" },
    {
      "code": 621501,
      "name": "泸水县" }] },

  {
    "code": 6214,
    "name": "德宏",
    "sub": [{
      "code": 621405,
      "name": "陇川县" },
    {
      "code": 621404,
      "name": "盈江县" },
    {
      "code": 621403,
      "name": "梁河县" },
    {
      "code": 621402,
      "name": "潞西市" },
    {
      "code": 621401,
      "name": "瑞丽市" }] },

  {
    "code": 6213,
    "name": "保山市",
    "sub": [{
      "code": 621306,
      "name": "昌宁县" },
    {
      "code": 621305,
      "name": "龙陵县" },
    {
      "code": 621304,
      "name": "腾冲县" },
    {
      "code": 621303,
      "name": "施甸县" },
    {
      "code": 621302,
      "name": "隆阳区" }] },

  {
    "code": 6212,
    "name": "大理",
    "sub": [{
      "code": 621212,
      "name": "鹤庆县" },
    {
      "code": 621211,
      "name": "剑川县" },
    {
      "code": 621210,
      "name": "洱源县" },
    {
      "code": 621209,
      "name": "云龙县" },
    {
      "code": 621208,
      "name": "永平县" },
    {
      "code": 621207,
      "name": "巍山彝族县" },
    {
      "code": 621206,
      "name": "南涧县" },
    {
      "code": 621205,
      "name": "弥渡县" },
    {
      "code": 621204,
      "name": "宾川县" },
    {
      "code": 621203,
      "name": "祥云县" },
    {
      "code": 621202,
      "name": "漾濞县" },
    {
      "code": 621201,
      "name": "大理市" }] },

  {
    "code": 6211,
    "name": "普洱市",
    "sub": [{
      "code": 621111,
      "name": "西盟县" },
    {
      "code": 621110,
      "name": "澜沧县" },
    {
      "code": 621109,
      "name": "孟连县" },
    {
      "code": 621108,
      "name": "江城哈尼族县" },
    {
      "code": 621107,
      "name": "镇沅县" },
    {
      "code": 621106,
      "name": "景谷傣族县" },
    {
      "code": 621105,
      "name": "景东县" },
    {
      "code": 621104,
      "name": "墨江县" },
    {
      "code": 621103,
      "name": "宁洱哈尼族县" },
    {
      "code": 621102,
      "name": "思茅区" }] },

  {
    "code": 6210,
    "name": "西双版纳州",
    "sub": [{
      "code": 621003,
      "name": "勐腊县" },
    {
      "code": 621002,
      "name": "勐海县" },
    {
      "code": 621001,
      "name": "景洪市" }] },

  {
    "code": 6209,
    "name": "文山州",
    "sub": [{
      "code": 620908,
      "name": "富宁县" },
    {
      "code": 620907,
      "name": "广南县" },
    {
      "code": 620906,
      "name": "丘北县" },
    {
      "code": 620905,
      "name": "马关县" },
    {
      "code": 620904,
      "name": "麻栗坡县" },
    {
      "code": 620903,
      "name": "西畴县" },
    {
      "code": 620902,
      "name": "砚山县" },
    {
      "code": 620901,
      "name": "文山县" }] },

  {
    "code": 6208,
    "name": "迪庆州",
    "sub": [{
      "code": 620803,
      "name": "维西县" },
    {
      "code": 620802,
      "name": "德钦县" },
    {
      "code": 620801,
      "name": "香格里拉县" }] },

  {
    "code": 6207,
    "name": "丽江市",
    "sub": [{
      "code": 620706,
      "name": "宁蒗县" },
    {
      "code": 620705,
      "name": "华坪县" },
    {
      "code": 620704,
      "name": "永胜县" },
    {
      "code": 620703,
      "name": "玉龙县" },
    {
      "code": 620702,
      "name": "古城区" }] },

  {
    "code": 6206,
    "name": "红河哈尼族州",
    "sub": [{
      "code": 620613,
      "name": "河口县" },
    {
      "code": 620612,
      "name": "绿春县" },
    {
      "code": 620611,
      "name": "金平县" },
    {
      "code": 620610,
      "name": "红河县" },
    {
      "code": 620609,
      "name": "元阳县" },
    {
      "code": 620608,
      "name": "泸西县" },
    {
      "code": 620607,
      "name": "弥勒县" },
    {
      "code": 620606,
      "name": "石屏县" },
    {
      "code": 620605,
      "name": "建水县" },
    {
      "code": 620604,
      "name": "屏边县" },
    {
      "code": 620603,
      "name": "蒙自县" },
    {
      "code": 620602,
      "name": "开远市" },
    {
      "code": 620601,
      "name": "个旧市" }] },

  {
    "code": 6205,
    "name": "楚雄州",
    "sub": [{
      "code": 620510,
      "name": "禄丰县" },
    {
      "code": 620509,
      "name": "武定县" },
    {
      "code": 620508,
      "name": "元谋县" },
    {
      "code": 620507,
      "name": "永仁县" },
    {
      "code": 620506,
      "name": "大姚县" },
    {
      "code": 620505,
      "name": "姚安县" },
    {
      "code": 620504,
      "name": "南华县" },
    {
      "code": 620503,
      "name": "牟定县" },
    {
      "code": 620502,
      "name": "双柏县" },
    {
      "code": 620501,
      "name": "楚雄市" }] },

  {
    "code": 6204,
    "name": "昭通市",
    "sub": [{
      "code": 620412,
      "name": "水富县" },
    {
      "code": 620411,
      "name": "威信县" },
    {
      "code": 620410,
      "name": "彝良县" },
    {
      "code": 620409,
      "name": "镇雄县" },
    {
      "code": 620408,
      "name": "绥江县" },
    {
      "code": 620407,
      "name": "永善县" },
    {
      "code": 620406,
      "name": "大关县" },
    {
      "code": 620405,
      "name": "盐津县" },
    {
      "code": 620404,
      "name": "巧家县" },
    {
      "code": 620403,
      "name": "鲁甸县" },
    {
      "code": 620402,
      "name": "昭阳区" }] },

  {
    "code": 6203,
    "name": "玉溪市",
    "sub": [{
      "code": 620310,
      "name": "元江哈尼族县" },
    {
      "code": 620309,
      "name": "新平县" },
    {
      "code": 620308,
      "name": "峨山县" },
    {
      "code": 620307,
      "name": "易门县" },
    {
      "code": 620306,
      "name": "华宁县" },
    {
      "code": 620305,
      "name": "通海县" },
    {
      "code": 620304,
      "name": "澄江县" },
    {
      "code": 620303,
      "name": "江川县" },
    {
      "code": 620302,
      "name": "红塔区" }] },

  {
    "code": 6202,
    "name": "曲靖市",
    "sub": [{
      "code": 620210,
      "name": "宣威市" },
    {
      "code": 620209,
      "name": "沾益县" },
    {
      "code": 620208,
      "name": "会泽县" },
    {
      "code": 620207,
      "name": "富源县" },
    {
      "code": 620206,
      "name": "罗平县" },
    {
      "code": 620205,
      "name": "师宗县" },
    {
      "code": 620204,
      "name": "陆良县" },
    {
      "code": 620203,
      "name": "马龙县" },
    {
      "code": 620202,
      "name": "麒麟区" }] },

  {
    "code": 6201,
    "name": "昆明市",
    "sub": [{
      "code": 620115,
      "name": "安宁市" },
    {
      "code": 620114,
      "name": "寻甸回族县" },
    {
      "code": 620113,
      "name": "禄劝县" },
    {
      "code": 620112,
      "name": "嵩明县" },
    {
      "code": 620111,
      "name": "石林县" },
    {
      "code": 620110,
      "name": "宜良县" },
    {
      "code": 620109,
      "name": "富民县" },
    {
      "code": 620108,
      "name": "晋宁县" },
    {
      "code": 620107,
      "name": "呈贡县" },
    {
      "code": 620106,
      "name": "东川区" },
    {
      "code": 620105,
      "name": "西山区" },
    {
      "code": 620104,
      "name": "官渡区" },
    {
      "code": 620103,
      "name": "盘龙区" },
    {
      "code": 620102,
      "name": "五华区" }] }] },


{
  "code": 63,
  "name": "贵州省",
  "sub": [{
    "code": 6309,
    "name": "黔东南",
    "sub": [{
      "code": 630916,
      "name": "丹寨县" },
    {
      "code": 630915,
      "name": "麻江县" },
    {
      "code": 630914,
      "name": "雷山县" },
    {
      "code": 630913,
      "name": "从江县" },
    {
      "code": 630912,
      "name": "榕江县" },
    {
      "code": 630911,
      "name": "黎平县" },
    {
      "code": 630910,
      "name": "台江县" },
    {
      "code": 630909,
      "name": "剑河县" },
    {
      "code": 630908,
      "name": "锦屏县" },
    {
      "code": 630907,
      "name": "天柱县" },
    {
      "code": 630906,
      "name": "岑巩县" },
    {
      "code": 630905,
      "name": "镇远县" },
    {
      "code": 630904,
      "name": "三穗县" },
    {
      "code": 630903,
      "name": "施秉县" },
    {
      "code": 630902,
      "name": "黄平县" },
    {
      "code": 630901,
      "name": "凯里市" }] },

  {
    "code": 6308,
    "name": "毕节地区",
    "sub": [{
      "code": 630808,
      "name": "赫章县" },
    {
      "code": 630807,
      "name": "威宁县" },
    {
      "code": 630806,
      "name": "纳雍县" },
    {
      "code": 630805,
      "name": "织金县" },
    {
      "code": 630804,
      "name": "金沙县" },
    {
      "code": 630803,
      "name": "黔西县" },
    {
      "code": 630802,
      "name": "大方县" },
    {
      "code": 630801,
      "name": "毕节市" }] },

  {
    "code": 6307,
    "name": "铜仁地区",
    "sub": [{
      "code": 630710,
      "name": "万山特区" },
    {
      "code": 630709,
      "name": "松桃县" },
    {
      "code": 630708,
      "name": "沿河县" },
    {
      "code": 630707,
      "name": "德江县" },
    {
      "code": 630706,
      "name": "印江县" },
    {
      "code": 630705,
      "name": "思南县" },
    {
      "code": 630704,
      "name": "石阡县" },
    {
      "code": 630703,
      "name": "玉屏县" },
    {
      "code": 630702,
      "name": "江口县" },
    {
      "code": 630701,
      "name": "铜仁市" }] },

  {
    "code": 6306,
    "name": "黔南",
    "sub": [{
      "code": 630612,
      "name": "三都县" },
    {
      "code": 630611,
      "name": "惠水县" },
    {
      "code": 630610,
      "name": "龙里县" },
    {
      "code": 630609,
      "name": "长顺县" },
    {
      "code": 630608,
      "name": "罗甸县" },
    {
      "code": 630607,
      "name": "平塘县" },
    {
      "code": 630606,
      "name": "独山县" },
    {
      "code": 630605,
      "name": "瓮安县" },
    {
      "code": 630604,
      "name": "贵定县" },
    {
      "code": 630603,
      "name": "荔波县" },
    {
      "code": 630602,
      "name": "福泉市" },
    {
      "code": 630601,
      "name": "都匀市" }] },

  {
    "code": 6305,
    "name": "黔西南",
    "sub": [{
      "code": 630508,
      "name": "安龙县" },
    {
      "code": 630507,
      "name": "册亨县" },
    {
      "code": 630506,
      "name": "望谟县" },
    {
      "code": 630505,
      "name": "贞丰县" },
    {
      "code": 630504,
      "name": "晴隆县" },
    {
      "code": 630503,
      "name": "普安县" },
    {
      "code": 630502,
      "name": "兴仁县" },
    {
      "code": 630501,
      "name": "兴义市" }] },

  {
    "code": 6304,
    "name": "安顺市",
    "sub": [{
      "code": 630407,
      "name": "紫云县" },
    {
      "code": 630406,
      "name": "关岭布依族县" },
    {
      "code": 630405,
      "name": "镇宁布依族县" },
    {
      "code": 630404,
      "name": "普定县" },
    {
      "code": 630403,
      "name": "平坝县" },
    {
      "code": 630402,
      "name": "西秀区" }] },

  {
    "code": 6303,
    "name": "六盘水市",
    "sub": [{
      "code": 630304,
      "name": "盘县" },
    {
      "code": 630303,
      "name": "水城县" },
    {
      "code": 630302,
      "name": "六枝特区" },
    {
      "code": 630301,
      "name": "钟山区" }] },

  {
    "code": 6302,
    "name": "遵义市",
    "sub": [{
      "code": 630215,
      "name": "仁怀市" },
    {
      "code": 630214,
      "name": "赤水市" },
    {
      "code": 630213,
      "name": "习水县" },
    {
      "code": 630212,
      "name": "余庆县" },
    {
      "code": 630211,
      "name": "湄潭县" },
    {
      "code": 630210,
      "name": "凤冈县" },
    {
      "code": 630209,
      "name": "务川仡佬族县" },
    {
      "code": 630208,
      "name": "道真仡佬族县" },
    {
      "code": 630207,
      "name": "正安县" },
    {
      "code": 630206,
      "name": "绥阳县" },
    {
      "code": 630205,
      "name": "桐梓县" },
    {
      "code": 630204,
      "name": "遵义县" },
    {
      "code": 630203,
      "name": "汇川区" },
    {
      "code": 630202,
      "name": "红花岗区" }] },

  {
    "code": 6301,
    "name": "贵阳市",
    "sub": [{
      "code": 630111,
      "name": "清镇市" },
    {
      "code": 630110,
      "name": "修文县" },
    {
      "code": 630109,
      "name": "息烽县" },
    {
      "code": 630108,
      "name": "开阳县" },
    {
      "code": 630107,
      "name": "小河区" },
    {
      "code": 630106,
      "name": "白云区" },
    {
      "code": 630105,
      "name": "乌当区" },
    {
      "code": 630104,
      "name": "花溪区" },
    {
      "code": 630103,
      "name": "云岩区" },
    {
      "code": 630102,
      "name": "南明区" }] }] },


{
  "code": 64,
  "name": "西藏",
  "sub": [{
    "code": 6407,
    "name": "阿里地区",
    "sub": [{
      "code": 640707,
      "name": "措勤县" },
    {
      "code": 640706,
      "name": "改则县" },
    {
      "code": 640705,
      "name": "革吉县" },
    {
      "code": 640704,
      "name": "日土县" },
    {
      "code": 640703,
      "name": "噶尔县" },
    {
      "code": 640702,
      "name": "札达县" },
    {
      "code": 640701,
      "name": "普兰县" }] },

  {
    "code": 6406,
    "name": "那曲地区",
    "sub": [{
      "code": 640610,
      "name": "尼玛县" },
    {
      "code": 640609,
      "name": "巴青县" },
    {
      "code": 640608,
      "name": "班戈县" },
    {
      "code": 640607,
      "name": "索县" },
    {
      "code": 640606,
      "name": "申扎县" },
    {
      "code": 640605,
      "name": "安多县" },
    {
      "code": 640604,
      "name": "聂荣县" },
    {
      "code": 640603,
      "name": "比如县" },
    {
      "code": 640602,
      "name": "嘉黎县" },
    {
      "code": 640601,
      "name": "那曲县" }] },

  {
    "code": 6405,
    "name": "昌都地区",
    "sub": [{
      "code": 640511,
      "name": "边坝县" },
    {
      "code": 640510,
      "name": "洛隆县" },
    {
      "code": 640509,
      "name": "芒康县" },
    {
      "code": 640508,
      "name": "左贡县" },
    {
      "code": 640507,
      "name": "八宿县" },
    {
      "code": 640506,
      "name": "察雅县" },
    {
      "code": 640505,
      "name": "丁青县" },
    {
      "code": 640504,
      "name": "类乌齐县" },
    {
      "code": 640503,
      "name": "贡觉县" },
    {
      "code": 640502,
      "name": "江达县" },
    {
      "code": 640501,
      "name": "昌都县" }] },

  {
    "code": 6404,
    "name": "林芝地区",
    "sub": [{
      "code": 640407,
      "name": "朗县" },
    {
      "code": 640406,
      "name": "察隅县" },
    {
      "code": 640405,
      "name": "波密县" },
    {
      "code": 640404,
      "name": "墨脱县" },
    {
      "code": 640403,
      "name": "米林县" },
    {
      "code": 640402,
      "name": "工布江达县" },
    {
      "code": 640401,
      "name": "林芝县" }] },

  {
    "code": 6403,
    "name": "山南地区",
    "sub": [{
      "code": 640312,
      "name": "浪卡子县" },
    {
      "code": 640311,
      "name": "错那县" },
    {
      "code": 640310,
      "name": "隆子县" },
    {
      "code": 640309,
      "name": "加查县" },
    {
      "code": 640308,
      "name": "洛扎县" },
    {
      "code": 640307,
      "name": "措美县" },
    {
      "code": 640306,
      "name": "曲松县" },
    {
      "code": 640305,
      "name": "琼结县" },
    {
      "code": 640304,
      "name": "桑日县" },
    {
      "code": 640303,
      "name": "贡嘎县" },
    {
      "code": 640302,
      "name": "扎囊县" },
    {
      "code": 640301,
      "name": "乃东县" }] },

  {
    "code": 6402,
    "name": "日喀则地区",
    "sub": [{
      "code": 640218,
      "name": "岗巴县" },
    {
      "code": 640217,
      "name": "萨嘎县" },
    {
      "code": 640216,
      "name": "聂拉木县" },
    {
      "code": 640215,
      "name": "吉隆县" },
    {
      "code": 640214,
      "name": "亚东县" },
    {
      "code": 640213,
      "name": "仲巴县" },
    {
      "code": 640212,
      "name": "定结县" },
    {
      "code": 640211,
      "name": "康马县" },
    {
      "code": 640210,
      "name": "仁布县" },
    {
      "code": 640209,
      "name": "白朗县" },
    {
      "code": 640208,
      "name": "谢通门县" },
    {
      "code": 640207,
      "name": "昂仁县" },
    {
      "code": 640206,
      "name": "拉孜县" },
    {
      "code": 640205,
      "name": "萨迦县" },
    {
      "code": 640204,
      "name": "定日县" },
    {
      "code": 640203,
      "name": "江孜县" },
    {
      "code": 640202,
      "name": "南木林县" },
    {
      "code": 640201,
      "name": "日喀则市" }] },

  {
    "code": 6401,
    "name": "拉萨市",
    "sub": [{
      "code": 640109,
      "name": "墨竹工卡县" },
    {
      "code": 640108,
      "name": "达孜县" },
    {
      "code": 640107,
      "name": "堆龙德庆县" },
    {
      "code": 640106,
      "name": "曲水县" },
    {
      "code": 640105,
      "name": "尼木县" },
    {
      "code": 640104,
      "name": "当雄县" },
    {
      "code": 640103,
      "name": "林周县" },
    {
      "code": 640102,
      "name": "城关区" }] }] },


{
  "code": 70,
  "name": "河南省",
  "sub": [{
    "code": 7018,
    "name": "济源市" },
  {
    "code": 7017,
    "name": "信阳市",
    "sub": [{
      "code": 701711,
      "name": "息县" },
    {
      "code": 701710,
      "name": "淮滨县" },
    {
      "code": 701709,
      "name": "潢川县" },
    {
      "code": 701708,
      "name": "固始县" },
    {
      "code": 701707,
      "name": "商城县" },
    {
      "code": 701706,
      "name": "新县" },
    {
      "code": 701705,
      "name": "光山县" },
    {
      "code": 701704,
      "name": "罗山县" },
    {
      "code": 701703,
      "name": "平桥区" },
    {
      "code": 701702,
      "name": "浉河区" }] },

  {
    "code": 7016,
    "name": "南阳市",
    "sub": [{
      "code": 701615,
      "name": "高新区" },
    {
      "code": 701614,
      "name": "邓州市" },
    {
      "code": 701613,
      "name": "桐柏县" },
    {
      "code": 701612,
      "name": "新野县" },
    {
      "code": 701611,
      "name": "唐河县" },
    {
      "code": 701610,
      "name": "社旗县" },
    {
      "code": 701609,
      "name": "淅川县" },
    {
      "code": 701608,
      "name": "内乡县" },
    {
      "code": 701607,
      "name": "镇平县" },
    {
      "code": 701606,
      "name": "西峡县" },
    {
      "code": 701605,
      "name": "方城县" },
    {
      "code": 701604,
      "name": "南召县" },
    {
      "code": 701603,
      "name": "卧龙区" },
    {
      "code": 701602,
      "name": "宛城区" }] },

  {
    "code": 7015,
    "name": "周口市",
    "sub": [{
      "code": 701511,
      "name": "项城市" },
    {
      "code": 701510,
      "name": "鹿邑县" },
    {
      "code": 701509,
      "name": "太康县" },
    {
      "code": 701508,
      "name": "淮阳县" },
    {
      "code": 701507,
      "name": "郸城县" },
    {
      "code": 701506,
      "name": "沈丘县" },
    {
      "code": 701505,
      "name": "商水县" },
    {
      "code": 701504,
      "name": "西华县" },
    {
      "code": 701503,
      "name": "扶沟县" },
    {
      "code": 701502,
      "name": "川汇区" }] },

  {
    "code": 7014,
    "name": "驻马店市",
    "sub": [{
      "code": 701411,
      "name": "新蔡县" },
    {
      "code": 701410,
      "name": "遂平县" },
    {
      "code": 701409,
      "name": "汝南县" },
    {
      "code": 701408,
      "name": "泌阳县" },
    {
      "code": 701407,
      "name": "确山县" },
    {
      "code": 701406,
      "name": "正阳县" },
    {
      "code": 701405,
      "name": "平舆县" },
    {
      "code": 701404,
      "name": "上蔡县" },
    {
      "code": 701403,
      "name": "西平县" },
    {
      "code": 701402,
      "name": "驿城区" }] },

  {
    "code": 7013,
    "name": "平顶山市",
    "sub": [{
      "code": 701311,
      "name": "汝州市" },
    {
      "code": 701310,
      "name": "舞钢市" },
    {
      "code": 701309,
      "name": "郏县" },
    {
      "code": 701308,
      "name": "鲁山县" },
    {
      "code": 701307,
      "name": "叶县" },
    {
      "code": 701306,
      "name": "宝丰县" },
    {
      "code": 701305,
      "name": "湛河区" },
    {
      "code": 701304,
      "name": "石龙区" },
    {
      "code": 701303,
      "name": "卫东区" },
    {
      "code": 701302,
      "name": "新华区" }] },

  {
    "code": 7012,
    "name": "漯河市",
    "sub": [{
      "code": 701206,
      "name": "临颍县" },
    {
      "code": 701205,
      "name": "舞阳县" },
    {
      "code": 701204,
      "name": "召陵区" },
    {
      "code": 701203,
      "name": "郾城区" },
    {
      "code": 701202,
      "name": "源汇区" }] },

  {
    "code": 7011,
    "name": "许昌市",
    "sub": [{
      "code": 701107,
      "name": "长葛市" },
    {
      "code": 701106,
      "name": "禹州市" },
    {
      "code": 701105,
      "name": "襄城县" },
    {
      "code": 701104,
      "name": "鄢陵县" },
    {
      "code": 701103,
      "name": "许昌县" },
    {
      "code": 701102,
      "name": "魏都区" }] },

  {
    "code": 7010,
    "name": "商丘市",
    "sub": [{
      "code": 701010,
      "name": "永城市" },
    {
      "code": 701009,
      "name": "夏邑县" },
    {
      "code": 701008,
      "name": "虞城县" },
    {
      "code": 701007,
      "name": "柘城县" },
    {
      "code": 701006,
      "name": "宁陵县" },
    {
      "code": 701005,
      "name": "睢县" },
    {
      "code": 701004,
      "name": "民权县" },
    {
      "code": 701003,
      "name": "睢阳区" },
    {
      "code": 701002,
      "name": "梁园区" }] },

  {
    "code": 7009,
    "name": "三门峡市",
    "sub": [{
      "code": 700907,
      "name": "灵宝市" },
    {
      "code": 700906,
      "name": "义马市" },
    {
      "code": 700905,
      "name": "卢氏县" },
    {
      "code": 700904,
      "name": "陕县" },
    {
      "code": 700903,
      "name": "渑池县" },
    {
      "code": 700902,
      "name": "湖滨区" }] },

  {
    "code": 7008,
    "name": "鹤壁市",
    "sub": [{
      "code": 700806,
      "name": "淇县" },
    {
      "code": 700805,
      "name": "浚县" },
    {
      "code": 700804,
      "name": "淇滨区" },
    {
      "code": 700803,
      "name": "山城区" },
    {
      "code": 700802,
      "name": "鹤山区" }] },

  {
    "code": 7007,
    "name": "焦作市",
    "sub": [{
      "code": 700711,
      "name": "孟州市" },
    {
      "code": 700710,
      "name": "沁阳市" },
    {
      "code": 700709,
      "name": "温县" },
    {
      "code": 700708,
      "name": "武陟县" },
    {
      "code": 700707,
      "name": "博爱县" },
    {
      "code": 700706,
      "name": "修武县" },
    {
      "code": 700705,
      "name": "山阳区" },
    {
      "code": 700704,
      "name": "马村区" },
    {
      "code": 700703,
      "name": "中站区" },
    {
      "code": 700702,
      "name": "解放区" }] },

  {
    "code": 7006,
    "name": "濮阳市",
    "sub": [{
      "code": 700607,
      "name": "濮阳县" },
    {
      "code": 700606,
      "name": "台前县" },
    {
      "code": 700605,
      "name": "范县" },
    {
      "code": 700604,
      "name": "南乐县" },
    {
      "code": 700603,
      "name": "清丰县" },
    {
      "code": 700602,
      "name": "华龙区" }] },

  {
    "code": 7005,
    "name": "新乡市",
    "sub": [{
      "code": 700513,
      "name": "辉县市" },
    {
      "code": 700512,
      "name": "卫辉市" },
    {
      "code": 700511,
      "name": "长垣县" },
    {
      "code": 700510,
      "name": "封丘县" },
    {
      "code": 700509,
      "name": "延津县" },
    {
      "code": 700508,
      "name": "原阳县" },
    {
      "code": 700507,
      "name": "获嘉县" },
    {
      "code": 700506,
      "name": "新乡县" },
    {
      "code": 700505,
      "name": "牧野区" },
    {
      "code": 700504,
      "name": "凤泉区" },
    {
      "code": 700503,
      "name": "卫滨区" },
    {
      "code": 700502,
      "name": "红旗区" }] },

  {
    "code": 7004,
    "name": "安阳市",
    "sub": [{
      "code": 700411,
      "name": "高新区" },
    {
      "code": 700410,
      "name": "林州市" },
    {
      "code": 700409,
      "name": "内黄县" },
    {
      "code": 700408,
      "name": "滑县" },
    {
      "code": 700407,
      "name": "汤阴县" },
    {
      "code": 700406,
      "name": "安阳县" },
    {
      "code": 700405,
      "name": "龙安区" },
    {
      "code": 700404,
      "name": "殷都区" },
    {
      "code": 700403,
      "name": "北关区" },
    {
      "code": 700402,
      "name": "文峰区" }] },

  {
    "code": 7003,
    "name": "开封市",
    "sub": [{
      "code": 700311,
      "name": "兰考县" },
    {
      "code": 700310,
      "name": "开封县" },
    {
      "code": 700309,
      "name": "尉氏县" },
    {
      "code": 700308,
      "name": "通许县" },
    {
      "code": 700307,
      "name": "杞县" },
    {
      "code": 700306,
      "name": "金明区" },
    {
      "code": 700305,
      "name": "禹王台区" },
    {
      "code": 700304,
      "name": "鼓楼区" },
    {
      "code": 700303,
      "name": "顺河回族区" },
    {
      "code": 700302,
      "name": "龙亭区" }] },

  {
    "code": 7002,
    "name": "洛阳市",
    "sub": [{
      "code": 700217,
      "name": "高新区" },
    {
      "code": 700216,
      "name": "偃师市" },
    {
      "code": 700215,
      "name": "伊川县" },
    {
      "code": 700214,
      "name": "洛宁县" },
    {
      "code": 700213,
      "name": "宜阳县" },
    {
      "code": 700212,
      "name": "汝阳县" },
    {
      "code": 700211,
      "name": "嵩县" },
    {
      "code": 700210,
      "name": "栾川县" },
    {
      "code": 700209,
      "name": "新安县" },
    {
      "code": 700208,
      "name": "孟津县" },
    {
      "code": 700207,
      "name": "洛龙区" },
    {
      "code": 700206,
      "name": "吉利区" },
    {
      "code": 700205,
      "name": "涧西区" },
    {
      "code": 700204,
      "name": "瀍河回族区" },
    {
      "code": 700203,
      "name": "西工区" },
    {
      "code": 700202,
      "name": "老城区" }] },

  {
    "code": 7001,
    "name": "郑州市",
    "sub": [{
      "code": 700116,
      "name": "高新区" },
    {
      "code": 700115,
      "name": "郑东新区" },
    {
      "code": 700114,
      "name": "经济开发区" },
    {
      "code": 700113,
      "name": "登封市" },
    {
      "code": 700112,
      "name": "新郑市" },
    {
      "code": 700111,
      "name": "新密市" },
    {
      "code": 700110,
      "name": "荥阳市" },
    {
      "code": 700109,
      "name": "巩义市" },
    {
      "code": 700108,
      "name": "中牟县" },
    {
      "code": 700107,
      "name": "惠济区" },
    {
      "code": 700106,
      "name": "上街区" },
    {
      "code": 700105,
      "name": "金水区" },
    {
      "code": 700104,
      "name": "管城回族区" },
    {
      "code": 700103,
      "name": "二七区" },
    {
      "code": 700102,
      "name": "中原区" }] }] },


{
  "code": 71,
  "name": "湖北省",
  "sub": [{
    "code": 7117,
    "name": "神农架林区" },
  {
    "code": 7116,
    "name": "天门市" },
  {
    "code": 7115,
    "name": "仙桃市" },
  {
    "code": 7114,
    "name": "潜江市" },
  {
    "code": 7113,
    "name": "恩施",
    "sub": [{
      "code": 711308,
      "name": "鹤峰县" },
    {
      "code": 711307,
      "name": "来凤县" },
    {
      "code": 711306,
      "name": "咸丰县" },
    {
      "code": 711305,
      "name": "宣恩县" },
    {
      "code": 711304,
      "name": "巴东县" },
    {
      "code": 711303,
      "name": "建始县" },
    {
      "code": 711302,
      "name": "利川市" },
    {
      "code": 711301,
      "name": "恩施市" }] },

  {
    "code": 7112,
    "name": "随州市",
    "sub": [{
      "code": 711203,
      "name": "广水市" },
    {
      "code": 711202,
      "name": "曾都区" }] },

  {
    "code": 7111,
    "name": "咸宁市",
    "sub": [{
      "code": 711107,
      "name": "赤壁市" },
    {
      "code": 711106,
      "name": "通山县" },
    {
      "code": 711105,
      "name": "崇阳县" },
    {
      "code": 711104,
      "name": "通城县" },
    {
      "code": 711103,
      "name": "嘉鱼县" },
    {
      "code": 711102,
      "name": "咸安区" }] },

  {
    "code": 7110,
    "name": "黄冈市",
    "sub": [{
      "code": 711011,
      "name": "武穴市" },
    {
      "code": 711010,
      "name": "麻城市" },
    {
      "code": 711009,
      "name": "黄梅县" },
    {
      "code": 711008,
      "name": "蕲春县" },
    {
      "code": 711007,
      "name": "浠水县" },
    {
      "code": 711006,
      "name": "英山县" },
    {
      "code": 711005,
      "name": "罗田县" },
    {
      "code": 711004,
      "name": "红安县" },
    {
      "code": 711003,
      "name": "团风县" },
    {
      "code": 711002,
      "name": "黄州区" }] },

  {
    "code": 7109,
    "name": "孝感市",
    "sub": [{
      "code": 710908,
      "name": "汉川市" },
    {
      "code": 710907,
      "name": "安陆市" },
    {
      "code": 710906,
      "name": "应城市" },
    {
      "code": 710905,
      "name": "云梦县" },
    {
      "code": 710904,
      "name": "大悟县" },
    {
      "code": 710903,
      "name": "孝昌县" },
    {
      "code": 710902,
      "name": "孝南区" }] },

  {
    "code": 7108,
    "name": "鄂州市",
    "sub": [{
      "code": 710804,
      "name": "鄂城区" },
    {
      "code": 710803,
      "name": "华容区" },
    {
      "code": 710802,
      "name": "梁子湖区" }] },

  {
    "code": 7107,
    "name": "荆门市",
    "sub": [{
      "code": 710706,
      "name": "钟祥市" },
    {
      "code": 710705,
      "name": "沙洋县" },
    {
      "code": 710704,
      "name": "京山县" },
    {
      "code": 710703,
      "name": "掇刀区" },
    {
      "code": 710702,
      "name": "东宝区" }] },

  {
    "code": 7106,
    "name": "宜昌市",
    "sub": [{
      "code": 710615,
      "name": "高新区" },
    {
      "code": 710614,
      "name": "枝江市" },
    {
      "code": 710613,
      "name": "当阳市" },
    {
      "code": 710612,
      "name": "宜都市" },
    {
      "code": 710611,
      "name": "五峰县" },
    {
      "code": 710610,
      "name": "长阳县" },
    {
      "code": 710609,
      "name": "秭归县" },
    {
      "code": 710608,
      "name": "兴山县" },
    {
      "code": 710607,
      "name": "远安县" },
    {
      "code": 710606,
      "name": "夷陵区" },
    {
      "code": 710605,
      "name": "猇亭区" },
    {
      "code": 710604,
      "name": "点军区" },
    {
      "code": 710603,
      "name": "伍家岗区" },
    {
      "code": 710602,
      "name": "西陵区" }] },

  {
    "code": 7105,
    "name": "荆州市",
    "sub": [{
      "code": 710509,
      "name": "松滋市" },
    {
      "code": 710508,
      "name": "洪湖市" },
    {
      "code": 710507,
      "name": "石首市" },
    {
      "code": 710506,
      "name": "江陵县" },
    {
      "code": 710505,
      "name": "监利县" },
    {
      "code": 710504,
      "name": "公安县" },
    {
      "code": 710503,
      "name": "荆州区" }] },

  {
    "code": 7104,
    "name": "十堰市",
    "sub": [{
      "code": 710409,
      "name": "丹江口市" },
    {
      "code": 710408,
      "name": "房县" },
    {
      "code": 710407,
      "name": "竹溪县" },
    {
      "code": 710406,
      "name": "竹山县" },
    {
      "code": 710405,
      "name": "郧西县" },
    {
      "code": 710404,
      "name": "郧县" },
    {
      "code": 710403,
      "name": "张湾区" },
    {
      "code": 710402,
      "name": "茅箭区" }] },

  {
    "code": 7103,
    "name": "襄阳市",
    "sub": [{
      "code": 710310,
      "name": "宜城市" },
    {
      "code": 710309,
      "name": "枣阳市" },
    {
      "code": 710308,
      "name": "老河口市" },
    {
      "code": 710307,
      "name": "保康县" },
    {
      "code": 710306,
      "name": "谷城县" },
    {
      "code": 710305,
      "name": "南漳县" },
    {
      "code": 710304,
      "name": "襄州区" },
    {
      "code": 710303,
      "name": "樊城区" },
    {
      "code": 710302,
      "name": "襄城区" }] },

  {
    "code": 7102,
    "name": "黄石市",
    "sub": [{
      "code": 710207,
      "name": "大冶市" },
    {
      "code": 710206,
      "name": "阳新县" },
    {
      "code": 710205,
      "name": "铁山区" },
    {
      "code": 710204,
      "name": "下陆区" },
    {
      "code": 710203,
      "name": "西塞山区" },
    {
      "code": 710202,
      "name": "黄石港区" }] },

  {
    "code": 7101,
    "name": "武汉市",
    "sub": [{
      "code": 710114,
      "name": "新洲区" },
    {
      "code": 710113,
      "name": "黄陂区" },
    {
      "code": 710112,
      "name": "江夏区" },
    {
      "code": 710111,
      "name": "蔡甸区" },
    {
      "code": 710110,
      "name": "汉南区" },
    {
      "code": 710109,
      "name": "东西湖区" },
    {
      "code": 710108,
      "name": "洪山区" },
    {
      "code": 710107,
      "name": "青山区" },
    {
      "code": 710106,
      "name": "武昌区" },
    {
      "code": 710105,
      "name": "汉阳区" },
    {
      "code": 710104,
      "name": "硚口区" },
    {
      "code": 710103,
      "name": "江汉区" },
    {
      "code": 710102,
      "name": "江岸区" }] }] },


{
  "code": 72,
  "name": "湖南省",
  "sub": [{
    "code": 7214,
    "name": "湘西",
    "sub": [{
      "code": 721408,
      "name": "龙山县" },
    {
      "code": 721407,
      "name": "永顺县" },
    {
      "code": 721406,
      "name": "古丈县" },
    {
      "code": 721405,
      "name": "保靖县" },
    {
      "code": 721404,
      "name": "花垣县" },
    {
      "code": 721403,
      "name": "凤凰县" },
    {
      "code": 721402,
      "name": "泸溪县" },
    {
      "code": 721401,
      "name": "吉首市" }] },

  {
    "code": 7213,
    "name": "张家界市",
    "sub": [{
      "code": 721305,
      "name": "桑植县" },
    {
      "code": 721304,
      "name": "慈利县" },
    {
      "code": 721303,
      "name": "武陵源区" },
    {
      "code": 721302,
      "name": "永定区" }] },

  {
    "code": 7212,
    "name": "怀化市",
    "sub": [{
      "code": 721213,
      "name": "洪江市" },
    {
      "code": 721212,
      "name": "通道县" },
    {
      "code": 721211,
      "name": "靖州苗族县" },
    {
      "code": 721210,
      "name": "芷江县" },
    {
      "code": 721209,
      "name": "新晃县" },
    {
      "code": 721208,
      "name": "麻阳县" },
    {
      "code": 721207,
      "name": "会同县" },
    {
      "code": 721206,
      "name": "溆浦县" },
    {
      "code": 721205,
      "name": "辰溪县" },
    {
      "code": 721204,
      "name": "沅陵县" },
    {
      "code": 721203,
      "name": "中方县" },
    {
      "code": 721202,
      "name": "鹤城区" }] },

  {
    "code": 7211,
    "name": "永州市",
    "sub": [{
      "code": 721112,
      "name": "江华县" },
    {
      "code": 721111,
      "name": "新田县" },
    {
      "code": 721110,
      "name": "蓝山县" },
    {
      "code": 721109,
      "name": "宁远县" },
    {
      "code": 721108,
      "name": "江永县" },
    {
      "code": 721107,
      "name": "道县" },
    {
      "code": 721106,
      "name": "双牌县" },
    {
      "code": 721105,
      "name": "东安县" },
    {
      "code": 721104,
      "name": "祁阳县" },
    {
      "code": 721103,
      "name": "冷水滩区" },
    {
      "code": 721102,
      "name": "零陵区" }] },

  {
    "code": 7210,
    "name": "娄底市",
    "sub": [{
      "code": 721006,
      "name": "涟源市" },
    {
      "code": 721005,
      "name": "冷水江市" },
    {
      "code": 721004,
      "name": "新化县" },
    {
      "code": 721003,
      "name": "双峰县" },
    {
      "code": 721002,
      "name": "娄星区" }] },

  {
    "code": 7209,
    "name": "郴州市",
    "sub": [{
      "code": 720912,
      "name": "资兴市" },
    {
      "code": 720911,
      "name": "安仁县" },
    {
      "code": 720910,
      "name": "桂东县" },
    {
      "code": 720909,
      "name": "汝城县" },
    {
      "code": 720908,
      "name": "临武县" },
    {
      "code": 720907,
      "name": "嘉禾县" },
    {
      "code": 720906,
      "name": "永兴县" },
    {
      "code": 720905,
      "name": "宜章县" },
    {
      "code": 720904,
      "name": "桂阳县" },
    {
      "code": 720903,
      "name": "苏仙区" },
    {
      "code": 720902,
      "name": "北湖区" }] },

  {
    "code": 7208,
    "name": "邵阳市",
    "sub": [{
      "code": 720813,
      "name": "武冈市" },
    {
      "code": 720812,
      "name": "城步县" },
    {
      "code": 720811,
      "name": "新宁县" },
    {
      "code": 720810,
      "name": "绥宁县" },
    {
      "code": 720809,
      "name": "洞口县" },
    {
      "code": 720808,
      "name": "隆回县" },
    {
      "code": 720807,
      "name": "邵阳县" },
    {
      "code": 720806,
      "name": "新邵县" },
    {
      "code": 720805,
      "name": "邵东县" },
    {
      "code": 720804,
      "name": "北塔区" },
    {
      "code": 720803,
      "name": "大祥区" },
    {
      "code": 720802,
      "name": "双清区" }] },

  {
    "code": 7207,
    "name": "岳阳市",
    "sub": [{
      "code": 720710,
      "name": "临湘市" },
    {
      "code": 720709,
      "name": "汨罗市" },
    {
      "code": 720708,
      "name": "平江县" },
    {
      "code": 720707,
      "name": "湘阴县" },
    {
      "code": 720706,
      "name": "华容县" },
    {
      "code": 720705,
      "name": "岳阳县" },
    {
      "code": 720704,
      "name": "君山区" },
    {
      "code": 720703,
      "name": "云溪区" },
    {
      "code": 720702,
      "name": "岳阳楼区" }] },

  {
    "code": 7206,
    "name": "常德市",
    "sub": [{
      "code": 720610,
      "name": "津市市" },
    {
      "code": 720609,
      "name": "石门县" },
    {
      "code": 720608,
      "name": "桃源县" },
    {
      "code": 720607,
      "name": "临澧县" },
    {
      "code": 720606,
      "name": "澧县" },
    {
      "code": 720605,
      "name": "汉寿县" },
    {
      "code": 720604,
      "name": "安乡县" },
    {
      "code": 720603,
      "name": "鼎城区" },
    {
      "code": 720602,
      "name": "武陵区" }] },

  {
    "code": 7205,
    "name": "益阳市",
    "sub": [{
      "code": 720508,
      "name": "高新区" },
    {
      "code": 720507,
      "name": "沅江市" },
    {
      "code": 720506,
      "name": "安化县" },
    {
      "code": 720505,
      "name": "桃江县" },
    {
      "code": 720504,
      "name": "南县" },
    {
      "code": 720503,
      "name": "赫山区" },
    {
      "code": 720502,
      "name": "资阳区" }] },

  {
    "code": 7204,
    "name": "衡阳市",
    "sub": [{
      "code": 720413,
      "name": "常宁市" },
    {
      "code": 720412,
      "name": "耒阳市" },
    {
      "code": 720411,
      "name": "祁东县" },
    {
      "code": 720410,
      "name": "衡东县" },
    {
      "code": 720409,
      "name": "衡山县" },
    {
      "code": 720408,
      "name": "衡南县" },
    {
      "code": 720407,
      "name": "衡阳县" },
    {
      "code": 720406,
      "name": "南岳区" },
    {
      "code": 720405,
      "name": "蒸湘区" },
    {
      "code": 720404,
      "name": "石鼓区" },
    {
      "code": 720403,
      "name": "雁峰区" },
    {
      "code": 720402,
      "name": "珠晖区" }] },

  {
    "code": 7203,
    "name": "湘潭市",
    "sub": [{
      "code": 720307,
      "name": "高新区" },
    {
      "code": 720306,
      "name": "韶山市" },
    {
      "code": 720305,
      "name": "湘乡市" },
    {
      "code": 720304,
      "name": "湘潭县" },
    {
      "code": 720303,
      "name": "岳塘区" },
    {
      "code": 720302,
      "name": "雨湖区" }] },

  {
    "code": 7202,
    "name": "株洲市",
    "sub": [{
      "code": 720211,
      "name": "高新区" },
    {
      "code": 720210,
      "name": "醴陵市" },
    {
      "code": 720209,
      "name": "炎陵县" },
    {
      "code": 720208,
      "name": "茶陵县" },
    {
      "code": 720207,
      "name": "攸县" },
    {
      "code": 720206,
      "name": "株洲县" },
    {
      "code": 720205,
      "name": "天元区" },
    {
      "code": 720204,
      "name": "石峰区" },
    {
      "code": 720203,
      "name": "芦淞区" },
    {
      "code": 720202,
      "name": "荷塘区" }] },

  {
    "code": 7201,
    "name": "长沙市",
    "sub": [{
      "code": 720110,
      "name": "浏阳市" },
    {
      "code": 720109,
      "name": "宁乡县" },
    {
      "code": 720108,
      "name": "望城县" },
    {
      "code": 720107,
      "name": "长沙县" },
    {
      "code": 720106,
      "name": "雨花区" },
    {
      "code": 720105,
      "name": "开福区" },
    {
      "code": 720104,
      "name": "岳麓区" },
    {
      "code": 720103,
      "name": "天心区" },
    {
      "code": 720102,
      "name": "芙蓉区" }] }] },


{
  "code": 80,
  "name": "陕西省",
  "sub": [{
    "code": 8011,
    "name": "杨凌",
    "sub": [{
      "code": 801101,
      "name": "农业示范区" }] },

  {
    "code": 8010,
    "name": "商洛市",
    "sub": [{
      "code": 801008,
      "name": "柞水县" },
    {
      "code": 801007,
      "name": "镇安县" },
    {
      "code": 801006,
      "name": "山阳县" },
    {
      "code": 801005,
      "name": "商南县" },
    {
      "code": 801004,
      "name": "丹凤县" },
    {
      "code": 801003,
      "name": "洛南县" },
    {
      "code": 801002,
      "name": "商州区" }] },

  {
    "code": 8009,
    "name": "安康市",
    "sub": [{
      "code": 800911,
      "name": "白河县" },
    {
      "code": 800910,
      "name": "旬阳县" },
    {
      "code": 800909,
      "name": "镇坪县" },
    {
      "code": 800908,
      "name": "平利县" },
    {
      "code": 800907,
      "name": "岚皋县" },
    {
      "code": 800906,
      "name": "紫阳县" },
    {
      "code": 800905,
      "name": "宁陕县" },
    {
      "code": 800904,
      "name": "石泉县" },
    {
      "code": 800903,
      "name": "汉阴县" },
    {
      "code": 800902,
      "name": "汉滨区" }] },

  {
    "code": 8008,
    "name": "汉中市",
    "sub": [{
      "code": 800812,
      "name": "佛坪县" },
    {
      "code": 800811,
      "name": "留坝县" },
    {
      "code": 800810,
      "name": "镇巴县" },
    {
      "code": 800809,
      "name": "略阳县" },
    {
      "code": 800808,
      "name": "宁强县" },
    {
      "code": 800807,
      "name": "勉县" },
    {
      "code": 800806,
      "name": "西乡县" },
    {
      "code": 800805,
      "name": "洋县" },
    {
      "code": 800804,
      "name": "城固县" },
    {
      "code": 800803,
      "name": "南郑县" },
    {
      "code": 800802,
      "name": "汉台区" }] },

  {
    "code": 8007,
    "name": "铜川市",
    "sub": [{
      "code": 800705,
      "name": "宜君县" },
    {
      "code": 800704,
      "name": "耀州区" },
    {
      "code": 800703,
      "name": "印台区" },
    {
      "code": 800702,
      "name": "王益区" }] },

  {
    "code": 8006,
    "name": "榆林市",
    "sub": [{
      "code": 800613,
      "name": "子洲县" },
    {
      "code": 800612,
      "name": "清涧县" },
    {
      "code": 800611,
      "name": "吴堡县" },
    {
      "code": 800610,
      "name": "佳县" },
    {
      "code": 800609,
      "name": "米脂县" },
    {
      "code": 800608,
      "name": "绥德县" },
    {
      "code": 800607,
      "name": "定边县" },
    {
      "code": 800606,
      "name": "靖边县" },
    {
      "code": 800605,
      "name": "横山县" },
    {
      "code": 800604,
      "name": "府谷县" },
    {
      "code": 800603,
      "name": "神木县" },
    {
      "code": 800602,
      "name": "榆阳区" }] },

  {
    "code": 8005,
    "name": "延安市",
    "sub": [{
      "code": 800514,
      "name": "黄陵县" },
    {
      "code": 800513,
      "name": "黄龙县" },
    {
      "code": 800512,
      "name": "宜川县" },
    {
      "code": 800511,
      "name": "洛川县" },
    {
      "code": 800510,
      "name": "富县" },
    {
      "code": 800509,
      "name": "甘泉县" },
    {
      "code": 800508,
      "name": "吴起县" },
    {
      "code": 800507,
      "name": "志丹县" },
    {
      "code": 800506,
      "name": "安塞县" },
    {
      "code": 800505,
      "name": "子长县" },
    {
      "code": 800504,
      "name": "延川县" },
    {
      "code": 800503,
      "name": "延长县" },
    {
      "code": 800502,
      "name": "宝塔区" }] },

  {
    "code": 8004,
    "name": "渭南市",
    "sub": [{
      "code": 800413,
      "name": "高新区" },
    {
      "code": 800412,
      "name": "华阴市" },
    {
      "code": 800411,
      "name": "韩城市" },
    {
      "code": 800410,
      "name": "富平县" },
    {
      "code": 800409,
      "name": "白水县" },
    {
      "code": 800408,
      "name": "蒲城县" },
    {
      "code": 800407,
      "name": "澄城县" },
    {
      "code": 800406,
      "name": "合阳县" },
    {
      "code": 800405,
      "name": "大荔县" },
    {
      "code": 800404,
      "name": "潼关县" },
    {
      "code": 800403,
      "name": "华县" },
    {
      "code": 800402,
      "name": "临渭区" }] },

  {
    "code": 8003,
    "name": "咸阳市",
    "sub": [{
      "code": 800315,
      "name": "兴平市" },
    {
      "code": 800314,
      "name": "武功县" },
    {
      "code": 800313,
      "name": "淳化县" },
    {
      "code": 800312,
      "name": "旬邑县" },
    {
      "code": 800311,
      "name": "长武县" },
    {
      "code": 800310,
      "name": "彬县" },
    {
      "code": 800309,
      "name": "永寿县" },
    {
      "code": 800308,
      "name": "礼泉县" },
    {
      "code": 800307,
      "name": "乾县" },
    {
      "code": 800306,
      "name": "泾阳县" },
    {
      "code": 800305,
      "name": "三原县" },
    {
      "code": 800304,
      "name": "渭城区" },
    {
      "code": 800302,
      "name": "秦都区" }] },

  {
    "code": 8002,
    "name": "宝鸡市",
    "sub": [{
      "code": 800214,
      "name": "高新区" },
    {
      "code": 800213,
      "name": "太白县" },
    {
      "code": 800212,
      "name": "凤县" },
    {
      "code": 800211,
      "name": "麟游县" },
    {
      "code": 800210,
      "name": "千阳县" },
    {
      "code": 800209,
      "name": "陇县" },
    {
      "code": 800208,
      "name": "眉县" },
    {
      "code": 800207,
      "name": "扶风县" },
    {
      "code": 800206,
      "name": "岐山县" },
    {
      "code": 800205,
      "name": "凤翔县" },
    {
      "code": 800204,
      "name": "陈仓区" },
    {
      "code": 800203,
      "name": "金台区" },
    {
      "code": 800202,
      "name": "渭滨区" }] },

  {
    "code": 8001,
    "name": "西安市",
    "sub": [{
      "code": 800116,
      "name": "高新区" },
    {
      "code": 800115,
      "name": "经济开发区" },
    {
      "code": 800114,
      "name": "高陵县" },
    {
      "code": 800113,
      "name": "户县" },
    {
      "code": 800112,
      "name": "周至县" },
    {
      "code": 800111,
      "name": "蓝田县" },
    {
      "code": 800110,
      "name": "长安区" },
    {
      "code": 800109,
      "name": "临潼区" },
    {
      "code": 800108,
      "name": "阎良区" },
    {
      "code": 800107,
      "name": "雁塔区" },
    {
      "code": 800106,
      "name": "未央区" },
    {
      "code": 800105,
      "name": "灞桥区" },
    {
      "code": 800104,
      "name": "莲湖区" },
    {
      "code": 800103,
      "name": "碑林区" },
    {
      "code": 800102,
      "name": "新城区" }] }] },


{
  "code": 81,
  "name": "青海省",
  "sub": [{
    "code": 8108,
    "name": "玉树州",
    "sub": [{
      "code": 810806,
      "name": "曲麻莱县" },
    {
      "code": 810805,
      "name": "囊谦县" },
    {
      "code": 810804,
      "name": "治多县" },
    {
      "code": 810803,
      "name": "称多县" },
    {
      "code": 810802,
      "name": "杂多县" },
    {
      "code": 810801,
      "name": "玉树县" }] },

  {
    "code": 8107,
    "name": "果洛州",
    "sub": [{
      "code": 810706,
      "name": "玛多县" },
    {
      "code": 810705,
      "name": "久治县" },
    {
      "code": 810704,
      "name": "达日县" },
    {
      "code": 810703,
      "name": "甘德县" },
    {
      "code": 810702,
      "name": "班玛县" },
    {
      "code": 810701,
      "name": "玛沁县" }] },

  {
    "code": 8106,
    "name": "黄南州",
    "sub": [{
      "code": 810604,
      "name": "河南县" },
    {
      "code": 810603,
      "name": "泽库县" },
    {
      "code": 810602,
      "name": "尖扎县" },
    {
      "code": 810601,
      "name": "同仁县" }] },

  {
    "code": 8105,
    "name": "海西蒙古族州",
    "sub": [{
      "code": 810505,
      "name": "天峻县" },
    {
      "code": 810504,
      "name": "都兰县" },
    {
      "code": 810503,
      "name": "乌兰县" },
    {
      "code": 810502,
      "name": "德令哈市" },
    {
      "code": 810501,
      "name": "格尔木市" }] },

  {
    "code": 8104,
    "name": "海北州",
    "sub": [{
      "code": 810404,
      "name": "刚察县" },
    {
      "code": 810403,
      "name": "海晏县" },
    {
      "code": 810402,
      "name": "祁连县" },
    {
      "code": 810401,
      "name": "门源县" }] },

  {
    "code": 8103,
    "name": "海南州",
    "sub": [{
      "code": 810305,
      "name": "贵南县" },
    {
      "code": 810304,
      "name": "兴海县" },
    {
      "code": 810303,
      "name": "贵德县" },
    {
      "code": 810302,
      "name": "同德县" },
    {
      "code": 810301,
      "name": "共和县" }] },

  {
    "code": 8102,
    "name": "海东地区",
    "sub": [{
      "code": 810206,
      "name": "循化县" },
    {
      "code": 810205,
      "name": "化隆县" },
    {
      "code": 810204,
      "name": "互助县" },
    {
      "code": 810203,
      "name": "乐都县" },
    {
      "code": 810202,
      "name": "民和县" },
    {
      "code": 810201,
      "name": "平安县" }] },

  {
    "code": 8101,
    "name": "西宁市",
    "sub": [{
      "code": 810108,
      "name": "湟源县" },
    {
      "code": 810107,
      "name": "湟中县" },
    {
      "code": 810106,
      "name": "大通县" },
    {
      "code": 810105,
      "name": "城北区" },
    {
      "code": 810104,
      "name": "城西区" },
    {
      "code": 810103,
      "name": "城中区" },
    {
      "code": 810102,
      "name": "城东区" }] }] },


{
  "code": 82,
  "name": "宁夏",
  "sub": [{
    "code": 8205,
    "name": "中卫市",
    "sub": [{
      "code": 820504,
      "name": "海原县" },
    {
      "code": 820503,
      "name": "中宁县" },
    {
      "code": 820502,
      "name": "沙坡头区" }] },

  {
    "code": 8204,
    "name": "固原市",
    "sub": [{
      "code": 820406,
      "name": "彭阳县" },
    {
      "code": 820405,
      "name": "泾源县" },
    {
      "code": 820404,
      "name": "隆德县" },
    {
      "code": 820403,
      "name": "西吉县" },
    {
      "code": 820402,
      "name": "原州区" }] },

  {
    "code": 8203,
    "name": "吴忠市",
    "sub": [{
      "code": 820305,
      "name": "青铜峡市" },
    {
      "code": 820304,
      "name": "同心县" },
    {
      "code": 820303,
      "name": "盐池县" },
    {
      "code": 820302,
      "name": "利通区" }] },

  {
    "code": 8202,
    "name": "石嘴山市",
    "sub": [{
      "code": 820204,
      "name": "平罗县" },
    {
      "code": 820203,
      "name": "惠农区" },
    {
      "code": 820202,
      "name": "大武口区" }] },

  {
    "code": 8201,
    "name": "银川市",
    "sub": [{
      "code": 820107,
      "name": "灵武市" },
    {
      "code": 820106,
      "name": "贺兰县" },
    {
      "code": 820105,
      "name": "永宁县" },
    {
      "code": 820104,
      "name": "金凤区" },
    {
      "code": 820103,
      "name": "西夏区" },
    {
      "code": 820102,
      "name": "兴庆区" }] }] },


{
  "code": 83,
  "name": "新疆",
  "sub": [{
    "code": 8318,
    "name": "图木舒克市" },
  {
    "code": 8317,
    "name": "阿拉尔市" },
  {
    "code": 8316,
    "name": "五家渠市" },
  {
    "code": 8315,
    "name": "石河子市" },
  {
    "code": 8314,
    "name": "克拉玛依市",
    "sub": [{
      "code": 831405,
      "name": "乌尔禾区" },
    {
      "code": 831404,
      "name": "白碱滩区" },
    {
      "code": 831403,
      "name": "克拉玛依区" },
    {
      "code": 831402,
      "name": "独山子区" }] },

  {
    "code": 8313,
    "name": "喀什地区",
    "sub": [{
      "code": 831312,
      "name": "塔什库尔干" },
    {
      "code": 831311,
      "name": "巴楚县" },
    {
      "code": 831310,
      "name": "伽师县" },
    {
      "code": 831309,
      "name": "岳普湖县" },
    {
      "code": 831308,
      "name": "麦盖提县" },
    {
      "code": 831307,
      "name": "叶城县" },
    {
      "code": 831306,
      "name": "莎车县" },
    {
      "code": 831305,
      "name": "泽普县" },
    {
      "code": 831304,
      "name": "英吉沙县" },
    {
      "code": 831303,
      "name": "疏勒县" },
    {
      "code": 831302,
      "name": "疏附县" },
    {
      "code": 831301,
      "name": "喀什市" }] },

  {
    "code": 8312,
    "name": "克孜勒苏",
    "sub": [{
      "code": 831204,
      "name": "乌恰县" },
    {
      "code": 831203,
      "name": "阿合奇县" },
    {
      "code": 831202,
      "name": "阿克陶县" },
    {
      "code": 831201,
      "name": "阿图什市" }] },

  {
    "code": 8311,
    "name": "阿克苏地区",
    "sub": [{
      "code": 831109,
      "name": "柯坪县" },
    {
      "code": 831108,
      "name": "阿瓦提县" },
    {
      "code": 831107,
      "name": "乌什县" },
    {
      "code": 831106,
      "name": "拜城县" },
    {
      "code": 831105,
      "name": "新和县" },
    {
      "code": 831104,
      "name": "沙雅县" },
    {
      "code": 831103,
      "name": "库车县" },
    {
      "code": 831102,
      "name": "温宿县" },
    {
      "code": 831101,
      "name": "阿克苏市" }] },

  {
    "code": 8310,
    "name": "和田地区",
    "sub": [{
      "code": 831008,
      "name": "民丰县" },
    {
      "code": 831007,
      "name": "于田县" },
    {
      "code": 831006,
      "name": "策勒县" },
    {
      "code": 831005,
      "name": "洛浦县" },
    {
      "code": 831004,
      "name": "皮山县" },
    {
      "code": 831003,
      "name": "墨玉县" },
    {
      "code": 831002,
      "name": "和田县" },
    {
      "code": 831001,
      "name": "和田市" }] },

  {
    "code": 8309,
    "name": "哈密地区",
    "sub": [{
      "code": 830903,
      "name": "伊吾县" },
    {
      "code": 830902,
      "name": "巴里坤县" },
    {
      "code": 830901,
      "name": "哈密市" }] },

  {
    "code": 8308,
    "name": "巴音郭楞",
    "sub": [{
      "code": 830809,
      "name": "博湖县" },
    {
      "code": 830808,
      "name": "和硕县" },
    {
      "code": 830807,
      "name": "和静县" },
    {
      "code": 830806,
      "name": "焉耆县" },
    {
      "code": 830805,
      "name": "且末县" },
    {
      "code": 830804,
      "name": "若羌县" },
    {
      "code": 830803,
      "name": "尉犁县" },
    {
      "code": 830802,
      "name": "轮台县" },
    {
      "code": 830801,
      "name": "库尔勒市" }] },

  {
    "code": 8307,
    "name": "吐鲁番地区",
    "sub": [{
      "code": 830703,
      "name": "托克逊县" },
    {
      "code": 830702,
      "name": "鄯善县" },
    {
      "code": 830701,
      "name": "吐鲁番市" }] },

  {
    "code": 8306,
    "name": "昌吉",
    "sub": [{
      "code": 830608,
      "name": "高新区" },
    {
      "code": 830607,
      "name": "木垒县" },
    {
      "code": 830606,
      "name": "吉木萨尔县" },
    {
      "code": 830605,
      "name": "奇台县" },
    {
      "code": 830604,
      "name": "玛纳斯县" },
    {
      "code": 830603,
      "name": "呼图壁县" },
    {
      "code": 830602,
      "name": "阜康市" },
    {
      "code": 830601,
      "name": "昌吉市" }] },

  {
    "code": 8305,
    "name": "博尔塔拉",
    "sub": [{
      "code": 830503,
      "name": "温泉县" },
    {
      "code": 830502,
      "name": "精河县" },
    {
      "code": 830501,
      "name": "博乐市" }] },

  {
    "code": 8304,
    "name": "塔城地区",
    "sub": [{
      "code": 830407,
      "name": "和布克赛尔" },
    {
      "code": 830406,
      "name": "裕民县" },
    {
      "code": 830405,
      "name": "托里县" },
    {
      "code": 830404,
      "name": "沙湾县" },
    {
      "code": 830403,
      "name": "额敏县" },
    {
      "code": 830402,
      "name": "乌苏市" },
    {
      "code": 830401,
      "name": "塔城市" }] },

  {
    "code": 8303,
    "name": "阿勒泰地区",
    "sub": [{
      "code": 830307,
      "name": "吉木乃县" },
    {
      "code": 830306,
      "name": "青河县" },
    {
      "code": 830305,
      "name": "哈巴河县" },
    {
      "code": 830304,
      "name": "福海县" },
    {
      "code": 830303,
      "name": "富蕴县" },
    {
      "code": 830302,
      "name": "布尔津县" },
    {
      "code": 830301,
      "name": "阿勒泰市" }] },

  {
    "code": 8302,
    "name": "伊犁州",
    "sub": [{
      "code": 830210,
      "name": "尼勒克县" },
    {
      "code": 830209,
      "name": "特克斯县" },
    {
      "code": 830208,
      "name": "昭苏县" },
    {
      "code": 830207,
      "name": "新源县" },
    {
      "code": 830206,
      "name": "巩留县" },
    {
      "code": 830205,
      "name": "霍城县" },
    {
      "code": 830204,
      "name": "察布查尔" },
    {
      "code": 830203,
      "name": "伊宁县" },
    {
      "code": 830202,
      "name": "奎屯市" },
    {
      "code": 830201,
      "name": "伊宁市" }] },

  {
    "code": 8301,
    "name": "乌鲁木齐市",
    "sub": [{
      "code": 830110,
      "name": "新市区(高新区)" },
    {
      "code": 830109,
      "name": "乌鲁木齐县" },
    {
      "code": 830108,
      "name": "米东区" },
    {
      "code": 830107,
      "name": "达坂城区" },
    {
      "code": 830106,
      "name": "头屯河区(开发区)" },
    {
      "code": 830105,
      "name": "水磨沟区" },
    {
      "code": 830103,
      "name": "沙依巴克区" },
    {
      "code": 830102,
      "name": "天山区" }] }] },


{
  "code": 84,
  "name": "甘肃省",
  "sub": [{
    "code": 8414,
    "name": "甘南州",
    "sub": [{
      "code": 841408,
      "name": "夏河县" },
    {
      "code": 841407,
      "name": "碌曲县" },
    {
      "code": 841406,
      "name": "玛曲县" },
    {
      "code": 841405,
      "name": "迭部县" },
    {
      "code": 841404,
      "name": "舟曲县" },
    {
      "code": 841403,
      "name": "卓尼县" },
    {
      "code": 841402,
      "name": "临潭县" },
    {
      "code": 841401,
      "name": "合作市" }] },

  {
    "code": 8413,
    "name": "临夏",
    "sub": [{
      "code": 841308,
      "name": "积石山县" },
    {
      "code": 841307,
      "name": "东乡族自治县" },
    {
      "code": 841306,
      "name": "和政县" },
    {
      "code": 841305,
      "name": "广河县" },
    {
      "code": 841304,
      "name": "永靖县" },
    {
      "code": 841303,
      "name": "康乐县" },
    {
      "code": 841302,
      "name": "临夏县" },
    {
      "code": 841301,
      "name": "临夏市" }] },

  {
    "code": 8412,
    "name": "陇南市",
    "sub": [{
      "code": 841210,
      "name": "两当县" },
    {
      "code": 841209,
      "name": "徽县" },
    {
      "code": 841208,
      "name": "礼县" },
    {
      "code": 841207,
      "name": "西和县" },
    {
      "code": 841206,
      "name": "康县" },
    {
      "code": 841205,
      "name": "宕昌县" },
    {
      "code": 841204,
      "name": "文县" },
    {
      "code": 841203,
      "name": "成县" },
    {
      "code": 841202,
      "name": "武都区" }] },

  {
    "code": 8411,
    "name": "定西市",
    "sub": [{
      "code": 841108,
      "name": "岷县" },
    {
      "code": 841107,
      "name": "漳县" },
    {
      "code": 841106,
      "name": "临洮县" },
    {
      "code": 841105,
      "name": "渭源县" },
    {
      "code": 841104,
      "name": "陇西县" },
    {
      "code": 841103,
      "name": "通渭县" },
    {
      "code": 841102,
      "name": "安定区" }] },

  {
    "code": 8410,
    "name": "白银市",
    "sub": [{
      "code": 841007,
      "name": "高新区" },
    {
      "code": 841006,
      "name": "景泰县" },
    {
      "code": 841005,
      "name": "会宁县" },
    {
      "code": 841004,
      "name": "靖远县" },
    {
      "code": 841003,
      "name": "平川区" },
    {
      "code": 841002,
      "name": "白银区" }] },

  {
    "code": 8409,
    "name": "平凉市",
    "sub": [{
      "code": 840908,
      "name": "静宁县" },
    {
      "code": 840907,
      "name": "庄浪县" },
    {
      "code": 840906,
      "name": "华亭县" },
    {
      "code": 840905,
      "name": "崇信县" },
    {
      "code": 840904,
      "name": "灵台县" },
    {
      "code": 840903,
      "name": "泾川县" },
    {
      "code": 840902,
      "name": "崆峒区" }] },

  {
    "code": 8408,
    "name": "庆阳市",
    "sub": [{
      "code": 840809,
      "name": "镇原县" },
    {
      "code": 840808,
      "name": "宁县" },
    {
      "code": 840807,
      "name": "正宁县" },
    {
      "code": 840806,
      "name": "合水县" },
    {
      "code": 840805,
      "name": "华池县" },
    {
      "code": 840804,
      "name": "环县" },
    {
      "code": 840803,
      "name": "庆城县" },
    {
      "code": 840802,
      "name": "西峰区" }] },

  {
    "code": 8407,
    "name": "张掖市",
    "sub": [{
      "code": 840707,
      "name": "山丹县" },
    {
      "code": 840706,
      "name": "高台县" },
    {
      "code": 840705,
      "name": "临泽县" },
    {
      "code": 840704,
      "name": "民乐县" },
    {
      "code": 840703,
      "name": "肃南县" },
    {
      "code": 840702,
      "name": "甘州区" }] },

  {
    "code": 8406,
    "name": "酒泉市",
    "sub": [{
      "code": 840608,
      "name": "敦煌市" },
    {
      "code": 840607,
      "name": "玉门市" },
    {
      "code": 840606,
      "name": "阿克塞县" },
    {
      "code": 840605,
      "name": "肃北县" },
    {
      "code": 840604,
      "name": "瓜州县" },
    {
      "code": 840603,
      "name": "金塔县" },
    {
      "code": 840602,
      "name": "肃州区" }] },

  {
    "code": 8405,
    "name": "金昌市",
    "sub": [{
      "code": 840503,
      "name": "永昌县" },
    {
      "code": 840502,
      "name": "金川区" }] },

  {
    "code": 8404,
    "name": "武威市",
    "sub": [{
      "code": 840405,
      "name": "天祝县" },
    {
      "code": 840404,
      "name": "古浪县" },
    {
      "code": 840403,
      "name": "民勤县" },
    {
      "code": 840402,
      "name": "凉州区" }] },

  {
    "code": 8403,
    "name": "嘉峪关市" },
  {
    "code": 8402,
    "name": "天水市",
    "sub": [{
      "code": 840208,
      "name": "张家川县" },
    {
      "code": 840207,
      "name": "武山县" },
    {
      "code": 840206,
      "name": "甘谷县" },
    {
      "code": 840205,
      "name": "秦安县" },
    {
      "code": 840204,
      "name": "清水县" },
    {
      "code": 840203,
      "name": "麦积区" },
    {
      "code": 840202,
      "name": "秦州区" }] },

  {
    "code": 8401,
    "name": "兰州市",
    "sub": [{
      "code": 840109,
      "name": "榆中县" },
    {
      "code": 840108,
      "name": "皋兰县" },
    {
      "code": 840107,
      "name": "永登县" },
    {
      "code": 840106,
      "name": "红古区" },
    {
      "code": 840105,
      "name": "安宁区" },
    {
      "code": 840104,
      "name": "西固区" },
    {
      "code": 840103,
      "name": "七里河区" },
    {
      "code": 840102,
      "name": "城关区" }] }] }];




// 多页面重复时间 - 单个项目 -edn --------------------------------------------- 



module.exports = _objectSpread(_objectSpread({
  city_data: city_data },
project_fn), {}, {

  // toFixed,


  // isJSON,    // 判断字符串是否为json格式

  setData: setData,
  set_pages: set_pages, // 页面名称简化 用于app.js

  var_path_split: var_path_split, // 变量路径拆分 需要页面this
  dataset: dataset, // 设置自定义参数 需要事件event

  getUrl: getUrl, // 判断请求网站, 是否添加前缀;  getUrl(url);
  delayJump: delayJump, // 延迟跳转
  buildRequest: buildRequest, // 网络请求 对象参数
  request: request, // 网络请求 一对一参数
  toastTip: toastTip, // 提示信息
  loadTip: loadTip, // 提示加载信息
  //get_list, // 获取列表, 依赖1.request函数; 2.toastTip函数 需要页面this

  login_check: login_check, // 登录检测
  jump: jump, // 页面跳转, 依赖1.request函数; 2.login_check函数

  input_set_value: input_set_value, // 输入框修改属性 需要页面this

  set_value: set_value, // 设置属性值 需要页面this

  count_value: count_value, // 增减属性值 需要页面this

  event_false: event_false, // 阻止事件冒泡
  stop_swiper: stop_swiper, // 禁止滑动

  showToast: showToast, // 显示提示
  show_modal: show_modal, // 确认对话框

  do_fns: do_fns, // 执行多个方法 需要页面this

  uploadFiles: uploadFiles, // 上传文件 递归调用 需要页面this



  create_dataset: create_dataset, // 创建dataset

  http_dataset: http_dataset, // 发送请求 dataset参数 需要页面this

  get_addr: get_addr, // 获取地址

  //  get_addr_info, // 根据 经纬度 获取地址

  onReady: onReady, //页面加载完成函数

  set_glo: set_glo, //设置全局变量
  set_stor: set_stor, // 设置缓存

  obj_value_empty: obj_value_empty, //判断对象属性值是否存在空

  popup_fn: popup_fn, // 弹框事件

  // submit, // 默认表单提交事件

  judge_auth: judge_auth, // 判断授权

  // do_app_fn, // 使用app方法
  // do_app_fns, // 使用app多个方法


  get_codes: get_codes, // 测试获取未使用的code

  // set_stro, // 设置缓存

  // do_wx, // 使用微信的方法

  getFormId: getFormId, // 收集formID


  console_log: console_log, // 打印
  // formSubmit, //表单提交
  set_navName: set_navName, // 修改导航栏标题


  chose_back: chose_back, // 选择_返回操作
  get_chose: get_chose, // 获取_选择页返回数据

  chooseLocation: chooseLocation, // 打开地图选择位置

  judge_login: judge_login, // 判断登陆

  judge_login_back: judge_login_back, // 判断登陆_回调

  urlEncode: urlEncode });
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map