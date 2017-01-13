// server.js
'use strict';
var fs = require('fs');
var path = require('path');
var request1 = require('request');
// 定义全局的Vue为了服务端的app.js
global.Vue = require('vue');
// 获取HTML布局
var layout = fs.readFileSync('./index.html', 'utf8');
// 创建一个渲染器
var renderer = require('vue-server-renderer').createRenderer();
// 创建一个Express服务器
var express = require('express');
var server = express();
// 部署静态文件夹
server.use('/js', express.static(path.resolve(__dirname, 'js')));
server.use('/vue', express.static(path.resolve(__dirname, 'bower_components')));
// 处理所有的Get请求
server.get('*', function (request, response) {
    // 渲染我们的Vue应用为一个字符串
    var vm = new layout({ url: request.url });
    //var stream = renderer.renderToStream(vm);
    var url = 'https://mall.qian360.com/activity/grab/h5/index/1/10';
    request1(url,function(err,res,data){
        //console.log(data)
    });
    renderer.renderToString(
        // 创建一个应用实例
        require('./js/vue')(),
        // 处理渲染结果
        function (error, html) {
                // 如果渲染时发生了错误
            if (error) {
                // 打印错误到控制台
                console.error(error);
                // 告诉客户端错误
                return response.status(500).send('Server Error')
            }
            // 发送布局和HTML文件
            response.send(layout.replace('<div id="app"></div>', html))
        }
    )
});
// 监听5000端口
server.listen(5000, function (error) {
    if (error) throw error;
    console.log('Server is running at localhost:5000');
    console.log(__dirname)
});