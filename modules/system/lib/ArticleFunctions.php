<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\lib;
use node\modules\system\models\Article;
use node\modules\system\models\ProductCategories;
use node\modules\system\models\ResourceRefrence;
use node\modules\system\forms\ProductCreateForm;

/**
 * Description of PageFunctions
 *
 * @author dingjj
 */
class ArticleFunctions {
    //put your code here

    // 新建产品
    public static function CreateProduct(){
        
    }
    
    // 删除产品
    public static function Delete($id){
        $resP = Article::deleteAll(Article::whereMerge(['id'=> $id]));
        $resR = ResourceRefrence::deleteAll(ResourceRefrence::whereMerge(['type'=>9,'aim_id'=>$id]));
        if($resP > 0){
            return ;
        }else{
            throw new \yii\web\BadRequestHttpException();
        }
    }
    
    // 删除产品
    public static function DeleteAll($system_id){
        
        $products = Article::findAll(Article::whereMerge(['system_id'=> $system_id]));
        
        foreach ($products as $product) {
            self::Delete($product->id);
        }
    }
    
    // 垃圾箱
    public static function Deleter($id){
        $product = Article::findOne(Article::whereMerge(['id'=> $id]));
        $product->is_refuse = 1;
        $product->save();
        if(!$product->hasErrors()){
            return ;
        }else{
            throw new \yii\web\BadRequestHttpException();
        }
    }
    
    // 垃圾箱
    public static function recovery($id){
        $product = Article::findOne(Article::whereMerge(['id'=> $id]));
        $product->is_refuse = 0;
        $product->save();
        if(!$product->hasErrors()){
            return ;
        }else{
            throw new \yii\web\BadRequestHttpException();
        }
    }
}
