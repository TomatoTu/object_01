<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;
use node\models\site\Banner;
use node\models\site\forms\JsonBannerItemForm;
/**
 * Description of JsonBannerForm
 *
 * @author dingjj
 */
class JsonBannerForm extends Banner{
    public function getItems(){
        return $this->hasMany(JsonBannerItemForm::className(), ['banner_id'=>'id']);
    }
}
