/**
 * Created by Administrator on 2016/10/20.
 */
define(function (require, exports, module) {
    var Mock=require('mock');
    var pageUrl = require('module/mock-url');
    Mock.mock(new RegExp('^'+pageUrl.lottery.url+'[\\/\\d]*$'),{
        code:'',
        data:{
            fiveNumber:'排列五开奖号码',
            fivePeriod:'排列五第几期',
            lottoNumber:'大乐透开奖号码',
            lottoPeriod:'大乐透第几期',
            luckyNumber:'中奖号码'
        }
    });

// 返回true的接口
pageUrl.resultTrue = 'resultTrue.html';
Mock.mock(pageUrl.resultTrue, true);

// 返回false的接口
pageUrl.resultFalse = 'resultTrue.html';
Mock.mock(pageUrl.resultFalse, false);

    return pageUrl;
});