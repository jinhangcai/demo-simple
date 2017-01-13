/**
 * Created by Administrator on 2016/10/26.
 */
(function(factory){
    if(typeof define === 'function' && (define.amd || define.cmd)){         //amd ||  cmd 规范
        define(factory)
    }else if(typeof module.exports === 'object' && typeof module === 'object'){     //Commonjs 规范
        module.exports = factory();
    }else{
        window.scrollLoad = factory;                                        //<script>直接引入
    }
})(function(){
    var golbal = window;
    var scrollLoad = function(opt){
        var opt = opt || {};
        this.opt={
            upFun : opt.upFun || null,          //上拉加载
            downFun : opt.downFun || null,      //下拉加载
            Distance : opt.Distance || 200,     //默认加载的距离
            waps : opt.waps || golbal,          //加载容器
            isupaload : opt.isupaload || false, //是否进入滚动
            autoLoad : opt.autoLoad || false    //加载
        };
        this.init();
    };
    var chain = scrollLoad.prototype;
    chain.init=function(){
        this.contentBox = this.opt.waps === golbal ? document.body : this.opt.waps;
        this.loading = false;
        this.resizeHeight();
        this.events();
    };
    chain.resizeHeight = function(){
        this.wapsHeight  =  this.opt.waps === golbal ? document.documentElement.clientHeight : this.opt.waps.clientHeight;    //获取页面可见高度 || 容器高度
        this.conntentHeight = this.contentBox.scrollHeight;
    };
    chain.autoLoad = function(){
        this.headler(this)
    };
    chain.headler = function(that){
        if(that.loading){
            return;
        }
        var scroll = that.contentBox === document.body ? (that.contentBox.scrollTop || document.body.scrollTop  ) : that.contentBox.scrollTop;      //滚动高度

        if(that.opt.upFun && that.conntentHeight - scroll - that.wapsHeight <= that.opt.Distance){
                that.loading = true;
                that.opt.upFun(that)
        }else if(that.opt.downFun && that.conntentHeight - scroll - that.wapsHeight <= that.opt.Distance){
                that.loading = true;
                that.opt.downFun(that);
        }
    };
    chain.events = function(){
        var that = this;
        if(this.opt.autoLoad){
            that.autoLoad()
        }
        this.opt.waps.addEventListener('scroll',function(){
            that.headler(that)
        })
    };
    return scrollLoad;
});