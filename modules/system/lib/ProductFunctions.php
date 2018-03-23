<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\lib;
use node\modules\system\models\Product;
use node\modules\system\models\ProductCategories;
use node\modules\system\models\ResourceRefrence;
use node\modules\system\forms\ProductCreateForm;
use node\modules\system\models\Options;
use node\modules\system\models\Items;
use node\modules\system\models\Group;
use node\modules\system\models\ProductLabel;

/**
 * Description of PageFunctions
 *
 * @author dingjj
 */
class ProductFunctions {
    //put your code here

    // 新建产品
    public static function CreateProduct(){
        
    }
    
    // 删除产品
    public static function DeleteProduct($id){
        $resP = Product::deleteAll(Product::whereMerge(['id'=> $id]));
        $resR = ResourceRefrence::deleteAll(ResourceRefrence::whereMerge(['type'=>5,'aim_id'=>$id]));
        if($resP > 0){
            return ;
        }else{
            throw new \yii\web\BadRequestHttpException();
        }
    }
    
    // 删除产品
    public static function DeleteProductOther($id){
        self::DeleteRefrence($id);
        self::DeleteOptions($id);
        self::DeleteItems($id);
        self::DeleteGroups($id);
        self::DeleteLabels($id);
    }
    
    public static function DeleteRefrence($id){
        $res = ResourceRefrence::deleteAll(ResourceRefrence::whereMerge(['type'=>5,'aim_id'=>$id]));
    }
    
    public static function DeleteOptions($id){
        $res = Options::deleteAll(Options::whereMerge(['product_id'=>$id]));
    }
    
    public static function DeleteItems($id){
        $res = Items::deleteAll(Items::whereMerge(['product_id'=>$id]));
    }
    
    public static function DeleteGroups($id){
        $res = Group::deleteAll(Group::whereMerge(['product_id'=>$id]));
    }
    
    public static function DeleteLabels($id){
        $res = ProductLabel::deleteAll(ProductLabel::whereMerge(['product_id'=>$id]));
    }
    
    // 删除产品
    public static function DeleteProductAll($system_id){
        
        $products = Product::findAll(Product::whereMerge(['system_id'=> $system_id]));
        
        foreach ($products as $product) {
            self::DeleteProduct($product->id);
        }
    }
    
    // 垃圾箱
    public static function DeleteProductr($id){
        $product = Product::findOne(Product::whereMerge(['id'=> $id]));
        $product->is_refuse = 1;
        $product->save();
        if(!$product->hasErrors()){
            return ;
        }else{
            throw new \yii\web\BadRequestHttpException();
        }
    }
    
    // 垃圾箱
    public static function recoveryProduct($id){
        $product = Product::findOne(Product::whereMerge(['id'=> $id]));
        $product->is_refuse = 0;
        $product->save();
        if(!$product->hasErrors()){
            return ;
        }else{
            throw new \yii\web\BadRequestHttpException();
        }
    }
}
