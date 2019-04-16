/**
 * Created by luyunhai on 2018/12/3.
 */
import BaseCaller from '../../core/base';
import { dependencies } from '../../libs/config';
import ZZSellerAPP from './sdk';

export default class ZZAppCaller extends BaseCaller {
    constructor () {
        console.log('init zzSellerApp');
        super(dependencies.ZZ_SELLER_SDK, () => {
            this.ZZSellerAPP = window.ZZSELLER;
            this.App = new ZZSellerAPP(this.ZZSellerAPP);
            console.log('ZZSellerApp is loaded!');
        });
    }
    __isInstallApp () {
        console.log('isInstallApp is init !');
    }
    __openApp (opts) {
        const options = super.adaptOptions(opts);
        console.log('__openApp: ', options);
        const url = encodeURIComponent(options.__SCHEMA_PATH);
        const schema = 'zhuanzhuanseller://jump/core/openZhuanZhuan/jump';
        const unifiedUrl = `${schema}?url=${url}`;
        console.log('unifiedUrl', unifiedUrl);
        this.App.openApp({ unifiedUrl });
    }
    __download ({ channelId }) {
        console.log('__download', { channelId });
    }
    __tryLaunch (opts) {
        this.__openApp(opts);
    }
    init () {
        console.log('zzSellerApp caller is inited!');
    }
    launch (opts) {
        console.log('zzSellerApp launch: ', opts, this);
        this.__openApp(opts);
    }
}