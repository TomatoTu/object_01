<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;
use node\models\site\ProductOptions;
use node\models\site\ProductOptionsItem;
/**
 * Description of JsonOptionsForm
 *
 * @author dingjj
 */
class JsonOptionsForm extends ProductOptions{
    public function getItems(){
        return $this->hasMany(ProductOptionsItem::className(), ['options_id'=>'id']);
    }
}
