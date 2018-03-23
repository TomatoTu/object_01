<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;
use node\models\site\Site;
use node\models\site\Language;
/**
 * Description of SiteLanguageForm
 *
 * @author dingjj
 */
class SiteLanguageForm extends Site{
    public function getLanguage(){
        return $this->hasOne(Language::className(), ['id'=>'language_id']);
    }
    
    public static function Languages(){
        return self::find()->where(['host_id'=>self::hostId()])->with('language')->asArray()->all();
    }
}
