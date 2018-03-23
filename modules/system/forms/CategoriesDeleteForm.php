<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;
use node\modules\system\models\Categories;
/**
 * Description of CategoriesUpdateForm
 *
 * @author dingjj
 */
class CategoriesDeleteForm extends Categories{
    public function rules() {
         return [
            [['id'], 'required'],
            ['id', 'exist', 'targetClass' => self::className(),'targetAttribute' => 'id','filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '分类id不存在'],
        ];
     }
     public function deleteCategory(){
         $category = self::findOne($this->id);
         
         $seo = $category->seo;
         if($seo){
             $seo->delete();
         }
         
         $category->delete();
         
         return $this->id;
     }
}
