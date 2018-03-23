<?php

$config = [
    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'DobsgPDXhDCO-HtM1EkL6nx8B0A6eCIY',
        ],
        'node' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=localhost;dbname=naples_node',
            'username' => 'root',
            'password' => 'root',
            'charset' => 'utf8',
        ],
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=localhost;dbname=naples_10356097',
            'username' => 'root',
            'password' => 'root',
            'charset' => 'utf8',
        ],
//        'node' => [
//            'class' => 'yii\db\Connection',
//            'dsn' => 'mysql:host=localhost;dbname=naples_node',
//            'username' => 'root',
//            'password' => '',
//            'charset' => 'utf8',
//        ],
//        'db' => [
//            'class' => 'yii\db\Connection',
//            'dsn' => 'mysql:host=localhost;dbname=naples_10356097',
//            'username' => 'root',
//            'password' => '',
//            'charset' => 'utf8',
//        ],
    ],
];

if (!YII_ENV_TEST) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
    ];
}

return $config;
