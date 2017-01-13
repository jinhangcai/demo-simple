define(function (require, exports, module) {
    require('js/module/module');
    require('js/module/styl');
    var mock=require('js/module/ajax-mock');
    var scrollLoad = require('js/module/inloadList');
    var slider = require('js/module/sliderIn');
    new scrollLoad({
        waps: $('#grab .viewport')[0],
        ajax:{
            url:mock.lottery.url,
            type:'get',
            data:{
                id:1
            },
            success:function(data,next){
            }
        }
    });

    var slideImgList = eval($('#slideImgList').val());
    console.log(slideImgList,slideImgList.length);
    var t1 = new slider({
        sliderBox :$('.slider')[0], //容器
        sliderDate:slideImgList,    //内容
        sliderTime:5000000,          //自动切换时间
        lazyload:true               //是否懒加载
    });
    var t12 = new slider({
        sliderBox :$('.slider')[1], //容器
        sliderDate:slideImgList,    //内容
        sliderTime:5000,          //自动切换时间
        lazyload:true               //是否懒加载
    });
    //new slider({
    //    sliderBox :$('.slider1')[0], //容器
    //    sliderDate:slideImgList,    //内容
    //    sliderTime:5000000,          //自动切换时间
    //    lazyload:true               //是否懒加载
    //});



    //
    //function date(){
    //    var date = new Date();
    //    return date.getTime()
    //}
    //var width = window.innerWidth;
    //var _x,_y,_x1,_y1,_x2,_y2;
    //var sliderli = $('.slider .uls li');
    //var sliderlength =sliderli.length;
    //if(sliderlength < 3){
    //    var html = sliderli.eq(0).html();
    //    for(var i=0;i<3-sliderlength;i++){
    //        var li = "<li>"+html+"</li>";
    //        var olli = '<li></li>';
    //        $('.slider .uls').append(li);
    //        $('.ols').append(olli);
    //    }
    //}
    //var sliderul = $('.slider .uls')[0];
    //var sliderli = $('.slider .uls li');
    //var sliderolli = $('.slider ol li');
    //var sliderlength =sliderli.length;
    //var lis =  $('.lis')[0];
    //var index = 0;
    //var bj= false;
    //var offx =0;
    //var record = 0;
    //var startTime=0,EndTime=0;
    //var ifslider = true;
    //var iis=0;
    //for(var i=0;i<sliderli.length;i++){
    //    if(i == sliderli.length-1){
    //        sliderli.eq(i).css({'position':'absolute','top':0,'left':-width+'px'});
    //    }else{
    //        sliderli.eq(i).css({'position':'absolute','top':0,'left':i*width+'px'});
    //    }
    //}
    //function touchstart(){
    //    for(var i=0;i<sliderlength;i++){
    //        if(sliderli.eq(i).hasClass('lis')){
    //            index = i;
    //        }
    //    }
    //}
    //function touchmoves(_x,_x1,_y,_y1){
    //    if(Math.abs(_x - _x1) > Math.abs(_y - _y1)){
    //        event.preventDefault();
    //        event.stopPropagation();
    //        offx = _x1-_x;
    //        record = _x1-_x > 0 ? iis*width+offx : iis*width+offx;
    //        sliderul.style.webkitTransform='translate3d('+record+'px,0,0)';
    //        sliderul.style.transition='all 0s linear';
    //    }
    //}
    //function touchEnd(_x,_x2,isTime,driven){
    //    var space = isTime ? width/2 : 10;
    //    var Number = index+2;
    //    if(_x - _x2  >= space || driven){
    //        iis--;
    //        sliderul.style.transition='all .5s linear';
    //        sliderul.style.webkitTransform='translate3d('+(iis*width)+'px,0,0)';
    //        if(Number >=sliderlength){
    //            sliderli.eq(Number-sliderlength).css({'position':'absolute','top':0,'left':-(iis-1)*width+'px'});
    //        }else{
    //            sliderli.eq(Number).css({'position':'absolute','top':0,'left':-(iis-1)*width+'px'});
    //        }
    //        if(index == sliderlength-1){
    //            index = 0;
    //            sliderli.removeClass('lis').eq(index).addClass('lis');
    //            sliderolli.removeClass('lis').eq(index).addClass('lis');
    //        }else{
    //            sliderli.removeClass('lis').eq(index+1).addClass('lis');
    //            sliderolli.removeClass('lis').eq(index+1).addClass('lis');
    //        }
    //    }
    //    if(_x2 -_x >= space){
    //        iis++;
    //        sliderul.style.transition='all .5s linear';
    //        sliderul.style.webkitTransform='translate3d('+(iis*width)+'px,0,0)';
    //        if(Number >= sliderlength){
    //            if(sliderlength <=3){
    //                sliderli.eq(Number-1-sliderlength).css({'position':'absolute','top':0,'left':-(iis+1)*width+'px'});
    //            }else{
    //                sliderli.eq(Number-1-sliderlength).css({'position':'absolute','top':0,'left':-(iis+1)*width+'px'});
    //            }
    //        }else{
    //            if(sliderlength <=3){
    //                sliderli.eq(Number-1).css({'position':'absolute','top':0,'left':-(iis+1)*width+'px'});
    //            }else{
    //                sliderli.eq(Number-1).css({'position':'absolute','top':0,'left':-(iis+1)*width+'px'});
    //            }
    //        }
    //        console.log(index,sliderli.removeClass('lis').eq(index-1))
    //        sliderli.removeClass('lis').eq(index-1).addClass('lis');
    //        sliderolli.removeClass('lis').eq(index-1).addClass('lis');
    //    }
    //}
    //var interval = setInterval(function(){
    //    touchstart();
    //    touchEnd(0,0,0,true)
    //},5000);
    //sliderul.addEventListener('touchstart',function(e){
    //    _x = e.touches[0].clientX;
    //    _y = e.touches[0].clientY;
    //    startTime = date();
    //    touchstart()
    //},false);
    //sliderul.addEventListener('touchmove',function(e){
    //    _x1 = e.touches[0].clientX;
    //    _y1 = e.touches[0].clientY;
    //    if(Math.abs(_y - _y1) >= 3 && ifslider){
    //        bj = true;
    //        return;
    //    }
    //    if(Math.abs(_x - _x1) >= 3){
    //        ifslider = false;
    //        touchmoves(_x,_x1,_y,_y1)
    //    }
    //},false);
    //sliderul.addEventListener('touchend',function(e){
    //    _x2 = e.changedTouches[0].clientX;
    //    _y2 = e.changedTouches[0].clientY;
    //    ifslider = true;
    //    EndTime = date();
    //    if(EndTime - startTime < 500){
    //        if(_x - _x2  >= 10 || _x2 -_x >=10){
    //            //向左滑  ||  向右滑
    //            touchEnd(_x,_x2,false);
    //        }else{
    //            sliderul.style.transition='all .2s linear';
    //            sliderul.style.webkitTransform='translate3d('+-(iis*width)+'px,0,0)';
    //        }
    //    }else{
    //        if(_x - _x2  >= width/2 || _x2 -_x >= width/2){
    //            //向左滑  ||  向右滑
    //            sliderul.style.transition='all .5s linear';
    //            touchEnd(_x,_x2,true);
    //        }else{
    //            sliderul.style.transition='all .2s linear';
    //            sliderul.style.webkitTransform='translate3d('+(iis*width)+'px,0,0)';
    //        }
    //    }
    //    clearInterval(interval);
    //    interval = setInterval(function(){
    //        touchstart();
    //        touchEnd(0,0,0,true)
    //    },5000);
    //},false);
});