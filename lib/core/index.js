'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _platform = require('../libs/platform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Core = function () {
    function Core() {
        (0, _classCallCheck3.default)(this, Core);

        // this.plat = new Platform({
        //     // ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16A366 WUBA/8.13.0 IPX'
        // }).getCurrentPlatform();
        var plat = new _platform.Platform({
            // ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16A366 WUBA/8.13.0 IPX'
        });
        this.plat = plat.getCurrentPlatform();
        this.caller = null;
        this.init();
    }

    (0, _createClass3.default)(Core, [{
        key: 'loader',
        value: function loader() {
            console.log('---------', this.plat);
            var ZZCaller = require('../callers/' + this.plat).default;
            this.caller = new ZZCaller();
            this.caller.init();
        }
    }, {
        key: 'init',
        value: function init() {
            console.log('Core is inited!!!');
            this.loader();
        }

        /**
         * 端外主动调起app方法
         * tip1：通过一个对象传入
         * tip2：下面任意参数都非必填，默认调起首页（转转）
         * @param urlSearch：
         *        |- 参数openType：home首页（默认），detail详情页，order订单，mysell我卖出的，person个人中心，village小区，web页面
         *        |- 参数id：存放id或者url
         *        |- 其他任意参数均可（兼容新版调起协议）
         * @param channelId：渠道号
         * @param path:路径(兼容新版调起协议)
         * @param middleWareUrl：中转url，如空则直接跳转下载安装包或 App Store
         * @param callback：发起调起请求时的回调
         * @param success：调起成功的回调
         * @param fail：调起失败的回调
         */

    }, {
        key: 'start',
        value: function start(opts) {
            console.log(opts, this.caller, this);
            this.caller.wrap(this.caller.launch.bind(this.caller), (0, _extends3.default)({}, {
                // iosScheme:'zhuanzhuan://',   //协议头
                // androidScheme:'zhuanzhuan://',     //协议头
                // appStore:'itms-apps://itunes.apple.com/us/app/zhuan-zhuan-kuai-ren-yi-bu/id1002355194?l=zh&ls=1&mt=8',
                // androidApk: 'https://app.zhuanzhuan.com/zz/redirect/download',
                // androidApk_deeplink:'https://app.zhuanzhuan.com/activity/deeplink/download/',
                targetApp: 'zz', // 目标App（zz: 主App, seller: 商家App）
                channelId: 923, //渠道号
                delay: 800, //触发下载的延时时间，低于16000可能会出现调起的同时触发下载
                middleWareUrl: '', //下载中转页,如不设置，将直接下载安装包或跳appstore
                wechatCheckInstallState: function wechatCheckInstallState() {} //微信端初始化检测安装后的回调函数
            }, opts));
        }
    }]);
    return Core;
}(); /**
      * Created by luyunhai on 2018/11/8.
      */


window.CallApp = Core;
// window.callApp = new Core();
exports.default = Core;
module.exports = exports['default'];