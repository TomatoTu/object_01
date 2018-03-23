<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;
use node\modules\system\models\Product;
use node\modules\system\models\System;
/**
 * Description of ProductInfoForm
 *
 * @author dingjj
 */
class ProductInfoForm extends Product{
    
    public function rules() {
         return [
            [['id'], 'required'],
            ['id', 'exist', 'targetClass' => Product::className(),'targetAttribute' => 'id','filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '产品id不存在'],
            [['system_id'], 'required'],
            ['system_id', 'exist', 'targetClass' => System::className(),'targetAttribute' => 'id','filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '系统id不存在'],
        ];
     }
    
    public function productInfo(){
        return self::find()->where(self::whereMerge(['id'=>  $this->id,'system_id'=>  $this->system_id]))->with(['resources','categorie','options','items','groups','labels','seo'])->asArray()->one();
    }
}
