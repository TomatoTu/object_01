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
class ReactAsset extends AssetBundle
{
    public $sourcePath = '@react';
    public $css = [
    ];
    public $js = [
        'react.js',
        'react-with-addons.js',
        'react-dom.js',
        'browser.min.js'
    ];
    public $depends = [
    ];
}
