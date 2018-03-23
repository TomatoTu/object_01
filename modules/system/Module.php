<?php
namespace node\modules\system;

/**
 * iKargo API V1 Module
 * 
 * @author Budi Irawan <budi@ebizu.com>
 * @since 1.0
 */
class Module extends \yii\base\Module
{
    public $controllerNamespace = 'node\modules\system\controllers';

    public function init()
    {
        parent::init();        
    }
}
