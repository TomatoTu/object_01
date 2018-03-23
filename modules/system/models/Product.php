<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\models;
use node\models\site\ProductInfo;
use node\modules\system\models\ResourceRefrence;
use node\modules\system\models\Resource;
use node\modules\system\models\Categories;
use node\modules\system\models\Options;
use node\modules\system\models\Items;
use node\modules\system\models\Group;
use node\modules\system\models\ProductLabel;
use node\modules\system\models\Seo;
use Yii;
/**
 * Description of Product
 *
 * @author dingjj
 */
class Product extends ProductInfo{
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
       $query = $this->hasMany(Options::className(), ['product_id'=>'id']);
       return $query->andWhere(self::whereDefault())->orderBy('order_num');
    }
    // 属性项
    public function getItems(){
        $query = $this->hasMany(Items::className(), ['product_id'=>'id']);
        return $query->andWhere(self::whereDefault())->orderBy('order_num');
    }
    // 组合项
    public function getGroups(){
        $query = $this->hasMany(Group::className(), ['product_id'=>'id']);
        return $query->andWhere(self::whereDefault());
    }
    
    public function getLabels(){
        return $this->hasMany(ProductLabel::className(), ['product_id'=>'id']);
    }
    
    public function getSeo(){
        return $this->hasOne(Seo::className(), ['aim_id'=>'id'])->andWhere(self::whereMerge(['type'=>  Seo::TYPE_PRO]));
    }
}
