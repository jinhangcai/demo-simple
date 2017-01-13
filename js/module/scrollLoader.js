//module.exports    初始值为一个空{}
//exports           指向module.exports的引用
//factory == (function(){xxxx})
(function (factory) {
    console.log(factory)
    if (typeof define === 'function' && (define.amd || define.cmd)) {       //判断amd || cmd
        define(factory);
    } else if (typeof module.exports === 'object' &&  typeof module === "object") {     //判断Commonjs
        module.exports = factory();
    } else {
        window.ScrollLoader = factory;                                      //页面直接引入
    }
})(function(){
    var global = window;
    var scrollLoader = function(opt){
        var opt = opt || {};
        this.opt = {
            wrap: opt.wrap || global,
            threshold: opt.threshold || 200,        //距离
            autoLoad: opt.autoLoad || false,
            loadUpFn: opt.loadUpFn || null,         //向上加载
            loadDownFn: opt.loadDownFn || null      //向下加载
        };
        this.init();
    };

    var _prototype = scrollLoader.prototype;
    _prototype.init = function(){
        this.loading = false;
        this.contentBox = this.opt.wrap === global ? document.body : this.opt.wrap;
        this.resizeHeight();
        this.events();
    };

    _prototype.resizeHeight = function(){
        this.wrapHeight = this.opt.wrap === global ? document.documentElement.clientHeight : this.opt.wrap.clientHeight;        //获取页面可见高度 || 容器高度
        this.conntentHeight = this.contentBox.scrollHeight;         //获取(窗口 || 容器)的实际高度
    };

    _prototype.autoLoad = function(){
        this.handler(this);
    };

    _prototype.handler = function(that){
        if(that.loading){
            return;
        }

        var scrollTop = that.contentBox == document.body ? (that.contentBox.scrollTop || document.documentElement.scrollTop) : that.contentBox.scrollTop;   //滚动的距离
        if(that.opt.loadUpFn && scrollTop <= that.opt.threshold){
            that.loading = true;
            that.opt.loadUpFn(that);
        } else if(that.opt.loadDownFn && that.conntentHeight - scrollTop - that.wrapHeight <= that.opt.threshold){
            that.loading = true;
            that.opt.loadDownFn(that)
        }
    };
    _prototype.events = function(){
        var that = this;
        if(this.opt.autoLoad){
            this.autoLoad();
        }
        this.opt.wrap.addEventListener('scroll', function(){
            that.handler(that)
        }, false);
    };
    return scrollLoader;
});
