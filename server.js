/**
 * Created by Administrator on 2016/11/23.
 */
//bodyParser.json(options)、bodyParser.raw(options)、bodyParser.text(options)、bodyParser.urlencoded({extended:false})
//分别处理json数据，Buffer数据流，文本数据，utf-8编码数据
//express_demo.js 文件
var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');
var bodyParser = require('body-parser');
var multer  = require('multer');
var cookieParser = require('cookie-parser');
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/img')
    },
    filename: function (req, file, cb) {
        var name = file.originalname.split('.')[1];
        cb(null, file.fieldname + '-' + Date.now()+'.'+name)
    }
});
var upload = multer({ storage: storage });
app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
});
app.post('/file_upload',upload.single('logo') ,function (req, res) {
   var des_file = path.resolve(__dirname,'img')+ '\\'+req.file.originalname;
    fs.readFile(req.file.path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                console.log('出错了', err );
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:req.file.originalname
                };
            }
            res.end( JSON.stringify( response ) );
        });
    });
});
var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});