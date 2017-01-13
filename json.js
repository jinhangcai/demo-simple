/**
 * Created by Administrator on 2016/11/25.
 */

//JSON.parse(option)将字符串解析成json格式       //JSON.stringify(option)将json格式解析成字符串
var express = require('express');
var fs = require('fs');
var commander = require('commander');
var app = express();
var path = require('path');
var request = require('request');
app.get('/index.html', function (req, res) {
    var url = 'https://mall.qian360.com/activity/grab/h5/index/1/10';
    request(url,function(err,response,body){
        res.send(body);
    });
});
app.listen(8081);
console.log('请求成功');
