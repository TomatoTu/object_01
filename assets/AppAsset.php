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
class AppAsset extends AssetBundle {
    public $sourcePath = '@res';
//    public $basePath = '@webroot';
//    public $baseUrl = '@web';
    public $css = [
        'css/bootstrap.min.css',
        'css/b-style.css',
        'css/mainStyle.css',
    ];
    public $js = [
        'js/lib/jquery-1.11.3.min.js',
        'js/circleProgress.js',
        'js/lib/jquery.slimscroll.min.js',
    ];
    public $depends = [
        'yii\web\YiiAsset'
    ];

}
