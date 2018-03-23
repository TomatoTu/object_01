<?php

namespace node\assets;

use yii\web\AssetBundle;

class PageAsset extends AssetBundle {
    public $sourcePath = '@res';
//    public $basePath = '@webroot';
//    public $baseUrl = '@web';
    public $css = [
        'css/bootstrap.min.css',
        'template/css/fontawesome/css/font-awesome.css',
        'template/css/global.css',
        'template/css/widget.css',
        'template/css/variousComponents.css',
        'template/css/jquery.bxslider.css',
        'css/dhtmlxcolorpicker.css',
        'css/b-style.css',
    ];
    public $js = [
        'js/lib/jquery-1.11.3.min.js',
        'js/common.js',
        'js/lib/dhtmlxcolorpicker.js',
        'js/editor/comHtml.js',
        'js/editor/webEditor.js',
        'js/lib/ueditor/ueditor.config.js',
        'js/lib/ueditor/ueditor.all.js',
        'template/js/jquery.bxslider.js',
        'template/js/base.js',
    ];
    public $jsOptions = ['position' => \yii\web\View::POS_HEAD];

}
