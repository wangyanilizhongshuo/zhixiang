


/*Created by junhua Ma*/
/****************全局变量配置************/
function Config() {
    this.config = function () {
        var param = {
            url: 'config/list',
            data: [{
            }]
        }
        ajaxFunction.common(param, configOk);
    }
}

/****************首页*************/
function Index(){
    //轮播
    this.getBanner = function () {
        var param = {
            url: 'selectBannerList',
            data: [{
                page: 1
            }]
        }
        ajaxFunction.common(param, getBannerOk);

    }

    //导航栏水果分类列表
    this.getClassList = function () {
        var param = {
            url: 'classList',
            data: [{
                page: 1
            }]
        }
        ajaxFunction.common(param, getClassListOk);
    }


    //获取优惠券列表
    this.getDiscount = function () {
        var param = {
            url: 'couponsList',
            data: [{
                page: 1
            }]
        }
        ajaxFunction.common(param, getDiscountOk);
    }
    //获取逢8红包列表
    this.indexCoupon = function () {
        if ($.cookie("userData")) {
            var userData = JSON.parse($.cookie("userData"));
            var id = userData.user.id;
            var token = userData.token;
        }

        var param = {
            url: 'red/getMerRed',
            data: [{
                userId: id,
                token: token,
            }]
        }
        ajaxFunction2.common(param, indexCouponOk);
    }

      //获取首页快速抢购
      this.indexbanner = function (){
        var param = {
            url: 'bannergoods/list',
            data: [{
                page: 1,
                pageSize:1,
            }]
        }
        ajaxFunction.common(param, indexbannerOk);
    }


    //领取优惠券
    this.getDiscountScu = function (id) {
        var param = {
            url: 'getCoupon',
            data: [{
                userId: webConfig.userData.id,
                couponsId: id
            }]
        }
        ajaxFunction.common(param, couponOk);
    }
    //商品列表(显示有数量限制)
    this.goodsList = function () {
        var param = {
            url: 'list',
            data: [{
            }]
        }
        ajaxFunction.common(param, getGoodsOk);
    }

    //标签列表
    this.labelList = function () {
        var param = {
            url: 'labelList',
            data: [{
                page: 1
            }]
        }
        ajaxFunction.common(param, getLabelListOk);
    }

    //标题列表
    this.titleList = function () {
        var param = {
            url: 'titleList',
            data: [{
                page: 1
            }]
        }
        ajaxFunction.common(param, getTitleListOk);
    }

    //今日热卖商品
    this.hotList = function (page) {
        var param = {
            url: 'hotList',
            data: [{
                page: page
            }]
        }
        ajaxFunction.common(param, getHotListOk);
    }

    this.bannermer = function () {//活动专题页
        if ($.cookie("userData")) {
            var userData = JSON.parse($.cookie("userData"));
            var merId = userData.user.mer_id;
        
        }
        var param = {
            url: 'bannermer/list',
            data: [{
                merId: merId
            }]
        }
        ajaxFunction.common(param, bannermerOk);
    }


}
/**********************用户注册、登录************************/
function user() {
    this.login = function () {
        var param = {
            url: 'user/login',
            data: [{
                phone: $("#phone").val(),
                password: $("#pwd").val(),
            }]
        }
        ajaxFunction.common(param, loginOk);

    }
    this.register = function () {
        var param = {
            url: 'user/register',
            data: [{
                nickname:$("#name").val(),
                phone: $("#phone").val(),
                code: $("#code").val(),
                password: $("#pwd2").val(),
                merId:$("#storeId").val(),
                inviteCode: $("#code").val()
            }]
        }
        ajaxFunction.common(param, getRegisterOk)
    },
        this.Code = function () {
            var param = {
                url: 'userverify/save',
                data: [{
                    phone: $("#phone").val(),
                    configCode: parseInt($("#phone").val()) + 100
                }]
            }
            ajaxFunction.common(param, codeOk);
        }



    this.codechange = function (code, phone) {
        var param = {
            url: 'user/resetPassByCode',
            data: [{
                code: code,
                phone: phone,
                password: $("#spw1").val(),
            }]
        }
        ajaxFunction.common(param, codechangeOk);
    }
}

/*********************获取code**************************/
function GetCode() {
    this.getCode = function () {
        var param = {
            url: 'wxLogin',
            data: [{
                CODE: code
            }]
        }
        ajaxFunction.common(param, getCodeOk, state);
    }
}

/***********************绑定手机************************/
function BindPhone() {
    this.getPhone = function () {
        var param = {
            url: 'bindPhone',
            data: [{
                phone: $("#phoneNum").val().trim(),
                code: $("#code").val().trim(),
                userId: webConfig.userData.id
            }]
        }
        ajaxFunction.common(param, bindPhoneOk);
    }
    this.getCode = function () {
        var param = {
            url: 'sendCode ',
            data: [{
                phone: $("#phoneNum").val().trim()
            }]
        }
        ajaxFunction.common(param, getCodeOk);
    }
    this.checkCode = function () {
        var param = {
            url: 'checkCode',
            data: [{
                phone: $("#phoneNum").val().trim(),
                code: $("#code").val().trim()
            }]
        }
        ajaxFunction.common(param, checkCodeOk);
    }
    this.changephone = function () {
        var param = {
            url: 'bindPhone',
            data: [{
                phone: $("#phoneNum").val().trim(),
                code: $("#code").val().trim(),
                userId: webConfig.userData.id
            }]
        }
        ajaxFunction.common(param, changephoneOk);
    }
}


/************支付密码修改*************/
function PayToken() {
    this.isRepeat = function () {
        var passW = localStorage.payToken;
        var param = {
            url: 'isRepeat',
            data: [{
                userId: webConfig.userData.id,
                payToken: passW
            }]
        }
        ajaxFunction.common(param, notRepeat);
    }
    this.setPayToken = function () {
        var passW = localStorage.payToken;
        var code = localStorage.code;
        var param = {
            url: 'setPayToken',
            data: [{
                userId: webConfig.userData.id,
                payToken: passW,
                code: code
            }]
        }
        ajaxFunction.common(param, setPayOk);
    }
}


/*****************用户信息****************/
function GetInfo() {
    if ($.cookie("userData")) {
        var userData = JSON.parse($.cookie("userData"));
        var token = userData.token;
        var id = userData.user.id;
    }

    this.getInfo = function () {
        var param = {
            url: 'user/info/' + id,
            data: [{

            }]
        }
        ajaxFunction.common(param, getInfoOk);
    }
    this.updateInfo = function () {//更改用户名
        var param = {
            url: 'user/update',
            data: [{
                userId: id,
                token: token,
                nickname: $("#name").val()

            }]
        }
        ajaxFunction.common(param, updateInfoOk);
    }
    this.birthday = function (birthday) {//更改出生日期
        var param = {
            url: 'user/update',
            data: [{
                userId: id,
                token: token,
                birthday: birthday,

            }]
        }
        ajaxFunction.common(param, birthdayOk);
    }
    this.uploader = function (head_photo) {//上传头像
        var param = {
            url: 'user/update',
            data: [{
                userId: id,
                token: token,
                head_photo: head_photo

            }]
        }
        ajaxFunction.common(param, uploaderOk);
    }
}

/****************收货地址*******************/
function Address() {
    if ($.cookie("userData")) {
        var userData = JSON.parse($.cookie("userData"));
        var token = userData.token;
        var id = userData.user.id;
    }
    //获取地址列表
    this.address = function () {
        var param = {
            url: 'address/list',
            data: [{
                token: token,
                userId: id,
            }]
        }
        ajaxFunction.common(param, getAddressOk);
    }

    //添加地址
    this.addAddress = function () {
        var param = {
            url: 'address/save',
            data: [{
                token: token,
                userId: id,
                addresses: $("#re-name").val(),
                address: $("#address-de").val(),
                phone: $("#re-phone").val(),
                is_default: Number($("#check").is(":checked")),
                province_id: 35,
                city_id: 3506,
                area_id: 350602

            }]
        }
        ajaxFunction.common(param, addAddressOk);
    }

    //修改地址
    this.upAddress = function () {
        if ($.cookie("userData")) {
            var addressId = JSON.parse(localStorage.getItem("addressId"));
        }

        var param = {
            url: 'address/update',
            data: [{
                id: addressId,
                userId: id,
                isDefault: 1
            }]
        }
        ajaxFunction.common(param, upAddressOk);
    }

    //编辑里的修改地址
    this.editAddress = function () {
        var addressId = getQueryString("type");
        var param = {
            url: 'address/update',
            data: [{
                id: addressId,
                userId: webConfig.userData.id,
                addresses: $("#re-name").val().trim(),
                phone: $("#re-phone").val().trim(),
                province: $("#city-picker").val().trim(),
                address: $("#address-de").val().trim(),
                isDefault: Number($("#check").is(":checked"))
            }]
        }
        ajaxFunction.common(param, editAddressOk);
    }
    //删除地址
    this.deAddress = function () {
        /*        var addressId = JSON.parse(localStorage.getItem("addressDe"));*/
        if ($.cookie("userData")) {
            var addressId = JSON.parse(localStorage.getItem("addressDe"))
        }
        var addressId = $("#addressList #address").attr("data-ad-del");
        var param = {
            url: 'address/delete',
            data: [{
                id: addressId
            }]
        }
        ajaxFunction.common(param, deAddressOk);
    }
}


/**************消息通知***********/
function Inform() {
    //获取消息
    this.getInform = function (page, type) {
        var param = {
            url: 'msgList',
            data: [{
                userId: webConfig.userData.id,
                page: page,
                type: type
            }]
        }
        ajaxFunction.common(param, getInformOk);
    }

    //已全部阅读消息
    this.isRead = function () {
        var param = {
            url: 'readAll',
            data: [{
                userId: webConfig.userData.id
            }]
        }
        ajaxFunction.common(param, isReadOk);
    }
    //删除消息
    this.deleteMsg = function (id) {
        var param = {
            url: 'deleteMsgById',
            data: [{
                id: id
            }]
        }
        ajaxFunction.common(param, deleteMsgOk);
    }
}

/**************加盟*************/
function Join() {
    this.join = function () {
        var param = {
            url: 'addJoin',
            data: [{
                realName: $("#realName").val().trim(),
                phone: $("#phone").val().trim(),
                dak: $("#dakId").val().trim(),
                service: $("#service").val().trim(),
                type: Number($("#check").is(":checked"))
            }]
        }
        ajaxFunction.common(param, joinOk);
    }
}


/************水果分类*************/
function FruitMenu() {
    //获取左栏的分类
    this.getFruitMenu = function () {
        var param = {
            url: 'classList',
            data: [{
                page: 1
            }]
        }
        ajaxFunction.common(param, getFruitMenuOk);
    }

    //搜索功能
    this.searchFruit = function (page, name) {
        var param = {
            url: 'selectGoods',
            data: [{
                page: page,
                name: name
            }]
        }
        ajaxFunction.common(param, searchOk);
    }

    //分类详情
    this.menuDetail = function (id, page) {
        var param = {
            url: 'goodsByClass',
            data: [{
                classId: id,
                page: page
            }]
        }
        ajaxFunction.common(param, getDetailOk);
    }

    //特价专区（可更换）
    this.fruitGoods = function (page) {
        var param = {
            url: 'goods',
            data: [{
                type: 1,
                page: page
            }]
        }
        ajaxFunction.common(param, getFruitOk);
    }
}

/****************商品详情（包含拼团详情）**************/
function ProductDetail() {
    //获取商品详情
    this.getProductDetail = function (id) {
        var param = {
            url: 'toupdateGoods',
            data: [{
                userId: webConfig.userData.id,
                id: id
            }]
        }
        ajaxFunction.common(param, getProductOk);
    }

    //加入购物车
    this.addCar = function (goodsId, buyNum) {
        var param = {
            url: 'addShoppingCar',
            data: [{
                goodsId: goodsId,
                userId: webConfig.userData.id,
                buyNum: buyNum
            }]
        }
        ajaxFunction.common(param, addCarOk);
    }
}

/***************拼团界面**************/
function Group() {
    //获取拼团商品
    this.getGroup = function (page) {
        var param = {
            url: 'goods',
            data: [{
                isGroup: 1,
                page: page
            }]
        }
        ajaxFunction.common(param, getGroupOk);
    }
}
/***砍价商品详情***/
function bargaingetGoods(id) {
    if ($.cookie("userData")) {
        var userData = JSON.parse($.cookie("userData"));
    }

    var param = {
        url: 'bargainevent/info',
        data: [{
            id: id,
            token: userData.token,
            userId: userData.user.id
        }]
    }
    ajaxFunction.common(param, bargaingetGoodsOk);
}
/***砍价操作***/
function bargainhistory(id) {
    if ($.cookie("userData")) {
        var userData = JSON.parse($.cookie("userData"));
    }
    var param = {
        url: 'bargainhistory/save',
        data: [{
            bargainId: id,
            token: userData.token,
            userId: userData.user.id
        }]
    }
    ajaxFunction2.common(param, bargainhistoryOk);
}



/****************购物车页面***************/
function ShopCar() {
    //获取购物车列表
    this.shopCar = function (page) {
        var param = {
            url: 'showShoppingCar',
            data: [{
                userId: webConfig.userData.id,
                page: page
            }]
        }
        ajaxFunction.common(param, getShopCarOk);
    }
    //修改购物车
    this.updateShoppingCar = function (id, num) {
        var param = {
            url: 'updateShoppingCar',
            data: [{
                id: id,
                userId: webConfig.userData.id,
                buyNum: num
            }]
        }
        ajaxFunction.common(param, updateCarOk);
    }
    //删除购物车
    this.deleteShoppingCar = function (id) {
        var param = {
            url: 'deleteShoppingCar',
            data: [{
                id: id
            }]
        }
        ajaxFunction.common(param, deleteCarOk);
    }
    //支付购物车
    this.payShopCar = function () {
        if ($.cookie("userData")) {
            var orderData = JSON.parse(localStorage.orderData);
        }

        var carId = orderData.carId.join(",");
        var param = {
            url: 'payShoppingCar',
            data: [{
                ids: carId,
                userId: webConfig.userData.id,
                addressId: orderData.address,
                isIntegral: orderData.isIntegral,
                isCoupon: orderData.isCoupon,
                couponsId: orderData.couponsId,
                addressType: orderData.addressType,
                dakId: orderData.dakId
            }]
        }
        ajaxFunction.common(param, payShopOk);
    }
    //微信支付购物车
    this.weiXinPay = function () {
        if ($.cookie("userData")) {
            var id = JSON.parse(localStorage.payOrder);
        }

        var param = {
            url: 'payOrder',
            data: [{
                bigOrderId: id,
                userId: webConfig.userData.id,
                payType: 1
            }]
        }
        ajaxFunction.common2(param, weiPayOk);
    }
}

/*****************驿站*******************/
function ChoosePost() {
    //省
    this.province = function () {
        var param = {
            url: 'privinceList',
            data: [{}]
        }
        ajaxFunction.common(param, getProvinceOk);
    }
    //市
    this.city = function (id) {
        var param = {
            url: 'cityList',
            data: [{
                provinceId: id
            }]
        }
        ajaxFunction.common(param, getCityOk);
    }
    //区县
    this.area = function (id) {
        var param = {
            url: 'areaList',
            data: [{
                cityId: id
            }]
        }
        ajaxFunction.common(param, getAreaOk);
    }
    //获取驿站地址
    this.getPost = function (areaId, page, cityId) {
        var param = {
            url: 'dak',
            data: [{
                areaId: areaId,
                page: page,
                cityId: cityId
            }]
        }
        ajaxFunction.common(param, getPostOk);
    }
}


/***************用户积分页面*************/
function Integral() {
    this.getIntegral = function (page) {
        var param = {
            url: 'userIntegral',
            data: [{
                page: page,
                userId: webConfig.userData.id
            }]
        }
        ajaxFunction.common(param, getIntegralOk);
    }
    //积分、钱包规则
    this.ruleList = function (type) {
        var param = {
            url: 'ruleList',
            data: [{
                type: type
            }]
        }
        ajaxFunction.common(param, getRuleOk);
    }
}

/**************用户优惠券列表*************/
function UserCoupon() {
    this.getCoupon = function (page) {
        var param = {
            url: 'selectCoupon',
            data: [{
                userId: webConfig.userData.id,
                /*                page: page*/
            }]
        }
        ajaxFunction.common(param, getCouponOk);
    }
}

/****************用户钱包界面*************/
function UserWallet() {
    //钱包历史明细
    this.getWallet = function () {
        var param = {
            url: 'userMoney',
            data: [{
                page: 1,
                userId: webConfig.userData.id
            }]
        }
        ajaxFunction.common(param, getWalletOk);
    }
    //钱包充值列表
    this.walletList = function () {
        var param = {
            url: 'buttonList',
            data: [{}]
        }
        ajaxFunction.common(param, getWalletListOk);
    }
    //钱包充值
    this.recharge = function (id) {
        var param = {
            url: 'recharge',
            data: [{
                userId: webConfig.userData.id,
                buttonId: id,
                payType: 1,
            }]
        }
        ajaxFunction.common(param, rechargeOk);
    }
}

/******************订单界面************/
function OrderDetail() { //	
    //获取全部订单
    if ($.cookie("userData")) {
        var userData = JSON.parse(localStorage.getItem("userData"));
        var userId = userData.user.id;
        var token = userData.token;
    }
    this.getAllOrder = function (page, status) {
        var param = {
            url: 'orderList',
            data: [{
                userId: webConfig.userData.id,
                page: page,
                status: status
            }]
        }
        ajaxFunction.common(param, getOrderOk);
    }

    //查询订单详情
    this.orderInfo = function (id) {
        var param = {
            url: 'orderInfo',
            data: [{
                id: id
            }]
        }
        ajaxFunction.common(param, getInfoOk);
    }

    //待付款支付
    this.payOrder = function (psw, orderId) {

        if ($.cookie("userData")) {
            var userData = JSON.parse(localStorage.getItem("userData"));
        }
        var param = {
            url: 'api/payOrder',
            data: [{
                merOrderId: orderId,
                userId: userData.user.id,
                payType: 3,
                token: userData.token,
                password: psw
            }]
        }
        ajaxFunction.common(param, payOrderOk);
    }
    //订单显示数量
    this.orderNum = function () {
        var param = {
            url: 'bigNum',
            data: [{
                userId: webConfig.userData.id
            }]
        }
        ajaxFunction.common(param, getOrderNumOk);
    }

    this.suborder = function (id,return_cmp,return_order) {
        var param = {
            url: 'suborder/returnInfo',
            data: [{
                userId:userId,
                token:token,
                id:id,
                return_cmp:return_cmp,
                return_order:return_order,
            }]
        }
        ajaxFunction.common(param, suborderOk);
    }


}
/***************开通会员支付***************/
function MemberPay() {
    this.goPay = function (password) {
        if ($.cookie("userData")) {
            var userData = JSON.parse(localStorage.getItem("userData"));
            var userId = userData.user.id;
            var token = userData.token
        }
        var param = {
            url: 'api/payVip',
            data: [{
                userId: userId,
                token: token,
                payType: 3,
                password: password,
            }]
        }
        ajaxFunction.common(param, goPayOk);
    }

}

/***************拼团支付页面***************/
function GroupPay() {
    this.groupPay = function () {
        if ($.cookie("userData")) {
            if (localStorage.groupData) {
                var groupData = JSON.parse(localStorage.groupData);
            }
        }

        var param = {
            url: 'group',
            data: [{
                userId: webConfig.userData.id,
                groupId: groupData.groupId,
                addressType: groupData.addressType,
                addressId: groupData.addressId,
                dakId: groupData.dakId,
            }]
        }
        ajaxFunction.common(param, groupPayOk);
    }
}

/****************钱包************/
function Wallet() {
    //钱包历史记录
    if ($.cookie("userData")) {
        var userData = JSON.parse($.cookie("userData"));
        var userId = userData.user.id;
        var token = userData.token;
    }

    this.userMoney = function (page) {
        var param = {
            url: 'userMoney',
            data: [{
                page: page,
                userId: webConfig.userData.id
            }]
        }
        ajaxFunction.common(param, getMoneyOk);
    }
    //提现
    this.pickMoney = function (money, type, name, account) {//支付宝提现
        var param = {
            url: 'userwithdraw/save',
            data: [{
                userId: userId,
                token: token,
                money: money,
                type: type,
                cardNum: account,
                realName: name,
            }]
        }
        ajaxFunction.common(param, pickMoneyOk);
    }
    this.pickMoney1 = function (money, type, name, account, bankName) {//银行卡提现
        var param = {
            url: 'userwithdraw/save',
            data: [{
                userId: userId,
                token: token,
                money: money,
                type: type,
                cardNum: account,//银卡卡号
                realName: name,//银卡账户姓名
                bankName: bankName,//银卡名称
            }]
        }
        ajaxFunction.common(param, pickMoneyOk);
    }
}
/***视频音频详情***/
function vedio() {
    if ($.cookie("userData")) {
        var userData = JSON.parse($.cookie("userData"));
        var userId = userData.user.id;
        var token = userData.token;
    }
    this.vedioinfo = function (id) {
        var param = {
            url: 'vedio/info/' + id,
            data: [{
                userId: userId,
                token: token,
            }]
        }
        ajaxFunction.common(param, vedioinfoOk);
    }
    //视频、音频提交答案
    
    /*this.vedioanswer = function (vedio_id,answer) {
        var param = {
            url: 'vedio/answer',
            data: [{
                userId: userId,
                token: token,
                vedio_id:vedio_id,
                answer:answer
            }]
        }
        ajaxFunction3.common(param, vedioanswerOk);
    }*/
}

/***快递计算***/
function express(){
    if ($.cookie("userData")) {
        var userData = JSON.parse($.cookie("userData"));
        var id = userData.user.id;
        var token = userData.token;
    }

    /**商品详情过来的 获取运费等信息***/
    this.createExpress = function (addressid, counts, repIds) {
        var param = {
            url: 'api/createOrder',
            data: [{
                userId: id,
                token: token,
                addressId: addressid,
                counts: counts,
                isFirst: 1,
                memo: "",
                payType: 1,
                repIds: repIds
            }]
        }
        ajaxFunction.common(param,createExpressOk);
    }
     /**购物车商品过来的 获取运费等信息***/
     this.cartExpress = function (addressid, cartIds) {
        var param = {
            url: 'api/createOrderByCart',
            data: [{
                userId: id,
                token: token,
                addressId: addressid,
                cartIds: cartIds,
                isFirst: 1
            }]
        }
        ajaxFunction.common(param, cartExpressOk);
    }
    /**砍价商品过来的 获取运费等信息***/
    this.bargainExpress = function (addressid, bargainId) {
        var param = {
            url: 'api/createBargainOrder',
            data: [{
                userId: id,
                token: token,
                addressId: addressid,
                bargainId:bargainId,
                counts:1,
                isFirst: 1
            }]
        }
        ajaxFunction.common(param, bargainExpressOk);
    }
}



/***********签到页面**********/
function Sign() {
    if ($.cookie("userData")) {
        var userData = JSON.parse(localStorage.getItem("userData"));
    }
    //获取签到任务
    this.taskList = function () {
        var param = {
            url: 'task/list',
            data: [{
                userId: userData.user.id,
                token:userData.token
            }]
        }
        ajaxFunction.common(param, taskListOk);
    }
    //签到
    this. usertaskSave = function (task_id){
        var param = {
            url: 'usertask/save',
            data: [{
                userId: userData.user.id,
                token:userData.token,
                task_id:task_id
            }]
        }
        ajaxFunction.common(param, usertaskSaveOk);
    }
   
}

/****竞拍***/
function bidevent() {
    if ($.cookie("userData")) {
        var userData = JSON.parse(localStorage.getItem("userData"));
        var userId = userData.user.id;
        var token = userData.token;
    }
    /****竞拍详情页***/
    this.bideventInfo = function (id) {
        var param = {
            url: '/bidevent/info',
            data: [{
                id: id
            }]
        }
        ajaxFunction.common(param, bideventInfoOk);
    }
    /****参与竞拍***/
    this.bideventSave = function (id, points) {
        var param = {
            url: '/bidhistory/save',
            data: [{
                userId: userId,
                token: token,
                points: points,
                bidEventId: id
            }]
        }
        ajaxFunction.common(param, bideventSaveOk);
    }
}


//分类
function getClass() {
    this.classList = function () {
        var param = {
            url: 'goodsclass/list',
            data: [{

            }]
        }
        ajaxFunction.common(param, classOk)
    }
    this.banner = function () {
        var param = {
            url: 'banner/list',
            data: [{
            }]
        }
        ajaxFunction.common(param, bannerOk)
    }
    this.shop = function () {
        //var userData = JSON.parse(localStorage.userData);
        if ($.cookie("userData")) {
            var userData = JSON.parse($.cookie("userData"));
        }
        console.log(userData.user.mer_id)
        var param = {
            url: 'merchant/info/' + userData.user.mer_id,
            data: [{
            }]
        }
        ajaxFunction.common(param, mendianOk)
    }

    this.goodsList = function (id) {
        if ($.cookie("userData")) {
            var userData = JSON.parse($.cookie("userData"));
        }
        var param = {
            url: 'saleevent/listByPage',
            data: [{
                class_id: id,
                token: userData.token,
                userId: userData.user.id,
                page: 1,
                ower_type: 2
            }]
        }
        ajaxFunction.common(param, goodsListOk, id)
    }
    this.goodsList2 = function (page) {
        //var userData = JSON.parse(localStorage.userData);
        if ($.cookie("userData")) {
            var userData = JSON.parse($.cookie("userData"));
        }
        var param = {
            url: 'saleevent/listByPage',
            data: [{
                token: userData.token,
                userId: userData.user.id,
                page: page,
                ower_type: 2
            }]
        }
        ajaxFunction.common(param, goodsList2Ok)
    }
}
/***商品详情***/
function getGoods() {
    var param = {
        url: 'saleevent/info/' + id,
        data: [{
            id: id
        }]
    }
    ajaxFunction.common(param, goodsDetailOk)
}

/***商品评价***/
function goodscomment(id, page) {
    var param = {
        url: 'goodscomment/listByPage',
        data: [{
            event_id: id,
            page: page
        }]
    }
    ajaxFunction.common(param, goodscommentOk)
}
/***商品评价***/
function getContent(id) {
    var param = {
        url: 'goodscomment/listByPage',//接口地址
        data: [{
            event_id: id,
            page: 1,
        }]//获取信息
    }
    ajaxFunction.common(param, goodsContentOk)//传回
}

/**购物车**/
function shoppingCar() {
    if ($.cookie("userData")) {
        var userData = JSON.parse($.cookie("userData"));
    }
    this.getshopCar = function (id1, num) {

        var param = {
            url: 'shoppingcart/save',
            data: [{
                token: userData.token,
                userId: userData.user.id,
                sub_event_id: id1,
                buy_num: num,

            }]
        }
        ajaxFunction.common(param, shopcarOk)
    }
    this.getshopCarList = function () {
        var param = {
            url: 'shoppingcart/list',
            data: [{
                token: userData.token,
                userId: userData.user.id,
                // page:page
            }]
        }
        ajaxFunction.common(param, getshopCarListOk)
    }

    this.deleteCar = function (id) {
        var param = {
            url: 'shoppingcart/delete/' + id,
            data: [{
                id: id
            }]
        }
        ajaxFunction.common(param, deleteCarOk)
    }
    this.updataCar = function (id, num) {
        var param = {
            url: 'shoppingcart/update',
            data: [{
                id: id,
                token: userData.token,
                userId: userData.user.id,
                buy_num: num
            }]
        }
        ajaxFunction.common(param, updataCarOk)
    }
}

// 省市区
function provinces() {
    var param = {
        url: 'provinces/list',
        data: [{

        }]
    }
    ajaxFunction.common(param, provincesOk)
}
/******地理列表******/

function addlist() {
    if ($.cookie("userData")) {
        var userData = JSON.parse($.cookie("userData"));
        var id = userData.user.id;
        var token = userData.token;
    }
    var param = {
        url: 'address/list',
        data: [{
            userId: id,
            token: token
        }]
    }
    ajaxFunction.common(param, listOK)
}
//余额支付
function toPay() {
      //repid 规格id  
    //redId 红包id
    //addressid 地址Id
    //isSelfTake 自提 
    //memo 备注
    //payType 付款方式  1微信 2支付宝 3余额
    this.Pay = function (psw, addressid, num, repIds, redIds, memo, isSelfTake) {//从商品详情点击立即支付进来，获取运费等信息
        if ($.cookie("userData")) {
            var userData = JSON.parse($.cookie("userData"));
            var id = userData.user.id;
            var token = userData.token;
        }
        var param = {
            url: 'api/createOrder',
            data: [{
                userId: id,
                token: token,
                payType: 3,
                password: psw,
                counts: num, //数量
                addressId: addressid,
                repIds: repIds,
                redId: redIds,
                memo: memo,
                isSelfTake: isSelfTake

            }]
        }
        ajaxFunction.common(param, toPayOK)
    }
      //cartIds 购物车id, 多个id 逗号分隔
    this.Pay2 = function (psw, addressid, cartIds, redIds, memo, isSelfTake) {//支付购物车商品
        if ($.cookie("userData")) {
            var userData = JSON.parse($.cookie("userData"));
            var id = userData.user.id;
            var token = userData.token;
        }

        var param = {
            url: 'api/createOrderByCart',
            data: [{
                userId: id,
                token: token,
                payType: 3,
                password: psw,
                addressId: addressid,
                cartIds: cartIds,
                redId: redIds,
                memo: memo,
                isSelfTake: isSelfTake
            }]
        }
        ajaxFunction.common(param, toPay2OK)
    }
    //bargainId 砍价商品的id
    //counts 数量
    this.Pay3 = function (psw,addressid,bargainId, memo) {//砍价商品余额支付
        var param = {
            url: 'api/createOrderByCart',
            data: [{
                userId: userId,
                token: token,
                payType: 3,
                counts:1,
                password: psw,
                addressId: addressid,
                bargainId: bargainId,
                memo: memo,
                isFirst:1
            }]
        }
        ajaxFunction.common(param, toPay3OK)
    }



}
//订单列表
function MemoList() {
    this.list = function (page) {
        if ($.cookie("userData")) {
            var userData = JSON.parse($.cookie("userData"));
            var id = userData.user.id;
        }
        console.log(userData)
        var token = userData.token;
        var param = {
            url: 'merorder/listByPage',
            data: [{
                userId: id,
                token: token,
                page: page,
            }]
        }
        ajaxFunction.common(param, memolistOK)
    },
        this.list1 = function (page) {
            if ($.cookie("userData")) {
                var userData = JSON.parse($.cookie("userData"));
                var id = userData.user.id;
            }
            console.log(userData)
            var token = userData.token;
            var param = {
                url: 'merorder/listByPage',
                data: [{
                    userId: id,
                    token: token,
                    page: page,
                    nopay: 1
                }]
            }
            ajaxFunction.common(param, memolist1OK)
        },
        this.list2 = function (page) {
            if ($.cookie("userData")) {
                var userData = JSON.parse($.cookie("userData"));
                var id = userData.user.id;
            }
            console.log(userData)
            var token = userData.token;
            var param = {
                url: 'merorder/listByPage',
                data: [{
                    userId: id,
                    token: token,
                    page: page,
                    status: 2
                }]
            }
            ajaxFunction.common(param, memolist2OK)
        }
    this.list5 = function (page) {
        if ($.cookie("userData")) {
            var userData = JSON.parse($.cookie("userData"));
            var id = userData.user.id;
        }
        console.log(userData)
        var token = userData.token;
        var param = {
            url: 'merorder/listByPage',
            data: [{
                userId: id,
                token: token,
                page: page,
                status: 6
            }]
        }
        ajaxFunction.common(param, memolist3OK)
    }
    this.list4 = function (page) {

        if ($.cookie("userData")) {
            var userData = JSON.parse($.cookie("userData"));
            var id = userData.user.id;
        }
        console.log(userData)
        var token = userData.token;
        var param = {
            url: 'merorder/listByPage',
            data: [{
                userId: id,
                token: token,
                page: page,
                status: 7
            }]
        }
        ajaxFunction.common(param, memolist4OK)
    }
}
function changemima(phone, code, password) {

    if ($.cookie("userData")) {
        var userData = JSON.parse($.cookie("userData"));
        var id = userData.user.id;
        var token = userData.token;
    }
    var param = {
        url: 'user/resetPayPass',
        data: [{
            userId: id,
            token: token,
            code: code,
            password: password
        }]
    }
    ajaxFunction.common(param, changemimaOK)
}
function AddressMemo(id) {
    var param = {
        url: 'address/info/' + id,
        data: [{
        }]
    }
    ajaxFunction.common(param, addressmemoOK)
}
function changord() {
    console.log("进来了")
    if ($.cookie("userData")) {
        var userData = JSON.parse($.cookie("userData"));
        var id = userData.user.id;
        var token = userData.token;
    }

    this.tochange = function (ordpsw, new1) {
        var param = {
            url: 'user/resetPassByOldPass',
            data: [{
                userId: id,
                token: token,
                oldPass: ordpsw,
                newPass: new1,

            }]
        }
        ajaxFunction.common(param, changordOK)
    }

}
/***积分夺宝专区列表***/
function pointevent() {
   this.pointeventList = function () {
        var param = {
            url: 'pointevent/listByPage',
            data: [{
                status:0,
                page:1

            }]
        }
        ajaxFunction.common(param, pointeventListOK)
    }
}



/****是否登录***/
function nottoLog() {
    var userData = $.cookie("userData");
    if (userData == undefined || userData == null || userData == ""||userData =="null") {
        window.location.href = "login.html";
        return false;
    }

}   