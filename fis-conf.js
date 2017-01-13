fis.set('new date', Date.now());    // 生成`new date`值,用来做时间戳
// amd的config配置
fis.hook('amd', {
    baseUrl: './',
    paths: {
        'page':'./js/page',
        'module':'./js/module',
        'style':'./style',
        'jquery': './bower_components/jquery/dist/jquery.min.js',
        'mock':'./bower_components/mockjs/dist/mock.js'
    },
    shim: {     //shim可以达到不改目标文件，指定其依赖和暴露内容的效果。注意只对不满足amd的js有效
        //'./libs/jquery_lazyload/jquery.lazyload.js': {
        //    deps: ['jquery']
        //}
    }
});


fis
.match('js/({module,page}/**.js)',{
    release: 'js/$1'                       //发布路径
})
.match('img/(**.*)',{
    release: 'img/$1'                    //发布路径
})
.match('style/(**.*)',{
    release: 'css/$1'                       //发布路径
})
.match('*.{json,md}',{
    release: false                      //发布路径(不发布)
})
.match('views/html/(*.html)',{
    release: '$1'                       //发布路径
})
.match('*.styl', {
    parser: fis.plugin('stylus'),
    rExt: '.css'
})
.match('*.{js,es,es6,jsx,ts,tsx}', {
    preprocessor: [
        fis.plugin('js-require-file'),
        fis.plugin('js-require-css')             //添加配置允许js中require css文件
    ]
})
//.match('*.{js,es,es6,jsx,ts,tsx}', {
//    preprocessor: fis.plugin('js-require-css')    //添加配置允许js中require css文件
//})
.match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: false,                 //开启对页面(css,js)合并,合并成一个新的(css,js)文件引入   ps:allInOne: false则表示不合并
        useInlineMap: true               // useInlineMap: true 表示不生成xxxmap.js文件
    })
});


fis.media('local')
.match('js/({module,page}/**.js)',{
    optimizer: fis.plugin('uglify-js'),      //js压缩      ps:如不需要压缩则  optimizer:null
    useHash: true                           //开启MD5戳
})
.match('views/html/(*.html)',{
    release: '$1'                       //发布路径
})
.match('img/(*.png)',{
    optimizer: fis.plugin('png-compressor'), //png图片压缩
    useHash: true,                           //开启MD5戳
    query: '?=t' + fis.get('new date')
})
.match('style/(**.*)',{
    optimizer: fis.plugin('clean-css'),      //css压缩
    useHash: true                            //开启MD5戳
})
.match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: false,                 //开启对页面(css,js)合并,合并成一个新的(css,js)文件引入   ps:allInOne: false则表示不合并
        useInlineMap: true               // useInlineMap: true 表示不生成xxxmap.js文件
    }),
    packager: fis.plugin('deps-pack', {
        'pkg/base.js': [                  //新生成pkg文件夹:base.js文件(合并所有base.js所依赖的文件)
            '/js/module/base.js:deps',    //同步依赖的资源
            '/js/module/base.js:asyncs',  //异步依赖的资源
            '/js/module/base.js',
            '!/bower_components/jquery/dist/jquery.min.js'         //不合并的资源
        ],
        'pkg/base.css': [
            '/js/page/app.js:deps',    //同步依赖的资源
            '/js/page/app.js:asyncs',  //异步依赖的资源
            '/js/page/app.js'
        ]
    })
})
.match('*.js', {                //debug注释代码移除
    parser: fis.plugin('jdists', {
        remove: "debug"
    })
})
//.match('*', {
//    deploy: fis.plugin('local-deliver', {       //发布文件到本地
//        to: './loader'
//    })
//});