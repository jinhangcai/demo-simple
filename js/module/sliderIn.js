/**
 * Created by Administrator on 2016/11/1.\
 * <div class='slider'><ul><li><img src='xxx'></li></ul><ol><li></li></ol></div>
 * ps:
 * sliderBox:容器  必须
 * sliderDate 内容  必须
 * sliderTime 切换时间  默认5000
 * lazyload 懒加载   默认false
 */
(function(factory){
    if(typeof factory === 'function' && (define.amd || define.cmd) ){
        define(factory)
    }else if(typeof module.exports === 'object' &&  typeof module === "object"){
        module.exports = factory();
    }else{
        window.slider = factory;
    }
})(function(){
    var slider = function(opt){
        var opt = opt || {};
        this.opt={
            sliderBox: opt.sliderBox,           //容器
            sliderDate: opt.sliderDate,         //内容
            sliderTime: opt.sliderTime || 5000, //定时器时间
            loading: false,                     //loading
            index :0,                           //li的索引值
            offx:0,                             //手指点击和移动的差值
            record:0,                           //touchmove移动的距离
            startTime:0,                        //手指点击时间
            EndTime:0,                          //手指松开时间
            iis:0,                              //li偏移left值
            ifslider:true,
            bj:false,
            sliderul:'',    //创建ul
            sliderol:'',   //创建ol
            lazyload:opt.lazyload || false,
            xyz:{
                _x:'',
                _y:'',
                _x1:'',
                _y1:'',
                _x2:'',
                _y2:''
            }
        };
        this.init();
        console.log(this)
    };
    var _prototype = slider.prototype;
    _prototype.init=function(){
        this.width = window.innerWidth;                 //window宽度
        this.events();
        this.intervals();
    };
    _prototype.date = function(){
        var date = new Date();
        return date.getTime()
    };
    _prototype.events=function(){
        if(this.opt.sliderDate.length <= 3){
            var sliderul =document.createElement('ul');    //创建ul
            var sliderol =document.createElement('ol');    //创建ol
            for(var i=0;i<this.opt.sliderDate.length;i++){
                var sliderulli =document.createElement('li');  //创建ul>li
                var sliderolli =document.createElement('li');  //创建ul>li
                sliderulli.innerHTML= "<img src="+this.opt.sliderDate[i].fullShowUrl+">";
                if(i == 0 && !this.opt.loading){
                    this.opt.loading = true;
                    sliderulli.setAttribute('class','lis');
                    sliderulli.setAttribute('class','lis');
                }
                sliderul.appendChild(sliderulli);
                sliderol.appendChild(sliderolli);
            }
            for(var i=0;i<3-this.opt.sliderDate.length;i++){
                var sliderulli =document.createElement('li');  //创建ul>li
                var sliderolli =document.createElement('li');  //创建ul>li
                sliderulli.innerHTML= "<img src="+this.opt.sliderDate[i].fullShowUrl+">";
                sliderul.appendChild(sliderulli);
                sliderol.appendChild(sliderolli);
            }
            this.addload(sliderul,sliderol);
        }else{
            this.sorts()
        }
    };
    _prototype.sorts=function(){
        var _this = this;
        var arrayLength = _this.opt.sliderDate;
        var img ='';
        var sliderul =document.createElement('ul');    //创建ul
        var sliderol =document.createElement('ol');    //创建ol
        for(var i=0;i<arrayLength.length;i++){
            var sliderulli =document.createElement('li');
            var sliderolli =document.createElement('li');
            if(i > 0 && _this.opt.lazyload){
                img = "<img lazyload='"+this.opt.sliderDate[i].fullShowUrl+ "' src=''>";
            }else{
                img = "<img src="+this.opt.sliderDate[i].fullShowUrl+">";
            }
            if(i == 0 || i == 1 || i== arrayLength.length-1){
                img = "<img src="+this.opt.sliderDate[i].fullShowUrl+">";
            }
            if(i == 0 && !this.opt.loading){
                this.opt.loading = true;
                sliderulli.setAttribute('class','lis');
                sliderolli.setAttribute('class','lis');
            }
            sliderulli.innerHTML = img;
            sliderul.appendChild(sliderulli);
            sliderol.appendChild(sliderolli);
        }
        _this.sliderul = sliderul;
        _this.sliderol = sliderol;
        this.addload(_this.sliderul,_this.sliderol);
    };
    _prototype.addload = function(sliderul,sliderol){
        var _this = this;
        _this.opt.sliderBox.appendChild(sliderul);
        _this.opt.sliderBox.appendChild(sliderol);
        _this.sliderulli = sliderul.getElementsByTagName('li');
        _this.sliderolli = sliderol.getElementsByTagName('li');
        _this.mainLength = _this.sliderulli.length;
        _this.dotLength = _this.sliderolli.length;
        sliderol.setAttribute('class','ols');
        for(var i=0;i<_this.mainLength;i++){
            if(i == _this.mainLength-1){
                _this.sliderulli[i].setAttribute('style','position:absolute;top:0;left:'+-_this.width+'px');
            }else{
                _this.sliderulli[i].setAttribute('style','position:absolute;top:0;left:'+i*_this.width+'px');
            }
        }
        sliderul.style.webkitTransform='translate3d(0,0,0)';
    };
    _prototype.intervals = function(){
        var _this = this;
        _this.interval = setInterval(function(){
            //_this.Sliding.touchstart();
            //_this.Sliding.touchEnd(0,0,0,true)
            _this.start();
            _this.End(0,0,0,true)
        },_this.opt.sliderTime);
        _this.shift();
    };
    _prototype.shift = function(){
        var _this = this;
        _this.sliderul.addEventListener('touchstart',function(e){
            _this.opt.xyz._x = e.touches[0].clientX;
            _this.opt.xyz._y = e.touches[0].clientY;
            _this.opt.startTime = _this.date();
            _this.start(_this.opt.sliderBox);
        },false);
        _this.sliderul.addEventListener('touchmove',function(e){
            _this.opt.xyz._x1 = e.touches[0].clientX;
            _this.opt.xyz._y1 = e.touches[0].clientY;
            if(Math.abs(_this.opt.xyz._y - _this.opt.xyz._y1) >= 3 && _this.opt.ifslider){
                _this.opt.bj = true;
                return;
            }
            if(Math.abs(_this.opt.xyz._x - _this.opt.xyz._x1) >= 3){
                _this.opt.xyz.ifslider = false;
               // _this.Sliding.touchmoves(_this.opt.xyz._x,_this.opt.xyz._x1,_this.opt.xyz._y,_this.opt.xyz._y1)
                _this.move(_this.opt.xyz._x,_this.opt.xyz._x1,_this.opt.xyz._y,_this.opt.xyz._y1)
            }
        },false);
        _this.sliderul.addEventListener('touchend',function(e){
            _this.opt.xyz._x2 = e.changedTouches[0].clientX;
            _this.opt.xyz._y2 = e.changedTouches[0].clientY;
            _this.opt.ifslider = true;
            if(_this.opt.xyz._x2 == _this.opt.xyz._x && _this.opt.xyz._y2 == _this.opt.xyz._y){
                return;
            }
            _this.opt.EndTime = _this.date();
            if(_this.opt.EndTime - _this.opt.startTime < 500){
                if(_this.opt.xyz._x - _this.opt.xyz._x2  >= 10 || _this.opt.xyz._x2 - _this.opt.xyz._x >= 10){
                    //向左滑  ||  向右滑
                  //  _this.Sliding.touchEnd(_this.opt.xyz._x,_this.opt.xyz._x2,false,false);
                    _this.End(_this.opt.xyz._x,_this.opt.xyz._x2,false,false);
                }else{
                    _this.sliderul.style.transition='all .2s linear';
                    _this.sliderul.style.webkitTransform='translate3d('+-(_this.opt.iis*_this.width)+'px,0,0)';
                }
            }
            if(_this.opt.xyz._x - _this.opt.xyz._x2  >= _this.width/2 || _this.opt.xyz._x2 - _this.opt.xyz._x >= _this.width/2){
                //向左滑  ||  向右滑
                _this.sliderul.style.transition='all .5s linear';
               // _this.Sliding.touchEnd(_this.opt.xyz._x,_this.opt.xyz._x2,true,false);
                _this.End(_this.opt.xyz._x,_this.opt.xyz._x2,true,false);
            }else{
                _this.sliderul.style.transition='all .2s linear';
                _this.sliderul.style.webkitTransform='translate3d('+(_this.opt.iis*_this.width)+'px,0,0)';
            }
            clearInterval(_this.interval);
            _this.interval = setInterval(function(){
                //_this.Sliding.touchstart();
                //_this.Sliding.touchEnd(0,0,0,true)
                _this.start();
                _this.End(0,0,0,true);
            },_this.opt.sliderTime);
        },false);
        //_this.Sliding()
        _this.start();_this.move();_this.End();
    };
    _prototype.start = function(){
        var _this = this;
        for (var i = 0; i < _this.mainLength; i++) {
            if (_this.sliderulli[i].className == 'lis') {
                _this.opt.index = i;
            }
        }
    };
    _prototype.move = function(_x,_x1,_y,_y1){
        var _this = this;
        if(Math.abs(_x - _x1) > Math.abs(_y - _y1)){
            event.preventDefault();
            event.stopPropagation();
            _this.opt.offx = _x1-_x;
            _this.opt.record = _x1-_x > 0 ? _this.opt.iis*_this.width+_this.opt.offx : _this.opt.iis*_this.width+_this.opt.offx;
            _this.sliderul.style.webkitTransform='translate3d('+_this.opt.record+'px,0,0)';
            _this.sliderul.style.transition='all 0s linear';
        }
    };
    _prototype.End = function(_x,_x2,isTime,driven){
        var _this = this;
        var space = isTime ? _this.width/2 : 10;
        var Number = _this.opt.index+2,img;
        if(_x - _x2  >= space || driven){
            _this.opt.iis--;
            _this.sliderul.style.transition='all .5s linear';
            _this.sliderul.style.webkitTransform='translate3d('+(_this.opt.iis*_this.width)+'px,0,0)';
            if(Number >=  _this.mainLength){
                _this.sliderulli[Number-_this.mainLength].setAttribute('style','position:absolute;top:0;left:'+-(_this.opt.iis-1)*_this.width+'px');
                if(_this.opt.lazyload){
                    img = _this.sliderulli[_this.opt.index].childNodes[0];
                    img.src= _this.opt.sliderDate[_this.opt.index].fullShowUrl;
                }
            }else{
                _this.sliderulli[Number].setAttribute('style','position:absolute;top:0;left:'+-(_this.opt.iis-1)*_this.width+'px');
                if(_this.opt.lazyload){
                    img =_this.sliderulli[Number].childNodes[0];
                    img.src= _this.opt.sliderDate[Number].fullShowUrl;
                }
            }
            if(_this.opt.index ==  _this.mainLength-1){
                _this.opt.index = 0;
                for(var i=0;i<_this.mainLength;i++){
                    _this.sliderulli[i].removeAttribute('class');
                    _this.sliderolli[i].removeAttribute('class')
                }
                _this.sliderulli[_this.opt.index].setAttribute('class','lis');
                _this.sliderolli[_this.opt.index].setAttribute('class','lis');
            }else{
                for(var i=0;i<_this.mainLength;i++){
                    _this.sliderulli[i].removeAttribute('class');
                    _this.sliderolli[i].removeAttribute('class')
                }
                _this.sliderulli[_this.opt.index+1].setAttribute('class','lis');
                _this.sliderolli[_this.opt.index+1].setAttribute('class','lis');
            }
        }
        if(_x2 -_x >= space){
            _this.opt.iis++;
            _this.sliderul.style.transition='all .5s linear';
            _this.sliderul.style.webkitTransform='translate3d('+(_this.opt.iis*_this.width)+'px,0,0)';
            if(Number >=  _this.mainLength){
                if( _this.mainLength <=3){
                    _this.sliderulli[Number-1- _this.mainLength].setAttribute('style','position:absolute;top:0;left:'+-(_this.opt.iis+1)*_this.width+'px');
                }else{
                    if(_this.opt.index == 0){
                        _this.sliderulli[_this.mainLength-2].setAttribute('style','position:absolute;top:0;left:'+-(_this.opt.iis+1)*_this.width+'px');
                        if(_this.opt.lazyload){
                            img = _this.sliderulli[_this.mainLength-2].childNodes[0];
                            img.src= _this.opt.sliderDate[_this.mainLength-2].fullShowUrl;
                        }
                    }else if(_this.opt.index == 1){
                        _this.sliderulli[_this.mainLength-1].setAttribute('style','position:absolute;top:0;left:'+-(_this.opt.iis+1)*_this.width+'px');
                        if(_this.opt.lazyload){
                            img = _this.sliderulli[_this.mainLength-1].childNodes[0];
                            img.src= _this.opt.sliderDate[_this.mainLength-1].fullShowUrl;
                        }
                    }else{
                        _this.sliderulli[_this.opt.index-2].setAttribute('style','position:absolute;top:0;left:'+-(_this.opt.iis+1)*_this.width+'px');
                        if(_this.opt.lazyload){
                            img = _this.sliderulli[_this.opt.index-2].childNodes[0];
                            img.src= _this.opt.sliderDate[_this.opt.index-2].fullShowUrl;
                        }
                    }
                }
            }else{
                if(_this.mainLength <= 3){
                    _this.sliderulli[Number-1].setAttribute('style','position:absolute;top:0;left:'+-(_this.opt.iis+1)*_this.width+'px');
                }else{
                    if(_this.opt.index == 0){
                        _this.sliderulli[_this.mainLength-2].setAttribute('style','position:absolute;top:0;left:'+-(_this.opt.iis+1)*_this.width+'px');
                        if(_this.opt.lazyload){
                            img = _this.sliderulli[_this.mainLength-2].childNodes[0];
                            img.src= _this.opt.sliderDate[_this.mainLength-2].fullShowUrl;
                        }
                    }else if(_this.opt.index == 1){
                        _this.sliderulli[_this.mainLength-1].setAttribute('style','position:absolute;top:0;left:'+-(_this.opt.iis+1)*_this.width+'px');
                        if(_this.opt.lazyload){
                            img = _this.sliderulli[_this.mainLength-1].childNodes[0];
                            img.src= _this.opt.sliderDate[_this.mainLength-1].fullShowUrl;
                        }
                    }else{
                        _this.sliderulli[_this.opt.index-2].setAttribute('style','position:absolute;top:0;left:'+-(_this.opt.iis+1)*_this.width+'px');
                        if(_this.opt.lazyload){
                            img = _this.sliderulli[_this.opt.index-2].childNodes[0];
                            img.src= _this.opt.sliderDate[_this.opt.index-2].fullShowUrl;
                        }
                    }
                }
            }
            for(var i=0;i<_this.mainLength;i++){
                _this.sliderulli[i].removeAttribute('class');
                _this.sliderolli[i].removeAttribute('class')
            }
            if(_this.opt.index == 0){
                _this.sliderulli[_this.mainLength-1].setAttribute('class','lis');
                _this.sliderolli[_this.dotLength-1].setAttribute('class','lis');
            }else{
                _this.sliderulli[_this.opt.index-1].setAttribute('class','lis');
                _this.sliderolli[_this.opt.index-1].setAttribute('class','lis');
            }
        }
    };
    return slider;
});