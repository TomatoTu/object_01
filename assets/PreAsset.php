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
class PreAsset extends AssetBundle {
    public $sourcePath = '@res';
//    public $basePath = '@webroot';
//    public $baseUrl = '@web';
    public $css = [
        'css/bootstrap.min.css',
        'css/bootstrap-theme.min.css',
        'css/b-style.css',
    ];
    public $js = [
        'js/lib/jquery-1.11.3.min.js',
        'js/lib/jquery.slimscroll.min.js',
        'js/lib/bootstrap.js',
    ];
    public $depends = [
    ];
    public $jsOptions = ['position' => \yii\web\View::POS_HEAD];

}
