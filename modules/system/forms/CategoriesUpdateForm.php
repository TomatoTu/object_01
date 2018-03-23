<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;
use node\modules\system\models\Categories;
use node\modules\system\models\Seo;
/**
 * Description of CategoriesUpdateForm
 *
 * @author dingjj
 */
class CategoriesUpdateForm extends Categories{
    public $seo;
    public function rules() {
         return [
            [['id','name','parent_id'], 'required'],
            ['id', 'exist', 'targetClass' => self::className(),'targetAttribute' => 'id','filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '分类id不存在'],
            [['parent_id'], 'integer'], 
            [['name'], 'string', 'max' => 250],
             [['seo'], 'safe'],
        ];
     }
     public function updateCategory(){
         
         $seoInfo = json_decode($this->seo,true);
         
         $category = Categories::findOne($this->id);
         
         $seo = $category->seo;
         if($seo){
             $seo->setAttributes($seoInfo);
             $seo->save();
         }else{
             $seo = new Seo();
             $seo->setAttributes($seoInfo);
             $seo->setAttributes(self::dataDefault());
             $seo->loadDefaultValues();
             $seo->setAttributes(['type'=>'2','aim_id'=>$category->id]);
             $seo->save();
         }
         
         $category->setAttributes($this->toArray());
         $category->save();
         
         return $category;
     }
}
