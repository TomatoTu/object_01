<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;
use node\models\site\ResourceRefrence;
use node\models\site\Resource;
use node\models\site\Categories;
use node\models\site\forms\JsonOptionsForm;
use node\models\site\ProductOptionsGroup;
use node\models\site\ProductOptionsItem;
use node\models\site\ProductLabel;
use node\models\site\SeoInfo;
use node\models\site\ProductInfo;

/**
 * Description of JsonProductInfoForm
 *
 * @author dingjj
 */
class JsonProductInfoForm extends ProductInfo{
    
    public function productInfo(){
        return self::find()->where(self::whereMerge(['id'=>  $this->id,'system_id'=>  $this->system_id]))->with(['resources','categorie','options','items','groups','labels','seo'])->asArray()->one();
    }
    
    // 图片关系
    public function getRef(){
        $query = $this->hasMany(ResourceRefrence::className(), ['aim_id'=>'id']);
        return $query->andWhere(['type'=>5]);
    }
    // 图片
    public function getResources(){
        return $this->hasMany(Resource::className(), ['id'=>'resource_id'])->via('ref');
    }
    // 分类
    public function getCategorie(){
        return $this->hasOne(Categories::className(), ['id'=>'category_id']);
    }
    // 属性
    public function getOptions(){
       $query = $this->hasMany(JsonOptionsForm::className(), ['product_id'=>'id']);
       return $query->andWhere(self::whereDefault())->orderBy('order_num');
    }
    // 属性项
    public function getItems(){
        $query = $this->hasMany(ProductOptionsItem::className(), ['product_id'=>'id']);
        return $query->andWhere(self::whereDefault())->orderBy('order_num');
    }
    // 组合项
    public function getGroups(){
        $query = $this->hasMany(ProductOptionsGroup::className(), ['product_id'=>'id']);
        return $query->andWhere(self::whereDefault());
    }
    
    public function getLabels(){
        return $this->hasMany(ProductLabel::className(), ['product_id'=>'id']);
    }
    
    public function getSeo(){
        return $this->hasOne(SeoInfo::className(), ['aim_id'=>'id'])->andWhere(self::whereMerge(['type'=>  SeoInfo::TYPE_PRO]));
    }
}
