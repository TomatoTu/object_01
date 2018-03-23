<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\lib;
use node\models\site\Page;
use node\models\site\Banner;
use node\models\site\Component;
use node\models\site\ComponentItem;
use node\models\site\SiteConfig;
use node\models\site\ResourceRefrence;
use node\models\site\forms\JsonTemplateForm;
use Yii;
/**
 * Description of JsonTemplateFunctions
 *
 * @author dingjj
 */
class JsonTemplateFunctions {
    const TEMPLATE_PATH = '@node/web/template/';
//    const TEMPLATE_PATH = '@node/web/';
    public static function json2(){
        $t = new JsonTemplateForm();
        Yii::info(\yii\helpers\ArrayHelper::toArray($t->site));
        if(!file_exists(Yii::getAlias(self::TEMPLATE_PATH).Yii::$app->params['NAPLES']['SITE']['theme'].'/template.json')){
            file_put_contents(Yii::getAlias(self::TEMPLATE_PATH).Yii::$app->params['NAPLES']['SITE']['theme'].'/template.json', json_encode($t->site));
            die('ok,'.Yii::getAlias(self::TEMPLATE_PATH).Yii::$app->params['NAPLES']['SITE']['theme'].'/template.json');
        }else{
            die('false,exists');
        }
//        file_put_contents(Yii::getAlias(self::TEMPLATE_PATH).Yii::$app->params['NAPLES']['SITE']['theme'].'/template.json', json_encode($t->site));
        
        
    }
    
    
}
