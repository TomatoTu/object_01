<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\models;
use node\models\site\System as baseSystem;
/**
 * Description of System
 *
 * @author dingjj
 */
class System extends baseSystem{
    public function getObj(){
        
        if($this->system_type_id == '1'){
            return $this->product;
        }else{
            return $this->article;
        }
    }
    
    public function getProduct(){
        return $this->hasOne(Product::className(), ['system_id'=>'id'])->select(['title','system_id']);
    }
}
