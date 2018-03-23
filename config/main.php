<?php

$params = array_merge(
        require(__DIR__ . '/params.php'), require(__DIR__ . '/params-local.php')
);

return [
    'id' => 'WEB-NODE',
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'basePath' => dirname(__DIR__),
    'timeZone' => 'Asia/Chongqing',
    'bootstrap' => ['log'],
    'controllerNamespace' => 'node\controllers',
    'on beforeRequest' => ['node\lib\Functions', 'beforeRequest'],
    'on afterRequest' => ['node\lib\Functions', 'afterRequest'],
    // 设置源语言为英语
    'sourceLanguage' => 'en',
    // 设置目标语言为中文
    'language' => 'cn',
    'modules' => [
            'editor' => [
                'class' => 'node\modules\editor\EditorModule',
            ],
            'set' => [
                'basePath' => '@node/modules/set',
                'class' => 'node\modules\set\Module'   // here is our v1 modules
            ],
            'page' => [
                'basePath' => '@node/modules/page',
                'class' => 'node\modules\page\Module'   // here is our v1 modules
            ],
            'system' => [
                'basePath' => '@node/modules/system',
                'class' => 'node\modules\system\Module'   // here is our v1 modules
            ],
            'store' => [
                'basePath' => '@node/modules/store',
                'class' => 'node\modules\store\Module'   // here is our v1 modules
            ],
        ],
    'components' => [
        'i18n' => [
            'translations' => [
                'app*' => [
                    'class' => 'yii\i18n\PhpMessageSource',
                    'basePath' => '@app/messages',
                  //  'sourceLanguage' => 'cn',
                    'fileMap' => [
                        'app' => 'lan.php',
                        'app/error' => 'error.php',
                    ]
                ]
            ]
        ],
        'user' => [
            'identityClass' => 'node\models\node\Host',
            'enableAutoLogin' => false,
//            'loginUrl'=>
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'node/error',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
            ],
        ],
        'formatter' => [
            'decimalSeparator' => '.',
            'thousandSeparator' => ',',
            'currencyCode' => 'CNY',
        ],
        'cache' => [
            'class' => 'yii\caching\MemCache',
            'servers' => [
                [
                    'host' => '10.35.60.96',
                    'port' => 11211,
                    'weight' => 100,
                ],
            ],
        ],
        'assetManager' => [
            'linkAssets' => true,
        ],
        //'cache' => [
        //    'class' => 'yii\caching\FileCache',
        //],
    ],
    'params' => $params,
    'defaultRoute' => 'init/index',
];
