/**
 * Created by Administrator on 2016/10/20.
 */
define(function (require, exports, module) {
    var jchdUrl = 'http://local.qian360.com:8052';
    var apiUrl = 'http://wap.qian360.com:8080';
    return{
        ////抽奖
        lottery:{
            url: jchdUrl + '/scoreStore/scoreDraw/lottery.html',
            service: 'lottery'
        }
    }
});