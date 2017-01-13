define(function (require, exports, module) {
        require('module/base');
        require('jquery');
        require('style/styl.styl');
        require('style/style.css');
        var img = require('../../img/logo.png');
        var imgs =" <img src="+ img +">"
        $('.img').html(imgs)

});