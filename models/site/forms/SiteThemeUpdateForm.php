<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;
use node\models\site\Site;
use node\models\node\Template;
use Yii;
/**
 * Description of SiteThemeUpdateForm
 *
 * @author dingjj
 */
class SiteThemeUpdateForm extends Site{
    public function rules() {
         return [
            [['theme','color'], 'required'],
            ['theme', 'exist', 'targetClass' => Template::className(),'targetAttribute' => 'theme', 'message' => '主题id不存在'],
        ];
     }
     
     public function updateTheme(){
         $site = $this->site();
         $site->setAttributes($this->toArray());
         $site->save();
         if($site->hasErrors()){
             Yii::info($site->getErrors());
             throw new \yii\web\BadRequestHttpException('更新主题失败');
         }
     }
}
