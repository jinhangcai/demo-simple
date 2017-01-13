/**
 * Created by Administrator on 2016/11/28.
 */
//type:console  将日志输出至控制台
//alwaysIncludePattern  如果为true,则每个文件都会按照pattern命名，否则最新文件不会按照pattern命名
//category  日志名 通过getLogger(category)获取
//filename  日志的存储路径  必须有这个路径，不然报错
//pattern   日志的文件名(yyyy:年份,MM:月份,dd:日期,hh:小时,mm:分钟,ss:秒)
//absolute filename是否是绝对路径  (是:true,否:false)

var app = require('express')();
var path = require('path');
var fs = require('fs');
var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console','category':'console' },
        { type: 'dateFile', filename: 'logs/debug/console.log', category: 'console','backups':3,'maxLogSize':2048 },
        { type: 'dateFile', filename: 'logs/debug/debug.log', category: 'Err','backups':3,'maxLogSize':2048 }
    ],
    'levels':{
        'console':'TRACE',
        'Err':'ERROR'
    },
    replaceConsole:true
});
var console = log4js.getLogger('console');
app.use(log4js.connectLogger(console, {level: log4js.levels.config.console}));


var Err = log4js.getLogger('Err');
app.use(log4js.connectLogger(Err, {level: log4js.levels.config.Err}));




app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
});
app.get('/process_get',function(req,res){
    dfasdf
   var response = {
       first:req.query.first_name,
       last:req.query.last_name
   };
   res.end(JSON.stringify(response))
});
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port,log4js.levels.config.console);

});
