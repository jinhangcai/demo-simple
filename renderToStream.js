/**
 * Created by Administrator on 2016/12/2.
 */
var fs = require('fs');
var path = require('path');
var request1 = require('request');
global.Vue = require('vue');
var app = require('express')();
//var App = new Vue({
//    render (h) {
//        return h('div', 'hello')
//    }
//});
var App=function(){}
var layout = fs.readFileSync('./index.html', 'utf8');
const renderer = require('vue-server-renderer').createRenderer()
app.get('/', (req, res) => {
    const vm = new app({ url: req.url })
    const stream = renderer.renderToStream(vm)

    res.write(`<!DOCTYPE html><html><head><title>...</title></head><body>`)

    stream.on('data', chunk => {
        res.write(chunk)
    });

    stream.on('end', () => {
        res.end('</body></html>')
    })
});
app.listen(5000, function (error) {
    if (error) throw error;
    console.log('Server is running at localhost:5000');
    console.log(__dirname)
});