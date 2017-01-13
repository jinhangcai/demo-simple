/**
 * Created by Administrator on 2016/12/5.
 */
var express = require('express');
var path = require('path');
var request = require('request');
var route = require('vue-router');
var app = express();
app.set('view engine', 'jade'); // 设置模板引擎
app.set('views', path.join(__dirname,'views/pages'));  // 设置模板相对路径(相对当前目录)
app.get('/', function(req,res) {
    //res.render('index'); // 调用当前路径下的 test.jade 模板
    var url = 'https://mall.qian360.com/activity/grab/h5/index/1/10';
    request(url,function(err,response,body){
        res.render('index',{
            title:'文章',
            data:JSON.parse(body)
        });
    });
});
app.listen(5000, function (error) {
    if (error) throw error;
    console.log('Server is running at localhost:5000');
    console.log(__dirname)
});