<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;
use node\models\site\System;
use node\models\site\forms\JsonProductInfoForm;
use node\models\site\forms\JsonArticlesForm;
use node\models\site\forms\JsonCategorieForm;
/**
 * Description of JsonSystemsForm
 *
 * @author dingjj
 */
class JsonSystemsForm extends System{
    // 获取多系统
    public static function getSystems(){
//        return self::find()->where(self::whereMerge())->with(['products','products.resources','products.categorie','products.options','products.options.items','products.groups','products.labels','products.seo','articles','articles.resources','articles.categorie'])->asArray()->All();
        return self::find()->where(self::whereMerge())->with(['categories','categories.seo','categories.products','categories.products.resources','categories.products.options','categories.products.options.items','categories.products.groups','categories.products.labels','categories.products.seo','categories.articles','categories.articles.resources','products','products.resources','products.options','products.options.items','products.groups','products.labels','products.seo','articles','articles.resources'])->asArray()->All();
    }
    
    // 分类
    public function getCategories(){
        return $this->hasMany(JsonCategorieForm::className(), ['system_id'=>'id'])->orderBy('order_num');
    }
    
    // 产品
    public function getProducts(){
        $query = $this->hasMany(JsonProductInfoForm::className(), ['system_id'=>'id'])->andWhere(['is_refuse'=>0,'category_id'=>0]);
        return $query->orderBy('is_top desc,order_num desc,id desc');
    }
    
    //文章
    public function getArticles(){
        $query = $this->hasMany(JsonArticlesForm::className(), ['system_id'=>'id'])->andWhere(['is_refuse'=>0,'category_id'=>0]);
        return $query->orderBy('is_top desc,order_num desc,id desc');
    }
}
