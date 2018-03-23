<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;
use node\modules\system\models\Article;
use node\modules\system\models\System;
use node\modules\system\lib\ArticleFunctions;
/**
 * Description of ArticleListForm
 *
 * @author dingjj
 */
class ArticleListForm extends Article{
    
    public function rules() {
        return [
           [['system_id'], 'required'],
           ['system_id', 'exist', 'targetClass' => System::className(),'targetAttribute' => 'id','filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '系统id不存在'],
        ];
    }
     
    public function articleList(){
        return self::find()->where(self::whereMerge(['system_id'=>  $this->system_id,'is_refuse'=>0]))->with(['resources','categorie'])->orderBy('is_top desc,order_num desc,id desc')->asArray()->all();
    }
    public function articleListRecycle(){
        return self::find()->where(self::whereMerge(['system_id'=>  $this->system_id,'is_refuse'=>1]))->with(['resources','categorie'])->orderBy('is_top desc,order_num desc,id desc')->asArray()->all();
    }
    public function articleDeleteAll(){
        $products = self::findAll(self::whereMerge(['system_id'=>  $this->system_id,'is_refuse'=>1]));
        
        foreach ($products as $product) {
            ArticleFunctions::Delete($product->id);
        }
        
        return $this->system_id;
    }
    public function articleDeleteAllBySystem(){
        $products = self::findAll(self::whereMerge(['system_id'=>  $this->system_id,'is_refuse'=>[0,1]]));
        
        foreach ($products as $product) {
            ArticleFunctions::Delete($product->id);
        }
        
        return $this->system_id;
    }
}
