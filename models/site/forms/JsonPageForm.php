<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;
use node\models\site\Page;
use node\models\site\forms\JsonComponentForm;
use node\models\site\forms\JsonBannerForm;

/**
 * Description of JsonPageForm
 *
 * @author dingjj
 */
class JsonPageForm extends Page{
    // 获取多页面
    public static function getPages(){
        return self::find()->where(self::whereMerge())->with(['components','components.resources','components.items','components.items.resources','banners','banners.items','banners.items.resources'])->asArray()->All();
    }
    
    public function getComponents(){
        return $this->hasMany(JsonComponentForm::className(), ['page_id'=>'id']);
    }
    public function getBanners(){
        return $this->hasOne(JsonBannerForm::className(), ['page_id'=>'id']);
    }
}
