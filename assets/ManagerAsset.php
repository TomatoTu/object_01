<?php

/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace node\assets;

use yii\web\AssetBundle;

/**
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class ManagerAsset extends AssetBundle {
    public $sourcePath = '@res';
//    public $basePath = '@webroot';
//    public $baseUrl = '@web';
    public $css = [
        'css/bootstrap.min.css',
        'js/lib/webupload/webuploader.css',
        'css/b-style.css',
    ];
    public $js = [
        'js/lib/jquery-1.11.3.min.js',
        'js/lib/jquery.slimscroll.min.js',
        'js/lib/bootstrap.js',
        'js/lib/webupload/webuploader.js',
        'js/lib/ueditor/ueditor.config.js',
        'js/lib/ueditor/ueditor.all.js',
        'js/common.js',
        'js/manager.js',
        'js/liDrag.js',
        'js/bundle.js',
    ];
    public $jsOptions = ['position' => \yii\web\View::POS_END];

}
