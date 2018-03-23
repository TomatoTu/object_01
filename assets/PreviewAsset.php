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
class PreviewAsset extends AssetBundle {
    public $sourcePath = '@res';
//    public $basePath = '@webroot';
//    public $baseUrl = '@web';
    public $css = [
        'template/css/fontawesome/css/font-awesome.css',
        'template/css/global.css',
        'template/css/widget.css',
        'template/css/variousComponents.css',
        'template/css/jquery.bxslider.css',
    ];
    public $js = [
        'js/lib/jquery-1.11.3.min.js',
        'js/editor/bar/extend.js',
        'template/js/base.js',
        'template/js/common.js',
        'template/js/jQuery.nodeCommon.js' 
    ];
    public $depends = [
    ];
    public $jsOptions = ['position' => \yii\web\View::POS_HEAD];

}
