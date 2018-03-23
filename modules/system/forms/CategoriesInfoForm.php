<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;
use node\modules\system\models\Categories;
use node\modules\system\models\System;
/**
 * Description of CategoriesInfoForm
 *
 * @author dingjj
 */
class CategoriesInfoForm extends Categories{
    /**
     * @inheritdoc
     */
    
     public function rules() {
         return [
            [['system_id'], 'required'],
            ['system_id', 'exist', 'targetClass' => System::className(),'targetAttribute' => 'id','filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '系统id不存在'],
        ];
     }
     
     public function getInfo(){
         return self::find()->where(self::whereMerge(['system_id'=>  $this->system_id]))->with('seo')->orderBy('order_num')->asArray()->all();
     }
     
     public static function getInfoById($id){
         return self::find()->where(self::whereMerge(['id'=>  $id]))->with('seo')->orderBy('order_num')->asArray()->one();
     }
}
