<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\models;
use node\models\site\System as oSystem;
use node\modules\system\models\Article;
use node\modules\system\models\Product;
use node\modules\system\models\ArticleCategories;
use node\modules\system\models\ProductCategories;
/**
 * Description of System
 *
 * @author dingjj
 */
class System extends oSystem{
    
    // 获取多系统
    public static function getSystems(){
        return self::find()->where(self::whereDefault())->with(['articles','products'])->orderBy('system_type_id asc,id asc')->asArray()->all();
    }
    
    //文章数量
    public function getArticlescount(){
        return $this->hasOne(Article::className(), ['system_id'=>'id'])->andWhere(['is_refuse'=>[0,1]]);
//        return $query->select('count(1) as count,system_id');
    }
    
    // 产品数量
    public function getProductscount(){
        return $this->hasOne(Product::className(), ['system_id'=>'id'])->andWhere(['is_refuse'=>[0,1]]);
//        return $query->select('count(1) as count,system_id');
    }
    
    // 设置文章数量
    public function setArticlescount($articles){
        return $this->articlescount = $articles;
    }
    
    // 设置产品数量
    public function setProductscount($products){
        return $this->productscount = $products;
    }
    
//    // 获取单系统
//    public static function getSystem($id){
//        return self::find()->where(self::whereMerge(['id'=>$id]))->with(['articles','products','acategories','pcategories','products.resources','products.categorie'])->asArray()->one();
//    }
    
    // 获取单系统
    public static function getSystem($id){
        return self::find()->where(self::whereMerge(['id'=>$id]))->asArray()->one();
    }
    
    //文章
    public function getArticles(){
        $query = $this->hasMany(Article::className(), ['system_id'=>'id'])->andWhere(['is_refuse'=>[0,1]]);;
        return $query->orderBy('is_top desc,order_num desc,id desc');
    }
    
    // 产品
    public function getProducts(){
        $query = $this->hasMany(Product::className(), ['system_id'=>'id'])->andWhere(['is_refuse'=>[0,1]]);;
        return $query->orderBy('is_top desc,order_num desc,id desc');
    }
    
    //文章分组
    public function getAcategories(){
        return $this->hasMany(ArticleCategories::className(), ['system_id'=>'id']);
    }
    
    // 产品分组
    public function getPcategories(){
        return $this->hasMany(ProductCategories::className(), ['system_id'=>'id']);
    }
}
