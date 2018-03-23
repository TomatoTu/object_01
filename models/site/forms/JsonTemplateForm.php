<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;

use yii\base\Model;

use node\lib\controller\AjaxController;
use node\models\site\Page;
use node\models\site\Banner;
use node\models\site\Component;
use node\models\site\ComponentItem;
use node\models\site\SiteConfig;
use node\models\site\ResourceRefrence;
use Yii;
use yii\helpers\Url;
use node\models\site\forms\JsonSystemsForm;
use node\models\site\forms\JsonPageForm;
use node\models\site\forms\JsonComponentForm;
use node\models\site\forms\JsonLogoForm;

/**
 * Description of JsonTemplateForm
 *
 * @author dingjj
 */
class JsonTemplateForm extends Model{
    public $site;
    
    public function __construct($config = array()) {
        parent::__construct($config);
        
        $systems = JsonSystemsForm::getSystems();
        $logo = JsonLogoForm::getLogo();
        $footer = JsonComponentForm::getFooter();
        $pages = JsonPageForm::getPages();
        
        foreach($pages as $key=>$page){
            $pages[$key]['components'] = self::setLoops($page['components'],'components');
        }
        
        $footer = self::setLoops($footer,'components');
        
        $pages = self::setLoops($pages,'pages');
        
        $this->site = [
            'logo'=>  $logo,
            'page'=>  $pages,
            'footer'=>  $footer,
            'systems'=>  $systems,
        ];
    }
    
    public static function setLoops($oldModels,$name){
        $newModels = [];
        $models = [];
        foreach($oldModels as $key=>$model){
            if(!isset($newModels[$model['parent_id']])){
                $newModels[$model['parent_id']] = [];
            }
            $newModels[$model['parent_id']][] = &$oldModels[$key];
        }
        
        foreach($oldModels as $key=>$model){
            if(isset($newModels[$model['id']])){
                $oldModels[$key][$name] = $newModels[$model['id']];
            }else{
                $oldModels[$key][$name] = [];
            }
        }
        foreach($oldModels as $key=>$model){
            if($model['parent_id'] == 0){
                $models[] = $oldModels[$key];
            }
        }
        return $models;
    }
}
