/**
 * Created by Administrator on 2016/10/27.
 */
define(function (require, exports, module) {
    var scrollLoad = require('module/scrollLoad');
    var Inscroll = function(opt){
        this.isup = opt.isup || 'down';
        this.pageNumber = opt.pageNumber || 1;              //id
        this.pagesize = opt.pagesize || 10;               //页数
        this.ajax = opt.ajax;
        this.opt = {
            waps : opt.waps,          //加载容器
            autoLoad:true             //加载
        };
        this.init();
    };
    var InList = Inscroll.prototype;
    InList.init = function(){
        this.event();
        this.addnewscroll = new scrollLoad(this.opt);
    };
    InList.event = function(){
        this.setData();
        if(this.isup == 'down'){
            this.opt.downFun = this.loadEvent ;
        }else{
            this.opt.upFun = this.loadEvent;
        }
    };
    InList.setData = function(){
        var that = this;
        this.loadEvent = function(loaderObj){
            $.ajax({
                url:that.ajax.url +'/'+that.ajax.data.id + '/' + that.pagesize,
                type:that.ajax.type,
                data: $.extend({
                    pageNumber:that.pageNumber,
                    pagesize:that.pagesize
                },that.ajax.data),
                dataType: "json",
                success:function(data,next){
                    that.ajax.success && that.ajax.success(data,next);
                    function next(){
                        if(this.pagesize <= this.ajax.total){
                            that.pagesize +=10;
                            loaderObj.resizeHeight();
                            loaderObj.loading = false;
                            if(loaderObj.opt.autoLoad){
                                loaderObj.autoLoad();
                            }
                            that.setAjax()
                        }
                    }
                }
            })
        }
    };
    InList.seAjax = function(){
        this.setData();
        if(this.isup == 'down'){
            this.loadEvent = this.addnewscroll.downFun;
        }else{
            this.loadEvent = this.addnewscroll.upFun;
        }
    };
    return Inscroll
});
